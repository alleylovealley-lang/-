import { getCollection } from 'astro:content';
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

export const getDiary = async () => (await getCollection('diary', visible)).sort(byDate);
export const getProjects = async () =>
  (await getCollection('projects', visible)).sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || byDate(a, b));
export const getPhotos = async () => (await getCollection('photos')).sort(byDate);
export const getScrapbook = async () => (await getCollection('scrapbook')).sort(byDate);
export const getMemos = async () =>
  (await getCollection('memo')).sort((a, b) => Number(b.data.pinned) - Number(a.data.pinned) || byDate(a, b));
export const getSchedule = async () =>
  (await getCollection('schedule')).sort((a, b) => +a.data.date - +b.data.date || (a.data.time ?? '').localeCompare(b.data.time ?? ''));
const PRI = { high: 0, normal: 1, low: 2 } as const;
export const getTodos = async () =>
  (await getCollection('todo')).sort(
    (a, b) => Number(a.data.done) - Number(b.data.done) || PRI[a.data.priority] - PRI[b.data.priority] || +(a.data.due ?? 8e15) - +(b.data.due ?? 8e15),
  );
export const getHabits = async () => (await getCollection('habit')).sort((a, b) => a.data.order - b.data.order);
export const getDiet = async () => (await getCollection('diet')).sort(byDate);
export const getHospital = async () => (await getCollection('hospital')).sort(byDate);
export const getReviews = async () => await getCollection('reviews');
export const getPlaylist = async () => (await getCollection('playlist')).sort((a, b) => a.data.order - b.data.order);
export const getMoney = async () => (await getCollection('money')).sort(byDate);
export const getSubscriptions = async () => (await getCollection('subscriptions')).sort((a, b) => a.data.billingDay - b.data.billingDay);
export const getCommissions = async () => await getCollection('commissions');
export const getMoodboards = async () => (await getCollection('moodboards')).sort(byDate);
export const getReferences = async () => (await getCollection('references')).sort((a, b) => +(b.data.created ?? 0) - +(a.data.created ?? 0));
export const getBackups = async () => await getCollection('backups');

export const REVIEW_KINDS = { book: '📚 BOOK', anime: '📺 ANIME', movie: '🎬 MOVIE', drama: '🎞 DRAMA' } as const;
export const REVIEW_STATUS = { doing: '보는 중', done: '다 봄', want: '보고 싶음' } as const;
export const stars = (n = 0) => '★'.repeat(Math.floor(n)) + (n % 1 ? '☆' : '');
export const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;

/** 일정 + 마감일 있는 할 일을 브라우저용 JSON으로 (오늘/디데이 계산은 방문 시점 기준) */
export async function scheduleJson() {
  const ev = (await getSchedule()).map((e) => ({ ...e.data, date: isoDate(e.data.date), type: 'personal', done: false }));
  const td = (await getTodos())
    .filter((t) => t.data.due)
    .map((t) => ({ title: t.data.title, date: isoDate(t.data.due!), type: 'todo', done: t.data.done, dday: false, time: undefined, memo: t.data.memo }));
  const hp = (await getHospital())
    .filter((h) => h.data.next)
    .map((h) => ({ title: `🏥 ${h.data.name}${h.data.department ? ` ${h.data.department}` : ''} 예약`, date: isoDate(h.data.next!), type: 'hospital', done: false, dday: true, time: h.data.nextTime, memo: h.data.nextMemo }));
  return [...ev, ...td, ...hp].sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''));
}

/** 퀘스트 레벨 계산: 완료한 할 일의 포인트 합계 */
export const POINTS_PER_LEVEL = 100;
export async function questStats() {
  const todos = await getTodos();
  const done = todos.filter((r) => r.data.done);
  const points = done.reduce((s, r) => s + r.data.points, 0);
  return { points, level: Math.floor(points / POINTS_PER_LEVEL) + 1, progress: points % POINTS_PER_LEVEL, done: done.length, total: todos.length };
}

/** 태그 → 항목 목록 (일기 + 리뷰 + 포트폴리오) */
export async function getTagMap() {
  const [diary, reviews, projects] = await Promise.all([getDiary(), getReviews(), getProjects()]);
  type Item = { title: string; href: string; date: Date; kind: string };
  const map = new Map<string, Item[]>();
  const add = (tag: string, item: Item) => map.set(tag, [...(map.get(tag) ?? []), item]);
  for (const p of diary) p.data.tags.forEach((t) => add(t, { title: p.data.title, href: `/diary/${p.id}`, date: p.data.date, kind: '일기' }));
  for (const r of reviews) r.data.tags.forEach((t) => add(t, { title: r.data.title, href: `/review/${r.data.kind === 'drama' ? 'movie' : r.data.kind}`, date: r.data.date ?? new Date(0), kind: '리뷰' }));
  for (const p of projects) p.data.tags.forEach((t) => add(t, { title: p.data.title, href: `/portfolio/${p.id}`, date: p.data.date, kind: '작업' }));
  for (const items of map.values()) items.sort((a, b) => +b.date - +a.date);
  return new Map([...map.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])));
}
