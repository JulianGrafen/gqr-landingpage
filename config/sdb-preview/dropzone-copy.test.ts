import assert from 'node:assert/strict';
import test from 'node:test';
import { HOME_HERO, HOME_HERO_H1_UNBROKEN_COMPOUND } from '@/config/home-sections/hero';
import { HERO_SDB_LIVE_METRIC } from '@/config/home-sections/hero-sdb-metric';
import { SDB_DROPZONE_COPY, SDB_DROPZONE_QUICK_EXAMPLE_ID } from '@/config/sdb-preview/dropzone-copy';
import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';

const GERMAN_DASHES = /[–—]/;

test('1-Klick-Beispiel nutzt das erste realistische SDB (Bremsenreiniger)', () => {
  assert.equal(SDB_DROPZONE_QUICK_EXAMPLE_ID, SDB_PREVIEW_EXAMPLES[0].id);
  assert.equal(SDB_DROPZONE_QUICK_EXAMPLE_ID, 'bremsenreiniger');
  assert.equal(SDB_DROPZONE_COPY.pickPdfLabel, 'PDF auswählen');
  assert.equal(SDB_DROPZONE_COPY.examplesLabel, 'Kein PDF zur Hand? Sofort mit 1 Klick testen:');
});

test('Dropzone-Copy ohne Gedankenstriche', () => {
  for (const text of Object.values(SDB_DROPZONE_COPY)) {
    assert.equal(GERMAN_DASHES.test(text), false, text);
  }
});

test('Hero-H1 bricht Gefahrstoffkataster nicht mit weichem Bindestrich', () => {
  assert.equal(HOME_HERO.headline.includes('\u00ad'), false);
  assert.equal(HOME_HERO.headline.startsWith(HOME_HERO_H1_UNBROKEN_COMPOUND), true);
});

test('SDB-Proof-Zeile nennt keine unbelegte Zahl und keine feste Zeitangabe', () => {
  assert.equal(/\d/.test(HERO_SDB_LIVE_METRIC.label), false);
});
