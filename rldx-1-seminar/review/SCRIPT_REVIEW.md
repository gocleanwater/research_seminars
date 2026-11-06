# 발표 대본 v01 검토 기록

- 작성일: 2026-11-06
- 파일: [SPEAKER_SCRIPT.md](../SPEAKER_SCRIPT.md)
- 대응 발표 자료: v28, 52장. 대본 작성 시작 시 커밋 `cc7329a`.
- 상태: 전체 초안 작성·검증 완료. 사용자의 개별 문장/분량 승인은 아직 받지 않았다.

## 작성 범위

- 52장 각각의 화면 번호·고정 ID·제목과 발화 문단을 연결했다. 시간을 먼저 정해 내용을 축약하지 않았다.
- 4쪽은 실제 Figure 3의27개 상태에 맞췄다. Vision Encoder·Motion/STSS·residual, VLM·cognition·압축, Memory, MSAT 순서와 화면 조작을 적었다. MSAT 마지막 상태에서 로봇별 입출력 경로를 말한 뒤 전체 그림으로 돌아간다.
- 합성 데이터 검증에서는 영상 품질, IDM 행동 추정, simulator rollout, 특징 비교, 검사기 학습 쌍을 구분했다.
- 기존 후속 질문에 맞춰 IL/RL의 적용 상황과 별도 Gemma critic, attention 색상, pool과 sampling, RL 완료 효율과 policy p50 지연을 설명했다.
- 제외된 부록 실험과 Fused Kernels 목록은 다시 발표 대본에 넣지 않았다. 기존 상세 공부 기록은 별도로 유지한다.
- 일반 문단은 발화, 인용문의 `조작`과 `발표자 참고`는 읽지 않는 안내다. 실제로 수행하지 않은 개인 실험이나 경험은 쓰지 않았다.

## 근거 대조

- 9개 섹션 MD의 현재 본문·발표 메모·선별된 상세 기록, 현재 채팅의 설명·정정과 중앙 질문노트를 기준으로 작성했다.
- 원문 PDF pp.7–8에서 cognition·STSS·압축·Memory·MSAT·flow matching을, p.11에서 Task/Scene augmentation과 영상 품질 검사를 재확인했다. 실험은 직전 확인한 Table1 p.18, Table2–3/Fig.19 p.25, Table4/Figs.20–21 p.26과 현재 MD를 대조했다.
- Table1은 전체78칸과13개 차이를 보존한 검증 참조를 사용했다. 대본에서는 표를 읽는 법과 대표 수치를 설명하며 모든 칸을 낭독하지 않는다.
- 중간층의 시각 grounding/의미 정보 균형, VQA attention의 집중 경향은 저자의 해석으로 표현했다. Pool의1만 개 예시는 설명용 가정으로 명시했다.
- Memory의 H/H+1·queue 갱신/초기화, A/C stream 서술, Task 실행 가능성 판정, Fig.7의 비중은 미해결로 유지한다. Advantage 계산식과 attention 색의 정확한 정규화는 새로 만들지 않았다.

## 검증

- `python3 scripts/verify_speaker_script.py`: 52장 번호·ID·제목·순서, 충분한 발화 본문, Figure3의27단계, 누락/placeholder, 제외된 부록 실험의 재등장 여부, Markdown·KaTeX 렌더링을 확인한다.
- 목차 번호와 모든 실험 수치·단위, 현재/미래 센서, 학습/추론 변화율, 원문/해석/예시/미해결의 구분을 수동 점검했다.
- 발표 HTML·슬라이드 MD·9개 원본·deck manifest는 수정하지 않았다. 따라서 발표 화면의 버전과52장 구성은 v28 그대로다. 이 대본 작성으로 전체 발표 빌드나 브라우저 화면 검증을 새로 실행했다고 주장하지 않는다.
- 검증 결과 JSON은 `qa/full-deck/speaker-script-report.json`에 재생성한다. 대본 수정이나 슬라이드 재배치 후 검증기를 다시 실행한다.

## 후속 편집

- 대본의 직접 편집 원본은 SPEAKER_SCRIPT.md다. HTML의 N 해설을 이 대본으로 덮어쓰지 않는다.
- 사용자 피드백으로 어휘·강조·길이를 수정한다. 사용자가 요청하지 않은 발표 시간 한도나 생략 기준은 만들지 않는다.
