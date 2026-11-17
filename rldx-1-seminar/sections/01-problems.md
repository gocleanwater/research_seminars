# Problems

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P002] 기존 VLA의 문제

<!-- slide-meta
layout: full
kind: fact
source_ids: S002, S003, S004
-->

### 한 문장

VLA는 영상과 언어 지시를 받아 로봇의 행동을 만드는 모델이다.

### 본문

<div class="problems-walkthrough" data-problem-step="4">
<div class="vla-definition">
<div class="vla-input"><span>영상 관측</span><span>언어 지시</span></div>
<span class="vla-flow-arrow">→</span>
<div class="vla-model"><strong>VLA</strong><span>상황에 맞는 행동 생성</span></div>
<span class="vla-flow-arrow">→</span>
<div class="vla-action">로봇 행동</div>
</div>
<div class="problem-step-label" aria-live="polite">5 / 5 · 필요한 세 가지 능력</div>
<div class="problem-cards">
<div class="problem-card" data-problem-card="1">
<div class="problem-number">01 · 움직임</div>
<svg class="problem-conveyor" viewBox="0 0 330 145" role="img" aria-label="컨베이어에서 물체는 오른쪽으로 이동했지만 로봇 손은 이전 위치로 내려와 놓치는 설명용 그림">
<defs><marker id="p002-belt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#167e7a"/></marker></defs>
<text x="74" y="17" text-anchor="middle" fill="#506574">손이 향한 곳</text>
<path d="M 74 26 V 48 M 60 48 H 88 M 60 48 V 67 M 88 48 V 67" fill="none" stroke="#3f6573" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="60" y="76" width="28" height="25" rx="3" fill="none" stroke="#92b2b0" stroke-width="2" stroke-dasharray="4 3"/>
<path d="M 68 82 L 80 94 M 80 82 L 68 94" stroke="#bc5849" stroke-width="2.5" stroke-linecap="round"/>
<path d="M 109 88 H 214" fill="none" stroke="#167e7a" stroke-width="2.5" marker-end="url(#p002-belt-arrow)"/>
<text x="163" y="72" text-anchor="middle" fill="#167e7a">벨트 이동</text>
<rect x="236" y="76" width="28" height="25" rx="3" fill="#f0c989" stroke="#a87934" stroke-width="2"/>
<rect x="14" y="104" width="302" height="20" rx="10" fill="#dce8e8" stroke="#7d9da4" stroke-width="2"/>
<g fill="none" stroke="#9cb5ba" stroke-width="2"><circle cx="27" cy="114" r="5"/><circle cx="81" cy="114" r="5"/><circle cx="135" cy="114" r="5"/><circle cx="189" cy="114" r="5"/><circle cx="243" cy="114" r="5"/><circle cx="303" cy="114" r="5"/></g>
<text x="74" y="141" text-anchor="middle" fill="#667b87">이전 위치</text>
<text x="250" y="141" text-anchor="middle" fill="#94682e">이동한 물체</text>
</svg>
<div class="problem-capability">움직임을 읽는 능력 부족</div>
</div>
<div class="problem-card" data-problem-card="2">
<div class="problem-number">02 · 기억</div>
<svg class="problem-scene" viewBox="0 0 330 145" role="img" aria-label="처음 공을 숨기는 장면과 컵을 섞은 뒤 어느 컵에 공이 있는지 기억해야 하는 야바위 설명용 그림">
<defs><marker id="p002-shell-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#167e7a"/></marker></defs>
<text x="59" y="18" text-anchor="middle" fill="#506574">공을 숨김</text>
<path d="M 35 62 L 42 33 H 76 L 83 62 Z" fill="#d5ebe8" stroke="#518c8a" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="59" cy="81" r="9" fill="#edc98d" stroke="#a87934" stroke-width="2"/>
<path d="M 100 81 H 127" stroke="#167e7a" stroke-width="2.5" marker-end="url(#p002-shell-arrow)"/>
<text x="224" y="18" text-anchor="middle" fill="#506574">컵을 섞은 뒤</text>
<path d="M 144 99 L 151 67 H 176 L 183 99 Z M 205 99 L 212 67 H 237 L 244 99 Z M 266 99 L 273 67 H 298 L 305 99 Z" fill="#d5ebe8" stroke="#518c8a" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M 162 55 C 175 29 211 29 224 55 M 224 56 C 239 30 272 30 286 56" fill="none" stroke="#167e7a" stroke-width="2" marker-end="url(#p002-shell-arrow)"/>
<text x="224" y="88" text-anchor="middle" fill="#3f6573" style="font-size:22px;font-weight:700">?</text>
<path d="M 138 105 H 310" stroke="#a6bdbf" stroke-width="2"/>
<text x="59" y="138" text-anchor="middle" fill="#667b87">처음 본 정보</text>
<text x="224" y="138" text-anchor="middle" fill="#167e7a">어느 컵에 있을까?</text>
</svg>
<div class="problem-capability">과거를 기억하는 능력 부족</div>
</div>
<div class="problem-card" data-problem-card="3">
<div class="problem-number">03 · 물리 센싱</div>
<svg class="problem-scene" viewBox="0 0 330 145" role="img" aria-label="물체를 집는 힘이 약하면 놓치고 너무 강하면 손상되는 로봇 집기 설명용 그림">
<defs><marker id="p002-grasp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#bc5849"/></marker></defs>
<text x="80" y="18" text-anchor="middle" fill="#506574">힘이 약하면</text>
<text x="250" y="18" text-anchor="middle" fill="#506574">힘이 강하면</text>
<path d="M 80 27 V 43 M 58 43 H 102 M 58 43 V 66 M 102 43 V 66 M 250 27 V 43 M 232 43 H 268 M 232 43 V 78 M 268 43 V 78" fill="none" stroke="#3f6573" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="80" cy="87" rx="17" ry="23" fill="#f0d8ad" stroke="#a87934" stroke-width="2"/>
<path d="M 113 84 V 117" fill="none" stroke="#bc5849" stroke-width="2.5" marker-end="url(#p002-grasp-arrow)"/>
<path d="M 65 65 V 72 M 95 65 V 72" stroke="#91a8ae" stroke-width="2" stroke-dasharray="3 2"/>
<ellipse cx="250" cy="82" rx="17" ry="23" fill="#f4d7cf" stroke="#bc5849" stroke-width="2"/>
<path d="M 251 60 L 245 73 L 254 81 L 246 98" fill="none" stroke="#bc5849" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M 206 82 H 226 M 294 82 H 274" fill="none" stroke="#bc5849" stroke-width="2.5" marker-end="url(#p002-grasp-arrow)"/>
<text x="80" y="138" text-anchor="middle" fill="#94682e">놓침</text>
<text x="250" y="138" text-anchor="middle" fill="#bc5849">손상</text>
</svg>
<div class="problem-capability">물리적 상태 감지 능력 부족</div>
</div>
</div>
<div class="problem-step-copy" hidden>
<span data-problem-stage="0" data-lead="VLA는 영상과 언어 지시를 받아 로봇의 행동을 만드는 모델이다." data-takeaway="다양한 장면과 지시를 이해하는 능력은 실제 로봇 조작의 출발점이다." data-label="VLA가 하는 일"></span>
<span data-problem-stage="1" data-lead="하지만, 움직이는 물체는 현재 위치만 알아서는 잡기 어렵다." data-takeaway="움직임을 읽는 능력 부족: 물체가 이동했는데 이전 위치로 손을 뻗으면 놓칠 수 있다." data-label="첫 번째 문제 · 움직임"></span>
<span data-problem-stage="2" data-lead="현재 화면에 없는 정보가 다음 행동을 결정하기도 한다." data-takeaway="과거를 기억하는 능력 부족: 컵에 숨긴 공은 현재 모습만 보고 찾기 어렵다." data-label="두 번째 문제 · 기억"></span>
<span data-problem-stage="3" data-lead="물체의 모습만으로는 힘과 접촉 상태를 모두 알기 어렵다." data-takeaway="물리적 상태 감지 능력 부족: 힘 조절에는 촉각·토크 같은 물리 신호가 단서가 된다." data-label="세 번째 문제 · 물리 센싱"></span>
<span data-problem-stage="4" data-lead="장면과 지시의 이해에 더해, 실제 조작에 필요한 세 가지 능력이 있다." data-takeaway="RLDX-1은 움직임 인식·장기 기억·물리 센싱을 함께 다루려는 연구다." data-label="필요한 세 가지 능력"></span>
</div>
</div>

### 보충

### 요점

RLDX-1은 움직임 인식·장기 기억·물리 센싱을 함께 다루려는 연구다.

### 출처

Sec.1 pp.3–5 · Sec.2.2 p.8 · Sec.6.4 p.23 · 그림과 상황은 설명용

### 발표 메모

**화면 1/5 — VLA 정의.** 상단 입력→VLA→행동 흐름만 보인다. “영상과 언어 지시를 받아 로봇 행동을 만드는 모델”로 소개한다. 이 장에서는 VLM을 소개하거나 비교하지 않는다.

**화면 2/5 — 움직임.** 다음 키로 첫 카드를 표시한다. 컨베이어의 물체는 오른쪽으로 이동했지만 손은 점선의 이전 위치를 향하는 그림을 설명한다. 그림은 실패 상황을 직관적으로 보여주는 예시이며 실험 결과가 아니다.

**화면 3/5 — 기억.** 다음 키로 두 번째 카드를 표시한다. 공을 컵으로 가린 뒤 컵을 섞는 야바위 그림에서 처음 본 정보와 이후 컵의 이동을 기억해야 함을 설명한다.

**화면 4/5 — 물리 센싱.** 힘·접촉·미끄러짐 같은 물리적 상태를 감지하는 능력을 설명한다. 그림의 힘 조절은 그 정보가 필요한 조작 예시다. 물리 센싱이라는 상위 개념을 힘 조절 자체와 동일시하지 않는다. 집기 그림은 그대로 유지한다.

**화면 5/5 — 정리.** 다음 키로 세 카드를 함께 강조하고, RLDX-1이 세 능력을 함께 다루려 한다는 다음 장의 질문으로 연결한다.

→/다음 버튼/빈 화면 클릭으로 순차 설명, ←로 역순 설명. 다음 장에서 돌아오면 정리 화면, 페이지 번호 2로 이동하면 정의 화면이다. 연구 동기와 각 모듈의 독립적 효과를 입증한 실험은 구분하며, 모든 기존 VLA에 기억·물리 입력이 전혀 없다고 단정하지 않는다. 기존 상세 공부 기록은 보존한다.

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
