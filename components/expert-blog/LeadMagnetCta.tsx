import Link from 'next/link';

type LeadMagnetCtaProps = {
  title?: string;
  body?: string;
  /** Link-Text des Haupt-Buttons (z. B. für seiten­spezifische Lead-Magnete) */
  ctaLabel?: string;
  ctaHref?: string;
};

export function LeadMagnetCta({
  title = 'Kostenlos testen',
  body = 'Übernehmen Sie strukturierte Daten aus Ihren echten Sicherheitsdatenblättern und prüfen Sie Freigaben im gewohnten Prozess — ohne langfristige Bindung.',
  ctaLabel = 'Jetzt kostenlos testen',
  ctaHref = 'https://app.gefahrstoff-qr.de/register',
}: LeadMagnetCtaProps) {
  return (
    <aside
      className="rounded-2xl border border-[#2dd4bf]/30 bg-gradient-to-br from-[#0f1e35] to-[#162340] p-8 text-center shadow-xl sm:p-10"
      aria-label="Testangebot"
    >
      <h2 className="text-2xl font-bold text-[#f0f6ff] sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-[#8fa4c0]">{body}</p>
      <Link
        href={ctaHref}
        className="gqr-cta-primary gqr-cta-primary--lg mt-8 inline-flex"
      >
        {ctaLabel}
      </Link>
      <p className="mt-4 text-sm text-[#8fa4c0]">
        Keine Kreditkarte · Sie entscheiden über Freigaben und
        Rechtssicherheit im Betrieb
      </p>
    </aside>
  );
}
