"""
gen_informe.py  —  Genera informe-completo.html
Ejecutar cada vez que se actualice un capítulo: python gen_informe.py
"""
import os, re

OUT  = r"C:\Users\hgonz\Downloads\Presentación mapeo\informe-fcab\informe-completo.html"
BASE = r"C:\Users\hgonz\Downloads\Presentación mapeo\informe-fcab\chapters"

CHAPS = [
    ("01", "Introducción",                 "capitulo-01.html"),
    ("02", "Metodología",                  "capitulo-02.html"),
    ("03", "Análisis Descriptivo",         "capitulo-08.html"),
    ("04", "Análisis Temático",            "capitulo-04.html"),
    ("05", "Ecosistema de Actores",        "capitulo-06.html"),
    ("06", "Análisis de Cluster",          "capitulo-03.html"),
    ("07", "Recomendaciones Estratégicas", "capitulo-10.html"),
    ("08", "Conclusiones",                 "capitulo-09.html"),
]

def read_file(path):
    with open(path, encoding='utf-8') as f:
        return f.read()

def extract_styles(html):
    m = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
    return m.group(1).strip() if m else ''

def extract_body(html):
    """Extrae contenido entre <main class="chapter-main"> y </main>,
    elimina .chapter-nav y los divs envolventes."""
    m = re.search(r'<main class="chapter-main">(.*?)</main>', html, re.DOTALL)
    if not m:
        return ''
    body = m.group(1)
    # quitar bloque de navegación inferior
    body = re.sub(r'<nav class="chapter-nav".*?</nav>\s*', '', body, flags=re.DOTALL)
    # quitar wrapper <div class="chapter-content"> y su cierre
    body = re.sub(r'^\s*<div class="chapter-content"[^>]*>\s*', '', body)
    body = re.sub(r'\s*</div>\s*$', '', body.rstrip())
    return body.strip()

# ── recolectar estilos y cuerpos ─────────────────────────────────────────────
all_styles = []
all_bodies = []

for num, title, fname in CHAPS:
    path = os.path.join(BASE, fname)
    if not os.path.exists(path):
        all_styles.append(f"/* cap-{num} pendiente */")
        all_bodies.append(f"""
  <!-- ════════════════════════════════════════════════════════════ -->
  <div id="cap-{num}" class="chapter-block pending-chapter">
    <header class="chapter-header">
      <div class="chapter-meta"><span class="chapter-num-label">Capítulo {num}</span></div>
      <h1>{title}</h1>
      <p class="chapter-lead" style="color:var(--text-3);font-style:italic">Este capítulo está en preparación.</p>
    </header>
  </div>
  <div class="chapter-divider"></div>
""")
        continue

    html = read_file(path)
    all_styles.append(f"/* ── cap-{num}: {title} ── */\n{extract_styles(html)}")
    body = extract_body(html)
    all_bodies.append(f"""
  <!-- ════════════════════════════════════════════════════════════ -->
  <!-- CAP {num}: {title.upper()} -->
  <!-- ════════════════════════════════════════════════════════════ -->
  <div id="cap-{num}" class="chapter-block">
{body}
  </div>
  <div class="chapter-divider"></div>
""")

# ── sidebar ──────────────────────────────────────────────────────────────────
sidebar_links = "\n".join(
    f'    <a class="sidebar-link" href="#cap-{n}">'
    f'<span class="sidebar-num">{n}</span>'
    f'<span class="sidebar-link-title">{t}</span></a>'
    for n, t, _ in CHAPS
)

# ── HTML final ───────────────────────────────────────────────────────────────
doc = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Informe Completo | Estudio FCAB · DOS BARBAS 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css">
  <style>
    /* ══ Estructura del informe completo ══ */
    .chapter-block {{ margin-bottom: 0; }}
    .chapter-divider {{
      height: 1px; background: var(--border); margin: 80px 0; position: relative;
    }}
    .chapter-divider::before {{
      content: ''; position: absolute; left: 0; top: -2px;
      width: 56px; height: 3px; background: var(--accent); border-radius: 2px;
    }}

    /* ══ Estilos combinados de cada capítulo ══ */
{"".join(all_styles)}
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="site-header">
    <button class="header-toggle" id="sidebar-toggle" aria-label="Abrir menú">
      <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
    <a href="index.html" class="header-back">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      Índice
    </a>
    <span class="header-sep"></span>
    <span class="header-chapter">Informe Completo — Estudio FCAB</span>
    <div class="header-right">
      <img src="assets/img/logo-fcab.jpg" alt="FCAB" class="header-logo">
      <span class="header-sep"></span>
      <img src="assets/img/logo-dos-barbas.png" alt="Dos Barbas" class="header-logo">
    </div>
  </header>

  <!-- SIDEBAR -->
  <nav class="sidebar" id="sidebar" aria-label="Navegación del informe">
    <div class="sidebar-label">Capítulos</div>
{sidebar_links}
    <div class="sidebar-footer">
      <div>DOS BARBAS</div>
      <div style="margin-top:4px;opacity:.7">2026 · Estudio FCAB</div>
    </div>
  </nav>

  <!-- CONTENIDO -->
  <main class="chapter-main">
    <div class="chapter-content" style="max-width:920px">

{"".join(all_bodies)}

    </div>
  </main>

  <script>
    /* Sidebar scrollspy */
    (function() {{
      const links = Array.from(document.querySelectorAll('.sidebar-link[href^="#"]'));
      const caps  = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
      const setActive = id => links.forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      if (caps[0]) setActive(caps[0].id);
      const obs = new IntersectionObserver(entries => {{
        const vis = entries.filter(e => e.isIntersecting)
          .sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis.length) setActive(vis[0].target.id);
      }}, {{ rootMargin: '-10% 0px -55% 0px', threshold: 0 }});
      caps.forEach(c => obs.observe(c));
      links.forEach(l => l.addEventListener('click', e => {{
        e.preventDefault();
        const t = document.querySelector(l.getAttribute('href'));
        if (t) window.scrollTo({{ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }});
      }}));
    }})();

    /* Mobile toggle */
    (function() {{
      const toggle = document.getElementById('sidebar-toggle');
      const sidebar = document.getElementById('sidebar');
      if (!toggle || !sidebar) return;
      const overlay = Object.assign(document.createElement('div'),
        {{ className:'sidebar-overlay', id:'sidebar-overlay' }});
      document.body.appendChild(overlay);
      const close = () => {{ sidebar.classList.remove('open'); overlay.classList.remove('visible'); }};
      toggle.addEventListener('click', () =>
        sidebar.classList.contains('open') ? close() :
        (sidebar.classList.add('open'), overlay.classList.add('visible')));
      overlay.addEventListener('click', close);
    }})();

    /* Progress bar */
    (function() {{
      const bar = document.createElement('div');
      bar.className = 'scroll-progress'; document.body.prepend(bar);
      const upd = () => {{
        const s = window.scrollY, t = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = t > 0 ? (s/t*100)+'%' : '0%';
      }};
      window.addEventListener('scroll', upd, {{ passive:true }}); upd();
    }})();

    /* Section animation */
    (function() {{
      const secs = Array.from(document.querySelectorAll('.section'));
      const fold = window.innerHeight * 0.85;
      secs.forEach(s => {{ if (s.getBoundingClientRect().top > fold) s.classList.add('section-hidden'); }});
      const obs = new IntersectionObserver(entries => {{
        entries.forEach(e => {{
          if (e.isIntersecting) {{
            e.target.classList.remove('section-hidden');
            e.target.classList.add('section-visible');
            obs.unobserve(e.target);
          }}
        }});
      }}, {{ threshold: 0.06 }});
      secs.forEach(s => {{ if (s.classList.contains('section-hidden')) obs.observe(s); }});
    }})();

    /* Tab system */
    document.querySelectorAll('.var-tabs').forEach(container => {{
      const btns   = container.querySelectorAll('.var-tab-btn');
      const panels = container.querySelectorAll('.var-tab-panel');
      panels.forEach((p,i) => p.classList.toggle('active', i===0));
      btns.forEach((btn,i) => {{
        btn.classList.toggle('active', i===0);
        btn.addEventListener('click', () => {{
          btns.forEach(b => b.classList.remove('active'));
          panels.forEach(p => p.classList.remove('active'));
          btn.classList.add('active'); panels[i].classList.add('active');
        }});
      }});
    }});
  </script>
</body>
</html>"""

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(doc)

kb = os.path.getsize(OUT) // 1024
print(f"OK  {kb} KB  ->  {os.path.basename(OUT)}")
