#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
FSA Trendreport Generator (Monatlich)
- Liest RSS/Atom Quellen
- Aggregiert Themen-Häufigkeit + simples Sentiment (Lexikon-basiert)
- Schreibt:
  pages/trend/YYYY-MM.html
  pages/trend/data/YYYY-MM.json
  pages/trend/index.html
  pages/trend/YYYY.html (Jahresübersicht)
Ohne externe CSS/JS, ohne Icons, nur Inline-SVG.
"""

from __future__ import annotations
import os, re, json, glob
from datetime import datetime, timedelta, timezone
from collections import Counter, defaultdict

import requests
import feedparser

TZ_UTC = timezone.utc

def _safe_mkdir(path: str) -> None:
    os.makedirs(path, exist_ok=True)

def _read_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def _write_text(path: str, text: str) -> None:
    _safe_mkdir(os.path.dirname(path))
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

def _write_json(path: str, data: dict) -> None:
    _safe_mkdir(os.path.dirname(path))
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def _norm(s: str) -> str:
    s = s or ""
    s = s.lower().strip()
    s = re.sub(r"\s+", " ", s)
    return s

def _tokens(s: str) -> list[str]:
    s = _norm(s)
    # keep umlauts, ß; split on non-letter/digit
    parts = re.split(r"[^a-z0-9äöüß]+", s, flags=re.IGNORECASE)
    return [p for p in parts if p]

def _sentiment_score(tokens: list[str], lex: dict) -> int:
    pos = set(lex.get("positive", []))
    neg = set(lex.get("negative", []))
    score = 0
    for t in tokens:
        if t in pos:
            score += 1
        if t in neg:
            score -= 1
    return score

def _fetch_feed(url: str, timeout=20) -> feedparser.FeedParserDict:
    # Some feeds block default UA; set simple UA
    headers = {"User-Agent": "FSA-Trendreport/1.0 (GitHub Actions)"}
    r = requests.get(url, headers=headers, timeout=timeout)
    r.raise_for_status()
    return feedparser.parse(r.content)

def _entry_datetime(entry) -> datetime | None:
    # Try multiple fields
    for key in ("published_parsed", "updated_parsed"):
        t = getattr(entry, key, None)
        if t:
            try:
                return datetime(*t[:6], tzinfo=TZ_UTC)
            except Exception:
                pass
    return None

def _pick_month(now_utc: datetime) -> tuple[int, int]:
    return now_utc.year, now_utc.month

def _month_range(year: int, month: int) -> tuple[datetime, datetime]:
    start = datetime(year, month, 1, tzinfo=TZ_UTC)
    if month == 12:
        end = datetime(year + 1, 1, 1, tzinfo=TZ_UTC)
    else:
        end = datetime(year, month + 1, 1, tzinfo=TZ_UTC)
    return start, end

def _clamp(v: float, a: float, b: float) -> float:
    return max(a, min(b, v))

def _narrative_from_topics(topic_counts: dict[str, int]) -> list[str]:
    # rule-based narrative bullets (DE) -> later i18n renders EN too
    # Decide top 3 topics
    sorted_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)
    top = [k for k, v in sorted_topics if v > 0][:3]
    bullets = []

    if "middleclass" in top:
        bullets.append("Leistbarkeit & Abstiegsangst dominieren (Miete, Nebenkosten, Preise, Abgaben).")
    if "tax" in top:
        bullets.append("Steuern/Abgaben werden als direkter Druckpunkt wahrgenommen (Grundsteuer, Beiträge, Gebühren).")
    if "migration" in top:
        bullets.append("Migration wird häufig als Überlastungs- und Gerechtigkeitsthema diskutiert (Kommunen, Wohnraum, Ordnung).")
    if "energy" in top:
        bullets.append("Energie/Heizen erzeugt Unmut vor allem durch Kosten, Planungsunsicherheit und wechselnde Regeln.")
    if "ukraine" in top:
        bullets.append("Ukraine/Krieg polarisiert: Unterstützung vs. Friedensfokus, spürbare Müdigkeit im Ton.")
    if "eu" in top:
        bullets.append("EU wird oft über konkrete Eingriffe bewertet (Regelungsdruck/Alltagseffekte), weniger über abstrakte Idee.")

    if not bullets:
        bullets.append("Kein dominantes Einzelthema – Tonlage verteilt sich auf mehrere Reizfelder.")
    return bullets[:5]

def render_month_html(data: dict) -> str:
    # All texts are embedded with data-i18n, plus minimal dictionary.
    year = data["year"]
    month = data["month"]
    ym = f"{year:04d}-{month:02d}"

    # Inline SVG bars for topic distribution
    topics = data["topics"]
    maxv = max([t["count"] for t in topics] + [1])
    rows_svg = []
    y = 16
    for t in topics:
        w = int(420 * (t["count"] / maxv)) if maxv else 0
        rows_svg.append(
            f'<text x="0" y="{y}" fill="currentColor" font-size="12">{t["label_de"]}</text>'
            f'<rect x="170" y="{y-10}" width="{w}" height="10" rx="4" fill="rgba(212,175,55,.45)"></rect>'
            f'<text x="{170+w+8}" y="{y}" fill="rgba(233,237,243,.85)" font-size="12">{t["count"]}</text>'
        )
        y += 18

    sentiment = data["sentiment"]
    # sentiment normalized -2..+2 roughly
    sent_norm = _clamp(sentiment["avg"], -2.0, 2.0)
    # map to 0..1
    sent_pos = (sent_norm + 2.0) / 4.0
    knob_x = 20 + int(360 * sent_pos)

    narrative_li = "\n".join([f'<li data-i18n="narr_{i}"></li>' for i, _ in enumerate(data["narrative_de"])])

    sources_li = "\n".join([f"<li>{s['name']} <span class='muted'>({s['category']}: {s['items']})</span></li>" for s in data["sources_used"]])

    return f"""<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>FSA Trendreport – {ym}</title>
  <meta name="description" content="Monatsreport zur öffentlichen Online-Stimmung (Trendbild) – {ym}.">
  <style>
    :root{{
      --bg:#050814;
      --bg2:#020617;
      --panel:rgba(15,23,42,.92);
      --panel2:rgba(15,23,42,.82);
      --text:#e9edf3;
      --muted:#97a0ad;
      --gold:#d4af37;
      --gold2:#f1d070;
      --ring:rgba(212,175,55,.25);
      --shadow:0 12px 35px rgba(0,0,0,.55);
      --radius:16px;
      --maxw:980px;
    }}
    *{{box-sizing:border-box}}
    html,body{{height:100%}}
    body{{
      margin:0;
      background: radial-gradient(900px 520px at 20% 10%, rgba(212,175,55,.14), transparent 55%),
                  radial-gradient(780px 520px at 80% 20%, rgba(241,208,112,.10), transparent 60%),
                  linear-gradient(180deg, var(--bg), var(--bg2));
      color:var(--text);
      font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    }}
    a{{color:var(--gold2); text-decoration:none}}
    a:hover{{text-decoration:underline}}
    .wrap{{max-width:var(--maxw); margin:0 auto; padding:26px 18px 70px}}
    .topbar{{display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap; margin-bottom:14px}}
    .brand{{display:flex; gap:12px; align-items:center}}
    .logo{{width:40px; height:40px; display:grid; place-items:center; border-radius:12px;
      background:linear-gradient(180deg, rgba(212,175,55,.22), rgba(212,175,55,.06));
      border:1px solid rgba(212,175,55,.28);
      box-shadow: 0 10px 26px rgba(0,0,0,.45);
    }}
    .title h1{{margin:0; font-size:18px; letter-spacing:.2px}}
    .title .sub{{margin-top:2px; color:var(--muted); font-size:12px}}
    .btns{{display:flex; gap:10px; align-items:center}}
    .btn{{
      display:inline-flex; align-items:center; gap:10px;
      border:1px solid rgba(212,175,55,.30);
      background:linear-gradient(180deg, rgba(15,23,42,.82), rgba(15,23,42,.62));
      color:var(--text);
      padding:10px 12px;
      border-radius:12px;
      box-shadow:var(--shadow);
      cursor:pointer;
      user-select:none;
    }}
    .btn:hover{{border-color:rgba(241,208,112,.55)}}
    .btn .dot{{width:10px; height:10px; border-radius:50%; background:rgba(241,208,112,.65); box-shadow:0 0 0 6px rgba(212,175,55,.14)}}
    .grid{{display:grid; grid-template-columns:1.2fr .8fr; gap:14px; margin-top:14px}}
    @media (max-width: 920px){{ .grid{{grid-template-columns:1fr}} }}
    .card{{
      background:var(--panel);
      border:1px solid rgba(212,175,55,.22);
      border-radius:var(--radius);
      box-shadow:var(--shadow);
      padding:16px;
    }}
    .card h2{{margin:0 0 8px; font-size:15px}}
    .muted{{color:var(--muted)}}
    .kpi{{display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:10px}}
    @media (max-width: 680px){{ .kpi{{grid-template-columns:1fr}} }}
    .kpi .box{{
      background:var(--panel2);
      border:1px solid rgba(212,175,55,.18);
      border-radius:14px;
      padding:12px;
      min-height:74px;
    }}
    .kpi .v{{font-size:22px; margin:2px 0 2px}}
    .kpi .l{{font-size:12px; color:var(--muted)}}
    .hr{{height:1px; background:rgba(212,175,55,.18); margin:12px 0}}
    ul{{margin:10px 0 0 18px; padding:0}}
    li{{margin:7px 0}}
    .meter{{
      margin-top:8px;
      background:rgba(255,255,255,.06);
      border:1px solid rgba(212,175,55,.18);
      border-radius:999px;
      height:12px;
      position:relative;
      overflow:hidden;
    }}
    .meter .track{{
      position:absolute; inset:0;
      background:linear-gradient(90deg, rgba(255,80,80,.22), rgba(241,208,112,.16), rgba(80,255,140,.20));
      opacity:.8;
    }}
    .meter .knob{{
      position:absolute;
      top:-5px;
      left:{knob_x}px;
      width:22px; height:22px;
      border-radius:50%;
      background:linear-gradient(180deg, rgba(241,208,112,.95), rgba(212,175,55,.92));
      box-shadow:0 0 0 8px rgba(212,175,55,.16), 0 10px 22px rgba(0,0,0,.55);
      border:1px solid rgba(255,255,255,.22);
    }}
    .mini{{font-size:12px; color:var(--muted); margin-top:6px}}
    .footnav{{margin-top:14px; display:flex; gap:10px; flex-wrap:wrap}}
    .footnav a, .footnav button{{text-decoration:none}}
    .note{{
      font-size:12px; color:rgba(233,237,243,.82);
      background:rgba(255,255,255,.04);
      border:1px solid rgba(212,175,55,.14);
      border-radius:14px;
      padding:12px;
    }}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="topbar">
      <div class="brand">
        <div class="logo" aria-hidden="true">
          <!-- Inline SVG (no external icons) -->
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l2.4 6.1L21 9.2l-5 4.2L17.3 21 12 17.8 6.7 21 8 13.4 3 9.2l6.6-1.1L12 2z" stroke="rgba(241,208,112,.95)" stroke-width="1.4" />
          </svg>
        </div>
        <div class="title">
          <h1 data-i18n="h1">FSA Trendreport</h1>
          <div class="sub">
            <span data-i18n="h_sub">Monatsübersicht</span> · <strong>{ym}</strong> ·
            <span class="muted" data-i18n="h_date">Erstellt</span>: {data["generated_at"]} (UTC)
          </div>
        </div>
      </div>

      <div class="btns">
        <button class="btn" id="langBtn" type="button" title="DE/EN">
          <span class="dot" aria-hidden="true"></span>
          <span id="langLabel">DE</span>
        </button>
        <a class="btn" href="index.html">
          <span class="dot" aria-hidden="true"></span>
          <span data-i18n="btn_index">Chronologie</span>
        </a>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h2 data-i18n="sec_overview">Überblick</h2>
        <div class="muted" data-i18n="overview_hint">
          Dieses Trendbild basiert auf öffentlich zugänglichen Online-Signalen (RSS/Atom) und ist nicht repräsentativ.
          Es zeigt Häufigkeiten und Tonlage – keine „Wahrheit“.
        </div>

        <div class="kpi">
          <div class="box">
            <div class="v">{data["items_total"]}</div>
            <div class="l" data-i18n="kpi_items">Ausgewertete Beiträge (Monat)</div>
          </div>
          <div class="box">
            <div class="v">{sentiment["avg"]:.2f}</div>
            <div class="l" data-i18n="kpi_sent">Tonalität (Lexikon-Score, grob)</div>
          </div>
          <div class="box">
            <div class="v">{data["top_topic_de"]}</div>
            <div class="l" data-i18n="kpi_top">Dominantes Thema (häufigstes)</div>
          </div>
        </div>

        <div class="hr"></div>

        <h2 data-i18n="sec_meter">Tonalitäts-Meter (grob)</h2>
        <div class="meter" aria-hidden="true">
          <div class="track"></div>
          <div class="knob"></div>
        </div>
        <div class="mini" data-i18n="meter_hint">
          Links = eher negativ, Mitte = gemischt, Rechts = eher positiv. (Nur Keyword-Lexikon, keine KI-Semantik.)
        </div>

        <div class="hr"></div>

        <h2 data-i18n="sec_narr">Narrativ-Radar (Top-Muster)</h2>
        <ul>
          {narrative_li}
        </ul>

        <div class="hr"></div>

        <div class="note">
          <strong data-i18n="note_title">Methodik kurz:</strong>
          <span data-i18n="note_text">
            Wir zählen Themen-Keywords in Titeln/Teasern, werten einen einfachen Sentiment-Lexikon-Score aus und
            leiten daraus ein Trendbild ab. Das ist bewusst simpel, dafür reproduzierbar und monatlich vergleichbar.
          </span>
        </div>
      </div>

      <div class="card">
        <h2 data-i18n="sec_topics">Themenverteilung</h2>
        <div class="muted" data-i18n="topics_hint">Balken zeigen relative Häufigkeit im Monat.</div>

        <div style="margin-top:10px; padding:10px; background:rgba(255,255,255,.03); border:1px solid rgba(212,175,55,.14); border-radius:14px;">
          <svg width="100%" viewBox="0 0 620 170" role="img" aria-label="Topics">
            <g transform="translate(10,18)" fill="none">
              {"".join(rows_svg)}
            </g>
          </svg>
        </div>

        <div class="hr"></div>

        <h2 data-i18n="sec_sources">Quellenkorb (Anzahl Items)</h2>
        <ul class="muted">
          {sources_li}
        </ul>

        <div class="hr"></div>

        <h2 data-i18n="sec_links">Weiter</h2>
        <div class="footnav">
          <a class="btn" href="{year}.html">
            <span class="dot" aria-hidden="true"></span>
            <span data-i18n="btn_year">Jahresübersicht</span>
          </a>
          <a class="btn" href="index.html">
            <span class="dot" aria-hidden="true"></span>
            <span data-i18n="btn_back">Zur Chronologie</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <script>
  // ======= i18n (DE/EN) =======
  const I18N = {{
    de: {{
      h1: "FSA Trendreport",
      h_sub: "Monatsübersicht",
      h_date: "Erstellt",
      btn_index: "Chronologie",
      sec_overview: "Überblick",
      overview_hint: "Dieses Trendbild basiert auf öffentlich zugänglichen Online-Signalen (RSS/Atom) und ist nicht repräsentativ. Es zeigt Häufigkeiten und Tonlage – keine „Wahrheit“.",
      kpi_items: "Ausgewertete Beiträge (Monat)",
      kpi_sent: "Tonalität (Lexikon-Score, grob)",
      kpi_top: "Dominantes Thema (häufigstes)",
      sec_meter: "Tonalitäts-Meter (grob)",
      meter_hint: "Links = eher negativ, Mitte = gemischt, Rechts = eher positiv. (Nur Keyword-Lexikon, keine KI-Semantik.)",
      sec_narr: "Narrativ-Radar (Top-Muster)",
      note_title: "Methodik kurz:",
      note_text: "Wir zählen Themen-Keywords in Titeln/Teasern, werten einen einfachen Sentiment-Lexikon-Score aus und leiten daraus ein Trendbild ab. Das ist bewusst simpel, dafür reproduzierbar und monatlich vergleichbar.",
      sec_topics: "Themenverteilung",
      topics_hint: "Balken zeigen relative Häufigkeit im Monat.",
      sec_sources: "Quellenkorb (Anzahl Items)",
      sec_links: "Weiter",
      btn_year: "Jahresübersicht",
      btn_back: "Zur Chronologie",
      {", ".join([f'narr_{i}: {json.dumps(t)}' for i, t in enumerate(data["narrative_de"])])}
    }},
    en: {{
      h1: "FSA Trend Report",
      h_sub: "Monthly overview",
      h_date: "Generated",
      btn_index: "Timeline",
      sec_overview: "Overview",
      overview_hint: "This trend view is based on publicly available online signals (RSS/Atom) and is not representative. It shows frequency and tone – not “the truth”.",
      kpi_items: "Evaluated posts (month)",
      kpi_sent: "Tone (lexicon score, rough)",
      kpi_top: "Dominant topic (most frequent)",
      sec_meter: "Tone meter (rough)",
      meter_hint: "Left = more negative, mid = mixed, right = more positive. (Keyword lexicon only, no AI semantics.)",
      sec_narr: "Narrative radar (top patterns)",
      note_title: "Method (short):",
      note_text: "We count topic keywords in titles/snippets, compute a simple sentiment lexicon score and derive a reproducible monthly trend view.",
      sec_topics: "Topic distribution",
      topics_hint: "Bars show relative frequency within the month.",
      sec_sources: "Source basket (item counts)",
      sec_links: "Next",
      btn_year: "Year overview",
      btn_back: "Back to timeline",
      {", ".join([f'narr_{i}: {json.dumps(t)}' for i, t in enumerate(data["narrative_en"])])}
    }}
  }};

  function getLang() {{
    return (localStorage.getItem("fsa_lang") || document.documentElement.lang || "de").startsWith("en") ? "en" : "de";
  }}

  function setLang(lang) {{
    const L = lang === "en" ? "en" : "de";
    localStorage.setItem("fsa_lang", L);
    document.documentElement.lang = L;
    document.querySelectorAll("[data-i18n]").forEach(el => {{
      const k = el.getAttribute("data-i18n");
      if (I18N[L][k] !== undefined) el.textContent = I18N[L][k];
    }});
    document.getElementById("langLabel").textContent = L.toUpperCase();
  }}

  document.getElementById("langBtn").addEventListener("click", () => {{
    setLang(getLang() === "de" ? "en" : "de");
  }});

  setLang(getLang());
  </script>

  <!-- DATA_BLOB_JSON
  {json.dumps(data, ensure_ascii=False)}
  DATA_BLOB_JSON -->
</body>
</html>
"""

def render_index_html(month_pages: list[dict]) -> str:
    # month_pages: newest first
    items = []
    for m in month_pages:
        ym = m["ym"]
        items.append(f"""
          <a class="item" href="{ym}.html">
            <div class="ym">{ym}</div>
            <div class="meta">
              <div class="k"><span class="muted">Items</span> {m["items_total"]}</div>
              <div class="k"><span class="muted">Sent</span> {m["sent_avg"]:.2f}</div>
              <div class="k"><span class="muted">Top</span> {m["top_topic_de"]}</div>
            </div>
          </a>
        """)

    return f"""<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>FSA Trendreport – Chronologie</title>
  <meta name="description" content="Chronologische Übersicht aller FSA Trendreports.">
  <style>
    :root{{
      --bg:#050814; --bg2:#020617;
      --panel:rgba(15,23,42,.92);
      --text:#e9edf3; --muted:#97a0ad;
      --gold:#d4af37; --gold2:#f1d070;
      --shadow:0 12px 35px rgba(0,0,0,.55);
      --radius:16px; --maxw:980px;
    }}
    *{{box-sizing:border-box}}
    body{{
      margin:0; color:var(--text);
      background: radial-gradient(900px 520px at 20% 10%, rgba(212,175,55,.14), transparent 55%),
                  linear-gradient(180deg, var(--bg), var(--bg2));
      font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    }}
    .wrap{{max-width:var(--maxw); margin:0 auto; padding:26px 18px 70px}}
    .top{{display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px}}
    h1{{margin:0; font-size:18px}}
    .muted{{color:var(--muted)}}
    .btn{{
      display:inline-flex; align-items:center; gap:10px;
      border:1px solid rgba(212,175,55,.30);
      background:linear-gradient(180deg, rgba(15,23,42,.82), rgba(15,23,42,.62));
      color:var(--text);
      padding:10px 12px;
      border-radius:12px;
      box-shadow:var(--shadow);
      cursor:pointer;
      user-select:none;
      text-decoration:none;
    }}
    .btn .dot{{width:10px; height:10px; border-radius:50%; background:rgba(241,208,112,.65); box-shadow:0 0 0 6px rgba(212,175,55,.14)}}
    .list{{margin-top:14px; display:grid; grid-template-columns:repeat(2,1fr); gap:12px}}
    @media (max-width: 760px){{ .list{{grid-template-columns:1fr}} }}
    .item{{
      display:block;
      background:var(--panel);
      border:1px solid rgba(212,175,55,.22);
      border-radius:var(--radius);
      box-shadow:var(--shadow);
      padding:14px;
      text-decoration:none;
      color:var(--text);
    }}
    .item:hover{{border-color:rgba(241,208,112,.55)}}
    .ym{{font-size:16px; font-weight:700; letter-spacing:.3px}}
    .meta{{display:flex; gap:14px; flex-wrap:wrap; margin-top:8px}}
    .k{{font-size:12px}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div>
        <h1 data-i18n="h1">FSA Trendreport – Chronologie</h1>
        <div class="muted" data-i18n="sub">Monatsreports in Reihenfolge (neu → alt). Für Jahresabschluss siehe Jahresseiten.</div>
      </div>
      <div style="display:flex; gap:10px; align-items:center;">
        <button class="btn" id="langBtn" type="button"><span class="dot"></span><span id="langLabel">DE</span></button>
        <a class="btn" href="../office.html"><span class="dot"></span><span data-i18n="back">Zurück</span></a>
      </div>
    </div>

    <div class="list">
      {''.join(items) if items else '<div class="muted">Noch keine Reports vorhanden.</div>'}
    </div>
  </div>

  <script>
    const I18N = {{
      de: {{
        h1:"FSA Trendreport – Chronologie",
        sub:"Monatsreports in Reihenfolge (neu → alt). Für Jahresabschluss siehe Jahresseiten.",
        back:"Zurück"
      }},
      en: {{
        h1:"FSA Trend Report – Timeline",
        sub:"Monthly reports in order (new → old). For year wrap-up see the year pages.",
        back:"Back"
      }}
    }};
    function getLang() {{
      return (localStorage.getItem("fsa_lang") || document.documentElement.lang || "de").startsWith("en") ? "en" : "de";
    }}
    function setLang(lang) {{
      const L = lang === "en" ? "en" : "de";
      localStorage.setItem("fsa_lang", L);
      document.documentElement.lang = L;
      document.querySelectorAll("[data-i18n]").forEach(el => {{
        const k = el.getAttribute("data-i18n");
        if (I18N[L][k] !== undefined) el.textContent = I18N[L][k];
      }});
      document.getElementById("langLabel").textContent = L.toUpperCase();
    }}
    document.getElementById("langBtn").addEventListener("click", () => setLang(getLang()==="de" ? "en":"de"));
    setLang(getLang());
  </script>
</body>
</html>
"""

def render_year_html(year: int, months: list[dict]) -> str:
    # months newest first
    cards = []
    for m in months:
        cards.append(f"""
          <a class="item" href="{m['ym']}.html">
            <div class="ym">{m['ym']}</div>
            <div class="line">
              <span class="muted">Items</span> {m["items_total"]} ·
              <span class="muted">Sent</span> {m["sent_avg"]:.2f} ·
              <span class="muted">Top</span> {m["top_topic_de"]}
            </div>
          </a>
        """)

    return f"""<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>FSA Trendreport – Jahresübersicht {year}</title>
  <meta name="description" content="Jahresübersicht der FSA Trendreports {year}.">
  <style>
    :root{{
      --bg:#050814; --bg2:#020617;
      --panel:rgba(15,23,42,.92);
      --text:#e9edf3; --muted:#97a0ad;
      --gold:#d4af37; --gold2:#f1d070;
      --shadow:0 12px 35px rgba(0,0,0,.55);
      --radius:16px; --maxw:980px;
    }}
    *{{box-sizing:border-box}}
    body{{
      margin:0; color:var(--text);
      background: radial-gradient(900px 520px at 20% 10%, rgba(212,175,55,.14), transparent 55%),
                  linear-gradient(180deg, var(--bg), var(--bg2));
      font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    }}
    .wrap{{max-width:var(--maxw); margin:0 auto; padding:26px 18px 70px}}
    h1{{margin:0; font-size:18px}}
    .muted{{color:var(--muted)}}
    .btn{{
      display:inline-flex; align-items:center; gap:10px;
      border:1px solid rgba(212,175,55,.30);
      background:linear-gradient(180deg, rgba(15,23,42,.82), rgba(15,23,42,.62));
      color:var(--text);
      padding:10px 12px;
      border-radius:12px;
      box-shadow:var(--shadow);
      cursor:pointer;
      user-select:none;
      text-decoration:none;
    }}
    .btn .dot{{width:10px; height:10px; border-radius:50%; background:rgba(241,208,112,.65); box-shadow:0 0 0 6px rgba(212,175,55,.14)}}
    .grid{{margin-top:14px; display:grid; grid-template-columns:repeat(2,1fr); gap:12px}}
    @media (max-width: 760px){{ .grid{{grid-template-columns:1fr}} }}
    .item{{
      display:block;
      background:var(--panel);
      border:1px solid rgba(212,175,55,.22);
      border-radius:var(--radius);
      box-shadow:var(--shadow);
      padding:14px;
      text-decoration:none;
      color:var(--text);
    }}
    .item:hover{{border-color:rgba(241,208,112,.55)}}
    .ym{{font-size:16px; font-weight:700}}
    .line{{margin-top:6px; font-size:12px}}
    .top{{display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div>
        <h1 data-i18n="h1">FSA Trendreport – Jahresübersicht {year}</h1>
        <div class="muted" data-i18n="sub">Zusammenfassung via Monatswerte (neu → alt). Für Details in den Monatsreport klicken.</div>
      </div>
      <div style="display:flex; gap:10px; align-items:center;">
        <button class="btn" id="langBtn" type="button"><span class="dot"></span><span id="langLabel">DE</span></button>
        <a class="btn" href="index.html"><span class="dot"></span><span data-i18n="back">Zur Chronologie</span></a>
      </div>
    </div>

    <div class="grid">
      {''.join(cards) if cards else '<div class="muted">Noch keine Monatsdaten für dieses Jahr.</div>'}
    </div>
  </div>

  <script>
    const I18N = {{
      de: {{
        h1:"FSA Trendreport – Jahresübersicht {year}",
        sub:"Zusammenfassung via Monatswerte (neu → alt). Für Details in den Monatsreport klicken.",
        back:"Zur Chronologie"
      }},
      en: {{
        h1:"FSA Trend Report – Year Overview {year}",
        sub:"Summary from monthly values (new → old). Click into a month for details.",
        back:"Back to timeline"
      }}
    }};
    function getLang() {{
      return (localStorage.getItem("fsa_lang") || document.documentElement.lang || "de").startsWith("en") ? "en" : "de";
    }}
    function setLang(lang) {{
      const L = lang === "en" ? "en" : "de";
      localStorage.setItem("fsa_lang", L);
      document.documentElement.lang = L;
      document.querySelectorAll("[data-i18n]").forEach(el => {{
        const k = el.getAttribute("data-i18n");
        if (I18N[L][k] !== undefined) el.textContent = I18N[L][k];
      }});
      document.getElementById("langLabel").textContent = L.toUpperCase();
    }}
    document.getElementById("langBtn").addEventListener("click", () => setLang(getLang()==="de" ? "en":"de"));
    setLang(getLang());
  </script>
</body>
</html>
"""

def main():
    repo_root = os.getenv("GITHUB_WORKSPACE", os.getcwd())
    sources_path = os.path.join(repo_root, "tools", "trendreport", "sources.json")
    lex_path = os.path.join(repo_root, "tools", "trendreport", "lexicon_de.json")

    cfg = _read_json(sources_path)
    lex = _read_json(lex_path)

    now_utc = datetime.now(TZ_UTC)
    year, month = _pick_month(now_utc)
    start, end = _month_range(year, month)

    items_total = 0
    sentiment_sum = 0
    sentiment_n = 0
    topic_counts = Counter()
    sources_used = []

    topics = lex.get("topics", [])
    topic_defs = {t["key"]: t for t in topics}

    for src in cfg.get("sources", []):
        url = src["url"]
        name = src.get("name", url)
        cat = src.get("category", "misc")

        try:
            feed = _fetch_feed(url)
            cnt = 0
            for entry in feed.entries:
                dt = _entry_datetime(entry)
                # If feed doesn't include dates, accept it (counts for "current noise"), but score lower by not counting sentiment?
                # Here: if no dt, still include it (simple), but it will not be excluded.
                if dt is not None:
                    if not (start <= dt < end):
                        continue

                title = getattr(entry, "title", "") or ""
                summary = getattr(entry, "summary", "") or ""
                text = f"{title} {summary}"
                toks = _tokens(text)

                sc = _sentiment_score(toks, lex)
                sentiment_sum += sc
                sentiment_n += 1

                # topics by keyword presence
                text_norm = _norm(text)
                for t in topics:
                    if any(k in text_norm for k in t["keywords"]):
                        topic_counts[t["key"]] += 1

                cnt += 1
                items_total += 1

            sources_used.append({"name": name, "category": cat, "items": cnt})
        except Exception as e:
            # keep going; record source failure as 0
            sources_used.append({"name": f"{name} (FAILED)", "category": cat, "items": 0})

    sent_avg = (sentiment_sum / sentiment_n) if sentiment_n else 0.0

    # Prepare topic list sorted by count
    topic_list = []
    for key, tdef in topic_defs.items():
        topic_list.append({
            "key": key,
            "label_de": tdef["de"],
            "label_en": tdef["en"],
            "count": int(topic_counts.get(key, 0))
        })
    topic_list.sort(key=lambda x: x["count"], reverse=True)

    top_topic_de = topic_list[0]["label_de"] if topic_list else "—"

    narrative_de = _narrative_from_topics({k: int(v) for k, v in topic_counts.items()})
    # Simple EN mapping by replacing from topic keys in bullets is messy; keep curated translations:
    narrative_en = []
    for line in narrative_de:
        # minimal translation rules (keeps it deterministic)
        en = line
        en = en.replace("Leistbarkeit & Abstiegsangst dominieren (Miete, Nebenkosten, Preise, Abgaben).",
                        "Affordability & downward-mobility fears dominate (rent, utilities, prices, charges).")
        en = en.replace("Steuern/Abgaben werden als direkter Druckpunkt wahrgenommen (Grundsteuer, Beiträge, Gebühren).",
                        "Taxes/charges are perceived as a direct pressure point (property tax, contributions, fees).")
        en = en.replace("Migration wird häufig als Überlastungs- und Gerechtigkeitsthema diskutiert (Kommunen, Wohnraum, Ordnung).",
                        "Migration is often framed as overload & fairness issue (municipalities, housing, order).")
        en = en.replace("Energie/Heizen erzeugt Unmut vor allem durch Kosten, Planungsunsicherheit und wechselnde Regeln.",
                        "Energy/heating sparks frustration mainly due to costs, planning uncertainty and changing rules.")
        en = en.replace("Ukraine/Krieg polarisiert: Unterstützung vs. Friedensfokus, spürbare Müdigkeit im Ton.",
                        "Ukraine/war is polarizing: support vs. peace focus, with noticeable fatigue in tone.")
        en = en.replace("EU wird oft über konkrete Eingriffe bewertet (Regelungsdruck/Alltagseffekte), weniger über abstrakte Idee.",
                        "The EU is often judged via concrete interventions (regulatory pressure/everyday impacts), less as an abstract idea.")
        en = en.replace("Kein dominantes Einzelthema – Tonlage verteilt sich auf mehrere Reizfelder.",
                        "No single dominant topic – tone is spread across multiple trigger fields.")
        narrative_en.append(en)

    ym = f"{year:04d}-{month:02d}"
    out_dir = os.path.join(repo_root, "pages", "trend")
    data_dir = os.path.join(out_dir, "data")
    _safe_mkdir(out_dir)
    _safe_mkdir(data_dir)

    data = {
        "version": 1,
        "year": year,
        "month": month,
        "ym": ym,
        "generated_at": now_utc.strftime("%Y-%m-%d %H:%M:%S"),
        "items_total": int(items_total),
        "sentiment": {
            "sum": int(sentiment_sum),
            "n": int(sentiment_n),
            "avg": float(sent_avg)
        },
        "topics": topic_list,
        "top_topic_de": top_topic_de,
        "narrative_de": narrative_de,
        "narrative_en": narrative_en,
        "sources_used": sources_used
    }

    # Write JSON data
    _write_json(os.path.join(data_dir, f"{ym}.json"), data)

    # Write month html
    month_html = render_month_html(data)
    _write_text(os.path.join(out_dir, f"{ym}.html"), month_html)

    # Build index from existing JSONs
    json_files = sorted(glob.glob(os.path.join(data_dir, "*.json")), reverse=True)
    month_pages = []
    for jp in json_files:
        d = _read_json(jp)
        month_pages.append({
            "ym": d["ym"],
            "items_total": d["items_total"],
            "sent_avg": d["sentiment"]["avg"],
            "top_topic_de": d.get("top_topic_de", "—")
        })

    _write_text(os.path.join(out_dir, "index.html"), render_index_html(month_pages))

    # Build year pages for each year found
    years = sorted({int(os.path.basename(p)[:4]) for p in json_files if re.match(r"^\d{4}-\d{2}\.json$", os.path.basename(p))})
    for y in years:
        months_y = [m for m in month_pages if int(m["ym"][:4]) == y]
        _write_text(os.path.join(out_dir, f"{y}.html"), render_year_html(y, months_y))

    print(f"Generated: {ym}")

if __name__ == "__main__":
    main()
