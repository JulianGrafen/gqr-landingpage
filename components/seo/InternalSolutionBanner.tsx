import type { SolutionCallout } from '@/lib/seo/internalLinks';

type InternalSolutionBannerProps = {
  callout: SolutionCallout;
  /**
   * `app`: Next-Seiten (Tailwind, dunkles pSEO-Layout).
   * `static-blog`: statische Blog-HTML mit `gqr-blog.css` (ohne Tailwind), gerendert per Sync-Skript.
   */
  variant?: 'app' | 'static-blog';
  className?: string;
};

/**
 * Kontextbezogener Hinweis von Zubringerseiten auf eine Branchenlösung.
 * Der Linktext ist der Ankertext für Google: immer beschreibend, nie „hier klicken“.
 */
export function InternalSolutionBanner({ callout, variant = 'app', className = '' }: InternalSolutionBannerProps) {
  if (variant === 'static-blog') {
    return (
      <aside className="post-cta-box" aria-label={callout.eyebrow}>
        <p>
          <strong>{callout.eyebrow}</strong>
        </p>
        <p>{callout.body}</p>
        <p>
          <a href={callout.href}>{callout.anchorText}</a>
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-label={callout.eyebrow}
      className={`rounded-2xl border border-[#ff6b35]/35 bg-[#ff6b35]/[0.06] p-5 text-left sm:p-6 ${className}`.trim()}
    >
      <p className="m-0 text-xs font-bold uppercase tracking-wider text-[#ff6b35]">{callout.eyebrow}</p>
      <p className="mb-0 mt-2 text-sm leading-relaxed text-[#c8d4e6] sm:text-base">{callout.body}</p>
      <a
        href={callout.href}
        className="mt-4 inline-flex items-start gap-2 text-base font-bold text-[#f0f6ff] underline decoration-[#ff6b35]/60 underline-offset-4 transition hover:decoration-[#ff6b35]"
      >
        <span>{callout.anchorText}</span>
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
