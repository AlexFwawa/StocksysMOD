/* CAPA DE SERVICIOS — RecursoService
   SRP: lógica de negocio de recursos. DIP: depende de una abstracción de
   repositorio que se le INYECTA (no lo crea ni conoce su implementación). */
window.SIREN = window.SIREN || {};
SIREN.services = SIREN.services || {};
SIREN.services.RecursoService = function (recursoRepository) {
  return {
    listar: function () { return recursoRepository.obtenerTodos(); },
    buscar: function (id) { return recursoRepository.obtenerPorId(id); }
  };
};
