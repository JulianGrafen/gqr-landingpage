/**
 * Lead-Magnet im SDB-Live-Ergebnis: E-Mail eingeben → BA-Entwurf (PDF) kostenlos herunterladen.
 * Compliance: Entwurf ausschließlich als „KI-gestützter Entwurf (gemäß TRGS 555)“ mit
 * Vorprüfung zur fachlichen Freigabe durch SiFa / Arbeitgeber (§ 14 GefStoffV) bezeichnen.
 */

export const BA_DRAFT_LEAD_SOURCE = 'sdb-ba-entwurf-pdf';

export const BA_DRAFT_COMPLIANCE_LINE =
  'KI-gestützter Entwurf (gemäß TRGS 555) – Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV).';

export const BA_DRAFT_LEAD_COPY = {
  eyebrow: 'Kostenloser Download',
  title: 'BA-Entwurf als PDF per E-Mail-Adresse sichern',
  emailLabel: 'E-Mail-Adresse für den Download',
  placeholder: 'name@firma.de',
  submit: 'BA-Entwurf herunterladen',
  submitting: 'PDF wird erstellt…',
  invalidEmail: 'Bitte eine gültige E-Mail-Adresse eingeben.',
  pdfError: 'Das PDF konnte gerade nicht erstellt werden. Bitte erneut versuchen.',
  successTitle: 'Ihr BA-Entwurf wird heruntergeladen.',
  successRetry: 'PDF erneut herunterladen',
  /** Hinweis auf das Gratis-Konto — bleibt vor und nach dem Download sichtbar. */
  accountHint:
    'Abschnitte 4–6 (Gefahrfall, Erste Hilfe, Entsorgung) und den Notfall-QR-Code vervollständigen Sie im Gratis-Konto.',
  accountCta: 'Gratis-Konto erstellen & BA vervollständigen',
  privacyPrefix: 'Mit dem Download erhalten Sie gelegentlich Praxistipps zum Gefahrstoffmanagement. Abmeldung jederzeit.',
  privacyLinkLabel: 'Datenschutz',
  privacyHref: '/datenschutz/',
} as const;

/**
 * Texte im generierten PDF. Aufbau und Beschriftung entsprechen 1:1 dem BA-PDF der App
 * (Kopf 25/50/25, Abschnitte ohne Nummern, Freigabe-Zeile, TRGS-555-Fußzeile).
 */
export const BA_DRAFT_PDF_COPY = {
  documentTitle: 'Betriebsanweisung',
  legalBasis: 'gem. § 14 GefStoffV',
  draftLabel: 'KI-gestützter Entwurf (gemäß TRGS 555)',
  watermark: 'ENTWURF',
  qrPlaceholder: ['Notfall-QR-Code', 'im Gratis-Konto'],
  meta: { responsible: 'Verantwortlich', area: 'Bereich', revision: 'Stand' },
  release: {
    date: 'Datum der Freigabe',
    nextReview: 'Nächste Überprüfung',
    signature: 'Unterschrift',
    signatory: 'Unternehmer/Geschäftsleitung',
    line: 'Freigegeben durch: _______________________ am: ______________',
  },
  emptyValue: '–',
  manufacturerPrefix: 'Hersteller/Lieferant: ',
  casPrefix: 'CAS-Nr.: ',
  sectionTitles: {
    identification: 'Gefahrstoffbezeichnung',
    hazards: 'Gefahren für Mensch und Umwelt',
    protectiveMeasures: 'Schutzmaßnahmen und Verhaltensregeln',
    emergency: 'Verhalten im Gefahrfall',
    firstAid: 'Erste Hilfe',
    disposal: 'Sachgerechte Entsorgung',
  },
  noHazardStatements: 'Keine H-Sätze im Sicherheitsdatenblatt erkannt – bitte fachlich prüfen.',
  moreStatements: (count: number, kind: 'H' | 'P') =>
    `+ ${count} weitere ${kind}-Sätze im Gratis-Konto`,
  lockedSection: 'Wird im Gratis-Konto aus Ihrem Sicherheitsdatenblatt ergänzt.',
  lockedSectionCta: '» Jetzt kostenlos im Gratis-Konto vervollständigen',
  createdOn: (date: string) => `Erstellt am ${date} mit gefahrstoff-qr.de`,
  pageLabel: (page: number, total: number) => `Seite ${page}/${total}`,
  fileName: (productSlug: string) => `BA-Entwurf-${productSlug || 'Gefahrstoff'}.pdf`,
} as const;
