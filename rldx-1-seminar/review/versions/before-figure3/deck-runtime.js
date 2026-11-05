// No CDN, analytics, or network requests. The deck works from file://.
const pages = [...document.querySelectorAll('.deck-page')];
const toc = document.querySelector('#toc');
const notes = document.querySelector('#notes');
const imageDialog = document.querySelector('#image-dialog');
let current = 0;
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
document.querySelector('#prev').onclick = () => show(current - 1);
document.querySelector('#next').onclick = () => show(current + 1);
document.querySelector('#open-toc').onclick = () => { toc.showModal(); document.querySelector('#toc-search').focus(); };
document.querySelector('#open-notes').onclick = openNotes;
document.querySelector('#fullscreen').onclick = () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.(); };
document.querySelectorAll('dialog .dialog-close').forEach(button => button.onclick = () => button.closest('dialog').close());
document.querySelectorAll('.toc-entry').forEach(a => a.onclick = event => { event.preventDefault(); show(Number(a.dataset.index)); toc.close(); });
document.querySelector('#toc-search').oninput = event => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll('.toc-entry').forEach(a => a.style.display = a.dataset.search.toLowerCase().includes(query) ? '' : 'none');
};
document.querySelectorAll('.paper-figure img, .cover-robot img').forEach(im => im.onclick = () => {
  imageDialog.querySelector('img').src = im.src;
  imageDialog.querySelector('img').alt = im.alt;
  imageDialog.showModal();
});
document.addEventListener('keydown', event => {
  if (document.querySelector('dialog[open]') || /INPUT|TEXTAREA/.test(event.target.tagName)) return;
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); show(current + 1); }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); show(current - 1); }
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
