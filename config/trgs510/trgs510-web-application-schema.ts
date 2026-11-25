import { buildWebApplicationSchema } from '@/lib/seo/build-web-application-schema';

const PAGE_PATH = '/trgs-510-zusammenlagerungs-check/';
const WEB_APP_NAME = 'TRGS 510 Zusammenlagerungs-Check';

const WEB_APP_DESCRIPTION =
  'Browser-Tool zur Orientierung an Tabelle 12 der TRGS 510: zwei Lagerklassen wählen, Ampel-Ergebnis und Regeltext anzeigen. Unterstützt die fachliche Prüfung, ersetzt keine Gefährdungsbeurteilung.';

export const TRGS510_WEB_APPLICATION_SCHEMA = buildWebApplicationSchema({
  name: WEB_APP_NAME,
  path: PAGE_PATH,
  applicationCategory: 'UtilitiesApplication',
  description: WEB_APP_DESCRIPTION,
});