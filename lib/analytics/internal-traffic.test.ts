import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveIsInternalTraffic } from '@/lib/analytics/internal-traffic';

test('resolveIsInternalTraffic erkennt lokale Hosts, Preview und Build-Flag', () => {
  assert.equal(
    resolveIsInternalTraffic({
      hostname: 'localhost',
      localStorageMarksInternal: false,
      buildMarksInternal: false,
    }),
    true,
  );
  assert.equal(
    resolveIsInternalTraffic({
      hostname: 'juliangrafen.github.io',
      localStorageMarksInternal: false,
      buildMarksInternal: false,
    }),
    true,
  );
  assert.equal(
    resolveIsInternalTraffic({
      hostname: 'gefahrstoff-qr.de',
      localStorageMarksInternal: true,
      buildMarksInternal: false,
    }),
    true,
  );
  assert.equal(
    resolveIsInternalTraffic({
      hostname: 'gefahrstoff-qr.de',
      localStorageMarksInternal: false,
      buildMarksInternal: true,
    }),
    true,
  );
  assert.equal(
    resolveIsInternalTraffic({
      hostname: 'gefahrstoff-qr.de',
      localStorageMarksInternal: false,
      buildMarksInternal: false,
    }),
    false,
  );
});