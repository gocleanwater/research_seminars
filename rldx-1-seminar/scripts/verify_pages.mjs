import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-chromium';
const root=path.resolve('deployment/site/research_seminar');
const prefix='/research_seminars/';
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost').pathname;
  if(!url.startsWith(prefix)){res.writeHead(404).end();return;}
  let file=path.resolve(root,url.slice(prefix.length));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404).end();return;}
  res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1280,height:800}});
const errors=[],external=[];
page.on('pageerror',e=>errors.push(String(e)));
page.on('request',r=>{if(!r.url().startsWith(origin)&&/^https?:/.test(r.url()))external.push(r.url());});
try{
  await page.goto(origin+prefix);await page.getByRole('link',{name:/RLDX-1 Technical Report/}).click();
  await page.waitForFunction(()=>Array.isArray(window.deckData));
  assert.equal(new URL(page.url()).pathname,prefix+'rldx-1-seminar/');
  assert.equal(await page.locator('.cover-system img').getAttribute('data-asset'),'fig-01.png');
  await page.keyboard.press('g');await page.locator('#toc-search').fill('P032');await page.locator('.toc-entry:visible').click();
  await page.locator('.arch-mode-buttons [data-arch-focus="vlm"]').click();await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),'8');
  assert.equal(await page.locator('.arch-paths path').count(),1);
  await page.keyboard.press('n');assert.equal(await page.locator('#notes[open]').count(),1);
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  fs.writeFileSync('qa/full-deck/pages-report.json',JSON.stringify({path:prefix+'rldx-1-seminar/',landingLink:true,cover:true,fig3:true,notes:true,errors,externalRequests:external},null,2));
  console.log('PASS: repository subfolder URL, landing link, cover, Figure 3, notes; external requests 0.');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
