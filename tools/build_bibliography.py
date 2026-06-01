"""Generate a standard bibliography from data/editions.csv (the publication history)
in two interoperable formats:
  * data/bibliography.bib  — BibTeX (@book)
  * data/bibliography.json — CSL-JSON (for Zotero / pandoc / citation managers)

Editor names are kept as CSL `literal` (Cyrillic, not parsed into family/given).
"""
import sys, os, csv, json

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def read(name):
    with open(os.path.join(ROOT, "data", name), encoding="utf-8") as f:
        return list(csv.DictReader(f))


eds = read("editions.csv")

# ---- BibTeX ----
def bib_escape(s):
    return (s or "").replace("&", "\\&").replace("%", "\\%").replace("_", "\\_")

bib = ["% Bibliography of editions of «Хожение за три моря» — generated from data/editions.csv.",
       "% CC-BY-4.0. See also data/sources.csv (rights) and CITATION.cff.", ""]
for e in eds:
    fields = [f'  title = {{{{{bib_escape(e["title"])}}}}}',
              f'  year = {{{e["year"]}}}']
    if e.get("editor"):
        fields.insert(0, f'  author = {{{bib_escape(e["editor"])}}}')
    if e.get("publisher"):
        fields.append(f'  publisher = {{{bib_escape(e["publisher"])}}}')
    if e.get("place"):
        fields.append(f'  address = {{{bib_escape(e["place"])}}}')
    if e.get("language"):
        fields.append(f'  language = {{{e["language"]}}}')
    note = "; ".join(x for x in [e.get("kind", ""), e.get("notes", "")] if x)
    if note:
        fields.append(f'  note = {{{bib_escape(note)}}}')
    bib.append(f"@book{{{e['edition_id']},\n" + ",\n".join(fields) + "\n}")
    bib.append("")
with open(os.path.join(ROOT, "data", "bibliography.bib"), "w", encoding="utf-8", newline="\n") as f:
    f.write("\n".join(bib) + "\n")

# ---- CSL-JSON ----
csl = []
for e in eds:
    item = {"id": e["edition_id"], "type": "book", "title": e["title"],
            "issued": {"date-parts": [[int(e["year"])]]}}
    if e.get("editor"):
        item["author"] = [{"literal": e["editor"]}]
    if e.get("publisher"):
        item["publisher"] = e["publisher"]
    if e.get("place"):
        item["publisher-place"] = e["place"]
    if e.get("language"):
        item["language"] = e["language"]
    note = "; ".join(x for x in [e.get("kind", ""), e.get("notes", "")] if x)
    if note:
        item["note"] = note
    csl.append(item)
with open(os.path.join(ROOT, "data", "bibliography.json"), "w", encoding="utf-8", newline="\n") as f:
    json.dump(csl, f, ensure_ascii=False, indent=2); f.write("\n")

print(f"wrote data/bibliography.bib + data/bibliography.json: {len(eds)} entries")
