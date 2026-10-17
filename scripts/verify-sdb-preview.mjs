import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('public/sdb-preview-config.json', 'utf8'));
if (!config.apiBaseUrl || !config.registerBaseUrl) {
  console.error('sdb-preview-config.json: apiBaseUrl und registerBaseUrl erforderlich');
  process.exit(1);
}

const unlockTest = new URL(config.registerBaseUrl);
unlockTest.searchParams.set('previewToken', 'test-token');
if (!unlockTest.searchParams.get('previewToken')) {
  console.error('Unlock-URL-Test fehlgeschlagen');
  process.exit(1);
}

console.log('✓ sdb-preview config & unlock URL shape OK');
