import { APP_REGISTER_URL } from '@/config/aeo-config';
import { LIVE_DEMO_ANCHOR_ID } from '@/config/home-sections/hero';
import { MULTI_TENANT_SIFA } from '@/config/home-sections/multi-tenant-sifa';
import { caseStudyPath, getPublishedCaseStudies } from '@/data/caseStudies';
import type { StorageClass, Trgs510Status } from '@/lib/trgs510/types';

/**
 * Conversion-Copy des TRGS-510-Zusammenlagerungs-Checks.
 * Konsumenten: Trgs510CheckTool, Trgs510ResultPanel, Trgs510AudienceCards.
 * Copy-Regeln: keine Gedankenstriche in Fließtext/CTAs, Marke immer „Gefahrstoff-QR“,
 * BA-Ergebnisse sind KI-gestützte Entwürfe (gemäß TRGS 555).
 */

export interface Trgs510Link {
  label: string;
  href: string;
}

/** Bestandsgröße, an der die Kombinatorik im Ergebnis-CTA veranschaulicht wird. */
const EXAMPLE_INVENTORY_SIZE = 20;

/** Anzahl paarweiser Vergleiche für n Stoffe: n · (n − 1) / 2. */
export function countPairwiseCombinations(substanceCount: number): number {
  return (substanceCount * (substanceCount - 1)) / 2;
}

const LIVE_DEMO_HREF = `/#${LIVE_DEMO_ANCHOR_ID}`;
const SIFA_SECTION_HREF = `/#${MULTI_TENANT_SIFA.sectionId}`;

function resolveCaseStudyHref(): string {
  const [featuredCaseStudy] = getPublishedCaseStudies();
  return featuredCaseStudy ? caseStudyPath(featuredCaseStudy.slug) : '/';
}

/** Hilfszeile unter den LGK-Dropdowns (Brücke zum SDB-Live-Test). */
export const TRGS510_UNKNOWN_CLASS_HINT = {
  lead: 'Lagerklasse nicht im Kopf?',
  link: { label: 'Sicherheitsdatenblatt einfach hochladen', href: LIVE_DEMO_HREF },
  rest: ', Gefahrstoff-QR liest die LGK automatisch aus.',
} as const;

export interface Trgs510ResultCta {
  eyebrow: string;
  headline: string;
  body: string;
  primary: Trgs510Link;
  secondary: Trgs510Link;
}

function describeClassPair(first: StorageClass, second: StorageClass): string {
  return first.id === second.id
    ? `${first.label} untereinander`
    : `${first.label} und ${second.label}`;
}

/** Ergebnis-CTA, abhängig von Ampelstatus und gewählten Lagerklassen. */
export function buildTrgs510ResultCta(
  status: Trgs510Status,
  firstClass: StorageClass,
  secondClass: StorageClass,
): Trgs510ResultCta {
  const classPair = describeClassPair(firstClass, secondClass);
  const shared = {
    eyebrow: 'Gefahrstoff-QR automatisiert diesen Check',
    primary: { label: 'Eigene SDBs kostenlos prüfen', href: APP_REGISTER_URL },
    secondary: { label: 'Praxisbeispiel ansehen', href: resolveCaseStudyHref() },
  };

  if (status === 'allowed') {
    return {
      ...shared,
      headline: `Für ${classPair} passt es.`,
      body:
        'Automatisiere den Check für deinen gesamten Bestand inklusive KI-gestützter ' +
        'Betriebsanweisungs-Entwürfe (gemäß TRGS 555) und QR-Codes am Schrank.',
    };
  }

  const exampleCombinations = countPairwiseCombinations(EXAMPLE_INVENTORY_SIZE);
  return {
    ...shared,
    headline: `Achtung bei ${classPair}:`,
    body:
      `Bei 2 Stoffen ist das ${countPairwiseCombinations(2)} Vergleich. ` +
      `Bei ${EXAMPLE_INVENTORY_SIZE} Stoffen im Schrank sind es bereits ${exampleCombinations} Kombinationen. ` +
      'Prüfe deinen gesamten Bestand automatisch aus deinen Lieferanten-PDFs.',
  };
}

export interface Trgs510AudienceCard {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: Trgs510Link;
}

/** Zielgruppen-Einstieg unter dem Tool (Betrieb vs. externe SiFa). */
export const TRGS510_AUDIENCE_SECTION = {
  heading: 'Wie geht es nach dem Check weiter?',
  cards: [
    {
      id: 'betriebe',
      eyebrow: 'Betriebe & Werkstätten',
      title: 'Kostenloser 48-Stunden-Import',
      text:
        'Schick uns 5 bis 10 Sicherheitsdatenblätter. Innerhalb von 48 Stunden steht dein ' +
        'Gefahrstoffverzeichnis inklusive TRGS-510-Prüfung und fertiger QR-Codes für den Schrank.',
      cta: { label: 'Kostenlosen 48h-Import starten', href: APP_REGISTER_URL },
    },
    {
      id: 'sifas',
      eyebrow: 'Selbstständige SiFas',
      title: 'Mandanten-Kataster für alle Kundenbetriebe',
      text:
        'Getrennte Kataster pro Mandant und Werk, KI-gestützte Betriebsanweisungs-Entwürfe ' +
        '(gemäß TRGS 555) direkt aus den Lieferanten-PDFs, zur fachlichen Freigabe durch dich.',
      cta: { label: 'Lösung für SiFas ansehen', href: SIFA_SECTION_HREF },
    },
  ] satisfies Trgs510AudienceCard[],
} as const;
