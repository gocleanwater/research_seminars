# 슬라이드 색인 — v17

MD 원본 → HTML. 전체 도식 확대 단계는 P032 안에서 방향키로 이동한다. 개별 결과물은 사용자 검토 전이다.

| 순서 | ID | 섹션 | 제목 | MD 원본 | 상세 단위 |
| --- | --- | --- | --- | --- | --- |
| 1 | S001 | 표지 | RLDX-1 Technical Report | content/cover.html | — |
| 2 | P002 | Problems | 기존 VLA의 문제 | sections/01-problems.md | S002, S003, S004 |
| 3 | P031 | RLDX-1 Architecture | RLDX-1 Overview | sections/02-rldx-1-architecture.md | S122, S005, S006, S007 |
| 4 | P032 | RLDX-1 Architecture | RLDX-1 Architecture | sections/02-rldx-1-architecture.md | S016, S035, S040 |
| 5 | P048 | RLDX-1 Architecture | Vision Encoder | sections/02-rldx-1-architecture.md | S011 |
| 6 | P049 | RLDX-1 Architecture | Motion Module | sections/02-rldx-1-architecture.md | S012 |
| 7 | P050 | RLDX-1 Architecture | Motion Module의 Residual | sections/02-rldx-1-architecture.md | S013 |
| 8 | P051 | RLDX-1 Architecture | VLM과 로봇 VQA | sections/02-rldx-1-architecture.md | S008 |
| 9 | P052 | RLDX-1 Architecture | Cognition Tokens | sections/02-rldx-1-architecture.md | S009 |
| 10 | P053 | RLDX-1 Architecture | Cognition Features의 추출 | sections/02-rldx-1-architecture.md | S010 |
| 11 | P054 | RLDX-1 Architecture | VLM의 시간 정보 | sections/02-rldx-1-architecture.md | S014 |
| 12 | P055 | RLDX-1 Architecture | 과거 프레임 압축 | sections/02-rldx-1-architecture.md | S015 |
| 13 | P056 | RLDX-1 Architecture | Memory Module | sections/02-rldx-1-architecture.md | S017 |
| 14 | P057 | RLDX-1 Architecture | Memory Module의 계산 | sections/02-rldx-1-architecture.md | S019 |
| 15 | P058 | RLDX-1 Architecture | Memory의 시간 범위 | sections/02-rldx-1-architecture.md | S018 |
| 16 | P059 | RLDX-1 Architecture | Context·Cognition·Memory | sections/02-rldx-1-architecture.md |  |
| 17 | P009 | RLDX-1 Architecture | MSAT의 입력 | sections/02-rldx-1-architecture.md | S031, S032, S037, S038 |
| 18 | P010 | RLDX-1 Architecture | MSAT의 Joint Attention | sections/02-rldx-1-architecture.md | S033, S034, S039 |
| 19 | P006 | RLDX-1 Architecture | Action Model의 학습 원리 | sections/02-rldx-1-architecture.md | S020, S021, S022, S023, S024, S025, S026, S028 |
| 20 | P008 | RLDX-1 Architecture | Action Model의 추론 수식 | sections/02-rldx-1-architecture.md | S027, S029, S030 |
| 21 | P071 | RLDX-1 Architecture | Action Chunk의 실행 | sections/02-rldx-1-architecture.md | S071 |
| 22 | P013 | Training Data | 학습 데이터 | sections/03-training-data.md | S041, S043 |
| 23 | P033 | Training Data | 공개 실제 데이터 | sections/03-training-data.md |  |
| 24 | P034 | Training Data | 자체 실제 데이터 | sections/03-training-data.md | S042 |
| 25 | P072 | Training Data | 로봇용 영상 생성 모델 | sections/03-training-data.md |  |
| 26 | P073 | Training Data | 영상 생성 모델의 학습 | sections/03-training-data.md |  |
| 27 | P014 | Training Data | Task·Scene Augmentation | sections/03-training-data.md | S044, S045, S046, S047, S048, S049, S050 |
| 28 | P074 | Training Data | IDM과 행동 라벨 | sections/03-training-data.md | S051 |
| 29 | P045 | Training Data | 영상 품질 검사 | sections/03-training-data.md | S052 |
| 30 | P015 | Training Data | 합성 데이터 검증 | sections/03-training-data.md | S055 |
| 31 | P046 | Training Data | 움직임 일치 검사 | sections/03-training-data.md | S053 |
| 32 | P047 | Training Data | 일치 검사기의 학습 | sections/03-training-data.md | S054 |
| 33 | P035 | Training Procedure | 학습 단계 | sections/04-training-procedure.md | S056 |
| 34 | P016 | Training Procedure | Pre-training | sections/04-training-procedure.md | S057, S059 |
| 35 | P036 | Training Procedure | 로봇별 입출력 경로 | sections/04-training-procedure.md | S058, S036 |
| 36 | P017 | Training Procedure | Mid-training | sections/04-training-procedure.md | S060, S061, S062, S063, S064 |
| 37 | P018 | Training Procedure | Post-training | sections/04-training-procedure.md | S065, S066 |
| 38 | P019 | Training Procedure | RECAP | sections/04-training-procedure.md | S067, S068, S070 |
| 39 | P037 | Training Procedure | Critic과 Figure 8 | sections/04-training-procedure.md | S069 |
| 40 | P075 | Training Procedure | PEFT와 LoRA | sections/04-training-procedure.md |  |
| 41 | P076 | Training Procedure | PEFT의 성능 비교 | sections/04-training-procedure.md | S108 |
| 42 | P077 | Training Procedure | PEFT의 학습 비용 | sections/04-training-procedure.md |  |
| 43 | P020 | Inference Strategy | CUDA Graph | sections/05-inference-strategy.md | S072, S073, S074, S075 |
| 44 | P038 | Inference Strategy | Kernel Fusion | sections/05-inference-strategy.md | S076, S077, S078, S079, S081 |
| 45 | P039 | Inference Strategy | Kernel Fusion의 계산 | sections/05-inference-strategy.md | S080 |
| 46 | P078 | Inference Strategy | 실제 Fused Kernels | sections/05-inference-strategy.md |  |
| 47 | P040 | Evaluation and Analysis | 시뮬레이션 벤치마크 | sections/06-evaluation-and-analysis.md | S082 |
| 48 | P079 | Evaluation and Analysis | 시뮬레이션의 실행 설정 | sections/06-evaluation-and-analysis.md |  |
| 49 | P080 | Evaluation and Analysis | Baseline 결과의 출처 | sections/06-evaluation-and-analysis.md |  |
| 50 | P022 | Evaluation and Analysis | Simulation 결과 | sections/06-evaluation-and-analysis.md | S083, S084, S085, S086, S087 |
| 51 | P091 | Evaluation and Analysis | 환경 변화별 성능 | sections/06-evaluation-and-analysis.md | S114 |
| 52 | P092 | Evaluation and Analysis | SIMPLER의 과제별 결과 | sections/06-evaluation-and-analysis.md |  |
| 53 | P093 | Evaluation and Analysis | Kitchen·GR-1의 과제별 편차 | sections/06-evaluation-and-analysis.md |  |
| 54 | P094 | Evaluation and Analysis | 복합 작업의 남은 어려움 | sections/06-evaluation-and-analysis.md | S115 |
| 55 | P041 | Evaluation and Analysis | 실제 로봇 | sections/06-evaluation-and-analysis.md |  |
| 56 | P082 | Evaluation and Analysis | 실제 로봇의 실험 조건 | sections/06-evaluation-and-analysis.md |  |
| 57 | P042 | Evaluation and Analysis | OpenArm 과제 | sections/06-evaluation-and-analysis.md | S088 |
| 58 | P081 | Evaluation and Analysis | OpenArm의 시연과 평가 | sections/06-evaluation-and-analysis.md |  |
| 59 | P023 | Evaluation and Analysis | OpenArm 결과 | sections/06-evaluation-and-analysis.md | S089 |
| 60 | P043 | Evaluation and Analysis | ALLEX 과제 | sections/06-evaluation-and-analysis.md | S090, S091 |
| 61 | P024 | Evaluation and Analysis | ALLEX 결과 | sections/06-evaluation-and-analysis.md | S092 |
| 62 | P044 | Evaluation and Analysis | Franka 과제 | sections/06-evaluation-and-analysis.md | S093, S094 |
| 63 | P025 | Evaluation and Analysis | Franka 결과 | sections/06-evaluation-and-analysis.md | S095, S096 |
| 64 | P026 | Ablation and Analysis | Ablation and Analysis | sections/07-ablation-and-analysis.md | S097, S107 |
| 65 | P060 | Ablation and Analysis | VLM의 특징 추출 층 | sections/07-ablation-and-analysis.md | S098 |
| 66 | P061 | Ablation and Analysis | 로봇 VQA의 효과 | sections/07-ablation-and-analysis.md | S099 |
| 67 | P062 | Ablation and Analysis | VQA 전후의 Attention | sections/07-ablation-and-analysis.md | S100 |
| 68 | P063 | Ablation and Analysis | 합성 데이터 규모 실험 | sections/07-ablation-and-analysis.md | S101 |
| 69 | P064 | Ablation and Analysis | 합성 데이터의 성능 효과 | sections/07-ablation-and-analysis.md | S102 |
| 70 | P083 | Ablation and Analysis | 합성 데이터의 실제 로봇 검증 | sections/07-ablation-and-analysis.md |  |
| 71 | P084 | Ablation and Analysis | 합성 데이터의 실제 결과 | sections/07-ablation-and-analysis.md | S112 |
| 72 | P090 | Ablation and Analysis | Batch Size의 효과 | sections/07-ablation-and-analysis.md | S113 |
| 73 | P065 | Ablation and Analysis | RL 평가 작업 | sections/07-ablation-and-analysis.md | S103 |
| 74 | P070 | Ablation and Analysis | RECAP 결과의 지표 | sections/07-ablation-and-analysis.md |  |
| 75 | P066 | Ablation and Analysis | RECAP 반복 결과 | sections/07-ablation-and-analysis.md | S104 |
| 76 | P067 | Ablation and Analysis | RECAP 개선의 의미 | sections/07-ablation-and-analysis.md |  |
| 77 | P085 | Ablation and Analysis | Best-of-N | sections/07-ablation-and-analysis.md | S109 |
| 78 | P086 | Ablation and Analysis | BoN의 Temperature | sections/07-ablation-and-analysis.md |  |
| 79 | P087 | Ablation and Analysis | BoN의 Offline 분석 | sections/07-ablation-and-analysis.md | S110 |
| 80 | P088 | Ablation and Analysis | BoN의 실제 로봇 결과 | sections/07-ablation-and-analysis.md | S111 |
| 81 | P089 | Ablation and Analysis | BoN이 돕는 조건 | sections/07-ablation-and-analysis.md |  |
| 82 | P027 | Ablation and Analysis | 추론 지연 측정 | sections/07-ablation-and-analysis.md | S105 |
| 83 | P068 | Ablation and Analysis | 추론 최적화의 단계별 효과 | sections/07-ablation-and-analysis.md | S106 |
| 84 | P069 | Ablation and Analysis | 추론 최적화의 해석 | sections/07-ablation-and-analysis.md |  |
| 85 | P029 | Conclusion | Conclusion | sections/08-conclusion.md | S116, S117 |
| 86 | P028 | My opinions and limitation | 나의 의견 | sections/09-my-opinions-and-limitation.md |  |
| 87 | P030 | My opinions and limitation | 한계와 미해결 질문 | sections/09-my-opinions-and-limitation.md | S118, S119, S120, S121 |
