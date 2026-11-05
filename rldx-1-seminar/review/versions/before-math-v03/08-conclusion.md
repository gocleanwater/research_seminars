# Conclusion

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P029] Conclusion

<!-- slide-meta
layout: split
kind: fact
source_ids: S116, S117
-->

### 한 문장

RLDX-1은 기능 확장·합성 데이터·3단계 학습·추론 최적화를 결합한 VLA 시스템이다.

### 본문

#### 논문 전체의 기여

VLM의 영상·언어 표현에 motion·memory를 더하고, MSAT의 physics stream으로 물리 신호를 행동 생성과 연결한다.

생성 영상에 IDM 행동 라벨과 선별을 적용해 데이터를 보강하고, pre/mid/post-training으로 범용 조작에서 로봇·작업 적응으로 이어간다. Graph·kernel 최적화로 실행 비용도 줄인다.

### 보충

#### 실험에서 확인한 성과

시뮬레이션·OpenArm에서 높은 비교 성능을, ALLEX·Franka에서는 기능별 과제의 개선을 보고했다. RECAP은 전구 작업 완료 효율을 높였고, 추론 최적화는 policy p50을 줄였다.

ALLEX 평균 86.8은 성공률·진행 점수의 혼합값이다. 복합 조작과 정밀 접촉에는 낮은 절대 성공률이 남는다.

### 요점

범용 조작과 기능별 능력을 하나의 실용 시스템으로 연결한 성과다.

### 출처

Sec.8 Conclusion · PDF p.28; Sec.2–6 · PDF pp.6–26

### 발표 메모

연결 멘트: “여기까지의 구조·데이터·학습·실행·평가를 한 흐름으로 정리하면 이 논문의 기여가 됩니다. 이어서 이 결과에 대한 해석과 남은 한계를 구분해 말씀드리겠습니다.” 원문 Conclusion은 움직임·장기 기억·물리 센싱을 통합하고 합성 데이터, 세 단계 학습, 추론 최적화를 함께 설계한 점을 정리한다. Simulation 성과는 benchmark별 fine-tuning 이후 full recipe의 결과이고 모든 task에 zero-shot으로 투입했다는 뜻이 아니다. 기능별 평가는 task-relevant module만 활성화하므로 세 기능의 동시 시너지로 확대하지 않는다. Conclusion의 ALLEX around90 vs frontier around40은86.8대39.1/44.8의 혼합 평균에 해당한다. 완전 성공90%로 말하지 않는다. RECAP frames/attempts와 policy latency p50도 성공률이나 end-to-end latency와 구별한다. 기존 Related Work(S116)는 source\_ids 연결과 상세 N 해설에 보존한다. 그 내용은 VLA·영상 생성+IDM·기능별 연구를 통합했다는 저자의 연구 위치 설명이며 현재 SOTA나 최초성을 별도로 검증한 결과가 아니다. S117의 결론 해설도 그대로 유지한다.

### 상세 공부 기록

#### [S116] Related Work의 세 흐름

<!-- study-meta
layout: split
kind: authors
-->

##### 한 문장

저자는 VLA·영상 합성·기능별 연구를 하나의 실용 시스템으로 통합한 점을 강조한다.

##### 본문

###### VLA의 행동 생성

VLM을 상위 계획기로 쓰는 modular 접근에서 이산 action token 또는 flow action decoder를 쓰는 end-to-end VLA로 이어지는 흐름을 설명한다.

###### 합성 데이터

Simulation rollout뿐 아니라 생성 영상에 IDM으로 행동 라벨을 붙이는 흐름을 검토한다. RLDX-1은 ALLEX의 따르기·전구 같은 구체적 조작으로 확장한다고 주장한다.

##### 보충

###### 세 기능의 기존 연구

Multi-frame·시간 압축, 과거 특징 memory queue, torque·촉각 및 복수 물리 신호 연구를 연결한다.

<span class="label authors">차별점 주장</span> 개별 기능을 넘어 움직임·기억·물리 센싱을 통합 policy로 다루고 합성 데이터·학습·실행 최적화를 함께 설계한다.

이는 저자의 연구 위치 설명이다. 관련 연구를 모두 재현했거나 최초성을 검증했다는 뜻은 아니다.

##### 요점

여러 기능을 실제로 연결한 시스템 기여로 읽는다.

##### 출처

Sec.7 Related Work · PDF p.27

##### 발표 메모

본 slide는 보고서의 Related Work를 정리한 것으로 현재 SOTA나 전 분야 최신 계보를 새로 검색해 주장하는 것이 아니다. 합성 영상 자체에 torque가 없어도 torque-annotated real data와 함께 쓸 때 유용했다는 저자 주장은 결측 modality 처리와 관련된다. 통합 architecture의 주장과 기능별 benchmark에서는 relevant module only였다는 실험 조건을 함께 유지한다.

#### [S117] Conclusion과 검증된 범위

<!-- study-meta
layout: split
kind: interpretation
-->

##### 한 문장

기능 확장·합성 데이터·3단계 학습·추론 최적화를 결합한 시스템이 성과를 보였다.

##### 본문

###### 원문이 제시한 기여

언어 조건 행동 생성에 motion·memory·physical sensing을 통합하고 합성 데이터·pre/mid/post-training·실행 최적화를 연결했다.

Table 1의 여러 benchmark와 OpenArm에서 비교 모델보다 높은 보고값을 얻었다. ALLEX·Franka 기능별 과제와 전구 RECAP에서도 개선이 관측됐다.

##### 보충

###### 성과를 정확히 전달하려면

ALLEX “약 90%”는 86.8의 혼합 지표다. RC365 복합 과제·Franka 접촉 조작에는 낮은 절대 성공률이 남는다.

각 모듈의 독립 기여·세 기능 동시 효과·평가 불확실성·end-to-end tail latency는 더 확인해야 한다.

<span class="label interpretation">우리의 결론</span> 실용 통합의 유망한 결과와 재현·인과 분해의 남은 과제를 함께 보존한다.

##### 요점

구체적인 조건에서 확인된 시스템 성과와 아직 열린 검증을 구분한다.

##### 출처

Sec.8 · PDF p.28; Sec.6 · PDF pp.17–26; App.G · PDF pp.48–55

##### 발표 메모

Conclusion의 ALLEX around90 vs frontier around40은 RLDX86.8과π0.5 39.1/N1.6 44.8의 혼합 평균에 연결된다. 이를 완전 성공90%로 번역하지 않는다. Simulation 우위는 benchmark별 fine-tuning 뒤의 full recipe 비교이며 zero-shot all tasks가 아니다. 물리 입력과 future trajectory 보조 목표의 기여도 별도로 분해해야 한다. Q11–13 및 Table9의 집계 불일치는 곧 모델 결함이라고 해석하지 않는다.
