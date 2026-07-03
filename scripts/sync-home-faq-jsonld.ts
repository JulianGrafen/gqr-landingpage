import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { serializeFaqPageSchema } from '../lib/seo/build-faq-page-schema';
import { LANDING_HOME_SEO_FAQ } from '../config/landing-home-seo-faq';

const indexPath = resolve(process.cwd(), 'index.html');
const html = readFileSync(indexPath, 'utf8');

const startMarker = '<!-- FAQPage JSON-LD: sync with config/landing-home-seo-faq.ts -->';
const endMarker = '</script>';

const startIndex = html.indexOf(startMarker);
if (startIndex === -1) {
  throw new Error('FAQPage JSON-LD marker not found in index.html');
}

const scriptOpen = html.indexOf('<script type="application/ld+json">', startIndex);
const endIndex = html.indexOf(endMarker, scriptOpen) + endMarker.length;

const jsonLd = serializeFaqPageSchema(LANDING_HOME_SEO_FAQ, 1)
  .split('\n')
  .map((line) => (line.length ? ` ${line}` : line))
  .join('\n');

const replacement = `${startMarker}\n <script type="application/ld+json">\n${jsonLd}\n </script>`;

const nextHtml = `${html.slice(0, startIndex)}${replacement}${html.slice(endIndex)}`;
writeFileSync(indexPath, nextHtml, 'utf8');

console.log('Updated FAQPage JSON-LD in index.html from config/landing-home-seo-faq.ts');
