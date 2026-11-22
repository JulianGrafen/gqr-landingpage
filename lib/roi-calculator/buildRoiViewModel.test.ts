import assert from 'node:assert/strict';
import test from 'node:test';
import { buildRoiViewModel } from '@/lib/roi-calculator/buildRoiViewModel';
import {
  ROI_CLIENT_SLIDER,
  ROI_KMU_HOURLY_RATE_EUR,
  ROI_SIFA_HOURLY_RATE_EUR,
  ROI_SUBSTANCE_SLIDER,
} from '@/lib/roi-calculator/computeTimeSavings';
import { formatRoiDuration } from '@/lib/roi-calculator/formatDuration';
import { resolveSoftwareTariff } from '@/lib/roi-calculator/resolveSoftwareTariff';

test('KMU-Default: 35 Stoffe, KMU Pro, Personalkosten ohne ROI-Zeile', () => {
  const view = buildRoiViewModel({
    mode: 'kmu',
    substancesPerScope: ROI_SUBSTANCE_SLIDER.kmuDefault,
    clientCount: ROI_CLIENT_SLIDER.default,
  });

  assert.equal(view.totalSubstances, 35);
  assert.equal(view.totalSubstancesText, 'Gesamt: 35 Sicherheitsdatenblätter');
  assert.equal(view.traditional.value, '11,7');
  assert.equal(view.traditional.unit, 'h');
  assert.equal(view.digital.value, '1,8');
  assert.equal(view.digital.unit, 'h');
  assert.equal(view.savedHoursLabel, '9,9');
  assert.equal(view.costLabel, 'Gesparte Personalkosten');
  assert.equal(view.costHint, `(bei ${ROI_KMU_HOURLY_RATE_EUR}\u00a0€/h)`);
  assert.equal(view.roiLine, null);
  assert.equal(resolveSoftwareTariff({ mode: 'kmu', substancesPerScope: 35, clientCount: 1 }).yearlyPriceEur, 1188);
});

test('KMU Basis bis 30 Stoffe, Pro ab 31', () => {
  assert.equal(resolveSoftwareTariff({ mode: 'kmu', substancesPerScope: 30, clientCount: 1 }).planId, 'kmu-basis');
  assert.equal(resolveSoftwareTariff({ mode: 'kmu', substancesPerScope: 30, clientCount: 1 }).yearlyPriceEur, 588);
  assert.equal(resolveSoftwareTariff({ mode: 'kmu', substancesPerScope: 31, clientCount: 1 }).planId, 'kmu-pro');
});

test('SiFa-Default: 25 x 15 = 375 SDBs, GHS-Zeiten in Stunden, ROI sichtbar', () => {
  const view = buildRoiViewModel({
    mode: 'sifa',
    substancesPerScope: ROI_SUBSTANCE_SLIDER.sifaDefault,
    clientCount: ROI_CLIENT_SLIDER.default,
  });

  assert.equal(view.totalSubstances, 375);
  assert.equal(view.totalSubstancesText, 'Gesamt: 375 Sicherheitsdatenblätter');
  assert.equal(view.traditional.value, '125,0');
  assert.equal(view.traditional.unit, 'h');
  assert.equal(view.digital.value, '18,8');
  assert.equal(view.digital.unit, 'h');
  assert.equal(view.costLabel, 'Blockiertes Honorarpotenzial');
  assert.equal(view.costHint, `(bei ${ROI_SIFA_HOURLY_RATE_EUR}\u00a0€/h)`);
  assert.equal(view.roiLine, 'Software-Kosten: 1.908 €/Jahr · ROI: 5,6x');
});

test('SiFa ab 16 Mandanten: ein 10er-Block zum Jahres-Äquivalenzpreis', () => {
  const tariff = resolveSoftwareTariff({
    mode: 'sifa',
    substancesPerScope: 25,
    clientCount: 16,
  });
  assert.equal(tariff.monthlyEquivalentEur, 225);
  assert.equal(tariff.yearlyPriceEur, 2700);
});

test('formatRoiDuration: min nur unter 60 Minuten, 60 min als Stunden', () => {
  assert.deepEqual(formatRoiDuration(15), { value: '15', unit: 'min' });
  assert.deepEqual(formatRoiDuration(59), { value: '59', unit: 'min' });
  assert.deepEqual(formatRoiDuration(60), { value: '1,0', unit: 'h' });
});
