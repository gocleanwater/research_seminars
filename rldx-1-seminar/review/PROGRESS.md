# 슬라이드 제작 진행 상황

## 2026-11-17 / v34 / Part1 최종 정리·Part2 보류

- 사용자 요청: Part1의 마지막 장에 최종 정리. Part2는 처음 보는 청중도 이해하도록 Part1 내용을 직관적으로 요약할 예정이지만, 그 수정은 나중에 진행한다.
- 반영: 기존 마지막 P037 뒤에 P096 “Part1 최종 정리”를 추가했다. 관측→이해·기억→행동 생성→실행 흐름과 필요성·데이터·단계별 학습을 한 화면에 연결하고 같은 순서로 말하는 대본을 작성했다.
- 현재 전체47장·Part1 18장·Part2 29장이다. 요약은 기존 내용의 연결이며121개 원본 상세 기록을 중복 배정하지 않았다. Part2의29개 DECK 항목(제목·해설·상세 HTML)과 로컬 대본이 변경 전과 동일함을 비교했다.
- 검증: 실제47장 Chromium 화면/탐색·Part 분리/번호·대본 순서·소스 검사와 Part export 단위검사3개 통과. 정리 화면 PNG를 직접 확인했고 넘침·브라우저 오류·외부 요청은 없었다. 적용 H02/H05/H06/H21/H22/H23/H24. 사용자 결과물 검토 전이다.


## 2026-11-17 / v33 / Part 분리와 Figure3 맥락 설명

- 사용자 요청: 기존23쪽까지 Part1, 나머지는 Part2. 기존5–10쪽의 내용을4쪽 그림의 중간 설명에 넣고 화면 문장을 대본과 가깝게, 간단한 그림과 함께 설명할 것. 후속 질문에 “4쪽에 통합하고 중복 페이지는 제외”를 선택했다.
- 반영: 기존23쪽 P037을 경계로 고정했다. 통합 후 전체46장, Part1 17장(P037까지), Part2 29장(P020부터)이다. 전체본과 별도 HTML·대본을 함께 제공한다.
- P051/P009/P010/P006/P008/P071의 설명은 P032 안에13개 카드를 삽입해40단계로 구성했다. VQA→입력/시간→joint attention→학습→Euler 생성→실제 실행 순으로 해당 원문 영역과 작은 흐름도·수식을 함께 보여준다.
- 원래 상세121단위의 제목·메타데이터·본문은 전후 대조에서 동일하다. 퇴역 링크는 해당 설명 단계로 연결한다. 변경 전 소스와 대본은 review/versions/before-parts-v33/에 보존한다.
- 적용: H05/H06/H10/H12/H13/H21/H22/H23/H24. 결과물의 사용자 검토는 아직 받지 않았다. 검증 내역과 대응표는 review/PARTS_AND_ARCHITECTURE.md.


## 2026-11-17 / v32 / 물리 센싱과 힘 조절 예시 구분

- 사용자 정정: 힘 조절은 예시이며 상위 개념은 물리 센싱이다. 제안한 “03 · 물리 센싱”, “물리적 상태 감지 능력 부족” 표현으로 변경하도록 요청했다.
- 반영: 세 번째 카드 제목·아래 문구·4/5 단계 이름·하단 설명과 대본을 수정했다. 집기 그림은 유지하며 감지 능력과 그 정보를 쓰는 조작 예시를 구분한다. 다른 카드와 상세 공부 기록은 보존한다.
- 검증: verify_problems.mjs의5단계·문구·그림·경계·탐색과 verify_speaker_script.py 통과. 실제4/5 화면을 직접 확인했다. 사용자 결과물 검토 전이다.
- 화면: review/previews/problems-v32/P002-step-4.png. 적용 H07/H08/H13/H21/H23/H24.


## 2026-11-17 / v31 / P002 야바위와 집기 힘 조절

- 사용자 브라우저 요청1: 기억 카드도 글 대신 야바위 상황을 간단한 그림으로 보여줄 것.
- 사용자 브라우저 요청2: 접촉부 가림 대신 물체를 집을 때 필요한 조작으로 설명하고 그림으로 바꿀 것. 가림만의 문제가 아니라 적절한 집기 힘도 중요하다는 범위로 설명한다.
- 반영: 두 번째 SVG에 공 숨기기→컵 섞기→어느 컵인지 판단하는 상황을 넣고 “과거를 기억하는 능력 부족”으로 표시했다. 세 번째 SVG는 약한 힘의 놓침/강한 힘의 손상이며 “힘을 조절하는 능력 부족”으로 표시했다. 두 그림은 설명용 예시다.
- 대응:3/5·4/5의 하단 설명·발표 메모·별도 대본을 실제 그림 순서에 맞췄다. 첫 번째 컨베이어 카드와 기존 상세 공부 기록은 변경하지 않았다.5단계 조작과 전체52장은 유지한다.
- 검증: verify_problems.mjs의5단계·세SVG·문구·카드/본문 경계·정방향/역방향/페이지입력, verify_speaker_script.py 통과. 실제 정리 화면 PNG를 직접 확인했다. 사용자 결과물 검토 전이다.
- 화면: review/previews/problems-v31/P002-step-3.png, P002-step-4.png, P002-step-5.png. 적용 H05/H07/H08/H10/H21/H23/H24.


## 2026-11-17 / v30 / P002 움직임 카드의 컨베이어 그림

- 사용자 브라우저 피드백: 첫 카드의 글 중심 설명 대신 컨베이어의 움직이는 물체를 잘 읽지 못하는 상황을 간단한 그림으로 표시하고, “움직임 인식”을 “움직임을 읽는 능력 부족”으로 바꿀 것.
- 반영: 원본 Section MD에 편집 가능한 SVG를 넣었다. 물체의 이전 위치는 점선, 이동한 물체는 오른쪽 실선 상자, 손은 이전 위치, 벨트 이동은 화살표로 표시한다. 원문 실험 이미지가 아닌 설명용 예시다.
- 카드와2/5 하단 설명을 요청한 부족함 표현으로 바꾸고 대본도 점선 위치→오른쪽 물체→이전 위치로 향한 손 순서로 맞췄다. 두 번째·세 번째 카드와5단계 조작은 변경하지 않았다.
- 검증: 실제5단계 PNG, 컨베이어 SVG·문구·경계·정방향/역방향/페이지입력, 대본 대응 검증 통과. 이전 상세 공부 기록을 보존한다. 사용자 결과물 검토 전이다.
- 화면: review/previews/problems-v30/P002-step-2.png. 적용 규칙 H05/H08/H10/H21/H23/H24.


## 2026-11-17 / v29 / P002 화면·대본 정렬

- 사용자 요청: 기존 VLA 문제 장부터 화면과 대본을 맞추고, 말하는 순서대로 표시할 것. 후속 지시로 화면과 발화에서 VLM 구분을 빼고 VLA만 설명한다.
- P002 한 장에서 VLA 정의→움직임→기억→접촉→세 능력 정리의5상태로 설명한다. 카드에는 질문·예시·필요한 능력만 남기고 자세한 이유는 대본에 둔다.
- 다음/이전 키·버튼·빈 화면 클릭으로 같은 장의 단계를 이동한다. 다음 장에서 돌아오면 마지막 상태, 페이지 번호2로 이동하면 첫 상태다. 그림 확대·입력·기존 Fig.3의27상태는 유지한다.
- 편집 원본: sections/01-problems.md, SPEAKER_SCRIPT.md의 P002. 화면 로직은 scripts/deck-runtime.js, P002 전용 스타일은 deck.css. 다른51장과 기존121개 상세 공부 기록은 보존한다.
- 검증: verify_problems.mjs의5상태·화면VLA단일용어·카드/본문 경계·정방향/역방향/번호이동·5PNG, verify_speaker_script.py, verify_sources.py, 기존 verify_navigation.mjs·verify_architecture.mjs, 프로젝트base빌드가 통과했다. 실제 첫/정리 화면을 확인한다.
- 미리보기: review/previews/problems-v29/P002-step-1.png–P002-step-5.png. 이전 원본은 review/versions/before-problems-v29/에 보존했다. 구현·검증 완료와 사용자 결과물 승인은 별개이며 현재 검토 전이다.


- 업데이트: 2026-11-06 / v28
- 현재 단계: Table1 전체·최강 baseline 차이 표시 / 검증 완료·자동 게시.
- 발표 대본: SPEAKER_SCRIPT.md v01 전체 작성.52장 번호·제목·ID,4쪽27단계·조작/발화, 수식/수치·근거 대조. 기존 발표 v28은 유지하며 대본 초안은 사용자 검토 전이다. review/SCRIPT_REVIEW.md를 따른다.
- 후속 수정: 모바일 하단 메뉴의1행/2행 반응형·44px 터치 영역·실제 메뉴 높이에 따른 슬라이드 fit을 적용했다. 검증은 VALIDATION.md의 모바일 항목에 기록한다.
- 구성: 기본52장(표지+본문51장), P032 내부27상태·18화살표 유지.
- 원본: 9개 섹션 MD. S002–S122의121개 상세 단위는 각각 한 번 연결되며 통합 전과 내용이 같다.
- 통합: P056·P057·P058→P032 Memory 발표 대본; P059 비교 요약 제외; P052·P053·P054·P055→P032 VLM 발표 대본; P048·P049·P050→P032 Vision 발표 대본; P005→P032, P007→P006, P011·P036→P032 MSAT 대본, P021→P038. P012→P009/P010의 기존 통합도 유지한다.
- 흐름: Fig.3→Vision·Motion·VLM/VQA·cognition·시간 압축·Memory→MSAT 마지막 대본의 입출력 경로→MSAT 입력→내부 연산→학습 원리→추론 갱신→데이터→학습→실행 최적화→평가/분석→결론→의견/미해결.
- 원리와 검증은 분리 유지. Conclusion의 기여 반복을 줄이고 의견은 본문 설계·구성 요소별 검증에 집중한다.
- 원본 기록 보존: review/versions/before-dedup-v07/; 통합 근거와 계획: review/DEDUPLICATION.md.
- 게시 정책: 수정·검증 후 추가 확인 없이 commit·push한다. 변경 전 상태는 Git 태그로 보존하며 review/ROLLBACK.md에서 확인·복구 방법을 설명한다.
- 승인: 수정 요청과 결과물 개별 승인을 구분한다. v28은 검토 전이다.

## 검증

- v28: Table1(a)/(b)의 전체78칸·최강 baseline 차이13개를 P022/P095로 표시한다. 전체52장·상세121개·Fig.3의27상태/18화살표 유지.
- 소스·52장 화면·표 수치/차이·기존 링크·탐색·기본/base 빌드·게시 패키지 검증 통과. 넘침·cell 잘림·이미지 실패·브라우저 오류·외부 요청0. 실제 결과는 review/VALIDATION.md의 v28 항목에 기록한다.

## 기본 화면

| 순서 | ID | 제목 | 버전 | 상태 | PNG |
| --- | --- | --- | --- | --- | --- |
| 1 | S001 | RLDX-1 Technical Report | v28 | 검토 전 | review/previews/deck-v28/S001-v28.png |
| 2 | P002 | 기존 VLA의 문제 | v28 | 검토 전 | review/previews/deck-v28/P002-v28.png |
| 3 | P031 | RLDX-1 Overview | v28 | 검토 전 | review/previews/deck-v28/P031-v28.png |
| 4 | P032 | RLDX-1 Architecture | v28 | 검토 전 | review/previews/deck-v28/P032-v28.png |
| 5 | P051 | VLM과 로봇 VQA | v28 | 검토 전 | review/previews/deck-v28/P051-v28.png |
| 6 | P009 | MSAT의 입력 | v28 | 검토 전 | review/previews/deck-v28/P009-v28.png |
| 7 | P010 | MSAT의 Joint Attention | v28 | 검토 전 | review/previews/deck-v28/P010-v28.png |
| 8 | P006 | Action Model의 학습 원리 | v28 | 검토 전 | review/previews/deck-v28/P006-v28.png |
| 9 | P008 | Action Model의 추론 수식 | v28 | 검토 전 | review/previews/deck-v28/P008-v28.png |
| 10 | P071 | Action Chunk의 실행 | v28 | 검토 전 | review/previews/deck-v28/P071-v28.png |
| 11 | P013 | 학습 데이터 | v28 | 검토 전 | review/previews/deck-v28/P013-v28.png |
| 12 | P033 | 공개 실제 데이터 | v28 | 검토 전 | review/previews/deck-v28/P033-v28.png |
| 13 | P034 | 자체 실제 데이터 | v28 | 검토 전 | review/previews/deck-v28/P034-v28.png |
| 14 | P072 | 로봇 영상 생성 모델 | v28 | 검토 전 | review/previews/deck-v28/P072-v28.png |
| 15 | P014 | Task·Scene Augmentation | v28 | 검토 전 | review/previews/deck-v28/P014-v28.png |
| 16 | P015 | 합성 데이터 검증 | v28 | 검토 전 | review/previews/deck-v28/P015-v28.png |
| 17 | P047 | 일치 검사기의 학습 | v28 | 검토 전 | review/previews/deck-v28/P047-v28.png |
| 18 | P035 | 학습 단계 | v28 | 검토 전 | review/previews/deck-v28/P035-v28.png |
| 19 | P016 | Pre-training | v28 | 검토 전 | review/previews/deck-v28/P016-v28.png |
| 20 | P017 | Mid-training | v28 | 검토 전 | review/previews/deck-v28/P017-v28.png |
| 21 | P018 | Post-training | v28 | 검토 전 | review/previews/deck-v28/P018-v28.png |
| 22 | P019 | RECAP | v28 | 검토 전 | review/previews/deck-v28/P019-v28.png |
| 23 | P037 | Critic과 Figure 8 | v28 | 검토 전 | review/previews/deck-v28/P037-v28.png |
| 24 | P020 | CUDA Graph | v28 | 검토 전 | review/previews/deck-v28/P020-v28.png |
| 25 | P038 | Kernel Fusion | v28 | 검토 전 | review/previews/deck-v28/P038-v28.png |
| 26 | P039 | Kernel Fusion의 계산 | v28 | 검토 전 | review/previews/deck-v28/P039-v28.png |
| 27 | P040 | 시뮬레이션 벤치마크 | v28 | 검토 전 | review/previews/deck-v28/P040-v28.png |
| 28 | P022 | Simulation 결과 (a) | v28 | 검토 전 | review/previews/deck-v28/P022-v28.png |
| 29 | P095 | Simulation 결과 (b) | v28 | 검토 전 | review/previews/deck-v28/P095-v28.png |
| 30 | P041 | 실제 로봇 | v28 | 검토 전 | review/previews/deck-v28/P041-v28.png |
| 31 | P042 | OpenArm 과제 | v28 | 검토 전 | review/previews/deck-v28/P042-v28.png |
| 32 | P023 | OpenArm 결과 | v28 | 검토 전 | review/previews/deck-v28/P023-v28.png |
| 33 | P043 | ALLEX 과제 | v28 | 검토 전 | review/previews/deck-v28/P043-v28.png |
| 34 | P024 | ALLEX 결과 | v28 | 검토 전 | review/previews/deck-v28/P024-v28.png |
| 35 | P044 | Franka 과제 | v28 | 검토 전 | review/previews/deck-v28/P044-v28.png |
| 36 | P025 | Franka 결과 | v28 | 검토 전 | review/previews/deck-v28/P025-v28.png |
| 37 | P026 | Ablation and Analysis | v28 | 검토 전 | review/previews/deck-v28/P026-v28.png |
| 38 | P060 | VLM의 특징 추출 층 | v28 | 검토 전 | review/previews/deck-v28/P060-v28.png |
| 39 | P061 | 로봇 VQA의 효과 | v28 | 검토 전 | review/previews/deck-v28/P061-v28.png |
| 40 | P062 | VQA 전후의 Attention | v28 | 검토 전 | review/previews/deck-v28/P062-v28.png |
| 41 | P063 | 합성 데이터 규모 실험 | v28 | 검토 전 | review/previews/deck-v28/P063-v28.png |
| 42 | P064 | 합성 데이터의 성능 효과 | v28 | 검토 전 | review/previews/deck-v28/P064-v28.png |
| 43 | P065 | RL 평가 작업 | v28 | 검토 전 | review/previews/deck-v28/P065-v28.png |
| 44 | P070 | RECAP 결과의 지표 | v28 | 검토 전 | review/previews/deck-v28/P070-v28.png |
| 45 | P066 | RECAP 반복 결과 | v28 | 검토 전 | review/previews/deck-v28/P066-v28.png |
| 46 | P067 | RECAP 개선의 의미 | v28 | 검토 전 | review/previews/deck-v28/P067-v28.png |
| 47 | P027 | 추론 지연 측정 | v28 | 검토 전 | review/previews/deck-v28/P027-v28.png |
| 48 | P068 | 추론 최적화의 단계별 효과 | v28 | 검토 전 | review/previews/deck-v28/P068-v28.png |
| 49 | P069 | 추론 최적화의 해석 | v28 | 검토 전 | review/previews/deck-v28/P069-v28.png |
| 50 | P029 | Conclusion | v28 | 검토 전 | review/previews/deck-v28/P029-v28.png |
| 51 | P028 | 나의 의견 | v28 | 검토 전 | review/previews/deck-v28/P028-v28.png |
| 52 | P030 | 한계와 미해결 질문 | v28 | 검토 전 | review/previews/deck-v28/P030-v28.png |

Fig.3의 실제 상태 PNG는 review/previews/architecture-v13/step-00.png–step-26.png다. 세 토큰은08, VLM은11, Memory는17, MSAT입력은22, 처리·출력은25에서 볼 수 있다.

## 재개

AGENTS.md → PROJECT.md → 이 파일 → FEEDBACK.md → sections/README.md → 해당 MD. 생성 HTML만 직접 고치지 않는다. 사용자가 공개를 직접 관리한다.


## 2026-11-05 / P032 / MSAT 확대 하단 연결부

- 사용자 요청: MSAT 확대 시 아래 Tactile/Torque와 원문의 ⨁ 기호가 함께 보여야 한다.
- 반영: MSAT 소개·입력·블록 설명의 7개 상태에서 하단까지 카메라를 확장했다. 원문 기호는 그대로 유지하고, 인접 Memory 제목의 일부가 잘려 나타나지 않도록 표시 영역을 조정했다.
- 검증: 실제 Chrome PNG에서 두 요소를 확인했다. 27개 상태의 경계·4모듈 조작·정방향/역방향 검사를 통과했다. 기본/base 빌드 성공, 생성 HTML/index 및 게시용 ZIP 갱신.
- PNG: review/previews/architecture-v05/step-19.png·step-22.png. 사용자 검토 전이며 commit/push는 하지 않았다.

## 2026-11-05 / 게시 승인

- 사용자가 현재 변경 사항의 commit과 push를 명시적으로 요청했다. 이전의 로컬 작업만 허용한 범위는 이번 게시에 한해 변경됐다.
- 커밋 전 원본 검증, 27상태 아키텍처 검증, 로컬 Pages 경로·본문·해설 검증을 다시 통과했다. 게시 대상은 현재 P032 후속 수정·검증 코드·기록·생성 HTML/ZIP이다.

## v07 검토 결과

사용자의 전체 중복 통합 및 페이지 축소 요청을 반영해 v06의29→25장으로 구성했다. 원리와 측정 결과는 역할을 구분해 남겼다. 실제 HTML과 PNG를 준비했으며 사용자 결과물 검토 전이다. 이번 변경은 commit/push하지 않았다.

## 2026-11-05 / v07 게시 요청

사용자가 “push해”라고 명시했다. 커밋 전9개MD·121개상세·25장구성,탐색/통합링크,로컬Pages경로를 재검증했고 발표HTML과 두 게시용HTML이 동일함을 확인했다. 이번 누적 수정의 commit/push를 진행한다. 이전의 로컬 검토본 표시는 게시 승인 전 이력이다.

## 2026-11-05 / P006 / 기호 표·손실 해석 후속

- Comment1: t/τ 구분 문단을 본문에서 빼고 기호 표(a, ε, τ)를 배치했다. 시간 구분의 자세한 설명은 기존 N 해설에 보존한다.
- Comment2: 원문 PDF p.8 Sec.2.2를 확인해 제목을 “Noisy action chunk”로 바꿨다. 정답·노이즈의 선형 보간으로 학습 입력을 만드는 식이다.
- Comment3: 본문의 c_t 정의를 제거했다. 수식 속 조건 입력 기호는 유지한다.
- Comment4: 숫자 예시 대신 u_θ=예측 변화율, v*=정답 변화율 및 좌표별 오차 제곱합으로 loss를 전개했다. 아래첨자2=L2 norm, 위첨자2=norm 제곱을 설명한다.
- 25장과121개 상세 공부 기록은 유지한다. 상세 단위의 제목·내용 지문은 통합 전과 동일하다.
- 검증: verify_sources, 실제25장PNG(넘침/오류/외부요청0), KaTeX·Nanum 글리프·상세 수식 너비, 기본/base 빌드 통과. 생성HTML·게시index·ZIP 갱신 및 세HTML 동일성 확인.
- 실제PNG: review/previews/deck-v07/P006-loss-v07.png. 사용자 결과물 검토 전이며 이번 수정은 commit/push하지 않았다.

## 2026-11-05 / P006 / u_θ 직접 annotation

- 최신 사용자 요청: 수식의 u_θ 자체를 설명하고 직접 annotation을 붙일 것.
- 반영: u_θ를 청록색으로 강조하고 바로 아래 underbrace에 MSAT를 표시했다. 같은 색 주석 상자에서 u_θ는 학습 가능한 neural vector field(신경망), θ는 학습 가중치라고 설명한다.
- 함수 u_θ 자체와 함수 평가값 u_θ(a^τ,τ,c_t)=chunk 전체의 예측 변화율을 구별했다. 이전의 ‘u_θ=예측 변화율’은 함수 출력을 줄여 말한 표현이며 최신 화면에서는 이를 명시적으로 구분한다.
- 좌표별 loss 전개·norm 설명과 숫자 예시는 기존 N 상세에 보존한다. c_t 정의나 물리시간 구분을 본문에 다시 넣지 않았다.
- 검증: 25장 PNG 넘침/브라우저 오류/외부 요청0, KaTeX underbrace·Nanum 글리프·상세 수식 검사, 기본/base 빌드 통과. 121개 상세 단위 지문 및 세 HTML 동일성 확인.
- 실제PNG: review/previews/deck-v07/P006-annotation-v07.png. 로컬 검토본이며 이번 commit/push는 하지 않았다.

## 2026-11-05 / 자동 commit·push 지시

- 사용자 원문: “그냥 수정하자마자 push 바로바로 해줘”. 이 프로젝트의 수정은 검증 후 별도 게시 질문 없이 commit·push한다.
- 현재 P006의 noisy action chunk 용어·기호 표·u_θ 직접 annotation 수정도 포함한다. source/수식/글꼴/로컬Pages 검증을 다시 통과했다.
- 기존 ‘아직 push 전’ 기록은 당시 상태다. Pages 실제 배포 완료와 원격 push 완료는 구별한다.

## 2026-11-05 / P006 / clean a와 noisy a^τ 구분

- 사용자 지적: a는 정답이어도 a^τ는 noisy action인데 표에 a만 정의하면 혼동할 수 있다.
- 반영: 표에 a=정답(clean) action chunk, a^τ=노이즈가 섞인 action chunk를 각각 표시했다. 도입문도 정답 a로 입력 a^τ를 구성한다고 구분했다.
- 경계 조건 τ=1이면 a^τ=a를 명시해 noisy라는 이름을 끝점까지 오해하지 않도록 했다. 기존 표 헤더를 행별 기호 표로 바꾸고 글꼴 크기는 유지했다.
- 검증:25장PNG 넘침/이미지실패/브라우저오류/외부요청0,소스매핑/KaTeX생성,기본/base빌드 통과. 상세121개내용지문과3개HTML동일성 확인.
- 실제PNG: review/previews/deck-v07/P006-symbols-v07.png. 최신 자동commit/push 지시에 따라 게시한다.

## 2026-11-05 / P008 / 갱신식 한 줄 합치기

- 사용자 요청: 두 줄로 나뉜 action chunk 갱신식을 합칠 것.
- 반영: a^{τ_{i+1}}=a^{τ_i}+Δτ_i u_θ(...)를 한 줄로 표시했다. Δτ_i의 정의는 위 행에 유지한다. 수식 내용·글꼴 크기는 유지한다.
- 검증:25장PNG 넘침/이미지/브라우저오류0,소스매핑·KaTeX생성·기본/base빌드 통과. 실제P008 PNG를 직접 확인했다. 최신 자동게시 지시에 따라 commit/push한다.

## 2026-11-05 / P008 / 숫자 예시 대신 수식 항 설명

- 사용자 요청: 숫자 예시를 빼고 수식에 대한 설명을 넣을 것.
- 반영: 현재 action chunk, 신경망이 예측한 변화율, denoising 간격을 곱한 갱신량, 갱신 후 chunk를 기호별 표로 설명했다. 직전 한 줄 갱신식은 유지했다.
- 이전 0/4/0.25 숫자 예시는 N 해설에 보존했다. 상세121개 단위 내용은 변경하지 않았다.
- 검증:25장 PNG 넘침/이미지실패/오류/외부요청0,소스매핑·KaTeX생성·기본/base빌드 통과. 게시용3HTML동일성 확인. 실제PNG: review/previews/deck-v07/P008-terms-v07.png.
- 사용자 자동게시 지시에 따라 commit/push한다.

## 2026-11-05 / P008 / 미래 센서 수식 중앙 정렬

- 사용자 지적: 오른쪽 미래 센서 식이 상자 우측에 밀착되어 있음.
- 원인: aligned의 긴 둘째 줄 설명에 맞춰 첫 줄 등호가 정렬되며 식이 오른쪽으로 밀렸다.
- 수정: 해당 블록만 gathered로 바꿔 각 줄을 독립적으로 중앙 정렬했다. 수식 내용·글꼴 크기·직전 왼쪽 설명 표는 유지했다.
- 검증: 실제25장PNG 넘침/이미지/브라우저오류/외부요청0,소스·KaTeX생성·기본/base빌드 통과. 실제P008 PNG에서 양쪽 여백 확인. 세HTML동일성 확인 후 자동commit/push.
- PNG: review/previews/deck-v07/P008-sensor-alignment-v07.png.

## 2026-11-05 / 전체 / 자간0·타이포그래피 v08

- 사용자 요청: “자간을 0으로 두고 깨진 데 있나 봐줘. 그리고 있으면 이쁘게 수정해줘”.
- 반영: deck.css 3곳·style.css 8곳의 명시적 letter-spacing을0으로 바꿨다. 나눔고딕·글자 크기·내용·페이지 수는 유지했다.
- 실제25장 PNG·27개Fig.3확대 상태에서 넘침·겹침·이미지 실패·브라우저 오류는0이었다. 제목 모두 한 줄이며 제목 텍스트가 영역 안에 들어가고 표지도 그림/바닥글과 겹치지 않는다. 추가 문구 삭제나 배치 변경은 필요하지 않았다.
- 소스·수식·실제Nanum글리프·상세 수식 너비·기본/base빌드·Slidev25장·로컬Pages경로를 검증했다. CSS0을 브라우저가normal로 직렬화하는 경우도 실제추가자간0으로 확인했다.
- PNG: review/previews/deck-v08/overview-v08.png, review/previews/typography-v08/title-spacing-before-after.png. 최신 지시에 따라 commit/push한다.

## 2026-11-06 / 하단 탐색 / 페이지 번호 입력 v09

- 사용자 요청: 현재 번호/전체 수의 현재 번호를 입력칸으로 바꿔1·5 등 원하는 장으로 이동하고,4페이지 같은 단계형 장은 첫 동작부터 시작할 것.
- 반영: 숫자 입력+Enter로 이동한다. 전체 수와 P ID는 유지하고 현재 번호는 페이지 이동 때마다 동기화한다. 같은 번호 재입력도 첫 단계로 초기화한다.
- 1~25의 정수만 허용한다. 빈 값·0·범위 초과·소수는 이동하지 않는다. Esc는 편집 취소이며 기존 단계는 유지한다. 입력 중 기존 발표 단축키는 실행되지 않는다.
- 기존 방향키·목차·해설·전체화면·역방향 마지막 단계 진입·퇴역 링크는 유지한다. 기본25장·121개 상세 기록·자간0 유지.
- 검증: 새 입력칸 부재의 실패를 먼저 확인한 뒤,1/5/4/마지막장·같은장초기화·잘못된번호·Esc·800px폭·기존조작을 실제Chrome에서 확인했다.25장/27단계·소스·수식/글꼴·기본/base빌드·로컬Pages 검증을 수행했다.
- PNG: review/previews/navigation-v09/P032-page-jump.png 및 page-number-toolbar.png. 최신 자동게시 지시에 따라 commit/push한다.

## 2026-11-06 / P006 / 조건 입력 c_t 설명

- 사용자 요청: 손실 수식의 c_t=[h_t,m_t,s_t,p_t]를 조건 입력으로 설명할 것. 이전 정의 제거 요청은 이 최신 요청으로 변경됐다.
- 근거: 원문 PDF p.8 Sec.2.2 확인. h_t 인지 특징, m_t 기억 특징, s_t 현재 로봇 상태, p_t 현재 물리 센서 신호이며 센서는 사용 가능할 때 포함한다.
- 반영: P006 오른쪽 수식 아래에 조건 입력 정의와 의미를 추가했다. u_θ 설명을 한 상자에 묶고 중복 손실 문장은 하단 요점에 유지한다. 글꼴·크기·자간·25장·121개 상세 기록은 유지한다.
- 검증: 실제25장 PNG 넘침/이미지실패/브라우저오류/외부요청0. P006 화면 직접 확인, 소스·KaTeX/실제글꼴·기본/base빌드·로컬Pages 검증 실행.
- PNG: review/previews/deck-v09/P006-conditions-v09.png. 사용자 검토 전이며 최신 자동게시 지시에 따라 commit·push한다.

## 2026-11-06 / P006 / 정답 변화율 v*의 근거

- 사용자 요청: v*를 정답 변화율로 명시하고 왜 학습 target인지 설명할 것.
- 반영: 미분식의 v* 옆에 ‘정답 변화율’을 직접 표시했다. 도입문은 노이즈 ε에서 정답 a로 잇는 직선 경로를 미분한 값 a−ε를 학습 target으로 삼는다고 설명한다.
- 근거: Sec.2.2 PDF p.8 Eq.(1)의 target a−ε와 정의된 보간 경로의 미분. 개별 학습 쌍의 target이며, 모든 입력에서 학습된 vector field가 상수라는 의미는 아니다.
- 검증: 소스 매핑·25장 PNG·수식/실제글꼴·기본/base빌드·로컬Pages 검증 통과. 화면 넘침/이미지실패/브라우저오류/외부요청0. P006 PNG 직접 확인.
- PNG: review/previews/deck-v09/P006-target-velocity-v09.png. 25장·121개 상세 기록·직전 c_t 설명 유지. 사용자 검토 전이며 자동게시 지시에 따라 commit·push한다.

## 2026-11-06 / v10 / Arial·한글 고딕 전환

- 사용자 요청: Arial 스타일로 바꿔 전체 화면의 겹침·잘림·이상 여부를 확인하고, 문제가 없으면 적용할 것.
- 결정: Arial에는 한글이 없어 영문은 Arial, 한글은 Apple SD Gothic Neo → Malgun Gothic → 내장 Nanum Gothic 순서로 표시한다. 수식은 KaTeX를 유지한다. 시스템 글꼴은 복사·배포하지 않으며 기존 나눔고딕 3종은 최종 대체용으로 보존한다.
- 실제 Mac Chrome 렌더링: 영문 ArialMT, 한글 AppleSDGothicNeo-Regular 확인. Windows의 실제 맑은 고딕 렌더링은 이번 환경에서 확인하지 못했으며 OS별 모양 차이는 가능하다.
- CSS 제목·본문·표지·버튼·Fig.3 주석·해설·한글 수식 주석에 같은 우선순위를 적용했다. 글자 크기·자간0·콘텐츠·25장·121개 상세 단위는 유지했다.
- 검증: verify_sources.py; verify_deck.mjs(25장, 넘침/이미지실패/브라우저오류/외부요청0); verify_architecture.mjs(27상태·4모듈·18화살표·겹침/경계); verify_navigation.mjs; verify_math_font.mjs(실제 Arial/한글 fallback, 내장 fallback 3종, 전체 해설 수식).
- 추가 배치 검사: 시스템 한글과 내장 Nanum 대체 모드 각각25장. 제목/본문/표/출처/해설 가로 넘침0, 제목 모두 한 줄. qa/full-deck/typography-v10-report.json.
- 기본/base 빌드 및 Slidev25장 오류0, 패키지 생성·로컬Pages 검증 통과. 세 발표 HTML 동일성·git diff --check 확인.
- 직접 확인: 실제25장 전체 지도, P006 글꼴 비교, MSAT 확대 PNG. review/previews/typography-v10/overview-v10.png, P006-before.png, P006-trial.png; review/previews/deck-v10/P006-v10.png; review/previews/architecture-v10/step-22.png.
- 결과물은 사용자 검토 전이다. 요청의 조건을 충족해 적용하고 최신 자동게시 지시에 따라 commit·push한다. Pages 배포 완료 여부는 별개다.

## 2026-11-06 / v11 / MSAT 순서 변경·데이터 설명 확장

- 사용자 요청: 기존7·8쪽의 MSAT 입력·Joint Attention을5·6쪽의 학습·추론 수식 앞으로 이동하고, 변경 전 버전을 Git에 보존할 것.9쪽에는 데이터 종류의 직관적 의미, 이어서 공개·자체 데이터 설명 장을 추가할 것.
- 보존: rldx-v10-before-order-data-20261106 태그가 변경 전 커밋5f5a574를 가리킨다. 확인·복구는 review/ROLLBACK.md. 기존 ID·해시 링크를 유지하고 새 장에 P033/P034를 부여했다.
- 순서: Fig.3 → P009 입력 → P010 Joint Attention → P006 학습 → P008 추론. 전환 문장과 발표 메모를 수정했다. Noisy chunk는 입력 장에서 개념을 소개하고 뒤의 수식으로 연결한다.
- P013(9쪽): 공개=다른 로봇이 이미 해본 경험, 자체=목표 로봇으로 직접 모은 경험, 합성=시연을 변형해 늘린 경험. 실제/합성의 원문 큰 범주와 공개/자체의 하위 구분을 명시했다. Fig.4는 합성 파이프라인으로 유지한다.
- P033(10쪽): 공개6개 데이터셋과 시연의 범위, trajectory·action prior의 직관적 설명. Sec.3.1 PDF p.9 및 Table5 p.41을 확인했다. 명칭·수치의 세부 근거는 N 해설에 보존한다.
- P034(11쪽): Franka의 촉각/관절 토크 측정, ALLEX의 부위별 원격 조작/전류 기반 토크 추정을 구별한다. Sec.3.2 pp.9–10과 Fig.12(b)(c) p.19를 대조했다. Fig.12에서(b)(c)만 발췌한 파일과 원본 좌표를 기록했다.
- 보존 검증: 121개 상세 단위의 제목·내용은 태그 버전과 바이트 단위로 동일하다(바깥 공백 제외). S042만 P034로 옮겼으며, 나머지도 각각 정확히 한 번 연결된다. 전체27장, Fig.3은 기존27상태·18화살표다.
- 실제 검증: verify_sources.py; verify_deck.mjs(27장 PNG, 넘침/이미지실패/오류/외부요청0); verify_architecture.mjs; verify_navigation.mjs(새 순서와 추가 장 사이의 이동 포함); verify_math_font.mjs; 기본/base빌드; verify_slidev.mjs(27장 오류0); package_pages.py; verify_pages.mjs. 최종 소스 EOF 공백 정리 전후 HTML SHA256이 동일하다. git diff --check 및 세HTML동일성 확인.
- PNG: review/previews/deck-v11/P013-v11.png, P033-v11.png, P034-v11.png. 세 장을 직접 확인했다. 변경 요청과 개별 결과물 승인은 구분하며 사용자 검토 전이다. 최신 지시에 따라 main과 보존 태그를 push한다. Pages 반영 완료는 별도 확인하지 않았다.

## 2026-11-06 / v12 / 학습 목적·Fig.6/8·Graph/Fusion 설명 복원

- 사용자 피드백6건: 단계별 학습 목적과 IL/RL의 적용 맥락을 먼저 설명하고, Pre의 Fig.6 분포·episode 수, Mid의 필요성, RECAP 절차·Fig.8을 보강할 것. 추론은 공부했던 고정 설정의 사전 준비와 합성함수/중간 메모리 왕복 직관으로 설명할 것.
- 확인한 근거: 기존 학습/추론 MD(S056–081, S036), 중앙 질문노트 Q3·Q10·Q11, 원문 PDF pp.12–16·43. 앞선 채팅의5절 설명 기록도 대조했다. 원문 사실과 역할 비유·함수 약자는 각 장의 출처/메모에서 구분한다.
- P035 학습 단계: Pre=범용 기본기, Mid=목표 로봇 특화+새 기능, Post=작업별 IL 및 필요한 고난도 작업의 RL 보완. 원문에 없는 자동 전환 상태·성공률 임계값은 만들지 않는다.
- P016: Fig.6의8개 데이터별episode와sampling비중을 옮겼다. OXE870K/25%, DROID92K/25%, Galaxea114K/10%, AgiBotG239K/10%, AgiBotH36K/5%, ActionNet30K/10%, Everyday9K/5%, Synthetic150K/10%. Pool약1.5M과sampling100%를 구분한다.
- P036: 기존 projection·공통256trajectories 설명을 보존하는 별도 장이다. P017은 왜 로봇/센서 적응이 필요한지와 세 기능·혼합 비율·2K alignment 순서를 설명한다. Memory간격/범위·dropout/near-zero 상세는 기존 S060–064에 남긴다.
- P018: 작업별IL→배치→실패 조건의 추가 시연이 기본이며 고차원 제어·정밀 접촉과 시연 수집 부담 때문에 선택적 RECAP을 보완한다. ALLEX 전구 RL 사례는 Sec.6.5에 연결한다.
- P019: policy/critic의 별도 역할, value→advantage labels, rollout 누적·성공 subset critic 학습·전체 relabel·policy 갱신을 설명한다. P037은 Fig.8의축/색/(a)첫성공/(b)실패·재시도·회복을 해석한다. value를 성공률로 바꾸거나 미기재 advantage 식을 추가하지 않는다.
- P020: 토큰/위치/허용관계 같은 설정 의존성→고정 배포의 반복 준비값→사전 계산/재사용→분할 해소/한CUDA Graph 캡처의 인과 설명을 복원했다. 이 준비와 입력마다 바뀌는 Q/K 계산은 상세 해설에서 구분한다.
- P038/P039: Fig.10의 별도kernel 저장·재읽기와 한fused kernel의on-chip연속계산을 비교한다. N=RMSNorm,R=RoPE로 단계식과 Attn(R(N(q)),R(N(k)),v) 합성함수식을 나란히 설명한다. 하나의kernel이 하나의단순산술식이나 모델전체의1회메모리접근이라는 뜻으로 확대하지 않는다.
- 보존: 기본32장으로5장 추가. 상세121개 내용은 변경 전 태그 rldx-v11-before-training-inference-20261106(eba946c)와 동일하다(바깥 공백 제외). 소유 장만 재배치했다. P011→P036, P021→P038로 기존 링크의 의미와 검색/N 해설을 유지했다.
- 검증: verify_sources.py; verify_deck.mjs(32PNG, 넘침/이미지실패/오류/외부요청0); verify_architecture.mjs(27상태); verify_navigation.mjs(새학습/추론순서·기존/퇴역링크·페이지입력); verify_math_font.mjs(실제Arial/한글fallback·모든해설수식); 기본/base빌드; verify_slidev.mjs(32장); package_pages.py; verify_pages.mjs. 세HTML동일성·git diff --check 확인.
- PNG: review/previews/deck-v12/P035-v12.png, P016-v12.png, P036-v12.png, P017-v12.png, P018-v12.png, P019-v12.png, P037-v12.png, P020-v12.png, P038-v12.png, P039-v12.png를 직접 확인했다. 최초 배치의 넘침은 문장/배치를 고쳐 해결했고 글꼴 크기를 줄이지 않았다.
- 사용자 결과물 검토 전이다. 최신 자동게시 지시에 따라 변경과보존태그를commit·push한다. 실제Pages배포완료는 별도 확인하지 않았다.

## 2026-11-06 / v13 / 벤치마크·로봇·과제 사진을 먼저 설명

- 사용자 요청: 기존 실험 결과 장에서 LIBERO 평균과 Basic/Directional PnP 등 과제명 의미 및 로봇의 정체를 설명하고 Fig.11·12·13·15·17을 본문에 넣을 것. P023의 갑작스러운 ‘저자 해석’ 문장을 쉽게 풀고, P024의 ‘잡는다.’ 뒤 ‘기억’ 앞을 줄바꿈할 것.
- 추가 지시: “페이지 수 일단은 신경쓰지말고!!” 페이지 수를 제한하지 않으며, 사진과 개념·과제 설명을 결과보다 먼저 제시하는 데 필요한 장을 둔다.
- 근거: 원문 PDF pp.17–24와 App.G.1–G.4 pp.48–52, 기존 평가 공부 MD S082–S096 및 질문노트를 대조했다. 벤치마크를 평가 세트, 개별 동작을 과제로 구분한다.
- 흐름: P040 Fig.11 시뮬레이션 벤치마크 → P022 결과·LIBERO 평균 → P041 Fig.12 실제 로봇 → P042 Fig.13 OpenArm 과제 → P023 결과 → P043 Fig.15 ALLEX 과제 → P024 결과 → P044 Fig.17 Franka 과제 → P025 결과. 소개 장5개를 추가했으며 현재37장이다. 이 수를 한도로 삼지 않는다.
- LIBERO:4suite(Spatial/Object/Goal/Long),40task의 평균 성공률을 설명한다. Short는앞3suite,Avg는Long을포함한다. 결과 표의 최강baseline과RC365전체/미지복합을구분하고 기존조건·한계는N해설에유지한다.
- 로봇: OpenArm28DoF양팔/Inspire손, ALLEX48DoF상반신/양팔·손·토크, Franka단일팔그리퍼/torque·AnySkin을Fig.12와연결했다. 원문의Franka그림내자유도표기와G.4팔사양은N메모에서구분한다.
- OpenArm: Basic=인형→오른쪽상자, Directional=선반4칸/식기대3칸의지시위치, UnseenObject=새instance, UnseenTask=새물체·놓기조합, Grounding=같은종류중지시한instance를골라잡기로설명한다. Grounding의성공은정확한대상을잡는것,나머지는지정위치에놓는것이다. 과적합·원인통제문장을본문에서빼고기존S089에보존했다.
- ALLEX: Fig.15의움직이는상자/숨긴상자/카드/공따르기동작을설명한뒤Fig.16결과로이어진다. P024에명시적br을넣고성공률87.5/91.7과progress97.2/70.8,혼합평균86.8의의미를구분한다.
- Franka: Fig.17의Spin/Pong, CupSwapping/Shell, Plug/Egg를기능별로설명한다. Cup은머신의컵을치운후원래받침의다른컵으로교체하는순서다. Fig.18결과에서는어떤과제에실패가남는지읽고관련모듈만활성화한평가조건도유지한다.
- 보존: 기존 상세121개내용은변경전태그 rldx-v12-before-evaluation-context-20261106(757822d)와동일하다(바깥공백제외). 소유장만재배치했고기존ID·퇴역링크·32장구간의탐색규칙을보존했다. Arial/한글fallback·자간0·글자크기는유지한다.
- 실제검증: verify_sources.py; verify_deck.mjs(37PNG,넘침/이미지실패/브라우저오류/외부요청0); verify_architecture.mjs(27상태); verify_navigation.mjs(사진소개→결과순서포함); verify_math_font.mjs(실제글리프·전체해설수식); 기본/base빌드; verify_slidev.mjs(37장오류0); package_pages.py; verify_pages.mjs. 소스공백정리전후HTML SHA256동일,세HTML동일성·git diff --check확인.
- 실제PNG: review/previews/deck-v13/P040-v13.png, P022-v13.png, P041-v13.png, P042-v13.png, P023-v13.png, P043-v13.png, P024-v13.png, P044-v13.png, P025-v13.png를직접확인했다. ALLEX의초기넘침은중복평균문장을하단요점으로옮겨해결했고글꼴크기는줄이지않았다.
- 사용자결과물검토전이다. 최신자동게시지시에따라본문·기록·생성HTML/ZIP과변경전태그를commit·push한다. Pages실제반영완료는별도확인하지않았다.

## 2026-11-17 / P032 / 중복 입력·시간 구분 화면 제외

- 사용자 요청: 기존26번 MSAT 세 입력 묶음은25번에서 충분하므로 화면과 대본에서 제외. 기존27번 t/τ 별도 구분 화면도 제외하고 관련 설명 때 말할 것.
- 반영: msat-inputs/time-encoding 두 카드와 해당 독립 대본을 삭제하고38단계로 재번호화했다. t/τ의 의미는 action-path 수식 대본에 한 문장으로만 언급한다. P009/P012 기존 링크는 유지한 세 번째 입력 화살표(25번)로 연결한다.
- 본문47장·Part1 18장·Part2 29장·121개 공부 기록은 유지한다. 기존 상세 공부 기록은 삭제하지 않는다.
- 적용 H02/H05/H21/H22/H23. 검증 결과: 소스·38단계 대본 대응 및 실제 Chromium의 설명 정방향/역방향·기존 링크·Part별 탐색 확인. 결과물 사용자 검토 전.

## 2026-11-17 / P032 26–28 / Joint attention을 시각적으로 설명

- 사용자 피드백: RMSNorm·QKV 등 연산을 나열하는 설명은 와닿지 않으며, 정보를 교환하면서 각자의 형태를 유지한다는 흐름이 보이길 원함. 대상은 갱신된26–28번으로 정정했다.
- 반영:26번은 초반 세 경로와 정보 교환을 소개하고,27번은 C/A/P를 색으로 구분해 joint attention 전후 같은 토큰 자리를 시각적으로 대응시킨다.28번은 행동 토큰 하나가 C의 장면·기억과 P의 물리 정보를 참고해 특징을 갱신하는 예시다. A 토큰의 갱신 전후 상자 크기도 같게 맞췄다.
- 표현: 유지되는 것은 토큰의 자리·묶음과 경로별 전용 처리이며 특징값은 갱신된다. 입력값이 그대로 남거나 모든 stream의 파라미터가 공유된다는 뜻으로 표현하지 않는다. 출력 특징과 최종 로봇 명령도 구별한다.
- 근거: 원문 Sec.2.2 PDF p.8의 joint self-attention→원래 stream으로 분리→stream별 residual update 및 modality-specific parameters 보존 설명을 직접 확인했다. p.9의 RMSNorm/SwiGLU 세부 내용은 기존 공부 기록에 보존한다.
- 화면·대본은 동일한 순서로 맞췄다.29–30 대본이 변경 전과 동일함을 비교했고,121개 원본 공부 단위도 전후 동일하다.38단계·47장·Part1 18장·Part2 29장은 유지한다.
- 검증: 소스·대본 검사, 실제38상태 순회/경계/토큰 자리 정렬 및 Part별 탐색. 실제 PNG로27–28 화면 확인. 사용자 결과물 검토 전. 적용 H05/H06/H08/H10/H21/H23.

## 2026-11-17 / P032 / Joint attention 중복 단계 삭제

- 사용자 피드백:27번과28번은 같은 내용이므로 중복을 없앨 것. 전체 도식과 토큰 하나의 예시로 나눴지만 같은 학습 목표를 반복한 구성이었다.
- 반영: stream-update28번 화면·대본을 삭제했다.27번의 기존 그림을 보며 행동 토큰의 사례를 한 번만 설명하도록 대본을 줄였다. 다음에는 바로 Double-stream으로 이어진다. 사용하지 않는28번 전용 스타일도 제거했다.
- 현재37단계·추가10카드다.47장·Part1 18장·Part2 29장·기존121개 공부 기록은 유지한다. 소스·대본 대응과 실제 설명 순회/역방향·Part 탐색 확인. 사용자 결과물 검토 전.
- 재발 방지: 새 설명 단계를 추가하기 전, 직전 단계와 다른 질문에 답하는지 확인한다. 같은 핵심의 예시는 같은 그림에서 짧게 설명하고 독립 단계로 반복하지 않는다. 적용 H05/H06/H10/H22/H23.

## 2026-11-17 / 피드백 재정리·의미 중복 검토의 필수화

- 사용자 요청: 지금까지 받은 피드백을 다시 기록해 같은 실수를 반복하지 않도록 할 것. 직접 원인은 Joint attention 전체 그림과 행동 토큰 예시를 두 단계로 나눠 같은 결론을 반복한 편집이었다.
- 기존 기록은 남아 있었지만 새 화면의 배치·넘침만 확인하고 인접 화면·대본이 같은 질문에 답하는지를 확인하지 않았다. '기록함'과 '이번 수정에 적용함'을 구별하지 못한 점을 재발 원인으로 남긴다.
- 반영: 공통 H25, 수정 전·완료 전 점검, 이번 대화 결정 표, root/project/template AGENTS 진입 규칙과 템플릿 사본을 갱신했다. 프로젝트 AGENTS의 서로 다른 과거 단계 수는 이력으로 옮기고 현재47장·37단계를 맨 위에 정리했다.
- 다음 수정에서는 대상·인접 단계의 질문·새 정보 비교→같은 핵심의 예시 통합→화면·대본 연속 검토→삭제·통합한 중복과 실제 검증 기록 순으로 적용한다. 의미 검토를 자동 검사 통과로 대신하지 않는다.
- 이번 변경은 지침·피드백 기록만 수정한다. 발표 HTML·canonical Section MD·대본·공부 기록은 수정하지 않는다. 반복 방지의 실제 준수는 후속 작업에서 확인해야 하며 문서 저장만으로 보장됐다고 하지 않는다.
- 문서 검증: H01–H25의 중복/누락 없음, 세 AGENTS 진입점 연결, 템플릿 사본 일치, 전체 피드백 제목의 행 번호 색인 일치, 발표 파일 변경 없음과 기존 사용자 대본 수정 보존을 확인했다. 발표 브라우저 검사는 이번 문서 수정에서 재실행하지 않았다.
