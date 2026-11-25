/**
 * Kernfunktionen der Startseite (#funktionen): 4 kompakte Karten (mit App-Screenshot) + Hinweis auf den Altdaten-Import.
 * Ersetzt Scroll-Story, Zigzag-Funktionen, Notfall-Scan und Onboarding-Sektion.
 * Konsument: <CoreFeaturesSection> · Sync: npm run sync:home
 */

import { GBU_MODULE_LABEL } from '@/config/pricing-plans';

export interface CoreFeatureImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CoreFeatureCard {
  eyebrow: string;
  title: string;
  description: string;
  points: readonly string[];
  /** Kennzeichnung für Funktionen im Beta-Status. */
  badge?: string;
  /** Optionaler App-Screenshot über dem Kartentext. */
  image?: CoreFeatureImage;
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
      image: { src: '/images/aktivitätsprotokoll.jpeg', alt: 'Aktivitätsprotokoll mit Zeitstempel und Nutzer in Gefahrstoff-QR', width: 1180, height: 665 },
      title: 'Revisionsverlauf für ISO- und BG-Audits',
      description: 'Jede Änderung wird mit Zeitstempel und Nutzer protokolliert.',
      points: ['Lückenlose Freigaben', 'Exakte Feldänderungen', 'Klare Antwort auf „Wer hat was geändert?“'],
    },
    {
      eyebrow: 'Multi-Standort',
      image: { src: '/images/app-werkstrennung.jpeg', alt: 'Werke und Lagerorte getrennt in Gefahrstoff-QR', width: 1770, height: 1294 },
      title: 'Werke, Bereiche und Lagerorte getrennt führen',
      description: 'Compliance-Übersicht pro Standort für Betriebsleitung und SiFa.',
      points: ['Hierarchie bis zum Lagerort', 'SDB-Vollständigkeit pro Bereich', 'Exportierbare Listen pro Ort'],
    },
    {
      eyebrow: 'Notfall-QR',
      image: { src: '/images/demo/scene-4-qr-mobile.png', alt: 'QR-Notfallansicht auf dem Smartphone', width: 506, height: 1024 },
      title: 'Notfallinfos per QR-Code am Gebinde',
      description: 'Erste Hilfe und Schutzmaßnahmen per Smartphone, direkt am Lagerort.',
      points: ['QR-Scan ohne App-Installation', 'GHS-Kennzeichnung und Erste Hilfe auf einem Screen', 'Einsatzbereit in Lager und Produktion'],
    },
    {
      eyebrow: 'GBU-Assistent',
      image: { src: '/images/app-screenshot-form.png', alt: 'Strukturierte Erfassung in Gefahrstoff-QR', width: 2940, height: 1656 },
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
