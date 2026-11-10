/**
 * Gemeinsames Layout für programmatische SEO-Slugs (Betriebsanweisung, Lösungen, zukünftige Serien).
 * Neue `[slug]`-Routen importieren diese Tokens statt eigene Klassen zu hardcodieren.
 */

export const PSEO_PAGE_MAIN = 'bg-[#0a1628]';

export const PSEO_SECTION =
  'border-b border-white/[0.07] px-4 py-12 text-left sm:px-6 lg:px-8 lg:py-14';

export const PSEO_SECTION_MUTED = `${PSEO_SECTION} bg-[#0f1e35]/50`;

export const PSEO_SECTION_HERO =
  'border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-12 text-left sm:px-6 lg:px-8 lg:py-16';

export const PSEO_CONTAINER = 'mx-auto w-full max-w-6xl';

/** Schmale Textspalte, links in der 6xl-Spur (nicht zentriert). */
export const PSEO_PROSE = 'max-w-3xl';

export const PSEO_PILL_LIST = 'm-0 flex list-none flex-wrap gap-2 p-0';
