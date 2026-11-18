"""Read the nine editable Markdown sections, without rewriting their sources."""
from pathlib import Path
from collections import Counter
import json
import re
import shutil
import subprocess

FIELDS = ['한 문장', '본문', '보충', '요점', '출처', '발표 메모', '상세 공부 기록', '확대 단계', '화살표 설명', '그림 위 표시', '그림 설명 카드']
STUDY_FIELDS = ['한 문장', '본문', '보충', '요점', '출처', '발표 메모']
NODE_FALLBACK = '/Users/jungsoo_ko/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node'

def render_markdown(root, values):
    command = [shutil.which('node') or NODE_FALLBACK, str(root / 'scripts/render_markdown.mjs')]
    result = subprocess.run(command, cwd=root, input=json.dumps(values, ensure_ascii=False), capture_output=True, text=True, check=True)
    return json.loads(result.stdout)

def field_sections(text, level, labels):
    pattern = re.compile(r'^' + '#' * level + r' (' + '|'.join(map(re.escape, labels)) + r')[ \t]*$', re.M)
    matches = list(pattern.finditer(text))
    return {m[1]: text[m.end():matches[i + 1].start() if i + 1 < len(matches) else len(text)].strip()
            for i, m in enumerate(matches)}

def sections(text):
    return field_sections(text, 3, FIELDS)

def metadata(block, label):
    match = re.search(r'<!--[ \t]*' + re.escape(label) + r'[ \t]*\n(.*?)-->', block, re.S)
    if not match:
        raise ValueError(f'Missing {label}')
    result = {}
    for line in match[1].splitlines():
        if ':' in line:
            key, value = line.split(':', 1)
            result[key.strip()] = value.strip()
    return result

def load_sections(root):
    pages = []
    for file in sorted((root / 'sections').glob('[0-9][0-9]-*.md')):
        text = file.read_text()
        chapter_match = re.search(r'^# (.+)$', text, re.M)
        if not chapter_match:
            raise ValueError(f'Missing section heading: {file}')
        chapter = chapter_match[1].strip()
        matches = list(re.finditer(r'^## \[([SP]\d{3})\]\s+(.+)$', text, re.M))
        for i, match in enumerate(matches):
            block = text[match.end():matches[i + 1].start() if i + 1 < len(matches) else len(text)]
            config = metadata(block, 'slide-meta')
            parts = sections(block)
            row = dict(id=match[1], title=match[2].strip(), chapter=config.get('chapter', chapter),
                       layout=config.get('layout', 'full'), kind=config.get('kind', 'fact'),
                       lead=parts.get('한 문장', ''), takeaway=parts.get('요점', ''), source=parts.get('출처', ''),
                       source_ids=[s.strip() for s in config.get('source_ids', '').split(',') if s.strip()],
                       markdown_source=str(file.relative_to(root)), _parts=parts)
            if config.get('figure'):
                row['figure'] = config['figure']
                row['caption'] = config.get('caption', '')
            pages.append(row)
    if len({p['id'] for p in pages}) != len(pages):
        raise ValueError('Duplicate presentation IDs in Markdown')
    work = []
    for row in pages:
        work.extend([row['_parts'].get('본문', ''), row['_parts'].get('보충', ''),
                     {'text': row['lead'], 'inline': True}, {'text': row['takeaway'], 'inline': True}])
        matches = list(re.finditer(r'^#### \[(S\d{3})\][ \t]+([^\n]+)$', row['_parts'].get('상세 공부 기록', ''), re.M))
        detail = row['_parts'].get('상세 공부 기록', '')
        row['_units'] = []
        for i, match in enumerate(matches):
            content = detail[match.end():matches[i + 1].start() if i + 1 < len(matches) else len(detail)]
            unit = dict(id=match[1], title=match[2].strip(),
                        config=metadata(content, 'study-meta'),
                        parts=field_sections(content, 5, STUDY_FIELDS))
            row['_units'].append(unit)
    mapped = Counter(sid for row in pages for sid in row['source_ids'])
    expected = {f'S{i:03}' for i in range(2, 123)}
    if set(mapped) != expected or any(count != 1 for count in mapped.values()):
        raise ValueError('Markdown must map S002–S122 exactly once')
    rendered = iter(render_markdown(root, work))
    for row in pages:
        row['body'] = next(rendered)
        row['aside'] = next(rendered)
        row['lead'] = next(rendered)
        row['takeaway'] = next(rendered)
        assert [u['id'] for u in row['_units']] == row['source_ids'], (row['id'], 'detail mapping')
    return pages

def apply_tour_text(tour, page):
    parts = page.get('_parts', {})
    states = list(re.finditer(r'^#### \[(\d+)\][ \t]+([^\n]+)\n(.*?)(?=^#### \[|\Z)', parts.get('확대 단계', ''), re.M | re.S))
    if Counter(int(match[1]) for match in states) != Counter(range(len(tour['states']))):
        raise ValueError('Markdown walkthrough state IDs do not match tour configuration')
    for match in states:
        state = tour['states'][int(match[1])]
        state['title'] = match[2].strip()
        for label, key in [('핵심', 'lead'), ('설명', 'note'), ('요점', 'takeaway')]:
            value = re.search(r'^' + label + r':[ \t]*([^\r\n]*)$', match[3], re.M)
            if value:
                state[key] = value[1].strip()
    arrows = list(re.finditer(r'^#### \[(vision|vlm|memory|msat)-(\d+)\][ \t]+([^\n]+)\n(.*?)(?=^#### \[|\Z)', parts.get('화살표 설명', ''), re.M | re.S))
    expected = Counter((scene, index) for scene in tour['annotations']
                       for index in range(1, len(tour['annotations'][scene]) + 1))
    if Counter((match[1], int(match[2])) for match in arrows) != expected:
        raise ValueError('Markdown arrow IDs do not match tour configuration')
    for match in arrows:
        note = tour['annotations'][match[1]][int(match[2]) - 1]
        note['title'] = match[3].strip()
        value = re.search(r'^설명:[ \t]*([^\r\n]*)$', match[4], re.M)
        if value:
            note['text'] = value[1].strip()
    labels = list(re.finditer(r'^#### \[([a-z-]+)\][ \t]+([^\n]+)$', parts.get('그림 위 표시', ''), re.M))
    if {match[1] for match in labels} != set(tour.get('labels', {})):
        raise ValueError('Markdown overlay label IDs do not match tour configuration')
    for match in labels:
        tour['labels'][match[1]]['text'] = match[2].strip()
    cards = list(re.finditer(r'^#### \[([a-z-]+)\][ \t]+([^\n]+)\n(.*?)(?=^#### \[|\Z)', parts.get('그림 설명 카드', ''), re.M | re.S))
    if cards:
        contents = [field_sections(m[3], 5, ['화면', '대본']) for m in cards]
        rendered = render_markdown(Path(__file__).resolve().parents[1], [c.get('화면', '') for c in contents])
        tour['panels'] = {m[1]: {'title': m[2].strip(), 'html': html, 'speech': c.get('대본', '')}
                          for m, c, html in zip(cards, contents, rendered)}
        if {s['panel_id'] for s in tour['states'] if s.get('panel_id')} != set(tour['panels']):
            raise ValueError('Architecture panel source and state IDs differ')
    return tour
