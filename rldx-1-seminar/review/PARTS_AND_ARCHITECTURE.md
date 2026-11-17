# v33 — Part 분리와 Figure3 설명 통합

v34 추가: P037 뒤에 P096 최종 정리 한 장을 추가했다. 현재 전체47장·Part1 18장·Part2 29장. Part2의 DECK 내용과 대본은 v33과 동일함을 비교했다. 아래 v33 통합 기록은 당시 이력이다.

2026-11-17. 사용자가 통합·중복 페이지 제외 방식을 선택했다. 결과물 검토·승인은 아직 받지 않았다.

- 전체본: presentation.html / index.html, 46장.
- Part1: part-1.html, 17장. 기존23쪽 P037 “Critic과 Figure8”에서 끝난다.
- Part2: part-2.html, 29장. P020 “CUDA Graph”에서 시작한다.
- 각 Part 안에서 페이지 번호·목차를 다시 매긴다. 고정 ID는 유지한다.
- 대본: SPEAKER_SCRIPT.md 및 SPEAKER_SCRIPT_PART1.md / SPEAKER_SCRIPT_PART2.md.

## 기존5–10쪽의 통합 위치

원래4쪽 P032 안의 전체 그림→모듈 확대 흐름에 설명 카드를 삽입했다. 왼쪽 원문 영역과 오른쪽 설명 그림·수식을 함께 보여준다. 기존27상태+13카드=40상태이며 →/←로 순차 이동한다.

| 이전 장 | 통합한 설명 | 카드 ID |
| --- | --- | --- |
| P051 VLM/VQA | 장면 이해와 조작 이해, 세 종류 질문·답변 | vqa-purpose, vqa-questions |
| P009 MSAT 입력 | C/A/P 조건과 후보, 로봇 시간과 생성 진행도 | msat-inputs, time-encoding |
| P010 Joint Attention | 전용 입력 준비→joint attention→출력 분기와 갱신 | joint-attention, stream-update |
| P006 Action Flow | clean/noisy 경로→정답 변화율→학습 손실 | action-path, velocity-target, flow-loss |
| P008 추론 수식 | Euler 후보 갱신, 현재 센서 조건과 미래 센서 예측 | euler-update, sensor-future |
| P071 실행 | chunk 일부 실행, 생성 반복과 실제 실행 반복 | execute-chunk, two-loops |

퇴역6장과 기존 별칭 링크는 P032의 해당 설명으로 연결한다. 학습용 VQA와 추론, clean target과 noisy 후보, 변화율과 최종 행동, denoising 시간과 실제 로봇 시간을 구분한다.40개 예측·20개 실행은 Appendix C의 RL 설정 예시로 한정했다.

## 보존과 편집

- 직접 원본: sections/02-rldx-1-architecture.md의 확대 단계·그림 설명 카드·상세 공부 기록.
- 전체121개 상세 공부 단위의 제목·메타데이터·필드 내용을 변경 전과 비교해 동일함을 확인했다. 통합한 장의 단위는 P032에 정확히 한 번 연결된다.
- 변경 전 원본·대본·도식 설정·표현 코드는 review/versions/before-parts-v33/에 보존했다.
- 기존 P031의 사용자 대본 문장을 작업 파일에서 보존했다.
- 생성 파일은 scripts/build_deck.py로 갱신한다. Part 경계·목차·대본·별칭을 함께 확인한다.

## 실행한 검증

- Python: verify_sources.py, verify_speaker_script.py, test_parts_output.py(3 tests) 통과.
- Chromium: verify_deck.mjs(46장), verify_architecture.mjs(40상태 정방향/역방향), verify_navigation.mjs, verify_math_font.mjs, verify_parts.mjs 통과.
- Part별 순서·번호·대본 제목·N 해설·양끝 탐색·퇴역 링크,121단위 중복/누락 없음 확인.
- 브라우저 오류·외부 네트워크 요청·본문 넘침 없음. 수식 분수/노름·한글/영문 폰트·해설 수식 경계 확인.
- 실제 PNG를 확인해 작은 원문 영역의 인접 제목 자르기를 조정했다. 별도 검토에서 발견한 시간 수식의 중첩 박스와 표지에만 붙던 Part 메뉴를 수정하고 관련 확인을 다시 실행했다.
- 현재 화면: review/previews/architecture-v33/step-00.png–step-39.png. 검증 보고서는 qa/full-deck/ 아래 재생성 결과물이다.
- GitHub Pages의 실제 배포 완료 여부는 이번 로컬 검증 범위에 포함하지 않았다.
