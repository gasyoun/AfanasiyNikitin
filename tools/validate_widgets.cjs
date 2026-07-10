// Widget-drift gate: each spine-driven widget embeds a *_BUNDLED fallback that must
// stay in sync with data/*.csv (the widget regenerates it from the spine at runtime,
// but the committed fallback can silently lag a data edit). This check evals each
// widget's bundled array(s) and compares the CSV-derived fields against the live CSVs.
// Browser-free; run by the data-validate workflow.  Usage: node tools/validate_widgets.cjs
const fs = require('fs');
const path = require('path');
const ROOT = path.dirname(__dirname);
const D = f => fs.readFileSync(path.join(ROOT, 'data', f), 'utf8');
// Widgets moved to static/atlas/ in the H486 Docusaurus rebuild (10-07-2026).
const H = f => fs.readFileSync(path.join(ROOT, 'static', 'atlas', f), 'utf8');

const fails = [];
const fail = m => fails.push(m);
const eq = (a, b, m) => { if (a !== b) fail(`${m}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };
const eqSet = (a, b, m) => { const A = [...a].sort(), B = [...b].sort(); if (JSON.stringify(A) !== JSON.stringify(B)) fail(`${m}: sets differ\n  bundled: ${JSON.stringify(A)}\n  csv:     ${JSON.stringify(B)}`); };

function parseCSV(text){
  text = String(text).replace(/\r\n/g,'\n').replace(/\r/g,'\n');
  const rows=[]; let row=[],field='',inQ=false,i=0;
  while(i<text.length){ const c=text[i];
    if(inQ){ if(c==='"'){ if(text[i+1]==='"'){field+='"';i+=2;continue;} inQ=false;i++;continue; } field+=c;i++;continue; }
    if(c==='"'){inQ=true;i++;continue;}
    if(c===','){row.push(field);field='';i++;continue;}
    if(c==='\n'){row.push(field);rows.push(row);row=[];field='';i++;continue;}
    field+=c;i++; }
  if(field!==''||row.length){row.push(field);rows.push(row);}
  const head=rows.shift().map(h=>h.trim());
  return rows.filter(r=>r.some(v=>v!=='')).map(r=>{const o={};head.forEach((h,j)=>{o[h]=(r[j]||'');});return o;});
}
const csv = f => parseCSV(D(f));
const idx = (rows, key) => { const o={}; rows.forEach(r=>{o[r[key]]=r;}); return o; };

// Extract a balanced [...] literal for `const NAME=` and eval it (stub editions cover fns).
function bundled(html, name){
  const at = html.indexOf('const ' + name + '=');
  if (at < 0) throw new Error('bundled array not found: ' + name);
  let i = html.indexOf('[', at), depth = 0, inStr = false, q = '';
  let j = i;
  for (; j < html.length; j++) {
    const c = html[j];
    if (inStr) { if (c === '\\') { j++; continue; } if (c === q) inStr = false; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = true; q = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) { j++; break; } }
  }
  const lit = html.slice(i, j);
  const stubs = 'var cover_karamzin,cover_sakharov,cover_sreznevsky,cover_tver,cover_an1948,cover_film,cover_lurye,cover_eksmo,cover_khrust;';
  return eval(stubs + '(' + lit + ')');
}

// place_id -> map-waypoint index, replicating the flagship kashan+yazd merge
function placeToWp(itin){
  const s = itin.slice().sort((a,b)=>(+a.seq)-(+b.seq));
  const p2wp = {}; let wp = 0;
  for (let i=0;i<s.length;i++){ const pid=s[i].place_id;
    if(pid==='kashan'&&s[i+1]&&s[i+1].place_id==='yazd'){ if(!(pid in p2wp))p2wp[pid]=wp; if(!('yazd' in p2wp))p2wp['yazd']=wp; i++; wp++; continue; }
    if(!(pid in p2wp))p2wp[pid]=wp; wp++; }
  return p2wp;
}

console.log('widget-drift check — comparing *_BUNDLED fallbacks to data/*.csv\n');

try { // people-network
  const REL = {self:'self',helped:'help',harmed:'harm',neutral:'neutral',indirect:'indirect'};
  const html = H('afanasy_people_network.html');
  const NODES = bundled(html, 'NODES_BUNDLED'), EDGES = bundled(html, 'EDGES_BUNDLED');
  const people = csv('people.csv'), edges = csv('edges.csv'), pById = idx(people, 'person_id');
  eqSet(NODES.map(n=>n.id), people.map(p=>p.person_id), 'people-network: node ids vs people.csv');
  NODES.forEach(n => { const p = pById[n.id]; if (p) eq(n.type, REL[p.relation], `people-network: node ${n.id} type`); });
  eqSet(EDGES.map(e=>e.a+'|'+e.b), edges.map(e=>e.source+'|'+e.target), 'people-network: edge pairs vs edges.csv');
  const eByPair = {}; EDGES.forEach(e=>{eByPair[e.a+'|'+e.b]=e;});
  edges.forEach(r => { const e = eByPair[r.source+'|'+r.target]; if (e) eq(e.type, r.relation, `people-network: edge ${r.edge_id} type`); });
  console.log('  people-network  ✓ (' + NODES.length + ' nodes, ' + EDGES.length + ' edges)');
} catch (e) { fail('people-network: ' + e.message); }

try { // citations
  const html = H('afanasy_citations_v2.html');
  const DEC = bundled(html, 'DEC_BUNDLED'), PER = bundled(html, 'CSV_PERIODS');
  const byP = idx(csv('citations.csv'), 'period');
  eq(DEC.length, PER.length, 'citations: DEC vs CSV_PERIODS length');
  PER.forEach((p, k) => { const r = byP[p]; if (!r) return fail('citations: no CSV row for ' + p);
    eq(DEC[k].total, +r.total, `citations ${p} total`); eq(DEC[k].ru, +r.ru, `citations ${p} ru`);
    eq(DEC[k].fo, +r.foreign, `citations ${p} foreign`); eq(DEC[k].tr, +r.translations, `citations ${p} translations`); });
  console.log('  citations       ✓ (' + DEC.length + ' decades, numbers match)');
} catch (e) { fail('citations: ' + e.message); }

try { // editions
  const html = H('afanasy_editions_v3.html');
  const EDS = bundled(html, 'EDS_BUNDLED');
  const eds = csv('editions.csv'), byId = idx(eds, 'edition_id');
  eqSet(EDS.map(e=>e.id), eds.map(r=>r.edition_id), 'editions: ids vs editions.csv');
  EDS.forEach(e => { const r = byId[e.id]; if (r) eq(e.year, +r.year, `editions ${e.id} year`); });
  console.log('  editions        ✓ (' + EDS.length + ' editions, years match)');
} catch (e) { fail('editions: ' + e.message); }

try { // event-timeline
  const html = H('afanasy_event_timeline.html');
  const EV = bundled(html, 'EVENTS_BUNDLED');
  const events = csv('events.csv'), pl = idx(csv('places.csv'), 'place_id'), pe = idx(csv('people.csv'), 'person_id');
  const p2wp = placeToWp(csv('itinerary.csv'));
  eq(EV.length, events.length, 'event-timeline: count');
  const eById = idx(EV, 'id');
  events.forEach(r => { const e = eById[r.event_id]; if (!e) return fail('event-timeline: no bundled event ' + r.event_id);
    eq(e.date, r.date_label, `event ${r.event_id} date`); eq(e.year, +r.year, `event ${r.event_id} year`);
    eq(e.place_id, r.place_id, `event ${r.event_id} place_id`); eq(e.type, r.type, `event ${r.event_id} type`);
    eq(e.epistemic, r.epistemic, `event ${r.event_id} epistemic`); eq(e.certainty, r.certainty, `event ${r.event_id} certainty`);
    eq(e.note, r.note, `event ${r.event_id} note`);
    eq(e.place, (pl[r.place_id]||{}).name_ru, `event ${r.event_id} place name`);
    eq(e.wp, (r.place_id in p2wp) ? p2wp[r.place_id] : -1, `event ${r.event_id} wp`);
    const ids = (r.people||'').split(';').filter(Boolean);
    eq(JSON.stringify(e.people.map(p=>p.id)), JSON.stringify(ids), `event ${r.event_id} people ids`);
    e.people.forEach(p => eq(p.name, (pe[p.id]||{}).name_ru, `event ${r.event_id} person ${p.id} name`)); });
  console.log('  event-timeline  ✓ (' + EV.length + ' events, refs match)');
} catch (e) { fail('event-timeline: ' + e.message); }

try { // epistemic-lens
  const html = H('afanasy_epistemic_lens.html');
  const AGG = bundled(html, 'AGG_BUNDLED'), ROUTE = bundled(html, 'ROUTE_BUNDLED');
  const FILES = ['places','itinerary','people','events','trade','fragments','calendar','citations'];
  // recompute aggregate (note: widget includes 'legs' too — derive list from AGG to stay in lockstep)
  const dsList = AGG.filter(a => a.ds !== 'overall').map(a => a.ds);
  const overall = {};
  const aggById = idx(AGG, 'ds');
  dsList.forEach(ds => {
    const rows = csv(ds + '.csv'); const epi = {};
    rows.forEach(r => { epi[r.epistemic] = (epi[r.epistemic]||0)+1; overall[r.epistemic]=(overall[r.epistemic]||0)+1; });
    eq(aggById[ds].n, rows.length, `epistemic-lens agg ${ds} n`);
    eq(JSON.stringify(epi), JSON.stringify(aggById[ds].epi), `epistemic-lens agg ${ds} epi counts`);
  });
  if (aggById.overall) eq(JSON.stringify(overall), JSON.stringify(aggById.overall.epi), 'epistemic-lens agg overall');
  // recompute route
  const pl = idx(csv('places.csv'), 'place_id'), itin = csv('itinerary.csv').slice().sort((a,b)=>(+a.seq)-(+b.seq));
  const p2wp = placeToWp(itin);
  eq(ROUTE.length, itin.length, 'epistemic-lens: route length');
  itin.forEach((r, k) => { const e = ROUTE[k], p = pl[r.place_id] || {};
    eq(e.seq, +r.seq, `route[${k}] seq`); eq(e.place_id, r.place_id, `route[${k}] place_id`);
    eq(e.place, p.name_ru, `route[${k}] place`); eq(e.p_epi, p.epistemic, `route[${k}] p_epi`);
    eq(e.p_cert, p.certainty, `route[${k}] p_cert`); eq(e.i_epi, r.epistemic, `route[${k}] i_epi`);
    eq(e.i_cert, r.certainty, `route[${k}] i_cert`); eq(e.wp, p2wp[r.place_id], `route[${k}] wp`); });
  console.log('  epistemic-lens  ✓ (' + dsList.length + ' datasets agg + ' + ROUTE.length + ' route)');
} catch (e) { fail('epistemic-lens: ' + e.message); }

try { // lod-coverage
  const html = H('afanasy_lod_coverage.html');
  const ENT = bundled(html, 'ENTITIES_BUNDLED');
  const byId = idx(ENT, 'id');
  csv('places.csv').forEach(r => { const e = byId[r.place_id];
    if (!e) return fail('lod: missing place ' + r.place_id);
    eq(e.status, r.recon_status, `lod place ${r.place_id} status`);
    eq(e.wikidata, (r.wikidata_qid||'').trim(), `lod place ${r.place_id} wikidata`);
    eq(e.geonames, (r.geonames_id||'').trim(), `lod place ${r.place_id} geonames`);
    eq(e.pleiades, (r.pleiades_id||'').trim(), `lod place ${r.place_id} pleiades`); });
  csv('people.csv').forEach(r => { const e = byId[r.person_id];
    if (!e) return fail('lod: missing person ' + r.person_id);
    eq(e.status, r.recon_status, `lod person ${r.person_id} status`);
    eq(e.wikidata, (r.wikidata_qid||'').trim(), `lod person ${r.person_id} wikidata`);
    eq(e.viaf, (r.viaf_id||'').trim(), `lod person ${r.person_id} viaf`); });
  console.log('  lod-coverage    ✓ (' + ENT.length + ' entities, status + links match)');
} catch (e) { fail('lod-coverage: ' + e.message); }

try { // calendar — the 8 "true Easter" anchors must equal calendar.csv pascha (Julian) dates
  const html = H('afanasy_calendar_pascha_islam.html');
  const OBS = bundled(html, 'EASTER_OBSERVATIONS_BUNDLED');
  const byYear = {}; csv('calendar.csv').filter(r => r.type === 'pascha').forEach(r => { byYear[r.year_ce] = r; });
  OBS.forEach(o => { const r = byYear[o.trueYear];
    if (!r) return fail('calendar: no pascha row for ' + o.trueYear);
    const [y, m, d] = r.julian_date.split('-').map(Number);
    eq(o.trueYear, y, `calendar obs ${o.n} trueYear`);
    eq(o.trueMonth, m, `calendar obs ${o.n} trueMonth`);
    eq(o.trueDay, d, `calendar obs ${o.n} trueDay`); });
  console.log('  calendar        ✓ (' + OBS.length + ' Easter anchors match calendar.csv pascha)');
} catch (e) { fail('calendar: ' + e.message); }

console.log('');
if (fails.length) {
  console.error('WIDGET DRIFT — ' + fails.length + ' mismatch(es). Regenerate the affected widget\'s *_BUNDLED fallback to match data/*.csv:\n');
  fails.forEach(f => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log('ALL WIDGET FALLBACKS IN SYNC WITH THE DATA SPINE ✓');
