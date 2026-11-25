import { z } from 'zod';
import type {
  ProtectiveEquipmentId,
  SdbPreviewTeaser,
  Trgs555PreviewSection,
  Trgs555SectionKey,
} from '@/lib/sdb-preview/api-contract';

/**
 * Laufzeit-Validierung aller SDB-Vorschau-Daten (API-Antwort, Demo-Prefill, Mock).
 *
 * Grundsatz: Ein fehlendes oder kaputtes Einzelfeld (H-Sätze, P-Sätze, PSA, Lagerklasse,
 * GHS-Piktogramme) darf nie die Seite crashen. Ungültige Werte fallen auf sichere Defaults
 * zurück; nur ein fehlender `previewToken` macht den Teaser unbrauchbar.
 */

const TRGS555_SECTION_KEYS = [
  'identification',
  'hazards',
  'protective_measures',
  'emergency',
  'first_aid',
  'disposal',
  'emergency_qr',
] as const satisfies readonly Trgs555SectionKey[];

const PROTECTIVE_EQUIPMENT_IDS = [
  'eye_protection',
  'hand_protection',
  'respiratory_protection',
  'protective_clothing',
] as const satisfies readonly ProtectiveEquipmentId[];

export const TEASER_FALLBACK_TRADE_NAME = 'Unbenannter Stoff';
export const TEASER_FALLBACK_MANUFACTURER = 'Nicht angegeben';

function toTrimmedText(value: unknown): string | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Text oder `undefined`, egal ob `null`, Zahl, Leerstring oder Objekt geliefert wird. */
export const optionalTextSchema = z.unknown().transform(toTrimmedText);

/** Text mit Pflicht-Fallback. */
const textWithFallback = (fallback: string) => z.unknown().transform((value) => toTrimmedText(value) ?? fallback);

/** Liste aus Texten; Nicht-Arrays werden zu `[]`, ungültige Einträge werden verworfen. */
export const textListSchema = z
  .unknown()
  .transform((value) =>
    Array.isArray(value) ? value.map(toTrimmedText).filter((item): item is string => item !== undefined) : [],
  );

function oneOf<const T extends readonly string[]>(allowed: T) {
  return (value: unknown): value is T[number] => typeof value === 'string' && allowed.includes(value);
}

const isSectionKey = oneOf(TRGS555_SECTION_KEYS);
const isProtectiveEquipmentId = oneOf(PROTECTIVE_EQUIPMENT_IDS);

const signalWordSchema = z
  .unknown()
  .transform((value): SdbPreviewTeaser['signalWord'] => (value === 'Gefahr' || value === 'Achtung' ? value : null));

const sectionSchema = z.object({
  key: z.unknown(),
  title: optionalTextSchema,
  unlocked: z.unknown(),
  body: optionalTextSchema,
});

const sectionListSchema = z.unknown().transform((value): Trgs555PreviewSection[] => {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw): Trgs555PreviewSection[] => {
    const parsed = sectionSchema.safeParse(raw);
    if (!parsed.success || !isSectionKey(parsed.data.key) || !parsed.data.title) return [];
    return [
      {
        key: parsed.data.key,
        title: parsed.data.title,
        unlocked: parsed.data.unlocked === true,
        body: parsed.data.body ?? '',
      },
    ];
  });
});

const statementCountsSchema = z
  .object({
    hazard: z.number().int().nonnegative(),
    precautionary: z.number().int().nonnegative().nullable(),
  })
  .optional()
  .catch(undefined);

const teaserSchema = z.object({
  previewToken: optionalTextSchema,
  tradeName: textWithFallback(TEASER_FALLBACK_TRADE_NAME),
  manufacturer: textWithFallback(TEASER_FALLBACK_MANUFACTURER),
  casNumber: optionalTextSchema,
  storageClass: optionalTextSchema,
  signalWord: signalWordSchema,
  ghsPictograms: textListSchema,
  hazardStatements: textListSchema,
  precautionaryStatements: textListSchema,
  protectiveEquipment: z
    .unknown()
    .transform((value) => (Array.isArray(value) ? value.filter(isProtectiveEquipmentId) : [])),
  statementCounts: statementCountsSchema,
  sections: sectionListSchema,
  qrPreviewUrl: optionalTextSchema,
});

/**
 * Validiert einen Teaser aus beliebiger Quelle.
 * @returns `null`, wenn kein Objekt oder kein `previewToken` vorliegt (nicht übertragbar, nicht darstellbar).
 */
export function parseSdbPreviewTeaser(raw: unknown, fallbackPreviewToken?: string): SdbPreviewTeaser | null {
  const parsed = teaserSchema.safeParse(raw);
  if (!parsed.success) return null;
  const { previewToken, ...teaser } = parsed.data;
  const token = previewToken ?? toTrimmedText(fallbackPreviewToken);
  if (!token) return null;
  return { ...teaser, previewToken: token };
}

/**
 * Prefill-Rohdaten (gqr-backend `SdbPrefillData`, Demo-Extraktionen, Mocks).
 * Alle Felder optional; falsche Typen werden zu `undefined` bzw. `[]`.
 */
export const sdbPrefillSchema = z.object({
  name: optionalTextSchema,
  manufacturer: optionalTextSchema,
  cas_number: optionalTextSchema,
  lgk: optionalTextSchema,
  storage_class: optionalTextSchema,
  lagerklasse: optionalTextSchema,
  storageClassTrgs510: optionalTextSchema,
  signal_word: signalWordSchema,
  ghs_pictograms: textListSchema,
  h_statements: optionalTextSchema,
  p_statements: optionalTextSchema,
  ba_schutzmassnahmen: optionalTextSchema,
  ba_gefahrfall: optionalTextSchema,
  ba_erste_hilfe: optionalTextSchema,
  ba_entsorgung: optionalTextSchema,
  psa_gloves: optionalTextSchema,
  ba_handling_storage: optionalTextSchema,
});

export type SdbPrefill = z.infer<typeof sdbPrefillSchema>;

/** Prefill sicher parsen; liefert bei Nicht-Objekten ein leeres Prefill statt einer Exception. */
export function parseSdbPrefill(raw: unknown): SdbPrefill {
  const parsed = sdbPrefillSchema.safeParse(raw ?? {});
  return parsed.success ? parsed.data : sdbPrefillSchema.parse({});
}
