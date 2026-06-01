"""Phase 2 — emit Linked Places Format (LPF) GeoJSON for the gazetteer, so the
dataset can be ingested by the World Historical Gazetteer / Pelagios (Peripleo).

LPF spec: https://github.com/LinkedPasts/linked-places-format
Reads data/places.csv (+ visit years from data/itinerary.csv) and writes
data/places.lpf.geojson. Wikidata/GeoNames/Pleiades IDs become `links` (closeMatch).
"""
import sys, os, csv, re, json

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CTX = "https://raw.githubusercontent.com/LinkedPasts/linked-places-format/master/linkedplaces-context-v1.1.jsonld"
BASE = "https://gasyoun.github.io/AfanasiyNikitin/place/"


def read(name):
    with open(os.path.join(ROOT, "data", name), encoding="utf-8") as f:
        return list(csv.DictReader(f))


places = read("places.csv")
itin = read("itinerary.csv")

# visit timespan per place from itinerary year labels
years = {}
for r in itin:
    found = [int(y) for y in re.findall(r"\b(1[45]\d\d)\b", r["year_label"])]
    if found:
        years.setdefault(r["place_id"], []).extend(found)

features = []
for p in places:
    names = []
    seen = set()
    for key, lang in [("name_ru", "ru"), ("name_historical", "ru"), ("name_modern", "ru")]:
        t = (p.get(key) or "").split(",")[0].strip()
        if t and t not in seen:
            seen.add(t)
            names.append({"toponym": t, "lang": lang})

    links = []
    if p.get("wikidata_qid"):
        links.append({"type": "closeMatch", "identifier": "http://www.wikidata.org/entity/" + p["wikidata_qid"]})
    if p.get("geonames_id"):
        links.append({"type": "closeMatch", "identifier": "https://www.geonames.org/" + p["geonames_id"]})
    if p.get("pleiades_id"):
        links.append({"type": "closeMatch", "identifier": "https://pleiades.stoa.org/places/" + p["pleiades_id"]})

    feat = {
        "@id": BASE + p["place_id"],
        "type": "Feature",
        "properties": {
            "title": p["name_ru"],
            "ccode": [],
            "certainty": p.get("certainty", ""),
        },
        "names": names,
        "types": [{"label": p.get("type", "")}],
        "geometry": {"type": "Point", "coordinates": [float(p["lon"]), float(p["lat"])]},
    }
    if links:
        feat["links"] = links
    yr = years.get(p["place_id"])
    if yr:
        feat["when"] = {"timespans": [{"start": {"in": str(min(yr))}, "end": {"in": str(max(yr))}}]}
    if p.get("notes"):
        feat["descriptions"] = [{"value": p["notes"], "lang": "ru"}]
    features.append(feat)

fc = {
    "type": "FeatureCollection",
    "@context": CTX,
    "metadata": {
        "title": "Afanasiy Nikitin — itinerary gazetteer (1467-1475)",
        "creator": "gasyoun/AfanasiyNikitin",
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "description": "Places along Afanasiy Nikitin's journey, per Khrustalev 2026. Linked Places Format for the World Historical Gazetteer.",
    },
    "features": features,
}

out = os.path.join(ROOT, "data", "places.lpf.geojson")
with open(out, "w", encoding="utf-8", newline="\n") as f:
    json.dump(fc, f, ensure_ascii=False, indent=2)
    f.write("\n")

linked = sum(1 for f in features if f.get("links"))
print(f"wrote data/places.lpf.geojson: {len(features)} features, {linked} with reconciliation links")
