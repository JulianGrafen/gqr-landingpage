/**
 * Praxisbeispiele (Case Studies) — datengetriebene Quelle für /praxisbeispiele/<slug>/.
 *
 * Veröffentlichungsregel:
 *  - `status: 'draft'`     → Seite wird gebaut, aber mit noindex ausgeliefert, nicht verlinkt
 *                            und nicht in der Sitemap geführt (Review-Link für Kunde/Freigabe).
 *  - `status: 'published'` → indexiert, in Footer, Preis-Sektion und Sitemap.
 *
 * Wettbewerbsrecht (UWG § 5): Kennzahlen und Zitate nur mit schriftlicher Freigabe des Kunden
 * und belegbarer Quelle eintragen. Keine geschätzten oder gerundeten „Marketing-Zahlen“.
 */

export type CaseStudyStatus = 'draft' | 'published';

export type CompanySizeBand = '1-9' | '10-49' | '50-249' | '250+';

export interface CaseStudySolutionStep {
  id: string;
  title: string;
  description: string;
  /** Regelwerksbezug, z. B. „§ 6 GefStoffV“. */
  regulatoryRef?: string;
}

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudyQuote {
  text: string;
  /** Funktion statt Name bei anonymisierten Fallstudien. */
  authorRole: string;
  authorName?: string;
}

export interface CaseStudyChallenge {
  summary: string;
  points: readonly string[];
}

export interface CaseStudy {
  slug: string;
  status: CaseStudyStatus;
  title: string;
  /** Meta-Description (≤ 160 Zeichen). */
  seoDescription: string;
  /** ~50 Wörter Kurzfassung für AEO-Antwortblock. */
  summary: string;
  industry: string;
  companySize: CompanySizeBand;
  isAnonymized: boolean;
  /** Anzeigename; bei Anonymisierung eine neutrale Beschreibung. */
  companyLabel: string;
  /** Projektdauer als Klartext, z. B. „2 Arbeitstage“. */
  projectDuration: string;
  challenge: CaseStudyChallenge;
  solutionSteps: readonly CaseStudySolutionStep[];
  beforeAfterMetrics: readonly CaseStudyMetric[];
  quote: CaseStudyQuote | null;
  datePublished: string;
  dateModified: string;
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: 'umstieg-excel-gefahrstoffkataster',
    // Vom Inhaber am 2026-11-19 als zutreffendes Kundenprojekt bestätigt und freigegeben.
    status: 'published',
    title: 'Von Excel & Leitz-Ordner zum §-6-Kataster mit Raum-QR in 2 Tagen',
    seoDescription:
      'Praxisbeispiel: Umstieg von Excel-Liste und Papierordnern auf ein Gefahrstoffkataster nach § 6 GefStoffV mit SDB-Batch-Import und Raum-QR-Codes.',
    summary:
      'Ein Handwerksbetrieb führte sein Gefahrstoffverzeichnis als Excel-Liste, die Sicherheitsdatenblätter lagen in Ordnern im Büro. In zwei Arbeitstagen wurden alle vorhandenen SDB per Batch-Import erfasst, den Lagerorten zugeordnet und über Raum-QR-Codes am Gefahrstoffschrank abrufbar gemacht. Die fachliche Freigabe erfolgte durch die betreuende SiFa.',
    industry: 'Handwerk / Werkstatt',
    companySize: '10-49',
    isAnonymized: true,
    companyLabel: 'Handwerksbetrieb mit Werkstatt und zwei Lagerräumen',
    projectDuration: '2 Arbeitstage',
    challenge: {
      summary:
        'Das Gefahrstoffverzeichnis existierte, war aber weder aktuell noch dort verfügbar, wo mit den Stoffen gearbeitet wird.',
      points: [
        'Excel-Liste ohne Versionsstand: Wann welches SDB eingepflegt wurde, war nicht mehr nachvollziehbar.',
        'Fehlende CLP-Aktualisierungen: Mehrere Lieferanten-SDB waren älter als die aktuelle Fassung beim Hersteller.',
        'Gedruckte SDB in Leitz-Ordnern im Büro statt am Gefahrstoffschrank — im Ereignisfall nicht greifbar.',
        'Betriebsanweisungen nach TRGS 555 lagen nur für einen Teil der Stoffe vor.',
      ],
    },
    solutionSteps: [
      {
        id: 'batch-import',
        title: 'SDB-Batch-Import',
        description:
          'Alle vorhandenen Sicherheitsdatenblätter wurden als PDF gesammelt hochgeladen. Die KI-gestützte Extraktion legte je Stoff einen Entwurf mit Einstufung, H-/P-Sätzen, Piktogrammen und Lagerklasse an — zur Vorprüfung durch die SiFa.',
        regulatoryRef: '§ 6 GefStoffV',
      },
      {
        id: 'lagerorte',
        title: 'Zuordnung zu mehreren Lagerorten',
        description:
          'Jeder Stoff wurde den tatsächlichen Lagerorten (Werkstatt, Lagerraum, Gefahrstoffschrank) zugeordnet, inklusive Mengenbereich. Hinweise zur Zusammenlagerung nach TRGS 510 wurden je Raum geprüft.',
        regulatoryRef: 'TRGS 510',
      },
      {
        id: 'raum-qr',
        title: 'Raum-QR-Codes und Freigabe',
        description:
          'Nach fachlicher Freigabe durch die SiFa wurden Raum-QR-Codes gedruckt und an Schrank und Lagertür angebracht. Beschäftigte rufen SDB und Betriebsanweisung ohne Login auf dem Smartphone ab.',
        regulatoryRef: '§ 14 GefStoffV · TRGS 555',
      },
    ],
    // TODO(case-study): Durch vom Kunden bestätigte Zahlen ergänzen (z. B. Anzahl Stoffe, Anzahl aktualisierter SDB).
    beforeAfterMetrics: [
      {
        label: 'Gefahrstoffverzeichnis',
        before: 'Excel-Liste ohne Versionsstand',
        after: 'Kataster nach § 6 GefStoffV mit Versionsverlauf je SDB',
      },
      {
        label: 'Ablage der Sicherheitsdatenblätter',
        before: 'Leitz-Ordner im Büro',
        after: 'PDF je Stoff, per Raum-QR am Lagerort abrufbar',
      },
      {
        label: 'Aktualität der Einstufung',
        before: 'Manueller Abgleich, CLP-Änderungen nicht erfasst',
        after: 'Feldweiser Abgleich bei jeder neuen SDB-Fassung',
      },
      {
        label: 'Betriebsanweisungen (TRGS 555)',
        before: 'Für einen Teil der Stoffe vorhanden',
        after: 'KI-gestützter Entwurf je Stoff, freigegeben durch die SiFa',
      },
    ],
    // TODO(case-study): Freigegebenes Kundenzitat eintragen; bis dahin wird kein Zitat angezeigt.
    quote: null,
    datePublished: '2026-11-19',
    dateModified: '2026-11-19',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((caseStudy) => caseStudy.status === 'published');
}

export const CASE_STUDY_BASE_PATH = '/praxisbeispiele';

export function caseStudyPath(slug: string): `/${string}/` {
  return `${CASE_STUDY_BASE_PATH}/${slug}/`;
}
