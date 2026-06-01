# Submitting the gazetteer to the World Historical Gazetteer (WHG)

The place dataset is exported as **Linked Places Format** at [`data/places.lpf.geojson`](data/places.lpf.geojson) and validated as WHG-ready by [`tools/validate_lpf.py`](tools/validate_lpf.py) (26 features, all with geometry + names + time-spans; 22 carry `closeMatch` links to Wikidata / GeoNames / Pleiades).

> **This step needs a WHG account and goes through WHG's editorial review** — it can't be automated. The instructions below are everything needed to do it; nothing here was (or could be) submitted on your behalf.

## Dataset metadata (paste into the WHG "Create dataset" form)

| Field | Value |
|---|---|
| **Title** | Afanasiy Nikitin — itinerary gazetteer (1467–1475) |
| **Description** | Places along the journey of the Tver merchant Afanasiy Nikitin (*Khozhenie za tri morya*), per D. G. Khrustalev, *Тетради купца Афанасия* (Nestor-Istoriya, 2026). Coordinate-verified localizations reconciled to Wikidata/GeoNames/Pleiades. |
| **Creator** | gasyoun (github.com/gasyoun/AfanasiyNikitin) |
| **License** | CC-BY-4.0 |
| **Source** | Khrustalev 2026; coordinates are project localizations |
| **Temporal** | 1467–1475 |
| **Format** | Linked Places Format (GeoJSON-LD) |

## Steps

1. Create / sign in to an account at **https://whgazetteer.org**.
2. **Datasets → Create dataset** → upload `data/places.lpf.geojson`, format **Linked Places (LPF)**.
3. WHG validates on upload (this file already passes structural validation). Fix any flagged issues and re-upload if needed.
4. **Reconcile** the dataset against the WHG union index (and/or Wikidata). The existing `closeMatch` links pre-seed 22 of 26 places, so most rows align automatically; confirm the matches.
5. Review the map preview and metadata.
6. **Request publication** — a WHG editor reviews and publishes; the dataset then becomes searchable and joinable in Peripleo.

## Notes for review

- **22 / 26 places carry authority links** (Wikidata + GeoNames, plus Pleiades for Yazd & Erzincan). The other 4 — three regions/coasts (Mazandaran, the Somali coast, the Balaklava/Gurzuf pair) and Kallur (disputed localization) — have geometry + names but no point authority by design; WHG accepts these.
- Every feature has a `when` time-span derived from the itinerary visit years, so the dataset is time-aware in Peripleo.
- To regenerate after any data change: `python tools/build_lpf.py` then `python tools/validate_lpf.py`.

## Related

A complementary route/trace (the ordered 29-waypoint itinerary) could later be submitted as a **Linked Traces** annotation — a natural follow-up once the gazetteer is published.
