import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-chromium';
const out=path.resolve('review/previews/overview-v39');fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'reduce'});
const active=()=>page.locator('.deck-page.active').getAttribute('data-id');
const root=page.locator('.recap-explorer');
const index=()=>root.getAttribute('data-state');
const url=pathToFileURL(path.resolve('part-2.html')).href;
const errors=[],external=[];page.on('pageerror',e=>errors.push(String(e)));page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url())});
try{
 await page.goto(url);assert.equal(await active(),'P099');await page.keyboard.press('ArrowRight');assert.equal(await active(),'P101');
 await page.evaluate(()=>document.fonts.ready);await root.locator('img').evaluate(im=>im.decode());
 assert.equal(await root.locator('[data-recap-panel]').count(),6);
 for(let i=0;i<6;i++){
  assert.equal(await active(),'P101');assert.equal(await index(),String(i));
  assert.equal(await page.locator('.deck-page.active h1').textContent(),'Part 1 한눈에 보기');
  assert.equal(await root.locator('.recap-panel:visible').count(),1);
  assert.equal(await root.locator('.recap-mark rect:visible').count(),[0,5].includes(i)?0:1,'whole view clears the previous module highlight');
  const bounds=await root.evaluate(el=>{const slide=el.closest('.seminar-slide'),body=slide.querySelector('.seminar-body').getBoundingClientRect(),detail=el.querySelector('.recap-detail').getBoundingClientRect();return [...el.querySelectorAll('.recap-panel:not([hidden]) p,.recap-panel:not([hidden]) h3,.recap-controls')].filter(e=>{const r=e.getBoundingClientRect();return r.left<body.left-1||r.right>body.right+1||r.bottom>body.bottom+1||e.scrollWidth>e.clientWidth+2||(!e.classList.contains('recap-controls')&&r.right>detail.right+1);}).map(e=>e.textContent);});
  assert.deepEqual(bounds,[],`step ${i}`);
  await page.locator('.deck-page.active').screenshot({path:path.join(out,`step-${i}.png`)});await page.keyboard.press('ArrowRight');
 }
 assert.equal(await active(),'P102');await page.keyboard.press('ArrowLeft');assert.equal(await active(),'P101');assert.equal(await index(),'5');
 for(let i=4;i>=0;i--){await page.keyboard.press('ArrowLeft');assert.equal(await index(),String(i));}
 await page.keyboard.press('ArrowLeft');assert.equal(await active(),'P099');
 await page.keyboard.press('ArrowRight');
 for(let i=1;i<6;i++){await root.locator(`.recap-modes [data-recap-go="${i}"]`).click();assert.equal(await index(),String(i));}
 await page.keyboard.press('Escape');assert.equal(await index(),'0');
 await root.locator('.recap-hotspot[data-recap-go="1"]').click();assert.equal(await index(),'1');
 const number=page.locator('#page-number');await number.fill('2');await number.press('Enter');assert.equal(await index(),'0');await page.locator('#next').focus();await page.keyboard.press('Enter');assert.equal(await index(),'1');assert.equal(await active(),'P101');
 assert.equal(await root.locator('.recap-hotspot:visible').count(),0,'cropped module hotspots must leave keyboard navigation');
 await root.locator('.recap-viewport').evaluate(e=>{e.scrollLeft=100;e.scrollTop=50;});
 await root.locator('.recap-modes [data-recap-go="2"]').click();
 assert.deepEqual(await root.locator('.recap-viewport').evaluate(e=>[e.scrollLeft,e.scrollTop]),[0,0],'each module starts at the intended camera position');
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 console.log('PASS: Figure2 six states, fixed title, screen bounds, module buttons/hotspots, forward/reverse, page reset, offline.');
}finally{await browser.close();}
