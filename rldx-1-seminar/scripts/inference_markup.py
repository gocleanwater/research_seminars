"""Diagram-led inference explanations; narration is owned by Section 5."""
from html import escape
from pathlib import Path
import re
from section_sources import field_sections, render_markdown

# Original figure pixel coordinates: highlight, arrow start, arrow target.
FRAMES = {
 'P020': [(None,None,None),(None,None,None),([94,70,1040,190],[1170,288],[614,230]),([94,360,1040,225],[1210,350],[790,550])],
 'P038': [([10,62,736,304],[660,390],[232,218]),([770,66,696,292],[1210,390],[990,216])],
}
def inference_panels(page):
 raw=page['_parts'].get('그림 설명 카드','')
 return [dict(id=m[1], title=m[2], **field_sections(m[3],5,['핵심','화면','대본','요점'])) for m in re.finditer(r'^#### \[([a-z-]+)\] ([^\n]+)\n(.*?)(?=^#### \[|\Z)',raw,re.M|re.S)]
def inference_markup(page):
 panels=inference_panels(page); frames=FRAMES[page['id']]
 assert len(panels)==len(frames)
 figure,height=('fig-09.png',594) if page['id']=='P020' else ('fig-10.png',423)
 screens=render_markdown(Path(__file__).resolve().parents[1],[p['화면'] for p in panels])
 content=[];marks=[];buttons=[]
 for i,(p,screen,(box,start,end)) in enumerate(zip(panels,screens,frames)):
  hidden=' hidden' if i else ''
  content.append(f'<section class="inference-panel" data-inference-panel="{i}" data-lead="{escape(p["핵심"],quote=True)}" data-takeaway="{escape(p["요점"],quote=True)}"{hidden}><h3>{escape(p["title"])}</h3>{screen}</section>')
  buttons.append(f'<button type="button" data-inference-go="{i}" aria-pressed="{str(i==0).lower()}">{i+1}</button>')
  if box:
   x,y,w,h=box;sx,sy=start;ex,ey=end
   marks.append(f'<g data-inference-mark="{i}" hidden><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12"/><path d="M {sx} {sy} L {ex} {ey}" marker-end="url(#arrow-{page["id"]})"/><circle cx="{ex}" cy="{ey}" r="15"/></g>')
 return (f'<div class="inference-tour" data-state="0"><div class="inference-diagram"><div class="inference-figure" style="aspect-ratio:1497/{height}"><img src="/figures/{figure}" alt="원문 {figure}"><svg viewBox="0 0 1497 {height}" aria-hidden="true"><defs><marker id="arrow-{page["id"]}" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#cb5c38"/></marker></defs>'+''.join(marks)+'</svg></div></div><aside aria-live="polite">'+''.join(content)+'</aside><nav class="inference-controls" aria-label="그림 설명 단계"><button type="button" data-inference-prev>← 이전 설명</button><div>'+''.join(buttons)+'</div><span class="inference-counter"></span><button type="button" data-inference-next>다음 설명 →</button></nav></div>')
