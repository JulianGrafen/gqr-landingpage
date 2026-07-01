type ExpertHeadingProps = {
  /** Für `aria-labelledby` an der Sektion */
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  /** `dark`: helle Typo auf dunklem Grund; `light`: für helle Sections */
  tone?: 'dark' | 'light';
};

/**
 * Sektionskopf im GQR-Stil (Eyebrow in Akzentfarbe, klare Hierarchie).
 */
export function ExpertHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'light',
}: ExpertHeadingProps) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : '';
  const titleCls = tone === 'dark' ? 'text-gqr-text' : 'text-slate-900';
  const subCls = tone === 'dark' ? 'text-gqr-muted' : 'text-slate-600';

  return (
    <header className={`max-w-3xl ${alignCls}`}>
      {eyebrow ? <p className="gqr-kicker">{eyebrow}</p> : null}
      <h2
        id={id}
        className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${titleCls}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${subCls}`}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
