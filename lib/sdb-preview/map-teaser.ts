import type { SdbPreviewTeaser, Trgs555PreviewSection } from '@/lib/sdb-preview/api-contract';

export type PrefillLike = {
  previewToken?: string;
  name?: string | null;
  manufacturer?: string | null;
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

function splitStatements(raw: string | null | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/\n|(?=H\d{3})|(?=P\d{3})/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildSections(p: PrefillLike): Trgs555PreviewSection[] {
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
      body: `${p.name ?? '—'}\nHersteller/Lieferant: ${p.manufacturer ?? '—'}`,
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
      body: 'QR-Notfallpass für Ersthelfer am Lagerort — nach Freischaltung verfügbar.',
    },
  ];
}

export function buildTeaserFromPrefill(p: PrefillLike, previewToken: string): SdbPreviewTeaser {
  const ghs = Array.isArray(p.ghs_pictograms) ? p.ghs_pictograms : [];
  const hazardStatements = splitStatements(p.h_statements);

  const qrTarget = `https://gefahrstoff-qr.de/notfall/preview/${encodeURIComponent(previewToken)}/`;
  const qrPreviewUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(qrTarget)}`;

  return {
    previewToken,
    tradeName: p.name?.trim() || 'Unbenannter Stoff',
    manufacturer: p.manufacturer?.trim() || '—',
    signalWord: p.signal_word ?? null,
    ghsPictograms: ghs,
    hazardStatements,
    sections: buildSections(p),
    qrPreviewUrl,
  };
}

/** Maps gqr-backend API JSON to teaser (server returns pre-mapped teaser or prefill). */
export function mapApiJsonToTeaser(json: unknown): SdbPreviewTeaser | null {
  if (!json || typeof json !== 'object') return null;
  const root = json as Record<string, unknown>;
  if (root.teaser && typeof root.teaser === 'object') {
    return root.teaser as SdbPreviewTeaser;
  }
  if (root.ok === true && root.data && typeof root.data === 'object') {
    const token =
      typeof root.previewToken === 'string'
        ? root.previewToken
        : `preview-${Date.now()}`;
    return buildTeaserFromPrefill(root.data as PrefillLike, token);
  }
  return null;
}
