import Link from 'next/link';
import { TRGS510_AUDIENCE_SECTION } from '@/config/trgs510/conversion-copy';

/** Zielgruppen-Einstieg (Betrieb vs. externe SiFa) direkt unter dem TRGS-510-Check. */
export function Trgs510AudienceCards() {
  return (
    <section className="mt-10" aria-labelledby="trgs510-audience-heading">
      <h2 id="trgs510-audience-heading" className="text-xl font-black text-[#f0f6ff] sm:text-2xl">
        {TRGS510_AUDIENCE_SECTION.heading}
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {TRGS510_AUDIENCE_SECTION.cards.map((card) => (
          <article
            key={card.id}
            className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0f1e35]/70 p-5 shadow-2xl shadow-black/20 sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">{card.eyebrow}</p>
            <h3 className="mt-2 text-lg font-black text-[#f0f6ff]">{card.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#8fa4c0]">{card.text}</p>
            <Link
              href={card.cta.href}
              className="gqr-cta-primary gqr-cta-primary--md mt-5 inline-flex justify-center no-underline sm:w-auto"
            >
              {card.cta.label}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
