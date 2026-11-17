# 4쪽으로 통합하기 전의5–10쪽

## [P051] VLM과 로봇 VQA

<!-- slide-meta
layout: split
kind: fact
source_ids: S008
-->

### 한 문장

범용 VLM의 조작 grounding 부족을 세 범주의 로봇 VQA 학습으로 보완한다.

### 본문

#### 왜 로봇 VQA가 필요한가?

범용 VLM은 시각 추론에 강해도,<br>조작에 필요한 <strong>embodied grounding</strong>이 부족할 수 있다.

- 목표 완료를 위한 <strong>하위 작업 추론</strong>
- 장면 속 물체 사이의 <strong>공간 관계 이해</strong>
- 관측과 <strong>low-level 제어 행동의 연결</strong>

<p class="callout"><strong>해결:</strong> 로봇 관측으로 영상 질문·답변(VQA)을 만들고, Qwen3-VL 8B를 fine-tuning한다.</p>

### 보충

#### 세 범주로 조작 이해를 보강

| 로봇 VQA가 학습하는 내용 | 보강하려는 능력 |
| --- | --- |
| 손끝(end-effector)과 목표 물체의 공간 관계 | 공간 추론 |
| 목표 완료를 위한 중간 subtask | 작업 이해 |
| 현재 프레임의 low-level action | 이해와 행동 실행의 정렬 |

<p class="mini">Fig.3에는 VQA 학습 블록이 따로 없다.<br>그 학습 결과가 그림의 <strong>RLDX-1-VLM</strong>이다.</p>

### 요점

VQA 적응 후 RoboCasa Kitchen 조작 성공률 57.5% → 60.9% (Table 2b). 상세 비교는 Ablation에서 본다.

### 출처

Sec.2.1 RLDX-1-VLM · PDF pp.6–7; Fig.3 · p.6; Table2(b) · p.25

### 발표 메모

#### 도입: 왜 범용 VLM을 그대로 쓰지 않는가?

“일반적인 시각 추론을 잘하는 것과, 그 이해를 로봇의 몸·목표·제어 행동에 연결하는 것은 다릅니다. 원문은 목표 완료를 위한 하위 작업 추론, 장면 속 물체 사이의 공간 관계, low-level 제어 행동으로의 grounding이 부족할 수 있다고 지적합니다. 여기서 embodied grounding은 관측과 지시의 의미를 실제 로봇의 몸과 조작에 연결하는 것으로 이해하면 됩니다.”

#### 해결: 로봇 trajectory에서 만드는 세 범주의 질문·답

“그래서 저자들은 로봇 trajectory의 관측에서 VQA, Visual Question Answering 데이터를 만들고 Qwen3-VL 8B를 fine-tuning합니다. 첫째, 손끝과 목표 물체의 공간 관계를 학습해 공간 추론을 보강합니다. 둘째, 목표를 이루기 위한 중간 subtask를 학습해 작업 이해를 높입니다. 셋째, 현재 로봇 프레임에 대응하는 low-level action을 학습해 VLM의 이해가 실제 행동 실행과 잘 연결되도록 합니다. 이 학습 결과를 RLDX-1-VLM으로 사용합니다.”

#### 효과의 지표와 범위

“Table2(b)에서 RoboCasa Kitchen의 조작 성공률은57.5%에서60.9%로,3.4%p 높아집니다. 이것은 VQA 질문의 정답률이 아니라 downstream 로봇 조작 성공률입니다. 세 질문 범주 각각의 독립 기여를 나눠 검증한 결과로 확대하지 않고, 전체 recipe의 성능에3.4%p가 그대로 더해진다고도 해석하지 않겠습니다. 자세한 조건과 attention 시각화는 뒤 Ablation에서 보겠습니다.”

#### Fig.3에는 왜 VQA가 보이지 않는가?

확인한 사실: 원문 Fig.3에는 VQA 데이터·질문·답변·학습 손실이 별도 블록으로 표시되지 않고, 학습 결과인 RLDX-1-VLM이 표시된다. VQA 학습은 Sec.2.1 본문이 설명한다. 그림을 읽는 관점에서는 VQA를 VLM을 적응시키는 학습 과정으로, Fig.3을 모델의 입력·특징·행동 처리 경로로 구별하면 된다. 저자가 VQA 블록을 그리지 않은 의도를 직접 밝혔다고 주장하지 않는다.

VQA 답변을 추론 때마다 별도 생성해 action decoder에 넣는 경로를 새로 만들지 않는다. 실제 행동 chunk는 Action Model이 생성한다. 정확한 VQA prompt·답변 형식·데이터 크기도 원문에 없는 값으로 채우지 않는다.

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

변화율 × denoising 간격으로 후보를 갱신한다. 다음은 생성한 chunk를 실제로 실행하는 바깥 반복이다.

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

## [P071] Action Chunk의 실행

<!-- slide-meta
layout: split
kind: fact
source_ids: S071
-->

### 한 문장

Action chunk를 생성하는 길이와 실제 실행하는 길이는 다르다. 부록의 RECAP 설정은 40개 생성·20개 실행이다.

### 본문

#### 행동 생성 바깥의 실행 반복

<div class="sequence">
<div class="step">현재 관측 → 미래 action 40개 생성</div>
<div class="step">앞의 action 20개만 실행</div>
<div class="step">새 관측 → policy 재호출 → 새 chunk 생성</div>
</div>

<p class="callout"><span class="label interpretation">직관</span> 오래된 계획을 끝까지 따르기보다, 새 상황을 반영해 다시 계획할 기회를 준다.</p>

### 보충

#### 구별할 세 가지 길이

| 설정 | 무엇을 세는가? |
| --- | --- |
| 생성 길이 40 | 예측한 미래 action의 수 |
| 실행 길이 20 | 다시 계산하기 전에 실행할 action의 수 |
| Denoising 횟수 | 한 chunk를 만드는 내부 갱신 횟수 |

원문은 RTC 기반 replanning을 사용한다고 설명한다. <strong>40/20은 이 RL 설정</strong>이며, 다른 benchmark의 값은 뒤에서 구분한다.

### 요점

Chunk 생성·일부 실행·재관측은 바깥 반복이고, denoising은 chunk를 만드는 안쪽 반복이다.

### 출처

App.C Policy Inference · PDF p.43; Sec.2.2 · p.8

### 발표 메모

RTC의 overlap/inpainting 세부를 임의 구현 설명으로 추가하지 않는다. 이 실행 간격이 memory 저장·교체 간격까지 확정하는 것은 아니다. Policy 학습은 vision encoder 고정, 최대 30K steps, batch 128, AdamW1e-4,40개 action chunk를 쓴다. 기존 S071을 이 장으로 옮겨 수식 설명 뒤 실제 실행과 연결한다.

### 상세 공부 기록

#### [S071] 40개 생성·20개 실행은 무엇인가?

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

한 번에 계획한 chunk 길이와 실제로 실행할 길이, 내부 denoising 횟수는 서로 다르다.

##### 본문

###### RECAP policy의 바깥 반복

<div class="sequence">
<div class="step">관측으로 미래 action 40개 생성</div>
<div class="step">앞쪽 action 20개만 실행</div>
<div class="step">새 관측에서 policy를 재호출</div>
</div>

App.C는 이 구성과 RTC 기반 replanning을 사용한다고 명시한다.

##### 보충

###### 그 안의 denoising 반복

Action 40개를 만들기 위해 noisy chunk 전체를 여러 denoising timestep <strong>$\tau$</strong>에서 갱신한다. 이 반복은 action을 로봇에서 20번 실행하는 것과 다르다.

로봇 시간 **t**, chunk 생성 길이, 실행 길이, denoising 횟수를 따로 기록해야 한다.

<p class="callout">“40개 예측·20개 실행”은 RECAP 부록 설정이다. 모든 benchmark에 그대로 일반화하지 않는다.</p>

##### 요점

Chunk는 미래 계획의 길이이고, denoising은 그 계획을 만드는 내부 계산이다.

##### 출처

App.C · Policy Training/Inference · PDF p.43; Sec.2.2 · PDF p.8

##### 발표 메모

RTC의 구체적인 overlap/inpainting 알고리즘은 이 보고서 내 설명 밖이므로 추가하지 않는다. ALLEX mid-training 40, Franka mid-training 16, ALLEX IDM20 등과 조건을 구분한다. Memory queue가 실행20개마다 갱신되는지는 미해결이며 여기서 추론하지 않는다.
