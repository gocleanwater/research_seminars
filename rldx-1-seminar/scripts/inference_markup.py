"""Script-led setup diagram, then the relevant original figure comparison."""
from html import escape
from pathlib import Path
import re
from section_sources import field_sections, render_markdown

def inference_panels(page):
    raw = page['_parts'].get('그림 설명 카드', '')
    return [dict(id=m[1], title=m[2], **field_sections(m[3],5,['핵심','화면','대본','요점']))
            for m in re.finditer(r'^#### \[([a-z-]+)\] ([^\n]+)\n(.*?)(?=^#### \[|\Z)',raw,re.M|re.S)]

def inference_markup(page):
    panels = inference_panels(page)
    assert len(panels) == 2
    screens = render_markdown(Path(__file__).resolve().parents[1], [p['화면'] for p in panels])
    content, buttons = [], []
    for i,(p,screen) in enumerate(zip(panels,screens)):
        hidden = ' hidden' if i else ''
        content.append(f'<section class="inference-panel" data-inference-panel="{i}" data-lead="{escape(p["핵심"],quote=True)}" data-takeaway="{escape(p["요점"],quote=True)}"{hidden}><h3>{escape(p["title"])}</h3>{screen}</section>')
        buttons.append(f'<button type="button" data-inference-go="{i}" aria-pressed="{str(i==0).lower()}">{i+1}</button>')
    if page['id'] == 'P020':
        visual = '''<div class="inference-visual config-schematic" data-inference-visual="0">
<div class="config-group"><h3>학습·입력 구성에 따라</h3><div class="config-row"><div class="config-input"><span>토큰 수</span><span>위치 배치</span><span>읽을 수 있는 범위</span></div><b class="config-arrow">→</b><div class="config-box">Attention에 필요한<br>설정 변경</div></div></div>
<div class="config-group fixed"><h3>고정된 입력 구성으로 추론하면</h3><div class="config-row"><div class="config-box">입력 구성 고정</div><b class="config-arrow">→</b><div class="config-box">준비값<br><strong>한 번 계산</strong></div><b class="config-arrow">→</b><div class="config-box">한 graph로 묶어<br><strong>launch 부담 감소</strong></div></div></div></div>
<div class="inference-visual inference-figure" data-inference-visual="1" hidden style="aspect-ratio:1497/594"><img src="/figures/fig-09.png" alt="Figure9 위: 여러 graph 호출, 아래: 한 CUDA Graph 호출"><svg viewBox="0 0 1497 594" aria-hidden="true"><defs><marker id="cuda-pointer" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#cc5c38"/></marker></defs><rect x="94" y="70" width="1040" height="190" rx="10"/><rect x="94" y="360" width="700" height="185" rx="10"/><path class="diagram-pointer" d="M950 288 L830 235" marker-end="url(#cuda-pointer)"/><path class="diagram-pointer" d="M470 567 L335 520" marker-end="url(#cuda-pointer)"/></svg></div>'''
    else:
        visual = ''.join(f'<div class="inference-visual fusion-viewport" data-inference-visual="{i}"'+(' hidden' if i else '')+f'><div class="fusion-camera fusion-side-{i}"><img src="/figures/fig-10.png" alt="Figure10 {label}"></div><span class="fusion-view-label">{label}</span></div>' for i,label in enumerate(['別도 kernel · 중간값 저장·재읽기','Fused kernel · on-chip에서 이어 사용']))
        visual = visual.replace('別도', '별도')
    return ('<div class="inference-tour" data-state="0"><div class="inference-diagram">'+visual+'</div><aside aria-live="polite">'+''.join(content)+'</aside><nav class="inference-controls" aria-label="그림 설명 단계"><button type="button" data-inference-prev>← 이전 설명</button><div>'+''.join(buttons)+'</div><span class="inference-counter"></span><button type="button" data-inference-next>다음 설명 →</button></nav></div>')
