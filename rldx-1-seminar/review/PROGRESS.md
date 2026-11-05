# 슬라이드 제작 진행 상황

- 업데이트: 2026-11-05 / v07
- 현재 단계: P006 clean a·noisy a^τ 기호 구분 반영 / 자동 게시.
- 구성: 기본25장(표지+본문24장), P032 내부27상태·18화살표.
- 원본: 9개 섹션 MD. S002–S122의121개 상세 단위는 각각 한 번 연결되며 통합 전과 내용이 같다.
- 통합: P005→P032, P007→P006, P011→P032/P016, P021→P020. P012→P009/P010의 기존 통합도 유지한다.
- 흐름: Fig.3→학습 원리→추론 갱신→MSAT 입력→내부 연산→데이터→학습→실행 최적화→평가/분석→결론→의견/미해결.
- 원리와 검증은 분리 유지. Conclusion의 기여 반복을 줄이고 의견은 PEFT/BoN의 적용 조건에 집중한다.
- 원본 기록 보존: review/versions/before-dedup-v07/; 통합 근거와 계획: review/DEDUPLICATION.md.
- 게시 정책: 수정·검증 후 추가 확인 없이 commit·push한다. 현재 P006 후속 수정도 게시 대상이다.
- 승인: 수정·축소 요청과 결과물 개별 승인을 구분한다. v07은 검토 전이다.

## 검증

- 원문 PDF·중앙 질문노트·9개 MD를 대조하고, 별도 검토에서 중요한 사실/흐름 문제 없음 확인. 지적된 수식 구분 오타1건을 수정했다.
- 121개 상세 단위의 제목·내용은 수정 전 지문과 동일하며 각각 정확히 한 번 연결된다.
- 실제25장 PNG: 넘침0·이미지 오류0·브라우저 오류0·외부 HTTP요청0. 전체 지도와 통합 학습/추론/학습절차/의견 장을 직접 확인했다.
- 27상태·4모듈·18화살표, PPT키·역순,5개퇴역링크,이동된해설,KaTeX·나눔고딕 검증 통과.
- 기본/base 빌드·게시패키지·로컬Pages경로 검증 통과. 실행 명령·한계는 review/VALIDATION.md에 기록한다.

## 기본 화면

| 순서 | ID | 제목 | 버전 | 상태 | PNG |
| --- | --- | --- | --- | --- | --- |
| 1 | S001 | RLDX-1 Technical Report | v07 | 검토 전 | review/previews/deck-v07/S001-v07.png |
| 2 | P002 | 기존 VLA의 문제 | v07 | 검토 전 | review/previews/deck-v07/P002-v07.png |
| 3 | P031 | RLDX-1 Overview | v07 | 검토 전 | review/previews/deck-v07/P031-v07.png |
| 4 | P032 | RLDX-1 Architecture | v07 | 검토 전 | review/previews/deck-v07/P032-v07.png |
| 5 | P006 | Action Model의 학습 원리 | v07 | 검토 전 | review/previews/deck-v07/P006-v07.png |
| 6 | P008 | Action Model의 추론 수식 | v07 | 검토 전 | review/previews/deck-v07/P008-v07.png |
| 7 | P009 | MSAT의 입력 | v07 | 검토 전 | review/previews/deck-v07/P009-v07.png |
| 8 | P010 | MSAT의 Joint Attention | v07 | 검토 전 | review/previews/deck-v07/P010-v07.png |
| 9 | P013 | 학습 데이터 | v07 | 검토 전 | review/previews/deck-v07/P013-v07.png |
| 10 | P014 | Task·Scene Augmentation | v07 | 검토 전 | review/previews/deck-v07/P014-v07.png |
| 11 | P015 | 합성 데이터 검증 | v07 | 검토 전 | review/previews/deck-v07/P015-v07.png |
| 12 | P016 | Pre-training | v07 | 검토 전 | review/previews/deck-v07/P016-v07.png |
| 13 | P017 | Mid-training | v07 | 검토 전 | review/previews/deck-v07/P017-v07.png |
| 14 | P018 | Post-training | v07 | 검토 전 | review/previews/deck-v07/P018-v07.png |
| 15 | P019 | RECAP | v07 | 검토 전 | review/previews/deck-v07/P019-v07.png |
| 16 | P020 | 추론 최적화 | v07 | 검토 전 | review/previews/deck-v07/P020-v07.png |
| 17 | P022 | Simulation Experiments | v07 | 검토 전 | review/previews/deck-v07/P022-v07.png |
| 18 | P023 | OpenArm | v07 | 검토 전 | review/previews/deck-v07/P023-v07.png |
| 19 | P024 | ALLEX | v07 | 검토 전 | review/previews/deck-v07/P024-v07.png |
| 20 | P025 | Franka | v07 | 검토 전 | review/previews/deck-v07/P025-v07.png |
| 21 | P026 | Ablation | v07 | 검토 전 | review/previews/deck-v07/P026-v07.png |
| 22 | P027 | RL·추론 지연 분석 | v07 | 검토 전 | review/previews/deck-v07/P027-v07.png |
| 23 | P029 | Conclusion | v07 | 검토 전 | review/previews/deck-v07/P029-v07.png |
| 24 | P028 | 나의 의견 | v07 | 검토 전 | review/previews/deck-v07/P028-v07.png |
| 25 | P030 | 한계와 미해결 질문 | v07 | 검토 전 | review/previews/deck-v07/P030-v07.png |

Fig.3의 실제 상태 PNG는 review/previews/architecture-v07/step-00.png–step-26.png다. 세 토큰은08, VLM은11, Memory는17, MSAT입력은22, 처리·출력은25에서 볼 수 있다.

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
