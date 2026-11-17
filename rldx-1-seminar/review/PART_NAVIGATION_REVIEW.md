# v36 — 클릭 목차와 Part 시작·Q&A 경계

2026-11-18. 사용자 요청으로 첫 장 목차, Part 표시와 Q&A 종료를 추가했다. 결과물 사용자 검토 전이다.

| 전체 순서 | ID | 역할 |
| --- | --- | --- |
| 1 | S001 | 두 Part의 주제별 클릭 목차·표지 |
| 2 | P097 | Part 1 시작 — 모델 구조와 학습 |
| 3–17 | P002–P096 | 기존 Part 1 내용·최종 정리 |
| 18 | P098 | Part 1 Q&A |
| 19 | P099 | Part 2 시작 — 추론·실험·분석 |
| 20–48 | P020–P030 | 기존 Part 2 내용 |
| 49 | P100 | Part 2 Q&A |

ID 범위 표시는 발표 순서의 처음/끝 ID이며 연속 숫자라는 뜻은 아니다. 실제 순서는 content/deck-manifest.json을 따른다.

## 목차와 파일 이동

S001의 Part 제목은 각 시작 페이지로 이동한다. Part 1의 문제·모델 구조·데이터·학습 주제와 Part 2의 추론 최적화·성능 평가·Ablation·결론/의견/한계가 각각 해당 주제로 연결된다. 최종 정리와 각 Part의 Q&A도 선택할 수 있다.

전체본에서는 해시 링크로 같은 파일 안에서 이동한다. Part 1 파일의 Part 2 링크는 part-2.html#ID, Part 2의 전체 목차 링크는 part-1.html#S001로 연결한다. 분리본에서 없는 ID의 해시만 바뀌고 화면이 그대로인 상태를 만들지 않는다.

Part 1은18장(S001–P098), Part 2는31장(P099–P100)이다. 전체본의 Part 1 Q&A 뒤에는 Part 2 시작이 이어지며, 각 분리본의 다음 버튼은 마지막 Q&A에서 끝난다. Q&A의 이동 버튼으로 다른 Part나 목차를 열 수 있다.

## 원본과 보존

- 표지·주제 링크: content/cover.html.
- Part 1 시작: sections/01-problems.md의 P097.
- Part 1 Q&A: sections/04-training-procedure.md의 P098.
- Part 2 시작: sections/05-inference-strategy.md의 P099.
- Part 2 Q&A: sections/09-my-opinions-and-limitation.md의 P100.
- 과학 내용과121개 상세 공부 단위는 그대로다. 새4장은 공부 단위를 만들지 않는다.
- 기존 학술 대본은 유지하고 표지·새 구분4장의 발화, 페이지 번호를 직접 적던 P002/P032 조작 안내만 맞췄다.
- 변경 전 표지·대본·manifest·exporter는 review/versions/before-part-boundaries-v36/에 보존했다.
- section_sources.py의 슬라이드별 chapter 설정은 구분·Q&A에 Seminar를 표시하기 위한 것이다. 기존 논문 섹션 표시는 유지한다.

## 실행한 확인

- 전체49장 화면: 넘침·깨진 이미지·브라우저 오류·외부 요청 없음. 빈 takeaway 띠는 구분/Q&A에서 숨겼다.
- 전체본과 Part 1 표지에서13개씩, 총26개 목차 링크를 실제 클릭해 대상 ID를 확인했다.
- 키보드 Enter로 목차 활성화, Part 1 표지에서 주제로 이동, Q&A와 Part 경계의 정방향/역방향을 확인했다.
- 분리 파일 간 이동, Part 1/2 Q&A 종료와 전체 목차 복귀를 실제 확인했다.
- 페이지 번호 입력·검색·N 해설·이미지 확대와 기존 퇴역 링크 검사 통과.
- 원본121단위의 제목·메타데이터·필드 전후 동일성, 대본/Part별 순서 일치, 수식/폰트 검사 통과.
- 기존 exporter 단위검사3개 통과. 별도 읽기 검토에서 새 경계·링크에 수정할 문제는 발견되지 않았다.
- 실제 첫 장·Part 1 시작·Part 1 Q&A·Part 2 시작·Part 2 Q&A PNG를 확인했다.
- GitHub Pages의 실제 배포 완료 여부는 이번 로컬 검증에 포함하지 않았다.
