# My opinions and limitation

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P028] 나의 의견

<!-- slide-meta
layout: split
kind: interpretation
source_ids:
-->

### 한 문장

부록까지 보면 모델 확장의 가치는 더 많은 학습·후보·기능 자체보다, 조건에 맞는 성능과 비용으로 판단해야 한다.

### 본문

#### 학습 비용과 표현의 적응

<span class="label interpretation">의견</span> PEFT에서는 업데이트할 파라미터 수만 줄이기보다, <strong>새 작업에 필요한 표현까지 적응되는지</strong> 함께 봐야 한다.

Action LoRA로 성능을 유지한 조건과 VLM 고정에서 크게 낮아진 조건은, 적응 범위를 선택할 근거다.

<p class="callout">성공률·학습 파라미터·VRAM을 함께 보고, 실제 실행 장비에서 검증할 필요가 있다.</p>

### 보충

#### 추가 추론과 평균 성능의 조건

<span class="label interpretation">의견</span> BoN의 결과는 <strong>후보의 다양성과 평가 모델의 적합성</strong>이 중요함을 보여 주는 출발점이다. 후보 수만 늘리는 처방은 충분하지 않다.

높은 평균도 카메라 변화·일부 조작·긴 복합 작업의 약점을 가릴 수 있다.

<p class="callout">같은 데이터·계산 예산과 필요한 작업 분포에서, 전체 비용과 성능을 다시 비교하고 싶다.</p>

### 요점

확장의 효과는 조건부다. 구현 정보·세부 과제·계산 비용까지 보아야 적용할 근거가 분명해진다.

### 출처

발표자의 해석 · App.D Table6 · p.44; App.E Figs.22–23 · pp.45–46; App.G.5–G.6 · pp.53–55

### 발표 메모

숫자와 실험 설명은 앞의 PEFT/BoN/세부 평가 장으로 옮겨 이 장의 중복을 줄였다. 개인적인 실험 경험을 만들어 넣지 않고 원문 결과를 바탕으로 한 의견으로 표시한다. 기존 S108–S115는 관련 본문 장으로 옮겨 원형 내용을 보존했다. 다음 장에서는 의견과 구분해 명세·집계의 미해결 질문을 정리한다.

### 상세 공부 기록

## [P030] 한계와 미해결 질문

<!-- slide-meta
layout: full
kind: question
source_ids: S118, S119, S120, S121
-->

### 한 문장

원문 명세·집계의 불일치와 아직 분리하지 못한 효과를 다음 검증의 대상으로 남긴다.

### 본문

| 위치 | 확인된 불일치 | 필요한 근거 |
| --- | --- | --- |
| Q11 · Fig.7 | Franka 비중 합101.0 vs 본문8:2 | 혼합 설정 |
| Q12 · Table8 | RC365 batch196 vs192 | 실행 설정 |
| Q13 · Fig.18 | Egg61.1% vs24회 설명 | 분모·집계법 |
| 추가 · Table9 | Count 가중합13/18 vs 보고16/20 | Count·점수 명세 |

<span class="label question">운영·생성</span> Memory 갱신·초기화, $H$/$H+1$·C/$A$ 표기, skill 목록·실행 가능성 규칙은 더 확인해야 한다.

<span class="label interpretation">후속 실험</span> 모듈·필터·RL의 독립 비교, 동일 데이터·compute 예산, 평가 불확실성, end-to-end p95/p99가 결론을 더 선명하게 한다.

### 보충

### 요점

문서의 불확실성과 모델의 성능 한계를 구별하며 후속 근거를 확인한다.

### 출처

Q5–Q6·Q8·Q11–Q13; Sec.2–4 · PDF pp.7–13; App.B.3 · PDF p.42; App.G.1·G.4–G.6 · PDF pp.49,52–55

### 발표 메모

연결 멘트: “마지막은 앞의 의견과 구분해 원문에서 확인되지 않은 명세와 추가 검증을 정리합니다.” 마무리 멘트: “문서의 불일치는 모델 오동작의 증거가 아닙니다. 명시된 결과와 확인하지 못한 규칙을 나눠 다음 근거를 찾는 출발점으로 남깁니다.” Memory는$H+1$ 간격과$t-H$ queue식, episode 초기화·짧은 history 처리, MSAT의$A$와 Physical Sensing 요약의C가 미해결이다. Task feasibility는 skill 목록·prompt·판정 gate가 구체적이지 않다. Q11은$80+9.4+11.6=101$, Q12는 문장196/Table8 192, Q13은24회당1성공4.17%p와61.1의 대응 불명확이다. Table9 count9/8/7,14/8/2에1/0.5/0을 적용한13/18과 보고16/20도 다르다. 기존 $Q$번호를 재번호화하지 않는다. 모든 미해결 질문과 후속 실험 제안은 S118–121 원형 해설에 보존한다.

### 상세 공부 기록

#### [S118] Memory와 stream 표기: 남은 질문

<!-- study-meta
layout: split
kind: question
-->

##### 한 문장

구조의 큰 흐름은 확인됐지만 queue 운영과 일부 표기는 구현 근거가 더 필요하다.

##### 본문

###### Memory Q5

과거 cognition3묶음과 현재 $h_t$를 causal memory Transformer에 넣고 $m_t$·원래 $h_t$를 행동 모델로 전달한다.

본문 cache 간격은 $H+1$이지만 queue 식은 $t-H,t-2H,\ldots$로 표기한다. Chunk40/16과 과거 120/48 timestep 설명은 있으나 정확한 갱신 시점·episode 초기화·짧은 history 처리는 확정하지 못했다.

##### 보충

###### Stream Q6

MSAT 문단은 $C=[h_t,m_t]$, $A=[s_t,a^{\tau}]$로 명시한다. 그러나 Physical Sensing 마지막 요약은 noisy action을 “C stream”이라고 쓴다.

초기 $A$와 후기 통합 C-A를 구별하되 마지막 C가 오타인지 의도인지 확정하지 않는다.

<p class="label question">운영 명세·표기의 미해결이며 실제 실행 오류 확인은 아님</p>

##### 요점

명시된 구조는 설명하고 부족한 운영 규칙과 표기는 열린 질문으로 남긴다.

##### 출처

Sec.2.1–2.2 · PDF pp.7–8; Sec.4.2 · PDF p.13; Q5·Q6

##### 발표 메모

Cache 간격$H+1$과 queue식$t-n_{\mathrm{mem}}H$의 불일치를 남긴다. Queue 갱신을 매 카메라 frame 또는 매 denoising iteration마다 한다고 보완하지 않는다. Memory window120/48은 원문 수치이며 camera FPS를 확인하지 않고 초 단위로 변환하지 않는다. 공개 코드나 저자 확인으로 cache trigger·episode reset·padding·첫 chunk 동작을 검증할 수 있다. Physical Sensing 요약의C표기는 MSAT 문단$A$와 다르며 후기C-A 통합이 있다는 이유만으로 해소됐다고 단정하지 않는다.

#### [S119] Task 실행 가능성: 무엇을 더 알아야 하나?

<!-- study-meta
layout: split
kind: question
-->

##### 한 문장

Skill-conditioned 변형은 실행 가능한 지시를 유도하지만 판정 규칙의 보장은 미확인이다.

##### 본문

###### 원문에서 확인한 것

Factorized는 행동·대상·배치·손을 재조합하고 skill-conditioned는 원본 skill을 조건으로 변형한다. 둘 다 시작 장면을 조건으로 사용한다.

원래 skill을 유지하거나 정의된 skill set의 다른 실행 가능한 skill로 바꾼다고 설명한다. 두 전략의 출력은 겹칠 수 있다.

##### 보충

###### Q8의 남은 세부

- 사전 정의 skill 목록과 장면별 후보 제한은 무엇인가?
- 실행 가능성은 어떤 모델·규칙·절차로 판정하는가?
- System prompt·few-shot 예시와 강제 제약은 무엇인가?

Sec.3.3·B.3에는 이 세부가 없다. 후속 video quality filtering은 초기 지시의 실행 가능성 판정과 같지 않다.

##### 요점

설계 의도와 구체적인 제약·검증 절차를 구분해 추가 근거를 확인한다.

##### 출처

Sec.3.3 Task Augmentation · PDF p.11; App.B.3 · PDF p.42; Q8

##### 발표 메모

원래 skill을 유지하며 object·location만 바꾼 결과는 factorized로도 만들 수 있어 두 전략을 상호 배타적 집합으로 그리지 않는다. Gemini API의 plausibility8frames/instruction16frames 평가는 초기 생성 prompt의 실행 불가능한 지시 제거 보장과 다르다. B.3는 모델·데이터·학습 설정·filter 학습을 보충하지만 task-generation prompt, skill 목록, feasibility gate를 구체화하지 않는다. 이 범위 밖 구현은 미확인이다.

#### [S120] 수치·집계의 불일치: 그대로 보존한다

<!-- study-meta
layout: full
kind: question
-->

##### 한 문장

표시값을 고쳐 맞추지 말고 원문 위치와 계산상의 차이를 함께 기록한다.

##### 본문

| 위치 | 원문 표기 | 남은 확인 |
| --- | --- | --- |
| Q11 · Fig.7 p.13 | $80.0+9.4+11.6=101.0$ | 본문 8:2와 불일치 |
| Q12 · pp.18,49 | 문장 batch196 / Table8 192 | 실제 실행 설정 |
| Q13 · pp.24,52 | Egg61.1% / 24trials | 분모·반복·집계법 |
| 추가 · Table9 p.53 | Count 가중합 13/18 vs Score16/20 | Count·점수·설명 중 어디인가? |

원문 수치를 임의로 보정하지 않는다. 이는 문서 명세·집계의 한계이며 모델 오동작이나 실험 부정을 입증하지 않는다.

##### 보충

##### 요점

후속 코드·로그·저자 설명이 오기 전에는 보고값과 불확실성을 함께 유지한다.

##### 출처

Fig.7 · PDF p.13; Sec.6.1 · PDF p.18; Fig.18 · PDF p.24; Table 8 · PDF p.49; App.G.4 · PDF p.52; Q11–Q13; App.G.5 · Table 9 · PDF p.53

##### 발표 메모

Q11에서 자체 수집 합계21.0은 본문20과 달라11.6을10.6으로 고치지 않는다. Q12에서 문장196이 반복돼도 Table8의192를 틀렸다고 확정하지 않는다. Q13은 단일24 이진 trials의1회당4.1667%p와61.1의 대응이 불명확하다. 추가로Table9는count9/8/7과14/8/2에1/0.5/0을 적용한13/18과 보고Score16/20이 맞지 않는다. 기존 Q1–13을 임의로 재번호화하거나 중앙 노트를 수정하지 않고 새 확인 사항으로 구별한다.

#### [S121] 추가로 필요한 실험

<!-- study-meta
layout: split
kind: question
-->

##### 한 문장

독립 기여·평가 예산·선별 신뢰성·지연 분포를 확인하면 결론의 범위가 더 명확해진다.

##### 본문

###### 성능 근거를 분해하는 실험

- 같은 데이터·예산에서 MSAT와 모듈 입력·보조 목표를 하나씩 비교.
- 추가 rollout만 BC에 더한 조건과 RECAP을 같은 예산으로 비교.
- Task/scene 증강·quality/motion 필터를 요인별로 비교.
- Motion classifier의 별도 test set·precision/recall·실패 유형 보고.

##### 보충

###### 신뢰도·실행을 확인하는 실험

- 평가 episode 수·실패/timeout 처리·seed와 신뢰구간 공개.
- Batch 비교의 샘플·update·compute 예산 통제.
- 세 기능이 동시에 필요한 과제의 상호작용 평가.
- 카메라→모터 end-to-end와 p95/p99, BoN 성능·지연 절충 보고.

<p class="label interpretation">후속 검증 제안이며 실행 완료 결과가 아님</p>

##### 요점

추가 실험은 어떤 조건에서 왜 유효한지 더 선명하게 하기 위한 것이다.

##### 출처

Sec.6.5 · PDF pp.24–26; App.E · PDF pp.45–46; App.G.3–G.6 · PDF pp.51–55; Q1·Q2·Q3·Q10

##### 발표 메모

후속 제안은 논문의 관찰과 명세 한계에 근거한 우리의 해석이다. 평가 분포 밖 일반화, classifier calibration, 새 embodiment 적응 효과 등을 확인된 결론으로 만들지 않는다. 이 발표는 원문·질문노트를 검토해 정리한 초안이며 논문 학습·실험의 재현을 실행한 결과가 아니다. 유망한 통합 성과와 독립 인과 기여·재현 설정·집계 불확실성의 남은 과제를 함께 기록한다.
