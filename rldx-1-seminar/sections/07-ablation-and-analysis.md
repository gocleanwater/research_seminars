# Ablation and Analysis

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P026] Ablation

<!-- slide-meta
layout: full
kind: fact
source_ids: S097, S098, S099, S100, S101, S102
-->

### 한 문장

바꾼 요소와 고정 조건을 확인하면 관측된 효과와 저자의 원인 설명을 나눌 수 있다.

### 본문

| 분석 | 보고 성공률 (%) | 읽을 범위 |
| --- | --- | --- |
| VLM 추출 층 8 / 18 / 28 | 51.1 / 60.9 / 56.3 | 세 후보 중18층 우세 |
| Robot VQA 적응 | 57.5 → 60.9 | +3.4%p |
| 합성 pool 0 → 100% | 41.0 → 50.1 | +9.1%p |

층·VQA는 Kitchen의 별도 base 설정이다. 합성은 GR-1의 실제 데이터를 고정하고 pool 25·50·100%를 비교하며, 합성이 있는 조건의 실제:합성 sampling은 모두 1:1이다.

<span class="label interpretation">한계</span> Figure19는 마지막 prompt token의 patch attention 예시다. 인과 증명이 아니며 task/scene 증강·필터 각각의 효과도 이 비교에서 분리되지 않는다.

### 보충

### 요점

관측한 비교를 넘어 메커니즘과 개별 단계의 기여를 자동으로 확정하지 않는다.

### 출처

Sec.6.5 · Tables 2–3 · Fig.19 · PDF pp.24–25

### 발표 메모

연결 멘트: “결과가 좋았다는 관측에서 한 걸음 더 나아가 무엇을 바꿨을 때 좋아졌는지 보겠습니다. 이 세 비교는 누적 개선표가 아닙니다.” VLM 분석은 대규모 로봇 policy pre-training을 생략한 base setup이며 Qwen 전체 무작위 초기화라는 뜻이 아니다. 합성 pool0/25/50/100%는41.0/45.6/46.6/50.1이다. GR-1만 사용하고 batch1024/60K pre-training, 같은 downstream 적응을 적용한다. 합성이 있는 조건은 sampling1:1로 고정한다. Figure19는64개 cognition token 전체나 MSAT attention이 아니라 마지막 prompt token→patch의 정성 예다. 통제 기준·layer 선택·filter 한계는 S097–102에 보존한다.

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

## [P027] RL·추론 지연 분석

<!-- slide-meta
layout: full
kind: fact
source_ids: S103, S104, S105, S106, S107
-->

### 한 문장

전구 과제의 frames·attempts와 policy p50은 서로 다른 효율 지표다.

### 본문

#### 전구 비틀기: BC → RECAP3

완료 frames는 1056±326→353±22, 비튼 횟수는 12.7±3.0→4.1±0.3으로 약 3배 줄었다. 성공률 표가 아니며 추가 rollout·학습도 늘어나 RL objective만의 효과는 분리되지 않는다.

#### All-modality 추론 stack의 누적 최적화

| Eager | Graph+Compile | +Static | +Kernel |
| --- | --- | --- | --- |
| 71.2ms | 59.6ms | 48.9ms | 43.7ms |

최종 1.63배는 Eager 대비 누적값이며, 마지막 kernel 단계만은 1.12배다. RTX5090, dual-view192×256·4frames·Euler4회에서 측정한 policy p50이며 카메라→모터 전체 지연은 아니다.

### 보충

### 요점

빠른 완료·빠른 policy 호출과 높은 성공률·안정적인 전체 제어는 구별한다.

### 출처

Sec.6.5 · Figs.20–21 · Table 4 · PDF p.26; App.C · PDF p.43

### 발표 메모

연결 멘트: “더 잘 학습해 일을 빨리 마치는 것과 계산을 빨리 실행하는 것은 다른 효율입니다. 이제 논문 전체의 기여를 정리하고, 그 의미와 검증 과제를 나누어 보겠습니다.” RL은 ALLEX 오른손으로 plastic bulb를 비트는 한 과제이고 ±는 standard deviation이다. 평가 전체 횟수·실패와 timeout의 집계는 불명확하다. 추가 rollout 데이터만 BC에 더한 같은 예산의 비교가 없어 RL objective만의 효과로 읽지 않는다. Latency는 Core Ultra7 265K/RTX5090, ALLEX, horizon40,100회 warmup 뒤300회 median이다.$\frac{71.2}{43.7}\approx1.63$,$\frac{48.9}{43.7}\approx1.12$,전체 감소38.6%다. Physics/memory 제외는67→56.9→46.2→41.6ms다. 세부와 남은 통제 비교는 S103–107에 보존한다.

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
