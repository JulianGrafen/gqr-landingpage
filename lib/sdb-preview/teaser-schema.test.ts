import assert from 'node:assert/strict';
import test from 'node:test';
import { buildTeaserFromPrefill, mapApiJsonToTeaser } from '@/lib/sdb-preview/map-teaser';
import { parseSdbPreviewTeaser } from '@/lib/sdb-preview/teaser-schema';

test('parseSdbPreviewTeaser: null-/Fehltyp-Felder fallen auf sichere Defaults', () => {
  const teaser = parseSdbPreviewTeaser({
    previewToken: 'tok-123',
    tradeName: null,
    manufacturer: 42,
    signalWord: 'Warnung',
    ghsPictograms: null,
    hazardStatements: ['H225 Entzündbar.', null, 7, ''],
    precautionaryStatements: undefined,
    protectiveEquipment: ['hand_protection', 'unbekannt'],
    storageClass: '',
    sections: [{ key: 'hazards', title: 'Gefahren', unlocked: 'ja', body: null }, { key: 'kaputt' }, null],
  });

  assert.ok(teaser);
  assert.equal(teaser.tradeName, 'Unbenannter Stoff');
  assert.equal(teaser.manufacturer, '42');
  assert.equal(teaser.signalWord, null);
  assert.deepEqual(teaser.ghsPictograms, []);
  assert.deepEqual(teaser.hazardStatements, ['H225 Entzündbar.', '7']);
  assert.deepEqual(teaser.precautionaryStatements, []);
  assert.deepEqual(teaser.protectiveEquipment, ['hand_protection']);
  assert.equal(teaser.storageClass, undefined);
  assert.deepEqual(teaser.sections, [{ key: 'hazards', title: 'Gefahren', unlocked: false, body: '' }]);
});

test('parseSdbPreviewTeaser: ohne previewToken kein Teaser', () => {
  assert.equal(parseSdbPreviewTeaser({ tradeName: 'X' }), null);
  assert.equal(parseSdbPreviewTeaser('kaputt'), null);
  assert.ok(parseSdbPreviewTeaser({}, 'fallback-token'));
});

test('mapApiJsonToTeaser: unvollständiger API-Teaser crasht nicht', () => {
  const teaser = mapApiJsonToTeaser({ ok: true, previewToken: 'root-token', teaser: { tradeName: 'Grundierung' } });
  assert.ok(teaser);
  assert.equal(teaser.previewToken, 'root-token');
  assert.deepEqual(teaser.hazardStatements, []);
  assert.deepEqual(teaser.sections, []);
});

test('buildTeaserFromPrefill: falsche Prefill-Typen werden normalisiert', () => {
  const teaser = buildTeaserFromPrefill(
    { name: 123, ghs_pictograms: 'GHS02', h_statements: null, lgk: ' 3 ', signal_word: 'Gefahr' },
    'demo-grundierung',
  );
  assert.equal(teaser.tradeName, '123');
  assert.deepEqual(teaser.ghsPictograms, []);
  assert.deepEqual(teaser.hazardStatements, []);
  assert.equal(teaser.storageClass, '3');
  assert.equal(teaser.signalWord, 'Gefahr');
});
