import {
  ORGANIZATION_KNOWS_ABOUT,
  organizationSameAsUrls,
  PRODUCT_ENTITY,
} from '@/config/aeo-config';
import { COMPANY } from '@/config/company';
import { SITE_URL } from '@/config/site-seo';
import { ORGANIZATION_ID } from '@/lib/seo/build-software-application-schema';

const ORGANIZATION_DESCRIPTION =
  'Gefahrstoff-QR ist eine browserbasierte Software für das Gefahrstoffverzeichnis nach § 6 GefStoffV. Sie erstellt aus Sicherheitsdatenblättern KI-gestützte Entwürfe zur fachlichen Freigabe durch die SiFa oder den Arbeitgeber. Hosting in Deutschland.';

/** schema.org Organization — zentrale Entität (`@id`) für Startseite und JSON-LD-Verweise. */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: PRODUCT_ENTITY.name,
    url: PRODUCT_ENTITY.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 200,
      height: 60,
    },
    description: ORGANIZATION_DESCRIPTION,
    email: COMPANY.contactEmail,
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    knowsAbout: [...ORGANIZATION_KNOWS_ABOUT],
    sameAs: [...organizationSameAsUrls()],
  };
}