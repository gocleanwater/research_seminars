# Data and Training Narrative Implementation Plan

**Goal:** Public/In-house는 처음 소개 한 장으로 통합하고, Synthetic Data와 세 학습 단계는 목적→그림의 흐름→결과 순으로 설명한다.

**Architecture:** 기존 Section MD 편집·생성 흐름을 유지한다. P033/P034를 P013에 통합해 전체45장·Part1 16장·Part2 29장으로 구성한다. P072/P014/P015/P047은 각각 합성 개요·Task/Scene 다양화·영상/행동 검증·검사기 학습이라는 서로 다른 질문을 맡는다. P035는 단계 개요, P016/P017/P018은 각 단계, P019/P037은 RL과 critic의 평가를 설명한다.

**Spec:** 2026-11-18 사용자 요청과 학습 단계 비중 답변(Pre/Mid/Post 모두 목적·흐름을 직관적으로). 원문 Sec.3–4.3 PDF pp.9–15.

**Tech Stack:** Markdown, 기존 HTML/CSS renderer, embedded assets, Chromium verification.

## Constraints
- Synthetic은 특정 Task 전용이라는 단정 금지. Task/Scene 다양성·수집 희소성 보완이며 Pre/Mid에도 사용한다.
- 데이터 출처 분류와 학습 단계의 목적을 일대일로 대응시키지 않는다.
- 기존121개 공부 단위, 원문과 이력, 무관한 사용자 대본 편집을 보존한다.
- Part2와 P032·P002는 내용 수정 범위가 아니다. 제목은 짧은 개념명, 화면·발화 순서와 LaTeX 표기를 맞춘다.
- 소개와 상세, 전체 그림과 예시를 같은 결론의 독립 중복 단계로 만들지 않는다.

## Tasks
- [x] PDF와 현재 원본·대본·인접 흐름 확인, 수정 전 버전·121단위 보존.
- [x] P013 데이터 소개에 Public/In-house 통합, Synthetic 생성/증강/검증/검사기 화면과 대본 수정.
- [x] 학습 개요와 각 단계의 목적·흐름, RL/critic 대본 정렬.
- [x] 퇴역 링크·대본·파트 번호·현재 문서 갱신과 121단위 대조.
- [x] 전체 화면·대본·수식·앞뒤 탐색·의미 중복 검토, 사용자 검토 전 상태 기록. commit/push는 최종 단계다.
