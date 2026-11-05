"""Package the final standalone presentation for a manual GitHub Pages upload.

Uses only the Python standard library. This script never accesses GitHub, runs Git,
or removes existing files. Run it after regenerating and checking presentation.html.
"""

from pathlib import Path
import shutil
import zipfile


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "presentation.html"
SITE = ROOT / "deployment" / "site" / "research_seminar"
ARCHIVE = ROOT / "output" / "research_seminar-pages.zip"
WEB_UPLOAD_LIMIT = 25 * 1024 * 1024

LANDING_HTML = """<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Research Seminars</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #f8fbfc; color: #142b40;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    main { max-width: 900px; margin: 0 auto; padding: 72px 24px; }
    .eyebrow { color: #167e7a; font-size: 14px; letter-spacing: .12em;
      font-weight: 700; text-transform: uppercase; }
    h1 { margin: 16px 0; font-size: clamp(34px, 7vw, 54px); line-height: 1.15; }
    .intro { color: #526878; font-size: 19px; line-height: 1.7; }
    ul { padding: 0; margin: 44px 0 0; list-style: none; }
    a { display: block; padding: 28px 0; border-top: 2px solid #b4cece;
      color: inherit; text-decoration: none; }
    a:hover h2 { color: #167e7a; }
    a:focus-visible { outline: 3px solid #167e7a; outline-offset: 8px; }
    h2 { margin: 0 0 12px; font-size: 27px; line-height: 1.35; }
    li p { margin: 0 0 18px; color: #526878; font-size: 17px; line-height: 1.7; }
    .open { color: #167e7a; font-weight: 700; }
  </style>
</head>
<body>
  <main>
    <div class="eyebrow">Research Seminars</div>
    <h1>논문 세미나</h1>
    <p class="intro">논문의 구조와 실험을 함께 살펴보는 HTML 발표 자료입니다.</p>
    <ul>
      <li><a href="./rldx-1-seminar/">
        <h2>RLDX-1 Technical Report</h2>
        <p>로봇 행동 모델의 구조, 데이터, 학습, 추론 최적화와 평가를 연결합니다.</p>
        <span class="open">발표 열기 →</span>
      </a></li>
    </ul>
  </main>
</body>
</html>
"""


def main():
    if not SOURCE.is_file():
        raise SystemExit(f"최종 발표 파일이 없습니다: {SOURCE}")
    size = SOURCE.stat().st_size
    if not size:
        raise SystemExit("presentation.html이 비어 있습니다. 최종 HTML을 먼저 생성하세요.")
    if size > WEB_UPLOAD_LIMIT:
        raise SystemExit(
            f"발표 파일이 {size / (1024 * 1024):.2f} MiB입니다. "
            "GitHub 웹 업로드의 파일당 25 MiB 제한을 넘으므로 패키지를 만들지 않았습니다."
        )

    presentation = SITE / "rldx-1-seminar" / "index.html"
    landing = SITE / "index.html"
    marker = SITE / ".nojekyll"
    generated = (landing, marker, presentation)
    # Do not follow a pre-existing output symlink when overwriting generated files.
    for destination in (*generated, ARCHIVE):
        if destination.is_symlink() or any(p.is_symlink() for p in destination.parents if p != ROOT and ROOT in p.parents):
            raise SystemExit(f"출력 경로에 심볼릭 링크가 있어 중단합니다: {destination}")

    presentation.parent.mkdir(parents=True, exist_ok=True)
    ARCHIVE.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(SOURCE, presentation)
    landing.write_text(LANDING_HTML, encoding="utf-8")
    marker.write_bytes(b"")

    # Explicit allowlist: unrelated existing files never enter the upload archive.
    # Archive entries start at the repository root, without a wrapping folder.
    with zipfile.ZipFile(ARCHIVE, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in generated:
            archive.write(path, arcname=path.relative_to(SITE).as_posix())

    print(f"업로드 폴더: {SITE}")
    print(f"ZIP: {ARCHIVE}")
    print(f"발표 HTML: {size / (1024 * 1024):.2f} MiB (GitHub 웹 업로드 상한 25 MiB)")
    print("포함 파일: index.html, .nojekyll, rldx-1-seminar/index.html")
    print("기존 파일을 삭제하지 않았습니다. GitHub 업로드·게시 설정은 사용자가 진행하세요.")


if __name__ == "__main__":
    main()
