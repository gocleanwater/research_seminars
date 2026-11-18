# 논문 공부와 HTML 슬라이드 작업 시작하기

현재 공통 지침은 `AGENTS.md` → `docs/SEMINAR_PLAYBOOK.md` → `docs/FEEDBACK_LESSONS.md` 순서로 읽는다. RLDX-1은 이미 제작된 프로젝트이므로 빈 템플릿으로 덮어쓰지 않는다. Obsidian 설치 없이 사용할 수 있다.

## 기존 RLDX-1을 다른 채팅에서 재개할 때

```text
이 논문 공부와 HTML 슬라이드 제작을 이어가자.

공통 작업 폴더:
/Users/jungsoo_ko/Desktop/research_seminars

먼저 공통 AGENTS.md와 docs/SEMINAR_PLAYBOOK.md,
docs/FEEDBACK_LESSONS.md를 읽어줘.
대상 논문 폴더의 AGENTS.md, PROJECT.md, OUTLINE.md,
review/PROGRESS.md, review/FEEDBACK.md에서 최신 상태와 편집 원본을 확인해줘.
RLDX-1의 작업 폴더는 rldx-1-seminar이고 이미 발표자료가 있으니 재개부터 해줘.

공부할 때는 research_wiki/study/README.md에 따라
Section을 마칠 때마다 이해한 내용·질문/답변·수식 풀이·원문 근거·정정·미해결을
Markdown으로 저장해줘. 과거 대화의 없는 내용을 지어내지 마.

새 발표를 만들 때는 공부 기록을 바탕으로 전체 목차를 먼저 협의하고,
전체 맥락의 초안을 만든 뒤 장별로 수정하자.
발표 시간이나 장수를 먼저 제한하지 말고, 상세 기록을 슬라이드 수로
일대일 변환하지 마. 화면·공부 기록·대본을 나눠 이해와 흐름을 유지해줘.

수정한 실제 HTML 화면을 PNG로 보여주고 피드백과 검증을 기록해줘.
생성 HTML만 직접 고치지 말고 현재 canonical source를 수정해줘.
이번 작업에 적용할 피드백 규칙을 먼저 확인하고 같은 실수를 반복하지 마.
공개·설치·이관은 현재 요청과 대상 프로젝트의 유효한 권한 범위를 먼저 확인해줘.
```

## 새 논문 작업 환경 만들기

이 폴더에서:

```sh
python3 scripts/new_seminar.py /원하는/경로/new-paper-seminar --title '논문 제목'
```

기존 폴더는 덮어쓰지 않는다. 새 폴더의 START_HERE.md를 공부했던 채팅에서 먼저 읽게 하면 된다. 그 안에서 의존성을 설치한 뒤 build → check → verify를 실행한다. 자세한 명령과 반복 흐름은 [하네스 안내](seminar-template/README.md)를 따른다.

- Section 공부는 study/ 또는 지정한 중앙 연구 위키에 저장한다.
- 화면·단계·대본·출처는 sections/*.md 한 원본에서 관리한다.
- 그림과 수학 글꼴을 내장한 오프라인HTML, Part별 파일과 대본을 생성한다.
- 수정 요청과 좋은 평가를 함께 기록한다. 정리 명령은 공부/피드백/현재 발표를 제외한다.
- 자동 검증 외에 원문·의미·중복·자연스러운 흐름을 함께 검토한다. 원격 저장소/Pages는 자동 생성·게시하지 않는다.

## 범위

Section 공부 기록은 `../research_wiki/study/`에 쌓는다. 기존 질문노트와 발표용 sections/는 보존한다. 전체 연구 위키 앱 구현·Notion 이관·Obsidian 설치는 이 구조에 포함하지 않는다. 지침은 해당 프로젝트에서 작업하는 에이전트가 읽는 방식이며 모든 무관한 채팅에 자동 주입되는 기능은 아니다.
