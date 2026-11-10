/** "Was hinten herauskommt": Output-Vorschau der drei Kernergebnisse (<OutputPreviewSection>). */

export interface OutputPreviewCard {
  id: string;
  kicker: string;
  title: string;
  points: readonly string[];
  image?: { src: string; alt: string; width: number; height: number };
}

export const OUTPUT_PREVIEW = {
  sectionId: 'ergebnis',
  cards: [
    {
      id: 'verzeichnis',
      kicker: '§ 6 GefStoffV',
      title: 'Gefahrstoffverzeichnis für die Betriebsprüfung',
      points: [
        'Filterbar nach Standort, Werk und Lagerort',
        'GHS-Piktogramme im PDF und in der Excel-Datei',
        'Fehlende Angaben aus der Begehung farblich markiert',
      ],
      image: {
        src: '/images/landing-kataster-dashboard.png',
        alt: 'Gefahrstoffverzeichnis in Gefahrstoff-QR mit Standortfilter, Signalwort und GHS-Piktogrammen',
        width: 1833,
        height: 1168,
      },
    },
    {
      id: 'betriebsanweisung',
      kicker: 'TRGS 555',
      title: 'Betriebsanweisung als A4-Entwurf',
      points: [
        'Gliederung in die sechs Abschnitte nach TRGS 555',
        'Eigenes Firmenlogo und anpassbare Rahmenfarbe',
        'Schriftgröße passt sich dem Inhalt für den Aushang an',
      ],
    },
    {
      id: 'lagerung-notfall',
      kicker: 'TRGS 510 & Notfall',
      title: 'Zusammenlagerung und QR-Notfallansicht',
      points: [
        'Konflikthinweise der Lagerklassen pro Lagerort',
        'QR-Code am Gebinde öffnet Erste Hilfe und Schutzmaßnahmen',
        'Abruf im Smartphone-Browser, ohne App-Installation',
      ],
      image: {
        src: '/images/gefahrstoffmanagement-trgs510-check.jpeg',
        alt: 'TRGS-510-Zusammenlagerungshinweise pro Lagerort in Gefahrstoff-QR',
        width: 1770,
        height: 1294,
      },
    },
  ] satisfies OutputPreviewCard[],
  /** Abschnitte der BA-Vorschau (TRGS 555), dargestellt als stilisiertes A4-Blatt. */
  baPreviewSections: [
    'Anwendungsbereich',
    'Gefahren für Mensch und Umwelt',
    'Schutzmaßnahmen und Verhaltensregeln',
    'Verhalten im Gefahrfall',
    'Erste Hilfe',
    'Sachgerechte Entsorgung',
  ],
} as const;
