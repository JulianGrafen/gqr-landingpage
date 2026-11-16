import type { SubstanceClusterId } from '@/config/betriebsanweisung/substance-clusters';

/**
 * Statische Muster-Vorschau der Betriebsanweisungs-Seiten (0 API-Calls, rein im Frontend).
 *
 * Leitplanke (config/betriebsanweisung/README.md): keine stoffbezogenen Gefahrwerte. Signalwort,
 * H-/P-Sätze und GHS-Piktogramme erscheinen nur als Felder mit Verweis auf SDB-Abschnitt 2.2.
 * Texte beschreiben Tätigkeiten und Gefahrenarten des Clusters, nie die Einstufung eines Stoffes.
 */

export interface ClusterSampleCopy {
  /** Abschnitt 1: Anwendungsbereich & Arbeitsplatz; `{stoff}` wird ersetzt. */
  applicationArea: string;
  /** Abschnitt 2: Gefahrenarten des Clusters in Worten, ohne Einstufung. */
  hazardContext: string;
  /** Typische Gebotszeichen (blau) im angedeuteten Abschnitt 3; maßgeblich bleibt SDB 8.2. */
  typicalProtectiveEquipment: readonly string[];
}

export const SUBSTANCE_PLACEHOLDER = '{stoff}';

export const CLUSTER_SAMPLE_COPY: Record<SubstanceClusterId, ClusterSampleCopy> = {
  cleaning: {
    applicationArea:
      'Tätigkeiten mit {stoff} bei Reinigungsarbeiten in Gebäuden und Objekten: Ansetzen, Sprühen, Wischen und Umfüllen in Sprühflaschen. Arbeitsbereich und Mengen legt der Betrieb fest.',
    hazardContext:
      'Reinigungsmittel können je nach Rezeptur Augen und Haut reizen, beim Versprühen entstehen Aerosole. Ob und welche Gefahrenhinweise und Piktogramme gelten, steht in SDB-Abschnitt 2.2 Ihres Produkts.',
    typicalProtectiveEquipment: ['Schutzbrille', 'Schutzhandschuhe'],
  },
  'automotive-industry': {
    applicationArea:
      'Tätigkeiten mit {stoff} in Werkstatt und Instandhaltung: Entnahme aus dem Gebinde, Anwendung an Bauteilen, Umfüllen und Bereitstellung am Arbeitsplatz.',
    hazardContext:
      'Werkstattprodukte enthalten häufig Lösemittel, Öle oder Treibgase. Mögliche Gefahren betreffen Entzündbarkeit, Dämpfe sowie Haut- und Augenkontakt. Maßgeblich ist die Einstufung in SDB-Abschnitt 2.2.',
    typicalProtectiveEquipment: ['Schutzbrille', 'Schutzhandschuhe'],
  },
  'acids-alkalis': {
    applicationArea:
      'Tätigkeiten mit {stoff}: Dosieren, Verdünnen, Ab- und Umfüllen sowie Reinigungs- oder Prozessanwendungen am festgelegten Arbeitsplatz.',
    hazardContext:
      'Säuren und Laugen können je nach Konzentration reizend oder ätzend auf Haut, Augen und Schleimhäute wirken und mit anderen Stoffen reagieren. Die konkrete Einstufung steht in SDB-Abschnitt 2.2.',
    typicalProtectiveEquipment: ['Gesichtsschutz', 'Chemikalienschutzhandschuhe', 'Schutzkleidung'],
  },
  laboratory: {
    applicationArea:
      'Tätigkeiten mit {stoff} im Labor: Abfüllen, Ansetzen von Lösungen und Arbeiten unter dem Abzug.',
    hazardContext:
      'Laborchemikalien unterscheiden sich stark in Reinheit und Konzentration. Gefahren für Gesundheit, Brand und Umwelt ergeben sich aus der Einstufung in SDB-Abschnitt 2.2 des jeweiligen Lieferanten.',
    typicalProtectiveEquipment: ['Schutzbrille', 'Laborkittel', 'Schutzhandschuhe'],
  },
  general: {
    applicationArea:
      'Tätigkeiten mit {stoff} am betrieblichen Arbeitsplatz: Entnahme, Anwendung, Umfüllen und Lagerung.',
    hazardContext:
      'Welche Gefahren für Mensch und Umwelt bestehen, hängt von Rezeptur und Konzentration des Produkts ab. Maßgeblich ist die Einstufung in SDB-Abschnitt 2.2.',
    typicalProtectiveEquipment: ['Schutzbrille', 'Schutzhandschuhe'],
  },
};

export interface BaPreviewSectionDefinition {
  title: string;
  /** Fundstelle im SDB, aus der der Abschnitt im echten Entwurf befüllt wird. */
  sdbSource: string;
}

/** Sechs Abschnitte nach TRGS 555 mit ihrer SDB-Quelle (Abschnitt 1 und 2 sichtbar, 3 bis 6 angedeutet). */
export const BA_PREVIEW_SECTIONS: readonly BaPreviewSectionDefinition[] = [
  { title: '1. Anwendungsbereich & Arbeitsplatz', sdbSource: 'SDB 1.2' },
  { title: '2. Gefahren für Mensch und Umwelt', sdbSource: 'SDB 2' },
  { title: '3. Schutzmaßnahmen & Verhaltensregeln', sdbSource: 'SDB 7 & 8' },
  { title: '4. Verhalten im Gefahrfall', sdbSource: 'SDB 5 & 6' },
  { title: '5. Erste Hilfe', sdbSource: 'SDB 4' },
  { title: '6. Sachgerechte Entsorgung', sdbSource: 'SDB 13' },
];

export const SAMPLE_PREVIEW_COPY = {
  anchorId: 'ba-muster-vorschau',
  headerKicker: 'Betriebsanweisung gemäß TRGS 555',
  sampleBadge: 'Muster-Vorschau · Produktabhängige Werte weichen je nach Lieferanten-SDB ab',
  legalNotice:
    'Unverbindliches Muster-Beispiel: KI-gestützter Entwurf (gemäß TRGS 555) zur Vorprüfung und fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).',
  formatBadge: 'Inkl. DIN-A4-PDF & TRGS-201-Etikett (für Sprühflaschen & Umfüllgebinde)',
  qrPlaceholderLabel: 'QR-Code zur Notfallansicht (Platzhalter)',
  signalWordField: 'Signalwort',
  hazardStatementsField: 'H- und P-Sätze',
  pictogramsField: 'GHS-Piktogramme',
  fromSdbValue: 'aus Ihrem SDB 2.2',
  protectiveEquipmentNote: 'typisch im Cluster, maßgeblich SDB 8.2',
  lockedOverlayTitle: 'Eigenes Lieferanten-SDB ablegen, um Abschnitt 1 bis 6 für Ihr Produkt auszulesen',
  lockedOverlaySecondaryLabel: 'Oder dieses Muster kostenlos im Account öffnen & anpassen →',
  /** utm_content für den Register-Link aus dem Overlay. */
  registerUtmContent: 'muster-vorschau',
} as const;

/** Beschriftung des 1-Klick-Beispiel-Buttons unter der Dropzone. */
export function buildSampleButtonLabel(substanceName: string): string {
  return `📄 Kein PDF zur Hand? Beispiel-Entwurf für ${substanceName} ansehen`;
}

export function fillSubstancePlaceholder(template: string, substanceName: string): string {
  return template.replaceAll(SUBSTANCE_PLACEHOLDER, substanceName);
}
