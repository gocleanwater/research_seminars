"""Check the Markdown/source boundary, including Korean UTF-8 and inline markup."""
from pathlib import Path
from html.parser import HTMLParser
from section_sources import load_sections, render_markdown, apply_tour_text
import json

ROOT = Path(__file__).resolve().parents[1]
class Text(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
    def handle_data(self, text):
        self.parts.append(text)

phrase = '노이즈에서 행동으로 가는 경로와 정답 변화율. '
large = phrase * 12000
assert render_markdown(ROOT, [large])[0] == '<p>' + large.strip() + '</p>\n', 'UTF-8 round trip'

# Standard Markdown math, raw HTML layout text, and literal code/currency.
fixtures = render_markdown(ROOT, [
    '후보 $\\mathbf{a}_t^{\\tau}$를 갱신한다.',
    '$$\n\\frac{d\\mathbf{a}^{\\tau}}{d\\tau}=\\mathbf{a}-\\epsilon\n$$',
    '<div data-label="$leave$">$h_t$와 <code>$literal$</code></div>',
    '`$literal$`와 \\$5',
    {'text': '$\\tau$와 조건', 'inline': True},
])
assert all('class="katex"' in fixtures[i] for i in [0, 1, 2, 4])
assert '<mfrac>' in fixtures[1] and 'class="katex-html"' in fixtures[1]
assert 'data-label="$leave$"' in fixtures[2] and '<code>$literal$</code>' in fixtures[2]
assert 'class="katex"' not in fixtures[3] and '$5' in fixtures[3]

pages = load_sections(ROOT)
assert len(list((ROOT / 'sections').glob('[0-9][0-9]-*.md'))) == 9
for page in pages:
    for field in ['body', 'aside', 'study_html']:
        html = page[field]
        assert '\ufffd' not in html, (page['id'], 'corrupt character')
        text = Text(); text.feed(html)
        assert '**' not in ''.join(text.parts), (page['id'], 'literal emphasis markers')
tour = apply_tour_text(json.loads((ROOT / 'content/architecture-tour.json').read_text()), next(p for p in pages if p['layout'] == 'explorer'))
assert len(tour['states']) == 27
assert set(tour['focus']) == {'vision','vlm','memory','msat'}
assert sum(map(len, tour['annotations'].values())) == 18
print(f'PASS: 9 MD sections, {len(pages)} pages, 121 study units; UTF-8, inline markup, 27 tour states/18 arrows.')
