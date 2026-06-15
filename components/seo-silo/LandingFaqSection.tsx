import type { SeoSiloFaqItem } from '@/config/seo-silo/types';

type LandingFaqSectionProps = {
  faq: SeoSiloFaqItem[];
  id?: string;
  title?: string;
};

export function LandingFaqSection({
  faq,
  id = 'silo-faq',
  title = 'Häufige Fragen',
}: LandingFaqSectionProps) {
  return (
    <section className="border-b border-white/[0.07] py-14 lg:py-20" aria-labelledby={`${id}-title`}>
      <div className="gqr-container">
        <h2 id={`${id}-title`} className="gqr-post-faq-heading">
          {title}
        </h2>
        <div className="gqr-post-faq-list">
          {faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <div className="gqr-post-faq-answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
