"""Export two locally numbered decks without rebuilding their markup or assets."""
from dataclasses import dataclass
from html import escape
from html.parser import HTMLParser
import json
from pathlib import Path
import re


PART_TOPICS = {1: '모델 구조와 학습', 2: '추론·실험·분석'}

def grouped_toc(groups, sibling_links=None):
    """Keep local entry indices intact while separating the two presentation Parts."""
    sibling_links = sibling_links or {}
    html = []
    for number, entries in groups:
        label = f'Part {number}'
        topic = PART_TOPICS[number]
        link = sibling_links.get(number)
        content = ''.join(entries)
        if not content and link:
            content = f'<a class="toc-part-link" href="{escape(link, quote=True)}">{label}로 이동 →</a>'
        if content:
            html.append(f'<section class="toc-group" data-toc-part="{number}" data-label="{label} {topic}"><h3>{label}</h3><p class="toc-part-topic">{topic}</p><div class="toc-entries">{content}</div></section>')
    return ''.join(html)


@dataclass
class _Element:
    tag: str
    attrs: dict
    start: int
    inner: int
    close: int = 0
    end: int = 0


class _Document(HTMLParser):
    """Locate original source spans; never serialize parsed HTML back to text."""
    _VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
             'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.elements = []
        self.stack = []
        self.feed(source)
        self.close()

    def _position(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column

    def handle_starttag(self, tag, attrs):
        start = self._position()
        element = _Element(tag, dict(attrs), start, start + len(self.get_starttag_text()))
        self.elements.append(element)
        if tag in self._VOID:
            element.close = element.end = element.inner
        else:
            self.stack.append(element)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self._VOID:
            element = self.stack.pop()
            element.close = element.end = element.inner

    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1].tag != tag:
            raise ValueError(f'Cannot export malformed HTML near </{tag}>')
        element = self.stack.pop()
        element.close = self._position()
        element.end = self.source.index('>', element.close) + 1

    def one(self, predicate):
        matches = [element for element in self.elements if predicate(element)]
        if len(matches) != 1:
            raise ValueError(f'Expected one matching HTML element; found {len(matches)}')
        return matches[0]


def _has_class(element, name):
    return name in element.attrs.get('class', '').split()


def _replace(source, changes):
    for start, end, replacement in sorted(changes, reverse=True):
        source = source[:start] + replacement + source[end:]
    return source


def _number_page(source, page, number, total):
    markup = source[page.start:page.end]
    parsed = _Document(markup)
    article = parsed.one(lambda e: e.tag == 'article' and _has_class(e, 'deck-page'))
    opening = markup[:article.inner]
    classes = [name for name in article.attrs['class'].split() if name != 'active']
    if number == 1:
        classes.append('active')
    opening, count = re.subn(r'\bclass\s*=\s*([\'"])(.*?)\1',
                            lambda m: 'class=' + m[1] + ' '.join(classes) + m[1],
                            opening, count=1, flags=re.S)
    if count != 1:
        raise ValueError('Deck article must have a quoted class attribute')
    footer = parsed.one(lambda e: e.tag == 'span' and
                        (_has_class(e, 'slide-id') or _has_class(e, 'cover-slide-id')))
    label = f'{escape(page.attrs["data-id"])} · {number:03d}/{total}'
    return _replace(markup, [(0, article.inner, opening), (footer.inner, footer.close, label)])


def write_part_outputs(root: Path, full_html: str, manifest: list[dict],
                       deck_data: list[dict]) -> dict:
    """Write part-1.html, part-2.html and content/part-manifest.json.

    Return the saved manifest: ``{'parts': [{id, title, file, slide_count,
    slides}]}``. Each slides row retains the full manifest metadata with local
    ``order`` and original ``full_order``. Original input objects are untouched.
    """
    ids = [row['id'] for row in manifest]
    if len(ids) != len(set(ids)) or ids != [row['id'] for row in deck_data]:
        raise ValueError('Manifest and DECK must have the same unique ordered IDs')
    if 'P037' not in ids or 'P020' not in ids:
        raise ValueError('Both part boundaries P037 and P020 are required')
    boundary_ids = {'P097', 'P098', 'P099', 'P100'}
    if boundary_ids.intersection(ids):
        if not boundary_ids.issubset(ids):
            raise ValueError('Part divider/Q&A pages must be present as a complete set')
        recap_ids = {'P101', 'P102', 'P103'}
        if {'P102', 'P103'}.intersection(ids):
            if not recap_ids.issubset(ids):
                raise ValueError('The three-page recap must be complete')
            split = ids.index('P099')
            start = ['P099', 'P101', 'P102', 'P103'] + (['P108'] if 'P108' in ids else []) + ['P020']
            valid_start = ids[split:split + len(start)] == start
        else:
            split = ids.index('P099')
            valid_start = (ids[split + 1] == 'P020'
                           or ids[split + 1:split + 3] == ['P101', 'P020'])
        if (ids[:2] != ['S001', 'P097'] or ids[split - 1] != 'P098'
                or not valid_start or ids[-1] != 'P100'
                or ids[ids.index('P037') + 1:split] != ['P096', 'P098']):
            raise ValueError('Each Part requires its start divider and ending Q&A in order')
    else:
        split = ids.index('P020')
        tail = ids[ids.index('P037') + 1:split]
        if split <= ids.index('P037') or tail not in ([], ['P096']):
            raise ValueError('P037 must precede P020, with only optional Part 1 recap P096 between them')
    doc = _Document(full_html)
    stage = doc.one(lambda e: e.tag == 'main' and e.attrs.get('id') == 'stage')
    toc = doc.one(lambda e: e.tag == 'div' and e.attrs.get('id') == 'toc-list')
    title = doc.one(lambda e: e.tag == 'title')
    pages = [e for e in doc.elements if e.tag == 'article' and _has_class(e, 'deck-page')
             and stage.inner <= e.start < stage.close]
    entries = [e for e in doc.elements if e.tag == 'a' and _has_class(e, 'toc-entry')
               and toc.inner <= e.start < toc.close]
    if [e.attrs.get('data-id') for e in pages] != ids or [e.attrs.get('href') for e in entries] != ['#' + sid for sid in ids]:
        raise ValueError('HTML pages and table of contents must match the manifest')
    script = doc.one(lambda e: e.tag == 'script' and full_html[e.inner:e.close].startswith('const DECK='))
    deck_start = script.inner + len('const DECK=')
    embedded, consumed = json.JSONDecoder().raw_decode(full_html[deck_start:script.close])
    if embedded != deck_data:
        raise ValueError('Embedded DECK differs from supplied deck data')
    outputs = []
    result = {'parts': []}
    for number, (start, end) in enumerate(((0, split), (split, len(ids))), 1):
        count = end - start
        page_html = ''.join(_number_page(full_html, page, i + 1, count)
                            for i, page in enumerate(pages[start:end]))
        # A topic outside this subset must open the sibling file, not a dead hash.
        local_ids = set(ids[start:end])
        def route_link(match):
            target = match[3]
            if target in ids and target not in local_ids:
                return f'{match[1]}{match[2]}part-{3-number}.html#{target}{match[2]}'
            return match[0]
        page_html = re.sub(r'(\bhref\s*=\s*)([\'"])#([SP]\d{3})\2', route_link, page_html)
        toc_html = []
        for i, entry in enumerate(entries[start:end]):
            original = full_html[entry.start:entry.end]
            opening = full_html[entry.start:entry.inner]
            opening, replacements = re.subn(r'\bdata-index\s*=\s*([\'"])\d+\1',
                                             f'data-index="{i}"', opening, count=1)
            if replacements != 1:
                raise ValueError('TOC entries require a numeric data-index')
            toc_html.append(opening + original[entry.inner - entry.start:])
        data = json.dumps(deck_data[start:end], ensure_ascii=False).replace('<', '\\u003c')
        label = f'Part {number}'
        links = (f'<nav class="part-links" aria-label="발표 파트 선택"><strong>{label}</strong>'
                 '<a href="presentation.html">전체 발표</a>'
                 f'<a href="part-{3-number}.html">Part {3-number}</a></nav>')
        html = _replace(full_html, [
            (stage.inner, stage.close, page_html),
            (stage.end, stage.end, links),
            (toc.inner, toc.close, grouped_toc([(n, toc_html if n == number else []) for n in (1, 2)], {3-number: f'part-{3-number}.html#{ids[0] if number == 2 else ids[split]}'})),
            (title.inner, title.close, full_html[title.inner:title.close] + f' · {label}'),
            (deck_start, deck_start + consumed, data),
        ])
        filename = f'part-{number}.html'
        outputs.append((root / filename, html))
        result['parts'].append(dict(id=f'part-{number}', title=label, file=filename,
                                    slide_count=count, slides=[
                                        dict(row, order=i + 1, full_order=row['order'])
                                        for i, row in enumerate(manifest[start:end])]))
    # Validate every part before emitting any output.
    (root / 'content').mkdir(parents=True, exist_ok=True)
    for path, html in outputs:
        path.write_text(html, encoding='utf-8')
    (root / 'content/part-manifest.json').write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    return result
