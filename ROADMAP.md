# ROADMAP — Афанасий Никитин Интерактивный Атлас

Development roadmap for the interactive atlas. Items are grouped by phase and priority.  
Status: 🟢 Done · 🟡 In Progress · ⬜ Planned · ❌ Cancelled

> **Current snapshot (2026-06-01):** the public atlas has 29 HTML widget pages plus `index.html` and `check_sw.html`, now backed by an open **data spine** in `data/` — 9 FAIR datasets + Frictionless `datapackage.json`, places/people reconciled to Wikidata/GeoNames/Pleiades/VIAF, a Linked Places Format export for the World Historical Gazetteer, and a reproducible computus — all checked by the `data-validate` CI workflow. Earlier Phase 0–3 scholarly/data work, Phase 2 architecture migration, local assets, shared theme/data, cross-linking, no-scroll desktop layout, Canvas dark-mode palettes, and color-token cleanup are complete and pushed to `main`.

---

## Phase 1 — Foundation ✅ Complete (May 2026)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1.1 | Interactive visualization widgets | 🟢 Done | Started as 14 pages; current public atlas has 29 widget pages |
| 1.2 | GitHub Pages deployment | 🟢 Done | https://gasyoun.github.io/AfanasiyNikitin/ |
| 1.3 | `index.html` navigation hub | 🟢 Done | Cards by category |
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

## Phase 4 — Offline & Performance 🟡 Mostly Complete (2026-05-21)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 4.1 | **PWA Service Worker** (`sw.js`) | 🟢 Done | Caches all 29 HTML files + local D3/TopoJSON assets + the spine map's data |
| 4.2 | **`manifest.json`** | 🟢 Done | Installable as home-screen app |
| 4.3 | **CDN fallback** | 🟢 Done | D3, TopoJSON, world-atlas bundled locally in `lib/` |
| 4.4 | **Canvas performance on mobile** | 🟢 Done | `devicePixelRatio` awareness across all 10 canvas widgets (already shipped; classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719) |
| 4.5 | **Real-device PWA validation** | ⬜ Planned | Android Chrome install prompt + iPhone Safari Add to Home Screen + offline reload |

---

## Phase 5 — Scholarly Features ⬜ Planned

| # | Item | Status | Notes |
|---|------|--------|-------|
| 5.1 | **Full-text search** | 🟢 Done | Search bar + category filter pills on `index.html` |
| 5.2 | **Toponym / person index** | 🟢 Done | `afanasy_concordance_index.html` (H486); classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719 |
| 5.3 | **Text passage viewer** | 🟢 Done | Flagship map text-sync since v1; classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719 |
| 5.4 | **Citation export** | 🟢 Done | "Цитировать" button → BibTeX `@misc` + GOST-style Russian reference, on the widget export toolkit and `<AtlasFigure>` toolbar ([PR #PLACEHOLDER](https://github.com/gasyoun/AfanasiyNikitin/pull/PLACEHOLDER), H766) |
| 5.5 | **English localization** | ⬜ Planned | Language toggle RU/EN |

---

## Phase 6 — Export & Embed ⬜ Planned

| # | Item | Priority | Description |
|---|------|----------|-------------|
| 6.1 | **SVG/PNG download buttons** | 🟢 Done | `js/atlas-export.js` (SVG + PNG via `canvas.toBlob()` / `Blob`+`URL.createObjectURL`) in 27 widgets (H486); classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719 |
| 6.2 | **Embeddable `<iframe>` snippets** | 🟢 Done | `<AtlasFigure>` toolbar (H719) has a "⧉ Embed" button that copies a ready-to-paste `<iframe src="https://gasyoun.github.io/AfanasiyNikitin/atlas/…">` snippet for the canonical published widget — one component, all 33 pages |
| 6.3 | **Print stylesheet** | 🟢 Done | `@media print` in `css/atlas.css` (hides controls, expands charts); classified in [PR #40](https://github.com/gasyoun/AfanasiyNikitin/pull/40), H719 |

---

## Phase 7 — Data Updates ⬜ Ongoing

| # | Item | Cadence | Notes |
|---|------|---------|-------|
| 7.1 | Gold rate update (`GOLD_GRAM_USD`, `USD_RUB`) | Weekly | In `afanasy_trade_marshruttnik.html`; current: $151.18/g, 1 зол. ≈ $529 ≈ ₽38 900 |
| 7.2 | Waypoint data review | Per book edition | If Khrustalev publishes errata or a 2nd edition, update `afanasy_journey_data.md` and all widgets |
| 7.3 | Academic citation index | Annual | Add new publications to `afanasy_citations_stats.html` when created |

---

## Phase 8 — Current Technical Cleanup 🟡 Ongoing

| # | Item | Status | Notes |
|---|------|--------|-------|
| 8.1 | Desktop no-scroll audit | 🟢 Done | Audited at 1366×768 in headless Edge across the compacted widget set |
| 8.2 | Canvas dark-mode palettes | 🟢 Done | CSS inversion removed; Canvas widgets draw theme-aware palettes internally |
| 8.3 | Color-token audit | 🟢 Done | Shared chart/data/shadow tokens now cover the audited pages; legacy audit patterns are clean |
| 8.4 | Broad hardcoded-color review | ⬜ Planned | Optional: inspect remaining local palette definitions/index decorative CSS; avoid churn unless a real theme/readability issue appears |
| 8.5 | Full live GitHub Pages smoke test | ⬜ Planned | After Pages deploy, verify live index, representative widgets, Service Worker, and console |

---

## Cancelled / Deferred

| Item | Reason |
|------|--------|
| React/Vue migration | No build pipeline needed; vanilla JS is fine for this scale |
| Backend API for text search | Overkill; static JS index sufficient |
| WebAssembly map renderer | Canvas 2D performance is acceptable |

---

## Priority Summary

```
🔴 High priority (do next):
  4.5 Real-device PWA validation  (gated — needs physical Android/iPhone)

🟡 Medium priority:
  8.5 Full live GitHub Pages smoke test

🟢 Low priority / nice-to-have:
  8.4 Broad hardcoded-color review

✅ Recently shipped (2026-07):
  5.5 English localization        (v1.7.0)
  6.2 iframe embed snippets       (v1.8.0, PR #39)
  4.4 Mobile canvas optimization  · 5.2 Toponym index · 5.3 Text passage viewer
  6.1 SVG/PNG export buttons · 6.3 Print stylesheet   (classified done, PR #40 / H719)
  5.4 Citation export             (PR #PLACEHOLDER / H766)
```

---

*Maintained by Antigravity AI · Last updated 2026-07-12*
