import assert from 'node:assert/strict';
import test from 'node:test';
import { HOME_HERO, HOME_HERO_H1_UNBROKEN_COMPOUND } from '@/config/home-sections/hero';
import { HERO_SDB_LIVE_METRIC } from '@/config/home-sections/hero-sdb-metric';
import { SDB_DROPZONE_COPY, SDB_DROPZONE_QUICK_EXAMPLE_ID } from '@/config/sdb-preview/dropzone-copy';
import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';

test('1-Klick-Beispiel nutzt das erste realistische SDB (Bremsenreiniger)', () => {
  assert.equal(SDB_DROPZONE_QUICK_EXAMPLE_ID, SDB_PREVIEW_EXAMPLES[0].id);
  assert.equal(SDB_DROPZONE_QUICK_EXAMPLE_ID, 'bremsenreiniger');
  assert.equal(SDB_DROPZONE_COPY.pickPdfLabel, 'PDF auswählen');
  assert.equal(SDB_DROPZONE_COPY.quickExampleLink, 'Kein PDF zur Hand? Mit Beispiel-SDB testen');
});

test('Hero-H1 bricht Gefahrstoffkataster nicht mit weichem Bindestrich', () => {
  assert.equal(HOME_HERO.headline.includes('\u00ad'), false);
  assert.equal(HOME_HERO.headline.startsWith(HOME_HERO_H1_UNBROKEN_COMPOUND), true);
});

test('SDB-Metrik verwendet entweder über oder +, nicht beides', () => {
  assert.equal(HERO_SDB_LIVE_METRIC.prefix.includes('über'), true);
  assert.equal(HERO_SDB_LIVE_METRIC.ariaLabel.includes('+'), false);
  assert.equal(HERO_SDB_LIVE_METRIC.ariaLabel, 'Bereits über 1.200 Sicherheitsdatenblätter ausgewertet');
});
