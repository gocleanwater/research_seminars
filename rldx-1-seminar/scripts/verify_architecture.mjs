import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-chromium';
const version=JSON.parse(fs.readFileSync('content/deck-manifest.json','utf8'))[0].version;
const tour=JSON.parse(fs.readFileSync('content/architecture-tour.json','utf8'));
const out=path.resolve(`review/previews/architecture-${version}`);fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(String(e)));
const url=pathToFileURL(path.resolve('presentation.html')).href+'?export=1#P032';
try{
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  await page.locator('.arch-source-image').evaluate(im=>im.decode());
  const explorer=page.locator('.architecture-explorer');
  for(let index=0;index<tour.states.length;index++){
    const state=tour.states[index];
    assert.equal(await explorer.getAttribute('data-state'),String(index));
    assert.equal(await explorer.getAttribute('data-scene'),state.scene);
    assert.equal(await explorer.getAttribute('data-step'),String(state.step));
    const count=state.annotation_ids?.length||state.step;
    assert.equal(await explorer.locator('.arch-paths path').count(),count);
    assert.equal(await explorer.locator('.arch-annotation').count(),count);
    const issues=await explorer.evaluate(root=>{
      const area=root.querySelector('.arch-annotations').getBoundingClientRect();const found=[];
      const cards=[...root.querySelectorAll('.arch-annotation')];
      for(const [i,card] of cards.entries()){
        const texts=[...card.querySelectorAll('h3,p')];
        const r=card.getBoundingClientRect();
        for(const text of texts){const b=text.getBoundingClientRect();if(b.right>area.right+1||b.bottom>area.bottom+1||b.top<area.top-1)found.push({type:'annotation-bounds',text:text.textContent});}
        if(i+1<cards.length && r.bottom>cards[i+1].getBoundingClientRect().top+1)found.push({type:'annotation-overlap',text:card.textContent});
      }
      const viewport=root.querySelector('.arch-viewport').getBoundingClientRect();
      for(const label of root.querySelectorAll('.arch-picture-label text')){
        const r=label.getBoundingClientRect();if(r.left<viewport.left-1||r.right>viewport.right+1||r.top<viewport.top-1||r.bottom>viewport.bottom+1)found.push({type:'figure-label-bounds',text:label.textContent});
      }
      const buttons=root.querySelector('.arch-controls').getBoundingClientRect();
      if(buttons.top<area.bottom+4)found.push({type:'controls-overlap'});
      return found;
    });
    assert.deepEqual(issues,[],`state ${index}`);
    if(index===8){
      assert.equal(await explorer.locator('.arch-picture-marks [data-mark-id^="vlm-"]').count(),3);
      for(const id of ['vlm-video','vlm-language','vlm-cognition'])assert.equal(await explorer.locator(`[data-label-id="${id}"]`).count(),1);
      assert.match(await explorer.locator('[data-label-id="vlm-cognition"]').textContent(),/64/);
    }
    if(index===10)assert.match(await explorer.locator('.arch-annotations').innerText(),/과거.*압축/);
    if(index===11){const text=await explorer.locator('.arch-annotations').innerText();assert.match(text,/중간층/);assert.match(text,/cognition token 위치/);assert(!text.includes('18층')&&!text.includes('q 위치'));}
    if(state.scene==='memory'||state.scene==='overview'){
      assert.equal(await explorer.locator('[data-label-id="concat"],[data-mark-id="concat-replaces-plus"],[data-mark-id="memory-concat"]').count(),0,'keep the original paper symbol visible');
    }
    if(state.scene==='memory'&&state.step>=3){
      const origin=await explorer.locator('.arch-paths circle').nth(2).evaluate(e=>({x:Number(e.getAttribute('cx')),y:Number(e.getAttribute('cy'))}));
      const [x,y,w,h]=state.box,scale=Math.min(740/w,390/h),tx=(740-w*scale)/2-x*scale,ty=(390-h*scale)/2-y*scale;
      assert(origin.x>=tx+825*scale&&origin.x<=tx+1175*scale&&origin.y>=ty+656*scale&&origin.y<=ty+710*scale,'Causal Transformer arrow starts inside the Transformer Blocks rectangle');
    }
    await page.locator('.deck-page.active').screenshot({path:path.join(out,`step-${String(index).padStart(2,'0')}.png`)});
    await page.keyboard.press('ArrowRight');
  }
  assert.equal(await page.locator('.deck-page.active').getAttribute('data-id'),'P006');
  await page.keyboard.press('ArrowLeft');assert.equal(await explorer.getAttribute('data-state'),String(tour.states.length-1));
  for(let i=tour.states.length-2;i>=0;i--){await page.keyboard.press('ArrowLeft');assert.equal(await explorer.getAttribute('data-state'),String(i));}
  await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.deck-page.active').getAttribute('data-id'),'P031');
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  for(const scene of Object.keys(tour.focus)){
    await page.locator('[data-arch-reset]').click();
    await page.locator(`.arch-${scene}-hotspot`).click();
    assert.equal(await explorer.getAttribute('data-state'),String(tour.focus[scene]));
    assert.equal(await explorer.locator('.arch-paths path').count(),0);
    await page.locator('[data-arch-next]').click();assert.equal(await explorer.getAttribute('data-step'),'1');
    await page.locator('[data-arch-prev]').click();assert.equal(await explorer.getAttribute('data-step'),'0');
    await page.keyboard.press('Escape');assert.equal(await explorer.getAttribute('data-state'),'0');
    await page.locator(`.arch-mode-buttons [data-arch-focus="${scene}"]`).click();assert.equal(await explorer.getAttribute('data-scene'),scene);
  }
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.locator('.arch-mode-buttons [data-arch-focus="vision"]').click();
  assert.notEqual(await page.locator('.arch-camera').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
  await page.waitForTimeout(800);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.arch-camera').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
  await page.keyboard.press('n');assert.equal(await page.locator('#notes[open]').count(),1);assert.match(await page.locator('#notes-text').innerText(),/S008/);
  await page.keyboard.press('Escape');assert.equal(await page.locator('.header-kind').count(),0);assert.deepEqual(errors,[]);
  fs.writeFileSync('qa/full-deck/architecture-report.json',JSON.stringify({states:tour.states.length,arrows:Object.values(tour.annotations).reduce((n,items)=>n+items.length,0),modules:Object.keys(tour.focus),directTokenLabels:true,concat:true,bounds:true,keyboardReverse:true,hotspots:true,animation:true,reducedMotion:true,errors},null,2));
  console.log(`PASS: ${tour.states.length} states, four module zooms, token labels, concat, forward/reverse, bounds, animation/reduced motion.`);
}finally{await browser.close();}
