"""Compile reviewed content into Slidev and a self-contained, offline HTML deck."""
from pathlib import Path
from html import escape
import base64
import json
import re

ROOT = Path(__file__).resolve().parents[1]
PARTS = ['intro', 'architecture', 'data-training', 'evaluation']
MAIN_PARTS = ['main-intro', 'main-architecture', 'main-data-training', 'main-evaluation']
DISPLAY_CHAPTERS = {}
CHAPTERS = [
    (1, 7, '01 연구 문제와 전체 지도'), (8, 19, '02 VLM과 시간 정보'),
    (20, 30, '03 Flow matching'), (31, 40, '04 MSAT'),
    (41, 55, '05 실제·합성 데이터'), (56, 71, '06 세 단계 학습'),
    (72, 81, '07 추론 최적화'), (82, 96, '08 벤치마크 평가'),
    (97, 107, '09 Ablation과 근거'), (108, 115, '10 중요한 부록'),
    (116, 117, '11 연구의 위치와 결론'), (118, 121, '12 미해결 질문'),
]
KINDS = {'fact': '원문 설명·결과', 'authors': '저자 해석', 'interpretation': '우리 해석',
         'example': '설명용 예시', 'question': '미해결 질문'}

def chapter(sid):
    if sid in DISPLAY_CHAPTERS:
        return DISPLAY_CHAPTERS[sid]
    n = int(sid[1:])
    return next((name for a, b, name in CHAPTERS if a <= n <= b), '전체 흐름')

def study_markup(s):
    figure = ''
    if s.get('figure'):
        figure = f'<figure><img src="/figures/{escape(s["figure"], quote=True)}" alt="{escape(s.get("caption", "원문 그림"), quote=True)}"><figcaption>{escape(s.get("caption", ""))}</figcaption></figure>'
    return f'<section class="study-unit"><h3><small>상세 해설 {s["id"]}</small>{escape(s["title"])}</h3><p class="study-lead">{s["lead"]}</p>{figure}{s["body"]}{s.get("aside", "")}<p class="study-takeaway">{s["takeaway"]}</p><p class="study-source">출처: {escape(s["source"])}</p><p class="study-extra">{escape(s.get("notes", ""))}</p></section>'

def slide_markup(s, order, total):
    kind = s.get('kind', 'fact')
    title = escape(s['title'])
    header = f'<header class="seminar-header"><div class="chapter-label">{chapter(s["id"])}</div><span class="header-kind label {kind}">{KINDS[kind]}</span><h1>{title}</h1><p class="slide-lead">{s["lead"]}</p></header>'
    figure = ''
    if s.get('figure'):
        name = escape(s['figure'], quote=True)
        cap = escape(s.get('caption', '원문 그림'))
        figure = f'<figure class="paper-figure"><img src="/figures/{name}" alt="{cap}" loading="eager"><figcaption>{cap}</figcaption></figure>'
    main_content = s['body'] + (s.get('aside', '') if figure else '')
    body = f'<div class="body-main">{main_content}</div>'
    if figure:
        body = figure + body
    elif s.get('aside'):
        body += f'<div class="body-aside">{s["aside"]}</div>'
    footer = f'<footer class="seminar-footer"><span class="source">{escape(s["source"])}</span><span class="slide-id">{s["id"]} · {order:03d}/{total}</span></footer>'
    return f'<section class="seminar-slide" data-slide-id="{s["id"]}">{header}<div class="seminar-body {s.get("layout", "full")}">{body}</div><div class="takeaway">{s["takeaway"]}</div>{footer}</section>'

def main():
    content = []
    for name in PARTS:
        content += json.loads((ROOT / f'content/{name}.json').read_text())
    expected = {f'S{i:03d}' for i in range(2, 123)}
    assert {s['id'] for s in content} == expected, 'Missing or extra stable IDs'
    assert len(content) == len(expected), 'Duplicate stable IDs'
    for s in content:
        for key in ['id', 'title', 'lead', 'layout', 'kind', 'body', 'takeaway', 'source']:
            assert s.get(key), (s['id'], key)
        if s.get('figure'):
            assert (ROOT / 'public/figures' / s['figure']).is_file(), s['figure']
    library = {s['id']: s for s in content}
    main_content = []
    for name in MAIN_PARTS:
        main_content += json.loads((ROOT / f'content/{name}.json').read_text())
    assert len(main_content) == 29 and [s['id'] for s in main_content] == [f'P{i:03d}' for i in range(2, 31)], 'Expected 29 content pages plus cover'
    mapped = [sid for s in main_content for sid in s['source_ids']]
    assert set(mapped) == expected and len(mapped) == len(expected), 'Every study unit must map exactly once'
    for s in main_content:
        DISPLAY_CHAPTERS[s['id']] = s['chapter']
        s['study_html'] = '<p class="study-intro">' + escape(s.get('notes', '')) + '</p>' + ''.join(study_markup(library[sid]) for sid in s['source_ids'])
        all_notes = [s.get('notes', '')]
        for sid in s['source_ids']:
            unit = library[sid]
            plain = re.sub('<[^>]+>', ' ', unit['body'] + ' ' + unit.get('aside', ''))
            all_notes.append(f'\n{sid} {unit["title"]}\n{unit["lead"]}\n{plain}\n{unit["source"]}\n{unit.get("notes", "")}')
        s['notes'] = '\n'.join(all_notes)
    content = main_content
    cover_md = (ROOT / 'review/versions/S001-v01.md').read_text()
    frontmatter = cover_md.split('---', 2)[1]
    cover = cover_md.split('<div class="cover-slide">', 1)[1].split('\n<!--', 1)[0]
    cover = '<div class="cover-slide">' + cover.strip()
    total = len(content) + 1
    slides = [('S001', 'RLDX-1 Technical Report', cover, '표지. 범용 로봇 조작 모델이 움직임·기억·물리 센싱을 지원하도록 확장한 연구를 다룬다. 연구기관은 RLWRLD·KAIST다. 사진은 Fig.12(b), PDF p.19 ALLEX 원본이다.', '<p>범용 로봇 조작 모델 RLDX-1의 구조·데이터·학습·실행·평가를 연결한다. 본문 30장과 장별 상세 해설로 구성하며, 사진은 Fig.12(b), PDF p.19 ALLEX 원본이다.</p>')]
    markdown = '---' + frontmatter + '---\n\n<!-- slide-id: S001 | revision: v01 | status: draft -->\n\n' + cover + '\n'
    for i, s in enumerate(content, 2):
        markup = slide_markup(s, i, total)
        notes = s.get('notes', '')
        markdown += f'\n---\nlayout: none\n---\n\n<!-- slide-id: {s["id"]} | revision: v01 | status: draft -->\n\n{markup}\n\n<!--\n{notes.replace("-->", "→")}\n-->\n'
        slides.append((s['id'], s['title'], markup, notes, s['study_html']))
    (ROOT / 'slides.md').write_text(markdown)

    # Inline each referenced image once, then hydrate img elements from the shared map.
    assets = {}
    for _, _, markup, _, detail in slides:
        markup += detail
        for name in re.findall(r'src="/figures/([^\"]+)"', markup):
            if name not in assets:
                assets[name] = 'data:image/png;base64,' + base64.b64encode((ROOT / 'public/figures' / name).read_bytes()).decode()
    pages = []
    entries = []
    for i, (sid, title, markup, _, _) in enumerate(slides):
        markup = re.sub(r'src="/figures/([^\"]+)"', r'data-asset="\1"', markup)
        pages.append(f'<article class="deck-page{(" active" if i == 0 else "")}" data-id="{sid}" aria-label="{escape(title, quote=True)}">{markup}</article>')
        terms = next((" ".join(s['source_ids'] + [library[x]['title'] for x in s['source_ids']]) for s in content if s['id'] == sid), '')
        entries.append(f'<a class="toc-entry" href="#{sid}" data-index="{i}" data-search="{escape(sid + " " + title + " " + terms, quote=True)}"><small>{sid} · {chapter(sid)}</small>{escape(title)}</a>')
    css = (ROOT / 'style.css').read_text().replace("@import './deck.css';", '') + '\n' + (ROOT / 'deck.css').read_text()
    data = json.dumps([{'id': sid, 'title': title, 'notes': notes, 'notesHtml': re.sub(r'src="/figures/([^\"]+)"', r'data-asset="\1"', detail)} for sid, title, _, notes, detail in slides], ensure_ascii=False).replace('<', '\\u003c')
    script = (ROOT / 'scripts/deck-runtime.js').read_text()
    html = f'''<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RLDX-1 · 상세 논문 세미나</title><style>{css}</style></head>
<body class="deck-app"><main id="stage">{''.join(pages)}</main>
<nav class="deck-toolbar" aria-label="발표 탐색"><button id="prev" aria-label="이전 장">←</button><span id="counter"></span><button id="next" aria-label="다음 장">→</button><button id="open-toc">목차 G</button><button id="open-notes">설명 N</button><button id="fullscreen">전체 화면 F</button></nav>
<dialog id="toc"><button class="dialog-close" aria-label="닫기">×</button><h2>전체 목차</h2><input id="toc-search" type="search" placeholder="장 ID·제목·주제 검색" aria-label="목차 검색"><div id="toc-list">{''.join(entries)}</div></dialog>
<dialog id="notes"><button class="dialog-close" aria-label="닫기">×</button><h2 id="notes-title"></h2><div id="notes-text" class="study-notes"></div></dialog>
<dialog id="image-dialog"><button class="dialog-close" aria-label="닫기">×</button><img alt="확대한 원문 그림"></dialog>
<script>const DECK={data};const ASSETS={json.dumps(assets)};{script}</script></body></html>'''
    (ROOT / 'presentation.html').write_text(html)
    (ROOT / 'content/deck-manifest.json').write_text(json.dumps([{'order': i + 1, 'id': sid, 'title': title, 'chapter': chapter(sid), 'version': 'v01', 'status': '전체 초안 / 미승인', 'source_ids': next((s['source_ids'] for s in content if s['id'] == sid), ['S001'])} for i, (sid, title, _, _, _) in enumerate(slides)], ensure_ascii=False, indent=2))
    print(f'Generated {total} slides; standalone HTML {len(html.encode()) / 1024 / 1024:.1f} MiB; {len(assets)} embedded image assets.')

if __name__ == '__main__':
    main()
