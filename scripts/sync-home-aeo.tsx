/**
 * Rendert die konfigurationsgetriebenen Startseiten-Blöcke in die statische index.html:
 * SoftwareApplication- und FAQPage-JSON-LD, sichtbare FAQ, Excel-Vergleich, SiFa-Sektion, Trust-Microcopy.
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
import { MultiTenantSifaSection } from '@/components/home/MultiTenantSifaSection';
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
  CTA_TRUST_LINE_HERO: () => renderHtml(<CtaTrustLine className="mt-2 w-full text-center md:text-left" />),
  CTA_TRUST_LINE: () => renderHtml(<CtaTrustLine className="mx-auto mt-3 max-w-xl text-center" />),
});

writeFileSync(INDEX_HTML_PATH, updatedHtml, 'utf8');
console.log('✓ index.html: AEO-Blöcke aus der zentralen Konfiguration synchronisiert');
