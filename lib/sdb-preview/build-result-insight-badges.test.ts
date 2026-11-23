import assert from 'node:assert/strict';
import test from 'node:test';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { buildResultInsightBadges, sharpPreviewSectionBody } from '@/lib/sdb-preview/build-result-insight-badges';
import { buildSuccessBadgeLabel, buildUnlockHeadline } from '@/lib/sdb-preview/build-unlock-headline';
import { resolvePreviewSourceLabel } from '@/lib/sdb-preview/resolve-preview-source-label';

function teaser(overrides: Partial<SdbPreviewTeaser> = {}): SdbPreviewTeaser {
  return {
    previewToken: 'token-1',
    tradeName: 'Bremsenreiniger Pro Clean',
    manufacturer: 'AutoChem GmbH',
    signalWord: 'Gefahr',
    ghsPictograms: ['GHS02', 'GHS07'],
    hazardStatements: ['H225 Flüssigkeit und Dampf leicht entzündbar.', 'H319 Augenreizung.'],
    sections: [
      {
        key: 'identification',
        title: '1. Stoff-/Produktbezeichnung',
        unlocked: true,
        body: 'Bremsenreiniger Pro Clean\nHersteller/Lieferant: AutoChem GmbH',
      },
      {
        key: 'hazards',
        title: '2. Gefahren für Mensch und Umwelt',
        unlocked: true,
        body: 'Signalwort: Gefahr',
      },
    ],
    ...overrides,
  };
}

test('buildResultInsightBadges: Signalwort, H-Sätze und GHS, ohne LGK wenn unbekannt', () => {
  const badges = buildResultInsightBadges(teaser());
  assert.deepEqual(
    badges.map((badge) => badge.id),
    ['signal', 'hazardCount', 'ghsCount'],
  );
  assert.equal(badges.find((badge) => badge.id === 'signal')?.label, 'Signalwort: Gefahr');
  assert.equal(badges.find((badge) => badge.id === 'hazardCount')?.label, '2 H-Sätze');
  assert.equal(badges.find((badge) => badge.id === 'ghsCount')?.label, '2 GHS-Symbole');
});

test('buildResultInsightBadges: LGK aus storageClass und aus Abschnittstext', () => {
  const fromField = buildResultInsightBadges(teaser({ storageClass: '3' }));
  assert.equal(fromField.find((badge) => badge.id === 'storageClass')?.label, 'LGK 3');

  const fromBody = buildResultInsightBadges(
    teaser({
      storageClass: undefined,
      sections: [
        {
          key: 'identification',
          title: '1. Stoff-/Produktbezeichnung',
          unlocked: true,
          body: 'Lagerklasse LGK 8 A nach TRGS 510',
        },
      ],
    }),
  );
  assert.equal(fromBody.find((badge) => badge.id === 'storageClass')?.label, 'LGK 8 A');
});

test('sharpPreviewSectionBody rekonstruiert Abschnitt 1 und 2 aus Teaser-Feldern', () => {
  const sample = teaser();
  assert.match(sharpPreviewSectionBody(sample, 'identification'), /Bremsenreiniger Pro Clean/);
  assert.match(sharpPreviewSectionBody(sample, 'hazards'), /Signalwort: Gefahr/);
  assert.match(sharpPreviewSectionBody(sample, 'hazards'), /H225/);
});

test('buildUnlockHeadline nutzt Produktnamen mit Fallback', () => {
  assert.equal(
    buildUnlockHeadline('Aceton technisch'),
    'Ihre Betriebsanweisung für „Aceton technisch“ ist fertig',
  );
  assert.equal(buildUnlockHeadline('Unbenannter Stoff'), 'Ihr TRGS-555-Entwurf ist fertig');
  assert.equal(buildUnlockHeadline(''), 'Ihr TRGS-555-Entwurf ist fertig');
});

test('sanitizePublicTeaser hält Abschnitt 1–2 scharf und sperrt 3–6', async () => {
  const { sanitizePublicTeaser } = await import('@/lib/sdb-preview/sanitize-public-teaser');
  const sample = teaser({
    sections: [
      ...teaser().sections,
      {
        key: 'protective_measures',
        title: '3. Schutzmaßnahmen und Verhaltensregeln',
        unlocked: false,
        body: 'Geheim: Atemschutz',
      },
    ],
  });
  const publicTeaser = sanitizePublicTeaser(sample);
  const identification = publicTeaser.sections.find((section) => section.key === 'identification');
  const protection = publicTeaser.sections.find((section) => section.key === 'protective_measures');
  assert.equal(identification?.unlocked, true);
  assert.match(identification?.body ?? '', /Bremsenreiniger Pro Clean/);
  assert.equal(protection?.unlocked, false);
  assert.equal(protection?.body, 'Nach Freischaltung in der App verfügbar.');
});

test('buildSuccessBadgeLabel und resolvePreviewSourceLabel', () => {
  assert.equal(buildSuccessBadgeLabel('sdb-aceton.pdf'), '✓ Aus sdb-aceton.pdf ausgelesen');
  assert.equal(buildSuccessBadgeLabel(null), '✓ Aus Ihrem SDB ausgelesen');
  assert.equal(resolvePreviewSourceLabel({ kind: 'upload', fileName: 'stoff.pdf' }), 'stoff.pdf');
  assert.equal(resolvePreviewSourceLabel({ kind: 'example', exampleId: 'aceton' }), 'Aceton');
});
