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

<!-- slide-id: S001 | revision: v42 | status: draft -->

<div class="cover-slide cover-agenda">
  <main class="cover-copy">
    <p class="cover-series">PAPER SEMINAR · RLWRLD / KAIST · 2026</p>
    <h1>RLDX-1</h1>
    <p class="cover-title-sub">Technical Report</p>
    <p class="cover-description">움직임·기억·물리 센싱을 결합한<br>범용 로봇 조작 모델</p>
  </main>
  <figure class="cover-system"><img src="/figures/fig-01.png" alt="논문 Figure 1: RLDX-1 전체 구성"><figcaption>Figure 1 · RLDX-1 전체 구성</figcaption></figure>
  <nav class="cover-part-agenda" aria-label="Part별 주제 목차">
    <p class="agenda-hint">주제를 누르면 해당 페이지로 이동합니다.</p>
    <div class="agenda-columns">
      <section class="agenda-part"><a class="agenda-part-heading" href="#P097"><small>PART 1</small><strong>모델 구조와 학습</strong></a>
        <a href="#P104">기존 VLA의 문제 <span>→</span></a>
        <a href="#P105">모델 구조·행동 생성 <span>→</span></a>
        <a href="#P106">학습 데이터·합성 데이터 <span>→</span></a>
        <a href="#P107">학습 단계·정책 개선 <span>→</span></a>
        <div class="agenda-ending"><a href="#P096">최종 정리</a><a href="#P098">Q&A</a></div>
      </section>
      <section class="agenda-part"><a class="agenda-part-heading" href="#P099"><small>PART 2</small><strong>추론·실험·분석</strong></a>
        <a href="#P108">추론 최적화 <span>→</span></a>
        <a href="#P109">성능 평가 <span>→</span></a>
        <a href="#P110">Ablation·설계 분석 <span>→</span></a>
        <a href="#P111">나의 의견 <span>→</span></a>
        <div class="agenda-ending"><a href="#P101">Part 1 요약</a><a href="#P100">Q&A</a></div>
      </section>
    </div>
  </nav>
  <footer class="cover-footer"><span>원문: RLDX-1 Technical Report · Fig.1 / 발표 구성</span><span class="cover-slide-id">S001</span></footer>
</div>


---
layout: none
---

<!-- slide-id: P097 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P097"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Part 1</h1><p class="slide-lead">모델 구조와 학습</p></header><div class="seminar-body boundary"><div class="body-main"><div class="part-boundary-visual"><p>문제 → 모델 구조 → 데이터 → 학습</p><div><a href="#P099">Part 2로 이동 →</a><a href="#S001">전체 목차</a></div></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · Part 1</span><span class="slide-id">P097 · 002/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P104 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P104"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Problems</h1><p class="slide-lead">기존 VLA가 실제 조작에서 겪는 어려움</p></header><div class="seminar-body section-title"><div class="body-main"><div class="section-title-page" aria-hidden="true"></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · 섹션 구분</span><span class="slide-id">P104 · 003/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P002 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P002"><header class="seminar-header"><div class="chapter-label">Problems</div><h1>기존 VLA의 문제</h1><p class="slide-lead">VLA는 영상과 언어 지시를 받아 로봇의 행동을 만드는 모델이다.</p></header><div class="seminar-body full"><div class="body-main"><div class="problems-walkthrough" data-problem-step="4">
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
</div></div></div><div class="takeaway">RLDX-1은 움직임 인식·장기 기억·물리 센싱을 함께 다루려는 연구다.</div><footer class="seminar-footer"><span class="source">Sec.1 pp.3–5 · Sec.2.2 p.8 · Sec.6.4 p.23 · 그림과 상황은 설명용</span><span class="slide-id">P002 · 004/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P105 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P105"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>RLDX-1 Architecture</h1><p class="slide-lead">관측과 지시가 행동으로 이어지는 구조</p></header><div class="seminar-body section-title"><div class="body-main"><div class="section-title-page" aria-hidden="true"></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · 섹션 구분</span><span class="slide-id">P105 · 005/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P032 | revision: v42 | status: draft -->

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
  <div class="arch-detail-panel" hidden>
    <div class="arch-detail-context"><p>지금 설명하는 위치 · 원문 Fig.3</p><div class="arch-detail-map"></div><span class="arch-detail-module"></span></div>
    <div class="arch-detail-content"></div>
  </div>
  <div class="arch-controls">
    <div class="arch-mode-buttons"><button data-arch-reset>전체 그림</button><button data-arch-focus="vision">Vision Encoder</button><button data-arch-focus="vlm">VLM</button><button data-arch-focus="memory">Memory Module</button><button data-arch-focus="msat">MSAT</button></div>
    <div class="arch-step-buttons"><button data-arch-prev>← 이전 설명</button><span class="arch-step-counter"></span><button data-arch-next>다음 설명 →</button></div>
  </div>
</div></div><div class="takeaway">전체 → Vision Encoder → 전체 → VLM → 전체 → Memory Module → 전체 → MSAT</div><footer class="seminar-footer"><span class="source">Fig.3 · PDF p.6; Sec.2.1–2.2 · PDF pp.7–9; 추출 층 비교: Table2(a), pp.24–25</span><span class="slide-id">P032 · 006/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P106 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P106"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Training Data</h1><p class="slide-lead">공개 실제 · 직접 시연 · 합성 데이터</p></header><div class="seminar-body section-title"><div class="body-main"><div class="section-title-page" aria-hidden="true"></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · 섹션 구분</span><span class="slide-id">P106 · 007/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P013 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P013"><header class="seminar-header"><div class="chapter-label">Training Data</div><h1>학습 데이터</h1><p class="slide-lead">공개 시연으로 기본기를, 자체 시연으로 목표 로봇의 경험을, 합성으로 부족한 상황을 보완한다.</p></header><div class="seminar-body full"><div class="body-main"><div class="data-role-grid">
<div><small>Public Real-World Data</small><h3>조작의 기본기</h3><div class="data-role-icon">여러 로봇의 실제 시연</div><p>다양한 몸체·장면·작업 경험</p><span>예: OXE · DROID 등</span></div>
<div><small>In-house Real-World Data</small><h3>목표 로봇과 새 기능</h3><div class="data-role-icon">ALLEX · Franka 자체 시연</div><p>몸체 적응 + 기억·물리 센싱</p><span>토크 · Franka 촉각 등</span></div>
<div><small>Synthetic Data</small><h3>수집하기 어려운 경험</h3><div class="data-role-icon">실제 시연 → 새로운 학습 쌍</div><p>작업 지시와 장면을 다양화</p><span>생성 영상 + 추정 행동 · 검증 후 사용</span></div>
</div></div></div><div class="takeaway">합성 데이터는 특정 작업 전용이 아니라, 부족한 조작 상황을 늘리는 보완 수단이다.</div><footer class="seminar-footer"><span class="source">Sec.3–3.3 · PDF pp.9–12; Sec.4.1–4.2 · pp.12–13</span><span class="slide-id">P013 · 008/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P072 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P072"><header class="seminar-header"><div class="chapter-label">Training Data</div><h1>합성 데이터 생성</h1><p class="slide-lead">직접 모으기 어려운 조작 경험을, 실제 시연의 변형과 행동 라벨링으로 늘린다.</p></header><div class="seminar-body figure balanced"><figure class="paper-figure"><img src="/figures/fig-04.png" alt="Figure 4 · 위: 영상 생성·행동 라벨링 / 아래: 실행 결과와 비교해 선별" loading="eager"><figcaption>Figure 4 · 위: 영상 생성·행동 라벨링 / 아래: 실행 결과와 비교해 선별</figcaption></figure><div class="body-main"><div class="synth-steps"><div><small>1 · 새 영상</small><h3>시연에서 출발</h3><p>시작 장면·지시를 바꿔<br>로봇 영상을 생성</p></div><div><small>2 · 행동 라벨</small><h3>IDM으로 행동 추정</h3><p>영상의 현재·미래 관측에서<br>실행할 행동 묶음을 추정</p></div><div><small>3 · 선별</small><h3>사용할 학습 쌍 선택</h3><p>영상의 타당성과<br>행동의 움직임 일치를 검사</p></div></div></div></div><div class="takeaway">영상 생성 → 행동 라벨링 → 검증을 거쳐, 합성 영상·행동 쌍을 학습에 사용한다.</div><footer class="seminar-footer"><span class="source">Sec.3.3 · Fig.4 · PDF pp.10–12; App.B.3 · p.42</span><span class="slide-id">P072 · 009/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P014 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P014"><header class="seminar-header"><div class="chapter-label">Training Data</div><h1>Task·Scene Augmentation</h1><p class="slide-lead">같은 시연에서 작업 지시와 장면을 바꿔, 새로운 조작 상황을 만든다.</p></header><div class="seminar-body figure balanced"><figure class="paper-figure"><img src="/figures/fig-05.png" alt="Figure 5 · (a) 원본 / (b) 작업 변형 / (c) 장면 변형" loading="eager"><figcaption>Figure 5 · (a) 원본 / (b) 작업 변형 / (c) 장면 변형</figcaption></figure><div class="body-main"><div class="synth-variants"><div><small>Task · 무엇을 할까?</small><h3>작업 지시의 변형</h3><p>동작·물체·위치·손을 재조합<br>또는 원래 skill을 조건으로 변형</p></div><div><small>Scene · 어떤 장면일까?</small><h3>장면·외관의 변형</h3><p>시작 이미지 편집 → 영상 생성<br>생성 후 색·질감도 변형</p></div></div><p class="synth-guide">Canny edge map으로 원본 구조를 참고하며 장면·외관을 변형한다.</p></div></div><div class="takeaway">Task는 할 일을, Scene은 보이는 상황을 다양화한다. 실행 가능한 시연인지도 검증한다.</div><footer class="seminar-footer"><span class="source">Sec.3.3 · Fig.5 · PDF p.11</span><span class="slide-id">P014 · 010/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P015 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P015"><header class="seminar-header"><div class="chapter-label">Training Data</div><h1>합성 데이터 검증</h1><p class="slide-lead">영상이 타당한지 먼저 확인하고, 추정 행동을 재생한 결과와 움직임을 비교한다.</p></header><div class="seminar-body full"><div class="body-main"><div class="synth-filter-grid"><div class="synth-quality"><small>1 · 영상 품질</small><h3>영상 자체의 타당성</h3><p>지시와 맞는 행동인가?</p><p>거리·접촉·움직임이<br>물리적으로 그럴듯한가?</p><div class="synth-quality-pass">통과한 영상<br>→ 행동 일관성 검사</div></div><div class="synth-motion"><small>2 · 행동 일관성</small><div class="synth-replay"><div><b>A · 합성 영상</b><span>검증할 동작</span></div><i>→</i><div><b>IDM</b><span>행동 라벨 추정</span></div><i>→</i><div><b>Simulator</b><span>추정 행동 실행</span></div><i>→</i><div><b>B · 실행 영상</b><span>Rollout 결과</span></div></div><div class="synth-compare"><strong>A와 B의 움직임 비교</strong><span>추정한 행동이 영상 속 동작을 재현하는가?</span></div><div class="synth-decisions"><div>일치 높음<br><b>영상 + 행동을 사용</b></div><div>일치 낮음<br><b>해당 쌍 제외</b></div></div></div></div></div></div><div class="takeaway">보기 좋은 영상인지와, 그 행동으로 같은 움직임을 만들 수 있는지는 따로 확인한다.</div><footer class="seminar-footer"><span class="source">Sec.3.3 · PDF pp.11–12; Fig.4 · p.10</span><span class="slide-id">P015 · 011/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P047 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P047"><header class="seminar-header"><div class="chapter-label">Training Data</div><h1>움직임 일치 검사기</h1><p class="slide-lead">합성 영상과 IDM action을 재생한 rollout 영상의 움직임이 일치하는지 판정한다.</p></header><div class="seminar-body full"><div class="body-main"><div class="pair-learning-grid"><div><small>Positive · 움직임 일치</small><h3>같은 시연의 정답 행동</h3><p>실제 시연 영상</p><span class="pair-link">↕ 움직임 대응</span><p>그 시연의 정답 행동을<br>재생한 rollout 영상</p></div><div><small>Negative · 움직임 불일치</small><h3>대응을 어긋나게 구성</h3><p>시간 구간을 어긋나게 짝짓기</p><span class="pair-link">또는</span><p>같은 작업 지시를 가진<br>다른 episode와 짝짓기</p></div></div><div class="training-mini-flow"><span>실제 시연으로 판정기 학습</span><b>→</b><span>합성 영상·추정 행동 쌍 선별</span></div></div></div><div class="takeaway">비교 대상: 합성 영상 ↔ IDM action의 simulator rollout · 이 판단 기준은 실제 시연으로 학습</div><footer class="seminar-footer"><span class="source">Sec.3.3 · Motion-Consistency Filtering · PDF p.12</span><span class="slide-id">P047 · 012/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P107 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P107"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Training Procedure</h1><p class="slide-lead">기본기 → 로봇 적응 → 작업 적응</p></header><div class="seminar-body section-title"><div class="body-main"><div class="section-title-page" aria-hidden="true"></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · 섹션 구분</span><span class="slide-id">P107 · 013/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P035 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P035"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>학습 단계</h1><p class="slide-lead">범용 정책에서 출발해, 목표 로봇과 실제 작업에 차례로 맞춘다.</p></header><div class="seminar-body full"><div class="body-main"><div class="training-stage-map"><div><small>Pre-training</small><h3>조작의 기본기</h3><p>여러 몸체·작업에서<br>공통 조작 경험 학습</p></div><b>→</b><div><small>Mid-training</small><h3>로봇·기능 적응</h3><p>목표 몸체에 맞추고<br>움직임·기억·센싱 확장</p></div><b>→</b><div><small>Post-training</small><h3>작업 적응</h3><p>실제 작업의 시연으로 학습<br>필요한 경우 RL 보완</p></div></div><p class="callout">데이터 종류는 재료의 구분, 학습 단계는 그 재료로 무엇을 배우는지의 구분이다.</p></div></div><div class="takeaway">기본기 → 로봇·기능 → 목표 작업으로, 정책의 학습 목적을 구체화한다.</div><footer class="seminar-footer"><span class="source">Sec.4–4.3 · PDF pp.12–15</span><span class="slide-id">P035 · 014/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P016 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P016"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>Pre-training</h1><p class="slide-lead">공개 실제 데이터와 합성 GR-1 데이터로, 다양한 로봇에서 쓰이는 조작의 기본기를 배운다.</p></header><div class="seminar-body full"><div class="body-main"><div class="learning-pipeline"><div><small>학습 데이터</small><h3>공개 실제 + 합성</h3><p>여러 로봇의 실제 시연<br>합성 GR-1 데이터</p></div><b>→</b><div><small>학습</small><h3>Flow matching</h3><p>관측·지시를 조건으로<br>행동 변화율 예측</p></div><b>→</b><div><small>결과</small><h3>범용 조작 policy</h3><p>여러 몸체·작업에 공통으로<br>쓰이는 조작의 기본기</p></div></div></div></div><div class="takeaway">다양한 로봇의 경험으로 기본기를 배운 뒤, Mid-training에서 목표 로봇에 맞춘다.</div><footer class="seminar-footer"><span class="source">Sec.4.1 · Fig.6 · PDF pp.12–13</span><span class="slide-id">P016 · 015/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P017 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P017"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>Mid-training</h1><p class="slide-lead">로봇별 데이터를 사용해 ALLEX·Franka에 맞추고, 움직임·기억·물리 센싱을 더한다.</p></header><div class="seminar-body full"><div class="body-main"><div class="training-detail-grid"><div><small>학습 데이터 · 목표 로봇에 맞추기</small><h3>로봇별 데이터 조합</h3><p><strong>ALLEX</strong><br>직접 시연 + 합성 ALLEX</p><p><strong>Franka</strong><br>공개 실제 DROID + 직접 시연</p></div><div><small>함께 학습하는 기능</small><h3>움직임 · 기억 · 물리 센싱</h3><p>STSS · Memory · P stream</p><p>직접 시연에서 memory·torque와<br>Franka tactile의 supervision 제공</p></div></div><div class="training-mini-flow mid-alignment-flow"><span>추가한 모듈을 먼저 학습</span><b>→</b><span>기존 모델과 함께 학습</span></div></div></div><div class="takeaway">직접 시연으로 목표 로봇과 새 입력을 학습하고, 공개·합성 데이터로 조작 경험을 보완한다.</div><footer class="seminar-footer"><span class="source">Sec.4.2 · Fig.7 · PDF p.13</span><span class="slide-id">P017 · 016/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P018 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P018"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>Post-training</h1><p class="slide-lead">목표 작업의 직접 시연으로 policy를 학습하고, 실패 조건의 경험을 보강한다.</p></header><div class="seminar-body full"><div class="body-main"><div class="post-il-flow"><div><small>1 · 학습 데이터</small><h3>직접 시연</h3><p>목표 로봇·작업의 시연<br>일관된 동작·다양한 배치</p></div><b>→</b><div><small>2</small><h3>IL policy 학습</h3><p>시연의 관측·행동으로<br>policy 학습</p></div><b>→</b><div><small>3</small><h3>실제 실행</h3><p>실패하는 상황과<br>부족한 조건 확인</p></div><b>→</b><div><small>4</small><h3>추가 시연·재학습</h3><p>실패 조건의 경험을<br>보강하며 반복</p></div></div><div class="post-rl-note"><strong>일부 고난도 작업 · RECAP RL</strong><span>실제 로봇 rollout을 추가로 수집해 개선</span></div></div></div><div class="takeaway">작업별 직접 시연으로 IL을 반복하고, 일부 고난도 작업에는 실제 rollout을 쓰는 RL을 더한다.</div><footer class="seminar-footer"><span class="source">Sec.4.3 · PDF p.14</span><span class="slide-id">P018 · 017/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P019 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P019"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>RECAP</h1><p class="slide-lead">행동을 만드는 policy와 진행을 평가하는 critic을 분리해, 실행 경험으로 정책을 개선한다.</p></header><div class="seminar-body full"><div class="body-main"><div class="recap-roles"><div><h3>Policy · RLDX-1</h3><p>관측과 지시에서 행동 생성<br>실제로 실행해 새 경험 수집</p></div><div><h3>Critic · 진행 평가</h3><p>현재 상태의 가치를 예측<br>학습용 advantage 라벨 생성에 사용</p></div></div><div class="recap-cycle"><div><small>준비</small><b>시연으로 critic 학습</b><span>평가에서 advantage 라벨 생성</span></div><i>→</i><div><small>정책 학습</small><b>라벨을 조건으로 policy 학습</b><span>현재 policy로 rollout 수집</span></div><i>→</i><div><small>반복 개선</small><b>새 경험을 데이터에 추가</b><span>성공 경험으로 critic 갱신<br>라벨 재생성 → policy 재학습</span></div></div></div></div><div class="takeaway">Critic은 행동을 지시하는 모델이 아니라, policy 학습에 사용할 평가 신호를 제공한다.</div><footer class="seminar-footer"><span class="source">Sec.4.3 · PDF pp.14–15; App.C Algorithm 1 · p.43</span><span class="slide-id">P019 · 018/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P037 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P037"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>Critic의 진행 평가</h1><p class="slide-lead">행동을 평가하려면 성공 직전뿐 아니라, 진행·실패·회복의 변화도 읽어야 한다.</p></header><div class="seminar-body figure balanced"><figure class="paper-figure"><img src="/figures/fig-08.png" alt="Figure 8 · 초록: text prediction critic / 파랑: distributional critic" loading="eager"><figcaption>Figure 8 · 초록: text prediction critic / 파랑: distributional critic</figcaption></figure><div class="body-main"><div class="critic-reading"><div><small>(a) 첫 시도 성공</small><h3>진행을 따라 값 증가</h3><p>초록 곡선은 성공으로 갈수록<br>비교적 꾸준히 증가</p></div><div><small>(b) 실패 후 재시도</small><h3>실패 때 하락 · 회복 때 상승</h3><p>작업이 어긋났다가 회복되는<br>흐름을 평가에 반영</p></div></div><p class="critic-legend">세로축: normalized value · 성공률이 아님</p></div></div><div class="takeaway">Figure 8은 critic이 작업 진행을 읽는 정성적 예시이며, 전체 정확도를 증명한 결과는 아니다.</div><footer class="seminar-footer"><span class="source">Fig.8 · PDF p.14; Sec.4.3 · p.15</span><span class="slide-id">P037 · 019/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P096 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P096"><header class="seminar-header"><div class="chapter-label">Training Procedure</div><h1>Part 1 최종 정리</h1><p class="slide-lead">문제에서 출발해, 구조·데이터·학습이 하나의 로봇 조작 정책으로 이어진다.</p></header><div class="seminar-body full"><div class="body-main"><div class="part1-recap-flow" aria-label="관측에서 로봇 행동으로 이어지는 흐름">
<div><small>보고</small><strong>영상·언어 지시</strong></div><span>→</span>
<div><small>이해하고 기억해</small><strong>VLM + Memory</strong></div><span>→</span>
<div><small>행동을 만들고</small><strong>MSAT + 상태·센서</strong></div><span>→</span>
<div><small>움직인다</small><strong>행동 묶음 일부 실행</strong></div>
</div>
<div class="part1-recap-cards">
<div><h3>왜 필요한가?</h3><p>움직임을 읽고<br>과거를 기억하고<br>물리적 상태를 감지하기 위해</p></div>
<div><h3>무엇으로 배우나?</h3><p>공개 시연 + 자체 시연<br>+ 검증한 합성 데이터</p><small>조작 경험과 새로운 조건을 공급</small></div>
<div><h3>어떻게 배우나?</h3><p>기본기 → 로봇·기능 적응<br>→ 실제 작업 적응</p><small>Pre → Mid → Post<br>작업별 IL · 필요하면 RECAP RL</small></div>
</div></div></div><div class="takeaway">무엇을 보고 기억할지 설계하고, 다양한 경험과 단계별 학습으로 행동을 가르친다.</div><footer class="seminar-footer"><span class="source">Sec.1–4.3 · Fig.2–3, 8 · 앞선 Part 1 내용을 연결한 요약 도식</span><span class="slide-id">P096 · 020/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P098 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P098"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Q&amp;A</h1><p class="slide-lead">Part 1 · 모델 구조와 학습</p></header><div class="seminar-body boundary"><div class="body-main"><div class="part-boundary-visual"><p>Part 1을 마칩니다.<br>질문과 의견을 나눠주세요.</p><div><a href="#S001">전체 목차</a><a href="#P099">Part 2로 이동 →</a></div></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · Q&amp;A</span><span class="slide-id">P098 · 021/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P099 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P099"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Part 2</h1><p class="slide-lead">추론·실험·분석</p></header><div class="seminar-body boundary"><div class="body-main"><div class="part-boundary-visual"><p>추론 최적화 → 성능 평가 → 설계 분석</p><div><a href="#P097">Part 1로 이동 →</a><a href="#S001">전체 목차</a></div></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · Part 2</span><span class="slide-id">P099 · 022/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P101 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P101"><header class="seminar-header"><div class="chapter-label">Part 1 Recap</div><h1>Part 1 한눈에 보기</h1><p class="slide-lead">① 전체 구조 · 영상 관측과 언어 지시에서 미래 action chunk까지</p></header><div class="seminar-body overview"><div class="recap-explorer" data-state="0"><div class="recap-viewport"><div class="recap-camera"><img class="recap-source-image" src="/figures/fig-02.png" width="1497" height="631" alt="원문 Figure 2 RLDX-1 전체 구조"><svg class="recap-mark" width="1497" height="631" aria-hidden="true"><rect hidden fill="none" stroke="#167e7a" stroke-width="3" vector-effect="non-scaling-stroke"/></svg><button type="button" class="recap-hotspot" data-recap-go="1" aria-label="Motion Module 확대" style="left:133px;top:249px;width:234px;height:58px"></button><button type="button" class="recap-hotspot" data-recap-go="2" aria-label="VLM 확대" style="left:124px;top:308px;width:518px;height:157px"></button><button type="button" class="recap-hotspot" data-recap-go="3" aria-label="Memory Module 확대" style="left:400px;top:467px;width:231px;height:54px"></button><button type="button" class="recap-hotspot" data-recap-go="4" aria-label="MSAT 확대" style="left:658px;top:231px;width:697px;height:249px"></button></div></div><aside class="recap-detail" aria-live="polite"><section class="recap-panel" data-recap-panel="0" data-box="[50, 35, 1370, 585]" data-crop="null" data-highlight="null" data-lead="① 전체 구조 · Figure 2의 모듈을 순서대로 따라간다." data-takeaway="전체 그림 → Motion Module → VLM → Memory Module → MSAT"><h3>RLDX-1 전체 구조</h3><p>영상 관측과 언어 지시에서 미래 action chunk까지 이어지는 경로를 봅니다.</p>
</section><section class="recap-panel" data-recap-panel="1" data-box="[100, 30, 310, 295]" data-crop="[118, 48, 262, 259]" data-highlight="[133, 249, 234, 58]" data-lead="영상의 프레임 사이 변화를 읽어 움직임 정보를 더한다." data-takeaway="Motion Module · 시각 특징에 움직임 정보를 더한다." hidden><h3>Motion Module</h3><p>관측 프레임의 변화를 읽고, 시각 특징에 <strong>움직임 정보</strong>를 더합니다.</p>
</section><section class="recap-panel" data-recap-panel="2" data-box="[110, 172, 540, 305]" data-crop="[[380, 172], [643, 172], [643, 465], [110, 465], [110, 307], [380, 307]]" data-highlight="[124, 308, 518, 157]" data-lead="시각 정보와 언어 지시를 함께 이해한다." data-takeaway="VLM · 상황과 지시를 이해해 행동 생성에 쓸 정보를 만든다." hidden><h3>VLM</h3><p>시각 정보와 지시를 함께 읽어, <strong>행동 생성에 필요한 특징</strong>을 만듭니다.</p>
</section><section class="recap-panel" data-recap-panel="3" data-box="[365, 440, 300, 110]" data-crop="[398, 466, 236, 57]" data-highlight="[400, 467, 231, 54]" data-lead="이전 특징을 저장하고, 현재 판단에 과거 정보를 활용한다." data-takeaway="Memory Module · 과거의 정보를 현재 행동에 연결한다." hidden><h3>Memory Module</h3><p>이전에 얻은 특징을 저장해 두었다가, <strong>현재 특징과 함께 읽습니다.</strong></p>
</section><section class="recap-panel" data-recap-panel="4" data-box="[645, 115, 735, 495]" data-crop="[650, 122, 730, 471]" data-highlight="[658, 231, 697, 249]" data-lead="후보를 바꿀 변화율을 예측하고, 노이즈에서 action chunk를 만든다." data-takeaway="MSAT · 변화율을 학습하고, denoising으로 미래 action chunk를 생성한다." hidden><h3>MSAT</h3><p><strong>학습:</strong> 예측 변화율을 정답 변화율에 맞춥니다.</p>
<p><strong>추론:</strong> 노이즈 후보를 denoising하며 미래 action chunk를 얻습니다.</p>
</section><section class="recap-panel" data-recap-panel="5" data-box="[50, 35, 1370, 585]" data-crop="null" data-highlight="null" data-lead="장면의 이해에 움직임과 기억을 더해 다음 행동을 만든다." data-takeaway="움직임을 읽고 → 상황·지시를 이해하고 → 과거를 참고해 → 다음 action을 생성한다." hidden><h3>전체 흐름 정리</h3><p>장면·지시의 이해와 과거 경험을 조건으로, 다음 행동을 생성합니다.</p>
</section></aside><nav class="recap-controls" aria-label="Figure 2 단계 탐색"><div class="recap-modes"><button type="button" data-recap-go="0" aria-pressed="true">전체 그림</button><button type="button" data-recap-go="1" aria-pressed="false">Motion Module</button><button type="button" data-recap-go="2" aria-pressed="false">VLM</button><button type="button" data-recap-go="3" aria-pressed="false">Memory Module</button><button type="button" data-recap-go="4" aria-pressed="false">MSAT</button><button type="button" data-recap-go="5" aria-pressed="false">전체 정리</button></div><div class="recap-directions"><button type="button" data-recap-prev>← 이전 설명</button><span class="recap-counter">1 / 6</span><button type="button" data-recap-next>다음 설명 →</button></div></nav></div></div><div class="takeaway">움직임을 읽고 → 상황·지시를 이해하고 → 과거를 참고해 → 다음 action을 생성한다.</div><footer class="seminar-footer"><span class="source">Part 1 요약 · Fig.2 PDF p.5 · Sec.2 PDF pp.6–9</span><span class="slide-id">P101 · 023/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P102 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P102"><header class="seminar-header"><div class="chapter-label">Part 1 Recap</div><h1>Part 1 한눈에 보기</h1><p class="slide-lead">② 학습 데이터 · 서로 다른 세 종류의 경험을 함께 활용한다.</p></header><div class="seminar-body full"><div class="body-main"><div class="flow recap-data"><div class="node"><h3>Public Real-World</h3><p>여러 로봇의 공개 시연</p><p><strong>조작의 기본기</strong>를<br>다양한 몸체·작업에서 학습</p></div><div class="node"><h3>In-house Real-World</h3><p>목표 로봇으로 직접 모은 시연</p><p><strong>로봇의 특성과 새 입력</strong>에<br>맞춰 학습</p></div><div class="node"><h3>Synthetic</h3><p>실제 시연을 보완하는 합성 경험</p><p><strong>직접 모으기 어려운 상황</strong>을<br>늘려 경험의 범위를 확장</p></div></div></div></div><div class="takeaway">여러 로봇의 기본기, 목표 로봇의 특성, 더 다양한 경험을 서로 보완한다.</div><footer class="seminar-footer"><span class="source">Part 1 요약 · Sec.3 PDF pp.9–12</span><span class="slide-id">P102 · 024/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P103 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P103"><header class="seminar-header"><div class="chapter-label">Part 1 Recap</div><h1>Part 1 한눈에 보기</h1><p class="slide-lead">③ 학습 단계 · 기본기 → 로봇 적응 → 작업 적응</p></header><div class="seminar-body full"><div class="body-main"><div class="learning-pipeline"><div><small>기본기</small><h3>Pre-training</h3><p>여러 로봇의 경험으로<br>범용 policy 학습</p></div><b>→</b><div><small>로봇 적응</small><h3>Mid-training</h3><p>ALLEX·Franka에 맞추기<br>움직임·기억·물리 센싱 추가</p></div><b>→</b><div><small>작업 적응</small><h3>Post-training</h3><p>목표 작업의 시연으로 IL<br>필요한 경우 RL로 보완</p></div></div></div></div><div class="takeaway">기본기를 배우고 → 로봇에 맞추고 → 수행할 작업에 맞춘다.</div><footer class="seminar-footer"><span class="source">Part 1 요약 · Sec.4 PDF pp.12–14</span><span class="slide-id">P103 · 025/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P108 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P108"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Inference Strategy</h1><p class="slide-lead">변하는 환경에 빠르게 대응하기 위한 추론 최적화</p></header><div class="seminar-body section-title"><div class="body-main"><div class="section-title-page" aria-hidden="true"></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · 섹션 구분</span><span class="slide-id">P108 · 026/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P020 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P020"><header class="seminar-header"><div class="chapter-label">Inference Strategy</div><h1>CUDA Graph</h1><p class="slide-lead">고정된 설정의 준비값을 미리 계산해 재사용하고, 반복되는 graph launch 부담을 줄인다.</p></header><div class="seminar-body inference"><div class="inference-tour" data-state="0"><div class="inference-diagram"><div class="inference-visual config-schematic" data-inference-visual="0">
<div class="config-group"><div class="config-heading"><h3>학습 때</h3><span>변경 가능</span></div><p class="config-context">입력 데이터의 구성에 따라 설정이 달라질 수 있음</p><div class="config-settings"><span>RoPE 위치 준비값</span><span>Attention mask 구조</span></div></div>
<div class="config-group fixed"><div class="config-heading"><h3>배포 때</h3><span>고정 · 재사용</span></div><p class="config-context">정해진 입력 구성으로 추론 반복</p><div class="config-settings"><span>RoPE 위치 준비값</span><span>Attention mask 구조</span></div><p class="config-reuse">한 번 계산해 두고, 추론할 때마다 재사용</p></div></div>
<div class="inference-visual inference-figure" data-inference-visual="1" hidden style="aspect-ratio:1497/594"><img src="/figures/fig-09.png" alt="Figure9 위: 여러 graph 호출, 아래: 한 CUDA Graph 호출"><svg viewBox="0 0 1497 594" aria-hidden="true"><defs><marker id="cuda-pointer" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#cc5c38"/></marker></defs><rect x="94" y="70" width="1040" height="190" rx="10"/><rect x="94" y="360" width="700" height="185" rx="10"/><path class="diagram-pointer" d="M950 288 L830 235" marker-end="url(#cuda-pointer)"/><path class="diagram-pointer" d="M470 567 L335 520" marker-end="url(#cuda-pointer)"/></svg></div></div><aside aria-live="polite"><section class="inference-panel" data-inference-panel="0" data-lead="고정된 설정의 준비값을 미리 계산해 재사용하고, 반복되는 graph launch 부담을 줄인다." data-takeaway="설정 고정 → 준비값 재사용 → 한 CUDA Graph → 반복 launch 부담 감소"><h3>학습 때와 배포 때</h3><p><strong>학습 때</strong></p>
<p>입력 구성에 따라 설정 변경 가능</p>
<p><strong>배포 때</strong></p>
<p>고정된 입력 구성으로 추론 반복<br>같은 준비값을 재사용</p>
<p><strong>최적화 효과</strong></p>
<p>한 graph로 묶어<br>반복 launch 부담 감소</p>
</section><section class="inference-panel" data-inference-panel="1" data-lead="여러 graph를 각각 launch하던 작업을, 한 번의 launch로 실행한다." data-takeaway="CUDA Graph를 여러 번 launch할 때마다 드는 시간을 줄인다." hidden><h3>CUDA Graph 실행 비교</h3><p><strong>위 · 두 번 launch</strong></p>
<p>Launch 1 → A·B → Launch 2 → C·D</p>
<p><strong>아래 · 한 번 launch</strong></p>
<p>Launch 1 → A → B → C → D</p>
</section></aside><nav class="inference-controls" aria-label="그림 설명 단계"><button type="button" data-inference-prev>← 이전 설명</button><div><button type="button" data-inference-go="0" aria-pressed="true">1</button><button type="button" data-inference-go="1" aria-pressed="false">2</button></div><span class="inference-counter"></span><button type="button" data-inference-next>다음 설명 →</button></nav></div></div><div class="takeaway">Graph는 GPU 작업을 묶는 실행 계획이다. 영상에 따라 달라지는 계산은 매번 수행한다.</div><footer class="seminar-footer"><span class="source">Sec.5.1 · Fig.9 · PDF pp.15–16; 공부 기록 S074–S075</span><span class="slide-id">P020 · 027/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P038 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P038"><header class="seminar-header"><div class="chapter-label">Inference Strategy</div><h1>Kernel Fusion</h1><p class="slide-lead">연산 사이의 중간값을 저장·다시 읽는 대신, 한 kernel 안에서 이어 사용한다.</p></header><div class="seminar-body inference"><div class="inference-tour" data-state="0"><div class="inference-diagram"><div class="inference-visual config-schematic fusion-comparison" data-inference-visual="0">
<div class="config-group"><div class="config-heading"><h3>연산을 나눠 실행</h3><span>중간값 저장·재읽기</span></div><div class="fusion-separated"><div class="fusion-op"><small>Kernel 1</small>RMSNorm</div><b>→</b><div class="fusion-memory">Global memory<br>저장·재읽기</div><b>→</b><div class="fusion-op"><small>Kernel 2</small>RoPE</div><b>→</b><div class="fusion-memory">Global memory<br>저장·재읽기</div><b>→</b><div class="fusion-op"><small>Kernel 3</small>Attention</div></div></div>
<div class="config-group fixed"><div class="config-heading"><h3>한 kernel로 합쳐 실행</h3><span>중간값 on-chip 재사용</span></div><div class="fusion-single"><span>RMSNorm</span><b>→</b><span>RoPE</span><b>→</b><span>Attention</span></div><p class="config-reuse">중간값은 바로 이어 사용 · 마지막 결과를 global memory에 저장</p></div></div>
<div class="inference-visual inference-figure" data-inference-visual="1" hidden style="aspect-ratio:1497/423"><img src="/figures/fig-10.png" alt="Figure10 왼쪽: 연산마다 메모리 왕복, 오른쪽: fused kernel에서 입력·출력 이동"><svg viewBox="0 0 1497 423" aria-hidden="true"><rect x="149" y="72" width="155" height="284" rx="10"/><rect x="900" y="166" width="153" height="95" rx="10"/></svg></div></div><aside aria-live="polite"><section class="inference-panel" data-inference-panel="0" data-lead="연산 사이의 중간값을 저장·다시 읽는 대신, 한 kernel 안에서 이어 사용한다." data-takeaway="Kernel Fusion · 같은 계산을 이어 수행하며 중간값의 메모리 왕복을 줄인다."><h3>Kernel Fusion 전후</h3><p><strong>연산을 나눠 실행</strong></p>
<p>다음 kernel에 넘길 중간값을
global memory에 저장·다시 읽기</p>
<p><strong>한 kernel로 합쳐 실행</strong></p>
<p>중간값을 on-chip에서 이어 사용</p>
<p><strong>핵심</strong></p>
<p>계산은 유지하고 메모리 왕복을 줄인다.</p>
</section><section class="inference-panel" data-inference-panel="1" data-lead="원문 그림의 화살표는 global memory에서 읽고 쓰는 이동을 보여준다." data-takeaway="CUDA Graph는 호출 부담을, Kernel Fusion은 연산 사이의 메모리 이동을 줄인다." hidden><h3>Figure 10의 메모리 이동</h3><p><strong>왼쪽 · 별도 kernel</strong></p>
<p>연산마다 Load·Store가 반복</p>
<p><strong>오른쪽 · Fused kernel</strong></p>
<p>입력 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="bold">q</mi><mo separator="true">,</mo><mi mathvariant="bold">k</mi><mo separator="true">,</mo><mi mathvariant="bold">v</mi></mrow><annotation encoding="application/x-tex">\mathbf{q},\mathbf{k},\mathbf{v}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathbf">q</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathbf">k</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathbf" style="margin-right:0.016em;">v</span></span></span></span>를 읽고
최종 출력 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="bold">o</mi></mrow><annotation encoding="application/x-tex">\mathbf{o}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4444em;"></span><span class="mord mathbf">o</span></span></span></span>를 저장</p>
<p>중간값은 kernel 안에서 이어 사용</p>
</section></aside><nav class="inference-controls" aria-label="그림 설명 단계"><button type="button" data-inference-prev>← 이전 설명</button><div><button type="button" data-inference-go="0" aria-pressed="true">1</button><button type="button" data-inference-go="1" aria-pressed="false">2</button></div><span class="inference-counter"></span><button type="button" data-inference-next>다음 설명 →</button></nav></div></div><div class="takeaway">CUDA Graph는 호출 부담을, Kernel Fusion은 연산 사이의 메모리 이동을 줄인다.</div><footer class="seminar-footer"><span class="source">Sec.5.2 · Fig.10 · PDF pp.16–17; App.F Table7 · PDF p.47</span><span class="slide-id">P038 · 028/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P109 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P109"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Evaluation and Analysis</h1><p class="slide-lead">시뮬레이션과 실제 로봇에서의 조작 성능</p></header><div class="seminar-body section-title"><div class="body-main"><div class="section-title-page" aria-hidden="true"></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · 섹션 구분</span><span class="slide-id">P109 · 029/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P040 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P040"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>시뮬레이션 벤치마크</h1><p class="slide-lead">탁자 조작부터 복잡한 주방 작업까지, 서로 다른 환경에서 비교한다.</p></header><div class="seminar-body figure balanced"><figure class="paper-figure"><img src="/figures/fig-11.png" alt="Figure 11 · 평가 환경: 단일 팔·양팔 휴머노이드·주방 조작" loading="eager"><figcaption>Figure 11 · 평가 환경: 단일 팔·양팔 휴머노이드·주방 조작</figcaption></figure><div class="body-main"><h3>기본 조작과 환경 변화</h3>
<p><strong>LIBERO·LIBERO-Plus·SIMPLER</strong></p>
<h3>주방·양팔·복합 절차</h3>
<p><strong>RoboCasa Kitchen·GR-1·RoboCasa365</strong></p>
</div></div><div class="takeaway">각 benchmark의 데이터로 fine-tuning한 뒤 조작 성공률을 비교한다.</div><footer class="seminar-footer"><span class="source">Sec.6.1 · Fig.11 · PDF pp.17–19</span><span class="slide-id">P040 · 030/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P022 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P022"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>Simulation 결과 (a)</h1><p class="slide-lead">기본 조작·환경 변화 대응 벤치마크 · Δ는 각 평가의 기존 최고값과의 차이(%p)</p></header><div class="seminar-body full"><div class="body-main"><table class="table-one" aria-label="Table 1(a) 전체 성공률과 최강 baseline 대비 차이"><colgroup><col style="width:25%"><col span="7" style="width:10.7142857%"></colgroup><thead><tr><th scope="col">평가</th><th scope="col">π0-FAST</th><th scope="col">π0</th><th scope="col">π0.5</th><th scope="col">GR00T<br>N1.5</th><th scope="col">GR00T<br>N1.6</th><th scope="col">RLDX-1</th><th scope="col">Δ (%p)</th></tr></thead><tbody>
<tr data-benchmark="LIBERO · Short"><th scope="row">LIBERO · Short</th><td>93.9</td><td>97.1</td><td class="best-baseline">98.0</td><td>90.0</td><td>97.4</td><td class="ours">98.6</td><td class="delta">+0.6</td></tr>
<tr data-benchmark="LIBERO · Long"><th scope="row">LIBERO · Long</th><td>60.2</td><td>85.2</td><td>92.0</td><td>76.0</td><td class="best-baseline">94.4</td><td class="ours">95.3</td><td class="delta">+0.9</td></tr>
<tr data-benchmark="LIBERO · Avg."><th scope="row">LIBERO · Avg.</th><td>85.5</td><td>94.1</td><td class="best-baseline">96.9</td><td>86.5</td><td>96.7</td><td class="ours">97.8</td><td class="delta">+0.9</td></tr>
<tr class="group-start" data-benchmark="LIBERO-Plus"><th scope="row">LIBERO-Plus</th><td>64.2</td><td>54.6</td><td class="best-baseline">86.5</td><td>66.3</td><td>72.6</td><td class="ours">86.7</td><td class="delta">+0.2</td></tr>
<tr class="group-start" data-benchmark="SIMPLER Google-VM"><th scope="row">SIMPLER Google-VM</th><td>61.9</td><td>58.8</td><td>72.7</td><td>52.4</td><td class="best-baseline">76.1</td><td class="ours">81.5</td><td class="delta">+5.4</td></tr>
<tr data-benchmark="SIMPLER Google-VA"><th scope="row">SIMPLER Google-VA</th><td>59.0</td><td>54.8</td><td class="best-baseline">68.4</td><td>43.7</td><td>57.1</td><td class="ours">77.4</td><td class="delta">+9.0</td></tr>
<tr data-benchmark="SIMPLER WidowX"><th scope="row">SIMPLER WidowX</th><td>48.3</td><td>27.1</td><td>46.9</td><td class="best-baseline">62.0</td><td>57.1</td><td class="ours">71.9</td><td class="delta">+9.9</td></tr>
</tbody></table></div></div><div class="takeaway">LIBERO는 근소한 차이 · SIMPLER는 +5.4~9.9%p · 여러 평가에서 고르게 비교 모델 대비 우세</div><footer class="seminar-footer"><span class="source">Table 1(a) · PDF p.18; 원문 표를 전치하고 보고값으로 Δ 계산</span><span class="slide-id">P022 · 031/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P095 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P095"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>Simulation 결과 (b)</h1><p class="slide-lead">어려운 조작·복합 작업 벤치마크 · 성공률(%) · S: Seen / U: Unseen</p></header><div class="seminar-body full"><div class="body-main"><table class="table-one" aria-label="Table 1(b) 전체 성공률과 최강 baseline 대비 차이"><colgroup><col style="width:25%"><col span="7" style="width:10.7142857%"></colgroup><thead><tr><th scope="col">평가</th><th scope="col">π0-FAST</th><th scope="col">π0</th><th scope="col">π0.5</th><th scope="col">GR00T<br>N1.5</th><th scope="col">GR00T<br>N1.6</th><th scope="col">RLDX-1</th><th scope="col">Δ (%p)</th></tr></thead><tbody>
<tr data-benchmark="RoboCasa Kitchen"><th scope="row">RoboCasa Kitchen</th><td>63.6</td><td>62.5</td><td>62.1</td><td>65.7</td><td class="best-baseline">66.2</td><td class="ours">70.6</td><td class="delta">+4.4</td></tr>
<tr data-benchmark="GR-1 Tabletop"><th scope="row">GR-1 Tabletop</th><td>—</td><td>13.6</td><td>15.4</td><td class="best-baseline">48.0</td><td>47.6</td><td class="ours">58.7</td><td class="delta">+10.7</td></tr>
<tr class="group-start" data-benchmark="RC365 · Atomic-S"><th scope="row">RC365 · Atomic-S</th><td>51.7</td><td>34.6</td><td>39.6</td><td>43.0</td><td class="best-baseline">61.1</td><td class="ours">67.3</td><td class="delta">+6.2</td></tr>
<tr data-benchmark="RC365 · Comp.-S"><th scope="row">RC365 · Comp.-S</th><td>8.0</td><td>6.1</td><td>7.1</td><td>9.6</td><td class="best-baseline">12.6</td><td class="ours">19.0</td><td class="delta">+6.4</td></tr>
<tr data-benchmark="RC365 · Comp.-U"><th scope="row">RC365 · Comp.-U</th><td>1.8</td><td>1.1</td><td>1.2</td><td class="best-baseline">4.4</td><td>2.6</td><td class="ours">5.6</td><td class="delta">+1.2</td></tr>
<tr data-benchmark="RC365 · Avg."><th scope="row">RC365 · Avg.</th><td>21.7</td><td>14.8</td><td>16.9</td><td>20.0</td><td class="best-baseline">26.9</td><td class="ours">32.1</td><td class="delta">+5.2</td></tr>
</tbody></table></div></div><div class="takeaway">복합 작업은 기존 모델보다 개선됐지만, 성공률은 여전히 19.0%·5.6%에 머문다.</div><footer class="seminar-footer"><span class="source">Table 1(b) · PDF p.18; 원문 표를 전치하고 보고값으로 Δ 계산</span><span class="slide-id">P095 · 032/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P023 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P023"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>OpenArm · 지시와 새 조건</h1><p class="slide-lead">지시한 물체·위치 · 새 개체와 작업 조합</p></header><div class="seminar-body evidence-pair"><div class="body-main"><div class="evidence-visuals"><figure class="paper-figure"><img src="/figures/fig-13.png" alt="평가 과제 사진"><figcaption>지시한 물체·위치 · 새 개체와 작업 조합</figcaption></figure><figure class="paper-figure"><img src="/figures/fig-14.png" alt="원문 결과 그래프"><figcaption>위치 지시 68.8–70.8% · 새 개체·새 작업 각54.2% · Grounding 87.5%</figcaption></figure></div></div></div><div class="takeaway">최고 baseline 대비 · 선반 +14.6%p · 식기대 +12.5%p</div><footer class="seminar-footer"><span class="source">Sec.6.2 · Figs.13–14 · PDF pp.19–20</span><span class="slide-id">P023 · 033/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P024 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P024"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>ALLEX · 움직임·기억·접촉</h1><p class="slide-lead">컨베이어 → 움직임 · 숨긴 상자 → 기억 · 카드·따르기 → 접촉</p></header><div class="seminar-body evidence-pair"><div class="body-main"><div class="evidence-visuals"><figure class="paper-figure"><img src="/figures/fig-15.png" alt="평가 과제 사진"><figcaption>컨베이어 → 움직임 · 숨긴 상자 → 기억 · 카드·따르기 → 접촉</figcaption></figure><figure class="paper-figure"><img src="/figures/fig-16.png" alt="원문 결과 그래프"><figcaption>Conveyor 87.5% · Box 91.7% 성공률 / Card 97.2 · Pouring 70.8 진행 점수</figcaption></figure></div></div></div><div class="takeaway">최고 baseline → RLDX-1 · Conveyor 50.0→87.5% · Box 33.3→91.7%</div><footer class="seminar-footer"><span class="source">Sec.6.3 · Figs.15–16 · PDF pp.21–22</span><span class="slide-id">P024 · 034/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P025 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P025"><header class="seminar-header"><div class="chapter-label">Evaluation and Analysis</div><h1>Franka · 성과와 남은 어려움</h1><p class="slide-lead">움직임·기억·접촉 · 쉬운 과제와 어려운 과제의 차이</p></header><div class="seminar-body evidence-pair"><div class="body-main"><div class="evidence-visuals"><figure class="paper-figure"><img src="/figures/fig-17.png" alt="평가 과제 사진"><figcaption>움직임·기억·접촉 · 쉬운 과제와 어려운 과제의 차이</figcaption></figure><figure class="paper-figure"><img src="/figures/fig-18.png" alt="원문 결과 그래프"><figcaption>Spin 97.9% · Shell 91.7% / 컵 교체45.8% · 플러그 삽입33.3%</figcaption></figure></div></div></div><div class="takeaway">평균 · π0.5 34.4% / GR00T N1.6 31.6% → RLDX-1 68.5%</div><footer class="seminar-footer"><span class="source">Sec.6.4 · Figs.17–18 · PDF pp.23–24; Q13</span><span class="slide-id">P025 · 035/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P110 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P110"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Ablation and Analysis</h1><p class="slide-lead">어떤 설계와 학습이 성능에 기여했는가</p></header><div class="seminar-body section-title"><div class="body-main"><div class="section-title-page" aria-hidden="true"></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · 섹션 구분</span><span class="slide-id">P110 · 036/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P060 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P060"><header class="seminar-header"><div class="chapter-label">Ablation and Analysis</div><h1>VLM 특징과 로봇 VQA</h1><p class="slide-lead">어느 층의 특징을 쓸지, 로봇 VQA로 학습할지가 조작 성능에 영향을 준다.</p></header><div class="seminar-body split"><div class="body-main"><h3>특징 추출 층 · Table 2(a)</h3>
<table>
<thead>
<tr>
<th>층</th>
<th>조작 성공률</th>
</tr>
</thead>
<tbody>
<tr>
<td>8층</td>
<td>51.1%</td>
</tr>
<tr>
<td><strong>18층</strong></td>
<td><strong>60.9%</strong></td>
</tr>
<tr>
<td>28층</td>
<td>56.3%</td>
</tr>
</tbody>
</table>
<div class="feature-intuition"><span><strong>시각 정보</strong><br>대상이 어디에?</span><b>＋</b><span><strong>의미 정보</strong><br>무엇을 해야?</span></div>
<p class="mini">저자 해석: 중간층에서 두 정보의 균형.</p></div><div class="body-aside"><h3>로봇 VQA · Table 2(b)</h3>
<table>
<thead>
<tr>
<th>VLM</th>
<th>조작 성공률</th>
</tr>
</thead>
<tbody>
<tr>
<td>Qwen3-VL 8B</td>
<td>57.5%</td>
</tr>
<tr>
<td><strong>RLDX-1-VLM</strong></td>
<td><strong>60.9%</strong></td>
</tr>
</tbody>
</table>
<p>손·물체·작업 관계를 학습한 뒤 <strong>+3.4%p</strong>.</p>
</div></div><div class="takeaway">중간층: 시각·의미 정보의 균형(저자 해석) / 로봇 VQA: 조작 성공률 +3.4%p</div><footer class="seminar-footer"><span class="source">RoboCasa Kitchen · base architecture · Table 2(a)/(b) · PDF pp.24–25</span><span class="slide-id">P060 · 037/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P062 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P062"><header class="seminar-header"><div class="chapter-label">Ablation and Analysis</div><h1>VQA 전후의 Attention</h1><p class="slide-lead">로봇 VQA 학습 후, 로봇과 조작 대상 쪽으로 attention이 모인다.</p></header><div class="seminar-body figure"><figure class="paper-figure"><img src="/figures/fig-19.png" alt="Figure 19 · 마지막 prompt token에서 image patch로 향하는 attention" loading="eager"><figcaption>Figure 19 · 마지막 prompt token에서 image patch로 향하는 attention</figcaption></figure><div class="body-main"><h3>위 · 입력 영상</h3>
<h3>가운데 · Qwen3-VL 8B</h3>
<h3>아래 · RLDX-1-VLM</h3>
<p><strong>따뜻한 색 → 높은 attention</strong></p>
<p>로봇과 대상 물체를 더 집중해서 참고한다.</p>
</div></div><div class="takeaway">성공률 비교를 보조하는 정성적 시각화 · Figure 19</div><footer class="seminar-footer"><span class="source">Sec.6.5 · Figure 19 · PDF p.25</span><span class="slide-id">P062 · 038/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P064 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P064"><header class="seminar-header"><div class="chapter-label">Ablation and Analysis</div><h1>합성 데이터의 성능 효과</h1><p class="slide-lead">실제 데이터는 고정하고, 사용할 수 있는 합성 데이터의 양을 늘려 비교한다.</p></header><div class="seminar-body split"><div class="body-main"><h3>GR-1 Tabletop · Table 3</h3>
<table>
<thead>
<tr>
<th>합성 pool</th>
<th>평균 성공률</th>
<th>실제만 대비</th>
</tr>
</thead>
<tbody>
<tr>
<td>0%</td>
<td>41.0%</td>
<td>기준</td>
</tr>
<tr>
<td>25%</td>
<td>45.6%</td>
<td>+4.6%p</td>
</tr>
<tr>
<td>50%</td>
<td>46.6%</td>
<td>+5.6%p</td>
</tr>
<tr>
<td><strong>100%</strong></td>
<td><strong>50.1%</strong></td>
<td><strong>+9.1%p</strong></td>
</tr>
</tbody>
</table>
<p>합성이 있는 세 조건에서는 실제:합성 sampling이 모두 1:1이다. <strong>더 큰 합성 pool의 이득</strong>으로 읽는다.</p>
</div><div class="body-aside"><h3>합성 데이터의 양만 변화</h3>
<p>25% → 50% → 100%</p>
<p>합성을 사용하는 세 조건은
<strong>실제 : 합성 sampling = 1 : 1</strong></p>
<p>41.0% → <strong>50.1% · +9.1%p</strong></p>
</div></div><div class="takeaway">GR-1 Tabletop · 더 다양한 합성 경험으로 실제 시연을 보완했다.</div><footer class="seminar-footer"><span class="source">Sec.6.5 · Table 3 · PDF p.25; 질문노트 Q2·Q8</span><span class="slide-id">P064 · 039/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P066 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P066"><header class="seminar-header"><div class="chapter-label">Ablation and Analysis</div><h1>RECAP · 전구 비틀기 개선</h1><p class="slide-lead">전구 비틀기 · BC → RECAP 1 → 2 → 3</p></header><div class="seminar-body evidence-pair"><div class="body-main"><div class="evidence-visuals"><figure class="paper-figure"><img src="/figures/fig-20.png" alt="평가 과제 사진"><figcaption>전구 비틀기 · BC → RECAP 1 → 2 → 3</figcaption></figure><figure class="paper-figure"><img src="/figures/fig-21.png" alt="원문 결과 그래프"><figcaption>완료 frames 1056 ± 326 → 353 ± 22 / 비틀기12.7 ± 3.0 → 4.1 ± 0.3</figcaption></figure></div></div></div><div class="takeaway">RECAP 반복 뒤 더 적은 시간·비틀기로, 더 일정하게 작업을 완료했다.</div><footer class="seminar-footer"><span class="source">Sec.6.5 · Figure 21 · PDF p.26</span><span class="slide-id">P066 · 040/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P068 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P068"><header class="seminar-header"><div class="chapter-label">Ablation and Analysis</div><h1>추론 최적화의 효과</h1><p class="slide-lead">같은 입력·장비에서 실행 방식을 바꿔, 71.2ms → 43.7ms로 줄였다.</p></header><div class="seminar-body full"><div class="body-main"><table>
<thead>
<tr>
<th>추론 stack</th>
<th>Physics·memory 제외</th>
<th>All-modality</th>
</tr>
</thead>
<tbody>
<tr>
<td>PyTorch Eager</td>
<td>67.0ms · 기준</td>
<td>71.2ms · 기준</td>
</tr>
<tr>
<td>CUDA Graph + Torch Compile</td>
<td>56.9ms · 1.18×</td>
<td>59.6ms · 1.19×</td>
</tr>
<tr>
<td>+ Static Graph Conversion</td>
<td>46.2ms · 1.45×</td>
<td>48.9ms · 1.46×</td>
</tr>
<tr>
<td>+ Kernel Optimization</td>
<td><strong>41.6ms · 1.61×</strong></td>
<td><strong>43.7ms · 1.63×</strong></td>
</tr>
</tbody>
</table>
<p class="mini">RTX5090 · ALLEX 두 카메라/4프레임 · horizon40 · Euler4회 · policy 추론 p50</p>
<div class="flow">
<div class="node"><strong>Graph + Compile</strong><br>11.6ms 감소</div>
<div class="node"><strong>+ Static</strong><br>10.7ms 추가 감소</div>
<div class="node"><strong>+ Kernel</strong><br>5.2ms 추가 감소</div>
</div></div></div><div class="takeaway">All-modality · 71.2ms → 43.7ms · policy 추론 중앙값 약38.6% 감소</div><footer class="seminar-footer"><span class="source">Sec.6.5 · Table 4 · PDF p.26; 감소 시간은 원문 수치의 차이로 계산</span><span class="slide-id">P068 · 041/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P111 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P111"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>My opinions and limitation</h1><p class="slide-lead">복잡한 조작과 반복 생성의 계산 비용</p></header><div class="seminar-body section-title"><div class="body-main"><div class="section-title-page" aria-hidden="true"></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · 섹션 구분</span><span class="slide-id">P111 · 042/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P028 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P028"><header class="seminar-header"><div class="chapter-label">My opinions and limitation</div><h1>나의 의견: 복잡한 조작</h1><p class="slide-lead">필요한 기능을 폭넓게 연결했지만, 복잡한 절차와 정밀 조작은 여전히 어렵다.</p></header><div class="seminar-body split"><div class="body-main"><div class="flow"><div class="node"><strong>움직임</strong><br>변화 읽기</div><div class="node"><strong>기억</strong><br>앞선 상황 유지</div><div class="node"><strong>물리 센싱</strong><br>접촉 상태 파악</div></div>
<p class="callout">이 정보들을 행동에 연결하는 설계는 유용하다. 하지만 복잡한 작업을 안정적으로 끝내는 능력까지 해결되지는 않았다.</p></div><div class="body-aside"><h3>결과에 남은 어려움</h3>
<p><strong>RC365 복합 과제</strong></p>
<p>배운 절차 19.0% · 새로운 절차 5.6%</p>
<p><strong>Franka 실제 조작</strong></p>
<p>컵 교체 45.8% · 플러그 삽입 33.3%</p>
</div></div><div class="takeaway">나의 의견: 기능 확장과 함께, 복잡한 작업을 끝까지 안정적으로 수행하는 능력을 높여야 한다.</div><footer class="seminar-footer"><span class="source">발표자의 의견 · Table 1(b) PDF p.18 · Fig.18 PDF p.24</span><span class="slide-id">P028 · 043/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P030 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P030"><header class="seminar-header"><div class="chapter-label">My opinions and limitation</div><h1>나의 의견: 반복 생성의 비용</h1><p class="slide-lead">Diffusion·flow matching처럼 후보를 여러 번 다듬는 정책은 반복 계산의 비용을 안고 간다.</p></header><div class="seminar-body full"><div class="body-main"><div class="flow ordered-flow"><div class="node"><strong>노이즈 후보</strong><br>생성의 출발점</div><div class="node"><strong>반복 갱신</strong><br>예측 → 갱신 → …</div><div class="node"><strong>행동 묶음</strong><br>실행할 결과</div></div>
<h3>로봇은 계산 중에도 움직이는 환경을 만난다</h3>
<p>반복 계산이 길어지면 <strong>새 관측에 반응하기까지의 지연</strong>이 부담이 된다.</p>
<p><strong>RLDX-1의 최적화:</strong> 71.2ms → <strong>43.7ms</strong> · 지연 약 38.6% 감소</p>
<p class="mini">Table 4: RTX 5090·ALLEX 입력·Euler 4 steps·policy 지연 p50. 카메라부터 모터까지의 전체 지연은 아니다.</p></div></div><div class="takeaway">나의 의견: 반복 denoising 정책을 쓰는 RFM에서는 생성 품질과 반응 속도를 함께 설계하고 최적화해야 한다.</div><footer class="seminar-footer"><span class="source">발표자의 의견 · Sec.2.2 PDF pp.8–9 · Sec.5 PDF pp.15–17 · Table 4 PDF p.26</span><span class="slide-id">P030 · 044/45</span></footer></section>

---
layout: none
---

<!-- slide-id: P100 | revision: v42 | status: draft -->

<section class="seminar-slide" data-slide-id="P100"><header class="seminar-header"><div class="chapter-label">Seminar</div><h1>Q&amp;A</h1><p class="slide-lead">Part 2 · 추론·실험·분석</p></header><div class="seminar-body boundary"><div class="body-main"><div class="part-boundary-visual"><p>발표를 마칩니다.<br>질문과 토론을 이어가겠습니다.</p><div><a href="#S001">전체 목차</a><a href="#P099">Part 2 처음으로</a></div></div></div></div><div class="takeaway"></div><footer class="seminar-footer"><span class="source">세미나 구성 · Q&amp;A</span><span class="slide-id">P100 · 045/45</span></footer></section>
