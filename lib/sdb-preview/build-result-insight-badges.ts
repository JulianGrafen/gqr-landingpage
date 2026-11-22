import type { SdbPreviewTeaser, Trgs555PreviewSection } from '@/lib/sdb-preview/api-contract';

const SHARP_SECTION_TITLES = {
  identification: '1. Stoff-/Produktbezeichnung',
  hazards: '2. Gefahren für Mensch und Umwelt',
} as const;

export type ResultInsightBadgeId = 'signal' | 'storageClass' | 'hazardCount' | 'ghsCount';

export type ResultInsightBadge = {
  id: ResultInsightBadgeId;
  label: string;
};

const LGK_IN_TEXT = /\bLGK\s*([0-9]+(?:\.[0-9]+)?(?:\s*[A-D])?|10\s*[–-]\s*13)/i;

function normalizeStorageClassLabel(raw: string): string {
  const trimmed = raw.replace(/\s+/g, ' ').trim();
  return /^lgk\b/i.test(trimmed) ? trimmed.replace(/^lgk/i, 'LGK') : `LGK ${trimmed}`;
}

export function resolveStorageClassLabel(teaser: SdbPreviewTeaser): string | null {
  const explicit = teaser.storageClass?.trim();
  if (explicit) return normalizeStorageClassLabel(explicit);

  const haystack = [teaser.casNumber, ...teaser.sections.map((section) => section.body)].filter(Boolean).join('\n');
  const match = haystack.match(LGK_IN_TEXT);
  if (!match?.[1]) return null;
  return `LGK ${match[1].replace(/\s+/g, ' ').trim()}`;
}

/** Kompakte Eckdaten-Badges — nur Werte, die im Teaser tatsächlich vorhanden sind. */
export function buildResultInsightBadges(teaser: SdbPreviewTeaser): readonly ResultInsightBadge[] {
  const badges: ResultInsightBadge[] = [];

  if (teaser.signalWord) {
    badges.push({ id: 'signal', label: `Signalwort: ${teaser.signalWord}` });
  }

  const storageClass = resolveStorageClassLabel(teaser);
  if (storageClass) {
    badges.push({ id: 'storageClass', label: storageClass });
  }

  const hazardCount = teaser.statementCounts?.hazard ?? teaser.hazardStatements.length;
  if (hazardCount > 0) {
    badges.push({
      id: 'hazardCount',
      label: hazardCount === 1 ? '1 H-Satz' : `${hazardCount} H-Sätze`,
    });
  }

  if (teaser.ghsPictograms.length > 0) {
    const count = teaser.ghsPictograms.length;
    badges.push({
      id: 'ghsCount',
      label: count === 1 ? '1 GHS-Symbol' : `${count} GHS-Symbole`,
    });
  }

  return badges;
}

export function isSharpPreviewSectionKey(key: SdbPreviewTeaser['sections'][number]['key']): boolean {
  return key === 'identification' || key === 'hazards';
}

export function sharpPreviewSectionBody(
  teaser: SdbPreviewTeaser,
  key: 'identification' | 'hazards',
): string {
  if (key === 'identification') {
    return `${teaser.tradeName}\nHersteller/Lieferant: ${teaser.manufacturer}`;
  }
  const hazards = teaser.hazardStatements.join('\n');
  if (teaser.signalWord && hazards) {
    return `Signalwort: ${teaser.signalWord}\n\n${hazards}`;
  }
  if (teaser.signalWord) return `Signalwort: ${teaser.signalWord}`;
  return hazards;
}

export function resolveSharpPreviewSections(teaser: SdbPreviewTeaser): Trgs555PreviewSection[] {
  return (['identification', 'hazards'] as const).map((key) => {
    const existing = teaser.sections.find((section) => section.key === key);
    return {
      key,
      title: existing?.title ?? SHARP_SECTION_TITLES[key],
      unlocked: true,
      body: sharpPreviewSectionBody(teaser, key),
    };
  });
}

export function resolveLockedPreviewSections(teaser: SdbPreviewTeaser): Trgs555PreviewSection[] {
  return teaser.sections.filter((section) => !isSharpPreviewSectionKey(section.key));
}
