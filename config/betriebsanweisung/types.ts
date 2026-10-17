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
      /** Kurzbezeichnung für Tabellen & Preview (z. B. „Gemisch (Kohlenwasserstoffe)“). */
      label: string;
      /** Optional: CAS einer Hauptkomponente zur Orientierung. */
      mainComponentCas?: string;
    };

export interface HazardousSubstanceSeoEntry {
  slug: string;
  substanceName: string;
  synonyms: string[];
  casNumber: CasNumber;
  ghsPictograms: GhsPictogramCode[];
  signalWord: SignalWord;
  typicalHStatements: TypicalHStatement[];
  typicalIndustries: string[];
  /** Konkrete PSA-Empfehlung inkl. Material & Dicke, wo relevant. */
  specificPpeAdvice: string;
  /** Typischer PSA-Fehler in der Praxis (Tabellenzeile auf der Landingpage). */
  typicalPpeMistake: string;
  storageClassTrgs510: string;
  /**
   * Konzentrations- oder produktspezifische Annahme für die Beispieleinstufung
   * (Pflicht bei Gemischen / konzentrationsabhängigen Stoffen).
   */
  classificationBasis: string;
  faqItems: SubstanceFaqTuple;
}
