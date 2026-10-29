#!/usr/bin/env node
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:3000';
const out = '/opt/cursor/artifacts';

const browser = await chromium.launch({ headless: true });

async function shot(page, path, url, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path, fullPage: false });
  console.log('saved', path);
}

const page = await browser.newPage();

await shot(page, `${out}/pr20-ba-hero-header.png`, `${base}/betriebsanweisung/ethylacetat-trgs-555/`, {
  width: 1400,
  height: 920,
});

await shot(page, `${out}/pr20-home-header-footer.png`, `${base}/`, { width: 1400, height: 900 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(300);
await page.screenshot({ path: `${out}/pr20-home-footer-links.png`, fullPage: false });
console.log('saved', `${out}/pr20-home-footer-links.png`);

await shot(page, `${out}/pr20-ba-header-mobile.png`, `${base}/betriebsanweisung/ethylacetat-trgs-555/`, {
  width: 390,
  height: 200,
});

await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(`${base}/betriebsanweisung/ethylacetat-trgs-555/`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /Aceton/i }).click();
await page.waitForSelector('[data-sdb-compact-result]', { timeout: 25000 });
await page.waitForTimeout(400);
await page.screenshot({ path: `${out}/pr20-ba-scan-blur.png`, fullPage: false });
console.log('saved', `${out}/pr20-ba-scan-blur.png`);

await browser.close();
