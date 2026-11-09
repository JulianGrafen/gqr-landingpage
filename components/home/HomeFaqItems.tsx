import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

const SUMMARY_CLASS =
  "relative cursor-pointer list-none pr-8 text-left text-base font-semibold text-[#f0f6ff] marker:content-none after:absolute after:right-0 after:text-xl after:text-teal-300 after:content-['+'] group-open:after:content-['–']";

type HomeFaqItemsProps = {
  items: readonly SeoFaqItem[];
};

/**
 * Sichtbare FAQ-Einträge der Startseite. Dieselben Items speisen das FAQPage-JSON-LD,
 * damit Schema und sichtbarer Inhalt nie auseinanderlaufen.
 */
export function HomeFaqItems({ items }: HomeFaqItemsProps) {
  return (
    <>
      {items.map((item, index) => (
        <details key={item.question} className="gqr-faq group py-5" open={index === 0}>
          <summary className={SUMMARY_CLASS}>{item.question}</summary>
          <div className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </>
  );
}
