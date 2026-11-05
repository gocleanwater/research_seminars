# Ablation and Analysis

원문의 실험 결과, 저자의 해석, 우리의 직관을 구분한다. 상세 공부 기록과 미해결 질문은 유지한다.

## [P026] Ablation and Analysis

<!-- slide-meta
layout: full
kind: fact
source_ids: S097, S107
-->

### 한 문장

VLM 표현·합성 데이터·RL·실행 최적화가 무엇을 바꾸는지, 일곱 근거를 따라 나눠 살펴본다.

### 본문

| 근거 | 확인하려는 내용 | 관측 지표 |
| --- | --- | --- |
| Table 2(a) | VLM의 특징 추출 층 | 조작 성공률 |
| Table 2(b) | 로봇 VQA 학습의 효과 | 조작 성공률 |
| Figure 19 | VQA 전후 참고하는 영상 영역 | Attention 시각화 |
| Table 3 | 합성 데이터 규모의 효과 | 조작 성공률 |
| Figure 20 | RL을 적용한 전구 비틀기 작업 | 과제·목표 소개 |
| Figure 21 | RECAP 반복에 따른 개선 | Frames·비틀기 횟수 |
| Table 4 | 추론 최적화의 단계별 효과 | Policy 지연 p50 |

### 보충

### 요점

무엇을 바꿨고 어떤 지표가 달라졌는지 먼저 보고, 결과에 대한 해석과 직관을 연결한다.

### 출처

Sec.6.5 · Tables 2–4 · Figs.19–21 · PDF pp.24–26

### 발표 메모

이 장은 분석의 지도다. Table2/3/RL/latency는 서로 다른 설정의 실험이며 하나의 누적 성능 개선표가 아니다. 정성 시각화와 정량 비교, 성공률과 완료 효율, policy p50과 전체 제어 지연을 구분한다. 독립 비교가 남은 구성 요소는 기존 S107 해설에 보존한다.

### 상세 공부 기록

#### [S097] Ablation을 읽는 기준

<!-- study-meta
layout: split
kind: interpretation
-->

##### 한 문장

바꾼 요소·고정 조건·지표·남은 대안 설명을 함께 기록한다.

##### 본문

###### 비교를 읽는 네 질문

<div class="sequence">
<div class="step"><strong>무엇을 바꿨나?</strong> feature layer, VQA 학습, 합성 pool, RL round, 실행 stack.</div>
<div class="step"><strong>무엇을 고정했나?</strong> task, 모델 출발점, 데이터, 학습량, 하드웨어.</div>
<div class="step"><strong>무엇을 측정했나?</strong> 성공률, 부분점수, frames, attempts, p50 latency.</div>
<div class="step"><strong>무엇이 함께 변했나?</strong> 추가 데이터·노출량·temperature·후보 수 등.</div>
</div>

##### 보충

###### 같은 60.9라도 맥락이 있다

Table2의 60.9는 Kitchen의 base-architecture 분석값이다. Table1의 full recipe70.6과 조건이 달라 하나의 누적 개선표로 연결할 수 없다.

###### 효과와 메커니즘

“수치가 올랐다”는 관측과 “이 표현 때문에 올랐다”는 설명은 근거가 다르다. 저자의 설명은 별도로 표시한다.

##### 요점

한 수치보다 비교가 성립하는 조건이 먼저다.

##### 출처

Sec.6.5 · Tables 2–4 · Figs.19–21 · PDF pp.24–26

##### 발표 메모

이 슬라이드는 원문 실험을 읽기 위한 우리의 검토 기준이다. 저자가 이 네 단계 checklist를 제안했다는 뜻은 아니다. VLM ablation은 large-scale policy pre-training을 생략한 base setup, synthetic는GR1-only controlled pre-training, RL은ALLEX single task, latency는desktop固定 setup이다. 서로 다른 분석값을 누적해 전체 기여도를 산출하지 않는다.

#### [S107] 남은 구성 요소 검증

<!-- study-meta
layout: split
kind: question
-->

##### 한 문장

보고된 ablation은 유용하지만 모든 설계 선택의 독립 기여를 분리하지는 않는다.

##### 본문

###### 구조·입력·보조 목표

- 같은 VLM·데이터에서 single-stream ↔ MSAT 비교.
- Motion·memory 입력을 같은 policy에서 각각 제거.
- Physical input 제거와 미래 센서 예측 손실 제거를 분리.
- 모든 기능을 함께 쓰는 복합 과제와 기능 간 간섭 평가.

##### 보충

###### 학습 recipe의 선택 근거

- Mid-training5:5·8:2를 다른 혼합 비율과 비교.
- Alignment warmup 유무·길이·동일학습 예산 비교.
- Zero·near-zero·random 초기화 비교.
- 합성 task/scene/filter 단계별 통제 비교.

<p class="label question">검토한 6.5와관련부록에서 분리 근거를 찾지 못한 항목</p>

##### 요점

검증이 남았다는 것은 모델 오류가 확인됐다는 뜻이 아니다.

##### 출처

Sec.6.5 · PDF pp.24–26; Sec.4.2 · PDF p.13; App.G.3–G.4 · PDF pp.51–52; Q1·Q2·Q10

##### 발표 메모

논문 전체나 관련 연구에 해당 실험이 절대로 없다고 단정하지 않고 이번에 확인한 범위를 명시한다. Baseline 대비 향상은 통합 시스템의 성과이며 목록은 그 기여를 분해하기 위한 후속 실험이다. Table4의 모듈 제외 비교는 latency이고 정확도 기여의 통제표가 아니다. Table3은 합성 pool 규모 비교이며 classifier precision/recall을 주지 않는다.

## [P060] VLM의 특징 추출 층

<!-- slide-meta
layout: split
kind: fact
source_ids: S098
-->

### 한 문장

Table 2(a)는 VLM의 특징을 꺼내는 층을 바꿨을 때 조작 성공률이 어떻게 달라지는지 비교한다.

### 본문

#### RoboCasa Kitchen · Table 2(a)

| 특징 추출 층 | 성공률 | 18층 대비 |
| --- | --- | --- |
| 8층 | 51.1% | −9.8%p |
| <strong>18층</strong> | <strong>60.9%</strong> | 기준 |
| 28층 | 56.3% | −4.6%p |

행동 모델에 넘길 <strong>VLM hidden states의 추출 위치</strong>를 바꾼다. 세 후보 중 중간 18층의 결과가 가장 높다.

<p class="mini">Base architecture의 별도 분석이다. Table 1의 full recipe 결과와 조건이 다르다.</p>

### 보충

#### 왜 중간층이 유리했을까?

<p><span class="label authors">저자 해석</span> 초반층은 의미 정보가 부족하고, 후반층은 세밀한 시각 정보와의 정렬이 약해질 수 있다. 중간층은 <strong>시각적 grounding과 의미적 추상화 사이의 균형</strong>이 더 좋다는 설명이다.</p>

<p class="callout"><span class="label interpretation">우리의 직관</span> “무엇을 조작해야 하는지”와 “손·물체가 정확히 어디에 있는지”를 함께 담은 표현이 행동 생성에 유리할 수 있다.</p>

<p class="mini">성공률 차이는 관측 결과이고, 의미·시각 정보의 균형은 그 결과에 대한 해석이다.</p>

### 요점

언어 생성에 가까운 마지막 층보다, 조작에 필요한 의미와 시각 정보를 함께 담은 중간 표현이 유리할 수 있다.

### 출처

Sec.6.5 · Table 2(a) · PDF pp.24–25; 기존 질문노트 Q4

### 발표 메모

원문은 base architecture에서 large-scale policy pre-training 없이 각 variant를 학습한다고 설명한다. Qwen VLM 가중치 전체를 무작위 초기화했다는 뜻으로 해석하지 않는다. 18층은 세 후보/한 benchmark에서 우세하며 모든 층·로봇·작업의 보편 최적값은 아니다. 의미 정보량과 시각 정렬을 따로 측정해 원인을 분해한 실험은 아니다. 이전 구조 장은 중간층으로 설명하고 여기서는 사용자가 요청한 ablation 수치를 읽기 위해 실제18층을 명시한다.

### 상세 공부 기록

#### [S098] Table 2(a): 어느 층의 특징을 쓸까?

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

세 후보에서는 18층이 가장 높다. 모든 층·task의 보편 최적값을 찾은 결과는 아니다.

##### 본문

###### RoboCasa Kitchen 성공률

| VLM 추출 층 | 성공률 (%) | 18층 대비 |
| --- | --- | --- |
| 8 | 51.1 | −9.8%p |
| 18 | 60.9 | 기준 |
| 28 | 56.3 | −4.6%p |

같은 base architecture에서 feature 추출 위치를 바꾼 분석이다. 전체 recipe의 Table1 결과와 직접 이어 붙이지 않는다.

##### 보충

###### 저자의 메커니즘 설명

<span class="label authors">저자 해석</span> 초기 층은 의미 정보가 부족하고, 후기 층은 세밀한 시각 정렬이 약해질 수 있어 중간층이 균형을 제공한다고 설명한다.

###### 설명이 남긴 범위

세 층의 결과는 이 해석과 양립하지만 의미·시각 정보를 각각 측정해 원인을 분해한 실험은 아니다. 선택하지 않은 다른 층이나 embodiment까지 18층 우위를 일반화하지 않는다.

##### 요점

층 선택 효과는 관측됐고, 의미·시각 균형은 그 결과에 대한 설명이다.

##### 출처

Table 2(a) · Sec.6.5 · PDF pp.24–25; Q4

##### 발표 메모

본문의 “each variant is trained from scratch without pre-training”은 이 분석에서 대규모 로봇 policy pre-training을 생략한 base setup으로 읽는다. 이미 사전 학습된 Qwen VLM의 모든 가중치를 무작위 초기화했다는 뜻으로 확대하지 않는다. Layer8/18/28의51.1/60.9/56.3과18층 대비9.8/4.6%p 차이를 대조했다. 세 후보·한 benchmark의 관측과 모든 층·task에 관한 최적성 주장을 구분한다.

## [P061] 로봇 VQA의 효과

<!-- slide-meta
layout: split
kind: fact
source_ids: S099
-->

### 한 문장

Table 2(b)는 로봇 관련 VQA로 적응시킨 VLM이 실제 조작 성공률에도 도움이 되는지 확인한다.

### 본문

#### RoboCasa Kitchen · Table 2(b)

| 사용하는 VLM | 조작 성공률 |
| --- | --- |
| Qwen3-VL 8B | 57.5% |
| <strong>RLDX-1-VLM · 로봇 VQA 적응</strong> | <strong>60.9%</strong> |

차이는 <strong>+3.4%p</strong>다. 같은 base 분석에서 VLM을 교체하며, 행동 모델은 18층 특징을 사용한다.

<p class="callout">여기서 오른 것은 <strong>downstream 조작 성공률</strong>이다. VQA 질문의 정답률을 측정한 표가 아니다.</p>

### 보충

#### 범용 이해를 로봇 조작에 맞추기

<p><span class="label authors">저자 해석</span> 로봇 VQA supervision이 VLM 특징을 행동 예측에 더 관련되도록 다듬었다고 설명한다.</p>

<p class="callout"><span class="label interpretation">우리의 직관</span> “컵이 있다”는 이해에서 더 나아가, 손과 컵의 공간 관계·현재 하위 작업·대응 행동을 연결하도록 연습시키는 셈이다.</p>

공간 관계·subtask·low-level action 중 무엇의 기여가 가장 큰지는 이 표에서 따로 비교하지 않는다.

### 요점

VLM이 이미 장면을 잘 이해해도, 로봇 조작에 맞춘 추가 supervision이 행동 성능을 높일 수 있다.

### 출처

Sec.6.5 · Table 2(b) · PDF pp.24–25; VQA 구성: Sec.2.1 · pp.6–7

### 발표 메모

57.5→60.9는3.4 percentage points다. Full recipe에서3.4%p가 그대로 더해진다고 주장하지 않는다. 설명용 컵 문장은 실제 VQA prompt 인용이 아니다. VQA는 backbone 표현 적응, 이후의 action model 학습은 별도의 역할이다. 다음 Fig19는 이 수치를 해석하는 정성적 보조 근거다.

### 상세 공부 기록

#### [S099] Table 2(b): 로봇 VQA 적응의 효과

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

같은 분석 설정에서 로봇 VQA 적응 모델은 57.5→60.9로 3.4%p 높다.

##### 본문

###### 교체한 VLM

| VLM | 성공률 (%) |
| --- | --- |
| Qwen3-VL 8B | 57.5 |
| Robot-VQA 적응 RLDX-1-VLM | 60.9 |

$$
60.9-57.5=+3.4\,\text{\%p}
$$

비교 지표는 RoboCasa Kitchen downstream 성공률이다. VQA 정답률이 3.4%p 오른 표가 아니다.

##### 보충

###### 어떤 조건의 비교인가?

Base architecture를 사용하고 대규모 policy pre-training을 생략한 분석이다. 행동 생성에는 18층 특징을 사용한다.

<span class="label authors">저자 해석</span> 로봇 VQA supervision이 VLM의 특징을 행동에 더 관련되도록 조정했다고 설명한다.

이 결과만으로 데이터 유형별 기여·VQA 질문별 기여 또는 full recipe에서 동일한 3.4%p가 더해진다고 확정할 수 없다.

##### 요점

보고된 이득은 이 통제 설정의 downstream 조작 성능에 관한 것이다.

##### 출처

Table 2(b) · Sec.6.5 · PDF pp.24–25; Q4

##### 발표 메모

57.5→60.9는3.4 percentage points다. 상대 개선률은 약5.9%지만 혼동을 줄이기 위해 화면에서는%p만 사용한다. Table1의70.6과 비교해 VQA의 전체 기여를 계산하지 않는다. VLM의 로봇 VQA 적응 여부와 downstream action model 학습을 구별하며 foundation VLM의 사전 학습을 생략했다고 주장하지 않는다.

## [P062] VQA 전후의 Attention

<!-- slide-meta
layout: figure
kind: fact
source_ids: S100
figure: fig-19.png
caption: Figure 19 · 마지막 prompt token에서 image patch로 향하는 attention
-->

### 한 문장

Figure 19는 로봇 VQA 전후에 VLM이 영상의 어느 영역을 더 참고하는지 정성적으로 비교한다.

### 본문

#### 위에서 아래로 비교

<p><strong>위:</strong> 원본 관측 영상<br><strong>가운데:</strong> Qwen3-VL 8B의 attention<br><strong>아래:</strong> 로봇 VQA 적응 후 RLDX-1-VLM</p>

<p><span class="label authors">저자 해석</span> 적응 뒤에는 <strong>로봇 몸체와 조작 대상 물체</strong>에 attention이 더 집중된다.</p>

<p class="callout"><span class="label interpretation">우리의 직관</span> 조작할 물체만 아니라, 그 물체와 상호작용하는 로봇도 함께 참고하도록 표현이 바뀐 사례로 읽을 수 있다.</p>

### 보충

### 요점

Table 2(b)의 수치 개선을 보조하는 시각화다. Attention 분포만으로 행동 개선의 원인이 확정되지는 않는다.

### 출처

Sec.6.5 · Figure 19 · PDF p.25

### 발표 메모

그림은 마지막 prompt token→image patch self-attention이다. 64개 cognition token 전체, memory 또는 MSAT attention이라고 바꿔 부르지 않는다. 색상의 정확한 정규화·임계값·전체 장면의 통계는 임의 지정하지 않는다. 그림과 저자 서술에서 집중 경향을 읽지만 attention 개입을 통한 인과 실험은 아니다. 같은 입력의 네 사례를 위/가운데/아래로 비교한다.

### 상세 공부 기록

#### [S100] Figure 19의 attention은 무엇을 보여주나?

<!-- study-meta
layout: figure
kind: fact
figure: fig-19.png
caption: Figure 19 · 마지막 prompt token의 image patch attention
-->

##### 한 문장

마지막 prompt token→image patch의 정성 예이며 cognition token 전체를 직접 본 그림은 아니다.

##### 본문

###### 관측된 그림

같은 장면·지시에서 VQA 적응 전후의 self-attention을 비교한다. 저자는 적응 뒤 로봇 몸체와 대상 물체에 더 집중된다고 설명한다.

###### 보여주지 않는 것

64개 cognition token·memory·MSAT의 전체 흐름을 그린 것이 아니다. 높은 patch attention이 곧 행동의 원인이라는 뜻도 아니다.

<span class="label interpretation">해석</span> 정량 결과를 보조하는 예시다. 다른 장면으로의 일반성은 별도 확인이 필요하다.

##### 보충

##### 요점

Attention 그림을 행동 메커니즘의 인과 증명으로 바꾸지 않는다.

##### 출처

Fig.19 · Sec.6.5 · PDF p.25

##### 발표 메모

Figure19 caption은 “self-attention scores from the last prompt token to the image patch tokens”라고 명시한다. 위 행은 원본, 가운데 Qwen3-VL8B, 아래 RLDX-1-VLM이다. 저자는 로봇·대상 물체 집중을 설명하지만 attention intervention이나 masking으로 행동 결과의 원인을 독립 검증한 그림은 아니다. 어떤 token에서 어디로 향하는 attention인지 먼저 설명한다.

## [P063] 합성 데이터 규모 실험

<!-- slide-meta
layout: split
kind: fact
source_ids: S101
-->

### 한 문장

Table 3은 실제 데이터를 고정하고 사용 가능한 합성 데이터 pool의 크기를 바꾼 실험이다.

### 본문

#### 바꾼 것과 고정한 것

| 합성 pool | 실제 데이터 | 학습 sampling |
| --- | --- | --- |
| 0% | 같은 ActionNet | 실제만 |
| 25% | 같은 ActionNet | 실제:합성 = 1:1 |
| 50% | 같은 ActionNet | 실제:합성 = 1:1 |
| 100% | 같은 ActionNet | 실제:합성 = 1:1 |

GR-1만 사용하고, <strong>batch 1024·60K steps</strong>의 pre-training 조건을 맞춘다.



### 보충

#### Pool 크기와 뽑는 비율은 다르다

<p class="callout"><span class="label interpretation">우리의 직관</span> 한 번에 실제·합성을 반씩 공부하더라도, 합성 문제집의 종류가 많아지면 만나는 상황이 더 다양해질 수 있다.</p>

<strong>Pool:</strong> 꺼내 쓸 수 있는 합성 예의 범위.<br>
<strong>Sampling:</strong> 학습 중 각 출처를 뽑는 비율.

따라서 <strong>100%는 합성 데이터만 학습했다는 뜻이 아니다.</strong> 전체 합성 pool을 사용한 조건이다.

<p class="mini">GR-1 Tabletop 24개 과제에 과제별 1,000개 시연으로 fine-tuning한 뒤 성공률을 평가한다.</p>

### 요점

Table 3의 25·50·100%는 합성 데이터의 배치 비중이 아니라, 사용할 수 있는 합성 데이터 규모다.

### 출처

Sec.6.5 · Table 3 · PDF p.25

### 발표 메모

실제만 조건을 제외한 세 조건에서 real-to-synthetic sampling1:1을 유지한다. 실제 데이터는 GR-1 ActionNet, 합성은 제안 파이프라인의 filtered synthetic data다. Table3 caption은24 tasks,50 trials,task당1000 demonstrations를 명시한다. 전체 합성 pool의 절대 episode 수를 임의 계산하지 않는다. 문제집 비유는 데이터 다양성의 직관이며 실제 저장·sampling 구현을 새로 정의한 것이 아니다.

### 상세 공부 기록

#### [S101] Table 3: pool 크기와 sampling은 다르다

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

25·50·100%는 쓸 수 있는 합성 데이터 pool의 크기이며, 세 조건 모두 실제:합성은 1:1이다.

##### 본문

###### 바꾼 것: 합성 pool 크기

| 조건 | 실제 데이터 | 합성 pool | Sampling |
| --- | --- | --- | --- |
| 실제만 | 고정 | 0% | 실제만 |
| 작은 pool | 고정 | 25% | 실제:합성 1:1 |
| 중간 pool | 고정 | 50% | 실제:합성 1:1 |
| 전체 pool | 고정 | 100% | 실제:합성 1:1 |

##### 보충

###### 고정한 비교 조건

Embodiment를 GR-1에 한정하고 실제 ActionNet 데이터는 고정한다. Batch1024, pre-training60K gradient steps 후 같은 downstream fine-tuning을 사용한다.

GR-1 Tabletop24개 task에 각각 1,000 demonstrations로 적응하고 task당 50회 성공률을 평균한다.

<div class="callout">
<p><strong>100% = 합성만 학습</strong>이 아니다. 유한한 합성 pool 전체를 사용하되 sampling 비중은 50%다.</p></div>

##### 요점

Pool은 얼마나 다양한 예를 갖는지, sampling은 batch에서 얼마나 자주 고르는지다.

##### 출처

Table 3 · Sec.6.5 · PDF p.25; Q2

##### 발표 메모

실제만 조건에는 합성 sampling1:1을 적용할 수 없다. 합성이 있는25/50/100% 조건에서 real-to-synthetic sampling1:1을 고정한다. 합성 sampling 비중을25/50/100으로 바꾼 실험이 아니며 전체 공개·자체 데이터 recipe와도 다르다. Pool의 절대 episode 수는 표에 주어지지 않으므로 임의 계산하지 않는다. Batch1024,60K steps, GR-1만 사용하는 controlled pre-training이며 downstream은 task당1000 demonstrations와50 trials다.

## [P064] 합성 데이터의 성능 효과

<!-- slide-meta
layout: split
kind: fact
source_ids: S102
-->

### 한 문장

실제 데이터가 같아도 합성 pool을 늘리면, 이 실험의 평균 조작 성공률은 41.0%에서 50.1%로 높아진다.

### 본문

#### GR-1 Tabletop · Table 3

| 합성 pool | 평균 성공률 | 실제만 대비 |
| --- | --- | --- |
| 0% | 41.0% | 기준 |
| 25% | 45.6% | +4.6%p |
| 50% | 46.6% | +5.6%p |
| <strong>100%</strong> | <strong>50.1%</strong> | <strong>+9.1%p</strong> |

합성이 있는 세 조건에서는 실제:합성 sampling이 모두 1:1이다. <strong>더 큰 합성 pool의 이득</strong>으로 읽는다.

### 보충

#### 실제 경험의 범위를 넓히는 역할

<p><span class="label authors">저자 해석</span> Task·scene augmentation이 조작 상황을 다양화해, 실제 데이터만으로 덮기 어려운 상황의 일반화를 도왔다고 설명한다.</p>

<p class="callout"><span class="label interpretation">우리의 직관</span> 같은 실제 시연을 더 반복하는 데서 나아가, 다른 지시·배치·장면의 경험을 더 만나게 하는 보완재로 볼 수 있다.</p>

<p class="mini">Task/scene 증강과 filtering 각각의 독립 효과를 이 표가 분리한 것은 아니다.</p>

### 요점

제안 파이프라인으로 만든 합성 데이터의 규모 효과는 관측된다. 각 생성·필터 단계의 기여는 별도 질문이다.

### 출처

Sec.6.5 · Table 3 · PDF p.25; 질문노트 Q2·Q8

### 발표 메모

실제만 대비 최종+9.1%p다.25→50%의1.0%p와50→100%의3.5%p를 일정한 scaling law로 바꾸지 않는다. 원문이 분산/다중 seed/유의성 검정을 제공하지 않은 차이에 통계적 확정을 더하지 않는다. Table1 GR-1 full recipe58.7과 직접 비교해 합성만의 기여를 계산하지 않는다.

### 상세 공부 기록

#### [S102] Table 3: 합성 규모에 따른 이득

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

고정된 실제 데이터에 합성 pool을 늘릴 때 41.0→50.1로 9.1%p 높아진다.

##### 본문

###### GR-1 Tabletop 평균 성공률

| 합성 pool | 성공률 (%) | 실제만 대비 |
| --- | --- | --- |
| 0% | 41.0 | 기준 |
| 25% | 45.6 | +4.6%p |
| 50% | 46.6 | +5.6%p |
| 100% | 50.1 | +9.1%p |

세 합성 조건에서 sampling1:1을 유지했으므로, 더 큰 pool의 이득이라는 결과로 읽는다.

##### 보충

###### 분리되지 않은 설명

<span class="label authors">저자 해석</span> Task·scene augmentation이 조작 상황을 다양화해 일반화를 높였다고 설명한다.

그러나 이 표는 task augmentation만/scene augmentation만, filtering 유무, motion classifier 임계값을 각각 바꾸지 않는다.

따라서 전체 pipeline으로 만든 합성 데이터의 규모 효과는 지지하지만 각 생성·선별 단계의 독립 효과나 classifier의 신뢰도를 증명하지는 않는다.

##### 요점

Pipeline 전체의 유용성과 각 단계가 필요한 이유는 다른 실험으로 확인해야 한다.

##### 출처

Table 3 · Sec.6.5 · PDF p.25; Q2·Q8

##### 발표 메모

단계별 차이는0→25%가4.6%p,25→50%가1.0%p,50→100%가3.5%p다. 네 점만으로 일정한 scaling law나 모든 규모의 단조 증가를 주장하지 않는다. 평가 불확실성·여러 seed·검정이 없으므로 작은 차이의 유의성을 단정하지 않는다. 50.1을 Table1 GR-1의58.7과 합성만의 효과로 직접 연결하지 않는다.

## [P065] RL 평가 작업

<!-- slide-meta
layout: figure
kind: fact
source_ids: S103
figure: fig-20.png
caption: Figure 20 · ALLEX가 플라스틱 전구를 비틀어 점등하는 작업
-->

### 한 문장

Figure 20은 ALLEX의 Light Bulb Twisting 작업이다. 전구가 켜질 때까지 손가락으로 돌려야 한다.

### 본문

#### 무엇을 조작하는가?

ALLEX <strong>오른손의 검지·엄지</strong>로 소켓의 플라스틱 전구를 비튼다. 목표는 전구의 점등이다.

#### 왜 이 작업에서 RL을 보는가?

BC로 동작을 배운 뒤, <strong>완료까지의 프레임 수와 비틀기 횟수</strong>를 더 줄일 수 있는지 평가한다.

<p class="callout"><span class="label interpretation">우리의 직관</span> 동작을 따라 할 수 있는 것에서, 목표에 도달하는 동작을 더 효율적으로 수행하는 쪽으로 개선하는 실험이다.</p>

### 보충

### 요점

이 실험의 관심은 전구 한 작업을 얼마나 적은 시간·비틀기로 마치는가다. 결과는 다음 Figure 21에서 본다.

### 출처

Sec.6.5 · Figure 20 · PDF p.26; App.C · p.43

### 발표 메모

정교한 실제 조작에서 IL 이후 선택적 RL을 적용하는 예다. Fig20 자체가 RL 적용 작업을 자동 선택하는 기준을 제시하는 것은 아니다. 목표는 전구 점등이며 일반적인 plug insertion이나 실제 깨지는 유리 전구 평가로 바꾸지 않는다. 첫 그림은 작업 소개, 다음 그림이 Teleop/BC/RECAP1–3의 비교다.

### 상세 공부 기록

#### [S103] Figure 20·21: RL은 무엇을 측정했나?

<!-- study-meta
layout: figure
kind: fact
figure: fig-20.png
caption: Figure 20 · ALLEX의 플라스틱 전구 비틀기 작업
-->

##### 한 문장

한 전구 작업에서 완료까지 필요한 frames와 전구를 비튼 횟수인 attempts를 측정한다.

##### 본문

###### Light Bulb Twisting

ALLEX 오른손의 검지·엄지로 플라스틱 전구를 돌려 점등한다. Teleop, behavior cloning(BC), 연속 RECAP1–3을 비교한다.

###### 낮을수록 좋은 두 지표

<strong>Frames:</strong> 작업 완료까지 episode 길이.<br><strong>Attempts:</strong> episode 안에서 전구를 비튼 시도 수.

Frames를 denoising step 수로, attempts를 평가 episode 수로 읽으면 안 된다. 이 그림은 성공률 표가 아니다.

##### 보충

##### 요점

동작을 더 빨리·적은 시도로 마치는 것과 성공 확률은 다른 지표다.

##### 출처

Figs.20–21 · Sec.6.5 · PDF p.26; App.C · PDF p.43

##### 발표 메모

Figure20은 작업 사진이며 Figure21은 frames와 attempts의 box-and-whisker plot이다. 이 그림에 대한 성공률 수치를 새로 만들지 않는다. 실패 episode를 timeout으로 기록하는지, 성공한 episode만 요약하는지, 총 평가 episode 수가 얼마인지는 해당 절과 AppendixC에서 충분히 명시되지 않는다. C의 action40개 생성·20개 실행도 denoising 반복과 구별한다.

## [P070] RECAP 결과의 지표

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

Figure 21은 완료 효율을 두 지표로 보고, BC와 연속 RECAP round의 결과 분포를 비교한다.

### 본문

#### 세로축 — 낮을수록 좋은 두 지표

<div class="sequence">
<div class="step"><strong>(a) Frames:</strong> 작업 완료까지의 episode 길이</div>
<div class="step"><strong>(b) # attempts:</strong> 한 episode 안에서 전구를 비튼 횟수</div>
</div>

Frames가 줄면 더 빨리 완료하고, attempts가 줄면 적은 비틀기로 목표에 도달한다.

<p class="callout">완료 성공률과는 다른 지표다. Frames는 denoising step, attempts는 평가 episode 수를 뜻하지 않는다.</p>

### 보충

#### 가로축 — 무엇과 비교하는가?

| 구분 | 의미 |
| --- | --- |
| Teleop | 전문가의 원격 조작 시연 |
| BC | 모방학습으로 학습한 정책 |
| RECAP1·2·3 | 연속 세 round의 RL refinement |

상자·수염은 시행 간 결과의 분포를 보여준다. 다음 그림에서 <strong>분포의 높이와 퍼짐</strong>을 함께 본다.

### 요점

같은 작업을 얼마나 적은 프레임·비틀기로, 얼마나 일관되게 수행하는지 읽는다.

### 출처

Sec.6.5 · Figure 21 · PDF p.26; App.C · p.43

### 발표 메모

원문의 box-and-whisker plot을 읽는 설명 장이다. 정확한 수염 convention이나 평가 전체 횟수를 임의 지정하지 않는다. Frames는 실제 episode의 프레임 수이며 policy 호출 횟수나 denoising iteration과 구별한다. Attempts는 전구를 비트는 시도 횟수다. S104 상세 공부 기록은 바로 뒤 P066에 보존한다.

### 상세 공부 기록

## [P066] RECAP 반복 결과

<!-- slide-meta
layout: widefigure
kind: fact
source_ids: S104
figure: fig-21.png
caption: Figure 21 · Teleop, BC, RECAP1–3의 완료 프레임 수와 비틀기 횟수 분포
-->

### 한 문장

Figure 21에서는 RECAP을 반복할수록 완료에 필요한 프레임과 비틀기 횟수가 줄고, 결과의 편차도 작아진다.

### 본문

### 보충

### 요점

분포가 낮아지는 것은 완료 효율의 개선이고, 퍼짐이 작아지는 것은 반복 시행의 일관성 개선이다.

### 출처

Sec.6.5 · Figure 21 · PDF p.26

### 발표 메모

Figure21은 box-and-whisker plot이다. 원문이 각 기호/수염 convention을 상세 정의하지 않으므로 min/max·정확한 quantile·x기호의 뜻을 임의 확정하지 않는다. Teleop은 expert teleoperator demonstration, BC는 behavior cloning 정책, RECAP1–3은 연속 RL round다. 본문 보고치는 다음 장에서 별도로 읽으며 중간 round 수치를 그림에서 임의 추출하지 않는다. 성공률과 실패/timeout 집계도 이 그림만으로 새로 만들지 않는다.

### 상세 공부 기록

#### [S104] RECAP 개선의 해석 범위

<!-- study-meta
layout: figure
kind: fact
figure: fig-21.png
caption: Figure 21 · Frames와 twist attempts의 box-and-whisker plot
-->

##### 한 문장

BC에서 RECAP3로 frames·attempts가 약 3배 줄고 산포도 작아진다.

##### 본문

###### 보고된 BC → RECAP3

<strong>Frames:</strong>1056±326 →353±22.<br><strong>Attempts:</strong>12.7±3.0 →4.1±0.3.

완료 효율과 trial 간 일관성의 개선이다. 이 작업의 Teleop보다 빠른 결과를 인간 일반의 조작 능력 초월로 확대하지 않는다.

###### 남은 대안 설명

RECAP round마다 rollout 데이터와 학습도 늘어난다. 추가 데이터 BC와 같은 예산으로 비교하지 않아 **RL objective만의 효과**는 분리되지 않는다.

##### 보충

##### 요점

강한 개선 관측을 유지하면서도 무엇의 독립 효과인지는 열어 둔다.

##### 출처

Fig.21 · Sec.6.5 · PDF p.26; App.C · PDF p.43; Q3

##### 발표 메모

$\frac{1056}{353}\approx2.99$,$\frac{12.7}{4.1}\approx3.10$이다. 본문의 ±는 standard deviation으로 설명하며 confidence interval로 부르지 않는다. Figure21에는 text critic과 distributional critic을 같은 예산으로 비교한 RL 성과가 없다. Figure8의 critic 학습 곡선과 최종 policy 효과를 직접 동일시하지 않는다. Teleop은 특정 로봇 interface에서의 expert demonstration이며 인간 전체의 능력 비교가 아니다. 전체 trial 수와 failure/timeout 처리는 미해결이다.

## [P067] RECAP 개선의 의미

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

BC에서 RECAP3로 완료 프레임 수와 비틀기 횟수가 약 3배 줄었고, 시행 간 일관성도 좋아졌다.

### 본문

#### 원문이 보고한 BC → RECAP3

| 지표 | BC | RECAP3 |
| --- | --- | --- |
| 완료 frames | 1056 ± 326 | 353 ± 22 |
| 비틀기 attempts | 12.7 ± 3.0 | 4.1 ± 0.3 |

완료 frames는 <strong>약 2.99배</strong>, 비틀기 횟수는 <strong>약 3.10배</strong> 감소한다. ±는 standard deviation이다.

<p class="mini">이 표는 성공률 비교가 아니다. 특정 teleoperation 환경보다 빠르다는 관측을 인간 일반의 능력 비교로 확대하지 않는다.</p>

### 보충

#### 더 짧게, 더 적게, 더 일정하게

<p><span class="label authors">저자 해석</span> 줄어든 frames·attempts와 작은 표준편차는, 어려운 실제 조작에서 RL refinement가 속도와 반복 실행의 일관성을 높였음을 보여준다고 해석한다.</p>

<p class="callout"><span class="label interpretation">우리의 직관</span> 성공 동작을 흉내 내는 출발점에서, 반복 상호작용을 통해 더 효율적인 수행 방식으로 다듬는 과정으로 볼 수 있다.</p>

<p class="mini">Round마다 rollout 데이터와 학습도 추가된다. RL objective만의 독립 효과로 분리한 비교는 아니다.</p>

### 요점

보고된 개선은 한 작업의 완료 효율과 일관성이다. 추가 경험·critic 갱신·policy 학습이 함께 진행된다.

### 출처

Sec.6.5 · Figure 21 · PDF p.26; App.C Algorithm1 · p.43

### 발표 메모

1056/353≈2.99,12.7/4.1≈3.10으로 계산했다. ±는 원문이 standard deviation으로 설명하므로 confidence interval로 표시하지 않는다. Critic은 새 성공 데이터로 갱신하고 축적 trajectory의 advantage를 재부여해 policy를 갱신한다. Text critic vs distributional critic을 동일한 학습 예산으로 비교한 성과는 Fig21에 없으며, 추가 rollout만 BC에 더한 통제 비교도 없다. 전체 평가 횟수와 실패/timeout 처리 방식은 검토한 절·부록에서 충분히 명시되지 않는다. 기존 S104 상세 기록은 직전 P066에 보존한다.

### 상세 공부 기록

## [P027] 추론 지연 측정

<!-- slide-meta
layout: split
kind: fact
source_ids: S105
-->

### 한 문장

Table 4는 같은 하드웨어와 ALLEX 입력 설정에서 추론 stack을 단계적으로 바꾸며 policy 지연을 측정한다.

### 본문

#### 고정한 측정 조건

| 항목 | 원문 설정 |
| --- | --- |
| GPU / CPU | RTX 5090 / Core Ultra 7 265K |
| 영상 입력 | Dual-view 192×256 · 4 frames |
| Action horizon | 40 |
| Euler denoising | 4 steps |
| 측정 | 100회 warmup 뒤 300회 실행 |
| 보고 지표 | Median latency · p50 |

### 보충

#### p50은 어떤 시간인가?

300번 policy 실행에서 측정한 지연시간의 <strong>중앙값</strong>이다. 여기의 warmup은 실행 준비용 forward다.

모달리티가 모두 있는 모델과, physics·memory를 제외한 모델을 각각 측정한다.

<p class="callout"><span class="label interpretation">우리의 직관</span> 같은 모델 설정을 실행하는 방식을 바꿔, 계산 결과를 얻는 데 드는 시간을 줄이는 비교다.</p>

### 요점

측정 대상은 policy 추론 지연이다. 카메라부터 모터까지의 전체 제어 지연이나 최악 지연을 뜻하지 않는다.

### 출처

Sec.6.5 · Table 4 · PDF p.26

### 발표 메모

100회 실행 warmup과 mid-training의2K-step alignment warmup은 다른 개념이다. Horizon40개의 action chunk를4회 Euler denoising으로 생성하는 설정이며 모든 benchmark가4회인 것은 아니다. Full43.7ms를 motor제어Hz 또는 end-to-end camera-to-actuator budget으로 바꾸지 않는다. P027의 기존 RL 설명은 P065–P067로 나누고 이 ID는 기존에 포함하던 latency 분석의 측정 조건을 맡는다.

### 상세 공부 기록

#### [S105] Table 4: 지연 측정의 조건

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

43.7ms는 고정된 desktop 설정에서 측정한 policy 실행의 p50이다.

##### 본문

###### 고정된 하드웨어·입력

- NVIDIA RTX5090 + Intel Core Ultra7 265K.
- ALLEX, dual-view192×256, 각 4 frames.
- Action horizon40, Euler denoising4회.
- 100회 warmup forward 후 300회 측정.
- Median, 즉**p50**을 보고.

##### 보충

###### 여기서의 warmup

실행 준비·안정화를 위한 100회 forward이며 mid-training의 2K-step alignment warmup과 다르다.

###### 이 표만으로 알 수 없는 것

카메라 획득·영상 전송·로봇 통신·모터 실행까지 합친 end-to-end loop 지연, p95/p99와 최악 지연, 다른 GPU·입력 크기의 성능은 측정하지 않았다.

“4회 denoising”도 모든 benchmark의 공통값이 아니다.

##### 요점

Latency 숫자는 하드웨어·입력·측정 경계·분위수와 함께 인용한다.

##### 출처

Table 4 · Sec.6.5 · PDF p.26; Table 8 · PDF p.49

##### 발표 메모

All-modality 최종43.7ms를 전체 로봇 제어 지연이나 제어 주파수 보장으로 바꾸지 않는다. Policy 호출1회는 action chunk를 생성하므로$\frac{1}{0.0437}$을 로봇 motor 제어Hz와 같다고 쓸 수 없다. 100회 warmup/300회 median은 tail jitter를 보여주지 않는다. WidowX와 RoboCasa Kitchen은 Table8에서 denoising10회다.

## [P068] 추론 최적화의 단계별 효과

<!-- slide-meta
layout: full
kind: fact
source_ids: S106
-->

### 한 문장

Graph·static conversion·kernel 최적화를 누적하면, All-modality 모델의 p50 지연은 71.2ms에서 43.7ms로 줄어든다.

### 본문

| 추론 stack | Physics·memory 제외 | All-modality |
| --- | --- | --- |
| PyTorch Eager | 67.0ms · 기준 | 71.2ms · 기준 |
| CUDA Graph + Torch Compile | 56.9ms · 1.18× | 59.6ms · 1.19× |
| + Static Graph Conversion | 46.2ms · 1.45× | 48.9ms · 1.46× |
| + Kernel Optimization | <strong>41.6ms · 1.61×</strong> | <strong>43.7ms · 1.63×</strong> |

<p class="mini">Table 4의 배수는 모두 각 열의 PyTorch Eager 대비 누적 speedup이다.</p>

<div class="flow">
<div class="node"><strong>Graph + Compile</strong><br>11.6ms 감소</div>
<div class="node"><strong>+ Static</strong><br>10.7ms 추가 감소</div>
<div class="node"><strong>+ Kernel</strong><br>5.2ms 추가 감소</div>
</div>

### 보충

### 요점

같은 기준으로 누적 효과를 읽는다. 1.19×·1.46×·1.63×를 서로 곱하지 않는다.

### 출처

Sec.6.5 · Table 4 · PDF p.26; 감소 시간은 원문 수치의 차이로 계산

### 발표 메모

All-modality71.2−59.6=11.6,59.6−48.9=10.7,48.9−43.7=5.2ms다. 원문 첫 단계는 CUDA Graph+Torch Compile이지만 아직 fragmented subgraphs다. 다음 static graph conversion이 forward를 단일 CUDA Graph로 캡처한다. 각 단계는 누적 변경이므로 서로 독립된 방법의 절대 기여나 시행 순서 무관한 효과로 해석하지 않는다. 두 열은 지연 비교이며 기능 모듈의 정확도 ablation이 아니다.

### 상세 공부 기록

#### [S106] Table 4: 누적 최적화의 크기

<!-- study-meta
layout: full
kind: fact
-->

##### 한 문장

71.2→59.6→48.9→43.7ms의 최종 1.63배는 Eager 대비 누적 배수다.

##### 본문

| 추론 stack | All-modality | Eager 대비 | 직전 대비 |
| --- | --- | --- | --- |
| PyTorch Eager | 71.2ms | 1.00× | 기준 |
| CUDA Graph + Compile | 59.6ms | 1.19× | 1.19× |
| + Static Graph | 48.9ms | 1.46× | 1.22× |
| + Kernel Optimization | 43.7ms | 1.63× | 1.12× |

<p class="mini">Physics·memory 제외:67.0→56.9→46.2→41.6ms; Eager 대비 최종 1.61배.</p>

$$
\text{전체 지연 감소}=\frac{71.2-43.7}{71.2}\approx38.6\%
$$

마지막 kernel 단계의 추가 이득은 $\frac{48.9}{43.7}\approx1.12$배다. 모듈 제외 열은 정확도 ablation이 아니라 latency 비교다.

##### 보충

##### 요점

1.19·1.46·1.63배를 서로 곱하면 누적 효과를 중복 계산한다.

##### 출처

Table 4 · Sec.6.5 · PDF p.26

##### 발표 메모

직전 대비$\frac{71.2}{59.6}\approx1.1946$,$\frac{59.6}{48.9}\approx1.2188$,$\frac{48.9}{43.7}\approx1.1190$이다. 최종$\frac{71.2}{43.7}\approx1.6293$이며 latency 감소는11.6,10.7,5.2ms다. 원문 첫 단계는 CUDA Graph+Torch.Compile이고 다음 full static graph conversion에서 fragmented subgraph를 단일 그래프로 바꾼다. Physics·memory 제외의 최종1.61배와 all-modality1.63배가 비슷하다는 설명도 이 두 설정 안의 관측이다.

## [P069] 추론 최적화의 해석

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

Static graph는 실행 분할을 줄이고, kernel 최적화는 연산 경계와 중간 메모리 이동을 더 줄인다.

### 본문

#### 전체 개선과 마지막 단계의 개선

$$
\text{전체 speedup}=\frac{71.2}{43.7}\approx1.63\times
$$

$$
\text{Kernel 추가 효과}=\frac{48.9}{43.7}\approx1.12\times
$$

전체 지연 감소는 <strong>약 38.6%</strong>다. 마지막 kernel 단계만으로 1.63배가 된 것은 아니다.

최종 두 모델의 지연 차이는 <strong>43.7−41.6=2.1ms</strong>다. 이 하드웨어·입력 설정에서 관측한 차이다.

### 보충

#### 왜 Graph와 Kernel이 모두 필요한가?

<p><span class="label authors">저자 해석</span> Compile만으로는 subgraph 분할과 일부 operator fusion의 한계가 남는다. 단일 graph 캡처가 실행 호출 부담을 줄이고, 추가 fusion이 kernel 경계와 HBM 왕복을 더 줄인다고 설명한다.</p>

<p class="callout"><span class="label interpretation">우리의 직관</span> 같은 일을 하더라도 실행 준비를 반복하고 중간 결과를 메모리에 넣었다 꺼내는 비용을 줄이면 더 빨리 끝낼 수 있다.</p>

### 요점

두 모델 모두 비슷한 누적 배수를 보였지만, 다른 GPU·입력 크기나 전체 로봇 지연까지 보장하는 결과는 아니다.

### 출처

Sec.6.5 Table 4 · PDF p.26; 최적화 원리: Sec.5 · pp.15–17; App.F · p.47

### 발표 메모

71.2/43.7≈1.6293,48.9/43.7≈1.1190,(71.2−43.7)/71.2≈38.6%다. 두 최종 열의2.1ms 차이는 physics와memory를 함께 포함할 때의 차이이며 각 모듈의 독립 비용으로 나누지 않는다. 두 variant의1.61/1.63 유사 배수는 이 측정 범위의 관측이다. p95/p99·end-to-end 지연은 Table4에 없고 latency 개선이 정확도 향상 실험을 뜻하지 않는다. 기존 상세 S105–S106은 P027/P068에 보존한다.

### 상세 공부 기록
