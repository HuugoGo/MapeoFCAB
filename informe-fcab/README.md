# Informe FCAB — Sistema modular HTML

**Estudio Identificación y Caracterización de Stakeholders de FCAB**
Agencia: DOS BARBAS | Mayo 2026

---

## Estructura del proyecto

```
informe-fcab/
  assets/
    css/styles.css        → Sistema de diseño global (tokens, componentes, layout)
    js/navigation.js      → Registro de capítulos, sidebar y navegación móvil
    img/                  → Logos e imágenes del informe
  chapters/
    capitulo-01.html      → Introducción
    capitulo-02.html      → Metodología  ← disponible
    capitulo-03.html      → Resultados por Dimensión
    capitulo-04.html      → Categorización y Matriz VRIO
    capitulo-05.html      → Matriz Mendelow
    capitulo-06.html      → Recomendaciones
  index.html              → Portada e índice de navegación
  README.md               → Este archivo
```

---

## Cómo abrir el informe

Abrir `index.html` directamente en el navegador. No requiere servidor.

---

## Cómo editar un capítulo

1. Abrir el archivo `chapters/capitulo-XX.html` correspondiente.
2. Editar el contenido dentro de `<div class="chapter-content">`.
3. No modificar la estructura de `<header>`, `<nav id="sidebar">` ni el `<script>` al final.
4. Actualizar el badge de estado en el `<header class="chapter-header">` cuando corresponda:
   - `badge-borrador` → `badge-revision` → `badge-final`

---

## Cómo agregar un capítulo nuevo

1. Duplicar cualquier `chapters/capitulo-XX.html` existente.
2. Actualizar número, título, lead y contenido.
3. En `assets/js/navigation.js`, agregar una entrada al array `CHAPTERS`:
   ```js
   { num: '07', title: 'Nuevo capítulo', desc: '...', file: 'capitulo-07.html', status: 'borrador' }
   ```
4. En `index.html`, agregar la tarjeta correspondiente en la sección `.chapters-section`.
5. Actualizar los botones `chapter-nav` de los capítulos adyacentes (anterior/siguiente).

---

## Cómo actualizar el estado de un capítulo

- En `navigation.js`: cambiar `status` del capítulo (`'pendiente'` → `'borrador'` → `'revision'` → `'final'`).
- En el `capitulo-XX.html`: cambiar la clase del badge en `.chapter-meta`.
- En `index.html`: cambiar la clase del badge en la tarjeta y quitar la clase `disabled` del enlace si el capítulo pasa a estar disponible.

---

## Archivos que no deben modificarse sin necesidad

| Archivo | Razón |
|---|---|
| `assets/css/styles.css` | Cambios afectan todos los capítulos simultáneamente |
| `assets/js/navigation.js` | Controla la navegación global; errores rompen el sidebar en todos los capítulos |

---

## Fuentes por capítulo

| Capítulo | Archivo fuente |
|---|---|
| 02 — Metodología | `informe_ metodología.md` |
