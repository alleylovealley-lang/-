import { SITE, type NavGroup, type NavItem } from '../site.config';

/** 현재 주소(base 제외, 끝 / 제거) */
export function currentPath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return p.length > 1 ? p.replace(/\/$/, '') || '/' : p || '/';
}

export const groupHref = (g: NavGroup) => `/${g.key}`;

/** 현재 주소가 속한 대주제와 하위 메뉴 찾기 (가장 길게 일치하는 하위 메뉴 우선) */
export function findNav(path: string): { group?: NavGroup; item?: NavItem } {
  let best: { group?: NavGroup; item?: NavItem; len: number } = { len: -1 };
  for (const g of SITE.nav) {
    if (path === groupHref(g)) return { group: g };
    for (const c of g.children) {
      if ((path === c.href || path.startsWith(c.href + '/')) && c.href.length > best.len) best = { group: g, item: c, len: c.href.length };
    }
  }
  return best;
}
