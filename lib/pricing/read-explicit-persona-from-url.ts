import type { PricingPersonaId } from '@/lib/pricing-config';

/** Per URL gewählter SiFa-Tab (`?tab=sifa` oder `#preise?tab=sifa`); sonst `null`. */
export function readExplicitPersonaFromUrl(
  search: string,
  hash: string,
): PricingPersonaId | null {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  if (params.get('tab') === 'sifa') return 'sifa';

  const queryInHash = hash.indexOf('?');
  if (queryInHash >= 0) {
    const hashParams = new URLSearchParams(hash.slice(queryInHash + 1));
    if (hashParams.get('tab') === 'sifa') return 'sifa';
  }

  return null;
}