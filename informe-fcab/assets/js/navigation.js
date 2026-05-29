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
    file:   'capitulo-01.html',
    status: 'borrador',
  },
  {
    num:    '02',
    title:  'Metodología',
    file:   'capitulo-02.html',
    status: 'borrador',
  },
  {
    num:    '03',
    title:  'Análisis Descriptivo',
    file:   'capitulo-08.html',
    status: 'borrador',
    subpages: [
      { label: 'B · Influencia territorial',      file: 'capitulo-08b.html' },
      { label: 'C · Afectación organizacional',   file: 'capitulo-08c.html' },
      { label: 'D · Expectativa de consideración',file: 'capitulo-08d.html' },
      { label: 'E · Escucha percibida',            file: 'capitulo-08e.html' },
      { label: 'F · Coherencia discurso-práctica', file: 'capitulo-08f.html' },
      { label: 'G · Calidad percibida',            file: 'capitulo-08g.html' },
      { label: 'H · Cercanía relacional',          file: 'capitulo-08h.html' },
      { label: 'I · Disposición al diálogo',       file: 'capitulo-08i.html' },
      { label: 'J · Resumen descriptivo',          file: 'capitulo-08j.html' },
    ],
  },
  {
    num:    '04',
    title:  'Análisis LDA',
    file:   'capitulo-04.html',
    status: 'borrador',
  },
  {
    num:    '05',
    title:  'Análisis de temas prevalentes',
    file:   'capitulo-05.html',
    status: 'borrador',
  },
  {
    num:    '06',
    title:  'Ecosistema de Actores',
    file:   'capitulo-06.html',
    status: 'borrador',
  },
  {
    num:    '07',
    title:  'Red de Coordinación',
    file:   'capitulo-07.html',
    status: 'borrador',
  },
  {
    num:    '08',
    title:  'Temas pendientes: Baquedano, Sierra Gorda y Ollagüe',
    file:   'capitulo-11.html',
    status: 'borrador',
  },
  {
    num:    '09',
    title:  'Análisis de Cluster',
    file:   'capitulo-03.html',
    status: 'borrador',
  },
  {
    num:    '10',
    title:  'Recomendaciones Estratégicas',
    file:   'capitulo-10.html',
    status: 'borrador',
  },
  {
    num:    '11',
    title:  'Conclusiones',
    file:   'capitulo-09.html',
    status: 'borrador',
  },
];

/* ================================================================
   Helpers
   ================================================================ */
function injectStyles(id, css) {
  if (document.getElementById(id)) return;
  const st = document.createElement('style');
  st.id = id;
  st.textContent = css;
  document.head.appendChild(st);
}

/* ================================================================
   buildSidebar
   ================================================================ */
function buildSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  /* Find parent chapter if currentFile is a subpage */
  const parentChapter = CHAPTERS.find(ch =>
    ch.subpages && ch.subpages.some(sp => sp.file === currentFile)
  );

  const linksHTML = CHAPTERS.map(ch => {
    /* A chapter is "active" if we're on its hub file OR on one of its subpages */
    const isActive    = currentFile === ch.file || parentChapter === ch;
    const isAvailable = ch.status !== 'pendiente';
    const cls = ['sidebar-link', isActive ? 'active' : '', !isAvailable ? 'disabled' : '']
      .filter(Boolean).join(' ');
    const href = isAvailable ? ch.file : '#';

    let subHTML = '';

    /* ── Subpages (file links, e.g. Chapter 03 sub-chapters) ── */
    if (isActive && ch.subpages && ch.subpages.length) {
      const items = ch.subpages.map(sp => {
        const isSubActive = currentFile === sp.file;
        const subCls = ['sidebar-sub', isSubActive ? 'active' : ''].filter(Boolean).join(' ');
        return `<a class="${subCls}" href="${sp.file}" data-subpage="${sp.file}">${sp.label}</a>`;
      }).join('');
      subHTML = `<div class="sidebar-sections" id="sidebar-subpages">${items}</div>`;
    }

    /* ── Sections scrollspy (legacy, for chapters with inline sections) ── */
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

  /* ── Inject styles ── */
  injectStyles('sidebar-sub-styles', `
    .sidebar-sections {
      display: flex; flex-direction: column; gap: 1px;
      margin: 2px 0 6px 0; padding-left: 0;
    }
    .sidebar-sub {
      display: block; padding: 6px 10px 6px 32px;
      border-left: 2px solid var(--border);
      color: var(--text-2); text-decoration: none;
      font-size: 11.5px; font-weight: 400; line-height: 1.35;
      transition: color .15s, border-color .15s, background .15s;
      cursor: pointer;
    }
    .sidebar-sub:hover {
      color: var(--accent); border-left-color: rgba(37,99,235,.4);
      background: rgba(37,99,235,.04); text-decoration: none;
    }
    .sidebar-sub.active {
      color: var(--accent); border-left-color: var(--accent);
      background: rgba(37,99,235,.08); font-weight: 600;
    }
    /* 3rd level: sections within a subpage */
    .sidebar-subsections {
      display: flex; flex-direction: column; gap: 0;
      margin: 2px 0 4px 0;
    }
    .sidebar-subsub {
      display: block; padding: 4px 10px 4px 48px;
      border-left: 2px solid var(--border);
      color: var(--text-3); text-decoration: none;
      font-size: 10.5px; font-weight: 400; line-height: 1.3;
      transition: color .12s, border-color .12s, background .12s;
      cursor: pointer;
    }
    .sidebar-subsub:hover {
      color: var(--accent); border-left-color: rgba(37,99,235,.3);
      background: rgba(37,99,235,.03); text-decoration: none;
    }
    .sidebar-subsub.active {
      color: var(--accent); border-left-color: rgba(37,99,235,.5);
      background: rgba(37,99,235,.05); font-weight: 500;
    }
  `);

  /* ── Smooth scroll for legacy section links ── */
  sidebar.querySelectorAll('.sidebar-sub[data-sub-id]').forEach(link => {
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

  /* ── Legacy scrollspy for section links ── */
  const sectionLinks = Array.from(sidebar.querySelectorAll('.sidebar-sub[data-sub-id]'));
  if (sectionLinks.length) {
    const setSubActive = id => {
      sectionLinks.forEach(l => l.classList.toggle('active', l.dataset.subId === id));
    };
    if (sectionLinks[0]) setSubActive(sectionLinks[0].dataset.subId);
    const obs = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) setSubActive(visible[0].target.id);
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    sectionLinks.forEach(l => {
      const el = document.getElementById(l.dataset.subId);
      if (el) obs.observe(el);
    });
  }

  /* ── Section scrollspy WITHIN the current subpage ── */
  _buildSubpageSectionSpy(sidebar, currentFile);
}

/* ================================================================
   _buildSubpageSectionSpy
   When on a subpage (e.g. capitulo-08c.html), inject 3rd-level
   section links under the active subpage item and run scrollspy.
   ================================================================ */
function _buildSubpageSectionSpy(sidebar, currentFile) {
  /* Only run if we're on a subpage */
  const parentChapter = CHAPTERS.find(ch =>
    ch.subpages && ch.subpages.some(sp => sp.file === currentFile)
  );
  if (!parentChapter) return;

  /* Collect visible sections from the DOM */
  const sections = Array.from(document.querySelectorAll('.chapter-content section.section'));
  if (!sections.length) return;

  /* Assign IDs if missing and collect items */
  const items = [];
  sections.forEach((sec, i) => {
    const h2 = sec.querySelector('h2');
    if (!h2) return;
    if (!sec.id) sec.id = `nav-sec-${i + 1}`;
    const rawLabel = h2.textContent.trim();
    const num   = rawLabel.match(/^\d+/)?.[0] ?? String(i + 1);
    const label = rawLabel.replace(/^\d+[\.\s]+/, '').trim();
    items.push({ id: sec.id, num, label, el: sec });
  });
  if (!items.length) return;

  /* Find the active subpage link in the sidebar */
  const activeSubLink = sidebar.querySelector(`.sidebar-sub[data-subpage="${currentFile}"]`);
  if (!activeSubLink) return;

  /* Build sub-section block */
  const subsecHTML = items.map(item =>
    `<a class="sidebar-subsub" href="#${item.id}" data-subsub-id="${item.id}">
      ${item.num}. ${item.label}
    </a>`
  ).join('');
  const subsecBlock = document.createElement('div');
  subsecBlock.className = 'sidebar-subsections';
  subsecBlock.innerHTML = subsecHTML;
  activeSubLink.insertAdjacentElement('afterend', subsecBlock);

  /* Smooth scroll on click */
  subsecBlock.querySelectorAll('.sidebar-subsub').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.subsubId);
      if (!target) return;
      const tocBar = document.querySelector('.section-toc');
      const tocH   = tocBar ? tocBar.offsetHeight : 0;
      const top    = target.getBoundingClientRect().top + window.scrollY - 56 - tocH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* Scrollspy */
  const subsubLinks = Array.from(subsecBlock.querySelectorAll('.sidebar-subsub'));
  const subsubMap = {};
  subsubLinks.forEach(l => { subsubMap[l.dataset.subsubId] = l; });

  const setActive = id => {
    Object.values(subsubMap).forEach(l => l.classList.remove('active'));
    if (subsubMap[id]) {
      subsubMap[id].classList.add('active');
      subsubMap[id].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };
  if (items[0]) setActive(items[0].id);

  const obs = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => { if (sec.id) obs.observe(sec); });
}

/* ================================================================
   buildMobileToggle
   ================================================================ */
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
   buildSectionTOC — Barra de píldoras sticky (top)
   ================================================================ */
function buildSectionTOC() {
  const content  = document.querySelector('.chapter-content');
  const header   = content?.querySelector('.chapter-header');
  const sections = content ? Array.from(content.querySelectorAll('section.section')) : [];
  if (!header || sections.length < 2) return;

  injectStyles('stoc-styles', `
    .section-toc {
      display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none;
      padding: 10px 0; margin: 0 0 6px;
      position: sticky; top: 56px; z-index: 20;
      background: var(--bg); border-bottom: 1px solid var(--border);
    }
    .section-toc::-webkit-scrollbar { display: none; }
    .section-toc::before, .section-toc::after { content: ''; flex-shrink: 0; width: 4px; }
    .stoc-pill {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 5px 13px 5px 7px; border-radius: 20px;
      border: 1px solid var(--border); background: var(--surface-1);
      color: var(--text-2); text-decoration: none; white-space: nowrap;
      font-size: 12px; font-weight: 500; flex-shrink: 0;
      transition: border-color .15s, color .15s, background .15s; cursor: pointer;
    }
    .stoc-pill:hover { border-color: rgba(37,99,235,.4); color: var(--accent); text-decoration: none; }
    .stoc-pill.active { border-color: var(--accent); background: rgba(37,99,235,.07); color: var(--accent); }
    .stoc-num {
      font-size: 10px; font-weight: 700;
      background: var(--surface-2); border: 1px solid var(--border);
      border-radius: 50%; width: 18px; height: 18px;
      display: inline-flex; align-items: center; justify-content: center;
      flex-shrink: 0; line-height: 1;
    }
    .stoc-pill.active .stoc-num { background: rgba(37,99,235,.12); border-color: rgba(37,99,235,.25); color: var(--accent); }
    @media (max-width: 640px) {
      .stoc-pill { font-size: 11px; padding: 4px 10px 4px 6px; }
      .stoc-num  { width: 16px; height: 16px; font-size: 9px; }
    }
  `);

  const items = [];
  sections.forEach((sec, i) => {
    const h2 = sec.querySelector('h2');
    if (!h2) return;
    if (!sec.id) sec.id = `stoc-sec-${i + 1}`;
    const rawLabel = h2.textContent.trim();
    const num   = rawLabel.match(/^\d+/)?.[0] ?? String(i + 1);
    const label = rawLabel.replace(/^\d+[\.\s]+/, '').trim();
    items.push({ id: sec.id, num, label, el: sec });
  });
  if (items.length < 2) return;

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

  const pillMap = {};
  toc.querySelectorAll('.stoc-pill').forEach(p => { pillMap[p.dataset.tocId] = p; });

  const setActive = id => {
    Object.values(pillMap).forEach(p => p.classList.remove('active'));
    if (!pillMap[id]) return;
    pillMap[id].classList.add('active');
    pillMap[id].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };
  if (items[0]) setActive(items[0].id);

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => { if (sec.id) observer.observe(sec); });
}

/* ================================================================
   buildChapterNav — Prev / Next dinámico entre capítulos y sub-caps
   ================================================================ */
function buildChapterNav() {
  const nav = document.querySelector('.chapter-nav');
  if (!nav) return;

  const currentFile = window.location.pathname.split('/').pop() || '';

  /* Secuencia plana: hub → subpages → siguiente capítulo … */
  const sequence = [];
  CHAPTERS.forEach(ch => {
    sequence.push({ file: ch.file, label: `Cap.${ch.num} · ${ch.title}` });
    if (ch.subpages) {
      ch.subpages.forEach(sp => {
        sequence.push({ file: sp.file, label: sp.label });
      });
    }
  });

  const idx = sequence.findIndex(p => p.file === currentFile);
  if (idx === -1) return;

  const prev = idx > 0               ? sequence[idx - 1] : null;
  const next = idx < sequence.length - 1 ? sequence[idx + 1] : null;

  const svgLeft  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>`;
  const svgRight = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
  const svgHome  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 9 12 2 21 9"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

  nav.innerHTML = `
    ${prev
      ? `<a class="nav-btn nav-prev" href="${prev.file}">${svgLeft} ${prev.label}</a>`
      : `<span class="nav-btn nav-prev" style="visibility:hidden">${svgLeft}</span>`
    }
    <a class="nav-btn nav-center" href="../index.html">${svgHome} Índice</a>
    ${next
      ? `<a class="nav-btn nav-next" href="${next.file}">${next.label} ${svgRight}</a>`
      : `<span class="nav-btn nav-next" style="visibility:hidden">${svgRight}</span>`
    }
  `;
}

/* ================================================================
   buildProgressBar — Barra de progreso de lectura (2px, top fixed)
   ================================================================ */
function buildProgressBar() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  const update = () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ================================================================
   animateSections — Entrada suave al hacer scroll
   ================================================================ */
function animateSections() {
  const sections = Array.from(document.querySelectorAll('.section'));
  if (!sections.length) return;
  const fold = window.innerHeight * 0.85;
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top > fold) sec.classList.add('section-hidden');
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.remove('section-hidden');
        e.target.classList.add('section-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  sections.forEach(sec => {
    if (sec.classList.contains('section-hidden')) observer.observe(sec);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  buildMobileToggle();
  buildSectionTOC();
  buildChapterNav();
  buildProgressBar();
  animateSections();
});
