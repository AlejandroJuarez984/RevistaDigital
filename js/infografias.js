// ============================================
// INFOGRAFÍAS - Carrusel + visor con zoom
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initCarruselInfografias();
  initVisorInfografias();
});

// ---------- Carrusel con flechas y puntos ----------
function initCarruselInfografias() {
  const pista = document.getElementById("pista-infos");
  const puntos = document.getElementById("puntos-infos");
  const botones = document.querySelectorAll(".carrusel-btn");

  if (!pista || !botones.length) return;

  const tarjetas = Array.from(pista.querySelectorAll(".tarjeta-info"));
  if (!tarjetas.length) return;

  // Puntos indicadores (uno por infografía)
  tarjetas.forEach((_, i) => {
    const punto = document.createElement("button");
    punto.type = "button";
    punto.setAttribute("aria-label", `Ir a infografía ${i + 1}`);
    if (i === 0) punto.classList.add("activo");
    punto.addEventListener("click", () => {
      tarjetas[i].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    });
    puntos.appendChild(punto);
  });

  const dots = Array.from(puntos.children);

  function actualizar() {
    // Flechas: deshabilitadas en los extremos
    const maxScroll = pista.scrollWidth - pista.clientWidth;
    botones.forEach((btn) => {
      const dir = Number(btn.dataset.dir);
      btn.disabled = dir < 0 ? pista.scrollLeft <= 2 : pista.scrollLeft >= maxScroll - 2;
    });

    // Punto activo: tarjeta más cercana al inicio visible
    let activa = 0;
    let menorDist = Infinity;
    tarjetas.forEach((tarjeta, i) => {
      const dist = Math.abs(tarjeta.offsetLeft - pista.offsetLeft - pista.scrollLeft);
      if (dist < menorDist) {
        menorDist = dist;
        activa = i;
      }
    });
    dots.forEach((dot, i) => dot.classList.toggle("activo", i === activa));
  }

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const ancho = tarjetas[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(pista).gap) || 24;
      pista.scrollBy({
        left: (ancho + gap) * Number(btn.dataset.dir),
        behavior: "smooth",
      });
    });
  });

  let pendiente = false;
  pista.addEventListener(
    "scroll",
    () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        actualizar();
        pendiente = false;
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", actualizar);
  actualizar();
}

// ---------- Visor a pantalla completa (PhotoSwipe) ----------
function initVisorInfografias() {
  if (typeof PhotoSwipeLightbox === "undefined" || typeof PhotoSwipe === "undefined") return;

  const lightbox = new PhotoSwipeLightbox({
    gallery: "#pista-infos",
    children: "a.tarjeta-info",
    pswpModule: PhotoSwipe,
    showHideAnimationType: "zoom",
    bgOpacity: 0.92,
    maxZoomLevel: 4,
  });

  lightbox.init();
}
