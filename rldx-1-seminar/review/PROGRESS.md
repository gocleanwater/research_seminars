# 슬라이드 제작 진행 상황

- 업데이트: 2026-11-06 / v16
- 현재 단계: Ablation의 일곱 근거를13장으로 상세화 / 자동 게시.
- 구성: 기본63장(표지+본문62장), P032 내부27상태·18화살표 유지.
- 원본: 9개 섹션 MD. S002–S122의121개 상세 단위는 각각 한 번 연결되며 통합 전과 내용이 같다.
- 통합: P005→P032, P007→P006, P011→P032/P036, P021→P038. P012→P009/P010의 기존 통합도 유지한다.
- 흐름: Fig.3→Vision·Motion·VLM/VQA·cognition·시간 압축·Memory→MSAT 입력→내부 연산→학습 원리→추론 갱신→데이터→학습→실행 최적화→평가/분석→결론→의견/미해결.
- 원리와 검증은 분리 유지. Conclusion의 기여 반복을 줄이고 의견은 PEFT/BoN의 적용 조건에 집중한다.
- 원본 기록 보존: review/versions/before-dedup-v07/; 통합 근거와 계획: review/DEDUPLICATION.md.
- 게시 정책: 수정·검증 후 추가 확인 없이 commit·push한다. 변경 전 상태는 Git 태그로 보존하며 review/ROLLBACK.md에서 확인·복구 방법을 설명한다.
- 승인: 수정 요청과 결과물 개별 승인을 구분한다. v16은 검토 전이다.

## 검증

- 이번 변경은 원문 PDF pp.24–26·43·47과 기존 S097–S107 및 질문노트의6.5 검토 기록을 대조했다. 실험·관측 수치·저자 해석·우리의 직관을 각각 본문에서 설명한다.
- 121개 상세 단위의 제목·내용은 수정 전 지문과 동일하며 각각 정확히 한 번 연결된다.
- 실제63장 PNG: 넘침0·이미지 오류0·브라우저 오류0·외부 HTTP요청0. Ablation 본문13장을 직접 확인했다.
- PPT키·역순·번호 입력·퇴역링크·이동된해설·KaTeX·Arial·한글 대체 글꼴 검증 결과는 review/VALIDATION.md에 기록한다. Fig.3의27상태는 유지했다.
- 기본/base 빌드와 게시패키지 검증 결과 및 한계는 review/VALIDATION.md에 기록한다.

## 기본 화면

| 순서 | ID | 제목 | 버전 | 상태 | PNG |
| --- | --- | --- | --- | --- | --- |
| 1 | S001 | RLDX-1 Technical Report | v16 | 검토 전 | review/previews/deck-v16/S001-v16.png |
| 2 | P002 | 기존 VLA의 문제 | v16 | 검토 전 | review/previews/deck-v16/P002-v16.png |
| 3 | P031 | RLDX-1 Overview | v16 | 검토 전 | review/previews/deck-v16/P031-v16.png |
| 4 | P032 | RLDX-1 Architecture | v16 | 검토 전 | review/previews/deck-v16/P032-v16.png |
| 5 | P048 | Vision Encoder | v16 | 검토 전 | review/previews/deck-v16/P048-v16.png |
| 6 | P049 | Motion Module | v16 | 검토 전 | review/previews/deck-v16/P049-v16.png |
| 7 | P050 | Motion Module의 Residual | v16 | 검토 전 | review/previews/deck-v16/P050-v16.png |
| 8 | P051 | VLM과 로봇 VQA | v16 | 검토 전 | review/previews/deck-v16/P051-v16.png |
| 9 | P052 | Cognition Tokens | v16 | 검토 전 | review/previews/deck-v16/P052-v16.png |
| 10 | P053 | Cognition Features의 추출 | v16 | 검토 전 | review/previews/deck-v16/P053-v16.png |
| 11 | P054 | VLM의 시간 정보 | v16 | 검토 전 | review/previews/deck-v16/P054-v16.png |
| 12 | P055 | 과거 프레임 압축 | v16 | 검토 전 | review/previews/deck-v16/P055-v16.png |
| 13 | P056 | Memory Module | v16 | 검토 전 | review/previews/deck-v16/P056-v16.png |
| 14 | P057 | Memory Module의 계산 | v16 | 검토 전 | review/previews/deck-v16/P057-v16.png |
| 15 | P058 | Memory의 시간 범위 | v16 | 검토 전 | review/previews/deck-v16/P058-v16.png |
| 16 | P059 | Context·Cognition·Memory | v16 | 검토 전 | review/previews/deck-v16/P059-v16.png |
| 17 | P009 | MSAT의 입력 | v16 | 검토 전 | review/previews/deck-v16/P009-v16.png |
| 18 | P010 | MSAT의 Joint Attention | v16 | 검토 전 | review/previews/deck-v16/P010-v16.png |
| 19 | P006 | Action Model의 학습 원리 | v16 | 검토 전 | review/previews/deck-v16/P006-v16.png |
| 20 | P008 | Action Model의 추론 수식 | v16 | 검토 전 | review/previews/deck-v16/P008-v16.png |
| 21 | P013 | 학습 데이터 | v16 | 검토 전 | review/previews/deck-v16/P013-v16.png |
| 22 | P033 | 공개 실제 데이터 | v16 | 검토 전 | review/previews/deck-v16/P033-v16.png |
| 23 | P034 | 자체 실제 데이터 | v16 | 검토 전 | review/previews/deck-v16/P034-v16.png |
| 24 | P014 | Task·Scene Augmentation | v16 | 검토 전 | review/previews/deck-v16/P014-v16.png |
| 25 | P045 | 영상 품질 검사 | v16 | 검토 전 | review/previews/deck-v16/P045-v16.png |
| 26 | P015 | 합성 데이터 검증 | v16 | 검토 전 | review/previews/deck-v16/P015-v16.png |
| 27 | P046 | 움직임 일치 검사 | v16 | 검토 전 | review/previews/deck-v16/P046-v16.png |
| 28 | P047 | 일치 검사기의 학습 | v16 | 검토 전 | review/previews/deck-v16/P047-v16.png |
| 29 | P035 | 학습 단계 | v16 | 검토 전 | review/previews/deck-v16/P035-v16.png |
| 30 | P016 | Pre-training | v16 | 검토 전 | review/previews/deck-v16/P016-v16.png |
| 31 | P036 | 로봇별 입출력 경로 | v16 | 검토 전 | review/previews/deck-v16/P036-v16.png |
| 32 | P017 | Mid-training | v16 | 검토 전 | review/previews/deck-v16/P017-v16.png |
| 33 | P018 | Post-training | v16 | 검토 전 | review/previews/deck-v16/P018-v16.png |
| 34 | P019 | RECAP | v16 | 검토 전 | review/previews/deck-v16/P019-v16.png |
| 35 | P037 | Critic과 Figure 8 | v16 | 검토 전 | review/previews/deck-v16/P037-v16.png |
| 36 | P020 | CUDA Graph | v16 | 검토 전 | review/previews/deck-v16/P020-v16.png |
| 37 | P038 | Kernel Fusion | v16 | 검토 전 | review/previews/deck-v16/P038-v16.png |
| 38 | P039 | Kernel Fusion의 계산 | v16 | 검토 전 | review/previews/deck-v16/P039-v16.png |
| 39 | P040 | 시뮬레이션 벤치마크 | v16 | 검토 전 | review/previews/deck-v16/P040-v16.png |
| 40 | P022 | Simulation 결과 | v16 | 검토 전 | review/previews/deck-v16/P022-v16.png |
| 41 | P041 | 실제 로봇 | v16 | 검토 전 | review/previews/deck-v16/P041-v16.png |
| 42 | P042 | OpenArm 과제 | v16 | 검토 전 | review/previews/deck-v16/P042-v16.png |
| 43 | P023 | OpenArm 결과 | v16 | 검토 전 | review/previews/deck-v16/P023-v16.png |
| 44 | P043 | ALLEX 과제 | v16 | 검토 전 | review/previews/deck-v16/P043-v16.png |
| 45 | P024 | ALLEX 결과 | v16 | 검토 전 | review/previews/deck-v16/P024-v16.png |
| 46 | P044 | Franka 과제 | v16 | 검토 전 | review/previews/deck-v16/P044-v16.png |
| 47 | P025 | Franka 결과 | v16 | 검토 전 | review/previews/deck-v16/P025-v16.png |
| 48 | P026 | Ablation and Analysis | v16 | 검토 전 | review/previews/deck-v16/P026-v16.png |
| 49 | P060 | VLM의 특징 추출 층 | v16 | 검토 전 | review/previews/deck-v16/P060-v16.png |
| 50 | P061 | 로봇 VQA의 효과 | v16 | 검토 전 | review/previews/deck-v16/P061-v16.png |
| 51 | P062 | VQA 전후의 Attention | v16 | 검토 전 | review/previews/deck-v16/P062-v16.png |
| 52 | P063 | 합성 데이터 규모 실험 | v16 | 검토 전 | review/previews/deck-v16/P063-v16.png |
| 53 | P064 | 합성 데이터의 성능 효과 | v16 | 검토 전 | review/previews/deck-v16/P064-v16.png |
| 54 | P065 | RL 평가 작업 | v16 | 검토 전 | review/previews/deck-v16/P065-v16.png |
| 55 | P070 | RECAP 결과의 지표 | v16 | 검토 전 | review/previews/deck-v16/P070-v16.png |
| 56 | P066 | RECAP 반복 결과 | v16 | 검토 전 | review/previews/deck-v16/P066-v16.png |
| 57 | P067 | RECAP 개선의 의미 | v16 | 검토 전 | review/previews/deck-v16/P067-v16.png |
| 58 | P027 | 추론 지연 측정 | v16 | 검토 전 | review/previews/deck-v16/P027-v16.png |
| 59 | P068 | 추론 최적화의 단계별 효과 | v16 | 검토 전 | review/previews/deck-v16/P068-v16.png |
| 60 | P069 | 추론 최적화의 해석 | v16 | 검토 전 | review/previews/deck-v16/P069-v16.png |
| 61 | P029 | Conclusion | v16 | 검토 전 | review/previews/deck-v16/P029-v16.png |
| 62 | P028 | 나의 의견 | v16 | 검토 전 | review/previews/deck-v16/P028-v16.png |
| 63 | P030 | 한계와 미해결 질문 | v16 | 검토 전 | review/previews/deck-v16/P030-v16.png |

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
