# RLDX-1 논문 HTML 세미나

아홉 섹션의 Markdown을 직접 편집해 오프라인 HTML 발표를 만든다. 이전 30장 제한은 해제됐으며, 설명의 순서와 단계별 흐름을 우선한다. 본문에 연결된 N 상세 해설에는 공부한 수식·예시·실험 조건·미해결 질문을 보존한다.

MD 입력 연결과 Figure 3 상호작용을 반영한 v04 초안을 만들었다. 실제 검증 결과는 [VALIDATION.md](review/VALIDATION.md), 진행 상태는 [PROGRESS.md](review/PROGRESS.md)를 확인한다. 이전 결과를 새 구현의 검증으로 간주하지 않는다.

## 발표 열기

[presentation.html](presentation.html)을 Chrome 또는 Edge에서 연다. 그림·CSS·JavaScript를 포함한 단일 HTML이다.

- `→` / `↓` / PageDown / Space / Enter: 다음 설명 단계 또는 다음 장.
- `←` / `↑` / PageUp / Backspace / Shift+Space: 이전 설명 단계 또는 이전 장.
- Home / End: 처음·마지막 장. 이전 장으로 돌아갈 때 단계 설명이 있는 장은 마지막 단계부터 역순으로 돌아간다.
- 슬라이드 빈 곳·본문 클릭: 다음 단계. 그림·확대 영역·조작 버튼은 원래 기능을 유지한다.
- `G`: 제목·본문 ID·상세 단위 ID로 목차 검색.
- `N`: 해당 장의 상세 공부 기록과 출처.
- 일반 그림 클릭: 확대. Esc: 대화상자 닫기 또는 전체 화면 종료. `F`: 전체 화면 전환.
- Figure 3: Vision Encoder·VLM 영역 확대와 순차 화살표 설명을 적용하는 대상. 화면의 안내와 클릭·방향키로 단계를 탐색하며, 전체 구조로 복귀한다. 13개 설명 단계를 클릭·방향키로 탐색한다.

표지는 Fig.1, Architecture overview는 Fig.2, 구조 설명은 Fig.3을 사용한다. 정확한 영어 섹션명·짧은 명사형 제목을 표시하고, 상단 우측 분류 표지는 제거한다. 원문 설명·저자 해석·우리 해석·예시·미해결의 구분은 본문과 출처에 유지한다.

## 내용 편집

[sections/README.md](sections/README.md)의 구조에 따라 다음 아홉 MD를 수정한다.

| 파일 | 섹션 |
| --- | --- |
| [01-problems.md](sections/01-problems.md) | Problems |
| [02-rldx-1-architecture.md](sections/02-rldx-1-architecture.md) | RLDX-1 Architecture |
| [03-training-data.md](sections/03-training-data.md) | Training Data |
| [04-training-procedure.md](sections/04-training-procedure.md) | Training Procedure |
| [05-inference-strategy.md](sections/05-inference-strategy.md) | Inference Strategy |
| [06-evaluation-and-analysis.md](sections/06-evaluation-and-analysis.md) | Evaluation and Analysis |
| [07-ablation-and-analysis.md](sections/07-ablation-and-analysis.md) | Ablation and Analysis |
| [08-conclusion.md](sections/08-conclusion.md) | Conclusion |
| [09-my-opinions-and-limitation.md](sections/09-my-opinions-and-limitation.md) | My opinions and limitation |

`## [P...]` 아래 본문·보충·요점·출처와 연결된 상세 공부 기록을 함께 관리한다. ID와 `source_ids`의 의미를 보존한다. Figure 3의 설명 문구는 Architecture MD의 확대 단계·화살표 설명에서 수정하고, 위치 설정은 [architecture-tour.json](content/architecture-tour.json)에 둔다. 수식은 별도 설명 장을 유지하며, `$...$`·`$$...$$` LaTeX 문법을 KaTeX로 렌더링한다. 한글 글꼴은 HTML에 내장한 나눔고딕이다.

[scripts/migrate_sections.py](scripts/migrate_sections.py)는 기존 JSON을 아홉 MD로 옮긴 **일회성 마이그레이터**다. 평소 편집·빌드에서 다시 실행하지 않는다. `--force`는 이후 MD 편집을 JSON으로 덮어쓸 수 있다. `content/main-*.json`과 기존 상세 JSON은 마이그레이션 스냅샷으로 남긴다.

## 생성과 화면 확인

Python 3, Node.js 22.12 이상, pnpm을 사용한다. Markdown 렌더링은 설치된 Slidev 의존성의 markdown-it·KaTeX를 재사용한다.

```sh
pnpm install --frozen-lockfile
python3 scripts/verify_sources.py
python3 scripts/build_deck.py
```

생성기는 MD를 읽어 [slides.md](slides.md), [presentation.html](presentation.html), [deck-manifest.json](content/deck-manifest.json)을 갱신한다. 생성 결과만 직접 고치면 재생성 시 덮어쓰이므로 MD를 수정한다. 표지는 생성기가 Fig.1로 구성한다. 원문 PDF의 참조 위치는 [PROJECT.md](PROJECT.md)에 있다.

Slidev는 정적 배치 검토용이다. Fig.3 상호작용과 G/N을 포함한 발표는 presentation.html을 사용한다. Slidev 개발 화면은 다음으로 연다.

```sh
pnpm dev
```

빌드·실제 화면 검증은 다음 명령을 사용한다. 명령을 나열한 것은 실행·통과 기록이 아니며, 현재 결과는 [검증 기록](review/VALIDATION.md)에 남긴다.

```sh
pnpm build
pnpm build --base /rldx-1-seminar/
node scripts/verify_deck.mjs
node scripts/verify_architecture.mjs
node scripts/verify_navigation.mjs
node scripts/verify_math_font.mjs
node scripts/verify_slidev.mjs
python3 scripts/package_pages.py
node scripts/verify_pages.mjs
```

브라우저 검사 스크립트는 macOS Chrome 경로를 사용한다. 다른 환경에서는 브라우저 경로를 확인한다. PNG는 실제 HTML에서 생성하고, 이전 미리보기는 새 버전의 검증 근거로 재사용하지 않는다. 장별 목록은 [SLIDE_INDEX.md](review/SLIDE_INDEX.md)를 참고한다.

## 파일 역할과 기록

| 경로 | 역할 |
| --- | --- |
| `sections/`의 아홉 MD | 본문·상세 공부 기록의 직접 편집 원본 |
| `content/main-*.json`·기존 상세 JSON | MD 전환 전 내용의 마이그레이션 스냅샷 |
| `content/architecture-tour.json` | Figure 3 카메라·화살표 위치 설정 |
| `scripts/build_deck.py`·`scripts/section_sources.py`·`scripts/render_markdown.mjs` | MD 입력과 HTML·Slidev 생성 |
| `scripts/architecture_markup.py`·`scripts/deck-runtime.js` | 구조 그림과 발표 인터랙션 |
| `slides.md`·`presentation.html`·`dist/` | 재생성 가능한 발표 결과 |
| `AGENTS.md`·`PROJECT.md`·`OUTLINE.md` | 제작 규칙·프로젝트 설정·발표 구성 |
| `review/FEEDBACK.md`·`review/PROGRESS.md` | 실제 피드백·버전·승인과 재개 기록 |
| `review/VALIDATION.md`·`qa/` | 실행한 검증과 재생성 가능한 결과 |
| `public/figures/`·`SOURCES.md` | 사용하는 원문 그림과 출처 |

Canva 작업은 취소됐다. 현재 원본과 결과물은 로컬 Markdown·HTML에서 관리한다. GitHub 저장소 생성·push·Pages 배포는 진행하지 않는다. 게시 준비 자료인 [GITHUB_PAGES.md](deployment/GITHUB_PAGES.md)와 [package_pages.py](scripts/package_pages.py)는 사용자가 직접 게시할 때의 안내·도구다. 이번 v02의 업로드 ZIP까지 로컬에서 준비했으며 실제 업로드·게시 설정은 하지 않았다.

공부 기록·원문·슬라이드 원본·피드백·승인 이력을 보존한다. 삭제나 공개를 자동으로 수행하는 작업은 없다. 이전 30장 구성과 초기 표지의 기록은 [OUTLINE.md](OUTLINE.md), [FEEDBACK.md](review/FEEDBACK.md), `review/versions/`에서 확인할 수 있다.
