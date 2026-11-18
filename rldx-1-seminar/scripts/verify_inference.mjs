import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-chromium';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
page.on('pageerror',e=>errors.push(String(e)));
const out='review/previews/inference-v41';fs.mkdirSync(out,{recursive:true});
const url=pathToFileURL(path.resolve('part-2.html')).href;
const active=()=>page.locator('.deck-page.active').getAttribute('data-id');
try {
 for(const [id,count,next] of [['P020',4,'P038'],['P038',2,'P109']]){
  await page.goto(url+'#'+id);await page.evaluate(()=>document.fonts.ready);
  const root=page.locator('.deck-page.active .inference-tour');
  await root.locator('img').evaluate(im=>im.decode());
  for(let i=0;i<count;i++){
   assert.equal(await active(),id);assert.equal(await root.getAttribute('data-state'),String(i));
   assert.equal(await root.locator('.inference-panel:visible').count(),1);
   assert.equal(await root.locator('g[data-inference-mark]:visible').count(),id==='P020'&&i<2?0:1);
   const overflow=await root.evaluate(el=>[...el.querySelectorAll('.inference-panel:not([hidden]),.inference-panel:not([hidden]) p,.inference-panel:not([hidden]) h3,.inference-controls')].filter(e=>e.scrollHeight>e.clientHeight+2||e.scrollWidth>e.clientWidth+2||e.getBoundingClientRect().bottom>el.getBoundingClientRect().bottom+2||e.getBoundingClientRect().right>el.getBoundingClientRect().right+2).map(e=>e.textContent));
   assert.deepEqual(overflow,[]);
   await page.locator('.deck-page.active').screenshot({path:`${out}/${id}-${i}.png`});
   await page.keyboard.press('ArrowRight');
  }
  assert.equal(await active(),next);await page.keyboard.press('ArrowLeft');assert.equal(await active(),id);
  assert.equal(await root.getAttribute('data-state'),String(count-1));
  await root.locator('[data-inference-go="0"]').click();assert.equal(await root.getAttribute('data-state'),'0');
  await root.locator('[data-inference-next]').focus();await page.keyboard.press('Enter');assert.equal(await root.getAttribute('data-state'),'1');
  await page.locator('#page-number').fill(String(id==='P020'?6:7));await page.locator('#page-number').press('Enter');assert.equal(await root.getAttribute('data-state'),'0');
 }
 await page.goto(url+'#P039');assert.equal(await active(),'P038');
 assert.deepEqual(errors,[]);console.log('PASS: CUDA 4 states, Fusion 2 states, arrows/highlights, bounds, keyboard, buttons, reverse entry, reset and retired links.');
} finally {await browser.close();}
