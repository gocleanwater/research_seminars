# 논문 HTML 슬라이드 제작 틀

현재는 내용 없는 실행 확인 화면만 있다. 논문 내용은 함께 공부한 채팅에서 전체 목차를 정한 뒤 한 장씩 작성한다. Obsidian 설치 없이 사용할 수 있다.

## 시작

Node.js 22.12 이상과 pnpm이 필요하다. 프로젝트 폴더에서:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

터미널에 표시된 로컬 주소를 브라우저에서 연다. `slides.md`를 수정하면 화면에 반영된다. 키보드 좌우 화살표로 이동한다.

## 실제 화면을 PNG로 검토

첫 슬라이드의 미리보기:

```sh
pnpm capture --range 1
```

브라우저가 없다는 오류가 나오면 한 번만 `pnpm exec playwright install chromium`을 실행한다. macOS에 Chrome이 설치돼 있으면 다운로드 없이 다음 명령을 사용할 수 있다.

```sh
pnpm capture --range 1 --executable-path '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
```

결과는 `review/previews/`에 생성된다. `--with-clicks`로 단계별 표시 화면도 함께 내보낸다. 검토 요청 전 해당 결과를 `S001-v01`처럼 장 ID·버전에 맞춰 별도 이름으로 보존하고 `review/PROGRESS.md`에 실제 경로를 기록한다. 다시 내보내기 전 기존 버전 파일이 덮어써지지 않는지 확인한다.

PNG는 실제 슬라이드 화면에서 생성한다. 이미지 생성 모델로 발표 화면을 흉내 내지 않는다.

## 파일의 역할

| 파일 | 역할 |
| --- | --- |
| `AGENTS.md` | 다른 공부 채팅이 따라야 할 제작·검토·보존 규칙 |
| `PROJECT.md` | 원문과 공부 기록 위치, 제작 목적 |
| `OUTLINE.md` | 사용자와 협의할 전체 목차 |
| `slides.md` | 브라우저에서 보이는 슬라이드 원본 |
| `style.css` | 글꼴·색상·여백과 공통 스타일 |
| `templates/slide.md` | 한 장의 작성 양식 |
| `SOURCES.md` | 근거와 슬라이드 연결 |
| `review/PROGRESS.md` | 장별 버전·승인 상태·재개 위치 |
| `review/FEEDBACK.md` | 사용자 피드백과 수정 이력 |
| `public/figures/` | 발표에 실제 사용하는 그림 |
| `deployment/github-pages.yml.example` | 향후 공개할 때 검토할 수동 배포 양식 |

## 빌드 검증

```sh
pnpm build
pnpm build --base /new-paper-seminar/
```

빌드 결과는 `dist/`이며 Markdown·Vue·CSS를 정적 HTML/JS/CSS로 변환한다. 공개 빌드는 발표자 노트를 제외하지만, 공개 Git 저장소에 커밋한 소스 자체는 숨기지 않는다.

## GitHub Pages는 나중에

현재 원격 저장소와 공개 사이트는 없다. `deployment/`의 양식은 활성 워크플로가 아니며 자동 배포하지 않는다. 공개할 파일과 저장소 이름을 정한 뒤 양식을 `.github/workflows/pages.yml`로 복사하고 GitHub Pages에서 GitHub Actions를 선택한다. 승인 후 수동 실행한다. 저장소 이름을 바꾸면 base 경로와 공개 주소도 확인한다.

## 보존

공부 기록, 슬라이드 원본, 피드백과 승인 기록을 보존한다. 빌드·PNG 미리보기는 재생성할 수 있다. 이 틀에는 파일을 자동 삭제하는 도구나 예약 작업이 없다.
