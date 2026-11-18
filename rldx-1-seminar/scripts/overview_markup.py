"""Figure 2 recap tour; screen text and speech remain in the section Markdown."""
from html import escape
from pathlib import Path
import json
import re
from section_sources import field_sections, render_markdown

FRAMES = {
    'overall': ([50, 35, 1370, 585], None, None),
    'motion': ([100, 30, 310, 295], [118, 48, 262, 259], [133, 249, 234, 58]),
    'vlm': ([110, 172, 540, 305], [[380,172],[643,172],[643,465],[110,465],[110,307],[380,307]], [124,308,518,157]),
    'memory': ([365, 440, 300, 110], [398,466,236,57], [400,467,231,54]),
    'msat': ([645,115,735,495], [650,122,730,471], [658,231,697,249]),
    'return': ([50,35,1370,585], None, None),
}

def overview_panels(page):
    raw = page['_parts'].get('그림 설명 카드', '')
    matches = list(re.finditer(r'^#### \[([a-z-]+)\] ([^\n]+)\n(.*?)(?=^#### \[|\Z)', raw, re.M | re.S))
    panels = [dict(id=m[1], title=m[2], **field_sections(m[3],5,['핵심','화면','대본','요점'])) for m in matches]
    if [p['id'] for p in panels] != list(FRAMES):
        raise ValueError('Figure 2 recap requires overall/motion/vlm/memory/msat/return in order')
    return panels

def overview_markup(page):
    root = Path(__file__).resolve().parents[1]
    panels = overview_panels(page)
    html = render_markdown(root,[p['화면'] for p in panels])
    controls, content, hotspots = [], [], []
    labels = ['전체 그림','Motion Module','VLM','Memory Module','MSAT','전체 정리']
    for i,(panel,screen) in enumerate(zip(panels,html)):
        box,crop,highlight = FRAMES[panel['id']]
        attrs = f'data-box="{escape(json.dumps(box),quote=True)}" data-crop="{escape(json.dumps(crop),quote=True)}" data-highlight="{escape(json.dumps(highlight),quote=True)}"'
        content.append(f'<section class="recap-panel" data-recap-panel="{i}" {attrs} data-lead="{escape(panel["핵심"],quote=True)}" data-takeaway="{escape(panel["요점"],quote=True)}"'+(' hidden' if i else '')+f'><h3>{escape(panel["title"])}</h3>{screen}</section>')
        controls.append(f'<button type="button" data-recap-go="{i}" aria-pressed="{str(i==0).lower()}">{labels[i]}</button>')
        if highlight:
            x,y,w,h=highlight
            hotspots.append(f'<button type="button" class="recap-hotspot" data-recap-go="{i}" aria-label="{escape(labels[i])} 확대" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px"></button>')
    return ('<div class="recap-explorer" data-state="0"><div class="recap-viewport"><div class="recap-camera">'
        '<img class="recap-source-image" src="/figures/fig-02.png" width="1497" height="631" alt="원문 Figure 2 RLDX-1 전체 구조">'
        '<svg class="recap-mark" width="1497" height="631" aria-hidden="true"><rect hidden fill="none" stroke="#167e7a" stroke-width="3" vector-effect="non-scaling-stroke"/></svg>'
        +''.join(hotspots)+'</div></div><aside class="recap-detail" aria-live="polite">'+''.join(content)+'</aside>'
        '<nav class="recap-controls" aria-label="Figure 2 단계 탐색"><div class="recap-modes">'+''.join(controls)+'</div>'
        '<div class="recap-directions"><button type="button" data-recap-prev>← 이전 설명</button><span class="recap-counter">1 / 6</span><button type="button" data-recap-next>다음 설명 →</button></div></nav></div>')
