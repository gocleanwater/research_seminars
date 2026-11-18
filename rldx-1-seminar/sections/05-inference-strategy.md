# Inference Strategy

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P099] Part 2

<!-- slide-meta
layout: boundary
kind: interpretation
chapter: Seminar
source_ids:
-->

### 한 문장

추론·실험·분석

### 본문

<div class="part-boundary-visual"><p>추론 최적화 → 성능 평가 → 설계 분석</p><div><a href="#P097">Part 1로 이동 →</a><a href="#S001">전체 목차</a></div></div>

### 보충

### 요점

### 출처

세미나 구성 · Part 2

### 발표 메모

Part 2에서는 먼저 Part 1을 세 장으로 짧게 정리한 뒤, 추론 최적화와 성능 평가, 설계 분석을 살펴보겠습니다.

### 상세 공부 기록

## [P101] Part 1 한눈에 보기

<!-- slide-meta
layout: overview
kind: interpretation
chapter: Part 1 Recap
source_ids: S116, S117
-->

### 한 문장

① 전체 구조 · 영상 관측과 언어 지시에서 미래 action chunk까지

### 본문



### 보충



### 요점

움직임을 읽고 → 상황·지시를 이해하고 → 과거를 참고해 → 다음 action을 생성한다.

### 출처

Part 1 요약 · Fig.2 PDF p.5 · Sec.2 PDF pp.6–9

### 발표 메모

> 조작: 이 장은 Figure 2의 6개 화면 상태를 →/←로 넘기며 설명한다.

**화면 1/6 · RLDX-1 전체 구조**

먼저 Part 1을 빠르게 요약하겠습니다. Figure 2는 RLDX-1의 전체 구조입니다.

**화면 2/6 · Motion Module**

왼쪽 위의 Motion Module은 영상의 프레임 사이 변화를 읽어, 시각 특징에 움직임 정보를 더합니다.

**화면 3/6 · VLM**

다음은 VLM입니다. 앞에서 얻은 시각 정보와 언어 지시를 함께 이해하고, 행동 생성에 필요한 특징을 만듭니다.

**화면 4/6 · Memory Module**

다음은 Memory Module입니다. 이전에 얻은 특징을 저장해 두었다가 현재 특징과 함께 읽습니다. 지금 화면에 보이지 않는 과거의 정보도 행동을 정할 때 활용하는 것입니다.

**화면 5/6 · MSAT**

오른쪽의 MSAT는 이 특징과 로봇 상태, 물리 신호를 참고해 행동 후보를 어느 방향으로 얼마나 바꿀지 나타내는 변화율을 예측합니다. 학습할 때는 예측 변화율을 정답 변화율에 맞추는 flow matching을 사용합니다. 추론할 때는 노이즈에서 출발해 예측한 변화율로 후보를 여러 번 다듬습니다. 이 denoising 과정을 거쳐 미래 action chunk를 얻습니다.

**화면 6/6 · 전체 흐름 정리**

즉, 장면과 지시에 대한 이해에 움직임과 과거 경험을 더해 다음 행동을 만드는 구조입니다. 이어서 이 모델에 사용한 데이터와 학습 단계를 짧게 정리하겠습니다.

### 상세 공부 기록
#### [S116] Related Work의 세 흐름

<!-- study-meta
layout: split
kind: authors
-->

##### 한 문장

저자는 VLA·영상 합성·기능별 연구를 하나의 실용 시스템으로 통합한 점을 강조한다.

##### 본문

###### VLA의 행동 생성

VLM을 상위 계획기로 쓰는 modular 접근에서 이산 action token 또는 flow action decoder를 쓰는 end-to-end VLA로 이어지는 흐름을 설명한다.

###### 합성 데이터

Simulation rollout뿐 아니라 생성 영상에 IDM으로 행동 라벨을 붙이는 흐름을 검토한다. RLDX-1은 ALLEX의 따르기·전구 같은 구체적 조작으로 확장한다고 주장한다.

##### 보충

###### 세 기능의 기존 연구

Multi-frame·시간 압축, 과거 특징 memory queue, torque·촉각 및 복수 물리 신호 연구를 연결한다.

<span class="label authors">차별점 주장</span> 개별 기능을 넘어 움직임·기억·물리 센싱을 통합 policy로 다루고 합성 데이터·학습·실행 최적화를 함께 설계한다.

이는 저자의 연구 위치 설명이다. 관련 연구를 모두 재현했거나 최초성을 검증했다는 뜻은 아니다.

##### 요점

여러 기능을 실제로 연결한 시스템 기여로 읽는다.

##### 출처

Sec.7 Related Work · PDF p.27

##### 발표 메모

본 slide는 보고서의 Related Work를 정리한 것으로 현재 SOTA나 전 분야 최신 계보를 새로 검색해 주장하는 것이 아니다. 합성 영상 자체에 torque가 없어도 torque-annotated real data와 함께 쓸 때 유용했다는 저자 주장은 결측 modality 처리와 관련된다. 통합 architecture의 주장과 기능별 benchmark에서는 relevant module only였다는 실험 조건을 함께 유지한다.

#### [S117] Conclusion과 검증된 범위

<!-- study-meta
layout: split
kind: interpretation
-->

##### 한 문장

기능 확장·합성 데이터·3단계 학습·추론 최적화를 결합한 시스템이 성과를 보였다.

##### 본문

###### 원문이 제시한 기여

언어 조건 행동 생성에 motion·memory·physical sensing을 통합하고 합성 데이터·pre/mid/post-training·실행 최적화를 연결했다.

Table 1의 여러 benchmark와 OpenArm에서 비교 모델보다 높은 보고값을 얻었다. ALLEX·Franka 기능별 과제와 전구 RECAP에서도 개선이 관측됐다.

##### 보충

###### 성과를 정확히 전달하려면

ALLEX “약 90%”는 86.8의 혼합 지표다. RC365 복합 과제·Franka 접촉 조작에는 낮은 절대 성공률이 남는다.

각 모듈의 독립 기여·세 기능 동시 효과·평가 불확실성·end-to-end tail latency는 더 확인해야 한다.

<span class="label interpretation">우리의 결론</span> 실용 통합의 유망한 결과와 재현·인과 분해의 남은 과제를 함께 보존한다.

##### 요점

구체적인 조건에서 확인된 시스템 성과와 아직 열린 검증을 구분한다.

##### 출처

Sec.8 · PDF p.28; Sec.6 · PDF pp.17–26; App.G · PDF pp.48–55

##### 발표 메모

Conclusion의 ALLEX around90 vs frontier around40은 RLDX86.8과π0.5 39.1/N1.6 44.8의 혼합 평균에 연결된다. 이를 완전 성공90%로 번역하지 않는다. Simulation 우위는 benchmark별 fine-tuning 뒤의 full recipe 비교이며 zero-shot all tasks가 아니다. 물리 입력과 future trajectory 보조 목표의 기여도 별도로 분해해야 한다. Q11–13 및 Table9의 집계 불일치는 곧 모델 결함이라고 해석하지 않는다.

### 그림 설명 카드

#### [overall] RLDX-1 전체 구조

##### 핵심

① 전체 구조 · Figure 2의 모듈을 순서대로 따라간다.

##### 화면

영상 관측과 언어 지시에서 미래 action chunk까지 이어지는 경로를 봅니다.

##### 대본

먼저 Part 1을 빠르게 요약하겠습니다. Figure 2는 RLDX-1의 전체 구조입니다.

##### 요점

전체 그림 → Motion Module → VLM → Memory Module → MSAT

#### [motion] Motion Module

##### 핵심

영상의 프레임 사이 변화를 읽어 움직임 정보를 더한다.

##### 화면

관측 프레임의 변화를 읽고, 시각 특징에 **움직임 정보**를 더합니다.

##### 대본

왼쪽 위의 Motion Module은 영상의 프레임 사이 변화를 읽어, 시각 특징에 움직임 정보를 더합니다.

##### 요점

Motion Module · 시각 특징에 움직임 정보를 더한다.

#### [vlm] VLM

##### 핵심

시각 정보와 언어 지시를 함께 이해한다.

##### 화면

시각 정보와 지시를 함께 읽어, **행동 생성에 필요한 특징**을 만듭니다.

##### 대본

다음은 VLM입니다. 앞에서 얻은 시각 정보와 언어 지시를 함께 이해하고, 행동 생성에 필요한 특징을 만듭니다.

##### 요점

VLM · 상황과 지시를 이해해 행동 생성에 쓸 정보를 만든다.

#### [memory] Memory Module

##### 핵심

이전 특징을 저장하고, 현재 판단에 과거 정보를 활용한다.

##### 화면

이전에 얻은 특징을 저장해 두었다가, **현재 특징과 함께 읽습니다.**

##### 대본

다음은 Memory Module입니다. 이전에 얻은 특징을 저장해 두었다가 현재 특징과 함께 읽습니다. 지금 화면에 보이지 않는 과거의 정보도 행동을 정할 때 활용하는 것입니다.

##### 요점

Memory Module · 과거의 정보를 현재 행동에 연결한다.

#### [msat] MSAT

##### 핵심

후보를 바꿀 변화율을 예측하고, 노이즈에서 action chunk를 만든다.

##### 화면

**학습:** 예측 변화율을 정답 변화율에 맞춥니다.

**추론:** 노이즈 후보를 denoising하며 미래 action chunk를 얻습니다.

##### 대본

오른쪽의 MSAT는 이 특징과 로봇 상태, 물리 신호를 참고해 행동 후보를 어느 방향으로 얼마나 바꿀지 나타내는 변화율을 예측합니다. 학습할 때는 예측 변화율을 정답 변화율에 맞추는 flow matching을 사용합니다. 추론할 때는 노이즈에서 출발해 예측한 변화율로 후보를 여러 번 다듬습니다. 이 denoising 과정을 거쳐 미래 action chunk를 얻습니다.

##### 요점

MSAT · 변화율을 학습하고, denoising으로 미래 action chunk를 생성한다.

#### [return] 전체 흐름 정리

##### 핵심

장면의 이해에 움직임과 기억을 더해 다음 행동을 만든다.

##### 화면

장면·지시의 이해와 과거 경험을 조건으로, 다음 행동을 생성합니다.

##### 대본

즉, 장면과 지시에 대한 이해에 움직임과 과거 경험을 더해 다음 행동을 만드는 구조입니다. 이어서 이 모델에 사용한 데이터와 학습 단계를 짧게 정리하겠습니다.

##### 요점

움직임을 읽고 → 상황·지시를 이해하고 → 과거를 참고해 → 다음 action을 생성한다.

## [P102] Part 1 한눈에 보기

<!-- slide-meta
layout: full
kind: interpretation
chapter: Part 1 Recap
source_ids:
-->

### 한 문장

② 학습 데이터 · 서로 다른 세 종류의 경험을 함께 활용한다.

### 본문

<div class="flow recap-data"><div class="node"><h3>Public Real-World</h3><p>여러 로봇의 공개 시연</p><p><strong>조작의 기본기</strong>를<br>다양한 몸체·작업에서 학습</p></div><div class="node"><h3>In-house Real-World</h3><p>목표 로봇으로 직접 모은 시연</p><p><strong>로봇의 특성과 새 입력</strong>에<br>맞춰 학습</p></div><div class="node"><h3>Synthetic</h3><p>실제 시연을 보완하는 합성 경험</p><p><strong>직접 모으기 어려운 상황</strong>을<br>늘려 경험의 범위를 확장</p></div></div>

### 보충



### 요점

여러 로봇의 기본기, 목표 로봇의 특성, 더 다양한 경험을 서로 보완한다.

### 출처

Part 1 요약 · Sec.3 PDF pp.9–12

### 발표 메모

학습 데이터는 세 종류입니다.

Public Real-World Data는 여러 로봇의 공개 시연입니다. 다양한 로봇과 작업에서 공통으로 쓰이는 조작의 기본기를 배우는 재료입니다.

In-house Real-World Data는 ALLEX와 Franka로 직접 모은 시연입니다. 목표 로봇의 몸체와 제어에 맞추고, memory나 물리 신호 같은 새 입력을 활용하도록 학습하는 데 사용합니다.

Synthetic Data는 실제 시연을 보완하는 합성 경험입니다. 직접 많이 모으기 어려운 상황을 늘려 더 다양한 조작 경험을 제공합니다.

### 상세 공부 기록

## [P103] Part 1 한눈에 보기

<!-- slide-meta
layout: full
kind: interpretation
chapter: Part 1 Recap
source_ids:
-->

### 한 문장

③ 학습 단계 · 기본기 → 로봇 적응 → 작업 적응

### 본문

<div class="learning-pipeline"><div><small>기본기</small><h3>Pre-training</h3><p>여러 로봇의 경험으로<br>범용 policy 학습</p></div><b>→</b><div><small>로봇 적응</small><h3>Mid-training</h3><p>ALLEX·Franka에 맞추기<br>움직임·기억·물리 센싱 추가</p></div><b>→</b><div><small>작업 적응</small><h3>Post-training</h3><p>목표 작업의 시연으로 IL<br>필요한 경우 RL로 보완</p></div></div>

### 보충



### 요점

기본기를 배우고 → 로봇에 맞추고 → 수행할 작업에 맞춘다.

### 출처

Part 1 요약 · Sec.4 PDF pp.12–14

### 발표 메모

학습도 세 단계로 진행합니다.

Pre-training에서는 여러 로봇의 경험으로 조작의 기본기를 배우고 범용 policy를 만듭니다. Mid-training에서는 이를 ALLEX와 Franka에 맞추면서 움직임·기억·물리 센싱 기능을 더합니다.

Post-training에서는 실제로 수행할 목표 작업의 시연으로 policy를 학습합니다. 일부 어려운 작업에는 RL을 더해 개선합니다.

기본기를 배우고, 로봇에 맞추고, 마지막으로 작업에 맞추는 흐름입니다.

### 상세 공부 기록

## [P108] Inference Strategy

<!-- slide-meta
layout: section-title
kind: interpretation
chapter: Seminar
source_ids:
-->

### 한 문장

변하는 환경에 빠르게 대응하기 위한 추론 최적화

### 본문

<div class="section-title-page" aria-hidden="true"></div>

### 보충



### 요점



### 출처

세미나 구성 · 섹션 구분

### 발표 메모

Part 1 요약을 마쳤으니, 이제 본격적으로 Part 2를 시작하겠습니다.

실제 로봇은 관측하고 계산하고 움직이는 동안에도 주변 상황이 변합니다. 계산이 오래 걸릴수록 관측 당시의 상황과 실행 시점의 상황이 달라질 수 있으므로 추론 지연을 줄이는 것이 중요합니다.

이러한 추론 지연을 줄이기 위해 CUDA Graph와 Kernel Fusion, 두 가지 최적화 방법을 살펴보겠습니다.

### 상세 공부 기록



## [P020] CUDA Graph

<!-- slide-meta
layout: inference
kind: fact
source_ids: S072, S073, S074, S075
-->

### 한 문장

고정된 설정의 준비값을 미리 계산해 재사용하고, 반복되는 graph launch 부담을 줄인다.

### 본문

### 보충



### 요점

Graph는 GPU 작업을 묶는 실행 계획이다. 영상에 따라 달라지는 계산은 매번 수행한다.

### 출처

Sec.5.1 · Fig.9 · PDF pp.15–16; 공부 기록 S074–S075

### 발표 메모

**화면 1/2 · 설정 고정과 한 graph로 통합**

학습할 때는 입력 데이터의 구성에 따라 Attention에 필요한 설정이 달라질 수 있습니다. 반면 배포할 때는 정해진 입력 구성으로 추론을 반복하므로, 이 설정을 고정할 수 있습니다. 그러면 같은 준비값을 매번 다시 계산할 필요가 없습니다.

저자들은 추론할 때마다 하던 준비 계산을 미리 해 두고 재사용하도록 했습니다. 이렇게 하면 나뉘어 있던 GPU 작업을 하나의 CUDA Graph로 묶을 수 있고, 여러 번 launch할 때마다 드는 시간을 줄일 수 있습니다.

**화면 2/2 · CUDA Graph 실행 비교**

Figure 9의 위쪽을 보면 Graph 1을 launch해서 A와 B를 실행하고, C와 D를 실행하려면 Graph 2를 다시 launch합니다. 아래쪽은 A부터 D까지 하나의 graph로 묶어 한 번만 launch합니다. 오른쪽 Speed Up이 이렇게 반복되는 launch 부담을 줄여 얻은 시간 차이입니다.

### 상세 공부 기록

#### [S072] 관측부터 실행까지의 지연

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

추론 중에도 장면은 움직이므로, 늦은 행동은 오래된 관측에 대한 응답이 된다.

##### 본문

###### 닫힌 고리에 생기는 시간 차

<div class="sequence">
<div class="step">장면 관측</div>
<div class="step">모델 추론</div>
<div class="step">모터 행동 실행</div>
<div class="step">바뀐 장면을 다시 관측</div>
</div>

각 단계의 시간이 더해져 관측 시점과 행동 실행 시점 사이에 지연이 생긴다.

##### 보충

###### 동적 환경에서 중요한 이유

<span class="label example">설명용 예시</span>

움직이는 물체를 보고 도달 위치를 결정해도, 실행할 때 물체는 이미 다른 곳에 있을 수 있다. 지연이 길수록 관측 상태와 현재 상태의 차이가 커질 수 있다.

저자는 **graph capture**로 실행 호출 비용을 줄이고, **kernel 최적화**로 계산·데이터 이동을 개선한다.

<p class="mini">정책 추론 시간과 전체 센서–모터 지연은 같은 측정값이 아니다.</p>

##### 요점

추론 최적화는 같은 관측에 더 빨리 응답하기 위한 시스템 설계다.

##### 출처

Sec.5 · PDF p.15

##### 발표 메모

Table 4의 p50 policy latency에서 전체 제어 지연이나 제어 주기를 계산해 확정하지 않는다. 동적 환경 예시는 본문의 동기를 풀어 쓴 것이다.

#### [S073] 계산 그래프·kernel·launch

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

무슨 연산을 연결할지, GPU에서 무엇을 실행할지, 어떻게 호출할지를 구분한다.

##### 본문

###### 세 층위의 용어

<div class="sequence">
<div class="step"><strong>계산 그래프:</strong> 연산과 tensor 의존 관계</div>
<div class="step"><strong>Kernel:</strong> GPU에서 실행할 작업 코드</div>
<div class="step"><strong>Launch:</strong> kernel이나 포착한 graph 실행을 제출하는 호출</div>
</div>

연산이 빠르더라도 수백 개 호출이 누적되면 지연의 큰 부분을 차지할 수 있다.

##### 보충

###### RLDX-1에서 관찰한 비용

저자는 PyTorch eager가 연산별로 kernel을 호출하고, Torch Compile도 forward를 여러 subgraph로 나누어 호출 overhead를 완전히 없애지 못한다고 보고한다.

최적화 목표는 연산의 의미를 바꾸는 것이 아니라, forward를 하나의 CUDA Graph로 포착해 반복 실행하는 것이다.

<p class="mini">그래프의 노드 수와 실제 kernel 수가 항상 일대일이라는 뜻은 아니다.</p>

##### 요점

연산 자체의 비용과 GPU에 일을 보내는 비용을 분리하면 최적화의 목표가 보인다.

##### 출처

Sec.5.1 · PDF pp.15–16; 용어 구분은 설명을 위한 풀이

##### 발표 메모

Graph capture와 kernel fusion을 동일시하지 않는다. CUDA Graph 하나에 여러 kernel이 들어갈 수 있다. Overhead 제거는 저자의 서술이며 전체 시스템의 모든 host 비용이 0임을 뜻하지 않는다.

#### [S074] 고정 RoPE·mask 설정은 미리 계산

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

배포 설정에서 변하지 않는 준비 계산을 forward 밖으로 옮긴다.

##### 본문

###### 실행마다 같아지는 부분

원문은 고정 배포 설정에서 RoPE와 attention mask 생성의 일부가 매 inference마다 변하지 않는다고 설명한다.

Torch Compile이 configuration 의존 부분을 compile 시점에 완전히 해소하지 못해 graph가 나뉘므로, 필요한 위치 embedding과 mask를 **사전에 계산하고 재사용**한다.

##### 보충

###### 미리 계산하지 않는 부분

새 관측의 hidden states, Q/K tensor, attention score와 최종 행동은 입력마다 달라진다.

<span class="label interpretation">구분을 위한 풀이</span>

고정된 위치용 값의 준비를 재사용하는 것과, 실제 Q/K에 RoPE를 적용하거나 QK attention을 계산하는 것은 다르다.

<p class="callout">“RoPE 사전 계산”을 “관측과 무관한 attention 결과 재사용”으로 해석하지 않는다.</p>

##### 요점

고정 설정은 재사용하고, 입력에 의존하는 신호 계산은 매번 수행한다.

##### 출처

Sec.5.1 · Graph Fragmentation/Static Graph Conversion · PDF p.16

##### 발표 메모

원문이 명시한 configuration-dependent 부분을 넘어 모든 shape와 position이 모든 실행 조건에서 항상 고정이라고 일반화하지 않는다. QK 계산 자체를 사전 고정한다는 오해를 막는다.

#### [S075] CUDA Graph: 여러 호출을 한 번으로

<!-- study-meta
layout: figure
kind: fact
figure: fig-09.png
caption: Figure 9 · Dynamic graph의 호출 간격과 static graph 실행
-->

##### 한 문장

Forward를 하나의 CUDA Graph로 포착해 쪼개진 실행 호출이 쌓이는 비용을 줄인다.

##### 본문

###### Figure 9의 위·아래

**Dynamic:** Graph break로 나뉜 구간마다 launch 비용이 누적된다.

**Static:** 고정 설정 계산을 밖으로 옮겨 forward를 한 CUDA Graph로 포착하고, 추론 step마다 한 번 호출한다.

##### 보충

<p class="callout">한 graph launch에 여러 kernel이 포함된다. Denoising 반복도 계속 수행한다.</p>

##### 요점

Graph capture는 여러 GPU 연산을 재생할 때의 호출 방식을 최적화한다.

##### 출처

Fig.9; Sec.5.1 · PDF pp.15–16

##### 발표 메모

원문의 한 forward pass를 single CUDA Graph로 capture하고 추론 step마다 한 번 호출한다는 서술을 유지한다. 이 그림만으로 denoising loop 전체의 포착 범위를 확대 해석하지 않는다. Kernel 내부 메모리 이동 최적화는 다음 절의 별도 과제다. 그림의 빈 간격은 수치 계산량보다 실행 제출 과정의 비효율에 초점을 둔다.

### 그림 설명 카드

#### [reuse] 설정 고정과 한 graph로 통합

##### 핵심

고정된 설정의 준비값을 미리 계산해 재사용하고, 반복되는 graph launch 부담을 줄인다.

##### 화면

**학습**

입력 구성에 따라 설정 변경 가능

**배포**

고정된 입력 구성으로 추론 반복

**설정 준비는 한 번**

한 graph로 묶어 launch 부담 감소

##### 대본

학습할 때는 입력 데이터의 구성에 따라 Attention에 필요한 설정이 달라질 수 있습니다. 반면 배포할 때는 정해진 입력 구성으로 추론을 반복하므로, 이 설정을 고정할 수 있습니다. 그러면 같은 준비값을 매번 다시 계산할 필요가 없습니다.

저자들은 추론할 때마다 하던 준비 계산을 미리 해 두고 재사용하도록 했습니다. 이렇게 하면 나뉘어 있던 GPU 작업을 하나의 CUDA Graph로 묶을 수 있고, 여러 번 launch할 때마다 드는 시간을 줄일 수 있습니다.

##### 요점

설정 고정 → 준비값 재사용 → 한 CUDA Graph → 반복 launch 부담 감소

#### [graph] CUDA Graph 실행 비교

##### 핵심

여러 graph를 각각 launch하던 작업을, 한 번의 launch로 실행한다.

##### 화면

**위 · 두 번 launch**

Launch 1 → A·B → Launch 2 → C·D

**아래 · 한 번 launch**

Launch 1 → A → B → C → D

##### 대본

Figure 9의 위쪽을 보면 Graph 1을 launch해서 A와 B를 실행하고, C와 D를 실행하려면 Graph 2를 다시 launch합니다. 아래쪽은 A부터 D까지 하나의 graph로 묶어 한 번만 launch합니다. 오른쪽 Speed Up이 이렇게 반복되는 launch 부담을 줄여 얻은 시간 차이입니다.

##### 요점

CUDA Graph를 여러 번 launch할 때마다 드는 시간을 줄인다.

## [P038] Kernel Fusion

<!-- slide-meta
layout: inference
kind: fact
source_ids: S076, S077, S078, S079, S081, S080
-->

### 한 문장

별도 kernel에서는 다음 연산을 위해 중간값을 메모리에 썼다가 다시 읽는다.

### 본문

### 보충



### 요점

CUDA Graph는 호출 부담을, Kernel Fusion은 연산 사이의 메모리 이동을 줄인다.

### 출처

Sec.5.2 · Fig.10 · PDF pp.16–17; App.F Table7 · PDF p.47

### 발표 메모

**화면 1/2 · 중간값 저장·재읽기**

다음은 Kernel Fusion입니다. CUDA Graph가 GPU 작업을 호출하는 부담을 줄였다면, 여기서는 연산 사이의 메모리 이동을 줄입니다. 왼쪽 그림을 보면 RMSNorm의 결과를 global memory에 저장한 뒤 다음 kernel이 다시 읽어 RoPE를 계산합니다. 그 결과도 저장하고, Attention이 다시 읽습니다. 연산이 바뀔 때마다 중간값이 메모리를 왕복하는 것입니다.

**화면 2/2 · 한 kernel에서 이어 계산**

오른쪽은 이 세 연산을 하나의 fused kernel 안에서 이어 계산합니다. 중간값을 on-chip에서 바로 다음 연산에 넘기고, 마지막 결과를 global memory에 저장합니다. 계산할 내용은 같지만 중간값을 여러 번 내보냈다가 다시 읽는 비용을 줄이는 방식입니다. 이렇게 CUDA Graph로 호출 부담을, Kernel Fusion으로 메모리 이동을 줄입니다.

### 상세 공부 기록

#### [S076] Short prefill과 autoregressive 생성

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

RLDX-1은 짧은 시퀀스를 한 번에 처리하고, action chunk를 통째로 반복 갱신한다.

##### 본문

###### 언어 모델의 두 과정

<span class="label interpretation">이해를 위한 구분</span>

**Prefill:** 주어진 prompt 토큰을 함께 처리한다. 일반 LLM도 입력 prompt를 토큰 하나씩 생성하는 것은 아니다.

**Autoregressive decode:** 이미 나온 출력 토큰을 조건으로 다음 출력 토큰을 순차적으로 생성한다.

##### 보충

###### RLDX-1의 short prefill workload

보고서는 매 inference iteration에서 짧은 attention 시퀀스의 전체 forward를 한 번에 실행하며, action을 autoregressive token으로 생성하지 않는다고 설명한다.

각 denoising step에서 noisy action chunk 전체를 갱신하고, 이 forward를 반복해 최종 chunk를 얻는다.

<p class="callout">Chunk의 병렬 갱신과 denoising 단계의 순차 반복은 함께 존재한다.</p>

##### 요점

동시에 처리하는 것은 chunk 안의 후보이며, denoising 반복까지 한 번으로 합친다는 뜻은 아니다.

##### 출처

Sec.5.2 · Short-Prefill Workload · PDF p.16; Sec.2.2 · PDF p.8

##### 발표 메모

Text critic의 autoregressive 숫자 예측과 policy 생성을 섞지 않는다. LLM의 모든 과정이 순차라는 대비를 피한다. 정확한 GPU 병렬 실행 형태나 토큰 수는 확정하지 않고, 보고서의 상대적으로 짧은 attention workload라는 설명을 따른다.

#### [S077] Compute-bound와 memory-bound

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

연산 처리량이 한계인 경우와 데이터를 옮기는 속도가 한계인 경우를 나눈다.

##### 본문

###### 계산이 오래 걸릴 때

**Compute-bound:** 많은 곱셈·덧셈을 처리하는 속도가 병목이다. 원문은 VLM·MSAT의 matmul을 이 범주로 설명한다.

<span class="label example">설명용 예시</span>

한번 읽은 값을 여러 번 곱하고 합산할 수 있으면, 데이터 이동보다 계산량이 실행 시간을 지배할 수 있다.

##### 보충

###### 데이터 이동이 오래 걸릴 때

**Memory-bound:** RMSNorm·RoPE·residual처럼 주변 연산의 tensor 읽기·쓰기가 병목이 된다. 짧은 prefill에서는 이런 연산과 matmul이 번갈아 등장한다.

따라서 한 연산만 빨라져도 전체 block의 메모리 왕복이 남을 수 있다.

<p class="callout">여기의 memory는 주로 대역폭·이동 비용이다. VRAM 용량 부족이나 OOM과 다르다.</p>

##### 요점

같은 GPU에서도 연산 종류에 따라 최적화해야 할 병목이 다르다.

##### 출처

Sec.5.2 · Short-Prefill Workload · PDF p.16; 예시는 설명용

##### 발표 메모

일반 roofline 수식이나 성능 임계값을 외부 근거 없이 추가하지 않는다. 모든 matmul이 항상 compute-bound이고 모든 normalization이 항상 memory-bound라는 하드웨어 무관 일반화를 피하며 이 보고서의 workload에 한정한다.

#### [S078] Torch Compile과 fusion 경계

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

자동 compiler도 이 workload에서 유용한 모든 연산 묶음을 찾아내지는 못했다.

##### 본문

###### 원문이 지적하는 두 제한

- **고정된 fusion 경로:** 그래프 구조와 compiler pass 순서가 탐색 가능한 패턴을 제한한다.
- **외부 fused kernel:** attention 같은 연산이 내부를 볼 수 없는 경계가 되어 주변 연산과 통합하기 어렵다.

저자는 short-prefill의 연산 간 데이터 이동을 함께 조정할 기회가 남는다고 본다.

##### 보충

###### 놓칠 수 있는 묶음

<div class="sequence">
<div class="step">Q/K RMSNorm</div>
<div class="step">Q/K RoPE 적용</div>
<div class="step">Attention</div>
</div>

세 연산이 따로 실행되면 중간 Q/K가 global memory를 오간다. 이 연결부를 수동 설계 kernel로 묶는 것이 보고서의 접근이다.

<p class="mini">Torch Compile 일반의 영구적 한계보다 이 구현·workload의 관찰로 읽는다.</p>

##### 요점

자동 최적화가 남긴 병목을 profiling하고 필요한 연산 묶음만 직접 설계한다.

##### 출처

Sec.5.2 · Fixed Fusion Path · PDF p.16

##### 발표 메모

외부 API의 최신 동작이나 모든 버전에 대한 보장을 말하지 않고 보고서 설명에 한정한다. Compiler의 한계를 측정하지 않은 조건까지 확대하지 않는다.

#### [S079] FlashAttention과 주변 연산의 fusion

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

Attention 내부가 최적화되어도, 그 앞뒤 tensor 이동은 별도의 최적화 기회로 남는다.

##### 본문

###### 이미 묶여 있는 attention

원문은 FlashAttention 같은 외부 fused attention kernel을 예로 든다. 이때 compiler는 내부 구현을 보지 못하는 opaque 연산으로 다룬다고 설명한다.

Attention 자체를 빠르게 실행하는 것과, attention 전후 연산을 통합하는 것은 서로 다른 경계의 문제다.

##### 보충

###### 그 경계를 넘으면?

<div class="sequence">
<div class="step">Q/K 정규화 → RoPE 적용 → Attention</div>
</div>

이 사이 중간 결과의 global-memory 저장·재읽기를 줄이려면, 주변 연산과 attention의 데이터 흐름을 함께 설계해야 한다.

<p class="callout">특정 workload의 cross-operator fusion에 관한 주장이다. FlashAttention 자체가 느리다는 결론은 아니다.</p>

##### 요점

최적화된 한 연산이 있어도 연산 사이의 경계 비용은 남을 수 있다.

##### 출처

Sec.5.2 · Fixed Fusion Path · PDF p.16; Fig.10 · PDF p.16

##### 발표 메모

FlashAttention 내부의 tiling이나 IO complexity 등 추가 주장은 이 장에서 다루지 않고 RLDX-1 보고서 설명에 한정한다. 최신 compiler나 FlashAttention API의 일반 동작을 설명하는 장이 아니다.

#### [S081] 실제 custom kernel 목록

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

Profiling으로 찾은 일부 연산 묶음만 수동 kernel로 바꾸고, 나머지는 Torch Compile에 둔다.

##### 본문

###### Attention 계열

- **fused\_vision\_attention:** Q/K RoPE + attention
- **fused\_llm\_attention:** Q/K RMSNorm + RoPE + attention
- **fused\_memory\_attention:** Q/K RoPE + attention

NVIDIA Nsight Compute로 비효율적인 operator group을 찾아 교체한다.

##### 보충

###### Residual·norm·MLP 계열

- **fused\_add2\_layernorm:** 두 항 덧셈 + LayerNorm
- **fused\_add2\_rmsnorm:** 두 항 덧셈 + RMSNorm
- **fused\_add3\_rmsnorm:** 세 항 덧셈 + RMSNorm
- **grouped\_swiglu / fused\_mlp\_swiglu:** SwiGLU 처리 묶음

<p class="mini">서로 다른 block의 kernel이며, 모든 attention에 RMSNorm을 추가한다고 읽지 않는다.</p>

##### 요점

전체를 다시 작성하기보다 실제 병목의 연산 경계를 선택적으로 바꾼다.

##### 출처

Sec.5.2 · PDF pp.16–17; App.F Table7 · PDF p.47

##### 발표 메모

Table 7의 총 8개 kernel을 모두 반영했다. $h_{\mathrm{ds}}$가 더해지는 add3는 별도의 세 번째 입력으로만 설명하고 그 의미를 추가 확정하지 않는다. grouped\_swiglu는 $y_1=\operatorname{SwiGLU}(z_1)$, $y_2=\operatorname{SwiGLU}(z_2)$를 함께 처리한다. fused\_mlp\_swiglu의 표는 SwiGLU를 수동 kernel로 실행함을 나타낸다. 개별 kernel의 속도 배수는 이 표에 없다.

#### [S080] Kernel fusion: 중간 메모리 왕복 줄이기

<!-- study-meta
layout: figure
kind: fact
figure: fig-10.png
caption: Figure 10 · 연산 분리의 global-memory 왕복과 fusion의 on-chip 재사용
-->

##### 한 문장

정규화·위치 적용·attention을 묶으면 중간 Q/K를 global memory에 반복 저장하지 않아도 된다.

##### 본문

###### Figure 10의 데이터 흐름

**(a) 별도 kernel:** RMSNorm 결과 저장 → 재읽기 → RoPE 결과 저장 → 재읽기 → attention.

**(b) fused kernel:** 필요한 입력을 읽고 중간 tensor를 on-chip에 유지하며 계산한 뒤 최종 출력을 저장한다.

핵심은 같은 수학 연산 사이의 불필요한 메모리 왕복을 줄이는 것이다.

##### 보충

<p class="mini">그림은 fusion 대상 block의 개념도다. 모델 전체의 모든 tensor를 한 번만 읽는다는 뜻은 아니다.</p>

##### 요점

Kernel fusion은 계산의 연결 순서와 중간 결과의 저장 위치를 함께 최적화한다.

##### 출처

Fig.10; Sec.5.2 · PDF pp.16–17

##### 발표 메모

원문은 on-chip reuse와 compute ordering도 함께 설계한다고 설명한다. 입력 한 번·출력 한 번이라는 그림은 fusion 대상 block 기준이다. Cache·메모리 트래픽의 정확한 계측값을 새로 주장하지 않는다. RMSNorm·RoPE·attention 결합은 Table 7의 fused\_llm\_attention에 연결한다.

### 그림 설명 카드

#### [separate] 중간값 저장·재읽기

##### 핵심

별도 kernel에서는 다음 연산을 위해 중간값을 메모리에 썼다가 다시 읽는다.

##### 화면

RMSNorm

↓ **저장·다시 읽기**

RoPE

↓ **저장·다시 읽기**

Attention

##### 대본

다음은 Kernel Fusion입니다. CUDA Graph가 GPU 작업을 호출하는 부담을 줄였다면, 여기서는 연산 사이의 메모리 이동을 줄입니다. 왼쪽 그림을 보면 RMSNorm의 결과를 global memory에 저장한 뒤 다음 kernel이 다시 읽어 RoPE를 계산합니다. 그 결과도 저장하고, Attention이 다시 읽습니다. 연산이 바뀔 때마다 중간값이 메모리를 왕복하는 것입니다.

##### 요점

별도 kernel · 계산 사이에 중간값의 메모리 왕복이 반복된다.

#### [fused] 한 kernel에서 이어 계산

##### 핵심

중간값을 on-chip에서 바로 다음 연산에 사용해 메모리 왕복을 줄인다.

##### 화면

입력 읽기

↓

**RMSNorm → RoPE → Attention**

중간값을 on-chip에서 이어 사용

↓

최종 결과 저장

##### 대본

오른쪽은 이 세 연산을 하나의 fused kernel 안에서 이어 계산합니다. 중간값을 on-chip에서 바로 다음 연산에 넘기고, 마지막 결과를 global memory에 저장합니다. 계산할 내용은 같지만 중간값을 여러 번 내보냈다가 다시 읽는 비용을 줄이는 방식입니다. 이렇게 CUDA Graph로 호출 부담을, Kernel Fusion으로 메모리 이동을 줄입니다.

##### 요점

Kernel Fusion · 중간값을 이어 사용해 global memory 왕복을 줄인다.
