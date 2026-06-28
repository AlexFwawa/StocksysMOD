/* CAPA DE CONTROLADOR — PaginaController
   SRP: orquesta el armado de la página. Pide datos a los servicios y delega el
   render en la Vista. OCP: agregar beneficios/rubros/recursos en la persistencia
   actualiza la página sin modificar este controlador. */
window.SIREN = window.SIREN || {};
SIREN.controllers = SIREN.controllers || {};
SIREN.controllers.PaginaController = function (contenidoService, recursoService, vista) {
  return {
    init: function () {
      vista.renderBeneficios(contenidoService.beneficios());
      vista.renderRubros(contenidoService.rubros());
      vista.renderFunciones(contenidoService.funciones());
      vista.renderRecursos(recursoService.listar());
    }
  };
};
