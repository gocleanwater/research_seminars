# 논문 공부 → HTML 발표 하네스

이 폴더는 특정 논문의 내용을 담지 않은 공통 환경이다. Section 공부 기록을 읽고, 한 원본에서 화면과 대본을 작성한 뒤, 브라우저 검증과 피드백을 반복한다. Obsidian은 필요하지 않다.

## 시작

Python3.9 이상, Node.js22.12 이상, pnpm이 필요하다. 처음 한 번:

```sh
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 pnpm install --frozen-lockfile
pnpm build
pnpm check
pnpm dev
```

다른 포트를 쓰려면 `python3 scripts/seminar.py serve --port 4175`를 사용한다. `http://127.0.0.1:4175/index.html`을 연다. Chrome이 없다면 브라우저 검증을 위해 `pnpm exec playwright install chromium`을 한 번 실행한다.

## 매번 반복할 작업

1. `START_HERE.md`, `AGENTS.md`, 공통 규칙과 기존 피드백을 먼저 읽는다.
2. 공부한 Section을 `study/`에 기록한다. 기존 중앙 위키를 쓰려면 `seminar.json`의 `study_dir`과 `PROJECT.md`에 실제 경로를 지정한다.
3. 목차와 대본의 흐름을 먼저 잡는다. `sections/*.md`에서 대본·화면·요점·출처를 함께 작성한다. 단계가 필요하면 `00-start.md`의 그림 설명 카드 형식을 따른다.
4. 아래 명령으로 생성·검사한다. `SPEAKER_SCRIPT.md`를 직접 고쳤다면 먼저 해당 Section의 대본 필드에 반영한 뒤 빌드한다.
5. 실제 화면을 보며 원문·의미·중복·자연스러운 연결을 검토한다. `templates/review-checklist.md`를 활용한다.
6. 수정 요청과 칭찬을 원문대로 기록하고, 좋은 설명은 유지한 채 수정 범위만 고친다. 다시3–5를 진행한다.

```sh
python3 scripts/seminar.py study --section 01-introduction --title 'Introduction'
pnpm build
pnpm check
pnpm verify
python3 scripts/seminar.py feedback --slide S002 --kind praise --text '이전 방법과 다음 방법을 연결하는 설명이 좋다.'
python3 scripts/seminar.py feedback --slide S002 --kind correction --text '대본 순서와 그림을 맞춰 달라.'
```

브라우저 검증은 `CHROME_PATH`를 지정하거나 설치된 Chrome/Playwright Chromium을 사용한다. 캡처는 `review/previews/<빌드지문>/`, 결과는 `review/BROWSER_CHECK.json`에 저장한다. 자동 검사는 화면·링크·대본 일치 등을 확인하며, 논문 사실과 발표의 자연스러움은 사람이 원문과 함께 확인한다.

## 실제 편집 원본과 출력

| 위치 | 역할 |
| --- | --- |
| `seminar.json` | 논문명·현재 상태·공부 위치·Part 이름·선택적 시간 |
| `study/` 또는 지정한 중앙 위키 | Section별 실제 공부·질문·수식·정정 |
| `sections/*.md` | 화면·단계·대본·출처의 유일한 발표 편집 원본 |
| `templates/` | 한 장·Section 공부·의미 검토 양식 |
| `index.html`, `presentation.html`, `part-*.html` | 그림·수학 글꼴을 내장한 오프라인 발표 |
| `SPEAKER_SCRIPT.md` | 원본과 같은 순서로 생성한 대본 |
| `review/FEEDBACK.md` | 수정 요청·긍정 평가·반영 상태 |
| `review/PROGRESS.md` | 진행 위치·검증·보류 사항 |
| `docs/` | 공통 제작 규칙과 이전 피드백 교훈 |

방향키로 단계/장을 넘기고, 뒤로 가면 이전 장의 마지막 단계로 들어간다. 페이지 번호로 이동하면 첫 단계부터 시작한다. 목차 G·전체 화면 F·그림 확대를 지원한다. 설명 메뉴와 N 단축키는 없다. 새 논문에는 RLDX의 모듈·수치·20분·장수·공개 권한을 복사하지 않는다.

## 안전한 정리

```sh
python3 scripts/seminar.py clean
python3 scripts/seminar.py clean --apply
```

첫 명령은 후보만 보여준다. 캐시와 피드백에서 참조하지 않는 구버전 검토 캡처만 정리한다. 최신 캡처·Git 추적 파일·공부·원문·대본·피드백·현재 발표HTML·의존성은 제거하지 않는다. 예약 삭제는 하지 않는다.

## 공개 후보 준비

내용·원문·실제 화면을 검토한 뒤 `seminar.json`의 `status`를 `ready`, 해당 장의 `draft`를 `false`로 갱신한다.

```sh
python3 scripts/seminar.py check --ready
python3 scripts/seminar.py package
```

`dist/`에는 공개 후보HTML만 들어간다. 원문 PDF·공부·피드백·대본은 발표HTML에 넣지 않는다. GitHub 저장소/Pages를 실제 생성·게시하는 것은 별도 작업이다. `deployment/github-pages.yml.example`은 비활성 예시이며 자동 게시하지 않는다.
