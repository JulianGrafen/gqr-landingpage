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
  {
    slug: 'ethanol-trgs-555',
    substanceName: 'Ethanol',
    documentDisplayName: 'Ethanol (Ethylalkohol)',
    synonyms: ['Ethylalkohol', 'Alkohol', 'EtOH', 'Spiritus (industriell)'],
    casNumber: { kind: 'substance', value: '64-17-5' },
    ghsPictograms: ['GHS02'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Pharma & Kosmetik',
      'Druckerei & Verpackung',
      'Labor',
      'Handwerk (Lösungsmittel)',
    ],
    applicationAreaWorkplace:
      'Lösungsmittel, Reinigung und Prozessführung in Produktion und Werkstatt — Konzentration und Produktform (Technisch, Denaturiert) bestimmen die Betriebsanweisung und sind im SDB ausgewiesen.',
  },
  {
    slug: 'methanol-trgs-555',
    substanceName: 'Methanol',
    documentDisplayName: 'Methanol (Methylalkohol)',
    synonyms: ['Methylalkohol', 'Holzspiritus', 'CH₃OH'],
    casNumber: { kind: 'substance', value: '67-56-1' },
    ghsPictograms: ['GHS02', 'GHS06', 'GHS08'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Chemische Industrie',
      'Labor',
      'Kunststoffverarbeitung',
      'Werkstatt (Speziallösungsmittel)',
    ],
    applicationAreaWorkplace:
      'Technisches Lösungsmittel und Prozessrohstoff — Einsatzorte und Tätigkeiten werden aus dem herstellerspezifischen SDB und der Betriebsorganisation abgeleitet.',
  },
  {
    slug: 'salzsaeure-trgs-555',
    substanceName: 'Salzsäure',
    documentDisplayName: 'Salzsäure (wässrige Lösung)',
    synonyms: ['Chlorwasserstoffsäure', 'Hydrochloric acid', 'HCl-Lösung'],
    casNumber: { kind: 'substance', value: '7647-01-0' },
    ghsPictograms: ['GHS05', 'GHS07'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Metallverarbeitung & Galvanik',
      'Stein- & Fliesenlegerei',
      'Abwasser & Neutralisation',
      'Lebensmitteltechnik (CIP, wo zutreffend)',
    ],
    applicationAreaWorkplace:
      'Beizen, Reinigung und Neutralisation in Betrieben — Konzentration und Verfahren sind im Lieferanten-SDB dokumentiert und in der freigegebenen Betriebsanweisung festzuhalten.',
  },
  {
    slug: 'natriumhypochlorit-trgs-555',
    substanceName: 'Natriumhypochlorit',
    documentDisplayName: 'Natriumhypochlorit (Lösung)',
    synonyms: ['Natriumhypochloritlösung', 'Bleichlauge', 'Active Chlor-Lösung'],
    casNumber: { kind: 'substance', value: '7681-52-9' },
    ghsPictograms: ['GHS05', 'GHS09'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Gebäudereinigung & Facility',
      'Schwimmbad & Wasseraufbereitung',
      'Lebensmittelindustrie (Desinfektion)',
      'Kommunale Entsorgung',
    ],
    applicationAreaWorkplace:
      'Desinfektion und Bleiche in Reinigung und Prozessen — Gehalt an aktivem Chlor und Zusatzstoffe variieren je Produkt; maßgeblich ist das SDB Ihres Lieferanten.',
  },
  {
    slug: 'essigsaeure-trgs-555',
    substanceName: 'Essigsäure',
    documentDisplayName: 'Essigsäure (wässrige Lösung)',
    synonyms: ['Acetic acid', 'Ethansäure', 'CH₃COOH'],
    casNumber: { kind: 'substance', value: '64-19-7' },
    ghsPictograms: ['GHS02', 'GHS05'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Lebensmittelverarbeitung',
      'Textil & Galvanik',
      'Labor',
      'Reinigungsmittelherstellung',
    ],
    applicationAreaWorkplace:
      'Prozesschemie, Reinigung und Konservierung — Konzentration (Essigessenz vs. Verdünnung) bestimmt Einstufung und Vorgaben im produktspezifischen SDB.',
  },
  {
    slug: 'toluol-trgs-555',
    substanceName: 'Toluol',
    documentDisplayName: 'Toluol (Methylbenzol)',
    synonyms: ['Toluene', 'Methylbenzol', 'C₇H₈'],
    casNumber: { kind: 'substance', value: '108-88-3' },
    ghsPictograms: ['GHS02', 'GHS07', 'GHS08'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Malerbetrieb & Lackierung',
      'Druckerei',
      'Chemische Industrie',
      'Klebstoff- & Dichtstoffverarbeitung',
    ],
    applicationAreaWorkplace:
      'Lösungsmittel in Beschichtung, Druck und Klebtechnik — Arbeitsplätze und Verfahren werden aus SDB und Betriebskonzept für den jeweiligen Einsatz abgeleitet.',
  },
  {
    slug: 'ethylenglykol-trgs-555',
    substanceName: 'Ethylenglykol',
    documentDisplayName: 'Ethylenglykol (1,2-Ethanediol)',
    synonyms: ['Ethandiol', 'Glykol', 'MEG (typisch)'],
    casNumber: { kind: 'substance', value: '107-21-1' },
    ghsPictograms: ['GHS07'],
    signalWord: 'Achtung',
    typicalIndustries: [
      'Kfz-Werkstatt & Fuhrpark',
      'Heizungs- & Klimatechnik',
      'Industrielle Kühlkreisläufe',
      'Luftfahrt & Sonderfahrzeuge',
    ],
    applicationAreaWorkplace:
      'Frostschutz- und Kühlflüssigkeiten in Anlagen und Fahrzeugen — Additivpakete und Konzentration sind produktspezifisch im SDB beschrieben.',
  },
  {
    slug: 'ammoniakloesung-trgs-555',
    substanceName: 'Ammoniaklösung',
    documentDisplayName: 'Ammoniaklösung (wässrig)',
    synonyms: ['Ammoniak wässrig', 'Ammoniumhydroxid-Lösung', 'NH₃-Lösung'],
    casNumber: { kind: 'substance', value: '1336-21-6' },
    ghsPictograms: ['GHS05', 'GHS09'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Kälte- & Klimatechnik',
      'Reinigung & Industrie',
      'Landwirtschaft',
      'Wasser- & Abwassertechnik',
    ],
    applicationAreaWorkplace:
      'Reinigung, Kühlung und Prozesschemie — Ammoniakgehalt und Temperaturführung sind im SDB des Handelsprodukts festgelegt und für die Betriebsanweisung zu übernehmen.',
  },
  {
    slug: 'phosphorsaeure-trgs-555',
    substanceName: 'Phosphorsäure',
    documentDisplayName: 'Phosphorsäure (ortho-Phosphorsäure)',
    synonyms: ['Orthophosphorsäure', 'Phosphoric acid', 'H₃PO₄'],
    casNumber: { kind: 'substance', value: '7664-38-2' },
    ghsPictograms: ['GHS05'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Metalloberflächentechnik',
      'Lebensmittel & Getränke',
      'Düngemittel & Agrarchemie',
      'Reinigungsmittelherstellung',
    ],
    applicationAreaWorkplace:
      'Beizen, Enthärtung und Prozessführung — Konzentration und Rezeptur sind produktspezifisch im Lieferanten-SDB beschrieben.',
  },
  {
    slug: 'testbenzin-trgs-555',
    substanceName: 'Testbenzin',
    documentDisplayName: 'Testbenzin (White Spirit, typisch)',
    synonyms: ['White Spirit', 'Terpenfreies Testbenzin', 'Petroleum (technisch)'],
    casNumber: {
      kind: 'mixture',
      label: 'Gemisch (aliphatische Kohlenwasserstoffe C9–C12, White-Spirit-Typ)',
      mainComponentCas: '64742-82-1',
    },
    ghsPictograms: ['GHS02', 'GHS07', 'GHS08', 'GHS09'],
    signalWord: 'Gefahr',
    typicalIndustries: [
      'Malerbetrieb & Lackierung',
      'Holzverarbeitung',
      'Druckerei',
      'Industrielle Reinigung',
    ],
    applicationAreaWorkplace:
      'Verdünnung, Reinigung und Entfettung in Werkstatt und Produktion — CAS-Bezeichnungen und Aromatenanteile unterscheiden sich je Lieferant; maßgeblich ist das SDB Ihres Testbenzins.',
  },
] as const satisfies readonly HazardousSubstanceSeoEntry[];

export type HazardousSubstanceSlug = (typeof HAZARDOUS_SUBSTANCE_SEO_ENTRIES)[number]['slug'];

export const HAZARDOUS_SUBSTANCE_SLUGS = HAZARDOUS_SUBSTANCE_SEO_ENTRIES.map(
  (entry) => entry.slug,
) as HazardousSubstanceSlug[];
