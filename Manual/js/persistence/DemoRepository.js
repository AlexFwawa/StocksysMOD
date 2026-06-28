/* CAPA DE PERSISTENCIA — DemoRepository
   SRP: provee los datos de la descarga demo (pasos + archivo). */
window.SIREN = window.SIREN || {};
SIREN.persistence = SIREN.persistence || {};
SIREN.persistence.DemoRepository = function () {
  var PASOS = [ [25,"Preparando la demo…"], [55,"Empaquetando archivos…"], [85,"Casi listo…"], [100,"✓ Descarga lista"] ];
  var ARCHIVO = {
    nombre: "SIREN-demo-LEEME.txt",
    contenido:
      "SIREN - Gestion de stock y ventas\n" +
      "Un producto de BFP SYSTEM\n" +
      "==================================\n\n" +
      "Gracias por probar SIREN!\n\n" +
      "SIREN es un sistema de gestion de stock y ventas para cualquier negocio\n" +
      "que necesite controlar su inventario, sin importar el rubro.\n\n" +
      "Esta es una descarga de demostracion. Para una demo a medida para tu\n" +
      "empresa, escribinos: contacto@bfpsystem.com\n\n" +
      "BFP SYSTEM - 2026\n"
  };
  return {
    pasos: function(){ return PASOS.slice(); },
    archivo: function(){ return { nombre: ARCHIVO.nombre, contenido: ARCHIVO.contenido }; }
  };
};
