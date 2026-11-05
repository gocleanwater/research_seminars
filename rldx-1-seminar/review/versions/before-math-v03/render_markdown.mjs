// Reuse the markdown-it and KaTeX already installed with Slidev.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const packages = path.resolve('node_modules/.pnpm');
function installed(name) {
  const folder = fs.readdirSync(packages).find(entry => entry.startsWith(name + '@'));
  if (!folder) throw new Error(`Missing existing Slidev dependency: ${name}`);
  return require(path.join(packages, folder, 'node_modules', name));
}
const MarkdownIt = installed('markdown-it');
const katex = installed('katex');
const md = new MarkdownIt({ html: true, linkify: false, typographer: false });
md.block.ruler.before('fence', 'math_block', (state, start, end, silent) => {
  const line = state.src.slice(state.bMarks[start] + state.tShift[start], state.eMarks[start]).trim();
  if (!line.startsWith('$$')) return false;
  if (silent) return true;
  let formula = line.slice(2), next = start;
  if (formula.endsWith('$$')) formula = formula.slice(0, -2);
  else {
    const pieces = formula ? [formula] : [];
    for (next = start + 1; next < end; next++) {
      const value = state.src.slice(state.bMarks[next] + state.tShift[next], state.eMarks[next]);
      if (value.trim().endsWith('$$')) { pieces.push(value.replace(/\$\$\s*$/, '')); break; }
      pieces.push(value);
    }
    formula = pieces.join('\n');
  }
  const token = state.push('html_block', '', 0);
  token.content = `<div class="equation">${katex.renderToString(formula.trim(), { displayMode: true, output: 'mathml', throwOnError: true })}</div>\n`;
  state.line = next + 1;
  return true;
});
const originalImage = md.renderer.rules.image;
md.renderer.rules.image = (tokens, index, options, env, self) => {
  const src = tokens[index].attrGet('src') || '';
  if (src.includes('public/figures/')) tokens[index].attrSet('src', '/figures/' + src.split('public/figures/').at(-1));
  return originalImage(tokens, index, options, env, self);
};
// Decode UTF-8 once: Buffer chunks can split a Korean character mid-byte.
const input = fs.readFileSync(0, 'utf8');
const rendered = JSON.parse(input).map(text => md.render(text).replaceAll('<h4>', '<h3>').replaceAll('</h4>', '</h3>'));
process.stdout.write(JSON.stringify(rendered));
