import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { LANDING_HOME_SEO_FAQ } from '../config/landing-home-seo-faq';

const indexPath = resolve(process.cwd(), 'index.html');
let html = readFileSync(indexPath, 'utf8');

for (const item of LANDING_HOME_SEO_FAQ) {
  const qEsc = item.question.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `(<summary[^>]*>\\s*${qEsc}\\s*</summary>\\s*<div class="mt-3 text-sm leading-relaxed text-\\[#8fa4c0\\]">\\s*<p>)[\\s\\S]*?(</p>\\s*</div>\\s*</details>)`,
    'm',
  );
  if (!re.test(html)) {
    throw new Error(`Visible FAQ block not found for question: ${item.question}`);
  }
  html = html.replace(re, `$1${item.answer}$2`);
}

writeFileSync(indexPath, html, 'utf8');
console.log('Synced visible #sifa-faq answers in index.html from config/landing-home-seo-faq.ts');
