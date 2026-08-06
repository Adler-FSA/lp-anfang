#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "docs" / "systemanalyse"
OUT.mkdir(parents=True, exist_ok=True)

TEXT_EXTS = {".html", ".htm", ".css", ".js", ".mjs", ".json", ".md", ".txt", ".yml", ".yaml", ".xml", ".webmanifest"}
MEDIA_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp3", ".wav", ".m4a", ".ogg", ".mp4", ".webm", ".mov", ".pdf", ".zip", ".csv"}
IGNORE_PARTS = {".git", "node_modules", "docs/systemanalyse"}

PATTERNS = {
    "old_domain": re.compile(r"https?://adler-fsa\.github\.io(?:/lp-anfang)?", re.I),
    "lp_anfang_path": re.compile(r"/lp-anfang/", re.I),
    "iframe": re.compile(r"<iframe\b", re.I),
    "localStorage": re.compile(r"\blocalStorage\b"),
    "sessionStorage": re.compile(r"\bsessionStorage\b"),
    "indexedDB": re.compile(r"\bindexedDB\b"),
    "serviceWorker": re.compile(r"serviceWorker|navigator\.serviceWorker", re.I),
    "cacheStorage": re.compile(r"\bcaches\.(?:open|match|keys|delete)\b|\bCacheStorage\b", re.I),
    "csv": re.compile(r"\.csv\b|text/csv|CSV", re.I),
    "pdf": re.compile(r"\.pdf\b|application/pdf|jsPDF|pdfmake|window\.print", re.I),
}

URL_RE = re.compile(r'''(?P<q>["'])(?P<url>(?:https?://|/|\.\.?/)[^"'<>\s]+)(?P=q)''', re.I)
LS_KEY_RE = re.compile(r'''localStorage\.(?:getItem|setItem|removeItem)\(\s*["']([^"']+)["']''')


def ignored(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    return any(part in rel for part in IGNORE_PARTS)


def read_text(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return None


def app_group(rel: str) -> str:
    parts = rel.split("/")
    if len(parts) >= 2 and parts[0] == "pages":
        return f"pages/{parts[1]}"
    return parts[0]


def resolve_internal(source: Path, target: str) -> Path | None:
    clean = target.split("#", 1)[0].split("?", 1)[0]
    if not clean:
        return None
    if clean.startswith("http://") or clean.startswith("https://"):
        parsed = urlparse(clean)
        if parsed.netloc.lower() != "adler-fsa.github.io":
            return None
        clean = parsed.path
        if clean.startswith("/lp-anfang/"):
            clean = clean[len("/lp-anfang/"):]
        else:
            clean = clean.lstrip("/")
        return ROOT / clean
    if clean.startswith("/"):
        clean = clean.lstrip("/")
        if clean.startswith("lp-anfang/"):
            clean = clean[len("lp-anfang/"):]
        return ROOT / clean
    return (source.parent / clean).resolve()


files = []
for path in ROOT.rglob("*"):
    if path.is_file() and not ignored(path):
        rel = path.relative_to(ROOT).as_posix()
        files.append((path, rel))

ext_counts = Counter(Path(rel).suffix.lower() or "[ohne Endung]" for _, rel in files)
media_counts = Counter(Path(rel).suffix.lower() for _, rel in files if Path(rel).suffix.lower() in MEDIA_EXTS)

records = []
apps = defaultdict(lambda: {
    "files": 0, "html": 0, "media": 0, "old_domain_files": 0,
    "localStorage_files": 0, "storage_keys": set(), "iframes": 0,
    "service_worker_files": 0, "missing_targets": 0,
})
missing = []
external_domains = Counter()

for path, rel in files:
    ext = path.suffix.lower()
    group = app_group(rel)
    apps[group]["files"] += 1
    if ext in {".html", ".htm"}:
        apps[group]["html"] += 1
    if ext in MEDIA_EXTS:
        apps[group]["media"] += 1
    if ext not in TEXT_EXTS:
        continue
    text = read_text(path)
    if text is None:
        continue

    flags = {name: bool(rx.search(text)) for name, rx in PATTERNS.items()}
    storage_keys = sorted(set(LS_KEY_RE.findall(text)))
    urls = [m.group("url") for m in URL_RE.finditer(text)]

    if flags["old_domain"]:
        apps[group]["old_domain_files"] += 1
    if flags["localStorage"]:
        apps[group]["localStorage_files"] += 1
    if flags["iframe"]:
        apps[group]["iframes"] += 1
    if flags["serviceWorker"]:
        apps[group]["service_worker_files"] += 1
    apps[group]["storage_keys"].update(storage_keys)

    for target in urls:
        if target.startswith(("http://", "https://")):
            host = urlparse(target).netloc.lower()
            if host and host != "adler-fsa.github.io":
                external_domains[host] += 1
        resolved = resolve_internal(path, target)
        if resolved is not None and not resolved.exists():
            missing.append({"source": rel, "target": target})
            apps[group]["missing_targets"] += 1

    if any(flags.values()) or storage_keys:
        records.append({
            "file": rel,
            "group": group,
            "flags": flags,
            "storage_keys": storage_keys,
        })

summary = {
    "total_files": len(files),
    "html_files": sum(1 for _, rel in files if Path(rel).suffix.lower() in {".html", ".htm"}),
    "text_files_scanned": sum(1 for _, rel in files if Path(rel).suffix.lower() in TEXT_EXTS),
    "files_with_old_domain": sum(1 for r in records if r["flags"]["old_domain"]),
    "files_with_localStorage": sum(1 for r in records if r["flags"]["localStorage"]),
    "files_with_sessionStorage": sum(1 for r in records if r["flags"]["sessionStorage"]),
    "files_with_indexedDB": sum(1 for r in records if r["flags"]["indexedDB"]),
    "files_with_serviceWorker": sum(1 for r in records if r["flags"]["serviceWorker"]),
    "files_with_cacheStorage": sum(1 for r in records if r["flags"]["cacheStorage"]),
    "missing_internal_targets": len(missing),
}

json_data = {
    "summary": summary,
    "extensions": dict(ext_counts.most_common()),
    "media": dict(media_counts.most_common()),
    "applications": {
        k: {**v, "storage_keys": sorted(v["storage_keys"])}
        for k, v in sorted(apps.items())
    },
    "records": records,
    "missing_targets": missing,
    "external_domains": dict(external_domains.most_common()),
}
(OUT / "migrationsdaten.json").write_text(json.dumps(json_data, ensure_ascii=False, indent=2), encoding="utf-8")


def write_md(name: str, lines: list[str]) -> None:
    (OUT / name).write_text("\n".join(lines) + "\n", encoding="utf-8")

write_md("UEBERSICHT.md", [
    "# Systemanalyse – Übersicht", "",
    "> Automatisch erzeugt. Der Workflow liest Produktivdateien nur aus und schreibt ausschließlich in `docs/systemanalyse/`.", "",
    *[f"- **{k}:** {v}" for k, v in summary.items()], "",
    "## Dateitypen", "",
    *[f"- `{ext}`: {count}" for ext, count in ext_counts.most_common()],
])

app_lines = ["# Anwendungen und Ordner", "", "Gruppierung nach dem ersten Ordner unter `pages/`.", ""]
for name, data in sorted(apps.items()):
    risk = "hoch" if data["missing_targets"] or (data["old_domain_files"] and data["localStorage_files"]) else "mittel" if data["old_domain_files"] or data["localStorage_files"] or data["service_worker_files"] else "niedrig"
    app_lines += [
        f"## `{name}`", "",
        f"- Dateien: {data['files']}",
        f"- HTML: {data['html']}",
        f"- Medien: {data['media']}",
        f"- Dateien mit alter Domain: {data['old_domain_files']}",
        f"- Dateien mit LocalStorage: {data['localStorage_files']}",
        f"- erkannte LocalStorage-Schlüssel: {len(data['storage_keys'])}",
        f"- Dateien mit iFrames: {data['iframes']}",
        f"- Dateien mit Service-Worker-Bezug: {data['service_worker_files']}",
        f"- möglicherweise fehlende interne Ziele: {data['missing_targets']}",
        f"- vorläufiges Migrationsrisiko: **{risk}**", "",
    ]
write_md("ANWENDUNGEN.md", app_lines)

storage_lines = ["# Speichertechniken", ""]
for rec in records:
    f = rec["flags"]
    if f["localStorage"] or f["sessionStorage"] or f["indexedDB"] or f["cacheStorage"]:
        storage_lines += [f"## `{rec['file']}`", ""]
        storage_lines.append("- Techniken: " + ", ".join(k for k in ("localStorage", "sessionStorage", "indexedDB", "cacheStorage") if f[k]))
        if rec["storage_keys"]:
            storage_lines.append("- LocalStorage-Schlüssel: " + ", ".join(f"`{x}`" for x in rec["storage_keys"]))
        storage_lines.append("")
write_md("SPEICHER.md", storage_lines)

path_lines = ["# Pfade, alte Domain und iFrames", ""]
for rec in records:
    f = rec["flags"]
    if f["old_domain"] or f["lp_anfang_path"] or f["iframe"]:
        tags = [k for k in ("old_domain", "lp_anfang_path", "iframe") if f[k]]
        path_lines.append(f"- `{rec['file']}` — {', '.join(tags)}")
write_md("PFADE-UND-IFRAMES.md", path_lines)

media_lines = ["# Medienbestand", "", *[f"- `{ext}`: {count}" for ext, count in media_counts.most_common()]]
write_md("MEDIEN.md", media_lines)

missing_lines = ["# Möglicherweise fehlende interne Ziele", "", "> Dynamisch zusammengesetzte URLs können Fehlalarme verursachen; diese Liste ist eine Prüfgrundlage.", ""]
missing_lines += [f"- `{item['source']}` → `{item['target']}`" for item in missing]
write_md("FEHLENDE-ZIELE.md", missing_lines)

print(json.dumps(summary, ensure_ascii=False))
