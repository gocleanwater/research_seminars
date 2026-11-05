"""Bundle unmodified Nanum Gothic and KaTeX fonts for both HTML and Slidev."""
from pathlib import Path
import base64
import hashlib
import json
import re
import shutil

FONT_SOURCE = 'https://github.com/google/fonts/tree/main/ofl/nanumgothic'

def prepare_typography(root):
    nanum = root / 'public/fonts/nanum-gothic'
    katex = next((root / 'node_modules/.pnpm').glob('katex@*/node_modules/katex'))
    destination = root / 'public/fonts/katex'
    destination.mkdir(parents=True, exist_ok=True)
    license_text = (nanum / 'OFL.txt').read_text()
    katex_license = (katex / 'LICENSE').read_text()
    css = '/* Nanum Gothic: unmodified font files, SIL OFL 1.1.\n' + license_text.replace('*/', '* /') + '\n*/\n'
    css += '/* KaTeX: MIT License.\n' + katex_license.replace('*/', '* /') + '\n*/\n'
    faces = []
    for weight, name in [(400, 'Regular'), (700, 'Bold'), (800, 'ExtraBold')]:
        file = nanum / f'NanumGothic-{name}.ttf'
        if not file.is_file():
            raise FileNotFoundError(file)
        css += f'@font-face{{font-family:"Nanum Gothic";font-style:normal;font-weight:{weight};font-display:block;src:url("/fonts/nanum-gothic/{file.name}") format("truetype");}}\n'
        faces.append({'weight': weight, 'file': str(file.relative_to(root)), 'sha256': hashlib.sha256(file.read_bytes()).hexdigest(), 'source': FONT_SOURCE})
    katex_css = (katex / 'dist/katex.min.css').read_text()
    def woff_source(match):
        source = re.search(r'url\(["\']?fonts/([^\)"\']+\.woff2)["\']?\)', match[1])
        if not source:
            return match[0]
        name = source[1]
        shutil.copyfile(katex / 'dist/fonts' / name, destination / name)
        return f'src:url("/fonts/katex/{name}") format("woff2");'
    css += re.sub(r'src:([^;]+);', woff_source, katex_css)
    (destination / 'LICENSE').write_text(katex_license)
    (root / 'typography.css').write_text(css)
    (root / 'content/typography-manifest.json').write_text(json.dumps({'body_font': 'Nanum Gothic', 'nanum': faces, 'katex_version': json.loads((katex / 'package.json').read_text())['version'], 'nanum_fonts_modified': False}, ensure_ascii=False, indent=2))
    return css

def inline_fonts(css, root):
    def embed(match):
        relative = match[1]
        file = root / 'public' / relative.lstrip('/')
        mime = 'font/ttf' if file.suffix == '.ttf' else 'font/woff2'
        return 'url("data:' + mime + ';base64,' + base64.b64encode(file.read_bytes()).decode() + '")'
    return re.sub(r'url\(["\']?(/fonts/[^\)"\']+)["\']?\)', embed, css)
