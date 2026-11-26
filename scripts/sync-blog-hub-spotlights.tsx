/**
 * Blog-Hub: Orphan-Spotlights und globale Preise-Nav aus config/internal-links/hub-spotlights.ts.
 * Ausführen: npm run sync:blog-hub
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  ORPHAN_HUB_BLOG_SPOTLIGHTS,
  renderBlogHubSpotlightCard,
} from '@/config/internal-links/hub-spotlights';
import { SITE_NAV_PRICING_LINK } from '@/config/site-nav';
import { replaceMarkedBlocks } from '@/lib/static-html/replace-marked-blocks';

const BLOG_INDEX = resolve(process.cwd(), 'blog/index.html');

const pricingHref = SITE_NAV_PRICING_LINK.href;
const pricingLabel = SITE_NAV_PRICING_LINK.label;

let html = readFileSync(BLOG_INDEX, 'utf8');

html = html.replaceAll('href="/#preise"', `href="${pricingHref}"`);
html = html.replaceAll('>Preise</a>', `>${pricingLabel}</a>`);

html = replaceMarkedBlocks(html, {
  BLOG_HUB_SPOTLIGHTS: () => ORPHAN_HUB_BLOG_SPOTLIGHTS.map(renderBlogHubSpotlightCard).join('\n'),
});

writeFileSync(BLOG_INDEX, html, 'utf8');
console.log(`✓ Blog-Hub: ${ORPHAN_HUB_BLOG_SPOTLIGHTS.length} Spotlight(s), Preise → ${pricingHref}`);