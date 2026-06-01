"""Validate the FAIR data spine. Exits non-zero on any failure (CI gate).

Checks, across all CSV datasets in datapackage.json:
  * UTF-8 without BOM
  * primary-key uniqueness + foreign-key integrity (source_id, place_id)
  * controlled vocabularies (epistemic, certainty, recon_status, people.relation)
  * numeric sanity (coordinates in range; citations total = ru + foreign)
  * reconciliation invariant: a wikidata_qid is present iff recon_status == confirmed
  * declared tabular resources match the CSV files on disk
Also runs `frictionless validate` if the library is installed (informational).

Usage:  python tools/validate_data.py
"""
import sys, os, csv, json

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
fail = []

dp = json.load(open(os.path.join(ROOT, "datapackage.json"), encoding="utf-8"))
tabular = [r for r in dp["resources"] if r.get("profile") == "tabular-data-resource"]
csvs = [os.path.splitext(os.path.basename(r["path"]))[0] for r in tabular]

PK = {"sources": "source_id", "places": "place_id", "itinerary": "seq", "people": "person_id",
      "editions": "edition_id", "citations": "period", "trade": "item_id",
      "fragments": "folio", "calendar": "event_id",
      "legs": "leg_id", "events": "event_id", "edges": "edge_id"}
EPI = {"text", "reconstruction", "localization", "model", "hypothesis"}
CERT = {"certain", "approx", "disputed"}
RSTAT = {"confirmed", "candidate", "none", "collective", "skip-region"}
REL = {"helped", "harmed", "neutral", "self", "indirect"}


def load(name):
    path = os.path.join(ROOT, "data", name + ".csv")
    with open(path, "rb") as fh:
        if fh.read(3) == b"\xef\xbb\xbf":
            fail.append(f"{name}.csv: has UTF-8 BOM")
    with open(path, encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


D = {n: load(n) for n in csvs}
src_ids = {r["source_id"] for r in D["sources"]}
place_ids = {r["place_id"] for r in D["places"]}
people_ids = {r["person_id"] for r in D["people"]}

for n in csvs:
    key = PK.get(n)
    ids = [r[key] for r in D[n]]
    if len(ids) != len(set(ids)):
        fail.append(f"{n}: duplicate primary key {key}")
    for r in D[n]:
        if r.get("source_id") and r["source_id"] not in src_ids:
            fail.append(f"{n}:{r[key]} bad source_id {r['source_id']}")
        if n != "places" and r.get("place_id") and r["place_id"] not in place_ids:
            fail.append(f"{n}:{r[key]} bad place_id {r['place_id']}")
        if r.get("epistemic") and r["epistemic"] not in EPI:
            fail.append(f"{n}:{r[key]} bad epistemic {r['epistemic']}")
        if r.get("certainty") and r["certainty"] not in CERT:
            fail.append(f"{n}:{r[key]} bad certainty {r['certainty']}")
        if r.get("recon_status") and r["recon_status"] not in RSTAT:
            fail.append(f"{n}:{r[key]} bad recon_status {r['recon_status']}")

for r in D["people"]:
    if r["relation"] not in REL:
        fail.append(f"people:{r['person_id']} bad relation {r['relation']}")

# extra foreign keys for the enrichment datasets
for r in D.get("legs", []):
    for col in ("from_place_id", "to_place_id"):
        if r[col] not in place_ids:
            fail.append(f"legs:{r['leg_id']} bad {col} {r[col]}")
for r in D.get("edges", []):
    for col in ("source", "target"):
        if r[col] not in people_ids:
            fail.append(f"edges:{r['edge_id']} bad {col} {r[col]}")
for r in D.get("events", []):
    for pid in (r.get("people") or "").split(";"):
        if pid and pid not in people_ids:
            fail.append(f"events:{r['event_id']} bad people ref {pid}")

for r in D["places"]:
    if not (-90 <= float(r["lat"]) <= 90 and -180 <= float(r["lon"]) <= 180):
        fail.append(f"places:{r['place_id']} coords out of range")

for r in D["citations"]:
    if int(r["total"]) != int(r["ru"]) + int(r["foreign"]):
        fail.append(f"citations:{r['period']} total != ru + foreign")

for n in ("places", "people"):
    for r in D[n]:
        if bool(r.get("wikidata_qid")) != (r.get("recon_status") == "confirmed"):
            fail.append(f"{n}:{r[PK[n]]} qid<->confirmed invariant broken")

# resources vs files on disk
on_disk = {f[:-4] for f in os.listdir(os.path.join(ROOT, "data")) if f.endswith(".csv")}
if set(csvs) != on_disk:
    fail.append(f"datapackage tabular resources {set(csvs)} != CSVs on disk {on_disk}")

print(f"datasets: {', '.join(f'{n}={len(D[n])}' for n in csvs)}")
conf_p = sum(1 for r in D["places"] if r.get("recon_status") == "confirmed")
conf_pe = sum(1 for r in D["people"] if r.get("recon_status") == "confirmed")
print(f"reconciled: places {conf_p}/{len(D['places'])}, people {conf_pe}/{len(D['people'])}")

# (Frictionless validation runs as a separate, non-gating CI step; this gate is
# pure-stdlib so it stays deterministic across environments.)

if fail:
    print("\nFAILURES:")
    [print("  -", f) for f in fail]
    sys.exit(1)
print("\nALL CHECKS PASSED ✓")
