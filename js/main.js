// ============================================
// REVISTA DIGITAL DE IA - JS GLOBAL
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initMenuMovil();
  initAnioActual();
  pintarArticulos();
});

// Pinta las tarjetas de artículos desde js/articulos.js
// Orden: numérico por archivo (articulo-5 antes que articulo-10)
function pintarArticulos() {
  const grid = document.getElementById("grid-articulos");
  if (!grid || typeof ARTICULOS === "undefined") return;

  const ordenados = [...ARTICULOS].sort(
    (a, b) => extraerNumero(a.href) - extraerNumero(b.href)
  );

  grid.innerHTML = ordenados
    .map((a) => {
      // Imagen opcional de fondo (si existe a.imagen); si no, solo degradado
      const conImagen = a.imagen ? " con-imagen" : "";
      const estilo = a.imagen
        ? ` style="background-image:url('${a.imagen}')"`
        : "";
      return `
    <a class="tarjeta" href="${a.href}">
      <div class="tarjeta-portada ${a.clasePortada}${conImagen}"${estilo}>${a.portada}</div>
      <div class="tarjeta-cuerpo">
        <div class="tarjeta-meta">
          <span class="categoria">${a.categoria}</span>
          <span>${a.fecha}</span>
        </div>
        <h3>${a.titulo}</h3>
        <p>${a.resumen}</p>
        <span class="leer">Leer artículo</span>
      </div>
    </a>`;
    })
    .join("");
}

// Extrae el número de "articulo-N.html" → N (si no hay, queda al final)
function extraerNumero(href) {
  const m = String(href).match(/articulo-(\d+)/i);
  return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER;
}

// Menú hamburguesa móvil
function initMenuMovil() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    toggle.setAttribute("aria-expanded", String(abierto));
  });

  // Cerrar el menú al hacer clic en un enlace
  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      menu.classList.remove("abierto");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Año dinámico en el footer
function initAnioActual() {
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
}
