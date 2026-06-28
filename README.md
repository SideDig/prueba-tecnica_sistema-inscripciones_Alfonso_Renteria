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
