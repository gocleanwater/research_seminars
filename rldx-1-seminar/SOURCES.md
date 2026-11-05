# 근거 목록

실제 제작에 사용한 근거를 기록한다. 디자인 참고자료의 관찰은 review/REFERENCE_REVIEW.md에 별도로 있다.

| 근거 ID | 원문 또는 공부 기록 | Section·Figure·Table·Equation·PDF 쪽수 | 확인한 범위 | 연결 슬라이드 |
| --- | --- | --- | --- | --- |
| PAPER-001 | ../../research_wiki/papers/RLWRLD-RLDX-1 Technical Report.pdf | 표지 p.1; Abstract p.3 | 제목, 연구기관 RLWRLD·KAIST, 연도 2026, 범용 조작 모델 및 motion awareness·long-term memory·physical sensing을 통합하는 구조에 대한 설명 | S001 |
| FIG-012B | 같은 원문 | Fig.12(b), p.19 | ALLEX 사진과 48-DoF humanoid 명칭. p.19의 원본 이미지 X1.jp2(1217×1236, RGBA)를 PNG로 추출. 투명도·비율 유지, 합성·색상 변경 없음. 파일 public/figures/fig12b-allex.png | S001 |

논문 서술을 확인한 것과 실험·구현을 직접 재현한 것을 구분한다. 문서 내 불일치나 미해결 항목은 임의로 보정하지 않는다.

## 전체 본문 연결

| 본문 ID | 확인한 원문 위치 | 연결 상세 단위 |
| --- | --- | --- |
| P002 | Sec.1–1.1 · Fig.2 · PDF pp.3–5 · 장별 상세 해설은 N | S122, S002, S003, S004, S005, S006, S007 |
| P003 | Sec.2.1 · PDF pp.6–7; Table2(a) · PDF pp.24–25 | S008, S009, S010 |
| P004 | Sec.2.1 Motion Awareness · PDF p.7; Sec.4.1 · PDF p.13 | S011, S012, S013, S014, S015 |
| P005 | Sec.2.1 Long-Term Memory · PDF p.7; Sec.4.2 · PDF p.13; 질문노트 Q5 | S016, S017, S018, S019 |
| P006 | Sec.2.2 · PDF p.8; 배경: DiT arXiv:2212.09748, Flow Matching arXiv:2210.02747 | S020, S021, S022, S023 |
| P007 | Sec.2.2 Eq.(1) · PDF p.8; 미분·숫자는 설명용 풀이 | S024, S025, S026, S028 |
| P008 | Sec.2.2 Eq.(2), Physical Sensing · PDF p.8; Sec.4.2 · PDF p.13 | S027, S029, S030 |
| P009 | Sec.2.2 MSAT·Physical Sensing · PDF pp.8–9; Fig.3 · PDF p.6 | S031, S032 |
| P010 | Sec.2.2 MSAT 및 마지막 요약 문장 · PDF p.8; 질문노트 Q1·Q6 | S033, S034 |
| P011 | Fig.3 · PDF p.6; Sec.2.2 · PDF p.8; Sec.4.1 · PDF p.12 | S035, S036, S040 |
| P012 | Sec.2.2 Further Design Choices · PDF p.9; 배경: arXiv:2104.09864, 1910.07467, 2002.05202 | S037, S038, S039 |
| P013 | Sec.3–3.3; Fig.4 · PDF pp.9–12 | S041, S042, S043 |
| P014 | Sec.3.3; Fig.5 · PDF p.11; App.B.3 · PDF p.42; 질문노트 Q8 | S044, S045, S046, S047, S048, S049, S050 |
| P015 | Sec.3.3 · PDF pp.11–12; App.B.3 · PDF p.42; 질문노트 Q2 | S051, S052, S053, S054, S055 |
| P016 | Sec.4–4.1; Fig.6 · PDF pp.12–13 | S056, S057, S058, S059 |
| P017 | Sec.4.2; Fig.7 · PDF p.13; 질문노트 Q10·Q11 | S060, S061, S062, S063, S064 |
| P018 | Sec.4.3 · Adaptive Data Collection/RL · PDF pp.14–15 | S065, S066 |
| P019 | Sec.4.3; Fig.8 · PDF pp.14–15; App.C Algorithm1 · PDF p.43 | S067, S068, S069, S070, S071 |
| P020 | Sec.5–5.2; Fig.9 · PDF pp.15–16 | S072, S073, S074, S075, S076 |
| P021 | Sec.5.2; Fig.10 · PDF pp.16–17; App.F Table7 · PDF p.47 | S077, S078, S079, S080, S081 |
| P022 | Sec.6–6.1 · Table 1 · PDF pp.17–19; App.G.1 · PDF pp.48–49 | S082, S083, S084, S085, S086, S087 |
| P023 | Sec.6.2 · Figs.13–14 · PDF pp.19–20; App.G.2 · PDF p.50 | S088, S089 |
| P024 | Sec.6.3 · Figs.15–16 · PDF pp.21–22; App.G.3 · PDF p.51 | S090, S091, S092 |
| P025 | Sec.6.4 · Figs.17–18 · PDF pp.23–24; App.G.3–G.4 · PDF pp.51–52; Q13 | S093, S094, S095, S096 |
| P026 | Sec.6.5 · Tables 2–3 · Fig.19 · PDF pp.24–25 | S097, S098, S099, S100, S101, S102 |
| P027 | Sec.6.5 · Figs.20–21 · Table 4 · PDF p.26; App.C · PDF p.43 | S103, S104, S105, S106, S107 |
| P028 | App.D · Table 6 · PDF p.44; App.E · Figs.22–23 · PDF pp.45–46; App.G.5–G.6 · Tables 9–15 · PDF pp.53–55 | S108, S109, S110, S111, S112, S113, S114, S115 |
| P029 | Sec.7 Related Work · PDF p.27; Sec.8 Conclusion · PDF p.28; Sec.6 · PDF pp.17–26 | S116, S117 |
| P030 | Q5–Q6·Q8·Q11–Q13; Sec.2–4 · PDF pp.7–13; App.B.3 · PDF p.42; App.G.1·G.4–G.6 · PDF pp.49,52–55 | S118, S119, S120, S121 |

## 이미지와 배경 원전

- Figure1–23은 원문 PDF에서 필요한 영역을 렌더링했다. 각 그림의 PDF 쪽수·crop 좌표·파일 크기는 content/figure-manifest.json에 기록했다.
- 상세 해설의 배경 개념 원전: [Transformer attention](https://arxiv.org/abs/1706.03762), [DiT](https://arxiv.org/abs/2212.09748), [Flow Matching](https://arxiv.org/abs/2210.02747), [RoPE](https://arxiv.org/abs/2104.09864), [RMSNorm](https://arxiv.org/abs/1910.07467), [GLU variants](https://arxiv.org/abs/2002.05202). RLDX-1 고유의 구현·학습 설정은 기술 보고서의 설명 범위를 따른다.
- 디자인 참고와 읽은 범위는 review/REFERENCE_REVIEW.md, 문서 불일치와 계산 확인은 review/FACT_CHECK.md에 있다.

## v03 수식 렌더링·나눔고딕

- 한글 폰트 원본: [Google Fonts의 Nanum Gothic](https://github.com/google/fonts/tree/main/ofl/nanumgothic). Regular/Bold/ExtraBold TTF를 수정 없이 사용한다. SIL Open Font License 전문은 public/fonts/nanum-gothic/OFL.txt와 단일 HTML의 CSS 주석에 보존했다. 각 파일 SHA-256은 content/typography-manifest.json에 있다.
- 수식 렌더러: 기존 잠금 의존성의 KaTeX 0.18.10. [공식 렌더링 옵션](https://katex.org/docs/options.html)의 htmlAndMathml 방식으로 시각 표현과 접근성 MathML을 함께 만든다. KaTeX MIT 라이선스는 public/fonts/katex/LICENSE와 단일 HTML 주석에 있다.
- 수식 문법은 표시 방식의 변경이다. 원문의 식·설명용 유도·수치 예시·미해결 질문의 구분은 유지한다. 최신 본문 연결은 review/SLIDE_INDEX.md 및 섹션 MD의 출처 필드를 따른다. 위의 P003/P004·ALLEX 표지 연결은 초기 v01 구성의 이력이다.
