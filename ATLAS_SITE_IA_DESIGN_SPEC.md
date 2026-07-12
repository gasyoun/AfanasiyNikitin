# Atlas site — information architecture & design system spec

_Created: 10-07-2026 · Last updated: 10-07-2026_

Target spec for rebuilding the Afanasiy Nikitin atlas site from scratch on Docusaurus, replacing the current flat tree of hand-rolled standalone HTML pages. Authored by Opus 4.8 (`claude-opus-4-8`); intended build executor Sonnet 5 (`claude-sonnet-5`) per [H486](https://github.com/gasyoun/Uprava/blob/main/handoffs/archive/H486-Sonnet_AfanasiyNikitin_atlas_site_docusaurus_rebuild_10.07.26.md).

Reference implementation for the target shape: [csl-guides](https://sanskrit-lexicon.github.io/csl-guides/).

---

## 1. Measured baseline

Everything below is counted from the tree at commit time, not estimated.

| Fact | Value | Consequence |
|---|---|---|
| Visualization pages | 33 (`afanasy_*.html` ×31, plus [khozheniye_composition_tree.html](https://github.com/gasyoun/AfanasiyNikitin/blob/main/khozheniye_composition_tree.html) and [three_travelers_comparison.html](https://github.com/gasyoun/AfanasiyNikitin/blob/main/three_travelers_comparison.html)) | Too many to port by hand; must be embedded, not rewritten |
| Pages linking [css/atlas.css](https://github.com/gasyoun/AfanasiyNikitin/blob/main/css/atlas.css) | 34 of 35 | The chrome is already centralized |
| Pages linking [js/atlas-theme.js](https://github.com/gasyoun/AfanasiyNikitin/blob/main/js/atlas-theme.js) | 32 of 35 | Theming is already centralized |
| Inline CSS selectors unique to exactly one page | 1,064 of 1,078 (**98%**) | Inline CSS is visualization-specific, **not** duplicated chrome |
| Inline CSS selectors shared by ≥5 pages | **0** | There is no cross-page style duplication to deduplicate |
| `--color*` custom properties in `atlas.css` | 82 | The token layer exists but is unstructured |
| Inline CSS + JS in [index.html](https://github.com/gasyoun/AfanasiyNikitin/blob/main/index.html) | 12.5 KB + 10.9 KB | A hand-rolled nav shell; Docusaurus deletes it outright |

**The load-bearing conclusion.** Because the page chrome lives in one shared stylesheet that 34 of 35 pages already consume, *rewriting `atlas.css` restyles all 33 visualization pages at once without touching a line of D3.* The visualizations can therefore stay as static HTML embedded in iframes, and still pick up the new design system. This is what makes an iframe-based rebuild viable rather than a compromise.

---

## 2. Defects the rebuild must fix

1. **Inverted style ownership.** `atlas.css` hardcodes selectors belonging to individual pages — `.tm-f`, `.ms-ptab`, `.tv-card`, `.ms-cod`, `.brd-ev-row`, `.brd-leg`, `.bestiary-card`. The shared layer knows the trade page and the bestiary page by name. Invert it: pages declare *semantic* classes; the shared layer styles only semantics and never a page-specific class.

2. **No navigation shell.** Every page is an island reachable only from `index.html` via a breadcrumb. There is no sidebar, no search, no next/previous within a theme, no sense of where a reader is.

3. **An unstructured token layer.** 82 `--color*` properties with no scale, no semantic naming, and no separation between primitive tokens (a palette) and semantic tokens (`--surface`, `--text-muted`). Dark mode is a second flat list rather than a remapping.

4. **Theme does not propagate into a rendered iframe.** `atlas-theme.js` writes `localStorage['theme']` and a `data-theme` attribute on `<html>`. Same-origin iframes read it correctly *on load*, but an already-rendered iframe will not react to a live toggle in the parent. Fix with a `storage`-event listener inside `atlas-theme.js` — roughly ten lines, and it benefits the standalone pages too.

5. **No responsive story.** The pages assume a wide viewport. Iframed content on a phone will need an explicit min-width plus horizontal scroll container, or a "open full screen" affordance.

---

## 3. Rights constraint on the narrative layer

[RIGHTS.md](https://github.com/gasyoun/AfanasiyNikitin/blob/main/RIGHTS.md) establishes that Khrustalev's *expression* and his *selection and arrangement* — the seven тетради, the year-by-year chronology — are protected, and that a wholesale précis exceeds the citation right of ГК РФ ст. 1274. The book PDF and the two book-derived files are correctly gitignored; there is no current exposure.

**This constrains the narrative spine directly.** A chapter-by-chapter walk through Khrustalev's reconstruction *is* the précis the policy forbids. The narrative layer must instead be organized around:

- the **public-domain «Хожение»** (15th century), quoted directly; and
- the project's **own dataset** — [data/itinerary.csv](https://github.com/gasyoun/AfanasiyNikitin/blob/main/data/itinerary.csv), [data/events.csv](https://github.com/gasyoun/AfanasiyNikitin/blob/main/data/events.csv), [data/places.csv](https://github.com/gasyoun/AfanasiyNikitin/blob/main/data/places.csv) — whose facts are free;

with Khrustalev **cited as a source for specific claims**, never restated as a structure. The build must also verify that no Docusaurus `static/` copy step drags a gitignored, in-copyright file into the published bundle.

---

## 4. Target information architecture

Three layered entrances, per the chosen "all three, layered" purpose. Docusaurus, Russian as the default locale, English as a second locale via native i18n.

```
/                     Landing (custom React page): one route map, three doors, the citation + DOI
/put/                 НАРРАТИВ — the journey, docs sidebar, chapters keyed to the dataset
/atlas/               АТЛАС — the 33 visualizations, six themes, gallery + one page each
/data/                ДАННЫЕ — data model, provenance, reconciliation, downloads, licence
```

**Why this avoids the incoherent middle** that a three-entrance site normally produces: each layer consumes the layer below it, rather than sitting beside it. A narrative chapter embeds atlas figures; an atlas page cites the data tables it was built from; the data section is the ground truth both stand on. A reader can enter at any depth and descend.

### 4.1 `/atlas/` — the six themes

All 33 pages, grouped. Each becomes one MDX page: a heading, the iframe, a caption, a trust block (source artifact, *n*, date), a data-table fallback, and a CSV download — the house `/viz-page` contract.

| Theme | Pages | Count |
|---|---|---|
| Путь и пространство | `map_spine`, `v8_text_map`, `sea_voyages`, `speed_land_sea`, `borders_animation`, `gavan_parallel`, `parvat`, `language_map_v2` | 8 |
| Торговля и экономика | `trade_guide_v4`, `trade_marshruttnik`, `economics_prices` | 3 |
| Время и календарь | `calendar_pascha_islam`, `pascha_chronograph`, `event_timeline`, `gantt` | 4 |
| Вера и мир | `religious_crisis`, `prayer_interlinear`, `bestiary`, `climate_monsoon`, `world_before_after` | 5 |
| Текст и рукописи | `manuscripts`, `manuscript_layers`, `editions_v3`, `khozheniye_composition_tree`, `concordance_index`, `citations_v2` | 6 |
| Метод и историография | `historiography`, `epistemic_lens`, `lod_coverage`, `three_travelers_comparison`, `people_network`, `emotional_arc`, `video_export` | 7 |

`video_export` is a utility rather than a finding; if it stays, it belongs behind a "tools" divider, not in the gallery proper.

### 4.2 What is deleted

[index.html](https://github.com/gasyoun/AfanasiyNikitin/blob/main/index.html) and [check_sw.html](https://github.com/gasyoun/AfanasiyNikitin/blob/main/check_sw.html). The hand-rolled service worker ([sw.js](https://github.com/gasyoun/AfanasiyNikitin/blob/main/sw.js)), [manifest.json](https://github.com/gasyoun/AfanasiyNikitin/blob/main/manifest.json), [robots.txt](https://github.com/gasyoun/AfanasiyNikitin/blob/main/robots.txt) and [sitemap.xml](https://github.com/gasyoun/AfanasiyNikitin/blob/main/sitemap.xml) are all superseded by Docusaurus equivalents. The 33 visualization pages move to `static/atlas/` unchanged.

### 4.3 What is preserved untouched

The data layer, which is the strongest part of the repo and must not be rebuilt: [data/](https://github.com/gasyoun/AfanasiyNikitin/tree/main/data), [datapackage.json](https://github.com/gasyoun/AfanasiyNikitin/blob/main/datapackage.json), [codemeta.json](https://github.com/gasyoun/AfanasiyNikitin/blob/main/codemeta.json), [.zenodo.json](https://github.com/gasyoun/AfanasiyNikitin/blob/main/.zenodo.json), [CITATION.cff](https://github.com/gasyoun/AfanasiyNikitin/blob/main/CITATION.cff), the Linked Places export, and the TTL graph. The `Dataset` JSON-LD block currently inlined in `index.html` moves to the Docusaurus head config — it must survive the rebuild, since the Zenodo/WHG citation path depends on it.

---

## 5. Design system

Replace the 82 flat custom properties with a two-tier token set.

**Primitives** — a palette with no meaning attached: an ink ramp, a parchment ramp, one accent, and a categorical series for the visualizations drawn per the house dataviz palette.

**Semantic tokens** — what the components actually reference: `--surface`, `--surface-raised`, `--text`, `--text-muted`, `--border`, `--accent`, `--focus`. Dark mode remaps *these*, and only these, so the dark theme is a single mapping table rather than a duplicated stylesheet.

**Type.** A serif for the narrative prose — the register is a 15th-century travel account, and the current all-sans setting reads like a dashboard. A sans for UI chrome and labels. Tabular figures everywhere a number is compared vertically (prices, distances, dates).

**Page templates.** Three, and no more: the *doc page* (prose, sidebar, TOC), the *atlas page* (figure + trust block + table fallback + download), the *landing page*. Every route resolves to one of them.

**The iframe contract.** A single `<AtlasFigure src=… />` MDX component wraps every embed: it sets the height, forwards the theme, provides the full-screen affordance, supplies the caption and the trust block, and renders the `<noscript>` and small-viewport fallbacks. Thirty-three pages, one component, one place to fix a bug.

---

## 6. Sequence

The order matters, because step 2 is what makes the iframes acceptable and everything downstream assumes it.

1. **Scaffold** Docusaurus over the existing tree; get a green build with an empty content set. `/docusaurus-scaffold`.
2. **Rewrite `atlas.css`** into the two-tier token system, removing the seven page-specific selectors and pushing them down into the pages that own them. Verify all 33 pages still render standalone.
3. **Add the `storage`-event listener** to `atlas-theme.js` so a parent toggle propagates into live iframes.
4. **Move** the 33 pages to `static/atlas/`; build the `<AtlasFigure>` component; generate the 33 MDX wrappers and the six theme gallery pages.
5. **Author** the narrative spine — dataset-and-Хожение keyed, per §3 — and the data section.
6. **Enable i18n**, `ru` default and `en` second locale.
7. **Verify**: build green, no gitignored file in the bundle, JSON-LD present, theme propagates, mobile scroll works, every external link resolves.

Steps 1–4 and 6–7 are mechanical (Sonnet tier). Step 5 and the design decisions in §5 are judgment and voice (Fable 5, `claude-fable-5`).

---

## 7. Open questions

- Does the narrative spine ship in the first release, or does the site launch with `/atlas/` + `/data/` and gain `/put/` later? The rights rewrite in §3 makes it the slowest layer to author.
- Is the English locale a full translation of the narrative, or only of the atlas captions and the data documentation? The dataset labels are already largely English.
- `video_export` — a genuine deliverable, or scratch tooling to drop?

_Dr. Mārcis Gasūns_
