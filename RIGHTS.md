# RIGHTS.md — source & copyright triage

Phase 0 of the FAIR-data plan. It establishes **what may be published openly and what must stay local**, so every dataset row can carry a defensible `source_id` and so the repo doesn't republish protected material.

> **Not legal advice.** This is a working editorial policy. Confirm the flagged items with the publisher (Нестор-История) or a rights professional before any formal release.

---

## TL;DR

- **Facts are free.** Coordinates, dates, distances, place/person names, and the *fact* that Khrustalev proposes the 1467–1475 dating are not copyrightable. The open dataset (`data/*.csv`, CC-BY-4.0) may carry them; cite the source as scholarly courtesy.
- **Expression is not free.** Khrustalev's prose, his translations, and the *selection & arrangement* of his reconstruction (the seven «тетради», the chronological assignment) are protected for the author's life + 70 years (ГК РФ ст. 1281). Do **not** host the book text or a full précis of it.
- **The medieval «Хожение» is public domain** (15th c.). Short quotations are fine — cite the edition used. A specific modern transcription/translation (e.g. Nauka 1986) carries its own editorial copyright: quote the *text*, never reproduce the *apparatus*.

---

## ⚠️ Two live exposures in the PUBLIC repo

The repo is public (`github.com/gasyoun/AfanasiyNikitin`). Two tracked files are derived from the in-copyright book:

1. **`tetradi_hrustalev_2026.md`** — a detailed précis that reproduces the ISBN, the seven-block reconstruction (the book's central original contribution), and the full year-by-year new chronology. A summary this close to the book's original structure likely exceeds the Russian citation right (ГК РФ ст. 1274 permits citation «в объеме, оправданном целью» — not a wholesale précis).
2. **`article_drevnyaya_rus_draft.md`** — your own `article_site_weak_spots.md` §2.6 states the journal requires the article not be public before a decision.

**Recommendation (your call — I have not done this):** for each, either trim to a short factual abstract, or untrack while keeping the local file:

```sh
git rm --cached tetradi_hrustalev_2026.md article_drevnyaya_rus_draft.md
# then add both to .gitignore
```

✅ `scratch/book_text.txt` and `hrustalev_tetradi_2026.pdf` are already **gitignored** (not tracked) — correct.

---

## Source register

Full machine-readable version: [`data/sources.csv`](data/sources.csv). Summary:

| `source_id` | What | Rights | May we publish? |
|---|---|---|---|
| `KHR2026` | Khrustalev, *Тетради купца Афанасия* (Нестор-История, 2026) | in-copyright (life+70) | **Facts only.** No text, no full précis. |
| `LUR1986` | Lurye–Semenov critical edition (Nauka, 1986) | in-copyright (~2066) | Short medieval-text quotes only; **never** the apparatus/translation. |
| `KHOZ` | The medieval «Хожение», 15th c. (Troitsky, Letopisny, Sukhanovsky, Undolsky) | public domain | Yes — quote the text, cite the edition. |
| `BLDR` | Pushkin House online text | link-only | Link, do not mirror. |
| `IBNMAJID` | Ibn Mājid, *Kitāb al-Fawāʾid* (c. 1490) | public domain | Method/distances only. |
| `NATEARTH` | Natural Earth / world-atlas 110m | public domain (CC0) | Yes (already bundled). |
| `WIKIDATA` | Wikidata | CC0 | Yes — reconciliation target (Phase 2). |
| `PLEIADES` | Pleiades gazetteer | CC-BY | Yes — reconciliation target (Phase 2). |
| `ATLAS` | This project's own analytical layer | CC-BY-4.0 | Yes — it's ours. |

---

## Working rules by material type

These map onto the dataset's `epistemic` column (the five-label vocabulary from `article_site_weak_spots.md` §2.5):

| Label | Meaning | Publishable? |
|---|---|---|
| `text` | A fact stated in the medieval «Хожение» itself | Yes — PD; short quote + edition cite. |
| `reconstruction` | Khrustalev's claim (e.g. an absolute date) | The **fact** of the claim, yes (cite KHR2026); his **wording**, no. |
| `localization` | A modern coordinate assigned to a historical place | Yes — coordinates are facts/our analysis. |
| `model` | A heuristic (trade margins, currency conversion) | Yes, **clearly flagged as a model** (closes §2.3). |
| `hypothesis` | A disputed or uncertain identification | Yes, flagged; never presented as settled (closes §1.4). |

---

## Licensing

- **Code:** keep the repo's existing license.
- **Data (`data/`):** CC-BY-4.0 (recommended) — declared in [`datapackage.json`](datapackage.json) `licenses`.
- **Hosted text:** none beyond short public-domain medieval quotations with edition attribution.

Keeping code and data licenses distinct is standard FAIR practice and lets the dataset be cited and reused independently of the widgets.

---

## Resolved — `ATLAS.PASSAGES`

The modern-Russian renderings in `js/atlas-data.js` (`ATLAS.PASSAGES`) are **the project author's own** modernizations of the public-domain medieval text (confirmed 2026-06-01). They are therefore ours to license and may be published under the dataset's CC-BY-4.0.

---

*Phase 0 of the FAIR-data plan · created 2026-06-01 · revisit before any Zenodo release.*
