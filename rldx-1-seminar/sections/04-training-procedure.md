# Training Procedure

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P107] Training Procedure

<!-- slide-meta
layout: section-title
kind: interpretation
chapter: Seminar
source_ids:
-->

### 한 문장

기본기 → 로봇 적응 → 작업 적응

### 본문

<div class="section-title-page" aria-hidden="true"></div>

### 보충



### 요점



### 출처

세미나 구성 · 섹션 구분

### 발표 메모

준비한 데이터로 모델을 어떻게 학습시키는지, 세 학습 단계의 목적과 흐름을 보겠습니다.

### 상세 공부 기록



## [P035] 학습 단계

<!-- slide-meta
layout: full
kind: fact
source_ids: S056
-->

### 한 문장

범용 정책에서 출발해, 목표 로봇과 실제 작업에 차례로 맞춘다.

### 본문

<div class="training-stage-map"><div><small>Pre-training</small><h3>조작의 기본기</h3><p>여러 몸체·작업에서<br>공통 조작 경험 학습</p></div><b>→</b><div><small>Mid-training</small><h3>로봇·기능 적응</h3><p>목표 몸체에 맞추고<br>움직임·기억·센싱 확장</p></div><b>→</b><div><small>Post-training</small><h3>작업 적응</h3><p>실제 작업의 시연으로 학습<br>필요한 경우 RL 보완</p></div></div><p class="callout">데이터 종류는 재료의 구분, 학습 단계는 그 재료로 무엇을 배우는지의 구분이다.</p>

### 보충



### 요점

기본기 → 로봇·기능 → 목표 작업으로, 정책의 학습 목적을 구체화한다.

### 출처

Sec.4–4.3 · PDF pp.12–15

### 발표 메모

이제 데이터를 준비했으니, 모델을 어떤 순서로 학습시키는지 보겠습니다. 세 단계는 각각 배우는 목적이 다릅니다.

Pre-training은 여러 로봇의 경험에서 범용 조작 정책을 만드는 단계입니다. Mid-training은 그 정책을 ALLEX와 Franka에 맞추고, 움직임·기억·물리 센싱 기능을 더하는 단계입니다. Post-training은 실제로 수행할 목표 작업에 적응하는 단계입니다.

앞의 데이터 종류와 이 단계를 일대일로 대응시키지는 않습니다. 공개·자체·합성은 학습 재료를 구분하는 말이고, 여기서는 재료를 섞어 무엇을 배우는지를 구분합니다. 각 단계가 이전 정책을 어떻게 바꾸는지 차례로 보겠습니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

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
layout: full
kind: fact
source_ids: S057, S059
-->

### 한 문장

공개 실제 데이터와 합성 GR-1 데이터로, 다양한 로봇에서 쓰이는 조작의 기본기를 배운다.

### 본문

<div class="learning-pipeline"><div><small>학습 데이터</small><h3>공개 실제 + 합성</h3><p>여러 로봇의 실제 시연<br>합성 GR-1 데이터</p></div><b>→</b><div><small>학습</small><h3>Flow matching</h3><p>관측·지시를 조건으로<br>행동 변화율 예측</p></div><b>→</b><div><small>결과</small><h3>범용 조작 policy</h3><p>여러 몸체·작업에 공통으로<br>쓰이는 조작의 기본기</p></div></div>

### 보충



### 요점

다양한 로봇의 경험으로 기본기를 배운 뒤, Mid-training에서 목표 로봇에 맞춘다.

### 출처

Sec.4.1 · Fig.6 · PDF pp.12–13

### 발표 메모

Pre-training에서는 여러 로봇에서 공통으로 쓰는 조작의 기본기를 배웁니다. 왼쪽의 데이터는 공개 실제 데이터와 합성 GR-1 데이터입니다. 그리퍼, 양팔, 다섯 손가락 휴머노이드처럼 다양한 몸체의 관측과 행동을 학습 경험으로 사용합니다.

가운데의 flow matching은 관측과 지시를 조건으로, 시연 행동을 향하는 변화율을 예측하도록 학습하는 과정입니다. 다양한 로봇과 작업의 경험을 통해 공통적인 행동 예측 능력을 배우는 것입니다.

이렇게 배운 범용 policy를 출발점으로, 다음 Mid-training에서 ALLEX와 Franka에 맞추고 움직임·기억·물리 센싱 기능을 더합니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

Fig.6의 색상·범례·표를 원문과 직접 대조했다. OXE25/DROID25/Galaxea10/AgiBotG10/AgiBotH5/ActionNet10/Everyday5/Synthetic10이며 합계100%다. 표에 적힌 pool 크기는870/92/114/239/36/30/9/150K이고 합계1,540K로 그림의 약1.5M과 대응한다. Section3의 원시 데이터셋 규모와 Figure6의 실제 corpus 규모를 섞지 않는다. 합성 GR-1 150K는 휴머노이드 데이터 부족을 보완하기 위해 포함한다. 입출력 구조는4쪽 P032의 MSAT 마무리 대본에서 설명했다. Pre-training에서는 매 batch에서256 trajectories를 무작위로 선택해 공통 encoder–decoder로 보낸다. 전체 학습 데이터가256개라는 뜻은 아니다. 세부 학습 설정은 S059에도 보존한다.

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
layout: full
kind: fact
source_ids: S060, S061, S062, S063, S064
-->

### 한 문장

로봇별 데이터를 사용해 ALLEX·Franka에 맞추고, 움직임·기억·물리 센싱을 더한다.

### 본문

<div class="training-detail-grid"><div><small>학습 데이터 · 목표 로봇에 맞추기</small><h3>로봇별 데이터 조합</h3><p><strong>ALLEX</strong><br>직접 시연 + 합성 ALLEX</p><p><strong>Franka</strong><br>공개 실제 DROID + 직접 시연</p></div><div><small>함께 학습하는 기능</small><h3>움직임 · 기억 · 물리 센싱</h3><p>STSS · Memory · P stream</p><p>직접 시연에서 memory·torque와<br>Franka tactile의 supervision 제공</p></div></div><div class="training-mini-flow mid-alignment-flow"><span>추가한 모듈을 먼저 학습</span><b>→</b><span>기존 모델과 함께 학습</span></div>

### 보충



### 요점

직접 시연으로 목표 로봇과 새 입력을 학습하고, 공개·합성 데이터로 조작 경험을 보완한다.

### 출처

Sec.4.2 · Fig.7 · PDF p.13

### 발표 메모

Mid-training에서는 범용 policy를 ALLEX와 Franka의 몸체와 제어에 맞추면서, 움직임·기억·물리 센싱 기능을 더합니다.

먼저 왼쪽의 데이터 조합을 보겠습니다. ALLEX는 직접 수집한 시연과 합성 ALLEX 데이터를 함께 사용합니다. Franka는 공개 실제 데이터인 DROID와 직접 수집한 시연을 함께 사용합니다. 새로 사용하는 memory·torque·Franka tactile 입력의 supervision은 직접 시연에서 제공합니다.

오른쪽은 함께 학습하는 기능입니다. STSS로 움직임 정보를 반영하고, Memory Module과 P stream을 추가해 과거 경험과 물리 신호를 활용하게 합니다.

아래 순서처럼 기존 모델을 고정한 상태에서 새 모듈을 먼저 학습한 뒤, 전체를 함께 학습합니다. 이렇게 목표 로봇과 새 기능에 맞춘 policy를 다음 Post-training에서 특정 작업에 적응시킵니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

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
layout: full
kind: fact
source_ids: S065, S066
-->

### 한 문장

목표 작업의 직접 시연으로 policy를 학습하고, 실패 조건의 경험을 보강한다.

### 본문

<div class="post-il-flow"><div><small>1 · 학습 데이터</small><h3>직접 시연</h3><p>목표 로봇·작업의 시연<br>일관된 동작·다양한 배치</p></div><b>→</b><div><small>2</small><h3>IL policy 학습</h3><p>시연의 관측·행동으로<br>policy 학습</p></div><b>→</b><div><small>3</small><h3>실제 실행</h3><p>실패하는 상황과<br>부족한 조건 확인</p></div><b>→</b><div><small>4</small><h3>추가 시연·재학습</h3><p>실패 조건의 경험을<br>보강하며 반복</p></div></div><div class="post-rl-note"><strong>일부 고난도 작업 · RECAP RL</strong><span>실제 로봇 rollout을 추가로 수집해 개선</span></div>

### 보충



### 요점

작업별 직접 시연으로 IL을 반복하고, 일부 고난도 작업에는 실제 rollout을 쓰는 RL을 더한다.

### 출처

Sec.4.3 · PDF p.14

### 발표 메모

Post-training에서는 실제로 수행할 목표 작업에 맞춰 policy를 학습합니다. 사용하는 데이터는 해당 로봇으로 직접 수집한 작업별 시연입니다. 이 시연을 이용한 Imitation Learning, IL이 보고서의 거의 모든 실험에서 기본이 됩니다.

화면의 첫 단계에서 작업의 기본 동작 순서를 정하고 시연을 모읍니다. 잡는 자세나 실행 순서처럼 일관되게 유지할 요소와, 물체 위치처럼 다양하게 보여 줄 요소를 구분합니다. 그 시연으로 policy를 학습한 다음 실제 작업을 수행시킵니다.

실행에서 실패 조건을 찾으면 그 조건의 시연을 추가해 다시 학습합니다. 예를 들어 특정 물체 위치에서 실패했다면, 그 위치 범위를 포함하도록 시연을 늘립니다. 이 반복으로 부족한 작업 경험을 보완합니다.

일부 고난도 정밀 조작에서는 실제 로봇을 실행해 얻은 rollout을 추가로 수집하고, RECAP 기반 RL로 더 개선합니다. 다음에는 이 과정에서 policy와 critic이 어떤 역할을 하는지 보겠습니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

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
layout: full
kind: fact
source_ids: S067, S068, S070
-->

### 한 문장

행동을 만드는 policy와 진행을 평가하는 critic을 분리해, 실행 경험으로 정책을 개선한다.

### 본문

<div class="recap-roles"><div><h3>Policy · RLDX-1</h3><p>관측과 지시에서 행동 생성<br>실제로 실행해 새 경험 수집</p></div><div><h3>Critic · 진행 평가</h3><p>현재 상태의 가치를 예측<br>학습용 advantage 라벨 생성에 사용</p></div></div><div class="recap-cycle"><div><small>준비</small><b>시연으로 critic 학습</b><span>평가에서 advantage 라벨 생성</span></div><i>→</i><div><small>정책 학습</small><b>라벨을 조건으로 policy 학습</b><span>현재 policy로 rollout 수집</span></div><i>→</i><div><small>반복 개선</small><b>새 경험을 데이터에 추가</b><span>성공 경험으로 critic 갱신<br>라벨 재생성 → policy 재학습</span></div></div>

### 보충



### 요점

Critic은 행동을 지시하는 모델이 아니라, policy 학습에 사용할 평가 신호를 제공한다.

### 출처

Sec.4.3 · PDF pp.14–15; App.C Algorithm 1 · p.43

### 발표 메모

RECAP에서는 행동을 만드는 policy와 평가하는 critic의 역할을 나눕니다. Policy는 RLDX-1이고, critic은 현재 작업이 얼마나 진행됐는지 가치로 평가하는 별도 모델입니다.

먼저 시연 데이터로 critic을 학습하고, 그 평가에서 advantage 라벨을 만듭니다. Policy는 이 라벨을 조건으로 시연 데이터를 학습합니다. Critic이 다음 관절 명령을 직접 내려 주는 구조는 아닙니다.

그다음 현재 policy를 실제로 실행해 rollout을 모으고 기존 데이터에 합칩니다. 누적 데이터 중 성공한 경험으로 critic을 갱신하고, 전체 데이터의 라벨을 다시 생성해 policy를 재학습합니다. 이 과정을 반복하며 실행 경험을 추가합니다.

보고서는 이 평가 모델에 기존 VLM의 숫자 텍스트 출력을 활용합니다. 다음 Figure 8에서는 이 critic이 진행과 실패, 회복을 어떻게 평가하는지 보겠습니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

Algorithm1 초기: Train V on D_l, A←V(D_l), Train π with A. 반복: D_l∪rollout, 누적 중 성공 subset으로 critic 갱신, 전체 advantage 재부여, policy 갱신. Critic은 RLDX-1의 Qwen VLM을 공유하는 모델이 아니며 Gemma3-4b-it 별도 backbone을 사용한다. AppendixC critic은 성공시연만으로1epoch, LoRA r128을 사용한다. Policy40개 생성·앞20개 실행·재호출 설정은 S071에 보존한다. 일반 RL의 Q−V 등을 이 보고서의 실제 label 구현 식으로 추가하지 않는다. 일반 critic 전체가 반드시 새 head를 쓴다는 뜻은 아니다. 원문이 대비한 기존 VLM critic과 Fig.8의 distributional critic을 비교한다. 원문은 새로 초기화한 head의 적응에 큰 학습량이 필요하고 목표 도메인과의 분포 차이로 전이가 제한될 수 있다고 설명한다. 저자의 제안은 기존 VLM의 숫자 토큰을 autoregressive하게 예측하는 인터페이스를 재사용해 적은 데이터의 적응에 내부 지식을 활용하려는 것이다. 새 head를 붙이지 않는 것이 critic을 학습하지 않는다는 뜻은 아니다. Advantage는 행동이 기대보다 얼마나 유리했는지에 대한 배경 직관이며 정확한 label 식은 미기재다. 다음 Fig8은 두 critic의 value가 실제 진행·실패·회복을 읽는지 보는 예시다.

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

## [P037] Critic의 진행 평가

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S069
figure: fig-08.png
caption: Figure 8 · 초록: text prediction critic / 파랑: distributional critic
-->

### 한 문장

행동을 평가하려면 성공 직전뿐 아니라, 진행·실패·회복의 변화도 읽어야 한다.

### 본문

<div class="critic-reading"><div><small>(a) 첫 시도 성공</small><h3>진행을 따라 값 증가</h3><p>초록 곡선은 성공으로 갈수록<br>비교적 꾸준히 증가</p></div><div><small>(b) 실패 후 재시도</small><h3>실패 때 하락 · 회복 때 상승</h3><p>작업이 어긋났다가 회복되는<br>흐름을 평가에 반영</p></div></div><p class="critic-legend">세로축: normalized value · 성공률이 아님</p>

### 보충



### 요점

Figure 8은 critic이 작업 진행을 읽는 정성적 예시이며, 전체 정확도를 증명한 결과는 아니다.

### 출처

Fig.8 · PDF p.14; Sec.4.3 · p.15

### 발표 메모

Figure 8은 큐브를 옮기는 두 trajectory에서 critic의 평가가 어떻게 변하는지 보여 줍니다. 파란색은 새 예측 head로 value 분포를 내는 방식이고, 초록색은 이 보고서처럼 기존 VLM의 숫자 텍스트 출력으로 value를 내는 방식입니다.

먼저 왼쪽의 첫 시도 성공 사례를 보겠습니다. 초록 곡선은 작업이 진행될수록 비교적 꾸준히 올라갑니다. 오른쪽은 실패 후 다시 시도해 성공한 사례입니다. 실패할 때 값이 내려갔다가, 작업을 회복하면서 다시 올라가는 모습을 봅니다.

이런 평가가 실제 작업의 진행을 따라가면 앞의 policy 학습에 사용할 신호가 됩니다. 다만 세로축은 normalized value이지 성공률이 아니며, 이 두 예시만으로 모든 작업의 critic 정확도를 확정할 수는 없습니다. 여기까지가 데이터를 준비하고 목표 작업의 정책으로 다듬는 과정입니다. 마지막으로 Part 1의 핵심을 정리하겠습니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

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

## [P096] Part 1 최종 정리

<!-- slide-meta
layout: full
kind: interpretation
source_ids:
-->

### 한 문장

문제에서 출발해, 구조·데이터·학습이 하나의 로봇 조작 정책으로 이어진다.

### 본문

<div class="part1-recap-flow" aria-label="관측에서 로봇 행동으로 이어지는 흐름">
<div><small>보고</small><strong>영상·언어 지시</strong></div><span>→</span>
<div><small>이해하고 기억해</small><strong>VLM + Memory</strong></div><span>→</span>
<div><small>행동을 만들고</small><strong>MSAT + 상태·센서</strong></div><span>→</span>
<div><small>움직인다</small><strong>행동 묶음 일부 실행</strong></div>
</div>
<div class="part1-recap-cards">
<div><h3>왜 필요한가?</h3><p>움직임을 읽고<br>과거를 기억하고<br>물리적 상태를 감지하기 위해</p></div>
<div><h3>무엇으로 배우나?</h3><p>공개 시연 + 자체 시연<br>+ 검증한 합성 데이터</p><small>조작 경험과 새로운 조건을 공급</small></div>
<div><h3>어떻게 배우나?</h3><p>기본기 → 로봇·기능 적응<br>→ 실제 작업 적응</p><small>Pre → Mid → Post<br>작업별 IL · 필요하면 RECAP RL</small></div>
</div>

### 보충

### 요점

무엇을 보고 기억할지 설계하고, 다양한 경험과 단계별 학습으로 행동을 가르친다.

### 출처

Sec.1–4.3 · Fig.2–3, 8 · 앞선 Part 1 내용을 연결한 요약 도식

### 발표 메모

Part 1에서 본 내용을 하나로 연결해 보겠습니다. 출발점은 실제 조작에는 지금 보이는 물체를 알아보는 것 외에도, 움직임을 읽고 과거를 기억하며 물리적 상태를 감지하는 능력이 필요하다는 것이었습니다.

구조로 보면 영상과 언어에서 조작에 필요한 특징을 만들고, 과거의 특징을 Memory에서 가져옵니다. MSAT는 이 정보와 현재 로봇 상태, 사용 가능한 센서 신호를 조건으로 미래 행동 묶음을 생성합니다. 생성한 행동의 일부를 실행한 뒤에는 새 관측으로 다시 판단합니다.

이 모델을 가르치는 재료는 공개 시연, 자체 수집 시연, 그리고 검증한 합성 데이터입니다. 학습은 여러 로봇의 경험으로 기본기를 쌓는 Pre-training, 목표 로봇과 움직임·기억·센서 기능에 맞추는 Mid-training, 실제 작업에 적응하는 Post-training으로 이어집니다. 마지막 단계의 기본은 시연 기반 IL이고, 어려운 일부 작업에는 RECAP 기반 RL을 보완합니다. 이때 critic은 작업이 얼마나 진행됐는지를 평가하는 역할입니다.

따라서 Part 1의 핵심은 모델 구조, 데이터, 학습이 하나의 조작 정책을 만드는 과정으로 이어진다는 것입니다.

요약의 센서는 사용 가능한 경우의 조건이다. Post-training의 기본은 IL이며 RECAP RL을 모든 작업에 적용했다고 표현하지 않는다. 이 장은 앞선 내용의 요약이므로 새 상세 공부 단위를 추가하거나 기존 단위를 중복 연결하지 않는다. Part 2의 도입·요약은 후속 요청 전까지 보류한다.

### 상세 공부 기록

## [P098] Q&A

<!-- slide-meta
layout: boundary
kind: interpretation
chapter: Seminar
source_ids:
-->

### 한 문장

Part 1 · 모델 구조와 학습

### 본문

<div class="part-boundary-visual"><p>Part 1을 마칩니다.<br>질문과 의견을 나눠주세요.</p><div><a href="#S001">전체 목차</a><a href="#P099">Part 2로 이동 →</a></div></div>

### 보충

### 요점

### 출처

세미나 구성 · Q&A

### 발표 메모

여기까지 Part 1이었습니다. 모델 구조, 데이터, 학습 과정에 관해 질문이나 의견을 나누겠습니다.

> 조작: 질의응답을 마친 뒤 다음으로 넘기면 Part 2 시작 화면이 나온다.

### 상세 공부 기록
