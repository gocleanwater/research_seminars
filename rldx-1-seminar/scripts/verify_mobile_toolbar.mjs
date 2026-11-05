import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-chromium';

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const context = await browser.newContext({ hasTouch: true, isMobile: true, deviceScaleFactor: 2, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
const results = [];
const previews = 'review/previews/mobile-toolbar';
fs.mkdirSync(previews, { recursive: true });
try {
  await page.goto(pathToFileURL(path.resolve('presentation.html')).href);
  await page.evaluate(() => document.fonts.ready);
  for (const [width, height] of [[320,568],[360,640],[390,844],[430,932],[480,320],[568,320],[640,360],[768,1024],[844,390],[1024,768]]) {
    await page.setViewportSize({ width, height });
    await page.waitForFunction(() => {
      const stage = document.querySelector('#stage').getBoundingClientRect();
      return stage.width <= innerWidth + 1 && stage.height <= innerHeight + 1;
    });
    // Two frames allow resize observers and layout to settle after rotation.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const result = await page.evaluate(() => {
      const box = el => { const r = el.getBoundingClientRect(); return { x:r.x, y:r.y, right:r.right, bottom:r.bottom, width:r.width, height:r.height }; };
      return {
        width: innerWidth, height: innerHeight,
        toolbar: box(document.querySelector('.deck-toolbar')),
        stage: box(document.querySelector('#stage')),
        controls: [...document.querySelectorAll('.deck-toolbar button, #page-number')].map(el => ({ id:el.id, ...box(el) })),
        documentWidth: document.documentElement.scrollWidth
      };
    });
    const label = `${width}x${height}`;
    assert(result.toolbar.x >= 0 && result.toolbar.right <= width + 1, `${label}: toolbar fits horizontally`);
    assert(result.toolbar.y >= 0 && result.toolbar.bottom <= height, `${label}: toolbar fits vertically`);
    assert(result.stage.bottom <= result.toolbar.y - 7, `${label}: slide does not overlap controls`);
    for (const control of result.controls) {
      assert(control.x >= 0 && control.right <= width + 1 && control.bottom <= height, `${label}: ${control.id} is visible`);
      assert(control.width >= 44 && control.height >= 44, `${label}: ${control.id} has a 44px touch target`);
      for (const other of result.controls) {
        if (control.id === other.id) continue;
        const overlap = Math.min(control.right, other.right) - Math.max(control.x, other.x) > 1 && Math.min(control.bottom, other.bottom) - Math.max(control.y, other.y) > 1;
        assert(!overlap, `${label}: ${control.id} does not overlap ${other.id}`);
      }
    }
    assert(result.documentWidth <= width, `${label}: no horizontal page overflow`);
    results.push(result);
    if ([320,390,568,844].includes(width)) await page.screenshot({ path: `${previews}/${label}.png` });
  }
  await page.setViewportSize({ width:390, height:844 });
  const active = () => page.locator('.deck-page.active').getAttribute('data-id');
  await page.locator('#next').tap(); assert.equal(await active(), 'P002');
  await page.locator('#prev').tap(); assert.equal(await active(), 'S001');
  await page.locator('#page-number').fill('4'); await page.locator('#page-number').press('Enter');
  assert.equal(await active(), 'P032');
  await page.locator('#next').tap();
  assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'), '1');
  await page.locator('#page-number').fill('4'); await page.locator('#page-number').press('Enter');
  assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'), '0');
  for (const [button, dialog] of [['#open-toc','#toc'],['#open-notes','#notes']]) {
    await page.locator(button).tap(); assert.equal(await page.locator(`${dialog}[open]`).count(), 1);
    await page.locator(`${dialog} .dialog-close`).tap();
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync('qa/full-deck/mobile-toolbar-report.json', JSON.stringify({ results, touchNavigation:true, pageJumpResetsTour:true, dialogs:true, errors }, null, 2));
  console.log(`PASS: ${results.length} phone/tablet layouts, 44px touch targets, rotation, touch navigation, page jump, dialogs.`);
} finally {
  await browser.close();
}
