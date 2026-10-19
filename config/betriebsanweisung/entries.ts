import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

/**
 * Zentrale Datenquelle für Programmatic SEO — Betriebsanweisungen.
 * Nightly-Batches: nur Felder aus `HazardousSubstanceSeoEntry` befüllen (keine PSA, LGK, H-Texte).
 */
export const HAZARDOUS_SUBSTANCE_SEO_ENTRIES = [
  {
    slug: 'aceton-trgs-555',
    substanceName: 'Aceton',
    documentDisplayName: 'Aceton (Propanon)',
    synonyms: ['Propanon', 'Dimethylketon', 'CH₃COCH₃'],
    casNumber: { kind: 'substance', value: '67-64-1' },
    ghsPictograms: ['GHS02', 'GHS07'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Malerbetrieb & Lackierung',
      'Kfz-Werkstatt',
      'Labor & Technik',
      'Reinigung & Entfettung',
    ],
    applicationAreaWorkplace:
      'Entfettung, Verdünnung und Reinigung in Werkstatt, Labor oder Produktion — der konkrete Arbeitsplatz und das verwendete Produkt sind in der freigegebenen Betriebsanweisung zu benennen.',
  },
  {
    slug: 'isopropanol-trgs-555',
    substanceName: 'Isopropanol',
    documentDisplayName: 'Isopropanol (2-Propanol)',
    synonyms: ['Isopropylalkohol', '2-Propanol', 'IPA'],
    casNumber: { kind: 'substance', value: '67-63-0' },
    ghsPictograms: ['GHS02', 'GHS07'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Elektronik & Reinraum',
      'Kfz-Werkstatt',
      'Medizinische Einrichtungen',
      'Druckerei & Industriereinigung',
    ],
    applicationAreaWorkplace:
      'Reinigung, Desinfektion und Lösungsmittel-Einsatz in technischen Betrieben — Tätigkeiten und Einsatzorte werden aus dem herstellerspezifischen SDB und der Betriebsorganisation abgeleitet.',
  },
  {
    slug: 'bremsenreiniger-trgs-555',
    substanceName: 'Bremsenreiniger',
    documentDisplayName: 'Bremsenreiniger (Kaltreiniger)',
    synonyms: ['Brake Cleaner', 'Kaltreiniger', 'chlorfreier Bremsenreiniger'],
    casNumber: {
      kind: 'mixture',
      label: 'Gemisch (aliphatische Kohlenwasserstoffe, Lösemittel)',
      mainComponentCas: '64742-49-0',
    },
    ghsPictograms: ['GHS02', 'GHS07', 'GHS08'],
    signalWord: 'Gefahr',
    typicalIndustries: ['Kfz-Werkstatt', 'Karosseriebau', 'Industrielle Instandhaltung'],
    applicationAreaWorkplace:
      'Reinigung von Bremsen und Maschinenteilen in Kfz-Werkstätten — Rezeptur und Einstufung variieren je Hersteller; maßgeblich ist das SDB Ihres Produkts.',
  },
  {
    slug: 'schwefelsaure-trgs-555',
    substanceName: 'Schwefelsäure',
    documentDisplayName: 'Schwefelsäure (wässrige Lösung)',
    synonyms: ['Sulfuric acid', 'Vitriol'],
    casNumber: { kind: 'substance', value: '7664-93-9' },
    ghsPictograms: ['GHS05', 'GHS07'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Galvanik & Oberflächentechnik',
      'Battery / Notstrom',
      'Chemische Reinigung',
      'Abwasserbehandlung',
    ],
    applicationAreaWorkplace:
      'Einsatz in Galvanik, Batteriepflege oder Prozesschemie — Konzentration und Verfahren bestimmen die Betriebsanweisung und stammen aus dem Lieferanten-SDB.',
  },
  {
    slug: 'natronlauge-trgs-555',
    substanceName: 'Natronlauge',
    documentDisplayName: 'Natronlauge (Natriumhydroxidlösung)',
    synonyms: ['Natriumhydroxidlösung', 'Ätznatron', 'NaOH-Lösung'],
    casNumber: { kind: 'substance', value: '1310-73-2' },
    ghsPictograms: ['GHS05'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Lebensmittel- & Getränkeindustrie (CIP-Reinigung)',
      'Kessel- & Anlagenreinigung',
      'Abwasser & Neutralisation',
      'Metallveredelung',
    ],
    applicationAreaWorkplace:
      'Reinigung, Neutralisation und Prozessführung — Konzentration und Arbeitsabläufe sind stoff- und standortspezifisch im SDB und in der freigegebenen Betriebsanweisung festzuhalten.',
  },
  {
    slug: 'kuehlschmierstoff-trgs-555',
    substanceName: 'Kühlschmierstoff',
    documentDisplayName: 'Kühlschmierstoff (Emulsion)',
    synonyms: ['KSS', 'Emulsion', 'Soluble Oil', 'Metallbearbeitungsflüssigkeit'],
    casNumber: {
      kind: 'mixture',
      label: 'Gemisch (Mineralöl-/Esteremulsion mit Additiven)',
      mainComponentCas: '8052-42-4',
    },
    ghsPictograms: ['GHS07', 'GHS09'],
    signalWord: 'Achtung',
    typicalIndustries: [
      'Metallbearbeitung (Drehen, Fräsen)',
      'Werkzeugbau',
      'Automobilzulieferer',
    ],
    applicationAreaWorkplace:
      'Metallbearbeitung an Maschinen mit zentralen oder dezentralen KSS-Systemen — Additivpakete und Exposition am Arbeitsplatz ergeben sich aus Hersteller-SDB und Betriebskonzept.',
  },
  {
    slug: 'adblue-trgs-555',
    substanceName: 'AdBlue',
    documentDisplayName: 'AdBlue (AUS 32)',
    synonyms: ['AUS 32', 'Harnstofflösung 32,5 %', 'DEF (Diesel Exhaust Fluid)'],
    casNumber: { kind: 'substance', value: '57-13-6' },
    ghsPictograms: ['GHS07'],
    signalWord: 'Achtung',
    typicalIndustries: [
      'Logistik & Fuhrpark',
      'Landwirtschaft',
      'Baustellenfahrzeuge',
      'Werkstatt (SCR-Systeme)',
    ],
    applicationAreaWorkplace:
      'Befüllung von SCR-Systemen in Fuhrparks und Werkstätten — Handhabung und Lagerung werden aus dem produktspezifischen SDB und den betrieblichen Abläufen abgeleitet.',
  },
  {
    slug: 'epoxidharz-trgs-555',
    substanceName: 'Epoxidharz',
    documentDisplayName: 'Epoxidharz (Komponente A, typisch)',
    synonyms: ['Epoxy', '2-Komponenten-Harz', 'Bisphenol-A-Epoxidharz (typisch)'],
    casNumber: { kind: 'substance', value: '25068-38-6' },
    ghsPictograms: ['GHS07', 'GHS08', 'GHS09'],
    signalWord: 'Achtung',
    typicalIndustries: [
      'Bodenbeschichtung',
      'Windenergie & Composites',
      'Elektrotechnik (Verguss)',
      'Modellbau & Handwerk',
    ],
    applicationAreaWorkplace:
      'Verarbeitung von 2-Komponenten-Systemen in Beschichtung und Composites — für Harz und Härter sind getrennte SDBs und eine gemeinsame Betriebsanweisung am Einsatzort erforderlich.',
  },
  {
    slug: 'wasserstoffperoxid-trgs-555',
    substanceName: 'Wasserstoffperoxid',
    documentDisplayName: 'Wasserstoffperoxid (Lösung)',
    synonyms: ['Hydrogen peroxide', 'H₂O₂', 'Peroxid-Lösung'],
    casNumber: { kind: 'substance', value: '7722-84-1' },
    ghsPictograms: ['GHS03', 'GHS05', 'GHS07'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Textil- & Papierbleiche',
      'Wasseraufbereitung',
      'Labor',
      'Desinfektion (industriell)',
    ],
    applicationAreaWorkplace:
      'Oxidations- und Desinfektionsprozesse — die Konzentration im Handelsprodukt bestimmt Einstufung und Maßnahmen und ist im SDB Ihres Lieferanten dokumentiert.',
  },
  {
    slug: 'dieselkraftstoff-trgs-555',
    substanceName: 'Dieselkraftstoff',
    documentDisplayName: 'Dieselkraftstoff (EN 590)',
    synonyms: ['Diesel', 'EN 590', 'Gasöl'],
    casNumber: {
      kind: 'mixture',
      label: 'Gemisch (Kohlenwasserstoffe, Dieselkraftstoff)',
      mainComponentCas: '68334-30-5',
    },
    ghsPictograms: ['GHS02', 'GHS07', 'GHS08', 'GHS09'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Fuhrpark & Logistik',
      'Bauwirtschaft',
      'Landwirtschaft',
      'Notstromaggregate',
    ],
    applicationAreaWorkplace:
      'Tanken, Umfüllen und Lagerung in Betriebsstätten — Bio-Anteile und Additive können die Einstufung ändern; maßgeblich ist das SDB des bezogenen Kraftstoffs.',
  },
  {
    slug: 'sanitaerreiniger-trgs-555',
    substanceName: 'Sanitärreiniger',
    documentDisplayName: 'Sanitärreiniger (salzsäurehaltig, typisch)',
    synonyms: ['Badreiniger', 'WC-Reiniger', 'Salzsäurehaltiger Reiniger'],
    casNumber: {
      kind: 'mixture',
      label: 'Gemisch (salzsäurehaltiger Reiniger, typ. 10–15 % HCl)',
      mainComponentCas: '7647-01-0',
    },
    ghsPictograms: ['GHS05', 'GHS07'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Gebäudereinigung',
      'Facility Management',
      'Hotel & Gastronomie',
      'Hausmeisterdienste',
    ],
    applicationAreaWorkplace:
      'Reinigung von Sanitärräumen im Gebäudeservice — surfaktanmodifizierte Produkte weichen oft ab; Betriebsanweisung und Unterweisung beziehen sich auf das konkrete Handelsprodukt.',
  },
] as const satisfies readonly HazardousSubstanceSeoEntry[];

export type HazardousSubstanceSlug = (typeof HAZARDOUS_SUBSTANCE_SEO_ENTRIES)[number]['slug'];

export const HAZARDOUS_SUBSTANCE_SLUGS = HAZARDOUS_SUBSTANCE_SEO_ENTRIES.map(
  (entry) => entry.slug,
) as HazardousSubstanceSlug[];
