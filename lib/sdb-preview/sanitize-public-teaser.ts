import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { sharpPreviewSectionBody } from '@/lib/sdb-preview/build-result-insight-badges';
import { deriveProtectiveEquipment } from '@/lib/sdb-preview/derive-protective-equipment';
import { splitStatements } from '@/lib/sdb-preview/map-teaser';

const PLACEHOLDER = 'Nach Freischaltung in der App verfügbar.';

/**
 * „Proof of Work“: so viel bleibt im Client-State, damit Nutzer die Extraktion aus IHREM SDB prüfen können.
 * Alles darüber hinaus (Abschnitt 4–6, Freitexte) bleibt serverseitig bis zur Registrierung.
 */
export const PUBLIC_TEASER_LIMITS = {
  hazardStatements: 4,
  precautionaryStatements: 2,
} as const;

const P_STATEMENT_LINE = /^P\d{3}/;

function resolvePrecautionaryStatements(teaser: SdbPreviewTeaser): string[] | undefined {
  if (teaser.precautionaryStatements) return teaser.precautionaryStatements;
  const protectiveBody = teaser.sections.find((section) => section.key === 'protective_measures')?.body;
  const fromSection = splitStatements(protectiveBody).filter((line) => P_STATEMENT_LINE.test(line));
  return fromSection.length > 0 ? fromSection : undefined;
}

/**
 * Kürzt den Teaser für die öffentliche Landing: Abschnitt-Freitexte werden ersetzt,
 * H-/P-Sätze auf die ersten Einträge begrenzt (Gesamtzahl bleibt in `statementCounts`).
 */
export function sanitizePublicTeaser(teaser: SdbPreviewTeaser): SdbPreviewTeaser {
  const precautionaryStatements = resolvePrecautionaryStatements(teaser);
  const protectiveBody = teaser.sections.find((section) => section.key === 'protective_measures')?.body;

  return {
    ...teaser,
    hazardStatements: teaser.hazardStatements.slice(0, PUBLIC_TEASER_LIMITS.hazardStatements),
    precautionaryStatements: precautionaryStatements?.slice(0, PUBLIC_TEASER_LIMITS.precautionaryStatements),
    protectiveEquipment:
      teaser.protectiveEquipment ?? deriveProtectiveEquipment([...(precautionaryStatements ?? []), protectiveBody]),
    statementCounts: teaser.statementCounts ?? {
      hazard: teaser.hazardStatements.length,
      precautionary: precautionaryStatements ? precautionaryStatements.length : null,
    },
    sections: teaser.sections.map((section) => {
      if (section.key === 'identification' || section.key === 'hazards') {
        return {
          ...section,
          unlocked: true,
          body: sharpPreviewSectionBody(teaser, section.key),
        };
      }
      return { ...section, unlocked: false, body: PLACEHOLDER };
    }),
  };
}
