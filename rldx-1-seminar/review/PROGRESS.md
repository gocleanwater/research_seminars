# 슬라이드 제작 진행 상황

- 업데이트: 2026-11-05 / v04
- 현재 단계: PPT 방식의 키·클릭 탐색과 Fig.3 역방향 진입 보완. v04 조작 검증 / 사용자 검토 대기.
- 편집 원본: sections/01-problems.md–09-my-opinions-and-limitation.md. sections/README.md에 문서 구조와 수정 방법을 기록했다.
- 결과물: presentation.html, slides.md, review/SLIDE_INDEX.md. MD 9개 → 생성기 → 두 결과물을 갱신한다. JSON은 이전 내용의 스냅샷이다.
- 현재 구성: 표지를 포함한 기본 화면30개. P032 안에 전체→Vision Encoder→전체→VLM→전체의13단계를 따로 둔다. 장수 제한은 없으며 다음 수정에서 설명에 맞춰 늘릴 수 있다.
- 상세 공부 기록: S002–S122 121단위를 중복·누락 없이 N 상세 해설에 연결했다. 원문 설명·저자 해석·우리 해석·예시·미해결 구분을 해설에 표시한다.
- 최신 반영: Fig.1 표지, Fig.2 overview, Fig.3 확대·단계별 화살표8개, 영어9섹션명, 짧은 명사형 제목, 우상단 분류표지 제거, Conclusion→의견·한계 순서.
- 승인 상태: 이전 목차 승인만 기록. 이번 v04 결과물은 아직 개별 승인되지 않았다.
- 다음 작업: 실제 HTML을 보며 사용자가 지목한 장·설명 단계를 수정하고 피드백을 해당 ID와 버전에 연결한다.
- 공개: Canva 작업은 취소. GitHub 저장소 생성·push·Pages 배포 없음. 사용자가 직접 올릴 ZIP과 안내만 준비했다.

## v04 발표 조작

- →/↓/PageDown/Space/Enter는 다음 단계, ←/↑/PageUp/Backspace/Shift+Space는 이전 단계다. Home/End는 처음/마지막 장이다.
- Fig.3 다음 장에서 ←로 돌아오면 마지막 설명 단계부터 역순으로 돌아간다. 빈 슬라이드/본문 클릭도 다음 단계로 이동한다.
- 그림 클릭 확대·도식 버튼·텍스트 선택·검색 입력·버튼 Enter/Space는 기존 기능을 유지한다.
- Esc는 검색어가 있어도 맨 위 대화상자를 한 번에 닫고, 전체 화면에서는 전체 화면을 종료한다. F로 전체 화면을 전환한다.
- 조작 소스·이전 진행/검증은 review/versions/before-navigation-v04/에 보존했다. 시각 구성은 v03과 동일하므로 기본 화면 PNG 표는 v03을 유지하며 Fig.3 단계 PNG는 architecture-v04에도 생성한다.

## v03 수식·글꼴

- 기존 수식53개를 $$ LaTeX $$로, 인라인 수식을 $...$로 전환했다. HTML sub/sup과 pseudo-equation은 MD 원본에서 제거했다.
- 본문·표지·해설·조작부에 나눔고딕 Regular/Bold/ExtraBold를 적용하고 수정하지 않은 폰트 원본을 내장했다. 수학 기호는 KaTeX 글꼴을 사용한다.
- Chrome CDP로 한글28글리프가 실제 NanumGothicBold 웹폰트로 그려지는 것을 확인했다.3개 Nanum 폰트가 모두 로드된다.
- 글꼴 변경으로 넘친 P013/P016/P019는 그림과 설명의 열 비율을 조정했다. 글자 크기·내용은 줄이지 않았다.
- 이전 v02 원본·진행·검증은 review/versions/before-math-v03/에 보존했다.

## 실제 검증과 파일

- 전체 기본 화면30개: Chrome 1280×720 PNG 저장, 넘침0·이미지 로드 실패0·브라우저 오류0·외부 HTTP 요청0. G/N/이동/그림 확대 확인.
- Fig.3:13단계·화살표8개, 클릭·방향키·이전·전체복귀·다음장 이동·hash 재진입·reduced-motion·해설 확인. 각 단계 PNG 직접 검토.
- MD: 9파일,29본문,121상세 및 그림 복원 확인. 큰 한글 입력의 UTF-8 왕복 검증으로 중간바이트 경계에서 문자가 깨지는 생성 문제를 고쳤다.
- 기본/base Slidev 빌드 및 base의30개 실제 URL 확인. Slidev는 정적 배치 검토용이며, Fig.3·G/N을 포함한 발표는 presentation.html을 사용한다.
- 게시용 ZIP은 index.html·.nojekyll·rldx-1-seminar/index.html 세 파일만 포함. 발표 HTML이 원본과 바이트 단위로 같고 /research_seminar/rldx-1-seminar/ 하위 경로에서도 기능이 동작한다.
- 명령·보고서는 review/VALIDATION.md, qa/full-deck/에 있다. 이전 기록은 review/versions/PROGRESS-before-figure3.md에 보존했다.

## 장별 상태

| ID | 순서 | 제목 | 버전 | 상태 | PNG | 승인 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| S001 | 1 | RLDX-1 Technical Report | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/S001-v03.png | 없음 |
| P002 | 2 | 기존 VLA의 문제 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P002-v03.png | 없음 |
| P031 | 3 | RLDX-1 Overview | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P031-v03.png | 없음 |
| P032 | 4 | RLDX-1 Architecture | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P032-v03.png | 없음 |
| P005 | 5 | Memory Module | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P005-v03.png | 없음 |
| P009 | 6 | MSAT의 입력 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P009-v03.png | 없음 |
| P010 | 7 | MSAT의 Joint Attention | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P010-v03.png | 없음 |
| P011 | 8 | MSAT의 Stream 구성 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P011-v03.png | 없음 |
| P012 | 9 | MSAT의 블록 구성 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P012-v03.png | 없음 |
| P006 | 10 | Action Model의 행동 생성 원리 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P006-v03.png | 없음 |
| P007 | 11 | Action Model의 학습 수식 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P007-v03.png | 없음 |
| P008 | 12 | Action Model의 추론 수식 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P008-v03.png | 없음 |
| P013 | 13 | 학습 데이터 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P013-v03.png | 없음 |
| P014 | 14 | Task·Scene Augmentation | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P014-v03.png | 없음 |
| P015 | 15 | 합성 데이터 검증 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P015-v03.png | 없음 |
| P016 | 16 | Pre-training | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P016-v03.png | 없음 |
| P017 | 17 | Mid-training | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P017-v03.png | 없음 |
| P018 | 18 | Post-training | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P018-v03.png | 없음 |
| P019 | 19 | RECAP | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P019-v03.png | 없음 |
| P020 | 20 | CUDA Graph | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P020-v03.png | 없음 |
| P021 | 21 | Kernel Optimization | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P021-v03.png | 없음 |
| P022 | 22 | Simulation Experiments | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P022-v03.png | 없음 |
| P023 | 23 | OpenArm | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P023-v03.png | 없음 |
| P024 | 24 | ALLEX | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P024-v03.png | 없음 |
| P025 | 25 | Franka | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P025-v03.png | 없음 |
| P026 | 26 | Ablation | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P026-v03.png | 없음 |
| P027 | 27 | RL·추론 지연 분석 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P027-v03.png | 없음 |
| P029 | 28 | Conclusion | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P029-v03.png | 없음 |
| P028 | 29 | 나의 의견 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P028-v03.png | 없음 |
| P030 | 30 | 한계와 미해결 질문 | v03 | 수정 초안 · 검토 전 | review/previews/deck-v03/P030-v03.png | 없음 |

Fig.3 상세 미리보기: review/previews/architecture-v03/step-00.png–step-12.png. 전체 미리보기: review/previews/deck-v03/overview-1.png·overview-2.png.

## 재개 시 읽을 것

AGENTS.md → PROJECT.md → 이 파일 → FEEDBACK.md → sections/README.md → 해당 섹션 MD. 발표 문구·상세 기록은 MD를 수정하고 python3 scripts/build_deck.py로 생성한다. 표지는 content/cover.html, Fig.3 좌표는 content/architecture-tour.json이다. 생성 HTML만 수정하지 않는다.
