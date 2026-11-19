import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../site.config';

/** base 경로를 고려한 내부 링크 생성 */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString(SITE.locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** 한국어 기준 대략적인 읽기 시간(분) */
export function readingTime(body = ''): number {
  const chars = body.replace(/```[\s\S]*?```/g, '').replace(/\s+/g, '').length;
  return Math.max(1, Math.round(chars / 500));
}

const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

export async function getPosts() {
  return (await getCollection('posts', visible)).sort((a, b) => +b.data.date - +a.data.date);
}

export async function getProjects() {
  return (await getCollection('projects', visible)).sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured) || +b.data.date - +a.data.date,
  );
}

export const noteDate = (n: CollectionEntry<'notes'>) => n.data.tended ?? n.data.planted;

export async function getNotes() {
  return (await getCollection('notes', visible)).sort((a, b) => +noteDate(b) - +noteDate(a));
}

export const STAGES = {
  seedling: { icon: '🌱', label: '새싹' },
  budding: { icon: '🌿', label: '자라는 중' },
  evergreen: { icon: '🌳', label: '상록' },
} as const;

/** 모든 컬렉션의 태그 → 항목 목록 */
export async function getTagMap() {
  const [posts, projects, notes] = await Promise.all([getPosts(), getProjects(), getNotes()]);
  type Item = { title: string; href: string; date: Date; kind: string };
  const map = new Map<string, Item[]>();
  const add = (tag: string, item: Item) => map.set(tag, [...(map.get(tag) ?? []), item]);
  for (const p of posts) p.data.tags.forEach((t) => add(t, { title: p.data.title, href: `/blog/${p.id}`, date: p.data.date, kind: '글' }));
  for (const p of projects) p.data.tags.forEach((t) => add(t, { title: p.data.title, href: `/projects/${p.id}`, date: p.data.date, kind: '작업' }));
  for (const n of notes) n.data.tags.forEach((t) => add(t, { title: n.data.title, href: `/garden/${n.id}`, date: noteDate(n), kind: '정원' }));
  for (const items of map.values()) items.sort((a, b) => +b.date - +a.date);
  return new Map([...map.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])));
}
