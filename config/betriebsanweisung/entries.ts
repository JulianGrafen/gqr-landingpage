import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

/**
 * Zentrale Datenquelle für Programmatic SEO — Betriebsanweisungen.
 * Öffentlich nur Stoffname + Meta — keine CAS, GHS, H/P oder Einstufungsdaten.
 */
export const HAZARDOUS_SUBSTANCE_SEO_ENTRIES = [
  {
    slug: 'aceton-trgs-555',
    substanceName: "Aceton",
    metaDescription: "Betriebsanweisung Aceton: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Malerbetrieb & Lackierung",
      "Kfz-Werkstatt",
      "Labor & Technik",
      "Reinigung & Entfettung",
    ],
  },
  {
    slug: 'acetylen-trgs-555',
    substanceName: "Acetylen",
    metaDescription: "Betriebsanweisung Acetylen: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Metallbau & Schweißtechnik",
      "Rohrleitungsbau",
      "Kfz-Instandhaltung",
      "Industrielle Instandhaltung",
    ],
  },
  {
    slug: 'adblue-trgs-555',
    substanceName: "AdBlue",
    metaDescription: "Betriebsanweisung AdBlue: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Logistik & Fuhrpark",
      "Landwirtschaft",
      "Baustellenfahrzeuge",
      "Werkstatt (SCR-Systeme)",
    ],
  },
  {
    slug: 'ammoniakloesung-trgs-555',
    substanceName: "Ammoniaklösung",
    metaDescription: "Betriebsanweisung Ammoniaklösung: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Kälte- & Klimatechnik",
      "Reinigung & Industrie",
      "Landwirtschaft",
      "Wasser- & Abwassertechnik",
    ],
  },
  {
    slug: 'argon-trgs-555',
    substanceName: "Argon",
    metaDescription: "Betriebsanweisung Argon: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Metallbau & Schweißtechnik",
      "Edelstahlverarbeitung",
      "Kfz-Karosseriebau",
      "Industrielle Instandhaltung",
    ],
  },
  {
    slug: 'benzin-trgs-555',
    substanceName: "Benzin",
    metaDescription: "Betriebsanweisung Benzin: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Kfz-Werkstatt & Classic Cars",
      "Forst- & Gartengeräte",
      "Motorsport & Wassersport",
      "Baustellenfahrzeuge (kleine Motoren)",
    ],
  },
  {
    slug: 'bremsenreiniger-trgs-555',
    substanceName: "Bremsenreiniger",
    metaDescription: "Betriebsanweisung Bremsenreiniger: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Kfz-Werkstatt",
      "Karosseriebau",
      "Industrielle Instandhaltung",
    ],
  },
  {
    slug: 'butan-trgs-555',
    substanceName: "Butan",
    metaDescription: "Betriebsanweisung Butan: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Sanitär- & Heizungsbau",
      "Gastronomie & Außengastronomie",
      "Camping- & Freizeithandel",
      "Dachdecker & Klempner",
    ],
  },
  {
    slug: 'butanol-trgs-555',
    substanceName: "1-Butanol",
    metaDescription: "Betriebsanweisung 1-Butanol: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Lackierung & Beschichtung",
      "Druckfarben & Flexodruck",
      "Chemische Produktion",
      "Labor & Technik",
    ],
  },
  {
    slug: 'butylacetat-trgs-555',
    substanceName: "Butylacetat",
    metaDescription: "Betriebsanweisung Butylacetat: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Lackierung & Beschichtung",
      "Druckfarben & Flexodruck",
      "Klebstoffverarbeitung",
      "Malerbetrieb",
    ],
  },
  {
    slug: 'butylglykol-trgs-555',
    substanceName: "Butylglykol",
    metaDescription: "Betriebsanweisung Butylglykol: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Gebäudereinigung & Facility",
      "Lackierung & Beschichtung",
      "Druckerei",
      "Industrielle Reinigung",
    ],
  },
  {
    slug: 'cyclohexan-trgs-555',
    substanceName: "Cyclohexan",
    metaDescription: "Betriebsanweisung Cyclohexan: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Chemische Produktion",
      "Lackierung & Klebstoffe",
      "Labor & Analytik",
      "Industrielle Lösungsmitteleinsätze",
    ],
  },
  {
    slug: 'dichlormethan-trgs-555',
    substanceName: "Dichlormethan",
    metaDescription: "Betriebsanweisung Dichlormethan: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Malerbetrieb (Altlackentfernung)",
      "Metallverarbeitung & Entfettung",
      "Pharma- & Chemieproduktion",
      "Kunststoffverarbeitung",
    ],
  },
  {
    slug: 'dieselkraftstoff-trgs-555',
    substanceName: "Dieselkraftstoff",
    metaDescription: "Betriebsanweisung Dieselkraftstoff: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Fuhrpark & Logistik",
      "Bauwirtschaft",
      "Landwirtschaft",
      "Notstromaggregate",
    ],
  },
  {
    slug: 'diphenylmethandiisocyanat-trgs-555',
    substanceName: "Diphenylmethandiisocyanat",
    metaDescription: "Betriebsanweisung Diphenylmethandiisocyanat: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Bausanierung & Dämmung",
      "Metallbau (PU-Klebstoffe)",
      "Fahrzeugbau",
      "Möbel- & Holzverarbeitung",
    ],
  },
  {
    slug: 'epoxidharz-trgs-555',
    substanceName: "Epoxidharz",
    metaDescription: "Betriebsanweisung Epoxidharz: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Bodenbeschichtung",
      "Windenergie & Composites",
      "Elektrotechnik (Verguss)",
      "Modellbau & Handwerk",
    ],
  },
  {
    slug: 'essigsaeure-trgs-555',
    substanceName: "Essigsäure",
    metaDescription: "Betriebsanweisung Essigsäure: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Lebensmittelverarbeitung",
      "Textil & Galvanik",
      "Labor",
      "Reinigungsmittelherstellung",
    ],
  },
  {
    slug: 'ethanol-trgs-555',
    substanceName: "Ethanol",
    metaDescription: "Betriebsanweisung Ethanol: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Pharma & Kosmetik",
      "Druckerei & Verpackung",
      "Labor",
      "Handwerk (Lösungsmittel)",
    ],
  },
  {
    slug: 'ethylacetat-trgs-555',
    substanceName: "Ethylacetat",
    metaDescription: "Betriebsanweisung Ethylacetat: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Lackierung & Beschichtung",
      "Druckerei & Flexodruck",
      "Klebstoffverarbeitung",
      "Malerbetrieb",
    ],
  },
  {
    slug: 'ethylenglykol-trgs-555',
    substanceName: "Ethylenglykol",
    metaDescription: "Betriebsanweisung Ethylenglykol: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Kfz-Werkstatt & Fuhrpark",
      "Heizungs- & Klimatechnik",
      "Industrielle Kühlkreisläufe",
      "Luftfahrt & Sonderfahrzeuge",
    ],
  },
  {
    slug: 'flusssaeure-trgs-555',
    substanceName: "Flusssäure",
    metaDescription: "Betriebsanweisung Flusssäure: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Steinmetz & Naturstein",
      "Glasbearbeitung & HF-Beize",
      "Halbleiter- & Oberflächentechnik",
      "Industrielle Reinigung",
    ],
  },
  {
    slug: 'formaldehyd-trgs-555',
    substanceName: "Formaldehyd",
    metaDescription: "Betriebsanweisung Formaldehyd: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Pathologie & Labormedizin",
      "Holzverarbeitung & Plattenwerkstoffe",
      "Textil- & Lederindustrie",
      "Desinfektion (industriell)",
    ],
  },
  {
    slug: 'heizoel-el-trgs-555',
    substanceName: "Heizöl EL",
    metaDescription: "Betriebsanweisung Heizöl EL: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Hausmeister & Gebäudetechnik",
      "Handwerk & Kleingewerbe",
      "Landwirtschaft",
      "Kommunale Einrichtungen",
    ],
  },
  {
    slug: 'isopropanol-trgs-555',
    substanceName: "Isopropanol",
    metaDescription: "Betriebsanweisung Isopropanol: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Elektronik & Reinraum",
      "Kfz-Werkstatt",
      "Medizinische Einrichtungen",
      "Druckerei & Industriereinigung",
    ],
  },
  {
    slug: 'kaliumhydroxid-trgs-555',
    substanceName: "Kaliumhydroxid",
    metaDescription: "Betriebsanweisung Kaliumhydroxid: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Galvanik & Oberflächentechnik",
      "Seifen- & Reinigungsmittelherstellung",
      "Lebensmitteltechnik (CIP, wo zutreffend)",
      "Labor",
    ],
  },
  {
    slug: 'kalziumhypochlorit-trgs-555',
    substanceName: "Kalziumhypochlorit",
    metaDescription: "Betriebsanweisung Kalziumhypochlorit: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Schwimmbad & Freizeitbad",
      "Kommunale Wasseraufbereitung",
      "Gebäudereinigung (Desinfektion)",
      "Landwirtschaft & Stallhygiene",
    ],
  },
  {
    slug: 'kohlenmonoxid-trgs-555',
    substanceName: "Kohlenmonoxid",
    metaDescription: "Betriebsanweisung Kohlenmonoxid: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Schweißen & Thermische Prozesse",
      "Heizungs- & Kesselanlagen",
      "Stahl- & Metallverarbeitung",
      "Garagen & Werkstätten",
    ],
  },
  {
    slug: 'kuehlschmierstoff-trgs-555',
    substanceName: "Kühlschmierstoff",
    metaDescription: "Betriebsanweisung Kühlschmierstoff: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Metallbearbeitung (Drehen, Fräsen)",
      "Werkzeugbau",
      "Automobilzulieferer",
    ],
  },
  {
    slug: 'methanol-trgs-555',
    substanceName: "Methanol",
    metaDescription: "Betriebsanweisung Methanol: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Chemische Industrie",
      "Labor",
      "Kunststoffverarbeitung",
      "Werkstatt (Speziallösungsmittel)",
    ],
  },
  {
    slug: 'methylmethacrylat-trgs-555',
    substanceName: "Methylmethacrylat",
    metaDescription: "Betriebsanweisung Methylmethacrylat: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Zahntechnik & Medizintechnik",
      "Kunststoffverarbeitung",
      "Bau & Sanierung (PMMA-Systeme)",
      "Modellbau & Prototyping",
    ],
  },
  {
    slug: 'n-hexan-trgs-555',
    substanceName: "n-Hexan",
    metaDescription: "Betriebsanweisung n-Hexan: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Kfz-Werkstatt & Entfettung",
      "Malerbetrieb & Lackierung",
      "Leder- & Textilverarbeitung",
      "Industrielle Reinigung",
    ],
  },
  {
    slug: 'natriumhypochlorit-trgs-555',
    substanceName: "Natriumhypochlorit",
    metaDescription: "Betriebsanweisung Natriumhypochlorit: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Gebäudereinigung & Facility",
      "Schwimmbad & Wasseraufbereitung",
      "Lebensmittelindustrie (Desinfektion)",
      "Kommunale Entsorgung",
    ],
  },
  {
    slug: 'natronlauge-trgs-555',
    substanceName: "Natronlauge",
    metaDescription: "Betriebsanweisung Natronlauge: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Lebensmittel- & Getränkeindustrie (CIP-Reinigung)",
      "Kessel- & Anlagenreinigung",
      "Abwasser & Neutralisation",
      "Metallveredelung",
    ],
  },
  {
    slug: 'oxalsaeure-trgs-555',
    substanceName: "Oxalsäure",
    metaDescription: "Betriebsanweisung Oxalsäure: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Gebäudereinigung & Entkalkung",
      "Holzverarbeitung (Beize)",
      "Textil- & Lederindustrie",
      "Labor",
    ],
  },
  {
    slug: 'phosphorsaeure-trgs-555',
    substanceName: "Phosphorsäure",
    metaDescription: "Betriebsanweisung Phosphorsäure: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Metalloberflächentechnik",
      "Lebensmittel & Getränke",
      "Düngemittel & Agrarchemie",
      "Reinigungsmittelherstellung",
    ],
  },
  {
    slug: 'propangas-trgs-555',
    substanceName: "Propangas",
    metaDescription: "Betriebsanweisung Propangas: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Sanitär- & Heizungsbau",
      "Dachdecker & Klempner",
      "Gastronomie & Außengastronomie",
      "Landwirtschaft & Hoftechnik",
    ],
  },
  {
    slug: 'salpetersaeure-trgs-555',
    substanceName: "Salpetersäure",
    metaDescription: "Betriebsanweisung Salpetersäure: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Metallveredelung & Galvanik",
      "Edelmetall- & Schmuckverarbeitung",
      "Labor & Analytik",
      "Reinigungsmittelherstellung",
    ],
  },
  {
    slug: 'salzsaeure-trgs-555',
    substanceName: "Salzsäure",
    metaDescription: "Betriebsanweisung Salzsäure: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Metallverarbeitung & Galvanik",
      "Stein- & Fliesenlegerei",
      "Abwasser & Neutralisation",
      "Lebensmitteltechnik (CIP, wo zutreffend)",
    ],
  },
  {
    slug: 'sanitaerreiniger-trgs-555',
    substanceName: "Sanitärreiniger",
    metaDescription: "Betriebsanweisung Sanitärreiniger: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Gebäudereinigung",
      "Facility Management",
      "Hotel & Gastronomie",
      "Hausmeisterdienste",
    ],
  },
  {
    slug: 'sauerstoff-trgs-555',
    substanceName: "Sauerstoff",
    metaDescription: "Betriebsanweisung Sauerstoff: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Schweißtechnik & Schneidbrennen",
      "Medizinische Versorgung",
      "Wasser- & Abwassertechnik",
      "Lebensmittelverpackung (MAP)",
    ],
  },
  {
    slug: 'schwefelsaure-trgs-555',
    substanceName: "Schwefelsäure",
    metaDescription: "Betriebsanweisung Schwefelsäure: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Galvanik & Oberflächentechnik",
      "Battery / Notstrom",
      "Chemische Reinigung",
      "Abwasserbehandlung",
    ],
  },
  {
    slug: 'sekundenkleber-trgs-555',
    substanceName: "Sekundenkleber",
    metaDescription: "Betriebsanweisung Sekundenkleber: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Elektronikfertigung & Reparatur",
      "Modellbau & Prototyping",
      "Schreinerei & Innenausbau",
      "Kfz-Werkstatt (Kunststoffreparatur)",
    ],
  },
  {
    slug: 'styrol-trgs-555',
    substanceName: "Styrol",
    metaDescription: "Betriebsanweisung Styrol: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Glasfaserverarbeitung & Composites",
      "Kunststoffverarbeitung",
      "Modellbau & Gießerei",
      "Chemische Industrie",
    ],
  },
  {
    slug: 'terpentinoel-trgs-555',
    substanceName: "Terpentinöl",
    metaDescription: "Betriebsanweisung Terpentinöl: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Malerbetrieb & Lackierung",
      "Holzverarbeitung & Schreinerei",
      "Kunsthandwerk & Restaurierung",
      "Druckerei",
    ],
  },
  {
    slug: 'testbenzin-trgs-555',
    substanceName: "Testbenzin",
    metaDescription: "Betriebsanweisung Testbenzin: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Malerbetrieb & Lackierung",
      "Holzverarbeitung",
      "Druckerei",
      "Industrielle Reinigung",
    ],
  },
  {
    slug: 'tetrachlorethen-trgs-555',
    substanceName: "Tetrachlorethen",
    metaDescription: "Betriebsanweisung Tetrachlorethen: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Textilreinigung",
      "Metallentfettung & Galvanik",
      "Industrielle Teilewaschung",
      "Kfz-Werkstatt",
    ],
  },
  {
    slug: 'toluol-trgs-555',
    substanceName: "Toluol",
    metaDescription: "Betriebsanweisung Toluol: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Malerbetrieb & Lackierung",
      "Druckerei",
      "Chemische Industrie",
      "Klebstoff- & Dichtstoffverarbeitung",
    ],
  },
  {
    slug: 'trichlorethen-trgs-555',
    substanceName: "Trichlorethen",
    metaDescription: "Betriebsanweisung Trichlorethen: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Metallentfettung & Oberflächentechnik",
      "Industrielle Teilewaschung",
      "Kfz-Werkstatt",
      "Maschinenbau & Instandhaltung",
    ],
  },
  {
    slug: 'wasserstoffperoxid-trgs-555',
    substanceName: "Wasserstoffperoxid",
    metaDescription: "Betriebsanweisung Wasserstoffperoxid: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Textil- & Papierbleiche",
      "Wasseraufbereitung",
      "Labor",
      "Desinfektion (industriell)",
    ],
  },
  {
    slug: 'xylol-trgs-555',
    substanceName: "Xylol",
    metaDescription: "Betriebsanweisung Xylol: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Malerbetrieb & Lackierung",
      "Druckerei & Flexodruck",
      "Chemische Industrie",
      "Industrielle Reinigung",
    ],
  },
  {
    slug: 'zitronensaeure-trgs-555',
    substanceName: "Zitronensäure",
    metaDescription: "Betriebsanweisung Zitronensäure: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.",
    typicalIndustries: [
      "Gebäudereinigung & Entkalkung",
      "Lebensmittel- & Getränkeindustrie",
      "Kosmetik & Pharma",
      "Facility Management",
    ],
  },
] as const satisfies readonly HazardousSubstanceSeoEntry[];

export type HazardousSubstanceSlug = (typeof HAZARDOUS_SUBSTANCE_SEO_ENTRIES)[number]['slug'];

export const HAZARDOUS_SUBSTANCE_SLUGS = HAZARDOUS_SUBSTANCE_SEO_ENTRIES.map(
  (entry) => entry.slug,
) as HazardousSubstanceSlug[];
