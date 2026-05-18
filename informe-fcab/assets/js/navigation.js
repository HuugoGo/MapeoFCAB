/* ================================================================
   navigation.js — Sistema de navegación entre capítulos
   Informe FCAB | DOS BARBAS 2026
   ================================================================ */

const REPORT = {
  title:    'Estudio FCAB',
  subtitle: 'Identificación y Caracterización de Stakeholders',
  agency:   'DOS BARBAS',
  year:     '2026',
};

const CHAPTERS = [
  {
    num:    '01',
    title:  'Introducción',
    desc:   'Propósito, metodología, cobertura territorial y organización del informe.',
    file:   'capitulo-01.html',
    status: 'borrador',
  },
  {
    num:    '02',
    title:  'Metodología',
    desc:   'Diseño mixto, población, técnicas y proceso de análisis.',
    file:   'capitulo-02.html',
    status: 'borrador',
  },
  {
    num:    '08',
    title:  'Análisis de Datos Descriptivos',
    desc:   'Distribución territorial de la muestra y estrategia analítica integrada.',
    file:   'capitulo-08.html',
    status: 'borrador',
    sections: [
      { id: 'sec-descriptivo', label: 'Análisis descriptivo' },
      { id: 'sec-diseno',      label: 'Diseño del análisis' },
      { id: 'sec-territorial', label: 'Distribución territorial' },
      { id: 'sec-influencia',  label: 'Influencia territorial' },
      { id: 'sec-afectacion',  label: 'Afectación organizacional' },
      { id: 'sec-expectativa', label: 'Expectativa de consideración' },
      { id: 'sec-escucha',     label: 'Escucha percibida' },
      { id: 'sec-coherencia',  label: 'Coherencia discurso-práctica' },
      { id: 'sec-cercania',    label: 'Cercanía relacional' },
      { id: 'sec-dialogo',     label: 'Disposición al diálogo' },
      { id: 'sec-resumen',     label: 'Resumen descriptivo' },
    ],
  },
  {
    num:    '04',
    title:  'Análisis temático',
    desc:   'Tópicos latentes y temas espontáneos en el discurso de los actores.',
    file:   'capitulo-04.html',
    status: 'borrador',
  },
  {
    num:    '06',
    title:  'Ecosistema de Actores y Red de Coordinación',
    desc:   'Centralidad perceptual del ecosistema institucional y red de coordinación comunitaria.',
    file:   'capitulo-06.html',
    status: 'borrador',
  },
  {
    num:    '03',
    title:  'Análisis de Cluster',
    desc:   'Segmentación empírica del ecosistema en tres perfiles relacionales.',
    file:   'capitulo-03.html',
    status: 'borrador',
  },
  {
    num:    '10',
    title:  'Recomendaciones Estratégicas',
    desc:   'Recomendaciones organizadas por cluster: distantes, vinculados y actores estratégicos.',
    file:   'capitulo-10.html',
    status: 'borrador',
  },
  {
    num:    '09',
    title:  'Conclusiones',
    desc:   'Balance estratégico, brechas críticas y recomendación transversal.',
    file:   'capitulo-09.html',
    status: 'borrador',
  },
];

function statusBadgeHTML(status) {
  const map = {
    borrador:  ['Borrador',  'badge-borrador'],
    revision:  ['Revisión',  'badge-revision'],
    final:     ['Final',     'badge-final'],
    pendiente: ['Pendiente', 'badge-pendiente'],
  };
  const [label, cls] = map[status] || map.pendiente;
  return `<span class="badge ${cls} sidebar-badge">${label}</span>`;
}

function buildSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  const linksHTML = CHAPTERS.map(ch => {
    const isActive    = currentFile === ch.file;
    const isAvailable = ch.status !== 'pendiente';
    const cls = ['sidebar-link', isActive ? 'active' : '', !isAvailable ? 'disabled' : ''].filter(Boolean).join(' ');
    const href = isAvailable ? ch.file : '#';

    let subHTML = '';
    if (isActive && ch.sections && ch.sections.length) {
      const items = ch.sections.map(s =>
        `<a class="sidebar-sub" href="#${s.id}" data-sub-id="${s.id}">${s.label}</a>`
      ).join('');
      subHTML = `<div class="sidebar-sections">${items}</div>`;
    }

    return `<a class="${cls}" href="${href}">
      <span class="sidebar-num">${ch.num}</span>
      <span class="sidebar-link-title">${ch.title}</span>
    </a>${subHTML}`;
  }).join('');

  sidebar.innerHTML = `
    <div class="sidebar-label">Capítulos</div>
    ${linksHTML}
    <div class="sidebar-footer">
      <div>${REPORT.agency}</div>
      <div style="margin-top:4px;opacity:.7">${REPORT.year} · ${REPORT.title}</div>
    </div>`;

  /* Inject sub-nav styles once */
  if (!document.getElementById('sidebar-sub-styles')) {
    const st = document.createElement('style');
    st.id = 'sidebar-sub-styles';
    st.textContent = `
      .sidebar-sections {
        display: flex; flex-direction: column; gap: 1px;
        margin: 2px 0 6px 0; padding-left: 28px;
      }
      .sidebar-sub {
        display: block; padding: 5px 10px 5px 8px;
        border-left: 2px solid var(--border);
        color: var(--text-2); text-decoration: none;
        font-size: 11.5px; font-weight: 400; line-height: 1.35;
        border-radius: 0 4px 4px 0;
        transition: color .15s, border-color .15s, background .15s;
        cursor: pointer;
      }
      .sidebar-sub:hover {
        color: var(--accent); border-left-color: rgba(37,99,235,.4);
        background: rgba(37,99,235,.04); text-decoration: none;
      }
      .sidebar-sub.active {
        color: var(--accent); border-left-color: var(--accent);
        background: rgba(37,99,235,.07); font-weight: 500;
      }
    `;
    document.head.appendChild(st);
  }

  /* Smooth scroll for sub-links */
  sidebar.querySelectorAll('.sidebar-sub').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.subId);
      if (!target) return;
      const tocBar = document.querySelector('.section-toc');
      const tocH   = tocBar ? tocBar.offsetHeight : 0;
      const top    = target.getBoundingClientRect().top + window.scrollY - 56 - tocH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* Scrollspy for sub-links */
  const subLinks = Array.from(sidebar.querySelectorAll('.sidebar-sub'));
  if (!subLinks.length) return;

  const setSubActive = id => {
    subLinks.forEach(l => l.classList.toggle('active', l.dataset.subId === id));
  };
  if (subLinks[0]) setSubActive(subLinks[0].dataset.subId);

  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setSubActive(visible[0].target.id);
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });

  subLinks.forEach(l => {
    const el = document.getElementById(l.dataset.subId);
    if (el) observer.observe(el);
  });
}

function buildMobileToggle() {
  const toggle  = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (!toggle || !sidebar) return;

  const overlay = Object.assign(document.createElement('div'), {
    className: 'sidebar-overlay',
    id: 'sidebar-overlay',
  });
  document.body.appendChild(overlay);

  const close = () => { sidebar.classList.remove('open'); overlay.classList.remove('visible'); };
  const open  = () => { sidebar.classList.add('open');    overlay.classList.add('visible'); };

  toggle.addEventListener('click', () => sidebar.classList.contains('open') ? close() : open());
  overlay.addEventListener('click', close);
}

/* ================================================================
   buildSectionTOC — Navegación interna de secciones
   Se ejecuta en todos los capítulos. Lee los <section class="section">
   y construye una barra de píldoras sticky con scrollspy.
   ================================================================ */
function buildSectionTOC() {
  const content  = document.querySelector('.chapter-content');
  const header   = content?.querySelector('.chapter-header');
  const sections = content ? Array.from(content.querySelectorAll('section.section')) : [];
  if (!header || sections.length < 2) return;

  /* Inyectar estilos una sola vez */
  if (!document.getElementById('stoc-styles')) {
    const st = document.createElement('style');
    st.id = 'stoc-styles';
    st.textContent = `
      .section-toc {
        display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none;
        padding: 10px 0; margin: 0 0 6px;
        position: sticky; top: 56px; z-index: 20;
        background: var(--bg); border-bottom: 1px solid var(--border);
      }
      .section-toc::-webkit-scrollbar { display: none; }
      .section-toc::before, .section-toc::after {
        content: ''; flex-shrink: 0; width: 4px;
      }
      .stoc-pill {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 5px 13px 5px 7px; border-radius: 20px;
        border: 1px solid var(--border); background: var(--surface-1);
        color: var(--text-2); text-decoration: none; white-space: nowrap;
        font-size: 12px; font-weight: 500; flex-shrink: 0;
        transition: border-color .15s, color .15s, background .15s;
        cursor: pointer;
      }
      .stoc-pill:hover { border-color: rgba(37,99,235,.4); color: var(--accent); text-decoration: none; }
      .stoc-pill.active {
        border-color: var(--accent);
        background: rgba(37,99,235,.07);
        color: var(--accent);
      }
      .stoc-num {
        font-size: 10px; font-weight: 700;
        background: var(--surface-2); border: 1px solid var(--border);
        border-radius: 50%; width: 18px; height: 18px;
        display: inline-flex; align-items: center; justify-content: center;
        flex-shrink: 0; line-height: 1;
      }
      .stoc-pill.active .stoc-num {
        background: rgba(37,99,235,.12);
        border-color: rgba(37,99,235,.25);
        color: var(--accent);
      }
      @media (max-width: 640px) {
        .stoc-pill { font-size: 11px; padding: 4px 10px 4px 6px; }
        .stoc-num  { width: 16px; height: 16px; font-size: 9px; }
      }
    `;
    document.head.appendChild(st);
  }

  /* Asignar IDs y recolectar ítems */
  const items = [];
  sections.forEach((sec, i) => {
    const h2 = sec.querySelector('h2');
    if (!h2) return;
    if (!sec.id) sec.id = `stoc-sec-${i + 1}`;
    const rawLabel = h2.textContent.trim();
    const num      = rawLabel.match(/^\d+/)?.[0] ?? String(i + 1);
    const label    = rawLabel.replace(/^\d+[\.\s]+/, '').trim();
    items.push({ id: sec.id, num, label, el: sec });
  });
  if (items.length < 2) return;

  /* Construir barra TOC */
  const toc = document.createElement('nav');
  toc.className = 'section-toc';
  toc.setAttribute('aria-label', 'Secciones del capítulo');
  toc.innerHTML = items.map(item =>
    `<a class="stoc-pill" href="#${item.id}" data-toc-id="${item.id}">
       <span class="stoc-num">${item.num}</span>
       <span class="stoc-label">${item.label}</span>
     </a>`
  ).join('');

  header.insertAdjacentElement('afterend', toc);

  /* Scroll suave al hacer clic */
  toc.querySelectorAll('.stoc-pill').forEach(pill => {
    pill.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(pill.dataset.tocId);
      if (!target) return;
      const offset = toc.offsetHeight + 56 + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* Scrollspy con IntersectionObserver */
  const pillMap = {};
  toc.querySelectorAll('.stoc-pill').forEach(p => { pillMap[p.dataset.tocId] = p; });

  const setActive = id => {
    Object.values(pillMap).forEach(p => p.classList.remove('active'));
    if (!pillMap[id]) return;
    pillMap[id].classList.add('active');
    pillMap[id].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

  /* Inicia con la primera sección activa */
  if (items[0]) setActive(items[0].id);

  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => { if (sec.id) observer.observe(sec); });
}

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  buildMobileToggle();
  buildSectionTOC();
});
