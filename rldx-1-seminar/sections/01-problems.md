# Problems

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P002] 기존 VLA의 문제

<!-- slide-meta
layout: full
kind: fact
source_ids: S002, S003, S004
-->

### 한 문장

폭넓은 장면 이해만으로는 움직임·과거 사건·접촉 상태를 충분히 다루기 어렵다.

### 본문

<div class="three-scenes">
<div>
<div class="scene-track"><span class="moving-object">컵</span><span>→</span><span class="moving-object faint">컵</span></div>
<h3>움직이는 대상</h3>
<p>컨베이어의 물체는 계속 이동한다. 현재 위치뿐 아니라 여러 프레임의 변화가 필요하다.</p></div>
<div>
<div class="scene-memory"><span>이전 관찰</span><b>→</b><span>가려진 위치</span></div>
<h3>현재 보이지 않는 사건</h3>
<p>숨기기 전에 본 정보를 유지하고 이후 선택에 활용해야 한다.</p></div>
<div>
<div class="scene-contact"><span class="gripper">손</span><b>⇄</b><span class="moving-object">물체</span></div>
<h3>가려진 접촉</h3>
<p>힘·미끄러짐 같은 작은 변화는 영상만으로 파악하기 어렵다. 촉각·토크가 단서를 준다.</p></div>
</div>

### 보충

### 요점

RLDX-1은 VLM의 범용 이해에 motion awareness·long-term memory·physical sensing을 더한다.

### 출처

Sec.1 · PDF p.3 · 상황 도식은 설명용

### 발표 메모

Task·action·policy 및 VLM·VLA의 기본 구분은 상세 해설에 보존한다. 세 기능의 필요성을 보여주는 사례와 각 모듈의 독립적 인과 효과를 입증한 실험은 다르다.

### 상세 공부 기록

#### [S002] Task·action·policy는 서로 다르다

<!-- study-meta
layout: full
kind: example
-->

##### 한 문장

하고 싶은 일은 언어로, 실제 움직임은 수치로, 둘을 연결하는 규칙은 모델로 표현한다.

##### 본문

<div class="flow">
<div class="node">
<h3>Task instruction</h3>
<p>“빨간 컵을 상자에 넣어.”</p><span class="mini">수행할 목표</span></div><span class="arrow">→</span>
<div class="node">
<h3>Policy</h3>
<p>현재 영상·로봇 상태를 보고<br>다음 행동을 계산</p><span class="mini">RLDX-1</span></div><span class="arrow">→</span>
<div class="node">
<h3>Action chunk</h3>
<p>$a_t, a_{t+1}, \ldots, a_{t+H}$</p><span class="mini">미래 여러 시점의 수치 행동</span></div>
</div>

<div class="compare">
<div>
<h3>언어 목표만으로는 움직일 수 없다</h3>
<p>로봇은 관절·말단 위치나 손의 제어값처럼 실행 가능한 행동 표현을 필요로 한다. 구체적인 행동 차원과 제어 방식은 로봇마다 다르다.</p></div>
<div>
<h3>같은 task라도 action은 달라진다</h3>
<p>컵이 오른쪽에 있거나 왼쪽에 있으면 필요한 움직임이 다르다. 합성 데이터에서 instruction을 만드는 것과 행동 라벨을 추정하는 것도 별도 과정이다.</p></div>
</div>

##### 보충

##### 요점

Task는 목표, action은 실행값, policy는 관측과 목표로 action을 정하는 모델이다.

##### 출처

Sec.1.1 · PDF p.5; Sec.3.3 · PDF pp.10–12 · 도식은 설명용

##### 발표 메모

언어 예시와 흐름도는 설명을 위한 구성이다. 원문은 language instruction $c_t$, video observations $o$, proprioceptive state $s_t$, physical signals $p_t$를 입력받아 action chunk $a_{t:t+H}$를 생성한다고 정의한다. Action의 구체적 표현은 데이터셋과 embodiment에 따라 달라진다. IDM이 생성하는 것은 수치 행동 라벨이며 지시문 자체가 아니다.

#### [S003] VLM의 이해를 로봇 행동으로 연결한다

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

VLA는 시각·언어 표현을 행동 생성과 연결하는 모델이다.

##### 본문

###### VLM: Vision–Language Model

<div class="sequence">
<div class="step">입력: 장면 영상 + 언어 지시</div>
<div class="step">장면 속 대상·관계·지시의 의미를 표현</div>
<div class="step">RLDX-1에서는 행동에 유용한 특징 $h_t$를 추출</div>
</div>

여기서 VLM은 최종 행동 수치를 바로 내는 대신, action model이 사용할 표현을 제공한다.

##### 보충

###### VLA: Vision–Language–Action

<div class="sequence">
<div class="step">VLM이 영상과 지시를 해석</div>
<div class="step">Action model이 로봇 상태·센서와 결합</div>
<div class="step">미래 action chunk 생성</div>
</div>

일반 VLM의 폭넓은 장면 이해·상식 추론은 출발점이다. 로봇 조작에 맞는 표현과 실행 능력은 추가 설계·학습이 필요하다.

##### 요점

VLM의 지식을 쓰는 것과 실제 환경에서 적절하게 조작하는 것은 연결해서 풀어야 할 문제다.

##### 출처

Sec.1 · PDF pp.3–5; Sec.2.1 · PDF p.6

##### 발표 메모

이 보고서에서 versatile intelligence는 다양한 장면과 지시를 이해하고 작업·환경 변화에 일반화하는 폭넓은 능력을 말한다. VLA의 행동 생성 방식은 모델에 따라 다르며 autoregressive action token 방식과 flow matching 방식이 모두 있다. 여기서는 RLDX-1의 구조를 기준으로 설명한다.

#### [S004] 장면 이해만으로 부족한 세 가지 상황

<!-- study-meta
layout: full
kind: fact
-->

##### 한 문장

저자들은 versatile intelligence에 움직임·장기 기억·물리 센싱을 명시적으로 추가한다.

##### 본문

<div class="three-scenes">
<div>
<div class="scene-track"><span class="moving-object">컵</span><span>→</span><span class="moving-object faint">컵</span><span>→</span><span class="moving-object faint">컵</span></div>
<h3>Motion awareness</h3>
<p>컨베이어 위 물체는 계속 이동한다. 한 장의 위치뿐 아니라 여러 프레임의 변화에서 움직임을 파악해야 한다.</p></div>
<div>
<div class="scene-memory"><span>큐브를 봄</span><b>→</b><span>컵에 가려짐</span><b>→</b><span>기억으로 선택</span></div>
<h3>Long-term memory</h3>
<p>현재 보이지 않는 정보라도 이전 상호작용에서 봤다면 이후 의사결정에 활용해야 한다.</p></div>
<div>
<div class="scene-contact"><span class="gripper">손</span><b>⇄</b><span class="moving-object">물체</span></div>
<h3>Physical sensing</h3>
<p>접촉부가 가려지거나 변화가 미세하면 영상만으로 힘·접촉 상태를 파악하기 어렵다. 촉각·토크가 단서를 준다.</p></div>
</div>

##### 보충

##### 요점

Functional capabilities는 실제 조작에서 필요한 기능적 능력이며, 세 가지 기능은 이 보고서가 집중하는 범위다.

##### 출처

Sec.1 Introduction · PDF p.3 · 상황 도식은 설명용

##### 발표 메모

Occlusion은 손이나 물체에 의해 중요한 부분이 가려지는 상황이다. Subtle task-relevant visual change는 미끄러짐이나 미세 접촉처럼 작업에는 중요하지만 영상에서 구분하기 어려운 변화를 뜻한다. 세 기능을 명시적으로 지원하는 구조와 각각의 성능 우위를 인과적으로 검증하는 것은 구분해야 한다. 후반 평가에서 어떤 모듈을 켜서 어떤 과제를 평가했는지 다시 확인한다.
