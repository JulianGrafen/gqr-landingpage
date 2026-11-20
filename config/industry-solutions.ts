import type { IndustryPseoContent } from '@/config/loesungen/types';

/**
 * Zentrale Branchen-Daten für SEO-Landingpages (DRY).
 * Inhalte faktenorientiert; rechtliche Einordnung erfolgt durch die Nutzerorganisation.
 */
import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

export const INDUSTRY_SLUGS = [
  'kfz-werkstatt',
  'schreinerei',
  'malerbetrieb',
  'laborbetrieb',
  'reinigungsunternehmen',
  'friseursalon',
  'metallbau',
  'landwirtschaft',
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
 /** Tabellen, AEO, FAQs und Vergleich (pSEO-Branchenseiten). */
 pseo?: IndustryPseoContent;
}

export const industrySolutions: Record<IndustrySlug, IndustrySolution> = {
 'kfz-werkstatt': {
 slug: 'kfz-werkstatt',
 label: 'Kfz-Werkstatt',
 title: 'Gefahrstoffmanagement für Kfz-Werkstätten',
 // Abgrenzung zu /wissen/gefahrstoffverzeichnis-muster-kfz-werkstatt/ (Muster-Intent):
 // diese Seite zielt auf „Software / Lösung“-Intent.
 metaTitle: 'Gefahrstoff-Software Kfz-Werkstatt: Kataster & QR-Codes',
 metaDescription:
 'Schluss mit Excel-Chaos in der Werkstatt: Sicherheitsdatenblätter per KI einlesen, TRGS-201-Etiketten drucken & QR-Codes an den Schrank hängen.',
 faq: [
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
 {
 question: 'Wo müssen Sicherheitsdatenblätter und Betriebsanweisungen verfügbar sein?',
 answer:
 'Beschäftigte müssen die Informationen dort erreichen, wo sie mit dem Stoff arbeiten (§ 14 GefStoffV). Ein QR-Code am Gefahrstoffschrank oder an der Hebebühne öffnet Sicherheitsdatenblatt und Betriebsanweisung auf dem Smartphone, ohne Login.',
 },
 ],
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
