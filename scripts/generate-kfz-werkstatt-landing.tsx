/**
 * Erzeugt /loesungen/kfz-werkstatt/ aus index.html (Branchen-Landingpage Kfz-Werkstatt).
 *
 * Alle Inhalte kommen aus config/industry-solutions.ts (gleiche Quelle wie die Next-Branchenseiten):
 * Head-Meta, WebPage-, FAQ- und Breadcrumb-JSON-LD, Hero-Copy (H1 + Subheadline über der
 * SDB-Dropzone), Stoffübersicht mit Links auf die TRGS-555-Betriebsanweisungen und FAQ.
 *
 * Ersetzt wird ausschließlich über AEO-Marker bzw. feste Kommentar-Anker. Fehlt einer, bricht das
 * Skript ab. Hintergrund (11/2026): Ein textbasiertes Hero-Regex hatte nach dem Startseiten-Redesign
 * still die halbe Seite (inkl. Dropzone) entfernt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HomeFaqItems } from '@/components/home/HomeFaqItems';
import { HomeHeroCopy } from '@/components/home/HomeHeroCopy';
import { IndustryStaticLandingSections } from '@/components/loesungen/IndustryStaticLandingSections';
import { AEO_CONTENT_UPDATED } from '@/config/aeo-config';
import { getIndustry } from '@/config/industry-solutions';
import { buildBreadcrumbSchema } from '@/lib/seo/build-breadcrumb-schema';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import { buildIndustrySeoMeta, buildIndustryBreadcrumbs } from '@/lib/seo/build-industry-seo';
import { buildWebPageSchema } from '@/lib/seo/build-webpage-schema';
import { renderStaticHeadMeta } from '@/lib/seo/render-static-head-meta';
import { serializeJsonLd, type JsonLdObject } from '@/lib/seo/serialize-json-ld';
import { replaceMarkedBlocks } from '@/lib/static-html/replace-marked-blocks';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'index.html');
const OUT_DIR = path.join(ROOT, 'static-loesungen', 'kfz-werkstatt');
const OUT_FILE = path.join(OUT_DIR, 'index.html');

/** Kommentar-Anker in index.html, vor dem die Branchenabschnitte eingesetzt werden. */
const INDUSTRY_SECTIONS_ANCHOR = ' <!-- EINSTIEGE -->';

const industry = getIndustry('kfz-werkstatt');
if (!industry?.faq?.length || !industry.staticHero || !industry.substanceOverview) {
  throw new Error(
    'config/industry-solutions.ts: kfz-werkstatt benötigt faq, staticHero und substanceOverview.',
  );
}
const seoMeta = buildIndustrySeoMeta(industry);
const faqItems = [...industry.faq];

function renderJsonLdScript(data: JsonLdObject): string {
  return `<script type="application/ld+json">\n${serializeJsonLd(data, 1)}\n </script>`;
}

function insertBeforeAnchor(pageHtml: string, anchor: string, insertion: string): string {
  if (!pageHtml.includes(anchor)) {
    throw new Error(`generate-kfz-werkstatt-landing: Anker "${anchor.trim()}" fehlt in index.html.`);
  }
  return pageHtml.replace(anchor, `${insertion}\n\n${anchor}`);
}

let html = replaceMarkedBlocks(fs.readFileSync(SOURCE, 'utf8'), {
  HEAD_META: () => renderStaticHeadMeta(seoMeta),
  WEBPAGE_JSONLD: () =>
    renderJsonLdScript(buildWebPageSchema(seoMeta, { dateModified: AEO_CONTENT_UPDATED })),
  FAQ_JSONLD: () =>
    [
      renderJsonLdScript(buildFaqPageSchema(faqItems)),
      renderJsonLdScript(buildBreadcrumbSchema(buildIndustryBreadcrumbs(industry))),
    ].join('\n'),
  FAQ_ITEMS: () => renderToStaticMarkup(<HomeFaqItems items={faqItems} />),
  HERO_COPY: () => renderToStaticMarkup(<HomeHeroCopy copy={industry.staticHero} />),
});

html = insertBeforeAnchor(
  html,
  INDUSTRY_SECTIONS_ANCHOR,
  renderToStaticMarkup(<IndustryStaticLandingSections industry={industry} />),
);

html = html
  .replace(/href="style\.css/g, 'href="/style.css')
  .replace(/href="tw\.css/g, 'href="/tw.css')
  .replace('src="logo.png"', 'src="/logo.png"')
  .replace('src="./linkedIn.png"', 'src="/linkedIn.png"');

/** Kfz-Werkstätten sehen nur die KMU-Tarife; die SiFa-Mandanten-Spalte entfällt. */
function trimPricingToProfessional(pageHtml: string): string {
  let out = pageHtml.replace(
    /(<div class="pricing-tier-grid"[^>]*>)([\s\S]*?)(<\/div>\s*\n\s*<details class="pricing-compare)/,
    (_: string, open: string, content: string, close: string) => {
      const articles = content.match(/\n <article[\s\S]*?<\/article>/g) || [];
      const kept = articles.filter((article) => !article.includes('>SiFa Multi-Mandant</p>'));
      const gridOpen = open.replace(
        '<div class="pricing-tier-grid">',
        '<div class="pricing-tier-grid" style="grid-template-columns: repeat(3, minmax(240px, 1fr));">',
      );
      return `${gridOpen}${kept.join('')}\n\n ${close}`;
    },
  );

  out = out.replace(
    /(<section id="preise"[\s\S]*?<table class="pricing-compare__table">)([\s\S]*?)(<\/table>)/,
    (_: string, tableOpen: string, tableInner: string, tableClose: string) => {
      let t = tableInner
        .replace(
          /<caption>[\s\S]*?<\/caption>/,
          '<caption>Vergleich der Pakete TarifVorschau, KMU Basis und KMU Pro</caption>',
        )
        .replace(/\s*<th scope="col">SiFa Multi-Mandant<\/th>/, '')
        .replace(/\s*<tr>\s*<th scope="row">PDF-Rechnung \(Direktkauf\)<\/th>[\s\S]*?<\/tr>/, '')
        .replace(/\s*<tr>\s*<th scope="row">Mandanten- &amp; Werkstrennung<\/th>[\s\S]*?<\/tr>/, '')
        .replace(/\s*<tr>\s*<th scope="row">Begehungs-Modus \(ohne SDB\)<\/th>[\s\S]*?<\/tr>/, '');

      t = t.replace(/<tr>([\s\S]*?)<\/tr>/g, (rowMatch: string, inner: string) => {
        if (!inner.includes('<td')) return rowMatch;
        const lastTdIndex = inner.lastIndexOf('<td');
        if (lastTdIndex === -1) return rowMatch;
        return `<tr>${inner.slice(0, lastTdIndex).trimEnd()}</tr>`;
      });

      return `${tableOpen}${t}${tableClose}`;
    },
  );

  return out;
}

html = trimPricingToProfessional(html);

/** Footer: aktuelle Seite markieren (Barrierefreiheit, kein Selbstlink-Signal ohne Kontext). */
html = html.replace(
  '<a href="/loesungen/kfz-werkstatt/" class="site-footer__link">',
  '<a href="/loesungen/kfz-werkstatt/" class="site-footer__link" aria-current="page">',
);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, html, 'utf8');
fs.cpSync(OUT_FILE, path.join(ROOT, 'loesungen', 'kfz-werkstatt', 'index.html'));
console.log('✓ static-loesungen/kfz-werkstatt/index.html');
console.log('✓ loesungen/kfz-werkstatt/index.html');
