/**
 * CRO-Copy für `/blog/reinigung-gefahrstoffkataster-vorlage/` (Zielgruppe: Geschäftsführung
 * Gebäudereinigung, externe SiFas). Sachlich, ohne Superlative, ohne Entwickler-Jargon.
 */
import { LIVE_TEST_TRUST_ITEMS, PRICING_TRUST_ITEMS, PRODUCT_SCREENSHOTS, liveDemoHref, pricingHref } from './shared';
import type { ArticleCroPage } from './types';

const REF = 'blog-reinigung';

export const REINIGUNG_KATASTER_ARTICLE_CRO: ArticleCroPage = {
  sourcePath: 'blog/reinigung-gefahrstoffkataster-vorlage',

  topCallout: {
    headline: 'Statt leerer Excel-Vorlage: Fertiges Verzeichnis direkt aus Ihrem Reiniger-SDB',
    body: 'PDF eines Sanitär- oder Grundreinigers hochladen – Sie sehen sofort Verzeichnis-Eintrag, BA-Entwurf und QR-Notfallansicht. Ohne Login, ohne Einrichtung.',
    primaryCta: {
      label: 'Reiniger-SDB jetzt ohne Login testen',
      href: liveDemoHref(REF),
      location: 'top_callout',
      target: 'live_demo',
    },
    trustItems: LIVE_TEST_TRUST_ITEMS,
  },

  comparison: {
    heading: 'Excel-Vorlage und Gefahrstoff-QR im direkten Vergleich',
    caption: 'Vergleich: Gefahrstoffverzeichnis als Excel-Vorlage und mit Gefahrstoff-QR in der Gebäudereinigung',
    excelColumnTitle: 'Excel-Vorlage',
    qrColumnTitle: 'Gefahrstoff-QR',
    rows: [
      {
        criterion: 'Erfassung aus dem SDB',
        excel: 'Angaben werden aus dem PDF abgetippt.',
        extraction: 'SDB als PDF hochladen, Pflichtangaben werden ausgelesen und zur Prüfung vorgelegt.',
      },
      {
        criterion: 'Einsatzort (Objekt, Putzraum, Fahrzeug)',
        excel: 'Freitextspalte, wird selten gepflegt.',
        extraction: 'Jedes Produkt ist einem Standort zugeordnet und danach filterbar.',
      },
      {
        criterion: 'Schutzmaßnahmen & H-/P-Sätze',
        excel: 'Manuell übertragen, Tippfehler bleiben unbemerkt.',
        extraction: 'Aus dem SDB übernommen und gegen die amtliche Liste der CLP-Codes geprüft.',
      },
      {
        criterion: 'Betriebsanweisung (TRGS 555)',
        excel: 'Separates Word-Dokument, getrennt von der Liste.',
        extraction: 'KI-gestützter Entwurf (gemäß TRGS 555) direkt aus denselben Daten.',
      },
      {
        criterion: 'SDB-Änderungen & Prüfung',
        excel: 'Neue Fassungen fallen nur auf, wenn jemand nachsieht.',
        extraction: 'Neue SDB-Fassung wird Feld für Feld mit der Vorgängerversion verglichen.',
      },
      {
        criterion: 'Zeitaufwand pro Produkt',
        excel: 'Abtippen, Formatieren, Gegenlesen – pro Produkt und Objekt erneut.',
        extraction: 'Hochladen und Entwurf fachlich prüfen; Standorte werden zugeordnet statt kopiert.',
      },
    ],
    cta: {
      label: 'Mit eigenem Reiniger-SDB vergleichen',
      href: liveDemoHref(`${REF}-vergleich`),
      location: 'mid_comparison',
      target: 'live_demo',
    },
  },

  outputPreview: {
    eyebrow: 'Beispiel aus der Gebäudereinigung',
    productName: 'Saurer Sanitärreiniger Konzentrat',
    pictogramCode: 'GHS05',
    fields: [
      { label: 'Signalwort', value: 'Gefahr' },
      { label: 'Piktogramm', value: 'GHS05 (Ätzend)' },
      { label: 'H-/P-Sätze', value: 'H314 / P280' },
      { label: 'Lagerklasse', value: '8B' },
      { label: 'WGK', value: '1' },
      { label: 'Einsatzort', value: 'Objekt Nord – Putzraum EG' },
    ],
    draftBadges: ['TRGS-555-BA-Entwurf', 'QR-Etikett für Kanister & Putzraum'],
    reviewNote:
      'Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).',
  },

  screenshots: [
    {
      screenshot: PRODUCT_SCREENSHOTS.directoryDesktop,
      caption: 'Gefahrstoffverzeichnis: alle Reiniger mit Lieferant, SDB-Stand, Signalwort und Piktogrammen – filterbar nach Objekt oder Standort.',
    },
    {
      screenshot: PRODUCT_SCREENSHOTS.qrEmergencyMobile,
      caption: 'QR-Notfallansicht nach dem Scan im Putzraum: Gefahren, Piktogramme und Notrufnummern auf dem Smartphone.',
    },
  ],

  closingCta: {
    headline: 'Testen Sie es direkt mit einem echten Reiniger-SDB aus Ihrem Betrieb',
    body: 'Laden Sie ein einzelnes Sicherheitsdatenblatt hoch und prüfen Sie direkt im Browser den Verzeichnis-Eintrag, den BA-Entwurf und das QR-Etikett für Ihren Putzraum.',
    primaryCta: {
      label: 'Reiniger-SDB ohne Login testen',
      href: liveDemoHref(`${REF}-footer`),
      location: 'footer_primary',
      target: 'live_demo',
    },
    secondaryCta: {
      label: 'Preise für Betriebe & SiFas ansehen',
      href: pricingHref(REF),
      location: 'footer_pricing',
      target: 'pricing',
    },
    trustItems: PRICING_TRUST_ITEMS,
  },
};
