"""Phase 2+ — emit data/atlas.ttl: the dataset as Linked Data (RDF/Turtle).

Modeling:
  * places  -> crm:E53_Place + WGS84 (wgs:lat/long) + GeoSPARQL geometry + owl:sameAs Wikidata/GeoNames
  * people  -> crm:E21_Person + owl:sameAs Wikidata/VIAF
  * journey -> crm:E9_Move linked to every place it took place at
  * events  -> crm:E5_Event with place (P7), participants (P11), time-span (P4)
  * network -> an:Encounter blank nodes (typed helped/harmed/neutral/indirect relations)

Reads data/{places,people,itinerary,events,edges}.csv. Hand-emits Turtle (no deps);
validates with rdflib if available.
"""
import sys, os, csv, re

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(name):
    with open(os.path.join(ROOT, "data", name), encoding="utf-8") as f:
        return list(csv.DictReader(f))


def lit(s):
    return (s or "").replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()


def cid(s):
    return re.sub(r"[^0-9A-Za-zА-Яа-яёЁ_]", "_", s or "")


places = read("places.csv")
people = read("people.csv")
itin = read("itinerary.csv")
events = read("events.csv")
edges = read("edges.csv")

P = ["@prefix crm: <http://www.cidoc-crm.org/cidoc-crm/> .",
     "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .",
     "@prefix owl: <http://www.w3.org/2002/07/owl#> .",
     "@prefix dcterms: <http://purl.org/dc/terms/> .",
     "@prefix wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#> .",
     "@prefix geo: <http://www.opengis.net/ont/geosparql#> .",
     "@prefix wd: <http://www.wikidata.org/entity/> .",
     "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .",
     "@prefix : <https://gasyoun.github.io/AfanasiyNikitin/id/> .",
     "@prefix an: <https://gasyoun.github.io/AfanasiyNikitin/ns#> ."]

out = ["# Afanasiy Nikitin atlas — Linked Data (CIDOC-CRM + GeoSPARQL). CC-BY-4.0.", ""]
out += P + [""]

# journey
distinct = list(dict.fromkeys(r["place_id"] for r in itin))
took = " ,\n        ".join(f":place_{cid(pid)}" for pid in distinct)
out += [':journey a crm:E9_Move ;',
        '    rdfs:label "Хожение за три моря Афанасия Никитина (1467–1475)"@ru ;',
        '    dcterms:temporal "1467/1475" ;',
        f'    crm:P7_took_place_at {took} .', ""]

# places
for p in places:
    s = [f':place_{cid(p["place_id"])} a crm:E53_Place ;',
         f'    rdfs:label "{lit(p["name_ru"])}"@ru' + (f' , "{lit(p["name_en"])}"@en' if p.get("name_en") else "") + ' ;',
         f'    crm:P2_has_type "{lit(p["type"])}" ;',
         f'    wgs:lat {p["lat"]} ; wgs:long {p["lon"]} ;',
         f'    geo:hasGeometry [ a geo:Geometry ; geo:asWKT "POINT({p["lon"]} {p["lat"]})"^^geo:wktLiteral ]']
    same = []
    if p.get("wikidata_qid"):
        same.append(f'wd:{p["wikidata_qid"]}')
    if p.get("geonames_id"):
        same.append(f'<https://www.geonames.org/{p["geonames_id"]}/>')
    if p.get("pleiades_id"):
        same.append(f'<https://pleiades.stoa.org/places/{p["pleiades_id"]}>')
    if same:
        s.append("    owl:sameAs " + " , ".join(same))
    out.append(" ;\n".join(s) + " .")
out.append("")

# people
for p in people:
    s = [f':person_{cid(p["person_id"])} a crm:E21_Person ;',
         f'    rdfs:label "{lit(p["name_ru"])}"@ru' + (f' , "{lit(p["name_en"])}"@en' if p.get("name_en") else "")]
    same = []
    if p.get("wikidata_qid"):
        same.append(f'wd:{p["wikidata_qid"]}')
    if p.get("viaf_id"):
        same.append(f'<http://viaf.org/viaf/{p["viaf_id"]}>')
    if same:
        s.append("    owl:sameAs " + " , ".join(same))
    out.append(" ;\n".join(s) + " .")
out.append("")

# events
for e in events:
    s = [f':event_{cid(e["event_id"])} a crm:E5_Event ;',
         f'    rdfs:label "{lit(e["note"] or e["type"])}"@ru ;',
         f'    crm:P4_has_time-span [ rdfs:label "{lit(e["date_label"])}" ]']
    if e.get("place_id"):
        s.append(f'    crm:P7_took_place_at :place_{cid(e["place_id"])}')
    parts = [f':person_{cid(x)}' for x in (e.get("people") or "").split(";") if x]
    if parts:
        s.append("    crm:P11_had_participant " + " , ".join(parts))
    out.append(" ;\n".join(s) + " .")
out.append("")

# social network edges
for e in edges:
    out.append(f':rel_{cid(e["edge_id"])} a an:Encounter ; '
               f'an:from :person_{cid(e["source"])} ; an:to :person_{cid(e["target"])} ; '
               f'an:relationType "{lit(e["relation"])}" ; rdfs:label "{lit(e["label"])}"@ru .')

ttl = "\n".join(out) + "\n"
with open(os.path.join(ROOT, "data", "atlas.ttl"), "w", encoding="utf-8", newline="\n") as f:
    f.write(ttl)

print(f"wrote data/atlas.ttl ({len(ttl)} bytes): "
      f"{len(places)} places, {len(people)} people, {len(events)} events, {len(edges)} edges")
try:
    import rdflib
    g = rdflib.Graph().parse(os.path.join(ROOT, "data", "atlas.ttl"), format="turtle")
    print(f"rdflib parse OK: {len(g)} triples")
except ImportError:
    print("rdflib not installed (informational); skipping parse validation")
