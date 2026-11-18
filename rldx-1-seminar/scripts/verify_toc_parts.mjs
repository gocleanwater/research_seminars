import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';import {chromium} from 'playwright-chromium';
const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const p=await b.newPage({viewport:{width:1280,height:900}});const errors=[];p.on('pageerror',e=>errors.push(String(e)));const url=f=>pathToFileURL(path.resolve(f)).href;const active=()=>p.locator('.deck-page.active').getAttribute('data-id');
try{
 await p.goto(url('presentation.html'));await p.keyboard.press('g');assert.equal(await p.locator('.toc-group').count(),2);
 assert.equal(await p.locator('[data-toc-part="1"] .toc-entry').count(),21);assert.equal(await p.locator('[data-toc-part="2"] .toc-entry').count(),24);
 await p.locator('#toc-search').fill('Part 2');assert.equal(await p.locator('.toc-group:visible').count(),1);assert.equal(await p.locator('.toc-entry:visible').count(),24);
 await p.locator('#toc-search').fill('P020');assert.equal(await p.locator('.toc-entry:visible').count(),1);await p.locator('.toc-entry:visible').click();assert.equal(await active(),'P020');
 for(const [file,local,other,target] of [['part-1.html','1','2','P099'],['part-2.html','2','1','S001']]){
  await p.goto(url(file));await p.keyboard.press('g');assert.equal(await p.locator(`[data-toc-part="${local}"] .toc-entry`).count(),local==='1'?21:24);await p.locator(`[data-toc-part="${other}"] .toc-part-link`).click();assert(p.url().includes(`part-${other}.html`));assert.equal(await active(),target);
 }
 await p.setViewportSize({width:390,height:844});await p.keyboard.press('g');assert.equal(await p.locator('#toc-list').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length),1);assert(await p.locator('#toc').evaluate(el=>el.scrollWidth<=el.clientWidth+2));
 await p.setViewportSize({width:1280,height:900});await p.goto(url('presentation.html'));await p.keyboard.press('g');await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'review/previews/part-grouped-toc-v42.png'});assert.deepEqual(errors,[]);console.log('PASS: two Part groups, 21/24 local entries, Part/slide search, cross-file links, mobile layout, no errors.');
}finally{await b.close();}
