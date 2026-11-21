/**
 * Schreibt kontextbezogene Branchen-Callouts (config/internal-links/solution-callouts.ts) in
 * handgepflegte statische HTML-Seiten (z. B. Blog). Marker: `<!--AEO:SOLUTION_CALLOUT_PRIMARY-->`
 * und `<!--AEO:SOLUTION_CALLOUT_CLOSING-->`. Fehlt ein Marker für einen konfigurierten Slot,
 * bricht das Skript ab.
 */
import fs from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { InternalSolutionBanner } from '@/components/seo/InternalSolutionBanner';
import type { SolutionCalloutSlot } from '@/config/internal-links/solution-callouts';
import { getEditorialSolutionCallout, getStaticHtmlCalloutSourcePaths } from '@/lib/seo/internalLinks';
import { replaceMarkedBlocks, type MarkedBlockRenderers } from '@/lib/static-html/replace-marked-blocks';

const ROOT = process.cwd();
const SLOTS: readonly SolutionCalloutSlot[] = ['primary', 'closing'];

function markerName(slot: SolutionCalloutSlot): string {
  return `SOLUTION_CALLOUT_${slot.toUpperCase()}`;
}

for (const sourcePath of getStaticHtmlCalloutSourcePaths()) {
  const file = path.join(ROOT, sourcePath, 'index.html');
  if (!fs.existsSync(file)) {
    throw new Error(`sync-static-solution-callouts: ${file} existiert nicht.`);
  }

  const renderers: MarkedBlockRenderers = {};
  for (const slot of SLOTS) {
    const callout = getEditorialSolutionCallout(sourcePath, slot);
    if (callout) {
      renderers[markerName(slot)] = () =>
        renderToStaticMarkup(<InternalSolutionBanner callout={callout} variant="static-blog" />);
    }
  }

  fs.writeFileSync(file, replaceMarkedBlocks(fs.readFileSync(file, 'utf8'), renderers), 'utf8');
  console.log(`✓ Callouts → ${sourcePath} (${Object.keys(renderers).join(', ')})`);
}
