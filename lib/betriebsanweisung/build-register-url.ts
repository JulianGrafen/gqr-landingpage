const DEFAULT_REGISTER = 'https://app.gefahrstoff-qr.de/register';

/** Self-serve Registrierung mit UTM + optional returnTo für Betriebsanweisungs-Landingpages. */
export function buildBetriebsanweisungRegisterUrl(slug: string, registerBaseUrl = DEFAULT_REGISTER): string {
  const url = new URL(registerBaseUrl.replace(/\/$/, ''));
  url.searchParams.set('utm_source', 'landing');
  url.searchParams.set('utm_medium', 'betriebsanweisung');
  url.searchParams.set('utm_campaign', slug);
  url.searchParams.set('returnTo', `/betriebsanweisung/${slug}/`);
  return url.toString();
}

export { DEFAULT_REGISTER as BETRIEBSANWEISUNG_REGISTER_URL };
