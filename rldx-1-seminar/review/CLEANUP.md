# 작업 폴더 정리

## 2026-11-18 / 최신 정리와 보존 확인

- 범위: 현재 작업 중인 `research_seminars/rldx-1-seminar`. 연구 위키와 다른 프로젝트는 정리하지 않음.
- 제거: Git이 추적하지 않는 오래된 재생성 PNG 미리보기, 한 임시 초안 캡처, Python bytecode·Slidev 가상 모듈 캐시. **706개 파일 · 90.0MiB(94.4MB)**.
- 보존: 피드백 원문 전체, 검증MD/JSON, 피드백에서 직접 참조한 기존 화면, 이전 정리에서 보존한4개 화면 폴더, 유형별 최신 검토 화면. 공부121단위·버전별 소스·원문/그림/글꼴·대본·발표HTML·빌드도구/의존성·Git이력 유지.
- `node_modules/`는 현재 빌드/검증에 쓰므로 설치된 의존성 자체는 남기고 `.slidev/` 캐시만 정리. 최신 발표HTML은 재생성 가능하더라도 실제 발표 진입점이므로 삭제하지 않음.
- 정리 전후의 보존 파일 **329개 SHA-256 동일**. 의도적으로 갱신한 지침/피드백/진행/정리 문서는 비교 예외로 명시. 기존 피드백은 prefix 비교로 전체 보존 확인.
- 소스·대본·보호 구간·원본121단위 검사 통과. 현재 로컬 part-2.html 응답200 확인. 발표 내용 변경은 없으므로 전체 화면 렌더를 반복하지 않음.
- 공통 제작 지침/템플릿에 직접 칭찬받은 전환 문장과 간결한 의견, 명칭/역할 구분, 비교 도식, 실험/ablation 설명 방식을 기록. 개인 재개용 메모에도 경로와 핵심 선호를 남김.
- 삭제 작업을 예약하거나 상시 자동 정리를 추가하지 않음. 이전 피드백에 등장하는 정리된 구버전 PNG 경로는 과거 검토 당시 경로이며 원문·버전별 소스/피드백은 보존됨.

| 정리한 경로 | 파일 수 | MiB |
| --- | --- | --- |
| `review/previews/section-titles-v41` | 8 | 0.21 |
| `review/previews/section-titles-v40` | 8 | 0.21 |
| `review/previews/deck-v40` | 55 | 6.34 |
| `review/previews/architecture-v38` | 35 | 4.90 |
| `review/previews/navigation-v38` | 2 | 0.19 |
| `review/previews/navigation-v36` | 2 | 0.19 |
| `review/previews/architecture-v39` | 35 | 4.90 |
| `review/previews/architecture-v37` | 36 | 4.98 |
| `review/previews/deck-v41` | 54 | 6.21 |
| `review/previews/navigation-v37` | 2 | 0.19 |
| `review/previews/navigation-v39` | 2 | 0.19 |
| `review/previews/deck-v39` | 48 | 6.26 |
| `review/previews/deck-v37` | 47 | 6.24 |
| `review/previews/navigation-v41` | 2 | 0.19 |
| `review/previews/deck-v36` | 50 | 6.91 |
| `review/previews/deck-v38` | 46 | 6.09 |
| `review/previews/navigation-v40` | 2 | 0.20 |
| `review/previews/inference-v41` | 6 | 0.74 |
| `review/previews/overview-v39` | 6 | 0.60 |
| `review/previews/navigation-v35` | 2 | 0.19 |
| `review/previews/navigation-v33` | 2 | 0.19 |
| `review/previews/navigation-v34` | 2 | 0.19 |
| `review/previews/architecture-v33` | 40 | 5.38 |
| `review/previews/architecture-v34` | 39 | 5.55 |
| `review/previews/deck-v34` | 48 | 7.60 |
| `review/previews/deck-v33` | 47 | 7.49 |
| `review/previews/deck-v35` | 46 | 6.89 |
| `review/previews/overview-v40` | 6 | 0.60 |
| `scripts/__pycache__` | 7 | 0.06 |
| `node_modules/.slidev` | 20 | 0.00 |
| `review/previews/inference-v42/fusion-draft.png` | 1 | 0.12 |

## 이전 정리 기록 — 원문 보존

# 작업 폴더 정리 — 2026-11-17

사용자가 현재 작업 디렉터리의 불필요한 파일 정리를 요청했다. 대상은 `research_seminars`와 하위 프로젝트이며, 연구 위키나 외부 폴더는 정리하지 않았다.

- 제거: 이전 버전의 재생성 가능한 PNG 미리보기, `dist/`, 검증 임시 산출물·로그, Python bytecode 캐시, Finder 메타데이터, 취소된 Canva 출력물, 중복 업로드용 site/ZIP.
- 제거 수와 크기: 2,115개 파일, 351.3 MiB(368.3 MB). Git 과거 이력의 객체는 삭제하지 않았다.
- 보존: 발표 Markdown/HTML, 대본, 그림·글꼴 원본, 피드백·검증 기록 MD, 이전 버전 소스, 공통 템플릿과 하네스, Git 이력.
- 보존한 화면: `previews/problems-v29/`, `previews/architecture-v29/`, `previews/navigation-v29/`, `previews/deck-v28/`. 현재 단계별 미리보기와 직전 전체 발표 화면을 유지한다.
- 다음 수정에 필요한 `node_modules/`는 유지한다. 자동 삭제 예약 작업을 만들지 않는다.
- 기존 도구가 사용할 `qa/full-deck/`와 `qa/math/`는 빈 임시 폴더로 남긴다. 패키지·업로드 폴더는 필요할 때 기존 도구로 다시 생성한다.
- 과거 피드백 기록의 PNG 경로는 당시 검토 기록이다. 정리한 이전 PNG는 더 이상 로컬에 없지만 Markdown·버전별 소스 기록은 보존한다.
- 정리 직후 보존 대상 tracked 파일 268개의 SHA-256이 정리 전과 동일함을 확인했다. 이어서 재생성 결과물이 다시 추적되지 않도록 ignore 규칙과 이 정리 기록만 추가했다.

이 정리는 발표 내용 수정이나 새 슬라이드 검증을 의미하지 않는다.
