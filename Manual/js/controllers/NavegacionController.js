/* CAPA DE CONTROLADOR — NavegacionController
   SRP: traduce eventos del usuario (clicks) en cambios de vista y apertura del
   lector. DIP: recibe los servicios de navegación y recursos, y la Vista. */
window.SIREN = window.SIREN || {};
SIREN.controllers = SIREN.controllers || {};
SIREN.controllers.NavegacionController = function (navegacionService, recursoService, vista) {
  function ir(vistaNombre, scrollTarget) {
    var v = navegacionService.cambiar(vistaNombre);
    vista.mostrarVista(v, navegacionService.vistas());
    if (v === "home") { vista.scrollA(scrollTarget); } else { vista.irArriba(); }
  }
  return {
    init: function () {
      document.addEventListener("click", function (e) {
        var nav = e.target.closest("[data-view]");
        if (nav) { e.preventDefault(); ir(nav.getAttribute("data-view"), nav.getAttribute("data-scroll")); return; }
        var ver = e.target.closest("[data-recurso]");
        if (ver) {
          e.preventDefault();
          var r = recursoService.buscar(ver.getAttribute("data-recurso"));
          if (r) { vista.abrirLector(r.html, r.titulo); ir("lector"); }
          return;
        }
        var back = e.target.closest("#readerBack");
        if (back) { e.preventDefault(); vista.cerrarLector(); ir("manuales"); }
      });
      ir("home");
    }
  };
};
