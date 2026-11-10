const CONTACT_EMAIL = 'info@gefahrstoff-qr.de';

/** Startseiten-FAQ-Ersatz: Kontakt statt Accordion (sync:home → #faq). */
export function HomeFaqContact() {
  return (
    <div className="text-center">
      <p id="faqHeadline" className="text-lg leading-relaxed text-[#c5d0e2] sm:text-xl">
        Noch Fragen? Senden Sie uns eine Mail an:{' '}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-teal-300 underline-offset-2 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
}
