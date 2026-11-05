# 슬라이드 제작 진행 상황

- 업데이트: 2026-11-05 / v05
- 현재 단계: P032 Browser Comment1–5, 추가 주석 예시, hₜ·mₜ concat 정정 반영 완료 / 사용자 검토 대기.
- 원본: sections/의9개 MD. 문구·해설·그림 위 이름을 MD에서 편집하고 좌표·단계 구조는 architecture-tour.json에서 관리한다.
- 구성: 기본30개 화면, P032 내부27개 확대·설명 상태와18개 화살표. 전체→Vision→전체→VLM→전체→Memory→전체→MSAT→전체 순서. 장수 제한 없음.
- 보존: S002–S122의121개 상세 해설과 질문, LaTeX 수식·나눔고딕·PPT 조작 유지. 구체18층 사실은 상세 해설에 보존하며 그림 화면은 ‘중간층’으로 설명한다.
- 추가: 토큰3종을 그림에 직접 표시. Memory의Qₜ/hₜ/mₜ와concat, MSAT의P/C/A입력·Triple/Double-stream·변화율/denoising을 구분.
- 결과물: presentation.html과 게시용index.html을 동일하게 생성. slides.md·매핑·ZIP도 갱신한다.
- 공개 상태: 사용자가 bbab11f의v05를 게시한 것을 확인했다. 이번 원문 기호·화살표 후속 수정은 로컬이며 commit/push하지 않았다.
- 승인: 이전 목차 승인만 있음. v05 결과물의 개별 사용자 승인은 아직 없다.
- 최신 P032 후속: 그림 위 concat 덮개를 제거해 원문 기호를 복원하고 Causal Transformer 설명 화살표를 Transformer Blocks에서 시작하도록 옮겼다. 27단계 표시·조작 검사를 통과했다.
- P013 후속: P013의 ‘조작 경험을,’ 뒤에서 줄을 바꿔 ‘자체 데이터는’을 새 줄로 표시했다. 실제 PNG·줄바꿈·넘침 검사 완료.
- 다음: 실제 PNG와 로컬 HTML을 검토하고 해당 장/설명 단계의 추가 피드백을 반영한다.

## 검증

- 9개 MD/121개 상세 매핑·한글UTF-8·Markdown/HTML내LaTeX 파싱 통과.
- 27상태의 화면 경계·주석 간 겹침·그림 위 이름을 확인.4hotspot/선택버튼·화살표18개·정/역순·리셋·다음 장·reduced-motion 통과.
- 기본30개 PNG, 넘침0·이미지 오류0·브라우저 오류0·외부HTTP 요청0. G/N·수식·나눔고딕 유지.
- 원문 p.7–9를 대조한 별도 과학적 검토에서 중요한 설명 오류 없음. P032 출처는 pp.6–9와Table2(a)를 표시한다.
- 명령·보고서는 VALIDATION.md와qa/full-deck/에 있다. 이전상태는 review/versions/before-figure3-v05/에 보존했다.

## 기본 화면

| 순서 | ID | 제목 | 버전 | 상태 | PNG |
| --- | --- | --- | --- | --- | --- |
| 1 | S001 | RLDX-1 Technical Report | v05 | 검토 전 | review/previews/deck-v05/S001-v05.png |
| 2 | P002 | 기존 VLA의 문제 | v05 | 검토 전 | review/previews/deck-v05/P002-v05.png |
| 3 | P031 | RLDX-1 Overview | v05 | 검토 전 | review/previews/deck-v05/P031-v05.png |
| 4 | P032 | RLDX-1 Architecture | v05 | 검토 전 | review/previews/deck-v05/P032-v05.png |
| 5 | P005 | Memory Module | v05 | 검토 전 | review/previews/deck-v05/P005-v05.png |
| 6 | P009 | MSAT의 입력 | v05 | 검토 전 | review/previews/deck-v05/P009-v05.png |
| 7 | P010 | MSAT의 Joint Attention | v05 | 검토 전 | review/previews/deck-v05/P010-v05.png |
| 8 | P011 | MSAT의 Stream 구성 | v05 | 검토 전 | review/previews/deck-v05/P011-v05.png |
| 9 | P012 | MSAT의 블록 구성 | v05 | 검토 전 | review/previews/deck-v05/P012-v05.png |
| 10 | P006 | Action Model의 행동 생성 원리 | v05 | 검토 전 | review/previews/deck-v05/P006-v05.png |
| 11 | P007 | Action Model의 학습 수식 | v05 | 검토 전 | review/previews/deck-v05/P007-v05.png |
| 12 | P008 | Action Model의 추론 수식 | v05 | 검토 전 | review/previews/deck-v05/P008-v05.png |
| 13 | P013 | 학습 데이터 | v05 | 검토 전 | review/previews/deck-v05/P013-v05.png |
| 14 | P014 | Task·Scene Augmentation | v05 | 검토 전 | review/previews/deck-v05/P014-v05.png |
| 15 | P015 | 합성 데이터 검증 | v05 | 검토 전 | review/previews/deck-v05/P015-v05.png |
| 16 | P016 | Pre-training | v05 | 검토 전 | review/previews/deck-v05/P016-v05.png |
| 17 | P017 | Mid-training | v05 | 검토 전 | review/previews/deck-v05/P017-v05.png |
| 18 | P018 | Post-training | v05 | 검토 전 | review/previews/deck-v05/P018-v05.png |
| 19 | P019 | RECAP | v05 | 검토 전 | review/previews/deck-v05/P019-v05.png |
| 20 | P020 | CUDA Graph | v05 | 검토 전 | review/previews/deck-v05/P020-v05.png |
| 21 | P021 | Kernel Optimization | v05 | 검토 전 | review/previews/deck-v05/P021-v05.png |
| 22 | P022 | Simulation Experiments | v05 | 검토 전 | review/previews/deck-v05/P022-v05.png |
| 23 | P023 | OpenArm | v05 | 검토 전 | review/previews/deck-v05/P023-v05.png |
| 24 | P024 | ALLEX | v05 | 검토 전 | review/previews/deck-v05/P024-v05.png |
| 25 | P025 | Franka | v05 | 검토 전 | review/previews/deck-v05/P025-v05.png |
| 26 | P026 | Ablation | v05 | 검토 전 | review/previews/deck-v05/P026-v05.png |
| 27 | P027 | RL·추론 지연 분석 | v05 | 검토 전 | review/previews/deck-v05/P027-v05.png |
| 28 | P029 | Conclusion | v05 | 검토 전 | review/previews/deck-v05/P029-v05.png |
| 29 | P028 | 나의 의견 | v05 | 검토 전 | review/previews/deck-v05/P028-v05.png |
| 30 | P030 | 한계와 미해결 질문 | v05 | 검토 전 | review/previews/deck-v05/P030-v05.png |

Fig.3의 실제 상태 PNG는 review/previews/architecture-v05/step-00.png–step-26.png다. 세 토큰은08, VLM은11, Memory는17, MSAT입력은22, 처리·출력은25에서 볼 수 있다.

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
