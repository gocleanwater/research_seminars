# 전체 초안의 사실 확인과 미해결 사항

2026-11-05. 원문 PDF와 중앙 질문노트를 읽고 작성했다. 논문의 보고 결과를 실험·구현 재현한 것은 아니다. 본문은 관측·저자 설명·우리의 해석·설명용 예시·미해결 질문을 문자 표지로 구분한다.

## 새로 확인한 Table 9의 집계 불일치

- 원문: App.G.5, PDF p.53. 24회 평가에 full 1점, partial 0.5점, failure 0점이라고 명시한다.
- Real: full9 / partial8 / fail7, 보고 Score16/24·66.7%.
- Real+Synthetic: full14 / partial8 / fail2, 보고 Score20/24·83.3%.
- 명시한 배점으로 계산하면 각각 9+0.5×8=13, 14+0.5×8=18이다. 보고된 16·20과 맞지 않는다.
- count·배점·점수 중 어느 항목이 다른지 확인되지 않았다. 보고값을 임의로 정정하지 않는다. count로 계산한 완전 성공은 9/24=37.5%, 14/24≈58.3%다.
- 반영: 본문 P028·P030, 상세 S112·S120. 기존 중앙 Q1–Q13 번호를 임의로 추가·수정하지 않았다.

## 이전에 함께 공부한 질문의 유지

- Memory H/H+1 표기·갱신·초기화 명세와 noisy action C/A 문장 불일치: P005·P010·P030, 상세 S018·S118.
- Task 실행 가능성 기준·skill 목록·prompt와 classifier 임계값·일반화·오탐/미탐: P014–P015·P030, 상세 S046·S052–S055·S119.
- Franka 혼합 비율 80+9.4+11.6=101.0%, RC365 batch196/192, Egg61.1%와24회 관계: P017·P025·P030, 상세 S061·S095·S120.
- 합성 pool 크기와 sampling1:1, ALLEX 평균86.8의 혼합 지표, frames/attempts와 성공률, p50 policy latency와 전체 제어 지연을 구분했다.
- RECAP critic은 별도 Gemma3 모델, BoN critic은 frozen RLDX-1 feature 기반 별도 Q 모델이다.
- 모듈·필터·warmup·near-zero·RL 효과에 필요한 독립 비교가 부족한 부분은 보고 범위를 넘겨 인과 결론으로 쓰지 않았다.

## 그림과 수치

- 원문의 Figure1–23을 페이지의 해당 영역만 렌더링했다. 이미지 색·축·수치는 유지하며 crop 좌표와 PDF 쪽수는 content/figure-manifest.json에 있다.
- 표를 재구성한 본문 P022·P026–P028·P030은 원문의 보고값을 사용한다. 증분 배수·가중합 등 직접 계산은 계산 또는 해석임을 표시한다.
- 설명용 action 벡터·C4/A3 토큰 수는 실제 모델 shape나 실험값이 아니다.
- Sec.1.1의 c_t(언어 지시)와 Sec.2.2의 c_t(전체 conditioning inputs)는 각 문맥의 정의를 따라 설명했다.
