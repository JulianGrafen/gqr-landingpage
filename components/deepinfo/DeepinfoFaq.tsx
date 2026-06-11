'use client';

import { useState } from 'react';
import { ExpertHeading } from '@/components/expert-blog/ExpertHeading';
import type { DeepinfoFaqItem } from '@/lib/wissen/types';

type DeepinfoFaqProps = {
  faq: DeepinfoFaqItem[];
};

export function DeepinfoFaq({ faq }: DeepinfoFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-14 border-t gqr-divider pt-14" aria-labelledby="deepinfo-faq-heading">
      <ExpertHeading
        id="deepinfo-faq-heading"
        eyebrow="FAQ"
        title="Häufige Fragen"
        subtitle="Kurz und praxisnah — für die fachliche Einordnung im Betrieb."
        tone="dark"
      />
      <div className="mt-8 space-y-3">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="gqr-card !p-0 shadow-gqr">
              <button
                type="button"
                id={`faq-trigger-${index}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-gqr-text sm:px-6"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/12 text-sm text-gqr-muted"
                  aria-hidden
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-trigger-${index}`}
                hidden={!isOpen}
                className="border-t gqr-divider px-5 pb-5 pt-3 text-sm leading-relaxed text-gqr-muted sm:px-6 sm:pb-6"
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
