"""Checks for lossless, locally numbered seminar part exports."""
import json
from pathlib import Path
import re
import tempfile
import unittest

try:
    from parts_output import write_part_outputs
except ModuleNotFoundError:
    write_part_outputs = None


class PartOutputsTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.ids = ['S001', 'P032'] + [f'X{i:03d}' for i in range(14)] + ['P037', 'P020'] + [f'Y{i:03d}' for i in range(28)]
        self.manifest = [dict(order=i + 1, id=sid, title=f'Title {sid}', source_ids=[f'S{i+2:03d}']) for i, sid in enumerate(self.ids)]
        self.manifest[0]['source_ids'] = ['S001']
        for i, row in enumerate(self.manifest[1:]):
            row['source_ids'] = [f'S{j:03d}' for j in range(i + 2, 123, 45)]
        self.data = [dict(id=sid, title=f'Title {sid}', notes='literal ;const ASSETS= and & < >', notesHtml='<p data-x="a&amp;b">원문 &lt;note&gt;</p>') for sid in self.ids]
        pages = ''.join(f'<article class="deck-page{" active" if i == 0 else ""}" data-id="{sid}"><section><div><p>Keep &amp; &lt;article&gt; {sid}</p></div><footer><span class="source">원문</span><span class="slide-id">{sid} · {i+1:03d}/46</span></footer></section></article>' for i, sid in enumerate(self.ids))
        pages = pages.replace('class="slide-id">S001 · 001/46', 'class="cover-slide-id">S001')
        toc = ''.join(f'<a class="toc-entry" href="#{sid}" data-index="{i}" data-search="A &amp; B"><small>{sid}</small>Title</a>' for i, sid in enumerate(self.ids))
        self.runtime = 'const ASSETS={"image":"data:image/png;base64,xyz"};const ARCH_TOUR={"x":"&lt;"};function unchanged(){return "stage";}'
        self.html = '<!doctype html><html><head><title>RLDX-1 · 세미나</title><style>.deck-page{color:red}</style></head><body><main id="stage">' + pages + '</main><dialog><div id="toc-list">' + toc + '</div></dialog><script>const DECK=' + json.dumps(self.data, ensure_ascii=False).replace('<', '\\u003c') + ';' + self.runtime + '</script></body></html>'

    def export(self):
        self.assertIsNotNone(write_part_outputs, 'Part export implementation is missing')
        return write_part_outputs(self.root, self.html, self.manifest, self.data)

    def test_partition_order_local_numbering_and_first_active(self):
        result = self.export()
        self.assertEqual(result, json.loads((self.root / 'content/part-manifest.json').read_text()))
        self.assertEqual([p['slide_count'] for p in result['parts']], [17, 29])
        for number, expected in [(1, self.ids[:17]), (2, self.ids[17:])]:
            html = (self.root / f'part-{number}.html').read_text()
            self.assertEqual(re.findall(r'<article[^>]+data-id="([^"]+)"', html), expected)
            self.assertEqual(html.count('class="deck-page active"'), 1)
            self.assertIn(f'class="deck-page active" data-id="{expected[0]}"', html)
            for i, sid in enumerate(expected, 1):
                self.assertIn(f'{sid} · {i:03d}/{len(expected)}</span>', html)
            decoder = json.JSONDecoder()
            data, _ = decoder.raw_decode(html.split('const DECK=', 1)[1])
            self.assertEqual(data, [row for row in self.data if row['id'] in expected])
            self.assertEqual(re.findall(r'class="toc-entry" href="#([^"]+)"', html), expected)
            self.assertEqual(re.findall(r'data-index="(\d+)"', html), [str(i) for i in range(len(expected))])
        self.assertEqual([s['id'] for p in result['parts'] for s in p['slides']], self.ids)
        self.assertEqual([s['source_ids'] for p in result['parts'] for s in p['slides']], [s['source_ids'] for s in self.manifest])
        self.assertEqual(self.manifest[17]['order'], 18)
        study_ids = [source for part in result['parts'] for row in part['slides'] for source in row['source_ids'] if source != 'S001']
        self.assertEqual(len(study_ids), 121)
        self.assertEqual(set(study_ids), {f'S{i:03d}' for i in range(2, 123)})
        self.assertEqual([row['full_order'] for part in result['parts'] for row in part['slides']], list(range(1, 47)))

    def test_preserves_assets_runtime_escaped_content_and_adds_links_outside_stage(self):
        self.export()
        for number in (1, 2):
            html = (self.root / f'part-{number}.html').read_text()
            self.assertIn('<style>.deck-page{color:red}</style>', html)
            self.assertIn(self.runtime, html)
            self.assertIn('Keep &amp; &lt;article&gt;', html)
            self.assertIn('data-search="A &amp; B"', html)
            self.assertIn(f'<title>RLDX-1 · 세미나 · Part {number}</title>', html)
            self.assertIn(f'Part {number}', html.split('</main>', 1)[1].split('<dialog>', 1)[0])
            self.assertIn('href="presentation.html"', html)
            self.assertIn(f'href="part-{3-number}.html"', html)

    def test_rejects_missing_or_nonadjacent_boundary_before_writing(self):
        for change in ('missing', 'nonadjacent'):
            with self.subTest(change=change):
                manifest = [dict(row) for row in self.manifest]
                manifest[17]['id'] = 'OTHER' if change == 'missing' else manifest[18]['id']
                self.assertIsNotNone(write_part_outputs, 'Part export implementation is missing')
                with self.assertRaises(ValueError):
                    write_part_outputs(self.root, self.html, manifest, self.data)
                self.assertFalse((self.root / 'part-1.html').exists())


if __name__ == '__main__':
    unittest.main()
