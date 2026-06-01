# `data/` — the FAIR data spine

This directory is the **single source of truth** for the atlas. The plan is to invert the architecture: instead of data being hardcoded inside 28 HTML widgets, the widgets will read *from* these files. This is Phase 1 of the FAIR-data roadmap.

> **Status: prototype slice.** Three of the eight planned datasets exist so far (`sources`, `places`, `itinerary`). They were lifted from the canonical `js/atlas-data.js` (`ATLAS.WP`) and cross-checked against `afanasy_geolocations.md` and `afanasy_journey_data.md`.

## Files

| File | What | Rows |
|---|---|---|
| `sources.csv` | Source register with a `rights` column. Every other table's `source_id` is a foreign key into this. | 9 |
| `places.csv` | Gazetteer of **distinct** places (deduplicated — Bidar/Hormuz/Lar appear once). | 26 |
| `itinerary.csv` | The **ordered** 29 waypoints of the journey; `place_id` is a foreign key into `places` (repeats allowed). | 29 |
| `people.csv` | The people network: who helped / harmed / is mentioned; `place_id` FK into `places`. | 15 |
| `editions.csv` | Publication history — milestone editions 1818–2026. | 9 |
| `citations.csv` | Estimated scholarly attention by decade (flagged `epistemic=model` — heuristic, not bibliometric). | 12 |
| `trade.csv` | Trade evidence — 4 text-attributed facts + 19 heuristic `model` goods (provenance per `article_figures/trade_model_sources.md`). | 23 |
| `fragments.csv` | The 104 manuscript fragments (Ф.1–104): folio → layer/genre/chronological period/location/date. **Metadata only** — `quote` is empty (gated). | 104 |
| `reconciliation.md` | Phase 2 audit: every place/person → its Wikidata / GeoNames / Pleiades / VIAF match, distance, and status. | — |
| `places.lpf.geojson` | Gazetteer in **Linked Places Format** (GeoJSON-LD) for the World Historical Gazetteer. | — |
| `../datapackage.json` | [Frictionless](https://frictionlessdata.io/) descriptor: schemas, types, keys, foreign keys, license. | — |

## Conventions

- **Encoding:** UTF-8, no BOM. Comma-delimited; fields with commas are double-quoted (RFC 4180).
- **`source_id`** → foreign key into `sources.csv`. **Facts only** are published here; see [`../RIGHTS.md`](../RIGHTS.md).
- **`epistemic`** — the five-label epistemic vocabulary (from `article_site_weak_spots.md` §2.5), so users can tell what kind of claim each row is:
  `text` · `reconstruction` · `localization` · `model` · `hypothesis`
- **`certainty`** — locational/temporal certainty, a separate axis: `certain` · `approx` · `disputed`.
  (Together these close weak-spots §1.4 "coordinates look more precise than they are" and §2.5 "confidence not visible".)
- **`*_qid` / `pleiades_id` / `geonames_id`** are intentionally blank — they get filled in **Phase 2** (Linked Open Data reconciliation via OpenRefine → Wikidata/Pleiades).
- **`source_page`** is blank for now — page-level provenance for each row is a remaining Phase 1 task.

## Data-quality issues this spine already surfaced

- **Dabhol coordinate error:** `afanasy_journey_data.md` lists `17.5 / 70.0` (open ocean). Correct is `~17.5 / 73.18` (in `atlas-data.js` and `geolocations.md`). Recorded in `places.csv` notes.
- **Kashan/Yazd merge — resolved:** the single `atlas-data.js` waypoint is now split into `kashan` + `yazd` in both `places.csv` and `itinerary.csv`. The itinerary therefore has **29** waypoints vs. `atlas-data.js`'s 28 — an intentional divergence (the spine is more granular than the current map widget; `t_index` for the split point is interpolated). To be reconciled when the widgets re-render from the spine.
- **Missing Kaffa:** `afanasy_journey_data.md` has 18 points and omits Феодосия/Кафа; `atlas-data.js` and `geolocations.md` include it. The spine uses the full waypoint set (29 after the Kashan/Yazd split).
- **Estimates flagged, not hidden:** citation counts (`citations.csv`) and the comparative trade goods (`trade.csv`) carry `epistemic=model` — they are heuristic, not real bibliometric or price data (weak-spots §2.3). Only 4 trade rows are text-attributed (`epistemic=text`, with folio + Khrustalev page).
- **Widget content vs. source data:** in `afanasy_manuscript_layers.html` the per-fragment quote text and bar lengths are *synthetic* (placeholder strings + a `Math.sin` length formula). `fragments.csv` therefore captures only the real reconstruction metadata (folio → layer / genre / period / location / date) and leaves `quote` empty — a clean example of the spine separating evidence from decoration.

## Reconciliation (Phase 2)

Places and people carry a `recon_status` (`confirmed` / `candidate` / `none` / `collective` / `skip-region`) and, when `confirmed`, authority IDs:

- places → `wikidata_qid`, `geonames_id`, `pleiades_id`
- people → `wikidata_qid`, `viaf_id`

Matches come from [`tools/reconcile.py`](../tools/reconcile.py): places are verified by **coordinate distance** and must be a settlement (excluding racetracks/districts); people by instance-of=human + a description keyword. **IDs are written only for `confirmed` rows — a wrong QID is worse than a blank one.** Every decision, plus the `candidate`/`none` rows left for human review, is recorded in [`reconciliation.md`](reconciliation.md). Human-approved picks the matcher couldn't resolve live in the `*_OVERRIDE` maps at the top of the script, so re-running (`python tools/reconcile.py`) is reproducible.

[`tools/build_lpf.py`](../tools/build_lpf.py) then emits [`places.lpf.geojson`](places.lpf.geojson) in **Linked Places Format** (GeoJSON-LD), turning each authority ID into a `closeMatch` link — ready to ingest into the World Historical Gazetteer / Peripleo.

## Validate

```sh
pip install frictionless
frictionless validate datapackage.json
```

## Planned datasets (not yet built)

`calendar` — the only remaining dataset, and it is **generated** by a reproducible computus script (Phase 3), not hand-entered.
