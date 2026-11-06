import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-chromium';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1280,height:800}});
const tourLength=JSON.parse(fs.readFileSync('content/architecture-tour.json','utf8')).states.length;
const errors=[];page.on('pageerror',e=>errors.push(String(e)));
async function active(){return page.locator('.deck-page.active').getAttribute('data-id');}
async function show(id){await page.evaluate(id=>window.deckShow(window.deckData.findIndex(s=>s.id===id)),id);}
try{
  await page.goto(pathToFileURL(path.resolve('presentation.html')).href);
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.getByRole('spinbutton',{name:'현재 페이지 번호'}).count(),1,'editable page number must be available');
  const pageNumber=page.getByRole('spinbutton',{name:'현재 페이지 번호'});
  const pageCount=await page.evaluate(()=>window.deckData.length);
  assert.equal(await pageNumber.getAttribute('max'),String(pageCount));
  await pageNumber.click();await page.keyboard.type('5');
  assert.equal(await pageNumber.inputValue(),'5','focusing selects the existing number for replacement');
  assert.equal(await active(),'S001','editing alone does not navigate');
  await page.keyboard.press('Enter');assert.equal(await active(),'P051');
  assert.equal(new URL(page.url()).hash,'#P051');
  assert.notEqual(await page.evaluate(()=>document.activeElement?.id),'page-number');
  async function jump(value){await pageNumber.fill(value);await pageNumber.press('Enter');}
  await jump('4');assert.equal(await active(),'P032');
  const explorer=page.locator('.architecture-explorer');
  assert.equal(await explorer.getAttribute('data-state'),'0');
  await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');
  assert.equal(await explorer.getAttribute('data-state'),'2');
  await pageNumber.fill('5');await pageNumber.press('Escape');
  assert.equal(await pageNumber.inputValue(),'4');
  assert.equal(await explorer.getAttribute('data-state'),'2','canceling input does not reset the current explanation');
  await jump('4');assert.equal(await explorer.getAttribute('data-state'),'0','jumping to the same slide also starts at its first explanation');
  for(const value of ['', '0',String(pageCount+1),'1.5']){
    await jump(value);assert.equal(await active(),'P032');
    assert.equal(await explorer.getAttribute('data-state'),'0');
    assert.equal(await pageNumber.evaluate(el=>el.checkValidity()),false);
  }
  await jump(String(pageCount));assert.equal(await active(),'P030');
  await jump('4');await page.evaluate(()=>document.fonts.ready);
  await page.locator('.arch-source-image').evaluate(im=>im.decode());
  const version=JSON.parse(fs.readFileSync('content/deck-manifest.json','utf8'))[0].version;
  const previews=path.resolve(`review/previews/navigation-${version}`);fs.mkdirSync(previews,{recursive:true});
  await page.screenshot({path:path.join(previews,'P032-page-jump.png')});
  await page.locator('.deck-toolbar').screenshot({path:path.join(previews,'page-number-toolbar.png')});
  await page.setViewportSize({width:800,height:600});
  const toolbar=await page.locator('.deck-toolbar').boundingBox();assert(toolbar.x>=0&&toolbar.x+toolbar.width<=800,'toolbar fits an 800px window');
  await page.setViewportSize({width:1280,height:800});
  await jump('1');assert.equal(await active(),'S001');

  await page.keyboard.press('ArrowRight');assert.equal(await active(),'P002');
  await page.keyboard.press('ArrowLeft');assert.equal(await active(),'S001');
  await page.keyboard.press('Enter');assert.equal(await active(),'P002');
  await page.keyboard.press('Backspace');assert.equal(await active(),'S001');
  await page.keyboard.press('Space');assert.equal(await active(),'P002');
  await page.keyboard.press('Shift+Space');assert.equal(await active(),'S001');
  await page.keyboard.press('ArrowDown');assert.equal(await active(),'P002');
  await page.keyboard.press('ArrowUp');assert.equal(await active(),'S001');
  await page.keyboard.press('PageDown');assert.equal(await active(),'P002');
  await page.keyboard.press('PageUp');assert.equal(await active(),'S001');
  await page.keyboard.press('End');assert.equal(await active(),'P030');
  await page.keyboard.press('Home');assert.equal(await active(),'S001');
  // Blank slide canvas clicks advance, while figures retain zoom behavior.
  await page.locator('.deck-page.active').click({position:{x:50,y:30}});assert.equal(await active(),'P002');
  await show('P031');await page.locator('.deck-page.active .paper-figure img').click();
  assert.equal(await active(),'P031');assert.equal(await page.locator('#image-dialog[open]').count(),1);
  await page.keyboard.press('ArrowRight');assert.equal(await active(),'P031');
  await page.keyboard.press('Escape');
  // Buttons preserve native Enter/Space activation, without a second advance.
  await page.locator('#next').focus();await page.keyboard.press('Enter');assert.equal(await active(),'P032');
  assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),'0');
  await page.locator('#stage').click({position:{x:50,y:30}});
  assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),'1');
  for(let i=1;i<tourLength;i++)await page.keyboard.press('ArrowRight');
  assert.equal(await active(),'P051');
  await page.keyboard.press('ArrowLeft');assert.equal(await active(),'P032');
  assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),String(tourLength-1));
  for(let i=tourLength-2;i>=0;i--){await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),String(i));}
  await page.keyboard.press('ArrowLeft');assert.equal(await active(),'P031');
  // Text entry and modifier shortcuts do not drive presentation navigation.
  await page.keyboard.press('g');await page.locator('#toc-search').fill('P032');
  await page.keyboard.press('ArrowRight');assert.equal(await active(),'P031');
  await page.keyboard.press('Escape');
  await page.locator('#toc').waitFor({state:'hidden'});
  await page.locator('#open-notes').focus();
  assert.equal(await page.evaluate(()=>document.activeElement?.id),'open-notes');
  await page.keyboard.press('Space');assert.equal(await page.locator('#notes[open]').count(),1);assert.equal(await active(),'P031');
  await page.keyboard.press('Escape');
  await page.keyboard.press('Control+ArrowRight');assert.equal(await active(),'P031');
  await page.keyboard.press('f');
  await page.waitForFunction(()=>!!document.fullscreenElement);
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>!document.fullscreenElement);
  // The merged P012 link resolves to inputs; moved study notes remain searchable.
  await page.goto(pathToFileURL(path.resolve('presentation.html')).href+'#P012');
  assert.equal(await active(),'P009');
  await page.keyboard.press('n');
  assert.match(await page.locator('#notes-text').innerText(),/상세 해설 S037/);
  assert.match(await page.locator('#notes-text').innerText(),/상세 해설 S038/);
  await page.keyboard.press('Escape');await page.keyboard.press('ArrowRight');
  assert.equal(await active(),'P010');await page.keyboard.press('n');
  assert.match(await page.locator('#notes-text').innerText(),/상세 해설 S039/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.deck-page[data-id="P012"]').count(),0);
  for (const [oldId,newId,unit] of [['P005','P032','S016'],['P007','P006','S024'],['P011','P032','S036'],['P036','P032','S058'],['P021','P038','S077'],['P048','P032','S011'],['P049','P032','S012'],['P050','P032','S013'],['P052','P032','S009'],['P053','P032','S010'],['P054','P032','S014'],['P055','P032','S015'],['P056','P032','S017'],['P057','P032','S019'],['P058','P032','S018'],['P074','P015','S051'],['P045','P015','S052'],['P046','P015','S053']]) {
    await page.goto(pathToFileURL(path.resolve('presentation.html')).href+'#'+oldId);
    assert.equal(await active(),newId);
    if(['P052','P053','P054','P055'].includes(oldId)) assert.equal(await page.locator('.architecture-explorer').getAttribute('data-scene'),'vlm');
    if(['P011','P036'].includes(oldId)) assert.equal(await page.locator('.architecture-explorer').getAttribute('data-scene'),'msat');
    if(['P005','P056','P057','P058'].includes(oldId)) assert.equal(await page.locator('.architecture-explorer').getAttribute('data-scene'),'memory');
    await page.keyboard.press('n');assert((await page.locator('#notes-text').innerText()).includes('상세 해설 '+unit));
    await page.keyboard.press('Escape');
    assert.equal(await page.locator(`.deck-page[data-id="${oldId}"]`).count(),0);
  }
  await page.goto(pathToFileURL(path.resolve('presentation.html')).href+'#P059');
  assert.equal(await active(),'P032');
  assert.equal(await page.locator('.deck-page[data-id="P059"]').count(),0);
  await page.goto(pathToFileURL(path.resolve('presentation.html')).href+'#P073');
  assert.equal(await active(),'P072');
  assert.equal(await page.locator('.deck-page[data-id="P073"]').count(),0);
  const modelSlideText=await page.locator('.deck-page.active').innerText();
  assert(!/Cosmos|LoRA|10K|20K|93 frames/.test(modelSlideText),'model settings belong in notes');
  await page.keyboard.press('n');
  const modelNotes=await page.locator('#notes-text').innerText();
  for(const term of ['Cosmos-Predict2-14B','Cosmos-Predict2.5-2B','2:1:1','LoRA','93 frames','16FPS'])assert(modelNotes.includes(term),term);
  await page.keyboard.press('Escape');
  // Visual and language representations are explained between the overview and MSAT.
  await show('P051');
  for(const id of ['P009']){await page.keyboard.press('ArrowRight');assert.equal(await active(),id);}
  await show('P032'); await page.keyboard.press('n');
  const scriptText=await page.locator('#notes-text .study-intro').innerText();
  for(const term of ['Vision Encoder 발표 대본','첫 번째 화살표','STSS','Residual addition','10–27층','VLM 발표 대본','세 종류의 입력','causal 구조','과거 프레임 특징의 압축','cognition 위치 출력','Memory Module 발표 대본','과거 cognition features의 queue','Causal Transformer의 계산','저장 간격과 과거 범위','MSAT 마무리 대본','로봇별 입출력 경로','embodiment-agnostic','256 trajectories'])assert(scriptText.includes(term),term);
  await page.keyboard.press('Escape');
  // Architecture structure precedes its learning/inference equations.
  await jump('7');assert.equal(await active(),'P010');
  assert.match(await page.locator('.deck-page.active').innerText(),/RLDX-1 Architecture/);
  await show('P009');
  for(const id of ['P010','P006','P008','P071','P013']){await page.keyboard.press('ArrowRight');assert.equal(await active(),id);}
  // Public and in-house data come between the overview and synthetic augmentation.
  for(const id of ['P033','P034','P072','P014']){await page.keyboard.press('ArrowRight');assert.equal(await active(),id);}
  // Generated video, simulator rollout, feature comparison, then classifier training.
  for(const id of ['P015','P047','P035']){await page.keyboard.press('ArrowRight');assert.equal(await active(),id);}
  await show('P015'); await page.keyboard.press('n');
  const validationNotes=await page.locator('#notes-text .study-intro').innerText();
  for(const term of ['영상 품질 검사','IDM','Rollout','Gemini','16프레임','8프레임','V-JEPA2','cross-attention'])assert(validationNotes.includes(term),term);
  await page.keyboard.press('Escape');
  // Purpose first, then each training stage; graph and fused-kernel explanations stay separate.
  await show('P035');
  for(const id of ['P016','P017','P018','P019','P037','P020','P038','P039','P078','P040']){await page.keyboard.press('ArrowRight');assert.equal(await active(),id);}
  // Benchmarks and real robot/task photos come before their result plots.
  for(const id of ['P022','P041','P042','P023','P043','P024','P044','P025','P026']){await page.keyboard.press('ArrowRight');assert.equal(await active(),id);}
  // Follow the seven ablation topics without skipping their separate conditions and interpretations.
  for(const id of ['P060','P061','P062','P063','P064','P065','P070','P066','P067','P027','P068','P069','P029']){await page.keyboard.press('ArrowRight');assert.equal(await active(),id);}
  // Appendix experiments are absent, and their old links resolve to retained topics.
  for(const {id,target,unit} of JSON.parse(fs.readFileSync('review/versions/before-appendix-removal-v26/mapping.json','utf8'))){
    assert.equal(await page.locator(`.deck-page[data-id="${id}"]`).count(),0);
    await page.goto(pathToFileURL(path.resolve('presentation.html')).href+'#'+id);
    assert.equal(await active(),target);
    if(unit){await page.keyboard.press('n');assert((await page.locator('#notes-text').innerText()).includes('상세 해설 '+unit));await page.keyboard.press('Escape');}
  }
  assert.deepEqual(errors,[]);
  fs.writeFileSync('qa/full-deck/navigation-report.json',JSON.stringify({pageJump:true,pageJumpResetsTour:true,pageJumpValidation:true,pageJumpEscape:true,arrows:true,enterBackspace:true,spaceShiftSpace:true,upDownPageKeys:true,homeEnd:true,canvasClick:true,imageZoom:true,buttonFocus:true,tourReverseBoundary:true,dialogsAndModifiers:true,fullscreenEscape:true,mergedP012Link:true,allMergedLinks:true,movedStudyNotes:true,errors},null,2));
  console.log('PASS: presentation keys/clicks, native buttons, dialogs, and reverse animation boundary.');
}finally{await browser.close();}
