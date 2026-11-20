type AvvDownloadCardProps = {
  title: string;
  description: string;
  pdfHref: string;
  /** false → Datei noch nicht hinterlegt: Hinweis + E-Mail statt totem Download-Link. */
  isPdfAvailable: boolean;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
  pendingNotice: string;
};

/** Ungated Download-Card für den AVV: kein Formular, keine E-Mail-Pflicht. */
export function AvvDownloadCard({
  title,
  description,
  pdfHref,
  isPdfAvailable,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  pendingNotice,
}: AvvDownloadCardProps) {
  return (
    <div className="gqr-sidebar-card gqr-sidebar-card--cta flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex min-w-0 gap-4">
        <svg
          className="h-10 w-10 shrink-0 text-gqr-trust"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M12 12v6" />
          <path d="m9 15 3 3 3-3" />
        </svg>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gqr-text">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-gqr-muted">{description}</p>
          {isPdfAvailable ? null : (
            <p className="mt-3 text-sm leading-relaxed text-gqr-soft" role="note">
              {pendingNotice}
            </p>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end">
        {isPdfAvailable ? (
          <a href={pdfHref} className="gqr-cta-primary gqr-cta-primary--lg no-underline" download>
            {primaryLabel}
          </a>
        ) : null}
        <a
          href={secondaryHref}
          className={isPdfAvailable ? 'gqr-link text-sm font-semibold' : 'gqr-cta-primary gqr-cta-primary--lg no-underline'}
        >
          {secondaryLabel}
        </a>
      </div>
    </div>
  );
}
