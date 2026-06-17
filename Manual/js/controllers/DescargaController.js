/* CAPA DE CONTROLADOR — DescargaController
   SRP: maneja el evento de descarga. Usa el servicio para los pasos y el archivo,
   y la Vista para el progreso. No sabe de dónde salen los datos (DIP). */
window.SIREN = window.SIREN || {};
SIREN.controllers = SIREN.controllers || {};
SIREN.controllers.DescargaController = function (descargaService, vista) {
  function entregar(archivo) {
    var url = URL.createObjectURL(archivo.blob);
    var a = document.createElement("a");
    a.href = url; a.download = archivo.nombre;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  return {
    init: function () {
      var btn = vista.botonDescarga();
      if (!btn) return;
      btn.addEventListener("click", function () {
        btn.disabled = true;
        vista.prepararProgreso();
        var pasos = descargaService.pasos();
        var pct = 0, i = 0;
        var timer = setInterval(function () {
          pct += 4;
          var label = null;
          if (i < pasos.length && pct >= pasos[i][0]) { label = pasos[i][1]; i++; }
          vista.progreso(pct, label);
          if (pct >= 100) {
            clearInterval(timer);
            entregar(descargaService.crearArchivo());
            btn.disabled = false;
            btn.textContent = "⬇ Descargar de nuevo";
          }
        }, 110);
      });
    }
  };
};
