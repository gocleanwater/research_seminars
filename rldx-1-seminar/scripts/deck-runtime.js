// No CDN, analytics, or network requests. The deck works from file://.
const pages = [...document.querySelectorAll('.deck-page')];
const toc = document.querySelector('#toc');
const notes = document.querySelector('#notes');
const imageDialog = document.querySelector('#image-dialog');
let current = 0;
const explorer = document.querySelector('.architecture-explorer');
const recapExplorer = document.querySelector('.recap-explorer');
const recapPanels = [...(recapExplorer?.querySelectorAll('[data-recap-panel]') || [])];
let recapIndex = 0;
function inRecap() { return !!recapExplorer && pages[current]?.contains(recapExplorer); }
function renderRecap(index) {
  if (!recapExplorer) return;
  recapIndex = Math.max(0, Math.min(recapPanels.length - 1,index));
  const panel = recapPanels[recapIndex];
  recapExplorer.dataset.state = recapIndex;
  recapPanels.forEach((p,i)=>p.hidden=i!==recapIndex);
  const [x,y,w,h] = JSON.parse(panel.dataset.box);
  const scale = Math.min(736/w,360/h,2);
  recapExplorer.querySelector('.recap-camera').style.transform = `translate(${(740-w*scale)/2-x*scale}px,${(365-h*scale)/2-y*scale}px) scale(${scale})`;
  const image = recapExplorer.querySelector('.recap-source-image');
  const crop = JSON.parse(panel.dataset.crop);
  image.style.clipPath = !crop ? 'none' : Array.isArray(crop[0]) ? `polygon(${crop.map(([a,b])=>`${a}px ${b}px`).join(',')})` : `inset(${crop[1]}px ${1497-crop[0]-crop[2]}px ${631-crop[1]-crop[3]}px ${crop[0]}px)`;
  const mark = recapExplorer.querySelector('.recap-mark rect');
  const box = JSON.parse(panel.dataset.highlight);
  mark.toggleAttribute('hidden',!box);
  if(box) ['x','y','width','height'].forEach((key,i)=>mark.setAttribute(key,box[i]));
  const slide = recapExplorer.closest('.seminar-slide');
  slide.querySelector('.slide-lead').textContent = panel.dataset.lead;
  slide.querySelector('.takeaway').textContent = panel.dataset.takeaway;
  recapExplorer.querySelector('.recap-counter').textContent = `${recapIndex+1} / ${recapPanels.length}`;
  recapExplorer.querySelector('[data-recap-next]').textContent = recapIndex===recapPanels.length-1 ? '다음 장 →' : '다음 설명 →';
  recapExplorer.querySelectorAll('.recap-modes [data-recap-go]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.recapGo)===recapIndex)));
  const wholeFigure = recapIndex===0 || recapIndex===recapPanels.length-1;
  const hotspotHadFocus = document.activeElement?.classList.contains('recap-hotspot');
  recapExplorer.querySelectorAll('.recap-hotspot').forEach(button=>{button.hidden=!wholeFigure;button.tabIndex=wholeFigure?0:-1;});
  if (!wholeFigure && hotspotHadFocus) recapExplorer.querySelector(`.recap-modes [data-recap-go="${recapIndex}"]`).focus({preventScroll:true});
  const viewport = recapExplorer.querySelector('.recap-viewport');
  viewport.scrollLeft=0;viewport.scrollTop=0;
}

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
  slide.dataset.defaultSource ||= slide.querySelector('.source').textContent;
  slide.querySelector('.source').textContent = state.source || slide.dataset.defaultSource;
  const panel = explorer.querySelector('.arch-detail-panel');
  explorer.classList.toggle('has-detail', !!state.panel_id);
  panel.hidden = !state.panel_id;
  explorer.querySelector('.arch-step-counter').textContent = `${tourIndex + 1} / ${ARCH_TOUR.states.length}`;
  explorer.querySelector('[data-arch-next]').textContent = tourIndex === ARCH_TOUR.states.length - 1 ? '다음 장 →' : '다음 설명 →';
  if (state.panel_id) {
    explorer.querySelector('.arch-paths').replaceChildren();
    explorer.querySelector('.arch-picture-marks').replaceChildren();
    explorer.querySelector('.arch-annotations').replaceChildren();
    panel.querySelector('.arch-detail-content').innerHTML = ARCH_TOUR.panels[state.panel_id].html;
    panel.querySelector('.arch-detail-module').textContent = {vlm:'VLM · 영상과 언어',msat:'MSAT · 행동 생성'}[state.scene] || state.scene;
    const map = panel.querySelector('.arch-detail-map');
    map.replaceChildren();
    const source = explorer.querySelector('.arch-source-image');
    const image = new Image(); image.src = source.src;
    image.alt = `원문 Figure 3의 ${state.scene} 영역`;
    const [x,y,w,h] = state.box, scale = Math.min(330/w,280/h);
    image.style.transform = `translate(${(330-w*scale)/2-x*scale}px,${(280-h*scale)/2-y*scale}px) scale(${scale})`;
    const [cx,cy,cw,ch] = state.crop || state.box;
    image.style.clipPath = state.clip ? `polygon(${state.clip.map(([px,py])=>`${px}px ${py}px`).join(',')})` : `inset(${cy}px ${ARCH_TOUR.width-cx-cw}px ${ARCH_TOUR.height-cy-ch}px ${cx}px)`;
    map.append(image);
    return;
  }
  const [x, y, w, h] = state.box;
  const scale = Math.min(740 / w, 390 / h);
  const tx = (740 - w * scale) / 2 - x * scale;
  const ty = (390 - h * scale) / 2 - y * scale;
  const [cx,cy,cw,ch] = state.crop || state.box;
  explorer.querySelector('.arch-source-image').style.clipPath = state.clip ? `polygon(${state.clip.map(([px,py])=>`${px}px ${py}px`).join(',')})` : `inset(${cy}px ${ARCH_TOUR.width - cx - cw}px ${ARCH_TOUR.height - cy - ch}px ${cx}px)`;
  explorer.querySelector('.arch-camera').style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
  const aside = explorer.querySelector('.arch-annotations');
  const paths = explorer.querySelector('.arch-paths');
  aside.replaceChildren(); paths.replaceChildren();
  const allAnnotations = ARCH_TOUR.annotations[state.scene] || [];
  const annotations = state.annotation_ids ? state.annotation_ids.map(id => allAnnotations[id - 1]) : allAnnotations.slice(0,state.step);
  renderPictureMarks(state, {scale,tx,ty});
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
// SVG callouts stay in screen pixels while their anchors follow the camera.
function renderPictureMarks(state, camera) {
  const root=explorer.querySelector('.arch-picture-marks');root.replaceChildren();
  const {scale,tx,ty}=camera;
  const point=(x,y)=>[tx+x*scale,ty+y*scale];
  function svg(tag,attrs={},parent=root){
    const node=document.createElementNS('http://www.w3.org/2000/svg',tag);
    Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,String(value)));
    parent.append(node);return node;
  }
  function box(x,y,w,h,color='#ce493a',id=''){
    const [px,py]=point(x,y);
    return svg('rect',{x:px,y:py,width:w*scale,height:h*scale,rx:4,fill:color+'0c',stroke:color,'stroke-width':2.2,'data-mark-id':id});
  }
  function textLabel(text,x,y,{size=18,color='#194b60',id='',split=false}={}){
    const group=svg('g',{'class':'arch-picture-label','data-label-id':id});
    const lines=split?[text.split(' ')[0],text.split(' ').slice(1).join(' ')]:[text];
    const textNode=svg('text',{x,y,fill:color,'font-size':size,'text-anchor':'middle','dominant-baseline':'middle'},group);
    lines.forEach((line,i)=>{const span=svg('tspan',{x,dy:i?size*1.25:0},textNode);span.textContent=line;});
    const rect=textNode.getBBox();
    const background=svg('rect',{x:rect.x-5,y:rect.y-3,width:rect.width+10,height:rect.height+6,fill:'#fffffff0',rx:3},group);
    group.insertBefore(background,textNode);
  }
  function label(id,x,y,options={}){const [px,py]=point(x,y);textLabel(ARCH_TOUR.labels[id].text,px,py,{...options,id});}
  if(state.overlay==='vlm-inputs'){
    textLabel('VLM에 들어가는 세 종류의 토큰',370,35,{size:24,id:'input-caption'});
    const groups=[
      {id:'vlm-video',from:54,to:525,color:'#6a5caa'},
      {id:'vlm-language',from:544,to:665,color:'#477f52'},
      {id:'vlm-cognition',from:686,to:758,color:'#148c9a'},
    ];
    groups.forEach(group=>{
      const x1=point(group.from,505)[0],x2=point(group.to,505)[0],y=point(0,505)[1]+14,mid=(x1+x2)/2;
      svg('path',{d:`M ${x1} ${y-7} L ${x1} ${y} Q ${mid} ${y+10} ${x2} ${y} L ${x2} ${y-7}`,fill:'none',stroke:'#ce493a','stroke-width':2.5,'data-mark-id':group.id});
      svg('path',{d:`M ${mid} ${y+5} L ${mid} 178`,fill:'none',stroke:'#ce493a','stroke-width':2.4,'marker-end':'url(#arch-arrow-tip)'});
      textLabel(ARCH_TOUR.labels[group.id].text,mid,209,{size:group.id==='vlm-cognition'?19:23,color:group.color,id:group.id,split:group.id==='vlm-cognition'});
    });
    textLabel('세 토큰 묶음을 concat해 VLM에 입력한다.',370,300,{size:22,id:'input-concat'});
  }
  if(state.scene==='memory'){
    if(state.step>=1){box(824,718,264,25,'#7263ad','memory-past');label('memory-past',948,812,{color:'#7263ad'});}
    if(state.step>=2){box(1093,718,85,25,'#15998b','memory-current');label('memory-current',1136,812,{color:'#128376'});}
    if(state.step>=3){box(1093,623,85,27,'#15998b','memory-output');label('memory-output',1190,637,{color:'#128376'});}
  }
  if(state.scene==='msat'){
    if(state.step>=1&&state.step<=3){
      const rows=[{id:'stream-p',x:824,w:193,c:'#4092b3'},{id:'stream-c',x:1046,w:178,c:'#15998b'},{id:'stream-a',x:1267,w:141,c:'#7263ad'}];
      rows.slice(0,state.step).forEach(row=>{box(row.x,464,row.w,33,row.c,row.id);label(row.id,row.x+row.w/2,558,{color:row.c});});
      if(state.step>=2){
        const [mx,my]=point(1028,496);
        svg('rect',{x:mx,y:my,width:210*scale,height:42*scale,fill:'#e0f1ef','data-mark-id':'cognition-memory-label'});
        label('stream-c-concat',1136,514,{size:22,color:'#117c75'});
      }
    }
    if(state.step>=4)box(842,380,594,69,'#ce493a','triple-block');
    if(state.step>=5){box(1047,336,364,27,'#15998b','ca-concat');box(842,250,594,69,'#15998b','double-block');}
    if(state.step>=6){box(900,133,117,27,'#4092b3','future-signals');box(1293,133,116,27,'#7263ad','future-actions');const [lx,ly]=point(1455,430);textLabel('반복',lx,ly,{size:18,color:'#ce493a',id:'denoise-loop'});}
  }
}
const problemWalkthrough = document.querySelector('.problems-walkthrough');
const problemStages = [...(problemWalkthrough?.querySelectorAll('[data-problem-stage]') || [])];
let problemIndex = 0;
function inProblems() { return !!problemWalkthrough && pages[current]?.contains(problemWalkthrough); }
function renderProblems(index) {
  problemIndex = Math.max(0, Math.min(problemStages.length - 1, index));
  const state = problemStages[problemIndex];
  problemWalkthrough.dataset.problemStep = String(problemIndex);
  const slide = problemWalkthrough.closest('.seminar-slide');
  slide.querySelector('.slide-lead').textContent = state.dataset.lead;
  slide.querySelector('.takeaway').textContent = state.dataset.takeaway;
  problemWalkthrough.querySelector('.problem-step-label').textContent = `${problemIndex + 1} / ${problemStages.length} · ${state.dataset.label}`;
  problemWalkthrough.querySelectorAll('.problem-card').forEach(card => {
    const number = Number(card.dataset.problemCard);
    card.setAttribute('aria-hidden', String(number > problemIndex));
    card.classList.toggle('is-current', number === problemIndex || problemIndex === problemStages.length - 1);
  });
}
function inTour() { return pages[current]?.contains(explorer); }

function inferenceRoot() { return pages[current]?.querySelector('.inference-tour'); }
function renderInference(index) {
 const root=inferenceRoot(); if(!root)return;
 const panels=[...root.querySelectorAll('[data-inference-panel]')];
 index=Math.max(0,Math.min(panels.length-1,index));root.dataset.state=index;
 panels.forEach((p,i)=>p.hidden=i!==index);
 root.querySelectorAll('[data-inference-visual]').forEach(el=>el.hidden=Number(el.dataset.inferenceVisual)!==index);
 root.querySelectorAll('[data-inference-go]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.inferenceGo)===index)));
 root.querySelector('.inference-counter').textContent=`${index+1} / ${panels.length}`;
 root.querySelector('[data-inference-next]').textContent=index===panels.length-1?'다음 장 →':'다음 설명 →';
 const slide=root.closest('.seminar-slide');slide.querySelector('.slide-lead').textContent=panels[index].dataset.lead;slide.querySelector('.takeaway').textContent=panels[index].dataset.takeaway;
}
document.querySelectorAll('.inference-tour').forEach(root=>{
 root.querySelectorAll('[data-inference-go]').forEach(b=>b.onclick=()=>renderInference(Number(b.dataset.inferenceGo)));
 root.querySelector('[data-inference-next]').onclick=()=>advance();
 root.querySelector('[data-inference-prev]').onclick=()=>retreat();
});

function advance() {
  const inf=inferenceRoot();
  if(inf && Number(inf.dataset.state)<inf.querySelectorAll("[data-inference-panel]").length-1) {renderInference(Number(inf.dataset.state)+1);return;}
  if (inRecap() && recapIndex < recapPanels.length - 1) renderRecap(recapIndex + 1);
  else if (inProblems() && problemIndex < problemStages.length - 1) renderProblems(problemIndex + 1);
  else if (inTour() && tourIndex < ARCH_TOUR.states.length - 1) renderTour(tourIndex + 1);
  else show(current + 1);
}
function retreat() {
  const inf=inferenceRoot();
  if(inf && Number(inf.dataset.state)>0) {renderInference(Number(inf.dataset.state)-1);return;}
  if (inRecap() && recapIndex > 0) renderRecap(recapIndex - 1);
  else if (inProblems() && problemIndex > 0) renderProblems(problemIndex - 1);
  else if (inTour() && tourIndex > 0) renderTour(tourIndex - 1);
  else show(current - 1, true, true);
}
explorer?.querySelectorAll('[data-arch-focus]').forEach(button => button.onclick = () => renderTour(ARCH_TOUR.focus[button.dataset.archFocus]));
explorer?.querySelector('[data-arch-reset]').addEventListener('click', () => renderTour(0));
explorer?.querySelector('[data-arch-next]').addEventListener('click', advance);
explorer?.querySelector('[data-arch-prev]').addEventListener('click', retreat);
recapExplorer?.querySelectorAll('[data-recap-go]').forEach(button=>button.onclick=()=>renderRecap(Number(button.dataset.recapGo)));
recapExplorer?.querySelector('[data-recap-next]').addEventListener('click',advance);
recapExplorer?.querySelector('[data-recap-prev]').addEventListener('click',retreat);
const pageNumber = document.querySelector('#page-number');
pageNumber.max = String(pages.length);
const exportMode = new URLSearchParams(location.search).has('export');
if (exportMode) document.body.dataset.export = 'true';
function fit() {
  const stage = document.querySelector('#stage');
  // The toolbar may have two rows, touch-sized controls, or a safe-area inset.
  const availableHeight = exportMode ? innerHeight : Math.max(1, document.querySelector('.deck-toolbar').getBoundingClientRect().top - 12);
  const scale = Math.min(innerWidth / 1280, availableHeight / 720);
  stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
  stage.style.top = `${availableHeight / 2}px`;
  stage.style.marginTop = '0';
}
function hydrate(index) {
  pages[index].querySelectorAll('img[data-asset]').forEach(im => {
    if (!im.src) im.src = ASSETS[im.dataset.asset];
  });
}
function show(index, updateHash = true, enterAtLastStep = false) {
  current = Math.max(0, Math.min(pages.length - 1, index));
  pages.forEach((p, i) => { p.classList.toggle('active', i === current); p.setAttribute('aria-hidden', String(i !== current)); });
  if (inRecap()) renderRecap(enterAtLastStep ? recapPanels.length - 1 : 0);
  if (inTour()) renderTour(enterAtLastStep ? ARCH_TOUR.states.length - 1 : 0);
  if (inProblems()) renderProblems(enterAtLastStep ? problemStages.length - 1 : 0);
  if(inferenceRoot()) renderInference(enterAtLastStep ? inferenceRoot().querySelectorAll("[data-inference-panel]").length-1 : 0);
  hydrate(current);
  if (current + 1 < pages.length) hydrate(current + 1);
  pageNumber.value = String(current + 1);
  document.querySelector('#counter').textContent = `/ ${pages.length} · ${DECK[current].id}`;
  document.title = `${DECK[current].id} · ${DECK[current].title} · RLDX-1`;
  document.querySelector('#prev').disabled = current === 0;
  document.querySelector('#next').disabled = current === pages.length - 1;
  if (updateHash) history.replaceState(null, '', `#${DECK[current].id}`);
}
// Retain study-note rendering for internal verification, without a menu or shortcut.
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
// Jump by presentation order; show() enters interactive slides at their first step.
document.querySelector('#page-jump').addEventListener('submit', event => {
  event.preventDefault();
  const requestedPage = pageNumber.valueAsNumber;
  if (!pageNumber.checkValidity() || !Number.isInteger(requestedPage)) {
    pageNumber.reportValidity();
    return;
  }
  show(requestedPage - 1);
  pageNumber.blur();
});
pageNumber.addEventListener('focus', () => pageNumber.select());
pageNumber.addEventListener('blur', () => { pageNumber.value = String(current + 1); });
pageNumber.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    pageNumber.blur();
  }
});
document.querySelector('#prev').onclick = retreat;
document.querySelector('#next').onclick = advance;
document.querySelector('#open-toc').onclick = () => { toc.showModal(); document.querySelector('#toc-search').focus(); };
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
// Keyboard navigation follows slideshow conventions. Keep native activation
// for focused controls, and let search/dialogs use their own keys.
document.addEventListener('keydown', event => {
  const target = event.target instanceof Element ? event.target : null;
  const openDialogs = [...document.querySelectorAll('dialog[open]')];
  if (event.key === 'Escape' && openDialogs.length) {
    event.preventDefault();
    openDialogs.at(-1).close();
    return;
  }
  if (openDialogs.length || target?.closest('input,textarea,select,[contenteditable="true"]')) return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (['Enter', ' '].includes(event.key) && target?.closest('button,a,[role="button"]')) return;
  if (event.key === ' ' && event.shiftKey) { event.preventDefault(); retreat(); return; }
  if (['ArrowRight', 'ArrowDown', 'PageDown', 'Enter', ' '].includes(event.key)) { event.preventDefault(); advance(); return; }
  if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(event.key)) { event.preventDefault(); retreat(); return; }
  if (event.key === 'Escape') {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (inRecap()) renderRecap(0);
    else if (inTour()) renderTour(0);
    return;
  }
  if (event.key === 'Home') { event.preventDefault(); show(0); }
  if (event.key === 'End') { event.preventDefault(); show(pages.length - 1); }
  if (event.key.toLowerCase() === 'g') document.querySelector('#open-toc').click();
  if (event.key.toLowerCase() === 'f') document.querySelector('#fullscreen').click();
});
document.querySelector('#stage').addEventListener('click', event => {
  const target = event.target instanceof Element ? event.target : null;
  if (event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (document.querySelector('dialog[open]') || window.getSelection()?.isCollapsed === false) return;
  if (target?.closest('button,a,input,textarea,select,[contenteditable="true"],figure,img,canvas,svg,.architecture-explorer,.recap-explorer,.inference-tour')) return;
  advance();
});
// Preserve links to explanations that were merged during the slide review.
const MERGED_SLIDES = {P041:'P023',P042:'P023',P043:'P024',P044:'P025',P026:'P110',P061:'P060',P063:'P064',P065:'P066',P027:'P068',P039:'P038', P031:'P032', P029:'P101', P070:'P065', P067:'P066', P069:'P068', P033:'P013', P034:'P013', P005:'P032', P007:'P006', P011:'P032', P036:'P032', P012:'P009', P021:'P038', P048:'P032', P049:'P032', P050:'P032', P052:'P032', P053:'P032', P054:'P032', P055:'P032', P056:'P032', P057:'P032', P058:'P032', P059:'P032', P073:'P072', P074:'P015', P045:'P015', P046:'P015', P075:'P028', P076:'P028', P077:'P028', P079:'P040', P080:'P022', P081:'P042', P082:'P041', P083:'P064', P084:'P064', P085:'P067', P086:'P067', P087:'P067', P088:'P067', P089:'P067', P090:'P064', P091:'P022', P092:'P022', P093:'P022', P094:'P022', P078:'P039'};
function showFromHash() {
  const requested = location.hash.slice(1);
  let resolved = requested;
  const seen = new Set();
  while (MERGED_SLIDES[resolved] && !seen.has(resolved)) { seen.add(resolved); resolved = MERGED_SLIDES[resolved]; }
  const panelId = ARCH_TOUR.merged_slides?.[resolved];
  const id = panelId ? 'P032' : resolved;
  const index = DECK.findIndex(s => s.id === id);
  if (index < 0) return false;
  show(index);
  if (panelId) { renderTour(typeof panelId === 'number' ? panelId : ARCH_TOUR.states.findIndex(s => s.panel_id === panelId)); return true; }
  if (['P011','P036'].includes(requested)) renderTour(ARCH_TOUR.focus.msat);
  if (['P005','P056','P057','P058'].includes(requested)) renderTour(ARCH_TOUR.focus.memory);
  if (['P048','P049','P050'].includes(requested)) renderTour(ARCH_TOUR.focus.vision);
  if (['P052','P053','P054','P055'].includes(requested)) renderTour(ARCH_TOUR.focus.vlm);
  return true;
}
addEventListener('hashchange', showFromHash);
addEventListener('resize', fit);
new ResizeObserver(fit).observe(document.querySelector('.deck-toolbar'));
addEventListener('beforeprint', () => pages.forEach((_, i) => hydrate(i)));
window.deckShow = show;
window.deckData = DECK;
fit();
if (!showFromHash()) show(0);
