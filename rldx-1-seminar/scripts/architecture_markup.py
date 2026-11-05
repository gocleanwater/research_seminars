"""Markup for a single, stateful walkthrough of the original Figure 3."""
def architecture_markup():
    return '''<div class="architecture-explorer" data-scene="overview" data-step="0" data-state="0">
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
</div>'''
