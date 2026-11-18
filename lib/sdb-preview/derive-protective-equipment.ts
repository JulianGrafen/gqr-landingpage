import type { ProtectiveEquipmentId } from '@/lib/sdb-preview/api-contract';

/** Schlüsselwörter aus P-Sätzen (z. B. P280, P284) und SDB 8.2, Reihenfolge = Anzeige-Reihenfolge. */
const PROTECTIVE_EQUIPMENT_KEYWORDS: ReadonlyArray<{ id: ProtectiveEquipmentId; pattern: RegExp }> = [
  { id: 'eye_protection', pattern: /augenschutz|gesichtsschutz|schutzbrille|korbbrille/i },
  { id: 'hand_protection', pattern: /handschuh|handschutz/i },
  { id: 'respiratory_protection', pattern: /atemschutz/i },
  { id: 'protective_clothing', pattern: /schutzkleidung|schutzanzug|chemikalienschutzanzug/i },
];

/**
 * Leitet PSA-Gebotszeichen aus SDB-Freitexten ab.
 * Nur als Vorschau-Hinweis gedacht; maßgeblich bleibt SDB-Abschnitt 8.2 und die Prüfung durch die SiFa.
 */
export function deriveProtectiveEquipment(texts: ReadonlyArray<string | null | undefined>): ProtectiveEquipmentId[] {
  const corpus = texts.filter((text): text is string => Boolean(text?.trim())).join('\n');
  if (!corpus) return [];
  return PROTECTIVE_EQUIPMENT_KEYWORDS.filter(({ pattern }) => pattern.test(corpus)).map(({ id }) => id);
}
