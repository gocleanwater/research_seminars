# RLDX-1 Architecture

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P031] RLDX-1 Overview

<!-- slide-meta
layout: figure
kind: fact
source_ids: S122, S005, S006, S007
figure: fig-02.png
caption: Figure 2 · RLDX-1 전체 흐름
-->

### 한 문장

관측과 지시를 표현으로 바꾸고, 로봇 상태·센서와 함께 미래 action chunk를 만든다.

### 본문

#### 관측 → 표현 → 행동

**영상·지시:** VLM에서 현재 cognition features를 추출한다.

**과거:** Memory Module이 이전 cognition 정보를 더한다.

**상태·센서:** MSAT가 cognition·memory와 함께 처리한다.

**출력:** 여러 미래 시점의 수치 행동을 묶은 action chunk다.

### 보충

### 요점

다음은 Figure 3에서 Vision Encoder와 VLM의 내부 경로를 확대해 살펴본다.

### 출처

Fig.2 · Sec.1.1 · PDF p.5; Fig.1 · PDF p.1

### 발표 메모

전체 시스템 Fig.1·세 로봇 플랫폼·모델 입출력 표기와 지도는 이 장의 상세 해설에 연결한다. 이어지는 Fig.3 해설에서는 전체 구조와 확대된 부위를 오가며 설명한다.

### 상세 공부 기록

#### [S122] 전체 흐름: 무엇을, 어떤 순서로 이해할까

<!-- study-meta
layout: full
kind: interpretation
-->

##### 한 문장

문제에서 출발해 구조·데이터·학습·실행을 연결하고, 실험으로 돌아와 근거를 확인한다.

##### 본문

<div class="roadmap">
<div><b>01</b>
<h3>Problems</h3>
<p>VLA와 세 가지 기능<br>연구 문제와 전체 구조</p></div>
<div><b>02</b>
<h3>Architecture</h3>
<p>VLM·motion·memory<br>Flow matching과 MSAT</p></div>
<div><b>03–05</b>
<h3>Data · Training · Inference</h3>
<p>실제·합성 데이터와 세 단계 학습<br>GPU 추론 최적화</p></div>
<div><b>06–09</b>
<h3>평가 · 결론 · 의견</h3>
<p>벤치마크·ablation·중요 부록<br>결론과 미해결 질문</p></div>
</div>

<p class="reading-key"><span class="label fact">원문</span> 설명·실험 결과 <span class="label interpretation">우리 해석</span> 연결과 의미 <span class="label example">설명용 예시</span> 이해를 위한 단순화 <span class="label question">미해결</span> 아직 확인할 수 없는 점</p>

##### 보충

##### 요점

이번 자료는 발표 시간에 맞춘 요약보다, 함께 공부한 내용을 다시 이해하기 위한 상세한 지도다.

##### 출처

발표 구성: 승인된 OUTLINE.md · 원문 Sec.1–8, 주요 Appendix

##### 발표 메모

전체 목차는 사용자 승인된 121개 설명 단위를 유지한다. 이 장은 목차 탐색을 돕는 추가 S122이며 기존 ID를 바꾸지 않는다. 이후 각 장의 질문과 근거를 연결해 읽는다. 그림은 확대할 수 있고 G로 전체 목차, N으로 보충 설명을 연다.

#### [S005] Figure 1: 모델 하나보다 넓은 시스템 설계

<!-- study-meta
layout: figure
kind: fact
figure: fig-01.png
caption: Figure 1 · RLDX-1 전체 시스템 개요
-->

##### 한 문장

구조·데이터·학습·추론 최적화가 같은 조작 목표를 위해 연결된다.

##### 본문

###### 위: 어떤 경험으로 배우는가

공개 실제 데이터, 자체 센서 시연, 합성 영상·행동 라벨을 결합한다.

###### 가운데: 어떻게 행동을 만드는가

VLM과 기능 모듈의 표현을 MSAT로 연결하고 세 단계 학습으로 적응한다.

###### 아래: 어디서 검증하는가

실제 조작과 시뮬레이션을 평가하고 GPU 추론 지연을 줄인다.

<p class="mini">그림의 성능 주장은 후반부에서 지표·조건·비교 범위를 확인한다.</p>

##### 보충

##### 요점

RLDX-1의 보고된 결과는 아키텍처와 데이터·학습·실행이 함께 구성된 시스템의 결과다.

##### 출처

Fig.1 · PDF p.1; Sec.1 · PDF pp.3–5

##### 발표 메모

그림은 기능 추가만이 아니라 합성 데이터 파이프라인, 3단계 학습, 정적 그래프와 kernel 최적화를 포함한 전체 기여를 요약한다. Fig.1의 수치나 레이더를 성공률로 일괄 읽지 않는다. ALLEX 평균 86.8은 부분 점수와 성공률이 섞인 집계이고, speedup은 정해진 policy latency 측정 조건에 따른 결과다.

#### [S006] OpenArm·ALLEX·Franka는 서로 다른 로봇이다

<!-- study-meta
layout: widefigure
kind: fact
figure: fig-12.png
caption: Figure 12 · 실제 로봇 플랫폼 (a) OpenArm (b) ALLEX (c) Franka
-->

##### 한 문장

같은 모델 계열을 서로 다른 관절·손·센서 구성을 가진 플랫폼에 적용한다.

##### 본문

| OpenArm | ALLEX | Franka |
| --- | --- | --- |
| 28-DoF 상반신 + Inspire hands<br>일반적인 지시·대상 변화 평가 | 48-DoF 상반신 humanoid<br>움직임·기억·물리 센싱 과제 | Franka Research 3 플랫폼<br>단일 팔 + AnySkin 촉각·관절 토크 |

##### 보충

##### 요점

Embodiment는 로봇의 몸과 제어 구성이다. 센서·행동 차원이 다르므로 모델의 입출력 연결도 맞춰야 한다.

##### 출처

Fig.12 · PDF p.19; Sec.3.2 · PDF pp.9–10; App.G.2–G.4 · PDF pp.50–52

##### 발표 메모

ALLEX는 이 보고서의 48-DoF 상반신 humanoid다. OpenArm은 7-DoF 팔 두 개, 6-DoF 손 두 개, 2-DoF 목으로 구성된다. ALLEX는 두 7-DoF 팔, 두 15-DoF 손, 2-DoF 목과 2-DoF 허리를 가진다. Franka 그림에서는 팔/그리퍼의 DoF를 플랫폼 표기 방식으로 나누므로 일반 제조사 팔 관절 수와 혼동하지 않는다. 사용자의 요청에 따라 발표에서는 FR3보다 Franka를 사용한다.

#### [S007] 관측과 지시에서 미래 행동 묶음까지

<!-- study-meta
layout: figure
kind: fact
figure: fig-02.png
caption: Figure 2 · 관측 → cognition·memory → MSAT → action chunk
-->

##### 한 문장

로봇 시점 t에서 필요한 정보를 모으고, 앞으로 여러 시점의 행동을 예측한다.

##### 본문

$$
\text{입력:}\quad \mathbf{c}_t,\;\mathbf{o}_{t-K:t},\;\mathbf{s}_t,\;\mathbf{p}_t
$$

<strong>$\mathbf{c}_{t}$</strong>: 언어 지시<br><strong>$\mathbf{o}_{t-K:t}$</strong>: 여러 프레임 관측<br><strong>$\mathbf{s}_{t}$</strong>: 로봇 자신의 상태<br><strong>$\mathbf{p}_{t}$</strong>: 현재 물리 센서값

$$
\text{출력:}\quad \mathbf{a}_{t:t+H}
$$

H+1개 시점의 행동이 action chunk다. 메모리 모듈은 이전 cognition 정보를 추가로 제공한다.

##### 보충

##### 요점

이제 왼쪽 VLM부터 읽고, 행동 생성 원리를 배운 뒤 오른쪽 MSAT와 전체 그림을 연결한다.

##### 출처

Sec.1.1, Fig.2 · PDF p.5

##### 발표 메모

원문의 $\mathbf{o}_{t-K:t}$는 K+1 프레임을 나타내는 개요 표기다. 실제 학습에서는 간격을 둔 네 프레임을 사용하므로 매 제어 시점의 모든 프레임이라는 뜻으로 고정하지 않는다. Action chunk는 추론에서 한 번에 예측되지만 그 전부를 실행하는지는 별도 설정이다. 이후 denoising timestep $\tau$와 실제 로봇 시간 t도 구별한다.

## [P032] RLDX-1 Architecture

<!-- slide-meta
layout: explorer
kind: fact
source_ids: S008, S009, S010, S011, S012, S013, S014, S015, S016, S017, S018, S019, S035, S040
-->

### 한 문장

전체 그림에서 Vision Encoder·VLM·Memory Module·MSAT를 차례로 살펴본다.

### 본문

Figure 3의 네 모듈을 누르거나 방향키로 확대해 입력·처리·출력을 살펴본다.

### 보충

### 요점

전체 → Vision Encoder → 전체 → VLM → 전체 → Memory Module → 전체 → MSAT

### 출처

Fig.3 · PDF p.6; Sec.2.1–2.2 · PDF pp.7–9; 추출 층 비교: Table2(a), pp.24–25

### 발표 메모

그림은 시각적 요약이다. Vision Encoder는27층 중9층 뒤에 motion module을 삽입한다. LLM에서는4층 뒤에 과거 관측을 압축한다. 화면은 중간층이라고 설명하며, 실제18층 선택과 비교 실험은 연결된 상세 해설에 보존한다. Memory는 과거 Qₜ와 현재 hₜ를 concat해 mₜ를 만들고, hₜ·mₜ를 concat한 토큰을 C stream에 제공한다. MSAT는 초반 stream별 residual과 후반 C-A concat을 구분하며, 한 forward의 변화율로 미래 후보를 반복 갱신한다. Memory 구조와 stream 전환은 이 확대 설명에서 마무리한다. 다음 P009–P010에서 입력과 내부 연산을 살펴본 뒤 P006–P008에서 학습 변화율과 추론 갱신 수식을 연결한다. 로봇별 projection은 P016의 공통·전용 경로와 함께 설명한다. 약30% 깊이의 동기를 모든 설정에서 최적이라는 실험 결과로 과장하지 않는다.

### 확대 단계

#### [0] RLDX-1 Architecture

핵심: 네 모듈을 누르거나 오른쪽 방향키로 처리 경로를 차례로 살펴본다.

설명: 영상·언어 표현에서 시작해 긴 기억과 물리 센서를 연결하고, 행동 생성까지 따라간다.

요점: 전체 → Vision Encoder → 전체 → VLM → 전체 → Memory Module → 전체 → MSAT

#### [1] Vision Encoder

핵심: 영상의 시각 특징에 프레임 간 움직임 정보를 추가한다.

설명: 총 27개 ViT 층 가운데 9층 뒤에 Motion Extractor를 연결한다. 다음 설명 버튼을 눌러 각 경로를 살펴본다.

요점: 다음 설명을 누르면 시각 특징 → STSS → residual → 후속 층 순으로 표시된다.

#### [2] Vision Encoder

핵심: 총 27층 중 먼저 1–9층에서 시각 특징을 추출한다.

설명:

요점: Motion Extractor의 입력은 처음 9개 층을 거친 시각 특징이다.

#### [3] Vision Encoder

핵심: 9층 뒤에서 주변 시공간 특징의 유사성으로 움직임 정보를 구한다.

설명:

요점: STSS는 이웃 특징 간 상관을 담고, STSS encoder가 움직임 특징으로 변환한다.

#### [4] Vision Encoder

핵심: 추출한 움직임 특징을 기존 시각 특징에 residual로 더한다.

설명:

요점: 기존 표현을 교체하는 대신, 같은 위치의 특징에 움직임 정보를 더해 보정한다.

#### [5] Vision Encoder

핵심: 10–27층은 움직임 정보가 더해진 시각 특징을 계속 처리한다.

설명:

요점: 다음 설명을 누르면 전체 Fig.3으로 돌아간다.

#### [6] RLDX-1 Architecture

핵심: 이제 VLM을 누르거나 오른쪽 방향키로 영상·언어·cognition의 흐름을 살펴본다.

설명: 시각 인코더가 만든 특징은 언어 지시와 cognition tokens에 연결된다. VLM에서 이 표현을 어떻게 모으고 압축하는지 살펴본다.

요점: 다음은 VLM: 입력 토큰 → 초반 4층 → 과거 압축 → cognition features.

#### [7] VLM

핵심: 영상·언어·cognition tokens를 함께 처리하고, 행동에 필요한 위치의 출력을 선택한다.

설명: Qwen3-VL 8B를 로봇 VQA로 적응시킨 backbone이다. 화살표는 다음 설명부터 한 단계씩 나타난다.

요점: 다음 설명을 누르면 토큰 입력부터 특징 추출까지 표시된다.

#### [8] VLM

핵심: 세 구간의 색과 이름을 구분하고, 이 토큰들을 이어 붙여 VLM에 입력한다.

설명:

요점: 보라색: 영상 토큰 · 연한 초록색: 언어 토큰 · 청록색: cognition tokens 64개

#### [9] VLM

핵심: 초반 1–4층은 여러 프레임을 함께 처리하며 시간 맥락을 모은다.

설명:

요점: 초기 4층의 DeepStack 시각 특징 주입을 활용한 뒤 과거 토큰을 압축한다.

#### [10] VLM

핵심: 4층 뒤에서 과거 프레임 특징을 평균내어 context token 하나로 압축한다.

설명:

요점: 과거 프레임 특징만 하나로 압축하고, 현재 관측·언어·cognition 토큰은 유지한다.

#### [11] VLM

핵심: 중간층에서 cognition token 위치의 출력 특징 hₜ를 얻어 행동 생성에 전달한다.

설명:

요점: cognition token 위치의 출력이 행동 생성에 사용할 cognition features hₜ다.

#### [12] RLDX-1 Architecture

핵심: 현재 cognition features hₜ에 더 긴 과거 이력을 연결하는 Memory Module을 살펴본다.

설명: VLM 안의 과거 프레임 압축과, 이전 로봇 시점의 cognition features를 저장하는 장기 기억을 구분한다.

요점: 다음 설명을 누르면 Memory Module을 확대한다.

#### [13] Memory Module

핵심: 이전 시점의 cognition features와 현재 특징으로 긴 이력을 반영한다.

설명: 과거 시점의 cognition features를 저장하고, 현재 특징이 이 이력을 읽는다. 화살표를 한 단계씩 따라간다.

요점: 과거 Qₜ → 현재 hₜ와 concat → memory mₜ → hₜ·mₜ concat 순서다.

#### [14] Memory Module

핵심: 과거 cognition features를 queue Qₜ에 시점별로 저장한다.

설명:

요점: 저장하는 것은 원본 영상이 아니라 이전 VLM이 계산한 cognition features다.

#### [15] Memory Module

핵심: 과거 queue Qₜ와 현재 cognition features hₜ를 토큰 방향으로 concat한다.

설명:

요점: 과거 기록을 담은 Qₜ와 현재 입력 hₜ를 구분한다.

#### [16] Memory Module

핵심: 현재 특징이 causal attention으로 과거 이력을 읽어 memory features mₜ를 만든다.

설명:

요점: 미래 시점의 정보를 보지 않으며, 과거·현재의 특징을 처리한다.

#### [17] Memory Module

핵심: 현재 hₜ와 memory mₜ를 concat해 MSAT의 C stream으로 전달한다.

설명:

요점: hₜ·mₜ를 이어 붙인 cognition·memory 토큰이 C stream의 입력이 된다.

#### [18] RLDX-1 Architecture

핵심: 이제 cognition·memory와 로봇 상태·센서를 처리하는 MSAT를 살펴본다.

설명: 입력 P/C/A를 먼저 구분하고, Triple-stream → Double-stream → Denoising 순서로 따라간다.

요점: 다음 설명을 누르면 MSAT를 확대한다.

#### [19] MSAT

핵심: 현재 조건과 noisy 미래 후보를 구분하고, stream 사이의 정보 교환을 살펴본다.

설명: 그림은 물리 센서가 있는 경우다. 초반에는 P/C/A, 후반에는 P와 C-A의 두 경로를 사용한다.

요점: P/C/A 입력 → Triple-stream → C-A/P Double-stream → 변화율·반복 갱신

#### [20] MSAT의 입력

핵심: P stream은 현재 센서값과 noisy 미래 센서 후보를 함께 입력받는다.

설명:

요점: 현재 센서값은 조건이고, noisy 미래 센서 신호는 생성할 후보다.

#### [21] MSAT의 입력

핵심: C stream은 hₜ와 mₜ를 토큰 방향으로 concat한 cognition·memory 입력이다.

설명:

요점: C stream의 concat(hₜ,mₜ)는 현재 장면과 긴 이력을 함께 제공한다.

#### [22] MSAT의 입력

핵심: A stream은 현재 로봇 상태와 noisy action chunk를 입력받는다.

설명:

요점: 그림에 생략된 denoising timestep τ도 A stream 앞의 토큰으로 전달된다.

#### [23] MSAT의 블록

핵심: Triple-stream에서 각 stream은 자신의 경로를 유지하며 joint attention으로 정보를 교환한다.

설명:

요점: stream별 Q/K/V → joint attention → 분리 → stream별 residual update

#### [24] MSAT의 블록

핵심: 후반에는 C와 A를 토큰 방향으로 concat하고, P와 C-A의 Double-stream으로 처리한다.

설명:

요점: 초반 residual 덧셈과 후반 C-A concat은 서로 다른 연산이다.

#### [25] MSAT의 행동 생성

핵심: 한 forward에서 예측한 변화율로 미래 후보를 갱신하고 denoising을 반복한다.

설명:

요점: 반복이 끝나면 Future Actions와 Future Signals를 얻는다. 현재 조건은 계속 참조한다.

#### [26] RLDX-1 Architecture

핵심: 영상·언어 → cognition → memory → MSAT → 미래 행동·센서 신호를 연결했다.

설명: Vision Encoder는 움직임, VLM은 행동용 표현, Memory는 긴 이력, MSAT는 조건부 미래 후보 갱신을 담당한다. 네 영역을 눌러 다시 볼 수 있다.

요점: 다음은 MSAT 입력과 Joint Attention을 자세히 보고, 학습·추론 수식으로 연결한다.

### 화살표 설명

#### [vision-1] 총 27층 · 먼저 1–9층

설명: 영상의 시각 특징을 추출한다.

#### [vision-2] 9층 뒤 · Motion Extractor

설명: 이웃 시공간 특징의 STSS를 계산하고 움직임 특징을 만든다.

#### [vision-3] Residual addition

설명: 움직임 특징을 기존 시각 특징에 더한다.

#### [vision-4] 이후 10–27층

설명: 움직임 정보가 포함된 시각 특징을 계속 처리한다.

#### [vlm-1] 세 종류의 입력 토큰

설명: 영상·언어·cognition 토큰을 함께 입력한다.

#### [vlm-2] 초반 1–4층

설명: 여러 프레임 정보를 읽어 시간 맥락을 모은다.

#### [vlm-3] 4층 뒤 · 과거 프레임 압축

설명: 과거 프레임 특징을 context token 하나로 압축한다.

#### [vlm-4] 중간층 · cognition 특징 추출

설명: cognition token 위치의 출력 hₜ를 행동 생성에 전달한다.

#### [memory-1] 과거 cognition features · Qₜ

설명: 과거 3시점 × 64개 = 192개 특징 벡터를 저장한다.

#### [memory-2] 과거와 현재를 concat

설명: 과거 Qₜ와 현재 hₜ를 토큰 방향으로 이어 붙인다.

#### [memory-3] Causal Transformer → mₜ

설명: 과거 이력을 읽어 memory 특징 mₜ를 만든다.

#### [memory-4] hₜ·mₜ concat → C stream

설명: 두 특징을 이어 붙여 행동 모델에 전달한다.

#### [msat-1] P stream · 물리 센서

설명: 현재 센서 · noisy 미래 센서 후보

#### [msat-2] C stream · cognition·memory

설명: hₜ와 mₜ를 토큰 방향으로 concat

#### [msat-3] A stream · 로봇 상태·행동

설명: 현재 상태 · noisy action chunk

#### [msat-4] Triple-stream · 정보 교환

설명: joint attention 뒤 다시 분리해 각 stream에서 residual로 갱신한다.

#### [msat-5] C-A concat → Double-stream

설명: C와 A를 통합한다. P와 C-A는 계속 정보를 교환한다.

#### [msat-6] 변화율 → Denoising 반복

설명: 조건은 유지, 후보는 반복 갱신. 끝나면 미래 행동·센서 신호를 얻는다.

### 그림 위 표시

#### [vlm-video] 영상 토큰

#### [vlm-language] 언어 토큰

#### [vlm-cognition] cognition tokens · 64개

#### [memory-past] 과거 Qₜ

#### [memory-current] 현재 hₜ

#### [memory-output] mₜ

#### [stream-p] P stream

#### [stream-c] C stream

#### [stream-a] A stream

#### [stream-c-concat] concat(hₜ,mₜ)

### 상세 공부 기록

#### [S008] 로봇용 VQA 적응

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

장면을 설명하는 능력을 로봇의 공간 관계·하위 작업·행동과 연결한다.

##### 본문

###### 기반 모델에 더하는 로봇 경험

<div class="flow">
<div class="node">Qwen3-VL 8B</div>
<div class="arrow">→</div>
<div class="node">로봇 VQA로<br>fine-tuning</div>
<div class="arrow">→</div>
<div class="node">RLDX-1-VLM</div>
</div>

범용 시각·언어 이해만으로는 목표를 위해 지금 어떤 하위 작업을 해야 하는지, 손과 물체가 어떤 공간 관계인지, 관측과 제어가 어떻게 연결되는지 충분하지 않을 수 있다. 저자는 로봇 trajectory 관측에서 세 종류의 질문·답을 만든다.

##### 보충

###### 세 가지 supervision

- **공간 관계:** end-effector와 목표 물체 사이의 관계.
- **중간 subtask:** 전체 목표를 위한 현재 단계.
- **낮은 수준의 action:** 현재 로봇 프레임에 대응하는 행동.

<span class="label example">질문 형식의 설명용 예시</span> “컵은 손의 어느 쪽에 있는가?” “집은 뒤 무엇을 해야 하는가?”처럼 로봇 판단에 필요한 단서를 묻는다. 실제 데이터의 prompt를 그대로 인용한 것은 아니다.

##### 요점

VQA는 행동을 직접 실행하는 단계가 아니라, 행동에 유용한 VLM 표현을 만드는 적응 단계다.

##### 출처

Sec.2.1 · PDF pp.6–7

##### 발표 메모

원문은 Qwen3-VL 8B를 로봇 관련 VQA 데이터로 fine-tuning한 결과를 RLDX-1-VLM으로 사용한다고 설명한다. VQA의 답 형식·개별 prompt·정확한 dataset 규모는 이 문단에서 제시하지 않는다. 행동 출력은 뒤의 action model이 담당한다. Table2b의 57.5→60.9 비교는 뒤의 별도 ablation 장에서 다루며, 전체 recipe의 모든 효과로 일반화하지 않는다.

#### [S009] Cognition tokens와 hₜ

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

학습 가능한 64개 query를 뒤에 붙이고, 그 위치의 hidden states를 행동 모델로 보낸다.

##### 본문

###### 입력은 함께, 출력은 선택해서

$$
\mathbf{v}_t=E_\theta(\mathbf{o}_{t-K:t})
$$

<div class="token-row"><span class="token">영상 $\mathbf{v}_{t}$</span><span class="token">언어 $\boldsymbol{\ell}_{t}$</span><span class="token c">q × 64</span></div>

영상 특징과 지시 토큰 뒤에 cognition tokens **q**를 이어 붙여 VLM backbone에 넣는다. q는 학습 가능한 query tokens로, 앞의 시각·언어 맥락을 참고해 행동 예측에 필요한 정보를 모은다.

##### 보충

###### 어느 출력을 가져오는가?

$$
\mathbf{h}_t=F_\theta\bigl([\mathbf{v}_t,\boldsymbol{\ell}_t,\mathbf{q}]\bigr)_{\mathbf{q}\text{ 위치}}
$$

선택한 Transformer 층에서 **cognition token 위치에 대응하는 출력들**을 $\mathbf{h}_{t}$로 남긴다. 나머지 위치의 출력은 action decoder 전달용으로 버린다. $\mathbf{h}_{t}$는 단일 숫자나 자연어 문장이 아니라 여러 hidden vectors로 이루어진 표현이다.

<p class="callout">64는 cognition token 수다. 영상 patch token 수나 생성할 action 개수를 뜻하지 않는다.</p>

##### 요점

“뒤에 붙인 학습 가능한 질문 64개가 현재 장면·지시를 행동용 표현으로 읽어낸다.”

##### 출처

Sec.2.1 Cognition Tokens · PDF p.7

##### 발표 메모

수식의 아래첨자 cognition token 위치는 원문을 읽기 쉽게 선택 연산으로 풀어 쓴 표기다. 원문은 $\mathbf{x}=[\mathbf{v}_t,\boldsymbol{\ell}_t,\mathbf{q}]$를 입력하고 cognition token에 대응하는 출력 특징만 남긴다고 명시한다. q를 “무조건 정보를 모두 보존하는 압축”으로 설명하지 않는다. 이때 cognition의 hidden states를 추출하는 층은 S010에서 분리해 설명한다.

#### [S010] 특징을 추출하는 층

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

18층 hidden states를 선택하는 것과 언어 출력 head를 바꾸는 것은 다른 선택이다.

##### 본문

###### 층 안의 표현과 마지막 출력

<div class="sequence">
<div class="step">입력 → 초기 Transformer 층: 시각·언어 특징 처리</div>
<div class="step"><strong>중간 18층 → cognition token 위치 특징 $\mathbf{h}_{t}$ 추출 → action model</strong></div>
<div class="step">더 뒤의 Transformer 층 → 언어 출력 head → 텍스트 예측</div>
</div>

논문은 마지막 LLM 층 대신 중간층의 특징을 사용한다. 언어 생성에 특화된 후기 표현보다 조작에 필요한 시각 정보와 의미 정보의 균형이 낫다는 것이 저자의 설명이다.

##### 보충

###### 실험이 보여준 범위

| 선택 층 | 성공률 |
| --- | --- |
| 8층 | 51.1% |
| **18층** | **60.9%** |
| 28층 | 56.3% |

RoboCasa Kitchen의 별도 base-architecture 실험에서 세 후보 중 18층이 가장 높다. “모든 층·모든 작업에서 18층이 최적”인 결과는 아니다.

<p class="mini">후기 블록과 vocabulary 출력 head는 서로 다른 요소다.</p>

##### 요점

특징을 어디서 꺼낼지는 실험한 설계 선택이며, 출력 head 자체를 선택하는 문제가 아니다.

##### 출처

Sec.2.1 · PDF p.7; Sec.6.5, Table2(a) · PDF pp.24–25

##### 발표 메모

원문은 action decoding에 intermediate hidden states를 사용한다고 설명하고, Sec6.5는 Layer18을 base로 사용한다. 이 ablation의 variant는 대규모 policy pre-training 없이 학습한다고 서술한다. 이미 학습된 Qwen VLM까지 완전 무작위 초기화했다는 뜻으로 읽지 않는다. 시각 grounding와 semantic abstraction의 균형은 수치 자체가 아니라 저자의 해석이다. 뒤의 S098에서 설정과 근거 강도를 다시 다룬다.

#### [S011] 여러 프레임의 표기

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

$\mathbf{o}_{t-K:t}$는 시간 정보를 가진 관측 묶음이며, 실제 학습은 네 시점을 샘플링한다.

##### 본문

###### 한 장으로 구분하기 어려운 움직임

<div class="token-row"><span class="token">t−6</span><span class="token">t−4</span><span class="token">t−2</span><span class="token c">t 현재</span></div>

실제 pre-training 설정은 상대 시간 간격 <strong>{−6, −4, −2, 0}</strong>의 네 프레임을 사용한다. $\mathbf{o}_{t-K:t}$는 과거부터 현재까지의 관측을 묶는 표기이며, 이 실험에서 모든 중간 시점을 빠짐없이 넣는다는 뜻은 아니다.

$$
\mathbf{v}_t=E_\theta(\text{여러 시점의 영상 관측})
$$

##### 보충

###### 같은 위치라도 움직임은 다를 수 있다

<span class="label example">설명용 상황</span> 공이 현재 화면 중앙에 있어도, 과거에 왼쪽에 있었다면 오른쪽으로 이동 중이고 과거에 오른쪽에 있었다면 왼쪽으로 이동 중일 수 있다. 여러 프레임은 그 차이를 판단할 단서를 준다.

$\mathbf{v}_{t}$는 그 관측 묶음을 vision encoder로 처리한 특징이다. 영상 원본이나 단일 프레임의 좌표와 동일하지 않다. 각 프레임의 공간 위치와 프레임 간 관계를 다음 motion module에서 함께 활용한다.

##### 요점

시간 범위 표기, 실제 샘플 프레임 수, 영상 특징은 각각 구분해서 읽어야 한다.

##### 출처

Sec.2.1 · PDF p.7; Sec.4.1 Implementation Details · PDF p.13

##### 발표 메모

네 프레임의 상대 offset은 원문 PDF13에서 직접 확인했다. fps를 가정해 초 단위로 환산하지 않는다. 여러 카메라 view가 있을 수 있으나 여기의 네 시점과 카메라 개수는 서로 다르다. Vision token 수를 cognition token64개와 혼동하지 않는다. 여러 프레임 입력은 pre-training부터 있으며 STSS 모듈 추가는 mid-training에서 다룬다.

#### [S012] Motion module과 STSS

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

특징의 시공간 이웃 간 유사성에서 “어디로 무엇이 달라졌는가”의 단서를 만든다.

##### 본문

###### 특징을 바로 행동으로 바꾸기 전에

<div class="sequence">
<div class="step">ViT 앞 i개 층 → 시공간 특징 $\mathbf{v}_{t}^{(i)}$</div>
<div class="step">각 특징과 주변 시공간 이웃의 correlation → STSS tensor $S_{t}$</div>
<div class="step">STSS encoder $S_{\theta}$($S_{t}$) → motion features</div>
</div>

STSS는 **space-time self-similarity**다. 시간과 공간으로 가까운 특징들의 대응·변화를 계산한 결과를 별도 encoder가 읽어 움직임을 표현한다.

##### 보충

###### 공이 오른쪽으로 이동한다면

<span class="label example">직관을 위한 예시</span> 이전 프레임의 공 특징이 다음 프레임의 오른쪽 이웃과 더 비슷하다면, 그 correlation 배치가 이동 방향의 단서가 될 수 있다. 논문이 이 모듈의 출력을 정확한 optical flow나 공의 속도값이라고 정의한 것은 아니다.

실제 삽입 위치는 vision encoder **27층 중 9층 뒤**다. 저자는 약 30% 깊이에 물리 관련 단서가 풍부하다는 선행 관찰을 동기로 들며, 여기서 모든 삽입 위치를 비교한 실험을 제시하지 않는다.

##### 요점

STSS는 이웃 특징의 관계를 계산해 움직임 단서를 더하는 모듈이다.

##### 출처

Sec.2.1 Functionality1: Motion Awareness · PDF p.7

##### 발표 메모

원문은 각 spatio-temporal feature와 local neighbors의 correlation을 계산한다고 명시한다. 이 설명만으로 이웃의 정확한 크기, 상관 함수의 normalization, tensor shape를 확정하지 않는다. STSS를 attention softmax와 동일시하지 않는다. $\mathbf{S}_t$는 STSS tensor이고 $S_\theta$는 그 tensor를 읽는 학습 모듈이다. 이 모듈을 적용한 후 residual update하는 식은 다음 S013에서 확대한다.

#### [S013] Residual connection

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

원래 시각 특징을 유지하는 경로에 움직임 특징의 보정을 원소별로 더한다.

##### 본문

###### 원문의 residual update

$$
\widetilde{\mathbf{v}}_t^{(i)}=\mathbf{v}_t^{(i)}+S_\theta(\mathbf{S}_t)
$$

- <strong>$\mathbf{v}_{t}^{(i)}$:</strong> vision encoder 앞 i층이 만든 기존 특징.
- <strong>$S_{\theta}$($S_{t}$):</strong> 시공간 유사성에서 얻은 motion features.
- <strong>$\widetilde{\mathbf{v}}_t^{(i)}$:</strong> 보정 후 뒤쪽 vision 층으로 전달할 특징.

덧셈 가능한 shape로 두 표현을 맞춘 뒤 더한다. 특징 벡터를 길게 이어 붙이는 concat과는 다르다.

##### 보충

###### 숫자로 보는 보정

<span class="label example">2차원 설명용 예시</span>

$$
\text{기존 특징}\quad [2.0,\,1.0]
$$

$$
+\;\text{움직임 보정}\quad [0.3,\,-0.2]
$$

$$
=[2.3,\,0.8]
$$

출력 차원은 그대로이며 값이 바뀐다. “기존 경로가 있다”는 말은 기존 특징값을 변하지 않게 보관한다는 뜻이 아니다. 뒤의 encoder 층은 합쳐진 표현을 계속 변환한다.

##### 요점

Residual의 +는 같은 위치·차원의 보정이고, concat은 토큰이나 특징을 이어 붙이는 연산이다.

##### 출처

Sec.2.1 Motion Awareness의 residual 식 · PDF p.7

##### 발표 메모

원문 v tilde 식을 그대로 항별로 해설했다. 벡터 숫자는 실제 feature 값이나 모델 계측 결과가 아니다. Residual branch가 언제나 작은 수치를 낸다거나 정보 손실을 없앤다고 주장하지 않는다. MSAT에서도 stream별 residual update가 나오지만, 모듈 위치와 입력은 서로 다르다.

#### [S014] Self-attention과 causal mask

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

뒤쪽 위치는 허용된 앞쪽 정보를 읽어 자신의 표현을 갱신할 수 있다.

##### 본문

###### 정보를 읽는 기본 연산

$$
\begin{aligned}
\operatorname{Attention}(\mathbf{Q},\mathbf{K},\mathbf{V})
&=\operatorname{softmax}\!\left(\frac{\mathbf{Q}\mathbf{K}^{\mathsf T}}{\sqrt d}+\mathbf{M}\right)\mathbf{V}
\end{aligned}
$$

**Q**는 무엇을 찾을지, **K**는 참고할 특징의 주소, **V**는 가져올 내용을 표현하는 학습된 벡터다. mask M은 참고할 수 없는 위치의 점수를 차단한다. 각 query 위치는 허용된 value들을 가중합해 새로운 표현을 얻는다.

<p class="mini">위 식은 Transformer의 일반 배경식이다. RLDX-1 구현의 모든 attention 세부를 정의하는 식은 아니다.</p>

##### 보충

###### 앞→뒤 순서가 하는 일

<span class="label example">세 위치로 단순화</span>

| 읽는 위치 ↓ | 과거 | 현재 | q |
| --- | --- | --- | --- |
| 과거 | ○ | × | × |
| 현재 | ○ | ○ | × |
| q | ○ | ○ | ○ |

초반 LLM의 causal 구조로 과거 맥락을 현재 프레임과 뒤의 cognition tokens에 모은다. 이는 action을 한 개씩 생성한다는 뜻은 아니다.

##### 요점

Causal mask는 정보 접근 방향을 정한다. 위치마다 표현을 계산하는 것과 순차 행동 생성은 구분한다.

##### 출처

Sec.2.1 · PDF p.7; 배경: Vaswani et al., Sec.3.2 (arXiv:1706.03762)

##### 발표 메모

일반 scaled dot-product attention과 causal masking은 원전 https://arxiv.org/html/1706.03762v7 의 Sec3.1–3.2를 참조했다. 표는 로봇 관측과 q의 시간순서를 설명하는 단순화이며, 실제 Qwen3-VL의 multimodal mask 전체를 재현한 표가 아니다. M의 허용 위치는0, 차단 위치는−∞로 두는 배경 설명이다. MSAT의 joint attention에 이 causal mask를 그대로 적용한다고 주장하지 않는다.

#### [S015] 과거 프레임 압축

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

LLM의 4층 뒤에서 과거 관측 hidden states를 한 context token으로 평균 낸다.

##### 본문

###### 초반에는 시간 맥락을 읽는다

<div class="sequence">
<div class="step">초기 4층: 시간순 영상 토큰 + 지시 + q를 처리</div>
<div class="step">과거 관측 hidden states → average pooling → context 1개</div>
<div class="step">이후 층: context + 현재 관측 + 지시 + q를 처리</div>
</div>

현재 프레임은 남기고, **과거 관측 위치의 표현**을 평균 낸 context token으로 교체한다. 원본 영상을 평균 내서 흐린 한 장을 만드는 과정이 아니다.

##### 보충

###### 왜 4층까지 기다리는가?

Qwen3-VL의 **DeepStack**은 vision encoder의 여러 수준 특징을 초기 4개 LLM 층에 주입한다. 저자는 이 과정을 압축 없이 활용하도록 4층 뒤에 압축한다고 설명한다.

$$
\mathrm{context}=\frac{\mathbf{z}_1+\cdots+\mathbf{z}_{N_{\mathrm{past}}}}{N_{\mathrm{past}}}
$$

<p class="eq-caption">원문의 average pooling을 풀어 쓴 개념식. z는 해당 층의 과거 관측 hidden vectors다.</p>

토큰 수를 줄여 이후 attention 계산을 가볍게 하면서, 초반에 모인 시간 맥락을 활용하려는 설계다.

##### 요점

압축 대상은 과거 관측 표현이고, 현재 관측·지시·cognition 위치는 계속 유지한다.

##### 출처

Sec.2.1 Motion Awareness, LLM backbone · PDF p.7

##### 발표 메모

원문은 과거 observations를 single context token으로 압축하고 현재 관측·지시·q와 함께 후속 블록에서 처리한다고 명시한다. 평균식은 해설용이다. 모든 camera/view별 실제 token grouping이나 구현상 packing 방식은 이 문단에서 명시되지 않는다. 4층 선택 이유는 DeepStack 활용이며, 2층 대비 성능 개선치를 이 절이 보고하는 것은 아니다. VLM 내부 context token을 이후 장의 memory features와 구별한다.

#### [S016] Context·cognition·memory

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

세 표현은 모두 맥락을 담지만, 생성 위치와 전달 경로가 다르다.

##### 본문

###### 만드는 위치부터 구분하기

| 표현 | 생성 | 사용 |
| --- | --- | --- |
| context token | LLM 4층 뒤<br>과거 관측 평균 | LLM 후속 층의 입력 |
| $\mathbf{h}_{t}$ cognition | 선택 층의<br>cognition token 위치 출력 | memory와 action model |
| $\mathbf{m}_{t}$ memory | 과거 Qₜ와 현재 hₜ를 concat해<br>memory Transformer로 처리 | $\mathbf{h}_{t}$와 함께 action model |

##### 보충

###### 한 가지 “기억 벡터”가 아니다

context token은 **이번 VLM 입력 안의 과거 프레임**을 줄이는 표현이다. $\mathbf{h}_{t}$는 현재 관측 묶음과 지시에서 추출한 행동용 특징이다. memory queue는 이전 로봇 시점들에서 만들어 둔 h를 보관해 더 긴 이력을 제공한다.

<span class="label interpretation">해석</span> 짧은 영상의 시간 정보와 더 긴 작업 이력을 서로 다른 단계에서 처리하는 구조로 볼 수 있다. 두 시간 범위의 실제 효과가 이 표만으로 입증되는 것은 아니다.

##### 요점

VLM 안의 프레임 압축과 VLM 뒤의 memory module을 같은 연산으로 읽지 않는다.

##### 출처

Fig.3, Sec.2.1 · PDF pp.6–7

##### 발표 메모

원문은 64 cognition tokens, past observation single context token, memory queue nmem3을 각각 명시한다. 세 개수를 서로 같은 것으로 해석하지 않는다. $\mathbf{m}_t$가 어떤 출력 위치만 선택하는지의 세부는 본문의 $\mathbf{m}_t=M_\theta([\mathbf{Q}_t,\mathbf{h}_t])$ 이상으로 임의 보완하지 않는다. Fig3의 memory module을 볼 때 VLM 내부 Video Token Compression과의 위치 차이를 함께 짚는다.

#### [S017] Memory queue

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

과거 cognition features 3묶음에 현재 $\mathbf{h}_t$를 붙여 긴 이력을 다시 읽는다.

##### 본문

###### 저장하는 것은 과거 영상 원본이 아니다

<div class="token-row"><span class="token c">과거 h ①</span><span class="token c">과거 h ②</span><span class="token c">과거 h ③</span></div>

$$
\mathbf{Q}_t=[\text{과거 cognition features 3묶음}]
$$

<div class="flow">
<div class="node">[$\mathbf{Q}_{t}$, $\mathbf{h}_{t}$]</div>
<div class="arrow">→</div>
<div class="node">Memory<br>Transformer</div>
<div class="arrow">→</div>
<div class="node">$\mathbf{m}_{t}$</div>
</div>

현재 관측에 보이지 않는 과거 사건이 행동에 필요할 때를 위해, 이전에 계산한 행동용 특징을 cache에 저장한다.

##### 보충

###### 서로 다른 두 개의 수

<strong>$n_{\mathrm{mem}}$=3</strong>은 cache에 남기는 과거 시점 묶음 수다. 각 h는 cognition features이므로 “숫자 3개”나 “q token 3개”를 뜻하지 않는다. 현재 $\mathbf{h}_{t}$를 더하면 시간상 네 묶음을 memory module이 처리한다.

<span class="label example">Shell game의 직관</span> 컵의 현재 외형만 같아 보여도, 앞서 무엇을 어느 컵에 숨겼는지가 선택을 바꿀 수 있다. queue는 그 과거 관측의 표현을 전달하는 통로다.

##### 요점

긴 이력의 저장 단위는 과거 시점의 cognition features이며, 현재 특징과 함께 읽는다.

##### 출처

Sec.2.1 Functionality2: Long-Term Memory · PDF p.7

##### 발표 메모

원문 memory module은 lightweight Transformer이며 $n_{\mathrm{mem}}=3$이다. $\mathbf{h}_t$는64 cognition token의 hidden features라는 앞 설명을 유지한다. 저장한 features의 dtype·메모리 크기, gradient 처리, 실제 cache 교체 코드는 이 절에서 확인하지 않았다. 설명용 shell game 예시는 원문에 든 대표 동기이며, 정확한 평가 절차는 S090/S094에서 구분한다.

#### [S018] 시간 범위와 갱신의 미해결점

<!-- study-meta
layout: split
kind: question
-->

##### 한 문장

저장 간격과 과거 범위는 제시되지만, 매 시점의 cache 관리 규칙까지 확정되지는 않는다.

##### 본문

###### 본문에서 확인한 시간 범위

| 설정 | chunk 길이 | 과거 범위 |
| --- | --- | --- |
| ALLEX | 40 timesteps | 120 timesteps |
| Franka | 16 timesteps | 48 timesteps |

Sec.4.2는 세 묶음을 **H+1 간격**으로 저장하며 chunk 길이에 맞춘다고 설명한다. 이 수치를 실제 초 단위로 읽으려면 제어 주기 등 추가 정보가 필요하다.

##### 보충

###### 표기와 명세의 남은 질문

$$
\mathbf{Q}_t=[\mathbf{h}_{t-3H},\mathbf{h}_{t-2H},\mathbf{h}_{t-H}]
$$

Sec.2.1의 문장은 **H+1**, 바로 아래 queue 수식은 **H** 간격이다.

- 로봇 시점 t가 바뀔 때 언제 저장·교체하는가?
- 시작 시 과거 세 묶음이 부족하면 무엇으로 채우는가?
- episode 경계에서 queue를 어떻게 초기화하는가?

<p class="mini">이 규칙은 검토한 문단에서 확인되지 않았다. 임의의 고정 격자표로 구현 동작을 확정하지 않는다.</p>

##### 요점

시간 간격의 서술과 정확한 갱신·초기화 알고리즘을 구분하고 미해결로 남긴다.

##### 출처

Sec.2.1 · PDF p.7; Sec.4.2 Functionality Expansion · PDF p.13; 질문노트 Q5

##### 발표 메모

H+1=40이면 H=39라고 단순 대입해서 원문의 $\mathbf{h}_{t-H}$식과 memory120 범위를 동시에 일치시킬 수 없다. 이 장은 불일치를 임의 수정하지 않는다. 저자 코드의 exact cache policy는 확인하지 않았고, 본문 명세 불충분을 모델 자체의 동작 결함으로 확대하지 않는다. AppC의40예측/20실행 설정 역시 모든 memory 저장 타이밍을 해명하는 근거가 아니다.

#### [S019] Memory features mₜ

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

Causal memory Transformer의 출력과 현재 $\mathbf{h}_t$를 모두 행동 모델로 전달한다.

##### 본문

###### 과거→현재 방향으로 이력을 통합

$$
\mathbf{m}_t=M_\theta([\mathbf{Q}_t,\mathbf{h}_t])
$$

<div class="sequence">
<div class="step">오래된 h → 더 최근 h → 현재 h 순서로 입력</div>
<div class="step">나중 시점의 cognition은 자신과 앞선 시점만 참고</div>
<div class="step">이력을 반영한 $\mathbf{m}_{t}$ 생성</div>
</div>

causal attention은 나중 시점이 이전 이력을 참고할 수 있게 하면서 시간 순서를 보존한다. 현재 관측만으로 드러나지 않는 작업 진행 상태를 읽으려는 설계다.

##### 보충

###### 현재 표현도 따로 남긴다

<div class="flow">
<div class="node">현재 $\mathbf{h}_{t}$</div>
<div class="arrow">↘</div>
<div class="node">Action model<br>[$\mathbf{h}_{t}$, $\mathbf{m}_{t}$]</div>
</div>

<div class="flow">
<div class="node">Memory $\mathbf{m}_{t}$</div>
<div class="arrow">↗</div>
<div class="node">현재 + 긴 이력</div>
</div>

memory output으로 $\mathbf{h}_{t}$를 완전히 대체하지 않는다. 원문은 두 특징을 모두 전달한다고 명시한다. 대괄호를 사용한 입력 표기만으로 두 벡터를 원소별로 더한다고 해석해서는 안 된다.

##### 요점

이제 $\mathbf{h}_t$·$\mathbf{m}_t$는 조건이 된다. 다음 단계는 이 조건 아래 미래 행동 chunk를 생성하는 일이다.

##### 출처

Sec.2.1 Long-Term Memory; Sec.2.2 · PDF pp.7–8

##### 발표 메모

원문은 memory features $\mathbf{m}_t$와 original cognition tokens $\mathbf{h}_t$를 모두 action model에 feed한다고 명시한다. $\mathbf{m}_t$의 정확한 output selection이나 learned pooling은 제공된 식 이상으로 확정하지 않는다. 그림의 화살표 두 개는 병행 전달을 설명하며 실제 별도 network 두 개를 의미하지 않는다. 이후 flow matching 설명에서 $\mathbf{c}_t=[\mathbf{h}_t,\mathbf{m}_t,\mathbf{s}_t,\mathbf{p}_t]$의 구성 요소로 연결한다.

#### [S035] Triple-stream에서 double-stream으로

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

물리 신호가 있을 때는 C와 A가 합쳐진 뒤에도 P 경로가 따로 남는다.

##### 본문

###### 센서가 있는 경우

<div class="token-row"><span class="token c">C</span><span class="token a">A</span><span class="token p">P</span></div>

**초반 triple-stream:** 세 경로가 각자의 파라미터로 처리되면서 joint attention을 수행한다.

$$
\operatorname{concat}(\mathbf{C},\mathbf{A})\to\text{C-A}
$$

<div class="token-row"><span class="token a">C-A 통합 stream</span><span class="token p">P stream</span></div>

**후반 double-stream:** C-A와 P 사이에서도 attention으로 정보를 교환한다.

##### 보충

###### 센서가 없는 기본 구조

<div class="sequence">
<div class="step">초반: C / A의 double-stream</div>
<div class="step">후반: 합쳐진 C-A의 single-stream</div>
</div>

따라서 “double-stream”이라는 말만으로 어느 단계를 가리키는지 알 수 없다. 센서가 없는 초반의 C/A인지, 센서가 있는 후반의 C-A/P인지 문맥을 함께 봐야 한다.

<p class="mini">Fig.3은 물리 경로까지 포함한 확장 구조를 보여준다. P stream을 끄는 것은 전체 모델의 motion·memory까지 모두 끄는 설정이 아니다.</p>

##### 요점

초반은 모달리티별 분리, 후반은 C-A 통합이며 P는 선택적으로 독립 경로를 유지한다.

##### 출처

Sec.2.2 MSAT · PDF p.8; Fig.3 · PDF p.6

##### 발표 메모

기본 double-then-single 구조가 physical stream을 추가하면 triple-then-double이 된다. 각 stage의 정확한 block 개수는 이 문단에서 명시하지 않으므로 임의로 절반씩이라고 그리지 않는다. P가 없는 경우 attention mask로 운영 가능하다는 설명과 별도의 완전히 다른 네트워크를 선택한다는 해석은 구별한다. stream 수 자체를 denoising 반복 횟수로 해석하지 않는다.

#### [S040] Figure 3 전체 해석

<!-- study-meta
layout: widefigure
kind: fact
figure: fig-03.png
caption: Figure 3 · 원문 구조도: VLM·motion·memory·MSAT와 행동/물리 신호 예측
-->

##### 한 문장

표현을 준비하는 VLM·memory와, 미래 후보를 반복 갱신하는 MSAT를 연결한다.

##### 본문

<div class="flow">
<div class="node">영상·지시<br>motion-aware VLM</div>
<div class="arrow">→</div>
<div class="node">$\operatorname{concat}(\mathbf{h}_{t},\mathbf{m}_{t})$<br>cognition·memory 토큰</div>
<div class="arrow">→</div>
<div class="node">MSAT<br>행동·센서 변화율</div>
<div class="arrow">→</div>
<div class="node">Euler 반복<br>미래 후보 갱신</div>
</div>

한 번 준비한 현재 조건 아래 **action chunk 전체**를 다듬는다. 과거 프레임 압축은 VLM 안, 긴 이력 통합은 VLM 뒤, C/A/P 정보 교환은 action model 안에서 일어난다.

##### 보충

<span class="label question">읽을 때 남길 경계</span> memory 갱신·초기화 규칙과 H/H+1, noisy action의 C/A 표기 불일치는 아직 미해결이다. 구조를 이해한 다음에는 이 기능을 어떤 데이터와 학습 단계로 익히는지 확인해야 한다.

##### 요점

구조의 역할을 연결했다. 다음은 실제·합성 데이터가 이 구조를 어떻게 학습시키는가다.

##### 출처

Fig.3, Sec.2.1–2.2 · PDF pp.6–9; 질문노트 Q1·Q5–Q7

##### 발표 메모

Fig.3의 Denoise 표시는 미래 행동·센서 후보의 생성과 연결한다. Action chunk의 각 미래 행동을 autoregressive하게 하나씩 출력하는 흐름으로 읽지 않는다. VLM에서 현재 조건을 얻는 과정과 MSAT denoising 반복은 개념적으로 구별되며 실제 feature caching 구현은 이 그림만으로 단정하지 않는다. Fig.3 caption의 previous actions 표현을 추가 제어 입력 명세로 확장하지 않고 본문의 $\mathbf{s}_t$, noisy actions 설명을 따른다. 현재 sensor는 observed condition, future physical prediction은 auxiliary objective라는 구분을 다시 짚는다. 각 module의 독립적인 인과 기여는 구조도 자체로 검증되지 않는다.

## [P009] MSAT의 입력

<!-- slide-meta
layout: split
kind: fact
source_ids: S031, S032, S037, S038
-->

### 한 문장

C·A·P의 입력 묶음을 구성하고, denoising timestep과 행동의 시간 순서를 알려준다.

### 본문

#### 전체 입력 토큰 구성

<div class="sequence">
<div class="step"><strong>C:</strong> $[\mathbf{h}_t,\mathbf{m}_t]$<br>현재 cognition · memory</div>
<div class="step"><strong>A:</strong> $[\mathbf{e}_{\tau},\mathbf{s}_t,\mathbf{a}^{\tau}_{t:t+H}]$<br>τ 토큰 · 현재 상태 · noisy action chunk</div>
<div class="step"><strong>P:</strong> $[\mathbf{p}_t,\mathbf{p}^{\tau}_{t+1:t+L}]$<br>현재 센서 · noisy 미래 센서 chunk</div>
</div>

<p class="mini">Noisy chunk는 노이즈와 섞은 생성 대상이다. 구성식과 갱신 방법은 뒤에서 설명한다. 각 입력값은 projection을 거쳐 토큰이 된다.</p>

### 보충

#### τ 토큰과 행동 위치

**Denoising timestep τ**

$$
\tau\xrightarrow{\text{sin/cos}}\text{embedding}\xrightarrow{\text{MLP}}\mathbf{e}_{\tau}
$$

A 맨 앞의 **한 토큰**이다. Joint attention을 통해 다른 stream에도 현재 denoising timestep을 전달한다.

**행동 순서 — RoPE**

A stream의 Q·K에 위치별 회전을 적용해 chunk 안의 상대 시간 관계를 반영한다.

<p class="mini">물리 신호가 없으면 P stream의 attention을 mask할 수 있다.</p>

### 요점

τ는 denoising timestep, t:t+H는 행동 chunk의 물리 시간이다. 두 시간 정보를 구분한다.

### 출처

Sec.2.2 MSAT·Physical Sensing·Further Design Choices · PDF pp.8–9; Fig.3 · PDF p.6

### 발표 메모

Fig.3 뒤에 먼저 세 stream의 입력을 설명한다. Noisy chunk는 노이즈와 섞은 생성 대상이라는 개념만 소개하고 정의·학습·추론 수식은 뒤의 P006/P008에서 설명한다. 입력은 projection 이후 토큰 묶음의 개념적 구성이며 정확한 tokenization 개수는 단정하지 않는다. e_τ는 인코딩된 timestep 토큰을 설명하기 위한 기호다. 본문의 실제 시간/denoising 구분을 다시 유도하지 않고 τ를 모델에 전달하는 방법에 집중한다. S032의 QKV 연결 해설과 S037/S038의 timestep·RoPE 수식을 보존한다. 과거 P012 링크는 이 장으로 연결한다.

### 상세 공부 기록

#### [S031] P·C·A의 입력 구성

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

모달리티를 전용 경로로 처리하되, attention으로 서로 정보를 교환한다.

##### 본문

###### 초기 stream의 역할

| Stream | 개념적 입력 | 내용 |
| --- | --- | --- |
| **C** | $[\mathbf{h}_t,\mathbf{m}_t]$ | cognition·memory |
| **A** | $[\mathbf{s}_t,\mathbf{a}_{t:t+H}^{\tau}]$ | 현재 상태·행동 후보 |
| **P** | $[\mathbf{p}_t,\mathbf{p}_{t+1:t+L}^{\tau}]$ | 현재 센서·미래 후보 |

$\tau$는 인코딩한 한 토큰으로 A의 앞에 더한다. P는 물리 신호를 사용할 때 추가되는 경로이며, 센서가 없을 때 P attention을 mask할 수 있다.

##### 보충

###### 왜 세 경로로 나누는가?

cognition은 고차원 시각·언어 맥락, state는 저차원이지만 정확한 로봇 운동학 정보, 촉각·토크는 희소하지만 접촉에 중요한 정보다. 원문은 이 **의미와 데이터 규모의 이질성**을 설계 동기로 든다.

이는 각 기능 모듈과 stream이 일대일이라는 뜻이 아니다. Motion과 memory는 VLM·memory module에서 만들어져 C 경로의 입력이 되고, A는 미래 행동을 생성하는 경로다.

<p class="mini">초기 입력 배치는 MSAT 문단을 따른다. Physical Sensing 마지막의 C 표기 불일치는 S034에서 남긴다.</p>

##### 요점

Stream은 입력별 파라미터 경로이며, 기능 모듈 이름과 동일한 분류가 아니다.

##### 출처

Sec.2.2 MSAT·Physical Sensing · PDF p.8; timestep token · PDF p.9; Fig.3 · PDF p.6

##### 발표 메모

P=\[current p, noisy future p\]는 Fig.3의 Current/Noised Future 및 Physical Sensing 문단을 합친 개념적 입력이다. 본문의 개별 tokenization shape는 단정하지 않는다. C/A stream 설명은 MSAT 문단에 명시되어 있다. 괄호나 대괄호를 원소별 덧셈으로 확정하지 않는다. 센서 희소성 때문에 분리가 도움 된다는 의도와 single-stream 대비 독립 실험 근거는 구분한다.

#### [S032] Stream별 QKV

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

Normalization과 QKV projection은 stream별로 따로 두고, attention 입력을 공통 공간에 모은다.

##### 본문

###### 같은 연산 종류, 다른 파라미터

$$
\mathbf{C}\to\operatorname{Norm}_C\to(\mathbf{Q}_C,\mathbf{K}_C,\mathbf{V}_C)
$$

$$
\mathbf{A}\to\operatorname{Norm}_A\to(\mathbf{Q}_A,\mathbf{K}_A,\mathbf{V}_A)
$$

$$
\mathbf{P}\to\operatorname{Norm}_P\to(\mathbf{Q}_P,\mathbf{K}_P,\mathbf{V}_P)
$$

각 stream은 자신의 normalization과 attention input projection을 가진다. 공통 attention을 하기 전에도 모달리티에 맞게 표현을 변환할 여지가 있다.

##### 보충

###### 교환을 위해 토큰 축으로 묶기

$$
\mathbf{Q}=\operatorname{concat}(\mathbf{Q}_C,\mathbf{Q}_A,\mathbf{Q}_P)
$$

K·V도 같은 순서로 이어 붙인다. Joint attention에서 각 stream의 query는 다른 stream의 key·value를 참고할 수 있다. **정보 교환**과 **전용 파라미터 유지**가 동시에 가능하다.

<p class="callout">QKV를 함께 계산하는 attention 단계와, 후반에 C·A를 한 stream으로 합치는 구조 변경은 별개의 일이다.</p>

<p class="mini">Q는 attention query이며 memory queue $\mathbf{Q}_{t}$와 다르다.</p>

##### 요점

전용 stream은 서로 보지 않는다는 뜻이 아니라, 일부 변환 파라미터를 분리한다는 뜻이다.

##### 출처

Sec.2.2 MSAT 문단 · PDF p.8

##### 발표 메모

원문은 각 stream이 자체 normalization과 attention input QKV projections를 가진다고 명시한다. QKV를 공통 token axis에 붙여 joint attention하고 출력을 분할한다. 식은 원문 연산 순서를 기호로 풀어 쓴 것이며 특정 linear weight 이름이나 정확한 norm 배치를 추가한 구현 명세가 아니다. 입력 stream hidden width와 attention head 수는 이 문단만으로 확정하지 않는다. q는 VLM cognition token, Q는 attention query, $\mathbf{Q}_t$는 memory queue이므로 구별한다.

#### [S037] Denoising timestep 토큰

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

$\tau$를 한 토큰으로 인코딩해 A 앞에 붙이고 joint attention으로 다른 경로에도 알린다.

##### 본문

###### 값 하나를 모델 입력 특징으로

<div class="flow">
<div class="node">$\tau\in[0,1]$</div>
<div class="arrow">→</div>
<div class="node">sinusoidal<br>embedding</div>
<div class="arrow">→</div>
<div class="node">MLP</div>
</div>

<div class="token-row"><span class="token a">$\tau$ 토큰</span><span class="token a">$\mathbf{s}_{t}$</span><span class="token a">$\mathbf{a}^{\tau}_{t:t+H}$ 토큰들</span></div>

변환된 $\tau$ 표현을 A 시퀀스 맨 앞의 한 토큰으로 넣는다. 이 토큰도 다른 A token처럼 attention에 참여한다.

##### 보충

###### 왜 현재 생성 단계가 필요한가?

<span class="label interpretation">직관</span> 노이즈가 많은 후보와 거의 완성된 후보에서 필요한 보정이 다를 수 있다. $\tau$는 모델에 “현재 생성 경로의 어디를 다루는지”를 알려준다.

저자는 joint self-attention을 통해 $\tau$ 신호가 모든 모달리티에 전달될 수 있다고 설명한다. 매 블록의 feature에 affine modulation을 적용하는 **adaLN 방식 대신 in-context token**을 쓰는 선택이다.

<p class="mini">$\tau$ 토큰을 추가하는 것은 미래 행동 한 개를 추가하는 것이 아니다. 물리 시간 t와도 구별한다.</p>

##### 요점

$\tau$는 별도 control knob처럼 밖에서만 쓰이는 값이 아니라, MSAT가 읽는 한 입력 토큰이다.

##### 출처

Sec.2.2 Further Design Choices for MSAT · PDF p.9

##### 발표 메모

원문은 sinusoidal embedding+MLP, A sequence 앞의 single token, joint attention을 통한 모든 modality로의 전파, per-block affine modulation을 사용하지 않는 점을 명시한다. Encoding의 frequency 개수·MLP width·layer 수는 이 문단에서 확정하지 않는다. 이 토큰을 텍스트 숫자 “0.25”를 tokenizer에 입력하는 방식으로 설명하지 않는다. 어느 $\tau$에서 어떤 정보가 얼마나 전파되는지는 추가 해석이나 측정이 필요하다.

#### [S038] RoPE와 행동 순서

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

행동 토큰의 위치에 따라 Q·K를 회전시켜 attention 점수에 상대 순서를 반영한다.

##### 본문

###### 행동 chunk에도 순서가 있다

<div class="token-row"><span class="token a">$\mathbf{a}_{t}$</span><span class="token a">$\mathbf{a}_{t+1}$</span><span class="token a">$\mathbf{a}_{t+2}$</span><span class="token a">⋯</span></div>

같은 행동 값의 집합이라도 어느 시점에 놓이는지가 중요하다. RLDX-1은 **A stream에 rotary positional embeddings**를 적용해 chunk 안의 상대 시간 구조를 포착하도록 한다.

배경 원전의 직관은 위치 m의 query와 위치 n의 key를 각 위치에 따른 각도로 회전시킨 뒤 서로 비교하는 것이다.

##### 보충

###### 절대 회전에서 상대 위치가 나온다

$$
\widetilde{\mathbf{q}}_m=\mathbf{R}_m\mathbf{q}_m,\quad\widetilde{\mathbf{k}}_n=\mathbf{R}_n\mathbf{k}_n
$$

$$
\begin{aligned}
\widetilde{\mathbf{q}}_m^{\mathsf T}\widetilde{\mathbf{k}}_n
&=\mathbf{q}_m^{\mathsf T}\mathbf{R}_{n-m}\mathbf{k}_n
\end{aligned}
$$

<p class="eq-caption">RoPE의 원리를 간단히 표현한 배경식. 회전 차이가 n−m을 반영한다.</p>

따라서 attention은 내용과 위치 관계를 함께 읽을 수 있다. RoPE는 행동 토큰을 하나씩 생성하게 만드는 causal mask가 아니며, denoising timestep $\tau$를 나타내는 토큰과도 다르다.

##### 요점

행동 순서를 나타내는 위치 정보와 생성 진행도를 나타내는 $\tau$ 정보는 별개다.

##### 출처

Sec.2.2 Further Design Choices · PDF p.9; 배경: RoFormer Sec.3.2 (arXiv:2104.09864)

##### 발표 메모

배경 원전 https://arxiv.org/html/2104.09864v5 의 Sec.3.2에서 회전 행렬을 이용한 QK의 상대 위치 관계를 확인했다. 식의 R은 동일 frequency 구조에서 $\mathbf{R}_m^{\mathsf T}\mathbf{R}_n=\mathbf{R}_{n-m}$인 rotation operator다. 실제 RoPE는 feature dimension 쌍마다 여러 frequency를 사용한다. 여기서는 RLDX-1의 정확한 frequency/index 배치나 P/C 적용을 추정하지 않고, A stream 적용이라는 원문 범위만 말한다.

## [P010] MSAT의 Joint Attention

<!-- slide-meta
layout: split
kind: fact
source_ids: S033, S034, S039
-->

### 한 문장

각 stream의 파라미터로 입력을 변환하고, 공통 attention 뒤에는 원래 stream별로 갱신한다.

### 본문

#### 정규화 · projection · 정보 교환

<div class="sequence">
<div class="step"><strong>Stream별 RMSNorm → QKV projection</strong><br>C·A·P가 각자의 파라미터를 사용한다.</div>
<div class="step"><strong>Q·K에도 RMSNorm</strong><br>Q·K·V를 각각 토큰 축으로 concat한다.</div>
<div class="step"><strong>Joint self-attention → 출력 분리</strong><br>다른 stream을 읽어도 query 위치는 유지된다.</div>
</div>

<p class="mini">RMSNorm은 특징의 크기를 정규화한다. 정보 교환은 attention이 수행한다.</p>

### 보충

#### 예시: C 4개 + A 3개

<div class="token-row"><span class="token c">$C_1$</span><span class="token c">$C_2$</span><span class="token c">$C_3$</span><span class="token c">$C_4$</span><span class="token a">$A_1$</span><span class="token a">$A_2$</span><span class="token a">$A_3$</span></div>

출력 7개 → 앞 4개는 C, 뒤 3개는 A로 돌려보낸다. 실제 모델 shape가 아닌 설명용 예시다.

$$
\mathbf{C}'=\mathbf{C}+\Delta\mathbf{C},\qquad
\mathbf{A}'=\mathbf{A}+\Delta\mathbf{A}
$$

**Residual update:** 보정을 더해 토큰 수를 유지한다.

**SwiGLU FFN:** gate를 사용해 각 토큰 내부의 특징을 비선형으로 변환한다.

### 요점

정보를 교환한 뒤 각 stream을 갱신한다. 다음은 이 모델이 학습할 변화율과 행동 생성 수식이다.

### 출처

Sec.2.2 MSAT · PDF p.8; Further Design Choices · PDF p.9; 질문노트 Q1·Q6

### 발표 메모

P032에서 본 Triple/Double-stream 안의 한 연산 흐름을 확대한다. 그림의 stage 수나 전체 residual·norm 위치를 재구성한 구현도는 아니다. Δ는 residual 보정의 개념 표기다. 후반 C-A concat의 위치는 P032에서 이미 설명했으며 여기서는 반복하지 않는다. Physical Sensing 마지막 noisy actions in C 표기 불일치는 S034와 마지막 미해결 장에 보존한다. RMSNorm/SwiGLU 상세 S039도 유지한다.

### 상세 공부 기록

#### [S033] Joint attention과 출력 shape

<!-- study-meta
layout: split
kind: example
-->

##### 한 문장

C 토큰 4개와 A 토큰 3개를 함께 읽어도, 출력 위치 7개는 그대로 남아 다시 나눌 수 있다.

##### 본문

###### 토큰 수가 보존되는 attention

<span class="label example">P를 생략한 교육용 C4 / A3</span>

| 단계 | shape |
| --- | --- |
| C의 Q·K·V | 각 4 × d |
| A의 Q·K·V | 각 3 × d |
| 붙인 Q·K·V | 각 7 × d |
| attention weights | 7 × 7 |
| attention output | 7 × d |

##### 보충

###### 출력 위치와 읽은 정보는 다르다

<div class="token-row"><span class="token c">$C_1$</span><span class="token c">$C_2$</span><span class="token c">$C_3$</span><span class="token c">$C_4$</span><span class="token a">$A_1$</span><span class="token a">$A_2$</span><span class="token a">$A_3$</span></div>

각 query 위치에 출력 벡터가 하나씩 생긴다. 앞 네 위치는 C로, 뒤 세 위치는 A로 돌려보낸다. C 위치의 출력도 A의 정보를 읽었을 수 있으므로 “C 출력에 C 정보만 있다”는 뜻은 아니다.

**4·3·d**는 원리를 보이는 예시다. 실제 cognition은64 tokens이며, 이 표를 모델의 실제 전체 shape로 읽지 않는다.

##### 요점

Attention은 여러 정보를 섞지만 query 위치를 없애지 않기 때문에 stream별 분할이 가능하다.

##### 출처

Sec.2.2의 joint attention·split 설명 · PDF p.8; shape는 설명용 예시

##### 발표 메모

설명상 single head를 가정하고 Q/K/V의 feature 폭을 같은 d로 두었다. 실제 multi-head의 QK dimension과 V dimension은 다를 수 있고 head concat/projection도 있으므로 이 표가 구현 shape 명세는 아니다. 7×7은 query 7개가 key 7개를 참고하는 관계 수다. Output row는 query row에 대응한다. P stream이 있으면 그 token 수만큼 행도 추가되지만 같은 원리로 원래 길이에 따라 분할할 수 있다.

#### [S034] Residual update와 concat

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

한 블록 안의 stream별 덧셈과, 후반 C·A 시퀀스 통합은 서로 다른 연산이다.

##### 본문

###### 초반 블록: 나눠서 다시 더한다

$$
\text{joint attention}\to[\Delta\mathbf{C},\Delta\mathbf{A},\Delta\mathbf{P}]
$$

$$
\begin{aligned}
\mathbf{C}'&=\mathbf{C}+\Delta\mathbf{C}\\
\mathbf{A}'&=\mathbf{A}+\Delta\mathbf{A}\\
\mathbf{P}'&=\mathbf{P}+\Delta\mathbf{P}
\end{aligned}
$$

위 식은 원문의 **stream-wise residual update**를 단순화한 개념식이다. 출력 위치를 나눈 후 각 경로의 원래 특징에 보정을 더한다. 이 단계에서는 C와 A의 stream 구분이 계속 남는다.

##### 보충

###### 후반 블록: C와 A를 한 시퀀스로

$$
\mathbf{X}_{\mathrm{C-A}}=\operatorname{concat}(\mathbf{C}',\mathbf{A}')
$$

여기서는 토큰 축으로 이어 붙여 후속 단일 C-A 경로에서 처리한다. 원소별로 더해 토큰 수를 줄이는 연산이 아니다.

<p class="callout"><span class="label question">본문 표기 불일치</span> MSAT 문단은 noisy actions를 <strong>A</strong>에 넣지만, Physical Sensing 마지막 문장은 “C stream”이라고 쓴다. 초기 입력은 앞의 명시적 배치를 따르되, 오타인지 별도 의도인지는 확정하지 않는다.</p>

##### 요점

정보 교환 → stream별 residual → 후반 C-A 통합을 구분해야 Fig.3을 정확히 읽을 수 있다.

##### 출처

Sec.2.2 MSAT 및 Physical Sensing 마지막 문장 · PDF p.8; 질문노트 Q1·Q6

##### 발표 메모

Δ 기호는 joint attention 출력을 residual에 더하는 개념적 보정량을 표시한다. 정확한 output projection·MLP 등 모든 세부를 그대로 수식화한 것은 아니다. 원문은 stream별 residual updates를 명시한다. 후반 C-A merge와 초반 QKV concatenation을 같은 “concat” 한 단어로 뭉개지 않는다. 최종 C 표기를 저자의 오타로 단정하지 않고 문서의 서술 불일치로 남긴다.

#### [S039] RMSNorm과 SwiGLU

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

정규화는 특징 크기를 조절하고, FFN은 각 토큰 안의 특징을 비선형으로 변환한다.

##### 본문

###### RMSNorm: 평균 제곱 크기로 나누기

$$
\operatorname{RMS}(\mathbf{x})=\sqrt{\frac{x_1^2+\cdots+x_d^2}{d}}
$$

각 토큰의 특징 벡터를 RMS 크기에 따라 정규화하고 학습 가능한 scale로 조절한다. LayerNorm과 달리 평균을 빼는 recentering을 생략하는 것이 배경 원전의 핵심이다.

RLDX-1은 RMSNorm을 채택하며 **query와 key에도** 적용한다고 명시한다. 값이 모두 같아지거나 정보 교환 자체를 수행하는 연산은 아니다.

##### 보충

###### SwiGLU: 두 변환을 곱하는 gate

$$
\begin{aligned}
\mathbf{g}&=\operatorname{SiLU}(\mathbf{x}W_g)\\
\mathbf{v}&=\mathbf{x}W_v\\
\operatorname{FFN}(\mathbf{x})&=(\mathbf{g}\odot\mathbf{v})W_o
\end{aligned}
$$

<p class="eq-caption">bias를 생략한 배경용 개념식. $\odot$는 원소별 곱이다.</p>

한 경로의 비선형 값이 다른 경로의 특징을 조절한다. 이 FFN은 토큰마다 특징을 변환하고, attention은 토큰 사이 정보를 교환한다. 보고서는 이 구성 요소를 채택했다고 설명하지만 각각의 독립 성능 이득을 이 문단에서 측정하지 않는다.

##### 요점

RMSNorm·SwiGLU·attention은 블록 안의 서로 다른 역할을 담당한다.

##### 출처

Sec.2.2 Further Design Choices · PDF p.9; 배경: arXiv:1910.07467, arXiv:2002.05202

##### 발표 메모

배경 원전 https://arxiv.org/html/1910.07467v1 의 Sec.4와 https://arxiv.org/html/2002.05202v1 의 Sec.2 식(5)–(6)을 확인했다. RMS 식은 root mean square 정의이며 정규화한 값에 learned gain을 곱하며 구현에 따라 수치 안정화 항을 더한다. 출력 공식 전체 대신 RMS 정의만 표시했다. SwiGLU 식은 bias 생략 개념식이며 $\operatorname{SiLU}(x)=x\operatorname{sigmoid}(x)$인 $\operatorname{Swish}_1$ gate를 쓴다. 실제 RLDX-1 weight 이름이나 FFN width를 명세한 것은 아니다. QK에 RMSNorm을 적용한다는 사실과 구체 shape는 구별한다.
## [P006] Action Model의 학습 원리

<!-- slide-meta
layout: split
kind: fact
source_ids: S020, S021, S022, S023, S024, S025, S026, S028
-->

### 한 문장

노이즈 $\boldsymbol\epsilon$에서 정답 $\mathbf a$로 잇는 직선 경로를 미분한 $\mathbf v^*=\mathbf a-\boldsymbol\epsilon$을 정답 변화율로 삼는다.

### 본문

#### Noisy action chunk

$$
\mathbf{a}^{\tau}=\tau\mathbf{a}+(1-\tau)\boldsymbol{\epsilon}
$$

<table class="chunk-symbols" aria-label="Action chunk 기호 설명"><tbody>
<tr><th scope="row">$\mathbf a$</th><td>정답(clean) action chunk</td></tr>
<tr><th scope="row">$\mathbf a^\tau$</th><td><strong>노이즈가 섞인 action chunk</strong></td></tr>
<tr><th scope="row">$\boldsymbol\epsilon$</th><td>같은 shape의 표준 정규 노이즈</td></tr>
<tr><th scope="row">$\tau$</th><td>Denoising timestep; $\tau=1\Rightarrow\mathbf a^\tau=\mathbf a$</td></tr>
</tbody></table>

$$
\frac{d\mathbf a^\tau}{d\tau}=\mathbf a-\boldsymbol\epsilon=\mathbf v^*\quad\text{(정답 변화율)}
$$

### 보충

#### Flow-matching loss

$$
\mathcal L=\bigl\lVert\underbrace{\textcolor{#167e7a}{\mathbf u_\theta}}_{\text{MSAT}}(\mathbf a^\tau,\tau,\mathbf c_t)-\mathbf v^*\bigr\rVert_2^2
$$

<p class="callout"><strong>$\mathbf u_\theta$: 학습 가능한 신경망(MSAT)</strong><br>
Neural vector field; $\theta$는 학습 가중치다.<br>
<strong>출력:</strong> chunk 전체의 <strong>예측 변화율</strong>.</p>

<p><strong>조건 입력 $\mathbf c_t=[\mathbf h_t,\mathbf m_t,\mathbf s_t,\mathbf p_t]$</strong><br>
$\mathbf h_t$: 인지 · $\mathbf m_t$: 기억 · $\mathbf s_t$: 현재 로봇 상태<br>
$\mathbf p_t$: 현재 물리 센서 신호(사용 가능할 때)</p>

### 요점

예측 변화율과 정답 변화율의 오차 제곱합을 줄이도록 모델 파라미터를 학습한다.

### 출처

Sec.2.2 Eq.(1) · PDF p.8; noisy action chunk는 원문 용어, 미분·좌표별 합은 설명용 전개

### 발표 메모

P006과 P007을 통합했다. Transformer/DiT는 구조, flow matching은 목표, Euler는 추론 갱신이며 고전 diffusion 손실과 순차 적용하는 두 단계가 아니다. S020–026/S028의 유도·수식·용어·shape 해설을 모두 유지한다. 개별 정답 쌍의 직선 target이 상수라는 것과 학습한 vector field가 모든 입력에서 상수라는 것은 다르다. 현재 조건의 센서는 사용 가능할 때 포함한다. Sec.1.1의 c_t는 지시지만 여기서는 Sec.2.2의 전체 조건 정의다. τ의 정확한 샘플링 분포·구현상 loss reduction을 임의 확정하지 않는다. P006 Browser Comment1–4 후속: 본문에서 t/τ 재설명과 c_t 정의·숫자 예시를 빼고 기호 표와 손실 항 해석으로 바꿨다. 원문은 noisy action chunk라고 명시한다. 좌표 j는 action chunk의 시간·행동 차원 전체를 펼쳐 읽기 위한 설명용 인덱스이며 추가 평균/reduction 구현을 확정하지 않는다. 기존 숫자 예시와 시간/조건 설명은 S021/S022/S023/S026 해설에 그대로 보존한다. 최신 annotation 요청: u_θ 자체는 파라미터 θ를 학습하는 neural vector field이며 구현은 MSAT다. u_θ(a^τ,τ,c_t)는 그 함수를 평가해 얻은 예측 변화율이다. 둘을 구분해 u_θ에 직접 underbrace를 연결하고 같은 색의 모델 주석으로 설명한다. 좌표별 손실 전개는 상세 해설에 유지한다. 2026-11-06 최신 요청에 따라 Sec.2.2 p.8의 조건 입력 c_t=[h_t,m_t,s_t,p_t]를 본문에 다시 명시한다. h_t는 인지 특징, m_t는 기억 특징, s_t는 현재 로봇 상태, p_t는 사용 가능할 때의 현재 물리 센서 신호다.

### 상세 공부 기록

#### [S020] Diffusion·DiT·flow matching

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

구조의 이름, 학습할 목표, 추론에서 샘플을 만드는 방법을 나누어 읽는다.

##### 본문

###### 이 보고서의 선택

| 질문 | RLDX-1 |
| --- | --- |
| 어떤 신경망인가? | Transformer 기반 MSAT<br>논문은 flow-matching DiT로 지칭 |
| 무엇을 학습하는가? | 노이즈→행동 경로의 velocity field |
| 어떻게 생성하는가? | 노이즈에서 시작해 Euler 반복 |

Policy는 관측·지시로 행동을 정하는 역할을 가리킨다. 그 역할을 구현하는 구조와 학습법은 따로 선택할 수 있다.

##### 보충

###### 용어를 하나의 필수 계층으로 묶지 않기

DiT 원전은 이미지 diffusion의 기존 U-Net backbone을 Transformer로 바꾼 구조를 연구한다. 따라서 diffusion이라는 이름이 U-Net을 필수로 뜻하지 않는다.

Flow matching 원전은 확률 경로의 vector field를 회귀하는 학습법이며 diffusion 경로도 다룰 수 있다. RLDX-1은 **선형 보간 경로와 velocity 목표**를 사용한다. 고전 diffusion 손실을 먼저 학습하고 flow matching을 추가하는 두 단계라고 설명하지 않는다.

##### 요점

여기서는 MSAT가 변화율을 학습하고, Euler 적분이 그 변화율로 행동 후보를 이동시킨다.

##### 출처

Sec.2.2 · PDF p.8; DiT (arXiv:2212.09748); Flow Matching (arXiv:2210.02747)

##### 발표 메모

배경 원전: https://arxiv.org/abs/2212.09748 및 https://arxiv.org/abs/2210.02747. DiT는 structure, flow matching은 training objective, Euler는 sampling/integration 방법이라는 구분을 위한 장이다. 모든 diffusion 방식이 flow matching과 동일하다거나 모든 FM 경로가 선형이라는 주장은 하지 않는다. 다음 장부터 보고서 Sec2.2의 구체적 선형 경로를 그대로 따른다.

#### [S021] 실제 시간과 denoising timestep

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

t는 로봇 세계의 시점이고, $\tau$는 한 미래 후보를 다듬는 생성 과정의 위치다.

##### 본문

###### 두 종류의 진행

<div class="sequence">
<div class="step"><strong>로봇 시간 t:</strong> 지금 관측·상태를 얻는 시점</div>
<div class="step"><strong>미래 행동 범위:</strong> $\mathbf{a}_{t:t+H}$, t부터 t+H까지 H+1개</div>
<div class="step"><strong>생성 과정 $\tau$:</strong> 0의 노이즈에서 1의 데이터 쪽으로 이동</div>
</div>

한 번의 정책 호출 안에서도 $\tau$를 여러 번 바꾼다. $\tau$가 한 번 갱신될 때 실제 로봇이 한 timestep 전진한다는 뜻은 아니다.

##### 보충

###### H와 L은 생성할 시퀀스 길이에 관련

| 표기 | 역할 |
| --- | --- |
| H+1 | 행동 $\mathbf{a}_{t:t+H}$의 원소 수 |
| L | 미래 센서 $\mathbf{p}_{t+1:t+L}$의 원소 수 |
| $\tau\in[0,1]$ | denoising timestep |

Sec.4.2의 물리 신호 예측 설정은 **L=H+1**이다. 예측 길이와 실제 실행할 행동 개수는 별도 설정이다. “40개 예측·20개 실행” 같은 차이는 뒤의 실행 장에서 다룬다.

##### 요점

$\tau$의 반복 횟수, 미래 chunk 길이, 로봇에서 실행한 길이는 같은 숫자가 아니다.

##### 출처

Sec.1.1 · PDF p.5; Sec.2.2 · PDF p.8; Sec.4.2 · PDF p.13

##### 발표 메모

원문의 Eq2는 한 로봇 시점 t에 대해 미래 action chunk 전체를 생성한다. 실제 로봇에서 chunk를 일부 실행한 후 새 관측으로 정책을 호출하는 과정은 별도 외부 loop다. H와 H+1 표기는 action을 t부터 포함하는 inclusive index에서 비롯되나, memory queue의 H/H+1 불일치는 S018의 미해결 상태를 유지한다. 미래 센서가t+1부터 시작하는 점도 행동의t 시작과 구별한다.

#### [S022] 조건과 생성 후보

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

현재 조건은 “무엇을 해야 하는가”를 정하고, noisy 후보는 실제로 갱신할 생성 대상이다.

##### 본문

###### 이번 정책 호출의 조건 cₜ

$$
\mathbf{c}_t=[\mathbf{h}_t,\mathbf{m}_t,\mathbf{s}_t,\mathbf{p}_t]
$$

- <strong>$\mathbf{h}_{t}$:</strong> 시각·언어 cognition features.
- <strong>$\mathbf{m}_{t}$:</strong> 긴 이력을 반영한 memory features.
- <strong>$\mathbf{s}_{t}$:</strong> 현재 로봇의 proprioceptive state.
- <strong>$\mathbf{p}_{t}$:</strong> 사용 가능한 현재 tactile·torque 신호.

물리 신호는 있을 때만 이용하며, 앞의 네 항을 모두 정답 미래 행동이라고 부르지 않는다.

##### 보충

###### 다듬어 갈 미래 후보

<div class="token-row"><span class="token a">행동 후보 $\mathbf{a}^{\tau}_{t:t+H}$</span><span class="token p">센서 후보 $\mathbf{p}^{\tau}_{t+1:t+L}$</span></div>

추론에서는 노이즈로 시작한 후보를 입력하고, 현재 $\tau$와 조건을 참고해 예측한 변화율로 후보를 갱신한다. <strong>현재 $\mathbf{p}_{t}$</strong>와 <strong>noisy future $\mathbf{p}^{\tau}$</strong>는 시간과 역할이 다르다.

<p class="callout">동일 t의 denoising 반복에서 조건을 참조하는 것과, 미래 후보 값을 바꾸는 것을 구분한다.</p>

##### 요점

입력에 들어간다고 모두 관측값인 것은 아니다. 일부는 모델이 생성 중인 미래 후보다.

##### 출처

Sec.2.2, Physical Sensing · PDF p.8; 질문노트 Q7

##### 발표 메모

본문 $\mathbf{c}_t$ 식은 physical signals가when available이라는 조건을 가진다. P stream의 현재p와 noisy futurep 배치는 Fig3와 Physical Sensing 설명을 함께 읽은 개념적 정리다. 모델 내부 hidden states는 매 블록 변하지만, 그 사실을 현재 센서 조건 자체를 denoising한다는 말로 바꾸지 않는다. 실제 condition caching이나 forward별 계산 생략 방식은 구현 확인 전에는 확정하지 않는다.

#### [S023] 노이즈와 정답 사이의 경로

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

정답 행동과 노이즈를 $\tau$의 가중치로 섞어 학습용 중간 후보를 만든다.

##### 본문

###### 원문의 선형 보간

$$
\begin{aligned}
\mathbf{a}_{t:t+H}^{\tau}
&=\tau\mathbf{a}_{t:t+H}+(1-\tau)\boldsymbol{\epsilon}
\end{aligned}
$$

**a**는 데이터의 정답 action chunk, <strong>$\boldsymbol{\epsilon}\sim\mathcal{N}(0,I)$</strong>는 같은 shape의 표준 정규 노이즈다. $\tau$는 0부터 1 사이의 denoising timestep이다. $\tau$가 커질수록 정답 쪽 비중이 커진다.

$$
\begin{aligned}
\tau=0&\;\Rightarrow\;\mathbf{a}^{0}=\boldsymbol{\epsilon}\\
\tau=1&\;\Rightarrow\;\mathbf{a}^{1}=\mathbf{a}
\end{aligned}
$$

##### 보충

###### 두 좌표만 남긴 예시

<span class="label example">정답 [3,−1], 노이즈 [−1,1]</span>

| $\tau$ | 혼합 결과 $\mathbf{a}^{\tau}$ |
| --- | --- |
| 0 | \[−1, 1\] |
| 0.25 | \[0, 0.5\] |
| 0.5 | \[1, 0\] |
| 1 | \[3, −1\] |

학습은 정답으로 중간 점을 만든다. 추론은 정답 a를 모르므로 이 식으로 직접 생성할 수 없다.

##### 요점

학습에서 아는 직선 경로를 이용해 변화율을 가르치고, 추론에서는 그 예측을 사용한다.

##### 출처

Sec.2.2의 noisy action 구성식 · PDF p.8

##### 발표 메모

숫자는 실험 action이 아닌 설명용이다. 실제 모델의 \[−1,1\] 정규화 범위와 별개인 단순 벡터다. $\mathbf{a}^{\tau}$는 action chunk 전체와 같은 shape다. 이 논문의 $\tau$ 방향은 0의 noise에서 1의 data로 간다. 다른 diffusion 문헌의 time 방향을 그대로 가져오지 않는다. 예시 노이즈의 값이 \[−1,1\]이라고 해서 실제 입력을 uniform \[−1,1\]로 샘플링한다는 뜻은 아니다.

#### [S024] 변화율의 유도

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

정답과 노이즈를 고정하고 선형 경로를 $\tau$로 미분하면 $\mathbf{a}-\boldsymbol{\epsilon}$가 나온다.

##### 본문

###### 식의 각 항을 따로 미분

$$
\mathbf{a}^{\tau}=\tau\mathbf{a}+(1-\tau)\boldsymbol{\epsilon}
$$

$$
\begin{aligned}
\frac{d(\tau\mathbf{a})}{d\tau}&=\mathbf{a}\\
\frac{d((1-\tau)\boldsymbol{\epsilon})}{d\tau}&=-\boldsymbol{\epsilon}\\
\frac{d\mathbf{a}^{\tau}}{d\tau}&=\mathbf{a}-\boldsymbol{\epsilon}
\end{aligned}
$$

여기서 a와 $\boldsymbol{\epsilon}$는 한 학습 쌍에서 고정하고, $\tau$에 따라 중간 점이 어떻게 바뀌는지를 본다. 로봇 위치를 실제 시간 t로 미분한 물리 속도와는 다른 생성 공간의 변화율이다.

##### 보충

###### 변화량과 변화율을 구별하기

<span class="label example">앞 장의 2차원 예시</span>

$$
\begin{aligned}
\mathbf{a}-\boldsymbol{\epsilon}&=[3,-1]-[-1,1]\\
&=[4,-2]
\end{aligned}
$$

$\tau$가 1만큼 증가할 때의 변화율이 \[4,−2\]다. 작은 간격 <strong>$\Delta\tau=0.25$</strong> 동안의 이동량은 그 1/4인 <strong>\[1,−0.5\]</strong>가 된다.

모델은 학습에서 이 정답 변화율을 맞히도록 훈련된다. “노이즈를 뺀 값”이라는 대수 표현과 “노이즈만 직접 예측한다”는 학습 목표는 구분해야 한다.

##### 요점

학습 target은 정답 행동 a 자체가 아니라, 경로의 $\tau$ 변화율 $\mathbf{a}-\boldsymbol{\epsilon}$다.

##### 출처

Sec.2.2 Eq.(1)의 target; 선형 경로의 미분 풀이 · PDF p.8

##### 발표 메모

원문은 target을 $\mathbf{a}-\boldsymbol{\epsilon}$로 명시한다. 미분을 항별로 나눈 과정은 해설이며 새 알고리즘이 아니다. $\mathbf{a}^{\tau}$에서 t:t+H 첨자는 읽기 쉽게 잠시 생략했다. 학습의 개별 정답 쌍에서 직선 velocity는 상수지만, 여러 데이터 쌍을 함께 학습한 neural vector field가 모든 입력에서 같은 상수라는 뜻은 아니다. 다음 장은 $\mathbf{u}_\theta$의 입출력을 설명한다.

#### [S025] Neural vector field

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

$\mathbf{u}_\theta$는 후보와 $\tau$·조건을 보고, chunk 전체를 어느 방향으로 얼마나 바꿀지 예측한다.

##### 본문

###### 같은 shape의 변화율을 출력

<div class="flow">
<div class="node">$\mathbf{a}^{\tau}$, $\tau$, $\mathbf{c}_{t}$</div>
<div class="arrow">→</div>
<div class="node">$\mathbf{u}_{\theta}$<br>MSAT</div>
<div class="arrow">→</div>
<div class="node">예측 velocity</div>
</div>

학습 가능한 파라미터 $\theta$를 가진 신경망이 현재 후보 위치에서의 변화율을 계산한다. 출력은 행동 시퀀스의 각 좌표에 대한 값이며, **방향뿐 아니라 크기**도 가진다. $\tau$를 조금 옮기면 후보가 얼마나 달라질지 알려준다.

##### 보충

###### 한 점에서의 벡터를 읽기

<span class="label example">변화율 [4,−2]</span>

첫 좌표는 $\tau$ 증가에 따라 커지고 둘째 좌표는 작아진다. 첫 좌표 변화율의 절댓값이 두 배이므로 같은 $\Delta\tau$에서 더 많이 이동한다. 단위 방향 \[0.894,−0.447\]만으로는 이 이동 크기를 복원할 수 없다.

한 forward는 미래 action chunk의 변화율을 **함께** 예측한다. 다음 denoising 단계에서는 갱신된 후보를 다시 넣어 변화율을 재계산한다. 이는 출력 action을 한 토큰씩 이어 붙이는 방식과 다르다.

##### 요점

Vector field는 생성 공간의 위치마다 변화율을 주며, 실제 이동량은 $\Delta\tau$와 곱해 얻는다.

##### 출처

Sec.2.2 Eq.(1)–(2) · PDF p.8

##### 발표 메모

단위 벡터 숫자는 $[4,-2]/\sqrt{20}$으로 계산한 설명용 반올림이다. $\mathbf{u}_\theta$의 출력은 학습 target $\mathbf{a}-\boldsymbol{\epsilon}$와 shape가 맞아야 한다. 실제 신경망은 조건에 따른 velocity field를 근사하며 매 갱신마다 같은 벡터를 반환한다고 보장하지 않는다. 행동의 미래 시점 축을 한 번에 처리하는 것과 내부 Transformer layer의 순차 계산은 구분한다.

#### [S026] 학습 손실 Eq.1

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

예측 변화율과 정답 변화율의 좌표별 차이를 제곱해 합친다.

##### 본문

###### 원문의 flow-matching objective

$$
\begin{aligned}
\mathcal{L}(\theta;t,\tau,\boldsymbol{\epsilon})
&=\bigl\lVert\mathbf{u}_\theta(\mathbf{a}_{t:t+H}^{\tau},\tau,\mathbf{c}_t)\\
&\qquad-(\mathbf{a}_{t:t+H}-\boldsymbol{\epsilon})\bigr\rVert_2^2
\end{aligned}
$$

- <strong>$\mathbf{u}_{\theta}$(…):</strong> 모델이 예측한 변화율.
- <strong>$\mathbf{a}-\boldsymbol{\epsilon}$:</strong> 선형 경로에서 계산한 정답 변화율.
- <strong>$\lVert\cdot\rVert_2$:</strong> L2 norm. 아래의 2는 norm의 종류다.
- **바깥의 제곱:** 제곱근을 상쇄해 좌표별 오차 제곱의 합이 된다.

##### 보충

###### 작은 오차 벡터로 계산

<span class="label example">두 좌표의 설명용 예시</span>

$$
\begin{aligned}
\text{정답 velocity}&=[4,-2]\\
\text{예측 velocity}&=[3.9,-1.8]
\end{aligned}
$$

$$
\begin{aligned}
\text{오차}&=[-0.1,0.2]\\
\lVert\text{오차}\rVert_2^2&=(-0.1)^2+0.2^2=0.05
\end{aligned}
$$

실제 chunk의 모든 미래 시점·행동 좌표에 걸친 오차를 줄이도록 $\theta$를 갱신한다.

##### 요점

이 손실은 “정답으로 향하는 변화율을 얼마나 정확히 예측했는가”를 측정한다.

##### 출처

Sec.2.2 Eq.(1) · PDF p.8

##### 발표 메모

원문의 $\mathcal{L}(\theta;t,\tau,\boldsymbol{\epsilon})$는 샘플별 목적함수 표현이다. 학습은 여러 t·$\tau$·$\boldsymbol{\epsilon}$ 샘플의 손실로 최적화한다. 좌표별 합을 batch mean 또는 전체 mean으로 구현하는 정확한 reduction은 이 식만으로 단정하지 않는다. 아래첨자 2를 제곱 횟수나 denoising step 수로 설명하지 않는다. 본문 식은 action loss이고 physics auxiliary loss는 S030에서 별도로 다룬다.

#### [S028] 학습 과정

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

정답을 알고 있으므로 무작위 $\tau$의 후보와 정답 변화율을 직접 만들어 학습한다.

##### 본문

###### 한 학습 샘플을 만드는 순서

<div class="sequence">
<div class="step">① 데이터: 현재 조건 $\mathbf{c}_{t}$와 정답 action chunk a</div>
<div class="step">② $\tau\in[0,1]$, $\boldsymbol{\epsilon}\sim\mathcal{N}(0,I)$를 샘플링</div>
<div class="step">③ $\mathbf{a}^{\tau}=\tau\mathbf{a}+(1-\tau)\boldsymbol{\epsilon}$ 를 직접 구성</div>
<div class="step">④ $\mathbf{u}_\theta(\mathbf{a}^{\tau},\tau,\mathbf{c}_t)$를 예측</div>
<div class="step">⑤ target $\mathbf{a}-\boldsymbol{\epsilon}$와 손실 → 역전파 → $\theta$ 갱신</div>
</div>

##### 보충

###### 학습의 τ와 추론의 반복을 구별

원문의 학습 objective는 샘플링한 $\tau$에서 변화율을 맞히는 방식이다. 각 학습 샘플마다 $\tau=0$부터 1까지 완전한 denoising을 모두 수행해야 한다는 설명이 아니다.

여러 조건·정답·노이즈·$\tau$를 반복해 학습하면 다양한 중간 후보에서 쓸 변화율을 배우게 된다. 추론 때는 정답 a를 모르므로 모델이 예측한 변화율을 이용한다.

<p class="mini">학습 중 바꾸는 것은 모델 파라미터 $\theta$다. 후보 $\mathbf{a}^{\tau}$를 여러 번 Euler로 옮기는 추론 과정과 역할이 다르다.</p>

##### 요점

학습은 무작위 중간 점에서의 변화율 회귀이고, 추론은 그 모델로 후보를 반복 이동하는 과정이다.

##### 출처

Sec.2.2 Eq.(1) 앞의 training 설명 · PDF p.8

##### 발표 메모

원문은 $\tau\in[0,1]$을 sample한다고 명시하나 이 문단에 $\tau$의 정확한 확률분포가 없으므로 uniform이라고 확정하지 않는다. $\boldsymbol{\epsilon}$는 standard normal이다. 한 학습 샘플을 만드는 개념 순서이며 batching이나 feature cache의 실제 구현 순서를 재현한 것은 아니다. Flow Matching 원전은 simulation-free training을 제시하지만 이 장 핵심은 RLDX-1 자체의 손실 구성이다.

## [P008] Action Model의 추론 수식

<!-- slide-meta
layout: split
kind: fact
source_ids: S027, S029, S030
-->

### 한 문장

현재 조건을 고정해 참조하면서 미래 행동·센서 후보를 반복 갱신한다.

### 본문

#### 변화율 × 간격 = 이동량

$$
\begin{aligned}
\Delta\tau_i&=\tau_{i+1}-\tau_i\\
\mathbf{a}^{\tau_{i+1}}&=\mathbf{a}^{\tau_i}+\Delta\tau_i\mathbf{u}_\theta(\mathbf{a}^{\tau_i},\tau_i,\mathbf{c}_t)
\end{aligned}
$$

<table class="chunk-symbols" aria-label="Euler 갱신식의 각 항"><tbody>
<tr><th scope="row">$\mathbf a^{\tau_i}$</th><td>현재 denoising timestep의 action chunk</td></tr>
<tr><th scope="row">$\mathbf u_\theta(\cdots)$</th><td>모델이 예측한 chunk 전체의 변화율</td></tr>
<tr><th scope="row">$\Delta\tau_i\mathbf u_\theta(\cdots)$</th><td><strong>이번 갱신량 = 간격 × 변화율</strong></td></tr>
<tr><th scope="row">$\mathbf a^{\tau_{i+1}}$</th><td>갱신 후 다음 timestep의 action chunk</td></tr>
</tbody></table>

이 갱신을 $\tau=1$까지 반복한다.

### 보충

#### 현재 센서와 미래 센서는 역할이 다르다

<strong>현재 $\mathbf{p}_t$:</strong> 관측된 조건.<br><strong>미래 $\mathbf{p}_{t+1:t+L}^{\tau}$:</strong> 함께 denoising할 후보.

$$
\begin{gathered}
\mathbf{p}^{\tau}=\tau\mathbf{p}_{\mathrm{future}}+(1-\tau)\boldsymbol{\epsilon}_p\\
\text{미래 센서의 target:}\quad\mathbf{p}_{\mathrm{future}}-\boldsymbol{\epsilon}_p
\end{gathered}
$$

미래 물리 신호 예측은 상호작용을 배우기 위한 **보조 목표**다. $\tau$ 반복은 실제 로봇 시간 t의 전진이나 재관측과 다르다.

### 요점

변화율 × denoising 간격으로 후보를 갱신한다. 다음은 이 모델을 학습시키는 데이터다.

### 출처

Sec.2.2 Eq.(2), Physical Sensing · PDF p.8; Sec.4.2 · PDF p.13

### 발표 메모

미래 물리 신호 길이 L은 mid-training에서 H+1로 둔다. 추론은 정답 미래 센서를 알지 못한다. 조건 특징의 실제 caching 구현은 단정하지 않는다. 생성 후 행동을 일부 실행하고 재관측하는 바깥 loop는 별도다. 최신 사용자 요청에 따라 본문의 한 좌표 숫자 예시를 제거하고 Euler식의 현재 chunk·예측 변화율·간격을 곱한 갱신량·다음 chunk를 기호 표로 설명한다. 이전 설명용 예시(현재0, 변화율4, 간격0.25 → 다음1)는 N 해설에만 보존한다. 한 forward가 chunk 전체를 다룬다는 설명은 S029에도 유지한다.

### 상세 공부 기록

#### [S027] Euler 갱신 Eq.2

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

예측 변화율에 denoising timestep 간격 $\Delta\tau$를 곱해야 실제 후보 이동량이 된다.

##### 본문

###### 원문의 한 번 갱신

$$
\Delta\tau_i=\tau_{i+1}-\tau_i
$$

$$
\begin{aligned}
\mathbf{a}^{\tau_{i+1}}&=\mathbf{a}^{\tau_i}\\
&\quad+\Delta\tau_i\,\mathbf{u}_\theta(\mathbf{a}^{\tau_i},\tau_i,\mathbf{c}_t)
\end{aligned}
$$

현재 후보에, 그 위치에서 예측한 velocity와 다음 $\tau$까지의 간격을 곱한 값을 더한다. 간격이 작을수록 한 번에 이동하는 양도 작아진다. 후보를 옮긴 뒤에는 새 위치에서 변화율을 다시 예측한다.

##### 보충

###### 앞의 보간 예시로 한 단계

<span class="label example">정답 변화율을 정확히 안다고 가정</span>

$$
\tau:\;0.25\to0.5,\quad\Delta\tau=0.25
$$

$$
\begin{aligned}
[0,0.5]+0.25[4,-2]&=[1,0]
\end{aligned}
$$

만약 $\Delta\tau$를 빼고 \[4,−2\]를 통째로 더하면 \[4,−1.5\]가 되어, 목표한 $\tau$ 간격의 이동과 달라진다. 실제 모델은 근사 변화율을 사용하므로 이 예시처럼 경로를 정확히 맞춘다고 보장하지 않는다.

##### 요점

Velocity는 이동량 자체가 아니다. Eq.2의 $\Delta\tau$ 곱이 한 단계의 크기를 결정한다.

##### 출처

Sec.2.2 Eq.(2) · PDF p.8

##### 발표 메모

원문의 첨자 t:t+H는 수식의 가독성을 위해 축약했다. $\mathbf{a}^{\tau_{i+1}}$는 다음 grid point의 후보를 나타낸다. 이 Euler는 실제 로봇의 시간 제어 적분기가 아니라 denoising $\tau$ 공간에서의 샘플 생성이다. $\tau$ grid는 원문에서 증가하도록 정의하며 정확한 benchmark별 step 수는 평가·최적화 설정에서 다룬다.

#### [S029] 추론의 denoising 반복

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

정답을 모르는 추론에서는 노이즈 후보를 놓고, 같은 현재 조건 아래 전체 chunk를 다듬는다.

##### 본문

###### 한 정책 호출 안의 생성 loop

<div class="sequence">
<div class="step">① 현재 관측에서 조건 $\mathbf{c}_{t}$ 준비</div>
<div class="step">② $\mathbf{a}^{0}\sim\mathcal{N}(0,I)$, $\tau=0$에서 시작</div>
<div class="step">③ 후보·$\tau$·조건 → $\mathbf{u}_{\theta}$로 변화율 계산</div>
<div class="step">④ $\Delta\tau$ × 변화율을 더해 후보와 $\tau$ 갱신</div>
<div class="step">⑤ $\tau=1$까지 ③–④ 반복 → action chunk</div>
</div>

##### 보충

###### 반복해서 변하는 것

**변하는 것:** 미래 action 후보, denoising timestep $\tau$, 물리 예측을 사용하면 미래 sensor 후보.

**이번 호출의 조건:** $\mathbf{h}_{t}$·$\mathbf{m}_{t}$·$\mathbf{s}_{t}$·현재 $\mathbf{p}_{t}$. denoising 반복 자체가 새로운 카메라 관측을 받거나 로봇 시간 t를 전진시키는 것은 아니다.

한 forward에서 chunk 전체의 변화율을 예측한다. 완성된 action을 실제로 일부 실행하고 다음 관측에서 재호출하는 바깥 loop는 별도다. 조건 특징의 실제 caching 방식은 본문 수식만으로 확정하지 않는다.

##### 요점

같은 t의 생성 loop와 실제 로봇이 움직인 뒤의 재관측 loop를 분리해서 이해한다.

##### 출처

Sec.2.2 Eq.(2), Physical Sensing · PDF p.8; 질문노트 Q7

##### 발표 메모

원문은 $0=\tau_1<\cdots<\tau_T=1$의 grid를 정의하고 $i=1,\ldots,T-1$에서 Euler update한다. 따라서 식 표기를 문자 그대로 세면 grid point T개·update T−1회다. 본문은 T denoising steps라고도 표현하므로 이 기호를 다른 실험의 4 Euler steps와 임의 동일시하지 않는다. 추론 중에는 학습된 $\theta$를 고정하며 역전파로 매번 모델을 학습하지 않는다.

#### [S030] 미래 물리 신호 예측

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

현재 촉각·토크를 조건으로 쓰면서, 미래 센서 trajectory를 예측하는 보조 목표도 학습한다.

##### 본문

###### 센서의 현재와 미래

$$
\begin{aligned}
\mathbf{p}_{t+1:t+L}^{\tau}
&=\tau\mathbf{p}_{t+1:t+L}+(1-\tau)\boldsymbol{\epsilon}_p
\end{aligned}
$$

현재 <strong>$\mathbf{p}_{t}$</strong>는 관측된 조건이다. 학습의 정답 미래 <strong>$\mathbf{p}_{t+1:t+L}$</strong>에 노이즈를 섞어 별도의 생성 후보를 만든다. P stream은 그 후보를 정답 미래 신호로 옮길 변화율 <strong>$\mathbf{p}_{t+1:t+L}$−$\boldsymbol{\epsilon}_{p}$</strong>를 학습한다.

##### 보충

###### 행동과 함께 배우는 이유

물체 접촉·미끄러짐·그립 힘처럼 영상 변화가 작거나 가려진 상황에서 센서가 정보를 보탠다. 저자는 미래 센서 예측이 물리 상호작용을 내부화하고 행동 생성에 물리 피드백을 활용하도록 유도한다고 설명한다.

<p class="callout">미래 센서 예측은 <strong>auxiliary objective</strong>다. 실제 미래를 관측한 것처럼 미리 입력하는 구조나 물리적 성공을 보장하는 시뮬레이터로 해석하지 않는다.</p>

<p class="mini">센서가 없으면 P stream의 attention을 mask한다. 센서 희소성과 모듈 분리의 관계는 다음 MSAT 장에서 연결한다.</p>

##### 요점

현재 센서 조건, 미래 센서 후보, 미래 신호 예측 보조 손실은 서로 다른 역할이다.

##### 출처

Sec.2.2 Functionality3: Physical Sensing · PDF p.8; Sec.4.2 · PDF p.13

##### 발표 메모

학습은 미래 센서의 정답을 데이터에서 얻는다. 추론에서 초기 future candidate는 noise이고 정답 미래 sensor를 알지 못한다. Sec.4.2는 L=H+1로 설정한다. Action과 physics loss의 정확한 합산 가중치나 센서 좌표별 normalization은 이 문단만으로 확정하지 않는다. Auxiliary objective 단독의 성능 효과는 전체 시스템 비교와 분리해서 보아야 한다. 마지막 문장의 noisy action “C stream” 표기는 S031의 명시적 입력 배치와 불일치하므로 S034에서 다룬다.
