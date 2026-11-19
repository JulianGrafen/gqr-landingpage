import { validateIndustryEntries } from '../lib/loesungen/validate-industry-entries';
import { INDUSTRY_SLUGS } from '../config/industry-solutions';

try {
  validateIndustryEntries();
  console.log(`✓ ${INDUSTRY_SLUGS.length} Branchen-Landingpages validiert.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}