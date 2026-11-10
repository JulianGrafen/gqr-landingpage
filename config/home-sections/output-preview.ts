/**
 * "Was hinten herauskommt": Mechanismus (SDB-Abschnittszuordnung) und Output-Vorschau.
 * Konsument: <OutputPreviewSection>.
 *
 * Die Feld-zu-Abschnitt-Zuordnung spiegelt die App-Logik (gqr-backend: src/domain/sdb-sections.ts).
 * Bei Änderungen dort hier nachziehen, damit die Landingpage nichts verspricht, was die App nicht tut.
 */

export interface SdbFieldMapping {
  field: string;
  sdbSection: string;
}

export interface OutputPreviewCard {
  id: string;
  kicker: string;
  title: string;
  points: readonly string[];
  image?: { src: string; alt: string; width: number; height: number };
}

export const OUTPUT_PREVIEW = {
  sectionId: 'ergebnis',
  eyebrow: 'Mechanismus & Ergebnis',
  headline: 'Jedes Feld mit Fundstelle im Sicherheitsdatenblatt',
  intro:
    'Die KI liest nicht frei, sondern feldweise: Jede Angabe wird dem zuständigen SDB-Unterabschnitt zugeordnet und mit dieser Fundstelle angezeigt. So prüft die SiFa gezielt an der Quelle, statt das ganze PDF erneut zu lesen.',
  mappingCaption: 'Zuordnung der Erfassungsfelder zu den SDB-Unterabschnitten',
  mappingColumnLabels: { field: 'Erfasstes Feld', sdbSection: 'Fundstelle im SDB' },
  fieldMappings: [
    { field: 'Handelsname, Artikelnummer, UFI', sdbSection: 'SDB 1.1' },
    { field: 'Signalwort, GHS-Piktogramme, H- und P-Sätze', sdbSection: 'SDB 2.2' },
    { field: 'Erste-Hilfe-Maßnahmen', sdbSection: 'SDB 4.1' },
    { field: 'Lagerklasse (TRGS 510)', sdbSection: 'SDB 7.2' },
    { field: 'Persönliche Schutzausrüstung', sdbSection: 'SDB 8.2' },
    { field: 'Wassergefährdungsklasse (WGK)', sdbSection: 'SDB 15.1' },
    { field: 'Überarbeitungsdatum des SDB', sdbSection: 'SDB 16' },
  ] satisfies SdbFieldMapping[],
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
