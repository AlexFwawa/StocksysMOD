/* CAPA DE SERVICIOS — ContenidoService (DIP: recibe el ContenidoRepository). */
window.SIREN = window.SIREN || {};
SIREN.services = SIREN.services || {};
SIREN.services.ContenidoService = function (contenidoRepository) {
  return {
    beneficios: function(){ return contenidoRepository.beneficios(); },
    rubros: function(){ return contenidoRepository.rubros(); },
    funciones: function(){ return contenidoRepository.funciones(); }
  };
};
