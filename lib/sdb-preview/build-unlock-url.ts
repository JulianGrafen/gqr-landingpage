const DEFAULT_REGISTER = 'https://app.gefahrstoff-qr.de/register';

export type UnlockUrlOptions = {
  previewToken: string;
  registerBaseUrl?: string;
  returnTo?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export function buildUnlockRegisterUrl(options: UnlockUrlOptions): string {
  const base = (options.registerBaseUrl ?? DEFAULT_REGISTER).replace(/\/$/, '');
  const url = new URL(base);
  url.searchParams.set('previewToken', options.previewToken);
  if (options.returnTo) {
    url.searchParams.set('returnTo', options.returnTo);
  }
  url.searchParams.set('utm_source', options.utmSource ?? 'landing');
  url.searchParams.set('utm_medium', options.utmMedium ?? 'sdb-live-preview');
  url.searchParams.set('utm_campaign', options.utmCampaign ?? 'trgs555-teaser');
  return url.toString();
}
