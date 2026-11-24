import type { IndustryPseoContent } from '@/config/loesungen/types';

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
  'friseursalon',
  'metallbau',
  'landwirtschaft',
  'zahnarztpraxis',
  'elektrobetrieb',
  'dachdecker',
  'tankstelle',
  'druckerei',
  'baeckerei',
  'sifa-mehrere-mandanten',
  'fliesenleger',
  'shk-betrieb',
  'lackiererei',
  'tischlerei',
  'gastronomie',
  'steinmetz',
  'garten-landschaftsbau',
  'pflegeeinrichtung',
  'geruestbau',
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
 /** Tabellen, AEO, FAQs und Vergleich (pSEO-Branchenseiten). */
 pseo?: IndustryPseoContent;
 /** Optional: Kicker statt „Branchenlösung“ (z. B. Persona-Seiten). */
 heroKicker?: string;
 /** Optional: Primär-CTA im Hero und Abschluss. */
 primaryCta?: { readonly href: string; readonly label: string };
 /** Optional: Links neben dem Primär-CTA. */
 heroSecondaryLinks?: readonly { readonly label: string; readonly href: string }[];
 /** Optional: Abschnitt „Häufige Gefahrstoffe“ (Listenblock). */
 stoffeListSection?: { readonly title: string; readonly intro: string };
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
 friseursalon: {
 slug: 'friseursalon',
 label: 'Friseursalon',
 title: 'Gefahrstoffmanagement im Friseursalon: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Friseursalon & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Friseur: Farben, Oxidant, Reiniger — Verzeichnis § 6 GefStoffV, TRGS-555-Entwürfe und Kennzeichnung beim Umfüllen in Gefahrstoff-QR.',
 heroText:
 'Farbemulsion, Wasserstoffperoxid und Pflegemittel wechseln oft mit Herstelleraktionen. Verzeichnis, Betriebsanweisungen und Umfüll-Kennzeichnung müssen zur echten Nutzung im Salon passen.',
 typischeStoffe: [
 'Oxidationsmittel (Wasserstoffperoxid, Entwickler)',
 'Haarfarben und Toner',
 'Permanentswellen und Fixierungen',
 'Haarspray und Stylingprodukte',
 'Reiniger für Flächen und Geräte',
 ],
 spezifischerVorteil:
 'Neue Salzprodukte oder Pflegelinien lassen sich mit SDB-Bezug erfassen. KI-gestützte TRGS-555-Entwürfe unterstützen die Vorprüfung durch SiFa oder Arbeitgeber vor der Unterweisung am Waschbecken.',
 handwerkAbsatz:
 'Salons sind klein, aber die Produktpalette ist breit. Wenn Sicherheitsdatenblätter in Ordnern schlummern und Sprühflaschen ohne Bezug zum Verzeichnis stehen, wird die BG-Begehung kritisch. Digitale Pflege bindet Stoff, Gebinde und Unterweisung zusammen.',
 brancheGenitiv: 'Friseursalon',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Der Arbeitgeber führt ein Gefahrstoffverzeichnis nach § 6 GefStoffV und stellt Betriebsanweisungen nach TRGS 555 bereit. Umfüllen in Sprühflaschen erfordert Kennzeichnung nach TRGS 201. Excel-Listen veralten, sobald Farb-, Pflege- und Reinigungsprodukte wechseln. Digitale Pflege mit SDB-Bezug hält Verzeichnis, Entwürfe und Unterweisung nachvollziehbar. Die SiFa prüft vor Freigabe.',
 typicalProducts: [
 {
 product: 'Entwickler (Oxidant)',
 gebinde: 'Flasche 1 Liter, Kanister',
 hazardKind: 'ätzend, oxidierend',
 workplaceDuty: 'Eintrag im Verzeichnis, Betriebsanweisung, Unterweisung vor Farbaufgaben',
 },
 {
 product: 'Haarfarbe (Dauerhaft)',
 gebinde: 'Tube, Tiegel',
 hazardKind: 'sensibilisierend, reizend',
 workplaceDuty: 'SDB archivieren, Hautkontaktpfade in der BA berücksichtigen',
 },
 {
 product: 'Haarspray',
 gebinde: 'Aerosoldose',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Lagerort dokumentieren, aerosoltypische Hinweise im Verzeichnis',
 },
 {
 product: 'Flächendesinfektion',
 gebinde: 'Sprühflasche, Kanister',
 hazardKind: 'ätzend oder biozidwirksam',
 workplaceDuty: 'Biozid- oder Chemikalieneinstufung im Verzeichnis führen',
 },
 {
 product: 'Säureneutralisierender Shampoo-Vorstufenreiniger',
 gebinde: 'Flasche 500 ml',
 hazardKind: 'reizend',
 workplaceDuty: 'Umfüllgebinde nach TRGS 201 kennzeichnen, wenn abgefüllt',
 },
 {
 product: 'Permanentwellenlotion',
 gebinde: 'Flasche, Ampulle',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Betriebsanweisung je Produktlinie, Unterweisung dokumentieren',
 },
 ],
 inspectionDeficiencies: [
 'Das Gefahrstoffverzeichnis listet nicht alle Farb- und Pflegeprodukte, obwohl sie täglich genutzt werden.',
 'Betriebsanweisungen sind veraltet oder ohne Bezug zum aktuellen Sicherheitsdatenblatt des Lieferanten.',
 'Umgelabelte Sprühflaschen im Waschbereich sind nicht dem Verzeichnis und keiner freigegebenen Betriebsanweisung zugeordnet.',
 ],
 berufsgenossenschaft: 'BGW',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Felder in Excel von Hand aus dem PDF übertragen',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Abschnittsbezug, Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Handschrift mit Edding auf unterschiedlichen Flaschen',
 gqrWorkflow: 'Druckbares Etikett mit Stoffname und QR-Zugriff auf BA und SDB',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner im Büro oder Lager',
 gqrWorkflow: 'QR-Code am Regal oder an der Mischstation',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Papierstapel und verstreute SDB-PDFs sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses inklusive Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Braucht ein Friseursalon mit drei Plätzen ein Gefahrstoffverzeichnis?',
 answer:
 'Ja, sobald Gefahrstoffe eingesetzt oder gelagert werden. Der Kreis der Stoffe richtet sich nach § 2 GefStoffV und der CLP-Kennzeichnung der Produkte. Auch kleine Salons nutzen Oxidant, Farben und Reiniger. Das Verzeichnis nach § 6 GefStoffV muss aktuell sein. Excel reicht nur, wenn es gepflegt wird.',
 },
 {
 question: 'Wie dokumentiere ich Umfüllen von Entwickler in Messbecher?',
 answer:
 'Beim Umfüllen entsteht ein neues Arbeitsmittel nach TRGS 201. Es braucht eine Kennzeichnung mit Stoff- und Gefahrenhinweisen aus dem SDB. Parallel gehört das Gebinde ins Gefahrstoffverzeichnis. Eine Betriebsanweisung nach TRGS 555 wird für den Umgang am Waschbecken benötigt und von der SiFa freigegeben.',
 },
 {
 question: 'Wie oft muss ich Betriebsanweisungen im Salon aktualisieren?',
 answer:
 'Bei jedem Wechsel des Sicherheitsdatenblatts, der Konzentration oder des Einsatzorts. Hersteller tauschen Rezepturen ohne großen Hinweis. Gefahrstoff-QR unterstützt TRGS-555-Entwürfe aus dem PDF. Die SiFa oder der Arbeitgeber prüft vor Unterweisung. Die Dokumentation gehört zum Unterweisungsnachweis nach § 14 GefStoffV im Salon.',
 },
 ],
 },
 },
 metallbau: {
 slug: 'metallbau',
 label: 'Metallbau',
 title: 'Gefahrstoffmanagement im Metallbau: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Metallbau & Schweißen',
 metaDescription:
 'Gefahrstoffverzeichnis Metallbau: Schweißrauch, Lösemittel, Korrosionsschutz — § 6 GefStoffV, TRGS 555 und TRGS 201 für Kennzeichnung in Gefahrstoff-QR.',
 heroText:
 'Schweißen, bohren, entfetten, verzinken: Im Metallbau überlagern sich Stäube, Gase und Lösemittel. Ihr Kataster muss Werkstatt, Baustelle und Hilfsstoffe abdecken.',
 typischeStoffe: [
 'Schutzgase und Schweißzusätze',
 'Lösemittelhaltige Vorbehandlung und Entfetter',
 'Korrosionsschutzmittel und Grundierungen',
 'Öle und Schmierstoffe an Maschinen',
 'Bindemittel in Spachtel und Kitt',
 ],
 spezifischerVorteil:
 'Schweißrauch und Lösemittel tauchen in unterschiedlichen Teams auf. Ein digitales Verzeichnis mit SDB-Historie hilft, Betriebsanweisungen je Tätigkeit freizugeben, ohne parallele Listen je Baustelle.',
 handwerkAbsatz:
 'Metallbaubetriebe wechseln zwischen Halle und Montageort. Wenn Verdünnung in Eimer umgefüllt wird, ohne dass Verzeichnis und Kennzeichnung nachgezogen werden, entstehen Lücken bei der BGHM. Strukturierte Erfassung reduziert Nacharbeit vor der Prüfung.',
 brancheGenitiv: 'Metallbau',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Metallbaubetriebe benötigen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Werkstatt und Baustelle. Betriebsanweisungen nach TRGS 555 decken Schweißen, Entfetten und Lackieren ab. Umfüllen lösender Hilfsstoffe löst TRGS 201 aus. Excel-Listen brechen bei wechselnden Bauobjekten schnell ein. Gefahrstoff-QR bündelt SDB, Entwürfe und Verzeichnis-Export für die SiFa.',
 typicalProducts: [
 {
 product: 'Schutzgas Argon/CO₂-Gemisch',
 gebinde: 'Gasflasche, Bund',
 hazardKind: 'druckgasförmig, erstickend',
 workplaceDuty: 'Verzeichniseintrag inkl. Mengenschätzung, Betriebsanweisung Schweißen',
 },
 {
 product: 'Schweißrauch (Prozess)',
 gebinde: 'kein Gebinde, Prozess',
 hazardKind: 'einatembare Partikel',
 workplaceDuty: 'Gefährdungsbeurteilung, Eintrag im Kataster als Arbeitsstoff',
 },
 {
 product: 'Kaltentfetter',
 gebinde: 'Kanister, Spraydose',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Lagerort im Verzeichnis, BA am Entfettplatz verfügbar machen',
 },
 {
 product: 'Zinkstaubgrundierung',
 gebinde: 'Eimer, Spray',
 hazardKind: 'reizend, umweltgefährdend',
 workplaceDuty: 'SDB-Version archivieren, Unterweisung für Sprüher',
 },
 {
 product: 'Korrosionsschutzmittel',
 gebinde: 'Kanister 20 Liter',
 hazardKind: 'entzündbar oder reizend',
 workplaceDuty: 'Umfüllen kennzeichnen, Betriebsanweisung an Montagekiste',
 },
 {
 product: 'Schneid- und Kühlöl',
 gebinde: 'Kanister, Zapfstelle',
 hazardKind: 'reizend, umweltgefährdend',
 workplaceDuty: 'Mengenangabe im Verzeichnis, Wartungshinweis in der BA',
 },
 ],
 inspectionDeficiencies: [
 'Das Verzeichnis unterscheidet nicht zwischen Werkstattlager und temporären Baustellen-Gebinden.',
 'Betriebsanweisungen zum Schweißen fehlen oder nennen nicht das konkret verwendete Schutzgas.',
 'Umfüllte Lösemittelbehälter auf der Montage sind weder im Verzeichnis noch nach TRGS 201 gekennzeichnet.',
 ],
 berufsgenossenschaft: 'BGHM',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Technisches Büro tippt Spalten am Desktop ab',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Edding-Beschriftung auf Baustellenkanistern',
 gqrWorkflow: 'Druckbares Etikett mit QR zur BA am Montageort',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Sammelordner in der Verwaltung',
 gqrWorkflow: 'QR am Regal in der Halle oder an der Bauauftragsbox',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Unterschiedliche Excel-Dateien je Objekt zusammensuchen',
 gqrWorkflow: 'Ein Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Muss Schweißrauch ins Gefahrstoffverzeichnis?',
 answer:
 'Als Exposition aus dem Prozess ja, über die Gefährdungsbeurteilung und Bezug zum Arbeitsstoffeintrag. Es geht nicht um ein Gebinde, sondern um die Tätigkeit mit Schutzgas und Elektrode. Die TRGS 555 verlangt eine Betriebsanweisung für Schweißarbeiten. Das Verzeichnis nach § 6 GefStoffV listet die eingesetzten Stoffe und Zubereitungen.',
 },
 {
 question: 'Wie erfasse ich Gefahrstoffe auf wechselnden Baustellen?',
 answer:
 'Temporäre Gebinde gehören ins Verzeichnis mit Standort oder Bauauftrag. Excel-Listen pro Objekt veralten schnell. Digitale Erfassung mit Mobilzugriff erleichtert die Pflege vor Ort. Betriebsanweisungen müssen zum Einsatzort passen. Die SiFa prüft vor Freigabe. Der Export für die BG sollte alle aktiven Standorte abdecken.',
 },
 {
 question: 'Was gilt für Umfüllen von Entfetter in Handpumpkanister?',
 answer:
 'Umfüllen ist Kennzeichnungspflicht nach TRGS 201. Das Gebinde braucht Stoff- und Gefahrenhinweise aus dem SDB. Es muss im Gefahrstoffverzeichnis stehen. Eine Betriebsanweisung nach TRGS 555 beschreibt den Umgang an der Werkbank. Gefahrstoff-QR liefert Entwürfe zur Vorprüfung durch SiFa oder Arbeitgeber.',
 },
 ],
 },
 },
 landwirtschaft: {
 slug: 'landwirtschaft',
 label: 'Landwirtschaft',
 title: 'Gefahrstoffmanagement in der Landwirtschaft: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Landwirtschaft & Hoflager',
 metaDescription:
 'Gefahrstoffverzeichnis Landwirtschaft: Pflanzenschutz, Diesel, Reiniger — § 6 GefStoffV, TRGS 555 und TRGS 201 für Hoflager in Gefahrstoff-QR.',
 heroText:
 'Pflanzenschutzmittel, Treibstoff, Reiniger und Wartungsöle liegen auf Hof, in der Werkstatt und am Gerät. Das Verzeichnis muss zur Saisonarbeit passen.',
 typischeStoffe: [
 'Pflanzenschutzmittel (zugelassene Mittel)',
 'Diesel und Schmierstoffe',
 'Reiniger für Melktechnik und Ställe',
 'Gärzusätze und Desinfektion',
 'Gasflaschen Propan für Trocknung',
 ],
 spezifischerVorteil:
 'Saisonspitzen erzeugen kurzfristig viele Gebinde. Digitales Verzeichnis mit SDB-Anbindung hilft, Betriebsanweisungen für Spritzen und Hoflager vor der SVLFG-Begehung aktuell zu halten.',
 handwerkAbsatz:
 'Landwirtschaftliche Betriebe lagern oft in Schuppen ohne festen Büroplatz. Wenn Pflanzenschutz- und Tanklager nicht mit Unterweisung und Verzeichnis verknüpft sind, fehlen Nachweise. KI-gestützte TRGS-555-Entwürfe verkürzen die Pflege zwischen Aussaat und Ernte.',
 brancheGenitiv: 'Landwirtschaftsbetrieb',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Landwirtschaftliche Betriebe führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Hoflager, Werkstatt und mobile Gebinde. Betriebsanweisungen nach TRGS 555 gelten für Pflanzenschutz, Treibstoff und Reiniger. Umfüllen in Kleingebinde erfordert TRGS 201. Ordnerlisten scheitern in der Saison. Gefahrstoff-QR verknüpft SDB, Entwürfe und Unterweisung direkt am Hof.',
 typicalProducts: [
 {
 product: 'Pflanzenschutzmittel (Spritzmittel)',
 gebinde: 'Kanister 5–20 Liter',
 hazardKind: 'reizend, gewässergefährdend',
 workplaceDuty: 'Verzeichnis, BA für Spritzung, Unterweisung vor Saisonstart',
 },
 {
 product: 'Diesel',
 gebinde: 'Tankanlage, Kanister',
 hazardKind: 'entzündbar, umweltgefährdend',
 workplaceDuty: 'Mengenangabe, Betriebsanweisung Tankstelle am Hof',
 },
 {
 product: 'Milchreiniger (Säure/Desinfektion)',
 gebinde: 'Kanister, Zapfstelle',
 hazardKind: 'ätzend',
 workplaceDuty: 'Eintrag Melkstand, BA am Reinigungsplatz',
 },
 {
 product: 'Propan für Trocknung',
 gebinde: 'Gasflasche',
 hazardKind: 'entzündbares Gas',
 workplaceDuty: 'Verzeichnis, BA für Heizgerät, Prüfnachweis dokumentieren',
 },
 {
 product: 'Hydrauliköl Traktor',
 gebinde: 'Kanister, Servicefass',
 hazardKind: 'umweltgefährdend, reizend',
 workplaceDuty: 'Werkstatt-Eintrag, Unterweisung Wartung',
 },
 {
 product: 'Urea-Lösung (AdBlue)',
 gebinde: 'Kanister, Tank',
 hazardKind: 'reizend',
 workplaceDuty: 'Verzeichnis führen, BA bei manuellen Umfüllvorgängen',
 },
 ],
 inspectionDeficiencies: [
 'Pflanzenschutzmittel im Schuppen sind nicht vollständig im Gefahrstoffverzeichnis erfasst.',
 'Betriebsanweisungen zur Feldspritzung sind veraltet oder ohne Bezug zum aktuellen SDB.',
 'Kanister mit umgefüllten Reinigern oder Ölen sind weder gekennzeichnet noch im Verzeichnis.',
 ],
 berufsgenossenschaft: 'SVLFG',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Landwirt oder Lohnbüro trägt Stoffe saisonweise nach',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Kanister in der Werkstatt',
 gqrWorkflow: 'Etikett mit QR-Zugriff auf BA und SDB am Gebinde',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Wohnung oder beim Steuerberater',
 gqrWorkflow: 'QR am Schuppenregal oder an der Spritze',
 },
 {
 topic: 'Nachweis bei Begehung',
 excelWorkflow: 'Zettelwirtschaft aus mehreren Saisons',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Archivstand',
 },
 ],
 faqItems: [
 {
 question: 'Gilt Pflanzenschutz immer als Gefahrstoff im Verzeichnis?',
 answer:
 'Zugelassene Pflanzenschutzmittel sind Gefahrstoffe nach GefStoffV, wenn sie eingesetzt oder gelagert werden. Sie gehören ins Verzeichnis nach § 6 GefStoffV mit Mengen- und Lagerortangabe. Zusätzlich gelten Pflanzenschutzrecht und Fachkundenachweis. Betriebsanweisungen nach TRGS 555 ergänzen die spezifische Spritzanweisung des Herstellers im SDB.',
 },
 {
 question: 'Wie dokumentiere ich Diesel am Hof?',
 answer:
 'Diesel ist ein entzündbarer, umweltgefährdender Stoff. Tankanlage und Kanister gehören ins Gefahrstoffverzeichnis nach § 6 GefStoffV. Eine Betriebsanweisung beschreibt Betankung und Leckageverhalten am Hof. Umfüllen in Kanister löst TRGS 201 aus. Gefahrstoff-QR unterstützt Entwürfe aus dem SDB zur Vorprüfung durch SiFa oder Betriebsleitung.',
 },
 {
 question: 'Wer prüft Gefahrstoffe auf landwirtschaftlichen Höfen?',
 answer:
 'Die Sozialversicherung für Landwirtschaft, Forsten und Gartenbau (SVLFG) begutachtet Arbeitsmittel und Chemikalien im Betrieb. Gewerbeaufsicht kann ergänzend prüfen. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen sind Kernpunkte. Digitale Exporte erleichtern die Vorbereitung auf SVLFG-Begehungen und Dokumentationsnachweise vor Ort.',
 },
 ],
 },
 },
 zahnarztpraxis: {
 slug: 'zahnarztpraxis',
 label: 'Zahnarztpraxis',
 title: 'Gefahrstoffmanagement in der Zahnarztpraxis: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Zahnarztpraxis & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Zahnarztpraxis: Desinfektion, Säure, Amalgam — § 6 GefStoffV, TRGS 555 und TRGS 201 für Praxislager in Gefahrstoff-QR.',
 heroText:
 'Ätzende Säuren, Desinfektionslösungen und Abformmaterial wechseln mit Herstellerprodukten. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen zur Nutzung an Behandlungsstuhl und Steri passen.',
 typischeStoffe: [
 'Desinfektionsmittel für Flächen und Instrumente',
 'Ätzsäuren und Prophylaxepasten',
 'Abformsilikone und Kunststoffmonomer',
 'Röntgentwickler und Fixierlösungen',
 'Reiniger für Sauger und Leitungen',
 ],
 spezifischerVorteil:
 'Wechsel der Produktlinien oder neuer Biostoffe erfordert schnelle Anpassung von Verzeichnis und Betriebsanweisungen. Digitale SDB-Pflege hält Steri, Labor und Lager konsistent für die BGW-Begehung.',
 handwerkAbsatz:
 'Praxen sind klein, aber die Stoffvielfalt ist groß. Wenn Sprühflaschen und Kanister ohne Bezug zum Verzeichnis stehen, fehlen Nachweise bei Unterweisung und Begehung. KI-gestützte TRGS-555-Entwürfe unterstützen die Vorprüfung durch die SiFa oder Praxisleitung vor der Freigabe.',
 brancheGenitiv: 'Zahnarztpraxis',
 blogPostHref: '/wissen/gefahrstoffverzeichnis-arztpraxis-muster/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'In der Zahnarztpraxis gilt das Gefahrstoffverzeichnis nach § 6 GefStoffV für alle eingesetzten und gelagerten Produkte. Betriebsanweisungen nach TRGS 555 werden für Desinfektion, Säure und Materialien am Behandlungsstuhl bereitgestellt. Umfüllen in Applikationsflaschen erfordert Kennzeichnung nach TRGS 201. Excel-Listen veralten bei jeder Produktumstellung. Gefahrstoff-QR bündelt SDB, Entwürfe und Unterweisung für die Praxis.',
 typicalProducts: [
 {
 product: 'Alkoholische Flächendesinfektion',
 gebinde: 'Kanister 5 Liter, Spendeflasche',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Verzeichniseintrag, Betriebsanweisung Steri, Unterweisung Team',
 },
 {
 product: 'Phosphorsäure-Ätzgel (Prophylaxe)',
 gebinde: 'Spritze, Tiegel',
 hazardKind: 'ätzend',
 workplaceDuty: 'BA am Stuhl, Unterweisung vor Einsatz',
 },
 {
 product: 'Abformmittel (Silikon)',
 gebinde: 'Kartusche, Karton',
 hazardKind: 'sensibilisierend',
 workplaceDuty: 'SDB archivieren, Verzeichnis führen, Unterweisung Labor',
 },
 {
 product: 'Amalgammüll- / Abscheiderreiniger',
 gebinde: 'Flasche 1 Liter',
 hazardKind: 'reizend, umweltgefährdend',
 workplaceDuty: 'Eintrag Technikraum, BA für Einleitung und Wartung',
 },
 {
 product: 'Natriumhypochlorit-Lösung (Bleaching-Hilfsstoff)',
 gebinde: 'Flasche, Ampulle',
 hazardKind: 'ätzend, oxidierend',
 workplaceDuty: 'Verzeichnis, BA mit Freigabe SiFa, Dokumentation Unterweisung',
 },
 {
 product: 'Handdesinfektion (WHO-kompatible Rezeptur)',
 gebinde: 'Spender, Kanister',
 hazardKind: 'entzündbar',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Verzeichnis aktualisieren',
 },
 ],
 inspectionDeficiencies: [
 'Desinfektions- und Reinigungsmittel fehlen vollständig im Gefahrstoffverzeichnis, obwohl sie täglich genutzt werden.',
 'Betriebsanweisungen am Behandlungsstuhl sind veraltet oder ohne Bezug zum aktuellen Sicherheitsdatenblatt.',
 'Beschriftete Applikationsflaschen in Steri und Labor sind weder im Verzeichnis noch nach TRGS 201 dokumentiert.',
 ],
 berufsgenossenschaft: 'BGW',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Praxismanager tippt Stoffe in Excel am Büro-PC ab',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Sprüh- und Spendeflaschen',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA und SDB am Spender',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Anmeldung oder im Archiv',
 gqrWorkflow: 'QR am Sterischank oder an der Mischstation',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Verstreute SDB-PDFs und Listen verschiedener Jahrgänge',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Braucht eine Zwei-Stuhl-Praxis ein Gefahrstoffverzeichnis?',
 answer:
 'Ja, sobald Gefahrstoffe eingesetzt oder gelagert werden. § 2 GefStoffV umfasst auch Desinfektionsmittel und ätzende Produkte in der Zahnmedizin. Das Verzeichnis nach § 6 GefStoffV muss alle Gebinde und Standorte abbilden. Auch kleine Praxen nutzen Säuren, Desinfektion und Abformmaterial. Excel funktioniert nur bei regelmäßiger Pflege durch SiFa oder Praxisleitung.',
 },
 {
 question: 'Wie dokumentiere ich Umfüllen von Desinfektion in Sprühflaschen?',
 answer:
 'Umfüllen löst Kennzeichnungspflicht nach TRGS 201 aus. Das Gebinde braucht Stoff- und Gefahrenhinweise aus dem SDB. Parallel gehört es ins Gefahrstoffverzeichnis nach § 6 GefStoffV. Eine Betriebsanweisung nach TRGS 555 beschreibt den Umgang am Behandlungsstuhl. Gefahrstoff-QR liefert Entwürfe zur Vorprüfung durch SiFa oder Arbeitgeber vor der Unterweisung.',
 },
 {
 question: 'Wie oft aktualisiere ich Betriebsanweisungen in der Zahnarztpraxis?',
 answer:
 'Bei jedem Wechsel des Sicherheitsdatenblatts, der Konzentration oder des Einsatzorts. Hersteller tauschen Rezepturen ohne viel Vorlauf. TRGS-555-Entwürfe aus dem PDF erleichtern die Pflege. Die SiFa oder Praxisleitung prüft vor Freigabe und Unterweisung. Der Nachweis nach § 14 GefStoffV gehört zur Unterweisungsdokumentation im Team.',
 },
 ],
 },
 },
 elektrobetrieb: {
 slug: 'elektrobetrieb',
 label: 'Elektrobetrieb',
 title: 'Gefahrstoffmanagement im Elektrobetrieb: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Elektrobetrieb & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Elektrobetrieb: Lotpasten, Lösemittel, Reiniger — § 6 GefStoffV, TRGS 555 und TRGS 201 für Baustelle in Gefahrstoff-QR.',
 heroText:
 'Lötwaren, Kontaktreiniger, Klebstoffe und Schutzlacke liegen auf der Baustelle, im Transporter und in der Werkstatt. Ihr Verzeichnis muss zu wechselnden Aufträgen passen.',
 typischeStoffe: [
 'Kontaktreiniger und Lösungsmittel-Spray',
 'Löt- und Flussmittel',
 'Kabelvergussharze und Dichtmassen',
 'Korrosionsschutzlacke',
 'Montage- und Schmiersprays',
 ],
 spezifischerVorteil:
 'Temporäre Gebinde auf Baustellen erzeugen Pflegeaufwand. Ein digitales Verzeichnis mit SDB-Historie hilft, Betriebsanweisungen je Einsatzort freizugeben und Umfüll-Kennzeichnung nach TRGS 201 nachzuhalten.',
 handwerkAbsatz:
 'Elektrobetriebe arbeiten dezentral. Wenn Kanister im Transporter nicht zum Verzeichnis passen oder SDB-Updates nicht nachgezogen werden, entstehen Lücken bei der BG ETEM. Strukturierte Erfassung mit mobilen Zugriffen reduziert Nacharbeit vor der Prüfung.',
 brancheGenitiv: 'Elektrobetrieb',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Elektrobetriebe führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Werkstatt, Lager und Baustellenfahrzeug. Betriebsanweisungen nach TRGS 555 gelten für Löten, Reinigen und Vergießen. Umfüllen von Lösemitteln in Handflaschen erfordert Kennzeichnung nach TRGS 201. Excel-Listen pro Objekt veralten schnell. Gefahrstoff-QR verknüpft SDB, Entwürfe und Export für die SiFa vor der BG ETEM-Begehung.',
 typicalProducts: [
 {
 product: 'Isopropanolhaltiger Kontaktreiniger',
 gebinde: 'Spraydose, Flasche 1 Liter',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Verzeichnis, BA am Schaltschrank, Unterweisung Monteur',
 },
 {
 product: 'Lötpaste (bleifrei)',
 gebinde: 'Tube, Dose',
 hazardKind: 'reizend',
 workplaceDuty: 'SDB archivieren, Betriebsanweisung Löten, Unterweisung',
 },
 {
 product: 'Kabelvergussharz (2K)',
 gebinde: 'Kartusche, Eimer',
 hazardKind: 'sensibilisierend, reizend',
 workplaceDuty: 'Eintrag Baustelle, BA für Mischung und Aushärtung',
 },
 {
 product: 'Montagespray (Trennen/Schmieren)',
 gebinde: 'Spraydose',
 hazardKind: 'entzündbar',
 workplaceDuty: 'Lagerort dokumentieren, BA im Transporter verfügbar',
 },
 {
 product: 'Schutzlack für Leiterplatten',
 gebinde: 'Spraydose, Flasche',
 hazardKind: 'entzündbar, sensibilisierend',
 workplaceDuty: 'Verzeichnis, Unterweisung vor Sprüharbeiten',
 },
 {
 product: 'Flussmittel für Lötwellen',
 gebinde: 'Kanister, Flasche',
 hazardKind: 'ätzend oder reizend',
 workplaceDuty: 'Werkstatteintrag, BA Wartung, Freigabe durch SiFa',
 },
 ],
 inspectionDeficiencies: [
 'Chemikalien im Transporter und auf Baustellen fehlen im Gefahrstoffverzeichnis oder sind ohne Standortangabe erfasst.',
 'Betriebsanweisungen für Löten und Kontaktreiniger sind veraltet oder ohne Bezug zum aktuellen SDB.',
 'Umgefüllte Reinigungsflaschen im Schaltschrank sind nicht nach TRGS 201 gekennzeichnet oder nicht im Verzeichnis.',
 ],
 berufsgenossenschaft: 'BG ETEM',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Meister trägt Stoffe nach Auftrag in Excel ein',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unmarkierte Flaschen im Transporter',
 gqrWorkflow: 'Etikett mit QR-Zugriff auf BA am Gebinde oder Regal',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Zentrale oder beim Polier',
 gqrWorkflow: 'QR im Transporter oder am Schaltschrank',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Listen je Baustelle manuell zusammenstellen',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Gilt das Gefahrstoffverzeichnis auch für Baustellenfahrzeuge?',
 answer:
 'Ja, Gebinde im Transporter gelten als Lagerort nach § 6 GefStoffV. Kontaktreiniger, Lötmittel und Harze gehören mit Menge und Standort ins Verzeichnis. Betriebsanweisungen nach TRGS 555 müssen am Einsatzort verfügbar sein. Umfüllen in Handflaschen löst TRGS 201 aus. Digitale Erfassung erleichtert die Pflege bei wechselnden Aufträgen und Monteurteams.',
 },
 {
 question: 'Wie dokumentiere ich Kontaktreiniger in der Schaltschrankmontage?',
 answer:
 'Der Stoff wird im Verzeichnis mit Gebinde und Einsatzort geführt. Das Sicherheitsdatenblatt wird mit Revisionsstand archiviert. Eine Betriebsanweisung nach TRGS 555 beschreibt Umgang, Lagerung und Unterweisung am Montageplatz. Bei Umfüllen in Sprühflaschen gilt TRGS 201. Gefahrstoff-QR unterstützt Entwürfe zur Vorprüfung durch SiFa oder Betriebsleitung.',
 },
 {
 question: 'Wer prüft Gefahrstoffe im Elektrohandwerk?',
 answer:
 'Die Berufsgenossenschaft Energie Textil Elektro Medienerzeugnisse (BG ETEM) begutachtet chemische Arbeitsstoffe und Dokumentation im Betrieb. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen stehen im Fokus. Die SiFa bereitet Begehungen vor. Digitale Exporte aus Gefahrstoff-QR erleichtern den Nachweis vor Ort.',
 },
 ],
 },
 },
 dachdecker: {
 slug: 'dachdecker',
 label: 'Dachdecker',
 title: 'Gefahrstoffmanagement im Dachdeckerbetrieb: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Dachdecker & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Dachdecker: Bitumen, Kleber, Reiniger — § 6 GefStoffV, TRGS 555 und TRGS 201 für Baustelle in Gefahrstoff-QR.',
 heroText:
 'Bitumenprodukte, Kleber und Reiniger liegen auf dem Dach, im Transporter und in der Halle. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen zu Saison und Wechselbaustellen passen.',
 typischeStoffe: [
 'Bitumen- und Polymerdickenanstriche',
 'Kalt- und Heißvergussmassen',
 'Klebstoffe für Abdichtungsbahnen',
 'Entfetter und Reiniger für Dächer',
 'Lösemittelhaltige Grundierungen',
 ],
 spezifischerVorteil:
 'Wechselnde Bauobjekte erzeugen viele Hilfsstoffe in Kleinmengen. Digitales Verzeichnis mit SDB-Bezug hilft, Betriebsanweisungen je Dachauftrag bereitzustellen und Umfüllen nach TRGS 201 nachzuverfolgen.',
 handwerkAbsatz:
 'Dachdecker arbeiten hoch und mobil. Wenn Kanister auf dem Dachgerüst nicht im Verzeichnis stehen oder SDB-Updates fehlen, wird die BG BAU-Begehung kritisch. KI-gestützte TRGS-555-Entwürfe verkürzen die Pflege zwischen Projekten.',
 brancheGenitiv: 'Dachdeckerbetrieb',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Dachdeckerbetriebe benötigen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Halle, Transporter und Dachbaustelle. Betriebsanweisungen nach TRGS 555 betreffen Bitumen, Kleber und Reiniger. Umfüllen in Handeimern oder Sprühflaschen löst TRGS 201 aus. Excel-Listen je Objekt scheitern in der Saison. Gefahrstoff-QR verbindet SDB, Entwürfe und Nachweise für die SiFa vor der BG BAU.',
 typicalProducts: [
 {
 product: 'Bitumen-Dickbeschichtung (Kaltanstrich)',
 gebinde: 'Eimer 20 Liter',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Verzeichnis, BA am Dach, Unterweisung vor Heißarbeit-Nähe',
 },
 {
 product: 'Dachkleber (Bahnenkleber)',
 gebinde: 'Eimer, Kartusche',
 hazardKind: 'entzündbar, sensibilisierend',
 workplaceDuty: 'Eintrag Baustelle, SDB archivieren, Unterweisung Team',
 },
 {
 product: 'Entfetter für Dachabdichtung',
 gebinde: 'Kanister, Spray',
 hazardKind: 'entzündbar',
 workplaceDuty: 'Lagerort dokumentieren, BA am Gerüst verfügbar machen',
 },
 {
 product: 'Polymer-Grundierung',
 gebinde: 'Eimer 10 Liter',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Menge im Verzeichnis, Unterweisung vor Anstrich',
 },
 {
 product: 'Flüssigkunststoff (2K-Abdichtung)',
 gebinde: 'Eimer, Kartusche',
 hazardKind: 'sensibilisierend',
 workplaceDuty: 'Baustelleneintrag, BA für Mischung, Freigabe SiFa',
 },
 {
 product: 'Reiniger für Bitumenwerkzeuge',
 gebinde: 'Kanister',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Verzeichnis pflegen',
 },
 ],
 inspectionDeficiencies: [
 'Bitumen- und Kleberprodukte auf der Baustelle fehlen im Gefahrstoffverzeichnis oder ohne Bauauftragsbezug.',
 'Betriebsanweisungen für Kleber und Anstriche sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Handeimer und Sprühflaschen auf dem Gerüst sind weder gekennzeichnet noch im Verzeichnis nach TRGS 201 erfasst.',
 ],
 berufsgenossenschaft: 'BG BAU',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Polier pflegt Stoffe je Dach in separater Excel-Datei',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Eimer auf dem Gerüst',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA an der Bauauftragsbox',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Bauramme oder Zentrale',
 gqrWorkflow: 'QR am Transporterregal oder am Gerüstcontainer',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Listen aus mehreren Baustellen manuell zusammenführen',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Muss Bitumen im Gefahrstoffverzeichnis stehen?',
 answer:
 'Ja, wenn Bitumenprodukte eingesetzt oder gelagert werden und als Gefahrstoff eingestuft sind. Sie gehören nach § 6 GefStoffV mit Menge und Lagerort ins Verzeichnis. Eine Betriebsanweisung nach TRGS 555 beschreibt Umgang auf dem Dach und in der Halle. Umfüllen in kleinere Gebinde löst TRGS 201 aus. Die SiFa prüft Entwürfe vor Freigabe.',
 },
 {
 question: 'Wie erfasse ich Hilfsstoffe auf wechselnden Dächern?',
 answer:
 'Temporäre Gebinde werden dem Bauauftrag oder Standort im Verzeichnis zugeordnet. Excel pro Objekt veralten schnell nach Projektende. Digitale Erfassung mit mobilen Zugriffen erleichtert Pflege auf der Baustelle. Betriebsanweisungen müssen am Einsatzort verfügbar sein. Unterweisungen nach § 14 GefStoffV werden dokumentiert.',
 },
 {
 question: 'Welche BG ist für Dachdeckerbetriebe zuständig?',
 answer:
 'Die Berufsgenossenschaft der Bauwirtschaft (BG BAU) prüft Gefahrstoffdokumentation auf Baustellen und in der Werkstatt. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen gehören zum Standardprogramm. Die SiFa bereitet Begehungen vor. Exporte aus Gefahrstoff-QR unterstützen den Nachweis ohne Papierstapel.',
 },
 ],
 },
 },
 tankstelle: {
 slug: 'tankstelle',
 label: 'Tankstelle',
 title: 'Gefahrstoffmanagement an der Tankstelle: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Tankstelle & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Tankstelle: Shop-Reiniger, Frostschutz, Batterien — § 6 GefStoffV, TRGS 555 und TRGS 201 in Gefahrstoff-QR.',
 heroText:
 'Kraftstoff, Frostschutz und Waschchemie stehen neben Shop-Reinigern und Werkstattstoffen im Umlauf. Verzeichnis, Betriebsanweisungen und Umfüll-Kennzeichnung müssen zwischen Schicht, Shop und Service passen.',
 typischeStoffe: [
 'Betriebsmittel für Werkstattkunden (Frostschutz, Öl)',
 'Reiniger für Shop, Toilette und Waschhalle',
 'Batterien und Säuren im Wartungssortiment',
 'Enteiser und Winterhilfsstoffe im Shop',
 'Altöle und kleine Gebinde im Lager',
 ],
 spezifischerVorteil:
 'Wechseldienst und Franchise-Lieferanten erzeugen viele SDB-Updates. Ein digitales Verzeichnis mit Historie hilft, Betriebsanweisungen und Umfüll-Kennzeichnung nach TRGS 201 für Shop und Werkstatt parallel zu pflegen.',
 handwerkAbsatz:
 'An Tankstellen überlagern sich Lager, Kundenbereich und gelegentliche Werkstatttätigkeiten. Wenn Sprühflaschen im Shop nicht im Verzeichnis stehen oder SDB-Wechsel nicht nachgezogen werden, wird die BG-Verkehr-Begehung anstrengend. Digitale Pflege bindet Standorte, Gebinde und Unterweisung zusammen.',
 brancheGenitiv: 'Tankstelle',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Der Betreiber führt an der Tankstelle ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Shop, Waschanlage und Werkstatthilfsstoffe. Betriebsanweisungen nach TRGS 555 gelten für Reiniger, Frostschutz und Batterie-Service. Umfüllen in Handgebinden löst Kennzeichnung nach TRGS 201 aus. Excel-Listen mit Schichtwechsel veralten schnell. Gefahrstoff-QR verbindet SDB, TRGS-555-Entwürfe und Export für SiFa und BG Verkehr.',
 typicalProducts: [
 {
 product: 'Scheibenreiniger-Konzentrat',
 gebinde: 'Kanister 5 Liter, Sprühflasche',
 hazardKind: 'reizend',
 workplaceDuty: 'Verzeichnis, Betriebsanweisung Shop, Unterweisung vor Umfüllen',
 },
 {
 product: 'AdBlue / Harnstofflösung',
 gebinde: 'Kanister, IBC',
 hazardKind: 'reizend',
 workplaceDuty: 'SDB archivieren, Eintrag Lager, Unterweisung Tankstellenpersonal',
 },
 {
 product: 'Motoröl für Kundenverkauf',
 gebinde: 'Flasche 1 Liter, Fass',
 hazardKind: 'reizend, umweltgefährdend',
 workplaceDuty: 'Menge im Verzeichnis, BA im Shopbereich verfügbar',
 },
 {
 product: 'Batteriesäure (Wartung)',
 gebinde: 'Flasche 1 Liter',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Werkstatteintrag, BA, Freigabe durch SiFa',
 },
 {
 product: 'Universalreiniger Waschhalle',
 gebinde: 'Kanister, Eimer',
 hazardKind: 'reizend, alkalisch',
 workplaceDuty: 'Lagerort dokumentieren, Unterweisung Waschpersonal',
 },
 {
 product: 'Handdesinfektion Shop-Kasse',
 gebinde: 'Spender, Flasche',
 hazardKind: 'entzündbar oder reizend',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Verzeichnis pflegen',
 },
 ],
 inspectionDeficiencies: [
 'Reiniger und Hilfsstoffe im Shop fehlen im Gefahrstoffverzeichnis, obwohl sie täglich genutzt werden.',
 'Betriebsanweisungen für Waschhalle und Werkstatt sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Umgefüllte Sprühflaschen in Shop und Technikraum sind nicht nach TRGS 201 gekennzeichnet oder nicht im Verzeichnis.',
 ],
 berufsgenossenschaft: 'BG Verkehr',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Schichtleiter tippt Stoffe in Excel am Büro-PC ab',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Flaschen hinter der Theke',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Regal oder Spender',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner im Büro der Tankstelle',
 gqrWorkflow: 'QR im Technikraum, Shop oder an der Waschanlage',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Listen und SDBs verschiedener Jahrgänge sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Braucht eine Tankstelle ohne eigene Werkstatt ein Gefahrstoffverzeichnis?',
 answer:
 'Ja, sobald Gefahrstoffe gelagert oder eingesetzt werden. Shop-Reiniger, Frostschutz für Kunden und Hilfsstoffe in der Waschhalle gelten nach § 2 GefStoffV. Das Verzeichnis nach § 6 GefStoffV muss Gebinde und Bereiche abbilden. Auch kleine Standorte nutzen mehrere Produktlinien. Excel funktioniert nur bei regelmäßiger Pflege durch Leitung oder SiFa.',
 },
 {
 question: 'Wie erfasse ich Umfüllen von Scheibenreiniger im Shop?',
 answer:
 'Umfüllen löst Kennzeichnung nach TRGS 201 aus. Das Gebinde braucht Stoff- und Gefahrenhinweise aus dem SDB. Parallel gehört es ins Gefahrstoffverzeichnis nach § 6 GefStoffV. Eine Betriebsanweisung nach TRGS 555 beschreibt den Umgang am Einsatzort. Gefahrstoff-QR liefert Entwürfe zur Vorprüfung durch SiFa oder Betriebsleitung vor der Unterweisung.',
 },
 {
 question: 'Welche BG prüft Gefahrstoffe an Tankstellen?',
 answer:
 'Die Berufsgenossenschaft Verkehrswirtschaft Post-Logistik Telekommunikation (BG Verkehr) begutachtet chemische Arbeitsstoffe und Dokumentation am Standort. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen stehen im Fokus. Die SiFa bereitet Begehungen vor. Digitale Exporte aus Gefahrstoff-QR erleichtern den Nachweis bei wechselndem Personal.',
 },
 ],
 },
 },
 druckerei: {
 slug: 'druckerei',
 label: 'Druckerei',
 title: 'Gefahrstoffmanagement in der Druckerei: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Druckerei & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Druckerei: Farben, Waschmittel, Lösemittel — § 6 GefStoffV, TRGS 555 und TRGS 201 für Druckerei in Gefahrstoff-QR.',
 heroText:
 'Farben, Waschlösungen und Reiniger wechseln mit Maschine und Auftrag. Verzeichnis, Betriebsanweisungen und Umfüll-Kennzeichnung müssen Offset, Digital und Reinigung abdecken.',
 typischeStoffe: [
 'Offsetfarben und Reinigungsmittel',
 'Wasch- und Spüllösungen für Druckplatten',
 'Lösemittel und Verdünner',
 'Reinigungschemie für Rasterwalzen',
 'Heißkleber und Klebewege in der Weiterverarbeitung',
 ],
 spezifischerVorteil:
 'Jeder Maschinenpark nutzt andere chemische Linien. Ein digitales Verzeichnis mit SDB-Historie hilft, Betriebsanweisungen je Arbeitsplatz freizugeben und Umfüllen nach TRGS 201 nachzuhalten.',
 handwerkAbsatz:
 'Druckereien arbeiten in Schicht und mit wechselnden Hilfsstoffen. Wenn Bechergläser mit Waschlösung nicht im Verzeichnis stehen oder SDB-Updates fehlen, wird die BG-Begehung kritisch. KI-gestützte TRGS-555-Entwürfe unterstützen die Vorprüfung durch SiFa vor der Unterweisung.',
 brancheGenitiv: 'Druckerei',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Druckereien führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Farblager, Maschinen und Waschbereich. Betriebsanweisungen nach TRGS 555 gelten für Farben, Lösemittel und Plattenreinigung. Umfüllen in Messbechern oder Sprühflaschen erfordert Kennzeichnung nach TRGS 201. Excel-Listen pro Schicht veralten bei Lieferantenwechsel. Gefahrstoff-QR bündelt SDB, Entwürfe und Nachweis für die SiFa vor der BG ETEM.',
 typicalProducts: [
 {
 product: 'Offsetfarbe (Prozess)',
 gebinde: 'Gebinde 1–5 kg',
 hazardKind: 'reizend, sensibilisierend',
 workplaceDuty: 'Verzeichnis, Betriebsanweisung Maschine, Unterweisung Drucker',
 },
 {
 product: 'Waschlösung Druckplatten',
 gebinde: 'Kanister, Becherglas',
 hazardKind: 'reizend, alkalisch',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, SDB archivieren',
 },
 {
 product: 'Lackverdünner / Wash',
 gebinde: 'Kanister 10 Liter',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Lagerort dokumentieren, BA am Waschwerk verfügbar',
 },
 {
 product: 'Reiniger Rasterwalzen',
 gebinde: 'Spraydose, Flasche',
 hazardKind: 'entzündbar',
 workplaceDuty: 'Eintrag Drucksaal, Unterweisung vor Reinigung',
 },
 {
 product: 'Heißkleber Buchbinderei',
 gebinde: 'Granulat, Patrone',
 hazardKind: 'reizend, verbrennungsgefahr beim Schmelzen',
 workplaceDuty: 'Verzeichnis, BA an der Schmelze, Freigabe SiFa',
 },
 {
 product: 'Isopropanolhaltiger Kontaktfilmreiniger',
 gebinde: 'Flasche 1 Liter',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Gebinde im Verzeichnis, Unterweisung Vorstufe',
 },
 ],
 inspectionDeficiencies: [
 'Wasch- und Hilfsmittel an Maschinen fehlen im Gefahrstoffverzeichnis oder ohne Maschinenbezug.',
 'Betriebsanweisungen für Farbwechsel und Reinigung sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Messbecher und Sprühflaschen mit Waschlösung sind weder nach TRGS 201 gekennzeichnet noch im Verzeichnis.',
 ],
 berufsgenossenschaft: 'BG ETEM',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Druckvorarbeiter trägt Stoffe in Excel pro Auftrag ein',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Becher an der Maschine',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Farblager',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Produktionsleitung',
 gqrWorkflow: 'QR am Farbschrank oder an der Waschstation',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'SDB-PDFs und Listen aus mehreren Jahren sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Gehören Druckfarben ins Gefahrstoffverzeichnis?',
 answer:
 'Ja, wenn sie als Gefahrstoff eingestuft sind und im Betrieb vorkommen. Offset- und Digitalfarben werden nach § 6 GefStoffV mit Gebinde, Bereich und SDB-Bezug geführt. Betriebsanweisungen nach TRGS 555 werden für Mischen, Reinigen und Waschvorgänge bereitgestellt. Auch Kühl- und Waschlösungen gehören dazu. Die SiFa prüft Entwürfe vor Freigabe.',
 },
 {
 question: 'Wie dokumentiere ich Waschlösung in Messbechern an der Maschine?',
 answer:
 'Umfüllen löst Kennzeichnung nach TRGS 201 aus. Becher brauchen Stoff- und Gefahrenhinweise aus dem SDB. Parallel gehört das Gebinde ins Gefahrstoffverzeichnis nach § 6 GefStoffV. Eine Betriebsanweisung nach TRGS 555 beschreibt den Umgang am Druckwerk. Gefahrstoff-QR unterstützt Entwürfe zur Vorprüfung durch SiFa oder Produktionsleitung.',
 },
 {
 question: 'Wer prüft Gefahrstoffe in Druckereien?',
 answer:
 'Die Berufsgenossenschaft Energie Textil Elektro Medienerzeugnisse (BG ETEM) begutachtet chemische Arbeitsstoffe und Dokumentation im Betrieb. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen gehören zum Standardprogramm. Die SiFa bereitet Begehungen vor. Exporte aus Gefahrstoff-QR erleichtern den Nachweis im Schichtbetrieb.',
 },
 ],
 },
 },
 baeckerei: {
 slug: 'baeckerei',
 label: 'Bäckerei',
 title: 'Gefahrstoffmanagement in der Bäckerei: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Bäckerei & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Bäckerei: Reiniger, Fettlöser, Kühlanlagen — § 6 GefStoffV, TRGS 555 und TRGS 201 für Backstube in Gefahrstoff-QR.',
 heroText:
 'Spül- und Reinigungsmittel, Fettlöser und Frostschutz der Kälteanlage stehen neben Pflegemitteln in Verkauf und Küche. Verzeichnis und Betriebsanweisungen müssen Backstube und Filialen abdecken.',
 typischeStoffe: [
 'Alkalische Spül- und Geschirrfettlöser',
 'Säurehaltige Rohr- und Kalkreiniger',
 'Reiniger für Dämpfer und Backöfen',
 'Kältemittel in Kühltechnik (Service)',
 'Desinfektions- und Flächenreiniger im Verkauf',
 ],
 spezifischerVorteil:
 'Filialen und Zentralküche nutzen unterschiedliche Lieferanten. Ein digitales Verzeichnis hilft, Betriebsanweisungen je Standort freizugeben und Umfüll-Kennzeichnung nach TRGS 201 für Spülstation und Küche nachzuhalten.',
 handwerkAbsatz:
 'In der Bäckerei überlagern sich tägliche Reinigung, Kühlanlagen-Service und wechselnde Pflegeprodukte. Wenn Sprühflaschen in der Backstube nicht im Verzeichnis stehen, wird die BGN-Begehung kritisch. Strukturierte Erfassung mit SDB-Bezug reduziert Nacharbeit vor der Prüfung.',
 brancheGenitiv: 'Bäckerei',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Bäckereien führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Backstube, Küche und Lager. Betriebsanweisungen nach TRGS 555 gelten für Reiniger, Fettlöser und Kühlanlagenhilfsstoffe. Umfüllen in Spül- oder Sprühflaschen erfordert Kennzeichnung nach TRGS 201. Excel-Listen je Filiale veralten bei Lieferantenwechsel. Gefahrstoff-QR verknüpft SDB, Entwürfe und Export für SiFa und BGN.',
 typicalProducts: [
 {
 product: 'Alkalischer Spülmittel-Fettlöser',
 gebinde: 'Kanister, Dosierflasche',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Verzeichnis, Betriebsanweisung Spülstation, Unterweisung Team',
 },
 {
 product: 'Backofenreiniger',
 gebinde: 'Spraydose, Flasche',
 hazardKind: 'ätzend oder reizend',
 workplaceDuty: 'Eintrag Backstube, BA vor heißer Oberfläche bereitstellen',
 },
 {
 product: 'Rohrreiniger / Entkalker',
 gebinde: 'Flasche 1 Liter',
 hazardKind: 'ätzend',
 workplaceDuty: 'SDB archivieren, Unterweisung vor Einsatz',
 },
 {
 product: 'Frostschutz Kälteanlage',
 gebinde: 'Kanister, Service-Gebinde',
 hazardKind: 'reizend, giftig bei Verschlucken',
 workplaceDuty: 'Technikeintrag, BA, Dokumentation durch Kältetechniker',
 },
 {
 product: 'Flächendesinfektion Verkauf',
 gebinde: 'Sprühflasche, Spender',
 hazardKind: 'reizend oder entzündbar',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Verzeichnis Filiale',
 },
 {
 product: 'Geschirrspül-Nachfüllkonzentrat',
 gebinde: 'Kanister 10 Liter',
 hazardKind: 'reizend, alkalisch',
 workplaceDuty: 'Lagerort dokumentieren, Unterweisung Küchenpersonal',
 },
 ],
 inspectionDeficiencies: [
 'Reinigungsmittel in Backstube und Spülstation fehlen im Gefahrstoffverzeichnis oder ohne Filialbezug.',
 'Betriebsanweisungen für Ofen- und Rohrreiniger sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Beschriftete Sprühflaschen in Küche und Verkauf sind nicht nach TRGS 201 dokumentiert oder nicht im Verzeichnis.',
 ],
 berufsgenossenschaft: 'BGN',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Filialleitung tippt Reiniger in Excel ab',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unmarkierte Flaschen an der Spülmaschine',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Lagerregal',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Zentrale oder Büro',
 gqrWorkflow: 'QR an Spülstation, Backofen oder Kühlraum',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Listen und SDBs aus mehreren Filialen sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Braucht eine kleine Bäckerei ein Gefahrstoffverzeichnis?',
 answer:
 'Ja, sobald Gefahrstoffe eingesetzt oder gelagert werden. Spül- und Backofenreiniger sowie Entkalker gelten nach § 2 GefStoffV. Das Verzeichnis nach § 6 GefStoffV muss alle Gebinde und Bereiche abbilden. Auch Filialen mit wenigen Plätzen nutzen alkalische Reiniger. Excel reicht nur, wenn Zentrale oder SiFa es regelmäßig pflegt.',
 },
 {
 question: 'Wie dokumentiere ich Fettlöser an der Spülstation?',
 answer:
 'Der Stoff wird im Verzeichnis mit Gebinde und Standort geführt. Das Sicherheitsdatenblatt wird mit Revisionsstand archiviert. Eine Betriebsanweisung nach TRGS 555 beschreibt Umgang, Dosierung und Unterweisung an der Spülmaschine. Bei Umfüllen in Handflaschen gilt TRGS 201. Gefahrstoff-QR unterstützt Entwürfe zur Vorprüfung durch SiFa oder Filialleitung.',
 },
 {
 question: 'Welche BG ist für Bäckereien zuständig?',
 answer:
 'Die Berufsgenossenschaft Nahrungsmittel und Gastgewerbe (BGN) begutachtet chemische Arbeitsstoffe und Dokumentation in Betrieb und Filialen. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen stehen im Fokus. Die SiFa bereitet Begehungen vor. Digitale Exporte aus Gefahrstoff-QR erleichtern den Nachweis bei mehreren Standorten.',
 },
 ],
 },
 },
 'sifa-mehrere-mandanten': {
 slug: 'sifa-mehrere-mandanten',
 label: 'SiFa & Mandanten',
 title: 'Gefahrstoffmanagement für externe SiFa: Kataster, TRGS 555 & Mandanten',
 metaTitle: 'SiFa Gefahrstoffverzeichnis: mehrere Mandanten',
 metaDescription:
 'Externe SiFa und Arbeitsschutzbüros: Gefahrstoffverzeichnisse und Betriebsanweisungen mehrerer Kundenbetriebe pflegen, ohne Excel-Chaos und SDB-Anhänge.',
 heroKicker: 'Lösung für externe SiFa',
 primaryCta: { href: '/#live-demo', label: 'SDB hochladen und Entwurf prüfen' },
 heroSecondaryLinks: [
 { label: 'Startseite', href: '/' },
 { label: 'TRGS-510-Checker', href: '/trgs-510-zusammenlagerungs-check/' },
 { label: 'Gefahrstoffmanagement Software', href: '/wissen/gefahrstoffmanagement-software/' },
 ],
 heroLeadParagraphs: [
 'Sie betreuen mehrere Kundenbetriebe mit Gefahrstoffverzeichnis, Betriebsanweisungen und Freigaben nach § 14 GefStoffV. Statt verstreuter Excel-Dateien und Sicherheitsdatenblätter per E-Mail bündelt Gefahrstoff-QR Mandanten, Werke und Tätigkeiten getrennt in einem Zugang.',
 'Der Tarif SiFa Multi-Mandant unterstützt die Mandantentrennung; Sie prüfen KI-gestützte Entwürfe (gemäß TRGS 555) als Vorprüfung zur fachlichen Freigabe durch die SiFa bzw. den Arbeitgeber.',
 ],
 heroUspBullets: [
 'SDB hochladen, Entwurf zur fachlichen Prüfung, QR-Code am Gefahrstoffschrank',
 'Mandanten-, Werks- und Tätigkeitstrennung im SiFa Multi-Mandant-Tarif',
 'Begehungs-Modus: Stoffe vorab erfassen, auch wenn das SDB noch fehlt',
 'PDF- und Excel-Export des Gefahrstoffverzeichnisses je Mandant',
 ],
 heroText:
 'Externe Fachkräfte für Arbeitssicherheit jonglieren Mandantenlisten, SDB-Postfächer und alte Betriebsanweisungen. Ein klarer Stand je Kundenbetrieb reduziert Nacharbeit vor der Begehung.',
 typischeStoffe: [
 'Verstreute Excel-Listen je Mandant',
 'Sicherheitsdatenblätter per E-Mail ohne zentrales Archiv',
 'Unklarer Revisionsstand der Betriebsanweisungen',
 'Werks- und Tätigkeiten ohne saubere Zuordnung',
 'Unterweisung ohne Bezug zum Gefahrstoffverzeichnis',
 ],
 stoffeListSection: {
 title: 'Typische Pain Points bei mehreren Mandanten',
 intro:
 'Diese Engpässe sehen externe SiFas und Arbeitsschutzdienstleister häufig, wenn Gefahrstoffe über viele Kundenbetriebe hinweg gepflegt werden.',
 },
 spezifischerVorteil:
 'Im SiFa Multi-Mandant-Tarif führen Sie jeden Kundenbetrieb als Mandanten mit eigenen Werken. Stoffe, Sicherheitsdatenblätter und Betriebsanweisungs-Entwürfe bleiben getrennt, Batch-Upload und Exporte unterstützen die Pflege zwischen zwei Begehungen.',
 handwerkAbsatz:
 'Ohne Trennung vermischen sich Daten: ein SDB-Update beim Malerbetrieb landet in der Liste des Metallbauers, eine alte Betriebsanweisung liegt noch im Freigabeordner. Gefahrstoff-QR strukturiert Mandant, Werk und Tätigkeit, damit Sie vor der Fachfreigabe den richtigen Entwurf prüfen und den Mandanten exportieren können.',
 brancheGenitiv: 'Mandantenportfolio',
 blogPostHref: '/wissen/gefahrstoffkataster-software/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Externe Fachkräfte für Arbeitssicherheit und Arbeitsschutzbüros führen für jeden Kundenbetrieb ein Gefahrstoffverzeichnis nach § 6 GefStoffV und Betriebsanweisungen nach TRGS 555. Sie bleiben fachlich verantwortlich für Prüfung und Freigabe. Gefahrstoff-QR unterstützt mit Mandantentrennung im SiFa Multi-Mandant-Tarif, KI-gestützten Entwürfen aus dem Sicherheitsdatenblatt, Begehungs-Modus und Exporten je Mandant.',
 productsSectionTitle: 'Typische Mandanten-Situationen im Gefahrstoffalltag',
 productsSectionIntro:
 'Statt Einzelstoffe listet diese Tabelle wiederkehrende Pflichtthemen, die SiFas über verschiedene Kundenbetriebe hinweg begleiten.',
 typicalProducts: [
 {
 product: 'Handwerksbetrieb mit Lösemitteln',
 gebinde: 'Kanister, Sprühdosen je Werkstatt',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Verzeichnis je Mandant, BA-Entwurf zur Freigabe',
 },
 {
 product: 'Gebäudereinigung mit Konzentraten',
 gebinde: 'Kanister, Umgefüllte Flaschen',
 hazardKind: 'ätzend oder reizend',
 workplaceDuty: 'Werkszuordnung, TRGS 201 beim Umfüllen beachten',
 },
 {
 product: 'Malerbetrieb mit Dispersionsfarben',
 gebinde: 'Eimer, Farbtonnendosen',
 hazardKind: 'reizend, sensibilisierend',
 workplaceDuty: 'SDB archivieren, Betriebsanweisung an Lager und Baustelle',
 },
 {
 product: 'Metallbau mit Schweißzusätzen',
 gebinde: 'Stäbe, Spulen, Reiniger',
 hazardKind: 'reizend, staubbelastet',
 workplaceDuty: 'Tätigkeiten zuordnen, Entwurf zur Vorprüfung',
 },
 {
 product: 'Kfz-Betrieb mit Reinigern und Ölen',
 gebinde: 'Kanister, Aerosole',
 hazardKind: 'entzündbar',
 workplaceDuty: 'Begehungserfassung, später SDB nachreichen',
 },
 {
 product: 'Labor oder Praxis mit Desinfektionsmitteln',
 gebinde: 'Flaschen, Kanister',
 hazardKind: 'reizend, biologisch wirksam',
 workplaceDuty: 'Mandant getrennt halten, Export vor BG-Termin',
 },
 ],
 inspectionSectionTitle: 'Typische Engpässe bei mehreren Mandanten',
 inspectionDeficiencies: [
 'Jeder Kundenbetrieb nutzt eine eigene Excel-Datei. Sie finden keinen gemeinsamen Revisionsstand für Verzeichnis und Sicherheitsdatenblätter.',
 'Lieferanten schicken SDBs als E-Mail-Anhang. Ohne Archiv je Mandant wissen Sie nicht, welche Version für die Betriebsanweisung maßgeblich ist.',
 'Betriebsanweisungen und Unterweisungen hängen am falschen Ordner oder Mandanten. Freigaben laufen in alten Word-Dateien parallel zum Verzeichnis.',
 ],
 berufsgenossenschaft: 'Betreuung',
 excelComparison: [
 {
 topic: 'Neue SDBs je Mandant',
 excelWorkflow: 'Anhänge pro Kunde manuell in Listen übertragen',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem PDF mit Freigabe durch SiFa',
 },
 {
 topic: 'Betriebsanweisungen je Betrieb',
 excelWorkflow: 'Word-Dateien in getrennten Ordnern ohne Versionsstand',
 gqrWorkflow: 'Entwurf zur Vorprüfung mit Revisionsverlauf je Mandant',
 },
 {
 topic: 'Zugriff beim Kunden',
 excelWorkflow: 'Ordner auf dem Notebook oder E-Mail an den Betriebsleiter',
 gqrWorkflow: 'QR-Zugriff auf SDB und freigegebene BA am Einsatzort',
 },
 {
 topic: 'Nachweis vor der Begehung',
 excelWorkflow: 'Listen manuell je Mandant zusammenstellen',
 gqrWorkflow: 'PDF- oder Excel-Export des Verzeichnisses je Mandant',
 },
 ],
 faqItems: [
 {
 question: 'Gibt es bei Gefahrstoff-QR echte Mandantentrennung für externe SiFas?',
 answer:
 'Ja, im Tarif SiFa Multi-Mandant führen Sie Kundenbetriebe als Mandanten mit Werken und Tätigkeiten strikt getrennt. Bis zu fünfzehn Mandantenbetriebe sind im Grundpreis vorgesehen, weitere Mandanten skalieren per Zehner-Block. Die fachliche Freigabe von Verzeichnis und Betriebsanweisung bleibt bei Ihnen oder dem Arbeitgeber.',
 },
 {
 question: 'Wie hilft Gefahrstoff-QR, wenn beim Rundgang kein SDB vorliegt?',
 answer:
 'Im Begehungs-Modus erfassen Sie Stoffe ohne vorliegendes Sicherheitsdatenblatt oder Mengenangabe. Offene Felder werden im Export farblich markiert und können später nachgepflegt werden, wenn der Kunde das PDF nachreicht. So entsteht kein Leerloch im externen Mandantenverzeichnis zwischen zwei Begehungen am Kundenbetrieb.',
 },
 {
 question: 'Was bleibt bei der fachlichen Verantwortung der SiFa?',
 answer:
 'Gefahrstoff-QR liefert KI-gestützte Entwürfe für Verzeichnis und Betriebsanweisung (gemäß TRGS 555) als Vorprüfung zur fachlichen Freigabe durch die SiFa bzw. den Arbeitgeber (§ 14 GefStoffV). Sie entscheiden über Inhalt, Unterweisung und Nachweise. Kein Entwurf ersetzt Ihre Prüfung vor Ort oder vor der BG-Begehung.',
 },
 ],
 },
 },
 fliesenleger: {
 slug: 'fliesenleger',
 label: 'Fliesenleger',
 title: 'Gefahrstoffmanagement im Fliesenlegerbetrieb: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Fliesenleger & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Fliesenleger: Kleber, Grundierung, Zement — § 6 GefStoffV, TRGS 555 und TRGS 201 für Baustelle in Gefahrstoff-QR.',
 heroText:
 'Fliesenkleber, Grundierung und Reiniger liegen in der Werkstatt, im Kleinlaster und auf der Baustelle. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen Umfüllen und Objektwechsel abbilden.',
 typischeStoffe: [
 'Zementbasierte und dispersion Kleber',
 'Flächengrundierung und Haftvermittler',
 'Fugen- und Silikonprodukte',
 'Entkalker und Zementschleierentferner',
 'Reiniger für Natur- und Feinsteinzeug',
 ],
 spezifischerVorteil:
 'Wechselnde Bäder und Großflächen erzeugen viele Gebinde in Kleinmengen. Ein digitales Verzeichnis mit SDB-Bezug unterstützt Betriebsanweisungen je Baustelle und die Nachverfolgung von Umfüllen nach TRGS 201.',
 handwerkAbsatz:
 'Fliesenleger arbeiten mobil zwischen Objekten. Fehlen Eimerkleber oder Sprühflaschen im Verzeichnis, entstehen Lücken bei der BG BAU. KI-gestützte TRGS-555-Entwürfe aus dem Sicherheitsdatenblatt erleichtern die Vorprüfung durch SiFa zwischen den Aufträgen.',
 brancheGenitiv: 'Fliesenlegerbetrieb',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Fliesenlegerbetriebe führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Werkstatt und Baustelle. Betriebsanweisungen nach TRGS 555 gelten für Fliesenkleber, Grundierung und Reiniger. Umfüllen in Handeimern löst TRGS 201 aus. Excel-Listen je Objekt veralten in der Saison. Gefahrstoff-QR verbindet SDB, Entwürfe und Export für die SiFa vor der BG BAU.',
 typicalProducts: [
 {
 product: 'Flexkleber (zementbasiert)',
 gebinde: 'Sack 25 kg, Eimer',
 hazardKind: 'reizend, alkalisch',
 workplaceDuty: 'Verzeichnis, Betriebsanweisung am Mischplatz, Unterweisung Team',
 },
 {
 product: 'Flächengrundierung',
 gebinde: 'Kanister 10 Liter',
 hazardKind: 'entzündbar oder reizend',
 workplaceDuty: 'Eintrag Baustelle, SDB archivieren, Unterweisung vor Estrich',
 },
 {
 product: 'Silikonfuge Sanitär',
 gebinde: 'Kartusche, Tube',
 hazardKind: 'sensibilisierend',
 workplaceDuty: 'Gebinde im Verzeichnis, BA für Duscheinbau bereitstellen',
 },
 {
 product: 'Zementschleierentferner',
 gebinde: 'Kanister, Sprühflasche',
 hazardKind: 'ätzend',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Unterweisung vor Einsatz',
 },
 {
 product: 'Fliesenreiniger (sauer)',
 gebinde: 'Flasche 1 Liter',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Lagerort dokumentieren, BA in der Musterbox am Objekt',
 },
 {
 product: 'Dispersionskleber',
 gebinde: 'Eimer 15 kg',
 hazardKind: 'reizend',
 workplaceDuty: 'Menge im Verzeichnis, Freigabe Betriebsanweisung durch SiFa',
 },
 ],
 inspectionDeficiencies: [
 'Fliesenkleber und Grundierung auf der Baustelle fehlen im Gefahrstoffverzeichnis oder ohne Bauauftragsbezug.',
 'Betriebsanweisungen für Entkalker und Reiniger sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Umfüllte Handeimer und Sprühflaschen auf dem Objekt sind weder nach TRGS 201 gekennzeichnet noch im Verzeichnis erfasst.',
 ],
 berufsgenossenschaft: 'BG BAU',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Polier trägt Kleber je Bad in einer Excel-Datei ein',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Eimer am Mischplatz',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA an der Bauauftragsbox',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Werkstatt oder Zentrale',
 gqrWorkflow: 'QR am Kleinlaster oder am Mischcontainer auf der Baustelle',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Listen aus mehreren Objekten manuell zusammenführen',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Gehört Fliesenkleber ins Gefahrstoffverzeichnis?',
 answer:
 'Ja, wenn er als Gefahrstoff eingestuft ist und im Betrieb vorkommt. Flex- und Dispersionskleber werden nach § 6 GefStoffV mit Gebinde, Bereich und SDB-Bezug geführt. Eine Betriebsanweisung nach TRGS 555 beschreibt Mischen und Verarbeiten. Umfüllen in kleinere Behälter löst TRGS 201 aus. Die SiFa prüft Entwürfe vor Freigabe.',
 },
 {
 question: 'Wie dokumentiere ich Entkalker in Sprühflaschen auf dem Objekt?',
 answer:
 'Umfüllen löst Kennzeichnung nach TRGS 201 aus. Die Flasche braucht Stoff- und Gefahrenhinweise aus dem Sicherheitsdatenblatt. Parallel gehört das Kanister-Original ins Gefahrstoffverzeichnis nach § 6 GefStoffV. Eine Betriebsanweisung nach TRGS 555 beschreibt den Einsatz nach Fugenschluss. Gefahrstoff-QR unterstützt Entwürfe zur Vorprüfung durch SiFa.',
 },
 {
 question: 'Welche BG prüft Fliesenlegerbetriebe?',
 answer:
 'Die Berufsgenossenschaft der Bauwirtschaft (BG BAU) begutachtet Gefahrstoffdokumentation auf Baustellen und in der Werkstatt. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen gehören zum Standardprogramm. Die SiFa bereitet Begehungen vor. Exporte aus Gefahrstoff-QR unterstützen den Nachweis ohne getrennte Listen pro Objekt.',
 },
 ],
 },
 },
 'shk-betrieb': {
 slug: 'shk-betrieb',
 label: 'SHK-Betrieb',
 title: 'Gefahrstoffmanagement im SHK-Betrieb: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis SHK & Sanitär TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis SHK: Lötmittel, Kleber, Reiniger — § 6 GefStoffV, TRGS 555 und TRGS 201 für Sanitär und Heizung in Gefahrstoff-QR.',
 heroText:
 'Lötpasten, Kleber, Frostschutz und Reiniger liegen im Werkstattwagen, im Lager und beim Kunden. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen Montage und Service abdecken.',
 typischeStoffe: [
 'Lötmittel und Flussmittel',
 'Rohrreiniger und Entkalker',
 'Sanitär- und Armaturenkleber',
 'Frostschutz für Heizungswasser',
 'Reiniger für Wärmetauscher und Anlagen',
 ],
 spezifischerVorteil:
 'Monteure arbeiten mit wechselnden Gebinden im Fahrzeug. Ein digitales Verzeichnis mit SDB-Historie hilft, Betriebsanweisungen je Einsatzort freizugeben und Umfüllen nach TRGS 201 nachzuhalten.',
 handwerkAbsatz:
 'SHK-Betriebe wechseln zwischen Werkstatt, Lager und Kundenanlage. Wenn Kleberkartuschen im Transporter nicht im Verzeichnis stehen, entstehen Lücken bei der BGHM. Strukturierte Erfassung mit KI-gestützten TRGS-555-Entwürfen verkürzt die Pflege zwischen Heizungs- und Sanitäraufträgen.',
 brancheGenitiv: 'SHK-Betrieb',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'SHK-Betriebe führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Lager, Werkstattwagen und Montageort. Betriebsanweisungen nach TRGS 555 gelten für Lötmittel, Kleber und Reiniger. Umfüllen in Handflaschen löst TRGS 201 aus. Excel-Listen je Monteur veralten bei Lieferantenwechsel. Gefahrstoff-QR verknüpft SDB, Entwürfe und Nachweis für die SiFa vor der BGHM.',
 typicalProducts: [
 {
 product: 'Lötpaste Kupfer',
 gebinde: 'Tube, Dose',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Verzeichnis, Betriebsanweisung Montagekoffer, Unterweisung Team',
 },
 {
 product: 'Rohrreiniger (sauer)',
 gebinde: 'Flasche, Kanister',
 hazardKind: 'ätzend',
 workplaceDuty: 'Eintrag Lager, SDB archivieren, Unterweisung vor Entstopfung',
 },
 {
 product: 'Sanitärkleber / Silikon',
 gebinde: 'Kartusche',
 hazardKind: 'sensibilisierend',
 workplaceDuty: 'Gebinde im Verzeichnis, BA am Montagekoffer bereitstellen',
 },
 {
 product: 'Heizungsfrostschutz',
 gebinde: 'Kanister 10–25 Liter',
 hazardKind: 'giftig bei Verschlucken',
 workplaceDuty: 'Technikeintrag, BA für Befüllung, Dokumentation Service',
 },
 {
 product: 'Armaturenreiniger',
 gebinde: 'Sprühflasche',
 hazardKind: 'ätzend oder reizend',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Verzeichnis Fahrzeug',
 },
 {
 product: 'Schweißpasten und Flussmittel',
 gebinde: 'Tube, Dose',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Menge im Verzeichnis, Freigabe Betriebsanweisung durch SiFa',
 },
 ],
 inspectionDeficiencies: [
 'Kleber und Reiniger im Werkstattwagen fehlen im Gefahrstoffverzeichnis oder ohne Fahrzeugbezug.',
 'Betriebsanweisungen für Lötpasten und Rohrreiniger sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Umfüllte Sprühflaschen bei Kunden sind weder nach TRGS 201 gekennzeichnet noch im Verzeichnis dokumentiert.',
 ],
 berufsgenossenschaft: 'BGHM',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Büro tippt Kleber aus Lieferschein in Excel ab',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unmarkierte Flaschen im Monteurkoffer',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Regal',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Werkstatt oder Zentrale',
 gqrWorkflow: 'QR am Lagerregal oder im Werkstattwagen',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'SDB-PDFs und Listen der Monteure sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Braucht ein SHK-Betrieb ein Gefahrstoffverzeichnis?',
 answer:
 'Ja, sobald Gefahrstoffe eingesetzt oder gelagert werden. Lötpasten, Rohrreiniger und Sanitärkleber fallen nach § 2 GefStoffV unter die Pflichten. Das Verzeichnis nach § 6 GefStoffV muss Lager, Fahrzeug und typische Montageorte abbilden. Frostschutz in Heizungsanlagen gehört zum Technikeintrag. Excel reicht nur mit regelmäßiger Pflege durch SiFa oder Verwaltung.',
 },
 {
 question: 'Wie erfasse ich Reiniger im Monteurfahrzeug?',
 answer:
 'Jedes Gebinde im Wagen wird dem Fahrzeug oder Team im Gefahrstoffverzeichnis zugeordnet. Das Sicherheitsdatenblatt wird mit Revisionsstand archiviert. Eine Betriebsanweisung nach TRGS 555 beschreibt Einsatz beim Kunden. Bei Umfüllen in Handflaschen gilt TRGS 201. Gefahrstoff-QR unterstützt Entwürfe zur Vorprüfung durch SiFa oder Polier.',
 },
 {
 question: 'Welche BG ist für SHK-Betriebe zuständig?',
 answer:
 'Die Berufsgenossenschaft Holz und Metall (BGHM) begutachtet chemische Arbeitsstoffe und Dokumentation in Werkstatt und auf Montage. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen stehen im Fokus. Die SiFa bereitet Begehungen vor. Digitale Exporte aus Gefahrstoff-QR erleichtern den Nachweis bei verteilten Teams.',
 },
 ],
 },
 },
 lackiererei: {
 slug: 'lackiererei',
 label: 'Lackiererei',
 title: 'Gefahrstoffmanagement in der Lackiererei: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Lackiererei & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Lackiererei: Basislack, Härter, Spachtel — § 6 GefStoffV, TRGS 555 und TRGS 201 in Gefahrstoff-QR.',
 heroText:
 'Basislack, Härter und Spachtel stehen in Mischstation, Kabine und Vorbereitung. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen Mischverhältnisse und Umfüllen in Messbecher abbilden.',
 typischeStoffe: [
 '2K-Autolacke und Härter',
 'Spachtelmassen und Primer',
 'Reiniger für Pistolen und Kabine',
 'Grundierungen und Ätzgrund',
 'Polituren und Silikonentferner',
 ],
 spezifischerVorteil:
 'Farbton und Härter wechseln mit Auftrag und Hersteller. Ein digitales Verzeichnis mit SDB-Historie unterstützt Betriebsanweisungen je Kabine und die Nachverfolgung von Umfüllen nach TRGS 201.',
    handwerkAbsatz:
      'Lackierer arbeiten mit Lösemitteldämpfen und 2K-Systemen. Fehlen Mischbecher oder Härtergebilde im Verzeichnis, wird die BGHM-Begehung kritisch. KI-gestützte TRGS-555-Entwürfe aus dem Sicherheitsdatenblatt erleichtern die Vorprüfung vor der Unterweisung am Lackierpult.',
 brancheGenitiv: 'Lackiererei',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
      aeoAnswer:
        'Lackierereien führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Mischplatz, Kabine und Lager. Betriebsanweisungen nach TRGS 555 gelten für Basislack, Härter und Reiniger. Umfüllen in Messbechern löst TRGS 201 aus. Excel-Listen mit Farbcodes veralten bei Lieferantenwechsel. Gefahrstoff-QR bündelt SDB, Entwürfe und Export für die SiFa vor der BGHM.',
 typicalProducts: [
 {
 product: '2K-Basislack',
 gebinde: 'Gebinde 1 Liter, 5 Liter',
 hazardKind: 'entzündbar, sensibilisierend',
 workplaceDuty: 'Verzeichnis, Betriebsanweisung Mischstation, Unterweisung Lackierer',
 },
 {
 product: 'Lackhärter (Isocyanat)',
 gebinde: 'Flasche 1 Liter',
 hazardKind: 'sensibilisierend, giftig bei Einatmen',
 workplaceDuty: 'Eintrag Kabine, SDB archivieren, Freigabe durch SiFa',
 },
 {
 product: 'Spachtelmasse (Polyester)',
 gebinde: 'Tube, Eimer',
 hazardKind: 'sensibilisierend',
 workplaceDuty: 'Gebinde im Verzeichnis, BA an der Karosseriebank',
 },
 {
 product: 'Pistolenreiniger',
 gebinde: 'Kanister, Becherglas',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Unterweisung vor Reinigung',
 },
 {
 product: 'Kunststoffprimer (Ätzgrund)',
 gebinde: 'Flasche, Spray',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Lagerort dokumentieren, BA am Vorbereitungsplatz',
 },
 {
 product: 'Silikonentferner',
 gebinde: 'Spraydose, Flasche',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Eintrag Vorbereitung, Unterweisung vor Polieren',
 },
 ],
 inspectionDeficiencies: [
 'Härter und Mischbecher an der Kabine fehlen im Gefahrstoffverzeichnis oder ohne Mischverhältnisbezug.',
 'Betriebsanweisungen für 2K-Lacke und Spachtel sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
      'Messbecher mit Lackresten sind weder nach TRGS 201 gekennzeichnet noch im Verzeichnis aufgeführt.',
    ],
    berufsgenossenschaft: 'BGHM',
    excelComparison: [
      {
        topic: 'Neue Lieferanten-SDBs',
        excelWorkflow: 'Lackierer tippt Farbcode und Stoff in Excel ein',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Becher an der Mischwaage',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Farbregal',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Klimatisierung oder Büro',
 gqrWorkflow: 'QR an Mischstation, Kabine oder Vorbereitungsplatz',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'SDB-PDFs und Farblisten über Jahre sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Muss Lackhärter extra im Verzeichnis stehen?',
 answer:
 'Ja, Härterkomponenten sind eigene Gefahrstoffe mit eigenem Sicherheitsdatenblatt. Sie werden nach § 6 GefStoffV mit Gebinde und Lagerort geführt. Eine Betriebsanweisung nach TRGS 555 beschreibt Mischen, Spritzen und Reinigung der Kabine. Umfüllen in Messbechern löst TRGS 201 aus. Die SiFa prüft Entwürfe vor Freigabe und Unterweisung.',
 },
 {
 question: 'Wie dokumentiere ich Pistolenreiniger im Becherglas?',
 answer:
 'Umfüllen löst Kennzeichnung nach TRGS 201 aus. Der Becher braucht Stoff- und Gefahrenhinweise aus dem Sicherheitsdatenblatt. Das Originalkanister gehört ins Gefahrstoffverzeichnis nach § 6 GefStoffV. Eine Betriebsanweisung nach TRGS 555 beschreibt den Umgang an der Mischstation. Gefahrstoff-QR unterstützt Entwürfe zur Vorprüfung durch SiFa.',
 },
        {
          question: 'Welche BG ist für Lackierereien zuständig?',
          answer:
            'Karosserie- und Industrielackierereien mit Metallbeschichtung fallen in der Regel zur Berufsgenossenschaft Holz und Metall (BGHM); Maler- und Lackierer im Baugewerbe zur Berufsgenossenschaft der Bauwirtschaft (BG BAU). Chemische Arbeitsstoffe und Dokumentation in Werkstatt und Kabine stehen bei Begehungen im Fokus. Die SiFa bereitet Nachweise aus § 6 GefStoffV und freigegebenen Betriebsanweisungen vor.',
        },
 ],
 },
 },
 tischlerei: {
 slug: 'tischlerei',
 label: 'Tischlerei',
 title: 'Gefahrstoffmanagement in der Tischlerei: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Tischlerei & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Tischlerei: Beizen, Lacke, Kleber — § 6 GefStoffV, TRGS 555 und TRGS 201 für Werkstatt und Möbelbau in Gefahrstoff-QR.',
 heroText:
 'Lösemittel in Lacken, Beizen und Klebern liegen in der Werkstatt, im Lager und auf der Montage. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen zu Aufträgen und Lieferantenwechseln passen.',
 typischeStoffe: [
 'Holzbeizen und Ätzmittel',
 'PU- und Kontaktkleber',
 'Nitro- und Wasserlacke',
 'Lösemittelhaltige Reiniger und Verdünner',
 'Harze und Spachtelmassen',
 ],
 spezifischerVorteil:
 'Kleinserien und wechselnde Anstriche erzeugen viele Hilfsstoffe. Ein digitales Verzeichnis mit SDB-Bezug hilft, Betriebsanweisungen je Arbeitsplatz freizugeben und Umfüllen nach TRGS 201 im Schreinerlager nachzuhalten.',
 handwerkAbsatz:
 'Tischlereien arbeiten zwischen Werkstatt und Montage beim Kunden. Fehlen Umfüllgebinde oder aktuelle SDBs im Verzeichnis, wird die BGHM-Begehung kritisch. KI-gestützte TRGS-555-Entwürfe verkürzen die Pflege zwischen Aufträgen.',
 brancheGenitiv: 'Tischlerei',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Tischlereien führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Werkstatt und Lager. Betriebsanweisungen nach TRGS 555 gelten für Beizen, Lacke und Kleber. Umfüllen in Anschlagbehältern löst Kennzeichnung nach TRGS 201 aus. Excel-Listen scheitern bei wechselnden Stücklisten. Gefahrstoff-QR verknüpft SDB, Entwürfe und Export für SiFa und BGHM.',
 typicalProducts: [
 {
 product: 'Holzbeize (wasserbasiert oder lösemittelhaltig)',
 gebinde: 'Kanister 5 Liter, Flasche',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Verzeichnis, Betriebsanweisung am Beiztisch, Unterweisung vor Farbtonmischung',
 },
 {
 product: 'Nitro- oder PU-Lack',
 gebinde: 'Kanister, Spraydose',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Lagerort dokumentieren, BA am Lackierplatz bereitstellen',
 },
 {
 product: 'Kontaktkleber (Polychloropren)',
 gebinde: 'Eimer, Tube',
 hazardKind: 'entzündbar, sensibilisierend',
 workplaceDuty: 'Eintrag Lager, SDB archivieren, Unterweisung Schreiner',
 },
 {
 product: 'Lackverdünner / Beizverdünnung',
 gebinde: 'Kanister 10 Liter',
 hazardKind: 'entzündbar',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Verzeichnis aktuell halten',
 },
 {
 product: 'Epoxid-Spachtel (2K)',
 gebinde: 'Eimer, Kartusche',
 hazardKind: 'sensibilisierend',
 workplaceDuty: 'Mischgebinde im Verzeichnis, BA nach Freigabe SiFa',
 },
 {
 product: 'Holzschutzmittel',
 gebinde: 'Eimer, Kanister',
 hazardKind: 'entzündbar, sensibilisierend',
 workplaceDuty: 'Verzeichniseintrag, Unterweisung vor Imprägnierung',
 },
 ],
 inspectionDeficiencies: [
 'Lacke, Beizen und Kleber in Werkstatt und Lager fehlen im Gefahrstoffverzeichnis oder ohne Arbeitsplatzbezug.',
 'Betriebsanweisungen für Beizen und Lacke sind veraltet oder ohne aktuelles Sicherheitsdatenblatt des Lieferanten.',
 'Beschriftete Anschlag- und Sprühflaschen am Beiztisch stehen nicht im Verzeichnis oder ohne TRGS-201-Bezug.',
 ],
 berufsgenossenschaft: 'BGHM',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Werkstattmeister tippt Lacke in Excel ab',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Weiße Flaschen ohne Stoffname am Montageplatz',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Lagerregal',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Werkstattleitung',
 gqrWorkflow: 'QR am Lackiertisch, Beizbecken oder Kleberegal',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Excel und SDB-PDFs aus mehreren Aufträgen sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Braucht eine kleine Tischlerei ein Gefahrstoffverzeichnis?',
 answer:
 'Ja, sobald Gefahrstoffe eingesetzt oder gelagert werden. Beizen, Lacke und Kleber gelten nach § 2 GefStoffV. Das Verzeichnis nach § 6 GefStoffV muss alle Gebinde und Arbeitsplätze abbilden. Auch Meisterbetriebe mit wenigen Beschäftigten nutzen lösemittelhaltige Hilfsstoffe. Gefahrstoff-QR unterstützt Pflege und Vorprüfung durch SiFa oder Betriebsinhaber.',
 },
 {
 question: 'Wie dokumentiere ich Umfüllen von Beize in Anschlagbehälter?',
 answer:
 'Beim Umfüllen entsteht ein neues Arbeitsmittel nach TRGS 201. Es braucht Kennzeichnung mit Stoff- und Gefahrenhinweisen aus dem SDB. Parallel gehört das Gebinde ins Gefahrstoffverzeichnis. Eine Betriebsanweisung nach TRGS 555 wird für den Beizplatz benötigt und von der SiFa freigegeben. Digitale Erfassung erleichtert Updates bei Rezepturwechsel.',
 },
 {
 question: 'Welche BG begutachtet Gefahrstoffe in der Tischlerei?',
 answer:
 'Die Berufsgenossenschaft Holz und Metall (BGHM) prüft chemische Arbeitsstoffe und Dokumentation in Werkstatt und Montage. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen stehen im Fokus. Die SiFa bereitet Begehungen vor. Exporte aus Gefahrstoff-QR erleichtern den Nachweis gegenüber der BGHM.',
 },
 ],
 },
 },
 gastronomie: {
 slug: 'gastronomie',
 label: 'Gastronomie',
 title: 'Gefahrstoffmanagement in der Gastronomie: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Gastronomie & Küche',
 metaDescription:
 'Gefahrstoffverzeichnis Gastronomie: Reiniger, Fettlöser, Flüssiggas — § 6 GefStoffV, TRGS 555 und TRGS 201 für Küche und Lager in Gefahrstoff-QR.',
 heroText:
 'Spül- und Fettlöser, Entkalker und Flüssiggas stehen in Küche, Spülkeller und Lager. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen zu Schichtbetrieb und Lieferantenwechsel passen.',
 typischeStoffe: [
 'Alkalische Spül- und Fettlöser',
 'Säurehaltige Entkalker',
 'Grill- und Ofenreiniger',
 'Flüssiggas für Kochtechnik',
 'Desinfektionsmittel in Küche und Gastraum',
 ],
 spezifischerVorteil:
 'Wechselnde Lieferanten und Aushilfskräfte machen Papierlisten anfällig. Ein digitales Verzeichnis mit SDB-Bezug hilft, Betriebsanweisungen je Küchenbereich freizugeben und Umfüllen nach TRGS 201 an der Spüle nachzuhalten.',
 handwerkAbsatz:
 'In der Küche überlagern sich Reinigung, Kaltetechnik und Grillbetrieb. Wenn Sprühflaschen neben dem Herd nicht im Verzeichnis stehen, wird die BGN-Begehung kritisch. KI-gestützte TRGS-555-Entwürfe verkürzen die Pflege bei neuen Konzentraten.',
 brancheGenitiv: 'Gastronomie',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Gastronomiebetriebe führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Küche, Spülkeller und Lager. Betriebsanweisungen nach TRGS 555 gelten für Spül-, Fett- und Grillreiniger. Umfüllen in Sprühflaschen erfordert Kennzeichnung nach TRGS 201. Excel-Listen veralten bei Aushilfen und Saisonwechsel. Gefahrstoff-QR verbindet SDB, Entwürfe und Export für SiFa und BGN.',
 typicalProducts: [
 {
 product: 'Alkalischer Fettlöser für Grill und Pfanne',
 gebinde: 'Kanister, Dosierflasche',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Verzeichnis, Betriebsanweisung Spülbereich, Unterweisung Küchenteam',
 },
 {
 product: 'Grill- und Ofenreiniger',
 gebinde: 'Spraydose, Flasche',
 hazardKind: 'ätzend oder entzündbar',
 workplaceDuty: 'Eintrag Küche, BA vor heißer Oberfläche bereitstellen',
 },
 {
 product: 'Flüssiggas (Propangemisch)',
 gebinde: 'Flasche 11 kg, Pfandflasche',
 hazardKind: 'entzündbares Gas, druckgasförmig',
 workplaceDuty: 'Menge und Lagerort im Verzeichnis, Unterweisung vor Flaschenwechsel',
 },
 {
 product: 'Entkalker für Spültechnik',
 gebinde: 'Kanister 5 Liter',
 hazardKind: 'ätzend',
 workplaceDuty: 'SDB archivieren, Umfüllen nach TRGS 201 dokumentieren',
 },
 {
 product: 'Spülmittel-Konzentrat (maschinell)',
 gebinde: 'Kanister 10 Liter',
 hazardKind: 'reizend, alkalisch',
 workplaceDuty: 'Lagerort Spülkeller, BA und Unterweisung dokumentieren',
 },
 {
 product: 'Flächendesinfektion Gastraum',
 gebinde: 'Sprühflasche, Kanister',
 hazardKind: 'reizend oder entzündbar',
 workplaceDuty: 'Umfüllgebinde kennzeichnen, Verzeichnis aktuell halten',
 },
 ],
 inspectionDeficiencies: [
 'Spül- und Grillreiniger in Küche und Spülkeller fehlen im Gefahrstoffverzeichnis.',
 'Betriebsanweisungen für Fettlöser und Ofenreiniger sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Beschriftete Sprühflaschen an Spüle und Grillstation sind nicht nach TRGS 201 im Verzeichnis erfasst.',
 ],
 berufsgenossenschaft: 'BGN',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Küchenchef tippt Reiniger in Excel ab',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unmarkierte Flaschen an der Spülmaschine',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Küchenregal',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner im Büro oder Chefbüro',
 gqrWorkflow: 'QR an Spüle, Grill oder Lagerflaschenregal',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Listen und SDBs aus Küche und Nebenräumen sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Braucht ein Restaurant mit kleiner Küche ein Gefahrstoffverzeichnis?',
 answer:
 'Ja, sobald Gefahrstoffe eingesetzt oder gelagert werden. Fettlöser, Entkalker und Flüssiggas gelten nach § 2 GefStoffV. Das Verzeichnis nach § 6 GefStoffV muss Küche und Lager abdecken. Auch kleine Gaststätten nutzen alkalische Reiniger täglich. Gefahrstoff-QR unterstützt Pflege und Vorprüfung durch SiFa oder Betriebsleitung vor Unterweisung.',
 },
 {
 question: 'Wie dokumentiere ich Flüssiggas für den Herd?',
 answer:
 'Propangemische gehören mit Mengenbereich und Lagerort ins Gefahrstoffverzeichnis. Das Sicherheitsdatenblatt wird archiviert. Eine Betriebsanweisung nach TRGS 555 beschreibt Umgang, Flaschenwechsel und Unterweisung. Bei Befüllung kleiner Gebinde gilt TRGS 201. Gefahrstoff-QR unterstützt Entwürfe zur fachlichen Freigabe durch SiFa oder Küchenleitung am Herd.',
 },
 {
 question: 'Welche BG prüft Gefahrstoffe in der Gastronomie?',
 answer:
 'Die Berufsgenossenschaft Nahrungsmittel und Gastgewerbe (BGN) begutachtet chemische Arbeitsstoffe und Dokumentation in Küche und Betrieb. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen stehen im Fokus. Die SiFa bereitet Begehungen vor. Digitale Exporte aus Gefahrstoff-QR erleichtern den Nachweis bei Schichtbetrieb.',
 },
 ],
 },
 },
 steinmetz: {
 slug: 'steinmetz',
 label: 'Steinmetz',
 title: 'Gefahrstoffmanagement im Steinmetzbetrieb: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Steinmetz & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Steinmetz: Diamantpaste, Klebstoffe, Impregnierung — § 6 GefStoffV, TRGS 555 und TRGS 201 für Werkstatt in Gefahrstoff-QR.',
 heroText:
 'Schleif- und Poliermittel, Epoxidkleber und Imprägniermittel liegen in Werkstatt, Lager und auf Baustellen. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen zu Naturstein und Montage passen.',
 typischeStoffe: [
 'Diamant- und Poliersuspensionen',
 'Epoxid- und Polyesterkleber',
 'Imprägniermittel für Naturstein',
 'Hydraulik- und Schleiföle an Maschinen',
 'Reiniger für Stein und Werkzeuge',
 ],
 spezifischerVorteil:
 'Werkstatt und Grabmalmontage nutzen unterschiedliche Klebersysteme. Ein digitales Verzeichnis mit SDB-Bezug hilft, Betriebsanweisungen je Bearbeitungsschritt freizugeben und Umfüllen nach TRGS 201 am Schleifplatz nachzuhalten.',
 handwerkAbsatz:
 'Steinmetze arbeiten zwischen Werkstatt und Friedhof oder Baustelle. Fehlen Kleberkartuschen im Verzeichnis, wird die BG BAU-Begehung kritisch. KI-gestützte TRGS-555-Entwürfe verkürzen die Pflege bei neuen Imprägniermitteln.',
 brancheGenitiv: 'Steinmetzbetrieb',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Steinmetzbetriebe führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Werkstatt und Baustelle. Betriebsanweisungen nach TRGS 555 gelten für Kleber, Poliermittel und Imprägniermittel. Umfüllen in Handbehältern löst Kennzeichnung nach TRGS 201 aus. Excel-Listen brechen bei wechselnden Aufträgen ein. Gefahrstoff-QR verknüpft SDB, Entwürfe und Nachweise für SiFa und BG BAU.',
 typicalProducts: [
 {
 product: 'Diamantpoliersuspension',
 gebinde: 'Flasche, Kanister',
 hazardKind: 'reizend, gesundheitsschädlich bei Einatmen',
 workplaceDuty: 'Verzeichnis Schleifplatz, Betriebsanweisung, Unterweisung vor Nasspolieren',
 },
 {
 product: 'Epoxid-Steinkleber (2K)',
 gebinde: 'Kartusche, Eimer',
 hazardKind: 'sensibilisierend, reizend',
 workplaceDuty: 'Eintrag Werkstatt, SDB archivieren, Freigabe SiFa vor Montage',
 },
 {
 product: 'Steinimprägniermittel',
 gebinde: 'Kanister 5 Liter',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Lagerort dokumentieren, BA am Ausführplatz bereitstellen',
 },
 {
 product: 'Schleif- und Hydrauliköl an der Säge',
 gebinde: 'Kanister, Gebinde am Aggregat',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Verzeichniseintrag Maschine, Unterweisung Bediener',
 },
 {
 product: 'Reiniger für Naturstein',
 gebinde: 'Kanister, Spray',
 hazardKind: 'ätzend oder entzündbar',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Verzeichnis pflegen',
 },
 {
 product: 'Polyester-Vergussmasse (Abdichtung)',
 gebinde: 'Kartusche, Eimer',
 hazardKind: 'sensibilisierend',
 workplaceDuty: 'Baustellen- oder Werkstatteintrag, BA nach TRGS 555',
 },
 ],
 inspectionDeficiencies: [
 'Kleber, Poliermittel und Imprägniermittel fehlen im Gefahrstoffverzeichnis oder ohne Arbeitsplatzbezug.',
 'Betriebsanweisungen für Epoxidkleber und Schleifmittel sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Handbehälter und Sprühflaschen an Schleif- und Montageplätzen sind nicht nach TRGS 201 dokumentiert.',
 ],
 berufsgenossenschaft: 'BG BAU',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Polier tippt Kleber in Excel je Auftrag ab',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Flaschen am Schleiftisch',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Werkstattregal',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Werkstattleitung oder Bauramme',
 gqrWorkflow: 'QR am Schleifplatz, Kleberegal oder Montagewagen',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Listen und SDBs aus Werkstatt und Baustelle sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Braucht ein Steinmetzbetrieb ein Gefahrstoffverzeichnis?',
 answer:
 'Ja, sobald Gefahrstoffe eingesetzt oder gelagert werden. Kleber, Poliermittel und Reiniger gelten nach § 2 GefStoffV. Das Verzeichnis nach § 6 GefStoffV muss Werkstatt und Montageorte abdecken. Auch kleine Betriebe nutzen Epoxidkleber und Imprägniermittel. Gefahrstoff-QR unterstützt Pflege und Vorprüfung durch SiFa oder Meister vor Unterweisung.',
 },
 {
 question: 'Wie dokumentiere ich Epoxidkleber bei Grabmalmontage?',
 answer:
 'Der Stoff wird im Verzeichnis mit Gebinde und Einsatzort geführt. Das Sicherheitsdatenblatt wird archiviert. Eine Betriebsanweisung nach TRGS 555 beschreibt Mischung, Kontakt und Unterweisung vor Ort. Reste in Handkartuschen können TRGS 201 auslösen. Gefahrstoff-QR unterstützt Entwürfe zur fachlichen Freigabe durch SiFa oder Polier.',
 },
 {
 question: 'Welche BG begutachtet Gefahrstoffe beim Steinmetz?',
 answer:
 'Die Berufsgenossenschaft der Bauwirtschaft (BG BAU) prüft chemische Arbeitsstoffe und Dokumentation in Werkstatt und auf Montage. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen stehen im Fokus. Die SiFa bereitet Begehungen vor. Exporte aus Gefahrstoff-QR erleichtern den Nachweis auf der Baustelle.',
 },
 ],
 },
 },
 'garten-landschaftsbau': {
 slug: 'garten-landschaftsbau',
 label: 'Garten- und Landschaftsbau',
 title: 'Gefahrstoffmanagement im Garten- und Landschaftsbau: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Galabau & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Galabau: Pflanzenschutz, Öle, Dieselfreisteller — § 6 GefStoffV, TRGS 555 und TRGS 201 für Betriebshof in Gefahrstoff-QR.',
 heroText:
 'Pflanzenschutzmittel, Zweitaktöl und Reiniger liegen neben Baustoffen auf Hof und Baustelle. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen zu Saison und wechselnden Objekten passen.',
 typischeStoffe: [
 'Pflanzenschutzmittel und Herbizide',
 'Zweitaktöl und Kraftstoff-Hilfsstoffe',
 'Entfetter und Maschinenreiniger',
 'Holzschutzmittel und Imprägniermittel',
 'Betonreiniger und Zementschleierentferner',
 ],
 spezifischerVorteil:
 'Wechselnde Aufträge und Jungkräfte im Umfeld erzeugen viele Kleingebinde. Digitales Verzeichnis mit SDB-Bezug hilft, Betriebsanweisungen für Hof und Einsatzort bereitzustellen und Umfüllen nach TRGS 201 nachzuhalten.',
 handwerkAbsatz:
 'Galabauer arbeiten mobil zwischen Depot und Baustelle. Fehlen Sprühflaschen oder Kanister im Verzeichnis, wird die BG BAU-Begehung kritisch. KI-gestützte TRGS-555-Entwürfe verkürzen die Pflege bei neuen Pflanzenschutzmitteln und Betriebsmitteln.',
 brancheGenitiv: 'Garten- und Landschaftsbau',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Galabauer führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Betriebshof, Werkstatt und Baustelle. Betriebsanweisungen nach TRGS 555 betreffen Pflanzenschutz, Öle und Reiniger. Umfüllen in Hand- und Dosiergebinde erfordert Kennzeichnung nach TRGS 201. Excel-Listen je Saison und Objekt veralten schnell. Gefahrstoff-QR verbindet SDB, Entwürfe und Nachweise für SiFa und BG BAU.',
 typicalProducts: [
 {
 product: 'Herbizid-Konzentrat (Rasen und Wege)',
 gebinde: 'Kanister 5 Liter, Sprühflasche',
 hazardKind: 'reizend, gesundheitsschädlich bei Einatmen',
 workplaceDuty: 'Verzeichnis, BA vor Ausbringung, Unterweisung Anwender',
 },
 {
 product: 'Zweitaktöl für Gerätepark',
 gebinde: 'Flasche 1 Liter, Kanister',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Eintrag Werkstatt, Lagerort Hof, Unterweisung vor Mischung',
 },
 {
 product: 'Entfetter für Kettengerät und Gerätewerkstatt',
 gebinde: 'Spray, Kanister',
 hazardKind: 'entzündbar',
 workplaceDuty: 'SDB archivieren, Umfüllen nach TRGS 201 dokumentieren',
 },
 {
 product: 'Holzschutzmittel (Holzlager, Zaunbau)',
 gebinde: 'Kanister 10 Liter',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Betriebsanweisung Hof, Verzeichnis, Unterweisung Team',
 },
 {
 product: 'Algenentferner für Naturstein',
 gebinde: 'Kanister, Sprühflasche',
 hazardKind: 'ätzend oder reizend',
 workplaceDuty: 'Kennzeichnung Umfüllgebinde, Verzeichnis Baustelle',
 },
 {
 product: 'Diesel-Hilfsstoff (Motorreiniger)',
 gebinde: 'Kanister 20 Liter',
 hazardKind: 'entzündbar',
 workplaceDuty: 'Menge im Verzeichnis, BA in der Gerätehalle',
 },
 ],
 inspectionDeficiencies: [
 'Pflanzenschutz- und Reinigungsmittel auf dem Hof fehlen im Gefahrstoffverzeichnis oder ohne Bauauftragsbezug.',
 'Betriebsanweisungen für Herbizide und Maschinenöle sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Beschriftete und unbeschriftete Sprühflaschen an Geräten sind nicht nach TRGS 201 im Verzeichnis erfasst.',
 ],
 berufsgenossenschaft: 'BG BAU',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Büro tippt PSM und Öle pro Objekt in Excel',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Flaschen am Anhänger',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Geräteschuppen',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Hofbürobox oder zuhause beim Meister',
 gqrWorkflow: 'QR am Hofregal, Anhänger oder Baustellencontainer',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Listen aus Hof und mehreren Baustellen manuell bündeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Müssen Pflanzenschutzmittel ins Gefahrstoffverzeichnis?',
 answer:
 'Ja, Pflanzenschutzmittel sind Gefahrstoffe nach § 2 GefStoffV. Sie werden nach § 6 GefStoffV mit Menge, Lagerort und Verwendung im Verzeichnis geführt. Eine Betriebsanweisung nach TRGS 555 beschreibt Umgang vor Ausbringung. Unterweisungen sind für alle Anwender dokumentiert. Gefahrstoff-QR unterstützt SDB-Bezug und Vorprüfung durch SiFa oder Betriebsleitung.',
 },
 {
 question: 'Wie erfasse ich Hof und wechselnde Baustellen?',
 answer:
 'Jedes Gebinde braucht einen Bezug zu Lagerort oder Einsatzadresse im Verzeichnis. Hoflager und Baustellencontainer gelten als Arbeitsorte mit eigenen Stoffen. Excel je Auftrag veraltet nach Saisonende. Digitale Pflege hält SDB-Stand und Betriebsanweisungen zusammen. Umfüllen kleiner Gebinde löst TRGS 201 aus und wird dokumentiert.',
 },
 {
 question: 'Welche BG begeht Galabauer-Betriebe?',
 answer:
 'Die Berufsgenossenschaft der Bauwirtschaft (BG BAU) prüft Gefahrstoffdokumentation in Werkstatt, auf Hof und Baustelle. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen gehören zum Standardprogramm. Die SiFa bereitet Begehungen vor. Exporte aus Gefahrstoff-QR unterstützen den Nachweis ohne Papierstapel zwischen den Objekten.',
 },
 ],
 },
 },
 'pflegeeinrichtung': {
 slug: 'pflegeeinrichtung',
 label: 'Pflegeeinrichtung',
 title: 'Gefahrstoffmanagement in der Pflegeeinrichtung: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Pflege & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Pflegeheim: Desinfektion, Reiniger, Bettenöl — § 6 GefStoffV, TRGS 555 und TRGS 201 für Station und Hauswirtschaft.',
 heroText:
 'Desinfektionsmittel, Reiniger und Pflegeprodukte stehen in Station, Küche und Wäscherei. Verzeichnis, Betriebsanweisungen und Umfüll-Kennzeichnung müssen zu Schichtdienst und Hygieneplänen passen.',
 typischeStoffe: [
 'Flächen- und Händedesinfektion',
 'Säure- und alkalische Reiniger für Küche und Bad',
 'Waschmittel und Weichspüler in der Wäscherei',
 'Hautschutz und Pflegeemulsionen',
 'Desinfektionsmittel für Medizinprodukte',
 ],
 spezifischerVorteil:
 'Hygienepläne und Lieferantenwechsel erzeugen viele SDB-Updates. Digitales Verzeichnis mit Historie hilft, Betriebsanweisungen je Bereich freizugeben und Umfüllen nach TRGS 201 in Hauswirtschaft und Station nachzuhalten.',
 handwerkAbsatz:
 'In Pflegeeinrichtungen nutzen viele Berufsgruppen dieselben Lagerorte. Wenn Sprühflaschen in Stationen nicht im Verzeichnis stehen oder SDB-Updates fehlen, wird die BGW-Begehung kritisch. KI-gestützte TRGS-555-Entwürfe verkürzen die Pflege bei neuen Desinfektionslinien.',
 brancheGenitiv: 'Pflegeeinrichtung',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Pflegeeinrichtungen führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Station, Küche, Wäscherei und Technik. Betriebsanweisungen nach TRGS 555 gelten für Desinfektionsmittel und Reiniger. Umfüllen in Dosier- und Sprühflaschen erfordert Kennzeichnung nach TRGS 201. Excel-Listen mit Schichtwechsel veralten rasch. Gefahrstoff-QR verbindet SDB, Entwürfe und Exporte für SiFa und BGW.',
 typicalProducts: [
 {
 product: 'Flächendesinfektion (nimmtot)',
 gebinde: 'Kanister, Dosierflasche',
 hazardKind: 'ätzend oder entzündbar',
 workplaceDuty: 'Verzeichnis je Station, BA, Unterweisung Pflegekräfte',
 },
 {
 product: 'Sanitärreiniger (WC und Bad)',
 gebinde: 'Sprühflasche, Kanister',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Eintrag Hauswirtschaft',
 },
 {
 product: 'Geschirrspülmittel-Konzentrat (Großküche)',
 gebinde: 'Kanister 10 Liter',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'SDB archivieren, Betriebsanweisung Küche, Unterweisung',
 },
 {
 product: 'Hautschutzcreme vor Reinigungsarbeiten',
 gebinde: 'Tube, Spender',
 hazardKind: 'reizend',
 workplaceDuty: 'Verzeichnis Technik, Hinweis in Unterweisung Hauswirtschaft',
 },
 {
 product: 'Waschmittel Industriewäscherei',
 gebinde: 'Kartusche, Kanister',
 hazardKind: 'ätzend, reizend',
 workplaceDuty: 'Lagerort Wäscherei, BA am Automaten, Dokumentation',
 },
 {
 product: 'Desinfektionsmittel für Pflegebett',
 gebinde: 'Sprühflasche, Kanister',
 hazardKind: 'reizend, biozidwirksam',
 workplaceDuty: 'Eintrag Station, BA, biozidbezogene Unterweisung',
 },
 ],
 inspectionDeficiencies: [
 'Desinfektions- und Reinigungsmittel in Stationen fehlen im Gefahrstoffverzeichnis trotz täglicher Nutzung.',
 'Betriebsanweisungen für Küche und Hauswirtschaft sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Beschriftete Sprühflaschen auf den Stationen sind nicht dem Verzeichnis und keiner freigegebenen Betriebsanweisung zugeordnet.',
 ],
 berufsgenossenschaft: 'BGW',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Hauswirtschaftspflege tippt Produkte in Excel ab',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unmarkierte Flaschen auf dem Stationsschwenkwagen',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA im Schrank',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Verwaltung oder Stationsbüro',
 gqrWorkflow: 'QR am Spülschrank, Reinigungswagen oder Küche',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'SDBs aus Station, Küche und Wäscherei sammeln',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Braucht ein Pflegeheim ein Gefahrstoffverzeichnis?',
 answer:
 'Ja, sobald Gefahrstoffe eingesetzt oder gelagert werden. Desinfektionsmittel, Reiniger und Küchenchemie gelten nach § 2 GefStoffV. Das Verzeichnis nach § 6 GefStoffV muss Station, Küche und Technik abdecken. Auch kleine Häuser nutzen täglich Flächendesinfektion. Gefahrstoff-QR unterstützt Pflege und Vorprüfung durch SiFa oder Pflegedienstleitung.',
 },
 {
 question: 'Wie dokumentiere ich Umfüllen auf den Stationen?',
 answer:
 'Beim Umfüllen entsteht ein Arbeitsmittel nach TRGS 201. Es braucht Kennzeichnung mit Stoff- und Gefahrenhinweisen aus dem SDB. Das Gebinde gehört ins Gefahrstoffverzeichnis mit Stationsbezug. Eine Betriebsanweisung nach TRGS 555 wird für Reinigungsarbeiten benötigt. Gefahrstoff-QR unterstützt Entwürfe zur fachlichen Freigabe durch SiFa oder Einrichtungsleitung.',
 },
 {
 question: 'Welche BG prüft Gefahrstoffe in der Pflege?',
 answer:
 'Die Berufsgenossenschaft für Gesundheitsdienst und Wohlfahrtspflege (BGW) begutachtet chemische Arbeitsstoffe und Dokumentation in Pflegeeinrichtungen. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen stehen im Fokus. Die SiFa bereitet Begehungen vor. Exporte aus Gefahrstoff-QR erleichtern den Nachweis bei Räumediens und Schichtwechsel.',
 },
 ],
 },
 },
 'geruestbau': {
 slug: 'geruestbau',
 label: 'Gerüstbau',
 title: 'Gefahrstoffmanagement im Gerüstbau: Kataster, TRGS 555 & Lagerung',
 metaTitle: 'Gefahrstoffverzeichnis Gerüstbau & TRGS 555',
 metaDescription:
 'Gefahrstoffverzeichnis Gerüstbau: Korrosionsschutz, Schmierfett, Reiniger — § 6 GefStoffV, TRGS 555 und TRGS 201 für Lager und Montage.',
 heroText:
 'Korrosionsschutzmittel, Schmierfette und Reiniger liegen in Lager, Werkstatt und auf Montagefahrzeugen. Verzeichnis, Betriebsanweisungen und Kennzeichnung müssen zu wechselnden Bauobjekten passen.',
 typischeStoffe: [
 'Korrosionsschutzfarbe und Rostschutz',
 'Schmierfette und Öle für Gerüstverankerungen',
 'Entfetter und Maschinenreiniger',
 'Montageschaum und Baukleber',
 'Markierungsspray für Gerüstkennzeichnung',
 ],
 spezifischerVorteil:
 'Mobile Teams und Kurzzeitlager auf Baustellen erzeugen viele Kleingebinde. Digitales Verzeichnis mit SDB-Bezug hilft, Betriebsanweisungen je Montagestandort bereitzustellen und Umfüllen nach TRGS 201 am Anhänger nachzuhalten.',
 handwerkAbsatz:
 'Gerüstbauer arbeiten zwischen Lagerhalle und Gerüst. Wenn Kanister im Transporter nicht im Verzeichnis stehen oder Sprays ohne SDB-Bezug genutzt werden, wird die BG BAU-Begehung kritisch. KI-gestützte TRGS-555-Entwürfe verkürzen die Pflege bei neuen Schutzlacken.',
 brancheGenitiv: 'Gerüstbau',
 blogPostHref: '/wissen/',
 showSdbPreview: true,
 pseo: {
 aeoAnswer:
 'Gerüstbauunternehmen führen ein Gefahrstoffverzeichnis nach § 6 GefStoffV für Lager, Werkstatt und Baustelle. Betriebsanweisungen nach TRGS 555 gelten für Korrosionsschutz, Schmiermittel und Reiniger. Umfüllen in Handgebinden und Sprühflaschen erfordert Kennzeichnung nach TRGS 201. Excel-Listen je Montageort veralten nach Abbau. Gefahrstoff-QR verbindet SDB, Entwürfe und Nachweise für SiFa und BG BAU.',
 typicalProducts: [
 {
 product: 'Zinkspray für Gerüstschutz',
 gebinde: 'Spraydose, Kanister',
 hazardKind: 'entzündbar, reizend',
 workplaceDuty: 'Verzeichnis Lager, BA vor Sprüharbeit, Unterweisung Montageteam',
 },
 {
 product: 'Schmierfett für Kupplungen und Räder',
 gebinde: 'Tube, Eimer',
 hazardKind: 'reizend',
 workplaceDuty: 'Eintrag Werkstatt, Unterweisung bei Wartung',
 },
 {
 product: 'Entfetter für Anbauteile',
 gebinde: 'Spray, Kanister',
 hazardKind: 'entzündbar',
 workplaceDuty: 'Umfüllen nach TRGS 201 kennzeichnen, Verzeichnis Anhänger',
 },
 {
 product: 'Montageschaum (2K Hartschaum)',
 gebinde: 'Pistole, Kartusche',
 hazardKind: 'entzündbar, sensibilisierend',
 workplaceDuty: 'SDB archivieren, BA am Lager, Unterweisung vor Verankerung',
 },
 {
 product: 'Markierungsspray für Gerüstplanken',
 gebinde: 'Spraydose',
 hazardKind: 'entzündbar',
 workplaceDuty: 'Lagerort dokumentieren, BA auf Baustelle verfügbar',
 },
 {
 product: 'Rostumwandler vor Anstrich',
 gebinde: 'Spray, Flasche',
 hazardKind: 'ätzend oder reizend',
 workplaceDuty: 'Verzeichniseintrag Transporter, Unterweisung dokumentieren',
 },
 ],
 inspectionDeficiencies: [
 'Korrosionsschutz- und Reinigungsmittel im Transporter fehlen im Gefahrstoffverzeichnis.',
 'Betriebsanweisungen für Schmierfette und Sprays sind veraltet oder ohne aktuelles Sicherheitsdatenblatt.',
 'Spraydosen und abgefüllte Kanister auf der Baustelle sind nicht nach TRGS 201 im Verzeichnis erfasst.',
 ],
 berufsgenossenschaft: 'BG BAU',
 excelComparison: [
 {
 topic: 'Neue Lieferanten-SDBs',
 excelWorkflow: 'Montageleiter pflegt Stoffe je Objekt in Excel',
 gqrWorkflow: 'KI-gestützter Vorschlag aus dem SDB mit Freigabe durch SiFa',
 },
 {
 topic: 'Umfüllen (TRGS 201)',
 excelWorkflow: 'Unbeschriftete Flaschen im Anhänger',
 gqrWorkflow: 'Druckbares Etikett mit QR-Zugriff auf BA am Materialkasten',
 },
 {
 topic: 'Zugriff am Arbeitsplatz',
 excelWorkflow: 'Ordner in der Gerüstlagerleitung oder Bauramme',
 gqrWorkflow: 'QR am Lagerregal, Transporter oder Gerüstcontainer',
 },
 {
 topic: 'Nachweis bei BG-Begehung',
 excelWorkflow: 'Listen aus Lager und Baustellen manuell zusammenführen',
 gqrWorkflow: 'Export des Gefahrstoffverzeichnisses mit Revisionsstand',
 },
 ],
 faqItems: [
 {
 question: 'Muss Korrosionsschutz im Gefahrstoffverzeichnis stehen?',
 answer:
 'Ja, wenn Korrosions- und Rostschutzmittel eingesetzt oder gelagert werden. Sie gehören nach § 6 GefStoffV mit Menge und Lagerort ins Verzeichnis. Eine Betriebsanweisung nach TRGS 555 beschreibt Umgang in Lager und Montage. Unterweisungen für Gerüstbauer werden dokumentiert. Gefahrstoff-QR unterstützt SDB-Bezug und Vorprüfung durch SiFa oder Montageleitung.',
 },
 {
 question: 'Wie erfasse ich Hilfsstoffe im Transporter?',
 answer:
 'Mobile Gebinde werden im Verzeichnis mit Fahrzeug oder Bauauftrag verknüpft. Bei Objektwechsel muss der Eintrag aktuell bleiben. Excel je Baustelle verliert nach Abbau den Bezug. Digitale Pflege hält SDB und Betriebsanweisungen am QR-Code am Materialkasten. Umfüllen löst TRGS 201 aus und wird mitkennzeichnet.',
 },
 {
 question: 'Welche BG ist für Gerüstbau zuständig?',
 answer:
 'Die Berufsgenossenschaft der Bauwirtschaft (BG BAU) prüft Gefahrstoffdokumentation in Lager, Werkstatt und auf Montage. Ein aktuelles Verzeichnis nach § 6 GefStoffV und freigegebene Betriebsanweisungen gehören zum Standardprogramm. Die SiFa bereitet Begehungen vor. Exporte aus Gefahrstoff-QR unterstützen den Nachweis ohne Zettelwirtschaft zwischen den Gerüsten.',
 },
 ],
 },
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
