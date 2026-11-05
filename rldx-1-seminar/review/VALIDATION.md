# v07 전체 중복 통합·25장 검증 — 2026-11-05

| 실제 실행 | 확인 결과 |
| --- | --- |
| python3 scripts/verify_sources.py | 9개 MD·본문24장+표지1장·121개 상세 매핑·UTF-8·LaTeX·27상태/18화살표 |
| 통합 전후 단위 SHA-256 대조 | 모든121개 상세 단위 제목·내용 동일; 이동으로만 재배치 |
| node scripts/verify_deck.mjs | 실제25장 PNG, 넘침0·이미지 실패0·브라우저 오류0·외부요청0; G/N·검색·확대 |
| node scripts/verify_architecture.mjs | 27상태·4모듈·18화살표·경계·역순·버튼·animation/reduced-motion |
| node scripts/verify_navigation.mjs | PPT 조작·역방향 경계·통합된5개 과거 링크와 이동된 상세 해설 접근 |
| node scripts/verify_math_font.mjs | 실제 Nanum Gothic 글리프, KaTeX 분수/norm, 전체 상세 수식 너비 |
| pnpm build 및 pnpm build --base /rldx-1-seminar/ | 최종 기본/base 빌드 종료0; qa/full-deck/build-v07.log·base-build-v07.log |
| python3 scripts/package_pages.py 및 node scripts/verify_pages.mjs | 최종 게시용HTML/ZIP 갱신·실제 저장소 하위경로 표시·설명·오류0/외부요청0 |
| presentation.html/index.html 바이트 비교 | 동일 |

## 직접 검토

원문 PDF7–9·12–13·15–17·28, 중앙 질문노트 및9개MD의 관련 설명을 대조했다. 별도 검토자는 중요한 내용 유실/왜곡이나 흐름 문제를 발견하지 않았으며 P028의 N/T 구분 표기 오타1건을 수정했다. 동일한 결과를 중복해 설명하는 장은 통합하고 원리/검증·기여/의견/미해결 역할을 구분했다.

실제25장 화면의 전체 지도와 P006(학습 수식), P016/P017(학습 경로·기억 설정), P020(두 원문 그림), P028(조건부 이득)을 직접 확인했다. 최초 P017/P028 넘침은 문구를 정리해 해결했으며 글꼴 크기는 줄이지 않았다. 모든 원형 상세 해설은 이전 MD 스냅샷과 내용이 같다.

- 실제PNG: review/previews/deck-v07/ 및 architecture-v07/.
- 전체지도: review/previews/deck-v07/overview-v07.png.
- 보존지문/MD: review/versions/before-dedup-v07/.
- v07은 로컬 검토본이다. 이번 commit/push는 하지 않았다. 브라우저/빌드 검증은 논문 학습·로봇 실험 재현이 아니다.

---

# v06 MSAT 중복 통합 검증 — 2026-11-05

- 원문 PDF p.9: τ의 sinusoidal embedding+MLP·A sequence 앞 단일 토큰, A stream RoPE, RMSNorm(Q·K 포함), SwiGLU 채택을 직접 확인했다.
- verify_sources.py: 9개 MD, 본문28장+표지1장, S002–S122의121개 단위 각각 한 번,27상태·18화살표 통과.
- verify_deck.mjs: 실제29장 PNG, 본문 넘침0·이미지 실패0·브라우저 오류0·외부 요청0; G/N·그림 확대·검색 통과.
- verify_navigation.mjs: PPT 조작·정역순 경계·전체화면 유지, #P012→P009 연결 및 S037/S038/S039 이동 해설 접근 통과.
- verify_math_font.mjs: 실제 Nanum Gothic 글리프·KaTeX·이동된 해설을 포함한 전체 수식 너비 통과.
- verify_architecture.mjs: 기존27상태·4모듈·18화살표·경계·정역순 통과.
- pnpm build, pnpm build --base /rldx-1-seminar/: 종료0. qa/full-deck/build-v06.log·base-build-v06.log.
- package_pages.py 및 verify_pages.mjs: 게시용3파일 ZIP 갱신; /research_seminars/rldx-1-seminar/ 경로·본문·해설·외부 요청0 확인.
- 직접 화면 검토: review/previews/deck-v06/P009-v06.png·P010-v06.png. 입력3묶음·τ·RoPE와 normalization/attention/residual/FFN 역할을 각각 한 번 설명한다. 글꼴 크기를 줄이지 않았다.
- v06은 로컬 검토본이다. commit/push하지 않았으며 결과물 개별 승인은 아직 없다.

---

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

## 원문 기호·Memory 화살표 후속

그림 위 concat label/mask/green box를 제거하고 원문 기호를 복원했다. Memory의3번째 설명 화살표 시작점을Transformer Blocks 안으로 옮겼다. verify_architecture.mjs의27상태 검사에서 제거한요소0개·시작점의block내포함·정역순·경계를 확인했다. 기본/base 빌드와 게시용HTML/ZIP을 갱신했다. 이전 원문기호를concat으로덮었다는기록은 당시v05이력이다.


## 2026-11-05 / P032 / MSAT 확대 하단 연결부

- 사용자 요청: MSAT 확대 시 아래 Tactile/Torque와 원문의 ⨁ 기호가 함께 보여야 한다.
- 반영: MSAT 소개·입력·블록 설명의 7개 상태에서 하단까지 카메라를 확장했다. 원문 기호는 그대로 유지하고, 인접 Memory 제목의 일부가 잘려 나타나지 않도록 표시 영역을 조정했다.
- 검증: 실제 Chrome PNG에서 두 요소를 확인했다. 27개 상태의 경계·4모듈 조작·정방향/역방향 검사를 통과했다. 기본/base 빌드 성공, 생성 HTML/index 및 게시용 ZIP 갱신.
- PNG: review/previews/architecture-v05/step-19.png·step-22.png. 사용자 검토 전이며 commit/push는 하지 않았다.

## 2026-11-05 / P006 / 기호 표·손실 해석 후속

- Comment1: t/τ 구분 문단을 본문에서 빼고 기호 표(a, ε, τ)를 배치했다. 시간 구분의 자세한 설명은 기존 N 해설에 보존한다.
- Comment2: 원문 PDF p.8 Sec.2.2를 확인해 제목을 “Noisy action chunk”로 바꿨다. 정답·노이즈의 선형 보간으로 학습 입력을 만드는 식이다.
- Comment3: 본문의 c_t 정의를 제거했다. 수식 속 조건 입력 기호는 유지한다.
- Comment4: 숫자 예시 대신 u_θ=예측 변화율, v*=정답 변화율 및 좌표별 오차 제곱합으로 loss를 전개했다. 아래첨자2=L2 norm, 위첨자2=norm 제곱을 설명한다.
- 25장과121개 상세 공부 기록은 유지한다. 상세 단위의 제목·내용 지문은 통합 전과 동일하다.
- 검증: verify_sources, 실제25장PNG(넘침/오류/외부요청0), KaTeX·Nanum 글리프·상세 수식 너비, 기본/base 빌드 통과. 생성HTML·게시index·ZIP 갱신 및 세HTML 동일성 확인.
- 실제PNG: review/previews/deck-v07/P006-loss-v07.png. 사용자 결과물 검토 전이며 이번 수정은 commit/push하지 않았다.

## 2026-11-05 / P006 / u_θ 직접 annotation

- 최신 사용자 요청: 수식의 u_θ 자체를 설명하고 직접 annotation을 붙일 것.
- 반영: u_θ를 청록색으로 강조하고 바로 아래 underbrace에 MSAT를 표시했다. 같은 색 주석 상자에서 u_θ는 학습 가능한 neural vector field(신경망), θ는 학습 가중치라고 설명한다.
- 함수 u_θ 자체와 함수 평가값 u_θ(a^τ,τ,c_t)=chunk 전체의 예측 변화율을 구별했다. 이전의 ‘u_θ=예측 변화율’은 함수 출력을 줄여 말한 표현이며 최신 화면에서는 이를 명시적으로 구분한다.
- 좌표별 loss 전개·norm 설명과 숫자 예시는 기존 N 상세에 보존한다. c_t 정의나 물리시간 구분을 본문에 다시 넣지 않았다.
- 검증: 25장 PNG 넘침/브라우저 오류/외부 요청0, KaTeX underbrace·Nanum 글리프·상세 수식 검사, 기본/base 빌드 통과. 121개 상세 단위 지문 및 세 HTML 동일성 확인.
- 실제PNG: review/previews/deck-v07/P006-annotation-v07.png. 로컬 검토본이며 이번 commit/push는 하지 않았다.

## 2026-11-05 / P006 / clean a와 noisy a^τ 구분

- 사용자 지적: a는 정답이어도 a^τ는 noisy action인데 표에 a만 정의하면 혼동할 수 있다.
- 반영: 표에 a=정답(clean) action chunk, a^τ=노이즈가 섞인 action chunk를 각각 표시했다. 도입문도 정답 a로 입력 a^τ를 구성한다고 구분했다.
- 경계 조건 τ=1이면 a^τ=a를 명시해 noisy라는 이름을 끝점까지 오해하지 않도록 했다. 기존 표 헤더를 행별 기호 표로 바꾸고 글꼴 크기는 유지했다.
- 검증:25장PNG 넘침/이미지실패/브라우저오류/외부요청0,소스매핑/KaTeX생성,기본/base빌드 통과. 상세121개내용지문과3개HTML동일성 확인.
- 실제PNG: review/previews/deck-v07/P006-symbols-v07.png. 최신 자동commit/push 지시에 따라 게시한다.
