# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Афанасий Никитин — Интерактивный Атлас** is a collection of 21 interactive visualizations documenting the 1467–1475 journey of the Russian merchant Afanasiy Nikitin to India. The project supplements Dmitri Khrustalev's 2026 academic work "Тетради купца Афанасия" (Nestor-Istoriya Publishers).

All visualizations are **standalone HTML widgets** built with vanilla JavaScript, D3.js v7, and Canvas 2D API. There is no backend, framework, or build pipeline — each widget is a self-contained file that runs directly in the browser.

---

## Development Setup

### Running Locally

Since all files are static HTML, you have two options:

1. **Direct browser:** Open any `.html` file directly in a browser (Chrome/Firefox preferred for Canvas APIs)
2. **Local server** (recommended for CORS-free operation):
   ```powershell
   # PowerShell
   python -m http.server 8000
   # or: python -m SimpleHTTPServer 8000 (Python 2.7)
   
   # Then visit http://localhost:8000
   ```

### File Organization

```
├── README_afanasy_visualizations.md  # Technical documentation
├── index.md                          # Master index of all 21 visualizations
├── use_cases_and_guide.md            # Educational use cases & instructions
├── Тетради_купца_Афанасия.md        # Full book summary by Khrustalev
├── afanasy_geolocations.md           # Coordinates, distances, GeoJSON
├── afanasy_journey_data.md           # Timeline data: 19 waypoints
├── afanasy_v8_text_map.html          # Widget 1: Animated route + text sync
├── afanasy_video_export.html         # Widget 2: WebM video recorder
├── three_travelers_comparison.html   # Widget 3: Afanasiy vs Polo vs da Gama
├── [17 more visualization .html files]
└── tetradi_hrustalev_2026.md        # Work notes (in progress)
```

---

## Architecture & Patterns

### HTML Widget Structure

Every visualization follows this pattern:

```html
<h2 class="sr-only">Accessibility title</h2>
<style>
  /* Inline CSS using CSS custom properties */
  /* Uses var(--color-*), var(--font-*), var(--border-radius-*) */
</style>

<div class="[widget-namespace]">
  <!-- HTML markup -->
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js"></script>
<script>
(function(){
  // Self-contained vanilla JS (no frameworks)
  // Accesses DOM elements by ID
})();
</script>
```

### Key Conventions

1. **CSS Variables:** All colors, fonts, and spacing use `var(--*)` custom properties. These are defined in the parent page/CSS framework (likely a design system). Do not hardcode colors in new widgets.

2. **Inline Code:** JS and CSS are kept inline to make widgets truly portable — no build step needed.

3. **DOM Selectors:** Widgets use `getElementById()` and scoped selectors. No global state pollution.

4. **External Dependencies:** Only D3.js v7 and TopoJSON are loaded from CDN. Canvas, SVG, and all data are inline.

5. **Data Structure:** Waypoints and visualization data are hardcoded as JS arrays at the top of each widget's `<script>` block.

### Category Classifications

Visualizations are organized by type:

- **Cartographic** (6): animated maps, route animation, borders, trade ports
- **Chronological & Quantitative** (4): Gantt chart, speed analysis, calendar, emotional arc
- **Textual & Linguistic** (3): language distribution, religious terminology, manuscript comparison
- **Characters & Structure** (4): social network graph, textual composition tree, historiography, editions
- **Economics & Trade** (2): horse transaction, merchant trading filter
- **Statistical** (2): citation trends, bestiary

---

## Technology Stack

| Technology | Use | Version |
|---|---|---|
| **D3.js** | Cartographic projections, SVG axes, interactive elements | v7.8.5 |
| **Canvas 2D API** | Animated maps, timeline rendering, draggable graphs | Native (HTML5) |
| **SVG** | Static graphics, bestiary cards, composition tree | Inline |
| **TopoJSON** | World geography (110m resolution) | v3.0.2 |
| **MediaRecorder API** | Video export to WebM | Native (HTML5) |
| **Vanilla JS** | All interactivity (no React/Vue/etc.) | ES6+ |

---

## Common Editing Tasks

### Adding a New Visualization

1. Create a new `.html` file with the standard widget structure
2. Use `var(--*)` CSS custom properties for colors and spacing
3. Embed all CSS inline; avoid external stylesheets
4. Add the visualization to both `index.md` and the appropriate category section in `README_afanasy_visualizations.md`
5. Update `use_cases_and_guide.md` if it fits a use case

### Updating Data

Data is embedded as constants in each widget's JS block. Examples:

- **Route waypoints:** `const WP = [[lat, lon, time, name, ...], ...]` in `afanasy_v8_text_map.html`
- **Citation timeline:** hardcoded year → count pairs in the statistics widget
- **Text passages:** inline string arrays for synchronized text display

To update data, locate the data array, modify it, and test in the browser.

### Currency Conversion

The project uses "золотой" (gold coins) for medieval prices. The exchange rate is defined in multiple places:

```
1 золотой ≈ Venetian ducat = 3.5g pure gold
Current rate: ~$151.18/g → 1 золотой ≈ $529 USD ≈ ₽38,900 RUB
```

Update the rate weekly by searching for `GOLD_GRAM_USD` and `USD_RUB` constants in widgets that handle economics (e.g., `afanasy_trade_marshruttnik.html`).

### Custom Mercator Projection

The main map widget uses a cropped Mercator projection for the route region:
- **Longitude:** 26° E to 84° E (Tver to China)
- **Latitude:** 7° N to 63° N (Indian coast to Moscow)

The projection math is in `afanasy_v8_text_map.html`:
```javascript
const LON0=26, LON1=84, LAT0=7, LAT1=63;
function mY(lat){return Math.log(Math.tan(Math.PI/4+lat*Math.PI/360));}
```

Do not adjust without updating all route visualizations that depend on this viewport.

---

## Testing in Browser

1. **Functionality:** Click all interactive elements (buttons, dropdowns, sliders, data points)
2. **Responsiveness:** Open DevTools (F12) and resize viewport (test mobile, tablet, desktop)
3. **CSS Variables:** Open DevTools → inspect computed styles to confirm colors/fonts are loading
4. **Canvas Performance:** On slower systems, test animation smoothness (especially `afanasy_video_export.html`)
5. **External Data:** Confirm TopoJSON and D3 load from CDN (check Network tab in DevTools)

---

## Documentation Files

| File | Purpose |
|---|---|
| `README_afanasy_visualizations.md` | Technical stack, methodology, data sources, currency notes |
| `index.md` | Master index: all 21 visualizations with descriptions |
| `use_cases_and_guide.md` | Educational use cases (6 teacher scenarios + kids' guide) |
| `Тетради_купца_Афанасия.md` | Full book summary (structure, characters, conclusions) |
| `afanasy_geolocations.md` | Coordinates for all 19 route points + GeoJSON export |
| `afanasy_journey_data.md` | Timeline data: dates, sea crossings, waypoint descriptions |

Always update relevant docs when modifying visualizations.

---

## Scholarly Context

The project is grounded in Dmitri Khrustalev's 2026 monograph which revises the traditional dating of Afanasiy Nikitin's journey from **1468–1474** to **1467–1475** using:

- Astronomical analysis of Paschal dates (Easter 1469 in Hormuz)
- Overlap of Orthodox Lent and Ramadan (~4 March 1470)
- Mahashivaratri observation (~19 Feb 1471, Srisailam)
- Text reconstruction of the original "tetradies" (bound notebooks)

All visualizations must respect this scholarship. When adding dates or interpretations, verify against the book or existing documentation.

---

## Source Material

- **Primary text:** "Хожение за три моря" (Khozheniye za tri morya), Troitsky manuscript (primary source)
- **Modern edition:** Lurye & Semenov (eds.), *Khozheniye za tri morya* (Nauka, 1986)
- **Academic commentary:** Khrustalev, D.G., *Tetradii kuptsa Afanasiya* (Nestor-Istoriya, 2026)
- **Medieval geography:** Ibn Majid's *Kitab al-Fawa'id* (c. 1490, maritime distances)
- **World topology:** World-atlas 110m from Natural Earth via CDN

---

## Notes for Developers

- **No build step:** All widgets work as-is. If adding a transpiled language, document the build command clearly.
- **Mobile-first:** Test on phones (all visualizations should be touch-friendly).
- **Accessibility:** Use semantic HTML (`<h2>`, `<nav>`, labels), ARIA attributes, and sufficient color contrast (>4.5:1).
- **Localization:** Russian text is embedded in HTML/JS. If translating, plan for layout changes (German/English are longer).
- **Embedding:** Widgets use CSS custom properties so they can be embedded in any design system. Respect variable naming.
