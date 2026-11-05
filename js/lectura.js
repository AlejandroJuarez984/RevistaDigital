// ============================================
// LECTOR DE REVISTA - inicializa page-flip
// ============================================

const _erroresLectura = [];
window.addEventListener("error", (e) => {
  _erroresLectura.push(`${e.message} @${(e.filename || "").split("/").pop()}:${e.lineno}`);
});

// Depuración: ?debug=1 muestra métricas en pantalla (aunque el init falle)
if (location.search.indexOf("debug") !== -1) {
  setTimeout(() => {
    const flip = window._flip;
    const cont = document.getElementById("revista");
    const zona = document.querySelector(".zona-revista");
    const d = document.createElement("div");
    d.style.cssText =
      "position:fixed;left:0;top:0;z-index:9999;background:#000;color:#0f0;font:12px monospace;padding:6px;white-space:pre;max-width:100%;";
    d.textContent = flip
      ? JSON.stringify({
          ori: flip.getOrientation(),
          innerW: window.innerWidth,
          zonaW: zona ? zona.offsetWidth : null,
          bookW: cont ? cont.offsetWidth : null,
          idx: flip.getCurrentPageIndex(),
          total: flip.getPageCount(),
          errores: _erroresLectura,
        })
      : JSON.stringify({ flip: "NO CREADO", errores: _erroresLectura, St: typeof St });
    document.body.appendChild(d);
  }, 3500);
}

document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("revista");
  if (!cont) return;

  // Fallback: si la librería no cargó, mostrar páginas en modo lista
  if (typeof St === "undefined" || typeof St.PageFlip !== "function") {
    document.body.classList.add("revista-estatica");
    return;
  }

  const paginas = cont.querySelectorAll(".pagina");
  if (!paginas.length) return;

  // Numerar páginas de contenido (portada y contraportada quedan sin número)
  // y construir etiquetas para el contador ( Portada | 1 | 2 | ... | Fin )
  const etiquetas = [];
  let n = 0;
  paginas.forEach((p) => {
    if (p.dataset.density === "hard") {
      etiquetas.push(etiquetas.length === 0 ? "Portada" : "Fin");
      return;
    }
    n++;
    etiquetas.push(String(n));
    const num = document.createElement("div");
    num.className = "pagina-num";
    num.textContent = n;
    p.appendChild(num);
  });
  const totalContenido = n;

  const flip = new St.PageFlip(cont, {
    width: 480,
    height: 660,
    size: "stretch",
    minWidth: 300,
    maxWidth: 1100,
    minHeight: 410,
    maxHeight: 1500,
    drawShadow: true,
    maxShadowOpacity: 0.55,
    flippingTime: 800,
    usePortrait: true,
    autoSize: true,
    showCover: true,
    startZIndex: 0,
    mobileScrollSupport: true,
    clickEventForward: true,
    useMouseEvents: true,
    swipeDistance: 30,
    disableFlipByClick: false,
  });

  flip.loadFromHTML(paginas);
  window._flip = flip;

  // --- Contador de páginas ---
  const contador = document.getElementById("contador");
  const btnPrev = document.querySelector(".lector-flecha.prev");
  const btnNext = document.querySelector(".lector-flecha.next");

  const actualizar = () => {
    const idx = flip.getCurrentPageIndex();
    const esNum = (v) => v !== undefined && /^\d+$/.test(v);
    const etiqueta = (i) => etiquetas[i];

    if (contador) {
      if (flip.getOrientation() === "portrait") {
        const actual = etiqueta(idx);
        contador.textContent = esNum(actual)
          ? `Página ${actual} de ${totalContenido}`
          : actual || "";
      } else if (idx === 0) {
        contador.textContent = `Portada · ${totalContenido} págs.`;
      } else {
        const a = etiqueta(idx);
        const b = etiqueta(idx + 1);
        if (esNum(a) && esNum(b)) {
          contador.textContent = `Páginas ${a}\u2013${b} de ${totalContenido}`;
        } else if (esNum(a)) {
          contador.textContent = `Página ${a} de ${totalContenido}`;
        } else {
          contador.textContent = a || "";
        }
      }
    }

    if (btnPrev) btnPrev.disabled = idx <= 0;
    if (btnNext) btnNext.disabled = idx >= flip.getPageCount() - 1;
  };

  flip.on("flip", actualizar);
  flip.on("changeOrientation", actualizar);
  actualizar();

  // --- Flechas ---
  if (btnPrev) btnPrev.addEventListener("click", () => flip.flipPrev());
  if (btnNext) btnNext.addEventListener("click", () => flip.flipNext());

  // --- Teclado ---
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") flip.flipPrev();
    if (e.key === "ArrowRight") flip.flipNext();
  });

  // --- Apertura automática de la revista ---
  let interacto = false;
  document.addEventListener("pointerdown", () => { interacto = true; }, { once: true });
  document.addEventListener("keydown", () => { interacto = true; }, { once: true });

  const sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setTimeout(() => {
    if (interacto || flip.getCurrentPageIndex() !== 0) return;
    if (sinAnimacion) flip.turnToPage(1);
    else flip.flipNext();
  }, 750);
});
