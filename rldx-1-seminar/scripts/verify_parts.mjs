import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-chromium';
const parts=JSON.parse(fs.readFileSync('content/part-manifest.json','utf8')).parts;
const manifest=JSON.parse(fs.readFileSync('content/deck-manifest.json','utf8'));
const fullScript=fs.readFileSync('SPEAKER_SCRIPT.md','utf8');
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1280,height:800},reducedMotion:'reduce'});
const errors=[],external=[];page.on('pageerror',e=>errors.push(String(e)));page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
const seen=[];
try{
  assert.equal(manifest.length,48);assert.deepEqual(parts.map(p=>p.slide_count),[18,30]);
  assert.equal(parts[0].slides.at(-1).id,'P098');assert.equal(parts[1].slides[0].id,'P099');
  await page.goto(pathToFileURL(path.resolve('presentation.html')).href+'#P032');
  assert.equal(await page.locator('body > .part-links').count(),1);
  assert.equal(await page.locator('.part-links:visible').count(),1);
  for(const part of parts){
    const script=fs.readFileSync(`SPEAKER_SCRIPT_${part.id==='part-1'?'PART1':'PART2'}.md`,'utf8');
    const headings=[...script.matchAll(/^## (\d{2}) · ([SP]\d{3}) · (.+)$/gm)];
    assert.deepEqual(headings.map(h=>[Number(h[1]),h[2],h[3]]),part.slides.map(s=>[s.order,s.id,s.title]));
    for(const h of headings)assert(fullScript.includes(`· ${h[2]} · ${h[3]}`));
    await page.goto(pathToFileURL(path.resolve(part.file)).href);await page.evaluate(()=>document.fonts.ready);
    assert.deepEqual(await page.evaluate(()=>window.deckData.map(s=>s.id)),part.slides.map(s=>s.id));
    assert.equal(await page.locator('#page-number').getAttribute('max'),String(part.slide_count));
    assert.equal(await page.locator('body > .part-links').count(),1);
    for(let i=0;i<part.slides.length;i++){
      const slide=part.slides[i];seen.push(slide.id);
      await page.evaluate(n=>window.deckShow(n),i);
      assert.equal(await page.locator('.deck-page.active').getAttribute('data-id'),slide.id);
      assert.match(await page.locator('.deck-page.active .slide-id,.deck-page.active .cover-slide-id').textContent(),new RegExp(`${String(i+1).padStart(3,'0')}/${part.slide_count}$`));
      await page.keyboard.press('n');assert.equal(await page.locator('#notes[open]').count(),1);await page.keyboard.press('Escape');
    }
    await page.keyboard.press('End');await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.deck-page.active').getAttribute('data-id'),part.slides.at(-1).id);
    await page.keyboard.press('Home');assert.equal(await page.locator('.deck-page.active').getAttribute('data-id'),part.slides[0].id);
    if(part.id==='part-1'){
      await page.goto(pathToFileURL(path.resolve(part.file)).href+'#P008');
      assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),String(JSON.parse(fs.readFileSync('content/architecture-tour.json','utf8')).states.findIndex(s=>s.panel_id==='euler-update')));
      assert.equal(await page.locator('.arch-detail-panel:visible').count(),1);
    }
  }
  assert.deepEqual(seen,manifest.map(s=>s.id));
  const units=parts.flatMap(p=>p.slides).filter(s=>s.id!=='S001').flatMap(s=>s.source_ids);
  assert.equal(units.length,121);assert.equal(new Set(units).size,121);
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  fs.mkdirSync('qa/full-deck',{recursive:true});fs.writeFileSync('qa/full-deck/parts-report.json',JSON.stringify({counts:parts.map(p=>p.slide_count),boundary:['P098','P099'],localNumbering:true,scriptHeadings:true,studyUnits:units.length,errors,externalRequests:external},null,2));
  console.log('PASS: Part 1 (18), Part 2 (30), boundary, local numbering, scripts, notes, controls, merged links, all 121 units, offline.');
}finally{await browser.close();}
