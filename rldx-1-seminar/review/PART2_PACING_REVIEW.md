# Part2 대본 중심·20분 구성 검토 — v42

원본 기준: af77771(v41). 요청받은6·7쪽은 대본을 먼저 자연스럽게 정리한 뒤 화면을 재구성했다. 이후 실험·ablation의 독립 소개 장9개를 통합해 Part2를33→24장으로 정리했다. 마지막 의견·Q&A·Part1과 앞1–5·8쪽은 소스와 발화 내용을 유지했다.

## 의미와 사실 검토

- CUDA: RoPE/mask 역할→토큰 구성에 따른 준비값 변화→고정된 배포에서 재사용을 한 passage/화면으로 만든 뒤 Figure9로 연결. ‘추론이면 자동으로 모든 설정이 고정’이라고 하지 않는다. 준비값과 Q/K/attention 출력의 재사용을 혼동하지 않는다.
- Fusion: Figure10 좌/우를 각각 확대. 별도 kernel의 저장·재읽기와 fused kernel의 on-chip reuse를 대본 순서로 읽는다. 같은 설명을 추가 수식 강의로 반복하지 않는다.
- 실험: 모든Table1 데이터와 원문 비교 그래프 보존. OpenArm은 π0.5·GR00T N1.6의 최고값 대비 선반+14.6%p·식기대+12.5%p, ALLEX는Conveyor50.0→87.5%·Box33.3→91.7%, Franka는기존평균34.4/31.6%→68.5%를 핵심 비교로 사용. Figure14/16/18을 직접 대조했다.
- ALLEX의Card/Pouring은진행점수,86.8은혼합평균임을 화면·대본에 남김. FrankaPlug33.3%의남은어려움 유지.
- Ablation: 중간층의시각·의미 균형은 저자 해석으로 표시하고 실제3층 성공률 비교를 함께 유지. VQA는 downstream조작 성공률57.5→60.9%. 합성 규모는 sampling비율 고정,RL은 완료프레임/비틀기,실행최적화는policy추론p50으로 구분.
- 기능별과제에서기존모델을능가한것을모듈만제거한통제실험결과로새로표현하지않음. 모든모듈의독립기여를증명했다고하지않음.
-20분은review/PART2_20_MIN_RUN.md의진행배분안. 실제발표자의발화속도/질문시간은리허설로조정해야하며낭독을실측했다고하지않음.

## 실행 검증

- verify_sources.py:9개canonicalMD·121단위·기존35상태/8카드/18화살표 통과.
- verify_speaker_script.py:45장 전체 대본 순서·제목·LaTeX·화면카드 발화 일치 통과.
- verify_part2_revision.py:Part1·보호한 앞부분·마지막 의견/대본·표지 동일,121개원본단위딕셔너리 정확히동일,첫8개ID순서유지 통과.
- test_parts_output.py:10검사 통과.
- verify_inference.mjs:6·7쪽 각2상태,표시영역·버튼·키보드·정역방향·초기화 통과.
- verify_deck.mjs:전체45장 실제렌더,넘침0·스크립트오류0·외부요청0. 새도식·비교결과·중간층직관·RL그림 직접확인.
- verify_navigation.mjs/verify_parts.mjs:전체이동·기존링크연결·Part1 21/Part2 24 통과.
- verify_table1.mjs:원문78개수치·13개delta·미보고값·셀넘침 통과.
- verify_section_titles.mjs/verify_part_agenda.mjs:8섹션제목·28목차링크·교차Part이동 통과.

수정하지 않은 범위:Part1의과학내용/발화,Part2시작·요약·Inference제목·Evaluation제목,마지막의견. 사용자결과물검토전.
