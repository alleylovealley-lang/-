import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tags = z.array(z.string()).default([]);

// 블로그 글: 완성된 글
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** 썸네일 이미지 경로 (예: /images/posts/cover.jpg) */
    cover: z.string().optional(),
    tags,
    draft: z.boolean().default(false),
  }),
});

// 포트폴리오: 만든 것들
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    role: z.string().optional(),
    link: z.string().optional(),
    repo: z.string().optional(),
    tags,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// 디지털 정원: 계속 자라는 메모
const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    planted: z.coerce.date(),
    tended: z.coerce.date().optional(),
    stage: z.enum(['seedling', 'budding', 'evergreen']).default('seedling'),
    tags,
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects, notes };
