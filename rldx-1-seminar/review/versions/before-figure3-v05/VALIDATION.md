# PPT 방식 조작 v04 검증 — 2026-11-05

수식·글꼴·시각 배치는 아래 v03과 같고, v04는 HTML 조작을 바꿨다. 실제 Chrome에서 verify_navigation.mjs로 다음을 확인했다.

- →/←, ↑/↓, PageDown/PageUp, Space/Shift+Space, Enter/Backspace, Home/End.
- 빈 슬라이드 클릭의 다음 단계 이동과 그림 클릭의 확대 기능 유지.
- Fig.3의13단계를 진행해 다음 장으로 간 뒤, ←로 마지막 단계에 재진입하고13단계를 역순으로 돌아가 이전 장에 도착.
- 검색 입력·대화상자가 열려 있는 동안 장 이동 방지, 버튼의 Enter/Space 기본 동작, Ctrl 조합 유지.
- 검색어가 있어도 Esc 한 번으로 목차 닫기, F 전체 화면 진입과 Esc 종료. 브라우저 오류0.

기존 조작에서는 Enter가 장 이동에 연결되지 않아 새 테스트가 실패했고, 연결 후 통과했다. 검색 input의 Esc가 먼저 검색어만 지우던 동작은 대화상자 명시적 닫기로 수정했다.

v04에서 runtime JS 문법 검사,13단계 architecture 검사, 기본/base 빌드, 게시 패키지 재생성과 Pages 하위 경로 검사도 실행한다. 실행 결과: qa/full-deck/navigation-report.json·architecture-report.json·pages-report.json, build-v04.log·base-build-v04.log. v03의 전체30장 이미지·수식·글꼴 검증을 새 화면 캡처인 것처럼 표시하지 않는다. 기본 PNG는 deck-v03/, 단계 PNG는 architecture-v04/다.

이전 진행·검증·runtime은 review/versions/before-navigation-v04/에 보존했다. GitHub 공개 없음.

---

# 수식·나눔고딕 HTML v03 검증 — 2026-11-05

## 적용 범위

- 9개 섹션 MD에서 기존 수식53개를 $$ LaTeX $$로 바꾸고 인라인 표기를 $...$로 작성했다. HTML sub/sup 조합과 pseudo-equation div는 MD 원본에 남기지 않았다.
- build-time KaTeX htmlAndMathml 방식으로 분수·미분·벡터·첨자·노름을 렌더링한다. 본문·N 상세 해설과 HTML 레이아웃의 텍스트 안에도 적용한다.
- 한글 제목·본문·해설·조작부는 원본 나눔고딕 Regular/Bold/ExtraBold다. KaTeX 수학 글꼴20종과 함께 단일 HTML에 포함했다. 폰트 원본을 수정하지 않았고 라이선스를 포함했다.
- 기본 화면30개, Fig.3 내부13상태·8화살표, 상세121단위를 유지한다. 페이지 수 한도는 없다. HTML은 약20.38MiB이며 공개 업로드 ZIP도 갱신했다.

## 실제 실행한 검증

| 검사 | 결과 |
| --- | --- |
| python3 scripts/verify_sources.py |9개 MD·121상세 매핑, 큰 한글 UTF-8 왕복, 인라인/블록/HTML 내부 수식, 코드·escaped currency 보존 통과 |
| python3 scripts/build_deck.py |30개 기본 화면, 기존 그림23개, 내장 폰트·KaTeX 스타일 생성 |
| node scripts/verify_deck.mjs | 최종30장 실제 PNG, 넘침0·이미지 실패0·브라우저 오류0·외부 HTTP 요청0. 이동·G·N·그림 확대·근거 구분 통과 |
| node scripts/verify_math_font.mjs | 실제 한글28글리프가 NanumGothicBold custom font로 그려짐을 Chrome CDP로 확인.3개 Nanum face 로드. 실제 fraction·loss norm·N 해설 수식·29개 해설 페이지의 수식 가로폭 검사 통과 |
| node scripts/verify_architecture.mjs |13상태·8화살표, 클릭·키보드·버튼·복귀·이전·다음 장·hash·reduced-motion·해설 검사 통과 |
| pnpm build | 종료 코드0 |
| pnpm build --base /rldx-1-seminar/ | 종료 코드0 |
| node scripts/verify_slidev.mjs | base의30개 실제 URL에서 제목·화면 크기·이미지 확인, 오류0 |
| python3 scripts/package_pages.py |3파일 allowlist와 ZIP 생성. 현재 발표 HTML은 웹 업로드25MiB 상한 아래 |
| node scripts/verify_pages.mjs | /research_seminar/rldx-1-seminar/에서 목록 이동·표지·Fig.3·N 해설 확인, 외부 요청0·오류0 |
| 별도 읽기 검토 |121상세 보존,53display math,29개 장 해설의378개 KaTeX 표현에 노출된 수식 구분자·가로폭 넘침·브라우저 오류 없음 |
| 시각 검토 | 수식 장 P007/P008, 글꼴 변경으로 조정한 P013/P016/P019와 실제 PNG 확인 |

## 수정한 제작 문제

- 글꼴이 바뀌며 P013/P016/P019의 본문이 넘쳤다. 해당 장만 그림과 설명을1:1 열로 조정해 글자 크기와 내용을 유지했다.
- 수식을 감싼 Markdown bold가 한국어 조사와 붙어 문자로 남는 곳은 명시적인 strong 태그로 바꿨다. 기존 강조 중첩의 잘못된 부분도 바로잡았다.
- 학습 손실은 두 줄 사이에서 노름 기호를 나누지 않고 한 식으로 표시해 읽기 쉽게 했다. 첨자·target·norm 제곱을 유지했다.

## 파일

- review/previews/deck-v03/*.png, math-loss-v03.png
- review/previews/architecture-v03/step-00.png–step-12.png
- qa/full-deck/render-report.json, math-font-report.json, architecture-report.json, slidev-report.json, pages-report.json
- qa/full-deck/build-v03.log, base-build-v03.log
- content/typography-manifest.json: 원본 폰트의 SHA-256·출처·버전
- review/versions/before-math-v03/: 이전 MD·HTML·스타일·생성기·진행·검증 기록

발표용 전체 기능은 presentation.html에서 검증했다. Slidev는 정적 배치 검토용이다. Chrome/macOS에서 검증했으며 다른 OS·브라우저의 조판을 직접 검증한 것은 아니다. 실제 로봇 실험의 재현 결과도 아니다. PDF 인쇄는 기본 화면을 출력하며 Fig.3의 모든 단계를 추가 페이지로 자동 펼치지 않는다.

수정 요청을 개별 결과물 승인으로 처리하지 않았다. GitHub 저장소 생성·push·Pages 배포·Canva 공개 작업은 실행하지 않았다.
