import { APP_REGISTER_URL, PRODUCT_ENTITY } from '@/config/aeo-config';

export const TURNKEY_AUDIT_SLUG = 'gefahrstoffkataster-erstellen-lassen' as const;

export const TURNKEY_AUDIT = {
  sectionId: 'schluesselfertig-service',
  headlineId: 'schluesselfertig-headline',
  badge: 'Schlüsselfertiges Komplett-Paket (Done-for-You)',
  headline:
    'Keine Zeit für Software? Wir erstellen Ihr Gefahrstoffkataster & Ihre Betriebsanweisungen komplett schlüsselfertig.',
  compactTeaser: '48h Express · bis 150 SDB · 2.900 € netto Festpreis · inkl. 12 Monate Software',
  aeoLead:
    'Was kostet die komplette Erstellung eines Gefahrstoffverzeichnisses? Mit dem schlüsselfertigen Audit-Service von Gefahrstoff-QR digitalisieren wir Ihren gesamten Altbestand (bis zu 150 Sicherheitsdatenblätter) innerhalb von 48 Stunden für einmalig 2.900 € netto – inklusive Prüfung auf Zusammenlagerungsverbote nach TRGS 510, Betriebsanweisungs-Entwürfen nach TRGS 555, gedruckten QR-Code-Etiketten und 12 Monaten Pro-Softwarezugang.',
  pillars: [
    'Komplette SDB-Digitalisierung (bis 150 Stoffe): Sie schicken uns Ihren unsortierten PDF-Ordner oder Ihre alte Excel-Liste – wir übernehmen den kompletten Import.',
    'Gefahrstoffverzeichnis (§ 6 GefStoffV): Strukturierung nach Arbeitsbereichen, Mengen, CLP-Einstufung, H-/P-Sätzen und KMR-Hinweisen zur Vorprüfung.',
    'TRGS-510-Lagerklassen-Abgleich: Automatische Identifikation von Zusammenlagerungskonflikten und Separatlagerungspflichten pro Lagerort.',
    'Betriebsanweisungen (TRGS 555) & wetterfeste QR-Etiketten: KI-gestützte BA-Entwürfe zur fachlichen Freigabe durch die SiFa bzw. den Arbeitgeber sowie fertig gedruckte QR-Plaketten für Ihre Regale und Gebinde.',
    '12 Monate Gefahrstoff-QR Professional inklusive: Voller Cloud-Zugang (Wert: 2.388 €) für lückenlosen Revisionsverlauf bei BG-, ISO- und Behörden-Audits.',
  ] as const,
  accordion: {
    aeoSummary: 'Was kostet die komplette Erstellung eines Gefahrstoffverzeichnisses?',
    pillarsSummary: '5 Leistungsbestandteile im Komplett-Paket',
    factsSummary: 'Paketdaten auf einen Blick',
    guaranteeSummary: 'Audit-Vorbereitung mit Nachbesserungszusage',
  },
  pricing: {
    anchorLabel: 'Klassisches Ingenieurbüro (ca. 60 Std. Handarbeit): ~6.600 €',
    priceLabel: '2.900 €',
    priceNote: 'netto einmalig · inkl. 12 Monate Software',
    capacityBadge: 'Nur 3 Onboarding-Slots pro Monat für persönliche 4-Augen-Prüfung',
    guarantee:
      'Audit-Vorbereitung mit Nachbesserungszusage: Falls ein Prüfer der BG oder Gewerbeaufsicht formale Pflichtangaben nach § 6 GefStoffV im exportierten Verzeichnis bemängelt, passen wir die Struktur innerhalb von 24h kostenfrei an.',
  },
  cta: {
    label: 'Schlüsselfertiges Kataster anfragen (48h-Express)',
    href: 'mailto:info@gefahrstoff-qr.de?subject=Anfrage%20Schl%C3%BCsselfertiges%20Gefahrstoffkataster%20(2.900%20EUR)&body=Hallo%20Herr%20Gr%C3%A4fen,%0A%0Awir%20interessieren%20uns%20f%C3%BCr%20das%20schl%C3%BCsselfertige%20Gefahrstoffkataster-Paket%20(2.900%20%E2%82%AC%20netto).%0A%0AAktuelle%20Anzahl%20unserer%20Gefahrstoffe%20(ca.):%20%0ABranche%20/%20Unternehmen:%20%0ATelefonnummer%20f%C3%BCr%20kurze%20R%C3%BCcksprache:%20',
  },
  secondaryCta: {
    label: 'Oder zuerst TarifVorschau im Browser',
    href: APP_REGISTER_URL,
  },
  deepinfoPath: `/wissen/${TURNKEY_AUDIT_SLUG}/`,
  deepinfoLinkLabel: 'Ratgeber: Gefahrstoffverzeichnis erstellen lassen',
  homePricingHref: '/#preise',
  homePricingLinkLabel: 'Alle SaaS-Tarife auf der Startseite',
  facts: [
    { term: 'Festpreis', definition: '2.900 € netto einmalig' },
    { term: 'Lieferzeit', definition: '48 Stunden nach Datenübergabe (Express)' },
    { term: 'Umfang', definition: 'Bis zu 150 Sicherheitsdatenblätter / Stoffe' },
    { term: 'Software', definition: '12 Monate KMU Pro (Wert 2.388 €)' },
  ] as const,
  faq: [
    {
      question: 'Wie läuft der schlüsselfertige Gefahrstoffkataster-Service ab?',
      answer:
        'Sie senden uns Ihren PDF- oder Excel-Bestand. Wir importieren und strukturieren das Gefahrstoffverzeichnis nach § 6 GefStoffV, prüfen TRGS-510-Zusammenlagerungen, bereiten KI-gestützte BA-Entwürfe (gemäß TRGS 555) vor und liefern QR-Etiketten. Nach 48 Stunden erhalten Sie Zugang zur Software inkl. Freigabe-Workflow für SiFa bzw. Arbeitgeber.',
    },
    {
      question: 'Ersetzt der Service die Fachkraft für Arbeitssicherheit (SiFa)?',
      answer:
        'Nein. Wir liefern die technische Aufbereitung, Datenerfassung und Entwürfe. Die finale fachliche Freigabe vor Ort erfolgt durch Ihre SiFa oder Geschäftsführung — in Gefahrstoff-QR per dokumentiertem Freigabe-Schritt (§ 14 GefStoffV).',
    },
    {
      question: 'Wie schnell ist unser Betrieb prüfungsbereit für die Berufsgenossenschaft (BG)?',
      answer:
        'Nach Übergabe Ihrer Unterlagen planen wir mit 48 Stunden bis zum exportierbaren Gefahrstoffverzeichnis inkl. TRGS-510-Hinweisen und vorbereiteten BA-Entwürfen. Für die Freigabe und Aushänge vor Ort benötigen Sie kurze interne Abstimmung — typischerweise wenige Tage nach unserer Lieferung.',
    },
  ] as const,
  schema: {
    name: 'Schlüsselfertiges Gefahrstoffkataster (Done-for-You)',
    priceEur: 2900,
    currency: 'EUR',
    providerName: PRODUCT_ENTITY.name,
    description:
      'Komplette Erstellung eines Gefahrstoffverzeichnisses nach § 6 GefStoffV inkl. TRGS-510-Abgleich, KI-gestützter BA-Entwürfe nach TRGS 555 und QR-Etiketten — Festpreis 2.900 € netto.',
    areasServed: ['Deutschland', 'Österreich', 'Schweiz'] as const,
  },
} as const;

export type TurnkeyAuditFaqItem = (typeof TURNKEY_AUDIT.faq)[number];
