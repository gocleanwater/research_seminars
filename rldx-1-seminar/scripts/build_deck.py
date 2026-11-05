"""Compile reviewed content into Slidev and a self-contained, offline HTML deck."""
from pathlib import Path
from html import escape
import base64
import json
import re
from font_assets import prepare_typography, inline_fonts
from architecture_markup import architecture_markup
from section_sources import load_sections, apply_tour_text

ROOT = Path(__file__).resolve().parents[1]
DISPLAY_CHAPTERS = {'S001': '표지'}

def chapter(sid):
    return DISPLAY_CHAPTERS.get(sid, '상세 해설')

def slide_markup(s, order, total):
    title = escape(s['title'])
    header = f'<header class="seminar-header"><div class="chapter-label">{chapter(s["id"])}</div><h1>{title}</h1><p class="slide-lead">{s["lead"]}</p></header>'
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
    if s.get("layout") == "explorer":
        body = architecture_markup()
    footer = f'<footer class="seminar-footer"><span class="source">{escape(s["source"])}</span><span class="slide-id">{s["id"]} · {order:03d}/{total}</span></footer>'
    return f'<section class="seminar-slide" data-slide-id="{s["id"]}">{header}<div class="seminar-body {s.get("layout", "full")}">{body}</div><div class="takeaway">{s["takeaway"]}</div>{footer}</section>'

def main():
    typography = prepare_typography(ROOT)
    expected = {f'S{i:03d}' for i in range(2, 123)}
    main_content = load_sections(ROOT)
    mapped = [sid for s in main_content for sid in s['source_ids']]
    assert set(mapped) == expected and len(mapped) == len(expected), 'Every study unit must map exactly once'
    for s in main_content:
        DISPLAY_CHAPTERS[s['id']] = s['chapter']
    content = main_content
    library = {u['id']: u for s in content for u in s['_units']}
    tour = apply_tour_text(json.loads((ROOT / 'content/architecture-tour.json').read_text()), next(s for s in content if s['layout'] == 'explorer'))
    cover_md = (ROOT / 'review/versions/S001-v01.md').read_text()
    frontmatter = cover_md.split('---', 2)[1]
    cover = (ROOT / 'content/cover.html').read_text()
    total = len(content) + 1
    slides = [('S001', 'RLDX-1 Technical Report', cover, '표지. 움직임·기억·물리 센싱을 지원하는 범용 로봇 조작 연구다. 원문 Fig.1을 사용한다.', '<p>Figure 1은 데이터·아키텍처·학습·추론·평가를 연결하는 전체 시스템 개요다. 원문 PDF p.1.</p>')]
    markdown = '---' + frontmatter + '---\n\n<!-- slide-id: S001 | revision: v18 | status: draft -->\n\n' + cover + '\n'
    for i, s in enumerate(content, 2):
        markup = slide_markup(s, i, total)
        notes = s.get('notes', '')
        markdown += f'\n---\nlayout: none\n---\n\n<!-- slide-id: {s["id"]} | revision: v18 | status: draft -->\n\n{markup}\n\n<!--\n{notes.replace("-->", "→")}\n-->\n'
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
    css = typography + '\n' + (ROOT / 'style.css').read_text().replace("@import './deck.css';", '').replace("@import './typography.css';", '') + '\n' + (ROOT / 'deck.css').read_text()
    css = inline_fonts(css, ROOT)
    data = json.dumps([{'id': sid, 'title': title, 'notes': notes, 'notesHtml': re.sub(r'src="/figures/([^\"]+)"', r'data-asset="\1"', detail)} for sid, title, _, notes, detail in slides], ensure_ascii=False).replace('<', '\\u003c')
    script = (ROOT / 'scripts/deck-runtime.js').read_text()
    html = f'''<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>RLDX-1 · 상세 논문 세미나</title><style>{css}</style></head>
<body class="deck-app"><main id="stage">{''.join(pages)}</main>
<nav class="deck-toolbar" aria-label="발표 탐색"><button id="prev" aria-label="이전 장">←</button><form id="page-jump" aria-label="페이지 바로 이동"><input id="page-number" type="number" min="1" step="1" required inputmode="numeric" enterkeyhint="go" autocomplete="off" aria-label="현재 페이지 번호" title="페이지 번호를 입력하고 Enter"><span id="counter" aria-live="polite"></span></form><button id="next" aria-label="다음 장">→</button><button id="open-toc">목차<span class="shortcut"> G</span></button><button id="open-notes">설명<span class="shortcut"> N</span></button><button id="fullscreen">전체 화면<span class="shortcut"> F</span></button></nav>
<dialog id="toc"><button class="dialog-close" aria-label="닫기">×</button><h2>전체 목차</h2><input id="toc-search" type="search" placeholder="장 ID·제목·주제 검색" aria-label="목차 검색"><div id="toc-list">{''.join(entries)}</div></dialog>
<dialog id="notes"><button class="dialog-close" aria-label="닫기">×</button><h2 id="notes-title"></h2><div id="notes-text" class="study-notes"></div></dialog>
<dialog id="image-dialog"><button class="dialog-close" aria-label="닫기">×</button><img alt="확대한 원문 그림"></dialog>
<script>const DECK={data};const ASSETS={json.dumps(assets)};const ARCH_TOUR={json.dumps(tour, ensure_ascii=False).replace(chr(60), chr(92) + "u003c")};{script}</script></body></html>'''
    (ROOT / 'presentation.html').write_text(html)
    # Keep the manually published Pages entry in sync with the generated deck.
    (ROOT / 'index.html').write_text(html)
    (ROOT / 'content/deck-manifest.json').write_text(json.dumps([{'order': i + 1, 'id': sid, 'title': title, 'chapter': chapter(sid), 'version': 'v18', 'status': '전체 초안 / 미승인', 'source_ids': next((s['source_ids'] for s in content if s['id'] == sid), ['S001'])} for i, (sid, title, _, _, _) in enumerate(slides)], ensure_ascii=False, indent=2))
    index = ['# 슬라이드 색인 — v18', '', 'MD 원본 → HTML. 전체 도식 확대 단계는 P032 안에서 방향키로 이동한다. 개별 결과물은 사용자 검토 전이다.', '', '| 순서 | ID | 섹션 | 제목 | MD 원본 | 상세 단위 |', '| --- | --- | --- | --- | --- | --- |']
    index.append('| 1 | S001 | 표지 | RLDX-1 Technical Report | content/cover.html | — |')
    for i, s in enumerate(content, 2):
        index.append(f"| {i} | {s['id']} | {s['chapter']} | {s['title']} | {s['markdown_source']} | {', '.join(s['source_ids'])} |")
    (ROOT / 'review/SLIDE_INDEX.md').write_text('\n'.join(index) + '\n')
    print(f'Generated {total} slides; standalone HTML {len(html.encode()) / 1024 / 1024:.1f} MiB; {len(assets)} embedded image assets.')

if __name__ == '__main__':
    main()
