# 나만의 웹사이트

평생 쓸 개인 웹사이트입니다. 블로그 · 포트폴리오 · 디지털 정원 · 소개 페이지가 한곳에 있습니다.
[Astro](https://astro.build)로 만든 정적 사이트이며, **모든 콘텐츠는 평범한 마크다운 파일**이라 도구가 바뀌어도 그대로 옮길 수 있습니다.

## 가장 먼저 할 일

1. `src/site.config.ts` — 이름, 소개 문구, 링크(GitHub, 이메일 등) 수정
2. `src/pages/about.md` — 소개 페이지 내용 작성
3. 예시 콘텐츠(`sample-project.md`, `draft-example.md`, `reading-list.md` 등)는 지우거나 고쳐 쓰기

## 글 쓰기

| 종류 | 폴더 | 주소 |
| --- | --- | --- |
| 블로그 글 | `src/content/posts/` | `/blog/파일이름` |
| 포트폴리오 | `src/content/projects/` | `/projects/파일이름` |
| 정원 메모 | `src/content/notes/` | `/garden/파일이름` |

파일 이름이 곧 주소가 됩니다. 영문 소문자와 `-`를 권장합니다 (예: `my-first-post.md`).

### 블로그 글

```md
---
title: 글 제목
description: 한 줄 요약 (선택)
date: 2026-11-20
updated: 2026-12-01   # 선택
tags: [일상, 개발]
draft: true           # 선택: true면 실제 사이트에 안 올라감
---

본문
```

### 포트폴리오

```md
---
title: 프로젝트 이름
summary: 한두 문장 설명
date: 2026-01-01
role: 디자인 · 개발      # 선택
link: https://...        # 선택
repo: https://github.com/...  # 선택
tags: [웹]
featured: true           # 선택: 맨 앞에 표시
---
```

### 정원 메모

```md
---
title: 메모 제목
planted: 2026-11-19   # 처음 쓴 날
tended: 2026-12-01    # 마지막으로 다듬은 날 (선택)
stage: seedling       # seedling 🌱 / budding 🌿 / evergreen 🌳
tags: [생각]
---
```

메모 안에서 `[다른 메모](/garden/다른-메모)` 처럼 링크하면, 링크된 메모 아래에 **"이 메모를 언급한 곳"**이 자동으로 생깁니다.

### 이미지

`public/images/`에 파일을 넣고 `![설명](/images/사진.jpg)`로 씁니다.

## 내 컴퓨터에서 보기

```sh
npm install   # 처음 한 번
npm run dev   # http://localhost:4321 에서 실시간 미리보기
```

## 배포 (GitHub Pages, 무료)

1. 저장소 **Settings → Pages → Source**를 **GitHub Actions**로 설정
2. `main` 브랜치에 푸시하면 자동으로 빌드·배포됩니다 (`.github/workflows/deploy.yml`)

나중에 개인 도메인(예: `myname.com`)을 연결하면 Pages 설정에서 도메인만 추가하면 되고, 주소 경로는 자동으로 맞춰집니다.

## 구조

```
src/
  site.config.ts     ← 사이트 설정
  content/           ← 모든 글 (여기만 건드리면 됨)
  pages/             ← 페이지 구성
  components/ layouts/ styles/  ← 디자인
public/              ← 이미지, 파비콘 등 그대로 복사되는 파일
```
