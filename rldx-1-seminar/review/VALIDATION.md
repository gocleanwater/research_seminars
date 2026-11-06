# v09 페이지 번호 입력 검증 — 2026-11-06

## 2026-11-06 / v27 / 실제 Fused Kernels 페이지 제외

- P078을 발표 본문에서 제외했다. P039 Kernel Fusion 계산 → P040 시뮬레이션 벤치마크로 바로 연결하며 기존 P078 링크는 P039로 연결한다. 전체52장→51장이고121개 공부 기록은 기존2f90667과 바깥 공백 외 동일하다. 제외 페이지는 source_ids가 비어 있어 이동할 상세 단위가 없다.
- 원본은 review/versions/before-kernel-table-removal-v27/P078.md와 `rldx-v26-before-kernel-table-removal-20261106` 태그에 보존했다. 기존 S081의 kernel 상세 기록은 유지한다.
- `build_deck.py`, `verify_sources.py`, `verify_deck.mjs`, `verify_navigation.mjs` 통과.51장 넘침·이미지 실패·브라우저 오류·외부 요청0. P039→P040 순서·P078 DOM 부재·기존 링크 연결을 확인했고 새27쪽 P040 PNG를 직접 확인했다.
- 기본/base `pnpm build`, 패키지 생성과 `verify_pages.mjs` 통과. HTML3종 동일성·git diff --check 확인 후 자동 commit/push한다. 사용자가 이전에 추가 배포 확인을 중단하도록 했으므로 이번에는 공개 서버 반영을 별도 추적하지 않는다.

## 2026-11-06 / v26 / 실험 부록 제외

- 사용자 요청에 따라 PEFT3장·부록 평가 설정/과제별 결과8장·추가 ALLEX 합성/batch/BoN8장, 총19장을 발표 화면에서 제외했다. 전체71장→52장. 본문 Table1·Fig.14/16/18 결과와 Table2–4·Fig.19–21 분석은 유지한다. 원본/대응표는 review/versions/before-appendix-removal-v26/에 보존했다.
- S108→P028, S109–S111→P067, S112–S113→P064, S114–S115→P022 N 상세에 연결했다. 기존117226f와 전체121개 상세 기록의 제목·본문은 바깥 공백 외 동일하다. 관련 부록 정보를 필수 대본으로 새로 늘리지 않았다. 의견/한계는 본문 근거로 연결한다. 중앙 질문노트와 대조해 Q6=MSAT, Q8=Task 증강을 표시했다.
- `build_deck.py`, `verify_sources.py`, `verify_deck.mjs` 통과.52장 화면 넘침·이미지 실패·브라우저 오류·외부 요청0. P028/P030 실제 PNG를 직접 확인했다. 본문 실험/의견 화면에 제외한 PEFT·BoN·부록 Table6/8–15 주제가 남지 않았음을 소스 검사했다.
- `verify_navigation.mjs` 통과: 세 구간의 새 순서,19개 퇴역 ID의 본문 부재/이전 링크 연결과 옮긴 상세 기록을 확인했다. `verify_math_font.mjs`는 전체 N 수식·실제 글리프·글꼴 fallback을 확인해 통과했다. Fig.3의27상태/18화살표는 유지한다.
- 기본/base `pnpm build`, 게시 패키지 생성·`verify_pages.mjs` 통과. 최종 HTML3종 동일성·`git diff --check` 확인 후 자동 commit/push한다. 실제 Pages 반영과 사용자 결과물 승인은 별도 확인 전이다. 변경 전 태그는 `rldx-v25-before-appendix-experiments-removal-20261106`이다.

## 2026-11-06 / v25 / Critic 방식 비교를 본문에 표시

- 원문 PDF pp.14–15·43과 S067–S070을 확인했다. P019에 기존 VLM critic의 새 value head와 숫자 텍스트 출력 방식의 대비를 추가했고 P037에 Fig.8의 파랑 distributional/초록 text prediction 방식을 명시했다. 일반 critic 전체를 단일 구조로 설명하지 않는다. 새 head 적응 부담과 기존 지식 재사용 동기·저자의 해석 범위는 대본에 남겼다.
- 전체71장·121개 상세 공부 기록은 기존5bb3cf4와 내용이 동일하다(바깥 공백 제외). Fig.3의27상태/18화살표·페이지 순서·탐색 기능은 유지했다. 변경 전 태그는 `rldx-v24-before-critic-comparison-20261106`이다.
- `build_deck.py`, `verify_sources.py`, `verify_deck.mjs` 통과. 초기 두 장의 본문 넘침은 중복 문장을 줄여 해결했고 글꼴 크기는 줄이지 않았다. 최종71장 넘침·이미지 실패·브라우저 오류·외부 요청0. P019/P037 실제 PNG를 직접 확인했다.
- 기본/base `pnpm build`, `package_pages.py`, `verify_pages.mjs` 통과. HTML3종 동일성·git diff --check 확인 후 자동 commit/push한다. 실제 Pages 반영과 개별 결과물 승인은 별도 확인 전이다.

## 2026-11-06 / v24 / 입출력 경로 페이지 제외·MSAT 마지막 대본

- P036 본문을 제외하고4쪽 P032 발표 메모 끝에 MSAT 마무리 대본을 추가했다. 로봇별 입출력 projection·P stream과의 차이·공통 경로와 학습 보충을 설명한다. S036/S058을 P032로 이동했으며 변경 전3435379와 상세121개 내용은 바깥 공백 외 동일하다. 전체71장이다.
- `build_deck.py`, `verify_sources.py`, `verify_deck.mjs`, `verify_navigation.mjs` 통과.71장 화면 넘침·이미지 실패·브라우저 오류·외부 요청0. P036 DOM 부재, P036/P011 링크의 P032 MSAT 연결,4쪽 N 대본 문구, 새7쪽 P010 번호 입력을 확인했다.
- 실제 대본 PNG `review/previews/deck-v24/P032-msat-script.png`를 직접 확인했다. 원문 Fig.3 및27상태/18화살표는 유지한다.
- 기본/base `pnpm build`, `package_pages.py`, `verify_pages.mjs` 통과. HTML3종 동일성·git diff --check 확인 후 자동 commit/push한다. 실제 Pages 반영과 사용자 결과물 승인은 별도 확인 전이다. 보존 태그: `rldx-v23-before-projection-script-20261106`.

## 2026-11-06 / v23 / 입출력 경로를 Architecture로 이동

- 기존20쪽 P036을 새7쪽으로 이동했다. 새 순서는 P009 입력(6) → P036 입출력 연결(7) → P010 Joint Attention(8)이며, 학습 절차는 P016 → P017로 연결한다. P036의 batch당256 trajectories 문장은 설명(N)에만 남기고 P016 설명에도 연결했다.
- 변경 전 be4eb7a와 전체121개 공부 기록 제목·본문이 바깥 공백 외 동일함을 확인했다. 전체72장·Fig.3의27상태/18화살표를 유지한다. 보존 태그는 `rldx-v22-before-projection-reorder-20261106`이다.
- `build_deck.py`, `verify_sources.py`, `verify_deck.mjs` 통과.72장 PNG를 생성했고 화면 넘침·이미지 실패·브라우저 오류·외부 요청0. 새 P036 PNG의 섹션명·배치·7/72 표기를 직접 확인했다.
- `verify_navigation.mjs`의 이전 순서 기대값을 새 위치에 맞췄다. 새7쪽 번호 입력, P009→P036→P010 이동, 기존 P011 링크, P036 본문에256 없음/N 대본에256 있음 검증이 통과했다.
- 기본/base `pnpm build`, `package_pages.py`, `verify_pages.mjs` 통과. 세 HTML 동일성 확인. 공통 CSS·모듈 확대·수식은 수정하지 않았다. 사용자 결과물 승인과 실제 Pages 반영 완료는 별도 확인 전이다.

## 2026-11-06 / v22 / 합성 데이터 검증의 발표 대본 통합

- 번호 확인:14·15쪽 통합 전 c80d812의 manifest에서17=P074,18=P045,19=P015,20=P046을 확인했다. 사용자가 명시한 ‘합성 데이터 검증’ 제목과 이 대응에 따라 P074/P045/P046을 P015 대본으로 통합했다. P047 판정기 학습 장은 유지한다.
- 대본: 영상 품질의 두 축/Gemini16·8프레임, IDM 구조·학습/수치 행동, simulator rollout의 의미, frozen V-JEPA2 특징/concat/query cross-attention/linear head의 일치 판정과 선별 순서로 설명한다. P015 본문은 기존 rollout 비교 그림을 유지한다.
- 보존: S051/S052/S053을 P015에 연결했다. HEAD(74b77bf)와 전체121개 상세 기록 제목·본문을 비교해 바깥 공백 외 동일함을 확인했다. 변경 전 태그는 `rldx-v21-before-synthetic-validation-notes-20261106`이다. 전체72장·27상태/18화살표 유지.
- 검증: `build_deck.py`, `verify_sources.py`, `verify_deck.mjs`, `verify_navigation.mjs`, `verify_math_font.mjs` 통과.72장 넘침·이미지 실패·브라우저 오류·외부 요청0. 세 기존 링크와 S053 검색은 P015로 연결되며, N 대본 내용과 전체 수식 너비를 확인했다.
- 실제 PNG: P015 본문, 영상 품질 대본, 특징 비교 대본을 직접 확인했다. 새16쪽은 P015이고 다음은 판정기 학습이다. 기본/base `pnpm build`, 게시 패키지 생성과 `verify_pages.mjs` 통과. HTML3종 동일성·`git diff --check` 확인 후 자동 commit/push한다. 실제 Pages 반영과 사용자 결과물 승인은 별도 확인 전이다.

## 2026-11-06 / v21 / 영상 생성 모델14·15쪽 한 장 통합

- P072 한 장에 시연 영상→영상 생성 모델 추가 학습→합성 영상 제작을 배치했다. P073 본문을 제외하고 기존 두 장의 기반 모델·데이터·2:1:1·LoRA/Full FT·steps/batch·93프레임·caption·시간 샘플링은 P072 설명(N)에 보존했다.
- 변경 전 HEAD(c80d812)와 전체121개 상세 기록 제목·본문을 추출 비교해 동일함을 확인했다. 변경 전 태그는 `rldx-v20-before-video-model-merge-20261106`이다. 전체75장·27상태/18화살표 유지.
- `build_deck.py`, `verify_sources.py`, `verify_deck.mjs`, `verify_navigation.mjs` 통과.75장 넘침·이미지 실패·브라우저 오류·외부 요청0. P034→P072→P014 흐름과 P073 링크의 P072 연결을 확인했다. 모델명/설정은 화면에 없고 N 설명에 있다는 DOM 검사도 통과했다.
- 실제 P072 전체 PNG와 N 설명의 모델·학습 설정 표 PNG를 직접 확인했다. 글꼴 크기·공통 CSS는 변경하지 않았다.
- 기본/base `pnpm build`, 게시 패키지 생성과 `verify_pages.mjs` 통과. HTML3종 동일성과 `git diff --check` 확인 후 자동 commit/push한다. Pages 실제 반영과 사용자 결과물 승인은 별도 확인 전이다.

## 2026-11-06 / v20 후속 / Scene의 Canny edge 설명

- 원문 PDF p.11 Scene Augmentation 전체를 대조했다. P014(16쪽)에 윤곽선 안내선의 직관, Scene의 I2I→I2V 및 V2V 연결을 보강했다. “구체적인 판정 규칙·prompt…” 문장은 본문에서 삭제했다. 대본은 I2I의 장면 편집과 V2V의 정체·형태/동작 보존 목표를 구별하며 Fig.5(c)가 I2I→I2V 예시임을 유지한다.
- 변경 전 HEAD와121개 상세 기록 제목·본문을 비교해 동일함을 확인했다. `build_deck.py`, `verify_sources.py`, `verify_deck.mjs` 통과.76장 넘침·이미지 실패·브라우저 오류·외부 요청0. 실제 P014 PNG의 문장·Canny 설명 상자·그림 경계를 직접 확인했다.
- 기본/base `pnpm build`, 게시 패키지 생성과 `verify_pages.mjs` 통과. HTML3종 동일성과 `git diff --check` 확인 후 자동 commit/push한다. 실제 Pages 반영과 사용자 결과물 승인은 별도 확인 전이다.

## 2026-11-06 / v20 후속 / 자체 데이터 수집 목적

- P034(13쪽)의 첫 문장·요점·발표 메모를 목표 로봇 특화와 물리 센싱 등 새 기능 학습의 목적으로 수정했다. Sec.3.2와 직전 확인한 Sec.4.2의 supervision 설명에 근거하며, 출처에 p.13을 추가했다. 원래 상세 기록과 페이지 순서는 변경하지 않았다.
- `python3 scripts/build_deck.py`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs` 통과.76장·121개 기록이며 넘침·이미지 실패·브라우저 오류·외부 요청0. 실제 P034 PNG를 직접 확인했다.
- 기본/base `pnpm build`, 게시 패키지 생성 및 `node scripts/verify_pages.mjs` 통과. HTML3종 동일성과 `git diff --check` 확인 후 자동 commit/push한다. 실제 Pages 반영과 사용자 결과물 승인은 별도 확인 전이다.

## 2026-11-06 / v20 / Memory 대본 통합과 비교 요약 제외

- 범위: 직전80장 버전의6–8쪽 P056/P057/P058을4쪽 Memory 확대 대본으로 통합했다.9쪽 P059 비교 요약은 본문에서 빼고 발표 대본으로도 옮기지 않았다. 사용자도 Memory Module 쪽이라고 확인했다.
- 대본: 필요성/shell game→과거 queue→현재 특징과concat/입력256개→causal Transformer와m_t→h_t/m_t concat의 네 화살표 순서다. 저장 간격·시간 범위·H/H+1 불일치·cache 갱신 미해결은 발표자 보충으로 보존한다. 원문 그림과27개 확대 상태/18화살표는 바꾸지 않았다.
- 보존: S017/S019/S018을 P032로 옮겼다. HEAD(8a6201d)와 전체121개 상세 기록의 제목·본문을 추출 비교해 바깥 공백 외 동일함을 확인했다. P059는 원래 별도 상세 기록을 소유하지 않았으며 기존 공부 기록 S016은 기록으로 유지한다. 변경 전 태그는 `rldx-v19-before-memory-speaker-notes-20261106`이다.
- 소스/화면: `python3 scripts/build_deck.py`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs` 통과.76장·121개 기록이며 넘침·이미지 실패·브라우저 오류·외부 요청0.
- 탐색/수식: `node scripts/verify_navigation.mjs`, `node scripts/verify_math_font.mjs` 통과. 세 링크는 Memory 확대, P059는 전체 Fig.3으로 연결한다. P051→P009와 입력·정역순·실제 대본 문구 및 전체 N 해설 수식 너비/글꼴을 확인했다.
- 시각 확인: 실제 N 대본의 Memory 도입·concat 수식 PNG와 새6쪽 MSAT 입력 PNG를 직접 확인했다. 대본 intro에는 저장 간격 표1개만 있고, 제거한 세 표현 비교 표가 추가되지 않았음을 DOM으로 확인했다.
- 빌드/게시: 기본/base `pnpm build`, 게시 패키지 생성과 `node scripts/verify_pages.mjs` 통과. HTML3종 동일성과 `git diff --check` 확인 후 자동 commit/push한다. Pages 실제 반영과 사용자 결과물 승인은 별도 확인 전이다.

## 2026-11-06 / v19 / 현재6–9쪽을 VLM 발표 대본으로 통합

- 범위 정정: 최초9–12쪽 요청은87장 버전의 번호였고 사용자가 현재6–9쪽이라고 정정했다. 정정 전에 파일 수정은 없었다. 대상은 P052/P053/P054/P055이며 Memory P056/P057/P058을 제거하지 않았다.
- 대본: P032 발표 메모에 세 종류 입력과64개 q→초기4층/causal→과거 특징을context1개로 압축/DeepStack→중간층 cognition 위치 출력h_t의 네 화살표 순서로 구두 설명을 작성했다. 입력·평균·출력 선택 수식도 대본에서 KaTeX로 읽는다. 원문 식/설명용 표기와 중간층·18층 사실의 구분을 유지한다.
- 구성/보존: 네 장을 본문에서 제외해 전체80장이다. S009/S010/S014/S015를 P032에 연결했고, HEAD(aea70d3)와 전체121개 상세 기록 제목·본문을 추출 비교해 바깥 공백 외 동일함을 확인했다. 기존 네 링크는 P032 VLM 확대 첫 상태로 연결한다. P051 다음은 P056이다. 변경 전 태그는 `rldx-v18-before-vlm-speaker-notes-20261106`이다.
- 소스/화면: `python3 scripts/build_deck.py`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs` 통과.80장·121개 기록·27상태/18화살표 대응 유지. 넘침·이미지 실패·브라우저 오류·외부 요청0.
- 탐색: `node scripts/verify_navigation.mjs` 통과. P051→P056 흐름, 번호 입력·정역순·기존 링크와새4개 링크·실제 N 대본 문구를 확인했다. Fig.3의 상태·화살표 문구/좌표는 이번에 바꾸지 않았다.
- 수식: `node scripts/verify_math_font.mjs` 통과. 실제 Arial/한글fallback, 내장 Nanum·KaTeX 및 전체 N 해설 수식 너비 확인. 대본을 캡처한 `P032-vlm-speaker-notes.png`, `P032-context-equation-notes.png`와 새6쪽 P056 PNG를 직접 확인했다.
- 빌드/게시: 기본/base `pnpm build`와 `python3 scripts/package_pages.py`, `node scripts/verify_pages.mjs` 통과. HTML3종 동일성과 `git diff --check` 확인 후 자동 commit/push한다. Pages 실제 배포 완료와 사용자 결과물 승인은 별도 확인 전이다.

## 2026-11-06 / v18 후속 / VQA의 동기·효과와 Fig.3

- 근거: PDF 스킬의 읽기 절차로 원문6–7쪽 Sec.2.1과25쪽 Table2(b)의 전체 텍스트를 확인하고 원문 Fig.3 PNG를 직접 봤다. 텍스트는 제공된 pypdf로 추출했다. VQA는 embodied grounding 부족을 보완하는 학습이며 그림에는 별도 학습 블록이 없음을 확인했다.
- 변경: P051 왼쪽은 하위 작업·공간 관계·low-level grounding의 한계와 VQA fine-tuning, 오른쪽은 세 학습 범주와 의도한 능력, 하단은 RoboCasa Kitchen57.5→60.9 조작 성공률이다. VQA 정답률이나 각 범주의 독립 효과로 확대하지 않는다. N 대본과 P032 VLM 확대 도입도 보강했다. 원문 그림은 수정하지 않았다.
- 보존: 본문84장·상세121개·Fig.3의27상태/18화살표 유지. HEAD와121개 상세 기록 제목·본문을 추출 비교해 동일함을 확인했다.
- 검증: `python3 scripts/build_deck.py`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs`, `node scripts/verify_architecture.mjs` 통과.84장 넘침·이미지 실패·브라우저 오류·외부 요청0. 전체27개 확대 상태의 경계·애니메이션·역순 탐색 통과.
- 시각 확인: 실제 HTML의 P051 전체 PNG와 P032 step07 PNG를 직접 확인했다. 기존 글꼴 크기를 유지했고 표·출처·요점과 그림 도입 설명이 경계 안에 들어간다.
- 빌드/게시: 기본/base `pnpm build`, 게시 패키지 생성, `node scripts/verify_pages.mjs` 통과. HTML3종 동일성과 `git diff --check` 확인 후 자동 commit/push한다. 실제 Pages 반영과 사용자 결과물 승인은 별도 확인 전이다.

## 2026-11-06 / v18 / Vision Encoder 3장을4쪽 대본으로 통합

- 요청: 기존5·6·7쪽(Vision Encoder·STSS·residual)은4쪽 Fig.3의 Vision 확대에서 설명하고 대본에 적는다.
- 반영: P048–P050 본문을 제외하고 P032 발표 메모에 입력 관측→1–9층→STSS→residual 수식/기호·원소별 덧셈→10–27층의 화살표 순서로 대본을 썼다.4쪽에서 N/설명으로 읽을 수 있으며 Slidev 발표 메모에도 들어간다. 다음 본문은 VLM/VQA(P051)다.
- 보존: S011–S013을 P032에 연결했다. 변경 전 `3c43f0b`의121개 상세 기록을 추출 비교해 바깥 공백을 제외한 제목·내용이 모두 동일함을 확인했다. 퇴역 ID3개는 P032 Vision 확대 첫 상태로 연결한다. 변경 전 태그는 `rldx-v17-before-vision-speaker-notes-20261106`이다.
- 소스/화면: `python3 scripts/build_deck.py`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs` 통과.84장·121개 기록·27상태/18화살표이며 넘침·이미지 실패·브라우저 오류·외부 요청0.
- 대본 시각 확인: 실제 HTML의 P032 Vision 화면, 대본 대화상자, residual 수식 PNG와 새5쪽 P051을 직접 확인했다. 수식은 KaTeX로 표시하며 그림에 추가하지 않았다. 최초 캡처의 h4 선택자는 renderer가 h3로 바꾸는 규칙에 맞춰 수정해 다시 캡처했다.
- 탐색: `node scripts/verify_navigation.mjs`, `node scripts/verify_architecture.mjs` 통과.4쪽 마지막 단계→새5쪽(P051), 역방향 마지막 단계 복귀, 번호 입력, 기존/새 퇴역 링크3개, 실제 N 대본 문구, 전체27개 확대 상태·18화살표·애니메이션을 확인했다.
- 수식/모바일: `node scripts/verify_math_font.mjs`, `node scripts/verify_mobile_toolbar.mjs` 통과. 전체 N 해설 수식 너비·글꼴,10개 터치 화면·페이지 입력·대화상자 검증을 유지했다.
- 빌드/게시: 기본 `pnpm build`, 프로젝트 base 빌드 통과. `node scripts/verify_slidev.mjs`84장·오류0·실패0. `python3 scripts/package_pages.py`, `node scripts/verify_pages.mjs` 통과. HTML3종 동일성과 `git diff --check` 확인 후 자동 commit/push한다. Pages의 실제 배포 완료와 사용자 결과물 승인은 별도 확인 전이다.

## 2026-11-06 / v17 후속 / 모바일 조작 메뉴

- 원인: 하단 메뉴가 nowrap 한 줄 고정 flex였고, stage fit은 메뉴 크기를62px로 가정했다. 수정 전 새 회귀 검사에서 `320x568: toolbar fits horizontally` 실패를 재현했다.
- 변경: CSS에서 좁은 세로 화면을2행 grid로 배치하고 가로·넓은 화면은1행을 사용한다. 터치 환경은 버튼/번호 입력 최소44px·글꼴16px이며 shortcut 문구만 숨긴다. viewport-fit/safe-area inset과 ResizeObserver 기반 실제 메뉴 높이를 반영한다. 내용·수식·87장 순서·121개 상세 기록은 변경하지 않았다.
- 모바일: `node scripts/verify_mobile_toolbar.mjs` 통과.320x568,360x640,390x844,430x932,480x320,568x320,640x360,768x1024,844x390,1024x768의10개 터치 화면에서 메뉴/입력/버튼 경계·겹침·44px 영역·수평 넘침·stage와메뉴 비겹침을 확인했다. 실제 resize와 touch 이동·페이지 입력·동일 장 첫 내부 상태·목차/설명 열기·닫기 및 오류0 확인. Chromium 모바일 에뮬레이션이며 실제 iOS/Android 기기 검사는 아니다.
- PNG: `review/previews/mobile-toolbar/`의320x568·390x844·568x320·844x390 실제 HTML 화면을 직접 확인했다. 가로 화면에서는 메뉴를1행으로 줄여 슬라이드 영역을 확보했다.
- 회귀: `node scripts/verify_navigation.mjs`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs` 통과. 기존 키·번호 입력·역순·퇴역 링크·Fig.3 경계를 유지하며87장 이미지 실패/넘침/브라우저 오류/외부 요청0.
- 빌드·게시: 기본 `pnpm build`, 프로젝트 base 빌드, `python3 scripts/package_pages.py`, `node scripts/verify_pages.mjs` 통과. HTML3종 동일성과 `git diff --check` 확인 후 자동 commit/push한다. Pages 실제 배포 완료는 별도 확인 전이다.

## 2026-11-06 / v17 / 부록42–55쪽의 흐름별 통합

- 요청: 부록의 구현 정보·추가 실험을 관련 본문 사이에 배치하고 새로운 주제는 별도 장으로 설명한다. 배치표와 중복 정리는 `review/APPENDIX_INTEGRATION.md`에 기록했다.
- 근거: 원문 PDF pp.42–55, 기존9개 섹션 MD와121개 상세 공부 단위를 대조했다. 원문 Fig.22/23도 확인했다. 새로운 근거나 인과 실험을 만들지 않았다.
- 구성: Action40개 생성/20개 실행, 영상 생성 모델·IDM 학습, 품질 검사 샘플 수, PEFT/LoRA 성능·비용, 실제 fused kernels, 평가 조건·baseline 출처, 합성 데이터의 실제 ALLEX 실험, batch 효과, BoN과 과제별 성능 편차를 해당 설명 옆에 배치했다.24장을 추가해 전체87장이다.
- 연결: 생성/실행은 Action 수식 뒤, 생성 모델·IDM은 합성 데이터, PEFT는 RECAP까지 설명한 학습 절차 뒤, BoN은 RECAP 결과 뒤에 둔다. 기존 의견 장의 반복 수치를 줄이고 적용 조건에 대한 해석으로 정리했다.
- 범위:40/20은 해당 RL 설정이다. PEFT는 H200 측정이며 소비자 GPU에서 직접 검증한 결과가 아니다. BoN은 별도Q critic을 사용하며 N/T가 함께 바뀐 비교를 구별한다. 합성 추가 실험은 따르기 전체 성공률이 아닌 grasping subtask이고, Table9의 count/scoring 불일치는 미해결로 명시한다.
- 보존: 변경 전 태그 `rldx-v16-before-integrated-appendix-20261106`(35759a6)의121개 상세 단위를 추출 비교했다. 바깥 공백을 제외한 제목·본문이 동일하고 각각 한 번 연결된다.10개 단위의 본문 소유 장을 옮겼으며 기존 ID 의미·퇴역 링크·Fig.3의27상태/18화살표를 유지했다.
- 소스/화면: `python3 scripts/build_deck.py`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs` 통과.87개 PNG에서 넘침·이미지 실패·브라우저 오류·외부 요청0. 최초 P077/P093 넘침은 중복 설명을 정리해 해결했으며 글꼴 크기는 줄이지 않았다.
- 시각 확인: 새 P071–P094의24개 PNG와 보강 P045/P047·의견 P028을 직접 확인했다. 마지막 순서 조정 뒤 전체87장을 다시 렌더링했다.40/20의 안쪽/바깥쪽 반복, 표·수식·Fig.22/23 및 설명 상자의 경계를 확인했다.
- 탐색: `node scripts/verify_navigation.mjs` 통과. 새24장의 실제 연결 순서, 번호 입력의 첫 상태 진입, 정역순 키·대화상자·기존 별칭·이동한 상세 해설을 확인했다.
- 수식/글꼴: `node scripts/verify_math_font.mjs` 통과. Arial·한글 fallback·내장 Nanum·KaTeX와 전체 N 해설의 수식 너비를 확인했다. 이후 변경은 PEFT 장의 위치 조정이며 글꼴·수식 구현은 변경하지 않았다.
- 빌드: 기본 `pnpm build`와 `pnpm build --base /rldx-1-seminar/` 통과. 최종 `node scripts/verify_slidev.mjs`에서87장·브라우저 오류0·실패0을 확인했다.
- 게시 산출물: `python3 scripts/package_pages.py`, `node scripts/verify_pages.mjs` 통과. repository 하위 경로·랜딩·표지·Fig.3·해설 및 외부 요청0. presentation/index/게시 index 바이트 동일성과 `git diff --check` 통과. HTML은20.90MiB이다.
- 사용자 결과물 검토 전이다. 자동 게시 지시에 따라 관련 소스·기록·HTML·ZIP과 보존 태그를 commit·push한다. GitHub Pages 실제 반영 완료는 별도 확인하지 않았다.

## 2026-11-06 / v16 / Ablation 일곱 근거의 상세화

- 요청: Table2(a)·Table2(b)·Fig.19·Table3·Fig.20·Fig.21·Table4를 모두 자세히 설명하고, 저자의 중간층 해석처럼 직관을 주는 설명을 본문에 포함할 것. 페이지 수를 제한하지 않는다.
- 대조: 원문 Sec.6.5 PDF pp.24–26, App.C p.43, App.F p.47, 기존 S097–S107 및 질문노트의6.5 검토 기록을 읽었다. 원문 Fig.19/20/21 PNG도 직접 확인했다.
- 구성: P026 지도 → P060 층 선택 → P061 VQA 효과 → P062 attention → P063/P064 합성 규모 설정/결과 → P065 전구 작업 → P070 지표 → P066 확대 그래프 → P067 RECAP 수치·해석 → P027 지연 측정 → P068 최적화 결과 → P069 효과 해석. 기존2장을13장으로 나눠 전체63장이다.48–60페이지가 Ablation이다.
- 본문 해석: 초기층 의미 정보/후기층 시각 정렬/중간층 균형은 저자의 해석으로 표시한다. 손·물체 위치와 목표 이해, 문제집 다양성, 반복 상호작용의 효율, 실행 준비/중간 메모리 비용은 우리의 직관으로 구별한다. 실제 prompt나 새 인과 실험으로 제시하지 않는다.
- 수치·범위: Table2(a)51.1/60.9/56.3, VQA57.5→60.9(+3.4%p), 합성41.0/45.6/46.6/50.1(+9.1%p), BC1056±326/12.7±3.0→RECAP3 353±22/4.1±0.3, Table4 두 variant의 모든 행을 원문과 대조했다. 합성 pool과sampling1:1, frames/attempts와성공률, 누적1.63배와kernel추가1.12배, policy p50과전체제어지연을 구별한다.
- 보존: `rldx-v15-before-detailed-ablation-20261106`(c22968a)의121개 상세 단위를 추출해 비교했다. 바깥 공백을 제외한 내용이 동일하고 각각 정확히 한 번 연결된다. S097/S107은 P026, S098–S106은 각각 해당 상세 본문 장으로 재배치했다.
- 소스/화면: `python3 scripts/build_deck.py`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs` 통과.63장 PNG에서 넘침·이미지 실패·브라우저 오류·외부 요청0. 처음 발견한 P062/P063/P068 넘침은 행 설명의 구성 변경·문장 재배치·중복 소제목 정리로 해결했다. 글꼴 크기는 유지했다.
- 실제 시각 확인: v16의 P026, P060–P070 중 Ablation13개 PNG를 직접 확인했다. Fig.21은 지표를 P070으로 나누고 P066에서 큰 원문 그래프를 보여 주도록 했다. 본문 수식·각주·표·해석 상자의 경계를 확인했다.
- 탐색: `node scripts/verify_navigation.mjs` 통과. 일곱 분석 항목을 순서대로 탐색해 Conclusion으로 이어지는지 확인했고 번호 입력·역순·기존 별칭·Fig.3 경계도 유지했다.
- 수식/글꼴: `node scripts/verify_math_font.mjs` 통과. Arial/한글 fallback·내장 Nanum·KaTeX·전체 N 해설 수식 너비를 확인했다. P069의 두 비율 수식도 본문 DOM과 실제 PNG에서 확인했다.
- 빌드: 기본 `pnpm build`와 `pnpm build --base /rldx-1-seminar/` 통과. `node scripts/verify_slidev.mjs`에서63장·브라우저 오류0·실패0을 확인했다.
- 게시 산출물: `python3 scripts/package_pages.py`, `node scripts/verify_pages.mjs` 통과. repository 경로·랜딩·표지·Fig.3·해설 및 외부 요청0을 확인했다. presentation/index/게시 index 동일성과 `git diff --check` 통과.
- 사용자 결과물 승인 전이다. 수정 후 자동 게시 지시에 따라 관련 소스·기록·HTML·ZIP 및 변경 전 태그를 commit·push한다. GitHub Pages 실제 반영 완료는 별도 확인 전이다.

## 2026-11-06 / v15 / Vision·VLM·Memory 본문 설명

- 요청: VQA가 발표에 들어 있는지 확인하고 기존4페이지 Fig.3과5페이지 MSAT 사이에 Vision Encoder·Motion Module·VLM·Memory Module 설명을 추가할 것.
- 대조 근거: 원문 Sec.2.1 PDF pp.6–7, Sec.2.2 p.8, 실제 frame offset·STSS 추가·memory 설정 p.13, 중간층/VQA 검증 Table2 p.25, 기존 S008–S019 및 질문노트 Q4/Q5. VQA는 기존 S008 N 해설에 있었지만 별도 발표 본문 설명이 부족했음을 확인했다.
- 구성: 새 P048–P059를5–16페이지에 삽입했다. Vision Encoder/4시점 관측 → STSS → residual 수식 → VLM·로봇 VQA3범주 → cognition tokens → 중간층 출력 선택 수식 → causal 시간 처리 → 과거 평균 압축 → Memory 구조 → Memory 계산/입력256개 벡터 → 저장 간격·미해결 → context/cognition/memory 구별. 기존 MSAT는17페이지부터 이어진다.
- 사실/해설 구별: VQA 예시 질문은 실제 prompt 인용으로 표시하지 않는다. 중간층과 cognition 위치 선택 식은 해설용 표기로 표시한다. Memory 입력의 과거192+현재64=256은 계산한 입력 벡터 수이며 m_t 출력 token 수로 확대하지 않는다. H/H+1 차이와 cache 갱신·초기화 미명세는 유지한다.
- 보존: 변경 전 태그 `rldx-v14-before-vlm-memory-explanation-20261106`와121개 상세 단위를 추출 비교해 바깥 공백을 제외한 전체 내용이 동일함을 확인했다.11개 단위는 새 본문 장으로 옮기고 S016은 기존 P005→P032 링크 호환을 위해 P032 해설에 유지했다. 새 본문을 추가해52장이 됐으며 기존 ID를 재사용하지 않았다.
- 원문 그림: Fig.3의 Vision/Memory 영역을 CSS로 보여 준다. 원본 PNG는 변경하지 않았고 원문의 연결 기호를 유지한다. 최초 crop에 걸친 다른 모듈의 글자를 확인해 범위를 조정한 뒤 다시 실제 PNG를 확인했다.
- 소스/화면: `python3 scripts/build_deck.py`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs` 통과.52개 기본 PNG에서 넘침·이미지 실패·브라우저 오류·외부 요청0. P048–P059 실제 PNG12장을 직접 확인했으며 글자 크기를 줄이지 않았다.
- 조작: `node scripts/verify_navigation.mjs`와 `node scripts/verify_architecture.mjs` 통과.5페이지 번호 입력은 새 Vision Encoder로 이동한다. Fig.3 마지막 단계 다음은 P048이며 역방향은 Fig.3 마지막 단계로 복귀한다. 새12장→MSAT 순서,27개 내부 상태·4모듈·18화살표, 기존 별칭·이동된 해설·번호 입력·대화상자·전체화면을 확인했다.
- 수식/글꼴: `node scripts/verify_math_font.mjs` 통과. Arial 영문/한글 대체 글꼴·내장 Nanum·KaTeX·전체 상세 해설의 수식 너비를 확인했다. 새 본문 수식도52장 기본 화면의 DOM 경계와 실제 PNG에서 확인했다.
- 빌드: 기본 `pnpm build`와 `pnpm build --base /rldx-1-seminar/` 통과. `node scripts/verify_slidev.mjs`에서52장·브라우저 오류0·실패0.
- 게시: `python3 scripts/package_pages.py`, `node scripts/verify_pages.mjs` 통과. repository 하위 경로·랜딩·표지·Fig.3·해설을 확인했고 외부 요청0. presentation/index/게시 index 동일성 및 `git diff --check` 통과.
- 수정·검증 후 자동 게시 지시에 따라 관련 파일과 보존 태그를 commit·push한다. 사용자 결과물 승인 및 GitHub Pages 실제 배포 완료는 별도 확인 전이다.

## 2026-11-06 / v14 / 합성 영상과 rollout 비교

- 요청: P015에서 rollout 영상의 생성 과정과 원래 합성 영상과의 비교가 보이지 않아 어렵다는 피드백. 실제 원문 Sec.3.3 PDF pp.10–12 및 App.B.3 p.42와 질문노트 Q2를 대조했다.
- 수정: P015는 A 합성 영상 → IDM → 추정 행동 → Simulator → B rollout 영상, A·B 영상 특징 비교, 일치 여부에 따른 선별로 그렸다. IDM의 출력은 로봇 제어값이고 rollout은 실행 결과 영상이라는 차이를 명시했다.
- 설명 분리: P045는 영상 자체 품질, P015는 전체 비교 흐름, P046은 고정 V-JEPA2와 attentive probe, P047은 실제 시연/GT 행동을 이용한 positive 및 시간·episode가 어긋난 negative 학습이다. 검사기를 학습하는 쌍과 합성 데이터에 적용하는 쌍을 구별한다.40장은 한도가 아니다.
- 보존: 변경 전 태그 `rldx-v13-before-rollout-explanation-20261106`의121개 상세 단위를 정규식으로 추출해 비교했다. 바깥 공백을 제외한 제목·본문 전체가 동일하고 각각 정확히 한 번 연결된다. 기존 장 ID와 Fig.3 내부 상태는 유지했다.
- 실행: `python3 scripts/build_deck.py`, `python3 scripts/verify_sources.py`, `node scripts/verify_deck.mjs` 통과.40개 기본 화면에서 넘침·이미지 실패·브라우저 오류·외부 요청0. 최초 P046의 literal 강조 표시는 HTML strong으로 고쳐 재검증했다.
- 실제 PNG 확인: `review/previews/deck-v14/P045-v14.png`, `P015-v14.png`, `P046-v14.png`, `P047-v14.png`. P015 비교 분기·rollout 카드·결과 상자와 글자 배치를 직접 확인했다. 글꼴 크기를 줄이지 않았다.
- 탐색: `node scripts/verify_navigation.mjs` 통과. 새 검사4장→학습 단계 순서, 이동한 S053 해설 검색, 번호 입력·첫 내부 상태·방향키·역순·대화상자·기존 별칭 링크를 확인했다.
- 수식·글꼴: `node scripts/verify_math_font.mjs` 통과. Arial 영문/한글 대체 글꼴, 내장 Nanum, KaTeX 및 전체 상세 해설 수식 너비를 확인했다.
- 빌드: 기본 `pnpm build`와 `pnpm build --base /rldx-1-seminar/` 통과. `node scripts/verify_slidev.mjs`에서40장·오류0·실패0.
- 게시 산출물: `python3 scripts/package_pages.py`, `node scripts/verify_pages.mjs` 통과. repository 하위 경로·랜딩 링크·표지·Fig.3·해설 및 외부 요청0을 확인했다. presentation/index/게시 index 동일성과 `git diff --check`도 통과했다.
- 사용자 결과물 검토 전이다. 수정 후 자동 게시 지시에 따라 관련 파일과 보존 태그를 commit·push한다. GitHub Pages 실제 배포 완료는 별도 확인하지 않았다.

- 먼저 입력칸 부재로 verify_navigation.mjs가 실패(0≠1)하는 것을 확인한 후 기능을 구현했다.
- verify_navigation.mjs:클릭후기존번호전체선택,5입력/Enter→5번째P006,4→P032첫단계,진행후같은4재입력→첫단계,1/마지막장,빈값/0/초과/소수거부,Esc입력취소시단계보존,800px폭툴바경계 통과.
- 기존 PPT키·빈화면클릭·그림확대·검색/G/N·전체화면·정역순·퇴역링크도 같은실제브라우저검사에서 통과했다.
- verify_sources.py:9개MD·121개상세·25장·27상태/18화살표 대응 통과.
- verify_deck.mjs:25장PNG의넘침/이미지실패/오류/외부요청0.
- verify_architecture.mjs:27상태·4모듈·주석경계·정역순·애니메이션/reduced-motion 통과.
- verify_math_font.mjs:Nanum 실제글리프·KaTeX·상세 수식 너비 통과.
- pnpm build 및 pnpm build --base /rldx-1-seminar/:종료0. qa/full-deck/build-v09.log·base-build-v09.log.
- package_pages.py·verify_pages.mjs:게시패키지·실제저장소하위경로·그림/해설·오류0. 발표HTML과두게시HTML바이트동일.
- 실제전체화면과툴바PNG를직접확인했다: review/previews/navigation-v09/P032-page-jump.png·page-number-toolbar.png.

본문25장/121개상세와자간0을유지한다. Pages의실제배포완료와원격push완료는구분해보고한다.

---

# v08 자간0·전체 화면 검증 — 2026-11-05

- verify_sources.py:9개MD·121개단위·25장·27상태/18화살표 통과.
- verify_deck.mjs:25장PNG,넘침/이미지실패/브라우저오류/외부요청0. G/N·검색·그림확대 유지.
- verify_architecture.mjs:27상태·4모듈·18화살표·정역순·주석 경계/겹침·축소동작 통과.
- verify_math_font.mjs:Nanum Gothic 실제글리프·KaTeX분수/norm·상세 수식 너비 통과.
- 별도DOM검사:25개제목 모두 한 줄·텍스트 경계 내 포함, 제목/소제목 추가자간0, 표지·그림·바닥글 간 여유 확인. qa/full-deck/typography-v08-report.json.
- pnpm build와 pnpm build --base /rldx-1-seminar/:종료0. build-v08.log·base-build-v08.log.
- verify_slidev.mjs:base URL의25장 제목·크기·이미지·오류0 확인.
- package_pages.py·verify_pages.mjs:최종HTML/ZIP,실제저장소하위경로·그림·해설·오류0 확인.
- 실제25장전체지도·표지·P006/P008/P010및제목전후비교를 직접 확인했다. 깨진 배치가 없어 문구·글꼴 크기·수식·그림 크기를 추가 변경하지 않았다.

PNG:review/previews/deck-v08/overview-v08.png 및 typography-v08/title-spacing-before-after.png. 25장과121개 상세를 유지한다. 실제게시완료는 push 결과와 구분한다.

---

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

## 2026-11-05 / P008 / 갱신식 한 줄 합치기

- 사용자 요청: 두 줄로 나뉜 action chunk 갱신식을 합칠 것.
- 반영: a^{τ_{i+1}}=a^{τ_i}+Δτ_i u_θ(...)를 한 줄로 표시했다. Δτ_i의 정의는 위 행에 유지한다. 수식 내용·글꼴 크기는 유지한다.
- 검증:25장PNG 넘침/이미지/브라우저오류0,소스매핑·KaTeX생성·기본/base빌드 통과. 실제P008 PNG를 직접 확인했다. 최신 자동게시 지시에 따라 commit/push한다.

## 2026-11-05 / P008 / 숫자 예시 대신 수식 항 설명

- 사용자 요청: 숫자 예시를 빼고 수식에 대한 설명을 넣을 것.
- 반영: 현재 action chunk, 신경망이 예측한 변화율, denoising 간격을 곱한 갱신량, 갱신 후 chunk를 기호별 표로 설명했다. 직전 한 줄 갱신식은 유지했다.
- 이전 0/4/0.25 숫자 예시는 N 해설에 보존했다. 상세121개 단위 내용은 변경하지 않았다.
- 검증:25장 PNG 넘침/이미지실패/오류/외부요청0,소스매핑·KaTeX생성·기본/base빌드 통과. 게시용3HTML동일성 확인. 실제PNG: review/previews/deck-v07/P008-terms-v07.png.
- 사용자 자동게시 지시에 따라 commit/push한다.

## 2026-11-05 / P008 / 미래 센서 수식 중앙 정렬

- 사용자 지적: 오른쪽 미래 센서 식이 상자 우측에 밀착되어 있음.
- 원인: aligned의 긴 둘째 줄 설명에 맞춰 첫 줄 등호가 정렬되며 식이 오른쪽으로 밀렸다.
- 수정: 해당 블록만 gathered로 바꿔 각 줄을 독립적으로 중앙 정렬했다. 수식 내용·글꼴 크기·직전 왼쪽 설명 표는 유지했다.
- 검증: 실제25장PNG 넘침/이미지/브라우저오류/외부요청0,소스·KaTeX생성·기본/base빌드 통과. 실제P008 PNG에서 양쪽 여백 확인. 세HTML동일성 확인 후 자동commit/push.
- PNG: review/previews/deck-v07/P008-sensor-alignment-v07.png.

## 2026-11-06 / P006 conditioning inputs

- Verified PDF p.8 Sec.2.2: c_t=[h_t,m_t,s_t,p_t]; physical sensing is conditional on availability.
- Passed: python3 scripts/verify_sources.py; node scripts/verify_deck.mjs (25 slides, overflow/errors/external requests 0); node scripts/verify_math_font.mjs.
- Passed: pnpm build; pnpm build --base /rldx-1-seminar/; python3 scripts/package_pages.py; node scripts/verify_pages.mjs.
- Visually inspected review/previews/deck-v09/P006-conditions-v09.png. Final source adjustment corrected initial overflow; no font-size reduction.
- git diff --check and equality of presentation.html, index.html, and deployment presentation passed. Main content edit only; navigation/tour logic unchanged.

## 2026-11-06 / P006 / 정답 변화율 v*의 근거

- 사용자 요청: v*를 정답 변화율로 명시하고 왜 학습 target인지 설명할 것.
- 반영: 미분식의 v* 옆에 ‘정답 변화율’을 직접 표시했다. 도입문은 노이즈 ε에서 정답 a로 잇는 직선 경로를 미분한 값 a−ε를 학습 target으로 삼는다고 설명한다.
- 근거: Sec.2.2 PDF p.8 Eq.(1)의 target a−ε와 정의된 보간 경로의 미분. 개별 학습 쌍의 target이며, 모든 입력에서 학습된 vector field가 상수라는 의미는 아니다.
- 검증: 소스 매핑·25장 PNG·수식/실제글꼴·기본/base빌드·로컬Pages 검증 통과. 화면 넘침/이미지실패/브라우저오류/외부요청0. P006 PNG 직접 확인.
- PNG: review/previews/deck-v09/P006-target-velocity-v09.png. 25장·121개 상세 기록·직전 c_t 설명 유지. 사용자 검토 전이며 자동게시 지시에 따라 commit·push한다.

## 2026-11-06 / v10 / Arial·한글 고딕 전환

- 사용자 요청: Arial 스타일로 바꿔 전체 화면의 겹침·잘림·이상 여부를 확인하고, 문제가 없으면 적용할 것.
- 결정: Arial에는 한글이 없어 영문은 Arial, 한글은 Apple SD Gothic Neo → Malgun Gothic → 내장 Nanum Gothic 순서로 표시한다. 수식은 KaTeX를 유지한다. 시스템 글꼴은 복사·배포하지 않으며 기존 나눔고딕 3종은 최종 대체용으로 보존한다.
- 실제 Mac Chrome 렌더링: 영문 ArialMT, 한글 AppleSDGothicNeo-Regular 확인. Windows의 실제 맑은 고딕 렌더링은 이번 환경에서 확인하지 못했으며 OS별 모양 차이는 가능하다.
- CSS 제목·본문·표지·버튼·Fig.3 주석·해설·한글 수식 주석에 같은 우선순위를 적용했다. 글자 크기·자간0·콘텐츠·25장·121개 상세 단위는 유지했다.
- 검증: verify_sources.py; verify_deck.mjs(25장, 넘침/이미지실패/브라우저오류/외부요청0); verify_architecture.mjs(27상태·4모듈·18화살표·겹침/경계); verify_navigation.mjs; verify_math_font.mjs(실제 Arial/한글 fallback, 내장 fallback 3종, 전체 해설 수식).
- 추가 배치 검사: 시스템 한글과 내장 Nanum 대체 모드 각각25장. 제목/본문/표/출처/해설 가로 넘침0, 제목 모두 한 줄. qa/full-deck/typography-v10-report.json.
- 기본/base 빌드 및 Slidev25장 오류0, 패키지 생성·로컬Pages 검증 통과. 세 발표 HTML 동일성·git diff --check 확인.
- 직접 확인: 실제25장 전체 지도, P006 글꼴 비교, MSAT 확대 PNG. review/previews/typography-v10/overview-v10.png, P006-before.png, P006-trial.png; review/previews/deck-v10/P006-v10.png; review/previews/architecture-v10/step-22.png.
- 결과물은 사용자 검토 전이다. 요청의 조건을 충족해 적용하고 최신 자동게시 지시에 따라 commit·push한다. Pages 배포 완료 여부는 별개다.

## 2026-11-06 / v11 / MSAT 순서 변경·데이터 설명 확장

- 사용자 요청: 기존7·8쪽의 MSAT 입력·Joint Attention을5·6쪽의 학습·추론 수식 앞으로 이동하고, 변경 전 버전을 Git에 보존할 것.9쪽에는 데이터 종류의 직관적 의미, 이어서 공개·자체 데이터 설명 장을 추가할 것.
- 보존: rldx-v10-before-order-data-20261106 태그가 변경 전 커밋5f5a574를 가리킨다. 확인·복구는 review/ROLLBACK.md. 기존 ID·해시 링크를 유지하고 새 장에 P033/P034를 부여했다.
- 순서: Fig.3 → P009 입력 → P010 Joint Attention → P006 학습 → P008 추론. 전환 문장과 발표 메모를 수정했다. Noisy chunk는 입력 장에서 개념을 소개하고 뒤의 수식으로 연결한다.
- P013(9쪽): 공개=다른 로봇이 이미 해본 경험, 자체=목표 로봇으로 직접 모은 경험, 합성=시연을 변형해 늘린 경험. 실제/합성의 원문 큰 범주와 공개/자체의 하위 구분을 명시했다. Fig.4는 합성 파이프라인으로 유지한다.
- P033(10쪽): 공개6개 데이터셋과 시연의 범위, trajectory·action prior의 직관적 설명. Sec.3.1 PDF p.9 및 Table5 p.41을 확인했다. 명칭·수치의 세부 근거는 N 해설에 보존한다.
- P034(11쪽): Franka의 촉각/관절 토크 측정, ALLEX의 부위별 원격 조작/전류 기반 토크 추정을 구별한다. Sec.3.2 pp.9–10과 Fig.12(b)(c) p.19를 대조했다. Fig.12에서(b)(c)만 발췌한 파일과 원본 좌표를 기록했다.
- 보존 검증: 121개 상세 단위의 제목·내용은 태그 버전과 바이트 단위로 동일하다(바깥 공백 제외). S042만 P034로 옮겼으며, 나머지도 각각 정확히 한 번 연결된다. 전체27장, Fig.3은 기존27상태·18화살표다.
- 실제 검증: verify_sources.py; verify_deck.mjs(27장 PNG, 넘침/이미지실패/오류/외부요청0); verify_architecture.mjs; verify_navigation.mjs(새 순서와 추가 장 사이의 이동 포함); verify_math_font.mjs; 기본/base빌드; verify_slidev.mjs(27장 오류0); package_pages.py; verify_pages.mjs. 최종 소스 EOF 공백 정리 전후 HTML SHA256이 동일하다. git diff --check 및 세HTML동일성 확인.
- PNG: review/previews/deck-v11/P013-v11.png, P033-v11.png, P034-v11.png. 세 장을 직접 확인했다. 변경 요청과 개별 결과물 승인은 구분하며 사용자 검토 전이다. 최신 지시에 따라 main과 보존 태그를 push한다. Pages 반영 완료는 별도 확인하지 않았다.

## 2026-11-06 / v12 / 학습 목적·Fig.6/8·Graph/Fusion 설명 복원

- 사용자 피드백6건: 단계별 학습 목적과 IL/RL의 적용 맥락을 먼저 설명하고, Pre의 Fig.6 분포·episode 수, Mid의 필요성, RECAP 절차·Fig.8을 보강할 것. 추론은 공부했던 고정 설정의 사전 준비와 합성함수/중간 메모리 왕복 직관으로 설명할 것.
- 확인한 근거: 기존 학습/추론 MD(S056–081, S036), 중앙 질문노트 Q3·Q10·Q11, 원문 PDF pp.12–16·43. 앞선 채팅의5절 설명 기록도 대조했다. 원문 사실과 역할 비유·함수 약자는 각 장의 출처/메모에서 구분한다.
- P035 학습 단계: Pre=범용 기본기, Mid=목표 로봇 특화+새 기능, Post=작업별 IL 및 필요한 고난도 작업의 RL 보완. 원문에 없는 자동 전환 상태·성공률 임계값은 만들지 않는다.
- P016: Fig.6의8개 데이터별episode와sampling비중을 옮겼다. OXE870K/25%, DROID92K/25%, Galaxea114K/10%, AgiBotG239K/10%, AgiBotH36K/5%, ActionNet30K/10%, Everyday9K/5%, Synthetic150K/10%. Pool약1.5M과sampling100%를 구분한다.
- P036: 기존 projection·공통256trajectories 설명을 보존하는 별도 장이다. P017은 왜 로봇/센서 적응이 필요한지와 세 기능·혼합 비율·2K alignment 순서를 설명한다. Memory간격/범위·dropout/near-zero 상세는 기존 S060–064에 남긴다.
- P018: 작업별IL→배치→실패 조건의 추가 시연이 기본이며 고차원 제어·정밀 접촉과 시연 수집 부담 때문에 선택적 RECAP을 보완한다. ALLEX 전구 RL 사례는 Sec.6.5에 연결한다.
- P019: policy/critic의 별도 역할, value→advantage labels, rollout 누적·성공 subset critic 학습·전체 relabel·policy 갱신을 설명한다. P037은 Fig.8의축/색/(a)첫성공/(b)실패·재시도·회복을 해석한다. value를 성공률로 바꾸거나 미기재 advantage 식을 추가하지 않는다.
- P020: 토큰/위치/허용관계 같은 설정 의존성→고정 배포의 반복 준비값→사전 계산/재사용→분할 해소/한CUDA Graph 캡처의 인과 설명을 복원했다. 이 준비와 입력마다 바뀌는 Q/K 계산은 상세 해설에서 구분한다.
- P038/P039: Fig.10의 별도kernel 저장·재읽기와 한fused kernel의on-chip연속계산을 비교한다. N=RMSNorm,R=RoPE로 단계식과 Attn(R(N(q)),R(N(k)),v) 합성함수식을 나란히 설명한다. 하나의kernel이 하나의단순산술식이나 모델전체의1회메모리접근이라는 뜻으로 확대하지 않는다.
- 보존: 기본32장으로5장 추가. 상세121개 내용은 변경 전 태그 rldx-v11-before-training-inference-20261106(eba946c)와 동일하다(바깥 공백 제외). 소유 장만 재배치했다. P011→P036, P021→P038로 기존 링크의 의미와 검색/N 해설을 유지했다.
- 검증: verify_sources.py; verify_deck.mjs(32PNG, 넘침/이미지실패/오류/외부요청0); verify_architecture.mjs(27상태); verify_navigation.mjs(새학습/추론순서·기존/퇴역링크·페이지입력); verify_math_font.mjs(실제Arial/한글fallback·모든해설수식); 기본/base빌드; verify_slidev.mjs(32장); package_pages.py; verify_pages.mjs. 세HTML동일성·git diff --check 확인.
- PNG: review/previews/deck-v12/P035-v12.png, P016-v12.png, P036-v12.png, P017-v12.png, P018-v12.png, P019-v12.png, P037-v12.png, P020-v12.png, P038-v12.png, P039-v12.png를 직접 확인했다. 최초 배치의 넘침은 문장/배치를 고쳐 해결했고 글꼴 크기를 줄이지 않았다.
- 사용자 결과물 검토 전이다. 최신 자동게시 지시에 따라 변경과보존태그를commit·push한다. 실제Pages배포완료는 별도 확인하지 않았다.

## 2026-11-06 / v13 / 벤치마크·로봇·과제 사진을 먼저 설명

- 사용자 요청: 기존 실험 결과 장에서 LIBERO 평균과 Basic/Directional PnP 등 과제명 의미 및 로봇의 정체를 설명하고 Fig.11·12·13·15·17을 본문에 넣을 것. P023의 갑작스러운 ‘저자 해석’ 문장을 쉽게 풀고, P024의 ‘잡는다.’ 뒤 ‘기억’ 앞을 줄바꿈할 것.
- 추가 지시: “페이지 수 일단은 신경쓰지말고!!” 페이지 수를 제한하지 않으며, 사진과 개념·과제 설명을 결과보다 먼저 제시하는 데 필요한 장을 둔다.
- 근거: 원문 PDF pp.17–24와 App.G.1–G.4 pp.48–52, 기존 평가 공부 MD S082–S096 및 질문노트를 대조했다. 벤치마크를 평가 세트, 개별 동작을 과제로 구분한다.
- 흐름: P040 Fig.11 시뮬레이션 벤치마크 → P022 결과·LIBERO 평균 → P041 Fig.12 실제 로봇 → P042 Fig.13 OpenArm 과제 → P023 결과 → P043 Fig.15 ALLEX 과제 → P024 결과 → P044 Fig.17 Franka 과제 → P025 결과. 소개 장5개를 추가했으며 현재37장이다. 이 수를 한도로 삼지 않는다.
- LIBERO:4suite(Spatial/Object/Goal/Long),40task의 평균 성공률을 설명한다. Short는앞3suite,Avg는Long을포함한다. 결과 표의 최강baseline과RC365전체/미지복합을구분하고 기존조건·한계는N해설에유지한다.
- 로봇: OpenArm28DoF양팔/Inspire손, ALLEX48DoF상반신/양팔·손·토크, Franka단일팔그리퍼/torque·AnySkin을Fig.12와연결했다. 원문의Franka그림내자유도표기와G.4팔사양은N메모에서구분한다.
- OpenArm: Basic=인형→오른쪽상자, Directional=선반4칸/식기대3칸의지시위치, UnseenObject=새instance, UnseenTask=새물체·놓기조합, Grounding=같은종류중지시한instance를골라잡기로설명한다. Grounding의성공은정확한대상을잡는것,나머지는지정위치에놓는것이다. 과적합·원인통제문장을본문에서빼고기존S089에보존했다.
- ALLEX: Fig.15의움직이는상자/숨긴상자/카드/공따르기동작을설명한뒤Fig.16결과로이어진다. P024에명시적br을넣고성공률87.5/91.7과progress97.2/70.8,혼합평균86.8의의미를구분한다.
- Franka: Fig.17의Spin/Pong, CupSwapping/Shell, Plug/Egg를기능별로설명한다. Cup은머신의컵을치운후원래받침의다른컵으로교체하는순서다. Fig.18결과에서는어떤과제에실패가남는지읽고관련모듈만활성화한평가조건도유지한다.
- 보존: 기존 상세121개내용은변경전태그 rldx-v12-before-evaluation-context-20261106(757822d)와동일하다(바깥공백제외). 소유장만재배치했고기존ID·퇴역링크·32장구간의탐색규칙을보존했다. Arial/한글fallback·자간0·글자크기는유지한다.
- 실제검증: verify_sources.py; verify_deck.mjs(37PNG,넘침/이미지실패/브라우저오류/외부요청0); verify_architecture.mjs(27상태); verify_navigation.mjs(사진소개→결과순서포함); verify_math_font.mjs(실제글리프·전체해설수식); 기본/base빌드; verify_slidev.mjs(37장오류0); package_pages.py; verify_pages.mjs. 소스공백정리전후HTML SHA256동일,세HTML동일성·git diff --check확인.
- 실제PNG: review/previews/deck-v13/P040-v13.png, P022-v13.png, P041-v13.png, P042-v13.png, P023-v13.png, P043-v13.png, P024-v13.png, P044-v13.png, P025-v13.png를직접확인했다. ALLEX의초기넘침은중복평균문장을하단요점으로옮겨해결했고글꼴크기는줄이지않았다.
- 사용자결과물검토전이다. 최신자동게시지시에따라본문·기록·생성HTML/ZIP과변경전태그를commit·push한다. Pages실제반영완료는별도확인하지않았다.
