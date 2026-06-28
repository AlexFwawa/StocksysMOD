# SIREN — Sitio del producto (BFP SYSTEM)

Single Page Application (HTML + CSS + JavaScript, **sin frameworks ni build**) que
presenta **SIREN**, el sistema de gestión de stock y ventas de **BFP SYSTEM**.
Es un sitio comercial: comunica el producto para cualquier rubro que maneje stock,
permite **descargar** la demo y **ver/descargar** el material. No tiene login.

## Cómo correrla con VS Code

1. Abrí la carpeta `SIREN_SPA` en **Visual Studio Code**.
2. Instalá la extensión **Live Server**.
3. Clic derecho en `index.html` → **"Open with Live Server"**.

## Arquitectura en capas (+ SOLID)

El código JavaScript está dividido en las mismas capas que el backend del sistema
(las vistas en el material de Programación IV): **Controlador → Servicio → Persistencia**.

```
js/
├── persistence/      ← PERSISTENCIA (repositorios): de dónde salen los datos
│   ├── RecursoRepository.js
│   ├── ContenidoRepository.js
│   └── DemoRepository.js
├── services/         ← SERVICIOS: lógica de negocio
│   ├── RecursoService.js
│   ├── ContenidoService.js
│   ├── DescargaService.js
│   └── NavegacionService.js
├── ui/               ← PRESENTACIÓN: única capa que toca el DOM
│   └── Vista.js
├── controllers/      ← CONTROLADORES: traducen eventos del usuario
│   ├── PaginaController.js
│   ├── NavegacionController.js
│   └── DescargaController.js
└── app.js            ← COMPOSITION ROOT: crea e inyecta las dependencias
```

Flujo: el **Controlador** recibe la acción del usuario → llama al **Servicio**
(lógica) → el Servicio pide los datos a la **Persistencia** → la **Vista** los
muestra. Es el mismo patrón Controller / Service / Repository del backend.

### Cómo se aplica S.O.L.I.D.

- **S — Responsabilidad única:** cada archivo hace una sola cosa (un repositorio
  sólo da datos, un servicio sólo tiene lógica, la Vista sólo toca el DOM, cada
  controlador maneja un tipo de evento).
- **O — Abierto/Cerrado:** la página se arma recorriendo datos. Agregar un
  beneficio, un rubro o un recurso en la persistencia actualiza la web **sin
  modificar** servicios ni controladores.
- **L — Sustitución de Liskov:** los repositorios cumplen un contrato fijo
  (`obtenerTodos`, `obtenerPorId`…). Una versión que lea de una API HTTP podría
  reemplazar a la versión en memoria sin romper nada.
- **I — Segregación de interfaces:** hay servicios chicos y enfocados
  (recursos, contenido, descarga, navegación) en lugar de un único objeto que
  haga todo.
- **D — Inversión de dependencias:** los servicios reciben sus repositorios y los
  controladores reciben sus servicios y la Vista. Las dependencias se **inyectan**
  desde `app.js` (composition root); ninguna capa crea sus propias dependencias.

## Contenido

- **Inicio / Beneficios / Rubros / Funciones:** presentación del producto (para cualquier rubro).
- **Probá SIREN:** descarga **simulada** de la demo (con fines de presentación).
- **Recursos:** guía de uso, ficha técnica y presentación — se **ven online** o se **descargan**.

> La descarga del sistema es una **simulación**; descarga un archivo de texto de
> demostración. El material (.docx) sí son archivos reales.
