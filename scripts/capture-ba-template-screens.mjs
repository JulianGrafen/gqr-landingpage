import { chromium, devices } from 'playwright';
import path from 'node:path';

const OUT = '/opt/cursor/artifacts/screenshots';
const base = process.env.SCREEN_BASE ?? 'http://127.0.0.1:3001';

async function shot(page, name) {
  await page.screenshot({ path: path.join(OUT, name), fullPage: false });
}

const browser = await chromium.launch();
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(`${base}/betriebsanweisung/ethylacetat-trgs-555/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await desktop.waitForTimeout(1500);
await shot(desktop, 'ba-hero-desktop-ethylacetat.png');

await desktop.evaluate(() => window.scrollTo(0, 920));
await desktop.waitForTimeout(400);
await shot(desktop, 'ba-contrast-ethylacetat.png');

await desktop.evaluate(() => {
  const h = document.getElementById('compliance-heading');
  h?.scrollIntoView({ block: 'start' });
});
await desktop.waitForTimeout(400);
await shot(desktop, 'ba-seo-text-ethylacetat.png');

await desktop.goto(`${base}/betriebsanweisung/heizoel-el-trgs-555/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await desktop.waitForTimeout(1500);
await desktop.evaluate(() => {
  const h = document.getElementById('compliance-heading');
  h?.scrollIntoView({ block: 'start' });
});
await desktop.waitForTimeout(400);
await shot(desktop, 'ba-seo-text-heizoel-el.png');

await desktop.goto(`${base}/betriebsanweisung/ethylacetat-trgs-555/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await desktop.waitForTimeout(1500);
await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await desktop.waitForTimeout(500);
await shot(desktop, 'ba-closing-cta-card.png');

const iphone = await browser.newPage({ ...devices['iPhone 13'] });
await iphone.goto(`${base}/betriebsanweisung/ethylacetat-trgs-555/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await iphone.waitForTimeout(1500);
await shot(iphone, 'ba-hero-mobile-ethylacetat.png');

await browser.close();
console.log('Screenshots saved to', OUT);
