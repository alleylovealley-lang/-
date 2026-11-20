import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getDiary, url } from '../lib/utils';

export async function GET(context: APIContext) {
  const posts = await getDiary();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      
      pubDate: p.data.date,
      categories: p.data.tags,
      link: url(`/diary/${p.id}`),
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
