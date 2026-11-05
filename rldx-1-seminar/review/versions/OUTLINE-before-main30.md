# 전체 목차

상태: **v01 / 사용자 승인 — 2026-11-05**
작성일: 2026-11-05

## 구성 방향

논문의 흐름을 따라가되, 함께 공부하며 필요했던 배경 개념·수식 풀이·벡터 예시를 해당 내용 앞에 배치한다. 원문 설명, 직관적인 예시, 실험 조건과 결과, 우리의 해석, 미해결 질문을 모두 다룬다. 아래 항목은 한 장씩 검토할 후보 설명 단위이며, 화면에 담기 어려우면 사용자와 분할을 협의한다. 장수나 발표 시간에 맞춰 생략하지 않는다.

- 기본 순서: 문제 → VLM·시간 정보 → flow matching → MSAT → 데이터 → 학습 → 실행 최적화 → 평가 → ablation → 부록 → 연구 위치·미해결 질문.
- 표지 이외에도 하나의 장에서 설명할 핵심 질문을 정한다. 그림·표를 과도하게 축소하지 않고 필요한 구간·수식·실험을 나눠 해석한다.
- 원문의 사실과 실험 결과는 Section/Figure/Table/Equation 및 PDF 쪽수로 표시한다. 배경 설명·설명용 숫자·튜터의 해석은 원문 실험 사실과 구분한다.
- 미해결 질문은 관련 장에 함께 표시하고 마지막에도 모은다. 문서의 모호함을 확인되지 않은 모델 결함으로 바꾸지 않는다.
- tau는 denoising timestep이라고 부른다. 실제 로봇 시점 t와 구분한다. 로봇 이름은 OpenArm·ALLEX·Franka를 사용한다.
- 평가에서 성공률/부분점수, p50/전체 제어 지연, 누적/증분 speedup, 합성 pool 크기/sampling 비중을 구분한다.
- 현재 S001-v01 표지와 실제 HTML PNG를 제작해 검토 요청한다. 나머지 후보는 아직 제작하지 않았다. 목차 확인은 개별 장의 승인과 별개다.

## 출처 경로와 확인 범위

- 원문(PAPER): ../../research_wiki/papers/RLWRLD-RLDX-1 Technical Report.pdf — 55쪽 파일 존재 및 목차 확인. 내용 근거는 이 채팅에서 함께 읽은 본문·부록과 대조한다.
- 공부 기록(Q1~Q13): ../../research_wiki/RLDX-1_질문노트.md — 원문 설명·대화에서의 이해·미해결 상태를 구분해 사용한다.
- 원문과 중앙 질문노트는 읽기 참조만 하며, 이 프로젝트에 복사하지 않는다.
- 아래 '근거'는 슬라이드별 작성 시 다시 대조할 위치다. 실제 구현·학습·실험 재현을 완료했다는 표시는 아니다.
- 외부 개념의 세부 수식·API·배경은 장을 작성할 때 원 논문·공식 문서로 확인하고 SOURCES.md에 추가한다.

## 후보 슬라이드

### 01. 연구 문제와 전체 지도

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S001 | RLDX-1 Technical Report | 이 자료에서 공부할 연구의 대상과 범위는 무엇인가? | 표지 p.1, Abstract p.3; 사진 Fig.12(b) p.19 | 검토 요청 v01 |
| S002 | Task·action·policy | 목표 지시, 수치 행동, 행동을 정하는 모델은 어떻게 다른가? | Sec.1.1 p.5; Sec.3.3 p.10; 공부 대화 | 대기 |
| S003 | VLM과 VLA | 시각·언어 이해가 어떻게 로봇 행동 생성으로 연결되는가? | Sec.1 pp.3–5; Sec.2.1 p.6 | 대기 |
| S004 | Versatility와 세 기능 | 움직임·기억·물리 센싱이 추가로 필요한 상황은 무엇인가? | Sec.1 pp.3–4 | 대기 |
| S005 | 시스템 전체 구성 | 구조·데이터·학습·추론 최적화는 어떻게 연결되는가? | Fig.1 p.1; Sec.1 pp.3–5 | 대기 |
| S006 | OpenArm·ALLEX·Franka | 세 로봇의 구성과 이 보고서에서의 역할은 무엇인가? | Fig.12 p.19; Sec.3.2 pp.9–10; App.G.2–G.4 pp.50–52 | 대기 |
| S007 | 입력과 action chunk | 관측부터 미래 행동까지의 큰 흐름과 t·K·H는 무엇인가? | Fig.2, Sec.1.1 p.5 | 대기 |

### 02. Vision-Language Model과 시간 정보

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S008 | 로봇용 VQA 적응 | Qwen3-VL에 무엇을 추가 학습하는가? | Sec.2.1 pp.6–7 | 대기 |
| S009 | Cognition tokens와 h_t | q를 이어 붙인 뒤 어느 위치의 출력을 선택하는가? | Sec.2.1 p.7 | 대기 |
| S010 | 특징을 추출하는 층 | 후반 Transformer 층과 출력 head는 어떻게 다르며 왜 중간층을 쓰는가? | Sec.2.1 p.7; Q4; Table2a pp.24–25 | 대기 |
| S011 | 여러 프레임의 표기 | o_{t-K:t}와 vision features는 무엇을 묶은 것인가? | Sec.2.1 p.7; Sec.4.1 p.13 | 대기 |
| S012 | Motion module과 STSS | 주변 시공간 특징의 유사성이 어떻게 움직임의 단서가 되는가? | Sec.2.1 p.7 | 대기 |
| S013 | Residual connection | 기존 시각 특징과 움직임 특징을 어떻게 더하는가? | Sec.2.1 p.7 | 대기 |
| S014 | Self-attention과 causal mask | 뒤쪽 토큰이 앞쪽을 참고한다는 것은 무엇인가? | Sec.2.1 p.7; 배경 개념은 작성 시 원전 대조 | 대기 |
| S015 | 과거 프레임 압축 | LLM 4층 뒤에서 무엇을 평균 내고 무엇을 남기는가? | Sec.2.1 p.7 | 대기 |
| S016 | Context·cognition·memory | 세 종류의 표현은 어디에서 만들어지고 어디에 쓰이는가? | Sec.2.1 p.7; Fig.3 p.6 | 대기 |
| S017 | Memory queue | 과거 cognition features 3묶음과 현재 h_t를 어떻게 처리하는가? | Sec.2.1 p.7; Q5 | 대기 |
| S018 | 시간 범위와 갱신의 미해결점 | 40·16 timestep 간격과 t 변화·초기화 규칙은 어디까지 확인됐는가? | Sec.2.1 p.7; Sec.4.2 p.13; Q5 | 대기 |
| S019 | Memory features m_t | Causal memory Transformer와 원래 h_t의 병행 전달은 어떤 구조인가? | Sec.2.1 p.7 | 대기 |

### 03. Flow matching으로 행동을 생성하는 원리

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S020 | Diffusion·DiT·flow matching | 신경망 구조, 학습 목표, 생성 방법을 어떻게 구분하는가? | Sec.2.2 p.8; Q9; 질문노트의 원전 링크 | 대기 |
| S021 | 실제 시간과 denoising timestep | t·tau·H·L은 각각 무엇을 가리키는가? | Sec.1.1 p.5; Sec.2.2 p.8 | 대기 |
| S022 | 조건과 생성 후보 | h_t·m_t·s_t·p_t와 noisy a·p의 역할은 어떻게 다른가? | Sec.2.2 p.8; Q7 | 대기 |
| S023 | 노이즈와 정답 사이의 경로 | 선형 보간식과 tau=0·1의 의미는 무엇인가? | Sec.2.2 p.8 | 대기 |
| S024 | 변화율의 유도 | 왜 경로를 tau로 미분하며 정답이 a-epsilon인가? | Sec.2.2 Eq.1 p.8; 수식에서 유도 | 대기 |
| S025 | Neural vector field | 출력은 방향만이 아니라 어떤 크기의 변화율인가? | Sec.2.2 p.8 | 대기 |
| S026 | 학습 손실 Eq.1 | L2 norm의 아래첨자·제곱과 벡터별 오차를 어떻게 읽는가? | Sec.2.2 Eq.1 p.8 | 대기 |
| S027 | Euler 갱신 Eq.2 | 왜 denoising timestep 간격을 곱하는가? | Sec.2.2 Eq.2 p.8; 수치 예시는 설명용 표시 | 대기 |
| S028 | 학습 과정 | 무작위 tau의 후보를 직접 만들고 파라미터를 어떻게 학습하는가? | Sec.2.2 p.8; Q7 | 대기 |
| S029 | 추론의 denoising 반복 | 고정 조건을 사용하며 후보와 tau를 어떻게 갱신하는가? | Sec.2.2 Eq.2 p.8; Q7 | 대기 |
| S030 | 미래 물리 신호 예측 | 현재 p_t와 미래 p^tau를 구분하고 보조 목표를 어떻게 학습하는가? | Sec.2.2 Physical Sensing p.8 | 대기 |

### 04. Multi-Stream Action Transformer

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S031 | P·C·A의 입력 구성 | 각 stream에는 어떤 토큰이 들어가는가? | Sec.2.2 p.8; Fig.3 p.6; Q1·Q6 | 대기 |
| S032 | Stream별 QKV | 모달리티별 normalization·projection은 무엇을 분리하는가? | Sec.2.2 p.8; Q1 | 대기 |
| S033 | Joint attention과 출력 shape | C 4개·A 3개 예시에서 왜 출력 7개를 다시 나눌 수 있는가? | Sec.2.2 p.8; Q1; 벡터 수는 설명용 | 대기 |
| S034 | Residual update와 concat | 각 stream의 덧셈과 C-A 시퀀스 통합은 어떻게 다른가? | Sec.2.2 p.8; Q1 | 대기 |
| S035 | Triple-stream에서 double-stream으로 | 초반의 P/C/A가 후반의 P/C-A로 바뀌는 과정은 무엇인가? | Sec.2.2 p.8; Fig.3 p.6 | 대기 |
| S036 | 로봇별 입출력 projection | Embodiment-specific 연결부와 P stream은 어떻게 다른가? | Sec.2.2 p.8; Sec.4.1 p.12 | 대기 |
| S037 | Denoising timestep 토큰 | Sinusoidal embedding·MLP로 만든 tau를 어디에 넣는가? | Further Design Choices p.9 | 대기 |
| S038 | RoPE와 행동 순서 | 상대 위치가 attention에 반영되는 직관은 무엇인가? | Further Design Choices p.9; 배경 설명은 원전 대조 | 대기 |
| S039 | RMSNorm과 SwiGLU | 블록 내부의 정규화와 토큰별 특징 변환은 어떤 역할인가? | Further Design Choices p.9 | 대기 |
| S040 | Figure 3 전체 해석 | VLM·motion·memory·MSAT와 반복 denoising을 한 흐름으로 연결할 수 있는가? | Fig.3 p.6; Sec.2 pp.6–9; Q1·Q7 | 대기 |

### 05. 실제 데이터와 합성 데이터 파이프라인

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S041 | 세 데이터 공급원과 전처리 | 공개·자체·합성의 역할과 vision token 64개의 의미는 무엇인가? | Sec.3 pp.9–10 | 대기 |
| S042 | Franka·ALLEX 시연 수집 | 카메라·촉각·토크·원격 조작·역기구학은 어떻게 연결되는가? | Sec.3.2 pp.9–10; Fig.12 p.19 | 대기 |
| S043 | 합성 데이터 전체 흐름 | 어떻게 영상과 행동 라벨의 학습 쌍을 만드는가? | Fig.4 p.10; Q2 | 대기 |
| S044 | Factorized task augmentation | 행동·대상·배치·손을 어떻게 재조합하는가? | Sec.3.3 Task Augmentation p.11 | 대기 |
| S045 | Skill-conditioned variation | 원본 skill을 조건으로 변형하는 방식과 첫 전략은 어디서 겹치는가? | Sec.3.3 p.11; Q8 | 대기 |
| S046 | Task 생성의 미확인 제약 | 실행 가능성 기준·skill 목록·프롬프트는 어디까지 명시됐는가? | Sec.3.3 p.11; App.B.3 p.42; Q8 | 대기 |
| S047 | Scene augmentation의 I2I와 I2V | 시작 장면 편집이 어떻게 생성 영상으로 이어지는가? | Sec.3.3 p.11 | 대기 |
| S048 | Canny edge 조건 | 윤곽·배치 보존 유도와 물리적 타당성 보장은 어떻게 다른가? | Sec.3.3 p.11; 설명용 예시는 해석 표시 | 대기 |
| S049 | V2V 변환 | 물체 형태·움직임을 유지하며 질감·색을 다양화하는 이유는 무엇인가? | Sec.3.3 p.11 | 대기 |
| S050 | Figure 5 비교 | 원본·task 변형·scene 변형을 실제 프레임으로 어떻게 구분하는가? | Fig.5 p.11 | 대기 |
| S051 | IDM과 simulator rollout | Task 지시와 행동값을 구분하면 rollout은 어떻게 만들어지는가? | Sec.3.3 pp.10–12; App.B.3 p.42; Q2 | 대기 |
| S052 | Video quality filtering | 지시 불일치 re-caption과 plausibility 선별은 무엇을 바꾸는가? | Sec.3.3 p.11 | 대기 |
| S053 | Motion-consistency classifier | Frozen V-JEPA2·concat 특징·query·cross-attention·head는 어떻게 연결되는가? | Sec.3.3 p.12; Q2 | 대기 |
| S054 | Classifier의 학습 쌍 | 실제 정답 행동의 rollout과 시간·episode 불일치를 어떻게 사용하는가? | Sec.3.3 p.12; Q2 | 대기 |
| S055 | 합성 모델과 검증 범위 | 영상 생성 모델·IDM·품질 VLM·classifier는 각각 어디까지 검증됐는가? | App.B.3 p.42; Q2·Q8 | 대기 |

### 06. Pre·Mid·Post-training

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S056 | 세 단계 학습의 역할 | 범용 경험·로봇 특화·작업 적응을 어떻게 나누는가? | Sec.4 pp.12–15 | 대기 |
| S057 | Pre-training 데이터 혼합 | Figure 6의 학습 혼합 비중과 episode 수는 어떻게 다른가? | Sec.4.1 pp.12–13; Fig.6 p.12 | 대기 |
| S058 | 공통 projection의 256개 trajectory | Embodiment-specific 경로와 agnostic 경로를 왜 함께 학습하는가? | Sec.4.1 pp.12–13 | 대기 |
| S059 | Pre-training 설정 | 네 프레임·정규화·freeze 범위·학습 규모를 어떻게 읽는가? | Sec.4.1 p.13 | 대기 |
| S060 | Mid-training의 기능 확장 | 여러 프레임 입력과 STSS·memory·physics 모듈 추가 시점을 어떻게 구분하는가? | Sec.4.2 p.13 | 대기 |
| S061 | Mid-training 데이터 혼합 | Figure 7의 두 로봇별 구성과 수치 불일치는 무엇인가? | Fig.7, Sec.4.2 p.13; Q10·Q11 | 대기 |
| S062 | 새 입력과 modality dropout | 기억·토크·촉각 중 무엇이 새로 들어오며 무엇이 불명확한가? | Sec.4.2 p.13; Q10 | 대기 |
| S063 | Alignment warmup | 처음 2K step의 새 파라미터 학습과 전체 업데이트는 어떻게 다른가? | Sec.4.2 p.13; Q10 | 대기 |
| S064 | Near-zero 초기화 | 초기 기여를 작게 하려는 직관과 실험으로 확인되지 않은 이유는 무엇인가? | Sec.4.2 p.13; Q10 | 대기 |
| S065 | 작업별 IL과 기본 시연 설계 | Consistency·variance 요소를 구분해 시연을 어떻게 수집하는가? | Sec.4.3 p.14; Q3 | 대기 |
| S066 | 실패에 맞춘 추가 시연 | Base data와 refinement data 수집은 어떻게 반복되는가? | Sec.4.3 p.14 | 대기 |
| S067 | Policy와 critic | 행동 생성 모델과 별도 Gemma 평가 모델의 역할은 무엇인가? | Sec.4.3 pp.14–15; App.C p.43; Q3 | 대기 |
| S068 | Value와 advantage | 현재 상황의 가치와 기대 대비 행동의 유리함을 어떻게 구분하는가? | Sec.4.3 pp.14–15; Q3; 정확한 label 식은 미해결 | 대기 |
| S069 | Text critic과 Figure 8 | 숫자 텍스트 출력과 distributional critic의 실패·회복 곡선은 무엇을 보여주는가? | Fig.8 p.14; Sec.4.3 p.15; App.C p.43 | 대기 |
| S070 | RECAP 반복 학습 | Critic·advantage·policy·rollout 데이터가 어떤 순서로 갱신되는가? | App.C Algorithm1 p.43; Sec.4.3 pp.14–15 | 대기 |
| S071 | 생성 길이와 실행 길이 | 40개 예측·20개 실행·재호출은 denoising 반복과 어떻게 다른가? | App.C p.43; Q5·Q7 | 대기 |

### 07. 추론 최적화와 GPU 실행

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S072 | 관측부터 실행까지의 지연 | 변하는 장면과 오래된 관측 사이의 격차는 왜 커지는가? | Sec.5 p.15 | 대기 |
| S073 | 계산 그래프·kernel·launch | 연산 관계와 GPU 작업 코드·실행 비용은 어떻게 다른가? | Sec.5.1 pp.15–16 | 대기 |
| S074 | 고정 설정의 RoPE·mask | 미리 계산할 수 있는 값과 입력마다 바뀌는 값은 무엇인가? | Sec.5.1 p.16 | 대기 |
| S075 | CUDA Graph와 Figure 9 | Graph break를 줄이면 어떤 실행 비용이 사라지는가? | Fig.9 p.15; Sec.5.1 pp.15–16 | 대기 |
| S076 | Short prefill과 autoregressive 생성 | LLM의 입력 처리·출력 생성과 행동 후보 동시 갱신은 어떻게 다른가? | Sec.5.2 p.16; Sec.2.2 p.8 | 대기 |
| S077 | Compute-bound와 memory-bound | 계산 처리량과 데이터 이동 대역폭 중 무엇이 병목인가? | Sec.5.2 p.16; 설명용 텐서 연산 예시 | 대기 |
| S078 | Torch Compile과 fusion 경계 | 자동 최적화가 어떤 연산 묶음을 놓칠 수 있는가? | Sec.5.2 p.16; 배경 API는 작성 시 공식 문서 대조 | 대기 |
| S079 | FlashAttention과 데이터 이동 | Attention 내부 최적화와 주변 연산의 fusion은 어떻게 다른가? | Sec.5.2 p.16; 배경은 원 논문 대조 | 대기 |
| S080 | Kernel fusion과 Figure 10 | RMSNorm·RoPE·attention의 중간 메모리 왕복을 어떻게 줄이는가? | Fig.10 p.16; Sec.5.2 pp.16–17 | 대기 |
| S081 | 실제 custom kernel 목록 | 프로파일링으로 찾은 연산과 residual·norm·SwiGLU fusion은 무엇인가? | Sec.5.2 pp.16–17; App.F Table7 p.47 | 대기 |

### 08. 벤치마크와 실제 로봇 평가

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S082 | 평가의 목적과 범위 | 일반 능력·기능별 과제·ablation은 각각 무엇을 검증하는가? | Sec.6 p.17; Fig.11 p.17 | 대기 |
| S083 | Baseline의 행동 생성 방식 | Pi0-FAST·Pi0·Pi0.5는 토큰 생성과 flow matching을 어떻게 사용하는가? | Sec.6 Baselines p.17 | 대기 |
| S084 | GR00T baseline의 연결 방식 | N1.5·N1.6의 cross-attention과 RLDX-1의 비교 범위는 무엇인가? | Sec.6 Baselines p.17 | 대기 |
| S085 | 시뮬레이션 평가 조건 | Pre-trained 모델을 어디에 fine-tuning하며 baseline 수치는 어디서 얻는가? | Sec.6.1 pp.18–19; App.G.1 pp.48–49 | 대기 |
| S086 | Table 1(a) | 기본 조작과 강건성에서 가장 강한 baseline 대비 차이는 얼마인가? | Table1a p.18 | 대기 |
| S087 | Table 1(b) | 어려운 작업의 상대 개선과 낮은 절대 성공률을 어떻게 함께 읽는가? | Table1b pp.18–19 | 대기 |
| S088 | OpenArm 과제 구성 | Figure 13의 기본·공간 지시·새 개체·새 작업·grounding은 무엇이 다른가? | Sec.6.2 pp.19–20; Fig.13 p.20 | 대기 |
| S089 | OpenArm 평가와 Figure 14 | 성공 조건·시행 수·비교 차이와 저자의 원인 해석은 무엇인가? | Fig.14 p.20; App.G.2 p.50 | 대기 |
| S090 | ALLEX의 움직임·기억 과제 | 컨베이어 속도 보간과 숨긴 상자 선택이 어떤 기능을 요구하는가? | Sec.6.3 pp.21–22; Fig.15 p.21 | 대기 |
| S091 | ALLEX의 물리 센싱 과제 | 카드 접촉과 플라스틱 공 따르기의 목표는 무엇인가? | Sec.6.3 pp.21–22; Fig.15 p.21 | 대기 |
| S092 | Figure 16과 부분 점수 | 87.5·91.7·97.2·70.8 및 평균86.8을 어떤 지표로 읽어야 하는가? | Fig.16 p.22; App.G.3 p.51 | 대기 |
| S093 | Franka의 움직임 과제 | 회전 방향 응답과 Pong 도착 영역 예측은 무엇을 검증하는가? | Sec.6.4 p.23; Fig.17 p.23 | 대기 |
| S094 | Franka의 기억·접촉 과제 | 컵 교체·숨긴 큐브·플러그·달걀 과제는 어디서 과거·센서가 필요한가? | Sec.6.4 pp.23–24; Fig.17 p.23 | 대기 |
| S095 | Figure 18의 개선과 한계 | 과제별 성공률·평가 횟수와 어려운 과제의 낮은 성능은 무엇인가? | Fig.18 p.24; App.G.4 p.52; Q13 | 대기 |
| S096 | 기능별 평가의 해석 범위 | 과제별 모듈 활성화와 전체 시스템 비교는 어떤 인과 결론을 허용하는가? | App.G.3–G.4 pp.51–52; Q1 | 대기 |

### 09. Ablation과 근거의 강도

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S097 | Ablation 읽는 기준 | 바꾼 요소·고정한 조건·평가 지표·남은 대안 설명은 무엇인가? | Sec.6.5 pp.24–26; 공부 중 검토 기준 | 대기 |
| S098 | Table 2(a)의 층 선택 | 세 후보 중 18층 우세와 저자의 의미·시각 균형 해석은 어떻게 다른가? | Table2a pp.24–25; Q4 | 대기 |
| S099 | Table 2(b)의 VQA 비교 | 로봇 VQA 적응의 +3.4%p는 어떤 설정에서 측정됐는가? | Table2b p.25 | 대기 |
| S100 | Figure 19의 attention | 마지막 prompt token의 patch attention은 무엇을 보여주고 무엇은 입증하지 못하는가? | Fig.19 p.25 | 대기 |
| S101 | Table 3의 실험 설계 | 합성 pool25·50·100%와 실제:합성 sampling1:1은 어떻게 다른가? | Table3, Sec.6.5 p.25; Q2 | 대기 |
| S102 | Table 3의 결과 해석 | 합성 규모+9.1%p와 개별 증강·필터 효과는 어디까지 분리됐는가? | Table3 p.25; Q2·Q8 | 대기 |
| S103 | Figure 20·21의 RL 평가 | 전구 조작의 frames·attempts는 성공률 및 denoising step과 어떻게 다른가? | Figs.20–21 p.26; App.C p.43 | 대기 |
| S104 | RECAP 개선의 해석 범위 | 약3배 감소·작은 산포·Teleop 비교와 추가 데이터 효과를 어떻게 구분하는가? | Fig.21, Sec.6.5 p.26; Q3 | 대기 |
| S105 | Table 4의 측정 조건 | 고정 하드웨어·입력·4회 denoising·실행 warmup·p50은 무엇인가? | Table4 p.26 | 대기 |
| S106 | Table 4의 누적 최적화 | 71.2→59.6→48.9→43.7ms와 누적/직전 대비 배수는 어떻게 다른가? | Table4 p.26 | 대기 |
| S107 | 남은 구성 요소 검증 | MSAT·기능 모듈·비율·warmup·초기화에 어떤 통제 비교가 더 필요한가? | Sec.6.5 pp.24–26; Q1·Q2·Q10 | 대기 |

### 10. 중요한 부록의 확장 실험

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S108 | PEFT와 적응 비용 | 마지막4층·action model의 Full FT·LoRA·freeze가 성능·VRAM에 주는 차이는 무엇인가? | App.D Table6 p.44 | 대기 |
| S109 | Best-of-N과 별도 Q critic | 후보N개 생성·평가·선택은 RECAP의 Gemma text critic과 어떻게 다른가? | App.E pp.45–46 | 대기 |
| S110 | Figure 22의 temperature | 초기 노이즈 분산·후보 다양성·예측 Q의 관계는 무엇인가? | App.E Fig.22 p.46 | 대기 |
| S111 | Figure 23의 성능 악화 | 왜 후보 탐색이 RECAP1에는 도움되고 RECAP2·3에는 해로웠는가? | App.E Fig.23 p.46; 원인 설명은 저자 해석 표시 | 대기 |
| S112 | Table 9의 합성 추가 실험 | 잡기 하위 작업의 부분점수66.7→83.3과 완전성공9→14는 어떻게 다른가? | App.G.5 Table9 p.53 | 대기 |
| S113 | Table 10의 batch size | 학습 설정에 따른 큰 성능 차이를 어떻게 해석해야 하는가? | App.G.6 Table10 p.54 | 대기 |
| S114 | 과제별 강건성 결과 | 평균에 가려진 카메라·노이즈·배치 변화의 약점은 무엇인가? | App.G.6 Tables11–12 p.54 | 대기 |
| S115 | 과제별 낮은 성공률 | 주방·휴머노이드·복합작업 결과의 편차와 0%를 어떻게 읽는가? | App.G.6 Tables13–15 p.55 | 대기 |

### 11. 연구의 위치와 결론

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S116 | Related Work의 세 흐름 | VLA·합성 데이터·기능별 연구 속에서 어떤 통합을 차별점으로 주장하는가? | Sec.7 p.27 | 대기 |
| S117 | Conclusion과 검증된 범위 | 시스템 기여·상대적 성과·아직 남은 실제 조작의 어려움은 무엇인가? | Sec.8 p.28; Sec.6 pp.17–26 | 대기 |

### 12. 미해결 질문과 후속 확인

| 슬라이드 ID | 작업 제목 | 설명할 질문 | 원문·공부 근거 | 상태 |
| --- | --- | --- | --- | --- |
| S118 | Memory와 stream 표기 | Queue 갱신·초기화와 H/H+1·C/A 불일치는 어디까지 미해결인가? | Q5·Q6; Sec.2 pp.7–8; Sec.4.2 p.13 | 대기 |
| S119 | Task 실행 가능성 | Skill 후보 제한·판정 기준·생성 prompt에 무엇이 더 필요한가? | Q8; Sec.3.3 p.11; App.B.3 p.42 | 대기 |
| S120 | 수치·집계의 불일치 | Figure7 합계·RoboCasa365 batch·Egg61.1과 시행 수는 어떻게 기록할 것인가? | Q11·Q12·Q13; pp.13,18,24,49,52 | 대기 |
| S121 | 추가로 필요한 실험 | 독립 ablation·평가 예산·classifier 신뢰성·latency 꼬리를 어떻게 확인할 것인가? | Q1·Q2·Q10; Sec.6.5 pp.24–26 | 대기 |

## 검토와 재개 규칙

- 사용자 표현 "목차는 그대로 가도 좋을 거 같아."에 따라 목차 v01은 승인됐다. 개별 슬라이드 승인은 아직 없다.
- 다음 첫 후보 S001만 v01로 제작한다. 실제 Slidev 화면에서 PNG를 내보내고 직접 확인한 뒤 보여준다.
- 사용자 피드백을 review/FEEDBACK.md에 기록하고 같은 장을 수정한다. 명시적인 승인 전에 다음 장을 제작하지 않는다.
- 각 장 승인·수정·공통 CSS 영향은 review/PROGRESS.md의 ID·버전·미리보기·실제 승인 표현에 연결한다.
- ID는 설명 단위 식별자이며 현재 화면 번호와 구분한다. 분할이 필요하면 기존 ID를 재사용·재번호화하지 않고 새 ID를 추가한다.
- GitHub 생성·push·배포는 이 단계에 포함되지 않는다.
