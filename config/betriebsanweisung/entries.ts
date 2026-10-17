import { BETRIEBSANWEISUNG_EXPERT_EXTENSIONS } from '@/config/betriebsanweisung/expert-extensions';
import type { BetriebsanweisungExpertExtension } from '@/config/betriebsanweisung/expert-extensions';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

type HazardousSubstanceBaseEntry = Omit<HazardousSubstanceSeoEntry, keyof BetriebsanweisungExpertExtension>;

/**
 * Zentrale Datenquelle für Programmatic SEO — Betriebsanweisungen.
 * Neue Stoffe am Ende anfügen; `npm run validate:betriebsanweisung` vor dem Commit.
 */
const BASE_HAZARDOUS_SUBSTANCE_SEO_ENTRIES = [
  {
    slug: 'aceton-trgs-555',
    substanceName: 'Aceton',
    synonyms: ['Propanon', 'Dimethylketon', 'CH₃COCH₃'],
    casNumber: { kind: 'substance', value: '67-64-1' },
    ghsPictograms: ['GHS02', 'GHS07'],
    signalWord: 'Gefahr',
    typicalHStatements: [
      { code: 'H225', text: 'Flüssigkeit und Dampf leicht entzündbar.' },
      { code: 'H319', text: 'Verursacht schwere Augenreizung.' },
      { code: 'H336', text: 'Kann Schläfrigkeit und Benommenheit verursachen.' },
    ],
    typicalIndustries: [
      'Malerbetrieb & Lackierung',
      'Kfz-Werkstatt',
      'Labor & Technik',
      'Reinigung & Entfettung',
    ],
    specificPpeAdvice:
      'Chemikalien-Schutzbrille und dichte Schutzhandschuhe: Butylkautschuk, Schichtdicke ≥ 0,7 mm (Durchbruchzeit beachten). Nitril ist bei Aceton in der Regel ungeeignet. Bei Dämpfen: Atemschutzfilter A (organische Dämpfe).',
    typicalPpeMistake:
      'Standard-Nitrilhandschuhe (0,1–0,2 mm) beim Umfüllen — Aceton durchdringt Nitril sehr schnell; außerdem fehlende Augenschutzbrille bei Spritzern.',
    storageClassTrgs510: 'LGK 3 – Entzündbare Flüssigkeiten',
    classificationBasis:
      'Harmonisierte Einstufung (CLP Anhang VI) für reines Aceton; abweichende Gemische oder Reinheitsgrade nur über das Hersteller-SDB.',
  },
  {
    slug: 'isopropanol-trgs-555',
    substanceName: 'Isopropanol',
    synonyms: ['Isopropylalkohol', '2-Propanol', 'IPA'],
    casNumber: { kind: 'substance', value: '67-63-0' },
    ghsPictograms: ['GHS02', 'GHS07'],
    signalWord: 'Gefahr',
    typicalHStatements: [
      { code: 'H225', text: 'Flüssigkeit und Dampf leicht entzündbar.' },
      { code: 'H319', text: 'Verursacht schwere Augenreizung.' },
      { code: 'H336', text: 'Kann Schläfrigkeit und Benommenheit verursachen.' },
    ],
    typicalIndustries: [
      'Elektronik & Reinraum',
      'Kfz-Werkstatt',
      'Medizinische Einrichtungen',
      'Druckerei & Industriereinigung',
    ],
    specificPpeAdvice:
      'Schutzbrille, chemikalienbeständige Handschuhe (Butyl ≥ 0,5 mm oder mehrlagiges Nitril nur bei kurzem Kontakt). Bei Nebel/Dämpfen: Atemschutz A. Hautbarriere bei häufigem Kontakt.',
    typicalPpeMistake:
      'Dünne Latex- oder Vinylhandschuhe bei größeren Mengen — IPA durchdringt viele Materialien; Desinfektionsroutine ohne Augenschutz.',
    storageClassTrgs510: 'LGK 3 – Entzündbare Flüssigkeiten',
    classificationBasis: 'Harmonisierte CLP-Einstufung für reines Isopropanol (technische Qualität).',
  },
  {
    slug: 'bremsenreiniger-trgs-555',
    substanceName: 'Bremsenreiniger',
    synonyms: ['Brake Cleaner', 'Kaltreiniger', 'chlorfreier Bremsenreiniger'],
    casNumber: {
      kind: 'mixture',
      label: 'Gemisch (aliphatische Kohlenwasserstoffe, Lösemittel)',
      mainComponentCas: '64742-49-0',
    },
    ghsPictograms: ['GHS02', 'GHS07', 'GHS08'],
    signalWord: 'Gefahr',
    typicalHStatements: [
      { code: 'H225', text: 'Flüssigkeit und Dampf leicht entzündbar.' },
      { code: 'H304', text: 'Kann bei Verschlucken und Eindringen in die Atemwege tödlich sein.' },
      { code: 'H336', text: 'Kann Schläfrigkeit und Benommenheit verursachen.' },
      { code: 'EUH066', text: 'Wiederholter Kontakt kann zu spröder oder rissiger Haut führen.' },
    ],
    typicalIndustries: ['Kfz-Werkstatt', 'Karosseriebau', 'Industrielle Instandhaltung'],
    specificPpeAdvice:
      'Chemikalien-Schutzbrille, dichte Handschuhe (Butyl/Viton ≥ 0,7 mm). Sprühnebel vermeiden; bei Aerosol-Anwendung Atemschutz A/P2. Kein Essen/Trinken in der Sprühzone.',
    typicalPpeMistake:
      'Sprühen ohne Atemschutz in der Grube; Baumwoll-/Nitril-Handschuhe ohne Durchbruchzeit-Prüfung; Hautentfettung ohne Hautschutzplan.',
    storageClassTrgs510: 'LGK 3 – Entzündbare Flüssigkeiten',
    classificationBasis:
      'Typische Einstufung chlorfreier Bremsenreiniger auf Kohlenwasserstoffbasis — Rezeptur und H-Sätze variieren je Hersteller (Aceton/Toluol-Anteile).',
  },
  {
    slug: 'schwefelsaure-trgs-555',
    substanceName: 'Schwefelsäure',
    synonyms: ['Sulfuric acid', 'Vitriol'],
    casNumber: { kind: 'substance', value: '7664-93-9' },
    ghsPictograms: ['GHS05', 'GHS07'],
    signalWord: 'Gefahr',
    typicalHStatements: [
      { code: 'H290', text: 'Kann gegenüber Metallen korrosiv sein.' },
      { code: 'H314', text: 'Verursacht schwere Verätzungen der Haut und schwere Augenschäden.' },
    ],
    typicalIndustries: [
      'Galvanik & Oberflächentechnik',
      'Battery / Notstrom',
      'Chemische Reinigung',
      'Abwasserbehandlung',
    ],
    specificPpeAdvice:
      'Säurefeste Schutzbrille/Gesichtsschutz, Chemikalienschutzanzug oder -schürze, Handschuhe Viton/Butyl/Neopren (≥ 0,7 mm). NOT-NOT-Dusche und Augenspülung in Reichweite.',
    typicalPpeMistake:
      'Nitril- oder Latexhandschuhe bei konzentrierter Säure; Umfüllen ohne Gesichtsschutz; Metallbehälter ohne Korrosionsschutz.',
    storageClassTrgs510: 'LGK 1 – Säuren (TRGS 510)',
    classificationBasis:
      'Beispiel-Einstufung für wässrige Lösung ca. 40–50 % (H314). Höhere Konzentrationen (≥ 70 %) bleiben ätzend; unter 25 % kann die Einstufung abweichen — Konzentration im SDB prüfen.',
  },
  {
    slug: 'natronlauge-trgs-555',
    substanceName: 'Natronlauge',
    synonyms: ['Natriumhydroxidlösung', 'Ätznatron', 'NaOH-Lösung'],
    casNumber: { kind: 'substance', value: '1310-73-2' },
    ghsPictograms: ['GHS05'],
    signalWord: 'Gefahr',
    typicalHStatements: [
      { code: 'H314', text: 'Verursacht schwere Verätzungen der Haut und schwere Augenschäden.' },
    ],
    typicalIndustries: [
      'Lebensmittel- & Getränkeindustrie (CIP-Reinigung)',
      'Kessel- & Anlagenreinigung',
      'Abwasser & Neutralisation',
      'Metallveredelung',
    ],
    specificPpeAdvice:
      'Gesichtsschutz und Schutzbrille, säure-/laugenfeste Handschuhe (Butyl, Viton, PVC ≥ 0,7 mm), Schürze. Kein Aluminium als Behältermaterial.',
    typicalPpeMistake:
      'Haushaltsreinigungshandschuhe aus dünner Latexfolie; Spritzer beim Umfüllen ohne Gesichtsschutz; Mischen mit Säuren (Exothermie).',
    storageClassTrgs510: 'LGK 8B – Nicht brennbare ätzende Gefahrstoffe',
    classificationBasis:
      'Beispiel für wässrige Natronlauge ca. 20 % (H314). Ab ca. 5 % können ätzende Einstufungen gelten; niedrigere Konzentrationen oft nur reizend (H315/H319).',
  },
  {
    slug: 'kuehlschmierstoff-trgs-555',
    substanceName: 'Kühlschmierstoff',
    synonyms: ['KSS', 'Emulsion', 'Soluble Oil', 'Metallbearbeitungsflüssigkeit'],
    casNumber: {
      kind: 'mixture',
      label: 'Gemisch (Mineralöl-/Esteremulsion mit Additiven)',
      mainComponentCas: '8052-42-4',
    },
    ghsPictograms: ['GHS07', 'GHS09'],
    signalWord: 'Achtung',
    typicalHStatements: [
      { code: 'H317', text: 'Kann allergische Hautreaktionen verursachen.' },
      { code: 'H411', text: 'Giftig für Wasserorganismen, mit langfristiger Wirkung.' },
    ],
    typicalIndustries: [
      'Metallbearbeitung (Drehen, Fräsen)',
      'Werkzeugbau',
      'Automobilzulieferer',
    ],
    specificPpeAdvice:
      'Nitril- oder Viton-Handschuhe (≥ 0,4 mm) bei Hautkontakt, Schutzbrille gegen Spritzer, langärmlige Arbeitskleidung. Bei Aerosol/Nebel: Atemschutz nach SDB. Hautschutzplan bei wiederholtem Kontakt.',
    typicalPpeMistake:
      'Barhändig bei Filterwechsel am Zentralbecken; keine Reinigung verschütteter Emulsionen; vernachlässigte TRGS 611-Messung bei Sprühnebel.',
    storageClassTrgs510: 'LGK 12 – Nicht brennbare Flüssigkeiten',
    classificationBasis:
      'Typische wassermischbare KSS mit biociden/aminhaltigen Additiven — Sensibilisierung (H317) und Umweltgefährdung häufig; mineralölfreie Varianten können abweichen.',
  },
  {
    slug: 'adblue-trgs-555',
    substanceName: 'AdBlue',
    synonyms: ['AUS 32', 'Harnstofflösung 32,5 %', 'DEF (Diesel Exhaust Fluid)'],
    casNumber: { kind: 'substance', value: '57-13-6' },
    ghsPictograms: ['GHS07'],
    signalWord: 'Achtung',
    typicalHStatements: [
      { code: 'H319', text: 'Verursacht schwere Augenreizung.' },
      { code: 'H335', text: 'Kann die Atemwege reizen.' },
    ],
    typicalIndustries: [
      'Logistik & Fuhrpark',
      'Landwirtschaft',
      'Baustellenfahrzeuge',
      'Werkstatt (SCR-Systeme)',
    ],
    specificPpeAdvice:
      'Schutzbrille bei Umfüllen/Spritzen, chemikalienbeständige Handschuhe (Nitril ≥ 0,3 mm), bei Staub/Aerosol leichter Atemschutz. Kontaktflächen trocken halten (kristallisiert).',
    typicalPpeMistake:
      'Umfüllen ohne Augenschutz; AdBlue in Diesel tanken (Fahrzeugschaden) — Prozessfehler, nicht PSA, aber häufige Praxis.',
    storageClassTrgs510: 'LGK 12 – Nicht brennbare Flüssigkeiten',
    classificationBasis:
      'Typische Einstufung für AUS 32 (32,5 % Harnstoff in Wasser) nach gängigen SDBs; Reinheit nach ISO 22241 beachten.',
  },
  {
    slug: 'epoxidharz-trgs-555',
    substanceName: 'Epoxidharz',
    synonyms: ['Epoxy', '2-Komponenten-Harz', 'Bisphenol-A-Epoxidharz (typisch)'],
    casNumber: { kind: 'substance', value: '25068-38-6' },
    ghsPictograms: ['GHS07', 'GHS08', 'GHS09'],
    signalWord: 'Achtung',
    typicalHStatements: [
      { code: 'H317', text: 'Kann allergische Hautreaktionen verursachen.' },
      { code: 'H319', text: 'Verursacht schwere Augenreizung.' },
      { code: 'H411', text: 'Giftig für Wasserorganismen, mit langfristiger Wirkung.' },
    ],
    typicalIndustries: [
      'Bodenbeschichtung',
      'Windenergie & Composites',
      'Elektrotechnik (Verguss)',
      'Modellbau & Handwerk',
    ],
    specificPpeAdvice:
      'Nitril- oder Viton-Handschuhe (≥ 0,4 mm), Schutzbrille, ggf. Vollschutz bei größeren Flächen. Härter (Komponente B) separat laut SDB — oft sensibilisierend. Hautbarriere und Hautschutzplan.',
    typicalPpeMistake:
      'Harz mit bloßen Händen verarbeiten (Sensibilisierung); mangelnde Belüftung beim Härten; gleiche Handschuhe für Harz und Härter.',
    storageClassTrgs510: 'LGK 10 – Nicht brennbare Flüssigkeiten (TRGS 510)',
    classificationBasis:
      'Beispiel für ungehärtetes Bisphenol-A-basiertes Epoxidharz (Komponente A); 2K-Systeme erfordern immer SDB für beide Komponenten.',
  },
  {
    slug: 'wasserstoffperoxid-trgs-555',
    substanceName: 'Wasserstoffperoxid',
    synonyms: ['Hydrogen peroxide', 'H₂O₂', 'Peroxid-Lösung'],
    casNumber: { kind: 'substance', value: '7722-84-1' },
    ghsPictograms: ['GHS03', 'GHS05', 'GHS07'],
    signalWord: 'Gefahr',
    typicalHStatements: [
      { code: 'H271', text: 'Kann Brand oder Explosion verursachen; stark oxidierend.' },
      { code: 'H314', text: 'Verursacht schwere Verätzungen der Haut und schwere Augenschäden.' },
      { code: 'H335', text: 'Kann die Atemwege reizen.' },
    ],
    typicalIndustries: [
      'Textil- & Papierbleiche',
      'Wasseraufbereitung',
      'Labor',
      'Desinfektion (industriell)',
    ],
    specificPpeAdvice:
      'Gesichtsschutz, chemikalienfeste Handschuhe (Butyl/Neopren ≥ 0,7 mm), Schutzanzug. Keine organischen Materialien (Holz, Papier, Öle) in Kontakt. Atemschutz bei Nebel.',
    typicalPpeMistake:
      'Mischen mit Säuren oder organischen Stoffen; Lagerung neben Brennmaterial; Umfüllen ohne Gesichtsschutz bei ≥ 30 % Lösungen.',
    storageClassTrgs510: 'LGK 5.1B – Nicht brennbare oxidierende Gefahrstoffe',
    classificationBasis:
      'Beispiel für wässrige Lösung ca. 35 % (H271, H314). Handelsübliches „3-%-Wasserstoffperoxid“ ist deutlich schwächer eingestuft — Konzentration im SDB prüfen.',
  },
  {
    slug: 'dieselkraftstoff-trgs-555',
    substanceName: 'Dieselkraftstoff',
    synonyms: ['Diesel', 'EN 590', 'Gasöl'],
    casNumber: {
      kind: 'mixture',
      label: 'Gemisch (Kohlenwasserstoffe, Dieselkraftstoff)',
      mainComponentCas: '68334-30-5',
    },
    ghsPictograms: ['GHS02', 'GHS07', 'GHS08', 'GHS09'],
    signalWord: 'Gefahr',
    typicalHStatements: [
      { code: 'H226', text: 'Flüssigkeit und Dampf entzündbar.' },
      { code: 'H304', text: 'Kann bei Verschlucken und Eindringen in die Atemwege tödlich sein.' },
      { code: 'H411', text: 'Giftig für Wasserorganismen, mit langfristiger Wirkung.' },
      { code: 'EUH066', text: 'Wiederholter Kontakt kann zu spröder oder rissiger Haut führen.' },
    ],
    typicalIndustries: [
      'Fuhrpark & Logistik',
      'Bauwirtschaft',
      'Landwirtschaft',
      'Notstromaggregate',
    ],
    specificPpeAdvice:
      'Beim Umfüllen: Schutzbrille, chemikalienbeständige Handschuhe (Nitril ≥ 0,4 mm), antistatische Kleidung, Dampf nicht einatmen. Kein Essen/Trinken/Rauchen an der Zapfstelle.',
    typicalPpeMistake:
      'Tanken ohne Handschuhe; Diesel in PET-Flaschen lagern; verschüttetes Material mit Wasser in Kanalisation spülen.',
    storageClassTrgs510: 'LGK 3 – Entzündbare Flüssigkeiten',
    classificationBasis:
      'Typische CLP-Einstufung für Dieselkraftstoff (EN 590) — Bio-Anteile (FAME) können Zusatz-H-Sätze bringen.',
  },
  {
    slug: 'sanitaerreiniger-trgs-555',
    substanceName: 'Sanitärreiniger',
    synonyms: ['Badreiniger', 'WC-Reiniger', 'Salzsäurehaltiger Reiniger'],
    casNumber: {
      kind: 'mixture',
      label: 'Gemisch (salzsäurehaltiger Reiniger, typ. 10–15 % HCl)',
      mainComponentCas: '7647-01-0',
    },
    ghsPictograms: ['GHS05', 'GHS07'],
    signalWord: 'Gefahr',
    typicalHStatements: [
      { code: 'H290', text: 'Kann gegenüber Metallen korrosiv sein.' },
      { code: 'H314', text: 'Verursacht schwere Verätzungen der Haut und schwere Augenschäden.' },
      { code: 'H335', text: 'Kann die Atemwege reizen.' },
    ],
    typicalIndustries: [
      'Gebäudereinigung',
      'Facility Management',
      'Hotel & Gastronomie',
      'Hausmeisterdienste',
    ],
    specificPpeAdvice:
      'Schutzbrille/Gesichtsschutz, säurefeste Handschuhe (Butyl, Viton, Neopren ≥ 0,7 mm), gute Lüftung. Nie mit Bleichmitteln (Natriumhypochlorit) mischen — Chlorgas!',
    typicalPpeMistake:
      'Reinigen ohne Handschuhe in engen Bädern; Mischen mit Natriumhypochlorit; Sprüher auf Augenhöhe ohne Schutzbrille.',
    storageClassTrgs510: 'LGK 8B – Nicht brennbare ätzende Gefahrstoffe',
    classificationBasis:
      'Typischer salzsäurehaltiger Sanitärreiniger ca. 10–15 % HCl — surfaktanmodifizierte Produkte können abweichen; immer Hersteller-SDB verwenden.',
  },
] as const satisfies readonly HazardousSubstanceBaseEntry[];

export type HazardousSubstanceSlug = (typeof BASE_HAZARDOUS_SUBSTANCE_SEO_ENTRIES)[number]['slug'];

export const HAZARDOUS_SUBSTANCE_SEO_ENTRIES: HazardousSubstanceSeoEntry[] =
  BASE_HAZARDOUS_SUBSTANCE_SEO_ENTRIES.map((entry) => ({
    ...entry,
    ...BETRIEBSANWEISUNG_EXPERT_EXTENSIONS[entry.slug],
  }));

export const HAZARDOUS_SUBSTANCE_SLUGS = HAZARDOUS_SUBSTANCE_SEO_ENTRIES.map(
  (entry) => entry.slug,
) as HazardousSubstanceSlug[];
