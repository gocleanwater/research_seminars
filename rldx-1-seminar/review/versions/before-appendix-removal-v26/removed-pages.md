# 부록 실험 페이지 보존

발표 본문에서 제외한 페이지의 변경 전 원본이다. 현재 발표 순서에는 포함하지 않는다.

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

## [P079] 시뮬레이션의 실행 설정

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

Benchmark마다 denoising 횟수와 실제 실행하는 action 길이가 다르므로,4회 denoising을 모든 결과에 적용하면 안 된다.

### 본문

#### Table 8 · 추론 설정

| Benchmark | Denoising | 실행 길이 |
| --- | --- | --- |
| LIBERO / Plus | 4 | 8 |
| SIMPLER Google | 4 | 2 |
| SIMPLER WidowX | 10 | 2 |
| RoboCasa Kitchen | 10 | 16 |
| GR-1 Tabletop | 4 | 8 |
| RoboCasa365 | 4 | 16 |

### 보충

#### 계산 반복과 로봇 실행을 구별

16개 action을 생성해도, SIMPLER는 앞의 2개를 실행한 뒤 다시 계산한다. Kitchen은 16개를 실행한다.

GR-1은 denoising timestep을 <strong>Beta(1.5,1.0)</strong>에서 고르고, 나머지는 고정 간격을 사용한다.

<p class="callout">Table 4의 4회 denoising·horizon 40은 ALLEX 지연 측정 설정이다. 여기의 benchmark 설정과 구분한다.</p>

### 요점

성공률과 latency를 설명할 때에는 입력·생성 길이·실행 길이·denoising 설정을 함께 확인한다.

### 출처

App.G.1 · Table 8 · PDF pp.48–49

### 발표 메모

원문은 16개 생성 후 일부 horizon 실행을 설명한다. Training iterations는LIBERO60K,Google20K,WidowX60K,Kitchen60K,GR160K,RC365250K다. Batch는 256/1024/1024/1024/1024/192(Table8)이며 RC365 문장은 196이라고 쓰는 불일치를 마지막 질문 장에 유지한다. State dropout은Google/GR1만 0.5,나머지 0이다. GR1 Beta sampling58.7 vs fixed58.0 보고를 모든 환경의 우위로 일반화하지 않는다.

### 상세 공부 기록

## [P080] Baseline 결과의 출처

<!-- slide-meta
layout: full
kind: fact
source_ids:
-->

### 한 문장

Table 1의 baseline에는 같은 조건으로 재현한 결과와, 공식 저장소·논문·leaderboard에서 가져온 결과가 함께 있다.

### 본문

| Benchmark | 재현·직접 평가 | 인용한 baseline 결과 |
| --- | --- | --- |
| LIBERO | GR00T N=1.6 재현 | 나머지는 공식 저장소 |
| LIBERO-Plus | LIBERO checkpoint로 평가 | π0·π0-FAST는 기존 논문 |
| SIMPLER | RLDX-1 평가 | 기존 논문·보고값 |
| RoboCasa Kitchen | RLDX-1 평가 | GR00T 공식 저장소·기존 논문 |
| GR-1 Tabletop | π0 계열 재현 | GR00T 계열 공식 저장소 |
| RoboCasa365 | π0-FAST 재현 | 나머지는 leaderboard |

<p class="callout"><span class="label interpretation">읽는 기준</span> 같은 표에 있다는 이유만으로 모든 모델을 같은 코드·장비·학습 예산에서 다시 실행한 비교라고 읽지 않는다.</p>

### 요점

순위와 절대 수치를 보되, 어떤 결과가 재현이고 어떤 결과가 외부 보고값인지 함께 밝힌다.

### 출처

App.G.1 Simulation Benchmark Details · PDF p.48

### 발표 메모

LIBERO-Plus는π0/π0FAST 외 나머지 방법을 10,300 perturbation tasks에서 같은LIBERO checkpoint로 평가한다고 명시한다. SIMPLER는Community2026/Yang2025/GEAR2025 등 보고값을 사용한다. 재현한 모델도 전체 pre-training 예산이 같다는 뜻은 아니다. 원문이 밝힌 provenance를 설명하고 결과 자체를 임의 보정하지 않는다.

### 상세 공부 기록

## [P091] 환경 변화별 성능

<!-- slide-meta
layout: full
kind: fact
source_ids: S114
-->

### 한 문장

LIBERO-Plus의 평균 86.7% 안에서도 조명 변화와 카메라 변화에 대한 결과는 크게 다르다.

### 본문

| 변화 조건 | 성공률 | 변화 조건 | 성공률 |
| --- | --- | --- | --- |
| Camera | 75.0% | Robot 초기 상태 | 91.8% |
| Language | 92.2% | Light | 97.1% |
| Background | 95.5% | Noise | 80.3% |
| Layout | 80.7% | 전체 평균 | 86.7% |

<p class="callout"><span class="label interpretation">직관</span> ‘환경 변화에 강하다’를 한 능력으로 묶기보다, 어느 변화에는 강하고 어느 변화에는 약한지 봐야 한다.</p>

카메라 변화 75.0%와 조명 변화 97.1%의 차이는 관측 결과다. 원인을 특정 모듈 하나로 분해한 표는 아니다.

### 요점

평균 성능이 높다는 사실과, 특정 변화에 대한 취약성이 남아 있다는 사실은 함께 성립한다.

### 출처

App.G.6 · Table 11 · PDF p.54

### 발표 메모

LIBERO일반suite는Long95.3/Spatial98/Object99.3/Goal98.4/Avg97.8이다. Plus는모두같은정도로성능을낮추는변화가아니다. 원문의perturbation별평가값이며CI나여러seed분산을추가하지않는다. S114의SIMPLER세부값은다음P092에서도본문으로설명한다.

### 상세 공부 기록

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

## [P092] SIMPLER의 과제별 결과

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

같은 benchmark 평균 안에서도 작업별 차이가 크고, VM에서 VA로 바뀌는 효과도 모든 작업에서 같지는 않다.

### 본문

#### Google robot · 성공률(%)

| 작업 | VM | VA |
| --- | --- | --- |
| Move Near | 92.0 | 90.9 |
| Close Drawer | 78.5 | 93.2 |
| Open Drawer | 58.5 | 32.3 |
| Pick Coke Can | 97.0 | 93.4 |
| 평균 | 81.5 | 77.4 |

<p class="mini">Open은 낮아졌지만 Close는 높아졌다. VA를 모든 작업을 똑같이 어렵게 만드는 한 축으로 읽지 않는다.</p>

### 보충

#### WidowX · 성공률(%)

| 작업 | 성공률 |
| --- | --- |
| Carrot on Plate | 83.0 |
| Eggplant in Basket | 52.0 |
| Spoon on Towel | 88.5 |
| Stack Cube | 64.0 |
| 평균 | 71.9 |

Spoon 88.5와 Eggplant 52.0의 차이는 평균 71.9만으로 드러나지 않는다.

### 요점

평균과 순위 뒤에서 과제별 난도와 분포 차이를 함께 읽는다.

### 출처

App.G.6 · Table 12 · PDF p.54

### 발표 메모

VM은VisualMatching,VA는VariantAggregation으로앞benchmark장정의를따른다. 조건마다task의seed·분포가달라질수있으며개별증감원인을한가지로단정하지않는다. 기존S114의원형해설은P091에유지한다.

### 상세 공부 기록

## [P093] Kitchen·GR-1의 과제별 편차

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

Kitchen 평균 70.6%, GR-1 평균 58.7%에도 잘하는 작업과 여전히 어려운 작업이 함께 섞여 있다.

### 본문

#### RoboCasa Kitchen · Table 13

| 과제 | 성공률 |
| --- | --- |
| Close Single Door | 100.0% |
| Turn On Sink Faucet | 100.0% |
| Microwave → Counter | 26.0% |
| Turn On Stove | 24.0% |
| Turn Off Stove | 22.0% |
| 전체 24개 과제 평균 | 70.6% |

### 보충

#### GR-1 Tabletop · Table 14

| 과제 | 성공률 |
| --- | --- |
| Tray → Pot | 74.0% |
| Can → Drawer | 74.0% |
| Placemat → Tiered Shelf | 24.0% |
| 전체 24개 과제 평균 | 58.7% |

<p class="callout"><span class="label interpretation">직관</span> 같은 조작 범주라도 물체·배치·요구 동작이 달라 평균이 편차를 가릴 수 있다.</p>

### 요점

최고 평균 성능이라는 설명과 특정 과제의 낮은 절대 성공률을 함께 보여 준다.

### 출처

App.G.6 · Tables 13–14 · PDF p.55; 대표 고·저성능 과제를 발췌

### 발표 메모

원문 24개씩의표에서대표사례를선택한것으로명시한다. 낮은작업의실패원인을시각/언어/제어중하나로확정하지않는다. 전체작업별표는원문p55에서확인할수있다. 기존S115해설은RC365세부를다루는다음P094로옮긴다.

### 상세 공부 기록

## [P094] 복합 작업의 남은 어려움

<!-- slide-meta
layout: split
kind: fact
source_ids: S115
-->

### 한 문장

RoboCasa365의 전체 32.1%는 atomic과 composite의 큰 차이를 함께 묶은 값이다.

### 본문

#### Table 15 · 구분별 성공률

| 구분 | 과제 수 | 성공률 |
| --- | --- | --- |
| Atomic-Seen | 18 | 67.3% |
| Composite-Seen | 16 | 19.0% |
| Composite-Unseen | 16 | 5.6% |

전체 32.1%는 50개 과제의 가중 평균과 부합한다. 세 구분의 단순 평균은 아니다.

### 보충

#### 평가에서 성공을 관측하지 못한 예

<div class="sequence">
<div class="step"><strong>Composite-Seen:</strong> Prepare Coffee 0%, Get Toasted Bread 0%</div>
<div class="step"><strong>Composite-Unseen:</strong> Gather Tableware 0%, Pan Transfer 0%</div>
</div>

<p class="callout">0%는 이 평가 시행에서 성공하지 못했다는 뜻이다. 모든 가능한 상황에서 불가능하다는 증명은 아니다.</p>

### 요점

상대적으로 높은 전체 성능과 긴 복합 작업의 남은 절대 난도를 동시에 읽는다.

### 출처

App.G.6 · Table 15 · PDF p.55

### 발표 메모

가중평균은(18×67.3+16×19+16×5.6)/50=32.104≈32.1이며split단순평균은약 30.63이다. 성공을관측하지못한작업을수행불가능으로규정하지않는다. 전체모델순위와개별작업의절대성능은서로다른정보다. S115의Kitchen/GR1약점도앞P093에서본문으로설명한다.

### 상세 공부 기록

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

## [P082] 실제 로봇의 실험 조건

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

ALLEX·Franka는 각 과제에서 관련 기능 모듈만 켜며, 시행 횟수와 학습 설정도 구분해서 보고한다.

### 본문

#### 과제별 학습·평가 설정

| 설정 | ALLEX | Franka |
| --- | --- | --- |
| 출발 모델 | Mid-trained | Mid-trained |
| 학습량 | 과제별 30K steps | 과제별 30K steps |
| Batch | 128 | 64 |
| State dropout | 0.8 | 0.3 |
| 기본 평가 | 과제별 24회 | 과제별 24회 |

### 보충

#### 활성 모듈과 평가 단위

<strong>움직임 과제는 motion, 기억 과제는 memory, 접촉 과제는 sensing</strong>처럼 해당 기능의 모듈만 활성화한다.

Franka의 예외는 <strong>Spin Tracking 96 interactions</strong>, <strong>Pong 54 interactions</strong>다.

<p class="callout">각 기능이 필요한 과제의 결과이며, 모든 기능을 동시에 켠 복합 과제의 통합 검증으로 확대하지 않는다.</p>

### 요점

다음 로봇 과제·결과는 기능별 평가다. 동일한 ‘성공률’이라도 시행의 단위와 조건을 함께 본다.

### 출처

App.G.3–G.4 · PDF pp.51–52

### 발표 메모

ALLEX시연:Conveyor40,ObjectBox90,Card72,Pouring62. Franka시연:Spin64(각 3interaction),Pong 50(각 5interaction),Cup60,Shell60,Plug100,Egg60. Spin평가 4initial positions×24=96,Pong 54interaction,다른과제 24trials다. ALLEX24회에는conveyor속도 4×6,box위치 3×8등이 포함된다. Egg61.1%와 24회 대응 질문은 해소하지 않는다. ALLEX의RTC는기본추론전략이며 torso torque48차원,Franka touch15/torque7차원은각하드웨어의정보다.

### 상세 공부 기록

## [P081] OpenArm의 시연과 평가

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

OpenArm은 348개 시연으로 학습하고, 물체·초기 위치·목표 칸을 조합해 작업별 일반화를 평가한다.

### 본문

#### 학습 시연 348개

| 작업 family | 시연 수 |
| --- | --- |
| Bottle → Shelf | 96 |
| Snack → Shelf | 96 |
| Cup → Dish Rack | 108 |
| Doll → Box | 48 |
| 합계 | 348 |

병·간식·컵·인형의 4종류, 종류별 4개 instance를 사용한다.

### 보충

#### 평가의 분모

일반 과제는 <strong>24 trials</strong>다. 선반 Directional PnP는 두 종류를 각각 24회 평가해 <strong>총 48 trials</strong>다.

한 장면에 목표 물체와 다른 종류의 distractor2개를 놓는다. 일부 배치는 양손 협응이 필요하다.

<p class="mini">RLDX-1과 baseline은 30K steps·batch 64로 학습한다. 원문의 시연 수·평가 횟수와 모델 간 초기 학습 이력을 구별한다.</p>

### 요점

결과의 성공률은 어떤 장면·몇 번의 시행·어떤 시연 범위에서 얻었는지와 함께 읽는다.

### 출처

App.G.2 OpenArm Experiments Details · PDF p.50

### 발표 메모

Bottle/Snack은 4instances×3initial positions×4shelf slots×2trials=96씩, Cup은 4×3×3×3=108, Doll은 4×3×4=48이다. State dropout0.3, top4LLM외 고정,ExoArm7/ManusPro로 시연하며 수집 중 neck은 고정한다. 하드웨어 설명은 앞 Fig12 소개와 중복해 늘리지 않는다.

### 상세 공부 기록

## [P083] 합성 데이터의 실제 로봇 검증

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

Table 3의 시뮬레이션 실험 뒤에, 합성 데이터가 실제 ALLEX의 새로운 물체 위치에도 도움이 되는지 확인한다.

### 본문

#### Table 9 · 평가하는 하위 작업

Pot-to-Cup Pouring에서 <strong>컵을 잡고 이어서 포트를 잡는 부분</strong>을 평가한다. 따르기 전체 작업의 성공률이 아니다.

<div class="sequence">
<div class="step">컵 3위치 × 포트 4위치 × 2회 = 24 trials</div>
<div class="step">둘 다 잡기 1점 / 컵만 잡기 0.5점 / 실패 0점</div>
</div>

### 보충

#### 이 실험의 합성 데이터

실제·합성을 <strong>50:50</strong>으로 섞어 fine-tuning한다. 영상은 앞 생성의 마지막 프레임을 다음 생성의 조건으로 재사용해 두 turn으로 만든다.

<strong>Task·scene augmentation 없이 video quality filtering만 적용</strong>한 구성이다.

<p class="callout">따라서 이 결과를 특정 증강이나 motion-consistency filter 하나의 효과로 읽지는 않는다.</p>

### 요점

실제 로봇의 위치 변화에 대한 추가 실험이지만, 본문의 전체 합성 파이프라인과 설정이 다르다.

### 출처

App.G.5 Additional ALLEX Experiments · Table 9 · PDF p.53

### 발표 메모

컵위치간격약 5cm/포트 9cm,실제시연수집은기준위치주변sigma약 10cm다. 생성prompt는grasp-and-tilt→pour-and-return이며 동작속도를유지하며길이차이를줄이려는구성이다. 실제평가는grasping subtask다. PretrainedRLDX130Ksteps,batch 128,AdamW1e-4,state dropout0.4,horizon 40,per-datasetembodimenttagging을쓴다.

### 상세 공부 기록

## [P084] 합성 데이터의 실제 결과

<!-- slide-meta
layout: full
kind: fact
source_ids: S112
-->

### 한 문장

원문 Table 9는 실패 7→2회, 완전 성공 9→14회를 보고하지만, 보고 점수와 개수의 가중합에는 불일치가 있다.

### 본문

| 학습 데이터 | Full | Partial | Fail | 보고 Score | 보고 비율 |
| --- | --- | --- | --- | --- | --- |
| Real | 9 | 8 | 7 | 16/24 | 66.7% |
| Real + Synthetic | 14 | 8 | 2 | 20/24 | 83.3% |

<strong>완전 성공 개수</strong>만 읽으면 24회 중 9회(37.5%) → 14회(58.3%)다.

<p class="callout"><span class="label question">집계 확인 필요</span> 명시된 1/0.5/0점을 개수에 적용하면 <strong>9+8×0.5=13</strong>, <strong>14+8×0.5=18</strong>이다. 원문 Score16·20과 맞지 않아 어느 필드가 잘못됐는지 미해결로 남긴다.</p>

<span class="label authors">저자 해석</span> 합성 데이터가 다양한 컵·포트 위치에서 안정적인 grasping을 도왔다고 설명한다.

### 요점

원문 보고 비율·완전 성공 횟수·집계 불일치를 함께 보여 주며, 보고값을 임의로 고쳐 맞추지 않는다.

### 출처

App.G.5 · Table 9 · PDF p.53; Count 가중합은 명시된 scoring rule로 직접 계산

### 발표 메모

원문보고 66.7/83.3과Fullcount9/14,score불일치를분리한다.13/24와 18/24로원문비율을교체하지않는다. Count자체가수정돼야하는지score필드가문제인지는확인되지않았다. 해당불일치는마지막미해결장에도유지한다. 원문전체모델오작동을주장하지않는다.

### 상세 공부 기록

#### [S112] Table 9: 합성이 돕는 것은 어느 성공인가?

<!-- study-meta
layout: full
kind: question
-->

##### 한 문장

잡기 하위 과제의 보고값은 66.7→83.3이지만 count·가중 score가 서로 맞지 않는다.

##### 본문

| Data | Full | Partial | Fail | 원문 보고 score |
| --- | --- | --- | --- | --- |
| Real | 9 | 8 | 7 | $\frac{16}{24}$ · 66.7% |
| Real+Synth. | 14 | 8 | 2 | $\frac{20}{24}$ · 83.3% |

Full은 컵·주전자 모두 잡기, Partial은 컵만 잡기다. 완전 성공은 $\frac{9}{24}$(37.5%)→$\frac{14}{24}$(58.3%)다. 따르기 전체 성공률이 아니다.

<div class="callout"><span class="label question">추가 집계 불일치</span>
<p>명시된 1/0.5/0 점수를 count에 적용하면 $\frac{13}{24}$·$\frac{18}{24}$로, 원문 $\frac{16}{24}$·$\frac{20}{24}$와 다르다. 보고값을 보존하며 어느 명세가 잘못됐는지는 미확인으로 남긴다.</p></div>

<p class="mini">실제:합성 50:50; 이 합성은 task/scene 증강 없이 video quality filtering만 적용.</p>

##### 보충

##### 요점

원문 보고값·완전 성공 count·점수 계산의 추가 불일치를 구분한다.

##### 출처

App.G.5 · Table 9 · PDF p.53

##### 발표 메모

원문 Table9의 count 합은 각각24다. 그러나 명시한1/0.5/0 scoring으로는$9+8\times0.5=13$, $14+8\times0.5=18$이다. 이는 보고 Score$\frac{16}{24}$와$\frac{20}{24}$ 및66.7/83.3과 불일치한다. 표·설명·집계 중 무엇이 잘못됐는지는 미확인으로 남기고 원문 값을 수정하지 않는다. 완전 성공 count만 읽으면9→14다. $3\,\text{cup positions}\times4\,\text{pot positions}\times2\,\text{trials}=24$이며 위치 간격은 약5cm와9cm다. 합성은 multi-turn2 rounds(grasp-and-tilt→pour-and-return), 앞 round 마지막 frame 재사용, task/scene augmentation 없이 video quality filtering만 적용한다.

## [P090] Batch Size의 효과

<!-- slide-meta
layout: split
kind: fact
source_ids: S113
-->

### 한 문장

Table 10에서는 큰 batch의 성공률이 높다. 아키텍처만 아니라 학습 설정도 결과에 큰 영향을 줄 수 있다.

### 본문

#### Table 10 · 성공률(%)

| Batch | LIBERO | Kitchen | GR-1 |
| --- | --- | --- | --- |
| 64 | 97.4 | 66.9 | 36.8 |
| 256 | 97.8 | 69.6 | 53.2 |
| 1024 | — | 70.6 | 58.7 |

GR-1은 64→1024에서 <strong>+21.9%p</strong> 차이다. LIBERO의 1024 결과는 보고되지 않았다.

### 보충

#### 큰 batch는 무엇을 함께 바꿀까?

<p><span class="label authors">저자 관찰</span> 더 큰 batch에서 성능이 개선됐다고 보고한다.</p>

<p class="callout"><span class="label interpretation">직관</span> 같은 update 횟수라면 큰 batch는 더 많은 샘플을 처리한다. Batch·update 수·총 노출량·계산 예산을 함께 봐야 한다.</p>

부록의 짧은 설명만으로 총 예산의 통제를 충분히 확인하기는 어렵다.

### 요점

모델 구조의 차이와 학습 규모의 효과를 함께 점검한다. Batch 하나만의 독립 효과로 단정하지 않는다.

### 출처

App.G.6 · Table 10 · PDF p.54

### 발표 메모

기본 60Kstep을모든행의확정된통제조건이라고추정하지않는다.21.9%p는 58.7−36.8이다. 모델간같은batch/steps가전체pretraining예산까지같음을의미하지않는다. Fullrecipe의절대성능을읽는데필요한보조분석으로Table3실제검증뒤에배치한다.

### 상세 공부 기록

#### [S113] Table 10: batch size와 학습 예산

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

큰 batch에서 성공률이 높지만 batch만의 효과와 총 데이터 노출량은 구별해야 한다.

##### 본문

###### 보고된 성공률(%)

| Batch | LIBERO | Kitchen | GR-1 |
| --- | --- | --- | --- |
| 64 | 97.4 | 66.9 | 36.8 |
| 256 | 97.8 | 69.6 | 53.2 |
| 1024 | — | 70.6 | 58.7 |

GR-1은 64→1024에서 +21.9%p로 차이가 크다. LIBERO1024는 미보고다.

##### 보충

###### 무엇이 고정됐는가?

Gradient step을 고정하면 batch가 커질수록 총 샘플 노출량도 커진다. 총 샘플 수·계산량을 고정하면 update 횟수가 달라진다.

<span class="label interpretation">해석 한계</span> G.6의 짧은 설명만으로 예산 통제를 충분히 확인하기 어렵다. 따라서 batch 크기만의 독립 효과나 모든 환경의 같은 법칙으로 일반화하지 않는다.

##### 요점

Batch·update 횟수·총 샘플 노출·계산량을 함께 보고해야 비교가 분명해진다.

##### 출처

App.G.6 · Table 10 · PDF p.54

##### 발표 메모

GR-1은36.8→53.2→58.7, Kitchen66.9→69.6→70.6, LIBERO97.4→97.8이다. G.6는 큰 batch가 성능을 높인다고 서술하지만 통계적 batch 효과와 총 데이터·계산 예산의 효과를 분해하는 설명이 부족하다. 기본60K steps를 모든 행의 완전한 예산이라고 추정해 보완하지 않는다. Baseline과 같은 steps·batch를 사용해도 전체 사전 학습 예산까지 동일하다는 뜻은 아니다.

## [P085] Best-of-N

<!-- slide-meta
layout: split
kind: fact
source_ids: S109
-->

### 한 문장

RECAP 이후 정책을 더 학습하는 대신, 추론 때 여러 행동 후보를 만들고 높은 Q값의 후보를 고를 수도 있다.

### 본문

#### 추론 중의 후보 선택

<div class="sequence">
<div class="step">같은 관측에서 action chunk N개 생성</div>
<div class="step">별도 Q-critic으로 후보마다 평가</div>
<div class="step">Q값이 가장 높은 chunk를 선택해 실행</div>
</div>

<strong>N은 후보 개수</strong>다. 각 후보를 만드는 denoising step 수와는 다르다.

### 보충

#### RECAP critic과 다른 모델

RECAP은 별도 <strong>Gemma text critic</strong>으로 학습 신호를 만든다.

BoN은 <strong>고정된 RLDX-1 특징 위의 별도 V/Q network</strong>다. Q에는 관측 특징·로봇 상태와 함께 <strong>평가할 action chunk</strong>도 넣는다.

<p class="callout"><span class="label interpretation">직관</span> 행동을 한 번 뽑아 바로 실행하는 대신, 여러 후보를 만든 뒤 평가자가 더 낫다고 보는 것을 선택한다.</p>

### 요점

정책을 학습시키는 critic과, 추론 중 행동 후보를 고르는 critic은 구조·입력·용도가 다르다.

### 출처

App.E.1–E.2 · PDF p.45; RECAP: App.C · p.43

### 발표 메모

Frozen RECAP1 backbone의 최종 token states를 평균내 4층embodiment-conditionedMLP로 64차원VLembedding을 만들고state와concat한다. V는BRONet4blocks/width256,Q는action chunk도입력받는다. TwinQ의min을사용하고distributionalhead기대값으로값을읽는다. 특징은cache해critic학습이VLM으로역전파되지않는다. IQL-styleobjective,discount0.9/0.99,expectile0.7을쓴다. 추가on-policy fine-tuning없이선택한다.

### 상세 공부 기록

#### [S109] Best-of-N과 별도 Q critic

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

여러 행동 chunk 중 $Q$가 높은 후보를 고르는 방법이며 RECAP의 Gemma critic과 다르다.

##### 본문

###### 추론의 후보 선택

<div class="sequence">
<div class="step">정책에서 $N$개의 action chunk를 생성한다.</div>
<div class="step">각 chunk를 별도 $Q$ critic으로 평가한다.</div>
<div class="step">$Q$가 가장 높은 chunk를 선택해 실행한다.</div>
</div>

$N$은 **후보 개수**이며 denoising 반복 횟수가 아니다. $Q$는 단일 행동이 아니라 시간 구간의 chunk를 입력받는다.

##### 보충

###### RECAP critic과 구분

Appendix E는 frozen RLDX-1 특징 위에 별도 $V$/$Q$ network를 학습한다. Twin-Q의 min을 쓰고 distributional head의 기대값으로 $Q$를 읽는다.

본문 RECAP의 별도 Gemma text critic과 구조·출력·용도가 다르다. RECAP1 특징은 고정·cache하며 critic 학습이 VLM으로 역전파되지 않는다.

추가 on-policy fine-tuning 없이 후보를 고른다.

##### 요점

RECAP의 학습용 평가 모델과 BoN의 추론용 후보 평가 모델을 구분한다.

##### 출처

App.E.1–E.2 · PDF p.45; Sec.4.3 · PDF pp.14–15; App.C · PDF p.43

##### 발표 메모

VLM 최종 token states를 sequence 방향 average pooling하고 embodiment-conditioned4-layer MLP로64차원 VL embedding을 만든다. State를 이어 붙여 $V$에 넣고 $Q$에는 normalized action chunk도 넣는다. $V$는 width256의 pre-norm BRONet4 blocks다. Twin-Q의 min을 TD target과 BoN score에 사용한다. HL-Gaussian head는101atoms, support$[-100,0]$, expectile0.7이다. E.1의 general setting은 lr$10^{-4}$, E.2의 실제 critic optimization은$3\times10^{-5}$로 서술돼 하나의 설정으로 단정하지 않는다. 핵심은 RECAP1 frozen features를 쓰는 별도 critic이며 Gemma가 아니라는 점이다.

## [P086] BoN의 Temperature

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

Temperature는 flow matching의 초기 노이즈 크기를 바꿔, 생성되는 행동 후보들의 다양성을 조절한다.

### 본문

#### 초기 노이즈의 분포

$$
\boldsymbol\epsilon\sim\mathcal N(0,T^2I)
$$

| 기호 | 의미 |
| --- | --- |
| $T$ | 노이즈 sampling temperature |
| $T=1$ | 표준 정규 노이즈 |
| $T=1.5$ | 표준편차 1.5배·분산 2.25배 |

### 보충

#### 서로 다른 세 설정

<div class="sequence">
<div class="step"><strong>N:</strong> 몇 개의 후보를 비교하는가?</div>
<div class="step"><strong>T:</strong> 초기 노이즈를 얼마나 넓게 뽑는가?</div>
<div class="step"><strong>τ:</strong> 각 후보를 만드는 denoising timestep</div>
</div>

<p class="callout"><span class="label interpretation">직관</span> 같은 생성 모델에서도 시작 노이즈의 범위를 넓히면 서로 다른 행동을 탐색할 여지가 커진다.</p>

### 요점

후보 개수·후보 다양성·denoising 반복은 서로 다른 축이다. 이 구분을 가지고 다음 그래프를 읽는다.

### 출처

App.E.2–E.3 · PDF pp.45–46

### 발표 메모

IQL expectile도원문에서tau기호를쓰지만여기의denoisingtau와다르다. BoN은B×N tiled batch를써서후보를계산한다고설명하며후보마다완전히독립된VLM전체를반복실행한다고단정하지않는다. T=1.5의분산 2.25는식의제곱으로계산했다.

### 상세 공부 기록

## [P087] BoN의 Offline 분석

<!-- slide-meta
layout: widefigure
kind: fact
source_ids: S110
figure: fig-22.png
caption: Figure 22 · RECAP3 offline 관측에서 N=10 후보의 Q값과 다양성
-->

### 한 문장

Temperature가 커지면 후보의 Q값 차이가 커지지만, 높은 예측 Q가 곧 실제 로봇의 좋은 수행을 보장하지는 않는다.

### 본문

| (a) Q값 | (b) Best−Mean | (c) Q의 퍼짐 | (d) 시간별 Q |
| --- | --- | --- | --- |
| 온도별 평균·최고 후보 | 선택의 예상 이득 | 후보 간 다양성 | 일부 프레임만의 효과인지 확인 |

원문은 T>2에서 Q차이가 뚜렷하지만 실제 로봇의 분포 밖 행동 때문에 <strong>T=1.5를 절충값</strong>으로 썼다고 설명한다.

### 보충

### 요점

이 그래프는 critic의 예측 분석이다. 실제 행동 결과는 다음 Figure 23에서 따로 확인한다.

### 출처

App.E.3 · Figure 22 · PDF p.46

### 발표 메모

N=10은offline분석설정,실제로봇은N=8/T=1.5다. (c)는Q표준편차이며그대로행동좌표의물리적거리로읽지않는다. (d)에서개선이몇개outlierframe에만집중되지않는다는것은저자의관찰이다. 고온에서안정성문제가있었다는것은이원문실험에대한서술이며새로운일반안전주장을추가하지않는다.

### 상세 공부 기록

#### [S110] Figure 22: temperature가 바꾸는 것

<!-- study-meta
layout: figure
kind: fact
figure: fig-22.png
caption: Figure 22 · Offline N=10, temperature별 예측 Q와 다양성
-->

##### 한 문장

$T$는 초기 noise의 분산을 바꾼다. Denoising timestep $\tau$나 IQL expectile과 다르다.

##### 본문

$$
\epsilon\sim\mathcal{N}(0,T^2I)
$$

$T$를 높이면 서로 다른 초기 후보가 더 넓게 퍼진다. Figure 22는 RECAP3의 offline 관측에서 $N=10$개를 뽑아 예측 $Q$의 분포와 best−mean 차이를 분석한다.

저자는 $T>2$에서 $Q$ 차이가 뚜렷해지지만 실제 로봇에서는 분포 밖 행동이 나와 $T=1.5$를 절충값으로 썼다고 설명한다.

<span class="label interpretation">해석 한계</span> 높은 $Q$는 critic의 예측이다. 실제 성공이 같은 비율로 높아진다는 뜻은 아니다.

##### 보충

##### 요점

높은 다양성·높은 예측 $Q$·좋은 실제 행동은 서로 같은 지표가 아니다.

##### 출처

App.E.2–E.3 · Fig.22 · PDF pp.45–46

##### 발표 메모

$T=1.5$이면 초기 noise 표준편차는1.5배, 분산은2.25배다. 본문 flow의 denoising timestep과 E의 IQL expectile0.7도 모두 $\tau$를 쓰므로 문맥을 구별한다. Fig22(a)는$T$별$Q$,(b)는$Q_{\mathrm{best}}-Q_{\mathrm{mean}}$,(c)는후보$Q$의표준편차,(d)는frame별$Q$ trace다. 추세가 일부 outlier만으로 만들어진 것이 아니라는 설명도 저자 관찰이다. 높은 온도에서 분포 밖 행동이 있었다는 설명은 원문 실험에 관한 서술이다.

## [P088] BoN의 실제 로봇 결과

<!-- slide-meta
layout: widefigure
kind: fact
source_ids: S111
figure: fig-23.png
caption: Figure 23 · Light Bulb Twisting의 비틀기 횟수, 낮을수록 좋음
-->

### 한 문장

BoN은 RECAP1의 수행을 개선했지만, 같은 방법을 RECAP2·3에 적용하면 오히려 비틀기 횟수가 늘었다.

### 본문

| (a) 정책 학습 상태에 따른 차이 | (b) RECAP1의 후보 수 비교 |
| --- | --- |
| 각 그룹의 왼쪽=기본, 오른쪽=BoN(N=8,T=1.5)<br>RECAP1은 개선, RECAP2·3은 악화 | 왼쪽부터 N=1/T=1, N=8/T=1.5, N=32/T=1.5<br>N=8→32에서 추가 개선 없음 |

### 보충

### 요점

추가 추론 계산이 항상 성능 향상으로 이어지지는 않는다. 정책의 학습 상태에 따라 결과가 달라졌다.

### 출처

App.E.3 · Figure 23 · PDF p.46

### 발표 메모

그림원본의좌측각checkpoint쌍은Default와BoN이다. 우측은N=1T=1/N=8T=1.5/N=32T=1.5순이다. 그래프는attempts분포이고successrate가아니다. 중간정책의숫자를그림에서임의digitize하지않고본문에명시한평균변화만다음장에서쓴다.

### 상세 공부 기록

#### [S111] Figure 23: 후보 탐색은 항상 이득일까?

<!-- study-meta
layout: figure
kind: fact
figure: fig-23.png
caption: Figure 23 · RECAP checkpoint별 BoN의 개선과 악화
-->

##### 한 문장

N8·T1.5는 RECAP1을 돕지만 RECAP2·3의 attempts는 늘린다.

##### 본문

###### 실제 전구 작업의 결과

**RECAP1:** 8.5→4.9 attempts로 개선.<br>**RECAP2:** +2.3 attempts 악화.<br>**RECAP3:** +2.2 attempts 악화.

RECAP1에서 $N=8\to N=32$도 4.9→5.7로 추가 개선이 없다. 기본 $N=1$/$T=1$과 BoN $N=8$/$T=1.5$는 $N$과 $T$가 함께 변한다.

<span class="label authors">저자 해석</span> 덜 수렴한 정책에는 탐색이 돕지만 수렴 정책에는 확률성이 최적 행동을 벗어나게 한다고 설명한다. Critic 오차 등과 분리 검증된 원인은 아니다.

##### 보충

##### 요점

추론 계산을 늘릴수록 성능이 단조 향상된다는 결론은 이 결과와 맞지 않는다.

##### 출처

App.E.3 · Fig.23 · PDF p.46

##### 발표 메모

RECAP1 기본8.5±2.8, BoN4.9±1.3 attempts다. $N=8$/$T=1.5$에서$N=32$/$T=1.5$로4.9→5.7이다. Figure23은 attempts이며 success rate가 아니다. Critic이 RECAP1 특징으로 학습돼 후속 policy와 distribution mismatch가 있을 수 있지만 이를 실증 원인으로 단정하지 않는다. $N$만/$T$만 바꾸는 factorial control이 없어 후보 수만의 독립 효과를 산출하지 않는다. BoN latency와 compute까지 포함한 Pareto 평가도 이 그림에서는 제시하지 않는다.

## [P089] BoN이 돕는 조건

<!-- slide-meta
layout: split
kind: fact
source_ids:
-->

### 한 문장

후보를 고르는 이득은 정책의 수렴 정도와 평가 모델의 판단에 달려 있으며, 후보 수만 늘린다고 계속 좋아지지 않는다.

### 본문

#### 원문의 attempts 변화

| 정책 | BoN(N=8,T=1.5)의 효과 |
| --- | --- |
| RECAP1 | 8.5 → 4.9 · 개선 |
| RECAP2 | 기본보다 2.3회 증가 |
| RECAP3 | 기본보다 2.2회 증가 |

RECAP1에서 N을 8→32로 늘려도 <strong>4.9→5.7회</strong>로 추가 개선이 없었다.

<p class="mini">기본 N=1/T=1과 BoN N=8/T=1.5는 후보 수와 온도가 함께 바뀐다.</p>

### 보충

#### 더 많은 탐색이 항상 유리할까?

<p><span class="label authors">저자 해석</span> 덜 학습된 정책은 빠진 행동 모드를 탐색하며 도움을 받지만, 수렴한 정책은 추가 확률성 때문에 좋은 행동에서 벗어날 수 있다고 설명한다.</p>

<p class="callout"><span class="label interpretation">직관</span> 이미 괜찮은 답을 내는 정책에 더 넓은 후보를 만들게 하는 것과, 그 후보 중 정말 좋은 것을 가려내는 것은 별개의 문제다.</p>

<p class="mini">Critic 평가 오류 등의 원인과 완전히 분리한 증명은 아니다.</p>

### 요점

BoN은 추가 RL의 대체재라기보다 조건부 보완재다. 실제 개선과 추가 계산 비용을 함께 확인해야 한다.

### 출처

App.E.3 · Figure 23 · PDF p.46

### 발표 메모

RECAP1기본 8.5±2.8,BoN4.9±1.3이다. 별도Qcritic은RECAP1특징으로학습했으므로후속policy와분포가달라질가능성이있지만이를악화의실증원인으로단정하지않는다. 보조sampling조건의보편성이나정확한BoNlatency비교는제시되지않았다. S111은P088해설에보존한다.

### 상세 공부 기록
