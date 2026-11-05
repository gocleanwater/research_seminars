# Inference Strategy

원문의 설명·실험 결과, 저자의 해석, 우리의 해석·설명용 예시, 미해결 질문을 구분한다. 저자의 설계 의도나 주장과 실험으로 확인된 결과를 동일시하지 않으며, 미확인 사항과 문서의 표기 불일치는 근거와 함께 남긴다.

## [P020] 추론 최적화

<!-- slide-meta
layout: split
kind: fact
source_ids: S072, S073, S074, S075, S076, S077, S078, S079, S080, S081
-->

### 한 문장

연산을 제출하는 호출 비용과, 연산 사이 데이터를 옮기는 비용을 서로 다른 수준에서 줄인다.

### 본문

#### 호출 비용 — CUDA Graph

<figure class="optimization-figure"><img src="/figures/fig-09.png" alt="Figure 9: 분리된 graph 호출과 하나로 포착한 graph의 비교"></figure>

고정된 RoPE·mask 준비를 forward 밖으로 옮겨, **한 forward를 하나의 CUDA Graph**로 capture한다.

<p class="mini">실제 Q/K·attention 계산은 계속한다. 한 graph 안에도 여러 kernel이 있으며 denoising도 반복한다.</p>

### 보충

#### 메모리 이동 — Kernel Fusion

<figure class="optimization-figure"><img src="/figures/fig-10.png" alt="Figure 10: 분리된 연산의 global-memory 왕복과 fusion의 on-chip 재사용"></figure>

RMSNorm·RoPE·attention 등을 묶어 **중간 Q/K의 저장·재읽기**를 줄인다.

<p class="mini">Memory-bound는 대역폭 병목이다. 일부 경계는 custom kernel로 묶고, 나머지는 Torch Compile을 쓴다.</p>

### 요점

Graph는 호출 구조를, fusion은 연산 사이 데이터 이동을 바꾼다. 실제 지연 감소는 뒤에서 측정 결과로 확인한다.

### 출처

Sec.5 · Figs.9–10 · PDF pp.15–17; App.F · Table7 · PDF p.47

### 발표 메모

기존 P020/P021을 통합하고 S072–081의 graph/kernel/launch, short prefill, compute/memory-bound, compile, FlashAttention, 실제8개kernel 해설을 보존한다. Attention 내부의 FlashAttention 최적화와 주변 연산까지 아우르는 fusion 경계를 구분한다. 여기서는 원리만 설명하고 p50 수치는 P027에서 한 번 읽는다. 그림은 원문이며 클릭하면 원래 크기로 확대된다. Compiler/FlashAttention의 현재 일반 동작까지 확대하지 않고 보고서 workload의 관찰로 한정한다.

### 상세 공부 기록

#### [S072] 관측부터 실행까지의 지연

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

추론 중에도 장면은 움직이므로, 늦은 행동은 오래된 관측에 대한 응답이 된다.

##### 본문

###### 닫힌 고리에 생기는 시간 차

<div class="sequence">
<div class="step">장면 관측</div>
<div class="step">모델 추론</div>
<div class="step">모터 행동 실행</div>
<div class="step">바뀐 장면을 다시 관측</div>
</div>

각 단계의 시간이 더해져 관측 시점과 행동 실행 시점 사이에 지연이 생긴다.

##### 보충

###### 동적 환경에서 중요한 이유

<span class="label example">설명용 예시</span>

움직이는 물체를 보고 도달 위치를 결정해도, 실행할 때 물체는 이미 다른 곳에 있을 수 있다. 지연이 길수록 관측 상태와 현재 상태의 차이가 커질 수 있다.

저자는 **graph capture**로 실행 호출 비용을 줄이고, **kernel 최적화**로 계산·데이터 이동을 개선한다.

<p class="mini">정책 추론 시간과 전체 센서–모터 지연은 같은 측정값이 아니다.</p>

##### 요점

추론 최적화는 같은 관측에 더 빨리 응답하기 위한 시스템 설계다.

##### 출처

Sec.5 · PDF p.15

##### 발표 메모

Table 4의 p50 policy latency에서 전체 제어 지연이나 제어 주기를 계산해 확정하지 않는다. 동적 환경 예시는 본문의 동기를 풀어 쓴 것이다.

#### [S073] 계산 그래프·kernel·launch

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

무슨 연산을 연결할지, GPU에서 무엇을 실행할지, 어떻게 호출할지를 구분한다.

##### 본문

###### 세 층위의 용어

<div class="sequence">
<div class="step"><strong>계산 그래프:</strong> 연산과 tensor 의존 관계</div>
<div class="step"><strong>Kernel:</strong> GPU에서 실행할 작업 코드</div>
<div class="step"><strong>Launch:</strong> kernel이나 포착한 graph 실행을 제출하는 호출</div>
</div>

연산이 빠르더라도 수백 개 호출이 누적되면 지연의 큰 부분을 차지할 수 있다.

##### 보충

###### RLDX-1에서 관찰한 비용

저자는 PyTorch eager가 연산별로 kernel을 호출하고, Torch Compile도 forward를 여러 subgraph로 나누어 호출 overhead를 완전히 없애지 못한다고 보고한다.

최적화 목표는 연산의 의미를 바꾸는 것이 아니라, forward를 하나의 CUDA Graph로 포착해 반복 실행하는 것이다.

<p class="mini">그래프의 노드 수와 실제 kernel 수가 항상 일대일이라는 뜻은 아니다.</p>

##### 요점

연산 자체의 비용과 GPU에 일을 보내는 비용을 분리하면 최적화의 목표가 보인다.

##### 출처

Sec.5.1 · PDF pp.15–16; 용어 구분은 설명을 위한 풀이

##### 발표 메모

Graph capture와 kernel fusion을 동일시하지 않는다. CUDA Graph 하나에 여러 kernel이 들어갈 수 있다. Overhead 제거는 저자의 서술이며 전체 시스템의 모든 host 비용이 0임을 뜻하지 않는다.

#### [S074] 고정 RoPE·mask 설정은 미리 계산

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

배포 설정에서 변하지 않는 준비 계산을 forward 밖으로 옮긴다.

##### 본문

###### 실행마다 같아지는 부분

원문은 고정 배포 설정에서 RoPE와 attention mask 생성의 일부가 매 inference마다 변하지 않는다고 설명한다.

Torch Compile이 configuration 의존 부분을 compile 시점에 완전히 해소하지 못해 graph가 나뉘므로, 필요한 위치 embedding과 mask를 **사전에 계산하고 재사용**한다.

##### 보충

###### 미리 계산하지 않는 부분

새 관측의 hidden states, Q/K tensor, attention score와 최종 행동은 입력마다 달라진다.

<span class="label interpretation">구분을 위한 풀이</span>

고정된 위치용 값의 준비를 재사용하는 것과, 실제 Q/K에 RoPE를 적용하거나 QK attention을 계산하는 것은 다르다.

<p class="callout">“RoPE 사전 계산”을 “관측과 무관한 attention 결과 재사용”으로 해석하지 않는다.</p>

##### 요점

고정 설정은 재사용하고, 입력에 의존하는 신호 계산은 매번 수행한다.

##### 출처

Sec.5.1 · Graph Fragmentation/Static Graph Conversion · PDF p.16

##### 발표 메모

원문이 명시한 configuration-dependent 부분을 넘어 모든 shape와 position이 모든 실행 조건에서 항상 고정이라고 일반화하지 않는다. QK 계산 자체를 사전 고정한다는 오해를 막는다.

#### [S075] CUDA Graph: 여러 호출을 한 번으로

<!-- study-meta
layout: figure
kind: fact
figure: fig-09.png
caption: Figure 9 · Dynamic graph의 호출 간격과 static graph 실행
-->

##### 한 문장

Forward를 하나의 CUDA Graph로 포착해 쪼개진 실행 호출이 쌓이는 비용을 줄인다.

##### 본문

###### Figure 9의 위·아래

**Dynamic:** Graph break로 나뉜 구간마다 launch 비용이 누적된다.

**Static:** 고정 설정 계산을 밖으로 옮겨 forward를 한 CUDA Graph로 포착하고, 추론 step마다 한 번 호출한다.

##### 보충

<p class="callout">한 graph launch에 여러 kernel이 포함된다. Denoising 반복도 계속 수행한다.</p>

##### 요점

Graph capture는 여러 GPU 연산을 재생할 때의 호출 방식을 최적화한다.

##### 출처

Fig.9; Sec.5.1 · PDF pp.15–16

##### 발표 메모

원문의 한 forward pass를 single CUDA Graph로 capture하고 추론 step마다 한 번 호출한다는 서술을 유지한다. 이 그림만으로 denoising loop 전체의 포착 범위를 확대 해석하지 않는다. Kernel 내부 메모리 이동 최적화는 다음 절의 별도 과제다. 그림의 빈 간격은 수치 계산량보다 실행 제출 과정의 비효율에 초점을 둔다.

#### [S076] Short prefill과 autoregressive 생성

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

RLDX-1은 짧은 시퀀스를 한 번에 처리하고, action chunk를 통째로 반복 갱신한다.

##### 본문

###### 언어 모델의 두 과정

<span class="label interpretation">이해를 위한 구분</span>

**Prefill:** 주어진 prompt 토큰을 함께 처리한다. 일반 LLM도 입력 prompt를 토큰 하나씩 생성하는 것은 아니다.

**Autoregressive decode:** 이미 나온 출력 토큰을 조건으로 다음 출력 토큰을 순차적으로 생성한다.

##### 보충

###### RLDX-1의 short prefill workload

보고서는 매 inference iteration에서 짧은 attention 시퀀스의 전체 forward를 한 번에 실행하며, action을 autoregressive token으로 생성하지 않는다고 설명한다.

각 denoising step에서 noisy action chunk 전체를 갱신하고, 이 forward를 반복해 최종 chunk를 얻는다.

<p class="callout">Chunk의 병렬 갱신과 denoising 단계의 순차 반복은 함께 존재한다.</p>

##### 요점

동시에 처리하는 것은 chunk 안의 후보이며, denoising 반복까지 한 번으로 합친다는 뜻은 아니다.

##### 출처

Sec.5.2 · Short-Prefill Workload · PDF p.16; Sec.2.2 · PDF p.8

##### 발표 메모

Text critic의 autoregressive 숫자 예측과 policy 생성을 섞지 않는다. LLM의 모든 과정이 순차라는 대비를 피한다. 정확한 GPU 병렬 실행 형태나 토큰 수는 확정하지 않고, 보고서의 상대적으로 짧은 attention workload라는 설명을 따른다.

#### [S077] Compute-bound와 memory-bound

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

연산 처리량이 한계인 경우와 데이터를 옮기는 속도가 한계인 경우를 나눈다.

##### 본문

###### 계산이 오래 걸릴 때

**Compute-bound:** 많은 곱셈·덧셈을 처리하는 속도가 병목이다. 원문은 VLM·MSAT의 matmul을 이 범주로 설명한다.

<span class="label example">설명용 예시</span>

한번 읽은 값을 여러 번 곱하고 합산할 수 있으면, 데이터 이동보다 계산량이 실행 시간을 지배할 수 있다.

##### 보충

###### 데이터 이동이 오래 걸릴 때

**Memory-bound:** RMSNorm·RoPE·residual처럼 주변 연산의 tensor 읽기·쓰기가 병목이 된다. 짧은 prefill에서는 이런 연산과 matmul이 번갈아 등장한다.

따라서 한 연산만 빨라져도 전체 block의 메모리 왕복이 남을 수 있다.

<p class="callout">여기의 memory는 주로 대역폭·이동 비용이다. VRAM 용량 부족이나 OOM과 다르다.</p>

##### 요점

같은 GPU에서도 연산 종류에 따라 최적화해야 할 병목이 다르다.

##### 출처

Sec.5.2 · Short-Prefill Workload · PDF p.16; 예시는 설명용

##### 발표 메모

일반 roofline 수식이나 성능 임계값을 외부 근거 없이 추가하지 않는다. 모든 matmul이 항상 compute-bound이고 모든 normalization이 항상 memory-bound라는 하드웨어 무관 일반화를 피하며 이 보고서의 workload에 한정한다.

#### [S078] Torch Compile과 fusion 경계

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

자동 compiler도 이 workload에서 유용한 모든 연산 묶음을 찾아내지는 못했다.

##### 본문

###### 원문이 지적하는 두 제한

- **고정된 fusion 경로:** 그래프 구조와 compiler pass 순서가 탐색 가능한 패턴을 제한한다.
- **외부 fused kernel:** attention 같은 연산이 내부를 볼 수 없는 경계가 되어 주변 연산과 통합하기 어렵다.

저자는 short-prefill의 연산 간 데이터 이동을 함께 조정할 기회가 남는다고 본다.

##### 보충

###### 놓칠 수 있는 묶음

<div class="sequence">
<div class="step">Q/K RMSNorm</div>
<div class="step">Q/K RoPE 적용</div>
<div class="step">Attention</div>
</div>

세 연산이 따로 실행되면 중간 Q/K가 global memory를 오간다. 이 연결부를 수동 설계 kernel로 묶는 것이 보고서의 접근이다.

<p class="mini">Torch Compile 일반의 영구적 한계보다 이 구현·workload의 관찰로 읽는다.</p>

##### 요점

자동 최적화가 남긴 병목을 profiling하고 필요한 연산 묶음만 직접 설계한다.

##### 출처

Sec.5.2 · Fixed Fusion Path · PDF p.16

##### 발표 메모

외부 API의 최신 동작이나 모든 버전에 대한 보장을 말하지 않고 보고서 설명에 한정한다. Compiler의 한계를 측정하지 않은 조건까지 확대하지 않는다.

#### [S079] FlashAttention과 주변 연산의 fusion

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

Attention 내부가 최적화되어도, 그 앞뒤 tensor 이동은 별도의 최적화 기회로 남는다.

##### 본문

###### 이미 묶여 있는 attention

원문은 FlashAttention 같은 외부 fused attention kernel을 예로 든다. 이때 compiler는 내부 구현을 보지 못하는 opaque 연산으로 다룬다고 설명한다.

Attention 자체를 빠르게 실행하는 것과, attention 전후 연산을 통합하는 것은 서로 다른 경계의 문제다.

##### 보충

###### 그 경계를 넘으면?

<div class="sequence">
<div class="step">Q/K 정규화 → RoPE 적용 → Attention</div>
</div>

이 사이 중간 결과의 global-memory 저장·재읽기를 줄이려면, 주변 연산과 attention의 데이터 흐름을 함께 설계해야 한다.

<p class="callout">특정 workload의 cross-operator fusion에 관한 주장이다. FlashAttention 자체가 느리다는 결론은 아니다.</p>

##### 요점

최적화된 한 연산이 있어도 연산 사이의 경계 비용은 남을 수 있다.

##### 출처

Sec.5.2 · Fixed Fusion Path · PDF p.16; Fig.10 · PDF p.16

##### 발표 메모

FlashAttention 내부의 tiling이나 IO complexity 등 추가 주장은 이 장에서 다루지 않고 RLDX-1 보고서 설명에 한정한다. 최신 compiler나 FlashAttention API의 일반 동작을 설명하는 장이 아니다.

#### [S080] Kernel fusion: 중간 메모리 왕복 줄이기

<!-- study-meta
layout: figure
kind: fact
figure: fig-10.png
caption: Figure 10 · 연산 분리의 global-memory 왕복과 fusion의 on-chip 재사용
-->

##### 한 문장

정규화·위치 적용·attention을 묶으면 중간 Q/K를 global memory에 반복 저장하지 않아도 된다.

##### 본문

###### Figure 10의 데이터 흐름

**(a) 별도 kernel:** RMSNorm 결과 저장 → 재읽기 → RoPE 결과 저장 → 재읽기 → attention.

**(b) fused kernel:** 필요한 입력을 읽고 중간 tensor를 on-chip에 유지하며 계산한 뒤 최종 출력을 저장한다.

핵심은 같은 수학 연산 사이의 불필요한 메모리 왕복을 줄이는 것이다.

##### 보충

<p class="mini">그림은 fusion 대상 block의 개념도다. 모델 전체의 모든 tensor를 한 번만 읽는다는 뜻은 아니다.</p>

##### 요점

Kernel fusion은 계산의 연결 순서와 중간 결과의 저장 위치를 함께 최적화한다.

##### 출처

Fig.10; Sec.5.2 · PDF pp.16–17

##### 발표 메모

원문은 on-chip reuse와 compute ordering도 함께 설계한다고 설명한다. 입력 한 번·출력 한 번이라는 그림은 fusion 대상 block 기준이다. Cache·메모리 트래픽의 정확한 계측값을 새로 주장하지 않는다. RMSNorm·RoPE·attention 결합은 Table 7의 fused\_llm\_attention에 연결한다.

#### [S081] 실제 custom kernel 목록

<!-- study-meta
layout: split
kind: fact
-->

##### 한 문장

Profiling으로 찾은 일부 연산 묶음만 수동 kernel로 바꾸고, 나머지는 Torch Compile에 둔다.

##### 본문

###### Attention 계열

- **fused\_vision\_attention:** Q/K RoPE + attention
- **fused\_llm\_attention:** Q/K RMSNorm + RoPE + attention
- **fused\_memory\_attention:** Q/K RoPE + attention

NVIDIA Nsight Compute로 비효율적인 operator group을 찾아 교체한다.

##### 보충

###### Residual·norm·MLP 계열

- **fused\_add2\_layernorm:** 두 항 덧셈 + LayerNorm
- **fused\_add2\_rmsnorm:** 두 항 덧셈 + RMSNorm
- **fused\_add3\_rmsnorm:** 세 항 덧셈 + RMSNorm
- **grouped\_swiglu / fused\_mlp\_swiglu:** SwiGLU 처리 묶음

<p class="mini">서로 다른 block의 kernel이며, 모든 attention에 RMSNorm을 추가한다고 읽지 않는다.</p>

##### 요점

전체를 다시 작성하기보다 실제 병목의 연산 경계를 선택적으로 바꾼다.

##### 출처

Sec.5.2 · PDF pp.16–17; App.F Table7 · PDF p.47

##### 발표 메모

Table 7의 총 8개 kernel을 모두 반영했다. $h_{\mathrm{ds}}$가 더해지는 add3는 별도의 세 번째 입력으로만 설명하고 그 의미를 추가 확정하지 않는다. grouped\_swiglu는 $y_1=\operatorname{SwiGLU}(z_1)$, $y_2=\operatorname{SwiGLU}(z_2)$를 함께 처리한다. fused\_mlp\_swiglu의 표는 SwiGLU를 수동 kernel로 실행함을 나타낸다. 개별 kernel의 속도 배수는 이 표에 없다.
