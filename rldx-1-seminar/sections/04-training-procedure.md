# Training Procedure

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P035] 학습 단계

<!-- slide-meta
layout: full
kind: fact
source_ids: S056
-->

### 한 문장

조작의 기본기 → 목표 로봇·기능 적응 → 실제 작업 적응의 순서로 학습 목적을 구체화한다.

### 본문

<div class="flow">
<div class="node"><h3>Pre-training</h3><strong>“여러 로봇으로 기본기”</strong><p>다양한 몸체·장면·작업에서 범용 조작 정책을 배운다.</p></div>
<div class="node"><h3>Mid-training</h3><strong>“이 로봇의 몸과 감각”</strong><p>ALLEX·Franka에 특화하고 움직임·기억·센서 기능을 더한다.</p></div>
<div class="node"><h3>Post-training</h3><strong>“이 작업을 실제로”</strong><p>작업별 시연으로 IL을 수행하고 필요한 고난도 작업에 RL을 보완한다.</p></div>
</div>
<p class="callout"><strong>Post의 흐름:</strong> 시연 → IL 정책 → 실행·실패 관찰 → 추가 시연·재학습.<br>정밀한 접촉·고차원 제어로 시연 수집이 어려운 작업에는 RECAP 기반 RL을 추가한다.</p>

### 보충



### 요점

세 단계는 학습 목적의 구분이다. Post-training의 기본은 IL이고, RL은 선택적인 보완이다.

### 출처

Sec.4–4.3 · PDF pp.12–15

### 발표 메모

따옴표는 함께 공부한 역할을 직관적으로 풀어쓴 설명이다. 모든 benchmark가 동일한 모든 단계와 RL을 필수로 거친다는 뜻은 아니다. 원문은 대부분 실험에 작업별 IL을 채택하고, 어려운 dexterous manipulation에 RL refinement를 보완한다고 설명한다. IL 성능이 특정 수치 아래면 RL로 전환한다는 임계값이나 자동 전환 규칙은 기재하지 않는다.

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

## [P016] Pre-training

<!-- slide-meta
layout: split
kind: fact
source_ids: S057, S059
-->

### 한 문장

다양한 로봇의 조작 경험에서, 새 로봇·작업 적응의 출발점이 될 범용 정책을 학습한다.

### 본문

#### Figure 6 읽기

<figure class="optimization-figure"><img src="/figures/fig-06.png" alt="Figure 6: Pre-training sampling 비중과 데이터별 episode pool"></figure>

**원 그래프 = 학습 샘플링 비중**<br>
**표의 episode 수 = 준비된 데이터 pool**

OXE 870K와 DROID 92K는 보유량이 다르지만,<br>
학습에서는 <strong>둘 다 25%</strong>씩 뽑는다.

### 보충

<table class="chunk-symbols" aria-label="Figure 6 학습 데이터별 episode 수와 sampling 비중"><thead><tr><th>데이터</th><th>Episode</th><th>비중</th></tr></thead><tbody>
<tr><td>OXE</td><td>870K</td><td>25%</td></tr>
<tr><td>DROID</td><td>92K</td><td>25%</td></tr>
<tr><td>Galaxea</td><td>114K</td><td>10%</td></tr>
<tr><td>AgiBot (G)</td><td>239K</td><td>10%</td></tr>
<tr><td>AgiBot (H)</td><td>36K</td><td>5%</td></tr>
<tr><td>ActionNet</td><td>30K</td><td>10%</td></tr>
<tr><td>Everyday</td><td>9K</td><td>5%</td></tr>
<tr><td>합성 GR-1</td><td>150K</td><td>10%</td></tr>
</tbody></table>

### 요점

약 1.5M episode의 pool을 정해진 비중으로 sampling한다. 보유량과 학습 비중은 다르다.

### 출처

Sec.4.1 · Fig.6 · PDF pp.12–13; G=gripper, H=hand, K=1,000 episodes

### 발표 메모

Fig.6의 색상·범례·표를 원문과 직접 대조했다. OXE25/DROID25/Galaxea10/AgiBotG10/AgiBotH5/ActionNet10/Everyday5/Synthetic10이며 합계100%다. 표에 적힌 pool 크기는870/92/114/239/36/30/9/150K이고 합계1,540K로 그림의 약1.5M과 대응한다. Section3의 원시 데이터셋 규모와 Figure6의 실제 corpus 규모를 섞지 않는다. 합성 GR-1 150K는 휴머노이드 데이터 부족을 보완하기 위해 포함한다. 입출력 구조는 앞의 P036에서 설명했다. Pre-training에서는 매 batch에서256 trajectories를 무작위로 선택해 공통 encoder–decoder로 보낸다. 전체 학습 데이터가256개라는 뜻은 아니다. 세부 학습 설정은 S059에도 보존한다.

### 상세 공부 기록

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
layout: figure balanced
kind: fact
source_ids: S060, S061, S062, S063, S064
figure: fig-07.png
caption: Figure 7 · 목표 로봇별 혼합: ALLEX 실제·합성, Franka DROID·자체
-->

### 한 문장

범용 정책을 ALLEX·Franka의 전문가로 적응시키고, 움직임·장기 기억·물리 센싱 기능을 통합한다.

### 본문

#### 왜 추가 학습이 필요한가?

범용 정책을 **목표 로봇·센서에 맞춘다.**

- **Motion:** vision encoder에 STSS 추가
- **Memory:** 과거 cognition 3묶음 활용
- **Physics:** ALLEX 토크 / Franka 토크·촉각

**학습 혼합:** ALLEX 실제:합성 **5:5**,<br>
Franka DROID:자체 **8:2**.

<p class="callout"><strong>첫 2K:</strong> 기존 고정, 새 파라미터만 학습<br><strong>이후:</strong> 전체 파라미터 함께 학습</p>

### 보충



### 요점

자체 데이터는 새 기능을 가르치고, 큰 데이터 공급원은 기존의 폭넓은 조작 경험을 유지한다.

### 출처

Sec.4.2 · Fig.7 · PDF p.13; 질문노트 Q10·Q11

### 발표 메모

Mid-training의 두 명시적 목적은 embodiment specialization과 functionality expansion이다. 여러 프레임 입력은 pre-training부터 사용하며 STSS 모듈은 mid-training에서 추가한다. 자체 데이터만이 새 memory·torque·Franka tactile 입력의 supervision을 제공한다. ALLEX는 합성72K와5:5, Franka는 DROID92K와자체8:2다. Figure7의Franka합101 문제는 S061과 미해결 장에 보존한다. Memory40/120·16/48, dropout0.3, physics near-zero 초기화의 설정과 해석은 S060–064에 보존한다. 2K warmup은 mid-training 시작에 prepend하며 매 batch마다 반복하지 않는다. 새 모듈을 기존 표현에 먼저 적응시킨다는 직관과 독립 ablation 근거는 구분한다.

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

실제 목표 작업에는 시연 기반 IL을 먼저 적용하고, 어려운 정밀 조작에는 RL로 추가 개선한다.

### 본문

#### 기본: 작업별 IL

<strong>“이 작업에서 어떻게 움직이는지”</strong>를 시연으로 가르친다. 논문의 대부분 실험이 이 방식이다.

<div class="sequence">
<div class="step">작업별 시연 수집 → IL 정책 학습</div>
<div class="step">실제 실행 → 실패 조건 확인</div>
<div class="step">부족한 조건의 시연 추가 → 재학습</div>
</div>

예: 새 물체 위치에서 실패하면 시연의 공간 범위를 넓힌다.

### 보충

#### 보완: 언제 RL을 쓰는가?

휴머노이드의 **높은 자유도·큰 행동 공간**, 복잡한 물체의 **정밀 접촉**은 좋은 시연을 충분히 모으기 어렵다.

이런 까다로운 dexterous manipulation에서 시연 기반 학습을 넘어 개선하기 위해 **RECAP 기반 RL refinement**를 추가한다.

<p class="callout"><strong>예: ALLEX 전구 돌리기.</strong><br>IL로 기본 동작을 익힌 뒤, 실행 경험과 critic 평가로 추가 개선한다.</p>

### 요점

IL이 기본이며 실패 조건의 추가 시연을 반복한다. RL은 고난도 작업에 선택적으로 더한다.

### 출처

Sec.4.3 · PDF pp.14–15; ALLEX 전구 RL 사례: Sec.6.5 · PDF pp.25–26

### 발표 메모

Base 수집의 고정/변화 축과 refinement 프로토콜은 S065–066에 보존한다. RL을 모든 Post-training의 필수 단계로 설명하지 않는다. 어떤 특정 상태나 성공률 임계치가 RL 전환을 자동 결정한다고 만들지 않는다. 원문이 제공하는 선택 이유는 고차원 행동 공간·정밀 접촉·고품질 시연 수집의 어려움이다. 추가 teleoperation 시연을 모으는 IL refinement와 policy rollout을 모으는 RECAP을 구별한다.

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
layout: split
kind: fact
source_ids: S067, S068, S070
-->

### 한 문장

행동을 만드는 policy와 진행을 평가하는 critic을 분리하고, 새 실행 경험으로 반복 개선한다.

### 본문

#### 두 모델의 역할

**Policy — RLDX-1**<br>
관측·지시를 보고 다음 행동을 생성한다.

**Critic — 별도 Gemma3-4b-it**<br>
“현재 작업이 얼마나 진행됐는가?”를 **숫자 텍스트 value**로 예측한다.

이 평가에서 **advantage labels**를 만들어 policy 학습에 사용한다.

<p class="mini">Advantage는 행동이 기대보다 얼마나 유리했는지에 대한 직관이다. 보고서의 정확한 label 식은 미기재다.</p>

### 보충

#### 먼저 학습하고, 경험을 추가한다

<div class="sequence">
<div class="step"><strong>시연으로 critic 학습</strong><br>value → advantage labels → policy 학습</div>
<div class="step"><strong>현재 policy로 실제 rollout 수집</strong><br>새 경험을 기존 데이터에 합친다.</div>
<div class="step"><strong>성공 trajectory로 critic 갱신</strong><br>전체 데이터의 labels를 다시 생성한다.</div>
<div class="step"><strong>새 labels로 policy 재학습</strong></div>
</div>

### 요점

Critic이 행동을 직접 내리는 것이 아니라, critic이 만든 학습 신호로 policy를 개선한다.

### 출처

Sec.4.3 · PDF pp.14–15; App.C Algorithm 1 · PDF p.43

### 발표 메모

Algorithm1 초기: Train V on D_l, A←V(D_l), Train π with A. 반복: D_l∪rollout, 누적 중 성공 subset으로 critic 갱신, 전체 advantage 재부여, policy 갱신. Critic은 RLDX-1의 Qwen VLM을 공유하는 모델이 아니며 Gemma3-4b-it 별도 backbone을 사용한다. AppendixC critic은 성공시연만으로1epoch, LoRA r128을 사용한다. Policy40개 생성·앞20개 실행·재호출 설정은 S071에 보존한다. 일반 RL의 Q−V 등을 이 보고서의 실제 label 구현 식으로 추가하지 않는다. 다음 Fig8은 critic의 value가 실제 진행·실패·회복을 읽는지 보는 예시다.

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

## [P037] Critic과 Figure 8

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S069
figure: fig-08.png
caption: Figure 8 · 초록: text prediction critic / 파랑: distributional critic
-->

### 한 문장

큐브 pick-and-place의 진행·실패·회복이 critic의 값 변화에 반영되는지 비교한다.

### 본문

#### 축과 색의 의미

**가로축:** 로봇 timestep<br>
**세로축:** 정규화한 value

#### (a) 첫 시도에 성공

초록 곡선은 작업이 진행됨에 따라 비교적 꾸준히 증가한다.

#### (b) 실패 후 재시도에 성공

실패 때 내려가고, 재시도·회복 때 다시 올라가는 변화를 초록 곡선이 더 잘 반영한다.

### 보충

<p class="mini">저자의 예시 해석이다. 숫자 텍스트로 출력한 값을 정규화한 그림이며 성공률 곡선이 아니다.</p>

### 요점

좋은 critic은 최종 성공뿐 아니라 중간의 진행·실패·회복도 평가해야 한다는 예시다.

### 출처

Fig.8 · PDF p.14; Sec.4.3 · PDF p.15; App.C · PDF p.43

### 발표 메모

Text critic은 새 예측 head를 처음부터 맞추는 대신 기존 VLM의 숫자 토큰·텍스트 예측 인터페이스를 활용한다. 비교 대상 distributional critic은 값 분포를 예측하는 별도 head 방식이며 구체적인 bin 설계를 본문에 없는 값으로 추가하지 않는다. 그림의 두 trajectory 사례는 저자의 progress 추정 해석을 보여주며 정량적 critic 정확도·정책 성공률을 직접 측정한 결과는 아니다. x축은 물리적 작업 timestep이며 denoising τ가 아니다.

### 상세 공부 기록

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

## [P075] PEFT와 LoRA

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

작업별 적응을 마친 뒤에는, 더 적은 학습 파라미터와 메모리로 적응할 수 있는지도 따져볼 수 있다.

### 본문

#### PEFT — Parameter-Efficient Fine-Tuning

전체 가중치를 모두 업데이트하는 대신, 일부 파라미터만 학습해 적응 비용을 줄이는 접근이다.

<strong>LoRA</strong>는 기존 가중치에 작은 추가 파라미터를 붙여 변화량을 학습하는 방식으로 이해할 수 있다.

<p class="callout"><span class="label interpretation">직관</span> 익힌 모델을 전부 다시 고치는 대신, 필요한 보정 부분을 작게 학습하는 선택이다.</p>

### 보충

#### Table 6이 비교하는 두 위치

<div class="sequence">
<div class="step"><strong>VLM:</strong> top-4층을 Full FT / LoRA / Frozen</div>
<div class="step"><strong>Action Model:</strong> Full FT / LoRA</div>
</div>

여기의 <strong>Full FT는 VLM 전체가 아니라 top-4층의 전체 가중치 학습</strong>을 뜻한다.

성공률뿐 아니라 학습 파라미터 수와 VRAM도 함께 비교한다.

### 요점

PEFT는 새 작업을 배우는 목적을 바꾸기보다, 어느 가중치를 얼마나 업데이트할지 바꾸는 비용·성능 선택이다.

### 출처

App.D · Table 6 · PDF p.44

### 발표 메모

rank는 LoRA 보정의 크기를 정하는 설정이며 rank가 클수록 언제나 성공률이 높다는 보장은 없다. 이 장은 수학적 LoRA 유도를 추가하는 대신 부록의 비교 대상을 정의한다. 다음 결과는 RoboCasa Kitchen24 tasks×50episodes,3views×4frames,단일 H200에서 얻었다.

### 상세 공부 기록

## [P076] PEFT의 성능 비교

<!-- slide-meta
layout: split
kind: fact
source_ids: S108
-->

### 한 문장

Action Model만 LoRA로 바꾸면 같은 성공률을 얻었지만, VLM을 완전히 고정하면 성능이 크게 낮아진다.

### 본문

#### Table 6 · rank 64 조건

| VLM top-4 | Action | 성공률 |
| --- | --- | --- |
| Full FT | Full FT | 62.67% |
| Full FT | LoRA64 | 62.67% |
| LoRA64 | LoRA64 | 55.33% |
| Frozen | LoRA64 | 36.42% |

<p class="mini">RoboCasa Kitchen의 별도 실험이다. Table 1의 70.6%와 직접 비교하지 않는다. Rank8까지 포함한 원문 7행은 N 해설에 보존한다.</p>

### 보충

#### 어떤 부분을 적응시켜야 하는가?

<p><span class="label authors">저자 해석</span> 작업 분포가 달라질 때 VLM backbone의 업데이트도 중요하다고 설명한다. Action Model만 바꾸는 것으로 충분하지 않았다는 관측이다.</p>

<p class="callout"><span class="label interpretation">직관</span> 행동 출력을 만드는 쪽뿐 아니라, 무엇을 보고 어떤 특징을 전달할지 정하는 쪽도 새 작업에 맞아야 한다.</p>

### 요점

Action LoRA의 비용 절감과 VLM 고정의 성능 저하는 서로 다른 선택의 결과다.

### 출처

App.D · Table 6 · PDF p.44

### 발표 메모

62.67%의 일치는 이 평가에서 보고된 수치이며 통계적 동등성 검정이 아니다. Full FT도 top-4층이 기준이다. 이 결과가 모든 새로운 작업에서 VLM 전체를 full tuning해야 한다는 주장은 아니다.

### 상세 공부 기록

#### [S108] PEFT와 적응 비용

<!-- study-meta
layout: full
kind: fact
-->

##### 한 문장

Action LoRA는 성능을 유지할 수 있지만 VLM까지 LoRA로 바꾸면 성능·VRAM이 함께 낮아진다.

##### 본문

| VLM top-4 / action | 성공률 | 학습 M | VRAM B1 |
| --- | --- | --- | --- |
| Full / Full | 62.67% | 2376.0 | 56.77GiB |
| Full / LoRA64 | 62.67% | 1150.5 | 37.20GiB |
| Frozen / LoRA64 | 36.42% | 378.4 | 23.31GiB |
| LoRA64 / LoRA64 | 55.33% | 397.8 | 23.71GiB |

**Full FT는 VLM 전체가 아니라 top-4층의 full tuning**이다. 실제 측정은 single H200, 24tasks×50episodes다. 23.71GiB가 24GiB 안에 든다는 사실은 있지만 소비자 GPU에서 실제 적응을 실행·검증한 결과는 아니다.

##### 보충

##### 요점

이 부록의 성능·메모리 절충을 Table1과 같은 실험값으로 섞지 않는다.

##### 출처

App.D · Table 6 · PDF p.44

##### 발표 메모

원문7개 행의 성공률/학습M/VRAM(batch32,batch1): Full/Full62.67,2376.0,87.10/56.77; Frozen/LoRA8은21.25,361.7,27.22/22.94; Frozen/LoRA64는36.42,378.4,27.48/23.31; Full/LoRA8은60.17,1133.7,76.33/36.83; Full/LoRA64는62.67,1150.5,76.60/37.20; Both-LoRA8은45.75,364.1,35.39/23.11; Both-LoRA64는55.33,397.8,35.93/23.71. $3\,\text{views}\times4\,\text{frames}=12\,\text{frames}$. Both-LoRA64의 학습 가능 파라미터는 전체의5.72%, batch32 VRAM은 baseline의41.3%다. Table1의70.6과 다른 setup이다. 실제 실행 GPU는H200이다.

## [P077] PEFT의 학습 비용

<!-- slide-meta
layout: full
kind: fact
source_ids:
-->

### 한 문장

학습 범위를 줄이면 VRAM도 줄지만, 어느 부분을 줄이는지에 따라 유지할 수 있는 성능이 달라진다.

### 본문

| VLM top-4 / Action | 학습 파라미터(M) | VRAM batch 32 | VRAM batch 1 |
| --- | --- | --- | --- |
| Full / Full | 2,376.0 | 87.10GiB | 56.77GiB |
| Full / LoRA64 | 1,150.5 | 76.60GiB | 37.20GiB |
| LoRA64 / LoRA64 | 397.8 | 35.93GiB | 23.71GiB |
| Frozen / LoRA64 | 378.4 | 27.48GiB | 23.31GiB |

Action LoRA는 학습 파라미터를 약 절반으로 줄인다. 양쪽 LoRA는 성능과 VRAM이 함께 낮아진다.

<p class="callout">실제 측정은 <strong>H200</strong>에서 했다. Batch 1의 23.71GiB는 24GiB급 적응 가능성을 시사하지만 소비자 GPU에서 직접 검증한 값은 아니다.</p>

### 요점

적은 학습 파라미터·적은 VRAM·높은 성공률을 함께 보고 적응 범위를 선택한다.

### 출처

App.D · Table 6 · PDF p.44

### 발표 메모

Both-LoRA64의 397.8M은 모델 전체 파라미터의 5.72%다. Batch 32의 35.93/87.10은 41.3%이며 batch 1 메모리 비율과 혼동하지 않는다. H200 측정의 batch 1 VRAM만으로 다른 GPU의 커널·메모리 overhead·성능을 보장하지 않는다. 전체 7행은 P076의 S108 N 해설에 유지한다.

### 상세 공부 기록
