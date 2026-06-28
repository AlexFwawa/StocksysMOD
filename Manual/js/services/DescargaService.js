/* CAPA DE SERVICIOS — DescargaService
   SRP: arma la descarga demo. DIP: recibe el DemoRepository. */
window.SIREN = window.SIREN || {};
SIREN.services = SIREN.services || {};
SIREN.services.DescargaService = function (demoRepository) {
  return {
    pasos: function () { return demoRepository.pasos(); },
    crearArchivo: function () {
      var a = demoRepository.archivo();
      return { nombre: a.nombre, blob: new Blob([a.contenido], { type: "text/plain;charset=utf-8" }) };
    }
  };
};
