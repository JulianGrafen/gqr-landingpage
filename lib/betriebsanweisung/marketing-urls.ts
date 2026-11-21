import { SITE_URL } from '@/config/site-seo';

const HUB_PATH = '/betriebsanweisung/' as const;

/** Öffentliche pSEO-Seiten leben nur auf der Marketing-Domain (nicht app.*). */
export function betriebsanweisungHubUrl(): string {
  return `${SITE_URL}${HUB_PATH}`;
}

export function betriebsanweisungSlugUrl(slug: string): string {
  return `${SITE_URL}/betriebsanweisung/${slug}/`;
}