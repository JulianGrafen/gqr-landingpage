import { CONTACT_CALENDLY_URL, CONTACT_EMAIL } from '@/config/aeo-config';

const faqContactLinkClass = 'font-semibold text-teal-300 underline-offset-2 hover:underline';

/** Kontaktzeile unter dem FAQ-Accordion auf der Startseite (sync:home → FAQ_FOOTER). */
export function HomeFaqContactFooter() {
  return (
    <div className="mt-8 text-center text-base leading-relaxed text-[#c5d0e2] sm:text-lg">
      <p>
        Noch Fragen?{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className={faqContactLinkClass}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-5 flex justify-center">
        <a
          href={CONTACT_CALENDLY_URL}
          className="btn-glass-outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Austausch per Call buchen →
        </a>
      </p>
    </div>
  );
}
