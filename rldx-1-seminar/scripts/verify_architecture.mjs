import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-chromium';
const version=JSON.parse(fs.readFileSync('content/deck-manifest.json','utf8'))[0].version;
const out = path.resolve(`review/previews/architecture-${version}`);
fs.mkdirSync(out, {recursive:true});
const browser = await chromium.launch({headless:true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page = await browser.newPage({viewport:{width:1280,height:720}});
const errors=[];
page.on('pageerror', error=>errors.push(String(error)));
const url=pathToFileURL(path.resolve('presentation.html')).href+'?export=1#P032';
await page.goto(url);
await page.evaluate(()=>document.fonts.ready);
await page.locator('.arch-source-image').evaluate(im=>im.decode());
const explorer=page.locator('.architecture-explorer');
async function check(index,scene,step) {
  assert.equal(await explorer.getAttribute('data-state'),String(index));
  assert.equal(await explorer.getAttribute('data-scene'),scene);
  assert.equal(await explorer.getAttribute('data-step'),String(step));
  assert.equal(await explorer.locator('.arch-paths path').count(),step);
  assert.equal(await explorer.locator('.arch-annotation').count(),step);
  const bounds=await explorer.evaluate(root=>{
    const rr=root.getBoundingClientRect(); const issues=[];
    for (const el of root.querySelectorAll('.arch-annotations h3,.arch-annotations p,.arch-controls')) {
      const r=el.getBoundingClientRect();
      if(r.right>rr.right+2 || r.bottom>rr.bottom+2 || r.top<rr.top-1) issues.push(el.textContent);
    }
    return issues;
  });
  assert.deepEqual(bounds,[]);
  await page.waitForTimeout(800);
  await page.locator('.deck-page.active').screenshot({path:path.join(out,`step-${String(index).padStart(2,'0')}.png`)});
}
await check(0,'overview',0);
const original=await page.locator('.arch-camera').evaluate(el=>getComputedStyle(el).transform);
await page.locator('.arch-vision-hotspot').click();
await check(1,'vision',0);
assert.notEqual(await page.locator('.arch-camera').evaluate(el=>getComputedStyle(el).transform),original);
for(let i=2;i<=5;i++){await page.keyboard.press('ArrowRight'); await check(i,'vision',i-1);}
await page.keyboard.press('ArrowRight'); await check(6,'overview',0);
await page.locator('.arch-vlm-hotspot').click(); await check(7,'vlm',0);
for(let i=8;i<=11;i++){await page.keyboard.press('ArrowRight');await check(i,'vlm',i-7);}
assert.match(await page.locator('.arch-annotations').innerText(),/64/);
assert.match(await page.locator('.arch-annotations').innerText(),/18/);
await page.keyboard.press('ArrowRight');await check(12,'overview',0);
await page.keyboard.press('ArrowRight');
assert.equal(await page.locator('.deck-page.active').getAttribute('data-id'),'P005');
await page.goto(url);await check(0,'overview',0);
await page.locator('.arch-mode-buttons [data-arch-focus="vision"]').click();
await page.locator('[data-arch-next]').click();assert.equal(await explorer.getAttribute('data-state'),'2');
await page.locator('[data-arch-prev]').click();assert.equal(await explorer.getAttribute('data-state'),'1');
await page.keyboard.press('Escape');assert.equal(await explorer.getAttribute('data-state'),'0');
await page.emulateMedia({reducedMotion:'reduce'});
await page.locator('.arch-mode-buttons [data-arch-focus="vlm"]').click();
assert.equal(await explorer.getAttribute('data-scene'),'vlm');
assert.equal(await page.locator('.arch-camera').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
await page.keyboard.press('n');
assert.equal(await page.locator('#notes[open]').count(),1);
assert.match(await page.locator('#notes-text').innerText(),/S008/);
await page.keyboard.press('Escape');
assert.equal(await page.locator('.header-kind').count(),0);
assert.deepEqual(errors,[]);
fs.writeFileSync('qa/full-deck/architecture-report.json',JSON.stringify({states:13,arrows:8,checks:['hotspot zoom','right arrow sequence','button navigation','reset','next slide','hash reload','reduced motion','detail notes','bounds'],errors},null,2));
await browser.close();
console.log('PASS: Figure 3, 13 states, 8 sequential arrows, clicks/keyboard/reset/notes/reduced motion.');
