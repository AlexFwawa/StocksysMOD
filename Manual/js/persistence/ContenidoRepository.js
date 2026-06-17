/* CAPA DE PERSISTENCIA — ContenidoRepository
   SRP: provee el contenido comercial (beneficios, rubros, funciones). */
window.SIREN = window.SIREN || {};
SIREN.persistence = SIREN.persistence || {};
SIREN.persistence.ContenidoRepository = function () {
  var BENEFICIOS = [
    { icono:"⏱️", titulo:"Ahorrá tiempo", texto:"Automatizá el control de inventario y dejá atrás las cargas manuales y las planillas dispersas." },
    { icono:"🎯", titulo:"Menos errores", texto:"El stock se actualiza solo con cada movimiento. Siempre sabés cuánto tenés y dónde." },
    { icono:"📊", titulo:"Decisiones con datos", texto:"Un panel claro con tus indicadores clave para reponer a tiempo y vender más." },
    { icono:"🔒", titulo:"Seguro y confiable", texto:"Acceso protegido y tus datos resguardados. Cada operación queda registrada." },
    { icono:"🚀", titulo:"Fácil de usar", texto:"Interfaz simple y minimalista. Tu equipo lo opera con una capacitación breve." },
    { icono:"📈", titulo:"Crece con vos", texto:"Sumá productos, usuarios y funciones a medida que tu negocio se expande." }
  ];
  var RUBROS = ["Comercios y retail","Distribuidoras y mayoristas","Ferreterías","Farmacias y perfumerías","Gastronomía","Indumentaria","Repuestos y autopartes","Depósitos y logística","Servicios náuticos","y muchos más…"];
  var FUNCIONES = [
    { icono:"📦", titulo:"Productos y categorías", texto:"Cargá tu catálogo completo, organizado por categorías, con precios y descripciones." },
    { icono:"↕️", titulo:"Ingresos y egresos", texto:"Registrá entradas y salidas de mercadería; el stock se ajusta automáticamente." },
    { icono:"🧾", titulo:"Historial de movimientos", texto:"Consultá todo lo que entró y salió, cuándo y quién lo registró." },
    { icono:"📋", titulo:"Panel de control", texto:"Tus números importantes de un vistazo: stock total, movimientos del día y alertas." }
  ];
  return {
    beneficios: function(){ return BENEFICIOS.slice(); },
    rubros: function(){ return RUBROS.slice(); },
    funciones: function(){ return FUNCIONES.slice(); }
  };
};
