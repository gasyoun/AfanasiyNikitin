// Shared data-spine helpers for atlas widgets that read data/*.csv at boot.
// Exposes a single dependency-free RFC4180 CSV parser (quoted fields, embedded
// commas/newlines) so each widget no longer carries its own copy. Widgets call
// AtlasSpine.parseCSV(text) inside their loadSpine(); on any failure they fall
// back to their bundled data, so a missing/late script can never break rendering.
(function(){
  function parseCSV(text){
    text = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const rows = []; let row = [], field = '', inQ = false, i = 0;
    while (i < text.length) {
      const c = text[i];
      if (inQ) {
        if (c === '"') { if (text[i+1] === '"') { field += '"'; i += 2; continue; } inQ = false; i++; continue; }
        field += c; i++; continue;
      }
      if (c === '"') { inQ = true; i++; continue; }
      if (c === ',') { row.push(field); field = ''; i++; continue; }
      if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
      field += c; i++;
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    const head = rows.shift().map(h => h.trim());
    return rows.filter(r => r.some(v => v !== '')).map(r => { const o = {}; head.forEach((h, j) => { o[h] = (r[j] || ''); }); return o; });
  }

  // fetch a URL as text, rejecting on non-OK so loadSpine's .catch hits the fallback.
  function fetchText(url){
    return fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url); return r.text(); });
  }

  window.AtlasSpine = { parseCSV: parseCSV, fetchText: fetchText };
})();
