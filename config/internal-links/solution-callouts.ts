/**
 * Kontextbezogene Callouts von starken Zubringerseiten (GSC-Top-Rankings) auf Branchenlösungen.
 *
 * Regeln (SEO, GSC 11/2026):
 * - Beschreibende, keywordstarke Ankertexte („… für die Kfz-Werkstatt erstellen“), nie „hier klicken“.
 * - Ankertexte variieren je Quelle, damit kein überoptimiertes Exact-Match-Muster entsteht.
 * - Keine Gedankenstriche in Fließtext und CTAs.
 */
import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import type { IndustrySlug } from '@/config/industry-solutions';

/** Position des Callouts auf der Quellseite. */
export type SolutionCalloutSlot = 'primary' | 'closing';

export interface SolutionCalloutCopy {
  eyebrow: string;
  body: string;
  /** Linktext = Ankertext für Google: beschreibend und mit Zielkeyword. */
  anchorText: string;
}

export interface SolutionCalloutDefinition {
  targetIndustry: IndustrySlug;
  /**
   * `next`: Next-Route rendert den Callout selbst (z. B. Wissen/Deepinfo).
   * `static-html`: handgepflegte HTML-Datei mit Markern `AEO:SOLUTION_CALLOUT_<SLOT>`,
   * befüllt von scripts/sync-static-solution-callouts.tsx.
   */
  rendering: 'next' | 'static-html';
  slots: Partial<Record<SolutionCalloutSlot, SolutionCalloutCopy>>;
}

const KFZ: IndustrySlug = 'kfz-werkstatt';

const KFZ_EYEBROW = 'Branchenlösung Kfz-Werkstatt';

/** Betriebsanweisungen mit Kfz-Bezug: ein Callout pro Seite, Text auf den Stoff zugeschnitten. */
export const KFZ_BETRIEBSANWEISUNG_CALLOUTS: Partial<Record<HazardousSubstanceSlug, SolutionCalloutCopy>> = {
  'adblue-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'AdBlue steht selten allein im Regal. Bremsenreiniger, Motoröl und Kühlerfrostschutz gehören in dasselbe Gefahrstoffverzeichnis nach § 6 GefStoffV, mit Betriebsanweisung und QR-Code am Schrank.',
    anchorText: 'Komplettes Gefahrstoffkataster & QR-Codes für die Kfz-Werkstatt erstellen',
  },
  'bremsenreiniger-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Neben Bremsenreiniger gehören Öle, Frostschutz, Lacke und Batteriesäure ins Verzeichnis. Aus jedem Sicherheitsdatenblatt entsteht ein KI-gestützter Entwurf für Kataster und Betriebsanweisung, den Sie freigeben.',
    anchorText: 'Gefahrstoffverzeichnis und Betriebsanweisungen für die ganze Kfz-Werkstatt anlegen',
  },
  'kuehlerfrostschutz-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Kühlerfrostschutz ist einer von vielen Werkstatt-Gefahrstoffen. Führen Sie alle Produkte an einem Ort und hängen Sie den QR-Code mit Betriebsanweisung direkt an den Gefahrstoffschrank.',
    anchorText: 'Gefahrstoff-Software für Kfz-Werkstätten: Kataster, Betriebsanweisungen & QR-Codes',
  },
  'waschbenzin-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Waschbenzin für die Teilereinigung, Bremsenreiniger an der Hebebühne, Verdünner in der Lackierkabine: Alle Stoffe gehören in ein gemeinsames Verzeichnis mit Betriebsanweisungen am Arbeitsplatz.',
    anchorText: 'Alle Werkstatt-Gefahrstoffe in einem Kataster mit QR-Codes führen',
  },
  'felgenreiniger-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Felgenreiniger in der Waschhalle, Öle und Reiniger in der Werkstatt: Erfassen Sie alle Produkte aus dem Sicherheitsdatenblatt und stellen Sie die Betriebsanweisung per QR-Code bereit.',
    anchorText: 'Gefahrstoffkataster & Betriebsanweisungen für die Kfz-Werkstatt digital führen',
  },
  'mineraloel-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Mineralöle, Schmierstoffe und Altöl sind in der Werkstatt allgegenwärtig. Ein Verzeichnis für alle Stoffe, mit QR-Code an Hebebühne und Ölregal, ersetzt die Excel-Liste.',
    anchorText: 'Gefahrstoffverzeichnis mit QR-Codes für die Kfz-Werkstatt erstellen',
  },
  'motoroel-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Motoröl ist nur ein Eintrag von vielen. Bremsenreiniger, Frostschutz und Batteriesäure gehören ebenfalls ins Gefahrstoffverzeichnis, jeweils mit aktueller Betriebsanweisung am Arbeitsplatz.',
    anchorText: 'Komplettes Gefahrstoffkataster für die Kfz-Werkstatt mit QR-Codes anlegen',
  },
  'getriebeoel-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Getriebeöl, Bremsflüssigkeit und Reiniger: Führen Sie alle Werkstatt-Gefahrstoffe aus den Sicherheitsdatenblättern in einem Kataster und stellen Sie die Betriebsanweisungen per QR-Code bereit.',
    anchorText: 'Gefahrstoff-Software für die Kfz-Werkstatt: Kataster & Betriebsanweisungen',
  },
  'isopropanol-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Isopropanol, Bremsenreiniger und Lacke stehen selten allein. Ein Gefahrstoffverzeichnis nach § 6 GefStoffV bündelt Reinigungsmittel, Öle und Betriebsanweisungen für die gesamte Halle.',
    anchorText: 'Gefahrstoffverzeichnis und QR-Codes für die Kfz-Werkstatt anlegen',
  },
  'aceton-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Aceton und Lackierprodukte teilen oft dasselbe Lager. Mit digitaler Lösung verknüpfen Sie Verzeichnis, TRGS-555-Betriebsanweisungen und Lagerhinweise an einem Ort.',
    anchorText: 'Gefahrstoffkataster für Lackierbereich und Werkstatt erstellen',
  },
  'sekundenkleber-trgs-555': {
    eyebrow: KFZ_EYEBROW,
    body: 'Klebstoffe und Dichtmassen brauchen Einträge im Verzeichnis und Betriebsanweisungen am Arbeitsplatz, oft zusammen mit Ölen und Reinigern.',
    anchorText: 'Alle Werkstatt-Gefahrstoffe in einem Kataster führen',
  },
};

/** Redaktionelle Seiten (Blog, Wissen), adressiert über ihren kanonischen Pfad. */
export const EDITORIAL_SOLUTION_CALLOUTS: Readonly<Record<string, SolutionCalloutDefinition>> = {
  '/blog/kfz-gefahrstoff-excel/': {
    targetIndustry: KFZ,
    rendering: 'static-html',
    slots: {
      primary: {
        eyebrow: KFZ_EYEBROW,
        body: 'Statt Excel-Vorlage: Sicherheitsdatenblätter hochladen, KI-gestützte Entwürfe für Verzeichnis und Betriebsanweisungen prüfen und QR-Codes an Schrank und Hebebühne anbringen.',
        anchorText: 'Excel ablösen: Gefahrstoffkataster & QR-Codes für die Kfz-Werkstatt',
      },
      closing: {
        eyebrow: KFZ_EYEBROW,
        body: 'Bremsenreiniger, Öle, Frostschutz und Batteriesäure in einem Kataster nach § 6 GefStoffV, mit Betriebsanweisungen nach TRGS 555 am Arbeitsplatz.',
        anchorText: 'Komplettes Gefahrstoffkataster & QR-Codes für die Kfz-Werkstatt erstellen',
      },
    },
  },
  '/wissen/gefahrstoffverzeichnis-muster-kfz-werkstatt/': {
    targetIndustry: KFZ,
    rendering: 'next',
    slots: {
      primary: {
        eyebrow: 'Lieber direkt digital statt Muster ausfüllen?',
        body: 'Dieser Leitfaden zeigt, was ins Verzeichnis gehört. Die fertige Software-Lösung mit SDB-Import, Betriebsanweisungen und QR-Codes finden Sie auf unserer Seite für Kfz-Werkstätten.',
        anchorText: 'Gefahrstoff-Software für Kfz-Werkstätten: Kataster & QR-Codes',
      },
      closing: {
        eyebrow: KFZ_EYEBROW,
        body: 'Sie haben die Pflichten im Blick. Jetzt die Umsetzung: Sicherheitsdatenblätter hochladen, Entwürfe freigeben und QR-Codes an den Gefahrstoffschrank hängen.',
        anchorText: 'Komplettes Gefahrstoffkataster & QR-Codes für die Kfz-Werkstatt erstellen',
      },
    },
  },
};
