# Figure 3 네 모듈 v05 검증 — 2026-11-05

실제 기본30개 화면과 P032내부27상태·18화살표를 검증했다.121개 상세 단위는 유지했다. 이전 검증 기록은 review/versions/before-figure3-v05/에 보존한다.

| 실행 | 실제 확인 |
| --- | --- |
| python3 scripts/verify_sources.py |9 MD·121개 상세 매핑, LaTeX/UTF-8,27상태·18화살표·그림 위 이름 대응 |
| node scripts/verify_architecture.mjs |27상태 PNG, 네 모듈 hotspot/버튼, 토큰3구간 이름, concat, 중간층·압축, 주석/버튼 겹침·화면 경계, 정/역순·복귀·reduced-motion |
| node scripts/verify_navigation.mjs | PPT 키·본문 클릭·그림 확대·검색·대화상자·전체 화면·27단계 역방향 경계 |
| node scripts/verify_deck.mjs |30장 PNG, 본문 넘침0·이미지 실패0·오류0·외부 요청0. G/N·근거 구분 유지 |
| node scripts/verify_math_font.mjs | 실제 NanumGothic 웹폰트 글리프, LaTeX 분수·norm과29개 장 해설의 수식 너비 |
| pnpm build / pnpm build --base /rldx-1-seminar/ | 기본/base 빌드 종료0 |
| node scripts/verify_slidev.mjs |30개 실제 base URL·제목·1280×720·이미지 로드·오류0 |
| python3 scripts/package_pages.py | allowlist3파일과 ZIP 갱신 |
| node scripts/verify_pages.mjs | 실제 저장소명에 맞춘 /research_seminars/rldx-1-seminar/에서 표시·이동·설명, 외부 요청0·오류0 |

## 직접 검토

VLM 입력 행, 압축·중간층 문구, Memory Qₜ/hₜ/mₜ·concat, MSAT 입력·후반 처리 PNG를 직접 확인했다. 관련 없는 물리 센서 글자나 잘린 캡션이 보이지 않도록 그림 부분을 선택해 보여 주며 원본 Fig.3 비트맵은 변경하지 않았다. SVG 주석과 이름을 겹쳐 표현한다.

Sec.2.1–2.2 PDFpp.7–9 및 현재 상세 MD를 별도로 대조했다. h/m concat, stream별 residual과 C-Aconcat, 현재조건과미래후보, 변화율과최종출력 구분에 중요한 과학적 오류가 없다는 검토를 받았다. 새 MSAT 출처 pp.8–9를 footer에 보완했다.

## 결과물

- presentation.html과index.html은 동일한 발표 파일이다. 생성기가 두 파일을 함께 갱신한다.
- review/previews/deck-v05/, review/previews/architecture-v05/step-00.png–step-26.png
- qa/full-deck/의 render·architecture·navigation·math-font·slidev·pages 보고서
- qa/full-deck/build-v05.log·base-build-v05.log
- output/research_seminar-pages.zip은3파일만 포함하며 사이트용 HTML은 발표본과 동일하다.

발표 전체 기능은 단일 HTML에서 검증했다. Slidev는 정적 배치 검토용이다. Chrome/macOS에서 확인했고 실제 로봇 실험의 재현 결과가 아니다. 현재 공개 사이트는 사용자가 게시한v04이며, v05를commit/push/배포하지 않았다. 결과물의 개별 승인은 아직 없다.

## P013 줄바꿈 후속

MD의 ‘조작 경험을,’ 직후에 명시적 br를 넣었다. Chrome의 표시 텍스트에서 ‘조작 경험을,\n자체 데이터는’을 확인했고 본문 가로·세로 넘침과 브라우저 오류는0이었다. PNG는 deck-v05/P013-linebreak-v05.png, 검사 결과는 qa/full-deck/p013-linebreak-report.json이다. 생성 HTML·index·기본/base 빌드·ZIP을 갱신했다.
