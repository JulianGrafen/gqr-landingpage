const DEFAULT_REGISTER = 'https://app.gefahrstoff-qr.de/register';

export type BetriebsanweisungRegisterUrlOptions = {
  /** Unterscheidet CTA-Positionen in der Auswertung (z. B. "muster-vorschau", "sifa-box"). */
  utmContent?: string;
  registerBaseUrl?: string;
};

/** Self-serve Register-Link mit UTM-Parametern und Rücksprung auf die Stoffseite. */
export function buildBetriebsanweisungRegisterUrl(
  slug: string,
  { utmContent, registerBaseUrl = DEFAULT_REGISTER }: BetriebsanweisungRegisterUrlOptions = {},
): string {
  const url = new URL(registerBaseUrl.replace(/\/$/, ''));
  url.searchParams.set('utm_source', 'landing');
  url.searchParams.set('utm_medium', 'betriebsanweisung');
  url.searchParams.set('utm_campaign', slug);
  if (utmContent) url.searchParams.set('utm_content', utmContent);
  url.searchParams.set('returnTo', `/betriebsanweisung/${slug}/`);
  return url.toString();
}

export { DEFAULT_REGISTER as BETRIEBSANWEISUNG_REGISTER_URL };
