import type { ReactNode } from 'react';
import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { JsonLd } from '@/components/seo/JsonLd';
import { TURNKEY_AUDIT } from '@/config/home-sections/turnkey-audit';
import { buildTurnkeyAuditServiceSchema } from '@/lib/seo/build-turnkey-service-schema';

const CHECKMARK = '✓';

const accordionItemClass =
  'turnkey-audit-accordion rounded-xl border border-white/[0.08] bg-[#0f1e35]/50 open:border-teal-400/20';
const accordionSummaryClass =
  'cursor-pointer list-none px-4 py-3.5 pr-10 text-left text-sm font-bold leading-snug text-[#f0f6ff] sm:px-5 sm:py-4 sm:text-base';
const accordionBodyClass = 'px-4 pb-4 pt-0 text-sm leading-relaxed text-[#8fa4c0] sm:px-5 sm:pb-5 sm:text-base';

type TurnkeyAccordionProps = {
  summary: string;
  children: ReactNode;
};

function TurnkeyAccordion({ summary, children }: TurnkeyAccordionProps) {
  return (
    <details className={accordionItemClass}>
      <summary className={accordionSummaryClass}>{summary}</summary>
      <div className={accordionBodyClass}>{children}</div>
    </details>
  );
}

function TurnkeyPillarList() {
  return (
    <ul className="m-0 list-none space-y-3 p-0" aria-label="Leistungsbestandteile des Komplett-Pakets">
      {TURNKEY_AUDIT.pillars.map((pillar) => (
        <li key={pillar} className="flex gap-2.5 text-base leading-relaxed text-[#c5d0e2]">
          <span className={`${styles.checkmark} shrink-0`} aria-hidden="true">
            {CHECKMARK}
          </span>
          <span>{pillar}</span>
        </li>
      ))}
    </ul>
  );
}

function TurnkeyFactsOverview() {
  return (
    <dl className="m-0 grid gap-3 sm:grid-cols-2">
      {TURNKEY_AUDIT.facts.map((fact) => (
        <div key={fact.term}>
          <dt className="text-xs font-bold uppercase tracking-wide text-[#8fa4c0]">{fact.term}</dt>
          <dd className="mt-1 text-sm font-semibold text-[#f0f6ff]">{fact.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

function TurnkeyPriceCard() {
  const { pricing, cta, secondaryCta } = TURNKEY_AUDIT;

  return (
    <article
      className="flex flex-col rounded-2xl border border-[#ff6b35]/40 bg-[#0f1e35]/90 p-5 shadow-lg shadow-[#ff6b35]/10 lg:p-6"
      aria-labelledby="turnkey-price-heading"
    >
      <p className="inline-flex w-fit rounded-full border border-[#ff6b35]/50 bg-[#ff6b35]/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-[#ffb48a] sm:text-xs">
        {pricing.capacityBadge}
      </p>

      <h3 id="turnkey-price-heading" className="sr-only">
        Festpreis Schlüsselfertig-Service
      </h3>

      <p className="mt-4 text-sm text-[#8fa4c0]">
        <s className="text-[#6b7f9c]">{pricing.anchorLabel}</s>
      </p>
      <p className="mt-1 text-3xl font-black tracking-tight text-[#f0f6ff] sm:text-4xl">{pricing.priceLabel}</p>
      <p className="mt-1 text-sm font-semibold text-[#8fa4c0]">{pricing.priceNote}</p>

      <div className="mt-5 flex flex-col gap-3">
        <a className="btn-cta-orange btn-cta-orange--block sds-hero__cta text-center" href={cta.href}>
          {cta.label}
        </a>
        <a className={`${styles.secondaryLink} text-center text-sm`} href={secondaryCta.href}>
          {secondaryCta.label} →
        </a>
      </div>
    </article>
  );
}

type TurnkeyPageContext = 'home' | 'wissen';

function TurnkeyContextLinks({ context }: { context: TurnkeyPageContext }) {
  if (context === 'wissen') {
    return (
      <p className="m-0 text-sm text-[#8fa4c0]">
        <a className={`${styles.secondaryLink} text-sm font-semibold`} href={TURNKEY_AUDIT.homePricingHref}>
          {TURNKEY_AUDIT.homePricingLinkLabel} →
        </a>
      </p>
    );
  }

  return (
    <p className="m-0 text-sm text-[#8fa4c0]">
      <a className={`${styles.secondaryLink} text-sm font-semibold`} href={TURNKEY_AUDIT.deepinfoPath}>
        {TURNKEY_AUDIT.deepinfoLinkLabel} →
      </a>
    </p>
  );
}

function TurnkeyExpandableContent({ context }: { context: TurnkeyPageContext }) {
  const { accordion, aeoLead, pricing } = TURNKEY_AUDIT;

  return (
    <div className="mt-6 flex flex-col gap-2 border-t border-white/[0.08] pt-6">
      <TurnkeyAccordion summary={accordion.aeoSummary}>
        <p className="m-0 text-[#c5d0e2]">{aeoLead}</p>
      </TurnkeyAccordion>
      <TurnkeyAccordion summary={accordion.pillarsSummary}>
        <TurnkeyPillarList />
      </TurnkeyAccordion>
      <TurnkeyAccordion summary={accordion.factsSummary}>
        <TurnkeyFactsOverview />
      </TurnkeyAccordion>
      <TurnkeyAccordion summary={accordion.guaranteeSummary}>
        <p className="m-0 rounded-lg border border-teal-400/25 bg-teal-400/5 p-3 text-[#c5d0e2]">
          {pricing.guarantee}
        </p>
      </TurnkeyAccordion>
      <TurnkeyContextLinks context={context} />
    </div>
  );
}

function TurnkeyFaqBlock() {
  return (
    <div className="mt-8 border-t border-white/[0.08] pt-6">
      <h3 className="text-base font-bold text-[#f0f6ff] sm:text-lg">Häufige Fragen zum Schlüsselfertig-Paket</h3>
      <div className="mt-3 flex flex-col gap-2" role="list">
        {TURNKEY_AUDIT.faq.map((item) => (
          <details key={item.question} className={accordionItemClass} role="listitem">
            <summary className={accordionSummaryClass}>{item.question}</summary>
            <div className={accordionBodyClass}>{item.answer}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

type TurnkeyAuditSectionProps = {
  className?: string;
  context?: TurnkeyPageContext;
};

/** DFY High-Ticket-Block (Startseite #preise oder Wissen-Deepinfo). */
export function TurnkeyAuditSection({ className = 'mt-12', context = 'home' }: TurnkeyAuditSectionProps) {
  const { sectionId, headlineId, badge, headline, compactTeaser } = TURNKEY_AUDIT;

  return (
    <section id={sectionId} className={className} aria-labelledby={headlineId}>
      <JsonLd data={buildTurnkeyAuditServiceSchema()} />

      <div className="rounded-2xl border border-[#ff6b35]/40 bg-[#0a1628] p-5 shadow-lg shadow-[#ff6b35]/10 lg:p-7">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 lg:items-start">
          <div className="min-w-0 lg:col-span-7">
            <p className={`${styles.eyebrow} mb-2`}>{badge}</p>
            <h2 id={headlineId} className="text-xl font-black leading-tight text-[#f0f6ff] sm:text-2xl lg:text-3xl">
              {headline}
            </h2>
            <p className="mt-3 text-sm font-semibold text-[#c5d0e2] sm:text-base">{compactTeaser}</p>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <TurnkeyPriceCard />
          </div>
        </div>

        <TurnkeyExpandableContent context={context} />
        <TurnkeyFaqBlock />
      </div>
    </section>
  );
}
