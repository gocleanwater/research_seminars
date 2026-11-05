// No CDN, analytics, or network requests. The deck works from file://.
const pages = [...document.querySelectorAll('.deck-page')];
const toc = document.querySelector('#toc');
const notes = document.querySelector('#notes');
const imageDialog = document.querySelector('#image-dialog');
let current = 0;
const explorer = document.querySelector('.architecture-explorer');
let tourIndex = 0;
function renderTour(index) {
  if (!explorer) return;
  tourIndex = Math.max(0, Math.min(ARCH_TOUR.states.length - 1, index));
  const state = ARCH_TOUR.states[tourIndex];
  explorer.dataset.scene = state.scene;
  explorer.dataset.step = state.step;
  explorer.dataset.state = tourIndex;
  const slide = explorer.closest('.seminar-slide');
  slide.querySelector('h1').textContent = state.title;
  slide.querySelector('.slide-lead').textContent = state.lead;
  slide.querySelector('.takeaway').textContent = state.takeaway;
  const [x, y, w, h] = state.box;
  const scale = Math.min(740 / w, 390 / h);
  const tx = (740 - w * scale) / 2 - x * scale;
  const ty = (390 - h * scale) / 2 - y * scale;
  explorer.querySelector('.arch-source-image').style.clipPath = `inset(${y}px ${ARCH_TOUR.width - x - w}px ${ARCH_TOUR.height - y - h}px ${x}px)`;
  explorer.querySelector('.arch-camera').style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
  const aside = explorer.querySelector('.arch-annotations');
  const paths = explorer.querySelector('.arch-paths');
  aside.replaceChildren(); paths.replaceChildren();
  const annotations = (ARCH_TOUR.annotations[state.scene] || []).slice(0, state.step);
  if (!annotations.length) {
    const intro = document.createElement('div'); intro.className = 'arch-intro';
    const title = document.createElement('h3'); title.textContent = state.scene === 'overview' ? 'Figure 3' : state.title;
    const text = document.createElement('p'); text.textContent = state.note || '';
    const hint = document.createElement('small'); hint.textContent = '그림의 영역 클릭 · 다음 설명 · 오른쪽 방향키';
    intro.append(title, text, hint); aside.append(intro);
  }
  annotations.forEach(note => {
    const item = document.createElement('div'); item.className = 'arch-annotation'; item.style.top = `${note.y}px`;
    const title = document.createElement('h3'); title.textContent = note.title;
    const text = document.createElement('p'); text.textContent = note.text;
    item.append(title, text); aside.append(item);
    const px = tx + note.point[0] * scale, py = ty + note.point[1] * scale;
    const endX = 762, endY = note.y + 18;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${px} ${py} C ${Math.max(px + 50, 650)} ${py}, 700 ${endY}, ${endX} ${endY}`);
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', px); dot.setAttribute('cy', py); dot.setAttribute('r', 4);
    paths.append(path, dot);
  });
  explorer.querySelector('.arch-step-counter').textContent = `${tourIndex + 1} / ${ARCH_TOUR.states.length}`;
  explorer.querySelector('[data-arch-next]').textContent = tourIndex === ARCH_TOUR.states.length - 1 ? '다음 장 →' : '다음 설명 →';
}
function inTour() { return pages[current]?.contains(explorer); }
function advance() { if (inTour() && tourIndex < ARCH_TOUR.states.length - 1) renderTour(tourIndex + 1); else show(current + 1); }
function retreat() { if (inTour() && tourIndex > 0) renderTour(tourIndex - 1); else show(current - 1); }
explorer?.querySelectorAll('[data-arch-focus]').forEach(button => button.onclick = () => renderTour(button.dataset.archFocus === 'vision' ? 1 : 7));
explorer?.querySelector('[data-arch-reset]').addEventListener('click', () => renderTour(0));
explorer?.querySelector('[data-arch-next]').addEventListener('click', advance);
explorer?.querySelector('[data-arch-prev]').addEventListener('click', retreat);
const exportMode = new URLSearchParams(location.search).has('export');
if (exportMode) document.body.dataset.export = 'true';
function fit() {
  const scale = Math.min(innerWidth / 1280, (innerHeight - (exportMode ? 0 : 62)) / 720);
  document.querySelector('#stage').style.transform = `translate(-50%, -50%) scale(${scale})`;
  document.querySelector('#stage').style.marginTop = exportMode ? '0' : '-24px';
}
function hydrate(index) {
  pages[index].querySelectorAll('img[data-asset]').forEach(im => {
    if (!im.src) im.src = ASSETS[im.dataset.asset];
  });
}
function show(index, updateHash = true) {
  current = Math.max(0, Math.min(pages.length - 1, index));
  pages.forEach((p, i) => { p.classList.toggle('active', i === current); p.setAttribute('aria-hidden', String(i !== current)); });
  if (inTour()) renderTour(0);
  hydrate(current);
  if (current + 1 < pages.length) hydrate(current + 1);
  document.querySelector('#counter').textContent = `${current + 1} / ${pages.length} · ${DECK[current].id}`;
  document.title = `${DECK[current].id} · ${DECK[current].title} · RLDX-1`;
  document.querySelector('#prev').disabled = current === 0;
  document.querySelector('#next').disabled = current === pages.length - 1;
  if (updateHash) history.replaceState(null, '', `#${DECK[current].id}`);
}
function openNotes() {
  document.querySelector('#notes-title').textContent = `${DECK[current].id} · ${DECK[current].title}`;
  const content = document.querySelector('#notes-text');
  content.innerHTML = DECK[current].notesHtml || '';
  content.querySelectorAll('img[data-asset]').forEach(im => im.src = ASSETS[im.dataset.asset]);
  content.querySelectorAll('figure img').forEach(im => im.onclick = () => {
    imageDialog.querySelector('img').src = im.src;
    imageDialog.querySelector('img').alt = im.alt;
    imageDialog.showModal();
  });
  notes.showModal();
}
document.querySelector('#prev').onclick = retreat;
document.querySelector('#next').onclick = advance;
document.querySelector('#open-toc').onclick = () => { toc.showModal(); document.querySelector('#toc-search').focus(); };
document.querySelector('#open-notes').onclick = openNotes;
document.querySelector('#fullscreen').onclick = () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.(); };
document.querySelectorAll('dialog .dialog-close').forEach(button => button.onclick = () => button.closest('dialog').close());
document.querySelectorAll('.toc-entry').forEach(a => a.onclick = event => { event.preventDefault(); show(Number(a.dataset.index)); toc.close(); });
document.querySelector('#toc-search').oninput = event => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll('.toc-entry').forEach(a => a.style.display = a.dataset.search.toLowerCase().includes(query) ? '' : 'none');
};
document.querySelectorAll('.paper-figure img, .cover-system img').forEach(im => im.onclick = () => {
  imageDialog.querySelector('img').src = im.src;
  imageDialog.querySelector('img').alt = im.alt;
  imageDialog.showModal();
});
document.addEventListener('keydown', event => {
  if (document.querySelector('dialog[open]') || /INPUT|TEXTAREA/.test(event.target.tagName)) return;
  if (event.key === ' ' && event.target.tagName === 'BUTTON') return;
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); advance(); }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); retreat(); }
  if (event.key === 'Escape' && inTour()) renderTour(0);
  if (event.key === 'Home') show(0);
  if (event.key === 'End') show(pages.length - 1);
  if (event.key.toLowerCase() === 'g') document.querySelector('#open-toc').click();
  if (event.key.toLowerCase() === 'n') openNotes();
  if (event.key.toLowerCase() === 'f') document.querySelector('#fullscreen').click();
});
addEventListener('hashchange', () => { const i = DECK.findIndex(s => s.id === location.hash.slice(1)); if (i >= 0) show(i, false); });
addEventListener('resize', fit);
addEventListener('beforeprint', () => pages.forEach((_, i) => hydrate(i)));
window.deckShow = show;
window.deckData = DECK;
fit();
const initial = DECK.findIndex(s => s.id === location.hash.slice(1));
show(initial >= 0 ? initial : 0);
