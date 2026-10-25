// New AI-created synthetic demonstration. No client data or external requests.
export function parseCSV(text) {
  const rows = []; let row = [], cell = '', quoted = false, closed = false;
  text = String(text).replace(/^\uFEFF/, '');
  const addCell = () => { row.push(cell); cell = ''; closed = false; };
  const addRow = () => { addCell(); if (row.some(v => v !== '')) rows.push(row); row = []; };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else { quoted = false; closed = true; } }
      else cell += c;
      continue;
    }
    if (c === ',') { addCell(); continue; }
    if (c === '\r' || c === '\n') { if (c === '\r' && text[i + 1] === '\n') i++; addRow(); continue; }
    if (closed) throw new Error('Unexpected text after a closing quote.');
    if (c === '"') { if (cell !== '') throw new Error('Quote inside an unquoted field.'); quoted = true; }
    else cell += c;
  }
  if (quoted) throw new Error('Unclosed quoted field.');
  if (cell !== '' || row.length || closed) addRow();
  return rows;
}

export function spreadsheetSafeValue(value) {
  if (typeof value !== 'string') return value;
  // Protect user-controlled text when opened in spreadsheet applications.
  // Numbers remain numbers; normalization and original source records are untouched.
  return /^\s*[=+\-@]/.test(value) || /^\s*[\t\r]/.test(value) ? "'" + value : value;
}

export function encodeCSV(rows, {spreadsheetSafe = false} = {}) {
  return rows.map(row => row.map(value => {
    if (spreadsheetSafe) value = spreadsheetSafeValue(value);
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
  }).join(',')).join('\r\n') + '\r\n';
}

export function auditCSV(text) {
  const rows = parseCSV(text);
  if (!rows.length || rows[0].map(v => v.trim().toLowerCase()).join(',') !== 'id,name,units') {
    throw new Error('Use exactly these three headers: id,name,units.');
  }
  const data = rows.slice(1);
  const counts = new Map();
  for (const row of data) { const id = (row[0] ?? '').trim().toUpperCase(); if (id) counts.set(id, (counts.get(id) ?? 0) + 1); }
  const clean = [], exceptions = [];
  data.forEach((row, index) => {
    const id = (row[0] ?? '').trim().toUpperCase();
    const name = (row[1] ?? '').trim();
    const originalUnits = (row[2] ?? '').trim();
    const reasons = [];
    if (row.length !== 3) reasons.push('Expected 3 columns');
    if (!id) reasons.push('Missing ID');
    if (id && counts.get(id) > 1) reasons.push('Duplicate ID (all occurrences held)');
    const units = Number(originalUnits);
    if (!originalUnits) reasons.push('Missing units');
    else if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(originalUnits) || !Number.isSafeInteger(units) || units < 0) reasons.push('Units must be a nonnegative safe whole number');
    if (reasons.length) exceptions.push({record: index + 1, id, name, units: row[2] ?? '', reasons: reasons.join('; '), original: JSON.stringify(row)});
    else clean.push({id, name, units});
  });
  return {total: data.length, clean, exceptions};
}

export function cleanExport(result) { return encodeCSV([['id','name','units'], ...result.clean.map(r => [r.id,r.name,r.units])], {spreadsheetSafe:true}); }
export function exceptionsExport(result) { return encodeCSV([['record','id','name','original_units','reason','original_record_json'], ...result.exceptions.map(r => [r.record,r.id,r.name,r.units,r.reasons,r.original])], {spreadsheetSafe:true}); }
