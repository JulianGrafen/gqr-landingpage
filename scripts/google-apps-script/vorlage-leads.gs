/**
 * GQR — Excel-Vorlage Lead-Sammlung in Google Sheets
 *
 * Setup (einmalig):
 * 1. Neue Google-Tabelle anlegen (z. B. „GQR Vorlagen-Leads“)
 * 2. Erweiterungen → Apps Script → diesen Code einfügen
 * 3. Deploy → Neue Bereitstellung → Typ „Web-App“
 *    - Ausführen als: Ich
 *    - Zugriff: Jeder
 * 4. Web-App-URL in vorlage-lead-config.json unter "endpoint" eintragen
 */

var SHEET_NAME = 'Leads';
var HEADER = ['Zeitstempel', 'E-Mail', 'Quelle', 'Seite', 'SubmittedAt'];

function ensureSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADER);
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function parseBody_(e) {
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      return {};
    }
  }
  return e.parameter || {};
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function appendLeadRow_(data) {
  var sheet = ensureSheet_();
  sheet.appendRow([
    new Date(),
    String(data.email || '').trim().toLowerCase(),
    String(data.source || ''),
    String(data.page || ''),
    String(data.submittedAt || ''),
  ]);
  return sheet.getLastRow();
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = parseBody_(e);
    var email = String(data.email || '').trim().toLowerCase();

    if (!isValidEmail_(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'invalid_email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var row = appendLeadRow_(data);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, row: row }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * GET-Test im Browser:
 * - Nur Status:  …/exec
 * - Dummy-Zeile: …/exec?test=dummy
 */
function doGet(e) {
  if (e && e.parameter && e.parameter.test === 'dummy') {
    try {
      var row = appendLeadRow_({
        email: 'dummy-test@gefahrstoff-qr.de',
        source: 'gefahrstoffverzeichnis-excel-vorlage',
        page: 'https://gefahrstoff-qr.de/gefahrstoffverzeichnis-excel-vorlage/',
        submittedAt: new Date().toISOString(),
      });
      return ContentService
        .createTextOutput(
          JSON.stringify({
            ok: true,
            service: 'gqr-vorlage-leads',
            test: 'dummy',
            row: row,
            message: 'Dummy-Lead in Zeile ' + row + ' geschrieben.',
          }),
        )
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'gqr-vorlage-leads' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test im Apps-Script-Editor: Funktion auswählen → Ausführen.
 * Schreibt eine Dummy-Zeile in den Tab „Leads“ und loggt die Zeilennummer.
 */
function testWriteDummyLead() {
  var row = appendLeadRow_({
    email: 'dummy-test@gefahrstoff-qr.de',
    source: 'gefahrstoffverzeichnis-excel-vorlage',
    page: 'https://gefahrstoff-qr.de/gefahrstoffverzeichnis-excel-vorlage/',
    submittedAt: new Date().toISOString(),
  });
  Logger.log('Dummy-Lead geschrieben — Zeile ' + row);
  SpreadsheetApp.getUi().alert(
    'Dummy-Lead geschrieben in Zeile ' + row + ' (Tab „' + SHEET_NAME + '“).',
  );
}
