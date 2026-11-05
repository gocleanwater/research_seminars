# Training Procedure

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P016] Pre-training

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S056, S057, S058, S059
figure: fig-06.png
caption: Figure 6 · 약 1.5M episode의 pool과 별도로 정한 학습 혼합 비중
-->

### 한 문장

Pre-training의 공통 경험을 출발점으로 mid·post-training에서 적응 범위를 좁힌다.

### 본문

#### 세 단계의 역할

**Pre:** 다양한 로봇의 조작 → **Mid:** 특정 로봇·기능 확장 → **Post:** 목표 작업 적응.

Pre-training은 네 프레임을 입력해 flow matching으로 배운다. 로봇별 projection과 함께, batch의 일부 256 trajectory를 공통 projection으로 보내 새 로봇 적응의 초기값을 준비한다.

### 보충

<p class="callout">Figure 6의 원은 학습 혼합 비중, 표는 episode pool 크기다. OXE와 DROID의 비중은 각 25%다.</p>

### 요점

공유 행동 모델과 공통 입출력 경로를 함께 학습해 embodiment 간 경험을 연결한다.

### 출처

Sec.4–4.1; Fig.6 · PDF pp.12–13

### 발표 메모

학습 규모·freeze 범위·정규화·padding 설정은 상세 단위에 있다. 다음 장에서 새 기억·센서 모듈을 붙일 때의 적응으로 이어간다.

### 상세 공부 기록

#### [S056] Pre·Mid·Post-training의 역할

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

먼저 범용 조작을 배우고, 로봇의 기능을 확장한 뒤, 목표 작업에 적응한다.

##### 본문

###### 세 단계의 질문

<div class="sequence">
<div class="step"><strong>Pre:</strong> 다양한 로봇의 공통 조작 경험을 어떻게 배울까?</div>
<div class="step"><strong>Mid:</strong> 특정 로봇과 새 기억·센서 기능에 어떻게 적응할까?</div>
<div class="step"><strong>Post:</strong> 실제 목표 작업을 어떻게 안정적으로 수행할까?</div>
</div>

##### 보충

###### 단계와 학습법은 다른 축

Pre-training은 대규모 multi-embodiment 데이터를 이용한 flow matching이다. Mid-training은 ALLEX·Franka 특화와 STSS·memory·physics 확장을 수행한다.

Post-training은 대부분 작업별 **imitation learning**을 쓴다. 일부 어려운 조작에 RECAP 기반 RL refinement를 추가한다.

<p class="callout">모든 post-training을 RL이라고 부르지 않는다.</p>

##### 요점

범용성 → 로봇·기능 특화 → 작업 적응의 순서로 학습 목적이 좁아진다.

##### 출처

Sec.4.1–4.3 · PDF pp.12–15

##### 발표 메모

세 단계의 역할 지도이며 모든 benchmark가 동일하게 모든 단계·모듈·RL을 사용한다는 뜻은 아니다. 사전학습 모델의 benchmark fine-tuning과 mid-trained real-world 기능 평가 조건은 평가 파트에서 구분한다.

#### [S057] Pre-training 데이터 혼합

<!-- study-meta
layout: figure
kind: fact
figure: fig-06.png
caption: Figure 6 · 학습 혼합 비중(원)과 데이터 pool의 episode 수(표)
-->

##### 한 문장

Figure 6의 원 그래프는 학습 혼합 비중이고, 표의 episode 수는 데이터 pool 크기다.

##### 본문

###### 약 1.5M episode의 범위

단일 팔·양팔 그리퍼와 손을 가진 휴머노이드를 함께 사용한다. 데이터가 부족한 휴머노이드에는 **합성 GR-1 150K episode**를 추가한다.

예를 들어 OXE 870K, DROID 92K, ActionNet 30K는 준비된 episode 수다. 학습 때 같은 비율로 뽑는다는 뜻은 아니다. 실제로 OXE와 DROID의 혼합 비중은 각각 25%다.

##### 보충

<p class="callout">Pool의 크기와 batch에 들어오는 샘플의 비중을 분리해서 읽는다.</p>

##### 요점

큰 데이터셋의 episode가 많아도 학습 기여 비중이 자동으로 결정되지는 않는다.

##### 출처

Fig.6; Sec.4.1 · PDF pp.12–13

##### 발표 메모

Figure 6 표: OXE 870K, DROID 92K, Galaxea 114K, AgiBot(G) 239K, AgiBot(H) 36K, ActionNet 30K, Humanoid Everyday 9K, Synthetic 150K, 전체 약 1.5M. 실제 그림 범례를 대조한 학습 혼합 비중: OXE 25%, DROID 25%, Galaxea 10%, AgiBot(G) 10%, AgiBot(H) 5%, ActionNet 10%, Humanoid Everyday 5%, Synthetic 10%. 본문 소개의 원시 데이터 규모와 실제 corpus 수를 구분한다. 비중을 episode 수의 비율로 덮어쓰지 않는다.

#### [S058] 공통 projection과 256개 trajectory

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

로봇별 입출력 경로를 유지하면서, 일부 샘플로 새 로봇 적응용 공통 경로도 학습한다.

##### 본문

###### 같은 공간, 두 입출력 연결부

<div class="sequence">
<div class="step">기본 경로: 로봇별 state/action → embodiment-specific projection</div>
<div class="step">일부 샘플: 크기를 맞춘 state/action → embodiment-agnostic encoder–decoder</div>
<div class="step">공유 latent 표현과 행동 모델을 학습</div>
</div>

공통 경로의 입력은 고정 크기에 맞게 앞쪽 차원을 zero-padding한다.

##### 보충

###### 256은 어떤 수인가?

각 batch에서 **trajectory 256개를 무작위로 선택해 공통 경로로 보낸다.** 공통 projection의 출력 차원이나 로봇 종류 수가 아니다.

Global batch는 8,192다. 저자는 공통 경로를 미관측 embodiment fine-tuning의 강한 초기값으로 활용하려 한다.

<p class="mini">256개를 별도 추가 batch로 더 학습한다고 원문에 없는 절차를 만들지 않는다.</p>

##### 요점

공통 projection은 로봇별 경로를 대체하기보다 새 로봇 적응을 준비하는 경로다.

##### 출처

Sec.4.1 · PDF pp.12–13

##### 발표 메모

원문 문구는 randomly sample256 trajectories for each batch and route them through shared encoder-decoder. Batch8192와 trajectory256의 단위를 그대로 유지하며 전체 corpus256개로 해석하지 않는다. Shared module이 zero-padding에 사용하는 정확한 차원 배치는 이 문단만으로 추가 확정하지 않는다.

#### [S059] Pre-training 설정을 읽는 법

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

시간 문맥·정규화·학습 가능한 범위·학습 규모를 서로 다른 설정으로 읽는다.

##### 본문

###### 입력과 정규화

<div class="token-row"><span class="token c">$t-6$</span><span class="token c">$t-4$</span><span class="token c">$t-2$</span><span class="token c">$t$</span></div>

현재 기준 네 프레임을 사용한다. State와 action은 데이터셋별 **1st·99th percentile**을 이용해 $[-1,1]$로 정규화한다.

VLM backbone은 위쪽 네 층을 제외하고 고정한다. 여러 프레임 입력은 이 단계부터 존재한다.

##### 보충

###### 학습 규모

- 100K steps · global batch 8,192
- AdamW · 학습률 $10^{-4}$
- 처음 5% linear warmup 후 일정 학습률
- 64 × NVIDIA H200 · 약 195시간

<p class="mini">논문의 학습 보고값이며, 이 발표에서 재현한 결과가 아니다. 프레임 offset은 timestep 단위이며 초 단위로 임의 환산하지 않는다.</p>

##### 요점

영상 시간 문맥은 pre-training부터, 전용 움직임 모듈은 mid-training부터 추가된다.

##### 출처

Sec.4.1 · Implementation Details · PDF p.13

##### 발표 메모

상위4층 외 frozen이라는 범위를 action model도 frozen이라는 뜻으로 확대하지 않는다. Percentile normalization의 정확한 clipping 처리 등 원문에 없는 구현 세부를 추가하지 않는다.

## [P017] Mid-training

<!-- slide-meta
layout: figure
kind: fact
source_ids: S060, S061, S062, S063, S064
figure: fig-07.png
caption: Figure 7 · 로봇별 데이터 혼합과 새 입력의 자체 데이터 supervision
-->

### 한 문장

Mid-training은 ALLEX·Franka 특화와 움직임·기억·물리 센싱의 확장을 함께 수행한다.

### 본문

#### 기능을 추가하고 정렬하기

STSS로 움직임을, cognition queue로 기억을 보강한다. 토크·Franka 촉각을 입력하고 미래 센서도 예측한다.

처음 **2K alignment steps**는 새 파라미터만 학습하고, 이후 전체를 함께 갱신한다. 확장 입력 dropout과 physics의 near-zero 출력 초기화도 쓴다.

### 보충

<p class="callout">설정별 효과는 미확인이다. Franka 비율 합101%도 임의 보정하지 않는다.</p>

### 요점

여러 프레임은 pre-training부터 쓰고, 전용 기능 모듈은 mid-training에서 추가한다.

### 출처

Sec.4.2; Fig.7 · PDF p.13; 질문노트 Q10·Q11

### 발표 메모

ALLEX 실제:합성5:5와 Franka DROID:자체8:2의 역할을 그림과 연결한다. Near-zero가 masking이나 기존 출력의 완전 보존을 뜻하지 않는다는 설명은 상세 단위에 둔다.

### 상세 공부 기록

#### [S060] Mid-training: 무엇을 새로 넣는가?

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

이미 쓰던 여러 프레임 위에 움직임·장기 기억·물리 센싱 기능을 추가한다.

##### 본문

###### 기능 확장의 세 갈래

- **Motion:** vision encoder에 STSS 모듈을 통합한다.
- **Memory:** VLM 뒤 memory module에 과거 cognition 3묶음을 넣는다.
- **Physics:** 현재 센서를 조건으로 chunk 구간의 미래 센서 trajectory도 예측한다.

여러 프레임 입력 자체가 mid-training에 처음 도입된 것은 아니다.

##### 보충

###### 로봇별 시간·센서 설정

ALLEX chunk horizon은 40, Franka는 16이다. 과거 cognition은 chunk horizon 간격으로 3개를 사용해 각각 120·48 timestep의 범위를 설명한다.

미래 센서 예측 길이는 <strong>$L=H+1$</strong>이다. ALLEX는 토크, Franka는 토크와 AnySkin 촉각을 쓴다.

<p class="mini">Queue 갱신·초기화의 세부 규칙은 별도 미해결 질문이다.</p>

##### 요점

Mid-training은 입력 프레임 수의 시작점보다 기능 모듈 통합의 시작점이다.

##### 출처

Sec.4.2 · PDF p.13; Sec.4.1 · PDF p.13; 질문노트 Q5·Q10

##### 발표 메모

원문의 $n_{\mathrm{mem}}=3$,ALLEX40/FR3 16 및120/48을 그대로 전달한다. 현재 $h_t$를 포함하는 전체 attention 범위와 과거 queue 길이를 섞지 않는다. Memory queue가 매20실행마다 어떻게 업데이트되는지 추론해 채우지 않는다.

#### [S061] Mid-training 데이터 혼합과 불일치

<!-- study-meta
layout: figure
kind: fact
figure: fig-07.png
caption: Figure 7 · ALLEX·Franka 혼합. Franka의 합계 101%는 미해결
-->

##### 한 문장

로봇별 혼합 목적은 설명되지만, Figure 7의 Franka 수치 합계는 본문과 맞지 않는다.

##### 본문

###### 본문의 두 혼합

**ALLEX:** 자체 실제 데이터와 합성 72K episode를 **5:5**로 sampling한다.

**Franka:** DROID 92K와 자체 데이터를 **8:2**로 sampling한다.

자체 데이터는 새 입력의 supervision, 대규모 데이터는 기존 조작 범위를 유지하는 역할이다.

##### 보충

<p class="callout">Franka 그림: $80.0+9.4+11.6=101.0$. 자체 데이터 둘은 21.0으로 본문의 20%와 불일치한다.</p>

##### 요점

비율의 역할은 읽되, 맞지 않는 숫자를 임의로 보정하지 않는다.

##### 출처

Fig.7; Sec.4.2 · PDF p.13; 질문노트 Q10·Q11

##### 발표 메모

실제 그림 범례를 대조했다. ALLEX: In-house 50, Task Aug. 25, No Aug. 15, Task/Scene Aug. 10. Franka: DROID 80, In-house(physical sensor 있음) 9.4, 없음 11.6. 11.6을 10.6으로 고치거나 합계 101로 나눠 정규화하지 않는다. 5:5·8:2가 다른 비율보다 낫다는 비교 근거도 이 절에는 없다.

#### [S062] 새 입력과 modality dropout

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

자체 데이터로 새 memory·토크·촉각 입력을 학습하면서 각 확장 입력에 dropout을 적용한다.

##### 본문

###### 모든 데이터가 새 입력을 주지는 않는다

원문은 자체 수집 데이터가 새 **memory·torque·Franka tactile** 입력의 유일한 supervision 공급원이라고 설명한다.

더 큰 기존 데이터는 조작 범위를 유지한다. 영상은 이미 pre-training에서 multi-frame으로 입력되었으므로 STSS 추가와 새 센서 추가를 구분한다.

##### 보충

###### 0.3 dropout의 정확한 범위

Mid-training에서 각 expanded modality input에 독립적으로 **0.3 dropout**을 적용해 통합을 안정화한다고 명시한다.

<span class="label question">남은 질문</span>

어느 tensor를 어떤 단위로 제거하는지, memory 구성의 어느 부분을 대상으로 하는지는 이 문단만으로 확정하기 어렵다.

<p class="mini">모델 전체의 30%를 끄거나 프레임 30%를 지운다고 바꾸어 설명하지 않는다.</p>

##### 요점

Dropout 비율은 확인됐지만 구체적인 masking 단위는 추가 명세가 필요하다.

##### 출처

Sec.4.2 · PDF p.13; 질문노트 Q10

##### 발표 메모

원문 expanded modality input 표현을 보존한다. Memory supervision을 새 직접 라벨 파일이 반드시 존재한다고 해석하지 않는다. 센서가 없는 episode에 대한 실제 masking 구현도 논문 해당 문단만으로 상상하지 않는다.

#### [S063] Alignment warmup: 새 모듈부터 적응

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

처음 2K step은 새 파라미터만 학습하고, 그 뒤 전체 파라미터를 함께 갱신한다.

##### 본문

###### 학습 시작의 두 구간

<div class="sequence">
<div class="step"><strong>앞에 추가한 2K alignment steps</strong><br>사전학습 파라미터 고정 · 새 modality-specific 파라미터만 갱신</div>
<div class="step"><strong>이후 joint training</strong><br>기존·새 파라미터를 함께 학습</div>
</div>

매 batch나 denoising 반복마다 새로 수행하는 절차가 아니다.

##### 보충

###### 왜 먼저 새 연결부를 맞출까?

<span class="label interpretation">설계 해석</span>

이미 배운 표현을 고정한 상태에서 새 입력 경로가 그 표현에 먼저 적응하게 한다는 직관이다. 이 효과를 별도 실험으로 확인한 것과는 다르다.

주 학습 설정은 25K steps·global batch1,024·AdamW·학습률 $5\times10^{-5}$이며, 약 15시간/64 H200으로 보고한다.

##### 요점

Alignment warmup의 파라미터 고정은 학습 초반의 일회성 구간이다.

##### 출처

Sec.4.2 · Implementation Details · PDF p.13; 질문노트 Q10

##### 발표 메모

본문은25K mid-train과prepend2K alignment라고 별도로 적는다. 총 step 집계 관례를 추가 확인 없이 단정하지 않는다. 일반 learning-rate warmup(동일 schedule)의5%와 여기2K alignment를 구별한다. “all parameters jointly”를 pre-training 상위4층 freeze 범위와 임의로 동일시하지 않는다.

#### [S064] Near-zero 초기화의 직관과 한계

<!-- study-meta
layout: split
kind: interpretation
-->

##### 한 문장

물리 stream의 초기 출력을 작게 시작하지만, 기존 모델과 완전히 같은 출력을 보장하지 않는다.

##### 본문

###### 원문이 명시한 대상

Physics stream의 projection·attention 등을 포함한 파라미터에 **near-zero output weights** 초기화를 적용한다.

<span class="label interpretation">설명을 위한 직관</span>

새 경로가 처음부터 큰 신호를 더하지 않도록 시작해, 기존 표현에 주는 초기 교란을 작게 하려는 선택으로 이해할 수 있다.

##### 보충

###### 무엇이 아직 비어 있는가?

- 정확히 어떤 행렬을 어떤 값으로 초기화하는가?
- 왜 완전 zero 대신 near-zero인가?
- 다른 초기화보다 실제로 안정적이었는가?

<p class="callout">작은 출력 가중치는 P stream masking과 다르다. 전체 정책이 초기부터 기존 정책과 동일하다는 보장도 아니다.</p>

##### 요점

초기화 설정은 사실, 안정화 이유는 해석, 비교 효과는 미확인이다.

##### 출처

Sec.4.2 · PDF p.13; 질문노트 Q10

##### 발표 메모

Near-zero가 정확한0이나 특정분산(예$10^{-5}$)이라는 숫자를 만들지 않는다. 초기 교란 감소는 설계 해석으로 표지한다. 결과 분석에 warmup/초기화 독립 ablation이 없다면 미해결로 남긴다.

## [P018] Post-training

<!-- slide-meta
layout: split
kind: fact
source_ids: S065, S066
-->

### 한 문장

Post-training의 기본은 작업별 모방학습이며, 실패 조건에 맞춰 시연을 추가한다.

### 본문

#### Base data: 일관성과 다양성

작업을 접근·잡기·이동·놓기 같은 동작으로 나누고 시연 시나리오를 정한다.

<div class="compare">
<div><strong>고정할 축</strong>
<p>잡는 자세·경로·순서</p></div>
<div><strong>변화시킬 축</strong>
<p>물체 위치·자세·초기 상태</p></div>
</div>

일관된 state–action 구조 안에 필요한 변화를 담아 제한된 시연을 수집한다.

### 보충

#### Refinement: 실패를 다음 수집으로

<div class="sequence">
<div class="step">시연으로 학습 → 실제 작업에 배치</div>
<div class="step">실패 조건 관찰 → 추가 시연 → 재학습</div>
</div>

예를 들어 새 물체 위치에서 실패하면 시연의 공간 범위를 넓힌다.

<p class="callout">대부분 실험은 IL을 쓴다. 일부 어려운 조작에서 RECAP 기반 RL을 보완적으로 추가한다.</p>

### 요점

Post-training이라는 단계 이름만으로 모든 작업에 RL이 적용됐다고 해석하지 않는다.

### 출처

Sec.4.3 · Adaptive Data Collection/RL · PDF pp.14–15

### 발표 메모

시연 추가 수집과 다음 장의 policy rollout 수집을 구분한다. 고정·변화 축은 원문 예시이며 모든 작업에 적용되는 절대 규칙은 아니다.

### 상세 공부 기록

#### [S065] Post-training의 기본은 작업별 IL

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

시연의 구조는 일관되게 유지하고, 작업에 필요한 변화는 의도적으로 넓힌다.

##### 본문

###### 먼저 시연 시나리오를 설계

대부분 실험은 embodiment·task-specific demonstration으로 모방학습한다. 복잡한 손 조작과 정밀 접촉에서는 제한된 시연의 품질이 특히 중요하다.

<div class="flow">
<div class="node">접근·잡기</div>
<div class="arrow">→</div>
<div class="node">옮기기·놓기</div>
<div class="arrow">→</div>
<div class="node">기다리기</div>
</div>

전체 작업을 시간 순서의 atomic motion primitive로 나눈다.

##### 보충

###### 고정할 것과 바꿀 것

<div class="compare">
<div><strong>Consistency factors</strong>
<p>잡는 자세, 움직임 경로, 실행 순서 등 일관된 state–action 패턴</p></div>
<div><strong>Variance factors</strong>
<p>물체 자세·위치, 초기 구성, 사람과 상호작용할 때 대기 시간</p></div>
</div>

정한 변화 축을 샘플링하며 base demonstration을 수집한다.

##### 요점

같은 작업 구조 안에서 필요한 변화를 담아 제한된 시연의 학습 가능성을 높인다.

##### 출처

Sec.4.3 · Adaptive Data Collection · PDF p.14

##### 발표 메모

예시 consistency/variance는 원문 예시이며 모든 작업에서 grasp pose를 항상 고정한다는 규칙은 아니다. Post-training 이름만으로 RL 사용을 추정하지 않는다.

#### [S066] 실패에 맞춘 추가 시연

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

기본 시연으로 배운 정책을 실제로 돌려 보고, 드러난 약점을 겨냥해 데이터를 보강한다.

##### 본문

###### Refinement 수집의 반복

<div class="sequence">
<div class="step">Base demonstrations → 정책 학습</div>
<div class="step">목표 작업에 배치 → 실패 조건 관찰</div>
<div class="step">시나리오·variance 범위를 확장</div>
<div class="step">약점을 겨냥한 추가 시연 → 다시 학습</div>
</div>

##### 보충

###### 실패를 수집 지침으로 바꾸기

원문 예처럼 물체가 여러 위치에 있을 때 실패한다면, 추가 시연에서 물체 위치의 공간적 범위를 넓힌다.

저자는 원하는 성능에 도달할 때까지 이 과정을 반복한다고 설명한다. 단순히 시연 수를 균일하게 늘리는 방식과 수집 목적이 다르다.

<p class="callout">이 refinement는 실패에 맞춘 추가 모방 시연이다. RECAP의 policy rollout 수집과 구분한다.</p>

##### 요점

실제 실패 조건을 다음 데이터 수집의 기준으로 사용한다.

##### 출처

Sec.4.3 · Adaptive Data Collection · PDF p.14

##### 발표 메모

원문의 adaptive collection 프로토콜을 설명한다. Desired performance의 수치·중단 기준이나 iteration 수는 이 문단에 없다. 추가 시연이 정책 rollout을 자동 수정해 만들어진다고 임의로 덧붙이지 않는다.

## [P019] RECAP

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S067, S068, S069, S070, S071
figure: fig-08.png
caption: Figure 8 · 정규화 value가 진행·실패·회복을 따라가는 두 사례
-->

### 한 문장

별도 Gemma critic의 숫자 텍스트 value를 활용해 RECAP의 policy 개선을 반복한다.

### 본문

#### 평가 → 학습 → 새 경험

**Critic**은 Gemma3-4b-it으로 value를 숫자 텍스트로 예측한다. 행동을 만드는 Qwen 기반 RLDX-1과 별도 모델이다.

Critic → advantage labels → policy 학습 → rollout 수집을 반복한다. 성공 데이터로 critic을 갱신한다. 정확한 advantage label 식은 미기재다.

### 보충

<p class="callout">곡선은 성공률이 아닌 진행 value다. RECAP은 40 action을 생성해 20개 실행하며, 이는 denoising 횟수와 다르다.</p>

### 요점

실패·회복을 읽는 critic과 행동을 만드는 policy를 분리하고, 새 데이터로 함께 개선한다.

### 출처

Sec.4.3; Fig.8 · PDF pp.14–15; App.C Algorithm1 · PDF p.43

### 발표 메모

Figure 8은 첫 성공과 재시도 성공 사례다. 모든 작업의 critic 정확도를 입증하는 실험으로 확대하지 않는다. 반복마다 전체 누적 데이터의 advantage를 다시 부여한다.

### 상세 공부 기록

#### [S067] Policy와 critic은 별도 모델

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

RLDX-1 policy는 행동을 만들고, 별도 Gemma critic은 현재 상황의 가치를 추정한다.

##### 본문

###### 행동을 만드는 policy

**RLDX-1**은 영상·지시·상태 등을 조건으로 action chunk를 생성한다. Qwen3-VL 기반 관측 표현과 MSAT 행동 모델을 이용한다.

<div class="flow">
<div class="node">관측·지시·상태</div>
<div class="arrow">→</div>
<div class="node">RLDX-1 policy</div>
<div class="arrow">→</div>
<div class="node">수치 행동</div>
</div>

##### 보충

###### 진행 가치를 읽는 critic

별도 **gemma3-4b-it** VLM을 사용한다. 현재 관측·task instruction·이산화한 state를 받아 정규화 전 정수 value를 텍스트로 출력한다.

새 value head 대신 기존 LM text-prediction 인터페이스를 재사용한다. LoRA rank128로 vision encoder를 포함한 전체 target에 적응하고, 성공 시연에서 1 epoch 학습한다.

##### 요점

Policy의 Qwen과 critic의 Gemma를 하나의 모델이나 동일 head로 혼동하지 않는다.

##### 출처

Sec.4.3 · PDF pp.14–15; App.C · PDF p.43

##### 발표 메모

Critic의 학습률은 $10^{-4}$다. Critic LoRA가 vision encoder를 포함한다는 설정과 policy 학습의 vision encoder freeze를 구분한다. Critic의 숫자 텍스트는 autoregressive prediction이지만 policy action generation은 flow matching이다.

#### [S068] Value와 advantage를 구분하기

<!-- study-meta
layout: split
kind: interpretation
-->

##### 한 문장

현재 상황의 가치와 기대에 비해 행동이 얼마나 유리한지는 서로 다른 판단이다.

##### 본문

###### Value: 지금 어디까지 왔는가?

보고서의 critic은 관측·지시·state에서 값을 추정하며, Figure 8은 이 값이 작업의 진행·실패·회복을 반영하는지 보여준다.

현재 상태를 평가하는 value와 로봇에 직접 보낼 action은 역할이 다르다.

##### 보충

###### Advantage: 기대보다 유리했는가?

<span class="label interpretation">배경 직관</span>

좋은 상태라는 것과 그 상태에서 선택한 행동이 기대보다 더 좋았다는 것은 다르다. Advantage는 후자의 상대적 유리함을 나타내는 개념으로 이해한다.

<span class="label question">원문에서 남는 부분</span>

이 보고서는 critic에서 advantage labels를 얻어 policy를 학습한다고 적지만, 정확한 계산·이산화·conditioning 식은 명시하지 않는다.

##### 요점

Value를 곧 advantage라고 놓거나, 미기재 label 식을 정답 수식처럼 추가하지 않는다.

##### 출처

Sec.4.3 · PDF pp.14–15; App.C Algorithm1 · PDF p.43; 질문노트 Q3

##### 발표 메모

일반 RL의 $Q-V$ 식이나 RECAP 원전의 세부식을 이 보고서가 명시한 것처럼 넣지 않는다. 이 장은 직관을 위한 개념 구분이다. Algorithm 1의 $A\leftarrow V(D_l)$는 label 생성 과정을 요약하지만, 현재 PDF 안에서 정확한 수식은 제공하지 않는다.

#### [S069] 숫자 텍스트 critic과 Figure 8

<!-- study-meta
layout: figure
kind: fact
figure: fig-08.png
caption: Figure 8 · 큐브 pick-and-place의 정규화 value: 첫 성공과 실패 후 회복
-->

##### 한 문장

기존 LM의 숫자 토큰을 활용한 값 예측이, 예시 trajectory의 실패와 회복을 더 잘 따라간다.

##### 본문

###### 그래프에서 읽을 것

**(a) 첫 시도 성공:** text prediction critic의 값이 진행에 따라 더 단조롭게 증가한다.

**(b) 재시도 후 성공:** 실패 때 하락하고 회복할 때 상승하는 변화를 더 잘 반영한다.

비교 대상은 새 예측 head를 쓰는 distributional critic이다.

##### 보충

<p class="callout">그림은 정규화 value다. 실제 출력은 정규화 전 정수 텍스트이며, 성공률이 아니다.</p>

##### 요점

예시 곡선은 progress 추정의 정성적 근거이며 모든 작업에서의 우월성을 보장하지 않는다.

##### 출처

Fig.8 · PDF p.14; Sec.4.3 · PDF p.15; App.C · PDF p.43

##### 발표 메모

원문은 native number tokens와 text interface 재사용으로 기존 지식을 활용하고 적은 데이터에 적응할 수 있다고 주장한다. Figure 8 두 사례만으로 전반적인 calibration이나 정확도를 정량 확정하지 않는다. Distributional critic의 수학적 분포 설계는 이 그림 설명만으로 추가하지 않는다. x축은 로봇 timestep이며 denoising $\tau$가 아니다.

#### [S070] RECAP: 수집·재평가·정책 갱신

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

Critic과 policy를 분리해 학습하고, 새 rollout을 합쳐 두 모델을 반복적으로 개선한다.

##### 본문

###### 초기 학습

<div class="sequence">
<div class="step">시연 $D_l$로 critic $V$ 학습</div>
<div class="step">$V(D_l)$에서 advantage labels $A$ 생성</div>
<div class="step">$D_l$와 $A$로 policy 학습</div>
</div>

Policy와 critic을 항상 동시에 최적화하는 절차가 아니라, 분리된 단계로 시작한다.

##### 보충

###### 반복 i = 1…N

<div class="sequence">
<div class="step">현재 policy rollout을 $D_l$에 합치기</div>
<div class="step">누적 데이터 중 성공 trajectory로 critic 재학습</div>
<div class="step">전체 $D_l$의 advantage를 다시 붙이기</div>
<div class="step">새 labels로 policy 다시 학습</div>
</div>

<p class="mini">성공 데이터로 critic을 갱신하는 것과 전체 데이터에 labels를 다시 붙이는 것을 구분한다.</p>

##### 요점

데이터를 늘릴 때 critic의 평가와 policy의 supervision도 함께 갱신된다.

##### 출처

App.C Algorithm1 · PDF p.43; Sec.4.3 · PDF pp.14–15

##### 발표 메모

Algorithm 1의 $D_{\mathrm{succ}}$는 누적 $D_l$에서 $y=\mathrm{success}$인 항목이다. $D_l$에는 rollout이 합쳐지고 critic refinement에는 그중 성공 subset을 쓴다. Policy는 pre-trained RLDX-1을 최대 30K steps(약 3 epochs), global batch128, AdamW $10^{-4}$, cosine schedule+5% linear warmup으로 학습하며 vision encoder는 고정한다. RL과 추가 데이터의 효과 분리 문제는 평가 장으로 연결한다.

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
