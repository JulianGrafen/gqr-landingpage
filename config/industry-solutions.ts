/**
 * Zentrale Branchen-Daten für SEO-Landingpages (DRY).
 * Inhalte faktenorientiert; rechtliche Einordnung erfolgt durch die Nutzerorganisation.
 */
export const INDUSTRY_SLUGS = [
  'kfz-werkstatt',
  'schreinerei',
  'malerbetrieb',
  'laborbetrieb',
  'reinigungsunternehmen',
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

export interface IndustrySolution {
  slug: IndustrySlug;
  /** Kurzname für UI (z. B. Karten) */
  label: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroText: string;
  typischeStoffe: string[];
  spezifischerVorteil: string;
  /** Längerer Absatz für den Mittelteil */
  handwerkAbsatz: string;
  /** Branchenbegriff für Überschrift „Wie GQR Ihr … erleichtert“ */
  brancheGenitiv: string;
  /** Blog-Artikel unter /blog/ (vorhandene statische URL) */
  blogPostHref: string;
}

export const industrySolutions: Record<IndustrySlug, IndustrySolution> = {
  'kfz-werkstatt': {
    slug: 'kfz-werkstatt',
    label: 'Kfz-Werkstatt',
    title: 'Gefahrstoffmanagement für Kfz-Werkstätten',
    metaTitle:
      'Gefahrstoffverzeichnis Kfz-Werkstatt & Betriebsanweisung Werkstatt',
    metaDescription:
      'Gefahrstoffverzeichnis für die Kfz-Werkstatt: Öle, Bremsflüssigkeit, Kühlerfrostschutz und Dokumentation von Dieselmotor-Emissionen (DME). Betriebsanweisungen aus dem SDB – mit KI-Extraktion.',
    heroText:
      'Vom Bremsenreiniger bis zu den Anforderungen rund um Dieselmotor-Emissionen (DME) – Stoffe, Mengen und Sicherheitsdatenblätter an einem Ort.',
    typischeStoffe: [
      'Motor- und Getriebeöle',
      'Bremsenreiniger / stark lösende Reiniger',
      'Kühlerfrostschutz (Glykol)',
      'Dieselruß und Motorabgasemissionen (DME-Protokolle)',
      'Altöl und Abfälle aus Abscheidern',
    ],
    spezifischerVorteil:
      'Wiederkehrende Erfassungen und ein nachvollziehbares DME-Protokoll lassen sich parallel zum Gefahrstoffverzeichnis führen – ohne zweite Excel-Parallelwelt.',
    handwerkAbsatz:
      'Werkstätten arbeiten oft mit vielen Herstellern und schnellen Produktwechseln. Wenn Sicherheitsdatenblätter nicht zeitnah in Verzeichnis und betriebliche Unterweisung einfließen, entstehen Lücken bei Prüfungen. KI-gestützte Extraktion aus dem PDF reduziert den manuellen Aufwand bei H- und P-Sätzen sowie Schutzmaßnahmen.',
    brancheGenitiv: 'Werkstatt',
    blogPostHref: '/blog/kfz-gefahrstoff-excel/',
  },
  schreinerei: {
    slug: 'schreinerei',
    label: 'Schreinerei',
    title: 'Gefahrstoffmanagement für Schreinereien',
    metaTitle:
      'Gefahrstoffverzeichnis Schreinerei & Betriebsanweisung Holzwerkstatt',
    metaDescription:
      'Gefahrstoffverzeichnis Schreinerei: Holzstäube, Leime, Lacke und Beizen – PSA und Betriebsanweisung aus Sicherheitsdatenblättern strukturiert. KI liest Ihre SDBs aus.',
    heroText:
      'Holzstäube in der Luft, 2K-Leime in der Verarbeitung, Lacke in der Spritzkabine – Ihre Gefahrstoffliste muss zur echten Nutzung passen.',
    typischeStoffe: [
      'Holzstaub / Staub fraktioniert nach Tätigkeit',
      'Polyurethan- oder Epoxidklebstoffe (2K)',
      'Lacke, Grundierungen, Holzschutzmittel',
      'Beizen und Lösemittel',
      'Reiniger für Spritzkabinen und Geräte',
    ],
    spezifischerVorteil:
      'GHS-Piktogramme, H-Sätze und empfohlene Schutzmaßnahmen aus dem SDB fließen strukturiert in Betriebsanweisungen ein – abgestimmt auf Sägen, Presse und Lackierbereich.',
    handwerkAbsatz:
      'In der Holzverarbeitung überlagern sich Stäube, organische Lösemittel und reaktive Harze. Ein digitales Verzeichnis hilft, die richtige PSA und Lagerlogik (z. B. nach TRGS 510) konsistent zu dokumentieren und bei neuen Lacklinien schnell nachzuziehen.',
    brancheGenitiv: 'Schreinerhandwerk',
    blogPostHref: '/blog/schreinerei-gefahrstoff-blog.html',
  },
  malerbetrieb: {
    slug: 'malerbetrieb',
    label: 'Malerbetrieb',
    title: 'Gefahrstoffmanagement für Malerbetriebe',
    metaTitle:
      'Gefahrstoffverzeichnis Malerbetrieb & Betriebsanweisung Maler',
    metaDescription:
      'Gefahrstoffverzeichnis Malerbetrieb: Lösemittel, Dispersionen, 2K-Beschichtungen – PSA-Auswahl und Betriebsanweisung aus dem SDB. GefStoffV-konform mit KI.',
    heroText:
      'Lösemittel, wasserverdünnbare Lacke oder 2K-Systeme: Was auf der Baustelle wirklich ankommt, muss im Verzeichnis und in der PSA nachvollziehbar sein.',
    typischeStoffe: [
      'Lösemittelbasierte Grundierungen und Lacke',
      'Zweikomponenten-Beschichtungen (Epoxid, PU)',
      'Reiniger und Entfetter',
      'Spachtel- und Kittmassen mit Harzen',
      'Biocide in filmgebenden Produkten (z. B. Algenschutz)',
    ],
    spezifischerVorteil:
      'Schutzmaßnahmen und relevante Warnhinweise aus dem SDB werden extrahiert, damit Sie PSA und Betriebsanweisungen fachlich fundiert abstimmen – statt Felder in musterbasierten Listen zu raten.',
    handwerkAbsatz:
      'Malerbetriebe wechseln zwischen Werkstatt, Objekt und unterschiedlichen Materialien. Wenn Verzeichnis und Baustellenlogik auseinanderlaufen, leidet die Nachweisbarkeit. Digitale Erfassung mit KI beschleunigt die Übernahme neuer Produktdaten aus dem Lieferanten-SDB.',
    brancheGenitiv: 'Malerhandwerk',
    blogPostHref: '/blog/maler-gefahrstoffverzeichnis-excel/',
  },
  laborbetrieb: {
    slug: 'laborbetrieb',
    label: 'Laborbetrieb',
    title: 'Gefahrstoffmanagement für Laborbetriebe',
    metaTitle:
      'Gefahrstoffverzeichnis Labor & Chemikalien-Inventur · Betriebsanweisung Labor',
    metaDescription:
      'Gefahrstoffverzeichnis Laborbetrieb: Chemikalien-Inventur, schnelle SDB-Aktualisierung, GHS-Daten und Betriebsanweisungen – KI-Extraktion statt manuellem Abtippen.',
    heroText:
      'Reagenzien, interne Ansätze und Lieferantenwechsel: Ihre Inventur braucht Tempo bei neuen Versionen des Sicherheitsdatenblatts.',
    typischeStoffe: [
      'Säuren, Laugen, Salzlösungen',
      'Lösungsmittel und organische Verbindungen',
      'Indikatoren und Farbreagenzien',
      'Gefrier- und Konservierungschemikalien',
      'Spezialverbrauchsmaterialien mit CLP-Kennzeichnung',
    ],
    spezifischerVorteil:
      'Neue oder aktualisierte SDBs werden in Sekunden strukturiert übernommen – weniger Fehler bei H/P-Sätzen und bessere Aktualität für Unterweisung und Genehmigungsnachweise.',
    handwerkAbsatz:
      'Labore arbeiten mit vielen Stoffen geringer Menge aber hoher Einstufungsvielfalt. Revisionssicheres Führen des Gefahrstoffverzeichnisses und schnelle Synchronisierung bei Lieferantenupdates sind entscheidend, ohne den Fachkräfte-Alltag zu blockieren.',
    brancheGenitiv: 'Labor',
    blogPostHref: '/blog/laborbetrieb-gefahrstoff-blog.html',
  },
  reinigungsunternehmen: {
    slug: 'reinigungsunternehmen',
    label: 'Reinigungsunternehmen',
    title: 'Gefahrstoffmanagement für Reinigungsunternehmen',
    metaTitle:
      'Gefahrstoffverzeichnis Reinigung & Betriebsanweisung Gebäudereinigung · Hautschutzplan',
    metaDescription:
      'Gefahrstoffverzeichnis Reinigungsunternehmen: Desinfektionsmittel, alkalische und saure Reiniger, Hautschutzpläne und Betriebsanweisungen – Daten aus dem SDB per KI.',
    heroText:
      'Von alkalischen Kraftreinigern bis zu desinfektionswirksamen Produkten: Hautschutz und Gefahrstoffdokumentation müssen zusammenpassen.',
    typischeStoffe: [
      'Alkalische und saure Sanitärreiniger',
      'Desinfektionsmittel (biozidwirksam, kennzeichnungs- und stoffrechtlich geregelt)',
      'Lösemittelhaltige Spezialreiniger',
      'Floor-Care-Polymerdispersionen',
      'Duft- und Pflegeadditive mit sensibilisierenden Inhaltsstoffen',
    ],
    spezifischerVorteil:
      'Neben dem Gefahrstoffverzeichnis lassen sich Schutzmaßnahmen aus dem SDB nutzen, um Hautschutzpläne und betriebliche Anweisungen konsistent abzustimmen – besonders bei rotierenden Einsatzteams.',
    handwerkAbsatz:
      'Reinigungskräfte wechseln Objekte und Produktlinien. Wenn SDB-Updates oder neue Konzentrate nicht schnell im Verzeichnis landen, bestehen Lücken bei Unterweisung und Hautschutz. Digitale Erfassung verkürzt die Zeit vom Lieferanten-PDF bis zur freigegebenen Information am Einsatzort.',
    brancheGenitiv: 'Reinigungsbetrieb',
    blogPostHref: '/blog/reinigung-gefahrstoffkataster-vorlage/',
  },
};

export function isIndustrySlug(s: string): s is IndustrySlug {
  return (INDUSTRY_SLUGS as readonly string[]).includes(s);
}

export function getIndustry(slug: string): IndustrySolution | undefined {
  return isIndustrySlug(slug) ? industrySolutions[slug] : undefined;
}

export function getAllIndustries(): IndustrySolution[] {
  return INDUSTRY_SLUGS.map((slug) => industrySolutions[slug]);
}
