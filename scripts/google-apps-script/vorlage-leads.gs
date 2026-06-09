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

    var sheet = ensureSheet_();
    sheet.appendRow([
      new Date(),
      email,
      String(data.source || ''),
      String(data.page || ''),
      String(data.submittedAt || ''),
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** Optional: GET-Test im Browser — zeigt, ob die Web-App erreichbar ist */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'gqr-vorlage-leads' }))
    .setMimeType(ContentService.MimeType.JSON);
}
