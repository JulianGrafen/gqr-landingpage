/**
 * Kernfunktionen der Startseite (#funktionen): 4 kompakte Karten + Hinweis auf den Altdaten-Import.
 * Ersetzt Scroll-Story, Zigzag-Funktionen, Notfall-Scan und Onboarding-Sektion.
 * Konsument: <CoreFeaturesSection> · Sync: npm run sync:home
 */

import { GBU_MODULE_LABEL } from '@/config/pricing-plans';

export interface CoreFeatureCard {
  eyebrow: string;
  title: string;
  description: string;
  points: readonly string[];
  /** Kennzeichnung für Funktionen im Beta-Status. */
  badge?: string;
}

export interface CoreFeaturesImportHint {
  title: string;
  text: string;
  link: { label: string; href: string };
}

export const CORE_FEATURES = {
  sectionId: 'funktionen',
  headlineId: 'funktionenHeadline',
  eyebrow: 'Kernfunktionen',
  headline: 'Vom Sicherheitsdatenblatt zum prüffähigen Gefahrstoffverzeichnis',
  lead: 'Alles, was Betriebe und SiFas für Verzeichnis, Lager und Notfall brauchen, in einer Datenbasis.',
  cards: [
    {
      eyebrow: 'Nachvollziehbarkeit',
      title: 'Revisionsverlauf für ISO- und BG-Audits',
      description: 'Jede Änderung wird mit Zeitstempel und Nutzer protokolliert.',
      points: ['Lückenlose Freigaben', 'Exakte Feldänderungen', 'Klare Antwort auf „Wer hat was geändert?“'],
    },
    {
      eyebrow: 'Multi-Standort',
      title: 'Werke, Bereiche und Lagerorte getrennt führen',
      description: 'Compliance-Übersicht pro Standort für Betriebsleitung und SiFa.',
      points: ['Hierarchie bis zum Lagerort', 'SDB-Vollständigkeit pro Bereich', 'Exportierbare Listen pro Ort'],
    },
    {
      eyebrow: 'Notfall-QR',
      title: 'Notfallinfos per QR-Code am Gebinde',
      description: 'Erste Hilfe und Schutzmaßnahmen per Smartphone, direkt am Lagerort.',
      points: ['QR-Scan ohne App-Installation', 'GHS-Kennzeichnung und Erste Hilfe auf einem Screen', 'Einsatzbereit in Lager und Produktion'],
    },
    {
      eyebrow: 'GBU-Assistent',
      badge: 'Beta',
      title: GBU_MODULE_LABEL,
      description: 'Unterstützt die Gefährdungsbeurteilung mit den bereits erfassten Stoffdaten. Enthalten in KMU Pro und SiFa Multi-Mandant.',
      points: ['Strukturierte Vorlage aus dem Verzeichnis', 'Bewertung und Freigabe durch SiFa / Arbeitgeber'],
    },
  ] satisfies readonly CoreFeatureCard[],
  importHint: {
    title: 'Altdaten per Batch-Upload',
    text: 'Ab KMU Pro laden Sie 20 bis 250 Sicherheitsdatenblätter auf einmal hoch. Für mehrere Werke oder sehr große Bestände gibt es individuelles Onboarding im Tarif Industrie / Beratungshaus.',
    link: { label: 'Tarife ansehen →', href: '#preise' },
  } satisfies CoreFeaturesImportHint,
} as const;