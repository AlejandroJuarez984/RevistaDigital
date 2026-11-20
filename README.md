# Revista IA — Sitio web estático

Revista digital con artículos sobre **Inteligencia Artificial**, elaborada como trabajo grupal. Sitio 100% estático (HTML, CSS y JS puros), listo para desplegarse en **GitHub Pages**.

Cada artículo se lee como una **revista que se abre y cambia de página** (efecto de volteo animado).

## Estructura

```
├── index.html                    # Portada: hero + artículos + infografías + nosotros
├── css/
│   ├── styles.css                # Estilos globales (tema, navbar, tarjetas, carrusel)
│   ├── revista.css               # Lector: páginas, portada, controles de volteo
│   └── photoswipe.css            # Estilos del visor de infografías
├── js/
│   ├── main.js                   # Menú móvil, año dinámico y pintado de tarjetas
│   ├── articulos.js              # Catálogo de artículos (array que genera las cards)
│   ├── lectura.js                # Inicializa la revista (volteo, contador, flechas)
│   ├── infografias.js            # Carrusel + visor con zoom (PhotoSwipe)
│   └── vendor/
│       ├── page-flip.browser.min.js      # Volteo de páginas (MIT, incluida)
│       ├── photoswipe.umd.min.js         # Visor de imágenes (MIT, incluida)
│       └── photoswipe-lightbox.umd.min.js
├── articulos/
│   ├── plantilla.html            # Plantilla para crear nuevos artículos
│   └── articulo-*.html           # Artículos del equipo
├── infografias/                  # SVG de infografías (se muestran en el carrusel)
├── assets/img/                   # Imágenes y logo
├── .nojekyll                     # Evita el procesamiento de Jekyll en GitHub Pages
└── README.md
```

## Cómo crear tu artículo (para el equipo)

1. Copia `articulos/plantilla.html` y renómbralo: `articulo-6.html`, etc.
2. Tu archivo tiene **páginas de revista** dentro de `<div id="revista">`:

   ```html
   <div class="pagina portada-revista" data-density="hard" style="--c1:#...; --c2:#...;">
     …portada (título, autor)…
   </div>

   <div class="pagina">
     …contenido de la página 1…
   </div>

   <div class="pagina">
     …contenido de la página 2…
   </div>

   <div class="pagina contra-revista" data-density="hard">
     …contraportada…
   </div>
   ```

3. Reglas importantes:
   - **Portada y contraportada** llevan `data-density="hard"` (no lo quites).
   - Las páginas de contenido se **numeran solas**; no pongas números a mano.
   - **Máximo ~120 palabras por página.** Si el contenido crece, añade otra página copiando un bloque `<div class="pagina">…</div>`.
   - Los enlaces a CSS/JS usan `../` porque tu archivo vive dentro de `articulos/`.
   - En el `<style>` de tu archivo puedes usar el prefijo de tu artículo (`.art-6`, …) para componentes propios; el color de acento se cambia con `body.art-6 { --accent: #...; }`.
4. Edita también `<title>`, meta descripción, el `lector-titulo` de la barra y los colores `--c1/--c2` de la portada.
5. Envía tu archivo al integrante que lleve el sitio.

### Controles del lector (ya funcionan, no toques)

- Flechas laterales, teclado ←/→ y swipe en móvil.
- La revista **se abre sola** al cargar; el contador muestra la página actual.
- Si la librería no carga, el sitio muestra las páginas en modo lista (degradación segura).

## Cómo integrar un artículo nuevo (para el equipo)

Las tarjetas de la portada se generan solas desde `js/articulos.js`. **No edites el HTML de `index.html`.**

1. Sube tu archivo a `articulos/` (siguiendo la plantilla).
2. Abre `js/articulos.js` y copia una entrada al array `ARTICULOS`:

   ```js
   {
     href: "articulos/articulo-N.html",   // ruta de tu archivo
     portada: "TEXTO",                     // texto corto del degradado (p. ej. "IA")
     clasePortada: "portada-7",            // clase de color en css/styles.css
     categoria: "Categoría",               // p. ej. "Machine Learning"
     fecha: "08 · 2026",
     titulo: "Título del artículo",
     resumen: "Una frase corta para la tarjeta.",
   },
   ```

3. Si quieres un color de portada nuevo, agrega una clase `.portada-N` en `css/styles.css` (o reutiliza `portada-1` … `portada-7`).
4. Guarda, haz push y listo: la card aparece automáticamente.

> El orden del array es el orden en que se muestran las tarjetas.

## Cómo agregar una infografía

1. Pon el archivo (`.svg` preferentemente) en la carpeta `infografias/`.
2. En `index.html`, dentro de `<div class="carrusel-pista" id="pista-infos">`, copia un bloque `<a class="tarjeta-info">…</a>` y ajusta:
   - `href` y `src` → ruta del archivo nuevo
   - `data-pswp-width` / `data-pswp-height` → dimensiones reales de la imagen (las lee del SVG o de las propiedades `width`/`height`)
   - `alt` y `.info-titulo` → título visible
3. No hace falta tocar JS ni CSS: flechas, puntos y el visor con zoom se adaptan solos.

> Consejo: los SVG grandes (>2 MB) tardan en cargar; se usan con `loading="lazy"` para no bloquear el resto de la página.

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub (p. ej. `Sitio-web-revista`).
2. Sube todos los archivos a la rama `main` (en la raíz del repo):
   ```bash
   git init
   git add .
   git commit -m "Revista IA: sitio inicial"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/Sitio-web-revista.git
   git push -u origin main
   ```
3. En el repo: **Settings → Pages → Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` / `(root)` → **Save**
4. En unos minutos estará en: `https://TU-USUARIO.github.io/Sitio-web-revista/`

> Todas las rutas son relativas, así que el sitio funciona igual en local, en GitHub Pages y en cualquier subcarpeta. Las librerías de volteo (page-flip) y de visor (PhotoSwipe) están incluidas en el repo (sin CDN), por lo que no depende de servicios externos.

## Analítica (Google Tag Manager)

- Contenedor: `GTM-5WLS67NW`.
- El snippet va en **todas** las páginas: en el `<head>` (con el script `gtm.js`) y un `<noscript>` inmediatamente después de `<body>`.
- Si creas una página nueva, copia ambos bloques desde `index.html` o `articulos/plantilla.html`.

## Verificar en local

Abre `index.html` directamente en el navegador o sirve la carpeta con cualquier servidor estático:

```bash
# con Python
python -m http.server 8000
# o con Node
npx serve .
```

Luego visita `http://localhost:8000`.

> Consejo: al probar con capturas de pantalla automatizadas (Chrome headless), las fuentes externas de Google Fonts pueden hacer que el screenshot salga antes de que el lector inicialice. En uso normal no afecta.
