# Figure 3 네 모듈 설명 개정 — v05

사용자 Browser Comment 1–5와 첨부 주석 그림, hₜ·mₜ concat 정정을 반영한다. 기존 camera transition과 PPT 키 탐색을 유지한다.

- [x] VLM 입력 토큰 행을 확대하고 세 구간의 이름·색·밑줄·화살표를 그림 위에 직접 표시한다.
- [x] 과거 프레임 특징을 하나의 context token으로 **압축**한다고 명시한다. 중간층 cognition token 위치의 출력 특징을 행동 생성에 전달한다고 표현한다. 실제18층 선택은 상세 해설에 보존한다.
- [x] 전체 → Vision → 전체 → VLM → 전체 → Memory → 전체 → MSAT → 전체 순서로 확장한다.4개 모듈 모두 hotspot과 선택 버튼을 둔다.
- [x] Memory는 Qₜ, 현재hₜ, causal Transformer의mₜ, concat(hₜ,mₜ)→C stream을 단계별로 강조한다.
- [x] MSAT는 P/C/A 입력과 Triple-stream, 후반concat(C,A) Double-stream, 변화율 예측·반복denoising을 구분한다. 주석이 한 화면에 몰리지 않게 입력과 블록 설명을 나눈다.
- [x] 본문·MD·모든 설명 상태·버튼·역순 이동·수식·나눔고딕·화면 경계를 실제 HTML에서 확인하고 PNG를 제공한다. 기본/base 빌드와 게시용index를 갱신한다.

MD가 문구 원본이고 JSON은 좌표·상태 구조다. 원본 Fig.3 비트맵은 유지하며 HTML/SVG 주석으로 표시한다. Git commit/push/배포는 사용자가 직접 진행한다.
