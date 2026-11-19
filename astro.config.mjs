// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 배포 주소. GitHub Actions에서 자동으로 채워집니다. 직접 도메인을 연결하면 SITE_URL만 바꾸면 됩니다.
const site = process.env.SITE_URL || 'https://example.com';
const base = process.env.BASE_PATH || '/';

/** 마크다운 안의 "/로 시작하는" 링크·이미지에 base 경로를 붙여줍니다. */
function rehypeBaseLinks() {
  const prefix = base.replace(/\/$/, '');
  const fix = (v) => (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && prefix && !v.startsWith(prefix + '/') ? prefix + v : v);
  const walk = (node) => {
    if (node.type === 'element') {
      if (node.properties?.href) node.properties.href = fix(node.properties.href);
      if (node.properties?.src) node.properties.src = fix(node.properties.src);
    }
    node.children?.forEach(walk);
  };
  return () => walk;
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeBaseLinks()],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
