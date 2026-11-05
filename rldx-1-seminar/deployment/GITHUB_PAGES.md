# research_seminar에 발표 올리기

`research_seminar` 저장소의 Pages 사이트 안에 `rldx-1-seminar/` 발표를 배치한다. 저장소 생성과 파일 업로드, 게시 설정은 사용자가 GitHub 웹에서 진행한다. 별도 빌드 서비스나 직접 작성한 Actions workflow는 필요하지 않다.

## 1. 최종 HTML을 업로드 패키지로 만들기

발표 수정과 검증을 마친 뒤 프로젝트 폴더에서 실행한다.

```sh
python3 scripts/package_pages.py
```

스크립트는 현재 `presentation.html`을 그대로 복사해 다음 파일을 만든다. CSS·JavaScript·이미지가 포함된 단일 HTML이므로 별도 asset 폴더를 올리지 않는다.

```text
deployment/site/research_seminar/
├── index.html                   # 세미나 목록
├── .nojekyll                    # 완성된 HTML을 그대로 제공하기 위한 표시
└── rldx-1-seminar/
    └── index.html               # 최종 presentation.html의 복사본

output/research_seminar-pages.zip
```

ZIP에는 위 세 파일만 들어가며, 내부 경로는 저장소 루트부터 시작한다. 재실행하면 이 생성 파일과 ZIP을 갱신하고, 기존의 다른 파일·폴더는 삭제하지 않는다. 추가 발표를 수동으로 넣어도 이 ZIP에 자동 포함되지는 않는다.

업로드 대상은 이 세 파일뿐이다. 원문 PDF, 중앙 질문노트, `qa/`, Canva 산출물, 폰트 파일, `node_modules/` 및 개발 프로젝트 전체를 업로드하지 않는다.

HTML의 N 상세 해설에 포함된 내용도 업로드하면 사이트 방문자에게 보인다.

## 2. Public 저장소를 만들고 파일 올리기

1. GitHub에서 **New repository**를 열고 이름을 **`research_seminar`**, 공개 범위를 **Public**으로 정한다. **Add README**를 선택해 `main`이 있는 상태로 생성하면 다음 설정이 간단하다. 저장소 생성 절차는 [GitHub 공식 안내](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)를 참고한다.
2. `research_seminar-pages.zip`을 로컬에서 압축 해제한다. ZIP 자체를 업로드하지 않는다.
3. GitHub 저장소 루트에서 **Add file → Upload files**를 연다. 압축 해제한 결과 중 **`index.html`과 `rldx-1-seminar` 폴더**를 끌어 넣는다. 바깥의 `research_seminar-pages` 또는 `research_seminar` 폴더 전체를 끌어 넣으면 경로가 한 단계 더 생길 수 있다.
4. 업로드 목록이 `index.html`, `rldx-1-seminar/index.html`인지 확인한다. 변경을 `main`에 반영하도록 선택하고 화면의 **Commit changes** 또는 **Propose changes**로 저장한다. 새 branch를 선택했다면 해당 변경을 `main`에 합친 뒤 진행한다.
5. 숨김 파일 **`.nojekyll`**도 저장소 루트에 넣는다. macOS Finder에서 **⌘⇧.**으로 숨김 파일을 표시해 업로드할 수 있다. 이미 업로드됐다면 아래의 별도 생성은 생략한다.

GitHub는 웹에서 파일·폴더 드래그 업로드를 지원하며, 파일당 상한은 **25 MiB**, 한 번에 최대 **100개 파일**이다. 현재 발표 HTML은 약 **20.4 MiB**로 제한 아래이며, 실행한 packager가 최종 크기를 출력한다. [업로드 방법과 제한](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

### 숨김 파일을 직접 만들려면

저장소 루트의 **Add file → Create new file**에서 파일명을 `.nojekyll`로 입력하고 빈 파일로 저장한다. 파일명 앞의 점을 포함하고 `.txt`를 붙이지 않는다. 편집기에서 빈 파일을 저장하기 어렵다면 패키지의 빈 `.nojekyll`을 Finder의 숨김 파일 표시 기능으로 찾아 업로드한다. [웹에서 파일 생성](https://docs.github.com/en/repositories/working-with-files/managing-files/creating-new-files), [빈 `.nojekyll`을 게시 원본 루트에 두는 방법](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

GitHub에 올라간 구조는 다음과 같아야 한다.

```text
research_seminar (저장소)
├── README.md                    # 생성 시 선택했다면 존재
├── index.html
├── .nojekyll
└── rldx-1-seminar/
    └── index.html
```

## 3. Pages를 켜기

저장소의 **Settings → Pages**로 이동한다. **Build and deployment**에서 다음과 같이 선택하고 **Save**를 누른다.

| 항목 | 선택 |
| --- | --- |
| Source | **Deploy from a branch** |
| Branch | **main** |
| Folder | **/(root)** |

게시가 완료되면 같은 화면의 사이트 링크로 접속한다. 이 방식은 `main`의 완성된 정적 파일을 게시하므로 저장소에 workflow 파일을 추가할 필요가 없다. GitHub 내부의 게시 처리에는 시간이 걸릴 수 있다. [게시 원본 설정 공식 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

계정 이름을 `<사용자>`에 넣으면 주소는 다음과 같다.

- 목록: `https://<사용자>.github.io/research_seminar/`
- 발표: `https://<사용자>.github.io/research_seminar/rldx-1-seminar/`

발표 주소를 브라우저에서 열어 슬라이드 이동, N 상세 해설, 그림 확대·Figure 3의 상호작용을 확인한다. 404라면 먼저 `main` 루트에 파일이 있는지, 경로에 압축 해제 폴더가 추가되지 않았는지, Pages가 `main / (root)`를 보는지 확인한다. [공식 404 확인 항목](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)

## 여러 발표를 같은 저장소에 두기

저장소당 Pages **사이트**는 하나지만, 한 사이트에 여러 하위 폴더의 **발표**를 둘 수 있다. 다음 발표가 실제로 준비되면 새 폴더에 해당 `index.html`을 넣고 루트 목록의 링크를 추가하면 된다. 이 패키지의 목록에는 현재 존재하는 RLDX-1 발표만 들어간다. 나중에 다른 발표를 추가한 뒤 이 패키지를 다시 올릴 때는 저장소 목록의 기존 링크도 유지한다. [Project site의 개수와 기본 주소](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

공식 메뉴·업로드 제한 확인일: 2026-11-05.
