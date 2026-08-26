# ROADMAP — Афанасий Никитин Интерактивный Атлас

_Created: 19-05-2026 · Last updated: 26-08-2026_

Development roadmap for the interactive atlas. Items are grouped by phase and priority.  
Status: 🟢 Done · 🟡 In Progress · ⬜ Planned · ❌ Cancelled / Removed

> **Current snapshot (2026-08-26, measured against the tree — H3003 truth-pass):** the site is a
> **Docusaurus 3.6.3** application, rebuilt by [`f54d64d`](https://github.com/gasyoun/AfanasiyNikitin/commit/f54d64d) (10-07-2026, [PR #34](https://github.com/gasyoun/AfanasiyNikitin/pull/34), H486).
> It serves **33 widget pages** tracked under [`static/atlas/`](https://github.com/gasyoun/AfanasiyNikitin/tree/main/static/atlas), embedded through the
> `<AtlasFigure src=… />` component rather than linked from a hand-written hub, plus the narrative and data sections.
> The open **data spine** in [`data/`](https://github.com/gasyoun/AfanasiyNikitin/tree/main/data) declares **18 resources** in
> [`datapackage.json`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/datapackage.json) — 12 CSV datasets plus 6 derived exports (LPF GeoJSON,
> route GeoJSON, Lithuanian itinerary JSON, RDF/Turtle, BibTeX, CSL-JSON) — places/people reconciled to
> Wikidata/GeoNames/Pleiades/VIAF, a Linked Places Format export for the World Historical Gazetteer, and a
> reproducible computus, all checked by the `data-validate` CI workflow (verified: job `validate` in
> [.github/workflows/data-validate.yml](https://github.com/gasyoun/AfanasiyNikitin/blob/main/.github/workflows/data-validate.yml)).
> The pre-Docusaurus files `index.html`, `check_sw.html`, `sw.js` and `manifest.json` are **no longer in the tree**.
> Earlier Phase 0–3 scholarly/data work, the Phase 2 architecture migration, local assets, shared theme/data,
> cross-linking, no-scroll desktop layout, Canvas dark-mode palettes, and color-token cleanup are complete and on `main`.
>
> The previous snapshot line was dated 2026-06-01 and predated the whole Docusaurus era; its two counts
> («29 HTML widget pages», «9 FAIR datasets») were **un-bumped**, not invented — see «Status check» at the foot of this file.

---

## Phase 1 — Foundation ✅ Complete (May 2026)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1.1 | Interactive visualization widgets | 🟢 Done | Started as 14 pages; the tree now carries **33** widget pages under [`static/atlas/`](https://github.com/gasyoun/AfanasiyNikitin/tree/main/static/atlas). The «29» here was an un-bumped count — CHANGELOG records the climb 29 → 31 → 32 → 33 |
| 1.2 | GitHub Pages deployment | 🟢 Done | https://gasyoun.github.io/AfanasiyNikitin/ |
| 1.3 | `index.html` navigation hub | ❌ Superseded | Shipped May 2026, then **deleted** by [`f54d64d`](https://github.com/gasyoun/AfanasiyNikitin/commit/f54d64d) (10-07-2026, H486). Its role passed to the Docusaurus landing [`src/pages/index.js`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/src/pages/index.js) (three doors — Нарратив / Атлас / Данные) plus the `/atlas/` category IA. No hand-written hub remains |
| 1.4 | Academic documentation set | 🟢 Done | README, CLAUDE, index.md, use cases |
| 1.5 | Journey geodata | 🟢 Done | Route data expanded to 28 map waypoints and shared through `js/atlas-data.js` |

---

## Phase 2 — UI/UX Polish ✅ Complete (2026-05-19)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 2.1 | Unified CSS variable design system | 🟢 Done | Parchment + dark palette on all pages |
| 2.2 | Dark / light theme toggle | 🟢 Done | `localStorage` persisted, cross-page |
| 2.3 | Back button on all pages | 🟢 Done | Sticky «← Вернуться в атлас» header |
| 2.4 | No-scroll responsive layout | 🟢 Done | `max-height: calc(100vh - 280px)` |
| 2.5 | Larger typography on all charts | 🟢 Done | Fonts +2–3 px everywhere |
| 2.6 | Consistent region color palette | 🟢 Done | Russia=blue, India=red, Hormuz=amber, Persia=brown |
| 2.7 | Animation speed tuning | 🟢 Done | Borders 5× slower |
| 2.8 | Three-travelers toggle UX fix | 🟢 Done | Solo → click again → all 3 |
| 2.9 | Gantt → Map deep link navigation | 🟢 Done | `?wp=N` URL param |
| 2.10 | Trade port stats horizontal layout | 🟢 Done | Eliminates vertical scroll |

---

## Phase 2b — UI/UX Upgrade ✅ Complete (2026-05-20)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 2b.1 | Web fonts (Inter + Playfair Display) | 🟢 Done | Google Fonts via `@import` in `atlas.css` |
| 2b.2 | Fix Tabler Icons on index.html | 🟢 Done | Missing `<link>` tag — theme toggle icon was invisible |
| 2b.3 | Fix hardcoded dark-mode colors | 🟢 Done | Footer `#bbb` → `var(--color-text-secondary)` |
| 2b.4 | WCAG contrast improvement | 🟢 Done | `--color-text-secondary` darkened `#6e5e54` → `#5e4e44` |
| 2b.5 | Hero gradient on index header | 🟢 Done | Warm parchment gradient + animated radial glow |
| 2b.6 | Sticky filter bar | 🟢 Done | `position: sticky` with `backdrop-filter: blur(12px)` |
| 2b.7 | Page entry animation | 🟢 Done | `fadeSlideIn` 0.35s on `.vis-container` and `.container` |
| 2b.8 | Keyboard shortcuts (all 22 pages) | 🟢 Done | `Esc` → atlas, `D` → toggle theme |
| 2b.9 | Accessibility (`aria-label`, `:focus-visible`) | 🟢 Done | All theme toggles + global focus styles |
| 2b.10 | Mobile tap targets | 🟢 Done | 44px filter pills, 3-col bestiary, 2-col emotion dims |
| 2b.11 | Card hover glow | 🟢 Done | Parchment-tone shadow + `:active` press feedback |
| 2b.12 | Theme toggle animation | 🟢 Done | Spring cubic-bezier + rotate on active |
| 2b.13 | Smooth scroll on filter click | 🟢 Done | Scrolls to first visible section |
| 2b.14 | Type scale CSS variables | 🟢 Done | `--text-xs` through `--text-2xl` |
| 2b.15 | Global tabular numerals | 🟢 Done | `font-variant-numeric: tabular-nums` |
| 2b.16 | Meta description tag | 🟢 Done | SEO on index.html |

---

## Phase 3 — Missing Visualizations ✅ Complete (2026-05-19)

| # | Item | Status | Notes |
|---|------|----------|-------------|
| 3.1 | `afanasy_world_before_after.html` | 🟢 Done | Two side-by-side Canvas maps: medieval myths vs personal experience |
| 3.2 | `afanasy_religious_crisis.html` | 🟢 Done | «Господи» vs «Аллах» vs «Бог» term frequency by section |
| 3.3 | `afanasy_people_network.html` | 🟢 Done | Force graph of people: helped / harmed / mentioned |
| 3.4 | `afanasy_historiography.html` | 🟢 Done | Timeline 1475–2026 with clickable nodes |
| 3.5 | `afanasy_bestiary.html` | 🟢 Done | 12 SVG bestiary cards in medieval manuscript style |
| 3.6 | `afanasy_citations_v2.html` | 🟢 Done | Citation trends by decade with milestone annotations |

---

## Phase 4 — Offline & Performance ❌ Removed 10-07-2026 (was 🟡 Mostly Complete 2026-05-21)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 4.1 | **PWA Service Worker** (`sw.js`) | ❌ Removed | Shipped 2026-05-21, then **deleted** by [`f54d64d`](https://github.com/gasyoun/AfanasiyNikitin/commit/f54d64d) (10-07-2026, H486, [PR #34](https://github.com/gasyoun/AfanasiyNikitin/pull/34)) in the Docusaurus rebuild. [`package.json`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/package.json) has no `@docusaurus/plugin-pwa` — nothing replaced it. The site has no Service Worker |
| 4.2 | **`manifest.json`** | ❌ Removed | Deleted by the same commit [`f54d64d`](https://github.com/gasyoun/AfanasiyNikitin/commit/f54d64d). The site is not installable as a home-screen app |
| 4.3 | **CDN fallback** | 🟢 Done | D3, TopoJSON, world-atlas bundled locally in `lib/` |
| 4.4 | **Canvas performance on mobile** | 🟢 Done | `devicePixelRatio` awareness across all 10 canvas widgets (already shipped; classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719) |
| 4.5 | **Real-device PWA validation** | ❌ Not executable | Stood as the single 🔴 «do next» item until 26-08-2026. There is no PWA left to validate — 4.1 and 4.2 were removed 10-07-2026. Re-opens only if a human rules that offline support is restored (Lane C below) |

---

## Phase 5 — Scholarly Features 🟡 4 of 5 live (5.1 regressed 10-07-2026)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 5.1 | **Full-text search** | ❌ Regressed | The search bar and category filter pills lived on the `index.html` deleted by [`f54d64d`](https://github.com/gasyoun/AfanasiyNikitin/commit/f54d64d). [`docusaurus.config.mjs`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/docusaurus.config.mjs) carries no Algolia block and [`package.json`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/package.json) no local-search plugin, so `preset-classic`'s Algolia theme is inert. Category **browsing** survives as the `/atlas/` IA (7 thematic sections); toponym/person lookup survives only inside 5.2's concordance widget. Site-wide search exists nowhere |
| 5.2 | **Toponym / person index** | 🟢 Done | `afanasy_concordance_index.html` (H486); classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719 |
| 5.3 | **Text passage viewer** | 🟢 Done | Flagship map text-sync since v1; classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719 |
| 5.4 | **Citation export** | 🟢 Done | "Цитировать" button → BibTeX `@misc` + GOST-style Russian reference, on the widget export toolkit and `<AtlasFigure>` toolbar ([PR #42](https://github.com/gasyoun/AfanasiyNikitin/pull/42), H766) |
| 5.5 | **English localization** | 🟢 Done | Language toggle RU/EN; shipped H498 (10-07-2026, v1.7.0) |

---

## Phase 6 — Export & Embed ✅ Complete (2026-07 — all three rows shipped; the ⬜ header was stale)

| # | Item | Priority | Description |
|---|------|----------|-------------|
| 6.1 | **SVG/PNG download buttons** | 🟢 Done | `js/atlas-export.js` (SVG + PNG via `canvas.toBlob()` / `Blob`+`URL.createObjectURL`) in 27 widgets (H486); classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719 |
| 6.2 | **Embeddable `<iframe>` snippets** | 🟢 Done | `<AtlasFigure>` toolbar (H719) has a "⧉ Embed" button that copies a ready-to-paste `<iframe src="https://gasyoun.github.io/AfanasiyNikitin/atlas/…">` snippet for the canonical published widget — one component, all 33 pages |
| 6.3 | **Print stylesheet** | 🟢 Done | `@media print` in `css/atlas.css` (hides controls, expands charts); classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719 |

---

## Phase 7 — Data Updates 🟡 Ongoing

| # | Item | Cadence | Notes |
|---|------|---------|-------|
| 7.1 | Gold rate update (`GOLD_GRAM_USD`, `USD_RUB`) | Weekly | In `afanasy_trade_guide_v4.html` (not `afanasy_trade_marshruttnik.html`, which has no rate constants); current: $131.54/g, USD/RUB 78.11, 1 зол. ≈ $460 ≈ ₽35 931 (27 июля 2026) — **stale by ~30 days against its own Weekly cadence**, and [CLAUDE.md](https://github.com/gasyoun/AfanasiyNikitin/blob/main/CLAUDE.md) still quotes the pre-H1508 $151.18/g. Refreshing a live rate is a product update, not roadmap hygiene; H3003 recorded the staleness and did not execute it |
| 7.2 | Waypoint data review | Per book edition | If Khrustalev publishes errata or a 2nd edition, update `afanasy_journey_data.md` and all widgets |
| 7.3 | Academic citation index | Annual | Add new publications to [`afanasy_citations_v2.html`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/static/atlas/afanasy_citations_v2.html) when created. The filename given here before, `afanasy_citations_stats.html`, has never existed in this repository |

---

## Phase 8 — Current Technical Cleanup 🟡 Ongoing

| # | Item | Status | Notes |
|---|------|--------|-------|
| 8.1 | Desktop no-scroll audit | 🟢 Done | Audited at 1366×768 in headless Edge across the compacted widget set |
| 8.2 | Canvas dark-mode palettes | 🟢 Done | CSS inversion removed; Canvas widgets draw theme-aware palettes internally |
| 8.3 | Color-token audit | 🟢 Done | Shared chart/data/shadow tokens now cover the audited pages; legacy audit patterns are clean |
| 8.4 | Broad hardcoded-color review | ⬜ Planned | Optional: inspect remaining local palette definitions/index decorative CSS; avoid churn unless a real theme/readability issue appears |
| 8.5 | Full live GitHub Pages smoke test | ⬜ Planned | After Pages deploy, verify the live landing, representative widgets, and the console. The «Service Worker» leg was dropped 26-08-2026 — 4.1 is removed |

---

## Cancelled / Deferred

| Item | Reason |
|------|--------|
| React/Vue migration | No build pipeline needed; vanilla JS is fine for this scale |
| Backend API for text search | Overkill; static JS index sufficient |
| WebAssembly map renderer | Canvas 2D performance is acceptable |

---

## Priority Summary

Rewritten 26-08-2026 against the tree — the previous block promoted 4.5 as the single
🔴 «do next» item nine weeks after the PWA it validates had been deleted.

```
🔴 High priority (do next):
  — none an agent can execute; 4.5 died with the PWA it was to validate

🟡 Medium priority:
  8.5 Full live GitHub Pages smoke test   (no Service Worker leg any more)
  7.1 Gold/currency rate refresh          (~30 days stale against a Weekly cadence)

🟢 Low priority / nice-to-have:
  8.4 Broad hardcoded-color review

🧊 Needs a human ruling (see «Status check 26-08-2026» below):
  offline support — restore 4.1/4.2, or record the PWA as abandoned
  site-wide search — restore 5.1 on Docusaurus, or record it as dropped in the rebuild

✅ Recently shipped (2026-07):
  5.5 English localization        (v1.7.0)
  6.2 iframe embed snippets       (v1.8.0, PR #39)
  4.4 Mobile canvas optimization  · 5.2 Toponym index · 5.3 Text passage viewer
  6.1 SVG/PNG export buttons · 6.3 Print stylesheet   (classified done, PR #40 / H719)
  5.4 Citation export             (PR #42 / H766)
```

---

## Status check 26-08-2026 (H3003) — what the tree says, and who unblocks each open item

Executed by **Opus 5** (`claude-opus-5`) under
[H3003 — slice 5 of the stale-roadmap `/ask` batch](https://github.com/gasyoun/Uprava/blob/main/handoffs/H3003-Opus_multi_stale-roadmap-s5-dh-narrative-ask-replan_17.08.26.md).
Every row below was verified against the working tree and `git log`, not against prose in this file
or in the README. No product checkbox was executed in this pass.

### What turned out not to be so

| Row | What it claimed | What the tree shows | Evidence |
|---|---|---|---|
| 1.3, 4.1, 4.2 | `index.html` hub 🟢, Service Worker 🟢, `manifest.json` 🟢 | all four files (plus `check_sw.html`) deleted in the Docusaurus rebuild; no PWA plugin replaced them | [`f54d64d`](https://github.com/gasyoun/AfanasiyNikitin/commit/f54d64d) 10-07-2026, [PR #34](https://github.com/gasyoun/AfanasiyNikitin/pull/34), H486; [`package.json`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/package.json) |
| 4.5 | 🔴 High priority «do next» | unexecutable — nothing left to validate | follows from 4.1/4.2 |
| 5.1 | Full-text search 🟢, «search bar + category filter pills on `index.html`» | the surface is gone and nothing replaced it: no Algolia config, no local-search plugin | [`docusaurus.config.mjs`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/docusaurus.config.mjs), [`package.json`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/package.json) |
| 8.5 | smoke test includes «Service Worker» | that leg is void | follows from 4.1 |
| Snapshot line | «29 HTML widget pages», dated 2026-06-01 | 33 widget pages tracked under `static/atlas/` | CHANGELOG records 29 → 31 → 32 → 33; 6.2's own note and [CLAUDE.md](https://github.com/gasyoun/AfanasiyNikitin/blob/main/CLAUDE.md) already said 33 |
| Snapshot line | «9 FAIR datasets» | 18 declared resources = 12 CSV + 6 derived exports | [`datapackage.json`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/datapackage.json); `legs`/`events`/`edges` added by `80986b8` **on 2026-06-01**, the snapshot's own date — the count went stale within hours, it was never false when written |
| Phase 5, Phase 6 headers | ⬜ Planned | Phase 6 is three-for-three 🟢; Phase 5 is four-of-five | the tables directly beneath those headers |
| 7.3 | «add to `afanasy_citations_stats.html`» | that filename has never existed; the real file is `afanasy_citations_v2.html` | [`static/atlas/`](https://github.com/gasyoun/AfanasiyNikitin/tree/main/static/atlas), README |
| 7.1 | rate current as of 27 July 2026 | ~30 days old against a **Weekly** cadence; `CLAUDE.md` still carries the older $151.18/g | [CLAUDE.md](https://github.com/gasyoun/AfanasiyNikitin/blob/main/CLAUDE.md) |

### Verified still true — do not "fix" these

4.3 (D3/TopoJSON/world-atlas bundled in [`static/atlas/lib/`](https://github.com/gasyoun/AfanasiyNikitin/tree/main/static/atlas/lib)) ·
4.4 · 5.2 · 5.3 · 5.4 · 5.5 ·
6.1 ([`js/atlas-export.js`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/static/atlas/js/atlas-export.js)) ·
6.2 (the `<AtlasFigure>` embed button does cover all 33 pages) ·
6.3 (`@media print` in [`css/atlas.css`](https://github.com/gasyoun/AfanasiyNikitin/blob/main/static/atlas/css/atlas.css)) ·
the snapshot's `data-validate` CI claim (job `validate` exists and runs).

### Who unblocks each open item

| Lane | Items | Who acts |
|---|---|---|
| **A — agent-doable now** | 7.1 gold/currency refresh · 8.4 hardcoded-color review · 8.5 live smoke test (after a Pages deploy) | an agent, in a product pass — deliberately **not** executed by this hygiene pass |
| **B — specified, waiting on an artefact** | 7.2 waypoint review (waits on Khrustalev errata or a 2nd edition) · 7.3 citation index (waits on new publications appearing) | nobody until the artefact exists |
| **C — a human ruling** | restore offline support (4.1/4.2) or record the PWA as abandoned · restore site-wide search (5.1) or record it as dropped · 4.5 real-device validation, which needs both a restored PWA and physical Android/iPhone hardware | a human should decide |

### The absence of error that was checked

The `datapackage.json` resource count and the widget-page count were both suspected of being
fabrications. They are not: each was accurate on the day it was written and simply never bumped.
`CHANGELOG.md` entries that mention `index.html` or the `afanasy-atlas-v13`/`v14` Service Worker
caches are **historical release records and were left untouched** — that file is append-only.

---

_Executor provenance: Opus 5 (`claude-opus-5`), 26-08-2026, H3003. Superseded byline «Maintained by Antigravity AI · Last updated 2026-07-12»._

_Dr. Mārcis Gasūns_
