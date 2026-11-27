#!/usr/bin/env python3
"""Checks a Timer4Coachs session file (timer4coachs/1 format) the way the app reads it.

Usage: python3 verifier_fiche.py my-session.md
Prints the run-through, the errors (blocking for the app: shown in orange) and advice.
Exit code: 0 if the file is valid, 1 otherwise. Python 3, no dependencies.

Same parsing as ChronoTatamiCore/Cours.swift (lireCours): keep both in sync.
"""
import re
import sys


DUREE_MAX = 24 * 3600  # the app rejects durations longer than 24 h


def lire_duree(s):
    """"2:30" -> 150 seconds. None beyond 24 h."""
    m = re.search(r"(\d+):(\d{2})", s)
    if not m or int(m.group(1)) > DUREE_MAX // 60:
        return None
    return int(m.group(1)) * 60 + int(m.group(2))


def lire_minutes(s):
    """"1h30", "23 min" -> minutes. None beyond 24 h."""
    m = re.search(r"(\d+)\s*h\s*(\d+)?", s)
    if m:
        h, mn = int(m.group(1)), int(m.group(2) or 0)
        return h * 60 + mn if h <= 24 and mn <= DUREE_MAX // 60 else None
    m = re.search(r"(\d+)\s*min", s)
    return int(m.group(1)) if m and int(m.group(1)) <= DUREE_MAX // 60 else None


def fmt(s):
    return f"{s // 60}:{s % 60:02d}"


def fmt_min(s):
    return str(s // 60) if s % 60 == 0 else f"{s / 60:.1f}"


def verifier(texte):
    lignes = texte.replace("\r", "").split("\n")
    meta, sections, blocs, erreurs, conseils = {}, [], [], [], []
    i = 0
    if lignes and lignes[0].strip() == "---":
        i = 1
        while i < len(lignes) and lignes[i].strip() != "---":
            m = re.match(r"^([\w_]+)\s*:\s*(.*)$", lignes[i])
            if m:
                meta[m.group(1)] = m.group(2).strip()
            i += 1
        i += 1
    else:
        conseils.append("No \"---\" header: add at least \"format: timer4coachs/1\".")
    if meta.get("format") not in (None, "timer4coachs/1", "chrono-tatami/1"):
        conseils.append(f"format \"{meta['format']}\": the app expects \"timer4coachs/1\".")

    titre, bloc = "", None
    while i < len(lignes):
        L = lignes[i]
        i += 1
        if re.match(r"^#\s+", L):
            titre = L[1:].strip()
            continue
        m = re.match(r"^##\s+(.*?)\s*·\s*(.*)$", L) or re.match(r"^##\s+(.*)$", L)
        if m and not L.startswith("###"):
            t = m.group(1).replace("♪", "").strip()
            reste = m.group(2) if m.lastindex and m.lastindex > 1 else None
            sections.append({"titre": t, "prevu": lire_minutes(reste) if reste else None,
                             "musique": "♪" in L, "blocs": []})
            bloc = None
            continue
        m = re.match(r"^###\s+(.*?)\s*·\s*(.*)$", L) or re.match(r"^###\s+(.*)$", L)
        if m:
            if not sections:
                sections.append({"titre": "Session", "prevu": None, "musique": False, "blocs": []})
            reste = m.group(2) if m.lastindex and m.lastindex > 1 else ""
            parts = [p.strip() for p in reste.split("·")] if reste else []
            phase = next((p for p in parts if re.match(r"^phase\s*:\s*.*?\s*#[0-9A-Fa-f]{6}$", p)), None)
            musique = next((p for p in parts if re.match(r"^musique\s*:\s*(oui|non)$", p)), None)
            sens = next((p for p in parts if re.match(r"^chrono\s*:\s*(montant|descendant)$", p)), None)
            for p in parts:
                if p.lower().startswith("phase") and p != phase:
                    erreurs.append(f"Unreadable phase \"{p}\": write \"phase: Name #RRGGBB\".")
                if p.lower().startswith("musique") and p != musique:
                    erreurs.append(f"Unreadable music option \"{p}\": write \"musique: oui\" or \"musique: non\".")
                if p.lower().startswith("chrono") and p != sens:
                    erreurs.append(f"Unreadable timer direction \"{p}\": write \"chrono: montant\".")
            b = {"titre": m.group(1).strip(), "prevu": lire_minutes(reste) if reste else None,
                 "phase": phase, "musique": musique, "sens": sens, "sequences": []}
            blocs.append(b)
            sections[-1]["blocs"].append(b)
            bloc = b
            continue
        if bloc is None:
            continue
        m = re.match(r"^-\s*\[(\w+)\]\s*(.*)$", L)
        if m:
            ty = m.group(1).lower()
            if ty not in ("travail", "repos", "consigne"):
                erreurs.append(f"Unknown type \"[{m.group(1)}]\": use travail, repos or consigne.")
                continue
            parts = [p.strip() for p in m.group(2).split("·")]
            mi = next((p for p in parts if p.startswith("⇄")), "")
            if mi:
                parts.remove(mi)
            d = lire_duree(parts[-1]) if parts else None
            if d is None:
                trop = parts and re.search(r"\d+:\d{2}", parts[-1])
                erreurs.append(f"Duration longer than 24 h: \"{L.strip()}\"" if trop else f"Missing duration: \"{L.strip()}\"")
                continue
            if not re.fullmatch(r"\d+:\d{2}", parts[-1]):
                conseils.append(f"Duration \"{parts[-1]}\": write only m:ss at the end of the line.")
            libelle = " · ".join(parts[:-1])
            if not libelle:
                conseils.append(f"Sequence without a label in \"{bloc['titre']}\": nothing will be shown above the timer.")
            if 0 < d < 8:
                conseils.append(f"\"{libelle}\" lasts {d} s: too short for the announcements (8 s minimum recommended).")
            if int(parts[-1].split(":")[-1][:2]) >= 60:
                conseils.append(f"\"{parts[-1]}\": seconds must be less than 60.")
            bloc["sequences"].append({"type": ty, "libelle": libelle, "duree": d, "mi": mi})
            continue
        if re.match(r"^\s*-\s*\[", L):
            erreurs.append(f"Unreadable timed line: \"{L.strip()}\"")

    total = 0
    for s in sections:
        st = 0
        for b in s["blocs"]:
            bd = sum(q["duree"] for q in b["sequences"])
            b["duree"] = bd
            st += bd
            if not b["sequences"]:
                erreurs.append(f"\"{b['titre']}\" has no timed sequence.")
            elif b["prevu"] is not None and bd != b["prevu"] * 60:
                erreurs.append(f"\"{b['titre']}\": sequences = {fmt_min(bd)} min, announced {b['prevu']} min.")
        s["duree"] = st
        total += st
        if s["prevu"] is not None and st != s["prevu"] * 60:
            erreurs.append(f"Section \"{s['titre']}\": {fmt_min(st)} min, announced {s['prevu']} min.")
    p = lire_minutes(meta.get("duree", "")) if meta.get("duree") else None
    if p is not None and total != p * 60:
        erreurs.append(f"Total {fmt_min(total)} min for a {p}-min session.")
    if not titre:
        conseils.append("No \"# …\" title: the card will show the file name.")
    if not blocs:
        erreurs.append("No \"###\" block: the app will reject the file.")
    return meta, titre, sections, total, erreurs, conseils


def main():
    if len(sys.argv) != 2:
        print(__doc__.strip())
        return 2
    with open(sys.argv[1], encoding="utf-8") as f:
        meta, titre, sections, total, erreurs, conseils = verifier(f.read())
    print(f"# {titre or '(untitled)'} · {fmt(total)}")
    for s in sections:
        print(f"\n## {s['titre']} · {fmt(s['duree'])}{' · ♪' if s['musique'] else ''}")
        for b in s["blocs"]:
            opts = " · ".join(x for x in (b["phase"], b["musique"], b["sens"]) if x)
            print(f"  ### {b['titre']} · {fmt(b['duree'])}{' · ' + opts if opts else ''}")
            for q in b["sequences"]:
                print(f"      [{q['type']}] {q['libelle']}{' · ' + q['mi'] if q['mi'] else ''} · {fmt(q['duree'])}")
    if conseils:
        print("\nAdvice:")
        for c in conseils:
            print("  - " + c)
    if erreurs:
        print("\nErrors:")
        for e in erreurs:
            print("  ⚠︎ " + e)
        return 1
    print("\nValid session file.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
