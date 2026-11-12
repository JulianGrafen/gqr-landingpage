import { TURNKEY_AUDIT } from '@/config/home-sections/turnkey-audit';
import { ORGANIZATION_ID } from '@/lib/seo/build-software-application-schema';
import { SITE_URL } from '@/config/site-seo';

export const TURNKEY_SERVICE_ID = `${SITE_URL}/#${TURNKEY_AUDIT.sectionId}`;

/** schema.org Service + Offer für das DFY-Audit-Paket (AEO / High-Intent). */
export function buildTurnkeyAuditServiceSchema() {
  const { schema } = TURNKEY_AUDIT;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': TURNKEY_SERVICE_ID,
    name: schema.name,
    description: schema.description,
    provider: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: schema.providerName,
    },
    areaServed: schema.areasServed.map((name) => ({
      '@type': 'Country',
      name,
    })),
    offers: {
      '@type': 'Offer',
      price: schema.priceEur.toFixed(2),
      priceCurrency: schema.currency,
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/LimitedAvailability',
      url: `${SITE_URL}${TURNKEY_AUDIT.deepinfoPath}`,
      eligibleRegion: schema.areasServed.map((name) => ({
        '@type': 'Country',
        name,
      })),
    },
  };
}
