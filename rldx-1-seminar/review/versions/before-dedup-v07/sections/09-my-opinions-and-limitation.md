# My opinions and limitation

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P028] 나의 의견

<!-- slide-meta
layout: split
kind: interpretation
source_ids: S108, S109, S110, S111, S112, S113, S114, S115
-->

### 한 문장

개별 점수뿐 아니라 기능을 연결한 방식과 그 이득이 성립하는 조건에 주목할 수 있다.

### 본문

#### 시스템 설계로서의 의미

<span class="label interpretation">발표자의 해석</span> 이 연구의 강점은 새 블록 하나보다 움직임·기억·물리 신호를 데이터 생성, 단계별 학습, 실행 최적화까지 연결한 데 있다.

다만 전체 시스템의 높은 성능이 각 설계 선택의 필요성을 모두 입증하지는 않는다. 구성 요소를 같은 조건에서 바꾸는 비교가 있어야 기여를 더 명확히 나눌 수 있다.

### 보충

#### 확장의 이득은 조건부

BoN은 RECAP1을 돕지만 RECAP2·3를 악화시킨다. PEFT의 23.71GiB도 H200 측정이며 소비자 GPU의 실제 적응 검증은 아니다.

<span class="label interpretation">추가 검증</span> 같은 데이터·compute 예산에서 성공률과 전체 실행 지연을 함께 비교하면, 후보 탐색·경량 적응이 유효한 조건을 더 분명히 판단할 수 있다.

### 요점

통합의 가치를 인정하면서도 적용 조건과 비용까지 검증할 필요가 있다.

### 출처

발표자의 해석 · Sec.2–6 · PDF pp.6–26; App.D · Table 6 · PDF p.44; App.E · Figs.22–23 · PDF pp.45–46; App.G.5–G.6 · PDF pp.53–55

### 발표 메모

연결 멘트: “논문의 결론을 바탕으로, 이 결과를 어떻게 읽을 수 있을지 정리하겠습니다. 개인적인 실험 경험이 아니라 원문 비교에 근거한 해석입니다.” 시스템 통합과 조건부 이득을 의견으로 제시하며 저자의 실험 결과 자체와 구별한다. BoN $N=8$/$T=1.5$는 RECAP1 attempts8.5→4.9지만 RECAP2/3는+2.3/+2.2로 악화한다. Frozen RECAP1 특징 위 별도 distributional $Q$ critic이며 RECAP의 Gemma text critic과 다르다. PEFT Full FT는 VLM top-4층을 fully tune한다는 뜻이다. Full/Full62.67%,Full/LoRA64도62.67%,양쪽LoRA64는55.33%·batch1 23.71GiB이며 실제 측정은H200이다. Table9의 보고66.7→83.3과 full$\frac{9}{24}$→$\frac{14}{24}$는 상세 해설에 보존하고 count 가중합13/18 vs 보고16/20의 불일치는 마지막 장에서 검증 논점으로 모은다. Batch64→1024의 GR-1 36.8→58.7도 총 노출 예산과 분리하기 어렵다. 각 task의 낮은 절대값과 평균의 한계까지 S108–115 원형 해설에 남긴다. 다음 장에서는 의견과 별도로 문서에서 아직 확인되지 않은 명세와 집계 문제를 짚는다.

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

## [P030] 한계와 미해결 질문

<!-- slide-meta
layout: full
kind: question
source_ids: S118, S119, S120, S121
-->

### 한 문장

원문 명세·집계의 불일치와 아직 분리하지 못한 효과를 다음 검증의 대상으로 남긴다.

### 본문

| 위치 | 확인된 불일치 | 필요한 근거 |
| --- | --- | --- |
| Q11 · Fig.7 | Franka 비중 합101.0 vs 본문8:2 | 혼합 설정 |
| Q12 · Table8 | RC365 batch196 vs192 | 실행 설정 |
| Q13 · Fig.18 | Egg61.1% vs24회 설명 | 분모·집계법 |
| 추가 · Table9 | Count 가중합13/18 vs 보고16/20 | Count·점수 명세 |

<span class="label question">운영·생성</span> Memory 갱신·초기화, $H$/$H+1$·C/$A$ 표기, skill 목록·실행 가능성 규칙은 더 확인해야 한다.

<span class="label interpretation">후속 실험</span> 모듈·필터·RL의 독립 비교, 동일 데이터·compute 예산, 평가 불확실성, end-to-end p95/p99가 결론을 더 선명하게 한다.

### 보충

### 요점

문서의 불확실성과 모델의 성능 한계를 구별하며 후속 근거를 확인한다.

### 출처

Q5–Q6·Q8·Q11–Q13; Sec.2–4 · PDF pp.7–13; App.B.3 · PDF p.42; App.G.1·G.4–G.6 · PDF pp.49,52–55

### 발표 메모

연결 멘트: “마지막은 앞의 의견과 구분해 원문에서 확인되지 않은 명세와 추가 검증을 정리합니다.” 마무리 멘트: “문서의 불일치는 모델 오동작의 증거가 아닙니다. 명시된 결과와 확인하지 못한 규칙을 나눠 다음 근거를 찾는 출발점으로 남깁니다.” Memory는$H+1$ 간격과$t-H$ queue식, episode 초기화·짧은 history 처리, MSAT의$A$와 Physical Sensing 요약의C가 미해결이다. Task feasibility는 skill 목록·prompt·판정 gate가 구체적이지 않다. Q11은$80+9.4+11.6=101$, Q12는 문장196/Table8 192, Q13은24회당1성공4.17%p와61.1의 대응 불명확이다. Table9 count9/8/7,14/8/2에1/0.5/0을 적용한13/18과 보고16/20도 다르다. 기존 $Q$번호를 재번호화하지 않는다. 모든 미해결 질문과 후속 실험 제안은 S118–121 원형 해설에 보존한다.

### 상세 공부 기록

#### [S118] Memory와 stream 표기: 남은 질문

<!-- study-meta
layout: split
kind: question
-->

##### 한 문장

구조의 큰 흐름은 확인됐지만 queue 운영과 일부 표기는 구현 근거가 더 필요하다.

##### 본문

###### Memory Q5

과거 cognition3묶음과 현재 $h_t$를 causal memory Transformer에 넣고 $m_t$·원래 $h_t$를 행동 모델로 전달한다.

본문 cache 간격은 $H+1$이지만 queue 식은 $t-H,t-2H,\ldots$로 표기한다. Chunk40/16과 과거 120/48 timestep 설명은 있으나 정확한 갱신 시점·episode 초기화·짧은 history 처리는 확정하지 못했다.

##### 보충

###### Stream Q6

MSAT 문단은 $C=[h_t,m_t]$, $A=[s_t,a^{\tau}]$로 명시한다. 그러나 Physical Sensing 마지막 요약은 noisy action을 “C stream”이라고 쓴다.

초기 $A$와 후기 통합 C-A를 구별하되 마지막 C가 오타인지 의도인지 확정하지 않는다.

<p class="label question">운영 명세·표기의 미해결이며 실제 실행 오류 확인은 아님</p>

##### 요점

명시된 구조는 설명하고 부족한 운영 규칙과 표기는 열린 질문으로 남긴다.

##### 출처

Sec.2.1–2.2 · PDF pp.7–8; Sec.4.2 · PDF p.13; Q5·Q6

##### 발표 메모

Cache 간격$H+1$과 queue식$t-n_{\mathrm{mem}}H$의 불일치를 남긴다. Queue 갱신을 매 카메라 frame 또는 매 denoising iteration마다 한다고 보완하지 않는다. Memory window120/48은 원문 수치이며 camera FPS를 확인하지 않고 초 단위로 변환하지 않는다. 공개 코드나 저자 확인으로 cache trigger·episode reset·padding·첫 chunk 동작을 검증할 수 있다. Physical Sensing 요약의C표기는 MSAT 문단$A$와 다르며 후기C-A 통합이 있다는 이유만으로 해소됐다고 단정하지 않는다.

#### [S119] Task 실행 가능성: 무엇을 더 알아야 하나?

<!-- study-meta
layout: split
kind: question
-->

##### 한 문장

Skill-conditioned 변형은 실행 가능한 지시를 유도하지만 판정 규칙의 보장은 미확인이다.

##### 본문

###### 원문에서 확인한 것

Factorized는 행동·대상·배치·손을 재조합하고 skill-conditioned는 원본 skill을 조건으로 변형한다. 둘 다 시작 장면을 조건으로 사용한다.

원래 skill을 유지하거나 정의된 skill set의 다른 실행 가능한 skill로 바꾼다고 설명한다. 두 전략의 출력은 겹칠 수 있다.

##### 보충

###### Q8의 남은 세부

- 사전 정의 skill 목록과 장면별 후보 제한은 무엇인가?
- 실행 가능성은 어떤 모델·규칙·절차로 판정하는가?
- System prompt·few-shot 예시와 강제 제약은 무엇인가?

Sec.3.3·B.3에는 이 세부가 없다. 후속 video quality filtering은 초기 지시의 실행 가능성 판정과 같지 않다.

##### 요점

설계 의도와 구체적인 제약·검증 절차를 구분해 추가 근거를 확인한다.

##### 출처

Sec.3.3 Task Augmentation · PDF p.11; App.B.3 · PDF p.42; Q8

##### 발표 메모

원래 skill을 유지하며 object·location만 바꾼 결과는 factorized로도 만들 수 있어 두 전략을 상호 배타적 집합으로 그리지 않는다. Gemini API의 plausibility8frames/instruction16frames 평가는 초기 생성 prompt의 실행 불가능한 지시 제거 보장과 다르다. B.3는 모델·데이터·학습 설정·filter 학습을 보충하지만 task-generation prompt, skill 목록, feasibility gate를 구체화하지 않는다. 이 범위 밖 구현은 미확인이다.

#### [S120] 수치·집계의 불일치: 그대로 보존한다

<!-- study-meta
layout: full
kind: question
-->

##### 한 문장

표시값을 고쳐 맞추지 말고 원문 위치와 계산상의 차이를 함께 기록한다.

##### 본문

| 위치 | 원문 표기 | 남은 확인 |
| --- | --- | --- |
| Q11 · Fig.7 p.13 | $80.0+9.4+11.6=101.0$ | 본문 8:2와 불일치 |
| Q12 · pp.18,49 | 문장 batch196 / Table8 192 | 실제 실행 설정 |
| Q13 · pp.24,52 | Egg61.1% / 24trials | 분모·반복·집계법 |
| 추가 · Table9 p.53 | Count 가중합 13/18 vs Score16/20 | Count·점수·설명 중 어디인가? |

원문 수치를 임의로 보정하지 않는다. 이는 문서 명세·집계의 한계이며 모델 오동작이나 실험 부정을 입증하지 않는다.

##### 보충

##### 요점

후속 코드·로그·저자 설명이 오기 전에는 보고값과 불확실성을 함께 유지한다.

##### 출처

Fig.7 · PDF p.13; Sec.6.1 · PDF p.18; Fig.18 · PDF p.24; Table 8 · PDF p.49; App.G.4 · PDF p.52; Q11–Q13; App.G.5 · Table 9 · PDF p.53

##### 발표 메모

Q11에서 자체 수집 합계21.0은 본문20과 달라11.6을10.6으로 고치지 않는다. Q12에서 문장196이 반복돼도 Table8의192를 틀렸다고 확정하지 않는다. Q13은 단일24 이진 trials의1회당4.1667%p와61.1의 대응이 불명확하다. 추가로Table9는count9/8/7과14/8/2에1/0.5/0을 적용한13/18과 보고Score16/20이 맞지 않는다. 기존 Q1–13을 임의로 재번호화하거나 중앙 노트를 수정하지 않고 새 확인 사항으로 구별한다.

#### [S121] 추가로 필요한 실험

<!-- study-meta
layout: split
kind: question
-->

##### 한 문장

독립 기여·평가 예산·선별 신뢰성·지연 분포를 확인하면 결론의 범위가 더 명확해진다.

##### 본문

###### 성능 근거를 분해하는 실험

- 같은 데이터·예산에서 MSAT와 모듈 입력·보조 목표를 하나씩 비교.
- 추가 rollout만 BC에 더한 조건과 RECAP을 같은 예산으로 비교.
- Task/scene 증강·quality/motion 필터를 요인별로 비교.
- Motion classifier의 별도 test set·precision/recall·실패 유형 보고.

##### 보충

###### 신뢰도·실행을 확인하는 실험

- 평가 episode 수·실패/timeout 처리·seed와 신뢰구간 공개.
- Batch 비교의 샘플·update·compute 예산 통제.
- 세 기능이 동시에 필요한 과제의 상호작용 평가.
- 카메라→모터 end-to-end와 p95/p99, BoN 성능·지연 절충 보고.

<p class="label interpretation">후속 검증 제안이며 실행 완료 결과가 아님</p>

##### 요점

추가 실험은 어떤 조건에서 왜 유효한지 더 선명하게 하기 위한 것이다.

##### 출처

Sec.6.5 · PDF pp.24–26; App.E · PDF pp.45–46; App.G.3–G.6 · PDF pp.51–55; Q1·Q2·Q3·Q10

##### 발표 메모

후속 제안은 논문의 관찰과 명세 한계에 근거한 우리의 해석이다. 평가 분포 밖 일반화, classifier calibration, 새 embodiment 적응 효과 등을 확인된 결론으로 만들지 않는다. 이 발표는 원문·질문노트를 검토해 정리한 초안이며 논문 학습·실험의 재현을 실행한 결과가 아니다. 유망한 통합 성과와 독립 인과 기여·재현 설정·집계 불확실성의 남은 과제를 함께 기록한다.
