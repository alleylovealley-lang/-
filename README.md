# 나만의 웹사이트

평생 쓸 개인 웹사이트입니다. 블로그 · 포트폴리오 · 디지털 정원 · 소개 페이지가 한곳에 있습니다.
[Astro](https://astro.build)로 만든 정적 사이트이며, **모든 콘텐츠는 평범한 마크다운 파일**이라 도구가 바뀌어도 그대로 옮길 수 있습니다.

## 꾸미기 이미지 넣기

헤더 배너, 프로필 사진, 세로 배너, 메뉴 제목 등 회색 줄무늬 칸은 모두 이미지로 바꿀 수 있어요.

1. 이미지 파일을 `public/images/deco/` 폴더에 넣기 (gif 움짤도 가능)
2. `src/site.config.ts`의 `images` 부분에 `'/images/deco/파일이름.png'` 적기
3. 다 꾸몄으면 `showPlaceholders: false`로 바꾸면 빈 칸이 숨겨져요

블로그 글 썸네일은 글 맨 위에 `cover: /images/posts/사진.jpg`를 적으면 됩니다.
색과 글꼴은 `src/styles/global.css` 맨 위에서 바꿀 수 있어요. 글꼴 파일은 `public/fonts/`에 들어 있어요 (눈누: Neo둥근모, 온글잎 박다현체 / 본문: 고운돋움).

## 가장 먼저 할 일

1. `src/site.config.ts` — 이름, 소개 문구, 링크(GitHub, 이메일 등) 수정
2. `src/pages/about.md` — 소개 페이지 내용 작성
3. 예시 콘텐츠(`sample-project.md`, `draft-example.md`, `reading-list.md` 등)는 지우거나 고쳐 쓰기

## 사이트 안에서 바로 쓰기

홈의 **✏️ 오늘 일기 쓰기 / 💸 지출 기록 / 💰 수입 기록** 버튼으로 쓰면 GitHub 저장소에 파일로 바로 저장되고, 1~2분 뒤 사이트에 반영돼요.

처음 한 번만 **ETC › SETTINGS › GITHUB**에서 열쇠(Fine-grained token, 이 저장소의 `Contents: Read and write` 권한)를 연결하면 돼요. 만드는 법은 설정 화면에 단계별로 적혀 있어요. 열쇠는 그 브라우저에만 저장되고, 백업 파일에는 들어가지 않아요.

## 기록 쓰기 (파일로 직접)

> 일기와 수입·지출은 위 버튼으로 쓸 수 있어요. 나머지는 아래 폴더에 파일을 만들면 됩니다.

| 메뉴 | 폴더 | 형식 |
| --- | --- | --- |
| RECORD › 일기 | `src/content/diary/` | `.md` |
| RECORD › 스크랩북 | `src/content/scrapbook/` | `.md` — `kind: image / link / quote` |
| RECORD › 메모 | `src/content/memo/` | `.md` — `tags: [백업]`이면 백업 메모 |
| LIFE › 일정 | `src/content/schedule/` | `.yaml` — `dday: true`면 D-Day |
| LIFE › 할 일 | `src/content/todo/` | `.yaml` — `done: true`면 완료(퀘스트 포인트) |
| LIFE › 식단·운동 | `src/content/diet/` | `.yaml` — `kind: breakfast / lunch / dinner / snack / exercise` |
| LIFE › 병원 | `src/content/hospital/` | `.yaml` |
| LIFE › 습관 | `src/content/habit/` | `.yaml` (습관 목록, 체크는 사이트에서) |
| REVIEW › 도서·애니·영화·드라마 | `src/content/reviews/` | `.md` — `kind: book / anime / movie / drama` |
| REVIEW › 플레이리스트 | `src/content/playlist/` | `.yaml` — 애플뮤직 공유 링크 |
| FINANCE › 수입·지출 | `src/content/money/` | `.yaml` — `type: income / expense` |
| FINANCE › 구독 관리 | `src/content/subscriptions/` | `.yaml` |
| WORK › 커미션 | `src/content/commissions/` | `.yaml` — `status: inquiry / progress / done / canceled` |
| WORK › 포트폴리오 | `src/content/projects/` | `.md` |
| ARCHIVE › 무드보드 | `src/content/moodboards/` | `.yaml` (자유 무드보드는 사이트에서) |
| ARCHIVE › 레퍼런스 | `src/content/references/` | `.yaml` — `album:`으로 분류 |
| ARCHIVE › 사진 | `src/content/photos/` + 이미지는 `public/images/photos/` | `.yaml` — `album:`으로 분류 |
| ARCHIVE › 백업 링크 | `src/content/backups/` | `.yaml` |

GAME(다마고치·낚시터·아이스크림 가게·룰렛)과 습관 체크, 자유 무드보드는 **이 브라우저에 저장**돼요. ETC › SETTINGS에서 백업 파일로 내보내고 불러올 수 있어요.

메뉴 구성(대주제·하위 메뉴 이름, 설명, 순서)은 `src/site.config.ts`의 `nav`에서 바꿀 수 있어요.

각 폴더의 예시 파일을 복사해서 고쳐 쓰면 가장 쉬워요. 필드 설명은 `src/content.config.ts`에 있어요.

### 예시: 할 일 (`src/content/todo/tax.yaml`)

```yaml
title: 연말정산 서류 챙기기
due: 2026-12-15
priority: high   # high / normal / low
points: 30       # 완료하면 받는 퀘스트 포인트
done: false
```

## 아이스크림 가게 배치 바꾸기

GAME › 배스킨라빈스 31(픽셀 아이스크림 가게)의 냉장고·카운터·테이블 위치, 맛 목록과 가격, 하루 영업 시간 같은 규칙은 `src/lib/icecream.ts` 한 파일에 모여 있어요. 좌표는 가로 240 × 세로 160 픽셀 화면 기준이에요.

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
