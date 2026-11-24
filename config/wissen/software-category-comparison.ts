/**
 * Kategorie-Vergleich für /wissen/gefahrstoffmanagement-software/ (AEO + Hub-Seite des Clusters
 * "Gefahrstoffmanagement Software"). Vergleicht Kategorien, keine benannten Wettbewerber (UWG § 6).
 *
 * Alle Preise werden aus config/pricing-plans.ts, config/sifa-mandant-pricing.ts und
 * config/home-sections/turnkey-audit.ts abgeleitet, damit Tabelle, FAQ und JSON-LD nie auseinanderlaufen.
 */
import { TURNKEY_AUDIT, TURNKEY_AUDIT_SLUG } from '@/config/home-sections/turnkey-audit';
import { formatEuro, PRICING_PLANS, type PricingPlan, type PricingPlanId } from '@/config/pricing-plans';
import { APP_REGISTER_URL } from '@/config/aeo-config';
import { SIFA_MANDANT_INCLUDED } from '@/config/sifa-mandant-pricing';

function planById(id: PricingPlanId): PricingPlan {
  const plan = PRICING_PLANS.find((candidate) => candidate.id === id);
  if (!plan) throw new Error(`Preisplan ${id} fehlt in config/pricing-plans.ts`);
  return plan;
}

const freePlan = planById('tarif-vorschau');
const kmuEntryPlan = planById('kmu-basis');
const sifaPlan = planById('sifa-multi-mandant');

/** Effektiver Monatspreis bei Jahreszahlung (Standardansicht der Preiskarten). */
function entryMonthlyPrice(plan: PricingPlan): string {
  return `${formatEuro(plan.yearlyMonthlyPriceEur ?? plan.monthlyPriceEur)}/Monat`;
}

export const PRICE_FACTS = {
  freeTier: `${formatEuro(0)} TarifVorschau (${freePlan.limits})`,
  kmuFrom: `ab ${entryMonthlyPrice(kmuEntryPlan)}`,
  sifa: `${entryMonthlyPrice(sifaPlan)} bei Jahreszahlung (${formatEuro(sifaPlan.monthlyPriceEur)} monatlich), ${SIFA_MANDANT_INCLUDED} Mandanten inklusive`,
  turnkey: `${formatEuro(TURNKEY_AUDIT.schema.priceEur)} Festpreis (netto)`,
} as const;

export interface CategoryComparisonRow {
  criterion: string;
  manual: string;
  enterpriseEhs: string;
  gefahrstoffQr: string;
}

export const SOFTWARE_CATEGORY_COMPARISON = {
  headingId: 'kategorie-vergleich',
  headline: 'Gefahrstoffmanagement Software im Vergleich: Excel, EHS-System oder Spezialsoftware',
  intro:
    'Drei Wege, das Gefahrstoffverzeichnis nach § 6 GefStoffV zu führen. Der Vergleich beschreibt Kategorien, keine einzelnen Anbieter. Maßgeblich ist, welche Pflichten Sie abdecken müssen und wie viel Aufwand Sie dafür einplanen.',
  caption: 'Vergleich: manuelle Pflege, Enterprise-EHS-Systeme und Gefahrstoff-QR',
  columnLabels: {
    criterion: 'Kriterium',
    manual: 'Manuelle Pflege (Excel & Word)',
    enterpriseEhs: 'Klassische Enterprise-EHS-Systeme',
    gefahrstoffQr: 'Gefahrstoff-QR (spezialisiert für KMU & externe SiFas)',
  },
  rows: [
    {
      criterion: 'Zielgruppe',
      manual: 'Kleinstbetriebe mit wenigen Stoffen',
      enterpriseEhs: 'Konzerne mit eigener EHS-Abteilung und IT-Projektteam',
      gefahrstoffQr: 'KMU, Handwerk, Produktion und externe Fachkräfte für Arbeitssicherheit',
    },
    {
      criterion: 'SDB-Datenerfassung',
      manual: 'Abtippen aus 16 SDB-Abschnitten',
      enterpriseEhs: 'Häufig Datenbank-Anbindung oder Pflege durch Fachpersonal',
      gefahrstoffQr: 'KI-gestütztes Auslesen des SDB-PDF mit Fundstelle je Feld, Prüfung durch die SiFa',
    },
    {
      criterion: 'Abgedeckte Regelwerke',
      manual: 'Nur was die Vorlage abbildet, ohne Prüflogik',
      enterpriseEhs: 'Breit, abhängig von Modulen und Konfiguration',
      gefahrstoffQr: '§ 6 und § 14 GefStoffV, TRGS 555 (BA-Entwurf), TRGS 510 (Lagerung), TRGS 201 (Etiketten)',
    },
    {
      criterion: 'Multi-Mandantenfähigkeit für externe SiFas',
      manual: 'Getrennte Dateien und Ordner je Kunde',
      enterpriseEhs: 'Auf einen Konzern ausgelegt, Mandanten meist nicht vorgesehen',
      gefahrstoffQr: 'Mandant, Werk und Tätigkeit getrennt in einem Zugang',
    },
    {
      criterion: 'Einrichtung',
      manual: 'Sofort, aber jede Pflege bleibt Handarbeit',
      enterpriseEhs: 'Einführungsprojekt mit IT, Schnittstellen und Schulung',
      gefahrstoffQr: 'Browserbasiert, keine Installation, Start mit dem ersten SDB-PDF',
    },
    {
      criterion: 'Transparente Kosten',
      manual: 'Keine Lizenz, aber laufende Arbeitszeit',
      enterpriseEhs: 'Lizenz und Einführung meist auf Anfrage',
      gefahrstoffQr: `${PRICE_FACTS.freeTier}, KMU ${PRICE_FACTS.kmuFrom}, SiFa Multi-Mandant ${PRICE_FACTS.sifa}, Schlüsselfertig-Service ${PRICE_FACTS.turnkey}`,
    },
  ] satisfies CategoryComparisonRow[],
} as const;

/** AEO-Antwortblöcke: H2 als Frage, Antwort 45 bis 60 Wörter, erster Satz nennt Marke und Kernaussage. */
export interface AeoAnswerBlock {
  id: string;
  question: string;
  answer: string;
}

export const SOFTWARE_AEO_ANSWERS: readonly AeoAnswerBlock[] = [
  {
    id: 'kmu-mittelstand',
    question: 'Welche Gefahrstoffmanagement-Software eignet sich für KMU im Mittelstand?',
    answer:
      'Für KMU eignet sich eine browserbasierte Gefahrstoffmanagement Software wie Gefahrstoff-QR, die ohne IT-Projekt startet. Sie liest Sicherheitsdatenblätter KI-gestützt aus, führt das Gefahrstoffverzeichnis nach § 6 GefStoffV, erstellt BA-Entwürfe nach TRGS 555 und prüft die Zusammenlagerung nach TRGS 510. Die fachliche Freigabe bleibt bei SiFa oder Arbeitgeber.',
  },
  {
    id: 'kosten-vs-excel',
    question: 'Was kostet eine Gefahrstoffmanagement-Software im Vergleich zu Excel?',
    answer: `Excel kostet keine Lizenz, aber jede Aktualisierung bindet Arbeitszeit der SiFa. Gefahrstoff-QR startet mit ${PRICE_FACTS.freeTier}. KMU-Tarife beginnen ${PRICE_FACTS.kmuFrom} bei Jahreszahlung, der SiFa-Tarif mit mehreren Mandanten kostet ${entryMonthlyPrice(sifaPlan)}. Wer das Verzeichnis erstellen lassen möchte, bucht den Schlüsselfertig-Service zum ${PRICE_FACTS.turnkey}.`,
  },
  {
    id: 'sifa-multi-mandant',
    question: 'Welche Software unterstützt selbstständige SiFas mit Multi-Mandanten-Verwaltung?',
    answer: `Gefahrstoff-QR bietet selbstständigen Fachkräften für Arbeitssicherheit einen Multi-Mandanten-Tarif. Kundenbetriebe werden getrennt nach Mandant, Werk und Tätigkeit geführt, ${SIFA_MANDANT_INCLUDED} Mandanten sind inklusive. Bei der Begehung lassen sich Stoffe auch ohne vorliegendes SDB erfassen, fehlende Angaben werden im Export markiert. Abgerechnet wird auf Wunsch per PDF-Rechnung und Überweisung.`,
  },
];

/** Longtail-Abschnitte aus der GSC-Analyse, jeweils mit eigenem Mehrwert statt Keyword-Wiederholung. */
export interface LongtailSection {
  id: string;
  heading: string;
  body: string;
  link?: { label: string; href: string };
}

export const SOFTWARE_LONGTAIL_SECTIONS: readonly LongtailSection[] = [
  {
    id: 'kostenlos-testen',
    heading: `Gefahrstoffkataster Software kostenlos testen (${freePlan.limits})`,
    body: 'Laden Sie bis zu 3 eigene Sicherheitsdatenblätter hoch: 3 eigene SDBs kostenlos auslesen und fertige BA sofort im Browser prüfen — ohne Kreditkarte. Exporte ohne Testkennzeichnung gibt es ab den KMU-Tarifen.',
    link: { label: 'Kostenlos registrieren', href: APP_REGISTER_URL },
  },
  {
    id: 'chemikalienkataster',
    heading: 'Chemikalienkataster Software & digitale Gefahrstoffdatenbank',
    body: 'Chemikalienkataster, Gefahrstoffkataster und Gefahrstoffverzeichnis meinen in der Praxis dasselbe: die Liste aller im Betrieb verwendeten Gefahrstoffe mit Einstufung, Mengenbereich, Arbeitsbereich und Verweis auf das aktuelle Sicherheitsdatenblatt. Gefahrstoff-QR führt diese Daten als durchsuchbare Datenbank mit Revisionsverlauf.',
  },
  {
    id: 'betriebliches-gefahrstoffmanagement',
    heading: 'Betriebliches Gefahrstoffmanagement online nach § 6 GefStoffV',
    body: 'Betriebliches Gefahrstoffmanagement umfasst mehr als die Liste: Sicherheitsdatenblätter aktuell halten, Betriebsanweisungen nach TRGS 555 pflegen, Lagerung nach TRGS 510 prüfen und Beschäftigte nach § 14 GefStoffV unterweisen. Online heißt: alle Beteiligten arbeiten auf derselben Datenbasis, auch an mehreren Standorten.',
  },
  {
    id: 'erstellen-lassen',
    heading: 'Gefahrstoffverzeichnis erstellen lassen (Schlüsselfertig-Service)',
    body: `Wer keine Zeit hat, alle SDBs selbst zu sammeln und hochzuladen, kann das Gefahrstoffverzeichnis erstellen lassen. Der Schlüsselfertig-Service kostet ${PRICE_FACTS.turnkey} und liefert Verzeichnis, KI-gestützte BA-Entwürfe und QR-Etiketten zur fachlichen Freigabe durch SiFa oder Arbeitgeber.`,
    link: { label: 'Zum Schlüsselfertig-Service', href: `/wissen/${TURNKEY_AUDIT_SLUG}/` },
  },
];
