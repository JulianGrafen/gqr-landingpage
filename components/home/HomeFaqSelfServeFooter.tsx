import { APP_REGISTER_URL } from '@/config/aeo-config';
import { PRICING_TRIAL_VALUE_PROPOSITION } from '@/config/pricing-trial-copy';

/** Produkt-Einstieg unter dem FAQ — ohne Calendly/Beratungs-Mail (Branchen- & Zielgruppenseiten). */
export function HomeFaqSelfServeFooter() {
  return (
    <div className="mt-8 text-center text-base leading-relaxed text-[#c5d0e2] sm:text-lg">
      <p className="flex justify-center">
        <a
          className="btn-cta-orange inline-flex min-h-[52px] items-center justify-center whitespace-nowrap px-8 text-base"
          href={APP_REGISTER_URL}
        >
          Jetzt kostenlos testen
        </a>
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm text-[#8fa4c0]">
        {PRICING_TRIAL_VALUE_PROPOSITION} — kein Verkaufsgespräch.
      </p>
    </div>
  );
}