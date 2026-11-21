/**
 * Zentrale Branchen-Daten für SEO-Landingpages (DRY).
 * Inhalte faktenorientiert; rechtliche Einordnung erfolgt durch die Nutzerorganisation.
 */
import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import type { HeroCopy } from '@/config/home-sections/hero';
import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

/** Typischer Branchenstoff mit Link auf die passende TRGS-555-Betriebsanweisung (Themen-Cluster). */
export interface IndustrySubstanceLink {
  label: string;
  /** Kurzer Praxishinweis (Gefährdung / Einsatzort), eine Zeile. */
  note: string;
  baSlug: HazardousSubstanceSlug;
}

export interface IndustrySubstanceOverview {
  heading: string;
  intro: string;
  items: readonly IndustrySubstanceLink[];
}

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
 /** Exakter SERP-Title (≤ 58 Zeichen; Marke wird nur angehängt, wenn sie noch passt). */
 metaTitle: string;
 metaDescription: string;
 /** 2–3 Praxisfragen: sichtbar auf der Seite + FAQPage JSON-LD (identischer Wortlaut). */
 faq?: readonly SeoFaqItem[];
 heroText: string;
 /** Optional: mehrere Absätze statt einem `heroText`-Block. */
 heroLeadParagraphs?: readonly string[];
 /** Optional: eigene USP-Liste; sonst `DEFAULT_SLUG_HERO_USP_BULLETS`. */
 heroUspBullets?: readonly string[];
 typischeStoffe: string[];
 spezifischerVorteil: string;
 /** Längerer Absatz für den Mittelteil */
 handwerkAbsatz: string;
 /** Branchenbegriff für Überschrift „Wie GQR Ihr … erleichtert“ */
 brancheGenitiv: string;
 /** Blog-Artikel unter /blog/ (vorhandene statische URL) */
 blogPostHref: string;
 /** Zero-Login SDB-Live-Dropzone im Hero-Bereich */
 showSdbPreview?: boolean;
 /** Hero-Copy für statische Landingpages auf Basis der Startseite (H1 + Subheadline). */
 staticHero?: HeroCopy;
 /** „Typische Gefahrstoffe auf einen Blick“ mit Links auf Betriebsanweisungen. */
 substanceOverview?: IndustrySubstanceOverview;
}

export const industrySolutions: Record<IndustrySlug, IndustrySolution> = {
 'kfz-werkstatt': {
 slug: 'kfz-werkstatt',
 label: 'Kfz-Werkstatt',
 title: 'Gefahrstoffkataster, Betriebsanweisungen & QR-Codes für die Kfz-Werkstatt',
 // Keyword-Abgrenzung (GSC 11/2026):
 // - diese Seite: kommerzieller Intent „Gefahrstoff-Software / Lösung Kfz“
 // - /wissen/gefahrstoffverzeichnis-muster-kfz-werkstatt/: informatorischer Muster-/Pflicht-Check,
 //   verlinkt per InternalSolutionBanner oben und unten hierher.
 metaTitle: 'Gefahrstoff-Software Kfz-Werkstatt: Kataster & QR-Codes',
 metaDescription:
 'Schluss mit Excel-Chaos in der Werkstatt: Sicherheitsdatenblätter für Bremsenreiniger, Öle & Lacke per PDF einlesen und QR-Codes an den Schrank hängen.',
 staticHero: {
 eyebrow: 'Gefahrstoff-Software für Kfz-Werkstätten',
 headline: 'Gefahrstoff­kataster, Betriebs­anweisungen & QR-Codes',
 headlineAccent: 'für die Kfz-Werkstatt.',
 subheadlineParagraphs: [
 'Sicherheitsdatenblatt hochladen: KI-gestützter Entwurf für das Gefahrstoffverzeichnis (§ 6 GefStoffV) und die Betriebsanweisung (gemäß TRGS 555). Sie prüfen und geben frei.',
 'Testen Sie es direkt hier mit dem SDB-PDF Ihres Bremsenreinigers, ohne Login.',
 ],
 secondaryLinks: [
 { label: 'Typische Werkstatt-Gefahrstoffe ansehen', href: '#werkstatt-stoffe' },
 { label: 'Kataster in 48 Stunden erstellen lassen', href: '#schluesselfertig-service' },
 ],
 },
 substanceOverview: {
 heading: 'Typische Gefahrstoffe in der Kfz-Werkstatt auf einen Blick',
 intro:
 'Diese Produkte stehen in fast jeder Werkstatt im Regal. Zu jedem finden Sie eine Muster-Betriebsanweisung nach TRGS 555, die Sie mit Ihrem eigenen Sicherheitsdatenblatt in einen KI-gestützten Entwurf übernehmen.',
 items: [
 {
 label: 'Bremsenreiniger',
 note: 'Entzündbares Aerosol, Lösemitteldämpfe an Hebebühne und Prüfstand',
 baSlug: 'bremsenreiniger-trgs-555',
 },
 {
 label: 'Motoröl',
 note: 'Hautkontakt beim Ölwechsel, Altöl getrennt sammeln',
 baSlug: 'motoroel-trgs-555',
 },
 {
 label: 'Getriebeöl',
 note: 'Hautschutz bei Wartung und Getriebespülung',
 baSlug: 'getriebeoel-trgs-555',
 },
 {
 label: 'Kühlerfrostschutz',
 note: 'Ethylenglykol, gesundheitsschädlich beim Verschlucken',
 baSlug: 'kuehlerfrostschutz-trgs-555',
 },
 {
 label: 'AdBlue',
 note: 'Harnstofflösung, Abschnitt 2 des SDB entscheidet über den Eintrag',
 baSlug: 'adblue-trgs-555',
 },
 {
 label: '2K-Autolack',
 note: 'Lösemittel und Isocyanat-Härter in der Lackierkabine',
 baSlug: 'autolack-trgs-555',
 },
 {
 label: 'Lackverdünner',
 note: 'Leicht entzündbar, Zusammenlagerung nach TRGS 510 prüfen',
 baSlug: 'lackverduenner-trgs-555',
 },
 {
 label: 'Batteriesäure',
 note: 'Schwefelsäure, verursacht schwere Verätzungen',
 baSlug: 'schwefelsaure-trgs-555',
 },
 {
 label: 'Waschbenzin',
 note: 'Teilereinigung, leicht entzündbare Dämpfe',
 baSlug: 'waschbenzin-trgs-555',
 },
 {
 label: 'Felgenreiniger',
 note: 'Saure oder alkalische Reiniger, Augen- und Hautschutz',
 baSlug: 'felgenreiniger-trgs-555',
 },
 ],
 },
 faq: [
 {
 question: 'Was prüft die BG bei einer Kontrolle in der Kfz-Werkstatt?',
 answer:
 'Aufsichtspersonen der BG oder der Gewerbeaufsicht fragen in der Regel nach dem Gefahrstoffverzeichnis (§ 6 GefStoffV), der Gefährdungsbeurteilung, den Betriebsanweisungen mit Unterweisungsnachweis (§ 14 GefStoffV) und den aktuellen Sicherheitsdatenblättern. Typische Lücken in Werkstätten sind veraltete SDB-Versionen, fehlende Einträge für Sprays und Reiniger sowie Betriebsanweisungen, die nur im Büro liegen.',
 },
 {
 question: 'Wie funktionieren QR-Codes am Gefahrstoffschrank?',
 answer:
 'Sie drucken in Gefahrstoff-QR für jeden Stoff einen QR-Code und bringen ihn am Gefahrstoffschrank, an der Hebebühne oder am Gebinde an. Der Scan mit dem Smartphone öffnet Sicherheitsdatenblatt, Betriebsanweisung und Erste-Hilfe-Hinweise ohne Login. So erreichen Beschäftigte die Informationen dort, wo sie mit dem Stoff arbeiten (§ 14 GefStoffV).',
 },
 {
 question: 'Wie gelingt der Umstieg von der Excel-Liste auf Gefahrstoff-QR?',
 answer:
 'Sie laden die vorhandenen Sicherheitsdatenblätter als PDF hoch. Für jeden Stoff entsteht ein KI-gestützter Entwurf mit H- und P-Sätzen, Piktogrammen und Lagerklasse, als Vorprüfung zur fachlichen Freigabe durch die SiFa / den Arbeitgeber (§ 14 GefStoffV). Ihre bisherige Excel-Liste dient als Abgleich, ob alle Produkte aus Werkstatt, Lager und Lackierbereich erfasst sind.',
 },
 {
 question: 'Muss Bremsenreiniger ins Gefahrstoffverzeichnis der Werkstatt?',
 answer:
 'Ja. Bremsenreiniger ist in der Regel als entzündbares Aerosol mit H-Sätzen eingestuft und damit ein Gefahrstoff. Er gehört mit Arbeitsbereich, Mengenbereich und Verweis auf das aktuelle Sicherheitsdatenblatt ins Gefahrstoffverzeichnis nach § 6 GefStoffV.',
 },
 {
 question: 'Wie werden Dieselmotoremissionen (DME) in der Werkstatt dokumentiert?',
 answer:
 'DME entstehen bei Tätigkeiten und stehen auf keinem Sicherheitsdatenblatt. Sie sind in der Gefährdungsbeurteilung nach TRGS 554 zu berücksichtigen. In Gefahrstoff-QR führen Sie DME als eigenen Eintrag mit Arbeitsbereich und Schutzmaßnahmen neben den gelieferten Stoffen.',
 },
 ],
 heroText:
 'Vom Bremsenreiniger bis zu den Anforderungen rund um Dieselmotor-Emissionen (DME): Stoffe, Mengen und Sicherheitsdatenblätter an einem Ort.',
 typischeStoffe: [
 'Motor- und Getriebeöle',
 'Bremsenreiniger / stark lösende Reiniger',
 'Kühlerfrostschutz (Glykol)',
 'Dieselruß und Motorabgasemissionen (DME-Protokolle)',
 'Altöl und Abfälle aus Abscheidern',
 ],
 spezifischerVorteil:
 'Wiederkehrende Erfassungen und ein nachvollziehbares DME-Protokoll lassen sich parallel zum Gefahrstoffverzeichnis führen, ohne zweite Excel-Parallelwelt.',
 handwerkAbsatz:
 'Werkstätten arbeiten oft mit vielen Herstellern und schnellen Produktwechseln. Wenn Sicherheitsdatenblätter nicht zeitnah in Verzeichnis und betriebliche Unterweisung einfließen, entstehen Lücken bei Prüfungen. KI-gestützte Extraktion aus dem PDF reduziert den manuellen Aufwand bei H- und P-Sätzen sowie Schutzmaßnahmen.',
 brancheGenitiv: 'Werkstatt',
 blogPostHref: '/blog/kfz-gefahrstoff-excel/',
 showSdbPreview: true,
 },
 schreinerei: {
 slug: 'schreinerei',
 label: 'Schreinerei',
 title: 'Gefahrstoffmanagement für Schreinereien',
 metaTitle:
 'Gefahrstoffverzeichnis Schreinerei & Betriebsanweisung Holzwerkstatt',
 metaDescription:
 'Gefahrstoffverzeichnis Schreinerei: Holzstaub, Leime, Lacke – PSA und Betriebsanweisung aus Sicherheitsdatenblättern per KI.',
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
 'GHS-Piktogramme, H-Sätze und empfohlene Schutzmaßnahmen aus dem Sicherheitsdatenblatt fließen strukturiert in Betriebsanweisungen ein – abgestimmt auf Sägen, Presse und Lackierbereich.',
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
 'Gefahrstoffverzeichnis Malerbetrieb: Lösemittel, 2K-Systeme, PSA – Betriebsanweisungen aus dem Sicherheitsdatenblatt, nach § 6 GefStoffV strukturiert per KI.',
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
 'Schutzmaßnahmen und relevante Warnhinweise aus dem Sicherheitsdatenblätter werden extrahiert, damit Sie PSA und Betriebsanweisungen fachlich fundiert abstimmen – statt Felder in musterbasierten Listen zu raten.',
 handwerkAbsatz:
 'Malerbetriebe wechseln zwischen Werkstatt, Objekt und unterschiedlichen Materialien. Wenn Verzeichnis und Baustellenlogik auseinanderlaufen, leidet die Nachweisbarkeit. Digitale Erfassung mit KI beschleunigt die Übernahme neuer Produktdaten aus dem Lieferanten-Sicherheitsdatenblatt.',
 brancheGenitiv: 'Malerhandwerk',
 blogPostHref: '/blog/maler-gefahrstoffverzeichnis-excel/',
 showSdbPreview: true,
 },
 laborbetrieb: {
 slug: 'laborbetrieb',
 label: 'Laborbetrieb',
 title: 'Gefahrstoffmanagement für Laborbetriebe',
 metaTitle:
 'Gefahrstoffverzeichnis Labor & Chemikalien-Inventur · Betriebsanweisung Labor',
 metaDescription:
 'Gefahrstoffverzeichnis Labor: Chemikalien-Inventur, Sicherheitsdatenblatt-Updates und GHS-Daten – KI-Extraktion statt manuellem Abtippen.',
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
 'Neue oder aktualisierte Sicherheitsdatenblätter können KI-gestützt strukturiert übernommen werden — Freigabe durch SiFa / Arbeitgeber; weniger Abtippen bei H/P-Sätzen.',
 handwerkAbsatz:
    'Labore arbeiten mit vielen Stoffen geringer Menge aber hoher Einstufungsvielfalt. Ein Gefahrstoffverzeichnis mit Revisionsverlauf zu führen und schnelle Synchronisierung bei Lieferantenupdates sind entscheidend, ohne den Fachkräfte-Alltag zu blockieren.',
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
 'Gefahrstoffverzeichnis Reinigung: Reiniger, Desinfektion, Hautschutzpläne – Betriebsanweisungen aus dem Sicherheitsdatenblatt per KI.',
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
 'Neben dem Gefahrstoffverzeichnis lassen sich Schutzmaßnahmen aus dem Sicherheitsdatenblatt nutzen, um Hautschutzpläne und betriebliche Anweisungen konsistent abzustimmen – besonders bei rotierenden Einsatzteams.',
 handwerkAbsatz:
 'Reinigungskräfte wechseln Objekte und Produktlinien. Wenn Sicherheitsdatenblatt-Updates oder neue Konzentrate nicht schnell im Verzeichnis landen, bestehen Lücken bei Unterweisung und Hautschutz. Digitale Erfassung verkürzt die Zeit vom Lieferanten-PDF bis zur freigegebenen Information am Einsatzort.',
 brancheGenitiv: 'Reinigungsbetrieb',
 blogPostHref: '/blog/reinigung-gefahrstoffkataster-vorlage/',
 showSdbPreview: true,
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
