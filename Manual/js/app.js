/* PUNTO DE ENTRADA / COMPOSITION ROOT
   Único lugar que conoce las implementaciones concretas: las crea y las INYECTA
   hacia arriba (Persistencia -> Servicios -> Controladores). El resto de las
   capas depende de abstracciones, no de concreciones (Inversión de Dependencias). */
(function (SIREN) {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    // 1) Persistencia (repositorios)
    var recursoRepo   = SIREN.persistence.RecursoRepository();
    var contenidoRepo = SIREN.persistence.ContenidoRepository();
    var demoRepo      = SIREN.persistence.DemoRepository();

    // 2) Servicios (lógica de negocio) — reciben sus repositorios
    var recursoService    = SIREN.services.RecursoService(recursoRepo);
    var contenidoService  = SIREN.services.ContenidoService(contenidoRepo);
    var descargaService   = SIREN.services.DescargaService(demoRepo);
    var navegacionService = SIREN.services.NavegacionService();

    // 3) Presentación
    var vista = SIREN.ui.Vista();

    // 4) Controladores — reciben servicios + vista, y arrancan
    SIREN.controllers.PaginaController(contenidoService, recursoService, vista).init();
    SIREN.controllers.NavegacionController(navegacionService, recursoService, vista).init();
    SIREN.controllers.DescargaController(descargaService, vista).init();
  });
})(window.SIREN = window.SIREN || {});
