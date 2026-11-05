# Training Data

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P013] 학습 데이터

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S041, S042, S043
figure: fig-04.png
caption: Figure 4 · 생성 영상에 행동을 붙이고 두 단계로 검사하는 파이프라인
-->

### 한 문장

공개·자체 데이터의 강점을 연결하고, 합성 영상에 행동 라벨을 붙여 경험을 확장한다.

### 본문

#### 세 공급원의 역할

**공개 데이터**는 다양한 로봇의 조작 경험을, **자체 데이터**는 Franka·ALLEX의 고유 제어와 토크·촉각을 제공한다. 사람의 원격 조작을 수치 행동과 센서 기록으로 연결한다.

**합성 데이터**는 수집이 어려운 장면을 늘린다. 지시·장면 변형 → 영상 생성 → IDM 행동 라벨링 → 검증의 흐름이다.

### 보충

<p class="callout">Task는 목표 지시, action은 로봇을 움직이는 수치다. 영상과 행동이 맞는지 별도로 확인한다.</p>

### 요점

데이터를 늘리는 것과 학습 가능한 영상–행동 쌍을 만드는 것은 함께 해결해야 한다.

### 출처

Sec.3–3.3; Fig.4 · PDF pp.9–12

### 발표 메모

구조에서 데이터로 전환한다. 상세 센서 구성·원격 조작·최대64 vision tokens 전처리는 연결된 상세 단위에서 확인한다.

### 상세 공부 기록

#### [S041] 세 데이터 공급원과 전처리

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

공개 데이터로 조작 경험을 넓히고, 자체·합성 데이터로 부족한 로봇과 상황을 보완한다.

##### 본문

###### 세 공급원이 채우는 빈칸

- **공개 실제 데이터:** 단일 팔·양팔·휴머노이드의 다양한 동작과 장면을 제공한다.
- **자체 실제 데이터:** Franka·ALLEX의 고유 제어 방식과 촉각·토크 정보를 수집한다.
- **합성 데이터:** 수집 비용이 큰 GR-1·ALLEX의 작업·장면 변형을 늘린다.

##### 보충

###### 영상 입력의 공통 규칙

모든 학습 이미지에 같은 전처리를 적용한다. 원래 종횡비를 유지하며 크기를 조절해 **프레임당 vision token이 최대 64개**가 되도록 한다.

64는 프레임 수나 action 길이가 아니다. 한 프레임을 인코더가 표현하는 시각 토큰 수의 상한이다.

<p class="mini">Qwen3-VL의 native-resolution 인코더를 이용해 임의 비율·해상도를 crop·padding 없이 처리한다.</p>

##### 요점

데이터의 역할은 다르지만, 영상 입력 형식은 통일한다.

##### 출처

Sec.3–3.2 · PDF pp.9–10

##### 발표 메모

공개 데이터의 원시 총량과 실제 채택한 episode 수를 구분한다. 예: AgiBot은 원 데이터가 1M 이상이어도 275K를 샘플링한다. 프레임당 최대64토큰을 모든 프레임이 정확히64토큰이라는 뜻으로 표현하지 않는다. 세 공급원은 설명상 분류이며 본문은 실제/합성의 두 큰 범주로 소개한다.

#### [S042] Franka·ALLEX 시연 수집

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

사람의 손·손목 움직임을 로봇 관절로 바꾸면서 영상과 물리 센서를 함께 기록한다.

##### 본문

###### Franka: 그리퍼와 접촉 정보

FR3 팔·평행 그리퍼·손목 카메라·제3자 카메라로 DROID와 유사한 구성을 만든다. 그리퍼에 **AnySkin 촉각 센서**를 추가하고 관절 토크도 기록한다.

<div class="sequence">
<div class="step">Meta Quest VR로 말단 장치의 자세를 지시</div>
<div class="step">로봇 시연과 영상·촉각·토크를 수집</div>
</div>

##### 보충

###### ALLEX: 부위별 원격 조작

- Meta Quest: 머리·허리
- Vive Tracker: 손목 위치·자세 → 역기구학으로 팔 관절각
- Manus Pro 장갑: 손끝 위치 → 역기구학으로 손가락 관절각

각 팔 7-DoF, 각 손 15-DoF, 허리·목 각 2-DoF다. 모터 전류와 변환 상수로 관절 토크를 추정한다.

##### 요점

영상만 모으는 시연이 아니라 행동과 접촉 상태가 연결된 기록이다.

##### 출처

Sec.3.2 · PDF pp.9–10; Fig.12 · PDF p.19

##### 발표 메모

역기구학은 원하는 말단/손끝 위치·자세에서 관절각을 구하는 계산이라는 배경 풀이이다. Franka의 토크 측정과 ALLEX의 전류 기반 토크 추정을 구별한다. ALLEX 합계는 양팔14+양손30+허리2+목2=48DoF. OpenArm은 이 장의 자체 센서 수집 대상과 구분한다.

#### [S043] 합성 데이터 전체 흐름

<!-- study-meta
layout: figure
kind: fact
figure: fig-04.png
caption: Figure 4 · 생성·행동 라벨링·시뮬레이터 기반 일관성 검사
-->

##### 한 문장

그럴듯한 영상 생성과 그 영상에 맞는 행동 라벨 검증을 서로 다른 단계로 수행한다.

##### 본문

###### 영상 → 수치 행동 → 검증

시작 프레임과 task 지시를 변형해 새 영상을 만든다. **IDM**이 현재·미래 관측에서 행동 시퀀스를 추정한다.

추정 행동을 시뮬레이터에서 실행한 rollout 영상과 생성 영상을 비교해 움직임이 맞는 샘플을 남긴다.

<p class="callout">언어 지시는 목표이고, IDM의 행동 라벨은 로봇을 움직이는 수치다.</p>

##### 보충

별도 영상 품질 검사는 지시 일치와 trajectory plausibility를 확인한다. 움직임 검사는 영상과 행동의 정합성을 확인한다.

##### 요점

생성한 장면과 추정한 행동을 함께 검사해야 학습 쌍을 얻는다.

##### 출처

Fig.4; Sec.3.3 · PDF pp.10–12

##### 발표 메모

원문 파이프라인을 직관적으로 읽는 장이다. IDM은 task text를 직접 수치 행동으로 번역하는 모델로 설명하지 않는다. simulator rollout의 action-consistency와 현실 물리 성공은 동일하지 않다. 그림의 긴 순서는 이후 S044–S055에서 나눠 설명한다.

## [P014] Task·Scene Augmentation

<!-- slide-meta
layout: figure
kind: fact
source_ids: S044, S045, S046, S047, S048, S049, S050
figure: fig-05.png
caption: Figure 5 · (a) 원본 (b) 지시 변형 (c) I2I 편집 후 I2V 생성
-->

### 한 문장

지시의 변형과 시각적 변형을 나누되, 원본 장면에서 가능한 동작을 유지하려 한다.

### 본문

#### 무엇을 할지, 어디에서 할지

**Task:** 행동·물체·위치·손을 재조합하거나 원본 skill을 조건으로 변형한다. 두 전략의 결과는 겹칠 수 있다.

**Scene:** 시작 장면을 I2I로 편집해 I2V로 생성하거나, V2V로 영상의 색·질감을 바꾸며 움직임을 보존하려 한다.

### 보충

<p class="callout">Canny edge는 구조 보존을 유도한다. 실행 가능성을 보장하지 않으며, 구체적인 판정 규칙·prompt는 미확인이다.</p>

### 요점

Figure 5(c)는 I2I→I2V 예시다. V2V만의 효과를 보여주는 비교는 아니다.

### 출처

Sec.3.3; Fig.5 · PDF p.11; App.B.3 · PDF p.42; 질문노트 Q8

### 발표 메모

왼쪽 세 행을 원본·task 변형·scene 변형 순으로 읽는다. 다음 장에서 생성 영상의 행동 라벨과 검증으로 넘어간다.

### 상세 공부 기록

#### [S044] Factorized task augmentation

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

지시를 네 요소로 나누고 시작 장면을 조건으로 재조합한다.

##### 본문

###### 문장을 네 축으로 분해

<div class="sequence">
<div class="step"><strong>Behavior</strong> — 무엇을 할까?</div>
<div class="step"><strong>Target object</strong> — 어느 물체를?</div>
<div class="step"><strong>Placement</strong> — 어디로?</div>
<div class="step"><strong>Hand type</strong> — 어느 손으로?</div>
</div>

VLM에는 시작 프레임, 조작 맥락의 system prompt, 학습 데이터의 few-shot 예시를 제공한다.

##### 보충

###### 재조합의 직관

<span class="label example">설명용 예시</span>

“오른손으로 컵을 왼쪽 쟁반에 놓기”에서 대상·위치·손을 바꾸면 새로운 지시 조합을 만들 수 있다.

하지만 해당 장면에 쟁반이 없거나 물체를 잡을 수 없다면 문법상 자연스러워도 실행이 어렵다.

<p class="callout">첫 전략도 장면을 조건으로 한다. 무작위 조합이나 장면 무시 생성으로 해석하지 않는다.</p>

##### 요점

언어적 다양성을 늘리는 것과 장면에서 실행 가능한 것은 별개의 조건이다.

##### 출처

Sec.3.3 · Task Augmentation · PDF p.11

##### 발표 메모

위 문장 예시는 보고서에 실린 실험 지시가 아니라 분해 축을 설명하기 위한 예이다. 논문은 factorized composition이 장면이 허용하는 시나리오가 적을 때 infeasible behavior를 낼 수 있다고 서술한다.

#### [S045] Skill-conditioned variation

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

원본 지시의 skill을 출발점으로 변형 범위를 정하지만, 두 전략의 결과는 겹칠 수 있다.

##### 본문

###### 원본 동작을 먼저 읽는다

<div class="flow">
<div class="node">원본 지시</div>
<div class="arrow">→</div>
<div class="node">skill 추출<br>pick·pour·push</div>
<div class="arrow">→</div>
<div class="node">변형 지시</div>
</div>

추출한 skill을 유지하며 대상·위치를 바꾸거나, 데이터셋의 사전 정의 skill set에서 다른 실행 가능한 skill로 바꾼다.

시작 장면과 원본 동작을 조건으로 실행 가능한 다양성을 유도하려는 설계다.

##### 보충

###### 전략 차이는 생성의 기준

<span class="label example">설명용 예시</span>

원본이 “컵을 집기”이면 pick을 유지하고 집을 대상을 바꿀 수 있다. 장면이 허용하면 다른 skill로 교체하는 경로도 있다.

대상만 바꾼 결과는 네 요소 재조합으로도 나올 수 있다. 따라서 두 방법을 **서로 겹치지 않는 출력 종류**로 나누면 안 된다.

##### 요점

Factorized는 요소 조합, skill-conditioned는 원본 동작을 기준으로 한 변형이다.

##### 출처

Sec.3.3 · PDF p.11; 질문노트 Q8

##### 발표 메모

저자는 두 전략을 complementary라고 부른다. 우리 설명은 전략의 조건화 방식과 생성 결과의 중첩을 구분한다. 원본 skill 유지가 항상 강제되는 것은 아니며 다른 skill 교체 경로가 명시되어 있다.

#### [S046] Task 생성의 미확인 제약

<!-- study-meta
layout: split
kind: question
-->

##### 한 문장

실행 가능한 지시를 목표로 하지만, 그 판단을 재현할 구체적 규칙은 공개 설명만으로 부족하다.

##### 본문

###### 원문에서 확인한 것

- 초기 장면을 VLM에 입력한다.
- 조작 맥락의 system prompt와 few-shot 예시를 사용한다.
- 원본 skill을 유지하거나 사전 정의한 skill set의 다른 skill을 선택한다.

이 설명은 “실행 가능한 변형을 유도한다”는 설계 의도를 알려준다.

##### 보충

###### 아직 확인되지 않은 것

- skill set 전체 목록과 장면별 후보 제한
- 실행 가능성의 판정 기준과 절차
- 실제 system prompt·few-shot 내용
- 실행 불가능한 후보를 강제로 배제하는 규칙

<p class="callout">후속 영상 검사와 초기 지시의 실행 가능성 판정은 서로 다른 문제다.</p>

##### 요점

명세의 빈칸은 질문으로 남기고, 별도의 보장 장치를 상상해 채우지 않는다.

##### 출처

Sec.3.3 · PDF p.11; App.B.3 · PDF p.42; 질문노트 Q8

##### 발표 메모

질문 슬라이드. 확인 범위 Sec3.3/AppB.3에는 기준·prompt·강제 제약의 상세가 없다. 이 모호함을 생성 모델의 실제 실패나 결함을 관측한 결과로 바꾸지 않는다. 영상 plausibility 선별이 의미상 실행 가능성과 관련될 수는 있으나 동일한 검증이라고 단정할 수 없다.

#### [S047] Scene augmentation: I2I에서 I2V로

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

처음 한 장의 장면을 편집하고, 그 변화를 새 영상 전체로 전파한다.

##### 본문

###### 어디를 바꾸는가?

FLUX.2-dev의 **image-to-image(I2I)** 편집으로 시작 프레임의 네 요소를 변형한다.

- 테이블의 외관
- 대상 물체의 정체·외형
- 조명
- 배경

편집에 Canny edge map을 조건으로 주어 장면 구조 보존을 유도한다.

##### 보충

###### 영상으로 이어지는 과정

<div class="sequence">
<div class="step">원본 시작 프레임</div>
<div class="step">I2I 편집 → 새로운 시작 장면</div>
<div class="step">편집한 장면 + 지시 → I2V 생성</div>
</div>

여기서 **I2V**는 한 이미지로부터 시간에 따라 변하는 영상을 만드는 단계다. 시작 프레임만 바뀌는 단순 이미지 증강과 구분한다.

##### 요점

장면 편집은 영상 생성의 출발 상태를 다양화한다.

##### 출처

Sec.3.3 · Scene Augmentation; Fig.5(c) · PDF p.11

##### 발표 메모

I2I는 초기 프레임을 바꾸고 I2V는 이를 동적 영상으로 확장한다. I2I와 V2V에서 물체 변경 허용 범위가 다르다. I2I 문단은 target object identity and appearance를 변형한다고 명시한다.

#### [S048] Canny edge 조건의 역할

<!-- study-meta
layout: split
kind: interpretation
-->

##### 한 문장

윤곽은 장면 구조를 유지할 단서지만, 물리적으로 가능한 동작의 증명은 아니다.

##### 본문

###### 색보다 구조를 조건으로

원문은 I2I 편집에 Canny edge map을 제공해 원래 장면 구조를 보존하고 그럴듯한 시작 상태를 유지하도록 유도한다.

영상 수준의 V2V 변환에도 edge 조건을 사용해 물체의 정체·형태와 움직임을 유지하며 질감·색을 바꾸려 한다.

<p class="callout">같은 edge 조건이라도 적용 단계와 허용하는 변형은 다르다.</p>

##### 보충

###### 윤곽으로 알 수 없는 것

<span class="label interpretation">설명을 위한 해석</span>

컵과 손의 윤곽이 비슷해도 깊이, 접촉, 무게, 가려진 면의 상태까지 확정되지 않는다. 비슷한 윤곽이 곧 안정적인 잡기를 뜻하지 않는다.

따라서 “구조 보존을 유도한다”와 “구조·물리 타당성을 보장한다”를 구분한다. 후속 필터도 필요하다.

##### 요점

Edge는 생성 조건이다. 실제 행동의 타당성을 보장하는 판정서는 아니다.

##### 출처

Sec.3.3 · PDF p.11; 물리 보장 한계는 설명을 위한 해석

##### 발표 메모

Canny 알고리즘 자체의 수학·threshold 절차를 별도 공식 근거 없이 추가하지 않는다. 원문이 보존을 목표로 기술한 사실과 우리가 지적하는 보장 범위의 한계를 표지로 구분한다.

#### [S049] V2V: 외형은 바꾸고 움직임은 유지

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

이미 만들어진 영상에 색·질감 변형을 주어 행동 라벨을 유지할 수 있는 다양성을 노린다.

##### 본문

###### Video-to-video의 목표

Cosmos-Transfer2.5-2B로 합성 영상의 외관을 변환한다. Canny edge map을 조건으로 물체의 정체·형태를 유지하며 **질감과 색**을 바꾼다.

원문은 motion dynamics를 보존함으로써 이미 주석한 action의 유효성을 유지하려는 방식이라고 설명한다.

##### 보충

###### 두 scene 변형 경로 비교

<div class="compare">
<div><strong>I2I → I2V</strong>
<p>시작 장면을 편집한 뒤 새 영상을 생성한다.</p></div>
<div><strong>V2V</strong>
<p>영상 수준의 외관을 변환하며 동작은 보존하려 한다.</p></div>
</div>

<p class="mini">V2V에서 움직임을 유지하려는 목표와 모든 샘플에서 라벨이 정확하다는 보장은 구분한다.</p>

##### 요점

V2V의 핵심은 새 동작 생성보다 기존 동작의 외관 다양화다.

##### 출처

Sec.3.3 · Scene Augmentation · PDF p.11

##### 발표 메모

“행동 유효성 유지”는 저자의 설계 설명이다. 본문은 I2I target identity 변형과 V2V identity/shape 유지의 범위를 다르게 명시한다. Figure5(c)는 V2V 전용 예시로 사용하지 않는다.

#### [S050] Figure 5: 무엇이 바뀐 영상인가?

<!-- study-meta
layout: figure
kind: fact
figure: fig-05.png
caption: Figure 5 · (a) 원본 (b) 지시 증강 (c) I2I 편집 후 I2V 생성
-->

##### 한 문장

세 행의 차이를 생성 경로와 연결하되, 그림에 없는 비교까지 읽어내지 않는다.

##### 본문

###### 세 행을 구분해 읽기

**(a) 원본:** 자체 수집 ALLEX의 컵라면 쌓기 시연이다.

**(b) Task 변형:** VLM이 생성한 지시로 동작을 다양화한 예다.

**(c) Scene 변형:** 시작 프레임 I2I 편집 후 I2V로 만든 예다.

##### 보충

<p class="callout">(c)를 V2V만의 결과나 두 scene 방법의 정량 비교로 해석하지 않는다.</p>

##### 요점

Figure 5는 생성 예시이고, 데이터 품질이나 증강별 효과의 분리 검증은 아니다.

##### 출처

Fig.5; Sec.3.3 · PDF p.11

##### 발표 메모

원문 캡션을 기준으로 (c)의 생성 경로를 정확히 명시한다. 예시 영상을 보고 전체 합성 집합의 품질을 정량적으로 단정하지 않는다. 개별 augmentation 효과는 이후 Table3의 통제 범위를 따로 설명한다.

## [P015] 합성 데이터 검증

<!-- slide-meta
layout: split
kind: fact
source_ids: S051, S052, S053, S054, S055
-->

### 한 문장

IDM의 추정 행동을 시뮬레이터에서 재생하고, 생성 영상의 움직임과 비교한다.

### 본문

#### 영상에서 행동으로

<div class="flow">
<div class="node">관측 쌍</div>
<div class="arrow">→</div>
<div class="node">IDM</div>
<div class="arrow">→</div>
<div class="node">추정 행동</div>
</div>

현재·미래 프레임에서 중간 행동을 추정해 pseudo-label을 만든다. 그 행동을 simulator에서 재생하면 비교용 rollout 영상이 생긴다.

별도 품질 VLM은 지시 불일치를 re-caption하고, 동작 plausibility를 평가해 선별한다.

### 보충

#### 움직임이 서로 맞는가?

두 clip을 frozen V-JEPA2로 인코딩하고 특징을 concat한다. 학습 가능한 query가 cross-attention으로 읽은 뒤 linear head가 일치를 판별한다.

실제 clip+GT 행동 rollout은 positive, 시간·episode가 어긋난 쌍은 negative다.

<p class="callout">필터 통과는 현실의 물리적 성공 보장이 아니다. 검사기의 정량 신뢰성은 추가 검증이 필요하다.</p>

### 요점

영상 품질과 영상–행동 정합성은 서로 다른 검증 대상이다.

### 출처

Sec.3.3 · PDF pp.11–12; App.B.3 · PDF p.42; 질문노트 Q2

### 발표 메모

Negative의 다른 episode는 동일 task instruction을 공유한다. 모델별 설정·필터 임계값 미기재와 오탐·미탐 문제는 상세 단위에 보존한다.

### 상세 공부 기록

#### [S051] IDM과 simulator rollout

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

Task 문장은 목표를 말하고, IDM은 두 관측 사이에 필요한 행동 시퀀스를 추정한다.

##### 본문

###### 영상에 없는 라벨을 추정

<div class="sequence">
<div class="step">현재·미래 프레임 쌍을 IDM에 입력</div>
<div class="step">중간 action 시퀀스를 flow matching으로 예측</div>
<div class="step">예측 action을 simulator에서 재생</div>
</div>

rollout은 언어 지시만으로 만든 영상이 아니라 **추정한 수치 행동을 실행한 참조 영상**이다.

##### 보충

###### IDM 구현과 라벨의 지위

0.1B DiT와 SigLIP-2 vision encoder를 사용한다. GR-1은 공개 사전학습 checkpoint, ALLEX는 자체 원격 조작 데이터로 처음부터 학습한다.

ALLEX 설정은 action horizon 20, batch 256, 60K gradient steps다.

<p class="callout">생성 영상의 행동은 ground truth가 아니라 pseudo-action label이다.</p>

##### 요점

IDM이 붙인 라벨도 추정치이므로, 생성 영상과의 움직임 일치를 다시 검사한다.

##### 출처

Sec.3.3 · PDF pp.10–12; App.B.3 · PDF p.42

##### 발표 메모

ALLEX IDM horizon $H+1=20$은 mid-training policy의 ALLEX chunk40이나 RECAP 생성40/실행20과 다른 설정이다. 문맥이 다른 horizon 수치를 하나로 합치지 않는다.

#### [S052] Video quality filtering

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

지시가 맞는지와 영상 동작이 그럴듯한지를 따로 보고, 필요한 경우 지시를 다시 쓴다.

##### 본문

###### 검사 1: instruction following

생성된 영상의 로봇 동작이 원래 생성 지시를 따르는지 VLM으로 판단한다.

지시에서 벗어났다면 **관찰된 실제 동작에 맞게 re-caption**한다. 이때 바뀌는 것은 영상의 언어 설명이다.

<p class="mini">지시 불일치 샘플을 모두 폐기한다고 단순화하면 re-caption 경로를 놓친다.</p>

##### 보충

###### 검사 2: trajectory plausibility

손의 접근 거리, 깊이, 공간 방향, 물체 상호작용 등을 보고 **1–5점**을 부여해 임계값보다 높은 영상만 남긴다.

부록은 Gemini API를 사용하며, 지시 검사는 균일 추출 16프레임, plausibility 검사는 8프레임을 입력한다고 명시한다.

<p class="callout">이 단계는 영상 품질 검사이며 행동 라벨 정합성 검사는 별도다.</p>

##### 요점

Re-caption은 설명을 고치고, plausibility 선별은 남길 영상을 고른다.

##### 출처

Sec.3.3 · PDF p.11; App.B.3 · PDF p.42

##### 발표 메모

원문은 사전 정의 threshold를 언급하지만 이 본문/부록에는 구체적인 cutoff 값이 없다. Gemini의 세부 버전을 임의로 붙이지 않는다. VLM 점수를 실제 물리 타당성의 정답으로 표현하지 않는다.

#### [S053] Motion-consistency classifier

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

두 영상을 직접 비교하는 대신, 고정된 영상 인코더의 특징 위에 작은 판별기를 학습한다.

##### 본문

###### 두 clip에서 하나의 일치 점수로

<div class="sequence">
<div class="step">생성 영상·simulator rollout → frozen V-JEPA2</div>
<div class="step">두 clip의 embedding을 이어 붙이기(concat)</div>
<div class="step">학습 가능한 query → 단일 cross-attention</div>
<div class="step">linear head → alignment logit → 선별 확률</div>
</div>

##### 보충

###### 무엇을 학습하는가?

영상 인코더는 고정하고, 가벼운 **attentive probe**를 학습한다. Query가 합쳐진 두 clip 특징을 참고해 움직임의 어긋남을 판별한다.

Binary cross-entropy, 16프레임·256×256·temporal stride 4, batch 32, AdamW, 학습률 $10^{-4}$를 사용한다.

<p class="mini">확률이 정한 임계값을 넘은 샘플만 남긴다. 임계값 수치는 명시되지 않는다.</p>

##### 요점

Concat 특징을 query가 읽는 구조이며, 두 영상의 단순 픽셀 차이 검사가 아니다.

##### 출처

Sec.3.3 · PDF p.12; App.B.3 · PDF p.42

##### 발표 메모

logit→probability는 이진 분류 설명을 위한 연결이다. 원문은 alignment logit과 alignment probability 선별을 함께 명시한다. 하나의 learnable query와 단일 cross-attention layer를 유지한다. V-JEPA2 자체를 이 데이터로 전부 fine-tune했다고 쓰지 않는다.

#### [S054] Classifier는 어떤 쌍으로 배우는가?

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

정답 행동을 재생한 쌍은 positive, 동작이 어긋난 쌍은 negative로 구성한다.

##### 본문

###### Positive pair: 정답 행동과 일치

<div class="flow">
<div class="node">실제 시연 clip</div>
<div class="arrow">↔</div>
<div class="node">그 clip의 GT action<br>simulator rollout</div>
</div>

실제 영상과 렌더 영상은 외관이 달라도, 같은 정답 행동에 대응하는 움직임을 갖는다.

<p class="mini">학습 positive를 “생성 영상과 IDM 예측”으로 바꾸어 설명하면 기준 자체가 흐려진다.</p>

##### 보충

###### Negative pair: 비슷하지만 어긋남

- **동일 episode:** 시간 창을 이동해 서로 다른 시점의 동작을 짝짓는다.
- **서로 다른 episode:** 동일한 task instruction을 가진 다른 시연의 clip을 짝짓는다.

같은 지시라도 손과 물체의 구체적인 움직임은 다를 수 있다. 언어 유사성만 보고 일치로 판정하지 않도록 한다.

##### 요점

학습 기준은 실제 시연의 GT 행동이고, 합성 샘플은 학습한 판별기로 선별한다.

##### 출처

Sec.3.3 · Motion-Consistency Filtering · PDF p.12

##### 발표 메모

“언어 유사성만 보지 않도록 한다”는 negative 구성의 교육적 해석이다. 원문은 두 종류 negative를 명시하지만 비율·전체 pair 수·오탐미탐률은 이 절에 없다.

#### [S055] 합성 모델과 검증 범위

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

생성기·IDM·품질 VLM·일관성 분류기는 서로 다른 오류를 다루는 구성요소다.

##### 본문

###### 무엇을 만들고 검사하는가?

- **영상 생성:** GR-1은 Cosmos-Predict2-14B, ALLEX는 Cosmos-Predict2.5-2B를 로봇 영상에 적응한다.
- **IDM:** 영상에서 pseudo-action을 추정한다.
- **Gemini:** 지시 일치·영상 plausibility를 평가한다.
- **V-JEPA2 probe:** 영상과 action rollout의 움직임 일치를 평가한다.

##### 보충

###### 확인된 설정과 남은 검증

GR-1 생성기는 공개 영상 3,027+92개로 LoRA rank32, 10K steps 학습한다. ALLEX 생성기는 자체·타 로봇 영상을 섞어 20K steps 전체 학습한다.

<p class="callout">구현 설정이 있다는 사실과 검사기가 신뢰할 만하다는 정량 근거는 다르다.</p>

오탐·미탐, 실제→합성 분포 차이, 필터별 기여는 추가 확인할 항목이다.

##### 요점

여러 모델의 검사를 통과했다는 사실을 현실에서의 성공 보장으로 바꾸지 않는다.

##### 출처

App.B.3 · PDF p.42; Sec.3.3 · PDF pp.10–12; 질문노트 Q2·Q8

##### 발표 메모

GR-1:93-frame432×768, batch4. ALLEX:ALLEX/OpenArm/ActionNet 2:1:1, 93-frame432×768, batch8, uniform full-episode sampling과16FPS consecutive random sampling. Re-caption용 Qwen3-VL8B 또는30B-A3B와 품질 검사 Gemini를 구분한다. 본문 학습 설정은 검증·재현 실행을 뜻하지 않는다.
