// ============================================
// REVISTA DIGITAL DE IA - JS GLOBAL
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initMenuMovil();
  initAnioActual();
});

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
