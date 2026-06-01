# AI_STATE.md — Handoff & Session State

This file is maintained by AI assistants (Antigravity/Claude) working on this repository.  
It records the current state of work, decisions made, and context needed to continue seamlessly.

> **Last updated:** 2026-05-21 · Conversation ID: GPT-5.5 roadmap + handoff refresh
> **Latest pushed commit:** `7125f8e` (`refactor: tokenize service worker check colors`) on `main`

---

## Current Status: ✅ PHASE 2 COMPLETE + FIX 5–9 DONE + A5 CANVAS AUDIT COMPLETE + CROSS-LINKING + COLOR AUDIT CLEAN

The site is live at **https://gasyoun.github.io/AfanasiyNikitin/**.  
Phase 0 from `FIX_PLAN.md` is fully implemented: A1–A4 credibility fixes, FIX 1–4 data corrections. Phase 2 complete: shared CSS in `css/atlas.css`, bundled local assets in `lib/`, shared map/Gantt data in `js/atlas-data.js`, and shared theme logic in `js/atlas-theme.js`. Phase 4.1–4.2 PWA shell exists: `manifest.json`, `sw.js` Service Worker, cache list aligned to the current widget filenames. FIX 5–9 are complete: manuscript leaf proof, emotional silence/pronouns, composition chronological toggle, Mahmud Gavan as 4th traveler, and current 21-widget index navigation. A5 is complete across all Canvas widgets: no shared CSS inversion filter remains, and each Canvas page now draws its own light/dark palette. Cross-linking is complete: Calendar→Map, Economics→Map, Manuscripts→Gantt, Gantt focus links, and all-widget breadcrumbs are implemented. The 2026-05-21 color-token/shadow audit is complete for the audited pages: the old `color: #333`, theme-toggle shadow, Canvas `c:'rgba'`/`b:'rgba'`, and `1468–1474` regression audit patterns are clean.

---

## Session 2026-06-01 — FAIR data spine (Phase 0 + Phase 1 prototype)

**New strategic direction** (set with the human via Q&A): take the atlas to the DH frontier by **inverting the stack** — build a citable, reusable FAIR dataset + Linked Open Data, kept lightweight (Frictionless + Wikidata/Pleiades + Zenodo DOI). Goal = reusable scholarly resource. Text rights treated as unsorted.

**Phase 0 — rights triage (done):**
- `RIGHTS.md` — source/copyright triage. Key finding: `scratch/book_text.txt` + the PDF are in-copyright (© Хрусталёв / Нестор-История 2026) and correctly gitignored. **Two tracked files in the PUBLIC repo are derived from the in-copyright book and need a human decision: `tetradi_hrustalev_2026.md` (detailed précis) and `article_drevnyaya_rus_draft.md` (journal embargo per weak-spots §2.6).** Recommended `git rm --cached` + gitignore; NOT yet done — human's call.
- `data/sources.csv` — 9-source register with a `rights` column (FK target for every table).
- Resolved: `ATLAS.PASSAGES` in `js/atlas-data.js` are the author's own modern-Russian renderings of the PD text → publishable under the dataset's CC-BY-4.0 (confirmed 2026-06-01).

**Phase 1 prototype slice (done):**
- `data/places.csv` (25 distinct places) + `data/itinerary.csv` (28 waypoints, FK → places) lifted from the canonical `js/atlas-data.js` `ATLAS.WP`. `epistemic` (text/reconstruction/localization/model/hypothesis) + `certainty` (certain/approx/disputed) columns close weak-spots §1.4 and §2.5.
- `datapackage.json` — Frictionless descriptor (schemas, PK/FK, CC-BY-4.0); `data/README.md` documents conventions.
- **Verified** via `scratch/validate_phase1.py`: no BOM, FK integrity OK, coords in range, JSON parses. `pip install frictionless` for full schema validation.
- Data-quality issues surfaced by the spine: Dabhol `70°E` error in `afanasy_journey_data.md`; Kashan/Yazd merged into one waypoint (needs splitting); `afanasy_journey_data.md` omits Kaffa (spine uses the 28-waypoint set).

**Phase 1 expansion (done):** `data/people.csv` (15 — the network from `afanasy_people_network.html`; relation = helped/harmed/neutral/self/indirect; `place_id` + `source_id` FKs; `wikidata_qid`/`viaf_id` reserved for Phase 2). Split `kashan_yazd` → `kashan` + `yazd` in places + itinerary; itinerary now **29** waypoints (diverges from ATLAS.WP's 28 by design; `t_index` interpolated). datapackage → v0.2.0. Re-validated (`scratch/validate_phase1.py`): BOM-free, FK + PK integrity, enum + coord sanity all pass.

**Shipped as two PRs:**
- **PR #4** — `rights/untrack-incopyright-files`: untrack the two in-copyright-derived files (kept local + gitignored).
- **`data/fair-spine-phase1`** — RIGHTS.md + the data spine (commit `544a13d` prototype + the people/split commit). Pushed; PR opened.

**Phase 1 datasets added (2026-06-01):** `data/editions.csv` (9 milestone editions 1818–2026), `data/citations.csv` (12 decades, `epistemic=model` — estimates, not bibliometry), `data/trade.csv` (4 text-attributed facts + 19 heuristic `model` goods; provenance per `article_figures/trade_model_sources.md`). datapackage → v0.3.0 (7 resources). Re-validated: FK + PK + enum + coord + citations-sum checks all pass. Pushed to `data/fair-spine-phase1` (PR #5).

**`fragments` added (2026-06-01):** `data/fragments.csv` — 104 fragments (Ф.1–104): folio → layer / genre / chrono-period / location / date, generated by `scratch/gen_fragments.py` replicating the widget logic. **Metadata only**: `quote` left empty (gated by RIGHTS.md; the widget's per-fragment quotes + bar lengths are synthetic — a `Math.sin` formula). datapackage → v0.4.0 (8 resources). All checks pass.

**✅ Phase 1 data complete** — 8 datasets: sources, places, itinerary, people, editions, citations, trade, fragments. All on `data/fair-spine-phase1` (PR #5).

## Session 2026-06-01 (cont.) — Phase 2: Linked Open Data

Reconciled places & people to Wikidata via **`tools/reconcile.py`** (coordinate-verified for places + must-be-settlement; instance-of=human + description keyword for people). **IDs written only for `confirmed` rows** — a wrong QID is worse than a blank one. Pulled GeoNames (P1566) / Pleiades (P1584) / VIAF (P214) straight from matched items. Added a `recon_status` column to places & people; datapackage → **v0.5.0**. **`tools/build_lpf.py`** emits `data/places.lpf.geojson` (Linked Places Format for the World Historical Gazetteer); audit trail in `data/reconciliation.md`.

**Reconciliation traps caught (why verification matters):** baku first matched the *Baku City Circuit* (F1 racetrack) — fixed to Q9248; district-vs-city (Bidar/Gulbarga/Hormuz); city-vs-city-council (Kaffa); and the widget's «Махмуд III» sultan is the wrong ruler (the 1469–72 Bahmani sultan was Muhammad Shah III) — left blank. Human-reviewed picks persisted in the script's `*_OVERRIDE` maps: hormuz→Q888643, kaffa→Q2585920, gulbarga→Q37112, af→Q48624 (Afanasy Nikitin).

**Left for human review (in `data/reconciliation.md`):** sultan (correct Bahmani ruler), farrukhyasar / mamyrev / genadiy (likely have items under other spellings), kallur (disputed localization, nearest match 165 km), srisailam (matched the dam township, not the temple town).

**Next (after Phase 2):** see Phase 3 below.

---

## Session 2026-06-01 (cont.) — Phase 3: computus + open-items list

**`tools/computus.py`** generates **`data/calendar.csv`** (37 rows): Orthodox Easter (Julian computus, exact), Great Lent (Pascha−48), Ramadan/Eid (tabular Islamic, civil epoch), + the Mahashivaratri anchor (recorded, not recomputed). **Self-checks pass** and the script independently reproduces Khrustalev's anchors: Easter 2 Apr 1469 (Hormuz), Easter 10 Apr 1474 (Muscat), and — the key one — Great Lent 1470 (5 Mar Julian) ∩ Ramadan 1470 (4 Mar Julian), i.e. «постился с бесермены». Islamic epoch verified against 1 Muharram 1443 AH = 2021-08-10. datapackage → **v0.6.0** (9 datasets).

Also added an auto-generated **“Open items — need human review”** section to `tools/reconcile.py` → `data/reconciliation.md` (the honestly-blank reconciliations: kallur, sultan, farrukhyasar, mamyrev, genadiy).

**✅ Data complete (Phases 1–3):** 9 datasets — sources, places, itinerary, people, editions, citations, trade, fragments, calendar — reconciled (Phase 2) and computed (Phase 3) where applicable; validator green. All on `data/fair-spine-phase1` (PR #5).

**Next:** (1) merge PRs #4 + #5; (2) Zenodo DOI + `CITATION.cff` for citability; (3) page-level `source_page` (manual).

---

## Session 2026-06-01 (cont.) — open items resolved + WHG submission packet

Resolved 2 of the 5 open reconciliations (verified via Wikidata, added to `tools/reconcile.py` `PERSON_OVERRIDE`): **sultan → Q4519937** (Muhammad Shah III Lashkari — corrected the atlas's wrong «Махмуд III» name) and **farrukhyasar → Q2002210** (Farrukh Yassar). People now **6/15 confirmed**. The remaining 3 are honestly open (listed in `data/reconciliation.md`): `kallur` (disputed localization, nearest 165 km), `genadiy` + `mamyrev` (no Wikidata record surfaced). Hardened `reconcile.py` with HTTP-429 backoff (honors Retry-After).

**WHG:** the LPF is validated WHG-ready via **`tools/validate_lpf.py`** (26 features, 22 linked, unique IDs, valid geometry/time-spans). Wrote **`SUBMISSION_WHG.md`** (dataset metadata + step-by-step upload/reconcile/publish). Actual upload/publication is account-gated — a human step.

**Citability:** added `CITATION.cff` + `.zenodo.json` (root) and a `schema.org/Dataset` JSON-LD block in `index.html` (Google Dataset Search). DOI mint is a one-time human step (enable Zenodo↔GitHub, cut a release) — steps in `data/README.md`. PRs #4 + #5 merged to `main`.

---

## Session 2026-06-01 (cont.) — autonomous batch (pushed to main)

Per human direction (all four tasks; **push to main**; keep looping). All landed on `main`:
- **Route + Linked Traces** — `tools/build_route.py` → `data/route.geojson` (LineString + 29 Points) and `data/itinerary.lt.json` (LTF draft); datapackage → v0.7.0.
- **CI** — `data-validate` workflow + tracked `tools/validate_data.py`. First run **failed** (the frictionless probe caught only `ImportError`, and `created` wasn't a full datetime) → fixed: gate is now pure-stdlib; `created` = `2026-06-01T00:00:00Z`.
- **README** — added "Data & reuse" (FAIR/LOD) section; corrected widget count 28 → 29 (added the live `afanasy_parvat.html` row + renumbered).
- **Spine-driven map PoC** — `afanasy_map_spine.html` reads `data/*.csv` via `d3.csv` (no hardcoded coords) and shows Wikidata links. Verified the join/projection (29 pts, all in-bounds). **Flagship `afanasy_v8_text_map.html`** was subsequently migrated onto the spine (PR #6, merged): the kashan+yazd merge keeps `WP`/`PASSAGES` aligned at 28, with a hard fallback to bundled `atlas-data.js`.
- CHANGELOG updated.

**Still human-gated:** Zenodo DOI (enable Zenodo↔GitHub, cut release); WHG upload (`SUBMISSION_WHG.md`).

## Session 2026-06-01 (cont.) — flagship map migrated (PR #6, merged to main)

`afanasy_v8_text_map.html` now builds `WP` from `data/places.csv` + `data/itinerary.csv` via `d3.csv` at boot. The kashan+yazd pair is merged back into one "Кашан / Йезд" display waypoint → 28 entries, **stop-by-stop aligned with the 28 `PASSAGES`** (verified). Hard fallback: if the spine load fails or doesn't yield 28 finite waypoints, `WP` stays the bundled `atlas-data.js` data (rendering identical to before); `window.__WP_SOURCE` reports `spine`/`bundled`. `PASSAGES`/`STATES`/`CITIES` and all render code unchanged. Verified: alignment, `node --check`, CSVs serve over HTTP, join in-bounds. The data spine is now the flagship's source of truth.

---

## Session 2026-05-23 — Polyglot prayer interlinear widget

Added **`afanasy_prayer_interlinear.html`** (28th widget). Word-by-word interlinear of Afanasiy's four polyglot passages (Ф. 49, Ф. 50–51, Ф. 97, and the closing doxology Ф. 104), transcribed from the 1986 academic edition via `hrustalev_tetradi_2026.pdf`. The doxology (Ф. 104) is decoded as the Basmala, Shahada, Qur'an 59:22–24, and the chain of the Beautiful Names (28 identified). Three modes (Чтение / Подстрочник / 99 имён), per-word detail panel, language filter, Arabic-script toggle, stat bar; reuses the shared `--viz-language-*` palette; cross-links to language map / manuscripts / religious crisis.

**Verification:** inline-script syntax check + headless-Chrome DOM render confirmed it renders with correct stats (49 formulae / 3 languages / 100% non-Russian / 28-of-99 names) and **no console errors**. ⚠️ Visual no-scroll at 1366×768, dark mode, and click-through interactions still need a real-browser pass — headless screenshot capture is blocked in this environment.

**Wired in:** `index.html` (textual category, card 16; later cards renumbered 17–28; meta/filter/footer/tour counts → 28; overview bullet), `sw.js` (cache bumped to `afanasy-atlas-v9` + new asset), `index.md`, `README.md` (textual sections + renumbering), `CHANGELOG.md`.

**Open for review:** the name-by-name Asmā' al-ḥusnā identification is mine — Khrustalev labels Ф.104 only generically («памятка… с именами Аллаха»); edition apparatus brackets `{}`/`[]` were normalized to a primary reading. `index.md` and `README.md` remain globally stale (they list 13 / 21 of the 28 widgets, predating this change) — a full reconciliation pass is still pending.

---

## New Chat Handoff (2026-05-21)

**Do not redo:** Phase 0 quick fixes, FIX 1–9, A5–A7, Phase 2 architecture migration, local asset bundling, shared data/theme, cross-linking, no-scroll desktop compaction, Canvas dark-mode palette work, color-token cleanup, and shared shadow-token cleanup are already implemented and pushed.

**Start here:**
1. `git status --short --branch` should show `## main...origin/main` and no local edits.
2. Run `python -m http.server 8080` before browser verification.
3. Use headless Edge/CDP or a normal browser; verify changed pages at 1366×768, theme toggle, relevant interactions, and clean console.
4. Keep commits small and push directly to `origin main` unless the human asks for a branch/PR.

**Best next work:**
1. Real-device PWA validation: Android Chrome install prompt, iPhone Safari Add to Home Screen, offline reload.
2. Optional live-site smoke test after GitHub Pages deploy.
3. Phase 5/6 roadmap work: toponym/person index, SVG/PNG export buttons, text passage viewer polish, English localization, iframe snippets.
4. Broad hardcoded-color review only if it finds real theme/readability issues; many remaining hex/rgba values are intentional local palette variables or index decoration.

---

## What Was Completed (Sessions 2026-05-19, 2026-05-20)

### Session 4 (Claude Haiku 4.5) — Phase 4 PWA + FIX 8 Gavan
| Task | Status | Notes |
|------|--------|-------|
| Phase 4.1 — PWA Service Worker | ✅ Done | Created `sw.js` with install/activate/fetch handlers, caches the current 21 widget pages plus shared assets |
| Phase 4.2 — PWA Manifest | ✅ Done | Created `manifest.json` with app icons (SVG), theme colors, metadata |
| Phase 4.3 — CDN fallback | ✅ Done | (Already completed in Phase 2 Stage 2: D3, TopoJSON, world-atlas in `lib/`) |
| PWA meta-tags | ✅ Done | Added to `index.html`: `<link rel="manifest">`, `apple-mobile-web-app-*`, theme-color |
| Service Worker registration | ✅ Done | Auto-registers on page load via `navigator.serviceWorker.register()` |
| Offline verification | ✅ Complete | localhost:8080 testing: manifest.json valid, sw.js functional, all 34 assets cacheable, offline strategy (cache-first + network fallback) verified. See test_pwa.js output and check_sw.html. Android/iPhone install testing requires physical devices. |
| Android PWA install | ⚠️ Pending | To test: open on Android at http://YOUR_PC_IP:8080, tap Install, verify offline mode works |
| iPhone Home Screen add | ⚠️ Pending | To test: open in Safari at http://YOUR_PC_IP:8080, Share → Add to Home Screen, verify offline mode works |
| FIX 8 — Mahmud Gavan | ✅ Done | 4-traveler comparison added: route (Gilan→Cairo→Damascus→Bidar→Goa→Vijayanagara), timeline, interactive toggle, legend |
| Gavan data integration | ✅ Done | Coordinates verified (36.8°N 49.6°E to 15.3°N 78.5°E), color (#6b4c8a), years 1453–1481 |
| Three → Four travelers | ✅ Done | Grid expanded to 4 columns, toggleTraveler logic updated, legend scales dynamically |
| FIX 5 — Manuscript leaf proof | ✅ Done | Two identical gaps (Ф. 11–14 & Ф. 41–44, ~1160 chars each) prove 1 lost leaf. Visual: side-by-side gaps + formula 1160=2×580. Table: page formats (Etterov 850/page, Trinity 700/page, proto-source 580/page), total 36,500 chars = 72 pages = 9 notebooks |
| FIX 6 — Silence zone + pronouns | ✅ Done | Grey zone (Mar 1471 – May 1472): 13+ months no writings. New 5th dimension "Одиночество" (яз/я один +10 vs есмя/мы −10). All 20 points tagged: Tver alone, Volga together, robbery destroys group, Bidar alone, prayer alone, sea together, Kaffa alone. Zone visualized as grey rect between points 14–15 |
| FIX 7 — Chronological order | ✅ Done | Toggle button switches between manuscript order (7 blocks → Mamyrev → 3 copies) and chronological writing order (7 periods: Persia 1468–69 → India 1469 → India 1470 → Dorozhnik 1470 → Aland+Parwat 1470–71 → SILENCE 1471–72 → War chronicle 1472–73 → Kaffa 1474). All nodes have detailed metadata about genre, language, manuscript page numbers (Ф.N). |
| A5 — Map canvas dark palette | ✅ Done | Removed the shared CSS inversion filter and made `afanasy_v8_text_map.html` rebuild its Canvas basemap with light/dark palettes from `data-theme`; verified `?wp=18` opens Dabhol and dark-mode canvas filter is `none` |
| A5 — Travelers canvas dark palette | ✅ Done | `three_travelers_comparison.html` now rebuilds its basemap/labels/legend from the active theme; verified 4-card toggle behavior and dark-mode Canvas redraw in headless Edge |
| A5 — Borders canvas dark palette | ✅ Done | `afanasy_borders_animation.html` now rebuilds its basemap, labels, active traveler marker, and year overlay from the active theme; verified play/pause, event click, and dark-mode Canvas redraw in headless Edge |
| A5 — Trade canvas dark palette | ✅ Done | `afanasy_trade_marshruttnik.html` now rebuilds its basemap, routes, ports, labels, and legend from the active theme; replaced an invalid CSS-variable string used as a Canvas fill color; verified filter and port interactions in headless Edge |
| A5 — World before/after canvas dark palette | ✅ Done | `afanasy_world_before_after.html` now redraws both before/after Canvas maps, route, markers, labels, and active highlights from the active theme; verified India click, after-tab toggle, and dark-mode Canvas redraw in headless Edge |
| A5 — Video export canvas dark palette | ✅ Done | `afanasy_video_export.html` now rebuilds its offscreen basemap and overlay palette from the active theme; verified play/pause, slider, speed select, short MediaRecorder start/stop, and dark-mode Canvas redraw in headless Edge |
| FIX 9 — Index navigation | ✅ Done | `index.html` now has search, six category filters, and a collapsible question/scenario section for the current 20 visible cards + video export download page; verified filter/search/details/theme interactions in headless Edge |
| Legacy date-range wording cleanup | ✅ Done | Removed literal old-range chronology strings from public widgets and project handoff/reference docs; `rg "1468.{0,3}1474"` is clean outside the extracted book text/PDF exclusions |
| Cross-linking | ✅ Done | `afanasy_calendar_pascha_islam.html` event details link to map waypoints; `afanasy_economics_prices.html` Bidar cards/SVG entries link to `?wp=12`; `afanasy_manuscripts.html` passage selector links to `afanasy_gantt.html?focus=...`; `afanasy_gantt.html` highlights focused periods from the query string; all 21 widget pages now show an `Атлас / текущая визуализация` breadcrumb back to `index.html`. |
| Local favicon | ✅ Done | Added `favicon.svg`, linked it from all HTML pages, added it to `manifest.json`, and included it in the Service Worker cache as `afanasy-atlas-v2`. |
| Compact atlas shell | 🔄 Partial | Tightened shared body/container/header spacing in `css/atlas.css`; 1366×768 audit now fits map, Gantt, people network, calendar, economics, editions, historiography, speed, and world before/after. Larger text-heavy widgets still need page-specific layout passes. |
| Chart height compaction | ✅ Done | Constrained citations, religious crisis, emotional arc, and composition tree charts/details; verified their primary interactions stay at `scrollHeight <= 768` in headless Edge. |
| Video export compaction | ✅ Done | `afanasy_video_export.html` canvas/controls/status/note now fit within 1366×768; verified play button, slider, speed select, theme toggle, and console in headless Edge. |
| Trade map compaction | ✅ Done | `afanasy_trade_marshruttnik.html` canvas/detail panel now fit within 1366×768; verified filter click, map click, theme toggle, and console in headless Edge. |
| Travelers compaction | ✅ Done | `three_travelers_comparison.html` cards/canvas now fit within 1366×768; verified Mahmud Gavan solo toggle, reset-to-all, theme toggle, and console in headless Edge. |
| Manuscripts compaction | ✅ Done | `afanasy_manuscripts.html` uses a two-column desktop layout with bounded proof/comparison panels; verified passage tab, diff note, Gantt link, theme toggle, and console in headless Edge at `scrollHeight <= 768`. |
| Bestiary compaction | ✅ Done | `afanasy_bestiary.html` uses a 6-column card grid and bounded detail panel; verified card selection, theme toggle, and console in headless Edge at `scrollHeight <= 768`. |
| Borders animation compaction | ✅ Done | `afanasy_borders_animation.html` uses a shorter Canvas and a compact two-column event list; verified event click, theme toggle, and console in headless Edge at `scrollHeight <= 768`. |
| Language map compaction | ✅ Done | `afanasy_language_map_v2.html` uses a two-column desktop layout with bounded passage/detail panels; verified language filter, timeline detail open/close, theme toggle, and console in headless Edge at `scrollHeight <= 768`. |
| Trade guide compaction | ✅ Done | `afanasy_trade_guide_v4.html` uses compact city/rate/result controls and an internally scrollable goods table; verified filtering, row detail, price tooltip, theme toggle, and console in headless Edge at `scrollHeight <= 768`. |
| Citation colors tokenized | ✅ Done | `afanasy_citations_v2.html` now uses shared `--viz-citation-*` variables for cards, data series, wave markers, legends, and Canvas text/lines; verified tabs, chart click, theme toggle, no scroll, and clean console in headless Edge. |
| Citation fallback cleanup | ✅ Done | Removed hardcoded Canvas color fallback values from `afanasy_citations_v2.html`; verified bar/area/category tabs, chart click, detail panel, nonblank Canvas, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| Religious crisis colors tokenized | ✅ Done | `afanasy_religious_crisis.html` now uses shared `--viz-religion-*` variables for cards, legend, SVG annotations, ratio shading, and detail badges; verified all three tabs, graph click, theme toggle, no scroll, and clean console in headless Edge. |
| Religious crisis fallback cleanup | ✅ Done | Removed the last JS color fallback values and manual `rgba(...)` alpha helper from `afanasy_religious_crisis.html`; verified all three graph modes, stacked-bar detail, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| Historiography colors tokenized | ✅ Done | `afanasy_historiography.html` now uses shared `--viz-hist-*` variables for timeline events, era bands, nav accents, detail headers, and tags; verified event selection, dark mode, no scroll, and clean console in headless Edge. |
| Historiography fallback cleanup | ✅ Done | Removed the last JS hex fallback color table and manual `rgba(...)` alpha helper from `afanasy_historiography.html`; verified the Khrustalev event detail, CSS variable presence, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| Composition tree colors tokenized | ✅ Done | `khozheniye_composition_tree.html` now uses shared `--viz-comp-*` variables and theme-aware SVG fill helpers for manuscript and chronological views; verified node click, order toggle, dark mode, no scroll, and clean console in headless Edge. |
| Composition tree fallback cleanup | ✅ Done | Removed the last JS hex fallback color table and manual `rgba(...)` alpha helper from `khozheniye_composition_tree.html`; verified manuscript node detail, chronological toggle, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| People network colors tokenized | ✅ Done | `afanasy_people_network.html` now uses shared `--viz-network-*` variables for legend, Canvas nodes/edges/labels, and detail accents; verified filter, node click, dark mode, no scroll, and clean console in headless Edge. |
| People network fallback cleanup | ✅ Done | Removed hardcoded Canvas color fallback values from `afanasy_people_network.html`; verified help filter, Canvas node selection, dark-mode redraw, no scroll, and clean console in headless Edge at 1366×768. |
| Language map colors tokenized | ✅ Done | `afanasy_language_map_v2.html` now uses shared `--viz-language-*` variables for highlighted text, cards, legend dots, timeline segments, and detail mini-bars; verified language filter, timeline detail open, dark mode, no scroll, and clean console in headless Edge. |
| Speed chart colors tokenized | ✅ Done | `afanasy_speed_land_sea.html` now uses shared variables for stay markers, label arrows, and tooltip shadow; verified SVG variable fill, tooltip hover, dark mode, no scroll, and clean console in headless Edge. |
| Manuscript comparison colors tokenized | ✅ Done | `afanasy_manuscripts.html` now uses shared `--viz-manuscript-*` variables for codex cards, diff highlights, legend dots, dynamic comparison headers, and note outlines; verified passage tab, Sukhanov toggle, diff note click, dark mode, no scroll, and clean console in headless Edge. |
| Emotional arc colors + pronoun completion | ✅ Done | `afanasy_emotional_arc.html` now uses shared emotion/chart variables for all SVG series and the silence zone. Added missing pronoun values for points 16–19 so the "Одиночество" dimension no longer emits SVG `NaN`; verified pronoun tab, point click, dark mode, no scroll, and clean console in headless Edge. |
| Gantt colors tokenized + focus fit | ✅ Done | `afanasy_gantt.html` now uses shared atlas variables for movement bars, region stripes, event diamonds, duration labels, and tooltip shadow; tightened focused SVG height so `?focus=bidar` fits at 1366×768; verified focus note, bar tooltip, deep-link href, dark mode, no scroll, and clean console in headless Edge. |
| World before/after colors tokenized | ✅ Done | `afanasy_world_before_after.html` now uses shared `--viz-world-*` variables for before/after map labels, detail chips, and Canvas palettes; verified India click, dark-mode Canvas redraw, no scroll, and clean console in headless Edge at 1366×768. |
| Four travelers colors + fit | ✅ Done | `three_travelers_comparison.html` now reuses shared atlas/world-map variables for its Canvas basemap, shared-waypoint accents, legend, and timeline text; bounded the route info panel so Mahmud Gavan solo mode fits at 1366×768; verified solo toggle, dark-mode Canvas redraw, no scroll, and clean console in headless Edge. |
| Trade guide colors tokenized | ✅ Done | `afanasy_trade_guide_v4.html` now uses shared economic/region variables for city selections, price/margin/risk states, badges, and inline result fills; verified buy/sell selection, result panel, row detail, price tooltip, dark mode, no scroll, and clean console in headless Edge. |
| Trade map colors tokenized | ✅ Done | `afanasy_trade_marshruttnik.html` now uses shared atlas/world/economic variables for goods badges, legend outlines, route lines, ports, labels, and Canvas basemap; verified spice filter, Calicut port click, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| Borders animation colors tokenized | ✅ Done | `afanasy_borders_animation.html` now uses shared atlas/world/economic variables for event accents, legend swatches, Canvas basemap, map labels, active marker, and Ottoman expansion arrows; verified event click, slider/play-pause, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| Borders state palette tokenized | ✅ Done | `afanasy_borders_animation.html` now routes all historical-state Canvas polygon fill/stroke colors through local `--ba-*` variables; verified the 1475 slider position, “Падение Кафы” event click, dark mode, nonblank Canvas, no scroll, and clean console in headless Edge at 1366×768. |
| Edition cover SVG colors tokenized | ✅ Done | `afanasy_editions_v3.html` now routes generated SVG cover colors, tag backgrounds, shelf accents, shadows, and selected-detail accents through local CSS variables/color-mix while preserving the reconstructed cover palette; verified Khrustalev 2026 cover selection, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| Route map colors tokenized | ✅ Done | `afanasy_v8_text_map.html` now uses shared world/accent/text variables for the Canvas basemap, route ghost/active lines, waypoint markers, labels, and active passage border; verified `?wp=18` Dabhol deep link, play/pause, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| Video export colors tokenized | ✅ Done | `afanasy_video_export.html` now routes its Canvas/HUD route palette through local `--ve-*` variables and uses shared atlas tokens for record/link accents; verified play/pause, slider, speed select, short MediaRecorder start/stop, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| Video export state palette tokenized | ✅ Done | `afanasy_video_export.html` now routes the light/dark historical-state polygon palette through local `--ve-state-*` variables and keeps `STATES` as geometry/metadata only; verified slider to 1475/Smolensk, play/pause, speed select, short MediaRecorder start/stop, dark mode, nonblank Canvas, no scroll, and clean console in headless Edge at 1366×768. |
| Bestiary SVG colors tokenized | ✅ Done | `afanasy_bestiary.html` now routes generated animal/plant SVG colors through local `--bs-c-*` variables while preserving the existing artwork; verified elephant and peacock card selection, dark mode, no scroll, and clean console in headless Edge at 1366×768. |
| Shared shadow token started | ✅ Done | Added `--shadow-container` and `--shadow-floating-control` to `css/atlas.css`; `index.html` and `afanasy_v8_text_map.html` now use the shared floating-control shadow token; verified both pages load, theme toggles, and clean console in headless Edge. |
| Shared shadow token batch 2 | ✅ Done | `afanasy_gantt.html`, `afanasy_calendar_pascha_islam.html`, and `afanasy_economics_prices.html` now use `--shadow-floating-control` for the theme-toggle shadow; verified all three pages load, theme toggles, and clean console in headless Edge. |
| Shared shadow token batch 3 | ✅ Done | `afanasy_citations_v2.html`, `afanasy_people_network.html`, and `afanasy_religious_crisis.html` now use `--shadow-floating-control` for the theme-toggle shadow; verified all three pages load, theme toggles, and clean console in headless Edge. |
| Shared shadow token batch 4 | ✅ Done | `afanasy_language_map_v2.html`, `afanasy_historiography.html`, and `afanasy_emotional_arc.html` now use `--shadow-floating-control` for the theme-toggle shadow; verified all three pages load, theme toggles, and clean console in headless Edge. |
| Shared shadow token batch 5 | ✅ Done | `afanasy_manuscripts.html`, `afanasy_speed_land_sea.html`, and `afanasy_trade_guide_v4.html` now use `--shadow-floating-control` for the theme-toggle shadow; verified all three pages load, theme toggles, and clean console in headless Edge. |
| Shared shadow token batch 6 | ✅ Done | `three_travelers_comparison.html`, `afanasy_world_before_after.html`, and `afanasy_trade_marshruttnik.html` now use `--shadow-floating-control` for the theme-toggle shadow; verified all three pages load, theme toggles, and clean console in headless Edge. |
| Shared shadow token cleanup complete | ✅ Done | Added `--shadow-popover` and `--shadow-detail-panel`; `afanasy_trade_guide_v4.html` tooltip and `khozheniye_composition_tree.html` detail panel/theme toggle now use shared shadow tokens; verified both pages load, theme toggles, and clean console in headless Edge. |
| Service Worker check colors tokenized | ✅ Done | `check_sw.html` now uses local CSS variables for the standalone PWA diagnostic page palette; verified the page loads and its checks/log render in headless Edge. |

### Session 3 (GPT-5.5) — Phase 0 Quick Fixes
| Task | Status | Notes |
|------|--------|-------|
| A1 — Broken download link in index | ✅ Done | `index.html` now links to existing `tetradi_hrustalev_2026.md` and keeps the Russian download filename |
| A2 — Reconcile visualization counts | ✅ Done | Public counts now use 13 existing HTML widgets in `index.html`, `README.md`, `index.md`, and `tmp.md` |
| A3 — Renumber index cards | ✅ Done | `index.html` card badges now run 1–12 sequentially |
| A4 — Hardcoded `color: #333` | ✅ Done | 12 visualization pages now use `var(--color-text-secondary)` for body text |
| Browser verification | ✅ Done | `python -m http.server 8080`; index links/cards/footer, theme toggles on 12 affected widgets, Gantt→Map deep-link presence, and console logs checked |
| FIX 2 — Gantt chronology | ✅ Done | Split India years into Bidar phases, Gulbarga, Kallur, Dabhol; replaced collapsed return block with 1474 Somalia/Maskat, Persian, Black Sea, and Kaffa segments; added key event diamonds |
| FIX 1 — Map waypoint additions | ✅ Done | Route map now has 28 waypoints, including Lar, Aland, Gulbarga, Kallur, Dabhol, Somalia, Erzinjan, Platana, and Balaklava/Gurzuf; generic "Зап. побережье" corrected to Dabhol |
| FIX 1 browser verification | ⚠️ Partial | Verified Gantt links for Gulbarga/Kallur/Dabhol/Gurzuf point into the new 0–27 map range; full map canvas and `?wp=18` text-panel initialization could not be verified because existing CDN D3/TopoJSON scripts did not load locally (A7/local lib follow-up) |
| FIX 3 — Calendar Easter observations | ✅ Done | Added 8 true-vs-observed Pascha markers, drift labels, the 1470 Ramadan/Lent 4/5 March annotation, and compact no-scroll layouts for timeline/events/convergence tabs |
| FIX 3 browser verification | ✅ Done | `python -m http.server 8080`; at 1366×768 clicked Timeline/Events/Convergence, opened the Пасха 8 Маскат card, toggled dark mode light→dark→light, checked console logs and no vertical page scroll |
| FIX 4 — Economics horse data | ✅ Done | Replaced estimated "зол." horse-loss values with 100 rubles purchase, 68 futuns sale, exactly one year ownership, 2.5 altyns/day in Bidar, and ruble/altyn/dengi conversion notes |
| FIX 4 browser verification | ✅ Done | `python -m http.server 8080`; at 1366×768 clicked all Economics tabs, opened the horse ledger tooltip, toggled dark mode light→dark→light, checked console logs and no vertical page scroll |
| Phase 2 Stage 1 — Shared CSS | ✅ Done | Created `css/atlas.css` from the common design-system CSS and replaced duplicated boilerplate in all 13 existing visualization HTML files with a shared stylesheet link |
| Stage 1 browser verification | ✅ Done | `python -m http.server 8080`; smoke-checked all 13 migrated widgets for `css/atlas.css`, header/back/theme controls, shared body/container styles, and console warnings; toggled dark mode on `three_travelers_comparison.html` |
| Phase 2 Stage 2 — Local assets | ✅ Done | Added local `lib/` copies of D3 v7, TopoJSON 3, world-atlas 110m, Tabler Icons CSS, and Tabler font files; replaced all CDN/script/fetch/icon fallback references in the current HTML pages |
| Stage 2 verification | ✅ Done | `python -m http.server 8080`; checked local asset HTTP 200 responses, verified no remaining CDN refs in HTML/CSS/lib, opened key pages with local script/style URLs and no console warnings; Browser plugin could not directly inspect page globals/canvas pixels because its evaluate context is isolated |
| Phase 2 Stage 3 — Shared data | ✅ Done | Created `js/atlas-data.js` with `window.ATLAS.WP`, `PASSAGES`, `STATES`, `CITIES`, `SEGS`, and `CITY_TO_WP`; map and Gantt pages now load the shared data file |
| Stage 3 verification | ✅ Done | Node parse check confirmed 28 waypoints, 28 passages, 13 state polygons, 14 cities, 48 Gantt segments, and 47 Gantt-to-map link keys; Chrome DevTools smoke test verified map `?wp=18` activates Dabhol, Gantt renders 108 map links including `wp=18`, theme toggles work, and console logs are clean |
| Offline follow-up for new widget | ✅ Done | After concurrent commit `25b817f` added `afanasy_world_before_after.html`, replaced its CDN D3/TopoJSON/world-atlas references with the already bundled local files |
| Phase 2 Stage 4 — Shared theme | ✅ Done | Created `js/atlas-theme.js` and replaced the duplicated theme-toggle IIFE in `index.html` plus the 13 established visualization pages with a shared script tag |
| Stage 4 verification | ✅ Done | Chrome DevTools smoke test loaded the index plus all 13 established widgets, confirmed `js/atlas-theme.js` is present, toggled each theme button, checked icon classes, and found no console issues |
| New widget shell normalization | ✅ Done | Wrapped the eight widgets added in `25b817f` in standalone HTML shells with `css/atlas.css`, local Tabler Icons, atlas back navigation, `js/atlas-theme.js`, and hidden headings; fixed README/index count drift to 21 widgets and renumbered homepage cards 1–20 |
| New widget shell verification | ✅ Done | Chrome DevTools smoke test loaded all eight new pages, confirmed clean Russian titles/back text, shared CSS/theme script, working theme toggles, representative button/canvas clicks, and no console issues |

### Session 1 (conv `a6b4ceee`) — Core UI Overhaul
| Task | Status | Notes |
|------|--------|-------|
| Remove «↓ Перейти к визуализациям» | ✅ Done | `index.html` |
| Publisher info → single line | ✅ Done | `index.html` |
| Add М.Ю. Гасунс credit | ✅ Done | `index.html` footer |
| Unified CSS theme across all 14 pages | ✅ Done | via `theme_injector.py` |
| Back button on every page | ✅ Done | sticky header |
| Responsive no-scroll layout | ✅ Done | `max-height: calc(100vh - 280px)` |
| Dark/light theme toggle | ✅ Done | `localStorage` persisted |
| Enlarge map point labels | ✅ Done | 6.5px→9.5px, 7.5px→10px |
| Fix three-travelers toggle reset | ✅ Done | solo → click again → all 3 |
| Trade marshruttnik — horizontal stats | ✅ Done | no vertical scroll |
| Borders animation 5× slower | ✅ Done | 0.0006→0.00012 |
| Gantt labels → clickable map links | ✅ Done | `?wp=N` deep links |
| Speed chart enlarged | ✅ Done | 660→860 wide |
| Calendar charts enlarged | ✅ Done | 640→900 and 660→900 |
| Calendar colors tokenized | ✅ Done | holiday legend and SVG fills now use shared `--viz-calendar-*` variables |
| Emotional arc font sizes up | ✅ Done | 7→10px |
| Economics colors aligned | ✅ Done | regional palette + shared `--viz-region-*` / `--viz-economic-*` variables for SVG fills |
| Language map, manuscripts, tree — fonts up | ✅ Done | 13→15px base |
| Fix broken HTML in video export | ✅ Done | stray `<` removed |
| Remove non-existent religious crisis card | ✅ Done | index.html |

---

## Active Decisions & Rationale

### Design System
- **Parchment palette (light):** `#ffffff` / `#fdfbf7` / `#f5eedf` backgrounds; `#8b5a30` primary border (amber-brown)
- **Dark palette:** `#0f0b07` / `#1a1208` backgrounds; `#c09060` borders
- **Accent:** `#b87020` (amber gold) for interactive highlights
- **Region color mapping** (consistent across all charts):
  - Russia/North: `#3770be` (blue)
  - Persia/Iran: `#b97314` (amber-brown)
  - Hormuz/Arabian Sea: `#e0a020` (golden amber)
  - India/Deccan: `#be3c28` (terracotta red)
  - Ottoman/Black Sea: `#4a7c59` (muted green)

### Layout Constraints
- **No vertical scroll** is a hard requirement on all visualization pages (1366×768 minimum)
- Canvas/SVG elements use `max-height: calc(100vh - 280px)` to fit within the page header + controls
- Stats/legend panels should be **horizontal**, not vertical sidebars

### Data Integrity
- All dates follow **Khrustalev 2026** dating: journey 1467–1475, not the older chronology
- Gold coin rate: 1 зол. = $529 USD = ₽38 900 (as of May 14, 2026 gold price $151.18/g)
- `GOLD_GRAM_USD` and `USD_RUB` constants in `afanasy_trade_marshruttnik.html` need weekly update

---

## Known Issues / Incomplete Items

| Issue | Severity | File | Notes |
|-------|----------|------|-------|
| Existing 1366×768 page scroll | Resolved | multiple widgets | Compact shell and widget-specific passes now fit the audited 1366×768 pages without document-level vertical scroll. |
| Mobile touch targets | Low | all pages | Not tested on phone; touch targets may be too small |
| New widget color-token audit | Resolved | audited widgets | Shared chart/data/shadow token cleanup is complete for the audited pages; remaining literal colors are mostly local palette variables or index decoration and should only be changed if they cause a real theme/readability issue |
| `scratch/theme_injector.py` not committed to repo | Resolved | — | Committed in `9e006c0` |
| PWA device install/offline reload | Medium | `manifest.json`, `sw.js` | Static files are present; needs Android Chrome / iPhone Safari install and offline reload validation |

---

## Files Modified Since Last Clean Commit

> After commit `7125f8e`, tracked files should be clean. `check_sw.html` is now intentionally tracked as the standalone Service Worker/PWA diagnostic page. Temporary CDP verification scripts under `scratch/verify_*.cjs` were deleted before commits.

```
git status --short --branch
# expected: ## main...origin/main
```

---

## Architecture Notes for Next AI

### How the Theme System Works
1. `index.html` has a `<button id="theme-toggle">` that sets `data-theme="dark"` on `<html>`
2. Visualization CSS variables now live in `css/atlas.css`; `index.html` still has its own inline CSS until a later stage
3. Each visualization page independently stores/reads `localStorage.getItem('afanasy-theme')` on load
4. The theme toggle button's state is synced on each page load

### How Gantt → Map Deep Links Work
1. `afanasy_gantt.html` defines `CITY_TO_WP = { 'Тверь': 0, 'Баку': 4, ... }` mapping city names to waypoint indices
2. SVG labels and bars are wrapped in `<a xlink:href="afanasy_v8_text_map.html?wp=N">` elements
3. `afanasy_v8_text_map.html` reads `new URLSearchParams(location.search).get('wp')` on init to set the active waypoint

### wrap_visualizations.py vs theme_injector.py
- `wrap_visualizations.py` (in brain scratch) — first attempt, wraps standalone HTML in full template; **not used in final version**
- `scratch/theme_injector.py` — **current approach**; patches `:root {}` and `[data-theme="dark"] {}` blocks into existing files without restructuring them

---

## Suggested Next Steps (see ROADMAP.md for full plan)

**Priority (today):**
1. ✅ **FIX 5** — Manuscripts: leaf-size proof + two-gap visualization (DONE)
2. ✅ **FIX 6** — Emotional arc: silence zone (1471–1472) + pronoun analysis (DONE)
3. ✅ **FIX 7** — Composition tree: chronological writing order toggle (DONE)
4. ✅ **A5 map** — remove CSS canvas inversion and add map-owned dark palette (DONE)
5. ✅ **A5 remaining canvases** — world before/after and video export theme-aware Canvas palettes (DONE)
6. ✅ **FIX 9** — current 21-widget index navigation with search/category filters (DONE)
7. ✅ **A7** — local asset/CDN documentation sync (DONE)
8. ✅ **A6** — phantom widget link audit/status sync (DONE)
9. ✅ **Cross-linking** — Calendar→Map, Economics→Map, Manuscripts→Gantt, Gantt focus links, and all-pages breadcrumbs are done
10. ✅ **No-scroll layout** — shared shell + four chart widgets + video export + trade map + travelers + manuscripts + bestiary + borders + language map + trade guide compacted and browser-verified at 1366×768
11. ✅ **Color-token audit** — citations/economics/calendar/language map/religious crisis/historiography/composition tree/people network/speed chart/manuscripts/emotional arc/Gantt/world before-after/four travelers/trade guide/trade map/border animation incl. state palette/edition covers/route map/video export incl. state palette/bestiary SVG are done; shared shadow-token cleanup is complete for the audited pages; old audit patterns are clean

**Then (roadmap work):**
1. **PWA real-device validation** — Android Chrome install, iPhone Safari Add to Home Screen, offline reload
2. **Live GitHub Pages smoke test** — index + representative widgets after deploy
3. **Phase 5.2** — Toponym / person index across widgets
4. **Phase 6.1** — SVG/PNG export buttons

**Mobile testing (Phase 4):**
- Test PWA install on Android (Chrome: should show Install prompt)
- Test PWA add on iPhone (Safari: Share → Add to Home Screen)
- Verify offline mode works on both platforms

---

*Maintained by Antigravity AI · Do not delete — required for session continuity*
