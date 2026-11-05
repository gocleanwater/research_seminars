# 버전 보존과 복구

## v22 변경 전: 합성 데이터 검증 대본 통합

- 태그: `rldx-v21-before-synthetic-validation-notes-20261106` (`74b77bf`).
- 75장 버전의 P074/P045/P046을 P015 대본으로 통합한72장이다. 기존 ID는 재사용하지 않고 복원은 새 commit으로 한다. main reset/force-push는 하지 않는다.

## v21 변경 전: 영상 생성 모델 두 장 통합

- 태그: `rldx-v20-before-video-model-merge-20261106` (`c80d812`).
- 76장 버전의14·15쪽을 P072 본문/설명으로 합친75장이다. P073 ID는 재사용하지 않으며 복원은 새 commit으로 한다. main reset/force-push는 하지 않는다.

## v20 변경 전: Memory 대본 통합

- 태그: `rldx-v19-before-memory-speaker-notes-20261106` (`8a6201d`).
- 80장 버전의6–8쪽 P056–P058은4쪽 대본으로,9쪽 P059는 본문/대본에서 제외한76장이 된다. 복원은 새 commit으로 하며 main reset/force-push는 하지 않는다.

## v19 변경 전: VLM 발표 대본 통합

- 태그: `rldx-v18-before-vlm-speaker-notes-20261106` (`aea70d3`).
- 84장 버전에서 현재6–9쪽 P052–P055를4쪽의 VLM 발표 메모로 통합한 뒤80장이 된다. 복원은 새 commit으로 하며 main reset/force-push는 하지 않는다.

## v18 변경 전: Vision 발표 대본 통합

- 태그: `rldx-v17-before-vision-speaker-notes-20261106` (`3c43f0b`).
- 기존5–7쪽이 본문에 있던87장 버전이다. v18은 이를4쪽 발표 메모로 통합한84장이다. 원격 main을 reset/force-push하지 않고 필요한 변경을 새 commit으로 복원한다.

## v17 변경 전 버전

- 태그: `rldx-v16-before-integrated-appendix-20261106`
- 커밋: `35759a6` — Ablation을 상세화한63장
- 이후 v17: 부록을 관련 흐름에24장 추가한87장. 상세121개의 내용은 같다.
- 저장소 루트에서 비교: `git diff rldx-v16-before-integrated-appendix-20261106 -- rldx-1-seminar/sections`
- 복구는 필요한 변경을 새 커밋으로 되돌리며 main을 reset/force-push하지 않는다.

## v16 변경 전 버전

- 태그: `rldx-v15-before-detailed-ablation-20261106`
- 커밋: `c22968a` — Vision·VLM·Memory를 보강한52장, Ablation은2장 요약
- 이후 v16: Ablation을13장으로 나눈63장. 상세121개는 내용이 같다.
- 저장소 루트에서 비교: `git diff rldx-v15-before-detailed-ablation-20261106 -- rldx-1-seminar/sections/07-ablation-and-analysis.md`
- 복구는 필요한 변경을 새 커밋으로 되돌리며 원격 main을 reset/force-push하지 않는다.

## v15 변경 전 버전

- 태그: `rldx-v14-before-vlm-memory-explanation-20261106`
- 커밋: `3e7a412` — rollout 비교를 보강한40장
- 이후 v15: 기존4/5페이지 사이에 Vision·Motion·VLM·VQA·Memory 설명12장을 삽입한52장. 상세121개는 내용이 같다.
- 저장소 루트에서 비교: `git diff rldx-v14-before-vlm-memory-explanation-20261106 -- rldx-1-seminar/sections/02-rldx-1-architecture.md`
- 필요한 변경을 새 커밋으로 되돌리며 원격 main을 reset/force-push하지 않는다.

## v14 변경 전 버전

- 태그: `rldx-v13-before-rollout-explanation-20261106`
- 커밋: `b0a116f` — 평가 과제·로봇 소개를 보강한37장
- 이후 v14: 검증 설명을 영상 품질 → rollout 비교 흐름 → 특징 비교 → 판정기 학습으로 나눈40장. 상세121개 내용은 동일하다.
- 저장소 루트에서 비교: `git diff rldx-v13-before-rollout-explanation-20261106 -- rldx-1-seminar/sections/03-training-data.md`
- 복구는 필요한 변경을 새 커밋으로 되돌린다. 원격 main을 reset/force-push하지 않는다.

## v13 변경 전 버전

- 태그: `rldx-v12-before-evaluation-context-20261106`
- 커밋: `757822d` — 학습·추론 설명 복원,32장
- 이후 v13: Fig.11·12·13·15·17을 본문에 배치하고 benchmark/로봇/과제 맥락을 추가해37장

이전 버전 확인: `git switch -c codex/review-rldx-v12 rldx-v12-before-evaluation-context-20261106`. 최신 복귀: `git switch main`. 공개 복구는 아래 revert 절차를 따른다.

## v12 변경 전 버전

- 태그: `rldx-v11-before-training-inference-20261106`
- 커밋: `eba946c` — MSAT 먼저·공개/자체 데이터 보강,27장
- 이후 v12: 학습 단계 개요·입출력 경로·Fig.8 설명·kernel 원리·합성함수 비교를 분리해32장

이전 버전은 `git switch -c codex/review-rldx-v11 rldx-v11-before-training-inference-20261106`으로 별도 브랜치에서 확인하고 `git switch main`으로 돌아온다. 공개 복구는 아래와 같이 변경 커밋을 검토한 뒤 revert·검증·push한다.

## v11 변경 전 버전

2026-11-06 사용자 요청에 따라 순서·데이터 설명을 바꾸기 전 상태를 보존했다.

- Git 태그: `rldx-v10-before-order-data-20261106`
- 대상 커밋: `5f5a574` — Arial·한글 대체 글꼴이 적용된 v10,25장
- 태그 이후 v11: 구조를 먼저 설명하는 순서, 공개·자체 데이터2장 추가,27장

## 이전 버전 확인

현재 main의 내용을 되감지 않고 별도 브랜치에서 확인한다. 먼저 작업 중 변경 사항이 없는지 확인한다.

```sh
git status
git switch -c codex/review-rldx-v10 rldx-v10-before-order-data-20261106
```

이 브랜치의 rldx-1-seminar/presentation.html 또는 index.html을 열면 이전25장 버전이다. 다시 최신으로 돌아오려면 `git switch main`을 실행한다. 이 확인 작업만으로 공개 사이트는 바뀌지 않는다.

## 공개 사이트까지 복구

태그 이후 변경을 확인한 뒤 해당 변경 커밋을 `git revert <커밋>`으로 되돌리고 검증·push한다. 이미 공유된 main을 reset/force-push하지 않는다. 후속 편집이 쌓였다면 순서만 되돌릴지, 데이터 설명까지 되돌릴지 먼저 범위를 정한다.

```sh
git log --oneline rldx-v10-before-order-data-20261106..main
```

## 화면 순서 비교

| ID | v10 | v11 | 내용 |
| --- | --- | --- | --- |
| P009 | 7 | 5 | MSAT 입력 |
| P010 | 8 | 6 | Joint Attention |
| P006 | 5 | 7 | 학습 수식 |
| P008 | 6 | 8 | 추론 수식 |
| P013 | 9 | 9 | 데이터 종류·직관적 역할 보강 |
| P033 | 없음 | 10 | 공개 실제 데이터 |
| P034 | 없음 | 11 | 자체 실제 데이터 |
| P014 | 10 | 12 | Task·Scene Augmentation |

기존 장 ID·해시 링크는 유지한다. 상세 S002–S122는121개 모두 한 번씩 연결되고, S042만 P013에서 P034로 이동했다.
