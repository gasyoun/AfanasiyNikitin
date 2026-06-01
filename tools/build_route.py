"""Phase 2+ — emit the itinerary as (1) a plain GeoJSON route (LineString + waypoint
Points) that renders anywhere (GitHub, QGIS, Leaflet), and (2) a Linked Traces
annotation (LTF) connecting each waypoint to the journey, for the World Historical
Gazetteer.

LTF spec (draft): https://github.com/LinkedPasts/linked-traces-format
Reads data/places.csv + data/itinerary.csv. Writes data/route.geojson and
data/itinerary.lt.json. Carries reconciliation links (Wikidata) onto the trace.
"""
import sys, os, csv, re, json

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://gasyoun.github.io/AfanasiyNikitin"
JOURNEY = BASE + "/#journey"
LTF_CTX = "https://raw.githubusercontent.com/LinkedPasts/linked-traces-format/master/ltf_v0.3.jsonld"


def read(name):
    with open(os.path.join(ROOT, "data", name), encoding="utf-8") as f:
        return list(csv.DictReader(f))


places = {p["place_id"]: p for p in read("places.csv")}
itin = sorted(read("itinerary.csv"), key=lambda r: int(r["seq"]))


def years(label):
    return [int(y) for y in re.findall(r"\b(1[45]\d\d)\b", label)]


# ---- (1) plain GeoJSON route ----
line = []
points = []
for r in itin:
    p = places[r["place_id"]]
    lon, lat = float(p["lon"]), float(p["lat"])
    line.append([lon, lat])
    points.append({
        "type": "Feature",
        "properties": {
            "seq": int(r["seq"]), "place_id": r["place_id"], "title": p["name_ru"],
            "year_label": r["year_label"], "sea_region": r["sea_region"],
            "wikidata": p.get("wikidata_qid", ""),
        },
        "geometry": {"type": "Point", "coordinates": [lon, lat]},
    })

route = {
    "type": "FeatureCollection",
    "metadata": {
        "title": "Маршрут Афанасия Никитина 1467–1475 / Route of Afanasiy Nikitin",
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "source": "gasyoun/AfanasiyNikitin; per Khrustalev 2026",
    },
    "features": [
        {"type": "Feature",
         "properties": {"title": "Маршрут (29 точек)", "stroke": "#b2202a", "stroke-width": 3, "stroke-opacity": 0.8},
         "geometry": {"type": "LineString", "coordinates": line}},
        *points,
    ],
}
with open(os.path.join(ROOT, "data", "route.geojson"), "w", encoding="utf-8", newline="\n") as f:
    json.dump(route, f, ensure_ascii=False, indent=2); f.write("\n")

# ---- (2) Linked Traces (LTF) ----
lt_features = []
for r in itin:
    p = places[r["place_id"]]
    yy = years(r["year_label"])
    when = {"timespans": [{"start": {"in": str(min(yy))}, "end": {"in": str(max(yy))}}]} if yy else {}
    feat = {
        "@id": f"{BASE}/place/{r['place_id']}",
        "type": "Feature",
        "properties": {"title": p["name_ru"], "seq": int(r["seq"])},
        "geometry": {"type": "Point", "coordinates": [float(p["lon"]), float(p["lat"])]},
        "relations": [{
            "relationType": "waypoint",
            "relationTo": JOURNEY,
            "label": f"Waypoint {r['seq']} of Afanasiy Nikitin's journey",
            "when": when,
        }],
    }
    if p.get("wikidata_qid"):
        feat["links"] = [{"type": "closeMatch", "identifier": "http://www.wikidata.org/entity/" + p["wikidata_qid"]}]
    lt_features.append(feat)

lt = {
    "@context": LTF_CTX,
    "type": "FeatureCollection",
    "metadata": {
        "title": "Afanasiy Nikitin — journey (Linked Traces)",
        "description": "The 1467–1475 itinerary as an ordered set of waypoints linked to the journey, per Khrustalev 2026. LTF draft — verify against WHG's current Linked Traces importer before upload.",
        "subject": {"@id": JOURNEY, "title": "Хожение за три моря Афанасия Никитина (journey, 1467–1475)"},
        "license": "https://creativecommons.org/licenses/by/4.0/",
    },
    "features": lt_features,
}
with open(os.path.join(ROOT, "data", "itinerary.lt.json"), "w", encoding="utf-8", newline="\n") as f:
    json.dump(lt, f, ensure_ascii=False, indent=2); f.write("\n")

print(f"route.geojson: 1 LineString ({len(line)} pts) + {len(points)} waypoint Points")
print(f"itinerary.lt.json: {len(lt_features)} trace features, "
      f"{sum(1 for f in lt_features if f.get('links'))} with Wikidata links")
