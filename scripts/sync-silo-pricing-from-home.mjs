/**
 * Übernimmt die Preissektion und das Billing-Script von index.html auf Silo-Landings.
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'index.html');

const TARGETS = [
  {
    file: 'gefahrstoff-software-sicherheitsfachkraft-selbstständig/index.html',
    headline: 'Skalieren Sie Ihre Compliance ohne Überraschungen',
    intro:
      'Vom Funktionstest bis zur Mandantenverwaltung für externe SiFas. Standard-Ansicht: Jahreszahlung zum reduzierten Monatspreis. Monatlich kündbar.',
  },
  {
    file: 'gefahrstoffmanagement-reinigungsfirma/index.html',
    headline: 'Skalieren Sie Ihre Compliance ohne Überraschungen',
    intro:
      'Transparente Festpreise für Reinigungsbetriebe: TarifVorschau kostenlos, bezahlte Pakete ab 49&nbsp;&euro;/Monat bei Jahreszahlung (KMU Basis). Monatlich kündbar.',
  },
];

const homeHtml = fs.readFileSync(SOURCE, 'utf8');

const pricingSectionMatch = homeHtml.match(
  /\s*<!-- PRICING -->[\s\S]*?<!--\/AEO:PRICING_SECTION-->/,
);
if (!pricingSectionMatch) {
  console.error('Preissektion in index.html nicht gefunden.');
  process.exit(1);
}

let pricingSection = pricingSectionMatch[0];

const pricingScriptMatch = homeHtml.match(
  /<script src="\/scripts\/pricing-billing\.js(?:\?v=\d+)?" defer><\/script>/,
);
if (!pricingScriptMatch) {
  console.error('scripts/pricing-billing.js in index.html nicht gefunden.');
  process.exit(1);
}
const pricingScript = pricingScriptMatch[0];

const offersMatch = homeHtml.match(/"offers": (\[[\s\S]*?\])\s*\n \}/);
const offersArray = offersMatch ? offersMatch[1] : null;

function applyHeadlineOverrides(section, { headline, intro }) {
  let out = section;
  if (headline) {
    out = out.replace(
      /<h2 id="pricingHeadline"[^>]*>[\s\S]*?<\/h2>/,
      `<h2 id="pricingHeadline" class="text-2xl font-black text-[#f0f6ff] sm:text-3xl lg:text-4xl">${headline}</h2>`,
    );
  }
  if (intro) {
    out = out.replace(
      /<p class="mt-4 text-base(?: leading-relaxed)? text-\[#8fa4c0\]">[\s\S]*?<\/p>/,
      `<p class="mt-4 text-base leading-relaxed text-[#8fa4c0]">${intro}\n <br>\n <br><b>Der QR-Scan-Zugriff ist ab KMU Basis inklusive.</b></p>`,
    );
  }
  return out;
}

function replacePricingSection(pageHtml, section) {
  const patterns = [
    /\s*<!-- PRICING -->[\s\S]*?<!--\/AEO:PRICING_SECTION-->/,
    /\s*<!-- PRICING -->[\s\S]*?<\/section>\s*(?=\n\s*<!-- FAQ -->)/,
  ];
  for (const pattern of patterns) {
    if (pattern.test(pageHtml)) {
      return pageHtml.replace(pattern, `\n${section.trim()}\n\n`);
    }
  }
  throw new Error('Preissektion im Ziel nicht gefunden.');
}

function replacePricingScript(pageHtml, script) {
  const inlinePattern =
    /<script>\s*\(function \(\) \{\s*var[\s\S]*?billingRoot = document\.querySelector\('\[data-pricing-billing\]'\);[\s\S]*?\}\)\(\);\s*<\/script>/;
  const externalPattern = /<script src="\/scripts\/pricing-billing\.js(?:\?v=\d+)?" defer><\/script>/;
  if (inlinePattern.test(pageHtml)) {
    return pageHtml.replace(inlinePattern, script);
  }
  if (externalPattern.test(pageHtml)) {
    return pageHtml.replace(externalPattern, script);
  }
  throw new Error('Pricing-Script im Ziel nicht gefunden.');
}

function replaceOffers(pageHtml) {
  if (!offersArray) return pageHtml;
  if (!/"offers": \[[\s\S]*?\]/.test(pageHtml)) return pageHtml;
  return pageHtml.replace(/"offers": \[[\s\S]*?\]/, `"offers": ${offersArray}`);
}

const PRICING_FEATURES_SCRIPT =
  '\n <script src="/scripts/pricing-tier-features.js" defer></script>';

function ensurePricingFeaturesScript(pageHtml) {
  if (pageHtml.includes('/scripts/pricing-tier-features.js')) return pageHtml;
  const billingTag = /<script src="\/scripts\/pricing-billing\.js(?:\?v=\d+)?" defer><\/script>/;
  if (billingTag.test(pageHtml)) {
    return pageHtml.replace(billingTag, (match) => `${match}${PRICING_FEATURES_SCRIPT}`);
  }
  const billingEnd =
    /billingRoot = document\.querySelector\('\[data-pricing-billing\]'\);[\s\S]*?\}\)\(\);\s*<\/script>/;
  if (!billingEnd.test(pageHtml)) return pageHtml;
  return pageHtml.replace(
    billingEnd,
    (match) => `${match}${PRICING_FEATURES_SCRIPT}`,
  );
}

/** Muss zu KMU Pro `yearlyTotalPriceEur` in config/pricing-plans.ts passen (Schlüsselfertig-Inklusivsoftware). */
const KMU_PRO_YEARLY_NET_EUR = 1188;

function patchTurnkeyStalePricingCopy(pageHtml) {
  return pageHtml
    .replace(
      /12 Monate Gefahrstoff-QR Professional inklusive: Voller Cloud-Zugang \(Wert: 2\.388 €\)/g,
      `12 Monate KMU Pro inklusive: Voller Cloud-Zugang (Listenpreis Jahresabo: ${KMU_PRO_YEARLY_NET_EUR.toLocaleString('de-DE')} € netto)`,
    )
    .replace(
      /12 Monate KMU Pro \(Wert 2\.388 €\)/g,
      `12 Monate KMU Pro (Listenpreis Jahresabo: ${KMU_PRO_YEARLY_NET_EUR.toLocaleString('de-DE')} € netto)`,
    );
}

for (const target of TARGETS) {
  const filePath = path.join(ROOT, target.file);
  let html = fs.readFileSync(filePath, 'utf8');
  const section = applyHeadlineOverrides(pricingSection, target);
  html = replacePricingSection(html, section);
  html = replacePricingScript(html, pricingScript);
  html = ensurePricingFeaturesScript(html);
  html = replaceOffers(html);
  html = patchTurnkeyStalePricingCopy(html);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ ${target.file}`);
}
