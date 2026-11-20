# 나만의 웹사이트

평생 쓸 개인 웹사이트입니다. 블로그 · 포트폴리오 · 디지털 정원 · 소개 페이지가 한곳에 있습니다.
[Astro](https://astro.build)로 만든 정적 사이트이며, **모든 콘텐츠는 평범한 마크다운 파일**이라 도구가 바뀌어도 그대로 옮길 수 있습니다.

## 꾸미기 이미지 넣기

헤더 배너, 아이콘, 캐릭터, 88×31 버튼, 스탬프, 블링키 등 회색 줄무늬 칸은 모두 이미지로 바꿀 수 있어요.

1. 이미지 파일을 `public/images/deco/` 폴더에 넣기 (gif 움짤도 가능)
2. `src/site.config.ts`의 `images` 부분에 `'/images/deco/파일이름.png'` 적기
3. 다 꾸몄으면 `showPlaceholders: false`로 바꾸면 빈 칸이 숨겨져요

블로그 글 썸네일은 글 맨 위에 `cover: /images/posts/사진.jpg`를 적으면 됩니다.
색과 글꼴은 `src/styles/global.css` 맨 위에서 바꿀 수 있어요. 글꼴 파일은 `public/fonts/`에 들어 있어요 (눈누: Neo둥근모, 온글잎 박다현체 / 본문: 고운돋움).

## 가장 먼저 할 일

1. `src/site.config.ts` — 이름, 소개 문구, 링크(GitHub, 이메일 등) 수정
2. `src/pages/about.md` — 소개 페이지 내용 작성
3. 예시 콘텐츠(`sample-project.md`, `draft-example.md`, `reading-list.md` 등)는 지우거나 고쳐 쓰기

## 기록 쓰기

> 사이트 안에서 바로 쓰는 기능이 다음 단계에서 추가될 예정이에요. 그 전까지는 아래 폴더에 파일을 만들면 됩니다.

| 메뉴 | 폴더 | 형식 |
| --- | --- | --- |
| RECORD › 일기 | `src/content/diary/` | `.md` — `category: daily` 또는 `note` |
| RECORD › 사진 | `src/content/photos/` + 이미지는 `public/images/photos/` | `.yaml` |
| RECORD › 컬렉션 | `src/content/collection/` | `.md` — `category: moment / morning` |
| LIFE › 일정·퀘스트 | `src/content/schedule/` | `.yaml` — `type: personal`(일정) 또는 `reminder`(할 일·퀘스트) |
| REVIEW › 독서·장소·문장 | `src/content/archive/` | `.md` — `kind: book / place / quote / thought` |
| FINANCE › 구독 관리 | `src/content/subscriptions/` | `.yaml` |
| WORK › 포트폴리오 | `src/content/projects/` | `.md` |
| ETC › 소개 | `src/pages/about.md` | |

메뉴 구성(대주제·하위 메뉴 이름, 설명, 순서)은 `src/site.config.ts`의 `nav`에서 바꿀 수 있어요.

각 폴더의 예시 파일을 복사해서 고쳐 쓰면 가장 쉬워요. 필드 설명은 `src/content.config.ts`에 있어요.

### 예시: 일정 (`src/content/schedule/dentist.yaml`)

```yaml
title: 치과 정기검진
date: 2026-11-26
time: "11:30"
type: personal   # personal(일정) / reminder(할 일)
dday: false      # true면 D-Day 카운트
done: false      # 할 일 완료 여부 (완료하면 퀘스트 포인트 획득)
points: 10
```

### 예시: 문장 (`src/content/archive/quote-1.md`)

```md
---
kind: quote
source: 느리게 걷는 법
starred: true   # ★ COLLECTION에도 표시
---
빨리 가는 것보다 오래 보는 것이 더 많은 것을 남긴다.
```

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
  site.config.ts     ← 사이트 설정 (이름, 메뉴, 꾸미기 이미지)
  content/           ← 모든 기록 (여기만 건드리면 됨)
  pages/             ← 페이지 구성
  components/ layouts/ styles/  ← 디자인
public/              ← 이미지, 파비콘 등 그대로 복사되는 파일
```
