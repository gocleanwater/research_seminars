"""Create a paper-specific workspace without overwriting or publishing anything."""
from pathlib import Path
import argparse,json,re,shutil
ROOT=Path(__file__).resolve().parents[1]
def create(destination,title):
    if not re.fullmatch(r'[a-z0-9][a-z0-9_-]*',destination.name):raise ValueError('폴더명은 영문 소문자·숫자·하이픈을 사용하세요.')
    if destination.exists():raise ValueError('기존 폴더를 덮어쓰지 않습니다: '+str(destination))
    shutil.copytree(ROOT/'seminar-template',destination,ignore=shutil.ignore_patterns('node_modules','.git','__pycache__','*.pyc','index.html','presentation.html','part-*.html','SPEAKER_SCRIPT.md','previews','BROWSER_CHECK.json','manifest.json','dist','.cache','qa'))
    cfg=destination/'seminar.json';settings=json.loads(cfg.read_text());settings['title']=title;cfg.write_text(json.dumps(settings,ensure_ascii=False,indent=2)+'\n')
    pkg=destination/'package.json';settings=json.loads(pkg.read_text());settings['name']=destination.name;pkg.write_text(json.dumps(settings,ensure_ascii=False,indent=2)+'\n')
    print('생성: '+str(destination));print('다음 채팅에서 '+str(destination/'START_HERE.md')+'를 먼저 읽어 달라고 하세요.');print('의존성 설치: pnpm install --frozen-lockfile');print('논문 원문·공부 기록 경로를 PROJECT.md에 연결하세요. 외부 저장소 생성/게시/덮어쓰기는 수행하지 않았습니다.')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('destination',type=Path);p.add_argument('--title',required=True);a=p.parse_args()
    try:create(a.destination.resolve(),a.title)
    except ValueError as e:p.exit(1,str(e)+'\n')
