import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-chromium';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(String(e)));
const base=file=>pathToFileURL(path.resolve(file)).href;
const active=()=>page.locator('.deck-page.active').getAttribute('data-id');
const results=[];
try{
  for(const file of ['presentation.html','part-1.html']){
    await page.goto(base(file)+'#S001');await page.evaluate(()=>document.fonts.ready);
    const entries=await page.locator('.cover-part-agenda a').evaluateAll(es=>es.map(e=>({href:e.getAttribute('href'),text:e.textContent})));
    assert.equal(entries.length,13);
    const bounds=await page.locator('.cover-agenda').evaluate(root=>{
      const limits=root.getBoundingClientRect(),copy=root.querySelector('.cover-description').getBoundingClientRect(),image=root.querySelector('.cover-system').getBoundingClientRect(),footer=root.querySelector('.cover-footer').getBoundingClientRect();
      const bad=[...root.querySelectorAll('.agenda-part a')].filter(e=>{const b=e.getBoundingClientRect();return b.right>limits.right||b.left<limits.left||b.bottom>footer.top||e.scrollWidth>e.clientWidth+1;}).map(e=>e.textContent);
      return {bad,copyImageGap:image.top-copy.bottom};
    });
    assert.deepEqual(bounds.bad,[]);assert(bounds.copyImageGap>=10);
    for(const entry of entries){
      await page.goto(base(file)+'#S001');
      await page.locator(`.cover-part-agenda a[href="${entry.href}"]`).click();
      const id=entry.href.split('#')[1];await page.waitForFunction(id=>document.querySelector('.deck-page.active')?.dataset.id===id,id);assert.equal(await active(),id,entry.text);
      if(file==='part-1.html'&&['P099','P020','P040','P026','P029','P100'].includes(id))assert.equal(path.basename(new URL(page.url()).pathname),'part-2.html');
      results.push({file,id});
    }
  }
  await page.goto(base('presentation.html'));await page.locator('a.agenda-part-heading').first().focus();await page.keyboard.press('Enter');await page.waitForFunction(()=>document.querySelector('.deck-page.active')?.dataset.id==='P097');assert.equal(await active(),'P097');
  await page.keyboard.press('ArrowRight');assert.equal(await active(),'P002');
  await page.goto(base('presentation.html')+'#P098');await page.keyboard.press('ArrowRight');assert.equal(await active(),'P099');await page.keyboard.press('ArrowLeft');assert.equal(await active(),'P098');
  await page.goto(base('part-1.html')+'#P098');await page.keyboard.press('ArrowRight');assert.equal(await active(),'P098');
  await page.locator('.deck-page.active .part-boundary-visual a[href="part-2.html#P099"]').click();await page.waitForFunction(()=>document.querySelector('.deck-page.active')?.dataset.id==='P099');assert.equal(await active(),'P099');
  await page.goto(base('part-2.html')+'#P100');await page.keyboard.press('ArrowRight');assert.equal(await active(),'P100');
  await page.locator('.deck-page.active .part-boundary-visual a[href="part-1.html#S001"]').click();await page.waitForFunction(()=>document.querySelector('.deck-page.active')?.dataset.id==='S001');assert.equal(await active(),'S001');
  assert.deepEqual(errors,[]);
  fs.mkdirSync('qa/full-deck',{recursive:true});fs.writeFileSync('qa/full-deck/part-agenda-report.json',JSON.stringify({links:results.length,coverBounds:true,keyboardActivation:true,qaBoundaries:true,crossPartLinks:true,errors},null,2));
  console.log('PASS:26 topic links, cover bounds, Enter activation, Part dividers, Q&A boundaries, cross-file navigation.');
}finally{await browser.close();}
