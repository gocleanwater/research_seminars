import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-chromium';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1280,height:800}});
const errors=[];page.on('pageerror',e=>errors.push(String(e)));
async function active(){return page.locator('.deck-page.active').getAttribute('data-id');}
async function show(id){await page.evaluate(id=>window.deckShow(window.deckData.findIndex(s=>s.id===id)),id);}
try{
  await page.goto(pathToFileURL(path.resolve('presentation.html')).href);
  await page.evaluate(()=>document.fonts.ready);
  await page.keyboard.press('ArrowRight');assert.equal(await active(),'P002');
  await page.keyboard.press('ArrowLeft');assert.equal(await active(),'S001');
  await page.keyboard.press('Enter');assert.equal(await active(),'P002');
  await page.keyboard.press('Backspace');assert.equal(await active(),'S001');
  await page.keyboard.press('Space');assert.equal(await active(),'P002');
  await page.keyboard.press('Shift+Space');assert.equal(await active(),'S001');
  await page.keyboard.press('ArrowDown');assert.equal(await active(),'P002');
  await page.keyboard.press('ArrowUp');assert.equal(await active(),'S001');
  await page.keyboard.press('PageDown');assert.equal(await active(),'P002');
  await page.keyboard.press('PageUp');assert.equal(await active(),'S001');
  await page.keyboard.press('End');assert.equal(await active(),'P030');
  await page.keyboard.press('Home');assert.equal(await active(),'S001');
  // Blank slide canvas clicks advance, while figures retain zoom behavior.
  await page.locator('.deck-page.active').click({position:{x:50,y:30}});assert.equal(await active(),'P002');
  await show('P031');await page.locator('.deck-page.active .paper-figure img').click();
  assert.equal(await active(),'P031');assert.equal(await page.locator('#image-dialog[open]').count(),1);
  await page.keyboard.press('ArrowRight');assert.equal(await active(),'P031');
  await page.keyboard.press('Escape');
  // Buttons preserve native Enter/Space activation, without a second advance.
  await page.locator('#next').focus();await page.keyboard.press('Enter');assert.equal(await active(),'P032');
  assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),'0');
  await page.locator('#stage').click({position:{x:50,y:30}});
  assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),'1');
  for(let i=1;i<13;i++)await page.keyboard.press('ArrowRight');
  assert.equal(await active(),'P005');
  await page.keyboard.press('ArrowLeft');assert.equal(await active(),'P032');
  assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),'12');
  for(let i=11;i>=0;i--){await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.architecture-explorer').getAttribute('data-state'),String(i));}
  await page.keyboard.press('ArrowLeft');assert.equal(await active(),'P031');
  // Text entry and modifier shortcuts do not drive presentation navigation.
  await page.keyboard.press('g');await page.locator('#toc-search').fill('P032');
  await page.keyboard.press('ArrowRight');assert.equal(await active(),'P031');
  await page.keyboard.press('Escape');
  await page.locator('#toc').waitFor({state:'hidden'});
  await page.locator('#open-notes').focus();
  assert.equal(await page.evaluate(()=>document.activeElement?.id),'open-notes');
  await page.keyboard.press('Space');assert.equal(await page.locator('#notes[open]').count(),1);assert.equal(await active(),'P031');
  await page.keyboard.press('Escape');
  await page.keyboard.press('Control+ArrowRight');assert.equal(await active(),'P031');
  await page.keyboard.press('f');
  await page.waitForFunction(()=>!!document.fullscreenElement);
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>!document.fullscreenElement);
  assert.deepEqual(errors,[]);
  fs.writeFileSync('qa/full-deck/navigation-report.json',JSON.stringify({arrows:true,enterBackspace:true,spaceShiftSpace:true,upDownPageKeys:true,homeEnd:true,canvasClick:true,imageZoom:true,buttonFocus:true,tourReverseBoundary:true,dialogsAndModifiers:true,fullscreenEscape:true,errors},null,2));
  console.log('PASS: presentation keys/clicks, native buttons, dialogs, and reverse animation boundary.');
}finally{await browser.close();}
