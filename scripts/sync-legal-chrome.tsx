/**
 * Synchronisiert Marketing-Header (wie Startseite) auf statische Legal-Seiten.
 * npm run sync:legal-chrome
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  MARKETING_STATIC_NAV_BOOT_SCRIPT,
  MarketingStaticSiteChrome,
} from '@/components/marketing/MarketingStaticSiteChrome';
import { replaceMarkedBlocks } from '@/lib/static-html/replace-marked-blocks';

const LEGAL_PAGES = ['impressum/index.html', 'datenschutz/index.html', 'agb/index.html'] as const;

function renderChrome(): string {
  return renderToStaticMarkup(<MarketingStaticSiteChrome />);
}

function renderScripts(): string {
  return `<script>\n${MARKETING_STATIC_NAV_BOOT_SCRIPT}\n</script>\n<script src="/scripts/sticky-cta-bars.js?v=3" defer></script>`;
}

function syncLegalPage(relativePath: string): void {
  const filePath = resolve(process.cwd(), relativePath);
  let html = readFileSync(filePath, 'utf8');

  if (!html.includes('<!--AEO:MARKETING_CHROME-->')) {
    throw new Error(`${relativePath}: Marker <!--AEO:MARKETING_CHROME--> fehlt.`);
  }
  if (!html.includes('<!--AEO:MARKETING_CHROME_SCRIPTS-->')) {
    throw new Error(`${relativePath}: Marker <!--AEO:MARKETING_CHROME_SCRIPTS--> fehlt.`);
  }

  html = replaceMarkedBlocks(html, {
    MARKETING_CHROME: renderChrome,
    MARKETING_CHROME_SCRIPTS: renderScripts,
  });

  if (!html.includes('/tw.css')) {
    html = html.replace(
      /<link rel="stylesheet" href="\.\.\/style\.css">/,
      '<link rel="stylesheet" href="/style.css?v=116">\n <link rel="stylesheet" href="/tw.css">'
    );
  }

  writeFileSync(filePath, html, 'utf8');
  console.log(`✓ ${relativePath}`);
}

for (const page of LEGAL_PAGES) {
  syncLegalPage(page);
}
