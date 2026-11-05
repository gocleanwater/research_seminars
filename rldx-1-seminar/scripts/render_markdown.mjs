// Build-time KaTeX keeps Markdown math editable and the HTML fully offline.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const packages = path.resolve('node_modules/.pnpm');
function installed(name) {
  const folder = fs.readdirSync(packages).find(entry => entry.startsWith(name + '@'));
  if (!folder) throw new Error(`Missing existing Slidev dependency: ${name}`);
  return require(path.join(packages, folder, 'node_modules', name));
}
const MarkdownIt = installed('markdown-it');
const katex = installed('katex');
const md = new MarkdownIt({html:true, linkify:false, typographer:false});
function typeset(tex, displayMode) {
  return katex.renderToString(tex, {displayMode, output:'htmlAndMathml', throwOnError:true, strict:'ignore'});
}
function isEscaped(text, position) {
  let n=0;
  for(let i=position-1; i>=0 && text[i]==='\\'; i--) n++;
  return n%2===1;
}
function closing(text, start, delimiter) {
  let index=text.indexOf(delimiter,start);
  while(index>=0 && isEscaped(text,index)) index=text.indexOf(delimiter,index+delimiter.length);
  return index;
}
md.block.ruler.before('fence','math_block',(state,start,end,silent)=>{
  const line=state.src.slice(state.bMarks[start]+state.tShift[start],state.eMarks[start]).trim();
  if(!line.startsWith('$$')) return false;
  if(silent) return true;
  let formula=line.slice(2), next=start;
  if(formula.endsWith('$$')) formula=formula.slice(0,-2);
  else {
    const pieces=formula?[formula]:[];
    for(next=start+1;next<end;next++){
      const value=state.src.slice(state.bMarks[next]+state.tShift[next],state.eMarks[next]);
      if(value.trim().endsWith('$$')){pieces.push(value.replace(/\$\$\s*$/,''));break;}
      pieces.push(value);
    }
    if(next===end) throw new Error(`Unclosed display math near Markdown line ${start+1}`);
    formula=pieces.join('\n');
  }
  const token=state.push('math_block','',0);token.content=formula.trim();
  state.line=next+1;
  return true;
},{alt:['paragraph','reference','blockquote','list']});
md.renderer.rules.math_block=(tokens,index)=>`<div class="equation">${typeset(tokens[index].content,true)}</div>\n`;
md.inline.ruler.before('escape','math_inline',(state,silent)=>{
  if(state.src[state.pos]!=='$') return false;
  const delimiter=state.src[state.pos+1]==='$'?'$$':'$';
  const from=state.pos+delimiter.length, to=closing(state.src,from,delimiter);
  if(to<0 || to===from) return false;
  if(!silent){const token=state.push('math_inline','',0);token.content=state.src.slice(from,to);token.meta={display:delimiter==='$$'};}
  state.pos=to+delimiter.length;return true;
});
md.renderer.rules.math_inline=(tokens,index)=>typeset(tokens[index].content,tokens[index].meta.display);
// Markdown treats HTML layout blocks as raw HTML. Render math only in their
// text nodes; leave attributes, comments, code examples and scripts untouched.
function rawMathText(text){
  let result='',cursor=0;
  for(let i=0;i<text.length;i++){
    if(text[i]!=='$' || isEscaped(text,i)) continue;
    const delimiter=text[i+1]==='$'?'$$':'$';
    const to=closing(text,i+delimiter.length,delimiter);
    if(to<0 || to===i+delimiter.length) continue;
    const tex=text.slice(i+delimiter.length,to).replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');
    result+=text.slice(cursor,i)+typeset(tex,delimiter==='$$');
    cursor=to+delimiter.length;i=cursor-1;
  }
  return result+text.slice(cursor);
}
function rawHtmlMath(html){
  const tags=/<!--[\s\S]*?-->|<\/?[A-Za-z][A-Za-z0-9:-]*(?=[\s/>])(?:[^>"']|"[^"]*"|'[^']*')*>/g;
  let result='',cursor=0,excluded=0;
  for(const match of html.matchAll(tags)){
    const tag=match[0];
    result+=excluded?html.slice(cursor,match.index):rawMathText(html.slice(cursor,match.index));
    result+=tag;
    if(/^<\/(?:code|pre|script|style|textarea)\b/i.test(tag)) excluded=Math.max(0,excluded-1);
    else if(/^<(?:code|pre|script|style|textarea)\b/i.test(tag)) excluded++;
    cursor=match.index+tag.length;
  }
  return result+(excluded?html.slice(cursor):rawMathText(html.slice(cursor)));
}
md.renderer.rules.html_block=(tokens,index)=>rawHtmlMath(tokens[index].content);
const originalImage=md.renderer.rules.image;
md.renderer.rules.image=(tokens,index,options,env,self)=>{
  const src=tokens[index].attrGet('src')||'';
  if(src.includes('public/figures/')) tokens[index].attrSet('src','/figures/'+src.split('public/figures/').at(-1));
  return originalImage(tokens,index,options,env,self);
};
// A Buffer chunk may split a Korean UTF-8 character. Decode the complete input.
const input=JSON.parse(fs.readFileSync(0,'utf8'));
const rendered=input.map(value=>{
  const item=typeof value==='string'?{text:value}:value;
  return (item.inline?md.renderInline(item.text):md.render(item.text)).replaceAll('<h4>','<h3>').replaceAll('</h4>','</h3>');
});
process.stdout.write(JSON.stringify(rendered));
