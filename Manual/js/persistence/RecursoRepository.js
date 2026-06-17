/* CAPA DE PERSISTENCIA — RecursoRepository
   SRP: única responsabilidad, proveer los datos de los recursos (documentos).
   LSP/DIP: contrato { obtenerTodos(), obtenerPorId(id) }. Una implementación
   que consuma una API HTTP podría reemplazar a ésta sin tocar los servicios. */
window.SIREN = window.SIREN || {};
SIREN.persistence = SIREN.persistence || {};
SIREN.persistence.RecursoRepository = function () {
  var RECURSOS = [
    { id: "guia", titulo: "Guía de uso", icono: "📘",
      descripcion: "Cómo operar SIREN paso a paso: acceso, productos, movimientos e informes.",
      html: "manual-usuario.html", docx: "SIREN_Manual_Usuario.docx" },
    { id: "ficha", titulo: "Ficha técnica", icono: "🛠️",
      descripcion: "Características y capacidades del sistema para tu equipo de sistemas.",
      html: "manual-tecnico.html", docx: "SIREN_Manual_Tecnico.docx" },
    { id: "presentacion", titulo: "Presentación del proyecto", icono: "📄",
      descripcion: "Documento con el alcance y los resultados de SIREN.",
      html: "informe-tfi.html", docx: "SIREN_Informe_Final_TFI.docx" }
  ];
  return {
    obtenerTodos: function () { return RECURSOS.slice(); },
    obtenerPorId: function (id) {
      for (var i = 0; i < RECURSOS.length; i++) { if (RECURSOS[i].id === id) return RECURSOS[i]; }
      return null;
    }
  };
};
