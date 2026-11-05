# Revista IA — Sitio web estático

Revista digital con artículos sobre **Inteligencia Artificial**, elaborada como trabajo grupal. Sitio 100% estático (HTML, CSS y JS puros), listo para desplegarse en **GitHub Pages**.

Cada artículo se lee como una **revista que se abre y cambia de página** (efecto de volteo animado).

## Estructura

```
├── index.html                    # Portada: hero + tarjetas de artículos
├── css/
│   ├── styles.css                # Estilos globales (tema, navbar, footer, tarjetas)
│   └── revista.css               # Lector: páginas, portada, controles de volteo
├── js/
│   ├── main.js                   # Menú móvil y año dinámico
│   ├── lectura.js                # Inicializa la revista (volteo, contador, flechas)
│   └── vendor/
│       └── page-flip.browser.min.js  # Librería de volteo (page-flip, MIT, incluida)
├── articulos/
│   ├── plantilla.html            # Plantilla para crear nuevos artículos
│   └── articulo-1..5.html        # Artículos de ejemplo
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

## Cómo integrar un artículo nuevo (quien mantiene el sitio)

1. Coloca el archivo en `articulos/`.
2. En `index.html`, copia una tarjeta existente dentro de `<div class="grid-articulos">` y actualiza:
   - `href` → `articulos/articulo-N.html`
   - clase de portada (`portada-1` … `portada-5`; puedes añadir `portada-6` en `css/styles.css`)
   - categoría, título, resumen y meta.
3. Guarda y listo.

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

> Todas las rutas son relativas, así que el sitio funciona igual en local, en GitHub Pages y en cualquier subcarpeta. La librería de volteo está incluida en el repo (sin CDN), por lo que no depende de servicios externos.

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
