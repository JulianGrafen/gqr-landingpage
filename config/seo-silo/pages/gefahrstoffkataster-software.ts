import type { SeoSiloPageConfig } from '@/config/seo-silo/types';

export const KATASTER_SOFTWARE_SILO_PATH = '/gefahrstoffkataster-software/';

export const KATASTER_SOFTWARE_SILO_CONFIG: SeoSiloPageConfig = {
  slug: 'gefahrstoffkataster-software',
  path: KATASTER_SOFTWARE_SILO_PATH,
  intent: 'software-buy',
  seo: {
    title: 'Gefahrstoffkataster Software: Audit-sicher statt Excel | GQR',
    description:
      'Gefahrstoffkataster Software mit KI-SDB-Import, revisionssicherem Verzeichnis nach § 6 GefStoffV, TRGS 510 und QR-Notfallpass — ROI für SiFa und Betriebsleitung.',
    ogImageAlt:
      'Gefahrstoffkataster Software Gefahrstoff-QR — Dashboard mit SDB-Status und Compliance-KPIs',
    canonicalPath: KATASTER_SOFTWARE_SILO_PATH,
  },
  breadcrumb: [
    { label: 'Start', href: '/' },
    { label: 'Gefahrstoffkataster Software', href: KATASTER_SOFTWARE_SILO_PATH },
  ],
  hero: {
    eyebrow: 'Kaufbereit · § 6 GefStoffV · KI-SDB-Import',
    h1: 'Gefahrstoffkataster Software — wenn Excel die Audit-Sicherheit kostet',
    lead:
      'Sie evaluieren Software statt Tabellen? GQR führt Ihr Gefahrstoffverzeichnis revisionssicher, extrahiert Sicherheitsdatenblätter automatisch und liefert Nachweise, die BG- und Behördenprüfungen erwarten.',
    proofLine:
      'Rechenbeispiel: 50 Stoffe × 20 Minuten manuelles Abtippen = über 16 Stunden Setup — plus jährliche Revisionen, CLP-Anpassungen bis Mai 2026 und fehlende SDB-Historie als Haftungsrisiko. Software amortisiert sich oft im ersten Audit-Zyklus.',
    primaryCta: {
      label: 'GQR kostenlos testen',
      href: 'https://app.gefahrstoff-qr.de/register',
      external: true,
    },
    secondaryCta: {
      label: 'ROI vergleichen',
      href: '#silo-roi',
      external: false,
    },
    trustBullets: [
      'Keine Kreditkarte',
      'Erste Stoffe in Minuten',
      'Export für Behördenkontrollen',
    ],
  },
  features: {
    sectionTitle: 'Was professionelle Gefahrstoffkataster-Software leisten muss',
    sectionSubline:
      'Checkliste für die Anbieterauswahl — abgeleitet aus GefStoffV, TRGS 400, TRGS 510 und Praxis bei BG-Kontrollen.',
    items: [
      {
        id: 'sdb-import',
        title: 'Automatischer SDB-Workflow',
        description:
          'Strukturierte Daten aus dem PDF — H-/P-Sätze, Lagerklasse, WGK — ohne Copy-Paste. Tagesaktuelle P-Sätze statt veralteter Excel-Zellen.',
      },
      {
        id: 'revision',
        title: 'Revisionssicherheit & Aktivitätsprotokoll',
        description:
          'Nachvollziehbar, wer wann welche SDB-Version hochgeladen oder Felder geändert hat — entscheidend bei Arbeitsunfällen und Audits.',
      },
      {
        id: 'verzeichnis',
        title: '§ 6 GefStoffV Verzeichnis & Export',
        description:
          'Durchsuchbares Kataster mit Filter, KMR-Hinweisen und One-Click-Export — Beweislast umkehren bei der nächsten Begehung.',
      },
      {
        id: 'trgs510',
        title: 'TRGS 510 Lagerlogik',
        description:
          'Lagerklassen aus dem SDB, automatische Konfliktprüfung pro Lagerort — statt manueller Matrixsuche im Ordner.',
      },
      {
        id: 'unterweisung',
        title: 'Bezug zu Unterweisung (§ 14 GefStoffV)',
        description:
          'Verzeichnis als Basis für Unterweisungsinhalte — weniger Word-BA-Pflege, wenn SDB-Daten zentral und aktuell liegen.',
      },
      {
        id: 'notfall',
        title: 'Information am Arbeitsplatz',
        description:
          'QR-Notfallpass am Gebinde: Ersthelfer greifen auf GHS, Erste-Hilfe und P-Sätze zu — nicht auf Ordner im Büro.',
      },
    ],
  },
  faq: [
    {
      question: 'Was unterscheidet Gefahrstoffkataster-Software von Excel?',
      answer:
        'Excel erfasst Stoffe — es führt sie nicht. Keine revisionssichere SDB-Historie, keine automatische CLP-Aktualisierung, keine TRGS-510-Prüfung, kein Nachweis der Datenherkunft beim Export. Software adressiert genau die Mängel, die bei BG-Kontrollen zu Beanstandungen führen: fehlende Aktualität, undokumentierte Änderungen, getrennte Ablage von SDB-PDF und Tabellenzeile.',
    },
    {
      question: 'Lohnt sich GQR für kleine Betriebe mit unter 20 Stoffen?',
      answer:
        'Abhängig von Update-Frequenz und Haftungsexposition. Auch kleine Betriebe mit wenigen, aber hochriskanten Stoffen profitieren von schnellem SDB-Import und QR-Notfallpass. Der kostenlose Einstieg erlaubt einen Realitätscheck ohne IT-Projekt — ob sich der Wechsel lohnt, sehen Sie am Aufwand für die nächste SDB-Runde.',
    },
    {
      question: 'Wie unterstützt GQR die Gefährdungsbeurteilung nach TRGS 400?',
      answer:
        'Das Verzeichnis liefert die strukturierte Stoffbasis für die GB chemischer Arbeitsstoffe: Mengen, Einsatzbereiche, Kennzeichnung, Schutzmaßnahmen aus dem SDB. GQR ersetzt nicht die fachliche Bewertung der SiFa — aber es reduziert die Zeit für Datensammlung und hält Informationen verknüpft statt in Excel-, Word- und PDF-Inseln.',
    },
    {
      question: 'Sind die Daten audit- und behördenfest exportierbar?',
      answer:
        'Ja. Das Verzeichnis exportiert mit Bezug zum hinterlegten Sicherheitsdatenblatt. Das Aktivitätsprotokoll dokumentiert Änderungen. Das ist der Unterschied zu einem Excel-Export ohne Herkunftsnachweis — Prüfer fragen nach Nachvollziehbarkeit, nicht nach Dateiformat.',
    },
    {
      question: 'Wie schnell ist der Umstieg von Excel?',
      answer:
        'Typisch: Bestands-SDBs hochladen, extrahierte Felder prüfen, Lagerorte zuordnen — erste Stoffe oft in einem Vormittag. Kein ERP-Integrationszwang für den Start. SiFa-Zeit fließt in fachliche Freigabe, nicht in Abtippen.',
    },
    {
      question: 'Was kostet Gefahrstoff-QR?',
      answer:
        'Einstieg kostenlos für die ersten Stoffe ohne Kreditkarte. Professional-Pakete skalieren mit Nutzerzahl und Standorten — in der Regel deutlich unter dem Jahresaufwand einer SiFa für manuelle Excel- und Word-Pflege. Konkrete Preise finden Sie auf der Homepage unter Preise.',
    },
  ],
  closingCta: {
    headline: 'Audit-Sicherheit ist keine Tabellenfrage',
    subline:
      'Testen Sie GQR mit Ihren echten SDBs — und vergleichen Sie den Pflegeaufwand mit Ihrem Excel-Kataster.',
    primaryCta: {
      label: 'Jetzt kostenlos starten',
      href: 'https://app.gefahrstoff-qr.de/register',
      external: true,
    },
    disclaimer: 'Unverbindlich · Keine Kreditkarte · DSGVO-konform · Made in Germany',
  },
};

export const KATASTER_SOFTWARE_COMPARISON = {
  targetAudience: 'SiFa, Betriebsleitung und Einkauf bei Software-Evaluierung',
  rows: [
    {
      criterion: 'Implementierungsaufwand',
      manual: 'Listen importieren, Spalten anpassen, SDBs manuell verknüpfen',
      gqr: 'SDB hochladen, Felder prüfen — kein Abtipp-Marathon',
    },
    {
      criterion: 'Jährliche SDB-Revision (§ 6)',
      manual: 'Jede Zeile manuell gegen neues PDF prüfen',
      gqr: 'Upload neuer Version, Diff im Aktivitätsprotokoll',
    },
    {
      criterion: 'CLP Gemische bis Mai 2026',
      manual: 'H-/P-Sätze in jeder Zeile nachziehen — Fehlerquote steigt',
      gqr: 'Extraktion aus aktuellem SDB, einheitliche Felder',
    },
    {
      criterion: 'Betriebsanweisungen (TRGS 555)',
      manual: 'Word-Vorlagen pro Stoff neu pflegen — hunderte SiFa-Stunden/Jahr',
      gqr: 'SDB-Daten als BA-Grundlage, Ergänzung betriebsspezifisch',
    },
    {
      criterion: 'ROI über 3 Jahre',
      manual: 'Steigende Pflegekosten mit jedem Stoff und Standort',
      gqr: 'Marginaler Mehraufwand pro neuem SDB — planbare SiFa-Zeit',
    },
  ],
} as const;
