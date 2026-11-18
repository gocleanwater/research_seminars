# Training Data

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P106] Training Data

<!-- slide-meta
layout: section-title
kind: interpretation
chapter: Seminar
source_ids:
-->

### 한 문장

공개 실제 · 직접 시연 · 합성 데이터

### 본문

<div class="section-title-page" aria-hidden="true"></div>

### 보충



### 요점



### 출처

세미나 구성 · 섹션 구분

### 발표 메모

이제 학습에 사용하는 데이터의 종류와 합성 데이터를 만드는 과정을 보겠습니다.

### 상세 공부 기록



## [P013] 학습 데이터

<!-- slide-meta
layout: full
kind: fact
source_ids: S041, S043, S042
-->

### 한 문장

공개 시연으로 기본기를, 자체 시연으로 목표 로봇의 경험을, 합성으로 부족한 상황을 보완한다.

### 본문

<div class="data-role-grid">
<div><small>Public Real-World Data</small><h3>조작의 기본기</h3><div class="data-role-icon">여러 로봇의 실제 시연</div><p>다양한 몸체·장면·작업 경험</p><span>예: OXE · DROID 등</span></div>
<div><small>In-house Real-World Data</small><h3>목표 로봇과 새 기능</h3><div class="data-role-icon">ALLEX · Franka 자체 시연</div><p>몸체 적응 + 기억·물리 센싱</p><span>토크 · Franka 촉각 등</span></div>
<div><small>Synthetic Data</small><h3>수집하기 어려운 경험</h3><div class="data-role-icon">실제 시연 → 새로운 학습 쌍</div><p>작업 지시와 장면을 다양화</p><span>생성 영상 + 추정 행동 · 검증 후 사용</span></div>
</div>

### 보충



### 요점

합성 데이터는 특정 작업 전용이 아니라, 부족한 조작 상황을 늘리는 보완 수단이다.

### 출처

Sec.3–3.3 · PDF pp.9–12; Sec.4.1–4.2 · pp.12–13

### 발표 메모

모델의 구조를 봤으니, 이제 무엇으로 학습시키는지 보겠습니다. 보고서의 데이터는 공개 실제 데이터, 자체 실제 데이터, 합성 데이터로 나누어 볼 수 있습니다.

공개 실제 데이터는 여러 로봇이 이미 수행한 시연을 모은 것입니다. 다양한 몸체와 작업에서 공통으로 쓰이는 조작의 기본기를 배우는 재료입니다. 자체 실제 데이터는 ALLEX와 Franka로 직접 모은 경험입니다. 목표 로봇에 맞추고, 기억과 토크·촉각 같은 새 기능을 학습시키는 데 사용합니다.

합성 데이터는 직접 많이 모으기 어려운 경험을 늘리는 방법입니다. 실제 시연을 바탕으로 작업 지시와 장면을 바꾸고, 새 영상에 행동 라벨을 붙여 학습 쌍을 만듭니다. 따라서 특정 작업에만 쓰는 데이터라는 뜻은 아닙니다. 실제로 합성 GR-1 데이터는 Pre-training에, 합성 ALLEX 데이터는 Mid-training에도 들어갑니다.

여기까지 공개·자체 데이터의 역할을 짚었고, 다음부터는 합성 데이터를 어떻게 만들고 걸러서 사용하는지 따라가 보겠습니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

구조에서 데이터로 전환한다. 따옴표 설명은 데이터의 역할을 이해하기 위한 비유이며 성능을 독립 검증한 결과가 아니다. 원문은 실제/합성의 두 큰 범주로 소개하며 실제 데이터를 공개/자체로 나눠 설명한다. Figure 4는 세 공급원 전체가 아니라 합성 데이터의 파이프라인이다. 공개·자체 데이터의 소개는 이 장에서 마치고 다음 장에서 합성 데이터로 이어진다. 최대64 vision tokens 전처리는 S041에, 센서·원격 조작은 이 장의 S042 상세 기록에 보존한다.

#### 통합한 P033의 참고 — 발표 제외

공개 데이터는 인터넷에서 모은 일반 영상이 아니라 실제 로봇 조작 데이터다. 이 장의 기본기·컵 조작 예시는 이해를 위한 설명이며 별도 성능 실험을 뜻하지 않는다. OXE=Open-X-Embodiment, Galaxea=Galaxea Open-World, AgiBot=Agibot World, ActionNet=Fourier ActionNet, Everyday=Humanoid Everyday. 원문에 따르면 OXE는 20 embodiments에서 1M 이상 trajectories를 모은 원 데이터이며 curated mixture를 사용한다. DROID는 92K, Galaxea는100K, Agibot은 원 데이터1M 이상에서275K episodes를 샘플링한다. ActionNet은30K, Humanoid Everyday는10.3K trajectories다. 원 데이터의 총량과 이 논문에서 채택한 데이터 수를 같은 의미로 합산하지 않는다. 일반적인 trajectory 설명이 모든 데이터셋에 같은 센서·action format이 있다는 뜻은 아니다. 자체 데이터의 수집 목적과 센서 구성은 같은 장의 참고와 S042에 보존한다.

#### 통합한 P034의 참고 — 발표 제외

먼저 수집 목적을 설명한다. “목표 로봇에 적응하고, 물리 센싱 등 새로운 기능을 학습시키기 위해 직접 시연 데이터를 수집했습니다. Franka에서는 영상·행동과 촉각·토크를, ALLEX에서는 영상·행동과 전류 기반 토크 추정을 함께 기록합니다.” Sec.3.2는 embodiment-specific integration과 physical modality expansion을 명시한다. Sec.4.2는 자체 데이터가 새 memory·torque·Franka tactile 입력에 대한 유일한 supervision 공급원이라고 설명한다. 이는 memory에 별도의 정답 라벨 파일이 있다는 뜻으로 확대하지 않는다.

Franka·ALLEX라는 사용자 지정 이름을 사용한다. Fig.12(a)는 OpenArm이며 이 장의 자체 수집 설명 대상이 아니므로 (b)(c)만 원문 색·라벨 그대로 발췌했다. 메타 Quest는 Franka의 말단 자세를 지시한다. ALLEX에서는 Meta Quest가 머리·허리, Vive Trackers가 손목, Manus Pro 장갑이 손끝 위치를 기록하며 역기구학으로 팔·손가락 관절각을 구한다. 센서의 구체적 방식과 로봇 사양은 S042에 보존한다. 이 장 자체가 각 센서의 독립 성능 기여를 입증하는 실험은 아니다. 다음은 직접 수집 비용을 보완하는 합성 데이터다.

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

## [P072] 합성 데이터 생성

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids:
figure: fig-04.png
caption: Figure 4 · 위: 영상 생성·행동 라벨링 / 아래: 실행 결과와 비교해 선별
-->

### 한 문장

직접 모으기 어려운 조작 경험을, 실제 시연의 변형과 행동 라벨링으로 늘린다.

### 본문

<div class="synth-steps"><div><small>1 · 새 영상</small><h3>시연에서 출발</h3><p>시작 장면·지시를 바꿔<br>로봇 영상을 생성</p></div><div><small>2 · 행동 라벨</small><h3>IDM으로 행동 추정</h3><p>영상의 현재·미래 관측에서<br>실행할 행동 묶음을 추정</p></div><div><small>3 · 선별</small><h3>사용할 학습 쌍 선택</h3><p>영상의 타당성과<br>행동의 움직임 일치를 검사</p></div></div>

### 보충



### 요점

영상 생성 → 행동 라벨링 → 검증을 거쳐, 합성 영상·행동 쌍을 학습에 사용한다.

### 출처

Sec.3.3 · Fig.4 · PDF pp.10–12; App.B.3 · p.42

### 발표 메모

합성 데이터를 만드는 이유는 특수한 로봇의 시연을 대량으로 수집하기 어렵기 때문입니다. 보고서는 공개 GR-1 시연과 자체 ALLEX 시연을 바탕으로 경험을 늘립니다.

Figure 4의 위쪽을 먼저 보겠습니다. 실제 시연의 시작 장면과 작업 지시를 바탕으로 새로운 로봇 영상을 만듭니다. 이때 사용하는 영상 생성 모델도 로봇 시연으로 추가 학습해 준비합니다. 이 모델의 학습과, 나중에 이 데이터로 RLDX-1 정책을 학습하는 것은 서로 다른 과정입니다.

새 영상만으로는 로봇을 학습시키기 어렵습니다. 로봇이 어떻게 움직여야 하는지에 해당하는 행동 라벨이 필요하기 때문입니다. 그래서 IDM, 즉 inverse dynamics model이 영상의 현재와 미래 관측에서 행동 묶음을 추정합니다.

아래쪽은 검증 과정입니다. 영상이 그럴듯한지, 추정한 행동을 실제로 재생했을 때 영상과 움직임이 맞는지 확인합니다. 통과한 영상과 행동을 학습 쌍으로 사용합니다. 먼저 위쪽의 Task·Scene 변형부터 보겠습니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

#### 발표 대본

“합성 데이터를 만들 영상 생성 모델도 로봇 시연으로 먼저 학습합니다. 실제 로봇의 시점과 조작 동작을 학습시킨 뒤, 이 모델을 다음 Task·Scene Augmentation에 사용해 다양한 합성 영상을 만듭니다. 여기서 학습하는 대상은 영상 생성 모델이고, 행동을 실행할 RLDX-1 정책의 학습 절차는 뒤에서 따로 설명하겠습니다.”

#### 왜 추가 학습하는가?

저자는 범용 영상 모델만으로 로봇의 자기 시점과 조작 dynamics를 충분히 표현하기 어렵다고 설명한다. 로봇 시연 영상으로 적응시켜 합성 영상의 바탕을 준비한다. 별도의 성능 비교 수치를 이 문단에 없는 값으로 만들지 않는다.

#### 로봇별 기반 모델 — 기존14쪽의 상세

| 대상 | 기반 영상 생성 모델 |
| --- | --- |
| GR-1 | Cosmos-Predict2-14B |
| ALLEX | Cosmos-Predict2.5-2B |

ALLEX용 영상 모델에는 ALLEX·OpenArm·ActionNet 시연을2:1:1로 혼합한다. OpenArm은 평가뿐 아니라 ALLEX용 영상 생성 모델의 학습에도 사용된다. 이 비율을 RLDX-1 policy의 pre/mid-training 혼합 비율과 동일시하지 않는다.

#### 학습 설정 — 기존15쪽의 상세

| 설정 | GR-1 영상 모델 | ALLEX 영상 모델 |
| --- | --- | --- |
| 데이터 | ActionNet 3027 + NVIDIA 92개 영상 | ALLEX·OpenArm·ActionNet = 2:1:1 |
| 적응 방식 | LoRA · rank 32 | Full fine-tuning |
| 학습량 / batch | 10K steps / 4 | 20K steps / 8 |
| 영상 clip | 93 frames · 432×768 | 93 frames · 432×768 |
| Caption | 짧게·중간·길게 작성 후 하나 선택 | 같은 방식으로 길이가 다른 설명 선택 |

GR-1은 ActionNet3027개와 NVIDIA GR-1 공개영상92개를 사용한다. ALLEX도 같은3027개 ActionNet 영상을 자체 ALLEX/OpenArm 시연과 혼합한다.

GR-1 re-caption은 Qwen3-VL8B Instruct, ALLEX는8B 또는30B-A3B Instruct를 사용한다.

#### ALLEX의 시간 샘플링

- Uniform: 전체 episode에 걸쳐 균일하게93프레임을 추출한다.
- Random: 시작점을 무작위로 골라16FPS에서 연속93프레임을 추출한다.

전체 작업 흐름과 짧은 구간의 연속 움직임을 모두 보게 하려는 구성으로 읽을 수 있다는 것은 설명을 위한 직관이다. 이93프레임은 영상 생성 모델 학습의 clip 길이이며, RLDX-1 정책의 모든 입력을93프레임으로 바꾼다는 뜻이 아니다.

이 학습을 거친 영상 모델을 합성 데이터 제작에 사용하고, 생성된 영상의 수치 행동은 별도 IDM이 라벨링한다. 근거: App.B.3 · PDF p.42.

### 상세 공부 기록

## [P014] Task·Scene Augmentation

<!-- slide-meta
layout: figure balanced
kind: fact
source_ids: S044, S045, S046, S047, S048, S049, S050
figure: fig-05.png
caption: Figure 5 · (a) 원본 / (b) 작업 변형 / (c) 장면 변형
-->

### 한 문장

같은 시연에서 작업 지시와 장면을 바꿔, 새로운 조작 상황을 만든다.

### 본문

<div class="synth-variants"><div><small>Task · 무엇을 할까?</small><h3>작업 지시의 변형</h3><p>동작·물체·위치·손을 재조합<br>또는 원래 skill을 조건으로 변형</p></div><div><small>Scene · 어떤 장면일까?</small><h3>장면·외관의 변형</h3><p>시작 이미지 편집 → 영상 생성<br>생성 후 색·질감도 변형</p></div></div><p class="synth-guide">Canny edge map으로 원본 구조를 참고하며 장면·외관을 변형한다.</p>

### 보충



### 요점

Task는 할 일을, Scene은 보이는 상황을 다양화한다. 실행 가능한 시연인지도 검증한다.

### 출처

Sec.3.3 · Fig.5 · PDF p.11

### 발표 메모

같은 시작 장면과 지시로 영상을 만들면 원래 시연과 너무 비슷한 결과가 나올 수 있습니다. 그래서 두 가지를 바꿉니다. 무엇을 할지 정하는 Task와, 어떤 장면에서 할지 정하는 Scene입니다.

Figure 5의 첫 행은 원본 시연입니다.

두 번째 행은 작업 지시를 바꾼 예입니다. 지시를 동작·물체·놓을 위치·어느 손이라는 요소로 나누어 재조합하거나, 원래의 집기·따르기·밀기 같은 skill을 조건으로 실행 가능한 지시를 만듭니다. Figure 5를 다시 보시면, 원본의 신라면을 쌓는 동작이 두 번째 행에서는 책상 위 신라면을 트레이로 옮기는 동작으로 바뀐 것을 볼 수 있습니다.

세 번째 행은 장면을 바꾼 예입니다. 시작 이미지를 편집하고, 그 이미지에서 새 영상을 생성합니다. 테이블, 물체, 조명, 배경 같은 조건을 다양화할 수 있습니다.

이때 원본 장면의 윤곽을 추출한 Canny edge map을 함께 제공합니다. 생성 모델이 손과 물체의 배치 같은 장면 구조를 참고하면서 외관을 바꾸도록 돕는 안내선입니다.

Figure 5의 세 번째 행을 보시면 컵라면이 초록색 컵으로 바뀌었고, 조명의 세기와 책상의 질감·색깔도 달라진 것을 볼 수 있습니다.

이처럼 시작 장면을 바꾸는 방법에 더해, 생성된 영상의 동작을 유지하면서 색과 질감을 바꾸는 V2V 변형도 사용합니다. 이렇게 변형한 영상이 학습에 쓸 만큼 타당한지, 다음에 검증합니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

왼쪽 세 행을 원본·task 변형·scene 변형 순으로 읽는다. Canny edge 조건은 Scene Augmentation의 설명이다.

“장면을 다양화할 때 아무 제약 없이 새 이미지를 만들면, 손과 물체의 배치까지 크게 달라질 수 있습니다. 그래서 원본의 경계·윤곽을 나타내는 Canny edge map을 생성 모델의 조건으로 제공합니다. 컵이 어디에 있고 테이블 경계가 어디인지 같은 단서를 안내선으로 주면서, 외관을 바꿀 때도 대략적인 구조를 따라가도록 유도하는 것입니다. 이 안내선 비유는 생성 조건의 역할을 풀어 쓴 설명입니다.”

“이미지 수준에서는 FLUX.2-dev로 시작 프레임의 테이블 외관, 대상 물체의 정체·외형, 조명, 배경을 바꿉니다. 이때 edge 조건으로 원래 장면 구조를 참고하게 하고, 편집한 시작 이미지에서 I2V로 새 영상을 생성합니다. Fig.5(c)가 이 I2I→I2V 경로의 예시입니다. 영상 수준의 V2V에서는 다시 edge 조건을 사용해 물체의 정체·형태와 움직임을 유지하면서 색·질감을 바꾸려 합니다. 두 단계가 허용하는 변형 범위는 다릅니다.”

윤곽은 생성 모델이 참고하는 조건이며 위치·접촉·물리 타당성을 정확히 보장하는 규칙으로 설명하지 않는다. Fig.5(c)를 V2V만의 결과로 소개하지 않는다. 다음 장에서 생성 영상의 행동 라벨과 검증으로 넘어간다.

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
layout: full
kind: fact
source_ids: S055, S051, S052, S053
-->

### 한 문장

영상이 타당한지 먼저 확인하고, 추정 행동을 재생한 결과와 움직임을 비교한다.

### 본문

<div class="synth-filter-grid"><div class="synth-quality"><small>1 · 영상 품질</small><h3>영상 자체의 타당성</h3><p>지시와 맞는 행동인가?</p><p>거리·접촉·움직임이<br>물리적으로 그럴듯한가?</p><div class="synth-quality-pass">통과한 영상<br>→ 행동 일관성 검사</div></div><div class="synth-motion"><small>2 · 행동 일관성</small><div class="synth-replay"><div><b>A · 합성 영상</b><span>검증할 동작</span></div><i>→</i><div><b>IDM</b><span>행동 라벨 추정</span></div><i>→</i><div><b>Simulator</b><span>추정 행동 실행</span></div><i>→</i><div><b>B · 실행 영상</b><span>Rollout 결과</span></div></div><div class="synth-compare"><strong>A와 B의 움직임 비교</strong><span>추정한 행동이 영상 속 동작을 재현하는가?</span></div><div class="synth-decisions"><div>일치 높음<br><b>영상 + 행동을 사용</b></div><div>일치 낮음<br><b>해당 쌍 제외</b></div></div></div></div>

### 보충



### 요점

보기 좋은 영상인지와, 그 행동으로 같은 움직임을 만들 수 있는지는 따로 확인한다.

### 출처

Sec.3.3 · PDF pp.11–12; Fig.4 · p.10

### 발표 메모

생성된 영상과 IDM의 행동 라벨을 바로 정답으로 쓰지는 않습니다. 두 가지를 확인합니다.

첫 번째는 영상 품질입니다. VLM으로 지시와 실제 영상의 행동이 맞는지, 손의 접근 거리나 물체 접촉이 그럴듯한지 봅니다. 지시와 다르게 움직였으면 관찰된 행동에 맞춰 설명을 고치고, 움직임의 타당성 기준을 통과한 영상을 남깁니다.

두 번째는 행동 일관성입니다. 오른쪽의 A는 합성 영상입니다. IDM이 이 영상에서 행동을 추정하고, 그 행동을 시뮬레이터에서 실행하면 B라는 rollout 영상이 나옵니다. Rollout은 추정 행동을 실행해 얻은 결과 영상입니다.

이제 A와 B의 움직임이 맞는지 비교합니다. 영상은 그럴듯해도 행동 라벨이 틀리면, 같은 동작이 재현되지 않을 수 있습니다. 움직임 일치도가 높은 영상·행동 쌍만 학습에 사용합니다. 다음에는 이 일치 판정 기준을 어떻게 학습하는지 보겠습니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

#### 발표 도입 — 검사하는 것은 두 가지

“합성 데이터 검증은 영상 자체의 품질과, 영상에 붙인 행동 라벨이 맞는지를 확인하는 과정입니다. 먼저 영상이 지시와 맞고 움직임이 그럴듯한지 보고, 다음으로 그림처럼 IDM의 추정 행동을 실행한 rollout 영상과 원래 합성 영상을 비교합니다.”

#### 영상 품질 검사 — 기존 영상 품질 페이지 통합

“생성에 사용한 지시와 영상 속 실제 동작이 맞는지 검사용 VLM으로 확인합니다. 지시에서 벗어났다면 관찰된 동작에 맞게 설명을 다시 붙입니다. 이것이 re-caption입니다. 어긋난 영상을 모두 폐기한다는 뜻은 아닙니다.”

“또 손의 접근 거리·깊이·방향과 물체 상호작용을 보고, 동작의 그럴듯함인 plausibility를1–5점으로 평가해 기준을 넘는 영상을 남깁니다. 이때 Gemini API를 사용하며 지시 일치 검사는 균일 추출16프레임, plausibility 검사는8프레임을 입력합니다. 이것은 영상 자체의 품질 검사이고, 수치 행동 라벨이 맞는지는 아래 흐름으로 따로 확인합니다.”

#### A 합성 영상 → IDM → 추정 행동

“합성 영상에는 정답 행동 값이 주어져 있지 않습니다. 그래서 현재·미래 관측 쌍을 IDM에 넣어 그 사이의 action sequence를 추정합니다. 여기서 action은 task라는 언어 지시가 아니라 로봇 제어에 쓰이는 수치 값입니다. 이 추정값을 pseudo-action label로 영상에 붙입니다.”

“IDM은 SigLIP-2 vision encoder와0.1B DiT를 사용하고 flow matching으로 중간 행동을 예측합니다. GR-1은 공개 사전학습 checkpoint를 쓰고, ALLEX는 자체 원격 조작 데이터로 처음부터 학습합니다. ALLEX IDM의 설정은 horizon20·batch256·60K steps입니다. 이20을 RLDX-1 정책의40개 생성/20개 실행과 같은 설정으로 섞으면 안 됩니다. IDM은 라벨을 붙이는 별도 모델입니다.”

#### Simulator → B Rollout 영상

“추정한 행동을 시뮬레이터에서 실제로 실행하고 렌더링하면, 그림의 B rollout 영상이 생깁니다. Rollout은 언어 지시만으로 새로 생성한 영상도, 추정 행동 값 자체도 아닙니다. 그 수치 행동을 실행한 결과 영상입니다.”

“그림에서 A는 원래 합성 영상이고, B는 IDM 행동을 실행한 영상입니다. 이 두 영상의 움직임이 잘 맞는다면, 추정 행동이 원래 영상의 동작을 설명하는지 판단할 수 있습니다.”

#### A·B 비교 — 기존 움직임 일치 검사 페이지 통합

“두 영상은 같은 frozen V-JEPA2 encoder로 특징을 뽑습니다. 인코더는 고정하고, 그 위의 작은 판정기인 attentive probe를 학습합니다. 픽셀을 직접 빼서 비교하는 방식은 아닙니다.”

“영상 A와 B의 특징을 토큰 방향으로 concat하고, 학습 가능한 query가 단일 cross-attention으로 그 특징을 읽습니다. Concat은 두 영상의 정보를 이어 배치하는 것이고, cross-attention은 query가 그 자료를 읽는 계산입니다. 그 뒤 linear head가 움직임 일치 logit을 내고, 일치 확률이 정한 기준을 넘으면 합성 영상과 추정 행동 쌍을 남깁니다. 낮으면 그 쌍을 제외합니다.”

#### 실제 시연을 이용한 판정기 학습으로 연결

“지금 설명한 합성 영상·추정 행동 쌍은 이미 학습한 판정기가 검사하는 대상입니다. 판정기를 어떻게 학습하는지는 다음 장에서 실제 시연과 정답 행동의 rollout, 그리고 어긋나는 쌍을 이용해 설명하겠습니다.”

발표자 참고: probe 설정은16프레임·256×256·temporal stride4·binary cross-entropy·batch32·AdamW·학습률 $10^{-4}$다. 인코더 전체를 fine-tuning하는 것이 아니라 가벼운 판정기를 학습한다. Gemini의 세부 모델 버전·판정 임계값·시뮬레이터 초기 상태 복원 절차를 원문에 없는 값으로 추가하지 않는다. 높은 일치 확률은 학습 쌍을 선별하는 기준이며 현실 로봇의 성공 보장으로 확대하지 않는다. 그림은 원문의 처리 흐름을 읽기 위한 재도식이다. 출처: Fig.4 · PDF p.10; Sec.3.3 · pp.10–12; App.B.3 · p.42.

### 상세 공부 기록

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

## [P047] 움직임 일치 검사기

<!-- slide-meta
layout: full
kind: fact
source_ids: S054
-->

### 한 문장

합성 영상과 IDM action을 재생한 rollout 영상의 움직임이 일치하는지 판정한다.

### 본문

<div class="pair-learning-grid"><div><small>Positive · 움직임 일치</small><h3>같은 시연의 정답 행동</h3><p>실제 시연 영상</p><span class="pair-link">↕ 움직임 대응</span><p>그 시연의 정답 행동을<br>재생한 rollout 영상</p></div><div><small>Negative · 움직임 불일치</small><h3>대응을 어긋나게 구성</h3><p>시간 구간을 어긋나게 짝짓기</p><span class="pair-link">또는</span><p>같은 작업 지시를 가진<br>다른 episode와 짝짓기</p></div></div><div class="training-mini-flow"><span>실제 시연으로 판정기 학습</span><b>→</b><span>합성 영상·추정 행동 쌍 선별</span></div>

### 보충



### 요점

비교 대상: 합성 영상 ↔ IDM action의 simulator rollout · 이 판단 기준은 실제 시연으로 학습

### 출처

Sec.3.3 · Motion-Consistency Filtering · PDF p.12

### 발표 메모

움직임 일치 검사기는 합성 영상과, 그 영상에서 IDM이 추정한 action을 시뮬레이터에서 실행해 만든 rollout 영상의 움직임을 비교하는 모델입니다.

이 검사기의 판단 기준은 실제 시연과 그 시연의 정답 action을 이용해 학습합니다.

왼쪽은 일치하는 쌍입니다. 실제 시연 영상과, 그 시연의 정답 행동을 시뮬레이터에서 재생한 rollout 영상을 짝짓습니다. 실제와 시뮬레이션의 외관은 달라도 같은 행동에 대응하는 움직임을 갖습니다.

오른쪽은 어긋나는 쌍입니다. 같은 episode에서 시간 구간을 밀어 짝짓거나, 같은 작업 지시를 가진 다른 episode와 짝짓습니다. 작업 이름이 같아도 손과 물체가 움직이는 구체적인 시점과 경로는 다를 수 있다는 점을 배우게 합니다.

영상 특징을 만드는 V-JEPA2는 고정하고, 그 위의 작은 판정기를 학습합니다. 이렇게 실제 시연으로 배운 기준을 앞의 합성 영상·IDM 행동 쌍에 적용합니다. 여기까지가 학습 데이터를 만드는 과정이고, 이제 이 데이터를 사용해 RLDX-1을 어떻게 학습시키는지 보겠습니다.

#### 기존 상세 참고 — 발표에서 그대로 읽지 않음

학습positive는실제clip+그clip의GT-action simulator rollout이다. 합성clip+IDM-action pair는학습된classifier가검사할대상이며정답positive로자동간주하지않는다. Negative는동일episode시간이동또는동일task의다른episode를쓴다. 정확한양/음성pair수/비율/threshold/오탐미탐률은보고서의명시범위를넘어추가하지않는다. 기존S054를그대로보존하고본문에서는입력유래와기준을먼저설명한다.

### 상세 공부 기록

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
