/**
 * Rendert die konfigurationsgetriebenen Startseiten-Blöcke in die statische index.html:
 * Navigation, Hero-Text, Trust-Leiste, Output-Vorschau, Excel-Vergleich, SiFa-Sektion, sichtbare FAQ
 * sowie SoftwareApplication- und FAQPage-JSON-LD.
 *
 * Ausführen: npm run sync:home
 * Quelle: config/aeo-config.ts, config/home-sections/*, config/landing-home-seo-faq.ts
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DataTrustSection } from '@/components/home/DataTrustSection';
import { ExcelComparisonSection } from '@/components/home/ExcelComparisonSection';
import { HomeFaqContactFooter } from '@/components/home/HomeFaqContact';
import { HomeFaqItems } from '@/components/home/HomeFaqItems';
import { HeroInnerTrustSection } from '@/components/home/HeroInnerTrustSection';
import { HeroRegelwerkStrip } from '@/components/home/HeroRegelwerkStrip';
import { HeroTrustLogoGrid } from '@/components/home/HeroTrustLogoGrid';
import { HomeHeroCopy } from '@/components/home/HomeHeroCopy';
import { HeroSdbLiveMetric } from '@/components/home/HeroSdbLiveMetric';
import { HeroSdbSupplierHint } from '@/components/home/HeroSdbSupplierHint';
import { HomeNavigation } from '@/components/home/HomeNavigation';
import { MultiTenantSifaSection } from '@/components/home/MultiTenantSifaSection';
import { ProductDemoVideoSection } from '@/components/home/ProductDemoVideoSection';
import { VideoDemosSection } from '@/components/home/VideoDemosSection';
import { OutputPreviewSection } from '@/components/home/OutputPreviewSection';
import { TurnkeyAuditSection } from '@/components/TurnkeyAuditSection';
import { EnterpriseSiteFooter } from '@/components/site/EnterpriseSiteFooter';
import { LANDING_HOME_SEO_FAQ } from '@/config/landing-home-seo-faq';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import { buildSoftwareApplicationSchema } from '@/lib/seo/build-software-application-schema';
import { serializeJsonLd, type JsonLdObject } from '@/lib/seo/serialize-json-ld';
import { replaceMarkedBlocks } from '@/lib/static-html/replace-marked-blocks';

const INDEX_HTML_PATH = resolve(process.cwd(), 'index.html');

/** Statische LP (`index.html`) lädt `/images/trust/*` aus `images/trust/`, nicht aus `public/`. */
function syncTrustImagesToStaticRoot(): void {
  const srcDir = resolve(process.cwd(), 'public/images/trust');
  const destDir = resolve(process.cwd(), 'images/trust');
  if (!existsSync(srcDir)) return;
  mkdirSync(destDir, { recursive: true });
  for (const name of readdirSync(srcDir)) {
    if (name.startsWith('.')) continue;
    cpSync(resolve(srcDir, name), resolve(destDir, name), { force: true });
  }
}

/** MP4-Demos: `/videos/*` wird aus `public/videos/` und `videos/` am Root ausgeliefert. */
function syncProductVideosToStaticRoot(): void {
  const srcDir = resolve(process.cwd(), 'public/videos');
  const destDir = resolve(process.cwd(), 'videos');
  if (!existsSync(srcDir)) return;
  mkdirSync(destDir, { recursive: true });
  for (const name of readdirSync(srcDir)) {
    if (name.startsWith('.')) continue;
    cpSync(resolve(srcDir, name), resolve(destDir, name), { force: true });
  }
}

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
  FAQ_FOOTER: () => renderHtml(<HomeFaqContactFooter />),
  EXCEL_COMPARISON: () => renderHtml(<ExcelComparisonSection />),
  MULTI_TENANT_SIFA: () => renderHtml(<MultiTenantSifaSection />),
  PRODUCT_DEMO_VIDEO: () => renderHtml(<ProductDemoVideoSection />),
  VIDEO_DEMOS: () => renderHtml(<VideoDemosSection />),
  NAV_DESKTOP: () => renderHtml(<HomeNavigation variant="desktop" />),
  NAV_MOBILE: () => renderHtml(<HomeNavigation variant="mobile" />),
  HERO_COPY: () => renderHtml(<HomeHeroCopy />),
  HERO_SDB_METRIC: () => renderHtml(<HeroSdbLiveMetric />),
  HERO_SDB_SUPPLIER_HINT: () => renderHtml(<HeroSdbSupplierHint />),
  HERO_INNER_TRUST: () => renderHtml(<HeroInnerTrustSection />),
  HERO_TRUST_GRID: () => renderHtml(<HeroTrustLogoGrid />),
  HERO_REGELWERK: () => renderHtml(<HeroRegelwerkStrip />),
  OUTPUT_PREVIEW: () => renderHtml(<OutputPreviewSection />),
  DATA_TRUST: () => renderHtml(<DataTrustSection />),
  SITE_FOOTER: () => renderHtml(<EnterpriseSiteFooter />),
  TURNKEY_AUDIT: () => renderHtml(<TurnkeyAuditSection />),
});

writeFileSync(INDEX_HTML_PATH, updatedHtml, 'utf8');
syncTrustImagesToStaticRoot();
syncProductVideosToStaticRoot();
console.log('✓ index.html: AEO-Blöcke aus der zentralen Konfiguration synchronisiert');
console.log('✓ images/trust: aus public/images/trust gespiegelt');
console.log('✓ videos/: aus public/videos gespiegelt');
