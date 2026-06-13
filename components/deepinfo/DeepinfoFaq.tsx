import type { DeepinfoFaqItem } from '@/lib/wissen/types';

type DeepinfoFaqProps = {
  faq: DeepinfoFaqItem[];
};

export function DeepinfoFaq({ faq }: DeepinfoFaqProps) {
  return (
    <section className="mt-14 border-t gqr-divider pt-14" aria-labelledby="deepinfo-faq-heading">
      <header className="max-w-3xl">
        <p className="gqr-kicker">FAQ</p>
        <h2 id="deepinfo-faq-heading" className="gqr-section-title mt-2">
          Häufige Fragen
        </h2>
        <p className="gqr-section-sub mt-3">
          Kurz, rational und praxisnah — für SiFa, Geschäftsführung und Betrieb.
        </p>
      </header>
      <div className="gqr-faq-list mt-8">
        {faq.map((item) => (
          <details key={item.question} className="gqr-faq group">
            <summary>{item.question}</summary>
            <div className="gqr-faq__answer">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
