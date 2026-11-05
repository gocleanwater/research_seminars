# 프로젝트 설정

- 논문: RLDX-1 Technical Report
- 상태: v12 / 학습 단계 목적·Fig.6/8·CUDA Graph·Fusion 설명 복원 / 기본32장·상세121단위 유지
- 목적: 전체 맥락의 HTML 발표와 자세한 공부 기록을 함께 유지하고, 사용자 피드백에 따라 장별로 수정
- 형식: 오프라인 단일 HTML 중심 / Slidev 생성 소스 병행
- 발표 시간·장수·청중: 별도 제한 없음. 이전 30장 한도는 해제
- 직접 편집 원본: `sections/01-problems.md`–`sections/09-my-opinions-and-limitation.md`; 구조 안내는 `sections/README.md`
- 생성 흐름: 아홉 MD → `scripts/build_deck.py` → `slides.md`·`presentation.html`; 현재 전환의 실제 검증은 `review/VALIDATION.md`에 기록
- 마이그레이션: `scripts/migrate_sections.py`는 JSON에서 MD를 처음 만든 일회성 도구. 평소 빌드에서 재실행하지 않음
- 이전 자료: `content/main-*.json`과 상세 JSON은 마이그레이션 스냅샷으로 보존. 이후 내용 수정은 MD에서 진행
- 상세 공부 기록: 기존 S002–S122를 연결한 N 해설로 보존. 본문 장수와 상세 단위 수를 일대일 대응하지 않음
- 결과물: `presentation.html`·`index.html`(동일한 오프라인/게시용 발표), `slides.md`(Slidev 생성 소스), `review/SLIDE_INDEX.md`(본문·상세 해설 매핑)
- 페이지 이동: 하단 현재 번호를 입력하고 Enter. 번호로 이동하면 Fig.3 같은 단계형 페이지도 첫 단계로 진입한다. Esc는 입력 취소.
- 발표 구성: Fig.1 표지 → Problems → Architecture(Fig.2·Fig.3 → MSAT 입력·Joint Attention → 학습·추론 수식) → Training Data(전체 종류 → 공개 → 자체 → 합성) → Training Procedure → Inference Strategy → Evaluation and Analysis → Ablation and Analysis → Conclusion → My opinions and limitation
- Figure 3: 전체 그림 → Vision Encoder·VLM·Memory Module·MSAT 네 모듈 확대/복귀와 순차 화살표 설명. 버튼·좌우 방향키와 기존 PPT 조작 유지. 수식은 별도 장에서 설명
- P032 v05: video·language·cognition(64) 토큰 범위를 그림에 묶음 괄호·화살표로 표시, 과거 프레임 → context 1개에 ‘압축’ 명시. 본문은 ‘중간층’과 ‘cognition token 위치의 출력 특징을 행동 생성을 위해 전달’, 18층 사실은 상세 해설에 보존
- Memory 최신 정정: `C = concat(h_t, m_t)`로 토큰 축 연결 표시. MSAT velocity 예측과 최종 clean action chunk는 구분해 설명. 원문 대조 및 27개 설명 상태·기본30개 화면 검증 완료
- 제목·표지: 정확한 영어 섹션명과 짧은 명사형 제목. 상단 우측 분류 표지는 제거
- 시각 자료: 원문 그림을 사용하며 그래프는 원문 이미지 또는 Chart.js 사용 가능
- 디자인 참고: Gravity PDF·kahadra/10.30 중심, 사용자의 U-Net 발표는 보조. `review/REFERENCE_REVIEW.md` 참고
- 수식·글꼴: Markdown LaTeX → KaTeX. 영문 Arial, 한글 Apple SD Gothic Neo → Malgun Gothic → 내장 Nanum Gothic. 명시적 자간0. Arial·시스템 한글 글꼴은 OS 설치본을 사용하며 다른 환경에는 내장 나눔고딕으로 대체한다. 외부 CDN은 사용하지 않는다.
- Canva: 작업 취소. 로컬 Markdown·HTML을 수정
- 공개: https://gocleanwater.github.io/research_seminars/rldx-1-seminar/ (복수형 research_seminars). 최신 사용자 지시에 따라 수정·검증 후 추가 확인 없이 commit하고 origin/main에 push한다. Pages 배포 완료는 확인한 경우에만 보고한다.
- 승인: 전체 제작·수정 요청과 개별 장 승인 구분. 과거 목차 승인 이외의 승인을 추정하지 않음
- 원문: `../../research_wiki/papers/RLWRLD-RLDX-1 Technical Report.pdf`
- 공부 기록: `../../research_wiki/RLDX-1_질문노트.md`
- 중앙 설계: `../../research_wiki/docs/superpowers/specs/2026-11-05-research-wiki-design.md`

원문과 중앙 공부 기록은 읽기 참조다. 이 프로젝트나 업로드 패키지에 복사하지 않는다. 폴더를 옮기면 참조 경로를 확인한다.

## v07 전체 중복 통합

- 기본25장으로 구성했다. P032→P006 학습 원리→P008 추론 갱신→P009 입력→P010 내부 연산 순서다.
- P005 Memory 구조·S016–019와 P011의 stream 전환·S035/S040은 P032에 모았다. Memory 설정은 P017, 로봇별 projection·S036은 P016에 통합했다.
- P007 학습 수식은 P006, P021 kernel은 P020 graph/kernel 비교로 통합했다. P012의 기존 통합도 유지한다.
- P005/P007/P011/P012/P021 ID는 재사용하지 않는다. 과거 링크는 해당 통합 위치로 연결하며 P005는 Fig.3 Memory 확대로 열린다.
- Conclusion은 저자 기여·검증 범위, 나의 의견은 PEFT/BoN 조건, 마지막 장은 미명세·후속 검증에 집중한다.
- 수식·예시·조건·미해결 질문을 포함한121개 상세 단위는 통합 전과 내용이 같다. 이전9개 MD와 지문은 review/versions/before-dedup-v07/에 보존한다.
- v07은 게시되었으며 이후 수정은 최신 지시에 따라 검증 후 자동 commit/push한다.

## v06 MSAT 설명 통합

- P009: C/A/P 최종 입력 묶음, τ 인코딩, RoPE. P010: stream별 RMSNorm/QKV, joint attention, residual, SwiGLU. P011: 후반 stream 통합·로봇별 projection.
- P012는 통합되어 본문에서 퇴역했다. S037·S038은 P009, S039는 P010으로 이동했으며 과거 #P012 링크는 P009로 연결한다. 장 ID는 재사용하지 않는다.
- 기본 화면은29개다. P032의27상태·18화살표와 S002–S122의121개 공부 단위는 유지한다. 이번 v06 변경은 로컬 검토본이며 아직 commit/push하지 않았다.

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
