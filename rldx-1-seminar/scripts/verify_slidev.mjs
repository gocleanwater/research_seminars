import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright-chromium';

const root = path.resolve('dist');
const prefix = '/rldx-1-seminar/';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (!url.startsWith(prefix)) { res.writeHead(404).end(); return; }
  let file = path.resolve(root, url.slice(prefix.length) || 'index.html');
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(root, 'index.html');
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
await new Promise(resolve => server.listen(4175, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
const manifest = JSON.parse(fs.readFileSync('content/deck-manifest.json', 'utf8'));
const results = [];
for (let i = 1; i <= manifest.length; i++) {
  await page.goto(`http://127.0.0.1:4175${prefix}${i}`, { waitUntil: 'networkidle' });
  const selector = `.slidev-page-${i} ${i === 1 ? '.cover-slide' : '.seminar-slide'}`;
  const slide = page.locator(selector);
  await slide.waitFor({ state: 'visible' });
  await slide.locator('img').evaluateAll(ims => Promise.all(ims.map(im => im.decode())));
  const result = await slide.evaluate(el => ({ title: el.querySelector('h1').textContent, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height, imageUrls: [...el.querySelectorAll('img')].map(im => im.getAttribute('src')) }));
  result.id = manifest[i - 1].id;
  result.order = i;
  result.passed = result.width === 1280 && result.height === 720 && (i === 1 ? result.title === 'RLDX-1' : result.title === manifest[i - 1].title);
  results.push(result);
  if ([1, 7, 10, 24, 30].includes(i)) await slide.screenshot({ path: `qa/full-deck/slidev-${i}.png` });
}
fs.writeFileSync('qa/full-deck/slidev-report.json', JSON.stringify({ count: results.length, errors, results }, null, 2));
console.log(JSON.stringify({ count: results.length, errors, failed: results.filter(x => !x.passed) }, null, 2));
await browser.close();
await new Promise(resolve => server.close(resolve));
if (errors.length || results.some(x => !x.passed)) process.exitCode = 1;
