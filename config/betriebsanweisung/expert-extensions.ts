import type {
  AgwTrgs900Field,
  ExpertDataField,
  HazardousSubstanceSeoEntry,
  Trgs510StorageExpert,
} from '@/config/betriebsanweisung/types';

/** Ergänzende Felder pro Slug — wird in `entries.ts` mit Basisdaten zusammengeführt. */
export type BetriebsanweisungExpertExtension = Pick<
  HazardousSubstanceSeoEntry,
  | 'documentDisplayName'
  | 'chemicalFormula'
  | 'ecNumber'
  | 'flashPoint'
  | 'ignitionTemperature'
  | 'agwTrgs900'
  | 'applicationAreaWorkplace'
  | 'trgs510Storage'
  | 'faqItems'
>;

const LGK3_INCOMPAT: Trgs510StorageExpert = {
  zusammenlagerungsverbote: [
    'LGK 1 (Säuren) — getrennt lagern',
    'LGK 4.1A (Entzündbare feste Stoffe)',
    'LGK 5.1A / 5.1B (Oxidationsmittel)',
    'LGK 5.2 (Organische Peroxide)',
  ],
  safetyCabinetNotes:
    'Entzündbare Flüssigkeiten (LGK 3) in zugelassenen Sicherheitsschränken für brennbare Flüssigkeiten (bspw. EN 14470-1) lagern; Lüftung, Zündschutz und Menge je Brandabschnitt nach Betriebskonzept.',
};

export const BETRIEBSANWEISUNG_EXPERT_SLUGS = [
  'aceton-trgs-555',
  'isopropanol-trgs-555',
  'bremsenreiniger-trgs-555',
  'schwefelsaure-trgs-555',
  'natronlauge-trgs-555',
  'kuehlschmierstoff-trgs-555',
  'adblue-trgs-555',
  'epoxidharz-trgs-555',
  'wasserstoffperoxid-trgs-555',
  'dieselkraftstoff-trgs-555',
  'sanitaerreiniger-trgs-555',
] as const;

export type BetriebsanweisungExpertSlug = (typeof BETRIEBSANWEISUNG_EXPERT_SLUGS)[number];

export const BETRIEBSANWEISUNG_EXPERT_EXTENSIONS: Record<
  BetriebsanweisungExpertSlug,
  BetriebsanweisungExpertExtension
> = {
  'aceton-trgs-555': {
    documentDisplayName: 'Aceton (Propanon)',
    chemicalFormula: 'C₃H₆O',
    ecNumber: { kind: 'value', text: '200-662-2' },
    flashPoint: { kind: 'value', text: '−18 °C (geschlossener Tiegel)' },
    ignitionTemperature: { kind: 'value', text: '465 °C' },
    agwTrgs900: { kind: 'limit', text: '1200 ppm (2900 mg/m³) — TRGS 900 (Aceton)' },
    applicationAreaWorkplace:
      'Entfettung, Verdünnung, Reinigung und Laborhandhabung; nur in belüfteten Bereichen, fern von Zündquellen.',
    trgs510Storage: LGK3_INCOMPAT,
    faqItems: [
      {
        question: 'Welche Handschuhe sind bei Aceton vorgeschrieben?',
        answer:
          'Butylkautschuk ≥ 0,7 mm für längeren Kontakt; Nitril ist bei Aceton meist ungeeignet (schnelle Durchdringung). Für Spritzschutz kurzzeitig mehrlagiges Nitril nur mit dokumentierter Durchbruchzeit — Angaben aus SDB Abschnitt 8.',
      },
      {
        question: 'Muss Aceton zwingend ins Gefahrstoffverzeichnis aufgenommen werden?',
        answer:
          'Ja — ab dem ersten bereitgestellten Gebinde (§ 6 Abs. 12 GefStoffV). Menge, Ort und Verwendung dokumentieren; SDB-Version und Betriebsanweisung verknüpfen.',
      },
      {
        question: 'Wie oft muss die Unterweisung anhand dieser Betriebsanweisung erfolgen?',
        answer:
          'Mindestens jährlich und vor Aufnahme der Tätigkeit (§ 14 Abs. 2 GefStoffV), zusätzlich bei wesentlichen Änderungen von Stoff, Verfahren oder Erkenntnissen.',
      },
    ],
  },
  'isopropanol-trgs-555': {
    documentDisplayName: 'Isopropanol (2-Propanol)',
    chemicalFormula: 'C₃H₈O',
    ecNumber: { kind: 'value', text: '200-661-7' },
    flashPoint: { kind: 'value', text: '12 °C (geschlossener Tiegel)' },
    ignitionTemperature: { kind: 'value', text: '425 °C' },
    agwTrgs900: { kind: 'limit', text: '200 ppm (500 mg/m³) — TRGS 900 (Isopropanol)' },
    applicationAreaWorkplace:
      'Reinigung, Desinfektion, Entfettung in Werkstatt, Labor und Produktion; Dämpfe/Nebel vermeiden, Lüftung sicherstellen.',
    trgs510Storage: LGK3_INCOMPAT,
    faqItems: [
      {
        question: 'Welche Handschuhe sind bei Isopropanol vorgeschrieben?',
        answer:
          'Nitril nur für Spritzschutz und kurzen Kontakt (ausreichende Schichtdicke, Durchbruchzeit beachten). Für längeres Umfüllen oder Einweichen: Butylkautschuk ≥ 0,5–0,7 mm — Materialwahl immer am Hersteller-SDB Abschnitt 8 abstimmen.',
      },
      {
        question: 'Muss Isopropanol zwingend ins Gefahrstoffverzeichnis aufgenommen werden?',
        answer:
          'Ja — ab dem ersten Gebinde am Arbeitsplatz (§ 6 Abs. 12 GefStoffV), inkl. Lager und Entnahmestellen. Auch Desinfektionsmittel sind erfasst, wenn betrieblich bereitgestellt.',
      },
      {
        question: 'Wie oft muss die Unterweisung anhand dieser Betriebsanweisung erfolgen?',
        answer:
          'Mindestens einmal jährlich und vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV), erneut bei neuen Erkenntnissen, Unfällen oder geändertem Einsatz.',
      },
    ],
  },
  'bremsenreiniger-trgs-555': {
    documentDisplayName: 'Bremsenreiniger (Kohlenwasserstoff-Gemisch)',
    chemicalFormula: null,
    ecNumber: {
      kind: 'mixtureVariable',
      note: 'Keine einheitliche EG-Nummer — je nach Rezeptur (Kohlenwasserstoffe, Lösemittel).',
    },
    flashPoint: {
      kind: 'mixtureVariable',
      note: 'Typisch < 23 °C (Flam. Liq. 2) — exakter Flammpunkt im Hersteller-SDB.',
    },
    ignitionTemperature: {
      kind: 'mixtureVariable',
      note: 'Abhängig von Hauptkomponenten (oft 200–400 °C) — SDB Abschnitt 9.',
    },
    agwTrgs900: {
      kind: 'mixtureVariable',
      note: 'AGW richtet sich nach lösemittelhaltigen Anteilen (Kohlenwasserstoffe, n-Hexan-Anteile etc.) — TRGS 900 und SDB Abschnitt 8.',
    },
    applicationAreaWorkplace:
      'Sprühreinigung von Bremsen und Maschinenteilen in Kfz-Werkstätten; nur mit Absaugung/Atemschutz, keine offenen Flammen.',
    trgs510Storage: LGK3_INCOMPAT,
    faqItems: [
      {
        question: 'Welche Handschuhe sind bei Bremsenreiniger vorgeschrieben?',
        answer:
          'Butyl- oder Viton-Handschuhe (≥ 0,7 mm) gegen Lösemitteldurchdringung; Nitril oft unzureichend bei chlorfreien KW-Reinigern. Spritzschutz: Schutzbrille/Gesichtsschutz.',
      },
      {
        question: 'Muss Bremsenreiniger ins Gefahrstoffverzeichnis?',
        answer:
          'Ja — jedes Produkt/Handelsname separat ab erstem Gebinde (§ 6 Abs. 12 GefStoffV), weil Rezepturen und H-Sätze variieren.',
      },
      {
        question: 'Wie oft muss die Unterweisung erfolgen?',
        answer:
          'Jährlich und vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV), zusätzlich bei Produktwechsel oder neuen SDB-Versionen.',
      },
    ],
  },
  'schwefelsaure-trgs-555': {
    documentDisplayName: 'Schwefelsäure (wässrige Lösung)',
    chemicalFormula: 'H₂SO₄',
    ecNumber: { kind: 'value', text: '231-639-5' },
    flashPoint: { kind: 'notApplicable', note: 'Nicht entzündbar (wässrige Lösung)' },
    ignitionTemperature: { kind: 'notApplicable', note: 'Nicht entzündbar' },
    agwTrgs900: {
      kind: 'limit',
      text: '0,1 mg/m³ (Einatemschutz) — TRGS 900 (Schwefelsäure, Nebel)',
    },
    applicationAreaWorkplace:
      'Galvanik, Batteriepflege, Neutralisation — nur mit Säureschutz, Gesichtsschutz und Notfall-Dusche.',
    trgs510Storage: {
      zusammenlagerungsverbote: [
        'LGK 8B (Laugen) — keine Lagerung neben Natronlauge',
        'LGK 3 / 4.1A / 5.1 — oxidierende und entzündbare Stoffe getrennt',
        'Metalle korrosionsgefährdet — passende Behältermaterialien',
      ],
      safetyCabinetNotes:
        'LGK 1: Säureschrank (korrosionsbeständig, bündig wasserdicht) oder separater Säureraum; Auffangwanne, Belüftung, Augenspülung/Notdusche in Reichweite.',
    },
    faqItems: [
      {
        question: 'Welche Handschuhe bei Schwefelsäure?',
        answer:
          'Säurefeste Materialien (Butyl, Viton, Neopren, ≥ 0,7 mm) — kein Standard-Nitril bei höherer Konzentration. SDB Abschnitt 8 ist maßgeblich.',
      },
      {
        question: 'Verzeichnispflicht?',
        answer: 'Ja ab erstem Gebinde (§ 6 Abs. 12 GefStoffV), Konzentration und Ort dokumentieren.',
      },
      {
        question: 'Unterweisungsintervall?',
        answer: 'Jährlich und vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV).',
      },
    ],
  },
  'natronlauge-trgs-555': {
    documentDisplayName: 'Natronlauge (Natriumhydroxidlösung)',
    chemicalFormula: 'NaOH (in H₂O)',
    ecNumber: { kind: 'value', text: '215-185-5' },
    flashPoint: { kind: 'notApplicable', note: 'Nicht entzündbar' },
    ignitionTemperature: { kind: 'notApplicable', note: 'Nicht entzündbar' },
    agwTrgs900: { kind: 'limit', text: '1 mg/m³ — TRGS 900 (Natriumhydroxid, Einatemschutz)' },
    applicationAreaWorkplace: 'Reinigung, CIP-Anlagen, Neutralisation — Augen-/Hautschutz zwingend.',
    trgs510Storage: {
      zusammenlagerungsverbote: [
        'LGK 1 (Säuren) — Reaktionsgefahr',
        'LGK 3 / 4.1 / 5.1 — getrennt lagern',
        'Aluminium und Zink nicht als Lagerbehälter',
      ],
      safetyCabinetNotes:
        'LGK 8B: Laugenbeständiger Schrank oder separater Raum mit Auffangwanne; Verschluss, Kennzeichnung, Dusche/Augenspülung.',
    },
    faqItems: [
      {
        question: 'Welche Handschuhe bei Natronlauge?',
        answer: 'Butyl, Viton oder PVC (≥ 0,7 mm); bei Spritzern Gesichtsschutz. Keine porösen Handschuhe.',
      },
      {
        question: 'Verzeichnispflicht?',
        answer: 'Ja (§ 6 Abs. 12 GefStoffV) — auch fertige Reinigerprodukte.',
      },
      {
        question: 'Unterweisung?',
        answer: 'Jährlich + vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV).',
      },
    ],
  },
  'kuehlschmierstoff-trgs-555': {
    documentDisplayName: 'Kühlschmierstoff (Emulsion/Gemisch)',
    chemicalFormula: null,
    ecNumber: { kind: 'mixtureVariable', note: 'Produktbezogen — Mineralöl-/Esteranteile mit eigenen EG-Nrn.' },
    flashPoint: {
      kind: 'mixtureVariable',
      note: 'Oft > 100 °C (Mineralölemulsion) — Hersteller-SDB prüfen.',
    },
    ignitionTemperature: {
      kind: 'mixtureVariable',
      note: 'Abhängig von Basisöl und Additiven — SDB Abschnitt 9.',
    },
    agwTrgs900: {
      kind: 'mixtureVariable',
      note: 'TRGS 611 / TRGS 900 für Ölnebel und Additive — kein einheitlicher AGW für alle KSS.',
    },
    applicationAreaWorkplace: 'Metallbearbeitung (Nassbearbeitung); Nebel/Mist erfassen, Hautkontakt minimieren.',
    trgs510Storage: {
      zusammenlagerungsverbote: [
        'LGK 3 entzündbare Lösemittel getrennt',
        'Oxidationsmittel LGK 5.1',
        'Stark saure/alkalische Produkte getrennt',
      ],
      safetyCabinetNotes:
        'LGK 12: Geschlossene Originalbehälter, zweite Haut (Auffangwanne), Temperatur stabil halten; bei großen Mengen Lagerraum mit Ölbindemittel.',
    },
    faqItems: [
      {
        question: 'Welche Handschuhe für KSS?',
        answer: 'Nitril oder Viton bei Hautkontakt; bei Sprühnebel zusätzlich Schutzbrille — SDB Abschnitt 8.',
      },
      {
        question: 'Verzeichnispflicht?',
        answer: 'Ja — jedes Konzentrat/Emulsion separat (§ 6 Abs. 12 GefStoffV).',
      },
      {
        question: 'Unterweisung?',
        answer: 'Jährlich + vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV), bei Wechsel der KSS-Qualität erneut.',
      },
    ],
  },
  'adblue-trgs-555': {
    documentDisplayName: 'AdBlue (AUS 32, Harnstofflösung)',
    chemicalFormula: 'CO(NH₂)₂ (in H₂O, 32,5 %)',
    ecNumber: { kind: 'value', text: '200-315-5 (Harnstoff)' },
    flashPoint: { kind: 'notApplicable', note: 'Nicht entzündbar (wässrige Lösung)' },
    ignitionTemperature: { kind: 'notApplicable', note: 'Nicht entzündbar' },
    agwTrgs900: {
      kind: 'mixtureVariable',
      note: 'Bei Zersetzung/Hitze Ammoniak-Freisetzung möglich — TRGS 900 (Ammoniak) beachten; sonst oft kein klassischer Dampf-AGW für AUS 32.',
    },
    applicationAreaWorkplace: 'SCR-Nachrüstung, Fuhrpark-Tankstellen, Umfüllen in SCR-Tanks.',
    trgs510Storage: {
      zusammenlagerungsverbote: ['LGK 3 (Kraftstoff/Diesel) — Verwechslung vermeiden', 'LGK 5.1 Oxidationsmittel'],
      safetyCabinetNotes:
        'LGK 12: Saubere, kühle Lagerung (Kristallisation vermeiden), separate Beschriftung gegen Verwechslung mit Diesel.',
    },
    faqItems: [
      {
        question: 'Braucht AdBlue PSA?',
        answer: 'Schutzbrille und Handschuhe beim Umfüllen; SDB Abschnitt 8 beachten.',
      },
      {
        question: 'Verzeichnispflicht?',
        answer: 'Ja bei betrieblicher Handhabung (§ 6 Abs. 12 GefStoffV).',
      },
      {
        question: 'Unterweisung?',
        answer: 'Jährlich + vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV).',
      },
    ],
  },
  'epoxidharz-trgs-555': {
    documentDisplayName: 'Epoxidharz (Komponente A, ungehärtet)',
    chemicalFormula: 'Epoxidharz (Bisphenol-A-basiert, typ.)',
    ecNumber: { kind: 'value', text: '500-033-5 (Epichlorhydrin, Vorstufe) / produktbezogen' },
    flashPoint: {
      kind: 'value',
      text: 'Oft > 100 °C (Harz) — Härter separat prüfen',
    },
    ignitionTemperature: { kind: 'mixtureVariable', note: 'Harz und Härter unterschiedlich — jeweiliges SDB.' },
    agwTrgs900: {
      kind: 'mixtureVariable',
      note: 'Oft kein AGW für Epoxidharz; Dämpfe/Additiv-Anteile laut SDB/TRGS 900.',
    },
    applicationAreaWorkplace: 'Beschichtung, Verguss, Laminieren — Kontaktallergie vermeiden, Belüftung.',
    trgs510Storage: {
      zusammenlagerungsverbote: ['LGK 3 Lösemittel', 'LGK 5.1 Oxidationsmittel', 'Amine/Härter getrennt von Säuren'],
      safetyCabinetNotes:
        'LGK 10/12: Temperaturkonstant, trocken, getrennte Lagerung von Harz und Härter; verschlossene Gebinde.',
    },
    faqItems: [
      {
        question: 'Welche Handschuhe für Epoxidharz?',
        answer: 'Nitril/Viton ≥ 0,4 mm, keine Hautkontakt — Sensibilisierung (H317). Härter separat bewerten.',
      },
      {
        question: 'Verzeichnispflicht?',
        answer: 'Ja — Harz, Härter und Verdünnung einzeln (§ 6 Abs. 12 GefStoffV).',
      },
      {
        question: 'Unterweisung?',
        answer: 'Jährlich + vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV).',
      },
    ],
  },
  'wasserstoffperoxid-trgs-555': {
    documentDisplayName: 'Wasserstoffperoxid (ca. 35 %)',
    chemicalFormula: 'H₂O₂',
    ecNumber: { kind: 'value', text: '231-765-0' },
    flashPoint: { kind: 'notApplicable', note: 'Nicht entzündbar (Lösung); oxidierend wirkend' },
    ignitionTemperature: { kind: 'notApplicable', note: 'Zündtemperatur für Lösung nicht maßgeblich — oxidierende Wirkung dominiert' },
    agwTrgs900: {
      kind: 'limit',
      text: '1 ppm (1,4 mg/m³) — TRGS 900 (Wasserstoffperoxid, Einatemschutz)',
    },
    applicationAreaWorkplace: 'Bleiche, Desinfektion, Labor — Gesichtsschutz, keine organischen Kontaminationsquellen.',
    trgs510Storage: {
      zusammenlagerungsverbote: [
        'LGK 3/4 entzündbare Stoffe — Brandförderung',
        'LGK 1 Säuren (Zersetzung/Gas)',
        'Metallspäne, organische Materialien',
      ],
      safetyCabinetNotes:
        'LGK 5.1B: Oxidationsmittelschrank, kühl, stabil, Herstellerangaben zu Inkompatibilitäten (Abschnitt 10) beachten.',
    },
    faqItems: [
      {
        question: 'Welche PSA bei 35 % H₂O₂?',
        answer: 'Gesichtsschutz, säurefeste Handschuhe, Schutzanzug bei größeren Mengen — SDB Abschnitt 8.',
      },
      {
        question: 'Verzeichnispflicht?',
        answer: 'Ja (§ 6 Abs. 12 GefStoffV); Konzentration angeben.',
      },
      {
        question: 'Unterweisung?',
        answer: 'Jährlich + vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV).',
      },
    ],
  },
  'dieselkraftstoff-trgs-555': {
    documentDisplayName: 'Dieselkraftstoff (EN 590)',
    chemicalFormula: null,
    ecNumber: {
      kind: 'mixtureVariable',
      note: 'Gemisch — keine einzelne EG-Nr.; sicherheitsrelevante Komponenten im SDB.',
    },
    flashPoint: { kind: 'value', text: '> 55 °C (typ. EN 590, Mindestflammpunkt)' },
    ignitionTemperature: { kind: 'value', text: 'ca. 220 °C (typ. Diesel)' },
    agwTrgs900: {
      kind: 'mixtureVariable',
      note: 'TRGS 900 für Dieselruß/Alkan-Fraktionen — Exposition am Tankplatz über SDB/TRGS 900 bewerten.',
    },
    applicationAreaWorkplace: 'Tankstellen im Betrieb, mobile Maschinen, Notstrom-Diesel.',
    trgs510Storage: LGK3_INCOMPAT,
    faqItems: [
      {
        question: 'PSA beim Tanken?',
        answer: 'Nitrilhandschuhe, Schutzbrille bei Spritzern; Dämpfe vermeiden — SDB Abschnitt 8.',
      },
      {
        question: 'Verzeichnispflicht?',
        answer: 'Ja ab erstem Tank/Behälter (§ 6 Abs. 12 GefStoffV).',
      },
      {
        question: 'Unterweisung?',
        answer: 'Jährlich + vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV).',
      },
    ],
  },
  'sanitaerreiniger-trgs-555': {
    documentDisplayName: 'Sanitärreiniger (salzsäurehaltig, typ.)',
    chemicalFormula: null,
    ecNumber: {
      kind: 'mixtureVariable',
      note: 'Produktgemisch — Salzsäure-Anteil oft EG 231-595-7.',
    },
    flashPoint: { kind: 'notApplicable', note: 'Wässriges Reinigungsprodukt, nicht entzündbar' },
    ignitionTemperature: { kind: 'notApplicable', note: 'Nicht entzündbar' },
    agwTrgs900: {
      kind: 'limit',
      text: '5 ppm (8 mg/m³) — TRGS 900 (Salzsäure, Einatemschutz) — abhängig von Säuredampf-Anteil',
    },
    applicationAreaWorkplace: 'Sanitär-/Gebäudereinigung — keine Mischung mit Bleichmitteln, gute Lüftung.',
    trgs510Storage: {
      zusammenlagerungsverbote: [
        'LGK 8B Laugen',
        'LGK 1 andere Säuren nur kompatibel planen',
        'Oxidationsmittel / Hypochlorit getrennt (Chlor)',
      ],
      safetyCabinetNotes:
        'LGK 8B: Korrosivenschrank, dichte Gebinde, Kinder-/Fremdzutritt verhindern; Belüftung in kleinen Räumen.',
    },
    faqItems: [
      {
        question: 'Welche Handschuhe?',
        answer: 'Säurebeständige Handschuhe und Schutzbrille — Standard-Haushaltshandschuhe unzureichend.',
      },
      {
        question: 'Verzeichnispflicht?',
        answer: 'Ja (§ 6 Abs. 12 GefStoffV) je Handelsprodukt.',
      },
      {
        question: 'Unterweisung?',
        answer: 'Jährlich + vor Tätigkeitsbeginn (§ 14 Abs. 2 GefStoffV).',
      },
    ],
  },
};
