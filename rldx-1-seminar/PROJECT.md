# 프로젝트 설정

- 논문: RLDX-1 Technical Report
- 상태: PPT 방식의 다음/이전 탐색·역방향 설명 단계 보완 / v04 사용자 검토 대기
- 목적: 전체 맥락의 HTML 발표와 자세한 공부 기록을 함께 유지하고, 사용자 피드백에 따라 장별로 수정
- 형식: 오프라인 단일 HTML 중심 / Slidev 생성 소스 병행
- 발표 시간·장수·청중: 별도 제한 없음. 이전 30장 한도는 해제
- 직접 편집 원본: `sections/01-problems.md`–`sections/09-my-opinions-and-limitation.md`; 구조 안내는 `sections/README.md`
- 생성 흐름: 아홉 MD → `scripts/build_deck.py` → `slides.md`·`presentation.html`; 현재 전환의 실제 검증은 `review/VALIDATION.md`에 기록
- 마이그레이션: `scripts/migrate_sections.py`는 JSON에서 MD를 처음 만든 일회성 도구. 평소 빌드에서 재실행하지 않음
- 이전 자료: `content/main-*.json`과 상세 JSON은 마이그레이션 스냅샷으로 보존. 이후 내용 수정은 MD에서 진행
- 상세 공부 기록: 기존 S002–S122를 연결한 N 해설로 보존. 본문 장수와 상세 단위 수를 일대일 대응하지 않음
- 결과물: `presentation.html`(오프라인 발표), `slides.md`(Slidev 생성 소스), `review/SLIDE_INDEX.md`(본문·상세 해설 매핑)
- 발표 구성: Fig.1 표지 → Problems → RLDX-1 Architecture(Fig.2 overview, Fig.3 구조) → Training Data → Training Procedure → Inference Strategy → Evaluation and Analysis → Ablation and Analysis → Conclusion → My opinions and limitation
- Figure 3: Vision Encoder·VLM에 클릭·방향키 기반 확대/복귀와 순차 화살표 설명. 수식은 별도 장에서 설명
- 제목·표지: 정확한 영어 섹션명과 짧은 명사형 제목. 상단 우측 분류 표지는 제거
- 시각 자료: 원문 그림을 사용하며 그래프는 원문 이미지 또는 Chart.js 사용 가능
- 디자인 참고: Gravity PDF·kahadra/10.30 중심, 사용자의 U-Net 발표는 보조. `review/REFERENCE_REVIEW.md` 참고
- 수식·글꼴: Markdown LaTeX → KaTeX, 나눔고딕 3종 내장. 글꼴 설치·CDN 연결 없이 표시
- Canva: 작업 취소. 로컬 Markdown·HTML을 수정
- 공개: GitHub 저장소 생성·push·Pages 배포 수행하지 않음. 사용자가 직접 게시할 때의 안내는 `deployment/GITHUB_PAGES.md`
- 승인: 전체 제작·수정 요청과 개별 장 승인 구분. 과거 목차 승인 이외의 승인을 추정하지 않음
- 원문: `../../research_wiki/papers/RLWRLD-RLDX-1 Technical Report.pdf`
- 공부 기록: `../../research_wiki/RLDX-1_질문노트.md`
- 중앙 설계: `../../research_wiki/docs/superpowers/specs/2026-11-05-research-wiki-design.md`

원문과 중앙 공부 기록은 읽기 참조다. 이 프로젝트나 업로드 패키지에 복사하지 않는다. 폴더를 옮기면 참조 경로를 확인한다.

## 이전 구성 기록

아래는 MD 전환·장수 제한 해제 이전의 프로젝트 상태다. 현재 편집·제작 지침은 위 설정을 따른다.

<details>
<summary>본문 30장 통합 초안 당시 설정</summary>

# 프로젝트 설정

- 논문: RLDX-1 Technical Report
- 상태: 본문 30장 전체 초안 v01 제작 / 한 장씩 수정할 단계
- 목적: 전체 맥락의 발표 초안을 먼저 완성하고, 장별 상세 해설을 보존하며 한 장씩 함께 수정하는 자료
- 형식: Slidev 기반 HTML / CSS / JavaScript 슬라이드
- 발표 시간·청중: 별도 제한 없음. 본문 장수는 최신 요청에 따라 30장 이내
- 현재 작업: 본문 30장 + 연결 상세 해설 검토. 이후 사용자가 지목하는 장을 수정
- 결과물: presentation.html(오프라인 단일 파일), slides.md(Slidev 생성 소스), review/SLIDE_INDEX.md(본문·상세 해설 매핑)
- 상세 내용: 기존 설명 단위를 N 해설로 보존. 상세 단위를 발표 장수로 일대일 대응하지 않음
- 시각 자료: 필요한 이미지는 원문에서 추출하며, 그래프는 원문 이미지 또는 Chart.js 사용 가능
- 디자인 참고 우선순위: Gravity_Compensated_Guidance_1.pptx.pdf와 kahadra/10.30이 중심, 사용자의 U-Net 발표는 보조 참고. 그대로 복제하지 않는다. 검토 근거는 review/REFERENCE_REVIEW.md
- 원문: `../../research_wiki/papers/RLWRLD-RLDX-1 Technical Report.pdf`
- 공부 기록: `../../research_wiki/RLDX-1_질문노트.md`
- 중앙 설계: `../../research_wiki/docs/superpowers/specs/2026-11-05-research-wiki-design.md`
- GitHub 저장소: 미생성
- 공개 주소: 미배포

원문과 공부 기록은 읽기 참조 경로다. 이 폴더로 복사하거나 공개 빌드에 포함하지 않는다. 폴더를 옮기면 먼저 참조 경로를 갱신한다.

</details>
