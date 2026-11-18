"""A local, script-first seminar loop. No network, publishing, or model calls."""
from pathlib import Path
from html import escape
import argparse,base64,functools,hashlib,http.server,json,mimetypes,os,re,shutil,subprocess,sys
ROOT=Path(__file__).resolve().parents[1]
FIELDS=['한 문장','본문','보충','요점','출처','대본','그림 설명 카드']
def config():return json.loads((ROOT/'seminar.json').read_text())
def fields(s,level,labels):
    ms=list(re.finditer(r'^'+('#'*level)+r' ('+'|'.join(map(re.escape,labels))+r')\s*$',s,re.M))
    return {m[1]:s[m.end():ms[i+1].start() if i+1<len(ms) else len(s)].strip() for i,m in enumerate(ms)}
def read_pages():
    pages=[]
    for file in sorted((ROOT/'sections').glob('*.md')):
        s=file.read_text();ms=list(re.finditer(r'^## \[([A-Z][A-Z0-9_-]*)\] (.+)$',s,re.M))
        for i,m in enumerate(ms):
            block=s[m.end():ms[i+1].start() if i+1<len(ms) else len(s)]
            meta=re.search(r'<!-- slide-meta\n(.*?)-->',block,re.S)
            settings=dict(line.split(':',1) for line in meta[1].splitlines() if ':' in line) if meta else {}
            settings={k.strip():v.strip() for k,v in settings.items()};f=fields(block,3,FIELDS)
            cards=f.get('그림 설명 카드','');cs=list(re.finditer(r'^#### \[([a-z0-9-]+)\] ([^\n]+)\n(.*?)(?=^#### \[|\Z)',cards,re.M|re.S))
            frames=[dict(title=c[2],**fields(c[3],5,['핵심','화면','대본','요점'])) for c in cs]
            if not frames:frames=[{'title':'','핵심':f.get('한 문장',''),'화면':f.get('본문','')+('\n\n'+f['보충'] if f.get('보충') else ''),'대본':f.get('대본',''),'요점':f.get('요점','')}]
            if settings.get('draft','true') not in {'true','false'}:raise ValueError(m[1]+': draft는 true 또는 false로 적으세요.')
            for frame in frames:
                frame.setdefault('핵심',f.get('한 문장',''))
                frame.setdefault('요점',f.get('요점',''))
            pages.append(dict(id=m[1],title=m[2],part=settings.get('part','1'),draft=settings.get('draft','true')=='true',source=f.get('출처',''),refs=[x.strip() for x in settings.get('study_refs','').split(',') if x.strip()],frames=frames,file=str(file.relative_to(ROOT))))
    if not pages:raise ValueError('sections/에 슬라이드가 없습니다.')
    ids=[p['id'] for p in pages]
    if len(set(ids))!=len(ids):raise ValueError('슬라이드 ID가 중복됩니다.')
    for p in pages:
        if not re.fullmatch(r'[a-zA-Z0-9_-]+',p['part']):raise ValueError('Part ID는 영문/숫자/하이픈만 사용하세요.')
        if not p['source']:raise ValueError(p['id']+': 출처 또는 작성 상태를 적으세요.')
        for f in p['frames']:
            if not f.get('화면') or not f.get('대본'):raise ValueError(p['id']+': 각 화면과 대본이 필요합니다.')
        for ref in p['refs']:
            path=Path(ref);path=path if path.is_absolute() else ROOT/path
            if not path.is_file():raise ValueError(p['id']+': 공부 기록을 찾지 못함: '+ref)
    for p in pages:
        for f in p['frames']:
            for target in re.findall(r'href=[\"\']#([A-Z][A-Z0-9_-]*)[\"\']',f['화면']):
                if target not in ids:raise ValueError('없는 슬라이드 링크: '+target)
    return pages

def expected_script(pages):
    return '# '+config()['title']+' 발표 대본\n\n'+''.join('## '+p['id']+' · '+p['title']+'\n\n'+''.join((f'**화면 {i+1}/{len(p["frames"])} · {f["title"]}**\n\n' if len(p['frames'])>1 else '')+f['대본']+'\n\n' for i,f in enumerate(p['frames'])) for p in pages)

def node():
    binary=os.environ.get('SEMINAR_NODE') or shutil.which('node')
    if not binary:raise ValueError('Node.js를 설치하거나 SEMINAR_NODE에 실행 파일 경로를 지정하세요.')
    return binary

def render(values):
    result=subprocess.run([node(),str(ROOT/'scripts/render_markdown.mjs')],cwd=ROOT,input=json.dumps(values,ensure_ascii=False),text=True,capture_output=True)
    if result.returncode:raise ValueError('Markdown 렌더링 실패. pnpm install --frozen-lockfile을 확인하세요.\n'+result.stderr[-1500:])
    return json.loads(result.stdout)

def inline_image(match):
    src=match[1]
    if src.startswith('data:'):return match[0]
    if src.startswith('/figures/'):file=ROOT/'public'/src.lstrip('/')
    else:file=ROOT/'public'/src.removeprefix('public/').lstrip('/')
    if not file.resolve().is_relative_to((ROOT/'public').resolve()) or not file.is_file():raise ValueError('public/ 안의 실제 그림 파일을 사용하세요: '+src)
    mime=mimetypes.guess_type(file.name)[0] or 'application/octet-stream'
    return 'src="data:'+mime+';base64,'+base64.b64encode(file.read_bytes()).decode()+'"'

def math_css():
    candidates=[ROOT/'node_modules/katex/dist/katex.min.css']+list((ROOT/'node_modules/.pnpm').glob('katex@*/node_modules/katex/dist/katex.min.css'))
    path=next((p for p in candidates if p.is_file()),None)
    if path is None:raise ValueError('KaTeX를 찾지 못했습니다. pnpm install --frozen-lockfile을 실행하세요.')
    def font(m):
        f=path.parent/m[1];mime='font/woff2' if f.suffix=='.woff2' else 'font/woff' if f.suffix=='.woff' else 'font/ttf'
        return 'url(data:'+mime+';base64,'+base64.b64encode(f.read_bytes()).decode()+')'
    return re.sub(r'url\((fonts/[^)]+)\)',font,path.read_text())

def fingerprint(pages):
    payload={'pages':pages,'config':config(),'css':(ROOT/'style.css').read_text(),'runtime':(ROOT/'scripts/runtime.js').read_text(),'assets':[(str(p.relative_to(ROOT)),hashlib.sha256(p.read_bytes()).hexdigest()) for p in sorted((ROOT/'public').rglob('*')) if p.is_file()]}
    return hashlib.sha256(json.dumps(payload,ensure_ascii=False).encode()).hexdigest()[:12]

def build():
    pages=read_pages();values=[]
    script=ROOT/'SPEAKER_SCRIPT.md';previous=ROOT/'content/manifest.json'
    if script.exists() and script.read_text()!=expected_script(pages):
        saved=json.loads(previous.read_text()).get('script_sha256') if previous.exists() else None
        if hashlib.sha256(script.read_bytes()).hexdigest()!=saved:raise ValueError('사용자가 수정한 대본이 있습니다. 해당 문장을 Section 대본에 먼저 반영하세요. 덮어쓰지 않았습니다.')
    for p in pages:
        for f in p['frames']:values.extend([{'text':f['핵심'],'inline':True},f['화면'],{'text':f['요점'],'inline':True}])
    output=iter(render(values));markup={}
    for p in pages:
        frames=[]
        for i,f in enumerate(p['frames']):
            lead,body,take=next(output),next(output),next(output)
            frames.append(f'<section class="frame" data-frame="{i}"'+(' hidden' if i else '')+f'><header><p>{escape(config()["parts"].get(p["part"],p["part"]))}</p><h1>{escape(p["title"])}</h1><div class="lead">{lead}</div></header><div class="content">'+(f'<h2>{escape(f["title"])}</h2>' if f['title'] else '')+body+f'</div><div class="takeaway">{take}</div><footer><span>{escape(p["source"])}</span><span>{escape(p["id"])}</span></footer></section>')
        markup[p['id']]=re.sub(r'src="([^"]+)"',inline_image,'<article class="page" data-id="'+p['id']+'">'+''.join(frames)+'</article>')
    css=(ROOT/'style.css').read_text()+math_css();runtime=(ROOT/'scripts/runtime.js').read_text()
    public=[{'id':p['id'],'title':p['title'],'part':p['part'],'frames':len(p['frames'])} for p in pages]
    def write(name,selected):
        chosen={p['id'] for p in selected}
        data=json.dumps({'pages':[p for p in public if p['id'] in chosen],'all':public,'parts':config()['parts']},ensure_ascii=False).replace('<','\\u003c')
        links='<a href="index.html">전체</a>'+''.join(f'<a href="part-{escape(k)}.html">Part {escape(k)}</a>' for k in dict.fromkeys(p['part'] for p in pages))
        toc=[]
        for part in dict.fromkeys(p['part'] for p in pages):
            local=[p for p in selected if p['part']==part]
            label='Part '+part+' · '+config()['parts'].get(part,part)
            items=''.join(f'<p><a href="#{p["id"]}">{escape(p["title"])}</a></p>' for p in local)
            if not local:items=f'<p><a href="part-{escape(part)}.html">Part {escape(part)}로 이동 →</a></p>'
            toc.append(f'<section class="toc-group" data-part="{escape(part)}"><h3>{escape(label)}</h3>{items}</section>')
        html='<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>'+escape(config()['title'])+'</title><style>'+css+'</style><body><nav class="parts">'+links+'</nav><main id="stage">'+''.join(markup[p['id']] for p in selected)+'</main><nav class="toolbar"><button id="prev" aria-label="이전">←</button><form id="jump"><input id="number" type="number" min="1" aria-label="현재 페이지"><span id="counter"></span></form><button id="next" aria-label="다음">→</button><button id="toc-button">목차 G</button><button id="full">전체 화면 F</button></nav><dialog id="toc"><button data-close>닫기</button><h2>목차</h2>'+'<div class="toc-groups">'+''.join(toc)+'</div></dialog><dialog id="zoom"><button data-close>닫기</button><img alt="확대한 원문 그림"></dialog><script>const DATA='+data+';'+runtime+'</script></body></html>'
        (ROOT/name).write_text(html)
    write('index.html',pages);shutil.copy2(ROOT/'index.html',ROOT/'presentation.html')
    for part in dict.fromkeys(p['part'] for p in pages):
        if not re.fullmatch(r'[a-zA-Z0-9_-]+',part):raise ValueError('Part ID는 영문/숫자/하이픈만 사용하세요.')
        write('part-'+part+'.html',[p for p in pages if p['part']==part])
    (ROOT/'SPEAKER_SCRIPT.md').write_text(expected_script(pages))
    (ROOT/'content').mkdir(exist_ok=True)
    build_id=fingerprint(pages)
    (ROOT/'content/manifest.json').write_text(json.dumps({'title':config()['title'],'fingerprint':build_id,'script_sha256':hashlib.sha256((ROOT/'SPEAKER_SCRIPT.md').read_bytes()).hexdigest(),'pages':public},ensure_ascii=False,indent=2)+'\n')
    print(f'생성 완료: {len(pages)}장, {sum(len(p["frames"]) for p in pages)}화면. index.html / Part 분리본 / SPEAKER_SCRIPT.md')

def check(ready=False):
    pages=read_pages();script=ROOT/'SPEAKER_SCRIPT.md'
    if not script.is_file() or script.read_text()!=expected_script(pages):raise ValueError('대본과 원본이 다릅니다. build를 실행하세요. 사용자 수정 대본은 먼저 Section 원본에 반영하세요.')
    manifest=ROOT/'content/manifest.json'
    if not manifest.is_file() or json.loads(manifest.read_text())['fingerprint']!=fingerprint(pages):raise ValueError('화면/설정/그림이 빌드 후 바뀌었습니다. build를 다시 실행하세요.')
    for file in ['index.html','presentation.html']+['part-'+part+'.html' for part in dict.fromkeys(p['part'] for p in pages)]:
        if not (ROOT/file).is_file():raise ValueError('발표 파일이 없습니다: '+file)
    if ready and (config()['status']!='ready' or any(p['draft'] for p in pages)):raise ValueError('빈 틀/초안이 남아 있습니다. 원문 대조와 실제 검토 후 상태를 갱신하세요.')
    print(f'형식 확인: {len(pages)}장, ID/공부 기록 경로/대본 일치. 의미·출처·수치는 원문과 사람이 별도로 확인해야 합니다.')

def feedback(args):
    if args.slide not in {p['id'] for p in read_pages()}:raise ValueError('없는 슬라이드 ID입니다.')
    file=ROOT/'review/FEEDBACK.md';file.parent.mkdir(exist_ok=True)
    with file.open('a') as f:f.write(f'\n## {args.kind} · {args.slide}\n\n'+args.text+'\n\n- 반영 상태: 미검토\n- 유지할 설명 / 수정 범위:\n- 실제 반영과 검증:\n')
    print('원문 피드백 저장. correction뿐 아니라 praise도 다음 수정 전에 읽으세요.')

def study(args):
    if not re.fullmatch(r'[a-zA-Z0-9_-]+',args.section):raise ValueError('Section 파일명은 영문/숫자/하이픈만 사용하세요.')
    folder=Path(config()['study_dir']);folder=folder if folder.is_absolute() else ROOT/folder;folder.mkdir(parents=True,exist_ok=True)
    p=folder/(args.section+'.md')
    if p.exists():raise ValueError('기존 공부 기록은 덮어쓰지 않습니다: '+str(p))
    text=(ROOT/'templates/study-section.md').read_text().replace('[논문명]',config()['title']).replace('[번호·제목]',args.title)
    p.write_text(text);print(p)

def clean(apply=False):
    manifest=ROOT/'content/manifest.json';current=json.loads(manifest.read_text())['fingerprint'] if manifest.exists() else None
    refs='\n'.join(p.read_text() for p in (ROOT/'review').rglob('*.md'))
    candidates=[ROOT/'.cache',ROOT/'scripts/__pycache__']
    previews=ROOT/'review/previews'
    if previews.exists():candidates += [p for p in previews.iterdir() if p.is_dir() and re.fullmatch(r'[a-f0-9]{12}',p.name) and p.name!=current and p.name not in refs]
    tracked=[]
    result=subprocess.run(['git','ls-files','-z'],cwd=ROOT,capture_output=True,text=True)
    if result.returncode==0:tracked=[(ROOT/line).resolve() for line in result.stdout.split('\0') if line]
    for p in candidates:
        if not p.exists() or p.is_symlink() or not p.resolve().is_relative_to(ROOT.resolve()):continue
        if any(t==p.resolve() or t.is_relative_to(p.resolve()) for t in tracked):continue
        print(('삭제: ' if apply else '정리 후보: ')+str(p.relative_to(ROOT)))
        if apply:shutil.rmtree(p)
    print('공부·대본·원문·피드백·현재 HTML·의존성은 정리 대상이 아닙니다.')

def main():
    parser=argparse.ArgumentParser();sub=parser.add_subparsers(dest='command',required=True)
    sub.add_parser('build');sub.add_parser('package');c=sub.add_parser('check');c.add_argument('--ready',action='store_true')
    f=sub.add_parser('feedback');f.add_argument('--slide',required=True);f.add_argument('--kind',choices=['correction','praise','question'],required=True);f.add_argument('--text',required=True)
    st=sub.add_parser('study');st.add_argument('--section',required=True);st.add_argument('--title',required=True)
    cl=sub.add_parser('clean');cl.add_argument('--apply',action='store_true')
    srv=sub.add_parser('serve');srv.add_argument('--port',type=int,default=4175)
    args=parser.parse_args()
    if args.command=='build':build()
    elif args.command=='package':
        build();check(True);folder=ROOT/'dist';folder.mkdir(exist_ok=True)
        for file in ['index.html','presentation.html']+['part-'+p+'.html' for p in dict.fromkeys(x['part'] for x in read_pages())]:shutil.copy2(ROOT/file,folder/file)
        print('공개 후보 HTML만 dist/에 준비. 실제 게시는 별도 결정입니다.')
    elif args.command=='check':check(args.ready)
    elif args.command=='feedback':feedback(args)
    elif args.command=='study':study(args)
    elif args.command=='clean':clean(args.apply)
    else:
        handler=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(ROOT))
        print(f'http://127.0.0.1:{args.port}/index.html');http.server.ThreadingHTTPServer(('127.0.0.1',args.port),handler).serve_forever()
if __name__=='__main__':
    try:main()
    except (ValueError,FileNotFoundError) as e:print('중단: '+str(e),file=sys.stderr);sys.exit(1)
