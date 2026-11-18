from pathlib import Path
import tempfile,subprocess,os,sys,json,hashlib,shutil
R=Path(__file__).resolve().parents[1];PY=sys.executable;NODE=os.environ.get('SEMINAR_NODE') or shutil.which('node')
if not NODE:raise SystemExit('Node.js 또는 SEMINAR_NODE를 지정하세요.')
if not (R/'seminar-template/node_modules').is_dir():raise SystemExit('먼저 seminar-template에서 pnpm install --frozen-lockfile을 실행하세요.')
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
with tempfile.TemporaryDirectory(prefix='seminar-harness-') as tmp:
 p=Path(tmp)/'new-paper-check'
 subprocess.run([PY,str(R/'scripts/new_seminar.py'),str(p),'--title','새 논문 실행 검사'],check=True,capture_output=True,text=True)
 (p/'node_modules').symlink_to(R/'seminar-template/node_modules',target_is_directory=True)
 env=dict(os.environ,SEMINAR_NODE=NODE)
 def run(*args,ok=True):
  result=subprocess.run([PY,'scripts/seminar.py',*args],cwd=p,env=env,text=True,capture_output=True)
  assert (result.returncode==0)==ok,(args,result.stdout,result.stderr)
  return result
 (p/'public/figures/test.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><rect width="120" height="40" fill="teal"/></svg>')
 initial=p/'sections/00-start.md';initial.write_text(initial.read_text().replace('- [비교 도식 예시]', '<img src="/figures/test.svg" alt="테스트 도형">\n\n- [비교 도식 예시]',1))
 run('build');run('check');run('check','--ready',ok=False)
 original=(p/'SPEAKER_SCRIPT.md').read_text();old_html=digest(p/'index.html')
 (p/'SPEAKER_SCRIPT.md').write_text(original+'\n사용자 직접 수정\n');run('build',ok=False)
 assert digest(p/'index.html')==old_html
 assert '사용자 직접 수정' in (p/'SPEAKER_SCRIPT.md').read_text()
 (p/'SPEAKER_SCRIPT.md').write_text(original)
 section=p/'sections/00-start.md';section.write_text(section.read_text().replace('위·아래에서 같은 항목을 비교합니다.','위·아래에서 동일한 항목을 비교합니다.'))
 run('check',ok=False);run('build');run('check')
 run('study','--section','01-introduction','--title','Introduction')
 run('study','--section','01-introduction','--title','Overwrite',ok=False)
 run('feedback','--slide','S002','--kind','praise','--text','이전 내용과 다음 내용의 연결이 좋다.')
 protected={str(f.relative_to(p)):digest(f) for f in [p/'study/01-introduction.md',p/'review/FEEDBACK.md',p/'SPEAKER_SCRIPT.md']}
 (p/'.cache').mkdir();(p/'.cache/generated.tmp').write_text('temporary');run('clean');assert (p/'.cache').exists();run('clean','--apply');assert not (p/'.cache').exists()
 for file,h in protected.items():assert digest(p/file)==h
 settings=json.loads((p/'seminar.json').read_text());settings['status']='ready';(p/'seminar.json').write_text(json.dumps(settings,ensure_ascii=False))
 section.write_text(section.read_text().replace('draft: true','draft: false'));run('package')
 assert all(f.suffix=='.html' for f in (p/'dist').iterdir());assert '사용자 직접 수정' not in (p/'index.html').read_text()
 assert '이전 내용과 다음 내용의 연결이 좋다.' not in (p/'index.html').read_text()
 result=subprocess.run([NODE,'scripts/verify.mjs'],cwd=p,text=True,capture_output=True);assert result.returncode==0,(result.stdout,result.stderr)
 print(result.stdout.strip())
 report=json.loads((p/'review/BROWSER_CHECK.json').read_text());assert report['screens']==4
 target=R/'docs/superpowers/harness-smoke-check.json';target.parent.mkdir(parents=True,exist_ok=True);target.write_text(json.dumps({'projectCreation':True,'build':True,'scriptGuard':True,'staleScreenGuard':True,'studyNoOverwrite':True,'praiseRecorded':True,'cleanProtectedFiles':True,'draftReadyGuard':True,'htmlOnlyPackage':True,'browser':report},ensure_ascii=False,indent=2)+'\n')
 print('PASS: fresh paper → build/check → manual-script/stale-screen guards → study → praise → safe cleanup → HTML package → browser check. Temporary workspace removed.')
