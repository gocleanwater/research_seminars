# 섹션 Markdown 편집 안내

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

이 폴더의 아홉 Markdown 파일이 발표 본문과 상세 공부 기록의 **직접 편집 원본(canonical source)**이다. 기존 JSON은 대화에서 정리한 내용과 이전 구성을 보존하는 자료이며, 이후 내용 수정은 이 Markdown에서 한다. HTML과 slides.md는 원본이 아니라 생성 결과다.

## 읽는 순서

| 파일 | 섹션 | 본문 장 | 상세 단위 |
| --- | --- | ---: | ---: |
| [01-problems.md](01-problems.md) | Problems | 1 | 3 |
| [02-rldx-1-architecture.md](02-rldx-1-architecture.md) | RLDX-1 Architecture | 10 | 37 |
| [03-training-data.md](03-training-data.md) | Training Data | 3 | 15 |
| [04-training-procedure.md](04-training-procedure.md) | Training Procedure | 4 | 17 |
| [05-inference-strategy.md](05-inference-strategy.md) | Inference Strategy | 1 | 10 |
| [06-evaluation-and-analysis.md](06-evaluation-and-analysis.md) | Evaluation and Analysis | 4 | 15 |
| [07-ablation-and-analysis.md](07-ablation-and-analysis.md) | Ablation and Analysis | 2 | 11 |
| [08-conclusion.md](08-conclusion.md) | Conclusion | 1 | 2 |
| [09-my-opinions-and-limitation.md](09-my-opinions-and-limitation.md) | My opinions and limitation | 2 | 12 |

표지 S001을 제외한 본문 24장과 상세 공부 기록 121개를 포함한다. source_ids 기준으로 S002–S122가 각각 정확히 한 번 연결된다. 장 ID는 위치가 바뀌어도 유지하고, 퇴역한 P003·P004·P005·P007·P011·P012·P021의 ID를 다른 의미로 재사용하지 않는다.

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

한글 제목·본문·해설은 나눔고딕 Regular/Bold/ExtraBold다. 수학 기호는 KaTeX의 수학 글꼴을 사용한다. 글꼴과 수식 스타일은 단일 HTML에 포함되므로 별도 글꼴 설치나 외부 CDN 연결이 필요하지 않다. 글꼴 원본·라이선스는 public/fonts/nanum-gothic/, public/fonts/katex/에 있으며 font_assets.py는 원본 Nanum TTF를 수정하지 않고 포함한다.
