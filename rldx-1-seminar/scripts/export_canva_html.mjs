import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-chromium';

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto(pathToFileURL(path.resolve('presentation.html')).href + '?export=1', { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const pages = [];
for (let i = 0; i < 30; i++) {
  await page.evaluate(n => window.deckShow(n), i);
  await page.locator('.deck-page.active img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  pages.push(await page.evaluate(n => ({ ...window.deckData[n], markup: document.querySelector('.deck-page.active').innerHTML }), i));
}
await browser.close();
const source = fs.readFileSync('presentation.html', 'utf8');
const css = source.match(/<style>([\s\S]*?)<\/style>/)[1];
const attribute = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const markup = pages.map(p => `<article data-document-role="page" data-label="${attribute(p.id + ' ' + p.title)}" data-speaker-notes="${attribute(p.notes)}" style="position:relative;width:1280px;height:720px;overflow:hidden;break-after:page;">${p.markup}</article>`).join('\n');
const fonts = JSON.parse(fs.readFileSync('content/canva-fonts.json', 'utf8'));
const embeddedFont = fonts.map(font => {
  const bytes = fs.readFileSync(path.join('public/fonts', font.file)).toString('base64');
  const range = [...font.chars].map(c => `U+${c.codePointAt(0).toString(16)}`).join(',');
  return `@font-face{font-family:'Noto Sans KR';src:url(data:font/woff2;base64,${bytes}) format('${font.format}');font-weight:100 900;font-style:normal;font-display:block;unicode-range:${range};}`;
}).join('\n') + ` .seminar-slide,.cover-slide,.seminar-slide .equation{font-family:'Noto Sans KR',sans-serif!important;}`;
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>RLDX-1 Technical Report · 30장</title><style>${css}\n${embeddedFont}\nhtml,body{margin:0;padding:0;width:1280px;background:#fbfcfd;} article[data-document-role="page"]{display:block;isolation:isolate;}</style></head><body>${markup}</body></html>`;
fs.mkdirSync('output', { recursive: true });
fs.writeFileSync('output/rldx-1-canva-static.html', html);
if (pages.length !== 30 || /<script\b/i.test(html)) throw new Error('Expected 30 static pages and no scripts.');
console.log(`Saved static Canva import: 30 pages, ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MiB, speaker notes retained.`);
