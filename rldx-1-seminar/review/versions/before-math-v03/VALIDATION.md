# HTML·MD v02 검증 — 2026-11-05

## 최종 결과

기본 화면30개와 P032 내부의13개 설명 상태를 생성했다. 장수 제한은 없다. 아홉 MD에 본문29개·상세 공부121개가 있고, 원문 그림23개를 포함한 약11.38MiB 단일 HTML에서 모든 내용을 읽는다. GitHub·Canva에 게시하지 않았다.

## 실행한 검증

| 검사 | 실제 결과 |
| --- | --- |
| python3 scripts/build_deck.py | MD9개 → 기본 화면30개, 상세 S002–S122 정확히 한 번 연결,13상태·8화살표 문구 반영 |
| Python py_compile / node --check | 생성기·로더·마이그레이터·packager·runtime 문법 통과 |
| python3 scripts/verify_sources.py | 약750KB 입력의 텍스트가 UTF-8 손상 없이 동일하게 출력됨. 최종 HTML의 replacement character0개 |
| node scripts/verify_deck.mjs | 최종30개 PNG. 넘침0, 이미지 로드 실패0, 브라우저 오류0, 외부 HTTP 요청0. G/N·해설 그림·사실/해석 구분·키보드·확대 통과 |
| node scripts/verify_architecture.mjs |13상태·8화살표, hotspot zoom, 방향키·버튼·이전·리셋·다음장·hash·reduced-motion·해설·경계 확인 |
| pnpm build | 종료 코드0 |
| pnpm build --base /rldx-1-seminar/ | 종료 코드0 |
| node scripts/verify_slidev.mjs | base의30개 실제URL에서 제목·1280×720·이미지 확인, 브라우저 오류0 |
| python3 scripts/package_pages.py | 사용자 업로드용3파일과 ZIP 생성 |
| ZIP allowlist·원본 대조 |3파일만 포함, 발표 index.html은 presentation.html과 바이트 단위로 동일 |
| node scripts/verify_pages.mjs | 목록→/research_seminar/rldx-1-seminar/ 이동, Fig.1·Fig.3·N 해설, 외부 요청0·브라우저 오류0 |
| 직접 시각 검토 | 전체30장 contact sheet, 표지, Fig.3 전체·확대·화살표 상태, 수식·MSAT·실험·ALLEX 수정 PNG 확인 |

## 생성 과정에서 수정한 문제

- Markdown 렌더러가 Buffer 조각을 문자열로 각각 변환하면 한글 UTF-8 문자의 중간이 잘릴 수 있었다. stdin 전체를 UTF-8로 읽도록 바꾸고 큰 입력 왕복으로 확인했다.
- 한국어 조사나 inline HTML에 붙은 Markdown 강조 구분자가 그대로 보이는 경우는 해당 MD의 명시적인 strong 태그로 수정했다. 전체 본문·해설의 표시 텍스트에 남은 강조 구분자0개를 확인했다.
- ALLEX의 혼합 평균 설명이 본문 아래로 넘쳤다. 중복 강조 상자의 문구·배치를 정리해 의미를 유지하고, 전체 화면을 다시 검사했다.
- 새 해설 그림 검사는 그림이 없는 P032를 검사하는 잘못된 fixture였다. 실제 그림이 있는 P031의 N 해설에서 확인하도록 고쳤다.
- 게시 경로 검사는 대용량 단일 HTML의 runtime 로드 전에 키를 입력했다. runtime 준비를 기다린 후 검사해 실제 상호작용을 확인했다.

## 근거 파일

- review/previews/deck-v02/*.png, overview-1.png·overview-2.png
- review/previews/architecture-v02/step-00.png–step-12.png
- qa/full-deck/render-report.json, architecture-report.json, slidev-report.json, pages-report.json
- qa/full-deck/build-v02.log, base-build-v02.log
- deployment/site/research_seminar/, output/research_seminar-pages.zip

## 사용 범위와 한계

발표용 전체 기능은 presentation.html에 있다. Slidev 출력은 본문 배치 검토용이며 자체의 화면 이동 체계를 사용한다. 새 Fig.3 설명 runtime과 G/N은 단일 HTML에서 확인했다. Chrome(macOS)의 실제 화면을 검증했으며 다른 OS·브라우저의 폰트 배치나 실제 로봇 실험을 재현한 결과는 아니다. PDF 인쇄는 기본 화면을 출력하며 Fig.3의 모든 animation 상태를 추가 페이지로 자동 펼치지 않는다.

기존 v01 검증 기록은 review/versions/VALIDATION-before-figure3.md에 보존했다. 이전 기록을 새 버전의 통과 근거로 대신하지 않았다. 개별 장의 사용자 승인은 아직 없고, GitHub 저장소 생성·push·Pages 배포도 실행하지 않았다.
