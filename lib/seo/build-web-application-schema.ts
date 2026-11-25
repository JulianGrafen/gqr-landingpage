import { toAbsoluteSiteUrl } from '@/config/aeo-config';

export type WebApplicationSchemaInput = {
  name: string;
  path: string;
  description: string;
  applicationCategory: string;
};

/** schema.org WebApplication ohne Preis- oder Bewertungsangaben. */
export function buildWebApplicationSchema(input: WebApplicationSchemaInput) {
  const normalizedUrl = input.path.startsWith('http') ? input.path : toAbsoluteSiteUrl(input.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: input.name,
    url: normalizedUrl,
    applicationCategory: input.applicationCategory,
    operatingSystem: 'Web Browser',
    description: input.description,
  };
}