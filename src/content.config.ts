import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tags = z.array(z.string()).default([]);
const md = (dir: string) => glob({ pattern: '**/*.md', base: `./src/content/${dir}` });
const yaml = (dir: string) => glob({ pattern: '**/*.{yaml,yml}', base: `./src/content/${dir}` });

/** DIARY · 일기 — DAILY(일상) / NOTE(생각·메모) */
const diary = defineCollection({
  loader: md('diary'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['daily', 'note']).default('daily'),
    mood: z.string().optional(), // 그날의 기분 (예: ☁ 몽글몽글)
    weather: z.string().optional(),
    cover: z.string().optional(), // 썸네일 이미지 경로
    tags,
    draft: z.boolean().default(false),
  }),
});

/** SCHEDULE · 일정 — 개인 일정 / 할 일(퀘스트) */
const schedule = defineCollection({
  loader: yaml('schedule'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(), // '14:00'
    type: z.enum(['personal', 'reminder']).default('personal'),
    dday: z.boolean().default(false), // D-Day로 카운트할지
    done: z.boolean().default(false), // 할 일 완료 여부
    points: z.number().default(10), // 퀘스트 포인트
    memo: z.string().optional(),
  }),
});

/** 구독 관리 */
const subscriptions = defineCollection({
  loader: yaml('subscriptions'),
  schema: z.object({
    name: z.string(),
    price: z.number(),
    currency: z.string().default('KRW'),
    cycle: z.enum(['monthly', 'yearly']).default('monthly'),
    billingDay: z.number().min(1).max(31), // 매월 결제일
    billingMonth: z.number().min(1).max(12).optional(), // 연간 결제일 경우 결제 월
    category: z.string().optional(),
    active: z.boolean().default(true),
    memo: z.string().optional(),
  }),
});

/** PHOTO · 사진 */
const photos = defineCollection({
  loader: yaml('photos'),
  schema: z.object({
    image: z.string(), // /images/photos/파일.jpg
    date: z.coerce.date(),
    caption: z.string().optional(),
    memory: z.boolean().default(false), // 추억 기록으로 표시
    tags,
  }),
});

/** ARCHIVE · 아카이브 — 독서 / 장소 / 문장 / 생각 */
const archive = defineCollection({
  loader: md('archive'),
  schema: z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('book'),
      title: z.string(),
      author: z.string().optional(),
      status: z.enum(['reading', 'done', 'want']).default('reading'),
      started: z.coerce.date().optional(),
      finished: z.coerce.date().optional(),
      rating: z.number().min(0).max(5).optional(),
      cover: z.string().optional(),
    }),
    z.object({
      kind: z.literal('place'),
      title: z.string(),
      location: z.string().optional(),
      visited: z.coerce.date().optional(),
      revisit: z.boolean().default(true), // 다시 가고 싶은 곳
      link: z.string().optional(),
      image: z.string().optional(),
    }),
    z.object({
      kind: z.literal('quote'), // 본문이 문장
      source: z.string().optional(), // 출처 (책 제목 등)
      date: z.coerce.date().optional(),
      starred: z.boolean().default(false), // ★ 컬렉션에 모으기
    }),
    z.object({
      kind: z.literal('thought'), // 틈틈이 적어둔 생각 (본문)
      date: z.coerce.date(),
    }),
  ]),
});

/** COLLECTION · 컬렉션 — 좋아하는 순간 / 느린 아침의 기록 */
const collection = defineCollection({
  loader: md('collection'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['moment', 'morning']).default('moment'),
    image: z.string().optional(),
  }),
});

/** PORTFOLIO · 작업 */
const projects = defineCollection({
  loader: md('projects'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    role: z.string().optional(),
    link: z.string().optional(),
    repo: z.string().optional(),
    cover: z.string().optional(),
    tags,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { diary, schedule, subscriptions, photos, archive, collection, projects };
