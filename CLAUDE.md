# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static collection of self-contained HTML presentation files for "Dos Barbas" consulting deliverables. Files cover ecosystem analysis, network visualization, discourse analysis (LDA), project portfolios, implementation planning, and critical path timelines — primarily for Chilean/Latin American infrastructure projects (e.g., Antofagasta con Todo, FCAB).

## No Build System

There are no build scripts, package managers, or test suites. All HTML files open directly in a browser. To preview any file, just open it.

## File Architecture

Each HTML file is fully self-contained with embedded CSS and JavaScript. External dependencies fall into two patterns:

- **CDN-loaded**: GSAP, ScrollTrigger, Google Fonts (requires internet)
- **Bundled locally**: Plotly, visNetwork, htmlwidgets, jQuery — stored in `index_files/` and `02_layout_fruchterman_reingold_files/` alongside the files that depend on them

The `index.html` and `02_layout_fruchterman_reingold.html` files require their respective `_files/` sibling directories to function.

## Libraries in Use

| Library | Used in |
|---|---|
| Plotly (v2.25.2) | `index.html` |
| visNetwork / vis.js (v9.1.0) | `02_layout_fruchterman_reingold.html` |
| GSAP + ScrollTrigger | `Ruta_Critica_Apple_Like_V4.html`, `LiLi_PRO_Sesion_CINEMATIC.html` |
| htmlwidgets + crosstalk | R-generated files (`index.html`, `02_layout_*.html`) |

## Design Conventions

All presentations use a consistent pattern:

- **CSS variables** for theming (colors, gradients) defined in `:root`
- **Fluid typography** via `clamp()` — avoid hardcoded `px` font sizes
- **Glassmorphism** cards: `backdrop-filter: blur()` + semi-transparent backgrounds
- **Gradient text**: `background-clip: text; -webkit-background-clip: text; color: transparent`
- **CSS keyframe animations** for entrance effects; GSAP for scroll-triggered sequences

When editing presentations, preserve these patterns for visual consistency across the portfolio.

## Word Documents

`Analisis_Ecosistema_Actores_FCAB.docx` and `Temas prevalentes.docx` are source analysis documents. The HTML files are the primary deliverables.
