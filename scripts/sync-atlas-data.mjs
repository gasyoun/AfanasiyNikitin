// afanasy_map_spine.html fetches data/places.csv + data/itinerary.csv relative
// to its own location (static/atlas/). data/ itself stays at the repo root as
// the single source of truth (H486 "never touch") — this copies it into
// static/atlas/data/ at build/start time so the fetch resolves under Docusaurus,
// without duplicating the data by hand.
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, 'data');
const dest = join(root, 'static', 'atlas', 'data');

if (existsSync(src)) {
  cpSync(src, dest, { recursive: true });
  console.log(`[sync-atlas-data] copied ${src} -> ${dest}`);
} else {
  console.warn(`[sync-atlas-data] no data/ directory found at ${src}`);
}

// Citation/dataset descriptors the salvaged Dataset JSON-LD (docusaurus.config.mjs
// headTags) links to by absolute URL — kept at the repo root as the source of
// truth (H486 "never touch"), copied here only so the build serves them at
// the same paths. places.lpf.geojson moves to /downloads/ because /data/ is
// now the Docusaurus IA route for the "Данные" docs instance, not a static
// file mount — the JSON-LD's contentUrl for it was updated accordingly.
for (const file of ['datapackage.json', 'codemeta.json', '.zenodo.json', 'CITATION.cff']) {
  const from = join(root, file);
  if (existsSync(from)) {
    cpSync(from, join(root, 'static', file));
  }
}
const geojsonSrc = join(root, 'data', 'places.lpf.geojson');
if (existsSync(geojsonSrc)) {
  mkdirSync(join(root, 'static', 'downloads'), { recursive: true });
  cpSync(geojsonSrc, join(root, 'static', 'downloads', 'places.lpf.geojson'));
}
