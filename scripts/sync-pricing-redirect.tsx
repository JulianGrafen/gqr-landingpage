/**
 * /pricing/ wird über Next Static Export (app/pricing/page.tsx) ausgeliefert.
 * Dieses Script bleibt als Guard: kein Redirect mehr auf /#preise und keine DPP-Flash-Reste im Repo-Root.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const LEGACY_PRICING_HTML = resolve(process.cwd(), 'pricing/index.html');
const DPP_LEGACY_PATTERN = /dpp-flash|dppflash|digitaler produktpass|\bdpp\b/i;

if (existsSync(LEGACY_PRICING_HTML)) {
  const legacy = readFileSync(LEGACY_PRICING_HTML, 'utf8');
  if (legacy.includes('http-equiv="refresh"') && legacy.includes('/#preise')) {
    console.warn(
      'Hinweis: pricing/index.html ist noch eine Legacy-Weiterleitung. Nach `next build` und sync-github-pages wird out/pricing/ kopiert.',
    );
  }
  if (DPP_LEGACY_PATTERN.test(legacy)) {
    console.error('pricing/index.html enthält DPP-Flash-Reste.');
    process.exit(1);
  }
}

console.log('✓ /pricing/: Quelle ist app/pricing/page.tsx (kein Redirect-Sync mehr).');