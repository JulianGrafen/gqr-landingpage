/**
 * Schreibt Stripe-Checkout-URLs aus der TS-Config in scripts/pricing-billing.js (SSoT → Runtime).
 * Ausführen: npx tsx --tsconfig tsconfig.scripts.json scripts/sync-pricing-stripe-checkout.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PRICING_STRIPE_CHECKOUT } from '@/config/pricing-stripe-checkout';

const BILLING_JS = resolve(process.cwd(), 'scripts/pricing-billing.js');
const json = JSON.stringify(PRICING_STRIPE_CHECKOUT, null, 2).replace(/\n/g, '\n  ');

let source = readFileSync(BILLING_JS, 'utf8');
const pattern = /var STRIPE_CHECKOUT = \{[\s\S]*?\};/;
if (!pattern.test(source)) {
  console.error('STRIPE_CHECKOUT-Block in pricing-billing.js nicht gefunden.');
  process.exit(1);
}
source = source.replace(pattern, `var STRIPE_CHECKOUT = ${json};`);
writeFileSync(BILLING_JS, source, 'utf8');
console.log('✓ scripts/pricing-billing.js: Stripe-URLs synchronisiert');
