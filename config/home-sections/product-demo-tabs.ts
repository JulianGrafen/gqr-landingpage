/**
 * Produkt- & Video-Demo der Startseite als ruhige 3-Tab-Sektion (#produkt-demo).
 * Ersetzt die früheren Einzelsektionen Produkt-Demo, Video-Demos und Muster-BA (TRGS 555).
 * Videos laufen inline (youtube-nocookie Facade), es gibt keine Links zu youtube.com.
 *
 * Konsument: <ProductDemoTabsSection> · Interaktion: /scripts/home-demo-tabs.js · Sync: npm run sync:home
 */

import { OUTPUT_PREVIEW } from '@/config/home-sections/output-preview';

export interface DemoTabVideo {
  youtubeId: string;
  /** Titel des iframes und Accessible Name des Play-Buttons. */
  title: string;
}

export interface DemoTabDownload {
  label: string;
  href: string;
  download: string;
}

export interface ProductDemoTab {
  id: string;
  tabLabel: string;
  kicker: string;
  title: string;
  lead: string;
  points: readonly string[];
  video: DemoTabVideo;
  download?: DemoTabDownload;
}

const BA_SPOTLIGHT = OUTPUT_PREVIEW.baSpotlight;

export const PRODUCT_DEMO_TABS = {
  sectionId: 'produkt-demo',
  headlineId: 'productDemoHeadline',
  eyebrow: 'Produkt-Demo',
  headline: 'Gefahrstoffverzeichnis digital in der Praxis',
  lead: 'Drei kurze Videos, direkt hier auf der Seite: vom Sicherheitsdatenblatt bis zum QR-Code am Gebinde.',
  tabListLabel: 'Demo-Themen',
  playLabelPrefix: 'Video abspielen:',
  tabs: [
    {
      id: 'verzeichnis',
      tabLabel: 'Verzeichnis & SDB-Import',
      kicker: 'Verzeichnis',
      title: 'Gefahrstoffverzeichnis aus dem SDB statt abtippen',
      lead: 'SDB-PDF hochladen, die Angaben werden mit Verweis auf den jeweiligen SDB-Abschnitt ausgelesen und dem Arbeitsbereich zugeordnet.',
      points: [
        'Pflichtangaben nach § 6 GefStoffV strukturiert erfasst',
        'GHS-Piktogramme direkt im PDF- und Excel-Export',
        'Revisionsverlauf für jede Änderung',
      ],
      video: {
        youtubeId: 'XMn6NKrqlMY',
        title: 'Gefahrstoffmanagement Software: Verzeichnis in 2 Minuten | Gefahrstoff-QR',
      },
    },
    {
      id: 'betriebsanweisung',
      tabLabel: 'TRGS-555-Betriebsanweisung',
      kicker: BA_SPOTLIGHT.kicker,
      title: 'Betriebsanweisung als druckfertiger Entwurf',
      lead: 'KI-gestützter Entwurf (gemäß TRGS 555) als druckfertiges A4-PDF mit Firmenlogo, als Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).',
      points: BA_SPOTLIGHT.points,
      video: {
        youtubeId: 'psEuup9DlXQ',
        title: 'Betriebsanweisung für Gefahrstoffe nach TRGS 555 | Gefahrstoff-QR',
      },
      download: BA_SPOTLIGHT.downloadCta,
    },
    {
      id: 'lager-notfall',
      tabLabel: 'TRGS-510 & QR-Notfallscan',
      kicker: 'Lager & Notfall',
      title: 'Zusammenlagerung prüfen, Notfallinfos per QR-Code',
      lead: 'Lagerklassen pro Lagerort abgleichen und Erste-Hilfe- sowie Schutzmaßnahmen per Smartphone direkt am Gebinde abrufen.',
      points: [
        'Hinweise auf Konflikte nach TRGS 510 pro Lagerort',
        'QR-Scan ohne App-Installation',
        'GHS-Kennzeichnung und Erste Hilfe auf einem Screen',
      ],
      video: {
        youtubeId: 'AVU3FRRn5mQ',
        title: 'TRGS-510-Lagerprüfung und QR-Scan in der Praxis | Gefahrstoff-QR',
      },
    },
  ] satisfies readonly ProductDemoTab[],
} as const;
