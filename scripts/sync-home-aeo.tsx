/**
 * Rendert die konfigurationsgetriebenen Startseiten-Blöcke in die statische index.html:
 * Navigation, Hero-Text, Trust-Leiste, Output-Vorschau, Excel-Vergleich, SiFa-Sektion, sichtbare FAQ
 * sowie SoftwareApplication- und FAQPage-JSON-LD.
 *
 * Ausführen: npm run sync:home
 * Quelle: config/aeo-config.ts, config/home-sections/*, config/landing-home-seo-faq.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CtaTrustLine } from '@/components/home/CtaTrustLine';
import { ExcelComparisonSection } from '@/components/home/ExcelComparisonSection';
import { HomeFaqItems } from '@/components/home/HomeFaqItems';
import { HeroInnerTrustSection } from '@/components/home/HeroInnerTrustSection';
import { HeroTrustLogoGrid } from '@/components/home/HeroTrustLogoGrid';
import { HomeHeroCopy } from '@/components/home/HomeHeroCopy';
import { HomeNavigation } from '@/components/home/HomeNavigation';
import { MultiTenantSifaSection } from '@/components/home/MultiTenantSifaSection';
import { OutputPreviewSection } from '@/components/home/OutputPreviewSection';
import { LANDING_HOME_SEO_FAQ } from '@/config/landing-home-seo-faq';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import { buildSoftwareApplicationSchema } from '@/lib/seo/build-software-application-schema';
import { serializeJsonLd, type JsonLdObject } from '@/lib/seo/serialize-json-ld';
import { replaceMarkedBlocks } from '@/lib/static-html/replace-marked-blocks';

const INDEX_HTML_PATH = resolve(process.cwd(), 'index.html');

function renderJsonLdScript(data: JsonLdObject): string {
  return ` <script type="application/ld+json">\n${serializeJsonLd(data, 1)}\n </script>`;
}

function renderHtml(element: ReactElement): string {
  return renderToStaticMarkup(element);
}

const html = readFileSync(INDEX_HTML_PATH, 'utf8');

const updatedHtml = replaceMarkedBlocks(html, {
  SOFTWARE_APPLICATION_JSONLD: () => renderJsonLdScript(buildSoftwareApplicationSchema()),
  FAQ_JSONLD: () => renderJsonLdScript(buildFaqPageSchema(LANDING_HOME_SEO_FAQ)),
  FAQ_ITEMS: () => renderHtml(<HomeFaqItems items={LANDING_HOME_SEO_FAQ} />),
  EXCEL_COMPARISON: () => renderHtml(<ExcelComparisonSection />),
  MULTI_TENANT_SIFA: () => renderHtml(<MultiTenantSifaSection />),
  NAV_DESKTOP: () => renderHtml(<HomeNavigation variant="desktop" />),
  NAV_MOBILE: () => renderHtml(<HomeNavigation variant="mobile" />),
  HERO_COPY: () => renderHtml(<HomeHeroCopy />),
  HERO_INNER_TRUST: () => renderHtml(<HeroInnerTrustSection />),
  HERO_TRUST_GRID: () => renderHtml(<HeroTrustLogoGrid />),
  HERO_TRUST_LINE: () => renderHtml(<CtaTrustLine className="mt-4 text-center" />),
  OUTPUT_PREVIEW: () => renderHtml(<OutputPreviewSection />),
});

writeFileSync(INDEX_HTML_PATH, updatedHtml, 'utf8');
console.log('✓ index.html: AEO-Blöcke aus der zentralen Konfiguration synchronisiert');
