/**
 * Erzeugt /gefahrstoff-software-sicherheitsfachkraft-selbstständig/ aus index.html (SiFa-Zielgruppenseite).
 */
import fs from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HomeFaqItems } from '@/components/home/HomeFaqItems';
import { HomeFaqSelfServeFooter } from '@/components/home/HomeFaqSelfServeFooter';
import { HomeHeroCopy } from '@/components/home/HomeHeroCopy';
import { AEO_CONTENT_UPDATED } from '@/config/aeo-config';
import { SIFA_SELBSTSTAENDIG } from '@/config/silo-pages/sifa-selbststaendig';
import { buildBreadcrumbSchema } from '@/lib/seo/build-breadcrumb-schema';
import { buildFaqPageSchema } from '@/lib/seo/build-faq-page-schema';
import { buildSiloBreadcrumbs, buildSiloPageSeoMeta } from '@/lib/seo/build-silo-page-seo';
import { buildWebPageSchema } from '@/lib/seo/build-webpage-schema';
import { renderStaticHeadMeta } from '@/lib/seo/render-static-head-meta';
import { serializeJsonLd, type JsonLdObject } from '@/lib/seo/serialize-json-ld';
import { replaceMarkedBlocks } from '@/lib/static-html/replace-marked-blocks';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'index.html');
const OUT_DIR = path.join(ROOT, 'gefahrstoff-software-sicherheitsfachkraft-selbstständig');
const OUT_FILE = path.join(OUT_DIR, 'index.html');

const silo = SIFA_SELBSTSTAENDIG;
const seoMeta = buildSiloPageSeoMeta({
  path: silo.path,
  metaTitle: silo.metaTitle,
  metaDescription: silo.metaDescription,
  breadcrumbLabel: 'SiFa Software',
});
const faqItems = [...silo.faq];

function renderJsonLdScript(data: JsonLdObject): string {
  return `<script type="application/ld+json">\n${serializeJsonLd(data, 1)}\n </script>`;
}

let html = replaceMarkedBlocks(fs.readFileSync(SOURCE, 'utf8'), {
  HEAD_META: () => renderStaticHeadMeta(seoMeta),
  WEBPAGE_JSONLD: () =>
    renderJsonLdScript(buildWebPageSchema(seoMeta, { dateModified: AEO_CONTENT_UPDATED })),
  FAQ_JSONLD: () =>
    [
      renderJsonLdScript(buildFaqPageSchema(faqItems)),
      renderJsonLdScript(buildBreadcrumbSchema(buildSiloBreadcrumbs('SiFa Software'))),
    ].join('\n'),
  FAQ_ITEMS: () => renderToStaticMarkup(<HomeFaqItems items={faqItems} />),
  FAQ_FOOTER: () => renderToStaticMarkup(<HomeFaqSelfServeFooter />),
  HERO_COPY: () => renderToStaticMarkup(<HomeHeroCopy copy={silo.staticHero} />),
});

html = html
  .replace(/href="style\.css/g, 'href="/style.css')
  .replace(/href="tw\.css/g, 'href="/tw.css')
  .replace('src="logo.png"', 'src="/logo.png"')
  .replace('src="./linkedIn.png"', 'src="/linkedIn.png"');

html = html.replace(
  / <!-- LEAD MAGNET -->[\s\S]*?<\/section>\s*\n/,
  '\n',
);

html = html.replace(
  /<section class="section cta-banner[\s\S]*?Direkt zur Beratung:[\s\S]*?<\/section>\s*/,
  `<section class="section cta-banner border-t border-white/[0.07]" aria-label="Abschließender Handlungsaufruf">
 <div class="container cta-banner-inner">
 <h2>Testen Sie Ihren ersten Mandanten in Minuten.</h2>
 <p>Laden Sie ein Sicherheitsdatenblatt hoch, prüfen Sie den KI-gestützten Entwurf und entscheiden Sie selbst — ohne Verkaufsgespräch.</p>
 <a class="btn btn-primary btn-large" href="https://app.gefahrstoff-qr.de/register" title="SiFa-Tarif kostenlos testen">Jetzt kostenlos testen</a>
 <p class="mt-4 text-sm opacity-[0.78]">SiFa Multi-Mandant ab 189&nbsp;€/Monat · <a href="#preise" class="text-inherit underline">Preise ansehen</a></p>
 </div>
 </section>
`,
);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, html, 'utf8');
console.log('✓ gefahrstoff-software-sicherheitsfachkraft-selbstständig/index.html');