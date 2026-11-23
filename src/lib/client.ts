// 브라우저에서 쓰는 작은 도구들 (날짜 계산, 저장소)
export const pad = (n: number) => String(n).padStart(2, '0');
export const keyOf = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const todayKey = () => keyOf(new Date());
/** 오늘부터 날짜(YYYY-MM-DD)까지 남은 일수 */
export const daysUntil = (date: string) => Math.round((Date.parse(date) - Date.parse(todayKey())) / 86400000);
export const dLabel = (date: string) => { const n = daysUntil(date); return n === 0 ? 'D-DAY' : n > 0 ? `D-${n}` : `D+${-n}`; };
export const esc = (s = '') => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** localStorage 안전하게 쓰기 (모든 키는 'hong.' 으로 시작 → 설정에서 백업/초기화) */
export function load<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem('hong.' + key); return v == null ? fallback : (JSON.parse(v) as T); } catch { return fallback; }
}
export function save(key: string, value: unknown) {
  try { localStorage.setItem('hong.' + key, JSON.stringify(value)); } catch {}
}

/* ── 미니게임 코인 지갑 (모든 게임이 같이 써요) ── */
export const getCoins = () => load<number>('coins', 100);
export function addCoins(n: number) {
  const v = Math.max(0, Math.round(getCoins() + n));
  save('coins', v);
  window.dispatchEvent(new Event('coins'));
  return v;
}
/** 하루 한 번 출석 보너스 (+20코인). 받았으면 20, 이미 받았으면 0 */
export function dailyBonus() {
  const k = todayKey();
  if (load('bonus', '') === k) return 0;
  save('bonus', k);
  addCoins(20);
  return 20;
}

/** 사이트에서 지운 기록 — 사이트에 반영(빌드)될 때까지 화면에서 숨겨 두기. kind: 'diary' | 'hospital' | 'subs' */
type Gone = { path: string; at: number };
export const hiddenPaths = (kind: string, builtPaths: (string | undefined)[]) => {
  const list = load<Gone[]>(`deleted.${kind}`, []).filter((d) => builtPaths.includes(d.path) && Date.now() - d.at < 86_400_000);
  save(`deleted.${kind}`, list);
  return new Set(list.map((d) => d.path));
};
export const markDeleted = (kind: string, path: string) => {
  save(`deleted.${kind}`, [...load<Gone[]>(`deleted.${kind}`, []).filter((d) => d.path !== path), { path, at: Date.now() }]);
  save(`pending.${kind}`, load<{ path?: string }[]>(`pending.${kind}`, []).filter((p) => p.path !== path));
};
