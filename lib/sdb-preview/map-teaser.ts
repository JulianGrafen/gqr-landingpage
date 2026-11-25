import type { SdbPreviewTeaser, Trgs555PreviewSection } from '@/lib/sdb-preview/api-contract';
import { deriveProtectiveEquipment } from '@/lib/sdb-preview/derive-protective-equipment';
import {
  parseSdbPrefill,
  parseSdbPreviewTeaser,
  TEASER_FALLBACK_MANUFACTURER,
  TEASER_FALLBACK_TRADE_NAME,
  type SdbPrefill,
} from '@/lib/sdb-preview/teaser-schema';

export type PrefillLike = {
  previewToken?: string;
  name?: string | null;
  manufacturer?: string | null;
  cas_number?: string | null;
  lgk?: string | null;
  storage_class?: string | null;
  lagerklasse?: string | null;
  storageClassTrgs510?: string | null;
  signal_word?: 'Gefahr' | 'Achtung' | null;
  ghs_pictograms?: string[] | null;
  h_statements?: string | null;
  p_statements?: string | null;
  ba_schutzmassnahmen?: string | null;
  ba_gefahrfall?: string | null;
  ba_erste_hilfe?: string | null;
  ba_entsorgung?: string | null;
  psa_gloves?: string | null;
  ba_handling_storage?: string | null;
};

/**
 * Trennt H-/P-Sätze an Zeilenumbrüchen bzw. vor einem neuen Code.
 * Der Lookbehind verhindert Splits in Kombi-Codes (`P303+P361+P353`) und `EUH…`-Sätzen.
 */
export function splitStatements(raw: string | null | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/\n|(?<![+\w])(?=[HP]\d{3})/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function pickStorageClass(p: SdbPrefill): string | undefined {
  return p.lgk ?? p.storage_class ?? p.lagerklasse ?? p.storageClassTrgs510;
}

function buildSections(p: SdbPrefill): Trgs555PreviewSection[] {
  const hazards = splitStatements(p.h_statements);
  const hazardBody =
    hazards.length > 0
      ? hazards.join('\n')
      : 'Gefahren für Mensch und Umwelt werden aus dem Sicherheitsdatenblatt übernommen.';

  const protective =
    [p.ba_schutzmassnahmen, p.p_statements, p.psa_gloves ? `PSA Handschutz: ${p.psa_gloves}` : null]
      .filter(Boolean)
      .join('\n\n') || 'Schutzmaßnahmen und Verhaltensregeln (P-Sätze, PSA).';

  return [
    {
      key: 'identification',
      title: '1. Stoff-/Produktbezeichnung',
      unlocked: true,
      body: `${p.name ?? TEASER_FALLBACK_TRADE_NAME}\nHersteller/Lieferant: ${p.manufacturer ?? TEASER_FALLBACK_MANUFACTURER}`,
    },
    {
      key: 'hazards',
      title: '2. Gefahren für Mensch und Umwelt',
      unlocked: true,
      body: p.signal_word ? `Signalwort: ${p.signal_word}\n\n${hazardBody}` : hazardBody,
    },
    {
      key: 'protective_measures',
      title: '3. Schutzmaßnahmen und Verhaltensregeln',
      unlocked: false,
      body: protective,
    },
    {
      key: 'emergency',
      title: '4. Verhalten im Gefahrfall',
      unlocked: false,
      body: p.ba_gefahrfall ?? 'Maßnahmen bei Brand, Leckage und Freisetzung.',
    },
    {
      key: 'first_aid',
      title: '5. Erste Hilfe',
      unlocked: false,
      body: p.ba_erste_hilfe ?? 'Erste-Hilfe-Maßnahmen gemäß Sicherheitsdatenblatt.',
    },
    {
      key: 'disposal',
      title: '6. Sachgerechte Entsorgung',
      unlocked: false,
      body: p.ba_entsorgung ?? 'Entsorgungshinweise gemäß AVV und Herstellerangaben.',
    },
    {
      key: 'emergency_qr',
      title: 'Notfall-QR-Code (Arbeitsplatz)',
      unlocked: false,
      body: 'QR-Notfallpass für Ersthelfer am Lagerort: nach Freischaltung verfügbar.',
    },
  ];
}

/**
 * Baut den Teaser aus Prefill-Rohdaten. Die Eingabe wird vorab per Zod normalisiert,
 * damit `null`, Zahlen oder fehlende Felder aus API/Demo-Daten nie zum Render-Crash führen.
 */
export function buildTeaserFromPrefill(rawPrefill: PrefillLike | unknown, previewToken: string): SdbPreviewTeaser {
  const p = parseSdbPrefill(rawPrefill);
  const ghs = p.ghs_pictograms;
  const hazardStatements = splitStatements(p.h_statements);
  const precautionaryStatements = splitStatements(p.p_statements);

  const qrTarget = `https://gefahrstoff-qr.de/notfall/preview/${encodeURIComponent(previewToken)}/`;
  const qrPreviewUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(qrTarget)}`;

  return {
    previewToken,
    tradeName: p.name ?? TEASER_FALLBACK_TRADE_NAME,
    manufacturer: p.manufacturer ?? TEASER_FALLBACK_MANUFACTURER,
    casNumber: p.cas_number,
    storageClass: pickStorageClass(p),
    signalWord: p.signal_word,
    ghsPictograms: ghs,
    hazardStatements,
    precautionaryStatements,
    protectiveEquipment: deriveProtectiveEquipment([
      p.p_statements,
      p.ba_schutzmassnahmen,
      p.psa_gloves ? `Handschuhe: ${p.psa_gloves}` : null,
    ]),
    sections: buildSections(p),
    qrPreviewUrl,
  };
}

/**
 * Maps gqr-backend API JSON to teaser (server returns pre-mapped teaser or prefill).
 * Die Server-Antwort wird nie ungeprüft gecastet: `parseSdbPreviewTeaser` ersetzt fehlende
 * oder falsch typisierte Felder durch sichere Defaults.
 */
export function mapApiJsonToTeaser(json: unknown): SdbPreviewTeaser | null {
  if (!json || typeof json !== 'object') return null;
  const root = json as Record<string, unknown>;
  const rootPreviewToken = typeof root.previewToken === 'string' ? root.previewToken : undefined;

  if (root.teaser && typeof root.teaser === 'object') {
    const teaser = parseSdbPreviewTeaser(root.teaser, rootPreviewToken);
    if (!teaser) return null;
    return rootPreviewToken ? { ...teaser, previewToken: rootPreviewToken } : teaser;
  }

  if (root.ok === true && root.data && typeof root.data === 'object') {
    const token =
      typeof root.previewToken === 'string'
        ? root.previewToken
        : `preview-${Date.now()}`;
    return buildTeaserFromPrefill(root.data, token);
  }

  return null;
}
