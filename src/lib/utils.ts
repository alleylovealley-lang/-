import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../site.config';

/** base 경로를 고려한 내부 링크 생성 */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString(SITE.locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
/** 11.20 형태 */
export const md = (date: Date | string) => (typeof date === 'string' ? date : isoDate(date)).slice(5).replace('-', '.');

/** 한국어 기준 대략적인 읽기 시간(분) */
export function readingTime(body = ''): number {
  const chars = body.replace(/```[\s\S]*?```/g, '').replace(/\s+/g, '').length;
  return Math.max(1, Math.round(chars / 500));
}

const visible = ({ data }: { data: { draft?: boolean } }) => import.meta.env.DEV || !data.draft;
const byDate = <T extends { data: { date: Date } }>(a: T, b: T) => +b.data.date - +a.data.date;

export const DIARY_CATS = { daily: 'DAILY', note: 'NOTE' } as const;

export const getDiary = async () => (await getCollection('diary', visible)).sort(byDate);
export const getProjects = async () =>
  (await getCollection('projects', visible)).sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || byDate(a, b));
export const getPhotos = async () => (await getCollection('photos')).sort(byDate);
export const getSchedule = async () =>
  (await getCollection('schedule')).sort((a, b) => +a.data.date - +b.data.date || (a.data.time ?? '').localeCompare(b.data.time ?? ''));
export const getSubscriptions = async () => (await getCollection('subscriptions')).sort((a, b) => a.data.billingDay - b.data.billingDay);
export const getCollectionItems = async () => (await getCollection('collection')).sort(byDate);
export const getArchive = async () => await getCollection('archive');

export type Book = Extract<CollectionEntry<'archive'>['data'], { kind: 'book' }>;
export async function getBooks() {
  return (await getArchive()).filter((e): e is CollectionEntry<'archive'> & { data: Book } => e.data.kind === 'book');
}

/** 일정 데이터를 브라우저용 JSON으로 (오늘/디데이 계산은 방문 시점 기준) */
export async function scheduleJson() {
  return (await getSchedule()).map((e) => ({ ...e.data, date: isoDate(e.data.date) }));
}

/** 퀘스트 레벨 계산: 완료한 할 일의 포인트 합계 */
export const POINTS_PER_LEVEL = 100;
export async function questStats() {
  const reminders = (await getSchedule()).filter((e) => e.data.type === 'reminder');
  const points = reminders.filter((r) => r.data.done).reduce((s, r) => s + r.data.points, 0);
  return {
    points,
    level: Math.floor(points / POINTS_PER_LEVEL) + 1,
    progress: points % POINTS_PER_LEVEL,
    done: reminders.filter((r) => r.data.done).length,
    total: reminders.length,
  };
}

/** 태그 → 항목 목록 (일기 + 작업) */
export async function getTagMap() {
  const [diary, projects] = await Promise.all([getDiary(), getProjects()]);
  type Item = { title: string; href: string; date: Date; kind: string };
  const map = new Map<string, Item[]>();
  const add = (tag: string, item: Item) => map.set(tag, [...(map.get(tag) ?? []), item]);
  for (const p of diary) p.data.tags.forEach((t) => add(t, { title: p.data.title, href: `/diary/${p.id}`, date: p.data.date, kind: '일기' }));
  for (const p of projects) p.data.tags.forEach((t) => add(t, { title: p.data.title, href: `/portfolio/${p.id}`, date: p.data.date, kind: '작업' }));
  for (const items of map.values()) items.sort((a, b) => +b.date - +a.date);
  return new Map([...map.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])));
}
