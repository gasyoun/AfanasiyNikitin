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

## Phase 3 — Missing Visualizations ⬜ Planned

These widgets are described in `README.md` and `index.md` but do not yet exist as files.

| # | Item | Priority | Description |
|---|------|----------|-------------|
| 3.1 | `afanasy_world_before_after.html` | 🔴 High | Two side-by-side maps: medieval myths (pre-journey knowledge) vs. personal experience. Click a location to compare "what Afanasiy knew" vs "what he found". Requires Canvas split-panel or SVG overlay approach |
| 3.2 | `afanasy_religious_crisis.html` | 🔴 High | «Господи» vs «Аллах» vs «Бог» vs «Иса» term frequency by text section. Three modes: stacked bars, lines, ratio. Climax: 1470 — Arabic exceeds Russian |
| 3.3 | `afanasy_social_network.html` | 🟡 Medium | D3 force graph of people Afanasiy met: Hasan-Khoja, Asad-Khan, Mahmud Gavan, the Shah. Draggable nodes, edge weights = interaction strength, filter by role (helped / harmed / mentioned) |
| 3.4 | `afanasy_historiography.html` | 🟡 Medium | Timeline: who "discovered" Afanasiy — 1475 (Mamyrev) → 1818 (Karamzin) → 1853 → 1948 (USSR) → 1960 (film) → 1986 (academic) → 2026 (Khrustalev). Clickable nodes with quotes |
| 3.5 | `afanasy_bestiary.html` | 🟡 Medium | 12 SVG "bestiary" cards in medieval manuscript style: elephant, parrot, mongoose, cobra, coconut, pepper, ginger, indigo, monkey, peacock, date palm, cotton. First mentions in Russian literature |
| 3.6 | `afanasy_citations_stats.html` | 🟢 Low | Citation trends: how often Afanasiy Nikitin is cited in academic literature by decade. D3 line or bar chart with milestone annotations |

---

## Phase 4 — Offline & Performance ⬜ Planned

| # | Item | Priority | Description |
|---|------|----------|-------------|
| 4.1 | **PWA Service Worker** (`sw.js`) | 🔴 High | Cache all 14 HTML files + D3/TopoJSON CDN libraries. Enables fully offline use — critical for lectures and conference demos without internet |
| 4.2 | **`manifest.json`** | 🟡 Medium | Installable as a home-screen app on Android and iOS |
| 4.3 | **CDN fallback** | 🟡 Medium | Bundle D3 and TopoJSON locally as `/lib/d3.min.js` — CDN failure currently breaks all cartographic pages |
| 4.4 | **Canvas performance on mobile** | 🟢 Low | `afanasy_v8_text_map` draws ~800 map features per frame; add `devicePixelRatio` awareness and reduce detail on mobile |

---

## Phase 5 — Scholarly Features ⬜ Planned

| # | Item | Priority | Description |
|---|------|----------|-------------|
| 5.1 | **Full-text search** | 🔴 High | Search bar on `index.html` that matches visualization titles, descriptions, and key terms (toponyms, person names). No backend — index baked into JS |
| 5.2 | **Toponym / person index** | 🟡 Medium | Cross-visualization panel: click "Ормуз" → highlights all relevant points across map, Gantt, trade chart, calendar simultaneously |
| 5.3 | **Text passage viewer** | 🟡 Medium | Sidebar with the original "Khozheniye" text synchronized to the map animation — currently partially implemented in `afanasy_v8_text_map.html` but needs polish |
| 5.4 | **Citation export** | 🟢 Low | Each visualization gets a "Cite this" button generating BibTeX / footnote for academic papers |
| 5.5 | **English localization** | 🟢 Low | Language toggle RU/EN. All UI strings externalized to JSON. Academic audience is international |

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
  3.1 World before/after map
  3.2 Religious crisis chart
  4.1 PWA Service Worker
  5.1 Full-text search on index

🟡 Medium priority:
  3.3 Social network graph
  3.4 Historiography timeline
  3.5 Bestiary cards
  4.2 PWA manifest
  4.3 Local CDN bundle
  5.2 Toponym index
  5.3 Text passage viewer polish
  6.1 SVG/PNG export buttons

🟢 Low priority / nice-to-have:
  3.6 Citation statistics
  4.4 Mobile canvas optimization
  5.4 Citation export
  5.5 English localization
  6.2 iframe embed snippets
  6.3 Print stylesheet
```

---

*Maintained by Antigravity AI · Last updated 2026-05-19*
