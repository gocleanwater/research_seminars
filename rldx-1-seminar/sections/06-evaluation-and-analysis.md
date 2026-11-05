# Evaluation and Analysis

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P040] 시뮬레이션 벤치마크

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S082
figure: fig-11.png
caption: Figure 11 · 평가 환경: 단일 팔·양팔 휴머노이드·주방 조작
-->

### 한 문장

Benchmark는 정해진 환경과 과제들로 정책을 비교하는 평가 세트다. 조작 능력의 서로 다른 면을 확인한다.

### 본문

<p><strong>LIBERO / LIBERO-Plus</strong><br>탁자 조작 / 조건 변화 대응</p>
<p><strong>SIMPLER — Google Robot·WidowX</strong><br>실제 영상에 맞춘 로봇 시뮬레이션</p>
<p><strong>RoboCasa Kitchen</strong><br>이동형 단일 팔의 주방 조작</p>
<p><strong>GR-1 Tabletop</strong><br>양팔 휴머노이드의 탁자 조작</p>
<p><strong>RoboCasa365 (RC365)</strong><br>단일 기술·배운/새로운 복합 절차</p>

### 보충



### 요점

기본 조작, 환경 변화 대응, 긴 복합 절차를 서로 다른 벤치마크로 평가한다.

### 출처

Sec.6.1 · Fig.11 · PDF pp.17–19; App.G.1 · PDF p.48

### 발표 메모

Figure11을 N 해설뿐 아니라 발표 본문에 배치했다. LIBERO는 Franka 단일 팔 tabletop40tasks, Plus는 object layout/camera/robot initial state/language/light/background/sensor noise의7축 perturbations다. SIMPLER는 Google Robot·WidowX의 실영상 조건을 시뮬레이션에 대응시키는 평가이며 Google-VM은 Visual Matching, Google-VA는 Variant Aggregation이다. RoboCasa Kitchen은 mobile PandaOmron의24주방tasks, GR-1 Tabletop은GR-1 humanoid24tasks다. RoboCasa365는 human pre-training300-task dataset에서fine-tuning한 뒤50-task benchmark의Atomic-Seen/Composite-Seen/Composite-Unseen을 평가한다. 다음 결과는 각benchmark에fine-tuning한 값이지, 하나의zero-shot정책을 모든환경에 그대로쓴 결과가 아니다.

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

## [P022] Simulation 결과

<!-- slide-meta
layout: split
kind: fact
source_ids: S083, S084, S085, S086, S087
-->

### 한 문장

사전학습한 모델을 각 벤치마크의 학습 데이터로 fine-tuning한 뒤 성공률을 비교한다.

### 본문

#### Table 1의 주요 결과

| 성공률 (%) | 최강 baseline | RLDX-1 |
| --- | --- | --- |
| LIBERO 평균 | 96.9 | 97.8 |
| LIBERO-Plus | 86.5 | 86.7 |
| GR-1 Tabletop | 48.0 | 58.7 |
| RC365 전체 | 26.9 | 32.1 |
| RC365 미지 복합 | 4.4 | 5.6 |

<p class="mini">비교 모델: π0-FAST·π0·π0.5·GR00T N1.5/N1.6. 최강 baseline은 열마다 다르다.</p>

### 보충

#### LIBERO 평균의 의미

**40개 조작 과제의 평균 성공률**이다. 과제는 다음 4개 묶음으로 나뉜다.

- **Spatial:** 공간 관계
- **Object:** 대상 물체
- **Goal:** 수행 목표
- **Long:** 여러 동작을 잇는 긴 절차

Table 1의 **Short**는 앞의 세 묶음 평균,<br>
**Avg**는 Long까지 포함한 전체 평균이다.

### 요점

LIBERO 97.8%는 그 안의 과제 전반을 요약한 값이다. 새 복합 절차의 성공률 5.6%에는 큰 어려움이 남는다.

### 출처

Table 1 · PDF p.18; App.G.1 · PDF p.48; RC365 세부 집계: Table15 · PDF p.55

### 발표 메모

원문의LIBERO는4sub-benchmark40tasks이며각task50회평가한다. Short는Spatial/Goal/Object suites평균, Avg는Long을포함한전체를요약한다. 표시된RLDX Short98.6/Long95.3에서(3*98.6+95.3)/4=97.775로Avg97.8에대응한다. Short/Long두숫자의단순평균으로해석하지않는다. 표는각열의최고baseline이며LIBERO/Plus는π0.5, GR-1/RC365미지복합은N1.5, RC365전체는N1.6이다. Baseline출처·설정·반복/불확실성·RC365task수가중평균과batch불일치는기존S083–087에보존한다. 전시스템recipe의비교와개별모듈의독립효과를구분하되그방법론설명을기초과제정의보다앞세우지않는다.

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

## [P041] 실제 로봇

<!-- slide-meta
layout: widefigure
kind: fact
source_ids:
figure: fig-12.png
caption: Figure 12 · (a) OpenArm 28DoF · (b) ALLEX 48DoF · (c) Franka 7DoF
-->

### 한 문장

양팔·손가락을 쓰는 휴머노이드 두 종류와 단일 팔·그리퍼 로봇으로 실제 조작을 평가한다.

### 본문

<div class="robot-glossary">
<p><strong>OpenArm — 양팔 휴머노이드</strong><br>Inspire 손·머리 stereo 카메라<br>지시·대상 변화의 일반화 평가</p>
<p><strong>ALLEX — 상반신 휴머노이드</strong><br>양팔·15DoF 손·허리·목<br>관절 토크 피드백 활용</p>
<p><strong>Franka — 단일 팔·그리퍼</strong><br>Franka Research 3(FR3)<br>관절 토크·AnySkin 촉각</p>
</div>

### 보충



### 요점

OpenArm은 다양한 지시·물체, ALLEX·Franka는 움직임·기억·접촉이 필요한 과제를 중심으로 평가한다.

### 출처

Fig.12 · PDF p.19; Sec.6.2–6.4 · PDF pp.19–24; App.G.2–G.4 · PDF pp.50–52

### 발표 메모

DoF는독립적으로움직일수있는자유도다. OpenArm은7DoF팔2개,6DoF Inspire RH56F1손2개,2DoF목으로총28이며 ZED2i stereo views를쓴다. ALLEX는7DoF팔2개,15DoF손2개,2DoF허리와목으로총48이다. ALLEX는motor current에서torque를추정한다. Franka는7DoF Research3팔과Robotiq2F-85그리퍼를쓰며7차원관절torque와15차원AnySkin을사용한다. Fig12(c)그림내Arm6DoF/Gripper1DoF표기는원문그대로두고,팔사양의근거는G.4의7DoF를따른다. OpenArm은pre-trained모델, ALLEX/Franka는mid-trained모델을초기화해각작업에적응한다.

### 상세 공부 기록



## [P042] OpenArm 과제

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S088
figure: fig-13.png
caption: Figure 13 · OpenArm의 6개 평가 설정; PnP=Pick-and-Place(집어 옮기기)
-->

### 한 문장

기본 집어 옮기기에 위치 지시·새 개체·새 놓기 설정·정확한 대상 선택을 더해 평가한다.

### 본문

#### 기본 조작 — Basic PnP

세 물체 중 **인형을 골라 오른쪽 상자에 놓기**.

#### 위치 지시 — Directional PnP

**Shelf:** 병·과자 → 선반 4칸 중 지시한 칸<br>
**Dish Rack:** 컵 → 식기대 좌·중·우의 지시 칸

#### 새 조건과 대상 선택

**Unseen Object:** 학습 시연에 없던 새 병·컵<br>
**Unseen Task:** 물체·놓기 조합 변경<br>
**Object Grounding:** 같은 종류 중 지정 개체 고르기

### 보충



### 요점

‘무엇을 잡을지’와 ‘어디에 놓을지’를 구분해 보면 여섯 과제의 차이가 보인다.

### 출처

Sec.6.2 · PDF p.19; Fig.13 · PDF p.20; App.G.2 · PDF p.50

### 발표 메모

Basic은doll→오른쪽box이며같은종류3개중선택하는grounding과다르다. Shelf는4칸(TL/TR/BL/BR),DishRack은3칸(L/C/R)이다. Unseen Object는Directional task에새bottle/cup instance를사용한다. Unseen Task는Basic의doll대신bottle/cup을놓고새target receptacle을사용하는구성이다. Bottle/cup이라는범주자체가전체학습에서처음나왔다는뜻이아니다. Grounding은같은category3개중언어로지시한instance를찾아잡는다. 사용자가요청한Fig13을본문에두고추상적category나‘해석’보다과제의실제동작을먼저설명한다.

### 상세 공부 기록

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

## [P023] OpenArm 결과

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S089
figure: fig-14.png
caption: Figure 14 · 앞 장의 여섯 설정에 대한 성공률 비교
-->

### 한 문장

위치 지시와 새로운 대상·놓기 설정에서도 지시한 조작을 수행하는지 본다.

### 본문

#### 성공은 무엇인가?

**Basic·Directional·Unseen 과제:**<br>
지시한 물체를 잡고 **지시한 위치에 놓기**.

**Object Grounding:**<br>
같은 종류의 세 물체 중 지시가 가리키는 **한 개체를 올바르게 잡기**.

#### RLDX-1의 성공률

기본 **50.0%**, 선반 **68.8%**, 식기대 **70.8%**.<br>
새 개체·새 작업 각 **54.2%**, Grounding **87.5%**.

<p class="mini">대부분 24회. 선반은 물체 2종류에 각각 24회로, 총 48회 평가한다.</p>

### 보충



### 요점

Grounding은 올바른 대상 잡기까지, 나머지는 지정 위치에 놓기까지가 성공 기준이다.

### 출처

Sec.6.2 · Figs.13–14 · PDF pp.19–20; App.G.2 · PDF p.50

### 발표 메모

사용자가이해하기어렵다고지적한과적합/grounding원인통제문장을본문에서뺐다. 실제성공판정과과제별수치로직접설명하고,저자의baseline실패원인해석은S089에보존한다. 학습348개시연/30Ksteps/batch64와Unseen의downstream조건은기존상세에있다. Fine-grained grounding=언어가실제장면의어느대상을가리키는지연결하는능력이다. 단순히87.5가다른과제보다높다는것을놓기까지더잘한다는뜻으로읽지않는다.

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

## [P043] ALLEX 과제

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S090, S091
figure: fig-15.png
caption: Figure 15 · ALLEX의 움직임·기억·물리 피드백 과제
-->

### 한 문장

48DoF 양팔 휴머노이드로, 한 장면만 봐서는 해결하기 어려운 기능별 과제를 수행한다.

### 본문

<p><strong>Conveyor Pick-and-Place — 움직임</strong><br>움직이는 상자를 속도에 맞춰 잡아 옮긴다.</p>

<p><strong>Object-in-Box Selection — 기억</strong><br>물체를 숨긴 상자를 기억해 고른다.</p>

<p><strong>Card Slide-and-Pick — 접촉</strong><br>카드를 탁자 끝으로 밀고 집어 사람에게 건넨다.</p>

<p><strong>Pot-to-Cup Pouring — 무게 감지</strong><br>공을 따르다 컵이 목표 무게에 도달하면 멈춘다.</p>

<p class="mini">따르기에는 실제 액체 대신 작은 플라스틱 공을 쓴다.</p>

### 보충



### 요점

움직임은 시간 변화, 기억은 가려진 과거 정보, 물리 센싱은 접촉·무게 판단을 평가한다.

### 출처

Sec.6.3 · Fig.15 · PDF pp.21–22; App.G.3 · PDF p.51

### 발표 메모

Conveyor는학습S1/S4와그사이새속도S2/S3를평가한다. Object-in-Box는사람이상자3개중하나에물체를넣고원위치로돌려놓은후선택한다. Card는높이가조금다른책상에서적절한접촉을조절하는동작이며평가는안전상75cm책상만사용한다. Pouring은한손pot/다른손cup을쥐고motor-current기반관절torque로cup무게변화를추정한다. 목표무게후pot을되돌리고cup을앞으로내미는전체절차와평가기준은다음결과/S091에서읽는다. 각과제는관련module만활성화한다.

### 상세 공부 기록

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

## [P024] ALLEX 결과

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S092
figure: fig-16.png
caption: Figure 16 · 성공률 두 과제와 부분 진행 점수 두 과제
-->

### 한 문장

같은 0–100 막대여도 ‘완전 성공한 비율’과 ‘얼마나 진행했는지’는 다른 의미다.

### 본문

<p><strong>움직임:</strong> 속도에 맞춰 상자를 잡는다.<br>
<strong>기억:</strong> 물체를 숨긴 상자를 고른다.</p>

<table class="chunk-symbols" aria-label="ALLEX 과제별 지표와 RLDX-1 결과"><thead><tr><th>과제</th><th>지표</th><th>RLDX-1</th></tr></thead><tbody>
<tr><td>Conveyor</td><td>성공률</td><td>87.5%</td></tr>
<tr><td>Object-in-Box</td><td>성공률</td><td>91.7%</td></tr>
<tr><td>Card</td><td>진행 점수</td><td>97.2</td></tr>
<tr><td>Pouring</td><td>진행 점수</td><td>70.8</td></tr>
</tbody></table>

**카드:** 밀기 → 집기 → 건네기의 부분 완료도 센다.<br>
**따르기:** 잡기 → 따르기 → pot 복귀 → cup 내밀기.


### 보충



### 요점

평균 86.8은 성공률·진행 점수의 혼합 평균이다. 카드·따르기는 부분 완료도 포함한다.

### 출처

Sec.6.3 · Figs.15–16 · PDF pp.21–22; App.G.3 · PDF p.51

### 발표 메모

사용자가지정한‘잡는다.’와‘기억’사이에명시적br을넣었다. Conveyor/Object-in-Box는success rate,Card는0.33/0.66/1,Pouring은0.25/0.5/0.75/1의progress score다. 원문그래프y축은SuccessRate지만본문protocol에맞춰두종류를구분했다. 86.8은(87.5+91.7+97.2+70.8)/4를반올림한혼합평균이다. 시행수와Franka/ALLEX관련모듈설정등은기존상세/앞장에보존한다.

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

## [P044] Franka 과제

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S093, S094
figure: fig-17.png
caption: Figure 17 · Franka의 여섯 기능 평가 과제
-->

### 한 문장

단일 팔과 AnySkin 촉각·관절 토크로 움직임·과거 기억·접촉 조작을 평가한다.

### 본문

#### 움직임

**Spin Tracking:** 시계/반시계 회전 판단<br>
**Pong Game:** 공이 닿을 벽의 색 영역 예측

#### 기억

**Cup Swapping:** 머신의 컵을 치우고,<br>
원래 받침에 있던 다른 컵으로 교체<br>
**Shell Game:** 물체를 숨긴 컵 고르기

#### 접촉

**Plug Insertion:** 가려진 소켓에 플러그 삽입<br>
**Egg PnP:** 깨뜨리지 않고 달걀을 그릇에 옮기기

### 보충



### 요점

두 과제씩 움직임·기억·접촉을 시험한다. 그림의 동작과 다음 장의 막대를 연결해 읽는다.

### 출처

Sec.6.4 · Fig.17 · PDF p.23; App.G.4 · PDF p.52

### 발표 메모

Spin은초기위치를바꿔단순위치단서가아닌회전방향을판단한다. Pong은ball이벽에도달하기전에색에대응하는컵을가리킨다. CupSwapping은커피머신의컵을빈coaster로옮긴뒤원래다른coaster에있던컵을머신으로옮기는절차다. Shell은초기에cube를보여준후cup으로가려현재관측만으로는고를수없다. Plug는카메라에서socket이가려져torque/force단서로맞춘다. Egg는깨지않게힘을조절해bowl로옮긴다. 소켓외관·시연·평가protocol의세부는기존S093/094에그대로남긴다.

### 상세 공부 기록

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

## [P025] Franka 결과

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S095, S096
figure: fig-18.png
caption: Figure 18 · 앞 장의 여섯 과제에 대한 성공률
-->

### 한 문장

움직임·기억에서 큰 개선을 보이지만, 컵 교체와 플러그 삽입에는 여전히 많은 실패가 남는다.

### 본문

#### 움직임

**Spin 97.9% · Pong 81.5%**

#### 기억

**컵 교체 45.8% · 숨긴 컵 91.7%**

#### 접촉

**플러그 33.3% · 달걀 61.1%**

평균은 <strong>68.5%</strong>다. 회전·숨긴 컵 선택보다 순차 컵 교체·플러그 삽입이 어렵게 남았다.

<p class="mini">ALLEX·Franka는 각 과제에서 해당 기능의 모듈만 활성화해 평가한다.</p>

### 보충



### 요점

어떤 과제가 나아졌고 어디에 실패가 남는지 읽는다. 다음은 구성 요소를 바꾼 분석이다.

### 출처

Sec.6.4 · Figs.17–18 · PDF pp.23–24; App.G.4 · PDF p.52; Q13

### 발표 메모

기존수치Spin97.9/Pong81.5/Cup45.8/Shell91.7/Plug33.3/Egg61.1과평균68.5를유지한다. Spin96/Pong54interactions,나머지24trials의차이및Egg61.1과시행수대응불명확(Q13)은S095/096과마지막미해결장에보존한다. ALLEX와Franka모두task-relevant module만활성화하며세기능동시상승효과의통제실험으로확대하지않는다. 로봇하드웨어는P041,동작사진은P044에먼저제시했다.

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
