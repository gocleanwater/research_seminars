import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-chromium';

const project = process.cwd();
const version = JSON.parse(fs.readFileSync('content/deck-manifest.json','utf8'))[0].version;
const output = path.join(project, `review/previews/deck-${version}`);
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const errors = [];
const requests = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('request', req => { if (/^https?:/.test(req.url())) requests.push(req.url()); });
await page.goto(pathToFileURL(path.join(project, 'presentation.html')).href + '?export=1', { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const count = await page.evaluate(() => window.deckData.length);
const results = [];
for (let i = 0; i < count; i++) {
  await page.evaluate(n => window.deckShow(n), i);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.deck-page.active img').evaluateAll(ims => Promise.all(ims.map(im => im.decode())));
  const result = await page.locator('.deck-page.active').evaluate(root => {
    const slide = root.firstElementChild;
    const r = slide.getBoundingClientRect();
    const body = slide.querySelector('.seminar-body');
    const b = body?.getBoundingClientRect();
    const overflow = [];
    if (body) {
      for (const area of body.querySelectorAll('.body-main,.body-aside')) {
        const ar = area.getBoundingClientRect();
        if (area.scrollHeight > area.clientHeight + 3) overflow.push({ area: area.className, type: 'height', actual: area.scrollHeight, available: area.clientHeight });
        if (area.scrollWidth > area.clientWidth + 3) overflow.push({ area: area.className, type: 'width', actual: area.scrollWidth, available: area.clientWidth });
        for (const el of area.querySelectorAll('p,h3,table,.equation,.flow,.sequence,.callout')) {
          const q = el.getBoundingClientRect();
          if (q.bottom > b.bottom + 3) overflow.push({ area: area.className, type: 'bottom', content: el.textContent.slice(0, 75), actual: Math.round(q.bottom - b.top), available: Math.round(b.height) });
          if (q.right > ar.right + 3) overflow.push({ area: area.className, type: 'right', content: el.textContent.slice(0, 75) });
        }
      }
      const lead = slide.querySelector('.slide-lead').getBoundingClientRect();
      if (lead.bottom > b.top - 5) overflow.push({ type: 'header-body', bottom: lead.bottom, bodyTop: b.top });
      const takeaway = slide.querySelector('.takeaway').getBoundingClientRect();
      if (takeaway.top < b.bottom + 2) overflow.push({ type: 'body-takeaway', takeawayTop: takeaway.top, bodyBottom: b.bottom });
    }
    return { id: root.dataset.id, title: root.getAttribute('aria-label'), width: r.width, height: r.height, overflow, imageCount: root.querySelectorAll('img').length, imagesLoaded: [...root.querySelectorAll('img')].every(im => im.complete && im.naturalWidth > 0) };
  });
  await page.locator('.deck-page.active').screenshot({ path: path.join(output, `${result.id}-${version}.png`) });
  results.push(result);
  if ((i + 1) % 20 === 0 || result.overflow.length) console.log(`${i + 1}/${count} ${result.id}${result.overflow.length ? ' overflow=' + JSON.stringify(result.overflow) : ' OK'}`);
}
// Exercise controls, search, notes, and image expansion with actual DOM events.
await page.evaluate(() => window.deckShow(0));
await page.keyboard.press('ArrowRight');
const keyboardPassed = (await page.locator('.deck-page.active').getAttribute('data-id')) === 'P002';
await page.keyboard.press('g');
await page.locator('#toc-search').fill('S053');
await page.locator('.toc-entry:visible').click();
const searchPassed = (await page.locator('.deck-page.active').getAttribute('data-id')) === 'P015';
await page.keyboard.press('n');
const notesPassed = await page.locator('#notes[open]').count() === 1 && (await page.locator('#notes-text').innerText()).includes('상세 해설 S053');
await page.keyboard.press('Escape');
await page.evaluate(() => window.deckShow(0));
await page.locator('.cover-system img').click();
const zoomPassed = await page.locator('#image-dialog[open]').count() === 1;
await page.keyboard.press('Escape');
await page.evaluate(() => window.deckShow(2));
await page.keyboard.press('n');
const detailImagesPassed = await page.locator('#notes-text img').count() > 0;
const distinctionPassed = /원문 설명·결과/.test(await page.locator('#notes-text').innerText()) && /우리 해석/.test(await page.locator('#notes-text').innerText());
await page.keyboard.press('Escape');
const studyUnits = await page.evaluate(() => window.deckData.reduce((n, s) => n + (s.notesHtml.match(/class="study-unit"/g)?.length || 0), 0));
const report = { count, studyUnits, errors, networkRequests: requests, controls: { keyboardPassed, searchPassed, notesPassed, zoomPassed, detailImagesPassed, distinctionPassed }, results };
fs.writeFileSync('qa/full-deck/render-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ count, errors, networkRequests: requests.length, controls: report.controls, overflowSlides: results.filter(x => x.overflow.length).map(x => x.id) }, null, 2));
await browser.close();
if (count !== JSON.parse(fs.readFileSync('content/deck-manifest.json', 'utf8')).length || studyUnits !== 121 || errors.length || requests.length || results.some(x => x.overflow.length || !x.imagesLoaded) || Object.values(report.controls).some(x => !x)) process.exitCode = 1;
