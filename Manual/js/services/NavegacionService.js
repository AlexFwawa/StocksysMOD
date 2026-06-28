/* CAPA DE SERVICIOS — NavegacionService
   SRP: gestiona el estado de la navegación entre vistas (lógica, sin DOM). */
window.SIREN = window.SIREN || {};
SIREN.services = SIREN.services || {};
SIREN.services.NavegacionService = function () {
  var VISTAS = ["home", "manuales", "lector"];
  var actual = "home";
  return {
    vistas: function(){ return VISTAS.slice(); },
    actual: function(){ return actual; },
    cambiar: function (v) { actual = (VISTAS.indexOf(v) === -1) ? "home" : v; return actual; }
  };
};
