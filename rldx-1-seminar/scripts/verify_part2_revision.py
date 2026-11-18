"""Guard the requested untouched material and original study content."""
from pathlib import Path
import json,re,subprocess
from section_sources import load_sections
ROOT=Path(__file__).resolve().parents[1]
BASE='f69903e'  # Latest user-edited script checkpoint before the opinion rewrite.
def before(name):
    return subprocess.check_output(['git','show',f'{BASE}:rldx-1-seminar/{name}'],cwd=ROOT,text=True)
def blocks(s):
    return {m[1]:m[0].strip() for m in re.finditer(r'^## \[([SP]\d{3})\].*?(?=^## \[|\Z)',s,re.M|re.S)}
oldparts=json.loads(before('content/part-manifest.json'))['parts']
protected={s['id'] for s in oldparts[0]['slides']}|{s['id'] for s in oldparts[1]['slides'][:8]}|{'P111','P100'}
protected-= {'S001','P020','P038'}
old={};new={}
for p in (ROOT/'sections').glob('[0-9][0-9]-*.md'):
    old.update(blocks(before(str(p.relative_to(ROOT)))));new.update(blocks(p.read_text()))
for sid in protected:assert old[sid]==new[sid],('protected source changed',sid)
assert before('content/cover.html')==(ROOT/'content/cover.html').read_text()
def speeches(s):
    return {m[1]:m[2].strip() for m in re.finditer(r'^## \d{2} · ([SP]\d{3}) · [^\n]+\n(.*?)(?=^## \d{2} · |\Z)',s,re.M|re.S)}
for name in ['SPEAKER_SCRIPT.md','SPEAKER_SCRIPT_PART1.md','SPEAKER_SCRIPT_PART2.md']:
    a,b=speeches(before(name)),speeches((ROOT/name).read_text())
    for sid in protected|{'S001'}:
        if sid in a:assert a[sid]==b[sid],('protected speech changed',name,sid)
pages=load_sections(ROOT)
units={u['id']:u for p in pages for u in p['_units']}
assert units==json.loads((ROOT/'review/versions/before-part2-v37/study-units.json').read_text())
parts=json.loads((ROOT/'content/part-manifest.json').read_text())['parts']
assert [s['id'] for s in parts[1]['slides'][:8]]==[s['id'] for s in oldparts[1]['slides'][:8]]
assert [p['slide_count'] for p in parts]==[21,24]
assert all(sid not in new for sid in json.loads((ROOT/'review/PART2_V42_MERGES.json').read_text()))
print('PASS: Part1, front1–8 except requested6/7, unchanged divider/Q&A, cover and all121 original study units preserved; merged24-page Part2.')
