# Part Overview and Q&A Implementation Plan

**Goal:** 첫 장에 두 Part의 주제별 바로가기,2쪽에 Part1 표시, 각 Part의 시작/끝 구분과 Q&A를 넣는다.

**Architecture:** S001 표지에 주제 링크를 추가하고 P097(Part1 시작), P098(Part1 Q&A), P099(Part2 시작), P100(Part2 Q&A) 네 장을 Section MD에 넣는다. Part1은 S001–P098 18장, Part2는 P099–P100 31장, 전체49장이다. 분리본의 외부 Part 해시 링크는 형제 파일의 해당 해시로 연결한다. 기존121단위와 내용은 유지한다.

**Spec:** 2026-11-18 현재 사용자 요청. 기존 구조/공통H22·H23·H25 적용. 사용자 결과물 검토 전.

**Tech Stack:** 기존 Markdown→HTML/CSS/JS 및 Part exporter. 별도 프레임워크 추가 없음.

- [x] 현재 표지·Part 경계·탐색·대본·검증 확인 및 변경 전 기록 보존.
- [x] 첫 장 클릭 목차와 시작/Q&A 4장을 만들고 대본/현재 번호 안내 정렬.
- [x] 분리본 링크와 경계 생성기를 새 구분에 맞추고 기존 형식도 지원.
- [x] 전체/분리본 목차 클릭·키보드·Part 경계·QA 끝·화면·121기록 보존 검증.
- [x] 현재 기록·피드백과 검증 정리 완료. commit/push는 최종 단계다.
