"""Fill remaining authority IDs from the Wikidata items we already confirmed:
places gain GeoNames (P1566) / Pleiades (P1584); people gain VIAF (P214) — but only
where currently blank. Only Wikidata-sourced IDs are added (no GeoNames/Pleiades
account needed). Writes data/places.csv + data/people.csv in place.

Usage:  python tools/enrich_authority.py [--dry-run]
"""
import sys, os, csv, json, time, urllib.parse, urllib.request, urllib.error

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = "https://www.wikidata.org/w/api.php"
UA = {"User-Agent": "AfanasiyNikitinAtlas/0.1 (https://github.com/gasyoun/AfanasiyNikitin; enrich)"}
DRY = "--dry-run" in sys.argv


def api(params):
    params = dict(params); params["format"] = "json"
    req = urllib.request.Request(API + "?" + urllib.parse.urlencode(params), headers=UA)
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(int(e.headers.get("Retry-After", 0)) or 12 * (attempt + 1)); continue
            if attempt == 5:
                raise
            time.sleep(3)
        except Exception:
            if attempt == 5:
                raise
            time.sleep(3)
    return {}


def entities(ids):
    out = {}
    ids = sorted({i for i in ids if i})
    for i in range(0, len(ids), 50):
        d = api({"action": "wbgetentities", "ids": "|".join(ids[i:i + 50]), "props": "claims"})
        out.update(d.get("entities", {})); time.sleep(0.3)
    return out


def first_str(ent, prop):
    for c in ent.get("claims", {}).get(prop, []):
        v = c.get("mainsnak", {}).get("datavalue", {}).get("value")
        if isinstance(v, str):
            return v
    return ""


def read(name):
    with open(os.path.join(ROOT, "data", name), encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    return rows, list(rows[0].keys())


def write(name, rows, fields):
    if DRY:
        return
    with open(os.path.join(ROOT, "data", name), "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(rows)


places, pf = read("places.csv")
people, pef = read("people.csv")
ents = entities([r["wikidata_qid"] for r in places] + [r["wikidata_qid"] for r in people])

added = []
for r in places:
    e = ents.get(r["wikidata_qid"])
    if not e:
        continue
    if not r["geonames_id"] and first_str(e, "P1566"):
        r["geonames_id"] = first_str(e, "P1566"); added.append(f"{r['place_id']} geonames={r['geonames_id']}")
    if not r["pleiades_id"] and first_str(e, "P1584"):
        r["pleiades_id"] = first_str(e, "P1584"); added.append(f"{r['place_id']} pleiades={r['pleiades_id']}")
for r in people:
    e = ents.get(r["wikidata_qid"])
    if not e:
        continue
    if not r["viaf_id"] and first_str(e, "P214"):
        r["viaf_id"] = first_str(e, "P214"); added.append(f"{r['person_id']} viaf={r['viaf_id']}")

write("places.csv", places, pf)
write("people.csv", people, pef)
print(f"added {len(added)} authority IDs" + (" (dry-run)" if DRY else "") + ":")
for a in added:
    print("  +", a)
if not added:
    print("  (none — coverage already complete from reconciliation)")
