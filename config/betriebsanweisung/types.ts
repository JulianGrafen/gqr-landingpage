import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

/** GHS-CLP Piktogramme (01–09). */
export type GhsPictogramCode =
  | 'GHS01'
  | 'GHS02'
  | 'GHS03'
  | 'GHS04'
  | 'GHS05'
  | 'GHS06'
  | 'GHS07'
  | 'GHS08'
  | 'GHS09';

export type SignalWord = 'Gefahr' | 'Achtung';

/** H- / EUH-Sätze (CLP); Muster für typische Codes in den Einträgen. */
export type HStatementCode =
  | `H${number}${number}${number}`
  | `EUH${number}${number}${number}`;

export type TypicalHStatement = {
  code: HStatementCode;
  text: string;
};

/** Genau drei praxisnahe FAQs pro Stoff (Programmatic SEO + JSON-LD). */
export type SubstanceFaqTuple = [SeoFaqItem, SeoFaqItem, SeoFaqItem];

/** Einzelstoff-CAS oder dokumentiertes Gemisch (Produkte / Mischungen). */
export type CasNumber =
  | {
      kind: 'substance';
      /** Format nnnnn-nn-n mit gültiger Prüfziffer. */
      value: string;
    }
  | {
      kind: 'mixture';
      label: string;
      mainComponentCas?: string;
    };

/** Chemisch-physikalische Kennwerte für SEO-Tabellen (Stoff vs. Gemisch). */
export type ExpertDataField =
  | { kind: 'value'; text: string }
  | { kind: 'notApplicable'; note: string }
  | { kind: 'mixtureVariable'; note: string };

export type AgwTrgs900Field =
  | { kind: 'limit'; text: string }
  | { kind: 'notApplicable'; note: string }
  | { kind: 'mixtureVariable'; note: string };

export type Trgs510StorageExpert = {
  /** Konkrete LGK / Stoffgruppen laut TRGS 510-Zusammenlagerungstabelle (Auszug). */
  zusammenlagerungsverbote: string[];
  safetyCabinetNotes: string;
};

export interface HazardousSubstanceSeoEntry {
  slug: string;
  substanceName: string;
  /** Anzeige im Muster-Dokument, z. B. „Isopropanol (2-Propanol)“. */
  documentDisplayName: string;
  synonyms: string[];
  casNumber: CasNumber;
  /** Summenformel; `null` bei Gemischen ohne eindeutige Formel. */
  chemicalFormula: string | null;
  ecNumber: ExpertDataField;
  flashPoint: ExpertDataField;
  ignitionTemperature: ExpertDataField;
  agwTrgs900: AgwTrgs900Field;
  /** Abschnitt 1 — Anwendungsbereich & Arbeitsplatz (sichtbar im Teaser). */
  applicationAreaWorkplace: string;
  ghsPictograms: GhsPictogramCode[];
  signalWord: SignalWord;
  typicalHStatements: TypicalHStatement[];
  typicalIndustries: string[];
  specificPpeAdvice: string;
  typicalPpeMistake: string;
  storageClassTrgs510: string;
  trgs510Storage: Trgs510StorageExpert;
  classificationBasis: string;
  faqItems: SubstanceFaqTuple;
}
