# Prueba Técnica — Alfonso Rentería

Este repositorio contiene las tres partes de la prueba tecnica: consultas SQL, analisis en Python y una aplicación frontend en Angular

## Parte 1 — SQL

**NOTA:** dentro del archivo SQL se encuentra mas informacion detallada de cada una de las consultas, de la base de datos y de mi propuesta de indicador y el stored procedure

**Archivo:** `prueba_tecnica_sql_Alfonso_renteria.sql`

Contiene las consultas que se desarrollaron sobre la base de datos de inscripciones, no se requiere instalacion, solo importar o ejecutar el archivo en cualquier cliente MySQL en mi caso use laragon con HeidiSQL conectado a la base de datos

Las consultas cubren:

- Alumnos activos por empresa y programa
- Conteo de bajas por tipo (empresa / programa)
- Movimientos mensuales de altas y bajas
- Últimos estatus registrados por alumno con historial de cambios
- Propuesta de indicador
- Stored procedure

## Parte 2 — Python

**Archivo:** `analisis_inscripciones.ipynb`

Notebook de Jupyter con el análisis de los datos cargados desde la base de datos `sistema_inscripciones` en MySQL. Genera dos gráficas exportadas en la misma carpeta:

- `altas_vs_bajas_mensual.png`
- `estatus_por_programa.png`

**Requisito previo:** tener MySQL corriendo localmente (en mi caso usé Laragon) con la base de datos `sistema_inscripciones` creada y poblada.

**Para ejecutarlo:**

```bash
pip install pymysql sqlalchemy
pip install pandas matplotlib seaborn jupyter
python -m notebook analisis_inscripciones.ipynb
```

La conexión está configurada en: `mysql+pymysql://root:@localhost:3306/sistema_inscripciones`

---

## Parte 3 — Angular

**NOTA:** dentro del repositorio de angular se encuentra un archivo README.md con mas informacion detallada

**Carpeta:** `sistema-inscripciones/`

Aplicación web para registrar y dar seguimiento a alumnos, incluye formulario de registro, listado filtrable, cambio de estatus con historial y tarjetas de resumen

**Para ejecutarlo:**

```bash
cd sistema-inscripciones
npm install
ng serve o npm start
```

Abrir en `http://localhost:4200`

---

## Parte 4 — Preguntas conceptuales

### SQL

**Pregunta 1 — Tu tabla historial_estatus crece rápido. ¿Qué harías para que las consultas de historial no se vuelvan lentas con el tiempo?**

Lo primero que yo haria seria agregar indices en las columnas que mas se usan en los filtros: id_inscripcion y fecha_cambio, si la tabla en algun momento crece mucho, yo consideraria particionar por fecha osea por año o semestre para que las consultas solo lean el bloque relevante en lugar de que se escanee toda la tabla, tambien archivaria registros muy antiguos en una tabla historica separada y dejaria en la principal solo los ultimos meses

**Pregunta 2 — Un alumno aparece dos veces con estatus activo seguido en el historial, sin una baja intermedia. ¿Cómo detectarías ese problema y cómo lo evitarías desde el diseño?**

Para detectarlo yo usaria la funcion de ventana LAG() para comparar el estatus de cada fila con el de la fila anterior del mismo alumno, asi veo donde es que hay dos iguales consecutivo, y por ejemplo para evitarlo desde el diseño, pondria un trigger BEFORE INSERT en el historial_estatus para que valide que el nuevo estatus sea diferente al ultimo registrado de esa inscripcion y cancele si son iguales

---

### Python

**Pregunta 3 — Tienes un DataFrame con 50,000 registros de movimientos. Al hacer un groupby por programa y mes, algunos meses no aparecen para ciertos programas. ¿Qué causa eso y cómo lo resuelves?**

Eso pienso yo que pasa porque `groupby` solo agrupa los datos que existen, entonces si un programa no tuvo movimientos en un mes, ese mes simplemente no aparece en el resultado diria que la solucion es generar el rango de fechas completo

**Pregunta 4 — ¿Cuál es la diferencia entre usar merge y join en pandas? ¿Cuándo usarías cada uno?**

merge es mas flexible y ademas permite unir DataFrames por cualquier columna ademas podemos especificar, parecido al JOIN de SQL join une por el indice del DataFrame de forma predeterminada y es mas comodo cuando los datos ya estan indexados, yo usaria merge cuando quiero unir por columnas especificas y ya el join cuando ambos DataFrames ya comparten el mismo indice

---

### Angular

**Pregunta 5 — Tu componente de tabla de alumnos re-renderiza completo cada vez que cambias el estatus de uno solo. ¿Qué causaría eso y cómo lo optimizarías?**

Pasa por el ciclo de deteccion de cambios por defecto de Angular que revisa todo el arbol ante cualquier cosa para optimizarlo yo cambiaria la estrategia de deteccion a OnPush para que la tabla solo se renderice si cambian sus inputs tambien usaria un trackBy en el ngFor con el id_alumno, asi Angular solo refresca la fila que cambio de estatus y no vuelve a dibujar toda la tabla desde cero

**Pregunta 6 — ¿Dónde guardarías el estatus actual de los alumnos en una app Angular sin backend: en el componente directamente, en un Service compartido, o en localStorage? Justifica tu elección.**

En un service con BehaviorSubject, que es justo lo que hice en este proyecto lo guardaria en el service porque si lo guardo directo en el componente lo haria inaccesible para otros componentes lo mejor es guardarlo solo en localStorage sirve para persistencia pero no es reactivo, osea los demas componentes no se enteran del cambio en tiempo real el service combina las dos cosas estado compartido reactivo y lo podemos conectar a localStorage para que no se pierdan los datos al recargar.
