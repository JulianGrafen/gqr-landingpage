/**
 * Tailwind-Klassen der Startseiten-Sektionen, 1:1 aus index.html übernommen (AGENTS.md: Design-Cloning).
 * Zentral gehalten, damit neue Sektionen exakt denselben Look wie die bestehenden haben.
 */
export const HOME_SECTION_STYLES = {
  section: 'border-t border-white/[0.07] py-14 lg:py-24',
  sectionRaised: 'border-t border-white/[0.07] bg-white/[0.02] py-14 lg:py-24',
  container: 'mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-10',
  header: 'mx-auto mb-12 max-w-2xl text-center',
  eyebrow: 'mb-3 text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm',
  headline: 'text-2xl font-black text-[#f0f6ff] sm:text-3xl lg:text-4xl',
  lead: 'mt-4 text-base leading-relaxed text-[#8fa4c0]',
  card: 'rounded-2xl border border-white/[0.08] bg-[#0f1e35]/60 p-6',
  cardTitle: 'text-lg font-bold text-[#f0f6ff]',
  cardText: 'mt-2 text-sm leading-relaxed text-[#8fa4c0]',
  checkmark: 'text-teal-300',
  primaryCta: 'btn-cta-orange inline-flex min-h-[52px] items-center justify-center whitespace-nowrap px-8 text-base',
  secondaryLink: 'sds-secondary-link',
  ctaGroup: 'mt-10 flex flex-col items-center gap-3',
} as const;
