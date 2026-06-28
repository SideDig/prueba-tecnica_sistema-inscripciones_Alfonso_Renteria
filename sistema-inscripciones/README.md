# Sistema de Inscripciones — Angular

Proyecto frontend en Angular para gestionar el registro y seguimiento de alumnos en programas academicos

## Cómo correrlo

Para tener la aplicacion corriendo en local, asegurar de tener Node.js instalado, y ejecutar los siguientes comandos en la terminal:

---

cd sistema-inscripciones
npm install
ng serve - npm start

---

Abre el navegador en `http://localhost:4200`

En el caso de no tienes Angular CLI instalado globalmente: `npx ng serve`

## Qué incluye

- Registro de alumnos con nombre, empresa, programa y fecha de ingreso (El formulario es reactivo con validaciones)
- Listado que se puede filtrar por estatus y por programa, con paginación de 10 registros por pagina
- Modal para cambiar el estatus de un alumno con campo obligatorio de motivo
- Historial de todos los cambios de estatus por alumno
- Tarjetas de resumen con conteo de activos, bajas por empresa y bajas por programa
- Persistencia en `localStorage` (los datos se guardan aunque se refresque la pagina)
- Diseño responsive para escritorio y celular

## Estructura del proyecto

Esta es la estructura que para mi parece la adecuada para el proyecto, ya que separa cada componente en su propia carpeta y dentro de cada carpeta se encuentra el componente, el modelo, el servicio y el CSS

```
src/app/
├── models/
│   └── student.model.ts        # Interfaces: Student, StatusHistory, Program, Company
├── services/
│   └── student.service.ts      # Estado central con BehaviorSubject + localStorage
└── components/
    ├── resumen/                 # Tarjetas de conteo
    ├── registro/                # Formulario para el registro de alumnos
    └── alumnos/                 # Tabla, filtros, paginador y modales
```

---

## Decisiones de diseño

**Standalone components en lugar de NgModules**
Angular 19 ya soporta componentes independientes sin necesidad de declarar un modulo por componente para un proyecto de este tamaño lo hace mas limpio y directo

**BehaviorSubject**
En lugar de pasar datos entre componentes con `@Input/@Output`, todos los componentes se suscriben al mismo observable del servicio. Así cuando se registra un alumno o se cambia su estatus, el listado y las tarjetas de resumen se actualizan solos sin necesidad de recargar

**localStorage**
El requisito permitia trabajar con mock data osea datos simulador, y opte por localStorage porque los datos persisten entre recargas de pagina, lo que hace la demo más realista que solo tener datos en memoria

**CSS nativo en lugar de Angular Material o Tailwind**
Decidi no agregar dependencias extra, aunque conosco y eh utilizado Angular Material y TailwindCSS, considero que con CSS Grid, Flexbox y media queries se logra el diseño 100% responsive en todas las pantallas sin aumentar el peso del proyecto ni depender de versiones de librerias externas aunque en proyectos mas grandes si consideraria usar una libreria de componentes o un framework CSS dependiendo del caso ya que ahorraria mucho tiempo

**ReactiveFormsModule para el formulario**
Permite definir las validaciones en el TypeScript y no en el HTML, lo que hace el código más fácil de leer y de probar y de mantener ya que las validaciones estan en el mismo lugar que la logica del formulario y no divididas en dos archivos distintos

## Supuestos que tome

- El catalogo de estatus es fijo: `activo`, `baja_empresa`, `baja_programa`, `egresado`, `inscrito`, `reingreso`, `suspendido` son los mismos que los del CSV
- Un alumno pertenece a una sola empresa y un solo programa no se maneja cambio de empresa o programa, solo de estatus
- El campo de motivo es obligatorio para registrar un cambio de estatus, no se permite dejarlo vacio.
- Las tarjetas de resumen solo muestran los tres conteos especificados en el requerimiento (activos, bajas empresa, bajas programa) Los demas estatus no aparecen en el resumen pero sí en la tabla.
- La fecha de inscripción se captura manualmente y el campo viene pre-llenado con la fecha actual como valor por defecto.
