import type { MetadataRoute } from 'next';
import {
  ALLOWED_SEARCH_AND_AI_CRAWLERS,
  DISALLOWED_PRIVATE_PATHS,
  SITEMAP_PATH,
} from '@/config/crawler-policy';
import { SITE_URL } from '@/config/site-seo';

export const dynamic = 'force-static';

/** robots.txt: öffentliche Seiten für Such- und KI-Crawler frei, private Pfade gesperrt. */
export default function robots(): MetadataRoute.Robots {
  const sharedRule = { allow: '/', disallow: [...DISALLOWED_PRIVATE_PATHS] };

  return {
    rules: [
      { userAgent: '*', ...sharedRule },
      ...ALLOWED_SEARCH_AND_AI_CRAWLERS.map((userAgent) => ({ userAgent, ...sharedRule })),
    ],
    sitemap: `${SITE_URL}${SITEMAP_PATH}`,
  };
}
