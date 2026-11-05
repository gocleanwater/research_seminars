# 슬라이드 제작 진행 상황

- 업데이트: 2026-11-05
- 현재 단계: S001-v01 제작·검증 완료 / 사용자 검토 대기
- 목차: OUTLINE.md v01 — 승인
- 현재 슬라이드: S001-v01 — RLDX-1 Technical Report 표지
- 마지막 사용자 승인: 목차 v01 — "목차는 그대로 가도 좋을 거 같아." (2026-11-05). 개별 장 승인 없음
- 다음 할 일: S001-v01 PNG에 대한 사용자 피드백을 받고 수정. 이 장의 명시적 승인 전 S002 제작 금지
- 공개 상태: GitHub 저장소 생성·push·Pages 배포를 수행하지 않음

## 이번 세션에서 수행한 일

- AGENTS.md, PROJECT.md, OUTLINE.md, review/PROGRESS.md, review/FEEDBACK.md를 먼저 읽었다.
- PROJECT.md의 원문·질문노트 경로가 중앙 research_wiki로 연결되는지 확인하고 읽었다.
- 현재 채팅에서 공부한 본문1~8절·주요 부록·Q1~Q13을 후보 목차와 연결했다.
- 이전 목차·참고자료 검토 단계에 이어 사용자 요청 "이제 한 번 만들어보자!"에 따라 S001 한 장만 작성했다.
- slides.md·style.css로 표지를 작성하고 Fig.12(b) p.19의 ALLEX 원본 이미지를 public/figures/fig12b-allex.png로 추출했다. 내용·이미지 근거는 SOURCES.md에 기록했다.
- 기존 pnpm dev의 --host 옵션이 현재 Slidev CLI에서 지원되지 않는 오류를 확인해 지원되는 --bind 127.0.0.1로 수정했다. 의존성 버전은 변경하지 않았다.
- layout:none 화면에는 .slidev-layout 부모가 없어 최초 CSS 선택자가 적용되지 않아 높이가 0이었다. 브라우저 DOM에서 원인을 확인해 .cover-slide 직접 선택자로 수정한 뒤 다시 렌더링했다.
- 최종 변경 후 pnpm build와 pnpm build --base /rldx-1-seminar/ 모두 종료 코드 0. 개발 화면과 base 빌드 화면 모두 이미지 로드 및 1280×720 크기를 확인했다. 개발 화면 검사에서 경계 초과·브라우저 오류 없음. 실제 PNG를 직접 확인했다.
- 기록: review/previews/S001-v01.png, review/previews/S001-v01-qa.json, qa/S001-v01-build.log, qa/S001-v01-base-build.log, qa/S001-v01-base.json. qa/와 review/previews/는 재생성 가능한 검증 산출물이다.

## 장별 상태

| 슬라이드 ID | 현재 순서 | 제목 | 버전 | 상태 | 미리보기 파일 | 승인 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| S001 | 1 | RLDX-1 Technical Report | v01 | 검토 요청 | review/previews/S001-v01.png | 없음 — 제작 요청은 결과물 승인이 아님 |

S002 이후의 후보 대기 상태는 OUTLINE.md에 있다.

상태: 대기 / 작성 중 / 검토 요청 / 수정 중 / 승인 / 재검토 필요.
승인 근거에는 실제 사용자 표현과 날짜를 적는다. 승인하지 않은 것을 완료로 표시하지 않는다. 미리보기는 S001-v01.png처럼 ID·버전을 포함한다.

## 세션 종료 시 인계

목차 v01은 승인됐고 현재 검토 대상은 S001-v01이다. 사용자가 예시 자료를 제공해 우선 검토했다. Gravity PDF 31쪽 전체를 contact sheet로 살펴보고 주요 쪽을 확대했다. GitHub HTML 26장 전체를 브라우저에서 렌더링해 구성과 테마를 확인했다. GitHub 렌더링에서 이미지 요소 1개는 로드되지 않았으므로 그 이미지의 내용은 평가하지 않았다. U-Net은 보조로 텍스트와 선택 화면만 확인했으며 변환 PDF에는 일부 한글 글꼴 누락이 있어 서체 평가에 사용하지 않는다.

검토 결과와 디자인의 제안은 REFERENCE_REVIEW.md에 기록했다. 그 방향으로 S001-v01을 실제 제작했지만 색상·레이아웃에 대한 사용자 승인은 아직 없다. 피드백을 받으면 같은 장을 수정한다. review/references/의 이미지는 참고자료 검토용이고, 실제 검토할 RLDX-1 화면은 review/previews/S001-v01.png다. 로컬 개발 서버는 localhost:3030에서 실행했다. 재개 시 실행 여부를 확인한다. 공개·push·배포는 수행하지 않았다.
