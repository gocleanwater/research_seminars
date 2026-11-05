# 전체 초안 v01 검증 — 2026-11-05

## 결과물

- 본문: 실제 **30장**. 표지 S001, 통합 본문 P002–P030.
- 상세 해설: **121단위**를 source_ids로 정확히 한 번씩 연결. 추가 발표 화면이 아니라 N 대화상자에서 읽는 내용.
- presentation.html: 약 12MiB의 오프라인 단일 HTML. 그림 24개(Figure1–23 및 ALLEX 원본 cutout), 스타일·스크립트 포함.
- slides.md 및 dist/: 같은 본문을 사용하는 Slidev 소스·정적 빌드. 본문별 상세 해설은 Slidev 발표자 노트에도 담았다. --without-notes 빌드에서는 발표자 노트가 제외되며, 완전한 상세 해설은 로컬 presentation.html에서 읽는다.

## 실제 실행한 검사

| 검사 | 결과 |
| --- | --- |
| scripts/build_deck.py | 본문30장·ID·그림 경로·121개 해설의 누락/중복 연결 없음 |
| Python 생성기 문법 검사 / JS runtime 문법 검사 | 통과 |
| pnpm build | 최종 생성 소스에서 종료 코드0 |
| pnpm build --base /rldx-1-seminar/ | 최종 생성 소스에서 종료 코드0 |
| node scripts/verify_deck.mjs | 30장 모두 실제 Chrome 1280×720 PNG 저장. 본문 높이·폭 넘침 없음, 모든 이미지 로드, 브라우저 오류0 |
| 오프라인 외부 HTTP 요청 | 0회 |
| 키보드 장 이동 / G 검색 | 실제 DOM 조작 통과. 상세 ID S053 검색으로 본문 P015 이동 |
| N 상세 해설 | S053을 포함한 관련 해설 표시 확인 |
| 그림 확대 | 실제 클릭으로 확대 dialog 열림 확인 |
| node scripts/verify_slidev.mjs | base 빌드의30개 실제 URL 모두 열어 제목·1280×720·이미지 확인. 브라우저 오류0 |
| 시각 검토 | 30장 contact sheet 전체와 주요 수식·MSAT·mid-training·실제 평가·부록 장의 원본 크기 PNG를 직접 확인 |

## 검증 파일

- review/previews/deck30-v01/S001-v01.png, P002-v01.png … P030-v01.png
- review/previews/deck30-v01/overview-1.png, overview-2.png
- qa/full-deck/render-report.json, render30.log
- qa/full-deck/build30.log, base-build30.log
- qa/full-deck/slidev-report.json, slidev.log 및 selected route PNG

Chrome 경로는 /Applications/Google Chrome.app/Contents/MacOS/Google Chrome이다. 검사는 현재 로컬 Chrome에서 수행했다. 다른 브라우저·운영체제의 폰트 배치나 실제 발표 환경까지 확인한 것은 아니다. 논문 실험·정책 실행을 재현한 결과가 아니다.

## 해결한 제작 문제

- 기존 dev 명령의 미지원 --host 옵션은 현재 CLI가 지원하는 --bind로 수정했다.
- layout:none에 .slidev-layout 부모가 없으므로 표지 스타일을 .cover-slide 직접 선택자로 적용했다.
- 초기 상세 단위별122장 구성을 사용자 피드백에 따라 본문30장+연결해설로 통합했다. 원문 내용은 상세 JSON에 보존했다.
- 첫 렌더에서 넘친 문장·표는 폰트를 줄이지 않고 중복 문장과 불필요한 수식·단계별 여백을 다듬었다. 최종 30장 검사는 다시 실행했다.
- 메모리·C/A 표기·합성 판정·각종 집계 불일치는 자동 보정하지 않고 질문으로 남겼다.

## 승인·공개 상태

전체 초안 작성·관련 단위 통합에 대한 사용자 허가와 결과물의 개별 승인은 다르다. 현재 각 장은 검토 전이다. GitHub 저장소 생성·push·Pages 배포를 실행하지 않았다.
