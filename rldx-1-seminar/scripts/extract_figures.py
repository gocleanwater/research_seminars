"""Render only the report's cited figure areas; preserve labels and original colors."""
from pathlib import Path
import json
import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parents[1]
PAPER = ROOT.parent.parent / 'research_wiki/papers/RLWRLD-RLDX-1 Technical Report.pdf'
# PDF points, top-left coordinates. Exclude captions, which slides cite separately.
REGIONS = {
    1: (1, (48, 301, 550, 716)),
    2: (5, (49, 66, 548, 276)),
    3: (6, (49, 66, 548, 356)),
    4: (10, (49, 66, 548, 328)),
    5: (11, (49, 66, 548, 337)),
    6: (12, (49, 66, 548, 208)),
    7: (13, (49, 66, 548, 222)),
    8: (14, (49, 66, 548, 281)),
    9: (15, (49, 66, 548, 264)),
    10: (16, (49, 66, 548, 207)),
    11: (17, (49, 66, 548, 277)),
    12: (19, (73, 84, 516, 225)),
    13: (20, (49, 66, 548, 288)),
    14: (20, (49, 335, 548, 487)),
    15: (21, (49, 66, 548, 448)),
    16: (22, (49, 66, 548, 261)),
    17: (23, (49, 66, 548, 334)),
    18: (24, (49, 66, 548, 229)),
    19: (25, (143, 270, 447, 429)),
    20: (26, (51, 104, 210, 183)),
    21: (26, (219, 81, 548, 185)),
    22: (46, (49, 222, 548, 332)),
    23: (46, (49, 554, 548, 674)),
}

def main():
    out = ROOT / 'public/figures'
    out.mkdir(exist_ok=True)
    doc = pdfium.PdfDocument(str(PAPER))
    scale = 3
    manifest = []
    for number, (page, box) in REGIONS.items():
        rendered = doc[page - 1].render(scale=scale).to_pil().convert('RGB')
        image = rendered.crop(tuple(round(v * scale) for v in box))
        name = f'fig-{number:02d}.png'
        image.save(out / name, optimize=True)
        manifest.append(dict(file=name, figure=number, pdf_page=page, crop_points=box,
                             size=image.size, source=str(PAPER.relative_to(ROOT.parent.parent)),
                             method='PDF page render and crop, original colors and labels'))
    (ROOT / 'content/figure-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
    print(f'Extracted {len(manifest)} cited figures.')

if __name__ == '__main__':
    main()
