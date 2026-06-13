import type { DeepinfoFaqItem } from '@/lib/wissen/types';

type DeepinfoFaqProps = {
  faq: DeepinfoFaqItem[];
};

export function DeepinfoFaq({ faq }: DeepinfoFaqProps) {
  return (
    <>
      <h2 className="gqr-post-faq-heading">Häufige Fragen</h2>
      <div className="gqr-post-faq-list">
        {faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <div className="gqr-post-faq-answer">{item.answer}</div>
          </details>
        ))}
      </div>
    </>
  );
}
