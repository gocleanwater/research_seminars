"""Validate the rehearsal script against the current deck and Markdown renderer."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
text = (ROOT / 'SPEAKER_SCRIPT.md').read_text(encoding='utf-8')
manifest = json.loads((ROOT / 'content/deck-manifest.json').read_text())
tour = json.loads((ROOT / 'content/architecture-tour.json').read_text())
assert f'발표 자료 {manifest[0]["version"]}' in text, 'script targets an older deck revision'
headings = list(re.finditer(r'^## (\d{2}) · ([SP]\d{3}) · (.+)$', text, re.M))
assert len(headings) == len(manifest)
sections = {}
for index, (heading, slide) in enumerate(zip(headings, manifest)):
    assert (int(heading[1]), heading[2], heading[3]) == (
        slide['order'], slide['id'], slide['title']), heading[0]
    end = headings[index + 1].start() if index + 1 < len(headings) else len(text)
    body = text[heading.end():end].strip()
    assert len(body) >= 150, (slide['id'], 'missing speech')
    sections[slide['id']] = body

states = re.findall(r'^### 단계 (\d{2})/27 · .+$', sections['P032'], re.M)
assert [int(n) for n in states] == list(range(1, len(tour['states']) + 1))
assert text.count('$$') % 2 == 0
assert len(re.findall(r'^## ', text, re.M)) == len(manifest)
for placeholder in ['\ufffd', 'TODO', 'TBD', 'PLACEHOLDER']:
    assert placeholder not in text
# Removed appendix experiments must not reappear in the spoken slide sections.
spoken = '\n'.join(body for body in sections.values())
assert not re.search(r'PEFT|Best-of-N|\bBoN\b|Table ?(?:6|8|9|10|11|12|13|14|15)\b', spoken)

node = shutil.which('node') or '/Users/jungsoo_ko/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node'
result = subprocess.run([node, str(ROOT / 'scripts/render_markdown.mjs')],
                        cwd=ROOT, input=json.dumps([text]), text=True,
                        capture_output=True, check=True)
html = json.loads(result.stdout)[0]

class Headings(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h2 = 0
        self.h3 = 0

    def handle_starttag(self, tag, attrs):
        self.h2 += tag == 'h2'
        self.h3 += tag == 'h3'

parsed = Headings()
parsed.feed(html)
assert parsed.h2 == len(manifest)
assert parsed.h3 == len(tour['states'])
assert 'katex-error' not in html and 'class="katex"' in html
assert (ROOT / 'review/SLIDE_INDEX.md').exists()
report = {
    'deck_version': manifest[0]['version'],
    'slides': len(headings),
    'architecture_steps': len(states),
    'characters': len(text),
    'order_and_titles_match': True,
    'markdown_and_math_render': True,
    'removed_appendix_topics_absent': True,
}
output = ROOT / 'qa/full-deck/speaker-script-report.json'
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(report, ensure_ascii=False))
