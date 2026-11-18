# 섹션 Markdown 편집 안내

## 현재 구성 — v42 / 2026-11-18

전체45장 / Part1 21장 / Part2 24장. 사용자의20분 Part2 요청에 따라6·7쪽은 대본 중심의2상태씩 재작성했다. 그 외 앞1–8쪽·Part1·마지막 의견은 내용 유지. 실험은 기존 모델과 RLDX-1 비교 중심으로 과제/결과를 합치고, ablation은 중간층·VQA·합성·RL·실행 최적화의 효과와 직관을 중심으로 설명한다.9개 독립 소개·설정 장은 결과 장/제목 장에 상세 기록을 보존해 통합. 분량 배분은 review/PART2_20_MIN_RUN.md. 아래 버전 문구는 이력이다.


## 현재 구성 — v41 / 2026-11-18

전체54장 / Part1 21장 / Part2 33장. P020 CUDA Graph는 설정 의존성→고정 배포·사전 계산→Figure9 분할 graph→한 graph의4단계, P038 Kernel Fusion은 Figure10의 저장·재읽기→on-chip 재사용2단계다. 방향키와 화면 버튼이 그림 강조·화살표·대본 순서에 맞춰 움직인다. 독립 수식 장P039는 제외하고 S080 원본을P038에 보존했으며 이전 링크도P038로 연결한다. 아래 버전 표기는 이력이다.


## 현재 구성 — v40 / 2026-11-18

Part1의 P031 Overview는 발표에서 제외하고4개 상세 단위를 P032에 보존했다. 각 큰 섹션 앞에 P104–P111 제목 전용8장을 추가했다. 현재 전체55장 / Part1 21장 / Part2 34장이다. Part2는 시작→Figure2 요약6상태→데이터·학습 요약→Inference Strategy 제목(P108)→CUDA(P020) 순서다. 아래 v39 이하 설명은 변경 이력이며, 현재 목차는 manifest와 SLIDE_INDEX.md를 따른다.


현재 Figure2 요약은 P101 안에서 전체→Motion→VLM→Memory→MSAT→전체 정리6단계로 확대·강조하며 진행한다. 대제목은 Part1 한눈에 보기로 유지한다. 현재 순서는 P099 Part2 시작→P101 구조→P102 데이터→P103 학습→P020 CUDA다. 기존 P032의35단계와121개 원본 상세 단위는 유지.


최신 순서 정정: **Part 2 시작(P099) → Part 1 한눈에 보기 3장(P101/P102/P103) → CUDA Graph(P020)**. Part2 파일도 P099부터 시작한다. 앞선 “요약 뒤 divider” 기록은 사용자 지시를 잘못 해석한 당시 이력이다.


현재 v39: Part2 파일은 P099 Part2 시작→P101(Fig.2 구조)→P102(세 데이터)→P103(세 학습 단계)→P020 CUDA Graph로 이어진다. 요약 세 장의 대제목은 모두 “Part 1 한눈에 보기”다. 전체48장/Part1 18장/Part2 30장, P032 35단계·121개 상세 기록 유지. 아래 이전 단일 요약·장수는 이력이다.


현재 v38: 설명9·10의 VQA 필요성과 세 질문을 한 화면·한 대본으로 통합했다. P032는35단계·설명 카드8개이며 이후 단계 번호를 맞췄다. 전체46장/Part1 18장/Part2 28장과121개 원본 상세 기록은 그대로다. 이전 단계 수는 아래 이력이다.


## 현재 Part 2 구성 — v37 / 2026-11-18

전체46장 / Part 1 18장 / Part 2 28장. P099→P101 짧은 Part 1 요약→P020 추론→평가→분석→P028/P030 의견→P100 Q&A. 독립 Conclusion P029는 제외하고 상세 기록을 P101에 보존했다. P070/P067/P069는 각각 P065/P066/P068에 통합했다. 기존121개 공부 단위와 Part 1의 과학 내용·P032 36단계는 유지한다. 아래 과거 버전 표·장수는 이력이며 현재 순서는 content/deck-manifest.json 및 review/SLIDE_INDEX.md를 따른다. 사용자 결과물 검토 전.


원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

이 폴더의 아홉 Markdown 파일이 발표 본문과 상세 공부 기록의 **직접 편집 원본(canonical source)**이다. 기존 JSON은 대화에서 정리한 내용과 이전 구성을 보존하는 자료이며, 이후 내용 수정은 이 Markdown에서 한다. HTML과 slides.md는 원본이 아니라 생성 결과다.

## 현재 통합 구조 — v36

기존5–10쪽 P051/P009/P010/P006/P008/P071은 P032 Figure3의36단계 중9개 설명 카드로 통합했다. 별도 페이지는 없으며 원본 상세 기록은 P032에 그대로 보관한다. `### 그림 설명 카드`에서 화면과 대본을 편집한다. 전체45장, Part1 21장(P098 Q&A까지), Part2 24장(P099 시작–P100 Q&A)이다.

구분·질의응답4장(P097–P100)은 새 공부 단위를 만들지 않는다. S001 목차의 링크는 고정ID로 연결하며, Part exporter가 다른 Part 파일로의 링크를 조정한다.

## 읽는 순서

| 파일 | 섹션 | 수록 장 | 상세 단위 |
| --- | --- | ---: | ---: |
| [01-problems.md](01-problems.md) | Problems | 3 | 3 |
| [02-rldx-1-architecture.md](02-rldx-1-architecture.md) | RLDX-1 Architecture | 2 | 39 |
| [03-training-data.md](03-training-data.md) | Training Data | 6 | 15 |
| [04-training-procedure.md](04-training-procedure.md) | Training Procedure | 9 | 14 |
| [05-inference-strategy.md](05-inference-strategy.md) | Inference Strategy | 7 | 12 |
| [06-evaluation-and-analysis.md](06-evaluation-and-analysis.md) | Evaluation and Analysis | 7 | 17 |
| [07-ablation-and-analysis.md](07-ablation-and-analysis.md) | Ablation and Analysis | 6 | 16 |
| [08-conclusion.md](08-conclusion.md) | Conclusion | 0 | 0 |
| [09-my-opinions-and-limitation.md](09-my-opinions-and-limitation.md) | My opinions and limitation | 4 | 5 |

표지 S001을 제외한 본문44장과 상세 공부 기록121개를 포함한다(v42). source_ids 기준으로 S002–S122가 각각 정확히 한 번 연결된다. 장 ID는 위치가 바뀌어도 유지한다.

퇴역한 P033·P034·P036·P003·P004·P005·P007·P011·P012·P021·P045·P046·P048·P049·P050·P052·P053·P054·P055·P056·P057·P058·P059·P073·P074의 ID를 다른 의미로 재사용하지 않는다.

P015의 발표 메모에 IDM·영상 품질·움직임 일치 검사를 통합한다. S051/S052/S053도 P015에 연결하며 기존 내용을 보존한다. P047의 실제 시연/정답 행동을 이용한 판정기 학습 설명은 별도 본문이다.

P072의 발표 메모에는 기존 P072/P073의 영상 생성 모델 이름·데이터·학습 설정 전체를 보존한다. 본문은 시연→모델 학습→합성 영상의 핵심 흐름 한 장이다.

P032의 `### 발표 메모`에는 Vision Encoder 확대/네 화살표에 맞춘 대본을 둔다. 기존5–7쪽은 이 대본에 통합했고, S011–S013 상세 기록도 P032에 연결했다. 이어 VLM의 네 화살표에 맞춘 cognition·중간층 출력·시간 정보·과거 압축 대본도 둔다. 기존 P052–P055의 S009/S010/S014/S015를 P032로 연결했다. HTML에서는4쪽에서 N 또는 설명 버튼으로 읽는다.

Memory의 구조·계산·시간 범위 대본과 S017/S019/S018도 P032에 연결했다. P059의 별도 비교 요약은 대본에 추가하지 않는다.

## 편집 순서

1. 해당 섹션의 `## [P...] 제목`을 찾고, `한 문장 → 본문 → 보충 → 요점`의 발표 흐름을 다듬는다.
2. `출처`와 `발표 메모`를 확인한다. 원문·저자 해석·우리 해석·설명용 예시·미해결의 경계를 유지한다.
3. `상세 공부 기록`의 연결된 `#### [S...]` 단위를 수정해 수식 풀이·예시·조건·미해결 질문을 보존한다. 본문을 줄여도 상세를 자동 삭제하지 않는다.
4. 메타데이터의 layout·kind·source_ids와 그림 이름·caption을 확인한다. 새 장이나 재배치는 전체 순서와 상세 매핑을 함께 검토한다.
5. Markdown을 입력으로 HTML을 생성하고, 실제 화면에서 그림·수식·표·상세 해설과 넘침을 확인한다. 생성 HTML만 고치지 않는다.

## 문서 구조

각 파일의 첫 `#`는 섹션명, `## [P...]`는 본문 장이다. `slide-meta` 주석에는 layout·kind·source_ids와 선택적인 figure·caption이 있다. 한 장 안의 예약된 `###` 제목은 `한 문장`, `본문`, `보충`, `요점`, `출처`, `발표 메모`, `상세 공부 기록`이다. P032에는 `확대 단계`, `화살표 설명`, `그림 위 표시`도 사용한다.

본문의 작은 소제목은 `####`, 상세 단위 안의 필드는 `#####`, 그 안의 작은 소제목은 `######`를 사용한다. 상세 단위의 `study-meta`는 원래 layout·kind와 그림 정보를 보존한다. 그림은 메타데이터의 figure·caption으로 렌더링하므로 같은 그림을 본문에 중복 삽입할 필요는 없다.

일반 문단·강조·목록·표는 Markdown으로 편집한다. 수식은 인라인 `$...$`, 별도 줄의 `$$...$$` LaTeX 문법으로 쓴다. 흐름도·토큰·단계·callout의 raw HTML 안에서도 인라인 수식을 사용할 수 있다. raw HTML의 레이아웃 구조와 빈 줄은 불필요하게 바꾸지 않는다.

## Figure 3 확대·화살표 문구

Architecture의 P032에서 `### 확대 단계` 아래 `[0]`–`[26]`의 제목·핵심·설명·요점을 편집한다. `### 화살표 설명` 아래 `[vision-1]`–`[vision-4]`, `[vlm-1]`–`[vlm-4]`, `[memory-1]`–`[memory-4]`, `[msat-1]`–`[msat-6]`의 제목·설명을 편집한다. `### 그림 위 표시`에서는 세 종류 입력 토큰과 Qₜ/hₜ/mₜ, concat, P/C/A의 그림 위 이름을 편집한다. 이 문구도 Markdown 원본에서 화면으로 반영하는 대상이다.

카메라 box·필요한 그림 부분의 crop/clip·화살표 좌표·scene·step·한 화면에 보일 annotation_ids 등 위치 설정은 `content/architecture-tour.json`에 분리해 유지한다. 문구를 고칠 때 좌표를 바꿀 필요는 없다. 단계 ID를 바꾸거나 늘릴 때는 설정과의 대응도 확인한다.

## 최초 마이그레이션과 재실행 주의

`scripts/migrate_sections.py`는 기존 JSON을 읽어 이 폴더를 처음 만드는 **일회성 마이그레이터**다. 평소 빌드나 편집에 다시 실행하지 않는다. 기존 파일이 있으면 기본 동작은 덮어쓰기를 거부한다.

`--force`는 Markdown을 JSON 내용으로 덮어쓴다. 따라서 이후의 MD 편집을 잃을 수 있다. 수정 내용을 보존·검토한 뒤 마이그레이션 자체를 다시 할 때만 명시적으로 사용한다. 이 스크립트는 JSON·공유 builder·CSS·생성 HTML을 수정하지 않는다.

## 수식과 글꼴 — v03

수식 원본은 HTML의 sub/sup 조합 대신 LaTeX로 편집한다. 아래 블록을 그대로 MD에 넣으면 된다.

```tex
$$
\mathcal{L}=\left\lVert
\mathbf{u}_\theta(\mathbf{a}^{\tau},\tau,\mathbf{c}_t)
-(\mathbf{a}-\boldsymbol{\epsilon})
\right\rVert_2^2
$$
```

문장 안에서는 `$\tau$`, `$\mathbf{a}_{t:t+H}$`처럼 쓴다. KaTeX가 빌드할 때 분수·첨자·벡터·노름으로 렌더링하며, 코드 블록은 수식으로 변환하지 않는다. LaTeX 오류는 생성 단계에서 알려 준다. 한국어 조사와 붙은 수식을 굵게 강조할 때 Markdown 구분자가 그대로 나오면 `<strong>$...$</strong>`를 사용한다.

제목·본문·해설은 Arial을 우선한다. Arial에 없는 한글은 Apple SD Gothic Neo → Malgun Gothic → 내장 Nanum Gothic 순서로 표시한다. Arial·Apple·Microsoft 글꼴은 OS 설치본을 사용하므로 환경에 따라 한글 모양은 달라질 수 있다. 수학 기호는 KaTeX를 유지한다. 내장 나눔고딕 3종과 KaTeX는 단일 HTML에 포함되며 외부 CDN은 필요 없다. 원본·라이선스는 public/fonts/nanum-gothic/, public/fonts/katex/에 있고 font_assets.py는 원본 Nanum TTF를 수정하지 않는다.

P036 입출력 경로 본문은 제외하고4쪽 P032의 MSAT 마지막 대본에 통합했다. S036/S058은 P032에 보존하며 P036·P011 기존 링크는 MSAT 확대로 연결한다.

부록 실험·설정19장(P075–P077, P079–P094)을 본문에서 제외했다. 상세121개는 보존하며 제외 장의 원본/기존 링크 대응은 review/versions/before-appendix-removal-v26/에 기록한다.

P078 실제 Fused Kernels 페이지는 제외했다. 기존 링크는 P038 Kernel Fusion으로 연결하며 원본은 review/versions/before-kernel-table-removal-v27/P078.md에 보존한다.
