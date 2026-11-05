# Figure 3 중심 HTML 개정 계획

**Goal:** 최신 사용자 피드백의 표지·순서·제목·단계적 zoom을 구현하고, 사용자가 직접 research_seminar 저장소에 게시할 파일과 안내를 준비한다.
**Architecture:** 9개 섹션 MD를 직접 편집 원본으로 삼고 단일 HTML 생성기로 연결한다. JSON은 이전 내용의 스냅샷으로 보존한다. 그림 한 장에 camera transform과 단계별 annotation을 추가하고 키보드·클릭을 동일한 상태 전이로 처리한다. 실제 장 ID와 그림 설명 단계는 분리한다.
**Tech Stack:** Python 생성기, HTML/CSS/SVG/JavaScript, Playwright/Chrome, 기존 Slidev 검증.
**Spec:** 현재 사용자 요청의 첨부 그림3개·전체 흐름·짧은 제목 및 페이지 수 제한 해제 지시.

## 작업

- [x] 이전 HTML·JSON·CSS·진행을 보존하고 최신 요구를 피드백에 기록.
- [x] 표지를 Fig.1로 변경하고 Problems·Fig.2·Fig.3 순서 구성. 뒤쪽 영어 section과 명사형 제목, Conclusion/의견 순서 반영.
- [x] Fig.3 전체→Vision→4단계 설명→전체→VLM→입력/초반/압축/18층→전체 상태 구현. hotspot·버튼·키보드가 같은 상태를 사용하고, 이전·리셋·선택 이동을 제공.
- [x] 원문 p.7의9/27·4층압축과 p.24–25의18층을 대조. 30% 위치의 보편적 최적성으로 과장하지 않음.
- [x] reduced-motion·그림 확대·전체 목차 이동·상세 해설·페이지 이동의 충돌 검사. 각 그림 단계 PNG 직접 확인.
- [x] 전체 기본/base 빌드, 실제 PNG/경계/이미지 검사. 브라우저의 하위 경로로 패키지 실행 확인.
- [x] 업로드용 폴더·ZIP 및 Pages 안내 작성. GitHub 생성·push·공개는 사용자가 직접 하며 이번 작업에서 수행하지 않음.

Canva 이전 시도는 한글 일부가 겹치는 문제가 남았으므로 완성본이라고 표시하지 않는다. 사용자의 최신 지시대로 HTML 작업으로 전환한다.
