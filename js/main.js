// ============================================
// REVISTA DIGITAL DE IA - JS GLOBAL
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initMenuMovil();
  initAnioActual();
  pintarArticulos();
});

// Pinta las tarjetas de artículos desde js/articulos.js
function pintarArticulos() {
  const grid = document.getElementById("grid-articulos");
  if (!grid || typeof ARTICULOS === "undefined") return;

  grid.innerHTML = ARTICULOS.map(
    (a) => `
    <a class="tarjeta" href="${a.href}">
      <div class="tarjeta-portada ${a.clasePortada}">${a.portada}</div>
      <div class="tarjeta-cuerpo">
        <div class="tarjeta-meta">
          <span class="categoria">${a.categoria}</span>
          <span>${a.fecha}</span>
        </div>
        <h3>${a.titulo}</h3>
        <p>${a.resumen}</p>
        <span class="leer">Leer artículo</span>
      </div>
    </a>`
  ).join("");
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
