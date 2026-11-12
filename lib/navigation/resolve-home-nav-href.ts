/** Hash-Anker auf Unterseiten → Sprungmarken der Startseite (`/#preise`). */
export function resolveHomeNavHref(href: string, homePathPrefix = ''): string {
  if (!homePathPrefix) return href;
  if (href.startsWith('#')) return `${homePathPrefix}${href}`;
  return href;
}
