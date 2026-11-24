/**
 * Schreibt pricing/index.html aus config/pricing-redirect-seo.ts (SSoT, kein DPP-Flash-Erbe).
 * Ausführen: npx tsx --tsconfig tsconfig.scripts.json scripts/sync-pricing-redirect.tsx
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  PRICING_REDIRECT_CANONICAL,
  PRICING_REDIRECT_SEO,
  PRICING_REDIRECT_TARGET_HREF,
} from '@/config/pricing-redirect-seo';
import { renderStaticHeadMeta } from '@/lib/seo/render-static-head-meta';

const OUT = resolve(process.cwd(), 'pricing/index.html');

let headMeta = renderStaticHeadMeta({
  ...PRICING_REDIRECT_SEO,
  path: '/pricing/',
});
headMeta = headMeta
  .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${PRICING_REDIRECT_CANONICAL}" />`)
  .replace(
    /<link rel="alternate" hreflang="de-DE" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="de-DE" href="${PRICING_REDIRECT_CANONICAL}" />`,
  )
  .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${PRICING_REDIRECT_CANONICAL}">`);

const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${headMeta}
  <meta http-equiv="refresh" content="0; url=${PRICING_REDIRECT_TARGET_HREF}" />
  <link rel="stylesheet" href="/style.css?v=84" />
</head>
<body class="min-h-screen bg-[#0a1628] text-[#f0f6ff] antialiased">
  <main class="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
    <p class="text-lg font-semibold">Weiterleitung zu den Preisen …</p>
    <p class="mt-4 text-sm text-[#8fa4c0]">
      Falls nichts passiert:
      <a class="font-semibold text-teal-300 underline-offset-2 hover:underline" href="${PRICING_REDIRECT_TARGET_HREF}">Preise auf der Startseite öffnen</a>
    </p>
  </main>
</body>
</html>
`;

const DPP_LEGACY_PATTERN = /dpp-flash|dppflash|digitaler produktpass|\bdpp\b/i;
if (DPP_LEGACY_PATTERN.test(html)) {
  console.error('pricing/index.html enthält DPP-Flash-Reste.');
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html, 'utf8');
console.log(`✓ ${OUT} (canonical ${PRICING_REDIRECT_CANONICAL})`);