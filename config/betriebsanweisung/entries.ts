import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

/**
 * Zentrale Datenquelle für Programmatic SEO — Betriebsanweisungen.
 * Neue Stoffe am Ende anfügen; `npm run validate:betriebsanweisung` vor dem Commit.
 */
export const HAZARDOUS_SUBSTANCE_SEO_ENTRIES = [
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
    faqItems: [
      {
        question: 'Brauche ich für Aceton immer eine Betriebsanweisung?',
        answer:
          'Ja, wenn Aceton im Betrieb bereitgestellt wird (§ 14 GefStoffV). Der Entwurf orientiert sich an TRGS 555; Freigabe und Aktualisierung obliegen der SiFa bzw. dem Arbeitgeber.',
      },
      {
        question: 'Welche Lagerklasse gilt für Aceton nach TRGS 510?',
        answer:
          'Typisch LGK 3 (entzündbare Flüssigkeiten). Lagerung nur in brennbaren Lagerräumen mit Zündquellenkontrolle; Abstand zu Oxidationsmitteln und Zündquellen einhalten — Details im SDB Ihres Lieferanten.',
      },
      {
        question: 'Reichen Einweghandschuhe aus dem Supermarkt?',
        answer:
          'Selten. Für längeres Umfüllen sind Butylhandschuhe mit ausreichender Schichtdicke vorgesehen. Prüfen Sie Durchbruchzeiten und wechseln Sie Handschuhe bei Kontamination sofort.',
      },
    ],
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
    faqItems: [
      {
        question: 'Ist Isopropanol „desinfektionsmittel-sicher“ ohne Betriebsanweisung?',
        answer:
          'Nein. Auch Desinfektionsmittel sind Gefahrstoffe, wenn am Arbeitsplatz verwendet. Betriebsanweisung und Unterweisung sind erforderlich; Entwurf per TRGS 555, Freigabe durch SiFa/Arbeitgeber.',
      },
      {
        question: 'Darf Isopropanol neben Oxidationsmitteln stehen?',
        answer:
          'Nein. Entzündbare Flüssigkeiten getrennt von Oxidationsmitteln und Zündquellen lagern (TRGS 510 / Zusammenlagerung). Konkrete Abstände und LGK aus Ihrem SDB ableiten.',
      },
      {
        question: 'Welche Handschuhe sind für IPA geeignet?',
        answer:
          'Material und Dicke hängen von Konzentration, Temperatur und Kontaktzeit ab. Butyl ist robust; Nitril nur bei kurzem Kontakt mit ausreichender Schichtdicke — Herstellerangaben im SDB Abschnitt 8 beachten.',
      },
    ],
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
    faqItems: [
      {
        question: 'Warum unterscheiden sich H-Sätze bei Bremsenreinigern?',
        answer:
          'Produkte sind Gemische unterschiedlicher Lösemittel. Aspirationstoxizität (H304) ist bei vielen KW-basierten Reinigern relevant. Laden Sie Ihr Hersteller-SDB hoch, um exakte Sätze zu übernehmen.',
      },
      {
        question: 'Darf ich Bremsenreiniger in geschlossenen Räumen sprühen?',
        answer:
          'Nur mit wirksamer Absaugung und Atemschutz. Dämpfe sind leicht entzündbar und können Benommenheit auslösen. TRGS 555-Entwurf ergänzen Sie um betriebliche Lüftungsmaßnahmen.',
      },
      {
        question: 'Was ist der häufigste Unfallmechanismus?',
        answer:
          'Augenkontakt durch Spritznebel und Hautentfettung bei fehlenden Handschuhen. Erste-Hilfe-Angaben stammen aus dem SDB — im Entwurf vor Freigabe abgleichen.',
      },
    ],
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
    faqItems: [
      {
        question: 'Ab welcher Konzentration gilt Schwefelsäure als hautätzend?',
        answer:
          'Die CLP-Einstufung hängt von der Konzentration ab (Grenzwerte in Anhang I CLP). Diese Seite geht von ca. 40–50 % aus. Ihr Lieferanten-SDB ist maßgeblich.',
      },
      {
        question: 'Welche Lagerklasse ist für Schwefelsäure vorgesehen?',
        answer:
          'In der Regel LGK 1 (Säuren), getrennt von Laugen (LGK 8B) und Oxidationsmitteln. Zusammenlagerung nur nach TRGS 510-Tabelle — im GQR-Tool prüfbar.',
      },
      {
        question: 'Was tun bei Augenkontakt?',
        answer:
          'Sofort mindestens 10–15 Minuten mit viel Wasser spülen, Augenlid weit geöffnet halten, unverzüglich Arzt/S Notruf. Angaben im freigegebenen SDB Abschnitt 4 übernehmen.',
      },
    ],
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
    faqItems: [
      {
        question: 'Ist „Spülmaschinen-Entkalker“ immer Natronlauge?',
        answer:
          'Nicht zwingend — Produkte können unterschiedliche Laugen oder Gemische sein. Produktname und SDB entscheiden über H-Sätze und PSA.',
      },
      {
        question: 'Darf Natronlauge mit Säuren gelagert werden?',
        answer:
          'Nein. Laugen (LGK 8B) getrennt von Säuren (LGK 1) lagern; bei Versäumen drohen gefährliche Reaktionen bei Leckagen. TRGS 510-Zusammenlagerung beachten.',
      },
      {
        question: 'Welche Konzentration setzt diese Vorlage voraus?',
        answer:
          'Ca. 20 % NaOH in Wasser. Weicht Ihr Produkt ab, passen Sie Betriebsanweisung und PSA nach dem Hersteller-SDB an.',
      },
    ],
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
    faqItems: [
      {
        question: 'Warum riechen Kühlschmierstoffe manchmal „scharf“?',
        answer:
          'Biocide, pH-Puffer und Abbauprodukte können Geruch verursachen. Geruchsänderung kann auf Belastung hindeuten — SDB und betriebliche Grenzwerte (TRGS 611) beachten.',
      },
      {
        question: 'Brauche ich eine Betriebsanweisung für jede Emulsion?',
        answer:
          'Ja, für jede bereitgestellte KSS-Qualität bzw. jedes Konzentrat, das Mitarbeitende handhaben. SDB-Upload liefert exakte H-Sätze und PSA.',
      },
      {
        question: 'Wie oft muss der KSS geprüft werden?',
        answer:
          'Betrieblich nach Hersteller, TRGS 611 und Hygieneplan (pH, Keimzahl, Nitrit). Betriebsanweisung ergänzen Sie um Ihre Prüfintervalle.',
      },
    ],
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
    faqItems: [
      {
        question: 'Ist AdBlue ein Gefahrstoff?',
        answer:
          'Ja, wenn am Arbeitsplatz gehandhabt — auch wenn nicht entzündbar. Augenreizung und Atemwegsreizung sind typische Gefahren; Betriebsanweisung und Unterweisung sind erforderlich.',
      },
      {
        question: 'Wie lagere ich AdBlue korrekt?',
        answer:
          'Kühl und geschützt vor direkter Sonne, saubere Schläuche/Behälter (Verunreinigung vermeidet SCR-Ausfall). LGK 12, getrennt von Diesel (LGK 3).',
      },
      {
        question: 'Was passiert bei Augenkontakt?',
        answer:
          'Mehrere Minuten mit Wasser spülen, bei anhaltender Reizung Arzt aufsuchen — exakte Schritte aus Abschnitt 4 Ihres SDB in die freigegebene Betriebsanweisung übernehmen.',
      },
    ],
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
    faqItems: [
      {
        question: 'Reicht eine Betriebsanweisung nur für das Harz?',
        answer:
          'Nein — Härter, Verdünnungsmittel und Additive sind eigene Gefahrstoffe mit eigenen SDBs. Dokumentieren Sie alle Komponenten im Verzeichnis.',
      },
      {
        question: 'Warum ist Epoxidharz ein Hautsensibilisierer?',
        answer:
          'Ungehärtete Epoxide können allergische Kontaktdermatitis auslösen (H317). Bereits sensibilisierte Personen reagieren auch auf geringe Mengen — PSA konsequent nutzen.',
      },
      {
        question: 'Wie entsorge ich Restharz?',
        answer:
          'Ausgehärtetes Material ist oft inert; flüssige Reste als problematischer Abfall nach EAK/SDB. Entsorgungshinweise aus Abschnitt 13 übernehmen.',
      },
    ],
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
    faqItems: [
      {
        question: 'Ist Apotheken-Wasserstoffperoxid (3 %) genauso gefährlich?',
        answer:
          'Die Einstufung hängt stark von der Konzentration ab. Diese Seite bezieht sich auf ca. 35 %. Für 3 % gelten andere H-Sätze — SDB heranziehen.',
      },
      {
        question: 'Warum getrennt von Brennmaterial lagern?',
        answer:
          'Oxidationsmittel können organische Stoffe entzünden (H271). TRGS 510: LGK 5.1 getrennt von LGK 3/LGK 4 — Zusammenlagerungstabelle nutzen.',
      },
      {
        question: 'Welche Behälter sind geeignet?',
        answer:
          'Nur zugelassene, saubere Behälter aus kompatiblem Material (oft HDPE). Kontamination mit Metallen oder Staub kann Zersetzung/Gasentwicklung fördern — SDB Abschnitt 7.',
      },
    ],
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
    faqItems: [
      {
        question: 'Brauche ich eine Betriebsanweisung für den firmeneigenen Dieseltank?',
        answer:
          'Ja, wenn Mitarbeitende tanken oder Wartung am Tank durchführen. Aspirationstoxizität (H304) ist relevant — Unterweisung und PSA dokumentieren.',
      },
      {
        question: 'Wie schütze ich Gewässer?',
        answer:
          'Rückhaltesysteme, Bindemittel vorhanden halten, LGK-3-Lager auf wasserdichtem Untergrund. Entsorgung nur über zugelassige Entsorger (SDB Abschnitt 13).',
      },
      {
        question: 'Reicht der Sicherheitsdatenblatt-Abschnitt 7 für die Lagerung?',
        answer:
          'Abschnitt 7 ergänzt TRGS 510/LGK 3 — Betriebsanweisung fasst Verhalten am Arbeitsplatz zusammen; Freigabe durch SiFa/Arbeitgeber.',
      },
    ],
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
    faqItems: [
      {
        question: 'Darf ich Sanitärreiniger mit Essig kombinieren?',
        answer:
          'Nein — saure Produkte nicht mischen; unvorhersehbare Reaktionen und Dämpfe. Nur ein Produkt laut Etikett; SDB Abschnitt 10 beachten.',
      },
      {
        question: 'Warum ist Chlorgas ein Thema?',
        answer:
          'Salzsäurehaltige Reiniger reagieren mit hypochlorithaltigen Bleichmitteln zu Chlor. Betriebsanweisung muss Mischverbote und Lüftung klar benennen.',
      },
      {
        question: 'Welche Konzentration gilt für diese Vorlage?',
        answer:
          'Ca. 10–15 % Salzsäure im Fertigprodukt. Schwächere „Eco“-Reiniger können nur reizend eingestuft sein — SDB hochladen und Werte anpassen.',
      },
    ],
  },
] as const satisfies readonly HazardousSubstanceSeoEntry[];

export type HazardousSubstanceSlug = (typeof HAZARDOUS_SUBSTANCE_SEO_ENTRIES)[number]['slug'];

export const HAZARDOUS_SUBSTANCE_SLUGS: HazardousSubstanceSlug[] = HAZARDOUS_SUBSTANCE_SEO_ENTRIES.map(
  (entry) => entry.slug,
);
