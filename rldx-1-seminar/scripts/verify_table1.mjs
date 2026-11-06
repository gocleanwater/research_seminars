import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-chromium';
// Validation reference transcribed from, and checked against, PDF p.18.
// Editable presentation content remains in the section Markdown files.
const reference=JSON.parse(fs.readFileSync('review/TABLE1_VALUES.json','utf8'));
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try {
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  await page.goto(pathToFileURL(path.resolve('presentation.html')).href);
  await page.evaluate(()=>document.fonts.ready);
  for(const [id,start,end] of [['P022',0,7],['P095',7,13]]) {
    await page.evaluate(id=>window.deckShow(window.deckData.findIndex(s=>s.id===id)),id);
    const table=page.locator('.deck-page.active .table-one');
    assert.equal(await table.locator('thead th').count(),8);
    assert.equal(await table.locator('tbody tr').count(),end-start);
    for(const [i,row] of reference.rows.slice(start,end).entries()) {
      const rendered=table.locator('tbody tr').nth(i);
      assert.deepEqual(await rendered.locator('th,td').allTextContents(),[row.label,...row.values.map(v=>v??'—'),row.delta_pp]);
      const best=Math.max(...row.values.slice(0,5).filter(v=>v!==null).map(Number));
      assert.equal(Number(row.delta_pp),Math.round((Number(row.values[5])-best)*10)/10);
      assert.deepEqual(await rendered.locator('.best-baseline').allTextContents(),row.values.slice(0,5).filter(v=>v!==null&&Number(v)===best));
      assert.equal(await rendered.locator('.ours').innerText(),row.values[5]);
    }
    const overflow=await table.locator('th,td').evaluateAll(cells=>cells.filter(el=>el.scrollWidth>el.clientWidth+1).map(el=>el.textContent));
    assert.deepEqual(overflow,[],'no clipped table labels or values');
    assert.equal(await page.locator('.deck-page.active .body-aside').count(),0);
  }
  const report={pdfCells:78,benchmarks:13,comparisonColumns:8,deltaUnit:'percentage points',allValues:true,maxBaselines:true,missingValuePreserved:true,cellOverflow:0};
  fs.writeFileSync('qa/full-deck/table1-report.json',JSON.stringify(report,null,2));
  console.log('PASS: complete Table 1, 78 source cells, 13 best-baseline deltas, no clipped cells.');
} finally {await browser.close();}
