import { validateHazardousSubstanceEntries } from '../lib/betriebsanweisung/validate-entries';
import { HAZARDOUS_SUBSTANCE_SEO_ENTRIES } from '../config/betriebsanweisung/entries';

try {
  validateHazardousSubstanceEntries();
  console.log(`✓ ${HAZARDOUS_SUBSTANCE_SEO_ENTRIES.length} Betriebsanweisung-Einträge validiert.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
