import assert from 'node:assert/strict';
import test from 'node:test';
import { BA_DRAFT_PDF_COPY } from '@/config/sdb-preview/ba-draft-lead-copy';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { buildBaDraftDocument } from '@/lib/sdb-preview/build-ba-draft-document';
import { renderBaDraftPdf } from '@/lib/sdb-preview/render-ba-draft-pdf';

function teaser(overrides: Partial<SdbPreviewTeaser> = {}): SdbPreviewTeaser {
  return {
    previewToken: 'token-1',
    tradeName: 'Bremsenreiniger Pro Clean',
    manufacturer: 'AutoChem GmbH',
    signalWord: 'Gefahr',
    ghsPictograms: ['GHS02', 'ghs07', 'GHS02'],
    hazardStatements: ['H225 Flüssigkeit und Dampf leicht entzündbar.', 'H319 Verursacht schwere Augenreizung.'],
    precautionaryStatements: ['P210 Von Hitze fernhalten.'],
    protectiveEquipment: ['eye_protection', 'hand_protection'],
    statementCounts: { hazard: 5, precautionary: 1 },
    sections: [
      { key: 'emergency', title: '4. Verhalten im Gefahrfall', unlocked: false, body: 'geheim' },
      { key: 'first_aid', title: '5. Erste Hilfe', unlocked: false, body: 'geheim' },
    ],
    ...overrides,
  };
}

test('BA-Entwurf: Abschnitte 1–3 gefüllt, 4–6 gesperrt ohne Paywall-Inhalte', () => {
  const draft = buildBaDraftDocument(teaser());

  assert.equal(draft.sections.length, 6);
  assert.deepEqual(
    draft.sections.map((section) => section.locked),
    [false, false, false, true, true, true],
  );
  assert.ok(!JSON.stringify(draft).includes('geheim'), 'gesperrte Teaser-Inhalte dürfen nicht im PDF landen');
});

test('BA-Entwurf: GHS-Symbole normalisiert und dedupliziert, Rest-H-Sätze als Hinweis', () => {
  const hazards = buildBaDraftDocument(teaser()).sections[1];

  assert.deepEqual(
    hazards.symbols.map((symbol) => symbol.label.slice(0, 5)),
    ['GHS02', 'GHS07'],
  );
  assert.equal(hazards.emphasis, 'Signalwort: Gefahr');
  assert.equal(hazards.lines.at(-1), BA_DRAFT_PDF_COPY.moreStatements(3, 'H'));
});

test('BA-Entwurf: ohne PSA/P-Sätze bleibt Abschnitt 3 gesperrt; Dateiname ist ASCII', () => {
  const draft = buildBaDraftDocument(
    teaser({ tradeName: 'Spülmittel „Größe“ 5 l', precautionaryStatements: [], protectiveEquipment: [], statementCounts: undefined }),
  );

  assert.equal(draft.sections[2].locked, true);
  assert.equal(draft.fileName, 'BA-Entwurf-Spulmittel-Grosse-5-l.pdf');
});

test('BA-Entwurf-PDF: rendert auch mit Sonderzeichen außerhalb von WinAnsi', async () => {
  const draft = buildBaDraftDocument(
    teaser({ hazardStatements: ['H360 Kann ≤ 0,1 % das Kind im Mutterleib schädigen → 中文'] }),
  );
  const bytes = await renderBaDraftPdf({ document: draft, accountUrl: 'https://app.gefahrstoff-qr.de/register?x=1' });

  assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), '%PDF-');
});
