# ROADMAP — Афанасий Никитин Интерактивный Атлас

Development roadmap for the interactive atlas. Items are grouped by phase and priority.  
Status: 🟢 Done · 🟡 In Progress · ⬜ Planned · ❌ Cancelled

---

## Phase 1 — Foundation ✅ Complete (May 2026)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1.1 | 14 interactive visualization widgets | 🟢 Done | All 14 HTML pages live |
| 1.2 | GitHub Pages deployment | 🟢 Done | https://gasyoun.github.io/AfanasiyNikitin/ |
| 1.3 | `index.html` navigation hub | 🟢 Done | Cards by category |
| 1.4 | Academic documentation set | 🟢 Done | README, CLAUDE, index.md, use cases |
| 1.5 | 19-waypoint geodata | 🟢 Done | `afanasy_geolocations.md`, `afanasy_journey_data.md` |

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

## Phase 4 — Offline & Performance ✅ Complete (2026-05-19)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 4.1 | **PWA Service Worker** (`sw.js`) | 🟢 Done | Caches all 21 HTML files + local D3/TopoJSON assets |
| 4.2 | **`manifest.json`** | 🟢 Done | Installable as home-screen app |
| 4.3 | **CDN fallback** | 🟢 Done | D3, TopoJSON, world-atlas bundled locally in `lib/` |
| 4.4 | **Canvas performance on mobile** | ⬜ Planned | `devicePixelRatio` awareness and detail reduction |

---

## Phase 5 — Scholarly Features ⬜ Planned

| # | Item | Status | Notes |
|---|------|--------|-------|
| 5.1 | **Full-text search** | 🟢 Done | Search bar + category filter pills on `index.html` |
| 5.2 | **Toponym / person index** | ⬜ Planned | Cross-visualization panel: click "Ормуз" → highlights across map, Gantt, trade chart |
| 5.3 | **Text passage viewer** | ⬜ Planned | Sidebar with original text synchronized to map animation |
| 5.4 | **Citation export** | ⬜ Planned | BibTeX / footnote for academic papers |
| 5.5 | **English localization** | ⬜ Planned | Language toggle RU/EN |

---

## Phase 6 — Export & Embed ⬜ Planned

| # | Item | Priority | Description |
|---|------|----------|-------------|
| 6.1 | **SVG/PNG download buttons** | 🟡 Medium | Each SVG chart gets a "⬇ Download SVG" and "⬇ Download PNG" button. For Canvas pages: `canvas.toBlob()`. For SVG: `Blob` + `URL.createObjectURL` |
| 6.2 | **Embeddable `<iframe>` snippets** | 🟢 Low | Each visualization page generates a one-line `<iframe>` embed code for other websites or digital humanities platforms |
| 6.3 | **Print stylesheet** | 🟢 Low | `@media print {}` rules that hide controls, expand charts to full width, and render in black-and-white for academic papers |

---

## Phase 7 — Data Updates ⬜ Ongoing

| # | Item | Cadence | Notes |
|---|------|---------|-------|
| 7.1 | Gold rate update (`GOLD_GRAM_USD`, `USD_RUB`) | Weekly | In `afanasy_trade_marshruttnik.html`; current: $151.18/g, 1 зол. ≈ $529 ≈ ₽38 900 |
| 7.2 | Waypoint data review | Per book edition | If Khrustalev publishes errata or a 2nd edition, update `afanasy_journey_data.md` and all widgets |
| 7.3 | Academic citation index | Annual | Add new publications to `afanasy_citations_stats.html` when created |

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
  5.2 Toponym / person index
  6.1 SVG/PNG export buttons

🟡 Medium priority:
  4.4 Mobile canvas optimization
  5.3 Text passage viewer polish
  5.5 English localization
  6.2 iframe embed snippets

🟢 Low priority / nice-to-have:
  5.4 Citation export
  6.3 Print stylesheet
```

---

*Maintained by Antigravity AI · Last updated 2026-05-20*
