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
<div class="config-group"><div class="config-heading"><h3>학습 때</h3><span>변경 가능</span></div><p class="config-context">입력 데이터의 구성에 따라 설정이 달라질 수 있음</p><div class="config-settings"><span>RoPE 위치 준비값</span><span>Attention mask 구조</span></div></div>
<div class="config-group fixed"><div class="config-heading"><h3>배포 때</h3><span>고정 · 재사용</span></div><p class="config-context">정해진 입력 구성으로 추론 반복</p><div class="config-settings"><span>RoPE 위치 준비값</span><span>Attention mask 구조</span></div><p class="config-reuse">한 번 계산해 두고, 추론할 때마다 재사용</p></div></div>
<div class="inference-visual inference-figure" data-inference-visual="1" hidden style="aspect-ratio:1497/594"><img src="/figures/fig-09.png" alt="Figure9 위: 여러 graph 호출, 아래: 한 CUDA Graph 호출"><svg viewBox="0 0 1497 594" aria-hidden="true"><defs><marker id="cuda-pointer" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#cc5c38"/></marker></defs><rect x="94" y="70" width="1040" height="190" rx="10"/><rect x="94" y="360" width="700" height="185" rx="10"/><path class="diagram-pointer" d="M950 288 L830 235" marker-end="url(#cuda-pointer)"/><path class="diagram-pointer" d="M470 567 L335 520" marker-end="url(#cuda-pointer)"/></svg></div>'''
    else:
        visual = ''.join(f'<div class="inference-visual fusion-viewport" data-inference-visual="{i}"'+(' hidden' if i else '')+f'><div class="fusion-camera fusion-side-{i}"><img src="/figures/fig-10.png" alt="Figure10 {label}"></div><span class="fusion-view-label">{label}</span></div>' for i,label in enumerate(['別도 kernel · 중간값 저장·재읽기','Fused kernel · on-chip에서 이어 사용']))
        visual = visual.replace('別도', '별도')
    return ('<div class="inference-tour" data-state="0"><div class="inference-diagram">'+visual+'</div><aside aria-live="polite">'+''.join(content)+'</aside><nav class="inference-controls" aria-label="그림 설명 단계"><button type="button" data-inference-prev>← 이전 설명</button><div>'+''.join(buttons)+'</div><span class="inference-counter"></span><button type="button" data-inference-next>다음 설명 →</button></nav></div>')
