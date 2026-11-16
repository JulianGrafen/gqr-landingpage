import { INTENT_SWITCH, type IntentCard, type IntentCtaTarget } from '@/config/betriebsanweisung/conversion-copy';
import { buildBetriebsanweisungRegisterUrl } from '@/lib/betriebsanweisung/build-register-url';

type Props = {
  slug: string;
};

function resolveCtaHref(target: IntentCtaTarget, slug: string): string {
  return target.kind === 'path'
    ? target.href
    : buildBetriebsanweisungRegisterUrl(slug, { utmContent: target.utmContent });
}

function IntentCardView({ card, slug }: { card: IntentCard; slug: string }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0f1e35]/60 p-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm">{card.audience}</p>
      <h3 className="text-lg font-bold text-[#f0f6ff]">{card.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#8fa4c0]">{card.body}</p>
      <a
        href={resolveCtaHref(card.cta.target, slug)}
        className="mt-5 inline-flex font-semibold text-teal-300 underline-offset-2 hover:underline"
      >
        {card.cta.label}
      </a>
    </article>
  );
}

/** Intent-Weiche vor der FAQ: Schlüsselfertig-Service für KMU vs. Self-Serve für externe SiFas. */
export function BetriebsanweisungIntentSwitch({ slug }: Props) {
  return (
    <section aria-labelledby="ba-intent-switch-heading">
      <h2 id="ba-intent-switch-heading" className="text-2xl font-bold text-[#f0f6ff]">
        {INTENT_SWITCH.headline}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <IntentCardView card={INTENT_SWITCH.turnkey} slug={slug} />
        <IntentCardView card={INTENT_SWITCH.sifa} slug={slug} />
      </div>
    </section>
  );
}
