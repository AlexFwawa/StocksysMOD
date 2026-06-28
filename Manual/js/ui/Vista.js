/* CAPA DE PRESENTACIÓN — Vista
   SRP: única responsable de tocar el DOM. Los controladores orquestan y delegan
   el render en la Vista; así la lógica de negocio no depende del DOM. */
window.SIREN = window.SIREN || {};
SIREN.ui = SIREN.ui || {};
SIREN.ui.Vista = function () {
  function el(id) { return document.getElementById(id); }
  function tarjeta(item) {
    return '<div class="card"><div class="card-ic">' + item.icono + '</div>' +
           '<h3>' + item.titulo + '</h3><p>' + item.texto + '</p></div>';
  }
  function tarjetaRecurso(r) {
    return '<div class="card card-doc"><div class="card-ic">' + r.icono + '</div>' +
           '<h3>' + r.titulo + '</h3><p>' + r.descripcion + '</p>' +
           '<div class="card-actions">' +
             '<button class="btn btn-primary" data-recurso="' + r.id + '">Ver</button>' +
             '<a class="btn btn-ghost" href="manuales/' + r.docx + '" download>Descargar</a>' +
           '</div></div>';
  }
  return {
    renderBeneficios: function (lista) { var c = el("beneficiosGrid"); if (c) c.innerHTML = lista.map(tarjeta).join(""); },
    renderFunciones:  function (lista) { var c = el("funcionesGrid");  if (c) c.innerHTML = lista.map(tarjeta).join(""); },
    renderRubros:     function (lista) { var c = el("rubrosWrap"); if (c) c.innerHTML = lista.map(function (r) { return '<span class="rubro">' + r + '</span>'; }).join(""); },
    renderRecursos:   function (lista) { var c = el("recursosGrid"); if (c) c.innerHTML = lista.map(tarjetaRecurso).join(""); },
    mostrarVista: function (vista, vistas) {
      vistas.forEach(function (n) { var v = el("view-" + n); if (v) v.hidden = (n !== vista); });
    },
    scrollA: function (id) {
      if (!id || id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      var t = el(id); if (t) { t.scrollIntoView({ behavior: "smooth" }); } else { window.scrollTo({ top: 0 }); }
    },
    irArriba: function () { window.scrollTo({ top: 0 }); },
    abrirLector: function (htmlFile, titulo) {
      var f = el("readerFrame"); if (f) f.setAttribute("src", "manuales/" + htmlFile);
      var t = el("readerTitle"); if (t) t.textContent = titulo || "Documento";
    },
    cerrarLector: function () { var f = el("readerFrame"); if (f) f.setAttribute("src", "about:blank"); },
    prepararProgreso: function () { var p = el("dlProgress"); if (p) p.hidden = false; var b = el("dlBar"); if (b) b.style.width = "0%"; },
    progreso: function (pct, label) {
      var b = el("dlBar"); if (b) b.style.width = Math.min(pct, 100) + "%";
      if (label != null) { var s = el("dlStatus"); if (s) s.textContent = label; }
    },
    botonDescarga: function () { return el("dlBtn"); }
  };
};
