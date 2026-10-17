import type { SdbPreviewExampleId, SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { buildTeaserFromPrefill } from '@/lib/sdb-preview/map-teaser';

export interface SdbPreviewExampleConfig {
  id: SdbPreviewExampleId;
  label: string;
  description: string;
}

export const SDB_PREVIEW_EXAMPLES: SdbPreviewExampleConfig[] = [
  {
    id: 'bremsenreiniger',
    label: 'Bremsenreiniger',
    description: 'Lösemittel · entzündlich · typisch in der Werkstatt',
  },
  {
    id: 'aceton',
    label: 'Aceton',
    description: 'Entfetter · leicht entzündlich · Labor & Lack',
  },
  {
    id: 'epoxidharz2k',
    label: '2K-Epoxidharz',
    description: 'Gemisch · sensibilisierend · 2-Komponenten-System',
  },
];

/** Demo payloads — field names mirror gqr-backend SdbPrefillData. */
const MOCK_PREFILLS: Record<SdbPreviewExampleId, Parameters<typeof buildTeaserFromPrefill>[0]> = {
  bremsenreiniger: {
    previewToken: '',
    name: 'Bremsenreiniger Pro Clean',
    manufacturer: 'AutoChem GmbH, 50667 Köln',
    signal_word: 'Gefahr',
    ghs_pictograms: ['GHS02', 'GHS07'],
    h_statements: 'H225 Flüssigkeit und Dampf leicht entzündbar.\nH319 Verursacht schwere Augenreizung.',
    p_statements:
      'P210 Von Hitze, heißen Oberflächen, Funken, offenen Flammen sowie anderen Zündquellenarten fernhalten.\nP280 Schutzhandschuhe/Schutzkleidung/Augenschutz tragen.',
    ba_schutzmassnahmen:
      'Atemschutz bei unzureichender Belüftung. Chemikalienbeständige Handschuhe (Butyl). Augenschutz/Gesichtsschutz.',
    ba_gefahrfall: 'Dämpfe können mit Luft ein explosionsfähiges Gemisch bilden. Zündquellen fernhalten.',
    ba_erste_hilfe:
      'Einatmen: Frischluft, bei Beschwerden Arzt. Haut: Mit viel Wasser waschen. Augen: Mindestens 10 Minuten spülen.',
    ba_entsorgung: 'Entsorgung gemäß lokalen Vorschriften. Nicht in die Kanalisation gelangen lassen.',
    psa_gloves: 'Butylkautschuk, min. 0,4 mm',
  },
  aceton: {
    previewToken: '',
    name: 'Aceton technisch',
    manufacturer: 'SolvChem AG, 65929 Frankfurt am Main',
    signal_word: 'Gefahr',
    ghs_pictograms: ['GHS02', 'GHS07'],
    h_statements: 'H225 Flüssigkeit und Dampf leicht entzündbar.\nH336 Kann Schläfrigkeit und Benommenheit verursachen.',
    p_statements:
      'P210 Von Hitze fernhalten.\nP243 Maßnahmen gegen statische Entladungen treffen.',
    ba_schutzmassnahmen: 'Explosionssichere Ausrüstung. Geschlossene Systeme bevorzugen.',
    ba_gefahrfall: 'Dämpfe schwerer als Luft — Bodenbelüftung beachten.',
    ba_erste_hilfe: 'Augen sofort spülen. Kein Erbrechen bei Verschlucken.',
    ba_entsorgung: 'Abfallnummer gemäß AVV — gesammelt entsorgen.',
    psa_gloves: 'Nitril, EN 374',
  },
  epoxidharz2k: {
    previewToken: '',
    name: 'Epoxidharz 2K System Härter B',
    manufacturer: 'Coating Systems KG, 48155 Münster',
    signal_word: 'Gefahr',
    ghs_pictograms: ['GHS07', 'GHS08'],
    h_statements:
      'H317 Kann allergische Hautreaktionen verursachen.\nH411 Giftig für Wasserorganismen, mit langfristiger Wirkung.',
    p_statements:
      'P261 Einatmen von Nebel/Dampf vermeiden.\nP273 Freisetzung in die Umwelt vermeiden.',
    ba_schutzmassnahmen: 'Vollschutzanzug bei Spritznebel. Handschuhe aus Viton/Butyl.',
    ba_gefahrfall: 'Bei Hautkontakt sofort abwaschen. Keine Lösemittel auf Haut.',
    ba_erste_hilfe: 'Bei Hautrötung: Arzt. Kontaktallergie dokumentieren.',
    ba_entsorgung: 'Ausgehärtetes Material als Reststoff — flüssige Komponenten getrennt.',
    psa_gloves: 'Viton, min. 0,7 mm',
  },
};

export function buildMockTeaserForExample(exampleId: SdbPreviewExampleId, previewToken: string): SdbPreviewTeaser {
  const base = MOCK_PREFILLS[exampleId];
  return buildTeaserFromPrefill({ ...base, previewToken }, previewToken);
}
