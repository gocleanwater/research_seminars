#!/usr/bin/env python3
"""One-time JSON → editable section Markdown migration.

The generated sections become the content source. Existing files are refused
unless --force is explicitly supplied; rerunning with --force discards MD edits.
This script never updates JSON, the deck builder, styles, or generated HTML.
"""

from __future__ import annotations

import argparse
from collections import Counter
from dataclasses import dataclass, field
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
SECTIONS = [
    ("Problems", "01-problems.md"),
    ("RLDX-1 Architecture", "02-rldx-1-architecture.md"),
    ("Training Data", "03-training-data.md"),
    ("Training Procedure", "04-training-procedure.md"),
    ("Inference Strategy", "05-inference-strategy.md"),
    ("Evaluation and Analysis", "06-evaluation-and-analysis.md"),
    ("Ablation and Analysis", "07-ablation-and-analysis.md"),
    ("Conclusion", "08-conclusion.md"),
    ("My opinions and limitation", "09-my-opinions-and-limitation.md"),
]
PARTS = ("intro", "architecture", "data-training", "evaluation")
FIELDS = [
    ("lead", "한 문장"), ("body", "본문"), ("aside", "보충"),
    ("takeaway", "요점"), ("source", "출처"), ("notes", "발표 메모"),
]
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"}
PRINCIPLE = (
    "원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. "
    "저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, "
    "미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다."
)


@dataclass
class Element:
    tag: str
    attrs: list[tuple[str, str | None]] = field(default_factory=list)
    children: list[Element | str] = field(default_factory=list)
    opening: str = ""

    def html(self) -> str:
        if self.tag == "root":
            return "".join(raw(child) for child in self.children)
        ending = "" if self.tag in VOID else f"</{self.tag}>"
        return self.opening + "".join(raw(child) for child in self.children) + ending

    def has_attributes(self) -> bool:
        return bool(self.attrs)


def raw(node: Element | str) -> str:
    return node.html() if isinstance(node, Element) else node


class Fragment(HTMLParser):
    def __init__(self, text: str):
        super().__init__(convert_charrefs=False)
        self.root = Element("root")
        self.stack = [self.root]
        self.feed(text)
        self.close()
        if len(self.stack) != 1:
            raise ValueError(f"Unclosed HTML tags: {[x.tag for x in self.stack[1:]]}")

    def handle_starttag(self, tag, attrs):
        node = Element(tag, attrs, opening=self.get_starttag_text())
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if len(self.stack) == 1 or self.stack[-1].tag != tag:
            raise ValueError(f"Mismatched HTML closing tag: {tag}")
        self.stack.pop()

    def handle_data(self, text):
        self.stack[-1].children.append(text)

    def handle_entityref(self, name):
        self.handle_data(f"&{name};")

    def handle_charref(self, name):
        self.handle_data(f"&#{name};")

    def handle_comment(self, text):
        self.handle_data(f"<!--{text}-->")


def markdown_text(text: str) -> str:
    # Escape syntax that could change ordinary prose after Markdown rendering.
    return re.sub(r"([\\*_`\[\]])", r"\\\1", unescape(text))


def inline(node: Element | str) -> str:
    if isinstance(node, str):
        return markdown_text(node)
    inside = "".join(inline(c) for c in node.children)
    if node.has_attributes():
        return node.html()
    if node.tag in {"strong", "b"}:
        return f"**{inside}**"
    if node.tag in {"em", "i"}:
        return f"*{inside}*"
    if node.tag == "br":
        return "<br>"
    if node.tag in {"sub", "sup", "code", "a", "span", "img"}:
        return node.html()
    return inside


def pretty_html(node: Element) -> str:
    """Keep CSS-dependent structure as HTML; add readable block line breaks."""
    text = node.html()
    text = re.sub(r">(?=<(?:div|p|h[1-6]|ul|ol|li|table|thead|tbody|tr|figure)\b)", ">\n", text)
    text = re.sub(r"(?<=</div>)(?=</div>)", "\n", text)
    text = re.sub(r"(?<=</li>)(?=<li\b)", "\n", text)
    return text


def rows_of(node: Element):
    for child in node.children:
        if not isinstance(child, Element):
            continue
        if child.tag == "tr":
            yield child
        else:
            yield from rows_of(child)


def table_markdown(node: Element) -> str:
    rows = []
    for row in rows_of(node):
        cells = ["".join(inline(c) for c in cell.children).strip().replace("|", "\\|")
                 for cell in row.children
                 if isinstance(cell, Element) and cell.tag in {"td", "th"}]
        if cells:
            rows.append(cells)
    if not rows:
        return pretty_html(node)
    width = len(rows[0])
    if any(len(row) != width for row in rows):
        return pretty_html(node)
    rendered = ["| " + " | ".join(row) + " |" for row in rows]
    rendered.insert(1, "| " + " | ".join(["---"] * width) + " |")
    return "\n".join(rendered)


def block(node: Element | str, heading_level: int) -> str:
    if isinstance(node, str):
        return markdown_text(node).strip()
    if node.has_attributes():
        return pretty_html(node)
    content = "".join(inline(c) for c in node.children).strip()
    if re.fullmatch(r"h[1-6]", node.tag):
        return "#" * heading_level + " " + content
    if node.tag == "p":
        return content
    if node.tag in {"ul", "ol"}:
        lines = []
        for n, child in enumerate((c for c in node.children if isinstance(c, Element)), 1):
            if child.tag != "li" or child.has_attributes():
                return pretty_html(node)
            marker = f"{n}." if node.tag == "ol" else "-"
            lines.append(marker + " " + "".join(inline(c) for c in child.children).strip())
        return "\n".join(lines)
    if node.tag == "table":
        return table_markdown(node)
    if node.tag in {"div", "figure", "blockquote", "pre"}:
        return pretty_html(node)
    return inline(node)


def as_markdown(text: str, heading_level=4) -> str:
    fragment = Fragment(text or "")
    return "\n\n".join(part for child in fragment.root.children
                       if (part := block(child, heading_level))).strip()


def metadata(data: dict, label: str, with_sources=False) -> str:
    keys = ["layout", "kind"]
    if with_sources:
        keys.append("source_ids")
    keys.extend(["figure", "caption"])
    lines = [f"<!-- {label}"]
    for key in keys:
        if key not in data:
            continue
        value = ", ".join(data[key]) if key == "source_ids" else str(data[key])
        if "\n" in value or "-->" in value:
            raise ValueError(f"Unsafe multiline metadata: {data.get('id')} {key}")
        lines.append(f"{key}: {value}")
    return "\n".join([*lines, "-->"])


def fields(data: dict, heading_level=3) -> str:
    result = []
    for key, title in FIELDS:
        text = data.get(key, "")
        if data.get("id") == "P032" and key == "body":
            text = "Figure 3의 Vision Encoder와 VLM을 누르거나 방향키로 확대해 처리 경로를 살펴본다."
        result.append("#" * heading_level + " " + title)
        if text:
            result.append(as_markdown(text, heading_level + 1))
    return "\n\n".join(result)


def tour_markdown(tour: dict) -> str:
    result = ["### 확대 단계"]
    for index, state in enumerate(tour["states"]):
        result.extend([
            f"#### [{index}] {state['title']}",
            f"핵심: {state.get('lead', '')}",
            f"설명: {state.get('note', '')}",
            f"요점: {state.get('takeaway', '')}",
        ])
    result.append("### 화살표 설명")
    for scene in ("vision", "vlm"):
        for index, annotation in enumerate(tour["annotations"][scene], 1):
            result.extend([
                f"#### [{scene}-{index}] {annotation['title']}",
                f"설명: {annotation.get('text', '')}",
            ])
    return "\n\n".join(result)


def read_json(name: str):
    return json.loads((ROOT / "content" / f"{name}.json").read_text())


def load_content():
    main = [x for name in PARTS for x in read_json("main-" + name)]
    detail = [x for name in PARTS for x in read_json(name)]
    main_by_id = {x["id"]: x for x in main}
    detail_by_id = {x["id"]: x for x in detail}
    order = read_json("presentation-order")
    if len(set(order)) != len(order) or set(order) != set(main_by_id):
        raise ValueError("Presentation order and active main IDs disagree")
    if len(main_by_id) != len(main):
        raise ValueError("Duplicate main IDs")
    expected = {f"S{i:03d}" for i in range(2, 123)}
    mapped = Counter(sid for pid in order for sid in main_by_id[pid]["source_ids"])
    if set(detail_by_id) != expected or len(detail) != 121:
        raise ValueError("Expected exactly 121 detailed units S002–S122")
    if set(mapped) != expected or any(count != 1 for count in mapped.values()):
        raise ValueError("Each detailed unit must map to exactly one active main slide")
    if {x["chapter"] for x in main} != {name for name, _ in SECTIONS}:
        raise ValueError("Expected the nine agreed sections")
    return order, main_by_id, detail_by_id


def readme(order, main_by_id, detail_by_id):
    rows = []
    for name, filename in SECTIONS:
        slides = [main_by_id[pid] for pid in order if main_by_id[pid]["chapter"] == name]
        count = sum(len(s["source_ids"]) for s in slides)
        rows.append(f"| [{filename}]({filename}) | {name} | {len(slides)} | {count} |")
    return "\n".join([
        "# 섹션 Markdown 편집 안내", "", PRINCIPLE, "",
        "이 폴더의 아홉 Markdown 파일이 발표 본문과 상세 공부 기록의 **직접 편집 원본(canonical source)**이다. "
        "기존 JSON은 대화에서 정리한 내용과 이전 구성을 보존하는 자료이며, 이후 내용 수정은 이 Markdown에서 한다. "
        "HTML과 slides.md는 원본이 아니라 생성 결과다.", "",
        "## 읽는 순서", "",
        "| 파일 | 섹션 | 본문 장 | 상세 단위 |", "| --- | --- | ---: | ---: |", *rows, "",
        f"표지 S001을 제외한 본문 {len(order)}장과 상세 공부 기록 {len(detail_by_id)}개를 포함한다. "
        "source_ids 기준으로 S002–S122가 각각 정확히 한 번 연결된다. "
        "장 ID는 위치가 바뀌어도 유지하고, 퇴역한 P003·P004의 ID를 다른 의미로 재사용하지 않는다.", "",
        "## 편집 순서", "",
        "1. 해당 섹션의 `## [P...] 제목`을 찾고, `한 문장 → 본문 → 보충 → 요점`의 발표 흐름을 다듬는다.",
        "2. `출처`와 `발표 메모`를 확인한다. 원문·저자 해석·우리 해석·설명용 예시·미해결의 경계를 유지한다.",
        "3. `상세 공부 기록`의 연결된 `#### [S...]` 단위를 수정해 수식 풀이·예시·조건·미해결 질문을 보존한다. 본문을 줄여도 상세를 자동 삭제하지 않는다.",
        "4. 메타데이터의 layout·kind·source_ids와 그림 이름·caption을 확인한다. 새 장이나 재배치는 전체 순서와 상세 매핑을 함께 검토한다.",
        "5. Markdown을 입력으로 HTML을 생성하고, 실제 화면에서 그림·수식·표·상세 해설과 넘침을 확인한다. 생성 HTML만 고치지 않는다.", "",
        "## 문서 구조", "",
        "각 파일의 첫 `#`는 섹션명, `## [P...]`는 본문 장이다. "
        "`slide-meta` 주석에는 layout·kind·source_ids와 선택적인 figure·caption이 있다. "
        "한 장 안의 예약된 `###` 제목은 `한 문장`, `본문`, `보충`, `요점`, `출처`, `발표 메모`, `상세 공부 기록`이다.", "",
        "본문의 작은 소제목은 `####`, 상세 단위 안의 필드는 `#####`, 그 안의 작은 소제목은 `######`를 사용한다. "
        "상세 단위의 `study-meta`는 원래 layout·kind와 그림 정보를 보존한다. 그림은 메타데이터의 figure·caption으로 렌더링하므로 같은 그림을 본문에 중복 삽입할 필요는 없다.", "",
        "일반 문단·강조·목록·표는 Markdown으로 편집한다. "
        "수식의 sub/sup, 흐름도·토큰·단계·callout 등 CSS에 의존하는 표현은 raw HTML로 남겨 구조와 의미를 보존한다. "
        "raw HTML 블록 내부의 빈 줄은 Markdown 해석을 바꿀 수 있으므로 불필요하게 추가하지 않는다.", "",
        "## Figure 3 확대·화살표 문구", "",
        "Architecture의 P032에서 `### 확대 단계` 아래 `[0]`–`[12]`의 제목·핵심·설명·요점을 편집한다. "
        "`### 화살표 설명` 아래 `[vision-1]`–`[vision-4]`, `[vlm-1]`–`[vlm-4]`의 제목·설명을 편집한다. "
        "이 문구도 Markdown 원본에서 화면으로 반영하는 대상이다.", "",
        "카메라 box·화살표 좌표·scene·step 등 인터랙션 위치 설정은 `content/architecture-tour.json`에 분리해 유지한다. "
        "문구를 고칠 때 좌표를 바꿀 필요는 없다. 단계 ID를 바꾸거나 늘릴 때는 설정과의 대응도 확인한다.", "",
        "## 최초 마이그레이션과 재실행 주의", "",
        "`scripts/migrate_sections.py`는 기존 JSON을 읽어 이 폴더를 처음 만드는 **일회성 마이그레이터**다. "
        "평소 빌드나 편집에 다시 실행하지 않는다. 기존 파일이 있으면 기본 동작은 덮어쓰기를 거부한다.", "",
        "`--force`는 Markdown을 JSON 내용으로 덮어쓴다. 따라서 이후의 MD 편집을 잃을 수 있다. "
        "수정 내용을 보존·검토한 뒤 마이그레이션 자체를 다시 할 때만 명시적으로 사용한다. "
        "이 스크립트는 JSON·공유 builder·CSS·생성 HTML을 수정하지 않는다.", "",
    ])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true",
                        help="overwrite existing MD files; discards edits made after migration")
    args = parser.parse_args()
    order, main_by_id, detail_by_id = load_content()
    tour = read_json("architecture-tour")
    outputs = {}
    for name, filename in SECTIONS:
        text = [f"# {name}", PRINCIPLE]
        for pid in order:
            slide = main_by_id[pid]
            if slide["chapter"] != name:
                continue
            text.extend([f"## [{pid}] {slide['title']}",
                         metadata(slide, "slide-meta", with_sources=True), fields(slide)])
            if pid == "P032":
                text.append(tour_markdown(tour))
            text.append("### 상세 공부 기록")
            for sid in slide["source_ids"]:
                detail = detail_by_id[sid]
                text.extend([f"#### [{sid}] {detail['title']}",
                             metadata(detail, "study-meta"), fields(detail, heading_level=5)])
        outputs[filename] = "\n\n".join(text).strip() + "\n"
    outputs["README.md"] = readme(order, main_by_id, detail_by_id)
    combined = "\n".join(outputs[filename] for _, filename in SECTIONS)
    main_ids = re.findall(r"^## \[(P\d+)\]", combined, flags=re.M)
    study_ids = re.findall(r"^#### \[(S\d+)\]", combined, flags=re.M)
    if main_ids != order or Counter(study_ids) != Counter(detail_by_id.keys()):
        raise ValueError("Generated Markdown ID/order coverage check failed")
    if len(re.findall(r"^#### \[\d+\]", combined, flags=re.M)) != 13:
        raise ValueError("Expected 13 Figure 3 walkthrough states")
    if len(re.findall(r"^#### \[(?:vision|vlm)-\d+\]", combined, flags=re.M)) != 8:
        raise ValueError("Expected 8 Figure 3 arrow annotations")
    destination = ROOT / "sections"
    existing = [destination / name for name in outputs if (destination / name).exists()]
    if existing and not args.force:
        parser.error("Refusing to overwrite edited Markdown. Existing files: "
                     + ", ".join(path.name for path in existing)
                     + ". --force discards subsequent MD edits.")
    destination.mkdir(exist_ok=True)
    for name, text in outputs.items():
        (destination / name).write_text(text, encoding="utf-8")
    print(f"Created 9 section MDs + README: {len(main_ids)} main slides; "
          f"{len(study_ids)} detailed units exactly once; "
          "13 tour states and 8 arrow explanations preserved.")
    print("Canonical content: sections/*.md. Existing JSON was left unchanged.")


if __name__ == "__main__":
    main()
