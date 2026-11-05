# 슬라이드 제작 진행 상황

- 업데이트: 2026-11-05
- 현재 단계: 본문 30장 전체 초안 v01 제작·검증 완료 / 한 장씩 수정할 단계
- 결과: presentation.html(오프라인 단일 파일), slides.md(Slidev), review/SLIDE_INDEX.md(매핑)
- 실제 발표 장수: 30장. 상세 해설 121단위는 장별 N 대화상자이며 추가 발표 슬라이드가 아님
- 마지막 사용자 결정: 전체 선제작 후 한 장씩 수정, 관련 단위 통합. "30자 이내로!!!"는 페이지 수 문맥에서 30장으로 이해한다고 알리고 진행
- 승인 상태: 원래 후보 목차 v01 승인. 본문·표지 결과물의 개별 승인은 아직 없음
- 다음 할 일: 전체 HTML을 보고 사용자가 지목하는 장을 수정. 본문 ID·버전으로 피드백 기록
- 공개 상태: GitHub 저장소 생성·push·Pages 배포 안 함

## 제작과 검증

- 초기 S001과 목차·진행 문서는 review/versions/에 보존했다.
- 121개 후보 설명 단위를 그대로 121장으로 두는 대신 관련 내용을 본문 30장으로 통합했다. 기존 설명·수식·예시·그림·미해결 질문은 source_ids로 N 상세 해설에 한 번씩 연결한다.
- 원문 PDF와 질문노트를 재확인했다. Figure1–23 영역을 추출하고 좌표·쪽수를 content/figure-manifest.json에 기록했다. 원문 PDF와 중앙 노트 전체는 복사하지 않았다.
- 새로 확인한 Table9 배점/집계 불일치를 P028·P030 및 상세 S112·S120에 표시했다. review/FACT_CHECK.md 참조.
- scripts/build_deck.py의 ID·연결 검사, 기본·base 빌드가 통과했다. 실제 HTML 30장 PNG와 두 contact sheet를 만들고 직접 확인했다.
- 30장 모두 화면 경계 초과·이미지 로딩 실패·브라우저 오류 없음. 오프라인 HTML 외부 HTTP 요청 0회. G 검색·키보드 이동·N 상세 해설·그림 확대 실제 동작 확인.
- base 빌드에서도 30개 경로를 브라우저로 열어 제목·1280×720·이미지 로딩을 확인했다. 최종 명령·제한은 review/VALIDATION.md 참조.

## 장별 상태

| ID | 순서 | 제목 | 버전 | 상태 | PNG | 승인 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| S001 | 1 | RLDX-1 Technical Report | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/S001-v01.png | 없음 |
| P002 | 2 | 장면 이해에 움직임·기억·센싱을 더한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P002-v01.png | 없음 |
| P003 | 3 | 장면 이해를 행동용 표현으로 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P003-v01.png | 없음 |
| P004 | 4 | 짧은 영상에서 움직임을 읽는다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P004-v01.png | 없음 |
| P005 | 5 | 긴 이력은 cognition features로 기억한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P005-v01.png | 없음 |
| P006 | 6 | 노이즈에서 행동으로 가는 경로 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P006-v01.png | 없음 |
| P007 | 7 | 변화율을 맞히도록 학습한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P007-v01.png | 없음 |
| P008 | 8 | Euler 반복으로 미래 chunk를 완성한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P008-v01.png | 없음 |
| P009 | 9 | 서로 다른 입력은 전용 stream으로 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P009-v01.png | 없음 |
| P010 | 10 | 함께 읽고, 나눠서 갱신한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P010-v01.png | 없음 |
| P011 | 11 | 전체 구조에서 MSAT의 위치 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P011-v01.png | 없음 |
| P012 | 12 | 행동 생성에 맞춘 블록 설계 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P012-v01.png | 없음 |
| P013 | 13 | 경험을 넓히고, 부족한 상황을 합성한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P013-v01.png | 없음 |
| P014 | 14 | 작업과 장면을 함께 다양화한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P014-v01.png | 없음 |
| P015 | 15 | 영상이 그럴듯해도 행동 라벨은 검사한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P015-v01.png | 없음 |
| P016 | 16 | 범용 조작을 배우고 새 로봇 적응을 준비한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P016-v01.png | 없음 |
| P017 | 17 | 새 기능은 기존 정책에 단계적으로 맞춘다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P017-v01.png | 없음 |
| P018 | 18 | 목표 작업은 시연과 실패에서 구체화한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P018-v01.png | 없음 |
| P019 | 19 | Critic의 평가를 다시 정책 학습으로 돌린다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P019-v01.png | 없음 |
| P020 | 20 | 변하지 않는 준비 계산을 실행 밖으로 옮긴다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P020-v01.png | 없음 |
| P021 | 21 | 연산 사이의 메모리 왕복도 줄인다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P021-v01.png | 없음 |
| P022 | 22 | 범용 조작 평가: 상대 우위와 남은 난도 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P022-v01.png | 없음 |
| P023 | 23 | OpenArm: 지시와 새 상황으로의 일반화 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P023-v01.png | 없음 |
| P024 | 24 | ALLEX: 움직임·기억·물리 피드백 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P024-v01.png | 없음 |
| P025 | 25 | Franka: 다른 몸체에서도 나타난 기능별 개선 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P025-v01.png | 없음 |
| P026 | 26 | Ablation: 표현 선택과 합성 규모의 근거 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P026-v01.png | 없음 |
| P027 | 27 | RL은 완료 효율을, 최적화는 실행 지연을 줄였다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P027-v01.png | 없음 |
| P028 | 28 | 부록: 확장이 항상 같은 이득을 주는가? | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P028-v01.png | 없음 |
| P029 | 29 | 연구의 위치: 기능을 실용 시스템으로 연결한다 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P029-v01.png | 없음 |
| P030 | 30 | 열린 질문: 명세·집계·독립 기여 | v01 | 전체 초안 · 검토 전 | review/previews/deck30-v01/P030-v01.png | 없음 |

## 재개 시 읽을 것

AGENTS.md → PROJECT.md → 이 파일 → FEEDBACK.md → SLIDE_INDEX.md. 본문 수정은 main JSON, 상세 수정은 상세 JSON에서 하고 생성기로 두 결과물을 갱신한다. 생성 HTML만 직접 수정하지 않는다. 이전 review/previews/full-v01/의 122장 이미지는 초기 단위별 초안이며 현재 발표본이 아니다. 현재 PNG는 review/previews/deck30-v01/다. 스타일·콘텐츠의 미승인 상태를 유지하고 사용자의 실제 승인만 기록한다.
