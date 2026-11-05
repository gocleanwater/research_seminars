# 전체 초안 콘텐츠 계약

전체 HTML 초안을 제작한 뒤 한 장씩 수정한다. 2026-11-05 최신 사용자 요청이 이전 한 장 제작 제한을 대체한다.

후속 결정: 관련 단위를 묶어 본문30장으로 만든다. 기존 상세 단위는 삭제하지 않고 main JSON의 source_ids를 통해 N 상세 해설에 연결한다. 본문main-*.json과 원형 상세 JSON을 분리한다. 실제 발표 장수는 표지1+main29=30이다.

## 작성 산출물

각 담당 범위의 슬라이드를 `content/architecture.json`, `content/data-training.json`, `content/evaluation.json`에 JSON 배열로 작성한다. 공유 slides.md·CSS·문서는 수정하지 않는다. 원문과 중앙 질문노트는 읽기 참조만 한다. 원문은 `../../research_wiki/papers/RLWRLD-RLDX-1 Technical Report.pdf`, 질문노트는 `../../research_wiki/RLDX-1_질문노트.md`다. 모든 쉘 명령은 프로젝트 workdir를 명시한다. 번들 Python은 `/Users/jungsoo_ko/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`이며 pypdf·pdfplumber·pypdfium2 사용 가능하다.

각 객체 필수 키:

```json
{"id":"S008","title":"로봇용 VQA 적응","lead":"핵심 메시지 한 문장","layout":"split","kind":"fact","body":"<h3>설명</h3><p>한국어 설명</p>","aside":"<h3>예시</h3><p>설명용 예시</p>","takeaway":"마지막에 남길 문장","source":"Sec.2.1 · PDF pp.6–7","notes":"발표자를 위한 상세 보충 설명"}
```

- `layout`: split(좌우), figure(왼쪽 원문 그림 60%, 오른쪽 body), widefigure(상단 큰 그림, 하단 body), full(전체 body).
- `kind`: fact(원문 설명·결과), authors(저자 해석), interpretation(우리 해석), example(설명용 예시), question(미해결). 필요한 경우 본문 `<span class="label example">설명용 예시</span>`처럼 부분 표지.
- 그림은 `figure":"fig-03.png"`, `caption":"Figure 3 ..."` 선택 키. 원문 Fig.1–23을 루트 담당자가 public/figures/에 추출한다. 그림 사용시 layout figure 또는 widefigure. 같은 그림 재사용 가능하되 해당 장의 질문에 맞는 확대·해설을 한다.
- 표는 직접 HTML `<table><thead>...` 작성. 소수·단위·조건을 원문과 대조. 그림/표를 인용하지 않는 텍스트도 source 필수.
- 수식은 HTML `<div class="equation">a<sup>τ</sup> = ...</div>`와 sub·sup·기호를 사용한다. 복잡한 식은 항별로 나눠 별도 의미 설명. 식·벡터를 코드처럼 긴 한 줄로 쓰지 않는다. 원문의 실제 식과 설명용 단순화는 구분.
- 제공되는 CSS: h3,p,ul,li,strong, .equation, .eq-caption, .flow(가로 흐름), .node(흐름 단위), .arrow, .token-row, .token(.c/.a/.p), .sequence, .step, .mini, .muted, .label(.fact/.example/.interpretation/.question/.authors), .callout, .compare, .metric, .bar-chart, .bar-row, .bar-fill. .flow 직계 자식 node와 arrow 사용. .compare 2열.
- `.flow`가 양쪽 split의 530px 공간에 들어갈 때 4개 이상 node는 피한다. 긴 흐름은 `.sequence` 세로 단계나 full 배치. 형식만으로 의미를 대신하지 말고 실제 텍스트·수치·그림이 있어야 한다.
- 주 콘텐츠는 440px 높이 내에서 읽히도록 body+aside 약 한국어 400~650자. 상세 배경·유도는 notes에 추가할 수 있지만 공부한 핵심을 전부 notes로 숨기지 않는다. 제목 42px, 본문 24px 수준. 한 장이 과밀하면 짧은 문단·도식으로 정리하되 핵심 생략 금지.
- 전체 흐름은 OUTLINE.md S001–S121을 따른다. 원문·질문노트의 미해결 사항을 확인된 결론처럼 쓰지 않는다. t는 로봇 시간, τ는 denoising timestep. 로봇 이름 OpenArm·ALLEX·Franka. task와 action, 데이터 pool과 sampling 비중, 성공률과 부분점수, p50과 end-to-end를 구별한다.
- 그림·표 자체의 텍스트는 source로 인용 가능. 배경 정의·설명용 예시는 풀이임을 표시. 외부 검색이 필요한 세부 주장은 생략이 아니라 원문 범위로 제한하거나 공식 원전 확인 후 source 기록.
- 사용자가 제공한 참고는 Gravity 및 GitHub 발표가 중심, U-Net 보조. 밝은 바탕·남색·청록, 직관→그림→수식→예시, 표준 카드 반복은 피한다.
- 최종 응답은 작성한 장 수, 파일 경로, 반드시 확인해야 할 미해결·수치·제약을 알려준다. Git·배포·독립 승인 요청은 하지 않는다.
