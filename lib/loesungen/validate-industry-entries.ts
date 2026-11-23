import { INDUSTRY_SLUGS, industrySolutions, type IndustrySolution } from '@/config/industry-solutions';
import type { IndustryPseoContent } from '@/config/loesungen/types';

const PSEO_REQUIRED_SLUGS = [
  'friseursalon',
  'metallbau',
  'landwirtschaft',
  'zahnarztpraxis',
  'elektrobetrieb',
  'dachdecker',
  'tankstelle',
  'druckerei',
  'baeckerei',
  'fliesenleger',
  'shk-betrieb',
  'lackiererei',
] as const;

const BANNED_LOESUNGEN_COPY = [
  { id: 'entscheidend', re: /\bentscheidend\b/i },
  { id: 'unverzichtbar', re: /\bunverzichtbar\b/i },
  { id: 'ganzheitlich', re: /\bganzheitlich\b/i },
  { id: 'nahtlos', re: /\bnahtlos\b/i },
  { id: 'fazit', re: /\bFazit\b/i },
  { id: 'schlussfolgerung', re: /\bSchlussfolgerung\b/i },
  { id: 'heutige-zeit', re: /In der heutigen Zeit/i },
  { id: 'effizient-gestalten', re: /effizient gestalten/i },
  { id: 'tauchen-wir-ein', re: /tauchen wir ein/i },
  { id: 'stellen-sie-sich-vor', re: /Stellen Sie sich vor/i },
  { id: 'ein-kinderspiel', re: /ein Kinderspiel/i },
  { id: 'auf-ein-neues-level', re: /auf ein neues Level/i },
];

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function collectStrings(entry: IndustrySolution): string[] {
  const base = [
    entry.metaTitle,
    entry.metaDescription,
    entry.title,
    entry.heroText,
    entry.spezifischerVorteil,
    entry.handwerkAbsatz,
    ...entry.typischeStoffe,
    ...(entry.heroLeadParagraphs ?? []),
    ...(entry.heroUspBullets ?? []),
  ];
  const pseo = entry.pseo;
  if (!pseo) return base;
  return [
    ...base,
    pseo.aeoAnswer,
    ...pseo.inspectionDeficiencies,
    ...pseo.typicalProducts.flatMap((r) => [r.product, r.gebinde, r.hazardKind, r.workplaceDuty]),
    ...pseo.excelComparison.flatMap((r) => [r.topic, r.excelWorkflow, r.gqrWorkflow]),
    ...pseo.faqItems.flatMap((f) => [f.question, f.answer]),
    pseo.berufsgenossenschaft,
  ];
}

function validatePseo(slug: string, pseo: IndustryPseoContent): string[] {
  const errors: string[] = [];
  const aeoWords = wordCount(pseo.aeoAnswer);
  if (aeoWords < 45 || aeoWords > 60) {
    errors.push(`${slug}: aeoAnswer hat ${aeoWords} Wörter (45–60 erwartet).`);
  }
  if (pseo.typicalProducts.length < 5 || pseo.typicalProducts.length > 7) {
    errors.push(`${slug}: typicalProducts hat ${pseo.typicalProducts.length} Zeilen (5–7 erwartet).`);
  }
  if (pseo.excelComparison.length !== 4) {
    errors.push(`${slug}: excelComparison braucht 4 Zeilen.`);
  }
  if (pseo.inspectionDeficiencies.length !== 3) {
    errors.push(`${slug}: inspectionDeficiencies braucht 3 Einträge.`);
  }
  for (const [i, faq] of pseo.faqItems.entries()) {
    const n = wordCount(faq.answer);
    if (n < 40 || n > 55) {
      errors.push(`${slug}: FAQ ${i + 1} Antwort hat ${n} Wörter (40–55 erwartet).`);
    }
  }
  return errors;
}

export function validateIndustryEntries(): void {
  const errors: string[] = [];

  for (const slug of INDUSTRY_SLUGS) {
    const entry = industrySolutions[slug];
    if (!entry) {
      errors.push(`Fehlender Eintrag für Slug: ${slug}`);
      continue;
    }
    if (entry.slug !== slug) {
      errors.push(`${slug}: slug-Feld stimmt nicht überein.`);
    }
    if ((PSEO_REQUIRED_SLUGS as readonly string[]).includes(slug)) {
      if (entry.metaTitle.length > 60) {
        errors.push(`${slug}: metaTitle zu lang (${entry.metaTitle.length} > 60).`);
      }
      if (entry.metaDescription.length > 155) {
        errors.push(`${slug}: metaDescription zu lang (${entry.metaDescription.length} > 155).`);
      }
    }
    if ((PSEO_REQUIRED_SLUGS as readonly string[]).includes(slug) && !entry.pseo) {
      errors.push(`${slug}: pseo-Inhalt fehlt.`);
    }
    if (entry.pseo) {
      errors.push(...validatePseo(slug, entry.pseo));
    }

    if (entry.pseo) {
      const blob = collectStrings(entry).join('\n');
      for (const rule of BANNED_LOESUNGEN_COPY) {
        if (rule.re.test(blob)) {
          errors.push(`${slug}: verbotene Formulierung [${rule.id}]`);
        }
      }
    }
  }

  const slugs = new Set(INDUSTRY_SLUGS);
  if (slugs.size !== INDUSTRY_SLUGS.length) {
    errors.push('Doppelte Slugs in INDUSTRY_SLUGS.');
  }

  if (errors.length > 0) {
    throw new Error(`Lösungen-Validierung fehlgeschlagen:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  }
}