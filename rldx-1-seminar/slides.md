---
theme: default
title: RLDX-1 Technical Report
info: |
  RLDX-1 Technical Report를 함께 공부하며 만드는 한국어 논문 세미나 자료.
aspectRatio: 16/9
canvasWidth: 1280
colorSchema: light
transition: none
drawings:
  persist: false
fonts:
  sans: 'Arial, Apple SD Gothic Neo, Malgun Gothic, sans-serif'
  mono: 'Menlo, Consolas, monospace'
  local: 'Arial, Apple SD Gothic Neo, Malgun Gothic, sans-serif, Menlo, Consolas, monospace'
layout: none
---

<!-- slide-id: S001 | revision: v07 | status: draft -->

<div class="cover-slide cover-figure1">
  <div class="cover-image-field" aria-hidden="true"></div>
  <main class="cover-copy">
    <p class="cover-series">PAPER SEMINAR</p>
    <p class="cover-affiliation">RLWRLD <span>·</span> KAIST <span class="cover-year">2026</span></p>
    <h1>RLDX-1</h1>
    <p class="cover-title-sub">Technical Report</p>
    <div class="cover-rule" aria-hidden="true"></div>
    <p class="cover-description">움직임·기억·물리 센싱을 결합한<br>범용 로봇 조작 모델</p>
    <div class="cover-capabilities"><span>Motion awareness</span><span>Long-term memory</span><span>Physical sensing</span></div>
  </main>
  <figure class="cover-system">
    <img src="/figures/fig-01.png" alt="논문 Figure 1: 데이터·기능·학습·평가를 연결한 RLDX-1 전체 구성">
    <figcaption>Figure 1 · RLDX-1 전체 구성</figcaption>
  </figure>
  <footer class="cover-footer"><span>출처: 표지·Fig.1, p.1 · Abstract, p.3</span><span class="cover-slide-id">S001</span></footer>
</div>


---
layout: none
---

<!-- slide-id: P002 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P002"><header class="seminar-header"><div class="chapter-label">Problems</div><h1>기존 VLA의 문제</h1><p class="slide-lead">폭넓은 장면 이해만으로는 움직임·과거 사건·접촉 상태를 충분히 다루기 어렵다.</p></header><div class="seminar-body full"><div class="body-main"><div class="three-scenes">
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
</div></div></div><div class="takeaway">RLDX-1은 VLM의 범용 이해에 motion awareness·long-term memory·physical sensing을 더한다.</div><footer class="seminar-footer"><span class="source">Sec.1 · PDF p.3 · 상황 도식은 설명용</span><span class="slide-id">P002 · 002/25</span></footer></section>

<!--
Task·action·policy 및 VLM·VLA의 기본 구분은 상세 해설에 보존한다. 세 기능의 필요성을 보여주는 사례와 각 모듈의 독립적 인과 효과를 입증한 실험은 다르다.

S002 Task·action·policy는 서로 다르다
하고 싶은 일은 언어로, 실제 움직임은 수치로, 둘을 연결하는 규칙은 모델로 표현한다.
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

Task는 목표, action은 실행값, policy는 관측과 목표로 action을 정하는 모델이다.
Sec.1.1 · PDF p.5; Sec.3.3 · PDF pp.10–12 · 도식은 설명용
언어 예시와 흐름도는 설명을 위한 구성이다. 원문은 language instruction $c_t$, video observations $o$, proprioceptive state $s_t$, physical signals $p_t$를 입력받아 action chunk $a_{t:t+H}$를 생성한다고 정의한다. Action의 구체적 표현은 데이터셋과 embodiment에 따라 달라진다. IDM이 생성하는 것은 수치 행동 라벨이며 지시문 자체가 아니다.

S003 VLM의 이해를 로봇 행동으로 연결한다
VLA는 시각·언어 표현을 행동 생성과 연결하는 모델이다.
###### VLM: Vision–Language Model

<div class="sequence">
<div class="step">입력: 장면 영상 + 언어 지시</div>
<div class="step">장면 속 대상·관계·지시의 의미를 표현</div>
<div class="step">RLDX-1에서는 행동에 유용한 특징 $h_t$를 추출</div>
</div>

여기서 VLM은 최종 행동 수치를 바로 내는 대신, action model이 사용할 표현을 제공한다.
###### VLA: Vision–Language–Action

<div class="sequence">
<div class="step">VLM이 영상과 지시를 해석</div>
<div class="step">Action model이 로봇 상태·센서와 결합</div>
<div class="step">미래 action chunk 생성</div>
</div>

일반 VLM의 폭넓은 장면 이해·상식 추론은 출발점이다. 로봇 조작에 맞는 표현과 실행 능력은 추가 설계·학습이 필요하다.
VLM의 지식을 쓰는 것과 실제 환경에서 적절하게 조작하는 것은 연결해서 풀어야 할 문제다.
Sec.1 · PDF pp.3–5; Sec.2.1 · PDF p.6
이 보고서에서 versatile intelligence는 다양한 장면과 지시를 이해하고 작업·환경 변화에 일반화하는 폭넓은 능력을 말한다. VLA의 행동 생성 방식은 모델에 따라 다르며 autoregressive action token 방식과 flow matching 방식이 모두 있다. 여기서는 RLDX-1의 구조를 기준으로 설명한다.

S004 장면 이해만으로 부족한 세 가지 상황
저자들은 versatile intelligence에 움직임·장기 기억·물리 센싱을 명시적으로 추가한다.
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

Functional capabilities는 실제 조작에서 필요한 기능적 능력이며, 세 가지 기능은 이 보고서가 집중하는 범위다.
Sec.1 Introduction · PDF p.3 · 상황 도식은 설명용
Occlusion은 손이나 물체에 의해 중요한 부분이 가려지는 상황이다. Subtle task-relevant visual change는 미끄러짐이나 미세 접촉처럼 작업에는 중요하지만 영상에서 구분하기 어려운 변화를 뜻한다. 세 기능을 명시적으로 지원하는 구조와 각각의 성능 우위를 인과적으로 검증하는 것은 구분해야 한다. 후반 평가에서 어떤 모듈을 켜서 어떤 과제를 평가했는지 다시 확인한다.
-->

---
layout: none
---

<!-- slide-id: P031 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P031"><header class="seminar-header"><div class="chapter-label">RLDX-1 Architecture</div><h1>RLDX-1 Overview</h1><p class="slide-lead">관측과 지시를 표현으로 바꾸고, 로봇 상태·센서와 함께 미래 action chunk를 만든다.</p></header><div class="seminar-body figure"><figure class="paper-figure"><img src="/figures/fig-02.png" alt="Figure 2 · RLDX-1 전체 흐름" loading="eager"><figcaption>Figure 2 · RLDX-1 전체 흐름</figcaption></figure><div class="body-main"><h3>관측 → 표현 → 행동</h3>
<p><strong>영상·지시:</strong> VLM에서 현재 cognition features를 추출한다.</p>
<p><strong>과거:</strong> Memory Module이 이전 cognition 정보를 더한다.</p>
<p><strong>상태·센서:</strong> MSAT가 cognition·memory와 함께 처리한다.</p>
<p><strong>출력:</strong> 여러 미래 시점의 수치 행동을 묶은 action chunk다.</p>
</div></div><div class="takeaway">다음은 Figure 3에서 Vision Encoder와 VLM의 내부 경로를 확대해 살펴본다.</div><footer class="seminar-footer"><span class="source">Fig.2 · Sec.1.1 · PDF p.5; Fig.1 · PDF p.1</span><span class="slide-id">P031 · 003/25</span></footer></section>

<!--
전체 시스템 Fig.1·세 로봇 플랫폼·모델 입출력 표기와 지도는 이 장의 상세 해설에 연결한다. 이어지는 Fig.3 해설에서는 전체 구조와 확대된 부위를 오가며 설명한다.

S122 전체 흐름: 무엇을, 어떤 순서로 이해할까
문제에서 출발해 구조·데이터·학습·실행을 연결하고, 실험으로 돌아와 근거를 확인한다.
<div class="roadmap">
<div><b>01</b>
<h3>Problems</h3>
<p>VLA와 세 가지 기능<br>연구 문제와 전체 구조</p></div>
<div><b>02</b>
<h3>Architecture</h3>
<p>VLM·motion·memory<br>Flow matching과 MSAT</p></div>
<div><b>03–05</b>
<h3>Data · Training · Inference</h3>
<p>실제·합성 데이터와 세 단계 학습<br>GPU 추론 최적화</p></div>
<div><b>06–09</b>
<h3>평가 · 결론 · 의견</h3>
<p>벤치마크·ablation·중요 부록<br>결론과 미해결 질문</p></div>
</div>

<p class="reading-key"><span class="label fact">원문</span> 설명·실험 결과 <span class="label interpretation">우리 해석</span> 연결과 의미 <span class="label example">설명용 예시</span> 이해를 위한 단순화 <span class="label question">미해결</span> 아직 확인할 수 없는 점</p>

이번 자료는 발표 시간에 맞춘 요약보다, 함께 공부한 내용을 다시 이해하기 위한 상세한 지도다.
발표 구성: 승인된 OUTLINE.md · 원문 Sec.1–8, 주요 Appendix
전체 목차는 사용자 승인된 121개 설명 단위를 유지한다. 이 장은 목차 탐색을 돕는 추가 S122이며 기존 ID를 바꾸지 않는다. 이후 각 장의 질문과 근거를 연결해 읽는다. 그림은 확대할 수 있고 G로 전체 목차, N으로 보충 설명을 연다.

S005 Figure 1: 모델 하나보다 넓은 시스템 설계
구조·데이터·학습·추론 최적화가 같은 조작 목표를 위해 연결된다.
###### 위: 어떤 경험으로 배우는가

공개 실제 데이터, 자체 센서 시연, 합성 영상·행동 라벨을 결합한다.

###### 가운데: 어떻게 행동을 만드는가

VLM과 기능 모듈의 표현을 MSAT로 연결하고 세 단계 학습으로 적응한다.

###### 아래: 어디서 검증하는가

실제 조작과 시뮬레이션을 평가하고 GPU 추론 지연을 줄인다.

<p class="mini">그림의 성능 주장은 후반부에서 지표·조건·비교 범위를 확인한다.</p>

RLDX-1의 보고된 결과는 아키텍처와 데이터·학습·실행이 함께 구성된 시스템의 결과다.
Fig.1 · PDF p.1; Sec.1 · PDF pp.3–5
그림은 기능 추가만이 아니라 합성 데이터 파이프라인, 3단계 학습, 정적 그래프와 kernel 최적화를 포함한 전체 기여를 요약한다. Fig.1의 수치나 레이더를 성공률로 일괄 읽지 않는다. ALLEX 평균 86.8은 부분 점수와 성공률이 섞인 집계이고, speedup은 정해진 policy latency 측정 조건에 따른 결과다.

S006 OpenArm·ALLEX·Franka는 서로 다른 로봇이다
같은 모델 계열을 서로 다른 관절·손·센서 구성을 가진 플랫폼에 적용한다.
| OpenArm | ALLEX | Franka |
| --- | --- | --- |
| 28-DoF 상반신 + Inspire hands<br>일반적인 지시·대상 변화 평가 | 48-DoF 상반신 humanoid<br>움직임·기억·물리 센싱 과제 | Franka Research 3 플랫폼<br>단일 팔 + AnySkin 촉각·관절 토크 |

Embodiment는 로봇의 몸과 제어 구성이다. 센서·행동 차원이 다르므로 모델의 입출력 연결도 맞춰야 한다.
Fig.12 · PDF p.19; Sec.3.2 · PDF pp.9–10; App.G.2–G.4 · PDF pp.50–52
ALLEX는 이 보고서의 48-DoF 상반신 humanoid다. OpenArm은 7-DoF 팔 두 개, 6-DoF 손 두 개, 2-DoF 목으로 구성된다. ALLEX는 두 7-DoF 팔, 두 15-DoF 손, 2-DoF 목과 2-DoF 허리를 가진다. Franka 그림에서는 팔/그리퍼의 DoF를 플랫폼 표기 방식으로 나누므로 일반 제조사 팔 관절 수와 혼동하지 않는다. 사용자의 요청에 따라 발표에서는 FR3보다 Franka를 사용한다.

S007 관측과 지시에서 미래 행동 묶음까지
로봇 시점 t에서 필요한 정보를 모으고, 앞으로 여러 시점의 행동을 예측한다.
$$
\text{입력:}\quad \mathbf{c}_t,\;\mathbf{o}_{t-K:t},\;\mathbf{s}_t,\;\mathbf{p}_t
$$

<strong>$\mathbf{c}_{t}$</strong>: 언어 지시<br><strong>$\mathbf{o}_{t-K:t}$</strong>: 여러 프레임 관측<br><strong>$\mathbf{s}_{t}$</strong>: 로봇 자신의 상태<br><strong>$\mathbf{p}_{t}$</strong>: 현재 물리 센서값

$$
\text{출력:}\quad \mathbf{a}_{t:t+H}
$$

H+1개 시점의 행동이 action chunk다. 메모리 모듈은 이전 cognition 정보를 추가로 제공한다.

이제 왼쪽 VLM부터 읽고, 행동 생성 원리를 배운 뒤 오른쪽 MSAT와 전체 그림을 연결한다.
Sec.1.1, Fig.2 · PDF p.5
원문의 $\mathbf{o}_{t-K:t}$는 K+1 프레임을 나타내는 개요 표기다. 실제 학습에서는 간격을 둔 네 프레임을 사용하므로 매 제어 시점의 모든 프레임이라는 뜻으로 고정하지 않는다. Action chunk는 추론에서 한 번에 예측되지만 그 전부를 실행하는지는 별도 설정이다. 이후 denoising timestep $\tau$와 실제 로봇 시간 t도 구별한다.
-->

---
layout: none
---

<!-- slide-id: P032 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P032"><header class="seminar-header"><div class="chapter-label">RLDX-1 Architecture</div><h1>RLDX-1 Architecture</h1><p class="slide-lead">전체 그림에서 Vision Encoder·VLM·Memory Module·MSAT를 차례로 살펴본다.</p></header><div class="seminar-body explorer"><div class="architecture-explorer" data-scene="overview" data-step="0" data-state="0">
  <div class="arch-viewport" aria-label="Figure 3 확대 영역">
    <div class="arch-camera">
      <img class="arch-source-image" src="/figures/fig-03.png" width="1497" height="870" alt="RLDX-1 원문 Figure 3 전체 아키텍처">
      <button class="arch-hotspot arch-vision-hotspot" data-arch-focus="vision" aria-label="Vision Encoder 확대"><span>Vision Encoder 확대</span></button>
      <button class="arch-hotspot arch-memory-hotspot" data-arch-focus="memory" aria-label="Memory Module 확대"><span>Memory Module 확대</span></button>
      <button class="arch-hotspot arch-msat-hotspot" data-arch-focus="msat" aria-label="MSAT 확대"><span>MSAT 확대</span></button>
      <button class="arch-hotspot arch-vlm-hotspot" data-arch-focus="vlm" aria-label="VLM 확대"><span>VLM 확대</span></button>
    </div>
  </div>
  <svg class="arch-connectors" viewBox="0 0 1152 390" aria-hidden="true"><defs><marker id="arch-arrow-tip" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#ce493a"></path></marker><clipPath id="arch-picture-clip"><rect width="740" height="390"></rect></clipPath></defs><g class="arch-picture-marks" clip-path="url(#arch-picture-clip)"></g><g class="arch-paths"></g></svg>
  <aside class="arch-annotations" aria-live="polite"></aside>
  <div class="arch-controls">
    <div class="arch-mode-buttons"><button data-arch-reset>전체 그림</button><button data-arch-focus="vision">Vision Encoder</button><button data-arch-focus="vlm">VLM</button><button data-arch-focus="memory">Memory Module</button><button data-arch-focus="msat">MSAT</button></div>
    <div class="arch-step-buttons"><button data-arch-prev>← 이전 설명</button><span class="arch-step-counter"></span><button data-arch-next>다음 설명 →</button></div>
  </div>
</div></div><div class="takeaway">전체 → Vision Encoder → 전체 → VLM → 전체 → Memory Module → 전체 → MSAT</div><footer class="seminar-footer"><span class="source">Fig.3 · PDF p.6; Sec.2.1–2.2 · PDF pp.7–9; 추출 층 비교: Table2(a), pp.24–25</span><span class="slide-id">P032 · 004/25</span></footer></section>

<!--
그림은 시각적 요약이다. Vision Encoder는27층 중9층 뒤에 motion module을 삽입한다. LLM에서는4층 뒤에 과거 관측을 압축한다. 화면은 중간층이라고 설명하며, 실제18층 선택과 비교 실험은 연결된 상세 해설에 보존한다. Memory는 과거 Qₜ와 현재 hₜ를 concat해 mₜ를 만들고, hₜ·mₜ를 concat한 토큰을 C stream에 제공한다. MSAT는 초반 stream별 residual과 후반 C-A concat을 구분하며, 한 forward의 변화율로 미래 후보를 반복 갱신한다. Memory 구조와 stream 전환은 이 확대 설명에서 마무리한다. 다음 P006–P008에서 생성 후보·변화율을 이해한 뒤 P009–P010에서 입력과 연산을 연결한다. 로봇별 projection은 P016의 공통·전용 경로와 함께 설명한다. 약30% 깊이의 동기를 모든 설정에서 최적이라는 실험 결과로 과장하지 않는다.

S008 로봇용 VQA 적응
장면을 설명하는 능력을 로봇의 공간 관계·하위 작업·행동과 연결한다.
###### 기반 모델에 더하는 로봇 경험

<div class="flow">
<div class="node">Qwen3-VL 8B</div>
<div class="arrow">→</div>
<div class="node">로봇 VQA로<br>fine-tuning</div>
<div class="arrow">→</div>
<div class="node">RLDX-1-VLM</div>
</div>

범용 시각·언어 이해만으로는 목표를 위해 지금 어떤 하위 작업을 해야 하는지, 손과 물체가 어떤 공간 관계인지, 관측과 제어가 어떻게 연결되는지 충분하지 않을 수 있다. 저자는 로봇 trajectory 관측에서 세 종류의 질문·답을 만든다.
###### 세 가지 supervision

- **공간 관계:** end-effector와 목표 물체 사이의 관계.
- **중간 subtask:** 전체 목표를 위한 현재 단계.
- **낮은 수준의 action:** 현재 로봇 프레임에 대응하는 행동.

<span class="label example">질문 형식의 설명용 예시</span> “컵은 손의 어느 쪽에 있는가?” “집은 뒤 무엇을 해야 하는가?”처럼 로봇 판단에 필요한 단서를 묻는다. 실제 데이터의 prompt를 그대로 인용한 것은 아니다.
VQA는 행동을 직접 실행하는 단계가 아니라, 행동에 유용한 VLM 표현을 만드는 적응 단계다.
Sec.2.1 · PDF pp.6–7
원문은 Qwen3-VL 8B를 로봇 관련 VQA 데이터로 fine-tuning한 결과를 RLDX-1-VLM으로 사용한다고 설명한다. VQA의 답 형식·개별 prompt·정확한 dataset 규모는 이 문단에서 제시하지 않는다. 행동 출력은 뒤의 action model이 담당한다. Table2b의 57.5→60.9 비교는 뒤의 별도 ablation 장에서 다루며, 전체 recipe의 모든 효과로 일반화하지 않는다.

S009 Cognition tokens와 hₜ
학습 가능한 64개 query를 뒤에 붙이고, 그 위치의 hidden states를 행동 모델로 보낸다.
###### 입력은 함께, 출력은 선택해서

$$
\mathbf{v}_t=E_\theta(\mathbf{o}_{t-K:t})
$$

<div class="token-row"><span class="token">영상 $\mathbf{v}_{t}$</span><span class="token">언어 $\boldsymbol{\ell}_{t}$</span><span class="token c">q × 64</span></div>

영상 특징과 지시 토큰 뒤에 cognition tokens **q**를 이어 붙여 VLM backbone에 넣는다. q는 학습 가능한 query tokens로, 앞의 시각·언어 맥락을 참고해 행동 예측에 필요한 정보를 모은다.
###### 어느 출력을 가져오는가?

$$
\mathbf{h}_t=F_\theta\bigl([\mathbf{v}_t,\boldsymbol{\ell}_t,\mathbf{q}]\bigr)_{\mathbf{q}\text{ 위치}}
$$

선택한 Transformer 층에서 **cognition token 위치에 대응하는 출력들**을 $\mathbf{h}_{t}$로 남긴다. 나머지 위치의 출력은 action decoder 전달용으로 버린다. $\mathbf{h}_{t}$는 단일 숫자나 자연어 문장이 아니라 여러 hidden vectors로 이루어진 표현이다.

<p class="callout">64는 cognition token 수다. 영상 patch token 수나 생성할 action 개수를 뜻하지 않는다.</p>
“뒤에 붙인 학습 가능한 질문 64개가 현재 장면·지시를 행동용 표현으로 읽어낸다.”
Sec.2.1 Cognition Tokens · PDF p.7
수식의 아래첨자 cognition token 위치는 원문을 읽기 쉽게 선택 연산으로 풀어 쓴 표기다. 원문은 $\mathbf{x}=[\mathbf{v}_t,\boldsymbol{\ell}_t,\mathbf{q}]$를 입력하고 cognition token에 대응하는 출력 특징만 남긴다고 명시한다. q를 “무조건 정보를 모두 보존하는 압축”으로 설명하지 않는다. 이때 cognition의 hidden states를 추출하는 층은 S010에서 분리해 설명한다.

S010 특징을 추출하는 층
18층 hidden states를 선택하는 것과 언어 출력 head를 바꾸는 것은 다른 선택이다.
###### 층 안의 표현과 마지막 출력

<div class="sequence">
<div class="step">입력 → 초기 Transformer 층: 시각·언어 특징 처리</div>
<div class="step"><strong>중간 18층 → cognition token 위치 특징 $\mathbf{h}_{t}$ 추출 → action model</strong></div>
<div class="step">더 뒤의 Transformer 층 → 언어 출력 head → 텍스트 예측</div>
</div>

논문은 마지막 LLM 층 대신 중간층의 특징을 사용한다. 언어 생성에 특화된 후기 표현보다 조작에 필요한 시각 정보와 의미 정보의 균형이 낫다는 것이 저자의 설명이다.
###### 실험이 보여준 범위

| 선택 층 | 성공률 |
| --- | --- |
| 8층 | 51.1% |
| **18층** | **60.9%** |
| 28층 | 56.3% |

RoboCasa Kitchen의 별도 base-architecture 실험에서 세 후보 중 18층이 가장 높다. “모든 층·모든 작업에서 18층이 최적”인 결과는 아니다.

<p class="mini">후기 블록과 vocabulary 출력 head는 서로 다른 요소다.</p>
특징을 어디서 꺼낼지는 실험한 설계 선택이며, 출력 head 자체를 선택하는 문제가 아니다.
Sec.2.1 · PDF p.7; Sec.6.5, Table2(a) · PDF pp.24–25
원문은 action decoding에 intermediate hidden states를 사용한다고 설명하고, Sec6.5는 Layer18을 base로 사용한다. 이 ablation의 variant는 대규모 policy pre-training 없이 학습한다고 서술한다. 이미 학습된 Qwen VLM까지 완전 무작위 초기화했다는 뜻으로 읽지 않는다. 시각 grounding와 semantic abstraction의 균형은 수치 자체가 아니라 저자의 해석이다. 뒤의 S098에서 설정과 근거 강도를 다시 다룬다.

S011 여러 프레임의 표기
$\mathbf{o}_{t-K:t}$는 시간 정보를 가진 관측 묶음이며, 실제 학습은 네 시점을 샘플링한다.
###### 한 장으로 구분하기 어려운 움직임

<div class="token-row"><span class="token">t−6</span><span class="token">t−4</span><span class="token">t−2</span><span class="token c">t 현재</span></div>

실제 pre-training 설정은 상대 시간 간격 <strong>{−6, −4, −2, 0}</strong>의 네 프레임을 사용한다. $\mathbf{o}_{t-K:t}$는 과거부터 현재까지의 관측을 묶는 표기이며, 이 실험에서 모든 중간 시점을 빠짐없이 넣는다는 뜻은 아니다.

$$
\mathbf{v}_t=E_\theta(\text{여러 시점의 영상 관측})
$$
###### 같은 위치라도 움직임은 다를 수 있다

<span class="label example">설명용 상황</span> 공이 현재 화면 중앙에 있어도, 과거에 왼쪽에 있었다면 오른쪽으로 이동 중이고 과거에 오른쪽에 있었다면 왼쪽으로 이동 중일 수 있다. 여러 프레임은 그 차이를 판단할 단서를 준다.

$\mathbf{v}_{t}$는 그 관측 묶음을 vision encoder로 처리한 특징이다. 영상 원본이나 단일 프레임의 좌표와 동일하지 않다. 각 프레임의 공간 위치와 프레임 간 관계를 다음 motion module에서 함께 활용한다.
시간 범위 표기, 실제 샘플 프레임 수, 영상 특징은 각각 구분해서 읽어야 한다.
Sec.2.1 · PDF p.7; Sec.4.1 Implementation Details · PDF p.13
네 프레임의 상대 offset은 원문 PDF13에서 직접 확인했다. fps를 가정해 초 단위로 환산하지 않는다. 여러 카메라 view가 있을 수 있으나 여기의 네 시점과 카메라 개수는 서로 다르다. Vision token 수를 cognition token64개와 혼동하지 않는다. 여러 프레임 입력은 pre-training부터 있으며 STSS 모듈 추가는 mid-training에서 다룬다.

S012 Motion module과 STSS
특징의 시공간 이웃 간 유사성에서 “어디로 무엇이 달라졌는가”의 단서를 만든다.
###### 특징을 바로 행동으로 바꾸기 전에

<div class="sequence">
<div class="step">ViT 앞 i개 층 → 시공간 특징 $\mathbf{v}_{t}^{(i)}$</div>
<div class="step">각 특징과 주변 시공간 이웃의 correlation → STSS tensor $S_{t}$</div>
<div class="step">STSS encoder $S_{\theta}$($S_{t}$) → motion features</div>
</div>

STSS는 **space-time self-similarity**다. 시간과 공간으로 가까운 특징들의 대응·변화를 계산한 결과를 별도 encoder가 읽어 움직임을 표현한다.
###### 공이 오른쪽으로 이동한다면

<span class="label example">직관을 위한 예시</span> 이전 프레임의 공 특징이 다음 프레임의 오른쪽 이웃과 더 비슷하다면, 그 correlation 배치가 이동 방향의 단서가 될 수 있다. 논문이 이 모듈의 출력을 정확한 optical flow나 공의 속도값이라고 정의한 것은 아니다.

실제 삽입 위치는 vision encoder **27층 중 9층 뒤**다. 저자는 약 30% 깊이에 물리 관련 단서가 풍부하다는 선행 관찰을 동기로 들며, 여기서 모든 삽입 위치를 비교한 실험을 제시하지 않는다.
STSS는 이웃 특징의 관계를 계산해 움직임 단서를 더하는 모듈이다.
Sec.2.1 Functionality1: Motion Awareness · PDF p.7
원문은 각 spatio-temporal feature와 local neighbors의 correlation을 계산한다고 명시한다. 이 설명만으로 이웃의 정확한 크기, 상관 함수의 normalization, tensor shape를 확정하지 않는다. STSS를 attention softmax와 동일시하지 않는다. $\mathbf{S}_t$는 STSS tensor이고 $S_\theta$는 그 tensor를 읽는 학습 모듈이다. 이 모듈을 적용한 후 residual update하는 식은 다음 S013에서 확대한다.

S013 Residual connection
원래 시각 특징을 유지하는 경로에 움직임 특징의 보정을 원소별로 더한다.
###### 원문의 residual update

$$
\widetilde{\mathbf{v}}_t^{(i)}=\mathbf{v}_t^{(i)}+S_\theta(\mathbf{S}_t)
$$

- <strong>$\mathbf{v}_{t}^{(i)}$:</strong> vision encoder 앞 i층이 만든 기존 특징.
- <strong>$S_{\theta}$($S_{t}$):</strong> 시공간 유사성에서 얻은 motion features.
- <strong>$\widetilde{\mathbf{v}}_t^{(i)}$:</strong> 보정 후 뒤쪽 vision 층으로 전달할 특징.

덧셈 가능한 shape로 두 표현을 맞춘 뒤 더한다. 특징 벡터를 길게 이어 붙이는 concat과는 다르다.
###### 숫자로 보는 보정

<span class="label example">2차원 설명용 예시</span>

$$
\text{기존 특징}\quad [2.0,\,1.0]
$$

$$
+\;\text{움직임 보정}\quad [0.3,\,-0.2]
$$

$$
=[2.3,\,0.8]
$$

출력 차원은 그대로이며 값이 바뀐다. “기존 경로가 있다”는 말은 기존 특징값을 변하지 않게 보관한다는 뜻이 아니다. 뒤의 encoder 층은 합쳐진 표현을 계속 변환한다.
Residual의 +는 같은 위치·차원의 보정이고, concat은 토큰이나 특징을 이어 붙이는 연산이다.
Sec.2.1 Motion Awareness의 residual 식 · PDF p.7
원문 v tilde 식을 그대로 항별로 해설했다. 벡터 숫자는 실제 feature 값이나 모델 계측 결과가 아니다. Residual branch가 언제나 작은 수치를 낸다거나 정보 손실을 없앤다고 주장하지 않는다. MSAT에서도 stream별 residual update가 나오지만, 모듈 위치와 입력은 서로 다르다.

S014 Self-attention과 causal mask
뒤쪽 위치는 허용된 앞쪽 정보를 읽어 자신의 표현을 갱신할 수 있다.
###### 정보를 읽는 기본 연산

$$
\begin{aligned}
\operatorname{Attention}(\mathbf{Q},\mathbf{K},\mathbf{V})
&=\operatorname{softmax}\!\left(\frac{\mathbf{Q}\mathbf{K}^{\mathsf T}}{\sqrt d}+\mathbf{M}\right)\mathbf{V}
\end{aligned}
$$

**Q**는 무엇을 찾을지, **K**는 참고할 특징의 주소, **V**는 가져올 내용을 표현하는 학습된 벡터다. mask M은 참고할 수 없는 위치의 점수를 차단한다. 각 query 위치는 허용된 value들을 가중합해 새로운 표현을 얻는다.

<p class="mini">위 식은 Transformer의 일반 배경식이다. RLDX-1 구현의 모든 attention 세부를 정의하는 식은 아니다.</p>
###### 앞→뒤 순서가 하는 일

<span class="label example">세 위치로 단순화</span>

| 읽는 위치 ↓ | 과거 | 현재 | q |
| --- | --- | --- | --- |
| 과거 | ○ | × | × |
| 현재 | ○ | ○ | × |
| q | ○ | ○ | ○ |

초반 LLM의 causal 구조로 과거 맥락을 현재 프레임과 뒤의 cognition tokens에 모은다. 이는 action을 한 개씩 생성한다는 뜻은 아니다.
Causal mask는 정보 접근 방향을 정한다. 위치마다 표현을 계산하는 것과 순차 행동 생성은 구분한다.
Sec.2.1 · PDF p.7; 배경: Vaswani et al., Sec.3.2 (arXiv:1706.03762)
일반 scaled dot-product attention과 causal masking은 원전 https://arxiv.org/html/1706.03762v7 의 Sec3.1–3.2를 참조했다. 표는 로봇 관측과 q의 시간순서를 설명하는 단순화이며, 실제 Qwen3-VL의 multimodal mask 전체를 재현한 표가 아니다. M의 허용 위치는0, 차단 위치는−∞로 두는 배경 설명이다. MSAT의 joint attention에 이 causal mask를 그대로 적용한다고 주장하지 않는다.

S015 과거 프레임 압축
LLM의 4층 뒤에서 과거 관측 hidden states를 한 context token으로 평균 낸다.
###### 초반에는 시간 맥락을 읽는다

<div class="sequence">
<div class="step">초기 4층: 시간순 영상 토큰 + 지시 + q를 처리</div>
<div class="step">과거 관측 hidden states → average pooling → context 1개</div>
<div class="step">이후 층: context + 현재 관측 + 지시 + q를 처리</div>
</div>

현재 프레임은 남기고, **과거 관측 위치의 표현**을 평균 낸 context token으로 교체한다. 원본 영상을 평균 내서 흐린 한 장을 만드는 과정이 아니다.
###### 왜 4층까지 기다리는가?

Qwen3-VL의 **DeepStack**은 vision encoder의 여러 수준 특징을 초기 4개 LLM 층에 주입한다. 저자는 이 과정을 압축 없이 활용하도록 4층 뒤에 압축한다고 설명한다.

$$
\mathrm{context}=\frac{\mathbf{z}_1+\cdots+\mathbf{z}_{N_{\mathrm{past}}}}{N_{\mathrm{past}}}
$$

<p class="eq-caption">원문의 average pooling을 풀어 쓴 개념식. z는 해당 층의 과거 관측 hidden vectors다.</p>

토큰 수를 줄여 이후 attention 계산을 가볍게 하면서, 초반에 모인 시간 맥락을 활용하려는 설계다.
압축 대상은 과거 관측 표현이고, 현재 관측·지시·cognition 위치는 계속 유지한다.
Sec.2.1 Motion Awareness, LLM backbone · PDF p.7
원문은 과거 observations를 single context token으로 압축하고 현재 관측·지시·q와 함께 후속 블록에서 처리한다고 명시한다. 평균식은 해설용이다. 모든 camera/view별 실제 token grouping이나 구현상 packing 방식은 이 문단에서 명시되지 않는다. 4층 선택 이유는 DeepStack 활용이며, 2층 대비 성능 개선치를 이 절이 보고하는 것은 아니다. VLM 내부 context token을 이후 장의 memory features와 구별한다.

S016 Context·cognition·memory
세 표현은 모두 맥락을 담지만, 생성 위치와 전달 경로가 다르다.
###### 만드는 위치부터 구분하기

| 표현 | 생성 | 사용 |
| --- | --- | --- |
| context token | LLM 4층 뒤<br>과거 관측 평균 | LLM 후속 층의 입력 |
| $\mathbf{h}_{t}$ cognition | 선택 층의<br>cognition token 위치 출력 | memory와 action model |
| $\mathbf{m}_{t}$ memory | 과거 Qₜ와 현재 hₜ를 concat해<br>memory Transformer로 처리 | $\mathbf{h}_{t}$와 함께 action model |
###### 한 가지 “기억 벡터”가 아니다

context token은 **이번 VLM 입력 안의 과거 프레임**을 줄이는 표현이다. $\mathbf{h}_{t}$는 현재 관측 묶음과 지시에서 추출한 행동용 특징이다. memory queue는 이전 로봇 시점들에서 만들어 둔 h를 보관해 더 긴 이력을 제공한다.

<span class="label interpretation">해석</span> 짧은 영상의 시간 정보와 더 긴 작업 이력을 서로 다른 단계에서 처리하는 구조로 볼 수 있다. 두 시간 범위의 실제 효과가 이 표만으로 입증되는 것은 아니다.
VLM 안의 프레임 압축과 VLM 뒤의 memory module을 같은 연산으로 읽지 않는다.
Fig.3, Sec.2.1 · PDF pp.6–7
원문은 64 cognition tokens, past observation single context token, memory queue nmem3을 각각 명시한다. 세 개수를 서로 같은 것으로 해석하지 않는다. $\mathbf{m}_t$가 어떤 출력 위치만 선택하는지의 세부는 본문의 $\mathbf{m}_t=M_\theta([\mathbf{Q}_t,\mathbf{h}_t])$ 이상으로 임의 보완하지 않는다. Fig3의 memory module을 볼 때 VLM 내부 Video Token Compression과의 위치 차이를 함께 짚는다.

S017 Memory queue
과거 cognition features 3묶음에 현재 $\mathbf{h}_t$를 붙여 긴 이력을 다시 읽는다.
###### 저장하는 것은 과거 영상 원본이 아니다

<div class="token-row"><span class="token c">과거 h ①</span><span class="token c">과거 h ②</span><span class="token c">과거 h ③</span></div>

$$
\mathbf{Q}_t=[\text{과거 cognition features 3묶음}]
$$

<div class="flow">
<div class="node">[$\mathbf{Q}_{t}$, $\mathbf{h}_{t}$]</div>
<div class="arrow">→</div>
<div class="node">Memory<br>Transformer</div>
<div class="arrow">→</div>
<div class="node">$\mathbf{m}_{t}$</div>
</div>

현재 관측에 보이지 않는 과거 사건이 행동에 필요할 때를 위해, 이전에 계산한 행동용 특징을 cache에 저장한다.
###### 서로 다른 두 개의 수

<strong>$n_{\mathrm{mem}}$=3</strong>은 cache에 남기는 과거 시점 묶음 수다. 각 h는 cognition features이므로 “숫자 3개”나 “q token 3개”를 뜻하지 않는다. 현재 $\mathbf{h}_{t}$를 더하면 시간상 네 묶음을 memory module이 처리한다.

<span class="label example">Shell game의 직관</span> 컵의 현재 외형만 같아 보여도, 앞서 무엇을 어느 컵에 숨겼는지가 선택을 바꿀 수 있다. queue는 그 과거 관측의 표현을 전달하는 통로다.
긴 이력의 저장 단위는 과거 시점의 cognition features이며, 현재 특징과 함께 읽는다.
Sec.2.1 Functionality2: Long-Term Memory · PDF p.7
원문 memory module은 lightweight Transformer이며 $n_{\mathrm{mem}}=3$이다. $\mathbf{h}_t$는64 cognition token의 hidden features라는 앞 설명을 유지한다. 저장한 features의 dtype·메모리 크기, gradient 처리, 실제 cache 교체 코드는 이 절에서 확인하지 않았다. 설명용 shell game 예시는 원문에 든 대표 동기이며, 정확한 평가 절차는 S090/S094에서 구분한다.

S018 시간 범위와 갱신의 미해결점
저장 간격과 과거 범위는 제시되지만, 매 시점의 cache 관리 규칙까지 확정되지는 않는다.
###### 본문에서 확인한 시간 범위

| 설정 | chunk 길이 | 과거 범위 |
| --- | --- | --- |
| ALLEX | 40 timesteps | 120 timesteps |
| Franka | 16 timesteps | 48 timesteps |

Sec.4.2는 세 묶음을 **H+1 간격**으로 저장하며 chunk 길이에 맞춘다고 설명한다. 이 수치를 실제 초 단위로 읽으려면 제어 주기 등 추가 정보가 필요하다.
###### 표기와 명세의 남은 질문

$$
\mathbf{Q}_t=[\mathbf{h}_{t-3H},\mathbf{h}_{t-2H},\mathbf{h}_{t-H}]
$$

Sec.2.1의 문장은 **H+1**, 바로 아래 queue 수식은 **H** 간격이다.

- 로봇 시점 t가 바뀔 때 언제 저장·교체하는가?
- 시작 시 과거 세 묶음이 부족하면 무엇으로 채우는가?
- episode 경계에서 queue를 어떻게 초기화하는가?

<p class="mini">이 규칙은 검토한 문단에서 확인되지 않았다. 임의의 고정 격자표로 구현 동작을 확정하지 않는다.</p>
시간 간격의 서술과 정확한 갱신·초기화 알고리즘을 구분하고 미해결로 남긴다.
Sec.2.1 · PDF p.7; Sec.4.2 Functionality Expansion · PDF p.13; 질문노트 Q5
H+1=40이면 H=39라고 단순 대입해서 원문의 $\mathbf{h}_{t-H}$식과 memory120 범위를 동시에 일치시킬 수 없다. 이 장은 불일치를 임의 수정하지 않는다. 저자 코드의 exact cache policy는 확인하지 않았고, 본문 명세 불충분을 모델 자체의 동작 결함으로 확대하지 않는다. AppC의40예측/20실행 설정 역시 모든 memory 저장 타이밍을 해명하는 근거가 아니다.

S019 Memory features mₜ
Causal memory Transformer의 출력과 현재 $\mathbf{h}_t$를 모두 행동 모델로 전달한다.
###### 과거→현재 방향으로 이력을 통합

$$
\mathbf{m}_t=M_\theta([\mathbf{Q}_t,\mathbf{h}_t])
$$

<div class="sequence">
<div class="step">오래된 h → 더 최근 h → 현재 h 순서로 입력</div>
<div class="step">나중 시점의 cognition은 자신과 앞선 시점만 참고</div>
<div class="step">이력을 반영한 $\mathbf{m}_{t}$ 생성</div>
</div>

causal attention은 나중 시점이 이전 이력을 참고할 수 있게 하면서 시간 순서를 보존한다. 현재 관측만으로 드러나지 않는 작업 진행 상태를 읽으려는 설계다.
###### 현재 표현도 따로 남긴다

<div class="flow">
<div class="node">현재 $\mathbf{h}_{t}$</div>
<div class="arrow">↘</div>
<div class="node">Action model<br>[$\mathbf{h}_{t}$, $\mathbf{m}_{t}$]</div>
</div>

<div class="flow">
<div class="node">Memory $\mathbf{m}_{t}$</div>
<div class="arrow">↗</div>
<div class="node">현재 + 긴 이력</div>
</div>

memory output으로 $\mathbf{h}_{t}$를 완전히 대체하지 않는다. 원문은 두 특징을 모두 전달한다고 명시한다. 대괄호를 사용한 입력 표기만으로 두 벡터를 원소별로 더한다고 해석해서는 안 된다.
이제 $\mathbf{h}_t$·$\mathbf{m}_t$는 조건이 된다. 다음 단계는 이 조건 아래 미래 행동 chunk를 생성하는 일이다.
Sec.2.1 Long-Term Memory; Sec.2.2 · PDF pp.7–8
원문은 memory features $\mathbf{m}_t$와 original cognition tokens $\mathbf{h}_t$를 모두 action model에 feed한다고 명시한다. $\mathbf{m}_t$의 정확한 output selection이나 learned pooling은 제공된 식 이상으로 확정하지 않는다. 그림의 화살표 두 개는 병행 전달을 설명하며 실제 별도 network 두 개를 의미하지 않는다. 이후 flow matching 설명에서 $\mathbf{c}_t=[\mathbf{h}_t,\mathbf{m}_t,\mathbf{s}_t,\mathbf{p}_t]$의 구성 요소로 연결한다.

S035 Triple-stream에서 double-stream으로
물리 신호가 있을 때는 C와 A가 합쳐진 뒤에도 P 경로가 따로 남는다.
###### 센서가 있는 경우

<div class="token-row"><span class="token c">C</span><span class="token a">A</span><span class="token p">P</span></div>

**초반 triple-stream:** 세 경로가 각자의 파라미터로 처리되면서 joint attention을 수행한다.

$$
\operatorname{concat}(\mathbf{C},\mathbf{A})\to\text{C-A}
$$

<div class="token-row"><span class="token a">C-A 통합 stream</span><span class="token p">P stream</span></div>

**후반 double-stream:** C-A와 P 사이에서도 attention으로 정보를 교환한다.
###### 센서가 없는 기본 구조

<div class="sequence">
<div class="step">초반: C / A의 double-stream</div>
<div class="step">후반: 합쳐진 C-A의 single-stream</div>
</div>

따라서 “double-stream”이라는 말만으로 어느 단계를 가리키는지 알 수 없다. 센서가 없는 초반의 C/A인지, 센서가 있는 후반의 C-A/P인지 문맥을 함께 봐야 한다.

<p class="mini">Fig.3은 물리 경로까지 포함한 확장 구조를 보여준다. P stream을 끄는 것은 전체 모델의 motion·memory까지 모두 끄는 설정이 아니다.</p>
초반은 모달리티별 분리, 후반은 C-A 통합이며 P는 선택적으로 독립 경로를 유지한다.
Sec.2.2 MSAT · PDF p.8; Fig.3 · PDF p.6
기본 double-then-single 구조가 physical stream을 추가하면 triple-then-double이 된다. 각 stage의 정확한 block 개수는 이 문단에서 명시하지 않으므로 임의로 절반씩이라고 그리지 않는다. P가 없는 경우 attention mask로 운영 가능하다는 설명과 별도의 완전히 다른 네트워크를 선택한다는 해석은 구별한다. stream 수 자체를 denoising 반복 횟수로 해석하지 않는다.

S040 Figure 3 전체 해석
표현을 준비하는 VLM·memory와, 미래 후보를 반복 갱신하는 MSAT를 연결한다.
<div class="flow">
<div class="node">영상·지시<br>motion-aware VLM</div>
<div class="arrow">→</div>
<div class="node">$\operatorname{concat}(\mathbf{h}_{t},\mathbf{m}_{t})$<br>cognition·memory 토큰</div>
<div class="arrow">→</div>
<div class="node">MSAT<br>행동·센서 변화율</div>
<div class="arrow">→</div>
<div class="node">Euler 반복<br>미래 후보 갱신</div>
</div>

한 번 준비한 현재 조건 아래 **action chunk 전체**를 다듬는다. 과거 프레임 압축은 VLM 안, 긴 이력 통합은 VLM 뒤, C/A/P 정보 교환은 action model 안에서 일어난다.
<span class="label question">읽을 때 남길 경계</span> memory 갱신·초기화 규칙과 H/H+1, noisy action의 C/A 표기 불일치는 아직 미해결이다. 구조를 이해한 다음에는 이 기능을 어떤 데이터와 학습 단계로 익히는지 확인해야 한다.
구조의 역할을 연결했다. 다음은 실제·합성 데이터가 이 구조를 어떻게 학습시키는가다.
Fig.3, Sec.2.1–2.2 · PDF pp.6–9; 질문노트 Q1·Q5–Q7
Fig.3의 Denoise 표시는 미래 행동·센서 후보의 생성과 연결한다. Action chunk의 각 미래 행동을 autoregressive하게 하나씩 출력하는 흐름으로 읽지 않는다. VLM에서 현재 조건을 얻는 과정과 MSAT denoising 반복은 개념적으로 구별되며 실제 feature caching 구현은 이 그림만으로 단정하지 않는다. Fig.3 caption의 previous actions 표현을 추가 제어 입력 명세로 확장하지 않고 본문의 $\mathbf{s}_t$, noisy actions 설명을 따른다. 현재 sensor는 observed condition, future physical prediction은 auxiliary objective라는 구분을 다시 짚는다. 각 module의 독립적인 인과 기여는 구조도 자체로 검증되지 않는다.
-->

---
layout: none
---

<!-- slide-id: P006 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P006"><header class="seminar-header"><div class="chapter-label">RLDX-1 Architecture</div><h1>Action Model의 학습 원리</h1><p class="slide-lead">정답 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="bold">a</mi></mrow><annotation encoding="application/x-tex">\mathbf a</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4444em;"></span><span class="mord mathbf">a</span></span></span></span>와 노이즈를 섞어 입력 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi mathvariant="bold">a</mi><mi>τ</mi></msup></mrow><annotation encoding="application/x-tex">\mathbf a^\tau</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span></span></span></span></span></span></span>를 만들고, 정답 변화율을 예측하도록 학습한다.</p></header><div class="seminar-body split"><div class="body-main"><h3>Noisy action chunk</h3>
<div class="equation"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msup><mi mathvariant="bold">a</mi><mi>τ</mi></msup><mo>=</mo><mi>τ</mi><mi mathvariant="bold">a</mi><mo>+</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mi>τ</mi><mo stretchy="false">)</mo><mi mathvariant="bold-italic">ϵ</mi></mrow><annotation encoding="application/x-tex">\mathbf{a}^{\tau}=\tau\mathbf{a}+(1-\tau)\boldsymbol{\epsilon}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7144em;"></span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="mord mathbf">a</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="mclose">)</span><span class="mord"><span class="mord"><span class="mord boldsymbol">ϵ</span></span></span></span></span></span></span></div>
<table class="chunk-symbols" aria-label="Action chunk 기호 설명"><tbody>
<tr><th scope="row"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="bold">a</mi></mrow><annotation encoding="application/x-tex">\mathbf a</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4444em;"></span><span class="mord mathbf">a</span></span></span></span></th><td>정답(clean) action chunk</td></tr>
<tr><th scope="row"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi mathvariant="bold">a</mi><mi>τ</mi></msup></mrow><annotation encoding="application/x-tex">\mathbf a^\tau</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span></span></span></span></span></span></span></th><td><strong>노이즈가 섞인 action chunk</strong></td></tr>
<tr><th scope="row"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="bold-italic">ϵ</mi></mrow><annotation encoding="application/x-tex">\boldsymbol\epsilon</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4444em;"></span><span class="mord"><span class="mord"><span class="mord boldsymbol">ϵ</span></span></span></span></span></span></th><td>같은 shape의 표준 정규 노이즈</td></tr>
<tr><th scope="row"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>τ</mi></mrow><annotation encoding="application/x-tex">\tau</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span></span></span></span></th><td>Denoising timestep; <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>τ</mi><mo>=</mo><mn>1</mn><mo>⇒</mo><msup><mi mathvariant="bold">a</mi><mi>τ</mi></msup><mo>=</mo><mi mathvariant="bold">a</mi></mrow><annotation encoding="application/x-tex">\tau=1\Rightarrow\mathbf a^\tau=\mathbf a</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">⇒</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.4444em;"></span><span class="mord mathbf">a</span></span></span></span></td></tr>
</tbody></table>
<div class="equation"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mfrac><mrow><mi>d</mi><msup><mi mathvariant="bold">a</mi><mi>τ</mi></msup></mrow><mrow><mi>d</mi><mi>τ</mi></mrow></mfrac><mo>=</mo><mi mathvariant="bold">a</mi><mo>−</mo><mi mathvariant="bold-italic">ϵ</mi><mo>=</mo><msup><mi mathvariant="bold">v</mi><mo>∗</mo></msup></mrow><annotation encoding="application/x-tex">\frac{d\mathbf a^\tau}{d\tau}=\mathbf a-\boldsymbol\epsilon=\mathbf v^*</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.0574em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">d</span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathbf">a</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.4444em;"></span><span class="mord"><span class="mord"><span class="mord boldsymbol">ϵ</span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7387em;"></span><span class="mord"><span class="mord mathbf" style="margin-right:0.016em;">v</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7387em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mbin mtight">∗</span></span></span></span></span></span></span></span></span></span></span></span></div>
</div><div class="body-aside"><h3>Flow-matching loss</h3>
<div class="equation"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi mathvariant="script">L</mi><mo>=</mo><mo fence="true" stretchy="true" minsize="1.2em" maxsize="1.2em">∥</mo><munder><munder><mstyle mathcolor="#167e7a"><msub><mi mathvariant="bold">u</mi><mi>θ</mi></msub></mstyle><mo stretchy="true">⏟</mo></munder><mtext>MSAT</mtext></munder><mo stretchy="false">(</mo><msup><mi mathvariant="bold">a</mi><mi>τ</mi></msup><mo separator="true">,</mo><mi>τ</mi><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi>t</mi></msub><mo stretchy="false">)</mo><mo>−</mo><msup><mi mathvariant="bold">v</mi><mo>∗</mo></msup><msubsup><mo fence="true" stretchy="true" minsize="1.2em" maxsize="1.2em">∥</mo><mn>2</mn><mn>2</mn></msubsup></mrow><annotation encoding="application/x-tex">\mathcal L=\bigl\lVert\underbrace{\textcolor{#167e7a}{\mathbf u_\theta}}_{\text{MSAT}}(\mathbf a^\tau,\tau,\mathbf c_t)-\mathbf v^*\bigr\rVert_2^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathcal">L</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.3263em;vertical-align:-1.4763em;"></span><span class="mopen"><span class="delimsizing mult"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-2.85em;"><span class="pstrut" style="height:3.2em;"></span><span style="width:0.556em;height:1.2em;"><svg xmlns="http://www.w3.org/2000/svg" width="0.556em" height="1.2em" viewBox="0 0 556 1200"><path d="M145 15 v585 v0 v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v0 v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v0 v585 h43z
M367 15 v585 v0 v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v0 v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v0 v585 h43z"/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span><span class="minner munder"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.4444em;"><span style="top:-1.5237em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">MSAT</span></span></span></span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="minner munder"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.4444em;"><span class="svg-align" style="top:-2.202em;"><span class="pstrut" style="height:3em;"></span><span class="katex-stretchy" style="height:0.548em;min-width:1.6em;"><span class="brace-left" style="height:0.548em;"><svg xmlns="http://www.w3.org/2000/svg" width="400em" height="0.548em" viewBox="0 0 400000 548" preserveAspectRatio="xMinYMin slice"><path d="M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z"/></svg></span><span class="brace-center" style="height:0.548em;"><svg xmlns="http://www.w3.org/2000/svg" width="400em" height="0.548em" viewBox="0 0 400000 548" preserveAspectRatio="xMidYMin slice"><path d="M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z"/></svg></span><span class="brace-right" style="height:0.548em;"><svg xmlns="http://www.w3.org/2000/svg" width="400em" height="0.548em" viewBox="0 0 400000 548" preserveAspectRatio="xMaxYMin slice"><path d="M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z"/></svg></span></span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord" style="color:#167e7a;"><span class="mord mathbf" style="color:#167e7a;">u</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight" style="color:#167e7a;"><span class="mord mathnormal mtight" style="margin-right:0.0278em;color:#167e7a;">θ</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.798em;"><span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.4763em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.4537em;vertical-align:-0.3997em;"></span><span class="mord"><span class="mord mathbf" style="margin-right:0.016em;">v</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7387em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mbin mtight">∗</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose"><span class="delimsizing mult"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-2.85em;"><span class="pstrut" style="height:3.2em;"></span><span style="width:0.556em;height:1.2em;"><svg xmlns="http://www.w3.org/2000/svg" width="0.556em" height="1.2em" viewBox="0 0 556 1200"><path d="M145 15 v585 v0 v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v0 v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v0 v585 h43z
M367 15 v585 v0 v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v0 v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v0 v585 h43z"/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.054em;"><span style="top:-2.3003em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span><span style="top:-3.3029em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3997em;"><span></span></span></span></span></span></span></span></span></span></span></div>
<p class="callout"><strong><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">u</mi><mi>θ</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf u_\theta</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathbf">u</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">θ</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>: 학습 가능한 신경망(MSAT)</strong><br>
논문에서는 <strong>neural vector field</strong>로 부른다.<br>
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi></mrow><annotation encoding="application/x-tex">\theta</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">θ</span></span></span></span>는 학습되는 신경망의 가중치다.</p>
<p><strong>함수의 출력:</strong> chunk 전체의 <strong>예측 변화율</strong>.<br>
어느 방향으로 얼마나 바꿀지를 나타낸다.</p>
<p class="mini">손실은 이 예측 변화율과 정답 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi mathvariant="bold">v</mi><mo>∗</mo></msup></mrow><annotation encoding="application/x-tex">\mathbf v^*</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6887em;"></span><span class="mord"><span class="mord mathbf" style="margin-right:0.016em;">v</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6887em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mbin mtight">∗</span></span></span></span></span></span></span></span></span></span></span>의 오차 제곱합이다.</p></div></div><div class="takeaway">예측 변화율과 정답 변화율의 오차 제곱합을 줄이도록 모델 파라미터를 학습한다.</div><footer class="seminar-footer"><span class="source">Sec.2.2 Eq.(1) · PDF p.8; noisy action chunk는 원문 용어, 미분·좌표별 합은 설명용 전개</span><span class="slide-id">P006 · 005/25</span></footer></section>

<!--
P006과 P007을 통합했다. Transformer/DiT는 구조, flow matching은 목표, Euler는 추론 갱신이며 고전 diffusion 손실과 순차 적용하는 두 단계가 아니다. S020–026/S028의 유도·수식·용어·shape 해설을 모두 유지한다. 개별 정답 쌍의 직선 target이 상수라는 것과 학습한 vector field가 모든 입력에서 상수라는 것은 다르다. 현재 조건의 센서는 사용 가능할 때 포함한다. Sec.1.1의 c_t는 지시지만 여기서는 Sec.2.2의 전체 조건 정의다. τ의 정확한 샘플링 분포·구현상 loss reduction을 임의 확정하지 않는다. P006 Browser Comment1–4 후속: 본문에서 t/τ 재설명과 c_t 정의·숫자 예시를 빼고 기호 표와 손실 항 해석으로 바꿨다. 원문은 noisy action chunk라고 명시한다. 좌표 j는 action chunk의 시간·행동 차원 전체를 펼쳐 읽기 위한 설명용 인덱스이며 추가 평균/reduction 구현을 확정하지 않는다. 기존 숫자 예시와 시간/조건 설명은 S021/S022/S023/S026 해설에 그대로 보존한다. 최신 annotation 요청: u_θ 자체는 파라미터 θ를 학습하는 neural vector field이며 구현은 MSAT다. u_θ(a^τ,τ,c_t)는 그 함수를 평가해 얻은 예측 변화율이다. 둘을 구분해 u_θ에 직접 underbrace를 연결하고 같은 색의 모델 주석으로 설명한다. 좌표별 손실 전개는 상세 해설에 유지한다.

S020 Diffusion·DiT·flow matching
구조의 이름, 학습할 목표, 추론에서 샘플을 만드는 방법을 나누어 읽는다.
###### 이 보고서의 선택

| 질문 | RLDX-1 |
| --- | --- |
| 어떤 신경망인가? | Transformer 기반 MSAT<br>논문은 flow-matching DiT로 지칭 |
| 무엇을 학습하는가? | 노이즈→행동 경로의 velocity field |
| 어떻게 생성하는가? | 노이즈에서 시작해 Euler 반복 |

Policy는 관측·지시로 행동을 정하는 역할을 가리킨다. 그 역할을 구현하는 구조와 학습법은 따로 선택할 수 있다.
###### 용어를 하나의 필수 계층으로 묶지 않기

DiT 원전은 이미지 diffusion의 기존 U-Net backbone을 Transformer로 바꾼 구조를 연구한다. 따라서 diffusion이라는 이름이 U-Net을 필수로 뜻하지 않는다.

Flow matching 원전은 확률 경로의 vector field를 회귀하는 학습법이며 diffusion 경로도 다룰 수 있다. RLDX-1은 **선형 보간 경로와 velocity 목표**를 사용한다. 고전 diffusion 손실을 먼저 학습하고 flow matching을 추가하는 두 단계라고 설명하지 않는다.
여기서는 MSAT가 변화율을 학습하고, Euler 적분이 그 변화율로 행동 후보를 이동시킨다.
Sec.2.2 · PDF p.8; DiT (arXiv:2212.09748); Flow Matching (arXiv:2210.02747)
배경 원전: https://arxiv.org/abs/2212.09748 및 https://arxiv.org/abs/2210.02747. DiT는 structure, flow matching은 training objective, Euler는 sampling/integration 방법이라는 구분을 위한 장이다. 모든 diffusion 방식이 flow matching과 동일하다거나 모든 FM 경로가 선형이라는 주장은 하지 않는다. 다음 장부터 보고서 Sec2.2의 구체적 선형 경로를 그대로 따른다.

S021 실제 시간과 denoising timestep
t는 로봇 세계의 시점이고, $\tau$는 한 미래 후보를 다듬는 생성 과정의 위치다.
###### 두 종류의 진행

<div class="sequence">
<div class="step"><strong>로봇 시간 t:</strong> 지금 관측·상태를 얻는 시점</div>
<div class="step"><strong>미래 행동 범위:</strong> $\mathbf{a}_{t:t+H}$, t부터 t+H까지 H+1개</div>
<div class="step"><strong>생성 과정 $\tau$:</strong> 0의 노이즈에서 1의 데이터 쪽으로 이동</div>
</div>

한 번의 정책 호출 안에서도 $\tau$를 여러 번 바꾼다. $\tau$가 한 번 갱신될 때 실제 로봇이 한 timestep 전진한다는 뜻은 아니다.
###### H와 L은 생성할 시퀀스 길이에 관련

| 표기 | 역할 |
| --- | --- |
| H+1 | 행동 $\mathbf{a}_{t:t+H}$의 원소 수 |
| L | 미래 센서 $\mathbf{p}_{t+1:t+L}$의 원소 수 |
| $\tau\in[0,1]$ | denoising timestep |

Sec.4.2의 물리 신호 예측 설정은 **L=H+1**이다. 예측 길이와 실제 실행할 행동 개수는 별도 설정이다. “40개 예측·20개 실행” 같은 차이는 뒤의 실행 장에서 다룬다.
$\tau$의 반복 횟수, 미래 chunk 길이, 로봇에서 실행한 길이는 같은 숫자가 아니다.
Sec.1.1 · PDF p.5; Sec.2.2 · PDF p.8; Sec.4.2 · PDF p.13
원문의 Eq2는 한 로봇 시점 t에 대해 미래 action chunk 전체를 생성한다. 실제 로봇에서 chunk를 일부 실행한 후 새 관측으로 정책을 호출하는 과정은 별도 외부 loop다. H와 H+1 표기는 action을 t부터 포함하는 inclusive index에서 비롯되나, memory queue의 H/H+1 불일치는 S018의 미해결 상태를 유지한다. 미래 센서가t+1부터 시작하는 점도 행동의t 시작과 구별한다.

S022 조건과 생성 후보
현재 조건은 “무엇을 해야 하는가”를 정하고, noisy 후보는 실제로 갱신할 생성 대상이다.
###### 이번 정책 호출의 조건 cₜ

$$
\mathbf{c}_t=[\mathbf{h}_t,\mathbf{m}_t,\mathbf{s}_t,\mathbf{p}_t]
$$

- <strong>$\mathbf{h}_{t}$:</strong> 시각·언어 cognition features.
- <strong>$\mathbf{m}_{t}$:</strong> 긴 이력을 반영한 memory features.
- <strong>$\mathbf{s}_{t}$:</strong> 현재 로봇의 proprioceptive state.
- <strong>$\mathbf{p}_{t}$:</strong> 사용 가능한 현재 tactile·torque 신호.

물리 신호는 있을 때만 이용하며, 앞의 네 항을 모두 정답 미래 행동이라고 부르지 않는다.
###### 다듬어 갈 미래 후보

<div class="token-row"><span class="token a">행동 후보 $\mathbf{a}^{\tau}_{t:t+H}$</span><span class="token p">센서 후보 $\mathbf{p}^{\tau}_{t+1:t+L}$</span></div>

추론에서는 노이즈로 시작한 후보를 입력하고, 현재 $\tau$와 조건을 참고해 예측한 변화율로 후보를 갱신한다. <strong>현재 $\mathbf{p}_{t}$</strong>와 <strong>noisy future $\mathbf{p}^{\tau}$</strong>는 시간과 역할이 다르다.

<p class="callout">동일 t의 denoising 반복에서 조건을 참조하는 것과, 미래 후보 값을 바꾸는 것을 구분한다.</p>
입력에 들어간다고 모두 관측값인 것은 아니다. 일부는 모델이 생성 중인 미래 후보다.
Sec.2.2, Physical Sensing · PDF p.8; 질문노트 Q7
본문 $\mathbf{c}_t$ 식은 physical signals가when available이라는 조건을 가진다. P stream의 현재p와 noisy futurep 배치는 Fig3와 Physical Sensing 설명을 함께 읽은 개념적 정리다. 모델 내부 hidden states는 매 블록 변하지만, 그 사실을 현재 센서 조건 자체를 denoising한다는 말로 바꾸지 않는다. 실제 condition caching이나 forward별 계산 생략 방식은 구현 확인 전에는 확정하지 않는다.

S023 노이즈와 정답 사이의 경로
정답 행동과 노이즈를 $\tau$의 가중치로 섞어 학습용 중간 후보를 만든다.
###### 원문의 선형 보간

$$
\begin{aligned}
\mathbf{a}_{t:t+H}^{\tau}
&=\tau\mathbf{a}_{t:t+H}+(1-\tau)\boldsymbol{\epsilon}
\end{aligned}
$$

**a**는 데이터의 정답 action chunk, <strong>$\boldsymbol{\epsilon}\sim\mathcal{N}(0,I)$</strong>는 같은 shape의 표준 정규 노이즈다. $\tau$는 0부터 1 사이의 denoising timestep이다. $\tau$가 커질수록 정답 쪽 비중이 커진다.

$$
\begin{aligned}
\tau=0&\;\Rightarrow\;\mathbf{a}^{0}=\boldsymbol{\epsilon}\\
\tau=1&\;\Rightarrow\;\mathbf{a}^{1}=\mathbf{a}
\end{aligned}
$$
###### 두 좌표만 남긴 예시

<span class="label example">정답 [3,−1], 노이즈 [−1,1]</span>

| $\tau$ | 혼합 결과 $\mathbf{a}^{\tau}$ |
| --- | --- |
| 0 | \[−1, 1\] |
| 0.25 | \[0, 0.5\] |
| 0.5 | \[1, 0\] |
| 1 | \[3, −1\] |

학습은 정답으로 중간 점을 만든다. 추론은 정답 a를 모르므로 이 식으로 직접 생성할 수 없다.
학습에서 아는 직선 경로를 이용해 변화율을 가르치고, 추론에서는 그 예측을 사용한다.
Sec.2.2의 noisy action 구성식 · PDF p.8
숫자는 실험 action이 아닌 설명용이다. 실제 모델의 \[−1,1\] 정규화 범위와 별개인 단순 벡터다. $\mathbf{a}^{\tau}$는 action chunk 전체와 같은 shape다. 이 논문의 $\tau$ 방향은 0의 noise에서 1의 data로 간다. 다른 diffusion 문헌의 time 방향을 그대로 가져오지 않는다. 예시 노이즈의 값이 \[−1,1\]이라고 해서 실제 입력을 uniform \[−1,1\]로 샘플링한다는 뜻은 아니다.

S024 변화율의 유도
정답과 노이즈를 고정하고 선형 경로를 $\tau$로 미분하면 $\mathbf{a}-\boldsymbol{\epsilon}$가 나온다.
###### 식의 각 항을 따로 미분

$$
\mathbf{a}^{\tau}=\tau\mathbf{a}+(1-\tau)\boldsymbol{\epsilon}
$$

$$
\begin{aligned}
\frac{d(\tau\mathbf{a})}{d\tau}&=\mathbf{a}\\
\frac{d((1-\tau)\boldsymbol{\epsilon})}{d\tau}&=-\boldsymbol{\epsilon}\\
\frac{d\mathbf{a}^{\tau}}{d\tau}&=\mathbf{a}-\boldsymbol{\epsilon}
\end{aligned}
$$

여기서 a와 $\boldsymbol{\epsilon}$는 한 학습 쌍에서 고정하고, $\tau$에 따라 중간 점이 어떻게 바뀌는지를 본다. 로봇 위치를 실제 시간 t로 미분한 물리 속도와는 다른 생성 공간의 변화율이다.
###### 변화량과 변화율을 구별하기

<span class="label example">앞 장의 2차원 예시</span>

$$
\begin{aligned}
\mathbf{a}-\boldsymbol{\epsilon}&=[3,-1]-[-1,1]\\
&=[4,-2]
\end{aligned}
$$

$\tau$가 1만큼 증가할 때의 변화율이 \[4,−2\]다. 작은 간격 <strong>$\Delta\tau=0.25$</strong> 동안의 이동량은 그 1/4인 <strong>\[1,−0.5\]</strong>가 된다.

모델은 학습에서 이 정답 변화율을 맞히도록 훈련된다. “노이즈를 뺀 값”이라는 대수 표현과 “노이즈만 직접 예측한다”는 학습 목표는 구분해야 한다.
학습 target은 정답 행동 a 자체가 아니라, 경로의 $\tau$ 변화율 $\mathbf{a}-\boldsymbol{\epsilon}$다.
Sec.2.2 Eq.(1)의 target; 선형 경로의 미분 풀이 · PDF p.8
원문은 target을 $\mathbf{a}-\boldsymbol{\epsilon}$로 명시한다. 미분을 항별로 나눈 과정은 해설이며 새 알고리즘이 아니다. $\mathbf{a}^{\tau}$에서 t:t+H 첨자는 읽기 쉽게 잠시 생략했다. 학습의 개별 정답 쌍에서 직선 velocity는 상수지만, 여러 데이터 쌍을 함께 학습한 neural vector field가 모든 입력에서 같은 상수라는 뜻은 아니다. 다음 장은 $\mathbf{u}_\theta$의 입출력을 설명한다.

S025 Neural vector field
$\mathbf{u}_\theta$는 후보와 $\tau$·조건을 보고, chunk 전체를 어느 방향으로 얼마나 바꿀지 예측한다.
###### 같은 shape의 변화율을 출력

<div class="flow">
<div class="node">$\mathbf{a}^{\tau}$, $\tau$, $\mathbf{c}_{t}$</div>
<div class="arrow">→</div>
<div class="node">$\mathbf{u}_{\theta}$<br>MSAT</div>
<div class="arrow">→</div>
<div class="node">예측 velocity</div>
</div>

학습 가능한 파라미터 $\theta$를 가진 신경망이 현재 후보 위치에서의 변화율을 계산한다. 출력은 행동 시퀀스의 각 좌표에 대한 값이며, **방향뿐 아니라 크기**도 가진다. $\tau$를 조금 옮기면 후보가 얼마나 달라질지 알려준다.
###### 한 점에서의 벡터를 읽기

<span class="label example">변화율 [4,−2]</span>

첫 좌표는 $\tau$ 증가에 따라 커지고 둘째 좌표는 작아진다. 첫 좌표 변화율의 절댓값이 두 배이므로 같은 $\Delta\tau$에서 더 많이 이동한다. 단위 방향 \[0.894,−0.447\]만으로는 이 이동 크기를 복원할 수 없다.

한 forward는 미래 action chunk의 변화율을 **함께** 예측한다. 다음 denoising 단계에서는 갱신된 후보를 다시 넣어 변화율을 재계산한다. 이는 출력 action을 한 토큰씩 이어 붙이는 방식과 다르다.
Vector field는 생성 공간의 위치마다 변화율을 주며, 실제 이동량은 $\Delta\tau$와 곱해 얻는다.
Sec.2.2 Eq.(1)–(2) · PDF p.8
단위 벡터 숫자는 $[4,-2]/\sqrt{20}$으로 계산한 설명용 반올림이다. $\mathbf{u}_\theta$의 출력은 학습 target $\mathbf{a}-\boldsymbol{\epsilon}$와 shape가 맞아야 한다. 실제 신경망은 조건에 따른 velocity field를 근사하며 매 갱신마다 같은 벡터를 반환한다고 보장하지 않는다. 행동의 미래 시점 축을 한 번에 처리하는 것과 내부 Transformer layer의 순차 계산은 구분한다.

S026 학습 손실 Eq.1
예측 변화율과 정답 변화율의 좌표별 차이를 제곱해 합친다.
###### 원문의 flow-matching objective

$$
\begin{aligned}
\mathcal{L}(\theta;t,\tau,\boldsymbol{\epsilon})
&=\bigl\lVert\mathbf{u}_\theta(\mathbf{a}_{t:t+H}^{\tau},\tau,\mathbf{c}_t)\\
&\qquad-(\mathbf{a}_{t:t+H}-\boldsymbol{\epsilon})\bigr\rVert_2^2
\end{aligned}
$$

- <strong>$\mathbf{u}_{\theta}$(…):</strong> 모델이 예측한 변화율.
- <strong>$\mathbf{a}-\boldsymbol{\epsilon}$:</strong> 선형 경로에서 계산한 정답 변화율.
- <strong>$\lVert\cdot\rVert_2$:</strong> L2 norm. 아래의 2는 norm의 종류다.
- **바깥의 제곱:** 제곱근을 상쇄해 좌표별 오차 제곱의 합이 된다.
###### 작은 오차 벡터로 계산

<span class="label example">두 좌표의 설명용 예시</span>

$$
\begin{aligned}
\text{정답 velocity}&=[4,-2]\\
\text{예측 velocity}&=[3.9,-1.8]
\end{aligned}
$$

$$
\begin{aligned}
\text{오차}&=[-0.1,0.2]\\
\lVert\text{오차}\rVert_2^2&=(-0.1)^2+0.2^2=0.05
\end{aligned}
$$

실제 chunk의 모든 미래 시점·행동 좌표에 걸친 오차를 줄이도록 $\theta$를 갱신한다.
이 손실은 “정답으로 향하는 변화율을 얼마나 정확히 예측했는가”를 측정한다.
Sec.2.2 Eq.(1) · PDF p.8
원문의 $\mathcal{L}(\theta;t,\tau,\boldsymbol{\epsilon})$는 샘플별 목적함수 표현이다. 학습은 여러 t·$\tau$·$\boldsymbol{\epsilon}$ 샘플의 손실로 최적화한다. 좌표별 합을 batch mean 또는 전체 mean으로 구현하는 정확한 reduction은 이 식만으로 단정하지 않는다. 아래첨자 2를 제곱 횟수나 denoising step 수로 설명하지 않는다. 본문 식은 action loss이고 physics auxiliary loss는 S030에서 별도로 다룬다.

S028 학습 과정
정답을 알고 있으므로 무작위 $\tau$의 후보와 정답 변화율을 직접 만들어 학습한다.
###### 한 학습 샘플을 만드는 순서

<div class="sequence">
<div class="step">① 데이터: 현재 조건 $\mathbf{c}_{t}$와 정답 action chunk a</div>
<div class="step">② $\tau\in[0,1]$, $\boldsymbol{\epsilon}\sim\mathcal{N}(0,I)$를 샘플링</div>
<div class="step">③ $\mathbf{a}^{\tau}=\tau\mathbf{a}+(1-\tau)\boldsymbol{\epsilon}$ 를 직접 구성</div>
<div class="step">④ $\mathbf{u}_\theta(\mathbf{a}^{\tau},\tau,\mathbf{c}_t)$를 예측</div>
<div class="step">⑤ target $\mathbf{a}-\boldsymbol{\epsilon}$와 손실 → 역전파 → $\theta$ 갱신</div>
</div>
###### 학습의 τ와 추론의 반복을 구별

원문의 학습 objective는 샘플링한 $\tau$에서 변화율을 맞히는 방식이다. 각 학습 샘플마다 $\tau=0$부터 1까지 완전한 denoising을 모두 수행해야 한다는 설명이 아니다.

여러 조건·정답·노이즈·$\tau$를 반복해 학습하면 다양한 중간 후보에서 쓸 변화율을 배우게 된다. 추론 때는 정답 a를 모르므로 모델이 예측한 변화율을 이용한다.

<p class="mini">학습 중 바꾸는 것은 모델 파라미터 $\theta$다. 후보 $\mathbf{a}^{\tau}$를 여러 번 Euler로 옮기는 추론 과정과 역할이 다르다.</p>
학습은 무작위 중간 점에서의 변화율 회귀이고, 추론은 그 모델로 후보를 반복 이동하는 과정이다.
Sec.2.2 Eq.(1) 앞의 training 설명 · PDF p.8
원문은 $\tau\in[0,1]$을 sample한다고 명시하나 이 문단에 $\tau$의 정확한 확률분포가 없으므로 uniform이라고 확정하지 않는다. $\boldsymbol{\epsilon}$는 standard normal이다. 한 학습 샘플을 만드는 개념 순서이며 batching이나 feature cache의 실제 구현 순서를 재현한 것은 아니다. Flow Matching 원전은 simulation-free training을 제시하지만 이 장 핵심은 RLDX-1 자체의 손실 구성이다.
-->

---
layout: none
---

<!-- slide-id: P008 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P008"><header class="seminar-header"><div class="chapter-label">RLDX-1 Architecture</div><h1>Action Model의 추론 수식</h1><p class="slide-lead">현재 조건을 고정해 참조하면서 미래 행동·센서 후보를 반복 갱신한다.</p></header><div class="seminar-body split"><div class="body-main"><h3>변화율 × 간격 = 이동량</h3>
<div class="equation"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mtable rowspacing="0.25em" columnalign="right left" columnspacing="0em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mi mathvariant="normal">Δ</mi><msub><mi>τ</mi><mi>i</mi></msub></mrow></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><msub><mi>τ</mi><mrow><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub><mo>−</mo><msub><mi>τ</mi><mi>i</mi></msub></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><msup><mi mathvariant="bold">a</mi><msub><mi>τ</mi><mrow><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub></msup></mstyle></mtd><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mrow></mrow><mo>=</mo><msup><mi mathvariant="bold">a</mi><msub><mi>τ</mi><mi>i</mi></msub></msup><mo>+</mo><mi mathvariant="normal">Δ</mi><msub><mi>τ</mi><mi>i</mi></msub><msub><mi mathvariant="bold">u</mi><mi>θ</mi></msub><mo stretchy="false">(</mo><msup><mi mathvariant="bold">a</mi><msub><mi>τ</mi><mi>i</mi></msub></msup><mo separator="true">,</mo><msub><mi>τ</mi><mi>i</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">c</mi><mi>t</mi></msub><mo stretchy="false">)</mo></mrow></mstyle></mtd></mtr></mtable><annotation encoding="application/x-tex">\begin{aligned}
\Delta\tau_i&amp;=\tau_{i+1}-\tau_i\\
\mathbf{a}^{\tau_{i+1}}&amp;=\mathbf{a}^{\tau_i}+\Delta\tau_i\mathbf{u}_\theta(\mathbf{a}^{\tau_i},\tau_i,\mathbf{c}_t)
\end{aligned}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.7em;vertical-align:-1.1em;"></span><span class="mord"><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6em;"><span style="top:-3.76em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">Δ</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.1132em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-2.26em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3281em;"><span style="top:-2.357em;margin-left:-0.1132em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mbin mtight">+</span><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2025em;"><span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.1em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6em;"><span style="top:-3.76em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.1132em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mbin mtight">+</span><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2083em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.1132em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span><span style="top:-2.26em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3281em;"><span style="top:-2.357em;margin-left:-0.1132em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">Δ</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.1132em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathbf">u</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">θ</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3281em;"><span style="top:-2.357em;margin-left:-0.1132em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.1132em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">c</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.1em;"><span></span></span></span></span></span></span></span></span></span></span></span></div>
<table class="chunk-symbols" aria-label="Euler 갱신식의 각 항"><tbody>
<tr><th scope="row"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi mathvariant="bold">a</mi><msub><mi>τ</mi><mi>i</mi></msub></msup></mrow><annotation encoding="application/x-tex">\mathbf a^{\tau_i}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3281em;"><span style="top:-2.357em;margin-left:-0.1132em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.143em;"><span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></th><td>현재 denoising timestep의 action chunk</td></tr>
<tr><th scope="row"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">u</mi><mi>θ</mi></msub><mo stretchy="false">(</mo><mo>⋯</mo><mtext> </mtext><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\mathbf u_\theta(\cdots)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathbf">u</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">θ</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="minner">⋯</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mclose">)</span></span></span></span></th><td>모델이 예측한 chunk 전체의 변화율</td></tr>
<tr><th scope="row"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Δ</mi><msub><mi>τ</mi><mi>i</mi></msub><msub><mi mathvariant="bold">u</mi><mi>θ</mi></msub><mo stretchy="false">(</mo><mo>⋯</mo><mtext> </mtext><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\Delta\tau_i\mathbf u_\theta(\cdots)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Δ</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.1132em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathbf">u</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.0278em;">θ</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="minner">⋯</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mclose">)</span></span></span></span></th><td><strong>이번 갱신량 = 간격 × 변화율</strong></td></tr>
<tr><th scope="row"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi mathvariant="bold">a</mi><msub><mi>τ</mi><mrow><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub></msup></mrow><annotation encoding="application/x-tex">\mathbf a^{\tau_{i+1}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6644em;"></span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3281em;"><span style="top:-2.357em;margin-left:-0.1132em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="katex-sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mbin mtight">+</span><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2025em;"><span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></th><td>갱신 후 다음 timestep의 action chunk</td></tr>
</tbody></table>
<p>이 갱신을 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>τ</mi><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">\tau=1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>까지 반복한다.</p>
</div><div class="body-aside"><h3>현재 센서와 미래 센서는 역할이 다르다</h3>
<p><strong>현재 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="bold">p</mi><mi>t</mi></msub></mrow><annotation encoding="application/x-tex">\mathbf{p}_t</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6389em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathbf">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>:</strong> 관측된 조건.<br><strong>미래 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi mathvariant="bold">p</mi><mrow><mi>t</mi><mo>+</mo><mn>1</mn><mo>:</mo><mi>t</mi><mo>+</mo><mi>L</mi></mrow><mi>τ</mi></msubsup></mrow><annotation encoding="application/x-tex">\mathbf{p}_{t+1:t+L}^{\tau}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9981em;vertical-align:-0.3337em;"></span><span class="mord"><span class="mord mathbf">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-2.4247em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">t</span><span class="mbin mtight">+</span><span class="mord mtight">1</span><span class="mrel mtight">:</span><span class="mord mathnormal mtight">t</span><span class="mbin mtight">+</span><span class="mord mathnormal mtight">L</span></span></span></span><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3337em;"><span></span></span></span></span></span></span></span></span></span>:</strong> 함께 denoising할 후보.</p>
<div class="equation"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mtable rowspacing="0.25em" columnalign="center" columnspacing="0em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><msup><mi mathvariant="bold">p</mi><mi>τ</mi></msup><mo>=</mo><mi>τ</mi><msub><mi mathvariant="bold">p</mi><mrow><mi mathvariant="normal">f</mi><mi mathvariant="normal">u</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">u</mi><mi mathvariant="normal">r</mi><mi mathvariant="normal">e</mi></mrow></msub><mo>+</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mi>τ</mi><mo stretchy="false">)</mo><msub><mi mathvariant="bold-italic">ϵ</mi><mi>p</mi></msub></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="true"><mrow><mtext>미래 센서의 target:</mtext><mspace width="1em"/><msub><mi mathvariant="bold">p</mi><mrow><mi mathvariant="normal">f</mi><mi mathvariant="normal">u</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">u</mi><mi mathvariant="normal">r</mi><mi mathvariant="normal">e</mi></mrow></msub><mo>−</mo><msub><mi mathvariant="bold-italic">ϵ</mi><mi>p</mi></msub></mrow></mstyle></mtd></mtr></mtable><annotation encoding="application/x-tex">\begin{gathered}
\mathbf{p}^{\tau}=\tau\mathbf{p}_{\mathrm{future}}+(1-\tau)\boldsymbol{\epsilon}_p\\
\text{미래 센서의 target:}\quad\mathbf{p}_{\mathrm{future}}-\boldsymbol{\epsilon}_p
\end{gathered}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.7em;vertical-align:-1.1em;"></span><span class="mord"><span class="mtable"><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6em;"><span style="top:-3.76em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mord mathbf">p</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="mord"><span class="mord mathbf">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">future</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="mclose">)</span><span class="mord"><span class="mord"><span class="mord"><span class="mord boldsymbol">ϵ</span></span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">p</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span><span style="top:-2.26em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord hangul_fallback">미래</span><span class="mord"> </span><span class="mord hangul_fallback">센서의</span><span class="mord"> target:</span></span><span class="mspace" style="margin-right:1em;"></span><span class="mord"><span class="mord mathbf">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">future</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord"><span class="mord"><span class="mord boldsymbol">ϵ</span></span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">p</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.1em;"><span></span></span></span></span></span></span></span></span></span></span></span></div>
<p>미래 물리 신호 예측은 상호작용을 배우기 위한 <strong>보조 목표</strong>다. <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>τ</mi></mrow><annotation encoding="application/x-tex">\tau</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span></span></span></span> 반복은 실제 로봇 시간 t의 전진이나 재관측과 다르다.</p>
</div></div><div class="takeaway">변화율 × denoising 간격으로 후보를 갱신한다. 이제 조건과 후보를 MSAT의 입력 토큰으로 배치한다.</div><footer class="seminar-footer"><span class="source">Sec.2.2 Eq.(2), Physical Sensing · PDF p.8; Sec.4.2 · PDF p.13</span><span class="slide-id">P008 · 006/25</span></footer></section>

<!--
미래 물리 신호 길이 L은 mid-training에서 H+1로 둔다. 추론은 정답 미래 센서를 알지 못한다. 조건 특징의 실제 caching 구현은 단정하지 않는다. 생성 후 행동을 일부 실행하고 재관측하는 바깥 loop는 별도다. 최신 사용자 요청에 따라 본문의 한 좌표 숫자 예시를 제거하고 Euler식의 현재 chunk·예측 변화율·간격을 곱한 갱신량·다음 chunk를 기호 표로 설명한다. 이전 설명용 예시(현재0, 변화율4, 간격0.25 → 다음1)는 N 해설에만 보존한다. 한 forward가 chunk 전체를 다룬다는 설명은 S029에도 유지한다.

S027 Euler 갱신 Eq.2
예측 변화율에 denoising timestep 간격 $\Delta\tau$를 곱해야 실제 후보 이동량이 된다.
###### 원문의 한 번 갱신

$$
\Delta\tau_i=\tau_{i+1}-\tau_i
$$

$$
\begin{aligned}
\mathbf{a}^{\tau_{i+1}}&=\mathbf{a}^{\tau_i}\\
&\quad+\Delta\tau_i\,\mathbf{u}_\theta(\mathbf{a}^{\tau_i},\tau_i,\mathbf{c}_t)
\end{aligned}
$$

현재 후보에, 그 위치에서 예측한 velocity와 다음 $\tau$까지의 간격을 곱한 값을 더한다. 간격이 작을수록 한 번에 이동하는 양도 작아진다. 후보를 옮긴 뒤에는 새 위치에서 변화율을 다시 예측한다.
###### 앞의 보간 예시로 한 단계

<span class="label example">정답 변화율을 정확히 안다고 가정</span>

$$
\tau:\;0.25\to0.5,\quad\Delta\tau=0.25
$$

$$
\begin{aligned}
[0,0.5]+0.25[4,-2]&=[1,0]
\end{aligned}
$$

만약 $\Delta\tau$를 빼고 \[4,−2\]를 통째로 더하면 \[4,−1.5\]가 되어, 목표한 $\tau$ 간격의 이동과 달라진다. 실제 모델은 근사 변화율을 사용하므로 이 예시처럼 경로를 정확히 맞춘다고 보장하지 않는다.
Velocity는 이동량 자체가 아니다. Eq.2의 $\Delta\tau$ 곱이 한 단계의 크기를 결정한다.
Sec.2.2 Eq.(2) · PDF p.8
원문의 첨자 t:t+H는 수식의 가독성을 위해 축약했다. $\mathbf{a}^{\tau_{i+1}}$는 다음 grid point의 후보를 나타낸다. 이 Euler는 실제 로봇의 시간 제어 적분기가 아니라 denoising $\tau$ 공간에서의 샘플 생성이다. $\tau$ grid는 원문에서 증가하도록 정의하며 정확한 benchmark별 step 수는 평가·최적화 설정에서 다룬다.

S029 추론의 denoising 반복
정답을 모르는 추론에서는 노이즈 후보를 놓고, 같은 현재 조건 아래 전체 chunk를 다듬는다.
###### 한 정책 호출 안의 생성 loop

<div class="sequence">
<div class="step">① 현재 관측에서 조건 $\mathbf{c}_{t}$ 준비</div>
<div class="step">② $\mathbf{a}^{0}\sim\mathcal{N}(0,I)$, $\tau=0$에서 시작</div>
<div class="step">③ 후보·$\tau$·조건 → $\mathbf{u}_{\theta}$로 변화율 계산</div>
<div class="step">④ $\Delta\tau$ × 변화율을 더해 후보와 $\tau$ 갱신</div>
<div class="step">⑤ $\tau=1$까지 ③–④ 반복 → action chunk</div>
</div>
###### 반복해서 변하는 것

**변하는 것:** 미래 action 후보, denoising timestep $\tau$, 물리 예측을 사용하면 미래 sensor 후보.

**이번 호출의 조건:** $\mathbf{h}_{t}$·$\mathbf{m}_{t}$·$\mathbf{s}_{t}$·현재 $\mathbf{p}_{t}$. denoising 반복 자체가 새로운 카메라 관측을 받거나 로봇 시간 t를 전진시키는 것은 아니다.

한 forward에서 chunk 전체의 변화율을 예측한다. 완성된 action을 실제로 일부 실행하고 다음 관측에서 재호출하는 바깥 loop는 별도다. 조건 특징의 실제 caching 방식은 본문 수식만으로 확정하지 않는다.
같은 t의 생성 loop와 실제 로봇이 움직인 뒤의 재관측 loop를 분리해서 이해한다.
Sec.2.2 Eq.(2), Physical Sensing · PDF p.8; 질문노트 Q7
원문은 $0=\tau_1<\cdots<\tau_T=1$의 grid를 정의하고 $i=1,\ldots,T-1$에서 Euler update한다. 따라서 식 표기를 문자 그대로 세면 grid point T개·update T−1회다. 본문은 T denoising steps라고도 표현하므로 이 기호를 다른 실험의 4 Euler steps와 임의 동일시하지 않는다. 추론 중에는 학습된 $\theta$를 고정하며 역전파로 매번 모델을 학습하지 않는다.

S030 미래 물리 신호 예측
현재 촉각·토크를 조건으로 쓰면서, 미래 센서 trajectory를 예측하는 보조 목표도 학습한다.
###### 센서의 현재와 미래

$$
\begin{aligned}
\mathbf{p}_{t+1:t+L}^{\tau}
&=\tau\mathbf{p}_{t+1:t+L}+(1-\tau)\boldsymbol{\epsilon}_p
\end{aligned}
$$

현재 <strong>$\mathbf{p}_{t}$</strong>는 관측된 조건이다. 학습의 정답 미래 <strong>$\mathbf{p}_{t+1:t+L}$</strong>에 노이즈를 섞어 별도의 생성 후보를 만든다. P stream은 그 후보를 정답 미래 신호로 옮길 변화율 <strong>$\mathbf{p}_{t+1:t+L}$−$\boldsymbol{\epsilon}_{p}$</strong>를 학습한다.
###### 행동과 함께 배우는 이유

물체 접촉·미끄러짐·그립 힘처럼 영상 변화가 작거나 가려진 상황에서 센서가 정보를 보탠다. 저자는 미래 센서 예측이 물리 상호작용을 내부화하고 행동 생성에 물리 피드백을 활용하도록 유도한다고 설명한다.

<p class="callout">미래 센서 예측은 <strong>auxiliary objective</strong>다. 실제 미래를 관측한 것처럼 미리 입력하는 구조나 물리적 성공을 보장하는 시뮬레이터로 해석하지 않는다.</p>

<p class="mini">센서가 없으면 P stream의 attention을 mask한다. 센서 희소성과 모듈 분리의 관계는 다음 MSAT 장에서 연결한다.</p>
현재 센서 조건, 미래 센서 후보, 미래 신호 예측 보조 손실은 서로 다른 역할이다.
Sec.2.2 Functionality3: Physical Sensing · PDF p.8; Sec.4.2 · PDF p.13
학습은 미래 센서의 정답을 데이터에서 얻는다. 추론에서 초기 future candidate는 noise이고 정답 미래 sensor를 알지 못한다. Sec.4.2는 L=H+1로 설정한다. Action과 physics loss의 정확한 합산 가중치나 센서 좌표별 normalization은 이 문단만으로 확정하지 않는다. Auxiliary objective 단독의 성능 효과는 전체 시스템 비교와 분리해서 보아야 한다. 마지막 문장의 noisy action “C stream” 표기는 S031의 명시적 입력 배치와 불일치하므로 S034에서 다룬다.
-->

---
layout: none
---

<!-- slide-id: P009 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P009"><header class="seminar-header"><div class="chapter-label">RLDX-1 Architecture</div><h1>MSAT의 입력</h1><p class="slide-lead">C·A·P의 입력 묶음을 구성하고, denoising timestep과 행동의 시간 순서를 알려준다.</p></header><div class="seminar-body split"><div class="body-main"><h3>전체 입력 토큰 구성</h3>
<div class="sequence">
<div class="step"><strong>C:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mi mathvariant="bold">h</mi><mi>t</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">m</mi><mi>t</mi></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">[\mathbf{h}_t,\mathbf{m}_t]</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">[</span><span class="mord"><span class="mord mathbf">h</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">m</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">]</span></span></span></span><br>현재 cognition · memory</div>
<div class="step"><strong>A:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mi mathvariant="bold">e</mi><mi>τ</mi></msub><mo separator="true">,</mo><msub><mi mathvariant="bold">s</mi><mi>t</mi></msub><mo separator="true">,</mo><msubsup><mi mathvariant="bold">a</mi><mrow><mi>t</mi><mo>:</mo><mi>t</mi><mo>+</mo><mi>H</mi></mrow><mi>τ</mi></msubsup><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">[\mathbf{e}_{\tau},\mathbf{s}_t,\mathbf{a}^{\tau}_{t:t+H}]</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0837em;vertical-align:-0.3337em;"></span><span class="mopen">[</span><span class="mord"><span class="mord mathbf">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">s</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">a</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-2.4247em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">t</span><span class="mrel mtight">:</span><span class="mord mathnormal mtight">t</span><span class="mbin mtight">+</span><span class="mord mathnormal mtight" style="margin-right:0.0813em;">H</span></span></span></span><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3337em;"><span></span></span></span></span></span></span><span class="mclose">]</span></span></span></span><br>τ 토큰 · 현재 상태 · noisy action chunk</div>
<div class="step"><strong>P:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mi mathvariant="bold">p</mi><mi>t</mi></msub><mo separator="true">,</mo><msubsup><mi mathvariant="bold">p</mi><mrow><mi>t</mi><mo>+</mo><mn>1</mn><mo>:</mo><mi>t</mi><mo>+</mo><mi>L</mi></mrow><mi>τ</mi></msubsup><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">[\mathbf{p}_t,\mathbf{p}^{\tau}_{t+1:t+L}]</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0837em;vertical-align:-0.3337em;"></span><span class="mopen">[</span><span class="mord"><span class="mord mathbf">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.2806em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">t</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">p</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-2.4247em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">t</span><span class="mbin mtight">+</span><span class="mord mtight">1</span><span class="mrel mtight">:</span><span class="mord mathnormal mtight">t</span><span class="mbin mtight">+</span><span class="mord mathnormal mtight">L</span></span></span></span><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3337em;"><span></span></span></span></span></span></span><span class="mclose">]</span></span></span></span><br>현재 센서 · noisy 미래 센서 chunk</div>
</div>
<p class="mini">대괄호는 토큰 묶음을 이어 붙인 개념적 구성이다. 상태·행동·센서값은 projection을 거쳐 입력된다.</p></div><div class="body-aside"><h3>τ 토큰과 행동 위치</h3>
<p><strong>Denoising timestep τ</strong></p>
<div class="equation"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>τ</mi><mover><mo stretchy="true" minsize="3.0em">→</mo><mpadded width="+0.6em" lspace="0.3em"><mtext>sin/cos</mtext></mpadded></mover><mtext>embedding</mtext><mover><mo stretchy="true" minsize="3.0em">→</mo><mpadded width="+0.6em" lspace="0.3em"><mtext>MLP</mtext></mpadded></mover><msub><mi mathvariant="bold">e</mi><mi>τ</mi></msub></mrow><annotation encoding="application/x-tex">\tau\xrightarrow{\text{sin/cos}}\text{embedding}\xrightarrow{\text{MLP}}\mathbf{e}_{\tau}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.158em;vertical-align:-0.011em;"></span><span class="mord mathnormal" style="margin-right:0.1132em;">τ</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel x-arrow"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.147em;"><span style="top:-3.322em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight x-arrow-pad"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">sin/cos</span></span></span></span></span><span class="svg-align" style="top:-2.689em;"><span class="pstrut" style="height:2.7em;"></span><span class="hide-tail" style="height:0.522em;min-width:1.469em;"><svg xmlns="http://www.w3.org/2000/svg" width="400em" height="0.522em" viewBox="0 0 400000 522" preserveAspectRatio="xMaxYMin slice"><path d="M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z"/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.011em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.2948em;vertical-align:-0.1944em;"></span><span class="mord text"><span class="mord">embedding</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel x-arrow"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.1003em;"><span style="top:-3.322em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight x-arrow-pad"><span class="mord mtight"><span class="mord text mtight"><span class="mord mtight">MLP</span></span></span></span></span><span class="svg-align" style="top:-2.689em;"><span class="pstrut" style="height:2.7em;"></span><span class="hide-tail" style="height:0.522em;min-width:1.469em;"><svg xmlns="http://www.w3.org/2000/svg" width="400em" height="0.522em" viewBox="0 0 400000 522" preserveAspectRatio="xMaxYMin slice"><path d="M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z"/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.011em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.5944em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathbf">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.1132em;">τ</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></div>
<p>A 맨 앞의 <strong>한 토큰</strong>이다. Joint attention을 통해 다른 stream에도 현재 denoising timestep을 전달한다.</p>
<p><strong>행동 순서 — RoPE</strong></p>
<p>A stream의 Q·K에 위치별 회전을 적용해 chunk 안의 상대 시간 관계를 반영한다.</p>
<p class="mini">물리 신호가 없으면 P stream의 attention을 mask할 수 있다.</p></div></div><div class="takeaway">τ는 denoising timestep, t:t+H는 행동 chunk의 물리 시간이다. 두 시간 정보를 구분한다.</div><footer class="seminar-footer"><span class="source">Sec.2.2 MSAT·Physical Sensing·Further Design Choices · PDF pp.8–9; Fig.3 · PDF p.6</span><span class="slide-id">P009 · 007/25</span></footer></section>

<!--
앞의 P006/P008에서 정의한 noisy chunk를 세 stream으로 배치한다. 입력은 projection 이후 토큰 묶음의 개념적 구성이며 정확한 tokenization 개수는 단정하지 않는다. e_τ는 인코딩된 timestep 토큰을 설명하기 위한 기호다. 본문의 실제 시간/denoising 구분을 다시 유도하지 않고 τ를 모델에 전달하는 방법에 집중한다. S032의 QKV 연결 해설과 S037/S038의 timestep·RoPE 수식을 보존한다. 과거 P012 링크는 이 장으로 연결한다.

S031 P·C·A의 입력 구성
모달리티를 전용 경로로 처리하되, attention으로 서로 정보를 교환한다.
###### 초기 stream의 역할

| Stream | 개념적 입력 | 내용 |
| --- | --- | --- |
| **C** | $[\mathbf{h}_t,\mathbf{m}_t]$ | cognition·memory |
| **A** | $[\mathbf{s}_t,\mathbf{a}_{t:t+H}^{\tau}]$ | 현재 상태·행동 후보 |
| **P** | $[\mathbf{p}_t,\mathbf{p}_{t+1:t+L}^{\tau}]$ | 현재 센서·미래 후보 |

$\tau$는 인코딩한 한 토큰으로 A의 앞에 더한다. P는 물리 신호를 사용할 때 추가되는 경로이며, 센서가 없을 때 P attention을 mask할 수 있다.
###### 왜 세 경로로 나누는가?

cognition은 고차원 시각·언어 맥락, state는 저차원이지만 정확한 로봇 운동학 정보, 촉각·토크는 희소하지만 접촉에 중요한 정보다. 원문은 이 **의미와 데이터 규모의 이질성**을 설계 동기로 든다.

이는 각 기능 모듈과 stream이 일대일이라는 뜻이 아니다. Motion과 memory는 VLM·memory module에서 만들어져 C 경로의 입력이 되고, A는 미래 행동을 생성하는 경로다.

<p class="mini">초기 입력 배치는 MSAT 문단을 따른다. Physical Sensing 마지막의 C 표기 불일치는 S034에서 남긴다.</p>
Stream은 입력별 파라미터 경로이며, 기능 모듈 이름과 동일한 분류가 아니다.
Sec.2.2 MSAT·Physical Sensing · PDF p.8; timestep token · PDF p.9; Fig.3 · PDF p.6
P=\[current p, noisy future p\]는 Fig.3의 Current/Noised Future 및 Physical Sensing 문단을 합친 개념적 입력이다. 본문의 개별 tokenization shape는 단정하지 않는다. C/A stream 설명은 MSAT 문단에 명시되어 있다. 괄호나 대괄호를 원소별 덧셈으로 확정하지 않는다. 센서 희소성 때문에 분리가 도움 된다는 의도와 single-stream 대비 독립 실험 근거는 구분한다.

S032 Stream별 QKV
Normalization과 QKV projection은 stream별로 따로 두고, attention 입력을 공통 공간에 모은다.
###### 같은 연산 종류, 다른 파라미터

$$
\mathbf{C}\to\operatorname{Norm}_C\to(\mathbf{Q}_C,\mathbf{K}_C,\mathbf{V}_C)
$$

$$
\mathbf{A}\to\operatorname{Norm}_A\to(\mathbf{Q}_A,\mathbf{K}_A,\mathbf{V}_A)
$$

$$
\mathbf{P}\to\operatorname{Norm}_P\to(\mathbf{Q}_P,\mathbf{K}_P,\mathbf{V}_P)
$$

각 stream은 자신의 normalization과 attention input projection을 가진다. 공통 attention을 하기 전에도 모달리티에 맞게 표현을 변환할 여지가 있다.
###### 교환을 위해 토큰 축으로 묶기

$$
\mathbf{Q}=\operatorname{concat}(\mathbf{Q}_C,\mathbf{Q}_A,\mathbf{Q}_P)
$$

K·V도 같은 순서로 이어 붙인다. Joint attention에서 각 stream의 query는 다른 stream의 key·value를 참고할 수 있다. **정보 교환**과 **전용 파라미터 유지**가 동시에 가능하다.

<p class="callout">QKV를 함께 계산하는 attention 단계와, 후반에 C·A를 한 stream으로 합치는 구조 변경은 별개의 일이다.</p>

<p class="mini">Q는 attention query이며 memory queue $\mathbf{Q}_{t}$와 다르다.</p>
전용 stream은 서로 보지 않는다는 뜻이 아니라, 일부 변환 파라미터를 분리한다는 뜻이다.
Sec.2.2 MSAT 문단 · PDF p.8
원문은 각 stream이 자체 normalization과 attention input QKV projections를 가진다고 명시한다. QKV를 공통 token axis에 붙여 joint attention하고 출력을 분할한다. 식은 원문 연산 순서를 기호로 풀어 쓴 것이며 특정 linear weight 이름이나 정확한 norm 배치를 추가한 구현 명세가 아니다. 입력 stream hidden width와 attention head 수는 이 문단만으로 확정하지 않는다. q는 VLM cognition token, Q는 attention query, $\mathbf{Q}_t$는 memory queue이므로 구별한다.

S037 Denoising timestep 토큰
$\tau$를 한 토큰으로 인코딩해 A 앞에 붙이고 joint attention으로 다른 경로에도 알린다.
###### 값 하나를 모델 입력 특징으로

<div class="flow">
<div class="node">$\tau\in[0,1]$</div>
<div class="arrow">→</div>
<div class="node">sinusoidal<br>embedding</div>
<div class="arrow">→</div>
<div class="node">MLP</div>
</div>

<div class="token-row"><span class="token a">$\tau$ 토큰</span><span class="token a">$\mathbf{s}_{t}$</span><span class="token a">$\mathbf{a}^{\tau}_{t:t+H}$ 토큰들</span></div>

변환된 $\tau$ 표현을 A 시퀀스 맨 앞의 한 토큰으로 넣는다. 이 토큰도 다른 A token처럼 attention에 참여한다.
###### 왜 현재 생성 단계가 필요한가?

<span class="label interpretation">직관</span> 노이즈가 많은 후보와 거의 완성된 후보에서 필요한 보정이 다를 수 있다. $\tau$는 모델에 “현재 생성 경로의 어디를 다루는지”를 알려준다.

저자는 joint self-attention을 통해 $\tau$ 신호가 모든 모달리티에 전달될 수 있다고 설명한다. 매 블록의 feature에 affine modulation을 적용하는 **adaLN 방식 대신 in-context token**을 쓰는 선택이다.

<p class="mini">$\tau$ 토큰을 추가하는 것은 미래 행동 한 개를 추가하는 것이 아니다. 물리 시간 t와도 구별한다.</p>
$\tau$는 별도 control knob처럼 밖에서만 쓰이는 값이 아니라, MSAT가 읽는 한 입력 토큰이다.
Sec.2.2 Further Design Choices for MSAT · PDF p.9
원문은 sinusoidal embedding+MLP, A sequence 앞의 single token, joint attention을 통한 모든 modality로의 전파, per-block affine modulation을 사용하지 않는 점을 명시한다. Encoding의 frequency 개수·MLP width·layer 수는 이 문단에서 확정하지 않는다. 이 토큰을 텍스트 숫자 “0.25”를 tokenizer에 입력하는 방식으로 설명하지 않는다. 어느 $\tau$에서 어떤 정보가 얼마나 전파되는지는 추가 해석이나 측정이 필요하다.

S038 RoPE와 행동 순서
행동 토큰의 위치에 따라 Q·K를 회전시켜 attention 점수에 상대 순서를 반영한다.
###### 행동 chunk에도 순서가 있다

<div class="token-row"><span class="token a">$\mathbf{a}_{t}$</span><span class="token a">$\mathbf{a}_{t+1}$</span><span class="token a">$\mathbf{a}_{t+2}$</span><span class="token a">⋯</span></div>

같은 행동 값의 집합이라도 어느 시점에 놓이는지가 중요하다. RLDX-1은 **A stream에 rotary positional embeddings**를 적용해 chunk 안의 상대 시간 구조를 포착하도록 한다.

배경 원전의 직관은 위치 m의 query와 위치 n의 key를 각 위치에 따른 각도로 회전시킨 뒤 서로 비교하는 것이다.
###### 절대 회전에서 상대 위치가 나온다

$$
\widetilde{\mathbf{q}}_m=\mathbf{R}_m\mathbf{q}_m,\quad\widetilde{\mathbf{k}}_n=\mathbf{R}_n\mathbf{k}_n
$$

$$
\begin{aligned}
\widetilde{\mathbf{q}}_m^{\mathsf T}\widetilde{\mathbf{k}}_n
&=\mathbf{q}_m^{\mathsf T}\mathbf{R}_{n-m}\mathbf{k}_n
\end{aligned}
$$

<p class="eq-caption">RoPE의 원리를 간단히 표현한 배경식. 회전 차이가 n−m을 반영한다.</p>

따라서 attention은 내용과 위치 관계를 함께 읽을 수 있다. RoPE는 행동 토큰을 하나씩 생성하게 만드는 causal mask가 아니며, denoising timestep $\tau$를 나타내는 토큰과도 다르다.
행동 순서를 나타내는 위치 정보와 생성 진행도를 나타내는 $\tau$ 정보는 별개다.
Sec.2.2 Further Design Choices · PDF p.9; 배경: RoFormer Sec.3.2 (arXiv:2104.09864)
배경 원전 https://arxiv.org/html/2104.09864v5 의 Sec.3.2에서 회전 행렬을 이용한 QK의 상대 위치 관계를 확인했다. 식의 R은 동일 frequency 구조에서 $\mathbf{R}_m^{\mathsf T}\mathbf{R}_n=\mathbf{R}_{n-m}$인 rotation operator다. 실제 RoPE는 feature dimension 쌍마다 여러 frequency를 사용한다. 여기서는 RLDX-1의 정확한 frequency/index 배치나 P/C 적용을 추정하지 않고, A stream 적용이라는 원문 범위만 말한다.
-->

---
layout: none
---

<!-- slide-id: P010 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P010"><header class="seminar-header"><div class="chapter-label">RLDX-1 Architecture</div><h1>MSAT의 Joint Attention</h1><p class="slide-lead">각 stream의 파라미터로 입력을 변환하고, 공통 attention 뒤에는 원래 stream별로 갱신한다.</p></header><div class="seminar-body split"><div class="body-main"><h3>정규화 · projection · 정보 교환</h3>
<div class="sequence">
<div class="step"><strong>Stream별 RMSNorm → QKV projection</strong><br>C·A·P가 각자의 파라미터를 사용한다.</div>
<div class="step"><strong>Q·K에도 RMSNorm</strong><br>Q·K·V를 각각 토큰 축으로 concat한다.</div>
<div class="step"><strong>Joint self-attention → 출력 분리</strong><br>다른 stream을 읽어도 query 위치는 유지된다.</div>
</div>
<p class="mini">RMSNorm은 특징의 크기를 정규화한다. 정보 교환은 attention이 수행한다.</p></div><div class="body-aside"><h3>예시: C 4개 + A 3개</h3>
<div class="token-row"><span class="token c"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>C</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">C_1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span><span class="token c"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>C</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">C_2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span><span class="token c"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>C</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">C_3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span><span class="token c"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>C</mi><mn>4</mn></msub></mrow><annotation encoding="application/x-tex">C_4</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0715em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">4</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span><span class="token a"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>A</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">A_1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span><span class="token a"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>A</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">A_2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span><span class="token a"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>A</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">A_3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></div>
<p>출력 7개 → 앞 4개는 C, 뒤 3개는 A로 돌려보낸다. 실제 모델 shape가 아닌 설명용 예시다.</p>
<div class="equation"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msup><mi mathvariant="bold">C</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo>=</mo><mi mathvariant="bold">C</mi><mo>+</mo><mi mathvariant="normal">Δ</mi><mi mathvariant="bold">C</mi><mo separator="true">,</mo><mspace width="2em"/><msup><mi mathvariant="bold">A</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo>=</mo><mi mathvariant="bold">A</mi><mo>+</mo><mi mathvariant="normal">Δ</mi><mi mathvariant="bold">A</mi></mrow><annotation encoding="application/x-tex">\mathbf{C}&#x27;=\mathbf{C}+\Delta\mathbf{C},\qquad
\mathbf{A}&#x27;=\mathbf{A}+\Delta\mathbf{A}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8019em;"></span><span class="mord"><span class="mord mathbf">C</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8019em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7694em;vertical-align:-0.0833em;"></span><span class="mord mathbf">C</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.9963em;vertical-align:-0.1944em;"></span><span class="mord">Δ</span><span class="mord mathbf">C</span><span class="mpunct">,</span><span class="mspace" style="margin-right:2em;"></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathbf">A</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8019em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7694em;vertical-align:-0.0833em;"></span><span class="mord mathbf">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6861em;"></span><span class="mord">Δ</span><span class="mord mathbf">A</span></span></span></span></span></div>
<p><strong>Residual update:</strong> 보정을 더해 토큰 수를 유지한다.</p>
<p><strong>SwiGLU FFN:</strong> gate를 사용해 각 토큰 내부의 특징을 비선형으로 변환한다.</p>
</div></div><div class="takeaway">Stream별 표현을 변환하고, attention으로 정보를 교환한 뒤 각 stream에서 보정한다.</div><footer class="seminar-footer"><span class="source">Sec.2.2 MSAT · PDF p.8; Further Design Choices · PDF p.9; 질문노트 Q1·Q6</span><span class="slide-id">P010 · 008/25</span></footer></section>

<!--
P032에서 본 Triple/Double-stream 안의 한 연산 흐름을 확대한다. 그림의 stage 수나 전체 residual·norm 위치를 재구성한 구현도는 아니다. Δ는 residual 보정의 개념 표기다. 후반 C-A concat의 위치는 P032에서 이미 설명했으며 여기서는 반복하지 않는다. Physical Sensing 마지막 noisy actions in C 표기 불일치는 S034와 마지막 미해결 장에 보존한다. RMSNorm/SwiGLU 상세 S039도 유지한다.

S033 Joint attention과 출력 shape
C 토큰 4개와 A 토큰 3개를 함께 읽어도, 출력 위치 7개는 그대로 남아 다시 나눌 수 있다.
###### 토큰 수가 보존되는 attention

<span class="label example">P를 생략한 교육용 C4 / A3</span>

| 단계 | shape |
| --- | --- |
| C의 Q·K·V | 각 4 × d |
| A의 Q·K·V | 각 3 × d |
| 붙인 Q·K·V | 각 7 × d |
| attention weights | 7 × 7 |
| attention output | 7 × d |
###### 출력 위치와 읽은 정보는 다르다

<div class="token-row"><span class="token c">$C_1$</span><span class="token c">$C_2$</span><span class="token c">$C_3$</span><span class="token c">$C_4$</span><span class="token a">$A_1$</span><span class="token a">$A_2$</span><span class="token a">$A_3$</span></div>

각 query 위치에 출력 벡터가 하나씩 생긴다. 앞 네 위치는 C로, 뒤 세 위치는 A로 돌려보낸다. C 위치의 출력도 A의 정보를 읽었을 수 있으므로 “C 출력에 C 정보만 있다”는 뜻은 아니다.

**4·3·d**는 원리를 보이는 예시다. 실제 cognition은64 tokens이며, 이 표를 모델의 실제 전체 shape로 읽지 않는다.
Attention은 여러 정보를 섞지만 query 위치를 없애지 않기 때문에 stream별 분할이 가능하다.
Sec.2.2의 joint attention·split 설명 · PDF p.8; shape는 설명용 예시
설명상 single head를 가정하고 Q/K/V의 feature 폭을 같은 d로 두었다. 실제 multi-head의 QK dimension과 V dimension은 다를 수 있고 head concat/projection도 있으므로 이 표가 구현 shape 명세는 아니다. 7×7은 query 7개가 key 7개를 참고하는 관계 수다. Output row는 query row에 대응한다. P stream이 있으면 그 token 수만큼 행도 추가되지만 같은 원리로 원래 길이에 따라 분할할 수 있다.

S034 Residual update와 concat
한 블록 안의 stream별 덧셈과, 후반 C·A 시퀀스 통합은 서로 다른 연산이다.
###### 초반 블록: 나눠서 다시 더한다

$$
\text{joint attention}\to[\Delta\mathbf{C},\Delta\mathbf{A},\Delta\mathbf{P}]
$$

$$
\begin{aligned}
\mathbf{C}'&=\mathbf{C}+\Delta\mathbf{C}\\
\mathbf{A}'&=\mathbf{A}+\Delta\mathbf{A}\\
\mathbf{P}'&=\mathbf{P}+\Delta\mathbf{P}
\end{aligned}
$$

위 식은 원문의 **stream-wise residual update**를 단순화한 개념식이다. 출력 위치를 나눈 후 각 경로의 원래 특징에 보정을 더한다. 이 단계에서는 C와 A의 stream 구분이 계속 남는다.
###### 후반 블록: C와 A를 한 시퀀스로

$$
\mathbf{X}_{\mathrm{C-A}}=\operatorname{concat}(\mathbf{C}',\mathbf{A}')
$$

여기서는 토큰 축으로 이어 붙여 후속 단일 C-A 경로에서 처리한다. 원소별로 더해 토큰 수를 줄이는 연산이 아니다.

<p class="callout"><span class="label question">본문 표기 불일치</span> MSAT 문단은 noisy actions를 <strong>A</strong>에 넣지만, Physical Sensing 마지막 문장은 “C stream”이라고 쓴다. 초기 입력은 앞의 명시적 배치를 따르되, 오타인지 별도 의도인지는 확정하지 않는다.</p>
정보 교환 → stream별 residual → 후반 C-A 통합을 구분해야 Fig.3을 정확히 읽을 수 있다.
Sec.2.2 MSAT 및 Physical Sensing 마지막 문장 · PDF p.8; 질문노트 Q1·Q6
Δ 기호는 joint attention 출력을 residual에 더하는 개념적 보정량을 표시한다. 정확한 output projection·MLP 등 모든 세부를 그대로 수식화한 것은 아니다. 원문은 stream별 residual updates를 명시한다. 후반 C-A merge와 초반 QKV concatenation을 같은 “concat” 한 단어로 뭉개지 않는다. 최종 C 표기를 저자의 오타로 단정하지 않고 문서의 서술 불일치로 남긴다.

S039 RMSNorm과 SwiGLU
정규화는 특징 크기를 조절하고, FFN은 각 토큰 안의 특징을 비선형으로 변환한다.
###### RMSNorm: 평균 제곱 크기로 나누기

$$
\operatorname{RMS}(\mathbf{x})=\sqrt{\frac{x_1^2+\cdots+x_d^2}{d}}
$$

각 토큰의 특징 벡터를 RMS 크기에 따라 정규화하고 학습 가능한 scale로 조절한다. LayerNorm과 달리 평균을 빼는 recentering을 생략하는 것이 배경 원전의 핵심이다.

RLDX-1은 RMSNorm을 채택하며 **query와 key에도** 적용한다고 명시한다. 값이 모두 같아지거나 정보 교환 자체를 수행하는 연산은 아니다.
###### SwiGLU: 두 변환을 곱하는 gate

$$
\begin{aligned}
\mathbf{g}&=\operatorname{SiLU}(\mathbf{x}W_g)\\
\mathbf{v}&=\mathbf{x}W_v\\
\operatorname{FFN}(\mathbf{x})&=(\mathbf{g}\odot\mathbf{v})W_o
\end{aligned}
$$

<p class="eq-caption">bias를 생략한 배경용 개념식. $\odot$는 원소별 곱이다.</p>

한 경로의 비선형 값이 다른 경로의 특징을 조절한다. 이 FFN은 토큰마다 특징을 변환하고, attention은 토큰 사이 정보를 교환한다. 보고서는 이 구성 요소를 채택했다고 설명하지만 각각의 독립 성능 이득을 이 문단에서 측정하지 않는다.
RMSNorm·SwiGLU·attention은 블록 안의 서로 다른 역할을 담당한다.
Sec.2.2 Further Design Choices · PDF p.9; 배경: arXiv:1910.07467, arXiv:2002.05202
배경 원전 https://arxiv.org/html/1910.07467v1 의 Sec.4와 https://arxiv.org/html/2002.05202v1 의 Sec.2 식(5)–(6)을 확인했다. RMS 식은 root mean square 정의이며 정규화한 값에 learned gain을 곱하며 구현에 따라 수치 안정화 항을 더한다. 출력 공식 전체 대신 RMS 정의만 표시했다. SwiGLU 식은 bias 생략 개념식이며 $\operatorname{SiLU}(x)=x\operatorname{sigmoid}(x)$인 $\operatorname{Swish}_1$ gate를 쓴다. 실제 RLDX-1 weight 이름이나 FFN width를 명세한 것은 아니다. QK에 RMSNorm을 적용한다는 사실과 구체 shape는 구별한다.
-->

---
layout: none
---

<!-- slide-id: P013 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P013"><header class="seminar-header"><div class="chapter-label">Training Data</div><h1>학습 데이터</h1><p class="slide-lead">공개·자체 데이터의 강점을 연결하고, 합성 영상에 행동 라벨을 붙여 경험을 확장한다.</p></header><div class="seminar-body figure balanced"><figure class="paper-figure"><img src="/figures/fig-04.png" alt="Figure 4 · 생성 영상에 행동을 붙이고 두 단계로 검사하는 파이프라인" loading="eager"><figcaption>Figure 4 · 생성 영상에 행동을 붙이고 두 단계로 검사하는 파이프라인</figcaption></figure><div class="body-main"><h3>세 공급원의 역할</h3>
<p><strong>공개 데이터</strong>는 다양한 로봇의 조작 경험을,<br>
<strong>자체 데이터</strong>는 Franka·ALLEX의 행동과 토크·촉각 기록을 제공한다.</p>
<p><strong>합성 데이터</strong>는 직접 수집하기 어려운 장면·동작의 범위를 넓힌다. 영상만으로는 수치 행동이 주어지지 않아 IDM 라벨과 검증이 필요하다.</p>
<p class="callout">Figure 4는 합성 데이터의 지도다. 다음은 생성 변형, 그다음은 행동 라벨과 검증을 살펴본다.</p></div></div><div class="takeaway">공개 데이터는 범위, 자체 데이터는 목표 로봇·센서, 합성 데이터는 수집이 어려운 상황을 보완한다.</div><footer class="seminar-footer"><span class="source">Sec.3–3.3; Fig.4 · PDF pp.9–12</span><span class="slide-id">P013 · 009/25</span></footer></section>

<!--
구조에서 데이터로 전환한다. 상세 센서 구성·원격 조작·최대64 vision tokens 전처리는 연결된 상세 단위에서 확인한다.

S041 세 데이터 공급원과 전처리
공개 데이터로 조작 경험을 넓히고, 자체·합성 데이터로 부족한 로봇과 상황을 보완한다.
###### 세 공급원이 채우는 빈칸

- **공개 실제 데이터:** 단일 팔·양팔·휴머노이드의 다양한 동작과 장면을 제공한다.
- **자체 실제 데이터:** Franka·ALLEX의 고유 제어 방식과 촉각·토크 정보를 수집한다.
- **합성 데이터:** 수집 비용이 큰 GR-1·ALLEX의 작업·장면 변형을 늘린다.
###### 영상 입력의 공통 규칙

모든 학습 이미지에 같은 전처리를 적용한다. 원래 종횡비를 유지하며 크기를 조절해 **프레임당 vision token이 최대 64개**가 되도록 한다.

64는 프레임 수나 action 길이가 아니다. 한 프레임을 인코더가 표현하는 시각 토큰 수의 상한이다.

<p class="mini">Qwen3-VL의 native-resolution 인코더를 이용해 임의 비율·해상도를 crop·padding 없이 처리한다.</p>
데이터의 역할은 다르지만, 영상 입력 형식은 통일한다.
Sec.3–3.2 · PDF pp.9–10
공개 데이터의 원시 총량과 실제 채택한 episode 수를 구분한다. 예: AgiBot은 원 데이터가 1M 이상이어도 275K를 샘플링한다. 프레임당 최대64토큰을 모든 프레임이 정확히64토큰이라는 뜻으로 표현하지 않는다. 세 공급원은 설명상 분류이며 본문은 실제/합성의 두 큰 범주로 소개한다.

S042 Franka·ALLEX 시연 수집
사람의 손·손목 움직임을 로봇 관절로 바꾸면서 영상과 물리 센서를 함께 기록한다.
###### Franka: 그리퍼와 접촉 정보

FR3 팔·평행 그리퍼·손목 카메라·제3자 카메라로 DROID와 유사한 구성을 만든다. 그리퍼에 **AnySkin 촉각 센서**를 추가하고 관절 토크도 기록한다.

<div class="sequence">
<div class="step">Meta Quest VR로 말단 장치의 자세를 지시</div>
<div class="step">로봇 시연과 영상·촉각·토크를 수집</div>
</div>
###### ALLEX: 부위별 원격 조작

- Meta Quest: 머리·허리
- Vive Tracker: 손목 위치·자세 → 역기구학으로 팔 관절각
- Manus Pro 장갑: 손끝 위치 → 역기구학으로 손가락 관절각

각 팔 7-DoF, 각 손 15-DoF, 허리·목 각 2-DoF다. 모터 전류와 변환 상수로 관절 토크를 추정한다.
영상만 모으는 시연이 아니라 행동과 접촉 상태가 연결된 기록이다.
Sec.3.2 · PDF pp.9–10; Fig.12 · PDF p.19
역기구학은 원하는 말단/손끝 위치·자세에서 관절각을 구하는 계산이라는 배경 풀이이다. Franka의 토크 측정과 ALLEX의 전류 기반 토크 추정을 구별한다. ALLEX 합계는 양팔14+양손30+허리2+목2=48DoF. OpenArm은 이 장의 자체 센서 수집 대상과 구분한다.

S043 합성 데이터 전체 흐름
그럴듯한 영상 생성과 그 영상에 맞는 행동 라벨 검증을 서로 다른 단계로 수행한다.
###### 영상 → 수치 행동 → 검증

시작 프레임과 task 지시를 변형해 새 영상을 만든다. **IDM**이 현재·미래 관측에서 행동 시퀀스를 추정한다.

추정 행동을 시뮬레이터에서 실행한 rollout 영상과 생성 영상을 비교해 움직임이 맞는 샘플을 남긴다.

<p class="callout">언어 지시는 목표이고, IDM의 행동 라벨은 로봇을 움직이는 수치다.</p>
별도 영상 품질 검사는 지시 일치와 trajectory plausibility를 확인한다. 움직임 검사는 영상과 행동의 정합성을 확인한다.
생성한 장면과 추정한 행동을 함께 검사해야 학습 쌍을 얻는다.
Fig.4; Sec.3.3 · PDF pp.10–12
원문 파이프라인을 직관적으로 읽는 장이다. IDM은 task text를 직접 수치 행동으로 번역하는 모델로 설명하지 않는다. simulator rollout의 action-consistency와 현실 물리 성공은 동일하지 않다. 그림의 긴 순서는 이후 S044–S055에서 나눠 설명한다.
-->

---
layout: none
---

<!-- slide-id: P014 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P014"><header class="seminar-header"><div class="chapter-label">Training Data</div><h1>Task·Scene Augmentation</h1><p class="slide-lead">지시의 변형과 시각적 변형을 나누되, 원본 장면에서 가능한 동작을 유지하려 한다.</p></header><div class="seminar-body figure"><figure class="paper-figure"><img src="/figures/fig-05.png" alt="Figure 5 · (a) 원본 (b) 지시 변형 (c) I2I 편집 후 I2V 생성" loading="eager"><figcaption>Figure 5 · (a) 원본 (b) 지시 변형 (c) I2I 편집 후 I2V 생성</figcaption></figure><div class="body-main"><h3>무엇을 할지, 어디에서 할지</h3>
<p><strong>Task:</strong> 행동·물체·위치·손을 재조합하거나 원본 skill을 조건으로 변형한다. 두 전략의 결과는 겹칠 수 있다.</p>
<p><strong>Scene:</strong> 시작 장면을 I2I로 편집해 I2V로 생성하거나, V2V로 영상의 색·질감을 바꾸며 움직임을 보존하려 한다.</p>
<p class="callout">Canny edge는 구조 보존을 유도한다. 실행 가능성을 보장하지 않으며, 구체적인 판정 규칙·prompt는 미확인이다.</p></div></div><div class="takeaway">Task는 지시를, Scene은 시각 조건을 바꾼다. 다음은 생성 영상에 행동을 붙이고 검사하는 단계다.</div><footer class="seminar-footer"><span class="source">Sec.3.3; Fig.5 · PDF p.11; App.B.3 · PDF p.42; 질문노트 Q8</span><span class="slide-id">P014 · 010/25</span></footer></section>

<!--
왼쪽 세 행을 원본·task 변형·scene 변형 순으로 읽는다. 다음 장에서 생성 영상의 행동 라벨과 검증으로 넘어간다.

S044 Factorized task augmentation
지시를 네 요소로 나누고 시작 장면을 조건으로 재조합한다.
###### 문장을 네 축으로 분해

<div class="sequence">
<div class="step"><strong>Behavior</strong> — 무엇을 할까?</div>
<div class="step"><strong>Target object</strong> — 어느 물체를?</div>
<div class="step"><strong>Placement</strong> — 어디로?</div>
<div class="step"><strong>Hand type</strong> — 어느 손으로?</div>
</div>

VLM에는 시작 프레임, 조작 맥락의 system prompt, 학습 데이터의 few-shot 예시를 제공한다.
###### 재조합의 직관

<span class="label example">설명용 예시</span>

“오른손으로 컵을 왼쪽 쟁반에 놓기”에서 대상·위치·손을 바꾸면 새로운 지시 조합을 만들 수 있다.

하지만 해당 장면에 쟁반이 없거나 물체를 잡을 수 없다면 문법상 자연스러워도 실행이 어렵다.

<p class="callout">첫 전략도 장면을 조건으로 한다. 무작위 조합이나 장면 무시 생성으로 해석하지 않는다.</p>
언어적 다양성을 늘리는 것과 장면에서 실행 가능한 것은 별개의 조건이다.
Sec.3.3 · Task Augmentation · PDF p.11
위 문장 예시는 보고서에 실린 실험 지시가 아니라 분해 축을 설명하기 위한 예이다. 논문은 factorized composition이 장면이 허용하는 시나리오가 적을 때 infeasible behavior를 낼 수 있다고 서술한다.

S045 Skill-conditioned variation
원본 지시의 skill을 출발점으로 변형 범위를 정하지만, 두 전략의 결과는 겹칠 수 있다.
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
###### 전략 차이는 생성의 기준

<span class="label example">설명용 예시</span>

원본이 “컵을 집기”이면 pick을 유지하고 집을 대상을 바꿀 수 있다. 장면이 허용하면 다른 skill로 교체하는 경로도 있다.

대상만 바꾼 결과는 네 요소 재조합으로도 나올 수 있다. 따라서 두 방법을 **서로 겹치지 않는 출력 종류**로 나누면 안 된다.
Factorized는 요소 조합, skill-conditioned는 원본 동작을 기준으로 한 변형이다.
Sec.3.3 · PDF p.11; 질문노트 Q8
저자는 두 전략을 complementary라고 부른다. 우리 설명은 전략의 조건화 방식과 생성 결과의 중첩을 구분한다. 원본 skill 유지가 항상 강제되는 것은 아니며 다른 skill 교체 경로가 명시되어 있다.

S046 Task 생성의 미확인 제약
실행 가능한 지시를 목표로 하지만, 그 판단을 재현할 구체적 규칙은 공개 설명만으로 부족하다.
###### 원문에서 확인한 것

- 초기 장면을 VLM에 입력한다.
- 조작 맥락의 system prompt와 few-shot 예시를 사용한다.
- 원본 skill을 유지하거나 사전 정의한 skill set의 다른 skill을 선택한다.

이 설명은 “실행 가능한 변형을 유도한다”는 설계 의도를 알려준다.
###### 아직 확인되지 않은 것

- skill set 전체 목록과 장면별 후보 제한
- 실행 가능성의 판정 기준과 절차
- 실제 system prompt·few-shot 내용
- 실행 불가능한 후보를 강제로 배제하는 규칙

<p class="callout">후속 영상 검사와 초기 지시의 실행 가능성 판정은 서로 다른 문제다.</p>
명세의 빈칸은 질문으로 남기고, 별도의 보장 장치를 상상해 채우지 않는다.
Sec.3.3 · PDF p.11; App.B.3 · PDF p.42; 질문노트 Q8
질문 슬라이드. 확인 범위 Sec3.3/AppB.3에는 기준·prompt·강제 제약의 상세가 없다. 이 모호함을 생성 모델의 실제 실패나 결함을 관측한 결과로 바꾸지 않는다. 영상 plausibility 선별이 의미상 실행 가능성과 관련될 수는 있으나 동일한 검증이라고 단정할 수 없다.

S047 Scene augmentation: I2I에서 I2V로
처음 한 장의 장면을 편집하고, 그 변화를 새 영상 전체로 전파한다.
###### 어디를 바꾸는가?

FLUX.2-dev의 **image-to-image(I2I)** 편집으로 시작 프레임의 네 요소를 변형한다.

- 테이블의 외관
- 대상 물체의 정체·외형
- 조명
- 배경

편집에 Canny edge map을 조건으로 주어 장면 구조 보존을 유도한다.
###### 영상으로 이어지는 과정

<div class="sequence">
<div class="step">원본 시작 프레임</div>
<div class="step">I2I 편집 → 새로운 시작 장면</div>
<div class="step">편집한 장면 + 지시 → I2V 생성</div>
</div>

여기서 **I2V**는 한 이미지로부터 시간에 따라 변하는 영상을 만드는 단계다. 시작 프레임만 바뀌는 단순 이미지 증강과 구분한다.
장면 편집은 영상 생성의 출발 상태를 다양화한다.
Sec.3.3 · Scene Augmentation; Fig.5(c) · PDF p.11
I2I는 초기 프레임을 바꾸고 I2V는 이를 동적 영상으로 확장한다. I2I와 V2V에서 물체 변경 허용 범위가 다르다. I2I 문단은 target object identity and appearance를 변형한다고 명시한다.

S048 Canny edge 조건의 역할
윤곽은 장면 구조를 유지할 단서지만, 물리적으로 가능한 동작의 증명은 아니다.
###### 색보다 구조를 조건으로

원문은 I2I 편집에 Canny edge map을 제공해 원래 장면 구조를 보존하고 그럴듯한 시작 상태를 유지하도록 유도한다.

영상 수준의 V2V 변환에도 edge 조건을 사용해 물체의 정체·형태와 움직임을 유지하며 질감·색을 바꾸려 한다.

<p class="callout">같은 edge 조건이라도 적용 단계와 허용하는 변형은 다르다.</p>
###### 윤곽으로 알 수 없는 것

<span class="label interpretation">설명을 위한 해석</span>

컵과 손의 윤곽이 비슷해도 깊이, 접촉, 무게, 가려진 면의 상태까지 확정되지 않는다. 비슷한 윤곽이 곧 안정적인 잡기를 뜻하지 않는다.

따라서 “구조 보존을 유도한다”와 “구조·물리 타당성을 보장한다”를 구분한다. 후속 필터도 필요하다.
Edge는 생성 조건이다. 실제 행동의 타당성을 보장하는 판정서는 아니다.
Sec.3.3 · PDF p.11; 물리 보장 한계는 설명을 위한 해석
Canny 알고리즘 자체의 수학·threshold 절차를 별도 공식 근거 없이 추가하지 않는다. 원문이 보존을 목표로 기술한 사실과 우리가 지적하는 보장 범위의 한계를 표지로 구분한다.

S049 V2V: 외형은 바꾸고 움직임은 유지
이미 만들어진 영상에 색·질감 변형을 주어 행동 라벨을 유지할 수 있는 다양성을 노린다.
###### Video-to-video의 목표

Cosmos-Transfer2.5-2B로 합성 영상의 외관을 변환한다. Canny edge map을 조건으로 물체의 정체·형태를 유지하며 **질감과 색**을 바꾼다.

원문은 motion dynamics를 보존함으로써 이미 주석한 action의 유효성을 유지하려는 방식이라고 설명한다.
###### 두 scene 변형 경로 비교

<div class="compare">
<div><strong>I2I → I2V</strong>
<p>시작 장면을 편집한 뒤 새 영상을 생성한다.</p></div>
<div><strong>V2V</strong>
<p>영상 수준의 외관을 변환하며 동작은 보존하려 한다.</p></div>
</div>

<p class="mini">V2V에서 움직임을 유지하려는 목표와 모든 샘플에서 라벨이 정확하다는 보장은 구분한다.</p>
V2V의 핵심은 새 동작 생성보다 기존 동작의 외관 다양화다.
Sec.3.3 · Scene Augmentation · PDF p.11
“행동 유효성 유지”는 저자의 설계 설명이다. 본문은 I2I target identity 변형과 V2V identity/shape 유지의 범위를 다르게 명시한다. Figure5(c)는 V2V 전용 예시로 사용하지 않는다.

S050 Figure 5: 무엇이 바뀐 영상인가?
세 행의 차이를 생성 경로와 연결하되, 그림에 없는 비교까지 읽어내지 않는다.
###### 세 행을 구분해 읽기

**(a) 원본:** 자체 수집 ALLEX의 컵라면 쌓기 시연이다.

**(b) Task 변형:** VLM이 생성한 지시로 동작을 다양화한 예다.

**(c) Scene 변형:** 시작 프레임 I2I 편집 후 I2V로 만든 예다.
<p class="callout">(c)를 V2V만의 결과나 두 scene 방법의 정량 비교로 해석하지 않는다.</p>
Figure 5는 생성 예시이고, 데이터 품질이나 증강별 효과의 분리 검증은 아니다.
Fig.5; Sec.3.3 · PDF p.11
원문 캡션을 기준으로 (c)의 생성 경로를 정확히 명시한다. 예시 영상을 보고 전체 합성 집합의 품질을 정량적으로 단정하지 않는다. 개별 augmentation 효과는 이후 Table3의 통제 범위를 따로 설명한다.
-->

---
layout: none
---

<!-- slide-id: P015 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P015"><header class="seminar-header"><div class="chapter-label">Training Data</div><h1>합성 데이터 검증</h1><p class="slide-lead">IDM의 추정 행동을 시뮬레이터에서 재생하고, 생성 영상의 움직임과 비교한다.</p></header><div class="seminar-body split"><div class="body-main"><h3>영상에서 행동으로</h3>
<div class="flow">
<div class="node">관측 쌍</div>
<div class="arrow">→</div>
<div class="node">IDM</div>
<div class="arrow">→</div>
<div class="node">추정 행동</div>
</div>
<p>현재·미래 프레임에서 중간 행동을 추정해 pseudo-label을 만든다. 그 행동을 simulator에서 재생하면 비교용 rollout 영상이 생긴다.</p>
<p>별도 품질 VLM은 지시 불일치를 re-caption하고, 동작 plausibility를 평가해 선별한다.</p>
</div><div class="body-aside"><h3>움직임이 서로 맞는가?</h3>
<p>두 clip을 frozen V-JEPA2로 인코딩하고 특징을 concat한다. 학습 가능한 query가 cross-attention으로 읽은 뒤 linear head가 일치를 판별한다.</p>
<p>실제 clip+GT 행동 rollout은 positive, 시간·episode가 어긋난 쌍은 negative다.</p>
<p class="callout">필터 통과는 현실의 물리적 성공 보장이 아니다. 검사기의 정량 신뢰성은 추가 검증이 필요하다.</p></div></div><div class="takeaway">영상 품질과 영상–행동 정합성을 확인해 학습 쌍을 만든다. 다음은 이 데이터를 학습시키는 순서다.</div><footer class="seminar-footer"><span class="source">Sec.3.3 · PDF pp.11–12; App.B.3 · PDF p.42; 질문노트 Q2</span><span class="slide-id">P015 · 011/25</span></footer></section>

<!--
Negative의 다른 episode는 동일 task instruction을 공유한다. 모델별 설정·필터 임계값 미기재와 오탐·미탐 문제는 상세 단위에 보존한다.

S051 IDM과 simulator rollout
Task 문장은 목표를 말하고, IDM은 두 관측 사이에 필요한 행동 시퀀스를 추정한다.
###### 영상에 없는 라벨을 추정

<div class="sequence">
<div class="step">현재·미래 프레임 쌍을 IDM에 입력</div>
<div class="step">중간 action 시퀀스를 flow matching으로 예측</div>
<div class="step">예측 action을 simulator에서 재생</div>
</div>

rollout은 언어 지시만으로 만든 영상이 아니라 **추정한 수치 행동을 실행한 참조 영상**이다.
###### IDM 구현과 라벨의 지위

0.1B DiT와 SigLIP-2 vision encoder를 사용한다. GR-1은 공개 사전학습 checkpoint, ALLEX는 자체 원격 조작 데이터로 처음부터 학습한다.

ALLEX 설정은 action horizon 20, batch 256, 60K gradient steps다.

<p class="callout">생성 영상의 행동은 ground truth가 아니라 pseudo-action label이다.</p>
IDM이 붙인 라벨도 추정치이므로, 생성 영상과의 움직임 일치를 다시 검사한다.
Sec.3.3 · PDF pp.10–12; App.B.3 · PDF p.42
ALLEX IDM horizon $H+1=20$은 mid-training policy의 ALLEX chunk40이나 RECAP 생성40/실행20과 다른 설정이다. 문맥이 다른 horizon 수치를 하나로 합치지 않는다.

S052 Video quality filtering
지시가 맞는지와 영상 동작이 그럴듯한지를 따로 보고, 필요한 경우 지시를 다시 쓴다.
###### 검사 1: instruction following

생성된 영상의 로봇 동작이 원래 생성 지시를 따르는지 VLM으로 판단한다.

지시에서 벗어났다면 **관찰된 실제 동작에 맞게 re-caption**한다. 이때 바뀌는 것은 영상의 언어 설명이다.

<p class="mini">지시 불일치 샘플을 모두 폐기한다고 단순화하면 re-caption 경로를 놓친다.</p>
###### 검사 2: trajectory plausibility

손의 접근 거리, 깊이, 공간 방향, 물체 상호작용 등을 보고 **1–5점**을 부여해 임계값보다 높은 영상만 남긴다.

부록은 Gemini API를 사용하며, 지시 검사는 균일 추출 16프레임, plausibility 검사는 8프레임을 입력한다고 명시한다.

<p class="callout">이 단계는 영상 품질 검사이며 행동 라벨 정합성 검사는 별도다.</p>
Re-caption은 설명을 고치고, plausibility 선별은 남길 영상을 고른다.
Sec.3.3 · PDF p.11; App.B.3 · PDF p.42
원문은 사전 정의 threshold를 언급하지만 이 본문/부록에는 구체적인 cutoff 값이 없다. Gemini의 세부 버전을 임의로 붙이지 않는다. VLM 점수를 실제 물리 타당성의 정답으로 표현하지 않는다.

S053 Motion-consistency classifier
두 영상을 직접 비교하는 대신, 고정된 영상 인코더의 특징 위에 작은 판별기를 학습한다.
###### 두 clip에서 하나의 일치 점수로

<div class="sequence">
<div class="step">생성 영상·simulator rollout → frozen V-JEPA2</div>
<div class="step">두 clip의 embedding을 이어 붙이기(concat)</div>
<div class="step">학습 가능한 query → 단일 cross-attention</div>
<div class="step">linear head → alignment logit → 선별 확률</div>
</div>
###### 무엇을 학습하는가?

영상 인코더는 고정하고, 가벼운 **attentive probe**를 학습한다. Query가 합쳐진 두 clip 특징을 참고해 움직임의 어긋남을 판별한다.

Binary cross-entropy, 16프레임·256×256·temporal stride 4, batch 32, AdamW, 학습률 $10^{-4}$를 사용한다.

<p class="mini">확률이 정한 임계값을 넘은 샘플만 남긴다. 임계값 수치는 명시되지 않는다.</p>
Concat 특징을 query가 읽는 구조이며, 두 영상의 단순 픽셀 차이 검사가 아니다.
Sec.3.3 · PDF p.12; App.B.3 · PDF p.42
logit→probability는 이진 분류 설명을 위한 연결이다. 원문은 alignment logit과 alignment probability 선별을 함께 명시한다. 하나의 learnable query와 단일 cross-attention layer를 유지한다. V-JEPA2 자체를 이 데이터로 전부 fine-tune했다고 쓰지 않는다.

S054 Classifier는 어떤 쌍으로 배우는가?
정답 행동을 재생한 쌍은 positive, 동작이 어긋난 쌍은 negative로 구성한다.
###### Positive pair: 정답 행동과 일치

<div class="flow">
<div class="node">실제 시연 clip</div>
<div class="arrow">↔</div>
<div class="node">그 clip의 GT action<br>simulator rollout</div>
</div>

실제 영상과 렌더 영상은 외관이 달라도, 같은 정답 행동에 대응하는 움직임을 갖는다.

<p class="mini">학습 positive를 “생성 영상과 IDM 예측”으로 바꾸어 설명하면 기준 자체가 흐려진다.</p>
###### Negative pair: 비슷하지만 어긋남

- **동일 episode:** 시간 창을 이동해 서로 다른 시점의 동작을 짝짓는다.
- **서로 다른 episode:** 동일한 task instruction을 가진 다른 시연의 clip을 짝짓는다.

같은 지시라도 손과 물체의 구체적인 움직임은 다를 수 있다. 언어 유사성만 보고 일치로 판정하지 않도록 한다.
학습 기준은 실제 시연의 GT 행동이고, 합성 샘플은 학습한 판별기로 선별한다.
Sec.3.3 · Motion-Consistency Filtering · PDF p.12
“언어 유사성만 보지 않도록 한다”는 negative 구성의 교육적 해석이다. 원문은 두 종류 negative를 명시하지만 비율·전체 pair 수·오탐미탐률은 이 절에 없다.

S055 합성 모델과 검증 범위
생성기·IDM·품질 VLM·일관성 분류기는 서로 다른 오류를 다루는 구성요소다.
###### 무엇을 만들고 검사하는가?

- **영상 생성:** GR-1은 Cosmos-Predict2-14B, ALLEX는 Cosmos-Predict2.5-2B를 로봇 영상에 적응한다.
- **IDM:** 영상에서 pseudo-action을 추정한다.
- **Gemini:** 지시 일치·영상 plausibility를 평가한다.
- **V-JEPA2 probe:** 영상과 action rollout의 움직임 일치를 평가한다.
###### 확인된 설정과 남은 검증

GR-1 생성기는 공개 영상 3,027+92개로 LoRA rank32, 10K steps 학습한다. ALLEX 생성기는 자체·타 로봇 영상을 섞어 20K steps 전체 학습한다.

<p class="callout">구현 설정이 있다는 사실과 검사기가 신뢰할 만하다는 정량 근거는 다르다.</p>

오탐·미탐, 실제→합성 분포 차이, 필터별 기여는 추가 확인할 항목이다.
여러 모델의 검사를 통과했다는 사실을 현실에서의 성공 보장으로 바꾸지 않는다.
App.B.3 · PDF p.42; Sec.3.3 · PDF pp.10–12; 질문노트 Q2·Q8
GR-1:93-frame432×768, batch4. ALLEX:ALLEX/OpenArm/ActionNet 2:1:1, 93-frame432×768, batch8, uniform full-episode sampling과16FPS consecutive random sampling. Re-caption용 Qwen3-VL8B 또는30B-A3B와 품질 검사 Gemini를 구분한다. 본문 학습 설정은 검증·재현 실행을 뜻하지 않는다.
-->

---
layout: none
---

<!-- slide-id: P016 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P016"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>Pre-training</h1><p class="slide-lead">범용 조작을 배우면서 로봇별 전용 경로와 새 로봇 적응용 공통 경로를 함께 학습한다.</p></header><div class="seminar-body figure balanced"><figure class="paper-figure"><img src="/figures/fig-06.png" alt="Figure 6 · 약 1.5M episode의 pool과 별도로 정한 학습 혼합 비중" loading="eager"><figcaption>Figure 6 · 약 1.5M episode의 pool과 별도로 정한 학습 혼합 비중</figcaption></figure><div class="body-main"><h3>세 단계 학습과 입출력 경로</h3>
<p><strong>Pre(범용) → Mid(로봇·기능) → Post(작업)</strong> 순서로 적응한다.</p>
<p><strong>전용 경로:</strong> 로봇별 입력 projection → 공유 MSAT → 로봇별 출력 projection.</p>
<p><strong>공통 경로:</strong> 매 batch에서 256 trajectory를 로봇 구분 없는 encoder–decoder로 보내 새 로봇 적응의 초기값을 준비한다.</p>
<p class="mini">Projection은 상태·행동 공간과 공통 잠재 공간을 연결한다. Fig.6의 원은 샘플링 비중, 표는 episode pool 크기다.</p></div></div><div class="takeaway">서로 다른 로봇의 데이터를 공유 본체에 연결했다. 다음은 목표 로봇의 새 기능을 학습한다.</div><footer class="seminar-footer"><span class="source">Sec.2.2 · PDF p.8; Sec.4–4.1 · Fig.6 · PDF pp.12–13</span><span class="slide-id">P016 · 012/25</span></footer></section>

<!--
기존 P011의 embodiment-specific projection과 S036을 이 장으로 통합했다. 로봇마다 다른 차원의 state/action을 input/output projection으로 공통 공간과 연결한다. 이를 P stream 자체와 동일시하지 않는다. Batch8192 중 무작위256 trajectory를 공통 encoder–decoder에 보내는 설정을 보존한다. Shared module은 leading dimensions에 고정 크기 zero-padding한다. 정확한 dimension 배열은 추가 가정하지 않는다. Pre-training은4프레임·flow matching을 사용하며 freeze/정규화/학습 규모의 상세는 S059에 남긴다. Fig.6 pool와 sampling을 구분한다.

S056 Pre·Mid·Post-training의 역할
먼저 범용 조작을 배우고, 로봇의 기능을 확장한 뒤, 목표 작업에 적응한다.
###### 세 단계의 질문

<div class="sequence">
<div class="step"><strong>Pre:</strong> 다양한 로봇의 공통 조작 경험을 어떻게 배울까?</div>
<div class="step"><strong>Mid:</strong> 특정 로봇과 새 기억·센서 기능에 어떻게 적응할까?</div>
<div class="step"><strong>Post:</strong> 실제 목표 작업을 어떻게 안정적으로 수행할까?</div>
</div>
###### 단계와 학습법은 다른 축

Pre-training은 대규모 multi-embodiment 데이터를 이용한 flow matching이다. Mid-training은 ALLEX·Franka 특화와 STSS·memory·physics 확장을 수행한다.

Post-training은 대부분 작업별 **imitation learning**을 쓴다. 일부 어려운 조작에 RECAP 기반 RL refinement를 추가한다.

<p class="callout">모든 post-training을 RL이라고 부르지 않는다.</p>
범용성 → 로봇·기능 특화 → 작업 적응의 순서로 학습 목적이 좁아진다.
Sec.4.1–4.3 · PDF pp.12–15
세 단계의 역할 지도이며 모든 benchmark가 동일하게 모든 단계·모듈·RL을 사용한다는 뜻은 아니다. 사전학습 모델의 benchmark fine-tuning과 mid-trained real-world 기능 평가 조건은 평가 파트에서 구분한다.

S057 Pre-training 데이터 혼합
Figure 6의 원 그래프는 학습 혼합 비중이고, 표의 episode 수는 데이터 pool 크기다.
###### 약 1.5M episode의 범위

단일 팔·양팔 그리퍼와 손을 가진 휴머노이드를 함께 사용한다. 데이터가 부족한 휴머노이드에는 **합성 GR-1 150K episode**를 추가한다.

예를 들어 OXE 870K, DROID 92K, ActionNet 30K는 준비된 episode 수다. 학습 때 같은 비율로 뽑는다는 뜻은 아니다. 실제로 OXE와 DROID의 혼합 비중은 각각 25%다.
<p class="callout">Pool의 크기와 batch에 들어오는 샘플의 비중을 분리해서 읽는다.</p>
큰 데이터셋의 episode가 많아도 학습 기여 비중이 자동으로 결정되지는 않는다.
Fig.6; Sec.4.1 · PDF pp.12–13
Figure 6 표: OXE 870K, DROID 92K, Galaxea 114K, AgiBot(G) 239K, AgiBot(H) 36K, ActionNet 30K, Humanoid Everyday 9K, Synthetic 150K, 전체 약 1.5M. 실제 그림 범례를 대조한 학습 혼합 비중: OXE 25%, DROID 25%, Galaxea 10%, AgiBot(G) 10%, AgiBot(H) 5%, ActionNet 10%, Humanoid Everyday 5%, Synthetic 10%. 본문 소개의 원시 데이터 규모와 실제 corpus 수를 구분한다. 비중을 episode 수의 비율로 덮어쓰지 않는다.

S058 공통 projection과 256개 trajectory
로봇별 입출력 경로를 유지하면서, 일부 샘플로 새 로봇 적응용 공통 경로도 학습한다.
###### 같은 공간, 두 입출력 연결부

<div class="sequence">
<div class="step">기본 경로: 로봇별 state/action → embodiment-specific projection</div>
<div class="step">일부 샘플: 크기를 맞춘 state/action → embodiment-agnostic encoder–decoder</div>
<div class="step">공유 latent 표현과 행동 모델을 학습</div>
</div>

공통 경로의 입력은 고정 크기에 맞게 앞쪽 차원을 zero-padding한다.
###### 256은 어떤 수인가?

각 batch에서 **trajectory 256개를 무작위로 선택해 공통 경로로 보낸다.** 공통 projection의 출력 차원이나 로봇 종류 수가 아니다.

Global batch는 8,192다. 저자는 공통 경로를 미관측 embodiment fine-tuning의 강한 초기값으로 활용하려 한다.

<p class="mini">256개를 별도 추가 batch로 더 학습한다고 원문에 없는 절차를 만들지 않는다.</p>
공통 projection은 로봇별 경로를 대체하기보다 새 로봇 적응을 준비하는 경로다.
Sec.4.1 · PDF pp.12–13
원문 문구는 randomly sample256 trajectories for each batch and route them through shared encoder-decoder. Batch8192와 trajectory256의 단위를 그대로 유지하며 전체 corpus256개로 해석하지 않는다. Shared module이 zero-padding에 사용하는 정확한 차원 배치는 이 문단만으로 추가 확정하지 않는다.

S059 Pre-training 설정을 읽는 법
시간 문맥·정규화·학습 가능한 범위·학습 규모를 서로 다른 설정으로 읽는다.
###### 입력과 정규화

<div class="token-row"><span class="token c">$t-6$</span><span class="token c">$t-4$</span><span class="token c">$t-2$</span><span class="token c">$t$</span></div>

현재 기준 네 프레임을 사용한다. State와 action은 데이터셋별 **1st·99th percentile**을 이용해 $[-1,1]$로 정규화한다.

VLM backbone은 위쪽 네 층을 제외하고 고정한다. 여러 프레임 입력은 이 단계부터 존재한다.
###### 학습 규모

- 100K steps · global batch 8,192
- AdamW · 학습률 $10^{-4}$
- 처음 5% linear warmup 후 일정 학습률
- 64 × NVIDIA H200 · 약 195시간

<p class="mini">논문의 학습 보고값이며, 이 발표에서 재현한 결과가 아니다. 프레임 offset은 timestep 단위이며 초 단위로 임의 환산하지 않는다.</p>
영상 시간 문맥은 pre-training부터, 전용 움직임 모듈은 mid-training부터 추가된다.
Sec.4.1 · Implementation Details · PDF p.13
상위4층 외 frozen이라는 범위를 action model도 frozen이라는 뜻으로 확대하지 않는다. Percentile normalization의 정확한 clipping 처리 등 원문에 없는 구현 세부를 추가하지 않는다.

S036 로봇별 입출력 projection
MSAT의 공통 내부와, 로봇마다 다른 상태·행동 공간을 연결하는 얇은 층을 구별한다.
###### 플랫폼마다 다른 숫자 공간

<div class="sequence">
<div class="step"><strong>로봇별 input projection</strong><br>해당 로봇의 state·action → 공유 latent space</div>
<div class="step"><strong>공유 MSAT</strong><br>여러 embodiment가 같은 본체 파라미터를 학습</div>
<div class="step"><strong>로봇별 output projection</strong><br>공유 표현 → 해당 로봇 공간의 예측 출력</div>
</div>

관절 수와 end-effector 구성이 달라도 공유 latent space를 통해 하나의 행동 모델로 연결한다.
###### P stream과는 다른 분리 기준

**로봇별 projection:** embodiment 간 입력·출력 공간의 차이를 다룬다.

**P stream:** 물리 센서라는 모달리티를 별도 파라미터 경로에서 다룬다. 로봇 이름별로 C/A/P를 하나씩 정하는 구조가 아니다.

Sec.4.1은 새 embodiment 적응을 위해 별도의 **embodiment-agnostic projection**도 일부 샘플로 학습한다고 설명한다. 공유 MSAT, 로봇별 연결층, 공통 연결층은 각각 다른 요소다.
공유 본체를 유지하면서 로봇 공간을 맞추는 연결층과, 모달리티별 stream을 구분한다.
Sec.2.2 MSAT · PDF p.8; Sec.4.1 Generalization to New Embodiments · PDF p.12
원문은 lightweight embodiment-specific projection을 MSAT input/output에 둔다고 명시한다. Output은 모델 velocity prediction을 해당 action space로 연결하는 맥락이며 직접 위치 목표만 출력한다고 좁히지 않는다. Sec.4.1은 agnostic projection의 input을 leading dimensions에 zero-pad한다고 서술한다. 구체적인 batch의 256 trajectory 설정은 S058에서 다룬다. Franka/ALLEX의 정확한 dimension을 임의로 예시하지 않았다.
-->

---
layout: none
---

<!-- slide-id: P017 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P017"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>Mid-training</h1><p class="slide-lead">Mid-training은 ALLEX·Franka 특화와 움직임·기억·물리 센싱의 확장을 함께 수행한다.</p></header><div class="seminar-body figure"><figure class="paper-figure"><img src="/figures/fig-07.png" alt="Figure 7 · 로봇별 데이터 혼합과 새 입력의 자체 데이터 supervision" loading="eager"><figcaption>Figure 7 · 로봇별 데이터 혼합과 새 입력의 자체 데이터 supervision</figcaption></figure><div class="body-main"><h3>기능 추가와 정렬</h3>
<p>STSS·memory·물리 센서를 추가한다. Memory는 과거 cognition <strong>3묶음</strong>을 사용한다.</p>
<table>
<thead>
<tr>
<th>로봇</th>
<th>저장 간격 / 과거 범위</th>
</tr>
</thead>
<tbody>
<tr>
<td>ALLEX</td>
<td>40 / 120 steps</td>
</tr>
<tr>
<td>Franka</td>
<td>16 / 48 steps</td>
</tr>
</tbody>
</table>
<p>처음 <strong>2K alignment steps</strong>는 새 파라미터만, 이후에는 전체를 함께 학습한다.</p>
<p class="mini">확장 입력 dropout·physics near-zero 초기화도 사용한다.</p></div></div><div class="takeaway">여러 프레임 입력은 pre-training부터, 전용 기능 모듈은 mid-training에서 추가한다.</div><footer class="seminar-footer"><span class="source">Sec.4.2; Fig.7 · PDF p.13; 질문노트 Q10·Q11</span><span class="slide-id">P017 · 013/25</span></footer></section>

<!--
ALLEX 실제:합성5:5와 Franka DROID:자체8:2의 역할을 그림과 연결한다. Near-zero가 masking이나 기존 출력의 완전 보존을 뜻하지 않는다는 설명은 상세 단위에 둔다. Memory의40/120·16/48 설정은 P005의 반복 구조도 대신 여기서 명시한다. 문장 H+1과 queue식 H의 불일치·갱신/초기 부족 처리의 미명세는 P032 상세와 P030에서 다룬다. Fig.7의Franka합101 문제도 마지막 장에 모아 보존한다.

S060 Mid-training: 무엇을 새로 넣는가?
이미 쓰던 여러 프레임 위에 움직임·장기 기억·물리 센싱 기능을 추가한다.
###### 기능 확장의 세 갈래

- **Motion:** vision encoder에 STSS 모듈을 통합한다.
- **Memory:** VLM 뒤 memory module에 과거 cognition 3묶음을 넣는다.
- **Physics:** 현재 센서를 조건으로 chunk 구간의 미래 센서 trajectory도 예측한다.

여러 프레임 입력 자체가 mid-training에 처음 도입된 것은 아니다.
###### 로봇별 시간·센서 설정

ALLEX chunk horizon은 40, Franka는 16이다. 과거 cognition은 chunk horizon 간격으로 3개를 사용해 각각 120·48 timestep의 범위를 설명한다.

미래 센서 예측 길이는 <strong>$L=H+1$</strong>이다. ALLEX는 토크, Franka는 토크와 AnySkin 촉각을 쓴다.

<p class="mini">Queue 갱신·초기화의 세부 규칙은 별도 미해결 질문이다.</p>
Mid-training은 입력 프레임 수의 시작점보다 기능 모듈 통합의 시작점이다.
Sec.4.2 · PDF p.13; Sec.4.1 · PDF p.13; 질문노트 Q5·Q10
원문의 $n_{\mathrm{mem}}=3$,ALLEX40/FR3 16 및120/48을 그대로 전달한다. 현재 $h_t$를 포함하는 전체 attention 범위와 과거 queue 길이를 섞지 않는다. Memory queue가 매20실행마다 어떻게 업데이트되는지 추론해 채우지 않는다.

S061 Mid-training 데이터 혼합과 불일치
로봇별 혼합 목적은 설명되지만, Figure 7의 Franka 수치 합계는 본문과 맞지 않는다.
###### 본문의 두 혼합

**ALLEX:** 자체 실제 데이터와 합성 72K episode를 **5:5**로 sampling한다.

**Franka:** DROID 92K와 자체 데이터를 **8:2**로 sampling한다.

자체 데이터는 새 입력의 supervision, 대규모 데이터는 기존 조작 범위를 유지하는 역할이다.
<p class="callout">Franka 그림: $80.0+9.4+11.6=101.0$. 자체 데이터 둘은 21.0으로 본문의 20%와 불일치한다.</p>
비율의 역할은 읽되, 맞지 않는 숫자를 임의로 보정하지 않는다.
Fig.7; Sec.4.2 · PDF p.13; 질문노트 Q10·Q11
실제 그림 범례를 대조했다. ALLEX: In-house 50, Task Aug. 25, No Aug. 15, Task/Scene Aug. 10. Franka: DROID 80, In-house(physical sensor 있음) 9.4, 없음 11.6. 11.6을 10.6으로 고치거나 합계 101로 나눠 정규화하지 않는다. 5:5·8:2가 다른 비율보다 낫다는 비교 근거도 이 절에는 없다.

S062 새 입력과 modality dropout
자체 데이터로 새 memory·토크·촉각 입력을 학습하면서 각 확장 입력에 dropout을 적용한다.
###### 모든 데이터가 새 입력을 주지는 않는다

원문은 자체 수집 데이터가 새 **memory·torque·Franka tactile** 입력의 유일한 supervision 공급원이라고 설명한다.

더 큰 기존 데이터는 조작 범위를 유지한다. 영상은 이미 pre-training에서 multi-frame으로 입력되었으므로 STSS 추가와 새 센서 추가를 구분한다.
###### 0.3 dropout의 정확한 범위

Mid-training에서 각 expanded modality input에 독립적으로 **0.3 dropout**을 적용해 통합을 안정화한다고 명시한다.

<span class="label question">남은 질문</span>

어느 tensor를 어떤 단위로 제거하는지, memory 구성의 어느 부분을 대상으로 하는지는 이 문단만으로 확정하기 어렵다.

<p class="mini">모델 전체의 30%를 끄거나 프레임 30%를 지운다고 바꾸어 설명하지 않는다.</p>
Dropout 비율은 확인됐지만 구체적인 masking 단위는 추가 명세가 필요하다.
Sec.4.2 · PDF p.13; 질문노트 Q10
원문 expanded modality input 표현을 보존한다. Memory supervision을 새 직접 라벨 파일이 반드시 존재한다고 해석하지 않는다. 센서가 없는 episode에 대한 실제 masking 구현도 논문 해당 문단만으로 상상하지 않는다.

S063 Alignment warmup: 새 모듈부터 적응
처음 2K step은 새 파라미터만 학습하고, 그 뒤 전체 파라미터를 함께 갱신한다.
###### 학습 시작의 두 구간

<div class="sequence">
<div class="step"><strong>앞에 추가한 2K alignment steps</strong><br>사전학습 파라미터 고정 · 새 modality-specific 파라미터만 갱신</div>
<div class="step"><strong>이후 joint training</strong><br>기존·새 파라미터를 함께 학습</div>
</div>

매 batch나 denoising 반복마다 새로 수행하는 절차가 아니다.
###### 왜 먼저 새 연결부를 맞출까?

<span class="label interpretation">설계 해석</span>

이미 배운 표현을 고정한 상태에서 새 입력 경로가 그 표현에 먼저 적응하게 한다는 직관이다. 이 효과를 별도 실험으로 확인한 것과는 다르다.

주 학습 설정은 25K steps·global batch1,024·AdamW·학습률 $5\times10^{-5}$이며, 약 15시간/64 H200으로 보고한다.
Alignment warmup의 파라미터 고정은 학습 초반의 일회성 구간이다.
Sec.4.2 · Implementation Details · PDF p.13; 질문노트 Q10
본문은25K mid-train과prepend2K alignment라고 별도로 적는다. 총 step 집계 관례를 추가 확인 없이 단정하지 않는다. 일반 learning-rate warmup(동일 schedule)의5%와 여기2K alignment를 구별한다. “all parameters jointly”를 pre-training 상위4층 freeze 범위와 임의로 동일시하지 않는다.

S064 Near-zero 초기화의 직관과 한계
물리 stream의 초기 출력을 작게 시작하지만, 기존 모델과 완전히 같은 출력을 보장하지 않는다.
###### 원문이 명시한 대상

Physics stream의 projection·attention 등을 포함한 파라미터에 **near-zero output weights** 초기화를 적용한다.

<span class="label interpretation">설명을 위한 직관</span>

새 경로가 처음부터 큰 신호를 더하지 않도록 시작해, 기존 표현에 주는 초기 교란을 작게 하려는 선택으로 이해할 수 있다.
###### 무엇이 아직 비어 있는가?

- 정확히 어떤 행렬을 어떤 값으로 초기화하는가?
- 왜 완전 zero 대신 near-zero인가?
- 다른 초기화보다 실제로 안정적이었는가?

<p class="callout">작은 출력 가중치는 P stream masking과 다르다. 전체 정책이 초기부터 기존 정책과 동일하다는 보장도 아니다.</p>
초기화 설정은 사실, 안정화 이유는 해석, 비교 효과는 미확인이다.
Sec.4.2 · PDF p.13; 질문노트 Q10
Near-zero가 정확한0이나 특정분산(예$10^{-5}$)이라는 숫자를 만들지 않는다. 초기 교란 감소는 설계 해석으로 표지한다. 결과 분석에 warmup/초기화 독립 ablation이 없다면 미해결로 남긴다.
-->

---
layout: none
---

<!-- slide-id: P018 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P018"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>Post-training</h1><p class="slide-lead">Post-training의 기본은 작업별 모방학습이며, 실패 조건에 맞춰 시연을 추가한다.</p></header><div class="seminar-body split"><div class="body-main"><h3>Base data: 일관성과 다양성</h3>
<p>작업을 접근·잡기·이동·놓기 같은 동작으로 나누고 시연 시나리오를 정한다.</p>
<div class="compare">
<div><strong>고정할 축</strong>
<p>잡는 자세·경로·순서</p></div>
<div><strong>변화시킬 축</strong>
<p>물체 위치·자세·초기 상태</p></div>
</div>
<p>일관된 state–action 구조 안에 필요한 변화를 담아 제한된 시연을 수집한다.</p>
</div><div class="body-aside"><h3>Refinement: 실패를 다음 수집으로</h3>
<div class="sequence">
<div class="step">시연으로 학습 → 실제 작업에 배치</div>
<div class="step">실패 조건 관찰 → 추가 시연 → 재학습</div>
</div>
<p>예를 들어 새 물체 위치에서 실패하면 시연의 공간 범위를 넓힌다.</p>
<p class="callout">대부분 실험은 IL을 쓴다. 일부 어려운 조작에서 RECAP 기반 RL을 보완적으로 추가한다.</p></div></div><div class="takeaway">작업별 IL과 실패 조건의 추가 시연이 기본이다. 다음은 이를 보완하는 선택적 RL이다.</div><footer class="seminar-footer"><span class="source">Sec.4.3 · Adaptive Data Collection/RL · PDF pp.14–15</span><span class="slide-id">P018 · 014/25</span></footer></section>

<!--
시연 추가 수집과 다음 장의 policy rollout 수집을 구분한다. 고정·변화 축은 원문 예시이며 모든 작업에 적용되는 절대 규칙은 아니다.

S065 Post-training의 기본은 작업별 IL
시연의 구조는 일관되게 유지하고, 작업에 필요한 변화는 의도적으로 넓힌다.
###### 먼저 시연 시나리오를 설계

대부분 실험은 embodiment·task-specific demonstration으로 모방학습한다. 복잡한 손 조작과 정밀 접촉에서는 제한된 시연의 품질이 특히 중요하다.

<div class="flow">
<div class="node">접근·잡기</div>
<div class="arrow">→</div>
<div class="node">옮기기·놓기</div>
<div class="arrow">→</div>
<div class="node">기다리기</div>
</div>

전체 작업을 시간 순서의 atomic motion primitive로 나눈다.
###### 고정할 것과 바꿀 것

<div class="compare">
<div><strong>Consistency factors</strong>
<p>잡는 자세, 움직임 경로, 실행 순서 등 일관된 state–action 패턴</p></div>
<div><strong>Variance factors</strong>
<p>물체 자세·위치, 초기 구성, 사람과 상호작용할 때 대기 시간</p></div>
</div>

정한 변화 축을 샘플링하며 base demonstration을 수집한다.
같은 작업 구조 안에서 필요한 변화를 담아 제한된 시연의 학습 가능성을 높인다.
Sec.4.3 · Adaptive Data Collection · PDF p.14
예시 consistency/variance는 원문 예시이며 모든 작업에서 grasp pose를 항상 고정한다는 규칙은 아니다. Post-training 이름만으로 RL 사용을 추정하지 않는다.

S066 실패에 맞춘 추가 시연
기본 시연으로 배운 정책을 실제로 돌려 보고, 드러난 약점을 겨냥해 데이터를 보강한다.
###### Refinement 수집의 반복

<div class="sequence">
<div class="step">Base demonstrations → 정책 학습</div>
<div class="step">목표 작업에 배치 → 실패 조건 관찰</div>
<div class="step">시나리오·variance 범위를 확장</div>
<div class="step">약점을 겨냥한 추가 시연 → 다시 학습</div>
</div>
###### 실패를 수집 지침으로 바꾸기

원문 예처럼 물체가 여러 위치에 있을 때 실패한다면, 추가 시연에서 물체 위치의 공간적 범위를 넓힌다.

저자는 원하는 성능에 도달할 때까지 이 과정을 반복한다고 설명한다. 단순히 시연 수를 균일하게 늘리는 방식과 수집 목적이 다르다.

<p class="callout">이 refinement는 실패에 맞춘 추가 모방 시연이다. RECAP의 policy rollout 수집과 구분한다.</p>
실제 실패 조건을 다음 데이터 수집의 기준으로 사용한다.
Sec.4.3 · Adaptive Data Collection · PDF p.14
원문의 adaptive collection 프로토콜을 설명한다. Desired performance의 수치·중단 기준이나 iteration 수는 이 문단에 없다. 추가 시연이 정책 rollout을 자동 수정해 만들어진다고 임의로 덧붙이지 않는다.
-->

---
layout: none
---

<!-- slide-id: P019 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P019"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>RECAP</h1><p class="slide-lead">별도 Gemma critic의 숫자 텍스트 value를 활용해 RECAP의 policy 개선을 반복한다.</p></header><div class="seminar-body figure balanced"><figure class="paper-figure"><img src="/figures/fig-08.png" alt="Figure 8 · 정규화 value가 진행·실패·회복을 따라가는 두 사례" loading="eager"><figcaption>Figure 8 · 정규화 value가 진행·실패·회복을 따라가는 두 사례</figcaption></figure><div class="body-main"><h3>평가 → 학습 → 새 경험</h3>
<p><strong>Critic</strong>은 Gemma3-4b-it으로 value를 숫자 텍스트로 예측한다. 행동을 만드는 Qwen 기반 RLDX-1과 별도 모델이다.</p>
<p>Critic → advantage labels → policy 학습 → rollout 수집을 반복한다. 성공 데이터로 critic을 갱신한다. 정확한 advantage label 식은 미기재다.</p>
<p class="callout">Figure 8은 성공률이 아닌 진행 value다. 실제 정책 개선 결과는 뒤의 RL 분석에서 확인한다.</p></div></div><div class="takeaway">실패·회복을 읽는 critic과 행동을 만드는 policy를 분리하고, 새 데이터로 함께 개선한다.</div><footer class="seminar-footer"><span class="source">Sec.4.3; Fig.8 · PDF pp.14–15; App.C Algorithm1 · PDF p.43</span><span class="slide-id">P019 · 015/25</span></footer></section>

<!--
Figure 8은 첫 성공과 재시도 성공 사례다. 모든 작업의 critic 정확도를 입증하는 실험으로 확대하지 않는다. 반복마다 전체 누적 데이터의 advantage를 다시 부여한다.

S067 Policy와 critic은 별도 모델
RLDX-1 policy는 행동을 만들고, 별도 Gemma critic은 현재 상황의 가치를 추정한다.
###### 행동을 만드는 policy

**RLDX-1**은 영상·지시·상태 등을 조건으로 action chunk를 생성한다. Qwen3-VL 기반 관측 표현과 MSAT 행동 모델을 이용한다.

<div class="flow">
<div class="node">관측·지시·상태</div>
<div class="arrow">→</div>
<div class="node">RLDX-1 policy</div>
<div class="arrow">→</div>
<div class="node">수치 행동</div>
</div>
###### 진행 가치를 읽는 critic

별도 **gemma3-4b-it** VLM을 사용한다. 현재 관측·task instruction·이산화한 state를 받아 정규화 전 정수 value를 텍스트로 출력한다.

새 value head 대신 기존 LM text-prediction 인터페이스를 재사용한다. LoRA rank128로 vision encoder를 포함한 전체 target에 적응하고, 성공 시연에서 1 epoch 학습한다.
Policy의 Qwen과 critic의 Gemma를 하나의 모델이나 동일 head로 혼동하지 않는다.
Sec.4.3 · PDF pp.14–15; App.C · PDF p.43
Critic의 학습률은 $10^{-4}$다. Critic LoRA가 vision encoder를 포함한다는 설정과 policy 학습의 vision encoder freeze를 구분한다. Critic의 숫자 텍스트는 autoregressive prediction이지만 policy action generation은 flow matching이다.

S068 Value와 advantage를 구분하기
현재 상황의 가치와 기대에 비해 행동이 얼마나 유리한지는 서로 다른 판단이다.
###### Value: 지금 어디까지 왔는가?

보고서의 critic은 관측·지시·state에서 값을 추정하며, Figure 8은 이 값이 작업의 진행·실패·회복을 반영하는지 보여준다.

현재 상태를 평가하는 value와 로봇에 직접 보낼 action은 역할이 다르다.
###### Advantage: 기대보다 유리했는가?

<span class="label interpretation">배경 직관</span>

좋은 상태라는 것과 그 상태에서 선택한 행동이 기대보다 더 좋았다는 것은 다르다. Advantage는 후자의 상대적 유리함을 나타내는 개념으로 이해한다.

<span class="label question">원문에서 남는 부분</span>

이 보고서는 critic에서 advantage labels를 얻어 policy를 학습한다고 적지만, 정확한 계산·이산화·conditioning 식은 명시하지 않는다.
Value를 곧 advantage라고 놓거나, 미기재 label 식을 정답 수식처럼 추가하지 않는다.
Sec.4.3 · PDF pp.14–15; App.C Algorithm1 · PDF p.43; 질문노트 Q3
일반 RL의 $Q-V$ 식이나 RECAP 원전의 세부식을 이 보고서가 명시한 것처럼 넣지 않는다. 이 장은 직관을 위한 개념 구분이다. Algorithm 1의 $A\leftarrow V(D_l)$는 label 생성 과정을 요약하지만, 현재 PDF 안에서 정확한 수식은 제공하지 않는다.

S069 숫자 텍스트 critic과 Figure 8
기존 LM의 숫자 토큰을 활용한 값 예측이, 예시 trajectory의 실패와 회복을 더 잘 따라간다.
###### 그래프에서 읽을 것

**(a) 첫 시도 성공:** text prediction critic의 값이 진행에 따라 더 단조롭게 증가한다.

**(b) 재시도 후 성공:** 실패 때 하락하고 회복할 때 상승하는 변화를 더 잘 반영한다.

비교 대상은 새 예측 head를 쓰는 distributional critic이다.
<p class="callout">그림은 정규화 value다. 실제 출력은 정규화 전 정수 텍스트이며, 성공률이 아니다.</p>
예시 곡선은 progress 추정의 정성적 근거이며 모든 작업에서의 우월성을 보장하지 않는다.
Fig.8 · PDF p.14; Sec.4.3 · PDF p.15; App.C · PDF p.43
원문은 native number tokens와 text interface 재사용으로 기존 지식을 활용하고 적은 데이터에 적응할 수 있다고 주장한다. Figure 8 두 사례만으로 전반적인 calibration이나 정확도를 정량 확정하지 않는다. Distributional critic의 수학적 분포 설계는 이 그림 설명만으로 추가하지 않는다. x축은 로봇 timestep이며 denoising $\tau$가 아니다.

S070 RECAP: 수집·재평가·정책 갱신
Critic과 policy를 분리해 학습하고, 새 rollout을 합쳐 두 모델을 반복적으로 개선한다.
###### 초기 학습

<div class="sequence">
<div class="step">시연 $D_l$로 critic $V$ 학습</div>
<div class="step">$V(D_l)$에서 advantage labels $A$ 생성</div>
<div class="step">$D_l$와 $A$로 policy 학습</div>
</div>

Policy와 critic을 항상 동시에 최적화하는 절차가 아니라, 분리된 단계로 시작한다.
###### 반복 i = 1…N

<div class="sequence">
<div class="step">현재 policy rollout을 $D_l$에 합치기</div>
<div class="step">누적 데이터 중 성공 trajectory로 critic 재학습</div>
<div class="step">전체 $D_l$의 advantage를 다시 붙이기</div>
<div class="step">새 labels로 policy 다시 학습</div>
</div>

<p class="mini">성공 데이터로 critic을 갱신하는 것과 전체 데이터에 labels를 다시 붙이는 것을 구분한다.</p>
데이터를 늘릴 때 critic의 평가와 policy의 supervision도 함께 갱신된다.
App.C Algorithm1 · PDF p.43; Sec.4.3 · PDF pp.14–15
Algorithm 1의 $D_{\mathrm{succ}}$는 누적 $D_l$에서 $y=\mathrm{success}$인 항목이다. $D_l$에는 rollout이 합쳐지고 critic refinement에는 그중 성공 subset을 쓴다. Policy는 pre-trained RLDX-1을 최대 30K steps(약 3 epochs), global batch128, AdamW $10^{-4}$, cosine schedule+5% linear warmup으로 학습하며 vision encoder는 고정한다. RL과 추가 데이터의 효과 분리 문제는 평가 장으로 연결한다.

S071 40개 생성·20개 실행은 무엇인가?
한 번에 계획한 chunk 길이와 실제로 실행할 길이, 내부 denoising 횟수는 서로 다르다.
###### RECAP policy의 바깥 반복

<div class="sequence">
<div class="step">관측으로 미래 action 40개 생성</div>
<div class="step">앞쪽 action 20개만 실행</div>
<div class="step">새 관측에서 policy를 재호출</div>
</div>

App.C는 이 구성과 RTC 기반 replanning을 사용한다고 명시한다.
###### 그 안의 denoising 반복

Action 40개를 만들기 위해 noisy chunk 전체를 여러 denoising timestep <strong>$\tau$</strong>에서 갱신한다. 이 반복은 action을 로봇에서 20번 실행하는 것과 다르다.

로봇 시간 **t**, chunk 생성 길이, 실행 길이, denoising 횟수를 따로 기록해야 한다.

<p class="callout">“40개 예측·20개 실행”은 RECAP 부록 설정이다. 모든 benchmark에 그대로 일반화하지 않는다.</p>
Chunk는 미래 계획의 길이이고, denoising은 그 계획을 만드는 내부 계산이다.
App.C · Policy Training/Inference · PDF p.43; Sec.2.2 · PDF p.8
RTC의 구체적인 overlap/inpainting 알고리즘은 이 보고서 내 설명 밖이므로 추가하지 않는다. ALLEX mid-training 40, Franka mid-training 16, ALLEX IDM20 등과 조건을 구분한다. Memory queue가 실행20개마다 갱신되는지는 미해결이며 여기서 추론하지 않는다.
-->

---
layout: none
---

<!-- slide-id: P020 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P020"><header class="seminar-header"><div class="chapter-label">Inference Strategy</div><h1>추론 최적화</h1><p class="slide-lead">연산을 제출하는 호출 비용과, 연산 사이 데이터를 옮기는 비용을 서로 다른 수준에서 줄인다.</p></header><div class="seminar-body split"><div class="body-main"><h3>호출 비용 — CUDA Graph</h3>
<figure class="optimization-figure"><img src="/figures/fig-09.png" alt="Figure 9: 분리된 graph 호출과 하나로 포착한 graph의 비교"></figure>
<p>고정된 RoPE·mask 준비를 forward 밖으로 옮겨, <strong>한 forward를 하나의 CUDA Graph</strong>로 capture한다.</p>
<p class="mini">실제 Q/K·attention 계산은 계속한다. 한 graph 안에도 여러 kernel이 있으며 denoising도 반복한다.</p></div><div class="body-aside"><h3>메모리 이동 — Kernel Fusion</h3>
<figure class="optimization-figure"><img src="/figures/fig-10.png" alt="Figure 10: 분리된 연산의 global-memory 왕복과 fusion의 on-chip 재사용"></figure>
<p>RMSNorm·RoPE·attention 등을 묶어 <strong>중간 Q/K의 저장·재읽기</strong>를 줄인다.</p>
<p class="mini">Memory-bound는 대역폭 병목이다. 일부 경계는 custom kernel로 묶고, 나머지는 Torch Compile을 쓴다.</p></div></div><div class="takeaway">Graph는 호출 구조를, fusion은 연산 사이 데이터 이동을 바꾼다. 실제 지연 감소는 뒤에서 측정 결과로 확인한다.</div><footer class="seminar-footer"><span class="source">Sec.5 · Figs.9–10 · PDF pp.15–17; App.F · Table7 · PDF p.47</span><span class="slide-id">P020 · 016/25</span></footer></section>

<!--
기존 P020/P021을 통합하고 S072–081의 graph/kernel/launch, short prefill, compute/memory-bound, compile, FlashAttention, 실제8개kernel 해설을 보존한다. Attention 내부의 FlashAttention 최적화와 주변 연산까지 아우르는 fusion 경계를 구분한다. 여기서는 원리만 설명하고 p50 수치는 P027에서 한 번 읽는다. 그림은 원문이며 클릭하면 원래 크기로 확대된다. Compiler/FlashAttention의 현재 일반 동작까지 확대하지 않고 보고서 workload의 관찰로 한정한다.

S072 관측부터 실행까지의 지연
추론 중에도 장면은 움직이므로, 늦은 행동은 오래된 관측에 대한 응답이 된다.
###### 닫힌 고리에 생기는 시간 차

<div class="sequence">
<div class="step">장면 관측</div>
<div class="step">모델 추론</div>
<div class="step">모터 행동 실행</div>
<div class="step">바뀐 장면을 다시 관측</div>
</div>

각 단계의 시간이 더해져 관측 시점과 행동 실행 시점 사이에 지연이 생긴다.
###### 동적 환경에서 중요한 이유

<span class="label example">설명용 예시</span>

움직이는 물체를 보고 도달 위치를 결정해도, 실행할 때 물체는 이미 다른 곳에 있을 수 있다. 지연이 길수록 관측 상태와 현재 상태의 차이가 커질 수 있다.

저자는 **graph capture**로 실행 호출 비용을 줄이고, **kernel 최적화**로 계산·데이터 이동을 개선한다.

<p class="mini">정책 추론 시간과 전체 센서–모터 지연은 같은 측정값이 아니다.</p>
추론 최적화는 같은 관측에 더 빨리 응답하기 위한 시스템 설계다.
Sec.5 · PDF p.15
Table 4의 p50 policy latency에서 전체 제어 지연이나 제어 주기를 계산해 확정하지 않는다. 동적 환경 예시는 본문의 동기를 풀어 쓴 것이다.

S073 계산 그래프·kernel·launch
무슨 연산을 연결할지, GPU에서 무엇을 실행할지, 어떻게 호출할지를 구분한다.
###### 세 층위의 용어

<div class="sequence">
<div class="step"><strong>계산 그래프:</strong> 연산과 tensor 의존 관계</div>
<div class="step"><strong>Kernel:</strong> GPU에서 실행할 작업 코드</div>
<div class="step"><strong>Launch:</strong> kernel이나 포착한 graph 실행을 제출하는 호출</div>
</div>

연산이 빠르더라도 수백 개 호출이 누적되면 지연의 큰 부분을 차지할 수 있다.
###### RLDX-1에서 관찰한 비용

저자는 PyTorch eager가 연산별로 kernel을 호출하고, Torch Compile도 forward를 여러 subgraph로 나누어 호출 overhead를 완전히 없애지 못한다고 보고한다.

최적화 목표는 연산의 의미를 바꾸는 것이 아니라, forward를 하나의 CUDA Graph로 포착해 반복 실행하는 것이다.

<p class="mini">그래프의 노드 수와 실제 kernel 수가 항상 일대일이라는 뜻은 아니다.</p>
연산 자체의 비용과 GPU에 일을 보내는 비용을 분리하면 최적화의 목표가 보인다.
Sec.5.1 · PDF pp.15–16; 용어 구분은 설명을 위한 풀이
Graph capture와 kernel fusion을 동일시하지 않는다. CUDA Graph 하나에 여러 kernel이 들어갈 수 있다. Overhead 제거는 저자의 서술이며 전체 시스템의 모든 host 비용이 0임을 뜻하지 않는다.

S074 고정 RoPE·mask 설정은 미리 계산
배포 설정에서 변하지 않는 준비 계산을 forward 밖으로 옮긴다.
###### 실행마다 같아지는 부분

원문은 고정 배포 설정에서 RoPE와 attention mask 생성의 일부가 매 inference마다 변하지 않는다고 설명한다.

Torch Compile이 configuration 의존 부분을 compile 시점에 완전히 해소하지 못해 graph가 나뉘므로, 필요한 위치 embedding과 mask를 **사전에 계산하고 재사용**한다.
###### 미리 계산하지 않는 부분

새 관측의 hidden states, Q/K tensor, attention score와 최종 행동은 입력마다 달라진다.

<span class="label interpretation">구분을 위한 풀이</span>

고정된 위치용 값의 준비를 재사용하는 것과, 실제 Q/K에 RoPE를 적용하거나 QK attention을 계산하는 것은 다르다.

<p class="callout">“RoPE 사전 계산”을 “관측과 무관한 attention 결과 재사용”으로 해석하지 않는다.</p>
고정 설정은 재사용하고, 입력에 의존하는 신호 계산은 매번 수행한다.
Sec.5.1 · Graph Fragmentation/Static Graph Conversion · PDF p.16
원문이 명시한 configuration-dependent 부분을 넘어 모든 shape와 position이 모든 실행 조건에서 항상 고정이라고 일반화하지 않는다. QK 계산 자체를 사전 고정한다는 오해를 막는다.

S075 CUDA Graph: 여러 호출을 한 번으로
Forward를 하나의 CUDA Graph로 포착해 쪼개진 실행 호출이 쌓이는 비용을 줄인다.
###### Figure 9의 위·아래

**Dynamic:** Graph break로 나뉜 구간마다 launch 비용이 누적된다.

**Static:** 고정 설정 계산을 밖으로 옮겨 forward를 한 CUDA Graph로 포착하고, 추론 step마다 한 번 호출한다.
<p class="callout">한 graph launch에 여러 kernel이 포함된다. Denoising 반복도 계속 수행한다.</p>
Graph capture는 여러 GPU 연산을 재생할 때의 호출 방식을 최적화한다.
Fig.9; Sec.5.1 · PDF pp.15–16
원문의 한 forward pass를 single CUDA Graph로 capture하고 추론 step마다 한 번 호출한다는 서술을 유지한다. 이 그림만으로 denoising loop 전체의 포착 범위를 확대 해석하지 않는다. Kernel 내부 메모리 이동 최적화는 다음 절의 별도 과제다. 그림의 빈 간격은 수치 계산량보다 실행 제출 과정의 비효율에 초점을 둔다.

S076 Short prefill과 autoregressive 생성
RLDX-1은 짧은 시퀀스를 한 번에 처리하고, action chunk를 통째로 반복 갱신한다.
###### 언어 모델의 두 과정

<span class="label interpretation">이해를 위한 구분</span>

**Prefill:** 주어진 prompt 토큰을 함께 처리한다. 일반 LLM도 입력 prompt를 토큰 하나씩 생성하는 것은 아니다.

**Autoregressive decode:** 이미 나온 출력 토큰을 조건으로 다음 출력 토큰을 순차적으로 생성한다.
###### RLDX-1의 short prefill workload

보고서는 매 inference iteration에서 짧은 attention 시퀀스의 전체 forward를 한 번에 실행하며, action을 autoregressive token으로 생성하지 않는다고 설명한다.

각 denoising step에서 noisy action chunk 전체를 갱신하고, 이 forward를 반복해 최종 chunk를 얻는다.

<p class="callout">Chunk의 병렬 갱신과 denoising 단계의 순차 반복은 함께 존재한다.</p>
동시에 처리하는 것은 chunk 안의 후보이며, denoising 반복까지 한 번으로 합친다는 뜻은 아니다.
Sec.5.2 · Short-Prefill Workload · PDF p.16; Sec.2.2 · PDF p.8
Text critic의 autoregressive 숫자 예측과 policy 생성을 섞지 않는다. LLM의 모든 과정이 순차라는 대비를 피한다. 정확한 GPU 병렬 실행 형태나 토큰 수는 확정하지 않고, 보고서의 상대적으로 짧은 attention workload라는 설명을 따른다.

S077 Compute-bound와 memory-bound
연산 처리량이 한계인 경우와 데이터를 옮기는 속도가 한계인 경우를 나눈다.
###### 계산이 오래 걸릴 때

**Compute-bound:** 많은 곱셈·덧셈을 처리하는 속도가 병목이다. 원문은 VLM·MSAT의 matmul을 이 범주로 설명한다.

<span class="label example">설명용 예시</span>

한번 읽은 값을 여러 번 곱하고 합산할 수 있으면, 데이터 이동보다 계산량이 실행 시간을 지배할 수 있다.
###### 데이터 이동이 오래 걸릴 때

**Memory-bound:** RMSNorm·RoPE·residual처럼 주변 연산의 tensor 읽기·쓰기가 병목이 된다. 짧은 prefill에서는 이런 연산과 matmul이 번갈아 등장한다.

따라서 한 연산만 빨라져도 전체 block의 메모리 왕복이 남을 수 있다.

<p class="callout">여기의 memory는 주로 대역폭·이동 비용이다. VRAM 용량 부족이나 OOM과 다르다.</p>
같은 GPU에서도 연산 종류에 따라 최적화해야 할 병목이 다르다.
Sec.5.2 · Short-Prefill Workload · PDF p.16; 예시는 설명용
일반 roofline 수식이나 성능 임계값을 외부 근거 없이 추가하지 않는다. 모든 matmul이 항상 compute-bound이고 모든 normalization이 항상 memory-bound라는 하드웨어 무관 일반화를 피하며 이 보고서의 workload에 한정한다.

S078 Torch Compile과 fusion 경계
자동 compiler도 이 workload에서 유용한 모든 연산 묶음을 찾아내지는 못했다.
###### 원문이 지적하는 두 제한

- **고정된 fusion 경로:** 그래프 구조와 compiler pass 순서가 탐색 가능한 패턴을 제한한다.
- **외부 fused kernel:** attention 같은 연산이 내부를 볼 수 없는 경계가 되어 주변 연산과 통합하기 어렵다.

저자는 short-prefill의 연산 간 데이터 이동을 함께 조정할 기회가 남는다고 본다.
###### 놓칠 수 있는 묶음

<div class="sequence">
<div class="step">Q/K RMSNorm</div>
<div class="step">Q/K RoPE 적용</div>
<div class="step">Attention</div>
</div>

세 연산이 따로 실행되면 중간 Q/K가 global memory를 오간다. 이 연결부를 수동 설계 kernel로 묶는 것이 보고서의 접근이다.

<p class="mini">Torch Compile 일반의 영구적 한계보다 이 구현·workload의 관찰로 읽는다.</p>
자동 최적화가 남긴 병목을 profiling하고 필요한 연산 묶음만 직접 설계한다.
Sec.5.2 · Fixed Fusion Path · PDF p.16
외부 API의 최신 동작이나 모든 버전에 대한 보장을 말하지 않고 보고서 설명에 한정한다. Compiler의 한계를 측정하지 않은 조건까지 확대하지 않는다.

S079 FlashAttention과 주변 연산의 fusion
Attention 내부가 최적화되어도, 그 앞뒤 tensor 이동은 별도의 최적화 기회로 남는다.
###### 이미 묶여 있는 attention

원문은 FlashAttention 같은 외부 fused attention kernel을 예로 든다. 이때 compiler는 내부 구현을 보지 못하는 opaque 연산으로 다룬다고 설명한다.

Attention 자체를 빠르게 실행하는 것과, attention 전후 연산을 통합하는 것은 서로 다른 경계의 문제다.
###### 그 경계를 넘으면?

<div class="sequence">
<div class="step">Q/K 정규화 → RoPE 적용 → Attention</div>
</div>

이 사이 중간 결과의 global-memory 저장·재읽기를 줄이려면, 주변 연산과 attention의 데이터 흐름을 함께 설계해야 한다.

<p class="callout">특정 workload의 cross-operator fusion에 관한 주장이다. FlashAttention 자체가 느리다는 결론은 아니다.</p>
최적화된 한 연산이 있어도 연산 사이의 경계 비용은 남을 수 있다.
Sec.5.2 · Fixed Fusion Path · PDF p.16; Fig.10 · PDF p.16
FlashAttention 내부의 tiling이나 IO complexity 등 추가 주장은 이 장에서 다루지 않고 RLDX-1 보고서 설명에 한정한다. 최신 compiler나 FlashAttention API의 일반 동작을 설명하는 장이 아니다.

S080 Kernel fusion: 중간 메모리 왕복 줄이기
정규화·위치 적용·attention을 묶으면 중간 Q/K를 global memory에 반복 저장하지 않아도 된다.
###### Figure 10의 데이터 흐름

**(a) 별도 kernel:** RMSNorm 결과 저장 → 재읽기 → RoPE 결과 저장 → 재읽기 → attention.

**(b) fused kernel:** 필요한 입력을 읽고 중간 tensor를 on-chip에 유지하며 계산한 뒤 최종 출력을 저장한다.

핵심은 같은 수학 연산 사이의 불필요한 메모리 왕복을 줄이는 것이다.
<p class="mini">그림은 fusion 대상 block의 개념도다. 모델 전체의 모든 tensor를 한 번만 읽는다는 뜻은 아니다.</p>
Kernel fusion은 계산의 연결 순서와 중간 결과의 저장 위치를 함께 최적화한다.
Fig.10; Sec.5.2 · PDF pp.16–17
원문은 on-chip reuse와 compute ordering도 함께 설계한다고 설명한다. 입력 한 번·출력 한 번이라는 그림은 fusion 대상 block 기준이다. Cache·메모리 트래픽의 정확한 계측값을 새로 주장하지 않는다. RMSNorm·RoPE·attention 결합은 Table 7의 fused\_llm\_attention에 연결한다.

S081 실제 custom kernel 목록
Profiling으로 찾은 일부 연산 묶음만 수동 kernel로 바꾸고, 나머지는 Torch Compile에 둔다.
###### Attention 계열

- **fused\_vision\_attention:** Q/K RoPE + attention
- **fused\_llm\_attention:** Q/K RMSNorm + RoPE + attention
- **fused\_memory\_attention:** Q/K RoPE + attention

NVIDIA Nsight Compute로 비효율적인 operator group을 찾아 교체한다.
###### Residual·norm·MLP 계열

- **fused\_add2\_layernorm:** 두 항 덧셈 + LayerNorm
- **fused\_add2\_rmsnorm:** 두 항 덧셈 + RMSNorm
- **fused\_add3\_rmsnorm:** 세 항 덧셈 + RMSNorm
- **grouped\_swiglu / fused\_mlp\_swiglu:** SwiGLU 처리 묶음

<p class="mini">서로 다른 block의 kernel이며, 모든 attention에 RMSNorm을 추가한다고 읽지 않는다.</p>
전체를 다시 작성하기보다 실제 병목의 연산 경계를 선택적으로 바꾼다.
Sec.5.2 · PDF pp.16–17; App.F Table7 · PDF p.47
Table 7의 총 8개 kernel을 모두 반영했다. $h_{\mathrm{ds}}$가 더해지는 add3는 별도의 세 번째 입력으로만 설명하고 그 의미를 추가 확정하지 않는다. grouped\_swiglu는 $y_1=\operatorname{SwiGLU}(z_1)$, $y_2=\operatorname{SwiGLU}(z_2)$를 함께 처리한다. fused\_mlp\_swiglu의 표는 SwiGLU를 수동 kernel로 실행함을 나타낸다. 개별 kernel의 속도 배수는 이 표에 없다.
-->

---
layout: none
---

<!-- slide-id: P022 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P022"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>Simulation Experiments</h1><p class="slide-lead">각 benchmark에 적응한 전체 시스템은 높은 성과를 냈지만 복합 조작은 여전히 어렵다.</p></header><div class="seminar-body full"><div class="body-main"><table>
<thead>
<tr>
<th>평가 (%)</th>
<th>최강 baseline</th>
<th>RLDX-1</th>
</tr>
</thead>
<tbody>
<tr>
<td>LIBERO 평균</td>
<td>96.9</td>
<td>97.8</td>
</tr>
<tr>
<td>LIBERO-Plus</td>
<td>86.5</td>
<td>86.7</td>
</tr>
<tr>
<td>GR-1 Tabletop</td>
<td>48.0</td>
<td>58.7</td>
</tr>
<tr>
<td>RC365 전체 / 미지 복합</td>
<td>26.9 / 4.4</td>
<td>32.1 / 5.6</td>
</tr>
</tbody>
</table>
<p>Pre-trained 모델을 각 benchmark에 fine-tuning한다. Baseline은 π0-FAST·π0·π0.5·GR00T N1.5/N1.6이며 재현값과 논문·저장소·leaderboard 수치가 섞여 있다.</p>
<p><span class="label interpretation">해석</span> 전체 recipe의 성과다. 특정 모듈의 독립 효과나 작은 차이의 통계적 유의성을 이 표만으로 확정할 수 없다.</p>
</div></div><div class="takeaway">먼저 범용 조작을 평가했다. 다음은 실제 로봇의 지시 일반화와 기능별 과제로 이어진다.</div><footer class="seminar-footer"><span class="source">Sec.6–6.1 · Table 1 · PDF pp.17–19; App.G.1 · PDF pp.48–49</span><span class="slide-id">P022 · 017/25</span></footer></section>

<!--
연결 멘트: “실행 속도까지 준비한 모델이 무엇을 잘하는지 보겠습니다. 먼저 일반 조작을 보고 실제 로봇의 기능별 과제로 넘어갑니다.” 표의 최강 baseline은 열마다 다르다. LIBERO·Plus는 π0.5, GR-1과 RC365 미지 복합은 N1.5, RC365 전체는 N1.6이다. RC36532.1은18/16/16개 task 수로 가중한 평균이다. Baseline의 행동 생성 방식과 전체 수치·학습 조건은 S082–087 연결 해설에 보존한다. 서로 다른 초기화·recipe를 비교했으므로 구조 하나의 효과라고 말하지 않는다.

S082 평가의 목적과 범위
범용 조작, 기능별 과제, 구성 요소 분석은 서로 다른 질문에 답한다.
###### 세 갈래의 평가

- **범용성:** pre-trained 모델을 시뮬레이션·OpenArm 과제에 fine-tuning한다.
- **기능:** mid-trained ALLEX·Franka를 움직임·기억·접촉 과제에 적응시킨다.
- **분석:** VLM, 합성 규모, RL, 실행 최적화를 따로 살핀다.

서로 다른 출발 모델과 적응 조건을 하나의 공통 실험으로 읽지 않는다.

높은 종합 성능과 개별 설계의 인과적 기여는 구분한다.
Sec.6 · Fig.11 · PDF p.17
Figure 11(a)는 LIBERO/LIBERO-Plus와 SIMPLER, (b)는 RoboCasa Kitchen, GR-1 Tabletop, RoboCasa365를 보여준다. 이 논문의 평가는 하나의 zero-shot 범용 모델을 그대로 모든 환경에 투입한 결과가 아니다. 6.1/6.2는 pre-trained 모델의 downstream fine-tuning, 6.3/6.4는 mid-trained 모델의 task별 fine-tuning이다. 6.5에서도 각 실험의 데이터와 초기화가 달라 직접 수치 연결에 주의한다.

S083 Baseline의 행동 생성 방식
행동을 토큰으로 순차 생성하는 경로와 연속 chunk를 갱신하는 경로가 있다.
###### π0-FAST: 행동 토큰 생성

<div class="sequence">
<div class="step">PaliGemma 3B를 초기 VLM으로 사용</div>
<div class="step">DCT 기반으로 행동을 토큰화</div>
<div class="step">Autoregressive 방식으로 행동 토큰 생성</div>
</div>

여기서 출력 순서는 토큰 생성 과정의 순서다.
###### π0·π0.5: 연속 행동 학습

**π0:** PaliGemma 3B와 300M action expert가 shared self-attention으로 연결되며 flow matching을 사용한다.

**π0.5:** action model의 연속 행동 flow matching과 VLM의 이산 행동 next-token prediction을 함께 학습하는 Knowledge Insulation을 추가한다.

<p class="muted">보고서의 baseline 설명 범위이며, 현재 각 모델의 모든 버전을 설명하는 것은 아니다.</p>
Autoregressive 토큰 생성과 flow의 denoising 반복은 같은 반복이 아니다.
Sec.6 Baselines · PDF p.17
비교는 본 보고서가 선택한 checkpoint와 학습 recipe에 관한 것이다. π0.5를 단순히 π0-FAST와 같은 autoregressive-only 모델이라고 부르면 연속 action expert 경로를 놓친다. π0의 diffusion-based라는 표현과 flow matching 사용은 본문의 분류 그대로 인용하며, 별도의 diffusion 손실과 flow 손실을 순서대로 학습했다고 해석하지 않는다.

S084 GR00T baseline의 연결 방식
N1.5와 N1.6은 VLM 특징을 action model에 cross-attention으로 전달한다.
###### GR00T N1.5

Eagle 2.5 2B VLM의 중간 hidden states를 사용한다. Learnable adapter가 VLM과 action model을 잇고, action model은 cross-attention으로 이 특징을 참조한다.

###### GR00T N1.6

같은 cross-attention 설계를 따르며 시각 관측에서 나온 hidden states와 언어 지시에서 나온 hidden states를 번갈아 사용한다.
###### RLDX-1과 비교할 때

RLDX-1은 cognition·action·physics stream별 파라미터와 joint self-attention을 사용한다. 그러나 baseline 비교에는 구조뿐 아니라 VLM, 데이터, 사전 학습, 적응 방식도 함께 달라진다.

<div class="callout"><span class="label interpretation">해석 범위</span>
<p>전체 시스템의 성능 차이만으로 cross-attention보다 MSAT가 더 낫다는 독립 결론을 낼 수 없다.</p></div>
구조의 차이를 설명하는 것과 그 차이의 효과를 증명하는 것은 별개다.
Sec.6 Baselines · PDF p.17; Sec.2.2 · PDF p.8
GR00T N1.6의 visual/language alternation은 보고서의 서술에 근거한다. 상세 cross-attention schedule을 새로 가정하지 않는다. MSAT의 독립 기여를 주장하려면 같은 VLM·데이터·학습 예산으로 연결 방식만 교체한 통제 비교가 필요하다.

S085 시뮬레이션 평가 조건
Table 1은 각 benchmark에 fine-tuning한 시스템의 비교이며 수치 출처도 섞여 있다.
###### RLDX-1의 적응 조건

Vision encoder와 LLM 대부분을 고정하고 LLM의 마지막 4층은 학습한다. 기본은 AdamW, 60K step, batch 1024, 학습률 $10^{-4}$이며 benchmark별 예외가 있다.

LIBERO는 batch 256, Google-VM/VA는 20K step, RoboCasa365는 250K step이다. 후자는 **본문 batch 196 / Table 8 batch 192**가 불일치한다.
###### Baseline 출처와 실행 조건

일부 모델은 공식 구현으로 재현하고, 나머지는 논문·공식 저장소·leaderboard에서 가져온다. 모든 수치가 동일 실험실·동일 예산의 재측정은 아니다.

WidowX·RoboCasa Kitchen은 denoising 10회, 나머지는 4회다. 생성 행동 16개 중 실제 실행은 SIMPLER 2개, LIBERO·GR-1 8개, 나머지 16개다.

<p class="label question">Q12: 실제 batch 설정은 구현 확인 필요</p>
Full recipe 비교의 강점은 읽되, 공통 통제 실험이라고 과장하지 않는다.
Sec.6.1 · PDF p.18; App.G.1 · Table 8 · PDF pp.48–49; Q12
G.1 provenance: LIBERO는 GR00T N1.6만 동일 setup으로 재현, 다른 수치는 공식 repo. LIBERO-Plus는 π0/FAST를 원 논문에서 취하고 나머지는 LIBERO checkpoint로 10,300 perturbation tasks 평가. SIMPLER는 인용 연구들의 수치. RoboCasa Kitchen은 GR00T N1.6 공식 repo와 인용 연구. GR-1은 GR00T 공식 repo, π0 계열 재현. RoboCasa365는 FAST 재현, 나머지 leaderboard. Benchmark별 최적 hyperparameter를 보고하며 state dropout 등도 달라진다. 평균의 신뢰구간이나 전체 baseline seed provenance를 충분히 정리한 표는 이 범위에서 확인하지 못했다.

S086 Table 1(a): 기본 조작과 강건성
각 열의 최강 baseline과 비교해도 RLDX-1이 높지만, 차이의 크기는 다르다.
| 평가 지표 (%) | 최강 baseline | RLDX-1 | 차이 (%p) |
| --- | --- | --- | --- |
| LIBERO Short | π0.5 · 98.0 | 98.6 | +0.6 |
| LIBERO Long | N1.6 · 94.4 | 95.3 | +0.9 |
| LIBERO 평균 | π0.5 · 96.9 | 97.8 | +0.9 |
| LIBERO-Plus | π0.5 · 86.5 | 86.7 | +0.2 |
| Google-VM | N1.6 · 76.1 | 81.5 | +5.4 |
| Google-VA | π0.5 · 68.4 | 77.4 | +9.0 |
| WidowX | N1.5 · 62.0 | 71.9 | +9.9 |

표의 최고값이라는 관측과 통계적으로 확실한 우위라는 판단은 다르다.
Table 1(a) · PDF p.18
원문 전 값(열: Short,Long,Avg,Plus,GoogleVM,GoogleVA,WidowX). FAST:93.9/60.2/85.5/64.2/61.9/59.0/48.3; π0:97.1/85.2/94.1/54.6/58.8/54.8/27.1; π0.5:98.0/92.0/96.9/86.5/72.7/68.4/46.9; N1.5:90.0/76.0/86.5/66.3/52.4/43.7/62.0; N1.6:97.4/94.4/96.7/72.6/76.1/57.1/57.1; RLDX:98.6/95.3/97.8/86.7/81.5/77.4/71.9. Short는 spatial/object/goal suite 평균이다. 화면은 각 열의 최고 baseline을 계산해 재구성했다. LIBERO-Plus +0.2%p 등 작은 차이에는 반복 seed·불확실성이 특히 중요하다. 보고된 Table 1은 오차막대를 제공하지 않는다.

S087 Table 1(b): 어려운 조작의 상대·절대 성과
복합 과제에서도 상대 우위가 있지만 unseen composite 성공은 5.6%다.
| 평가 지표 (%) | 최강 baseline | RLDX-1 | 차이 (%p) |
| --- | --- | --- | --- |
| RoboCasa Kitchen | N1.6 · 66.2 | 70.6 | +4.4 |
| GR-1 Tabletop | N1.5 · 48.0 | 58.7 | +10.7 |
| RC365 Atomic-Seen | N1.6 · 61.1 | 67.3 | +6.2 |
| RC365 Composite-Seen | N1.6 · 12.6 | 19.0 | +6.4 |
| RC365 Composite-Unseen | N1.5 · 4.4 | 5.6 | +1.2 |
| RC365 전체 평균 | N1.6 · 26.9 | 32.1 | +5.2 |

복합 행동으로 갈수록 남은 실패가 크다. 최고 baseline도 열마다 다르다.
Table 1(b) · Sec.6.1 · PDF pp.18–19; Table 15 · PDF p.55
원문 전 값(열:Kitchen,GR1,Atomic,CompS,CompU,Avg). FAST:63.6/미보고/51.7/8.0/1.8/21.7; π0:62.5/13.6/34.6/6.1/1.1/14.8; π0.5:62.1/15.4/39.6/7.1/1.2/16.9; N1.5:65.7/48.0/43.0/9.6/4.4/20.0; N1.6:66.2/47.6/61.1/12.6/2.6/26.9; RLDX:70.6/58.7/67.3/19.0/5.6/32.1. 원문은 N1.6 대비 5.6 vs 2.6을 강조하지만 Comp-U 열의 최강 baseline은 N1.5 4.4다. RC365 전체 32.1은 Atomic 18개, Composite seen16개/unseen16개 작업수로 가중한 평균과 부합하며 세 split 단순 평균이 아니다. RLDX가 pre-training에 simulation data를 쓰지 않았다는 저자 설명도 downstream simulation fine-tuning을 하지 않았다는 뜻은 아니다.
-->

---
layout: none
---

<!-- slide-id: P023 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P023"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>OpenArm</h1><p class="slide-lead">같은 물체 옮기기도 위치 지시·새 개체·새 배치·instance 선택으로 나눠 평가한다.</p></header><div class="seminar-body figure"><figure class="paper-figure"><img src="/figures/fig-14.png" alt="Figure 14 · OpenArm의 여섯 평가 설정" loading="eager"><figcaption>Figure 14 · OpenArm의 여섯 평가 설정</figcaption></figure><div class="body-main"><p>기본 물체 옮기기에서 지정 칸에 놓기, 새 개체·새 배치, 같은 종류 중 언어가 지정한 instance 선택까지 확장한다.</p>
<p>RLDX-1은 선반 68.8%·식기대 70.8%, 새 개체·새 작업 각 54.2%, grounding 87.5%다. 보통 24회, 선반은 48회다.</p>
<p>Grounding은 올바른 물체 잡기, 나머지는 지정 위치에 놓기가 성공이다. <span class="label authors">저자 해석</span> 과적합·grounding 실패라는 설명은 원인별 통제 결과가 아니다.</p>
</div></div><div class="takeaway">OpenArm은 지시·대상 변화의 일반화를 봤다. 다음은 움직임·기억·접촉 기능이 필요한 과제다.</div><footer class="seminar-footer"><span class="source">Sec.6.2 · Figs.13–14 · PDF pp.19–20; App.G.2 · PDF p.50</span><span class="slide-id">P023 · 018/25</span></footer></section>

<!--
연결 멘트: “시뮬레이션에서 얻은 우위가 실제 양팔 로봇의 새로운 지시와 물체에도 이어지는지 봅니다.” Basic50.0, Shelf68.8, Dish70.8, Unseen Object54.2, Unseen Task54.2, Grounding87.5다. π0.5는 Shelf54.2, Dish58.3, Grounding83.3이므로 과제별 격차가 다르다. 학습348개 시연,30K steps/batch64다. Unseen은 downstream 시연 구성에 관한 표현이며 전체 사전 학습에서 본 적 없는 개념이라는 뜻이 아니다. 세부 배치와 실패 원인 해석은 S088–089에 보존한다.

S088 OpenArm 과제 구성
같은 pick-and-place라도 지시·새 개체·새 배치·instance 선택은 다르게 시험한다.
###### 6개 평가 설정

- **Basic:** 세 물체 중 인형을 상자로 옮긴다.
- **Directional:** 선반 네 칸·식기대 세 칸 중 지시한 곳에 둔다.
- **Unseen Object:** 새 병·컵 instance를 사용한다.
- **Unseen Task:** 학습의 인형 대신 병·컵과 새 receptacle을 사용한다.
- **Grounding:** 같은 종류 3개 중 언어가 지정한 instance를 잡는다.

새 물체, 새 task configuration, 세밀한 언어 grounding을 구분한다.
Sec.6.2 · Figs.13–14 · PDF pp.19–20; App.G.2 · PDF p.50
Figure 13의 좌상단 Basic, 상단 가운데 Shelf, 상단 오른쪽 Dish Rack, 하단 Unseen Object/Unseen Task/Grounding을 순서대로 짚는다. Basic에서도 물체와 목표 위치가 반대편이면 양손 협응이 필요하다. 학습은 Bottle-to-Shelf96, Snack-to-Shelf96, Cup-to-DishRack108, Doll-to-Box48로 총348 demonstrations. Unseen은 이 downstream demonstration 설정에 대한 표현이며 인터넷 또는 전체 사전 학습에서 한 번도 본 적 없는 개념이라는 뜻이 아니다.

S089 OpenArm 평가와 Figure 14
방향 지시와 grounding에서 차이가 커지지만 baseline의 실패 원인은 저자 해석이다.
###### 평가와 관측

일반 과제는 올바른 물체를 잡아 지정 위치에 두면 성공이다. Grounding은 올바른 instance를 잡으면 성공이다. 기본 24회, Shelf는 두 범주 합계 48회다.

RLDX-1은 Basic 50.0%, Shelf 68.8%, Dish Rack 70.8%, Unseen Object·Task 각 54.2%, Grounding 87.5%다.

<span class="label authors">저자 해석</span> π0.5의 미지 과제 정체를 약한 VLM·full VLM fine-tuning에 따른 과적합으로 설명하나, 원인만 분리한 실험은 아니다.

과제별 성공 기준·시행 수와 전체 시스템 비교의 한계를 함께 읽는다.
Fig.14 · Sec.6.2 · PDF p.20; App.G.2 · PDF p.50
Figure14 순서 Basic/Shelf/Dish/UnseenObject/UnseenTask/Grounding: π0.5 41.7/54.2/58.3/37.5/45.8/83.3; N1.6 37.5/47.9/50.0/45.8/50.0/33.3; RLDX50.0/68.8/70.8/54.2/54.2/87.5. Shelf와 Dish는 π0.5 대비 각+14.6,+12.5%p(표시값 차이). Grounding의 π0.5는83.3으로 이미 높고, RLDX 우위는+4.2%p다. N1.6의33.3을 저자는 random-equivalent로 설명한다. 모든 baseline과 RLDX는30K step,batch64,공식 구현 기준; 같은 batch·step은 전체 사전학습 데이터와 모델 크기까지 통제했다는 뜻은 아니다.
-->

---
layout: none
---

<!-- slide-id: P024 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P024"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>ALLEX</h1><p class="slide-lead">컨베이어·숨긴 상자·카드·따르기로 서로 다른 기능을 시험한다.</p></header><div class="seminar-body figure"><figure class="paper-figure"><img src="/figures/fig-16.png" alt="Figure 16 · 성공률과 progress score가 함께 표시된 결과" loading="eager"><figcaption>Figure 16 · 성공률과 progress score가 함께 표시된 결과</figcaption></figure><div class="body-main"><p><strong>움직임:</strong> 학습한 양 끝 속도 사이의 새 속도에 맞춰 상자를 잡는다. <strong>기억:</strong> 물체를 넣어 둔 상자를 과거 관찰로 고른다.</p>
<p><strong>물리 피드백:</strong> 카드를 밀고 잡아 건네며, 플라스틱 공을 따를 때 컵 무게 변화에 맞춰 멈춘다. 실제 액체 평가가 아니다.</p>
<p>컨베이어 87.5%·상자 91.7%는 성공률이다. 카드 97.2·따르기 70.8은 부분 완료를 포함한 진행 점수다.</p>
<p class="mini"><strong>평균 86.8은 혼합 지표</strong>이며, 네 과제의 완전 성공률 평균이 아니다.</p></div></div><div class="takeaway">같은 0–100 눈금이라도 성공률과 진행 점수의 의미는 다르다.</div><footer class="seminar-footer"><span class="source">Sec.6.3 · Figs.15–16 · PDF pp.21–22; App.G.3 · PDF p.51</span><span class="slide-id">P024 · 019/25</span></footer></section>

<!--
연결 멘트: “실제 로봇의 성과를 읽기 전에 각 막대가 무엇을 측정하는지 나눠야 합니다.” 각 과제24회다. Conveyor는 학습S1/S4, 평가S2/S3를 보간하며 seen100/unseen75로 총87.5다. Card는0.33/0.66/1, Pour는0.25/0.5/0.75/1의 progress score다. 평균86.8은 서로 다른 지표의 산술 평균이다. ALLEX는 head stereo와48관절의 전류 기반 torque를 사용한다. Card 평가는 안전을 위해75cm 책상에서만 시행한다. 각 과제·센서·점수 세부는 S090–092로 연결한다.

S090 ALLEX의 움직임·기억 과제
움직이는 대상의 미래 위치와 현재 화면에 없는 과거 사건을 각각 시험한다.
###### Conveyor Pick-and-Place

움직이는 상자를 잡아 선반에 둔다. 학습 속도는 S1·S4, 평가에는 그 사이의 미지 속도 S2·S3를 추가한다.

4속도×6회로 총 24회다. **속도 보간** 평가이며 학습 범위 밖 extrapolation은 아니다.

###### Object-in-Box Selection

사람이 물체를 넣고 되돌려 둔 세 상자 중 하나를 선택한다. 숨기기 전 관찰을 기억해야 하며, 위치마다 8회로 총 24회다.

짧은 영상의 동역학과 더 오래 유지할 사건 기억은 다른 요구다.
Sec.6.3 · Fig.15 · PDF pp.21–22; App.G.3 · PDF p.51
Conveyor40 demonstrations(S1/S4), Box90 demonstrations(상자마다30). 기능 평가에 직접 관련 없는 공간 일반화·언어 따라가기 요소는 학습에서 제외했다고 G.3가 설명한다. ALLEX는 head-mounted stereo만 사용하며 wrist/side camera가 없다. 그만큼 이 벤치마크의 성과를 모든 종류의 언어·배치 변화 강건성으로 확대할 수 없다. Figure15 상단 두 task를 중심으로 짚는다.

S091 ALLEX의 물리 센싱 과제
카드 접촉 깊이와 컵의 무게 변화는 시각만으로 구별하기 어렵게 설계했다.
###### Card Slide-and-Pick

카드를 테이블 끝으로 밀고, 잡고, 건넨다. 책상 높이 80·75cm에서 학습하고 평가 24회는 안전을 위해 낮은 높이에서 한다.

###### Pot-to-Cup Pouring

주전자와 컵을 들고 **플라스틱 공**을 따른다. 목표 무게가 되면 주전자를 돌려놓고 컵을 내민다. 실제 액체 평가가 아니다.

물리 입력은 48개 관절의 모터 전류로 추정한 torque다. 접촉력 조절과 무게 변화에 따른 종료 판단을 평가한다.

물체를 옮겼는지뿐 아니라 접촉·하중에 맞춰 진행 단계를 바꾸는지 본다.
Sec.6.3 · Fig.15 · PDF pp.21–22; App.G.3 · PDF p.51
Card72 demonstrations,Pour62 demonstrations. ALLEX torque는 모터 전류에서 추정한48DoF 값이며 Franka의 직접 관절 torque 및 AnySkin 촉각과 구분한다. Pour의 점수는 grasp both, pouring, return pot, bring cup forward의4단계다. 저자는 시각 변화가 작아 하중을 알기 어렵다고 설명한다. 이 과제가 torque의 필요성을 유도하도록 설계됐다는 점과 동일 모델에서 torque만 제거한 엄밀한 인과 ablation 유무는 별개다.

S092 Figure 16과 부분 점수
87.5·91.7은 성공률, 97.2·70.8은 진행 점수이며 평균 86.8은 혼합 평균이다.
###### 서로 다른 지표

- **Conveyor 87.5%:** pick-and-place 성공률.
- **Box 91.7%:** 올바른 상자 선택 성공률.
- **Card 97.2:** slide/pick/handover에 0.33/0.66/1점.
- **Pour 70.8:** 네 진행 단계에 0.25/0.5/0.75/1점.

막대의 축·caption은 success rate라고 쓰지만, 뒤의 두 과제는 부분 점수를 포함한다. **86.8% 완전 성공**으로 소개하면 안 된다.

같은 0–100 눈금이어도 측정하는 사건이 다를 수 있다.
Fig.16 · Evaluation Protocol · PDF p.22; App.G.3 · PDF p.51
Figure16 순서 Conveyor/Box/Card/Pour/Avg: π0.5 29.2/33.3/55.3/38.5/39.1; N1.6 50.0/29.2/62.3/37.5/44.8; RLDX87.5/91.7/97.2/70.8/86.8. RLDX average=$\frac{87.5+91.7+97.2+70.8}{4}=86.8$. Card와Pour 수치는 정규화한 progress score×100이다. 본문은 두 baseline이 Pour 전체 단계를 완료한 trial이 없다고 설명하지만 부분점수는38.5,37.5다. 완전 성공률을 직접 복원할 수는 없다. Conveyor에서는 seen100%,unseen75%로 평균87.5. 평균이 동일 단위처럼 보이는 축 표기 자체도 발표에서 보완한다.
-->

---
layout: none
---

<!-- slide-id: P025 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P025"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>Franka</h1><p class="slide-lead">회전·Pong·컵 기억·접촉 과제로 확장했지만 정밀 조작의 성공률은 아직 낮다.</p></header><div class="seminar-body figure"><figure class="paper-figure"><img src="/figures/fig-18.png" alt="Figure 18 · Franka 기능별 성공률과 남은 어려움" loading="eager"><figcaption>Figure 18 · Franka 기능별 성공률과 남은 어려움</figcaption></figure><div class="body-main"><p>회전·Pong은 움직임, Cup·Shell은 기억, Plug·Egg는 접촉을 시험한다. Spin 97.9%·Shell 91.7%에 비해 Cup 45.8%·Plug 33.3%에는 많은 실패가 남는다.</p>
<p>Franka는 관절 torque와 AnySkin 촉각을 사용한다. ALLEX와 Franka의 기능 평가는 <strong>각 과제에 관련된 모듈만 활성화</strong>한다.</p>
<p class="mini">Spin96·Pong54 interactions, 나머지는24 trials다. Egg의 비율·시행 수 대응은 마지막 명세 검토에서 다룬다.</p></div></div><div class="takeaway">전체 시스템의 비교 성과를 봤다. 다음은 구성 요소를 바꾼 비교가 어느 기여를 뒷받침하는지 확인한다.</div><footer class="seminar-footer"><span class="source">Sec.6.4 · Figs.17–18 · PDF pp.23–24; App.G.3–G.4 · PDF pp.51–52; Q13</span><span class="slide-id">P025 · 020/25</span></footer></section>

<!--
연결 멘트: “같은 기능을 다른 로봇에서도 평가했습니다. 다만 통합 구조를 설계한 것과 세 기능의 동시 기여를 검증한 것은 구별하겠습니다.” Spin97.9/Pong81.5/Cup45.8/Shell91.7/Plug33.3/Egg61.1, 평균68.5다. 센서는7차원 torque와15차원 AnySkin이다. Spin96 interactions, Pong54 interactions, 나머지24 trials다. ALLEX·Franka 모두 task-relevant module만 활성화한다. Egg61.1의 분모 대응은 불명확해 성공 횟수를 역산하지 않는다. 여섯 과제의 정의·평가 조건은 S093–096에 보존한다.

S093 Franka의 움직임 과제
방향 인식과 미래 도착 영역 예측을 분리해 움직임 이해를 평가한다.
###### Spin Tracking

화면 속 물체가 시계·반시계 방향 중 어느 쪽으로 도는지 보고 해당 위치를 가리킨다. 시작 위치를 바꿔 정지 위치 단서만으로 풀기 어렵게 한다.

4개 초기 위치, 총 96 interactions를 평가한다.

###### Pong Game

공이 오른쪽 벽에 닿기 전에 빨강·초록·파랑 중 도착 영역에 해당하는 컵을 가리킨다. 반사로 궤적이 달라지므로 짧은 동역학 예측이 필요하다.

학습에서 보지 않은 54 interactions를 평가한다.

회전 방향을 읽는 것과 반사 후 도착점을 미리 읽는 것은 난도가 다르다.
Sec.6.4 · Fig.17 · PDF p.23; App.G.4 · PDF p.52
Spin64 demonstrations,각3 interaction sequences;Pong50 demonstrations,각5 sequences. 96과54는 interaction 평가수이며 다른 과제의24 trial과 다르다. Pong의 unseen은 평가 interaction에 대한 표현이다. Figure17에서 첫 행 Spin과 둘째 행 Pong을 짚고 컵 색/벽 영역의 대응을 설명한다. 이 결과는 로봇이 일반적인 물리 시뮬레이터를 학습했다는 증거가 아니라 설계된 움직임 과제 성능이다.

S094 Franka의 기억·접촉 과제
과거 역할을 기억하는 과제와 가려진 접촉을 감지하는 과제가 이어진다.
###### 기억이 필요한 과제

**Cup Swapping:** 머신 위 컵을 빈 coaster로 옮긴 뒤 원래 다른 coaster에 있던 컵을 머신으로 옮긴다. 겹치는 궤적만 보고는 컵의 과거 역할을 잊기 쉽다.

**Shell Game:** 큐브를 숨긴 컵을 기억해 선택한다.

###### 물리 신호가 필요한 과제

**Plug:** 카메라에서 가려진 소켓에 삽입한다. **Egg:** 달걀을 깨뜨리지 않고 집어 그릇으로 옮긴다. Franka는 7차원 torque와 15차원 AnySkin 촉각을 쓴다.

현재 화면의 모호함은 과거 사건과 접촉 신호로 서로 다르게 보완한다.
Sec.6.4 · Fig.17 · PDF p.23; App.G.4 · PDF p.52
Cup60 demonstrations(2 initial positions),Shell60(각cup20),Plug100,Egg60. Cup/Shell/Plug/Egg는G.4 기준 각24 trials. AnySkin15차원은왼쪽 gripper의5 sensing units×3축 force다. 오른쪽도 같은 입력을 쓴다고 덧붙이지 않는다. Cup의 완전 성공, Shell의 선택 성공, Plug의 삽입 성공, Egg의 비파손 pick-and-place를 각각 사용한다.

S095 Figure 18의 개선과 한계
모든 과제의 보고값이 높아졌지만 Cup45.8·Plug33.3에는 많은 실패가 남아 있다.
###### RLDX-1 보고 성공률

Spin97.9%, Pong81.5%, Cup45.8%, Shell91.7%, Plug33.3%, Egg61.1%; 평균 68.5%다.

Spin96·Pong54 interactions, 나머지는 각 24 trials다. Cup·Plug에는 많은 실패가 남는다.

<div class="callout"><span class="label question">Q13 · 집계 불명확</span><br>이진 24회면 1회≈4.17%p다. Egg61.1%는 바로 대응하지 않으며 반복 평균·추가 시행 여부는 미확인이다.</div>

성공률의 분모와 집계 방식을 확인할 수 없는 수치는 임의로 복원하지 않는다.
Fig.18 · Sec.6.4 · PDF p.24; App.G.4 · PDF p.52; Q13
Figure18 π0.5:32.3/37.0/25.0/45.8/20.8/45.8/34.4; N1.6:26.0/42.6/12.5/54.2/16.7/37.5/31.6; RLDX:97.9/81.5/45.8/91.7/33.3/61.1/68.5. 평균68.5는 표시된6 task 평균과 부합한다. Egg의61.1을$\frac{15}{24}=62.5$로 고치거나$\frac{11}{18}$이라고 역산해 사실로 쓰지 않는다. 보고 수치를 보존하고G.4의24trials와 직접 대응이 불분명하다고 표시한다. 원문은 physical input 없는 variant의 정성 행동도 언급하지만 모든 모듈을 일대일 제거한 정량표와는 다르다.

S096 기능별 평가의 해석 범위
ALLEX·Franka에서는 과제에 관련된 모듈만 켜고 나머지는 끈다.
###### 실제로 비교한 구성

G.3·G.4는 각 과제의 목표 기능에 해당하는 module만 fine-tuning·평가 때 활성화하고 나머지는 비활성화한다고 명시한다.

<div class="sequence">
<div class="step">움직임 과제 → 관련 motion module</div>
<div class="step">과거 사건 과제 → 관련 memory module</div>
<div class="step">접촉·하중 과제 → 관련 physical sensing module</div>
</div>
###### 말할 수 있는 것

같은 architecture 계열을 서로 다른 기능 과제와 두 embodiment에 적용한 결과는 기능 확장의 실용적 근거다.

###### 아직 분리되지 않은 것

세 기능을 동시에 켜서 복합 상황을 푼 효과, 같은 policy에서 한 입력·손실만 제거한 독립 기여는 이 baseline 비교만으로 확정할 수 없다.

<p class="label interpretation">설계상 통합 가능성과 동시 사용의 인과 검증을 구별</p>
여러 기능을 지원한다는 결과가 세 기능의 동시 시너지를 증명하지는 않는다.
App.G.3–G.4 · PDF pp.51–52; Sec.6.3–6.4 · PDF pp.21–24
모듈별 활성화는 task relevance를 기준으로 하는 논문 조건이다. 논문의 unified architecture 주장을 부정하는 것이 아니라 실험이 지지하는 범위를 구체화한다. 적응 데이터·VLM·pre/mid-training·추론 strategy까지 전체 시스템이 baseline과 다르므로 성공률 차이를 하나의 모듈에 전부 귀속하지 않는다. ALLEX는 real-time chunking default를 사용한다. 기능별 input과 future-signal auxiliary loss의 효과도 별도 통제가 필요하다.
-->

---
layout: none
---

<!-- slide-id: P026 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P026"><header class="seminar-header"><div class="chapter-label">Ablation and Analysis</div><h1>Ablation</h1><p class="slide-lead">바꾼 요소와 고정 조건을 확인하면 관측된 효과와 저자의 원인 설명을 나눌 수 있다.</p></header><div class="seminar-body full"><div class="body-main"><table>
<thead>
<tr>
<th>분석</th>
<th>보고 성공률 (%)</th>
<th>읽을 범위</th>
</tr>
</thead>
<tbody>
<tr>
<td>VLM 추출 층 8 / 18 / 28</td>
<td>51.1 / 60.9 / 56.3</td>
<td>세 후보 중18층 우세</td>
</tr>
<tr>
<td>Robot VQA 적응</td>
<td>57.5 → 60.9</td>
<td>+3.4%p</td>
</tr>
<tr>
<td>합성 pool 0 → 100%</td>
<td>41.0 → 50.1</td>
<td>+9.1%p</td>
</tr>
</tbody>
</table>
<p>층·VQA는 Kitchen의 별도 base 설정이다. 합성은 GR-1의 실제 데이터를 고정하고 pool 25·50·100%를 비교하며, 합성이 있는 조건의 실제:합성 sampling은 모두 1:1이다.</p>
<p><span class="label interpretation">한계</span> Figure19는 마지막 prompt token의 patch attention 예시다. 인과 증명이 아니며 task/scene 증강·필터 각각의 효과도 이 비교에서 분리되지 않는다.</p>
</div></div><div class="takeaway">관측한 비교를 넘어 메커니즘과 개별 단계의 기여를 자동으로 확정하지 않는다.</div><footer class="seminar-footer"><span class="source">Sec.6.5 · Tables 2–3 · Fig.19 · PDF pp.24–25</span><span class="slide-id">P026 · 021/25</span></footer></section>

<!--
연결 멘트: “결과가 좋았다는 관측에서 한 걸음 더 나아가 무엇을 바꿨을 때 좋아졌는지 보겠습니다. 이 세 비교는 누적 개선표가 아닙니다.” VLM 분석은 대규모 로봇 policy pre-training을 생략한 base setup이며 Qwen 전체 무작위 초기화라는 뜻이 아니다. 합성 pool0/25/50/100%는41.0/45.6/46.6/50.1이다. GR-1만 사용하고 batch1024/60K pre-training, 같은 downstream 적응을 적용한다. 합성이 있는 조건은 sampling1:1로 고정한다. Figure19는64개 cognition token 전체나 MSAT attention이 아니라 마지막 prompt token→patch의 정성 예다. 통제 기준·layer 선택·filter 한계는 S097–102에 보존한다.

S097 Ablation을 읽는 기준
바꾼 요소·고정 조건·지표·남은 대안 설명을 함께 기록한다.
###### 비교를 읽는 네 질문

<div class="sequence">
<div class="step"><strong>무엇을 바꿨나?</strong> feature layer, VQA 학습, 합성 pool, RL round, 실행 stack.</div>
<div class="step"><strong>무엇을 고정했나?</strong> task, 모델 출발점, 데이터, 학습량, 하드웨어.</div>
<div class="step"><strong>무엇을 측정했나?</strong> 성공률, 부분점수, frames, attempts, p50 latency.</div>
<div class="step"><strong>무엇이 함께 변했나?</strong> 추가 데이터·노출량·temperature·후보 수 등.</div>
</div>
###### 같은 60.9라도 맥락이 있다

Table2의 60.9는 Kitchen의 base-architecture 분석값이다. Table1의 full recipe70.6과 조건이 달라 하나의 누적 개선표로 연결할 수 없다.

###### 효과와 메커니즘

“수치가 올랐다”는 관측과 “이 표현 때문에 올랐다”는 설명은 근거가 다르다. 저자의 설명은 별도로 표시한다.
한 수치보다 비교가 성립하는 조건이 먼저다.
Sec.6.5 · Tables 2–4 · Figs.19–21 · PDF pp.24–26
이 슬라이드는 원문 실험을 읽기 위한 우리의 검토 기준이다. 저자가 이 네 단계 checklist를 제안했다는 뜻은 아니다. VLM ablation은 large-scale policy pre-training을 생략한 base setup, synthetic는GR1-only controlled pre-training, RL은ALLEX single task, latency는desktop固定 setup이다. 서로 다른 분석값을 누적해 전체 기여도를 산출하지 않는다.

S098 Table 2(a): 어느 층의 특징을 쓸까?
세 후보에서는 18층이 가장 높다. 모든 층·task의 보편 최적값을 찾은 결과는 아니다.
###### RoboCasa Kitchen 성공률

| VLM 추출 층 | 성공률 (%) | 18층 대비 |
| --- | --- | --- |
| 8 | 51.1 | −9.8%p |
| 18 | 60.9 | 기준 |
| 28 | 56.3 | −4.6%p |

같은 base architecture에서 feature 추출 위치를 바꾼 분석이다. 전체 recipe의 Table1 결과와 직접 이어 붙이지 않는다.
###### 저자의 메커니즘 설명

<span class="label authors">저자 해석</span> 초기 층은 의미 정보가 부족하고, 후기 층은 세밀한 시각 정렬이 약해질 수 있어 중간층이 균형을 제공한다고 설명한다.

###### 설명이 남긴 범위

세 층의 결과는 이 해석과 양립하지만 의미·시각 정보를 각각 측정해 원인을 분해한 실험은 아니다. 선택하지 않은 다른 층이나 embodiment까지 18층 우위를 일반화하지 않는다.
층 선택 효과는 관측됐고, 의미·시각 균형은 그 결과에 대한 설명이다.
Table 2(a) · Sec.6.5 · PDF pp.24–25; Q4
본문의 “each variant is trained from scratch without pre-training”은 이 분석에서 대규모 로봇 policy pre-training을 생략한 base setup으로 읽는다. 이미 사전 학습된 Qwen VLM의 모든 가중치를 무작위 초기화했다는 뜻으로 확대하지 않는다. Layer8/18/28의51.1/60.9/56.3과18층 대비9.8/4.6%p 차이를 대조했다. 세 후보·한 benchmark의 관측과 모든 층·task에 관한 최적성 주장을 구분한다.

S099 Table 2(b): 로봇 VQA 적응의 효과
같은 분석 설정에서 로봇 VQA 적응 모델은 57.5→60.9로 3.4%p 높다.
###### 교체한 VLM

| VLM | 성공률 (%) |
| --- | --- |
| Qwen3-VL 8B | 57.5 |
| Robot-VQA 적응 RLDX-1-VLM | 60.9 |

$$
60.9-57.5=+3.4\,\text{\%p}
$$

비교 지표는 RoboCasa Kitchen downstream 성공률이다. VQA 정답률이 3.4%p 오른 표가 아니다.
###### 어떤 조건의 비교인가?

Base architecture를 사용하고 대규모 policy pre-training을 생략한 분석이다. 행동 생성에는 18층 특징을 사용한다.

<span class="label authors">저자 해석</span> 로봇 VQA supervision이 VLM의 특징을 행동에 더 관련되도록 조정했다고 설명한다.

이 결과만으로 데이터 유형별 기여·VQA 질문별 기여 또는 full recipe에서 동일한 3.4%p가 더해진다고 확정할 수 없다.
보고된 이득은 이 통제 설정의 downstream 조작 성능에 관한 것이다.
Table 2(b) · Sec.6.5 · PDF pp.24–25; Q4
57.5→60.9는3.4 percentage points다. 상대 개선률은 약5.9%지만 혼동을 줄이기 위해 화면에서는%p만 사용한다. Table1의70.6과 비교해 VQA의 전체 기여를 계산하지 않는다. VLM의 로봇 VQA 적응 여부와 downstream action model 학습을 구별하며 foundation VLM의 사전 학습을 생략했다고 주장하지 않는다.

S100 Figure 19의 attention은 무엇을 보여주나?
마지막 prompt token→image patch의 정성 예이며 cognition token 전체를 직접 본 그림은 아니다.
###### 관측된 그림

같은 장면·지시에서 VQA 적응 전후의 self-attention을 비교한다. 저자는 적응 뒤 로봇 몸체와 대상 물체에 더 집중된다고 설명한다.

###### 보여주지 않는 것

64개 cognition token·memory·MSAT의 전체 흐름을 그린 것이 아니다. 높은 patch attention이 곧 행동의 원인이라는 뜻도 아니다.

<span class="label interpretation">해석</span> 정량 결과를 보조하는 예시다. 다른 장면으로의 일반성은 별도 확인이 필요하다.

Attention 그림을 행동 메커니즘의 인과 증명으로 바꾸지 않는다.
Fig.19 · Sec.6.5 · PDF p.25
Figure19 caption은 “self-attention scores from the last prompt token to the image patch tokens”라고 명시한다. 위 행은 원본, 가운데 Qwen3-VL8B, 아래 RLDX-1-VLM이다. 저자는 로봇·대상 물체 집중을 설명하지만 attention intervention이나 masking으로 행동 결과의 원인을 독립 검증한 그림은 아니다. 어떤 token에서 어디로 향하는 attention인지 먼저 설명한다.

S101 Table 3: pool 크기와 sampling은 다르다
25·50·100%는 쓸 수 있는 합성 데이터 pool의 크기이며, 세 조건 모두 실제:합성은 1:1이다.
###### 바꾼 것: 합성 pool 크기

| 조건 | 실제 데이터 | 합성 pool | Sampling |
| --- | --- | --- | --- |
| 실제만 | 고정 | 0% | 실제만 |
| 작은 pool | 고정 | 25% | 실제:합성 1:1 |
| 중간 pool | 고정 | 50% | 실제:합성 1:1 |
| 전체 pool | 고정 | 100% | 실제:합성 1:1 |
###### 고정한 비교 조건

Embodiment를 GR-1에 한정하고 실제 ActionNet 데이터는 고정한다. Batch1024, pre-training60K gradient steps 후 같은 downstream fine-tuning을 사용한다.

GR-1 Tabletop24개 task에 각각 1,000 demonstrations로 적응하고 task당 50회 성공률을 평균한다.

<div class="callout">
<p><strong>100% = 합성만 학습</strong>이 아니다. 유한한 합성 pool 전체를 사용하되 sampling 비중은 50%다.</p></div>
Pool은 얼마나 다양한 예를 갖는지, sampling은 batch에서 얼마나 자주 고르는지다.
Table 3 · Sec.6.5 · PDF p.25; Q2
실제만 조건에는 합성 sampling1:1을 적용할 수 없다. 합성이 있는25/50/100% 조건에서 real-to-synthetic sampling1:1을 고정한다. 합성 sampling 비중을25/50/100으로 바꾼 실험이 아니며 전체 공개·자체 데이터 recipe와도 다르다. Pool의 절대 episode 수는 표에 주어지지 않으므로 임의 계산하지 않는다. Batch1024,60K steps, GR-1만 사용하는 controlled pre-training이며 downstream은 task당1000 demonstrations와50 trials다.

S102 Table 3: 합성 규모에 따른 이득
고정된 실제 데이터에 합성 pool을 늘릴 때 41.0→50.1로 9.1%p 높아진다.
###### GR-1 Tabletop 평균 성공률

| 합성 pool | 성공률 (%) | 실제만 대비 |
| --- | --- | --- |
| 0% | 41.0 | 기준 |
| 25% | 45.6 | +4.6%p |
| 50% | 46.6 | +5.6%p |
| 100% | 50.1 | +9.1%p |

세 합성 조건에서 sampling1:1을 유지했으므로, 더 큰 pool의 이득이라는 결과로 읽는다.
###### 분리되지 않은 설명

<span class="label authors">저자 해석</span> Task·scene augmentation이 조작 상황을 다양화해 일반화를 높였다고 설명한다.

그러나 이 표는 task augmentation만/scene augmentation만, filtering 유무, motion classifier 임계값을 각각 바꾸지 않는다.

따라서 전체 pipeline으로 만든 합성 데이터의 규모 효과는 지지하지만 각 생성·선별 단계의 독립 효과나 classifier의 신뢰도를 증명하지는 않는다.
Pipeline 전체의 유용성과 각 단계가 필요한 이유는 다른 실험으로 확인해야 한다.
Table 3 · Sec.6.5 · PDF p.25; Q2·Q8
단계별 차이는0→25%가4.6%p,25→50%가1.0%p,50→100%가3.5%p다. 네 점만으로 일정한 scaling law나 모든 규모의 단조 증가를 주장하지 않는다. 평가 불확실성·여러 seed·검정이 없으므로 작은 차이의 유의성을 단정하지 않는다. 50.1을 Table1 GR-1의58.7과 합성만의 효과로 직접 연결하지 않는다.
-->

---
layout: none
---

<!-- slide-id: P027 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P027"><header class="seminar-header"><div class="chapter-label">Ablation and Analysis</div><h1>RL·추론 지연 분석</h1><p class="slide-lead">전구 과제의 frames·attempts와 policy p50은 서로 다른 효율 지표다.</p></header><div class="seminar-body full"><div class="body-main"><h3>전구 비틀기: BC → RECAP3</h3>
<p>완료 frames는 1056±326→353±22, 비튼 횟수는 12.7±3.0→4.1±0.3으로 약 3배 줄었다. 성공률 표가 아니며 추가 rollout·학습도 늘어나 RL objective만의 효과는 분리되지 않는다.</p>
<h3>All-modality 추론 stack의 누적 최적화</h3>
<table>
<thead>
<tr>
<th>Eager</th>
<th>Graph+Compile</th>
<th>+Static</th>
<th>+Kernel</th>
</tr>
</thead>
<tbody>
<tr>
<td>71.2ms</td>
<td>59.6ms</td>
<td>48.9ms</td>
<td>43.7ms</td>
</tr>
</tbody>
</table>
<p>최종 1.63배는 Eager 대비 누적값이며, 마지막 kernel 단계만은 1.12배다. RTX5090, dual-view192×256·4frames·Euler4회에서 측정한 policy p50이며 카메라→모터 전체 지연은 아니다.</p>
</div></div><div class="takeaway">빠른 완료·빠른 policy 호출과 높은 성공률·안정적인 전체 제어는 구별한다.</div><footer class="seminar-footer"><span class="source">Sec.6.5 · Figs.20–21 · Table 4 · PDF p.26; App.C · PDF p.43</span><span class="slide-id">P027 · 022/25</span></footer></section>

<!--
연결 멘트: “더 잘 학습해 일을 빨리 마치는 것과 계산을 빨리 실행하는 것은 다른 효율입니다. 이제 논문 전체의 기여를 정리하고, 그 의미와 검증 과제를 나누어 보겠습니다.” RL은 ALLEX 오른손으로 plastic bulb를 비트는 한 과제이고 ±는 standard deviation이다. 평가 전체 횟수·실패와 timeout의 집계는 불명확하다. 추가 rollout 데이터만 BC에 더한 같은 예산의 비교가 없어 RL objective만의 효과로 읽지 않는다. Latency는 Core Ultra7 265K/RTX5090, ALLEX, horizon40,100회 warmup 뒤300회 median이다.$\frac{71.2}{43.7}\approx1.63$,$\frac{48.9}{43.7}\approx1.12$,전체 감소38.6%다. Physics/memory 제외는67→56.9→46.2→41.6ms다. 세부와 남은 통제 비교는 S103–107에 보존한다.

S103 Figure 20·21: RL은 무엇을 측정했나?
한 전구 작업에서 완료까지 필요한 frames와 전구를 비튼 횟수인 attempts를 측정한다.
###### Light Bulb Twisting

ALLEX 오른손의 검지·엄지로 플라스틱 전구를 돌려 점등한다. Teleop, behavior cloning(BC), 연속 RECAP1–3을 비교한다.

###### 낮을수록 좋은 두 지표

<strong>Frames:</strong> 작업 완료까지 episode 길이.<br><strong>Attempts:</strong> episode 안에서 전구를 비튼 시도 수.

Frames를 denoising step 수로, attempts를 평가 episode 수로 읽으면 안 된다. 이 그림은 성공률 표가 아니다.

동작을 더 빨리·적은 시도로 마치는 것과 성공 확률은 다른 지표다.
Figs.20–21 · Sec.6.5 · PDF p.26; App.C · PDF p.43
Figure20은 작업 사진이며 Figure21은 frames와 attempts의 box-and-whisker plot이다. 이 그림에 대한 성공률 수치를 새로 만들지 않는다. 실패 episode를 timeout으로 기록하는지, 성공한 episode만 요약하는지, 총 평가 episode 수가 얼마인지는 해당 절과 AppendixC에서 충분히 명시되지 않는다. C의 action40개 생성·20개 실행도 denoising 반복과 구별한다.

S104 RECAP 개선의 해석 범위
BC에서 RECAP3로 frames·attempts가 약 3배 줄고 산포도 작아진다.
###### 보고된 BC → RECAP3

<strong>Frames:</strong>1056±326 →353±22.<br><strong>Attempts:</strong>12.7±3.0 →4.1±0.3.

완료 효율과 trial 간 일관성의 개선이다. 이 작업의 Teleop보다 빠른 결과를 인간 일반의 조작 능력 초월로 확대하지 않는다.

###### 남은 대안 설명

RECAP round마다 rollout 데이터와 학습도 늘어난다. 추가 데이터 BC와 같은 예산으로 비교하지 않아 **RL objective만의 효과**는 분리되지 않는다.

강한 개선 관측을 유지하면서도 무엇의 독립 효과인지는 열어 둔다.
Fig.21 · Sec.6.5 · PDF p.26; App.C · PDF p.43; Q3
$\frac{1056}{353}\approx2.99$,$\frac{12.7}{4.1}\approx3.10$이다. 본문의 ±는 standard deviation으로 설명하며 confidence interval로 부르지 않는다. Figure21에는 text critic과 distributional critic을 같은 예산으로 비교한 RL 성과가 없다. Figure8의 critic 학습 곡선과 최종 policy 효과를 직접 동일시하지 않는다. Teleop은 특정 로봇 interface에서의 expert demonstration이며 인간 전체의 능력 비교가 아니다. 전체 trial 수와 failure/timeout 처리는 미해결이다.

S105 Table 4: 지연 측정의 조건
43.7ms는 고정된 desktop 설정에서 측정한 policy 실행의 p50이다.
###### 고정된 하드웨어·입력

- NVIDIA RTX5090 + Intel Core Ultra7 265K.
- ALLEX, dual-view192×256, 각 4 frames.
- Action horizon40, Euler denoising4회.
- 100회 warmup forward 후 300회 측정.
- Median, 즉**p50**을 보고.
###### 여기서의 warmup

실행 준비·안정화를 위한 100회 forward이며 mid-training의 2K-step alignment warmup과 다르다.

###### 이 표만으로 알 수 없는 것

카메라 획득·영상 전송·로봇 통신·모터 실행까지 합친 end-to-end loop 지연, p95/p99와 최악 지연, 다른 GPU·입력 크기의 성능은 측정하지 않았다.

“4회 denoising”도 모든 benchmark의 공통값이 아니다.
Latency 숫자는 하드웨어·입력·측정 경계·분위수와 함께 인용한다.
Table 4 · Sec.6.5 · PDF p.26; Table 8 · PDF p.49
All-modality 최종43.7ms를 전체 로봇 제어 지연이나 제어 주파수 보장으로 바꾸지 않는다. Policy 호출1회는 action chunk를 생성하므로$\frac{1}{0.0437}$을 로봇 motor 제어Hz와 같다고 쓸 수 없다. 100회 warmup/300회 median은 tail jitter를 보여주지 않는다. WidowX와 RoboCasa Kitchen은 Table8에서 denoising10회다.

S106 Table 4: 누적 최적화의 크기
71.2→59.6→48.9→43.7ms의 최종 1.63배는 Eager 대비 누적 배수다.
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

1.19·1.46·1.63배를 서로 곱하면 누적 효과를 중복 계산한다.
Table 4 · Sec.6.5 · PDF p.26
직전 대비$\frac{71.2}{59.6}\approx1.1946$,$\frac{59.6}{48.9}\approx1.2188$,$\frac{48.9}{43.7}\approx1.1190$이다. 최종$\frac{71.2}{43.7}\approx1.6293$이며 latency 감소는11.6,10.7,5.2ms다. 원문 첫 단계는 CUDA Graph+Torch.Compile이고 다음 full static graph conversion에서 fragmented subgraph를 단일 그래프로 바꾼다. Physics·memory 제외의 최종1.61배와 all-modality1.63배가 비슷하다는 설명도 이 두 설정 안의 관측이다.

S107 남은 구성 요소 검증
보고된 ablation은 유용하지만 모든 설계 선택의 독립 기여를 분리하지는 않는다.
###### 구조·입력·보조 목표

- 같은 VLM·데이터에서 single-stream ↔ MSAT 비교.
- Motion·memory 입력을 같은 policy에서 각각 제거.
- Physical input 제거와 미래 센서 예측 손실 제거를 분리.
- 모든 기능을 함께 쓰는 복합 과제와 기능 간 간섭 평가.
###### 학습 recipe의 선택 근거

- Mid-training5:5·8:2를 다른 혼합 비율과 비교.
- Alignment warmup 유무·길이·동일학습 예산 비교.
- Zero·near-zero·random 초기화 비교.
- 합성 task/scene/filter 단계별 통제 비교.

<p class="label question">검토한 6.5와관련부록에서 분리 근거를 찾지 못한 항목</p>
검증이 남았다는 것은 모델 오류가 확인됐다는 뜻이 아니다.
Sec.6.5 · PDF pp.24–26; Sec.4.2 · PDF p.13; App.G.3–G.4 · PDF pp.51–52; Q1·Q2·Q10
논문 전체나 관련 연구에 해당 실험이 절대로 없다고 단정하지 않고 이번에 확인한 범위를 명시한다. Baseline 대비 향상은 통합 시스템의 성과이며 목록은 그 기여를 분해하기 위한 후속 실험이다. Table4의 모듈 제외 비교는 latency이고 정확도 기여의 통제표가 아니다. Table3은 합성 pool 규모 비교이며 classifier precision/recall을 주지 않는다.
-->

---
layout: none
---

<!-- slide-id: P029 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P029"><header class="seminar-header"><div class="chapter-label">Conclusion</div><h1>Conclusion</h1><p class="slide-lead">RLDX-1은 기능 확장·합성 데이터·3단계 학습·추론 최적화를 결합한 VLA 시스템이다.</p></header><div class="seminar-body split"><div class="body-main"><h3>저자가 제시한 기여</h3>
<p>VLM의 범용 이해에 <strong>motion·memory·physical sensing</strong>을 명시적으로 연결했다.</p>
<p>합성 데이터, 단계별 학습, 추론 최적화를 함께 설계해 이 기능을 실제 조작에 적용했다.</p>
</div><div class="body-aside"><h3>실험이 뒷받침하는 범위</h3>
<p>Benchmark별 적응 뒤 전체 시스템의 비교 성과와 기능별 과제의 개선을 보고했다.</p>
<p>이를 모든 작업의 zero-shot 능력이나 세 기능의 동시 시너지로 확대하지 않는다. 복합 조작·정밀 접촉에는 여전히 실패가 남는다.</p>
</div></div><div class="takeaway">논문의 기여는 기능·데이터·학습·실행을 연결한 시스템이다. 다음은 확장 방법의 적용 조건에 대한 의견이다.</div><footer class="seminar-footer"><span class="source">Sec.8 Conclusion · PDF p.28; Sec.2–6 · PDF pp.6–26</span><span class="slide-id">P029 · 023/25</span></footer></section>

<!--
연결 멘트: “여기까지의 구조·데이터·학습·실행·평가를 한 흐름으로 정리하면 이 논문의 기여가 됩니다. 이어서 이 결과에 대한 해석과 남은 한계를 구분해 말씀드리겠습니다.” 원문 Conclusion은 움직임·장기 기억·물리 센싱을 통합하고 합성 데이터, 세 단계 학습, 추론 최적화를 함께 설계한 점을 정리한다. Simulation 성과는 benchmark별 fine-tuning 이후 full recipe의 결과이고 모든 task에 zero-shot으로 투입했다는 뜻이 아니다. 기능별 평가는 task-relevant module만 활성화하므로 세 기능의 동시 시너지로 확대하지 않는다. Conclusion의 ALLEX around90 vs frontier around40은86.8대39.1/44.8의 혼합 평균에 해당한다. 완전 성공90%로 말하지 않는다. RECAP frames/attempts와 policy latency p50도 성공률이나 end-to-end latency와 구별한다. 기존 Related Work(S116)는 source\_ids 연결과 상세 N 해설에 보존한다. 그 내용은 VLA·영상 생성+IDM·기능별 연구를 통합했다는 저자의 연구 위치 설명이며 현재 SOTA나 최초성을 별도로 검증한 결과가 아니다. S117의 결론 해설도 그대로 유지한다.

S116 Related Work의 세 흐름
저자는 VLA·영상 합성·기능별 연구를 하나의 실용 시스템으로 통합한 점을 강조한다.
###### VLA의 행동 생성

VLM을 상위 계획기로 쓰는 modular 접근에서 이산 action token 또는 flow action decoder를 쓰는 end-to-end VLA로 이어지는 흐름을 설명한다.

###### 합성 데이터

Simulation rollout뿐 아니라 생성 영상에 IDM으로 행동 라벨을 붙이는 흐름을 검토한다. RLDX-1은 ALLEX의 따르기·전구 같은 구체적 조작으로 확장한다고 주장한다.
###### 세 기능의 기존 연구

Multi-frame·시간 압축, 과거 특징 memory queue, torque·촉각 및 복수 물리 신호 연구를 연결한다.

<span class="label authors">차별점 주장</span> 개별 기능을 넘어 움직임·기억·물리 센싱을 통합 policy로 다루고 합성 데이터·학습·실행 최적화를 함께 설계한다.

이는 저자의 연구 위치 설명이다. 관련 연구를 모두 재현했거나 최초성을 검증했다는 뜻은 아니다.
여러 기능을 실제로 연결한 시스템 기여로 읽는다.
Sec.7 Related Work · PDF p.27
본 slide는 보고서의 Related Work를 정리한 것으로 현재 SOTA나 전 분야 최신 계보를 새로 검색해 주장하는 것이 아니다. 합성 영상 자체에 torque가 없어도 torque-annotated real data와 함께 쓸 때 유용했다는 저자 주장은 결측 modality 처리와 관련된다. 통합 architecture의 주장과 기능별 benchmark에서는 relevant module only였다는 실험 조건을 함께 유지한다.

S117 Conclusion과 검증된 범위
기능 확장·합성 데이터·3단계 학습·추론 최적화를 결합한 시스템이 성과를 보였다.
###### 원문이 제시한 기여

언어 조건 행동 생성에 motion·memory·physical sensing을 통합하고 합성 데이터·pre/mid/post-training·실행 최적화를 연결했다.

Table 1의 여러 benchmark와 OpenArm에서 비교 모델보다 높은 보고값을 얻었다. ALLEX·Franka 기능별 과제와 전구 RECAP에서도 개선이 관측됐다.
###### 성과를 정확히 전달하려면

ALLEX “약 90%”는 86.8의 혼합 지표다. RC365 복합 과제·Franka 접촉 조작에는 낮은 절대 성공률이 남는다.

각 모듈의 독립 기여·세 기능 동시 효과·평가 불확실성·end-to-end tail latency는 더 확인해야 한다.

<span class="label interpretation">우리의 결론</span> 실용 통합의 유망한 결과와 재현·인과 분해의 남은 과제를 함께 보존한다.
구체적인 조건에서 확인된 시스템 성과와 아직 열린 검증을 구분한다.
Sec.8 · PDF p.28; Sec.6 · PDF pp.17–26; App.G · PDF pp.48–55
Conclusion의 ALLEX around90 vs frontier around40은 RLDX86.8과π0.5 39.1/N1.6 44.8의 혼합 평균에 연결된다. 이를 완전 성공90%로 번역하지 않는다. Simulation 우위는 benchmark별 fine-tuning 뒤의 full recipe 비교이며 zero-shot all tasks가 아니다. 물리 입력과 future trajectory 보조 목표의 기여도 별도로 분해해야 한다. Q11–13 및 Table9의 집계 불일치는 곧 모델 결함이라고 해석하지 않는다.
-->

---
layout: none
---

<!-- slide-id: P028 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P028"><header class="seminar-header"><div class="chapter-label">My opinions and limitation</div><h1>나의 의견</h1><p class="slide-lead">PEFT와 후보 탐색의 부록 결과를 보면, 모델 확장의 이득은 적용 범위와 비용에 따라 달라진다.</p></header><div class="seminar-body split"><div class="body-main"><h3>경량 적응 — PEFT</h3>
<table>
<thead>
<tr>
<th>VLM top-4 / Action</th>
<th>성공률</th>
</tr>
</thead>
<tbody>
<tr>
<td>Top-4 Full / Full</td>
<td>62.67%</td>
</tr>
<tr>
<td>Top-4 Full / LoRA64</td>
<td>62.67%</td>
</tr>
<tr>
<td>둘 다 LoRA64</td>
<td>55.33%</td>
</tr>
</tbody>
</table>
<p>양쪽 LoRA64: batch1 <strong>23.71GiB</strong>(H200 측정). 소비자 GPU에서 직접 검증한 값은 아니다.</p>
<p><span class="label interpretation">의견</span> 학습 크기·VRAM·성공률을 함께 보고 적응 범위를 선택해야 한다.</p>
</div><div class="body-aside"><h3>후보 선택 — Best-of-N</h3>
<p>여러 chunk를 생성해 별도 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>Q</mi></mrow><annotation encoding="application/x-tex">Q</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8778em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">Q</span></span></span></span> critic이 고른다. RECAP의 Gemma text critic과는 다른 모델이다.</p>
<p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>N</mi><mo>=</mo><mn>8</mn><mo separator="true">,</mo><mtext>  </mtext><mi>T</mi><mo>=</mo><mn>1.5</mn></mrow><annotation encoding="application/x-tex">N=8,\;T=1.5</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8778em;vertical-align:-0.1944em;"></span><span class="mord">8</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">T</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1.5</span></span></span></span>에서 RECAP1 attempts는 <strong>8.5→4.9</strong>지만, RECAP2·3에서는 오히려 늘었다.</p>
<p><span class="label interpretation">의견</span> 후보를 늘리는 것보다 정책의 학습 단계와 critic의 적합성을 먼저 확인할 필요가 있다. N·온도 변경과 추가 계산 비용도 함께 비교해야 한다.</p>
</div></div><div class="takeaway">가벼운 학습·많은 후보가 항상 이득은 아니다. 성능을 유지하는 조건과 전체 비용을 확인해야 한다.</div><footer class="seminar-footer"><span class="source">발표자의 해석 · Sec.2–6 · PDF pp.6–26; App.D · Table 6 · PDF p.44; App.E · Figs.22–23 · PDF pp.45–46; App.G.5–G.6 · PDF pp.53–55</span><span class="slide-id">P028 · 024/25</span></footer></section>

<!--
연결 멘트: “논문의 결론을 바탕으로, 이 결과를 어떻게 읽을 수 있을지 정리하겠습니다. 개인적인 실험 경험이 아니라 원문 비교에 근거한 해석입니다.” 시스템 통합과 조건부 이득을 의견으로 제시하며 저자의 실험 결과 자체와 구별한다. BoN $N=8$/$T=1.5$는 RECAP1 attempts8.5→4.9지만 RECAP2/3는+2.3/+2.2로 악화한다. Frozen RECAP1 특징 위 별도 distributional $Q$ critic이며 RECAP의 Gemma text critic과 다르다. PEFT Full FT는 VLM top-4층을 fully tune한다는 뜻이다. Full/Full62.67%,Full/LoRA64도62.67%,양쪽LoRA64는55.33%·batch1 23.71GiB이며 실제 측정은H200이다. Table9의 보고66.7→83.3과 full$\frac{9}{24}$→$\frac{14}{24}$는 상세 해설에 보존하고 count 가중합13/18 vs 보고16/20의 불일치는 마지막 장에서 검증 논점으로 모은다. Batch64→1024의 GR-1 36.8→58.7도 총 노출 예산과 분리하기 어렵다. 각 task의 낮은 절대값과 평균의 한계까지 S108–115 원형 해설에 남긴다. 다음 장에서는 의견과 별도로 문서에서 아직 확인되지 않은 명세와 집계 문제를 짚는다.

S108 PEFT와 적응 비용
Action LoRA는 성능을 유지할 수 있지만 VLM까지 LoRA로 바꾸면 성능·VRAM이 함께 낮아진다.
| VLM top-4 / action | 성공률 | 학습 M | VRAM B1 |
| --- | --- | --- | --- |
| Full / Full | 62.67% | 2376.0 | 56.77GiB |
| Full / LoRA64 | 62.67% | 1150.5 | 37.20GiB |
| Frozen / LoRA64 | 36.42% | 378.4 | 23.31GiB |
| LoRA64 / LoRA64 | 55.33% | 397.8 | 23.71GiB |

**Full FT는 VLM 전체가 아니라 top-4층의 full tuning**이다. 실제 측정은 single H200, 24tasks×50episodes다. 23.71GiB가 24GiB 안에 든다는 사실은 있지만 소비자 GPU에서 실제 적응을 실행·검증한 결과는 아니다.

이 부록의 성능·메모리 절충을 Table1과 같은 실험값으로 섞지 않는다.
App.D · Table 6 · PDF p.44
원문7개 행의 성공률/학습M/VRAM(batch32,batch1): Full/Full62.67,2376.0,87.10/56.77; Frozen/LoRA8은21.25,361.7,27.22/22.94; Frozen/LoRA64는36.42,378.4,27.48/23.31; Full/LoRA8은60.17,1133.7,76.33/36.83; Full/LoRA64는62.67,1150.5,76.60/37.20; Both-LoRA8은45.75,364.1,35.39/23.11; Both-LoRA64는55.33,397.8,35.93/23.71. $3\,\text{views}\times4\,\text{frames}=12\,\text{frames}$. Both-LoRA64의 학습 가능 파라미터는 전체의5.72%, batch32 VRAM은 baseline의41.3%다. Table1의70.6과 다른 setup이다. 실제 실행 GPU는H200이다.

S109 Best-of-N과 별도 Q critic
여러 행동 chunk 중 $Q$가 높은 후보를 고르는 방법이며 RECAP의 Gemma critic과 다르다.
###### 추론의 후보 선택

<div class="sequence">
<div class="step">정책에서 $N$개의 action chunk를 생성한다.</div>
<div class="step">각 chunk를 별도 $Q$ critic으로 평가한다.</div>
<div class="step">$Q$가 가장 높은 chunk를 선택해 실행한다.</div>
</div>

$N$은 **후보 개수**이며 denoising 반복 횟수가 아니다. $Q$는 단일 행동이 아니라 시간 구간의 chunk를 입력받는다.
###### RECAP critic과 구분

Appendix E는 frozen RLDX-1 특징 위에 별도 $V$/$Q$ network를 학습한다. Twin-Q의 min을 쓰고 distributional head의 기대값으로 $Q$를 읽는다.

본문 RECAP의 별도 Gemma text critic과 구조·출력·용도가 다르다. RECAP1 특징은 고정·cache하며 critic 학습이 VLM으로 역전파되지 않는다.

추가 on-policy fine-tuning 없이 후보를 고른다.
RECAP의 학습용 평가 모델과 BoN의 추론용 후보 평가 모델을 구분한다.
App.E.1–E.2 · PDF p.45; Sec.4.3 · PDF pp.14–15; App.C · PDF p.43
VLM 최종 token states를 sequence 방향 average pooling하고 embodiment-conditioned4-layer MLP로64차원 VL embedding을 만든다. State를 이어 붙여 $V$에 넣고 $Q$에는 normalized action chunk도 넣는다. $V$는 width256의 pre-norm BRONet4 blocks다. Twin-Q의 min을 TD target과 BoN score에 사용한다. HL-Gaussian head는101atoms, support$[-100,0]$, expectile0.7이다. E.1의 general setting은 lr$10^{-4}$, E.2의 실제 critic optimization은$3\times10^{-5}$로 서술돼 하나의 설정으로 단정하지 않는다. 핵심은 RECAP1 frozen features를 쓰는 별도 critic이며 Gemma가 아니라는 점이다.

S110 Figure 22: temperature가 바꾸는 것
$T$는 초기 noise의 분산을 바꾼다. Denoising timestep $\tau$나 IQL expectile과 다르다.
$$
\epsilon\sim\mathcal{N}(0,T^2I)
$$

$T$를 높이면 서로 다른 초기 후보가 더 넓게 퍼진다. Figure 22는 RECAP3의 offline 관측에서 $N=10$개를 뽑아 예측 $Q$의 분포와 best−mean 차이를 분석한다.

저자는 $T>2$에서 $Q$ 차이가 뚜렷해지지만 실제 로봇에서는 분포 밖 행동이 나와 $T=1.5$를 절충값으로 썼다고 설명한다.

<span class="label interpretation">해석 한계</span> 높은 $Q$는 critic의 예측이다. 실제 성공이 같은 비율로 높아진다는 뜻은 아니다.

높은 다양성·높은 예측 $Q$·좋은 실제 행동은 서로 같은 지표가 아니다.
App.E.2–E.3 · Fig.22 · PDF pp.45–46
$T=1.5$이면 초기 noise 표준편차는1.5배, 분산은2.25배다. 본문 flow의 denoising timestep과 E의 IQL expectile0.7도 모두 $\tau$를 쓰므로 문맥을 구별한다. Fig22(a)는$T$별$Q$,(b)는$Q_{\mathrm{best}}-Q_{\mathrm{mean}}$,(c)는후보$Q$의표준편차,(d)는frame별$Q$ trace다. 추세가 일부 outlier만으로 만들어진 것이 아니라는 설명도 저자 관찰이다. 높은 온도에서 분포 밖 행동이 있었다는 설명은 원문 실험에 관한 서술이다.

S111 Figure 23: 후보 탐색은 항상 이득일까?
N8·T1.5는 RECAP1을 돕지만 RECAP2·3의 attempts는 늘린다.
###### 실제 전구 작업의 결과

**RECAP1:** 8.5→4.9 attempts로 개선.<br>**RECAP2:** +2.3 attempts 악화.<br>**RECAP3:** +2.2 attempts 악화.

RECAP1에서 $N=8\to N=32$도 4.9→5.7로 추가 개선이 없다. 기본 $N=1$/$T=1$과 BoN $N=8$/$T=1.5$는 $N$과 $T$가 함께 변한다.

<span class="label authors">저자 해석</span> 덜 수렴한 정책에는 탐색이 돕지만 수렴 정책에는 확률성이 최적 행동을 벗어나게 한다고 설명한다. Critic 오차 등과 분리 검증된 원인은 아니다.

추론 계산을 늘릴수록 성능이 단조 향상된다는 결론은 이 결과와 맞지 않는다.
App.E.3 · Fig.23 · PDF p.46
RECAP1 기본8.5±2.8, BoN4.9±1.3 attempts다. $N=8$/$T=1.5$에서$N=32$/$T=1.5$로4.9→5.7이다. Figure23은 attempts이며 success rate가 아니다. Critic이 RECAP1 특징으로 학습돼 후속 policy와 distribution mismatch가 있을 수 있지만 이를 실증 원인으로 단정하지 않는다. $N$만/$T$만 바꾸는 factorial control이 없어 후보 수만의 독립 효과를 산출하지 않는다. BoN latency와 compute까지 포함한 Pareto 평가도 이 그림에서는 제시하지 않는다.

S112 Table 9: 합성이 돕는 것은 어느 성공인가?
잡기 하위 과제의 보고값은 66.7→83.3이지만 count·가중 score가 서로 맞지 않는다.
| Data | Full | Partial | Fail | 원문 보고 score |
| --- | --- | --- | --- | --- |
| Real | 9 | 8 | 7 | $\frac{16}{24}$ · 66.7% |
| Real+Synth. | 14 | 8 | 2 | $\frac{20}{24}$ · 83.3% |

Full은 컵·주전자 모두 잡기, Partial은 컵만 잡기다. 완전 성공은 $\frac{9}{24}$(37.5%)→$\frac{14}{24}$(58.3%)다. 따르기 전체 성공률이 아니다.

<div class="callout"><span class="label question">추가 집계 불일치</span>
<p>명시된 1/0.5/0 점수를 count에 적용하면 $\frac{13}{24}$·$\frac{18}{24}$로, 원문 $\frac{16}{24}$·$\frac{20}{24}$와 다르다. 보고값을 보존하며 어느 명세가 잘못됐는지는 미확인으로 남긴다.</p></div>

<p class="mini">실제:합성 50:50; 이 합성은 task/scene 증강 없이 video quality filtering만 적용.</p>

원문 보고값·완전 성공 count·점수 계산의 추가 불일치를 구분한다.
App.G.5 · Table 9 · PDF p.53
원문 Table9의 count 합은 각각24다. 그러나 명시한1/0.5/0 scoring으로는$9+8\times0.5=13$, $14+8\times0.5=18$이다. 이는 보고 Score$\frac{16}{24}$와$\frac{20}{24}$ 및66.7/83.3과 불일치한다. 표·설명·집계 중 무엇이 잘못됐는지는 미확인으로 남기고 원문 값을 수정하지 않는다. 완전 성공 count만 읽으면9→14다. $3\,\text{cup positions}\times4\,\text{pot positions}\times2\,\text{trials}=24$이며 위치 간격은 약5cm와9cm다. 합성은 multi-turn2 rounds(grasp-and-tilt→pour-and-return), 앞 round 마지막 frame 재사용, task/scene augmentation 없이 video quality filtering만 적용한다.

S113 Table 10: batch size와 학습 예산
큰 batch에서 성공률이 높지만 batch만의 효과와 총 데이터 노출량은 구별해야 한다.
###### 보고된 성공률(%)

| Batch | LIBERO | Kitchen | GR-1 |
| --- | --- | --- | --- |
| 64 | 97.4 | 66.9 | 36.8 |
| 256 | 97.8 | 69.6 | 53.2 |
| 1024 | — | 70.6 | 58.7 |

GR-1은 64→1024에서 +21.9%p로 차이가 크다. LIBERO1024는 미보고다.
###### 무엇이 고정됐는가?

Gradient step을 고정하면 batch가 커질수록 총 샘플 노출량도 커진다. 총 샘플 수·계산량을 고정하면 update 횟수가 달라진다.

<span class="label interpretation">해석 한계</span> G.6의 짧은 설명만으로 예산 통제를 충분히 확인하기 어렵다. 따라서 batch 크기만의 독립 효과나 모든 환경의 같은 법칙으로 일반화하지 않는다.
Batch·update 횟수·총 샘플 노출·계산량을 함께 보고해야 비교가 분명해진다.
App.G.6 · Table 10 · PDF p.54
GR-1은36.8→53.2→58.7, Kitchen66.9→69.6→70.6, LIBERO97.4→97.8이다. G.6는 큰 batch가 성능을 높인다고 서술하지만 통계적 batch 효과와 총 데이터·계산 예산의 효과를 분해하는 설명이 부족하다. 기본60K steps를 모든 행의 완전한 예산이라고 추정해 보완하지 않는다. Baseline과 같은 steps·batch를 사용해도 전체 사전 학습 예산까지 동일하다는 뜻은 아니다.

S114 과제별 강건성 결과
높은 평균에도 camera·noise·layout 변화와 일부 drawer 동작의 약점이 가려져 있다.
###### LIBERO-Plus 조건별 (%)

| Camera | Robot | Language | Light |
| --- | --- | --- | --- |
| 75.0 | 91.8 | 92.2 | 97.1 |

| Background | Noise | Layout | 전체 |
| --- | --- | --- | --- |
| 95.5 | 80.3 | 80.7 | 86.7 |

평균 86.7보다 camera 75.0이 가장 낮다. 강건성을 한 개의 능력으로 요약하기 어렵다.
###### SIMPLER의 서로 다른 변화

Google Open Drawer는 VM58.5→VA32.3으로 낮아진다. 반면 Close Drawer는 78.5→93.2로 높아진다.

<span class="label interpretation">해석</span> VA가 모든 task를 똑같이 어렵게 만드는 단일 축은 아니다. 조건·분포가 다른 평균에 각자 원인을 붙이면 안 된다.

WidowX도 Spoon88.5와 Eggplant52.0의 차이가 크다. 평균 71.9는 편차를 숨긴다.
전체 평균의 우위와 취약한 변형·task를 함께 보여준다.
App.G.6 · Tables 11–12 · PDF p.54
Table11 LIBERO Long95.3/Spatial98.0/Object99.3/Goal98.4/Avg97.8. Plus Camera75/Robot91.8/Language92.2/Light97.1/Background95.5/Noise80.3/Layout80.7/Total86.7. Table12 Google-VM Move92/Close78.5/Open58.5/Coke97/Avg81.5; VA Move90.9/Close93.2/Open32.3/Coke93.4/Avg77.4; WidowX Carrot83/Eggplant52/Spoon88.5/Stack64/Avg71.9. 각 조건의 seed·불확실성을 함께 보여주는 표는 아니다.

S115 과제별 낮은 성공률을 읽는 법
전체 순위가 높아도 주방·휴머노이드·복합 작업의 일부 항목은 여전히 낮다.
###### 낮은 항목의 예

| 환경 | 과제 | 성공률 |
| --- | --- | --- |
| Kitchen | 스토브 켜기/끄기 | 24.0/22.0% |
| GR-1 | 매트→다단 선반 | 24.0% |
| RC365 Seen | 커피 준비 | 0.0% |
| RC365 Seen | 토스트 꺼내기 | 0.0% |
| RC365 Unseen | 식기 모으기 | 0.0% |

<p class="mini">RC365의 두 구분은 Composite(복합 과제)다.</p>
###### 0%의 정확한 뜻

주어진 평가 시도에서 성공을 관측하지 못했다는 뜻이다. 모든 미래 초기 상태와 새 학습까지 포함해 원리적으로 불가능하다는 증명은 아니다.

RC365는 Atomic67.3%, Composite-Seen19.0%, Unseen5.6%다. 긴 복합 조작의 절대 난도를 유지한 채 상대 개선을 평가해야 한다.

전체 32.1은 18/16/16개 task 수의 가중 평균과 부합한다.
“최고 성능”이라는 한 문장으로 남은 실패와 절대 난도를 지우지 않는다.
App.G.6 · Tables 13–15 · PDF p.55
Kitchen은 Close Single Door와Turn On Sink100인 반면 Microwave-to-Counter26, Stove Off22다. GR-1은 Tray-to-Pot와Can-to-Drawer74인 반면 Placemat-to-Tiered-Shelf24다. RC365 Composite-Seen Load Dishwasher50, Get Toasted Bread0, Prepare Coffee0. Composite-Unseen은 Categorize Condiments/Gather Tableware/Heat Kebab Sandwich/Pan Transfer/Separate Freezer Rack에서0이다. $\frac{18\times67.3+16\times19+16\times5.6}{50}=32.104\approx32.1$. Split 단순 평균30.63과 다르다. 다단계 실패의 원인을 인지 또는 제어 한 가지로 단정할 수 없다. 화면 표의 매트→다단 선반은 Placemat to Tiered Shelf, 토스트 꺼내기는 Get Toasted Bread, 식기 모으기는 Gather Tableware에 해당한다. Seen/Unseen은 Composite split을 줄여 쓴다.
-->

---
layout: none
---

<!-- slide-id: P030 | revision: v07 | status: draft -->

<section class="seminar-slide" data-slide-id="P030"><header class="seminar-header"><div class="chapter-label">My opinions and limitation</div><h1>한계와 미해결 질문</h1><p class="slide-lead">원문 명세·집계의 불일치와 아직 분리하지 못한 효과를 다음 검증의 대상으로 남긴다.</p></header><div class="seminar-body full"><div class="body-main"><table>
<thead>
<tr>
<th>위치</th>
<th>확인된 불일치</th>
<th>필요한 근거</th>
</tr>
</thead>
<tbody>
<tr>
<td>Q11 · Fig.7</td>
<td>Franka 비중 합101.0 vs 본문8:2</td>
<td>혼합 설정</td>
</tr>
<tr>
<td>Q12 · Table8</td>
<td>RC365 batch196 vs192</td>
<td>실행 설정</td>
</tr>
<tr>
<td>Q13 · Fig.18</td>
<td>Egg61.1% vs24회 설명</td>
<td>분모·집계법</td>
</tr>
<tr>
<td>추가 · Table9</td>
<td>Count 가중합13/18 vs 보고16/20</td>
<td>Count·점수 명세</td>
</tr>
</tbody>
</table>
<p><span class="label question">운영·생성</span> Memory 갱신·초기화, <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>H</mi></mrow><annotation encoding="application/x-tex">H</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.0813em;">H</span></span></span></span>/<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>H</mi><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">H+1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.0813em;">H</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>·C/<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>A</mi></mrow><annotation encoding="application/x-tex">A</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6833em;"></span><span class="mord mathnormal">A</span></span></span></span> 표기, skill 목록·실행 가능성 규칙은 더 확인해야 한다.</p>
<p><span class="label interpretation">후속 실험</span> 모듈·필터·RL의 독립 비교, 동일 데이터·compute 예산, 평가 불확실성, end-to-end p95/p99가 결론을 더 선명하게 한다.</p>
</div></div><div class="takeaway">문서의 불확실성과 모델의 성능 한계를 구별하며 후속 근거를 확인한다.</div><footer class="seminar-footer"><span class="source">Q5–Q6·Q8·Q11–Q13; Sec.2–4 · PDF pp.7–13; App.B.3 · PDF p.42; App.G.1·G.4–G.6 · PDF pp.49,52–55</span><span class="slide-id">P030 · 025/25</span></footer></section>

<!--
연결 멘트: “마지막은 앞의 의견과 구분해 원문에서 확인되지 않은 명세와 추가 검증을 정리합니다.” 마무리 멘트: “문서의 불일치는 모델 오동작의 증거가 아닙니다. 명시된 결과와 확인하지 못한 규칙을 나눠 다음 근거를 찾는 출발점으로 남깁니다.” Memory는$H+1$ 간격과$t-H$ queue식, episode 초기화·짧은 history 처리, MSAT의$A$와 Physical Sensing 요약의C가 미해결이다. Task feasibility는 skill 목록·prompt·판정 gate가 구체적이지 않다. Q11은$80+9.4+11.6=101$, Q12는 문장196/Table8 192, Q13은24회당1성공4.17%p와61.1의 대응 불명확이다. Table9 count9/8/7,14/8/2에1/0.5/0을 적용한13/18과 보고16/20도 다르다. 기존 $Q$번호를 재번호화하지 않는다. 모든 미해결 질문과 후속 실험 제안은 S118–121 원형 해설에 보존한다.

S118 Memory와 stream 표기: 남은 질문
구조의 큰 흐름은 확인됐지만 queue 운영과 일부 표기는 구현 근거가 더 필요하다.
###### Memory Q5

과거 cognition3묶음과 현재 $h_t$를 causal memory Transformer에 넣고 $m_t$·원래 $h_t$를 행동 모델로 전달한다.

본문 cache 간격은 $H+1$이지만 queue 식은 $t-H,t-2H,\ldots$로 표기한다. Chunk40/16과 과거 120/48 timestep 설명은 있으나 정확한 갱신 시점·episode 초기화·짧은 history 처리는 확정하지 못했다.
###### Stream Q6

MSAT 문단은 $C=[h_t,m_t]$, $A=[s_t,a^{\tau}]$로 명시한다. 그러나 Physical Sensing 마지막 요약은 noisy action을 “C stream”이라고 쓴다.

초기 $A$와 후기 통합 C-A를 구별하되 마지막 C가 오타인지 의도인지 확정하지 않는다.

<p class="label question">운영 명세·표기의 미해결이며 실제 실행 오류 확인은 아님</p>
명시된 구조는 설명하고 부족한 운영 규칙과 표기는 열린 질문으로 남긴다.
Sec.2.1–2.2 · PDF pp.7–8; Sec.4.2 · PDF p.13; Q5·Q6
Cache 간격$H+1$과 queue식$t-n_{\mathrm{mem}}H$의 불일치를 남긴다. Queue 갱신을 매 카메라 frame 또는 매 denoising iteration마다 한다고 보완하지 않는다. Memory window120/48은 원문 수치이며 camera FPS를 확인하지 않고 초 단위로 변환하지 않는다. 공개 코드나 저자 확인으로 cache trigger·episode reset·padding·첫 chunk 동작을 검증할 수 있다. Physical Sensing 요약의C표기는 MSAT 문단$A$와 다르며 후기C-A 통합이 있다는 이유만으로 해소됐다고 단정하지 않는다.

S119 Task 실행 가능성: 무엇을 더 알아야 하나?
Skill-conditioned 변형은 실행 가능한 지시를 유도하지만 판정 규칙의 보장은 미확인이다.
###### 원문에서 확인한 것

Factorized는 행동·대상·배치·손을 재조합하고 skill-conditioned는 원본 skill을 조건으로 변형한다. 둘 다 시작 장면을 조건으로 사용한다.

원래 skill을 유지하거나 정의된 skill set의 다른 실행 가능한 skill로 바꾼다고 설명한다. 두 전략의 출력은 겹칠 수 있다.
###### Q8의 남은 세부

- 사전 정의 skill 목록과 장면별 후보 제한은 무엇인가?
- 실행 가능성은 어떤 모델·규칙·절차로 판정하는가?
- System prompt·few-shot 예시와 강제 제약은 무엇인가?

Sec.3.3·B.3에는 이 세부가 없다. 후속 video quality filtering은 초기 지시의 실행 가능성 판정과 같지 않다.
설계 의도와 구체적인 제약·검증 절차를 구분해 추가 근거를 확인한다.
Sec.3.3 Task Augmentation · PDF p.11; App.B.3 · PDF p.42; Q8
원래 skill을 유지하며 object·location만 바꾼 결과는 factorized로도 만들 수 있어 두 전략을 상호 배타적 집합으로 그리지 않는다. Gemini API의 plausibility8frames/instruction16frames 평가는 초기 생성 prompt의 실행 불가능한 지시 제거 보장과 다르다. B.3는 모델·데이터·학습 설정·filter 학습을 보충하지만 task-generation prompt, skill 목록, feasibility gate를 구체화하지 않는다. 이 범위 밖 구현은 미확인이다.

S120 수치·집계의 불일치: 그대로 보존한다
표시값을 고쳐 맞추지 말고 원문 위치와 계산상의 차이를 함께 기록한다.
| 위치 | 원문 표기 | 남은 확인 |
| --- | --- | --- |
| Q11 · Fig.7 p.13 | $80.0+9.4+11.6=101.0$ | 본문 8:2와 불일치 |
| Q12 · pp.18,49 | 문장 batch196 / Table8 192 | 실제 실행 설정 |
| Q13 · pp.24,52 | Egg61.1% / 24trials | 분모·반복·집계법 |
| 추가 · Table9 p.53 | Count 가중합 13/18 vs Score16/20 | Count·점수·설명 중 어디인가? |

원문 수치를 임의로 보정하지 않는다. 이는 문서 명세·집계의 한계이며 모델 오동작이나 실험 부정을 입증하지 않는다.

후속 코드·로그·저자 설명이 오기 전에는 보고값과 불확실성을 함께 유지한다.
Fig.7 · PDF p.13; Sec.6.1 · PDF p.18; Fig.18 · PDF p.24; Table 8 · PDF p.49; App.G.4 · PDF p.52; Q11–Q13; App.G.5 · Table 9 · PDF p.53
Q11에서 자체 수집 합계21.0은 본문20과 달라11.6을10.6으로 고치지 않는다. Q12에서 문장196이 반복돼도 Table8의192를 틀렸다고 확정하지 않는다. Q13은 단일24 이진 trials의1회당4.1667%p와61.1의 대응이 불명확하다. 추가로Table9는count9/8/7과14/8/2에1/0.5/0을 적용한13/18과 보고Score16/20이 맞지 않는다. 기존 Q1–13을 임의로 재번호화하거나 중앙 노트를 수정하지 않고 새 확인 사항으로 구별한다.

S121 추가로 필요한 실험
독립 기여·평가 예산·선별 신뢰성·지연 분포를 확인하면 결론의 범위가 더 명확해진다.
###### 성능 근거를 분해하는 실험

- 같은 데이터·예산에서 MSAT와 모듈 입력·보조 목표를 하나씩 비교.
- 추가 rollout만 BC에 더한 조건과 RECAP을 같은 예산으로 비교.
- Task/scene 증강·quality/motion 필터를 요인별로 비교.
- Motion classifier의 별도 test set·precision/recall·실패 유형 보고.
###### 신뢰도·실행을 확인하는 실험

- 평가 episode 수·실패/timeout 처리·seed와 신뢰구간 공개.
- Batch 비교의 샘플·update·compute 예산 통제.
- 세 기능이 동시에 필요한 과제의 상호작용 평가.
- 카메라→모터 end-to-end와 p95/p99, BoN 성능·지연 절충 보고.

<p class="label interpretation">후속 검증 제안이며 실행 완료 결과가 아님</p>
추가 실험은 어떤 조건에서 왜 유효한지 더 선명하게 하기 위한 것이다.
Sec.6.5 · PDF pp.24–26; App.E · PDF pp.45–46; App.G.3–G.6 · PDF pp.51–55; Q1·Q2·Q3·Q10
후속 제안은 논문의 관찰과 명세 한계에 근거한 우리의 해석이다. 평가 분포 밖 일반화, classifier calibration, 새 embodiment 적응 효과 등을 확인된 결론으로 만들지 않는다. 이 발표는 원문·질문노트를 검토해 정리한 초안이며 논문 학습·실험의 재현을 실행한 결과가 아니다. 유망한 통합 성과와 독립 인과 기여·재현 설정·집계 불확실성의 남은 과제를 함께 기록한다.
-->
