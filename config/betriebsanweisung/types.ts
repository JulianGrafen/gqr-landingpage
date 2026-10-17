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

/** Genau drei FAQs (Programmatic SEO + JSON-LD) — werden im Template generiert. */
export type SubstanceFaqTuple = [
  { question: string; answer: string },
  { question: string; answer: string },
  { question: string; answer: string },
];

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

/**
 * Öffentliche Stoffdaten für Betriebsanweisungs-Landingpages.
 * Keine betrieblichen Schutz- oder Lagerangaben — nur Identifikation + rechtlicher Rahmen.
 */
export interface HazardousSubstanceSeoEntry {
  slug: string;
  substanceName: string;
  /** Anzeige im Muster-Dokument, z. B. „Isopropanol (2-Propanol)“. */
  documentDisplayName: string;
  synonyms: string[];
  casNumber: CasNumber;
  /** Abschnitt 1 — Anwendungsbereich (ohne PSA-/Notfall-Inhalte). */
  applicationAreaWorkplace: string;
  ghsPictograms: GhsPictogramCode[];
  signalWord: SignalWord;
  typicalIndustries: string[];
}
