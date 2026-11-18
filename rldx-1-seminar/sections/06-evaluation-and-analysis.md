# Evaluation and Analysis

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P109] Evaluation and Analysis

<!-- slide-meta
layout: section-title
kind: interpretation
chapter: Seminar
source_ids:
-->

### 한 문장

시뮬레이션과 실제 로봇에서의 조작 성능

### 본문

<div class="section-title-page" aria-hidden="true"></div>

### 보충



### 요점



### 출처

세미나 구성 · 섹션 구분

### 발표 메모

이제 시뮬레이션과 실제 로봇에서 RLDX-1의 조작 성능을 확인하겠습니다.

### 상세 공부 기록



## [P040] 시뮬레이션 벤치마크

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S082
figure: fig-11.png
caption: Figure 11 · 평가 환경: 단일 팔·양팔 휴머노이드·주방 조작
-->

### 한 문장

탁자 조작부터 복잡한 주방 작업까지, 서로 다른 환경에서 비교한다.

### 본문

#### 기본 조작과 환경 변화

**LIBERO·LIBERO-Plus·SIMPLER**

#### 주방·양팔·복합 절차

**RoboCasa Kitchen·GR-1·RoboCasa365**

### 보충



### 요점

각 benchmark의 데이터로 fine-tuning한 뒤 조작 성공률을 비교한다.

### 출처

Sec.6.1 · Fig.11 · PDF pp.17–19

### 발표 메모

먼저 시뮬레이션 평가입니다. 왼쪽 사진처럼 탁자 조작부터 양팔 로봇, 주방의 복합 작업까지 여러 환경에서 비교했습니다. LIBERO 계열과 SIMPLER는 기본 조작과 조건 변화 대응을, RoboCasa와 GR-1은 주방·양팔·복합 조작을 다룹니다. 각 benchmark의 데이터로 fine-tuning한 뒤의 조작 성공률을 보겠습니다.

### 상세 공부 기록

#### [S082] 평가의 목적과 범위

<!-- study-meta
layout: figure
kind: fact
figure: fig-11.png
caption: Figure 11 · 기본 조작·강건성 및 어려운 시뮬레이션 과제
-->

##### 한 문장

범용 조작, 기능별 과제, 구성 요소 분석은 서로 다른 질문에 답한다.

##### 본문

###### 세 갈래의 평가

- **범용성:** pre-trained 모델을 시뮬레이션·OpenArm 과제에 fine-tuning한다.
- **기능:** mid-trained ALLEX·Franka를 움직임·기억·접촉 과제에 적응시킨다.
- **분석:** VLM, 합성 규모, RL, 실행 최적화를 따로 살핀다.

서로 다른 출발 모델과 적응 조건을 하나의 공통 실험으로 읽지 않는다.

##### 보충

##### 요점

높은 종합 성능과 개별 설계의 인과적 기여는 구분한다.

##### 출처

Sec.6 · Fig.11 · PDF p.17

##### 발표 메모

Figure 11(a)는 LIBERO/LIBERO-Plus와 SIMPLER, (b)는 RoboCasa Kitchen, GR-1 Tabletop, RoboCasa365를 보여준다. 이 논문의 평가는 하나의 zero-shot 범용 모델을 그대로 모든 환경에 투입한 결과가 아니다. 6.1/6.2는 pre-trained 모델의 downstream fine-tuning, 6.3/6.4는 mid-trained 모델의 task별 fine-tuning이다. 6.5에서도 각 실험의 데이터와 초기화가 달라 직접 수치 연결에 주의한다.

## [P022] Simulation 결과 (a)

<!-- slide-meta
layout: full
kind: fact
source_ids: S083, S084, S085, S086, S087, S114, S115
-->

### 한 문장

기본 조작·환경 변화 대응 벤치마크 · Δ는 각 평가의 기존 최고값과의 차이(%p)

### 본문

<table class="table-one" aria-label="Table 1(a) 전체 성공률과 최강 baseline 대비 차이"><colgroup><col style="width:25%"><col span="7" style="width:10.7142857%"></colgroup><thead><tr><th scope="col">평가</th><th scope="col">π0-FAST</th><th scope="col">π0</th><th scope="col">π0.5</th><th scope="col">GR00T<br>N1.5</th><th scope="col">GR00T<br>N1.6</th><th scope="col">RLDX-1</th><th scope="col">Δ (%p)</th></tr></thead><tbody>
<tr data-benchmark="LIBERO · Short"><th scope="row">LIBERO · Short</th><td>93.9</td><td>97.1</td><td class="best-baseline">98.0</td><td>90.0</td><td>97.4</td><td class="ours">98.6</td><td class="delta">+0.6</td></tr>
<tr data-benchmark="LIBERO · Long"><th scope="row">LIBERO · Long</th><td>60.2</td><td>85.2</td><td>92.0</td><td>76.0</td><td class="best-baseline">94.4</td><td class="ours">95.3</td><td class="delta">+0.9</td></tr>
<tr data-benchmark="LIBERO · Avg."><th scope="row">LIBERO · Avg.</th><td>85.5</td><td>94.1</td><td class="best-baseline">96.9</td><td>86.5</td><td>96.7</td><td class="ours">97.8</td><td class="delta">+0.9</td></tr>
<tr class="group-start" data-benchmark="LIBERO-Plus"><th scope="row">LIBERO-Plus</th><td>64.2</td><td>54.6</td><td class="best-baseline">86.5</td><td>66.3</td><td>72.6</td><td class="ours">86.7</td><td class="delta">+0.2</td></tr>
<tr class="group-start" data-benchmark="SIMPLER Google-VM"><th scope="row">SIMPLER Google-VM</th><td>61.9</td><td>58.8</td><td>72.7</td><td>52.4</td><td class="best-baseline">76.1</td><td class="ours">81.5</td><td class="delta">+5.4</td></tr>
<tr data-benchmark="SIMPLER Google-VA"><th scope="row">SIMPLER Google-VA</th><td>59.0</td><td>54.8</td><td class="best-baseline">68.4</td><td>43.7</td><td>57.1</td><td class="ours">77.4</td><td class="delta">+9.0</td></tr>
<tr data-benchmark="SIMPLER WidowX"><th scope="row">SIMPLER WidowX</th><td>48.3</td><td>27.1</td><td>46.9</td><td class="best-baseline">62.0</td><td>57.1</td><td class="ours">71.9</td><td class="delta">+9.9</td></tr>
</tbody></table>

### 보충

### 요점

LIBERO는 근소한 차이 · SIMPLER는 +5.4~9.9%p · 여러 평가에서 고르게 비교 모델 대비 우세

### 출처

Table 1(a) · PDF p.18; 원문 표를 전치하고 보고값으로 Δ 계산

### 발표 메모

먼저 기본 조작과 환경 변화 대응을 보는 시뮬레이션 벤치마크의 결과입니다. RLDX-1이 비교한 모든 벤치마크에서 가장 높은 성공률을 기록한 것을 볼 수 있습니다.

가장 오른쪽 열은 각 벤치마크에서 기존 모델 중 성공률이 가장 높았던 값과 RLDX-1의 차이를 제가 추가한 것입니다.

LIBERO 계열에서는 기존 최고값과의 격차가 크지 않고, SIMPLER에서는5.4에서9.9%p 정도의 차이가 납니다. 차이의 크기는 평가마다 다르지만, 여러 벤치마크에서 고르게 비교 모델을 앞섰다는 점을 볼 수 있습니다.

### 상세 공부 기록


#### [S083] Baseline의 행동 생성 방식

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

행동을 토큰으로 순차 생성하는 경로와 연속 chunk를 갱신하는 경로가 있다.

##### 본문

###### π0-FAST: 행동 토큰 생성

<div class="sequence">
<div class="step">PaliGemma 3B를 초기 VLM으로 사용</div>
<div class="step">DCT 기반으로 행동을 토큰화</div>
<div class="step">Autoregressive 방식으로 행동 토큰 생성</div>
</div>

여기서 출력 순서는 토큰 생성 과정의 순서다.

##### 보충

###### π0·π0.5: 연속 행동 학습

**π0:** PaliGemma 3B와 300M action expert가 shared self-attention으로 연결되며 flow matching을 사용한다.

**π0.5:** action model의 연속 행동 flow matching과 VLM의 이산 행동 next-token prediction을 함께 학습하는 Knowledge Insulation을 추가한다.

<p class="muted">보고서의 baseline 설명 범위이며, 현재 각 모델의 모든 버전을 설명하는 것은 아니다.</p>

##### 요점

Autoregressive 토큰 생성과 flow의 denoising 반복은 같은 반복이 아니다.

##### 출처

Sec.6 Baselines · PDF p.17

##### 발표 메모

비교는 본 보고서가 선택한 checkpoint와 학습 recipe에 관한 것이다. π0.5를 단순히 π0-FAST와 같은 autoregressive-only 모델이라고 부르면 연속 action expert 경로를 놓친다. π0의 diffusion-based라는 표현과 flow matching 사용은 본문의 분류 그대로 인용하며, 별도의 diffusion 손실과 flow 손실을 순서대로 학습했다고 해석하지 않는다.

#### [S084] GR00T baseline의 연결 방식

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

N1.5와 N1.6은 VLM 특징을 action model에 cross-attention으로 전달한다.

##### 본문

###### GR00T N1.5

Eagle 2.5 2B VLM의 중간 hidden states를 사용한다. Learnable adapter가 VLM과 action model을 잇고, action model은 cross-attention으로 이 특징을 참조한다.

###### GR00T N1.6

같은 cross-attention 설계를 따르며 시각 관측에서 나온 hidden states와 언어 지시에서 나온 hidden states를 번갈아 사용한다.

##### 보충

###### RLDX-1과 비교할 때

RLDX-1은 cognition·action·physics stream별 파라미터와 joint self-attention을 사용한다. 그러나 baseline 비교에는 구조뿐 아니라 VLM, 데이터, 사전 학습, 적응 방식도 함께 달라진다.

<div class="callout"><span class="label interpretation">해석 범위</span>
<p>전체 시스템의 성능 차이만으로 cross-attention보다 MSAT가 더 낫다는 독립 결론을 낼 수 없다.</p></div>

##### 요점

구조의 차이를 설명하는 것과 그 차이의 효과를 증명하는 것은 별개다.

##### 출처

Sec.6 Baselines · PDF p.17; Sec.2.2 · PDF p.8

##### 발표 메모

GR00T N1.6의 visual/language alternation은 보고서의 서술에 근거한다. 상세 cross-attention schedule을 새로 가정하지 않는다. MSAT의 독립 기여를 주장하려면 같은 VLM·데이터·학습 예산으로 연결 방식만 교체한 통제 비교가 필요하다.

#### [S085] 시뮬레이션 평가 조건

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

Table 1은 각 benchmark에 fine-tuning한 시스템의 비교이며 수치 출처도 섞여 있다.

##### 본문

###### RLDX-1의 적응 조건

Vision encoder와 LLM 대부분을 고정하고 LLM의 마지막 4층은 학습한다. 기본은 AdamW, 60K step, batch 1024, 학습률 $10^{-4}$이며 benchmark별 예외가 있다.

LIBERO는 batch 256, Google-VM/VA는 20K step, RoboCasa365는 250K step이다. 후자는 **본문 batch 196 / Table 8 batch 192**가 불일치한다.

##### 보충

###### Baseline 출처와 실행 조건

일부 모델은 공식 구현으로 재현하고, 나머지는 논문·공식 저장소·leaderboard에서 가져온다. 모든 수치가 동일 실험실·동일 예산의 재측정은 아니다.

WidowX·RoboCasa Kitchen은 denoising 10회, 나머지는 4회다. 생성 행동 16개 중 실제 실행은 SIMPLER 2개, LIBERO·GR-1 8개, 나머지 16개다.

<p class="label question">Q12: 실제 batch 설정은 구현 확인 필요</p>

##### 요점

Full recipe 비교의 강점은 읽되, 공통 통제 실험이라고 과장하지 않는다.

##### 출처

Sec.6.1 · PDF p.18; App.G.1 · Table 8 · PDF pp.48–49; Q12

##### 발표 메모

G.1 provenance: LIBERO는 GR00T N1.6만 동일 setup으로 재현, 다른 수치는 공식 repo. LIBERO-Plus는 π0/FAST를 원 논문에서 취하고 나머지는 LIBERO checkpoint로 10,300 perturbation tasks 평가. SIMPLER는 인용 연구들의 수치. RoboCasa Kitchen은 GR00T N1.6 공식 repo와 인용 연구. GR-1은 GR00T 공식 repo, π0 계열 재현. RoboCasa365는 FAST 재현, 나머지 leaderboard. Benchmark별 최적 hyperparameter를 보고하며 state dropout 등도 달라진다. 평균의 신뢰구간이나 전체 baseline seed provenance를 충분히 정리한 표는 이 범위에서 확인하지 못했다.

#### [S086] Table 1(a): 기본 조작과 강건성

<!-- study-meta
layout: full
kind: fact
-->

##### 한 문장

각 열의 최강 baseline과 비교해도 RLDX-1이 높지만, 차이의 크기는 다르다.

##### 본문

| 평가 지표 (%) | 최강 baseline | RLDX-1 | 차이 (%p) |
| --- | --- | --- | --- |
| LIBERO Short | π0.5 · 98.0 | 98.6 | +0.6 |
| LIBERO Long | N1.6 · 94.4 | 95.3 | +0.9 |
| LIBERO 평균 | π0.5 · 96.9 | 97.8 | +0.9 |
| LIBERO-Plus | π0.5 · 86.5 | 86.7 | +0.2 |
| Google-VM | N1.6 · 76.1 | 81.5 | +5.4 |
| Google-VA | π0.5 · 68.4 | 77.4 | +9.0 |
| WidowX | N1.5 · 62.0 | 71.9 | +9.9 |

##### 보충

##### 요점

표의 최고값이라는 관측과 통계적으로 확실한 우위라는 판단은 다르다.

##### 출처

Table 1(a) · PDF p.18

##### 발표 메모

원문 전 값(열: Short,Long,Avg,Plus,GoogleVM,GoogleVA,WidowX). FAST:93.9/60.2/85.5/64.2/61.9/59.0/48.3; π0:97.1/85.2/94.1/54.6/58.8/54.8/27.1; π0.5:98.0/92.0/96.9/86.5/72.7/68.4/46.9; N1.5:90.0/76.0/86.5/66.3/52.4/43.7/62.0; N1.6:97.4/94.4/96.7/72.6/76.1/57.1/57.1; RLDX:98.6/95.3/97.8/86.7/81.5/77.4/71.9. Short는 spatial/object/goal suite 평균이다. 화면은 각 열의 최고 baseline을 계산해 재구성했다. LIBERO-Plus +0.2%p 등 작은 차이에는 반복 seed·불확실성이 특히 중요하다. 보고된 Table 1은 오차막대를 제공하지 않는다.

#### [S087] Table 1(b): 어려운 조작의 상대·절대 성과

<!-- study-meta
layout: full
kind: fact
-->

##### 한 문장

복합 과제에서도 상대 우위가 있지만 unseen composite 성공은 5.6%다.

##### 본문

| 평가 지표 (%) | 최강 baseline | RLDX-1 | 차이 (%p) |
| --- | --- | --- | --- |
| RoboCasa Kitchen | N1.6 · 66.2 | 70.6 | +4.4 |
| GR-1 Tabletop | N1.5 · 48.0 | 58.7 | +10.7 |
| RC365 Atomic-Seen | N1.6 · 61.1 | 67.3 | +6.2 |
| RC365 Composite-Seen | N1.6 · 12.6 | 19.0 | +6.4 |
| RC365 Composite-Unseen | N1.5 · 4.4 | 5.6 | +1.2 |
| RC365 전체 평균 | N1.6 · 26.9 | 32.1 | +5.2 |

##### 보충

##### 요점

복합 행동으로 갈수록 남은 실패가 크다. 최고 baseline도 열마다 다르다.

##### 출처

Table 1(b) · Sec.6.1 · PDF pp.18–19; Table 15 · PDF p.55

##### 발표 메모

원문 전 값(열:Kitchen,GR1,Atomic,CompS,CompU,Avg). FAST:63.6/미보고/51.7/8.0/1.8/21.7; π0:62.5/13.6/34.6/6.1/1.1/14.8; π0.5:62.1/15.4/39.6/7.1/1.2/16.9; N1.5:65.7/48.0/43.0/9.6/4.4/20.0; N1.6:66.2/47.6/61.1/12.6/2.6/26.9; RLDX:70.6/58.7/67.3/19.0/5.6/32.1. 원문은 N1.6 대비 5.6 vs 2.6을 강조하지만 Comp-U 열의 최강 baseline은 N1.5 4.4다. RC365 전체 32.1은 Atomic 18개, Composite seen16개/unseen16개 작업수로 가중한 평균과 부합하며 세 split 단순 평균이 아니다. RLDX가 pre-training에 simulation data를 쓰지 않았다는 저자 설명도 downstream simulation fine-tuning을 하지 않았다는 뜻은 아니다.

#### [S114] 과제별 강건성 결과

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

높은 평균에도 camera·noise·layout 변화와 일부 drawer 동작의 약점이 가려져 있다.

##### 본문

###### LIBERO-Plus 조건별 (%)

| Camera | Robot | Language | Light |
| --- | --- | --- | --- |
| 75.0 | 91.8 | 92.2 | 97.1 |

| Background | Noise | Layout | 전체 |
| --- | --- | --- | --- |
| 95.5 | 80.3 | 80.7 | 86.7 |

평균 86.7보다 camera 75.0이 가장 낮다. 강건성을 한 개의 능력으로 요약하기 어렵다.

##### 보충

###### SIMPLER의 서로 다른 변화

Google Open Drawer는 VM58.5→VA32.3으로 낮아진다. 반면 Close Drawer는 78.5→93.2로 높아진다.

<span class="label interpretation">해석</span> VA가 모든 task를 똑같이 어렵게 만드는 단일 축은 아니다. 조건·분포가 다른 평균에 각자 원인을 붙이면 안 된다.

WidowX도 Spoon88.5와 Eggplant52.0의 차이가 크다. 평균 71.9는 편차를 숨긴다.

##### 요점

전체 평균의 우위와 취약한 변형·task를 함께 보여준다.

##### 출처

App.G.6 · Tables 11–12 · PDF p.54

##### 발표 메모

Table11 LIBERO Long95.3/Spatial98.0/Object99.3/Goal98.4/Avg97.8. Plus Camera75/Robot91.8/Language92.2/Light97.1/Background95.5/Noise80.3/Layout80.7/Total86.7. Table12 Google-VM Move92/Close78.5/Open58.5/Coke97/Avg81.5; VA Move90.9/Close93.2/Open32.3/Coke93.4/Avg77.4; WidowX Carrot83/Eggplant52/Spoon88.5/Stack64/Avg71.9. 각 조건의 seed·불확실성을 함께 보여주는 표는 아니다.

#### [S115] 과제별 낮은 성공률을 읽는 법

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

전체 순위가 높아도 주방·휴머노이드·복합 작업의 일부 항목은 여전히 낮다.

##### 본문

###### 낮은 항목의 예

| 환경 | 과제 | 성공률 |
| --- | --- | --- |
| Kitchen | 스토브 켜기/끄기 | 24.0/22.0% |
| GR-1 | 매트→다단 선반 | 24.0% |
| RC365 Seen | 커피 준비 | 0.0% |
| RC365 Seen | 토스트 꺼내기 | 0.0% |
| RC365 Unseen | 식기 모으기 | 0.0% |

<p class="mini">RC365의 두 구분은 Composite(복합 과제)다.</p>

##### 보충

###### 0%의 정확한 뜻

주어진 평가 시도에서 성공을 관측하지 못했다는 뜻이다. 모든 미래 초기 상태와 새 학습까지 포함해 원리적으로 불가능하다는 증명은 아니다.

RC365는 Atomic67.3%, Composite-Seen19.0%, Unseen5.6%다. 긴 복합 조작의 절대 난도를 유지한 채 상대 개선을 평가해야 한다.

전체 32.1은 18/16/16개 task 수의 가중 평균과 부합한다.

##### 요점

“최고 성능”이라는 한 문장으로 남은 실패와 절대 난도를 지우지 않는다.

##### 출처

App.G.6 · Tables 13–15 · PDF p.55

##### 발표 메모

Kitchen은 Close Single Door와Turn On Sink100인 반면 Microwave-to-Counter26, Stove Off22다. GR-1은 Tray-to-Pot와Can-to-Drawer74인 반면 Placemat-to-Tiered-Shelf24다. RC365 Composite-Seen Load Dishwasher50, Get Toasted Bread0, Prepare Coffee0. Composite-Unseen은 Categorize Condiments/Gather Tableware/Heat Kebab Sandwich/Pan Transfer/Separate Freezer Rack에서0이다. $\frac{18\times67.3+16\times19+16\times5.6}{50}=32.104\approx32.1$. Split 단순 평균30.63과 다르다. 다단계 실패의 원인을 인지 또는 제어 한 가지로 단정할 수 없다. 화면 표의 매트→다단 선반은 Placemat to Tiered Shelf, 토스트 꺼내기는 Get Toasted Bread, 식기 모으기는 Gather Tableware에 해당한다. Seen/Unseen은 Composite split을 줄여 쓴다.

## [P095] Simulation 결과 (b)

<!-- slide-meta
layout: full
kind: fact
source_ids:
-->

### 한 문장

Table 1(b) 전체 · 성공률(%) · S: Seen / U: Unseen · RC365: RoboCasa365

### 본문

<table class="table-one" aria-label="Table 1(b) 전체 성공률과 최강 baseline 대비 차이"><colgroup><col style="width:25%"><col span="7" style="width:10.7142857%"></colgroup><thead><tr><th scope="col">평가</th><th scope="col">π0-FAST</th><th scope="col">π0</th><th scope="col">π0.5</th><th scope="col">GR00T<br>N1.5</th><th scope="col">GR00T<br>N1.6</th><th scope="col">RLDX-1</th><th scope="col">Δ (%p)</th></tr></thead><tbody>
<tr data-benchmark="RoboCasa Kitchen"><th scope="row">RoboCasa Kitchen</th><td>63.6</td><td>62.5</td><td>62.1</td><td>65.7</td><td class="best-baseline">66.2</td><td class="ours">70.6</td><td class="delta">+4.4</td></tr>
<tr data-benchmark="GR-1 Tabletop"><th scope="row">GR-1 Tabletop</th><td>—</td><td>13.6</td><td>15.4</td><td class="best-baseline">48.0</td><td>47.6</td><td class="ours">58.7</td><td class="delta">+10.7</td></tr>
<tr class="group-start" data-benchmark="RC365 · Atomic-S"><th scope="row">RC365 · Atomic-S</th><td>51.7</td><td>34.6</td><td>39.6</td><td>43.0</td><td class="best-baseline">61.1</td><td class="ours">67.3</td><td class="delta">+6.2</td></tr>
<tr data-benchmark="RC365 · Comp.-S"><th scope="row">RC365 · Comp.-S</th><td>8.0</td><td>6.1</td><td>7.1</td><td>9.6</td><td class="best-baseline">12.6</td><td class="ours">19.0</td><td class="delta">+6.4</td></tr>
<tr data-benchmark="RC365 · Comp.-U"><th scope="row">RC365 · Comp.-U</th><td>1.8</td><td>1.1</td><td>1.2</td><td class="best-baseline">4.4</td><td>2.6</td><td class="ours">5.6</td><td class="delta">+1.2</td></tr>
<tr data-benchmark="RC365 · Avg."><th scope="row">RC365 · Avg.</th><td>21.7</td><td>14.8</td><td>16.9</td><td>20.0</td><td class="best-baseline">26.9</td><td class="ours">32.1</td><td class="delta">+5.2</td></tr>
</tbody></table>

### 보충

### 요점

Δ = RLDX-1 − 최강 baseline(%p). ‘—’는 원문에서 결과를 보고하지 않은 항목이다.

### 출처

Table 1(b) · PDF p.18; 원문 표를 전치하고 보고값으로 Δ 계산

### 발표 메모

주방 조작과 GR-1 양팔 작업에서도 기존 최고값보다 각각4.4%p,10.7%p 높습니다. 다만 RoboCasa365의 복합 작업을 보면, 학습한 절차의 성공률은19.0%, 새로운 절차는5.6%입니다. 다른 모델보다 높은 결과를 얻었어도, 여러 동작을 끝까지 이어 수행하는 문제에는 여전히 어려움이 남아 있습니다. 이제 실제 로봇에서도 이런 경향이 나타나는지 보겠습니다.

### 상세 공부 기록

## [P023] OpenArm · 지시와 새 조건

<!-- slide-meta
layout: evidence-pair
kind: fact
source_ids: S089, S088
-->

### 한 문장

지시한 물체·위치 · 새 개체와 작업 조합

### 본문

<div class="evidence-visuals"><figure class="paper-figure"><img src="/figures/fig-13.png" alt="평가 과제 사진"><figcaption>지시한 물체·위치 · 새 개체와 작업 조합</figcaption></figure><figure class="paper-figure"><img src="/figures/fig-14.png" alt="원문 결과 그래프"><figcaption>위치 지시 68.8–70.8% · 새 개체·새 작업 각54.2% · Grounding 87.5%</figcaption></figure></div>

### 보충



### 요점

최고 baseline 대비 · 선반 +14.6%p · 식기대 +12.5%p

### 출처

Sec.6.2 · Figs.13–14 · PDF pp.19–20

### 발표 메모

OpenArm에서는 지시에 맞춰 물체를 골라 옮기는 성능을 비교했습니다. 오른쪽 그래프의 회색이 π0.5와 GR00T N1.6이고, 초록색이 RLDX-1입니다. 선반에 놓기는 가장 높은 기존 모델54.2%에서68.8%로, 식기대에 놓기는58.3%에서70.8%로 높아졌습니다. 새 물체와 새 작업 조합에서도 두 모델보다 높은 결과를 얻었습니다. 언어 지시와 대상 변화에 대응하는 조작에서 전반적인 개선을 보인 것입니다.

### 상세 공부 기록

#### [S089] OpenArm 평가와 Figure 14

<!-- study-meta
layout: figure
kind: fact
figure: fig-14.png
caption: Figure 14 · OpenArm, π0.5·GR00T N1.6·RLDX-1
-->

##### 한 문장

방향 지시와 grounding에서 차이가 커지지만 baseline의 실패 원인은 저자 해석이다.

##### 본문

###### 평가와 관측

일반 과제는 올바른 물체를 잡아 지정 위치에 두면 성공이다. Grounding은 올바른 instance를 잡으면 성공이다. 기본 24회, Shelf는 두 범주 합계 48회다.

RLDX-1은 Basic 50.0%, Shelf 68.8%, Dish Rack 70.8%, Unseen Object·Task 각 54.2%, Grounding 87.5%다.

<span class="label authors">저자 해석</span> π0.5의 미지 과제 정체를 약한 VLM·full VLM fine-tuning에 따른 과적합으로 설명하나, 원인만 분리한 실험은 아니다.

##### 보충

##### 요점

과제별 성공 기준·시행 수와 전체 시스템 비교의 한계를 함께 읽는다.

##### 출처

Fig.14 · Sec.6.2 · PDF p.20; App.G.2 · PDF p.50

##### 발표 메모

Figure14 순서 Basic/Shelf/Dish/UnseenObject/UnseenTask/Grounding: π0.5 41.7/54.2/58.3/37.5/45.8/83.3; N1.6 37.5/47.9/50.0/45.8/50.0/33.3; RLDX50.0/68.8/70.8/54.2/54.2/87.5. Shelf와 Dish는 π0.5 대비 각+14.6,+12.5%p(표시값 차이). Grounding의 π0.5는83.3으로 이미 높고, RLDX 우위는+4.2%p다. N1.6의33.3을 저자는 random-equivalent로 설명한다. 모든 baseline과 RLDX는30K step,batch64,공식 구현 기준; 같은 batch·step은 전체 사전학습 데이터와 모델 크기까지 통제했다는 뜻은 아니다.

#### [S088] OpenArm 과제 구성

<!-- study-meta
layout: figure
kind: fact
figure: fig-13.png
caption: Figure 13 · OpenArm의 6개 일반화 평가 설정
-->

##### 한 문장

같은 pick-and-place라도 지시·새 개체·새 배치·instance 선택은 다르게 시험한다.

##### 본문

###### 6개 평가 설정

- **Basic:** 세 물체 중 인형을 상자로 옮긴다.
- **Directional:** 선반 네 칸·식기대 세 칸 중 지시한 곳에 둔다.
- **Unseen Object:** 새 병·컵 instance를 사용한다.
- **Unseen Task:** 학습의 인형 대신 병·컵과 새 receptacle을 사용한다.
- **Grounding:** 같은 종류 3개 중 언어가 지정한 instance를 잡는다.

##### 보충

##### 요점

새 물체, 새 task configuration, 세밀한 언어 grounding을 구분한다.

##### 출처

Sec.6.2 · Figs.13–14 · PDF pp.19–20; App.G.2 · PDF p.50

##### 발표 메모

Figure 13의 좌상단 Basic, 상단 가운데 Shelf, 상단 오른쪽 Dish Rack, 하단 Unseen Object/Unseen Task/Grounding을 순서대로 짚는다. Basic에서도 물체와 목표 위치가 반대편이면 양손 협응이 필요하다. 학습은 Bottle-to-Shelf96, Snack-to-Shelf96, Cup-to-DishRack108, Doll-to-Box48로 총348 demonstrations. Unseen은 이 downstream demonstration 설정에 대한 표현이며 인터넷 또는 전체 사전 학습에서 한 번도 본 적 없는 개념이라는 뜻이 아니다.

## [P024] ALLEX · 움직임·기억·접촉

<!-- slide-meta
layout: evidence-pair
kind: fact
source_ids: S092, S090, S091
-->

### 한 문장

컨베이어 → 움직임 · 숨긴 상자 → 기억 · 카드·따르기 → 접촉

### 본문

<div class="evidence-visuals"><figure class="paper-figure"><img src="/figures/fig-15.png" alt="평가 과제 사진"><figcaption>컨베이어 → 움직임 · 숨긴 상자 → 기억 · 카드·따르기 → 접촉</figcaption></figure><figure class="paper-figure"><img src="/figures/fig-16.png" alt="원문 결과 그래프"><figcaption>Conveyor 87.5% · Box 91.7% 성공률 / Card 97.2 · Pouring 70.8 진행 점수</figcaption></figure></div>

### 보충



### 요점

최고 baseline → RLDX-1 · Conveyor 50.0→87.5% · Box 33.3→91.7%

### 출처

Sec.6.3 · Figs.15–16 · PDF pp.21–22

### 발표 메모

ALLEX는 움직이는 물체 잡기, 숨긴 물체 기억하기, 카드와 따르기 조작을 비교합니다. 컨베이어는 기존 모델의 최고값50.0%에서87.5%로, 숨긴 상자 선택은33.3%에서91.7%로 높아졌습니다. 카드와 따르기에서도 초록색 막대가 가장 높습니다. 이 두 과제는 부분 완료를 포함한 진행 점수이고, 오른쪽 평균86.8도 성공률과 진행 점수를 함께 평균한 값입니다. 이런 지표 구분을 유지하면서 보면, 시간 정보와 물리적 상호작용이 필요한 과제에서 큰 성능 차이가 나타났습니다.

### 상세 공부 기록

#### [S092] Figure 16과 부분 점수

<!-- study-meta
layout: figure
kind: fact
figure: fig-16.png
caption: Figure 16 · 성공률과 progress score가 함께 표시된 결과
-->

##### 한 문장

87.5·91.7은 성공률, 97.2·70.8은 진행 점수이며 평균 86.8은 혼합 평균이다.

##### 본문

###### 서로 다른 지표

- **Conveyor 87.5%:** pick-and-place 성공률.
- **Box 91.7%:** 올바른 상자 선택 성공률.
- **Card 97.2:** slide/pick/handover에 0.33/0.66/1점.
- **Pour 70.8:** 네 진행 단계에 0.25/0.5/0.75/1점.

막대의 축·caption은 success rate라고 쓰지만, 뒤의 두 과제는 부분 점수를 포함한다. **86.8% 완전 성공**으로 소개하면 안 된다.

##### 보충

##### 요점

같은 0–100 눈금이어도 측정하는 사건이 다를 수 있다.

##### 출처

Fig.16 · Evaluation Protocol · PDF p.22; App.G.3 · PDF p.51

##### 발표 메모

Figure16 순서 Conveyor/Box/Card/Pour/Avg: π0.5 29.2/33.3/55.3/38.5/39.1; N1.6 50.0/29.2/62.3/37.5/44.8; RLDX87.5/91.7/97.2/70.8/86.8. RLDX average=$\frac{87.5+91.7+97.2+70.8}{4}=86.8$. Card와Pour 수치는 정규화한 progress score×100이다. 본문은 두 baseline이 Pour 전체 단계를 완료한 trial이 없다고 설명하지만 부분점수는38.5,37.5다. 완전 성공률을 직접 복원할 수는 없다. Conveyor에서는 seen100%,unseen75%로 평균87.5. 평균이 동일 단위처럼 보이는 축 표기 자체도 발표에서 보완한다.

#### [S090] ALLEX의 움직임·기억 과제

<!-- study-meta
layout: figure
kind: fact
figure: fig-15.png
caption: Figure 15 · 컨베이어·상자 기억·카드 접촉·따르기
-->

##### 한 문장

움직이는 대상의 미래 위치와 현재 화면에 없는 과거 사건을 각각 시험한다.

##### 본문

###### Conveyor Pick-and-Place

움직이는 상자를 잡아 선반에 둔다. 학습 속도는 S1·S4, 평가에는 그 사이의 미지 속도 S2·S3를 추가한다.

4속도×6회로 총 24회다. **속도 보간** 평가이며 학습 범위 밖 extrapolation은 아니다.

###### Object-in-Box Selection

사람이 물체를 넣고 되돌려 둔 세 상자 중 하나를 선택한다. 숨기기 전 관찰을 기억해야 하며, 위치마다 8회로 총 24회다.

##### 보충

##### 요점

짧은 영상의 동역학과 더 오래 유지할 사건 기억은 다른 요구다.

##### 출처

Sec.6.3 · Fig.15 · PDF pp.21–22; App.G.3 · PDF p.51

##### 발표 메모

Conveyor40 demonstrations(S1/S4), Box90 demonstrations(상자마다30). 기능 평가에 직접 관련 없는 공간 일반화·언어 따라가기 요소는 학습에서 제외했다고 G.3가 설명한다. ALLEX는 head-mounted stereo만 사용하며 wrist/side camera가 없다. 그만큼 이 벤치마크의 성과를 모든 종류의 언어·배치 변화 강건성으로 확대할 수 없다. Figure15 상단 두 task를 중심으로 짚는다.

#### [S091] ALLEX의 물리 센싱 과제

<!-- study-meta
layout: figure
kind: fact
figure: fig-15.png
caption: Figure 15 · 카드와 따르기에서 물리 피드백이 필요한 상황
-->

##### 한 문장

카드 접촉 깊이와 컵의 무게 변화는 시각만으로 구별하기 어렵게 설계했다.

##### 본문

###### Card Slide-and-Pick

카드를 테이블 끝으로 밀고, 잡고, 건넨다. 책상 높이 80·75cm에서 학습하고 평가 24회는 안전을 위해 낮은 높이에서 한다.

###### Pot-to-Cup Pouring

주전자와 컵을 들고 **플라스틱 공**을 따른다. 목표 무게가 되면 주전자를 돌려놓고 컵을 내민다. 실제 액체 평가가 아니다.

물리 입력은 48개 관절의 모터 전류로 추정한 torque다. 접촉력 조절과 무게 변화에 따른 종료 판단을 평가한다.

##### 보충

##### 요점

물체를 옮겼는지뿐 아니라 접촉·하중에 맞춰 진행 단계를 바꾸는지 본다.

##### 출처

Sec.6.3 · Fig.15 · PDF pp.21–22; App.G.3 · PDF p.51

##### 발표 메모

Card72 demonstrations,Pour62 demonstrations. ALLEX torque는 모터 전류에서 추정한48DoF 값이며 Franka의 직접 관절 torque 및 AnySkin 촉각과 구분한다. Pour의 점수는 grasp both, pouring, return pot, bring cup forward의4단계다. 저자는 시각 변화가 작아 하중을 알기 어렵다고 설명한다. 이 과제가 torque의 필요성을 유도하도록 설계됐다는 점과 동일 모델에서 torque만 제거한 엄밀한 인과 ablation 유무는 별개다.

## [P025] Franka · 성과와 남은 어려움

<!-- slide-meta
layout: evidence-pair
kind: fact
source_ids: S095, S096, S093, S094
-->

### 한 문장

움직임·기억·접촉 · 쉬운 과제와 어려운 과제의 차이

### 본문

<div class="evidence-visuals"><figure class="paper-figure"><img src="/figures/fig-17.png" alt="평가 과제 사진"><figcaption>움직임·기억·접촉 · 쉬운 과제와 어려운 과제의 차이</figcaption></figure><figure class="paper-figure"><img src="/figures/fig-18.png" alt="원문 결과 그래프"><figcaption>Spin 97.9% · Shell 91.7% / 컵 교체45.8% · 플러그 삽입33.3%</figcaption></figure></div>

### 보충



### 요점

평균 · π0.5 34.4% / GR00T N1.6 31.6% → RLDX-1 68.5%

### 출처

Sec.6.4 · Figs.17–18 · PDF pp.23–24; Q13

### 발표 메모

Franka에서도 모든 과제에서 두 비교 모델보다 높은 성공률을 얻었습니다. 회전 방향 판단은 기존 최고32.3%에서97.9%로, 숨긴 컵 선택은54.2%에서91.7%로 높아졌습니다. 전체 평균은 기존 모델34.4%,31.6%에 비해 RLDX-1이68.5%입니다. 다만 플러그 삽입의 절대 성공률은33.3%여서 정밀 조작에는 어려움이 남아 있습니다. 기존 모델 대비 개선과 아직 남은 한계를 함께 볼 수 있는 결과입니다.

### 상세 공부 기록

#### [S095] Figure 18의 개선과 한계

<!-- study-meta
layout: figure
kind: fact
figure: fig-18.png
caption: Figure 18 · Franka task별 성공률과 남은 어려움
-->

##### 한 문장

모든 과제의 보고값이 높아졌지만 Cup45.8·Plug33.3에는 많은 실패가 남아 있다.

##### 본문

###### RLDX-1 보고 성공률

Spin97.9%, Pong81.5%, Cup45.8%, Shell91.7%, Plug33.3%, Egg61.1%; 평균 68.5%다.

Spin96·Pong54 interactions, 나머지는 각 24 trials다. Cup·Plug에는 많은 실패가 남는다.

<div class="callout"><span class="label question">Q13 · 집계 불명확</span><br>이진 24회면 1회≈4.17%p다. Egg61.1%는 바로 대응하지 않으며 반복 평균·추가 시행 여부는 미확인이다.</div>

##### 보충

##### 요점

성공률의 분모와 집계 방식을 확인할 수 없는 수치는 임의로 복원하지 않는다.

##### 출처

Fig.18 · Sec.6.4 · PDF p.24; App.G.4 · PDF p.52; Q13

##### 발표 메모

Figure18 π0.5:32.3/37.0/25.0/45.8/20.8/45.8/34.4; N1.6:26.0/42.6/12.5/54.2/16.7/37.5/31.6; RLDX:97.9/81.5/45.8/91.7/33.3/61.1/68.5. 평균68.5는 표시된6 task 평균과 부합한다. Egg의61.1을$\frac{15}{24}=62.5$로 고치거나$\frac{11}{18}$이라고 역산해 사실로 쓰지 않는다. 보고 수치를 보존하고G.4의24trials와 직접 대응이 불분명하다고 표시한다. 원문은 physical input 없는 variant의 정성 행동도 언급하지만 모든 모듈을 일대일 제거한 정량표와는 다르다.

#### [S096] 기능별 평가의 해석 범위

<!-- study-meta
layout: split
kind: interpretation
-->

##### 한 문장

ALLEX·Franka에서는 과제에 관련된 모듈만 켜고 나머지는 끈다.

##### 본문

###### 실제로 비교한 구성

G.3·G.4는 각 과제의 목표 기능에 해당하는 module만 fine-tuning·평가 때 활성화하고 나머지는 비활성화한다고 명시한다.

<div class="sequence">
<div class="step">움직임 과제 → 관련 motion module</div>
<div class="step">과거 사건 과제 → 관련 memory module</div>
<div class="step">접촉·하중 과제 → 관련 physical sensing module</div>
</div>

##### 보충

###### 말할 수 있는 것

같은 architecture 계열을 서로 다른 기능 과제와 두 embodiment에 적용한 결과는 기능 확장의 실용적 근거다.

###### 아직 분리되지 않은 것

세 기능을 동시에 켜서 복합 상황을 푼 효과, 같은 policy에서 한 입력·손실만 제거한 독립 기여는 이 baseline 비교만으로 확정할 수 없다.

<p class="label interpretation">설계상 통합 가능성과 동시 사용의 인과 검증을 구별</p>

##### 요점

여러 기능을 지원한다는 결과가 세 기능의 동시 시너지를 증명하지는 않는다.

##### 출처

App.G.3–G.4 · PDF pp.51–52; Sec.6.3–6.4 · PDF pp.21–24

##### 발표 메모

모듈별 활성화는 task relevance를 기준으로 하는 논문 조건이다. 논문의 unified architecture 주장을 부정하는 것이 아니라 실험이 지지하는 범위를 구체화한다. 적응 데이터·VLM·pre/mid-training·추론 strategy까지 전체 시스템이 baseline과 다르므로 성공률 차이를 하나의 모듈에 전부 귀속하지 않는다. ALLEX는 real-time chunking default를 사용한다. 기능별 input과 future-signal auxiliary loss의 효과도 별도 통제가 필요하다.

#### [S093] Franka의 움직임 과제

<!-- study-meta
layout: figure
kind: fact
figure: fig-17.png
caption: Figure 17 · Franka의 움직임·기억·접촉 6개 과제
-->

##### 한 문장

방향 인식과 미래 도착 영역 예측을 분리해 움직임 이해를 평가한다.

##### 본문

###### Spin Tracking

화면 속 물체가 시계·반시계 방향 중 어느 쪽으로 도는지 보고 해당 위치를 가리킨다. 시작 위치를 바꿔 정지 위치 단서만으로 풀기 어렵게 한다.

4개 초기 위치, 총 96 interactions를 평가한다.

###### Pong Game

공이 오른쪽 벽에 닿기 전에 빨강·초록·파랑 중 도착 영역에 해당하는 컵을 가리킨다. 반사로 궤적이 달라지므로 짧은 동역학 예측이 필요하다.

학습에서 보지 않은 54 interactions를 평가한다.

##### 보충

##### 요점

회전 방향을 읽는 것과 반사 후 도착점을 미리 읽는 것은 난도가 다르다.

##### 출처

Sec.6.4 · Fig.17 · PDF p.23; App.G.4 · PDF p.52

##### 발표 메모

Spin64 demonstrations,각3 interaction sequences;Pong50 demonstrations,각5 sequences. 96과54는 interaction 평가수이며 다른 과제의24 trial과 다르다. Pong의 unseen은 평가 interaction에 대한 표현이다. Figure17에서 첫 행 Spin과 둘째 행 Pong을 짚고 컵 색/벽 영역의 대응을 설명한다. 이 결과는 로봇이 일반적인 물리 시뮬레이터를 학습했다는 증거가 아니라 설계된 움직임 과제 성능이다.

#### [S094] Franka의 기억·접촉 과제

<!-- study-meta
layout: figure
kind: fact
figure: fig-17.png
caption: Figure 17 · Cup·Shell의 과거 정보와 Plug·Egg의 접촉 정보
-->

##### 한 문장

과거 역할을 기억하는 과제와 가려진 접촉을 감지하는 과제가 이어진다.

##### 본문

###### 기억이 필요한 과제

**Cup Swapping:** 머신 위 컵을 빈 coaster로 옮긴 뒤 원래 다른 coaster에 있던 컵을 머신으로 옮긴다. 겹치는 궤적만 보고는 컵의 과거 역할을 잊기 쉽다.

**Shell Game:** 큐브를 숨긴 컵을 기억해 선택한다.

###### 물리 신호가 필요한 과제

**Plug:** 카메라에서 가려진 소켓에 삽입한다. **Egg:** 달걀을 깨뜨리지 않고 집어 그릇으로 옮긴다. Franka는 7차원 torque와 15차원 AnySkin 촉각을 쓴다.

##### 보충

##### 요점

현재 화면의 모호함은 과거 사건과 접촉 신호로 서로 다르게 보완한다.

##### 출처

Sec.6.4 · Fig.17 · PDF p.23; App.G.4 · PDF p.52

##### 발표 메모

Cup60 demonstrations(2 initial positions),Shell60(각cup20),Plug100,Egg60. Cup/Shell/Plug/Egg는G.4 기준 각24 trials. AnySkin15차원은왼쪽 gripper의5 sensing units×3축 force다. 오른쪽도 같은 입력을 쓴다고 덧붙이지 않는다. Cup의 완전 성공, Shell의 선택 성공, Plug의 삽입 성공, Egg의 비파손 pick-and-place를 각각 사용한다.
