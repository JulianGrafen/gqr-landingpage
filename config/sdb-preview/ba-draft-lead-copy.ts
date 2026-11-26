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

/** Texte im generierten PDF (Aufbau nach TRGS 555, Abschnitte 1–6). */
export const BA_DRAFT_PDF_COPY = {
  documentTitle: 'BETRIEBSANWEISUNG',
  documentSubtitle: 'gemäß § 14 GefStoffV · KI-gestützter Entwurf (gemäß TRGS 555)',
  watermark: 'ENTWURF',
  manufacturerPrefix: 'Hersteller/Lieferant: ',
  casPrefix: 'CAS-Nr.: ',
  signalWordPrefix: 'Signalwort: ',
  sectionTitles: {
    identification: '1. Gefahrstoffbezeichnung',
    hazards: '2. Gefahren für Mensch und Umwelt',
    protectiveMeasures: '3. Schutzmaßnahmen und Verhaltensregeln',
    emergency: '4. Verhalten im Gefahrfall',
    firstAid: '5. Erste Hilfe',
    disposal: '6. Sachgerechte Entsorgung',
  },
  noHazardStatements: 'Keine H-Sätze im Sicherheitsdatenblatt erkannt – bitte fachlich prüfen.',
  moreStatements: (count: number, kind: 'H' | 'P') =>
    `+ ${count} weitere ${kind}-Sätze im Gratis-Konto`,
  lockedSection: 'Wird im Gratis-Konto aus Ihrem Sicherheitsdatenblatt ergänzt.',
  lockedSectionBadge: 'Im Gratis-Konto aus Ihrem SDB ergänzt',
  accountBoxTitle: 'BA vervollständigen – im Gratis-Konto',
  accountBoxBody:
    'Abschnitte 4–6, Notfall-QR-Code für den Arbeitsplatz und Freigabe-Workflow: kostenlos, ohne Kreditkarte, ohne Verkaufsgespräch.',
  accountBoxLinkLabel: 'Gratis-Konto erstellen: ',
  createdOn: (date: string) => `Erstellt am ${date} mit gefahrstoff-qr.de`,
  fileName: (productSlug: string) => `BA-Entwurf-${productSlug || 'Gefahrstoff'}.pdf`,
} as const;
