const SHEET_ID = '18OSkCpf0uJRaRMLJRiYEPwvP2RLzD1InOhmixlhjBQw';
const SHEET_NAME = 'Sheet1';

function doPost(event) {
  const payload = JSON.parse(event.postData.contents || '{}');
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

  sheet.appendRow([
    new Date(),
    payload.name || '',
    payload.email || '',
    payload.message || '',
    payload.page || '',
    payload.userAgent || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
