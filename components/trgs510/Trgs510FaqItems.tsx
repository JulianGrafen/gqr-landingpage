import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

type Trgs510FaqItemsProps = {
  items: readonly SeoFaqItem[];
};

/**
 * Sichtbare FAQ auf der TRGS-510-Seite; dieselben Items wie das FAQPage-JSON-LD.
 */
export function Trgs510FaqItems({ items }: Trgs510FaqItemsProps) {
  return (
    <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="relative cursor-pointer list-none pr-8 text-base font-semibold text-slate-900 marker:content-none after:absolute after:right-0 after:text-xl after:text-[#ff6b35] after:content-['+'] group-open:after:content-['-']">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}