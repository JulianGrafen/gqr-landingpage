import { BRAND_NAME } from '@/lib/seo/buildMetadata';
import { SITE_URL } from '@/config/site-seo';
import type { StaticRedirect } from '@/config/static-redirects';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Weiterleitungs-Stub für GitHub Pages: Meta-Refresh 0 s (von Google wie 301 behandelt),
 * Canonical aufs Ziel, `noindex` (fällt automatisch aus der Sitemap) und JS-Fallback.
 */
export function renderRedirectStub({ target, label }: StaticRedirect): string {
  const absoluteTarget = `${SITE_URL}${target}`;
  const canonical = `${SITE_URL}${target.split('#')[0]}`;
  const href = escapeHtml(absoluteTarget);
  const title = escapeHtml(`${label} | ${BRAND_NAME}`);
  const text = escapeHtml(label);

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta http-equiv="refresh" content="0; url=${href}">
  <script>window.location.replace(${JSON.stringify(absoluteTarget)});</script>
  <link rel="stylesheet" href="/style.css?v=84">
</head>
<body class="min-h-screen bg-[#0a1628] text-[#f0f6ff]">
  <main class="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
    <p class="text-lg font-semibold">Weiterleitung</p>
    <p class="mt-4 text-sm text-[#8fa4c0]">Diese Seite ist umgezogen: <a class="font-semibold text-teal-300 underline-offset-2 hover:underline" href="${href}">${text}</a></p>
  </main>
</body>
</html>
`;
}
