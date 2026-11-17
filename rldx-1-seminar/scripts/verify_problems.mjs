import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-chromium';

const revision = JSON.parse(fs.readFileSync('content/deck-manifest.json','utf8'))[0].version;
const output = path.resolve(`review/previews/problems-${revision}`);
fs.mkdirSync(output, {recursive:true});
const browser = await chromium.launch({headless:true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try {
  const page = await browser.newPage({viewport:{width:1280,height:800}});
  const errors=[];
  page.on('pageerror', error=>errors.push(String(error)));
  await page.goto(pathToFileURL(path.resolve('presentation.html')).href+'#P002');
  await page.evaluate(()=>document.fonts.ready);
  const active=()=>page.locator('.deck-page.active').getAttribute('data-id');
  const walkthrough=page.locator('.deck-page.active .problems-walkthrough');
  assert.equal(await active(),'P002');
  assert.equal(await walkthrough.count(),1,'P002 needs a staged VLA explanation');
  for(let step=0;step<5;step++) {
    assert.equal(await walkthrough.getAttribute('data-problem-step'),String(step));
    assert.equal(await active(),'P002','a step must stay on the same slide');
    const visibleText=await page.locator('.deck-page.active').innerText();
    assert(!visibleText.includes('VLM'),'visible P002 must introduce VLA only');
    assert.equal(await walkthrough.locator('.problem-card:visible').count(),Math.min(step,3));
    if(step===1) {
      const motion=walkthrough.locator('[data-problem-card="1"]');
      assert.equal(await motion.locator('svg[role="img"]').count(),1,'motion problem needs a conveyor illustration');
      assert.equal(await motion.locator('.problem-capability').innerText(),'움직임을 읽는 능력 부족');
    }
    const geometry=await page.locator('.deck-page.active .seminar-slide').evaluate(slide=>{
      const body=slide.querySelector('.seminar-body').getBoundingClientRect();
      return [...slide.querySelectorAll('.vla-definition,.problem-card,.problem-step-label')].filter(el=>{
        if(getComputedStyle(el).visibility==='hidden')return false;
        const r=el.getBoundingClientRect();
        return r.left<body.left-2||r.right>body.right+2||r.top<body.top-2||r.bottom>body.bottom+2;
      }).map(el=>el.className);
    });
    assert.deepEqual(geometry,[],'P002 content should fit within the body');
    const cardOverflow=await walkthrough.locator('.problem-card:visible').evaluateAll(cards=>cards.flatMap(card=>{
      const box=card.getBoundingClientRect();
      return [...card.children].filter(el=>el.getBoundingClientRect().bottom>box.bottom-6).map(el=>el.className);
    }));
    assert.deepEqual(cardOverflow,[],'card labels need padding inside their borders');
    await page.locator('.deck-page.active').screenshot({path:path.join(output,`P002-step-${step+1}.png`)});
    await page.keyboard.press('ArrowRight');
  }
  assert.equal(await active(),'P031');
  await page.keyboard.press('ArrowLeft');
  assert.equal(await walkthrough.getAttribute('data-problem-step'),'4','reverse navigation enters the last step');
  for(let step=3;step>=0;step--) {
    await page.keyboard.press('ArrowLeft');
    assert.equal(await walkthrough.getAttribute('data-problem-step'),String(step));
  }
  await page.keyboard.press('ArrowLeft');
  assert.equal(await active(),'S001');
  const input=page.getByRole('spinbutton',{name:'현재 페이지 번호'});
  await input.fill('2');await input.press('Enter');
  assert.equal(await walkthrough.getAttribute('data-problem-step'),'0');
  await page.keyboard.press('ArrowRight');
  await input.fill('2');await input.press('Enter');
  assert.equal(await walkthrough.getAttribute('data-problem-step'),'0','page jump resets the explanation');
  assert.deepEqual(errors,[]);
  console.log('PASS: P002 five steps, VLA-only visible text, forward/reverse/page jump, geometry and 5 PNGs.');
} finally {
  await browser.close();
}
