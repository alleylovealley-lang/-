import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tags = z.array(z.string()).default([]);
const md = (dir: string) => glob({ pattern: '**/*.md', base: `./src/content/${dir}` });
const yaml = (dir: string) => glob({ pattern: '**/*.{yaml,yml}', base: `./src/content/${dir}` });
const date = z.coerce.date();

/* ───────── RECORD · 기록 ───────── */

/** DIARY — 날짜별 일기 */
const diary = defineCollection({
  loader: md('diary'),
  schema: z.object({
    title: z.string(),
    date,
    mood: z.string().optional(), // 그날의 기분 (예: ☁ 몽글몽글)
    weather: z.string().optional(),
    cover: z.string().optional(), // 썸네일 이미지 경로
    tags,
    draft: z.boolean().default(false),
  }),
});

/** SCRAPBOOK — 이미지, 링크, 문장 스크랩 (본문 = 메모나 문장) */
const scrapbook = defineCollection({
  loader: md('scrapbook'),
  schema: z.object({
    kind: z.enum(['image', 'link', 'quote']),
    title: z.string().optional(),
    date,
    image: z.string().optional(), // image 스크랩
    url: z.string().optional(), // link 스크랩
    source: z.string().optional(), // quote 출처
    tags,
  }),
});

/** MEMO — 자유 메모 및 백업 관련 메모 */
const memo = defineCollection({
  loader: md('memo'),
  schema: z.object({
    title: z.string(),
    date,
    pinned: z.boolean().default(false),
    tags, // '백업' 태그를 달면 백업 메모로 모아져요
  }),
});

/* ───────── LIFE · 생활 관리 ───────── */

/** SCHEDULE — 일정 */
const schedule = defineCollection({
  loader: yaml('schedule'),
  schema: z.object({
    title: z.string(),
    date,
    time: z.string().optional(), // '14:00'
    dday: z.boolean().default(false), // D-Day로 카운트할지
    memo: z.string().optional(),
  }),
});

/** TODO — 할 일 (완료하면 퀘스트 포인트) */
const todo = defineCollection({
  loader: yaml('todo'),
  schema: z.object({
    title: z.string(),
    due: date.optional(),
    done: z.boolean().default(false),
    doneAt: date.optional(),
    priority: z.enum(['high', 'normal', 'low']).default('normal'),
    points: z.number().default(10),
    memo: z.string().optional(),
  }),
});

/** DIET — 식단 및 운동 */
const diet = defineCollection({
  loader: yaml('diet'),
  schema: z.object({
    date,
    kind: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'exercise']),
    title: z.string(), // 메뉴 또는 운동 이름
    kcal: z.number().optional(),
    minutes: z.number().optional(), // 운동 시간
    memo: z.string().optional(),
  }),
});

/** HOSPITAL — 병원 방문 기록 */
const hospital = defineCollection({
  loader: yaml('hospital'),
  schema: z.object({
    date,
    name: z.string(), // 병원 이름
    department: z.string().optional(), // 진료과
    reason: z.string().optional(), // 방문 이유
    result: z.string().optional(), // 진단·처방
    cost: z.number().optional(),
    next: date.optional(), // 다음 방문 예정일
  }),
});

/** HABIT — 고정적으로 매일 할 일 (체크는 브라우저에 저장) */
const habit = defineCollection({
  loader: yaml('habit'),
  schema: z.object({
    name: z.string(),
    emoji: z.string().default('✔'),
    order: z.number().default(0),
    points: z.number().default(5),
  }),
});

/* ───────── REVIEW · 취향 기록 ───────── */

/** BOOK / ANIME / MOVIE / DRAMA 리뷰 (본문 = 감상) */
const reviews = defineCollection({
  loader: md('reviews'),
  schema: z.object({
    kind: z.enum(['book', 'anime', 'movie', 'drama']),
    title: z.string(),
    creator: z.string().optional(), // 작가·감독·제작사
    status: z.enum(['doing', 'done', 'want']).default('done'), // 보는 중 / 다 봄 / 보고 싶음
    rating: z.number().min(0).max(5).optional(),
    date: date.optional(), // 다 본 날
    cover: z.string().optional(),
    tags,
  }),
});

/** PLAYLIST — 애플뮤직 임베드 */
const playlist = defineCollection({
  loader: yaml('playlist'),
  schema: z.object({
    title: z.string(),
    url: z.string(), // music.apple.com 공유 링크 또는 embed.music.apple.com 주소
    note: z.string().optional(),
    order: z.number().default(0),
  }),
});

/* ───────── FINANCE · 가계부 ───────── */

/** MONEY — 수입 및 지출 */
const money = defineCollection({
  loader: yaml('money'),
  schema: z.object({
    date,
    type: z.enum(['income', 'expense']),
    amount: z.number(),
    category: z.string().default('기타'),
    memo: z.string().optional(),
  }),
});

/** SUBSCRIPTION — 구독 관리 */
const subscriptions = defineCollection({
  loader: yaml('subscriptions'),
  schema: z.object({
    name: z.string(),
    price: z.number(),
    cycle: z.enum(['monthly', 'yearly']).default('monthly'),
    billingDay: z.number().min(1).max(31),
    billingMonth: z.number().min(1).max(12).optional(),
    category: z.string().optional(),
    active: z.boolean().default(true),
    memo: z.string().optional(),
  }),
});

/* ───────── WORK · 작업 ───────── */

/** COMMISSION — 의뢰, 진행 상황, 마감일, 작업 수입 */
const commissions = defineCollection({
  loader: yaml('commissions'),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    status: z.enum(['inquiry', 'progress', 'done', 'canceled']).default('progress'),
    received: date.optional(), // 의뢰 받은 날
    deadline: date.optional(),
    fee: z.number().optional(), // 작업비
    paid: z.boolean().default(false),
    progress: z.number().min(0).max(100).optional(), // 진행률 %
    memo: z.string().optional(),
  }),
});

/** PORTFOLIO — 작업물 */
const projects = defineCollection({
  loader: md('projects'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date,
    role: z.string().optional(),
    link: z.string().optional(),
    repo: z.string().optional(),
    cover: z.string().optional(),
    tags,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

/* ───────── ARCHIVE · 자료 ───────── */

/** MOODBOARD — 무드보드 */
const moodboards = defineCollection({
  loader: yaml('moodboards'),
  schema: z.object({
    title: z.string(),
    date,
    images: z.array(z.string()).default([]),
    colors: z.array(z.string()).default([]), // '#f3a5bf'
    words: z.array(z.string()).default([]), // 키워드
    memo: z.string().optional(),
  }),
});

/** REFERENCE — 레퍼런스 앨범 */
const references = defineCollection({
  loader: yaml('references'),
  schema: z.object({
    image: z.string(),
    album: z.string(), // 종류 (예: 색감, 포즈, 배경)
    title: z.string().optional(),
    source: z.string().optional(), // 출처 링크
    date: date.optional(),
  }),
});

/** PHOTO — 사진 */
const photos = defineCollection({
  loader: yaml('photos'),
  schema: z.object({
    image: z.string(),
    date,
    album: z.string().default('일상'),
    caption: z.string().optional(),
    tags,
  }),
});

/** BACKUP LINKS — 사이트 및 자료 백업 링크 */
const backups = defineCollection({
  loader: yaml('backups'),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    kind: z.string().default('링크'), // 예: 클라우드, 저장소, 외장하드
    date: date.optional(), // 마지막 백업 날짜
    note: z.string().optional(),
  }),
});

export const collections = {
  diary, scrapbook, memo,
  schedule, todo, diet, hospital, habit,
  reviews, playlist,
  money, subscriptions,
  commissions, projects,
  moodboards, references, photos, backups,
};
