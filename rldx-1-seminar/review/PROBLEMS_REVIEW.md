# P002 재구성 검토

## 2026-11-17 / v29 / P002 화면·대본 정렬

- 사용자 요청: 기존 VLA 문제 장부터 화면과 대본을 맞추고, 말하는 순서대로 표시할 것. 후속 지시로 화면과 발화에서 VLM 구분을 빼고 VLA만 설명한다.
- P002 한 장에서 VLA 정의→움직임→기억→접촉→세 능력 정리의5상태로 설명한다. 카드에는 질문·예시·필요한 능력만 남기고 자세한 이유는 대본에 둔다.
- 다음/이전 키·버튼·빈 화면 클릭으로 같은 장의 단계를 이동한다. 다음 장에서 돌아오면 마지막 상태, 페이지 번호2로 이동하면 첫 상태다. 그림 확대·입력·기존 Fig.3의27상태는 유지한다.
- 편집 원본: sections/01-problems.md, SPEAKER_SCRIPT.md의 P002. 화면 로직은 scripts/deck-runtime.js, P002 전용 스타일은 deck.css. 다른51장과 기존121개 상세 공부 기록은 보존한다.
- 검증: verify_problems.mjs의5상태·화면VLA단일용어·카드/본문 경계·정방향/역방향/번호이동·5PNG, verify_speaker_script.py, verify_sources.py, 기존 verify_navigation.mjs·verify_architecture.mjs, 프로젝트base빌드가 통과했다. 실제 첫/정리 화면을 확인한다.
- 미리보기: review/previews/problems-v29/P002-step-1.png–P002-step-5.png. 이전 원본은 review/versions/before-problems-v29/에 보존했다. 구현·검증 완료와 사용자 결과물 승인은 별개이며 현재 검토 전이다.

- 적용 규칙: H01/H05/H06/H07/H18/H19/H21/H22/H23/H24.
