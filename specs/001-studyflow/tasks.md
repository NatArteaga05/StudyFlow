# Tareas de implementación de StudyFlow

Estado: **IMPLEMENTATION autorizada hasta T4**. T1–T4 están completadas; T5–T42 permanecen pendientes. La autorización actual no incluye tareas posteriores.

Las tareas siguen el orden de dependencia y estiman 20–30 minutos cada una. Para cada comportamiento nuevo, primero se escriben sus pruebas y después se implementa.

## 1. Base del proyecto y dominio

- [x] **T1 — Preparar proyecto y entorno de pruebas (25 min)**
  - **Objetivo:** crear el esqueleto React + TypeScript + Vite y configurar pruebas de dominio, interfaz e IndexedDB.
  - **Archivos/módulos:** `studyflow/package.json`, `studyflow/package-lock.json`, `studyflow/vite.config.ts`, configuración TypeScript/Vitest, `studyflow/src/`, `tests/`.
  - **Dependencias:** ninguna.
  - **RF/CA relacionados:** base técnica; habilita RNF-01 y CA-19. Vitest, Testing Library, jsdom y `fake-indexeddb` se usan solo en desarrollo/pruebas; IndexedDB nativo es la persistencia de producción.
  - **Hecho cuando:** Vite está configurado y el entorno descubre y ejecuta una prueba mínima de configuración sin código de producto.

- [x] **T2 — Escribir pruebas de validación de materias (20 min)**
  - **Objetivo:** fijar validez, longitud máxima y equivalencia de nombres de materias.
  - **Archivos/módulos:** `tests/unit/domain/subjects.test.ts`.
  - **Dependencias:** T1.
  - **RF/CA relacionados:** RF-03–RF-04; CA-02.
  - **Hecho cuando:** las pruebas cubren nombre vacío, solo espacios, 100/101 caracteres, espacios exteriores, diferencias de mayúsculas y materias válidas distintas.

- [x] **T3 — Implementar validación de materias (20 min)**
  - **Objetivo:** implementar el validador y la clave normalizada que satisfacen T2.
  - **Archivos/módulos:** `studyflow/src/domain/subjects/validation.ts`, `studyflow/src/domain/subjects/types.ts`.
  - **Dependencias:** T2.
  - **RF/CA relacionados:** RF-03–RF-04; CA-02.
  - **Hecho cuando:** pasan las pruebas T2 y la comparación ignora mayúsculas/minúsculas y espacios exteriores sin alterar el nombre presentado, los acentos ni espacios interiores.

- [x] **T4 — Escribir pruebas de fechas y vencimientos (25 min)**
  - **Objetivo:** fijar la validación de fecha calendario, la fecha local de referencia y las clasificaciones límite.
  - **Archivos/módulos:** `tests/unit/domain/due-dates.test.ts`.
  - **Dependencias:** T1.
  - **RF/CA relacionados:** RF-10, RF-16–RF-17, RF-23–RF-26; CA-08, CA-12–CA-15.
  - **Hecho cuando:** las pruebas cubren fecha válida/imposible, ayer, hoy, hoy+3, hoy+4, cambio de mes/año, estado completado y fecha local sin conversión UTC; además consultan la misma fecha de entrega con dos valores de «hoy» locales en meses/años distintos, verifican la reclasificación y que la fecha de entrega de entrada permanece idéntica.

- [ ] **T5 — Implementar funciones de fechas y vencimiento (25 min)**
  - **Objetivo:** implementar funciones puras de validación, fecha local y clasificación según T4.
  - **Archivos/módulos:** `studyflow/src/domain/due-dates/date-only.ts`, `studyflow/src/domain/due-dates/classify.ts`.
  - **Dependencias:** T4.
  - **RF/CA relacionados:** RF-10, RF-16–RF-17, RF-23–RF-26; CA-08, CA-12–CA-15.
  - **Hecho cuando:** pasan las pruebas T4 y la clasificación se calcula al consultar sin guardarse como dato persistido.

- [ ] **T6 — Escribir pruebas de validación de actividades (25 min)**
  - **Objetivo:** fijar validación de campos obligatorios, longitud, tipos y estado inicial.
  - **Archivos/módulos:** `tests/unit/domain/activities.test.ts`.
  - **Dependencias:** T1, T3, T5.
  - **RF/CA relacionados:** RF-07–RF-11, RF-15–RF-17; CA-03–CA-05, CA-07–CA-08, CA-16.
  - **Hecho cuando:** las pruebas cubren campos requeridos, título vacío/de solo espacios, 100/101 caracteres, descripción opcional, materia existente, tipos permitidos, títulos repetidos y estado pendiente inicial.

- [ ] **T7 — Implementar validación de actividades (20 min)**
  - **Objetivo:** implementar tipos y validadores de actividad definidos por T6.
  - **Archivos/módulos:** `studyflow/src/domain/activities/types.ts`, `studyflow/src/domain/activities/validation.ts`.
  - **Dependencias:** T6.
  - **RF/CA relacionados:** RF-07–RF-11, RF-15–RF-17; CA-03–CA-05, CA-07–CA-08, CA-16.
  - **Hecho cuando:** pasan las pruebas T6, no hay unicidad para títulos y toda actividad nueva recibe estado `pendiente`.

## 2. IndexedDB y repositorios

- [ ] **T8 — Escribir pruebas del esquema IndexedDB (20 min)**
  - **Objetivo:** fijar almacenes, claves e índices del modelo aprobado en el PLAN.
  - **Archivos/módulos:** `tests/integration/persistence/database.test.ts`.
  - **Dependencias:** T1.
  - **RF/CA relacionados:** RF-01–RF-02, RF-04, RF-07; CA-01–CA-03.
  - **Hecho cuando:** las pruebas esperan almacenes `subjects` y `activities`, claves UUID, índice único `normalizedName` e índices de actividad `subjectId`, `status` y `dueDate`.

- [ ] **T9 — Implementar apertura y esquema IndexedDB (25 min)**
  - **Objetivo:** crear la apertura versionada de `studyflow` y los almacenes e índices probados en T8.
  - **Archivos/módulos:** `studyflow/src/persistence/database/open-database.ts`, `studyflow/src/persistence/database/schema.ts`.
  - **Dependencias:** T8.
  - **RF/CA relacionados:** RF-01–RF-02, RF-04, RF-07; CA-01–CA-03.
  - **Hecho cuando:** pasan las pruebas T8 y la apertura no elimina ni reinicializa datos ante errores.

- [ ] **T10 — Escribir pruebas de alta y consulta de materias en repositorio (20 min)**
  - **Objetivo:** especificar alta, consulta, persistencia y rechazo de nombres equivalentes.
  - **Archivos/módulos:** `tests/integration/persistence/subjects-repository.test.ts`.
  - **Dependencias:** T3, T9.
  - **RF/CA relacionados:** RF-01–RF-06; CA-01–CA-02.
  - **Hecho cuando:** se prueban alta, consulta tras reabrir la base, rechazo de equivalente y ausencia de operaciones de edición/eliminación.

- [ ] **T11 — Implementar repositorio de materias (20 min)**
  - **Objetivo:** implementar alta y consulta local de materias conforme a T10.
  - **Archivos/módulos:** `studyflow/src/persistence/subjects/subjects-repository.ts`.
  - **Dependencias:** T10.
  - **RF/CA relacionados:** RF-01–RF-06; CA-01–CA-02.
  - **Hecho cuando:** pasan las pruebas T10 y rechazar un duplicado conserva el registro existente.

- [ ] **T12 — Escribir pruebas de creación y consulta de actividades en repositorio (25 min)**
  - **Objetivo:** especificar creación, consulta, persistencia, títulos repetidos y relación con materia.
  - **Archivos/módulos:** `tests/integration/persistence/activities-repository.test.ts`.
  - **Dependencias:** T7, T9, T11.
  - **RF/CA relacionados:** RF-01–RF-02, RF-07, RF-11; CA-01, CA-03, CA-05.
  - **Hecho cuando:** se prueban alta y lectura tras reabrir la base, títulos iguales como registros independientes, estado inicial pendiente y rechazo de materia inexistente.

- [ ] **T13 — Implementar creación y consulta de actividades en repositorio (25 min)**
  - **Objetivo:** implementar las operaciones de alta y consulta local definidas por T12.
  - **Archivos/módulos:** `studyflow/src/persistence/activities/activities-repository.ts`.
  - **Dependencias:** T12.
  - **RF/CA relacionados:** RF-01–RF-02, RF-07, RF-11; CA-01, CA-03, CA-05.
  - **Hecho cuando:** pasan las pruebas T12 y no se pueden guardar actividades sin una materia existente.

- [ ] **T14 — Escribir pruebas de edición y eliminación en repositorio (20 min)**
  - **Objetivo:** especificar actualización y borrado individual por identificador.
  - **Archivos/módulos:** `tests/integration/persistence/activities-repository.test.ts`.
  - **Dependencias:** T13.
  - **RF/CA relacionados:** RF-12–RF-13; CA-05–CA-06.
  - **Hecho cuando:** las pruebas verifican actualización de campos, borrado del ID indicado y que otra actividad homónima permanece intacta.

- [ ] **T15 — Implementar edición y eliminación en repositorio (20 min)**
  - **Objetivo:** implementar actualización y borrado por ID conforme a T14.
  - **Archivos/módulos:** `studyflow/src/persistence/activities/activities-repository.ts`.
  - **Dependencias:** T14.
  - **RF/CA relacionados:** RF-12–RF-13; CA-05–CA-06.
  - **Hecho cuando:** pasan las pruebas T14 y cada operación afecta únicamente al registro seleccionado.

- [ ] **T16 — Escribir pruebas de cambio de estado y persistencia (20 min)**
  - **Objetivo:** fijar las transiciones pendiente↔completada y su conservación en IndexedDB.
  - **Archivos/módulos:** `tests/integration/persistence/activities-repository.test.ts`.
  - **Dependencias:** T13.
  - **RF/CA relacionados:** RF-01, RF-14–RF-15; CA-07, CA-14.
  - **Hecho cuando:** las pruebas cambian una actividad de pendiente a completada y de vuelta, reabren la base y comprueban el estado guardado en cada caso.

- [ ] **T17 — Implementar cambio de estado en repositorio (20 min)**
  - **Objetivo:** implementar el guardado del estado seleccionado sin alterar otros campos.
  - **Archivos/módulos:** `studyflow/src/persistence/activities/activities-repository.ts`.
  - **Dependencias:** T16.
  - **RF/CA relacionados:** RF-01, RF-14–RF-15; CA-07, CA-14.
  - **Hecho cuando:** pasan las pruebas T16 y el cambio de estado persiste al reabrir IndexedDB conservando los demás datos de la actividad.

- [ ] **T18 — Escribir pruebas de fallos de almacenamiento (20 min)**
  - **Objetivo:** especificar los resultados de apertura, cuota o transacción fallida sin pérdida intencional de datos.
  - **Archivos/módulos:** `tests/integration/persistence/storage-errors.test.ts`.
  - **Dependencias:** T9, T11, T13, T15, T17.
  - **RF/CA relacionados:** RF-27; CA-18.
  - **Hecho cuando:** fallos controlados no comunican éxito ni provocan borrado/reemplazo de la base, y los datos previos siguen consultables cuando el almacén permanece disponible.

- [ ] **T19 — Implementar manejo de fallos IndexedDB (20 min)**
  - **Objetivo:** normalizar errores locales sin ocultarlos ni intentar reinicializar o borrar datos.
  - **Archivos/módulos:** `studyflow/src/persistence/database/storage-errors.ts`, adaptadores de `studyflow/src/persistence/`.
  - **Dependencias:** T18.
  - **RF/CA relacionados:** RF-27; CA-18.
  - **Hecho cuando:** pasan las pruebas T18 y los fallos llegan a la interfaz en un estado distinguible. La recuperación manual sigue abierta en DA-01.

## 3. Interfaz, consulta y gestión de actividades

- [ ] **T20 — Escribir pruebas de interfaz de materias (20 min)**
  - **Objetivo:** probar registro, consulta, validación y duplicidad desde la interfaz.
  - **Archivos/módulos:** `tests/component/subjects/subjects-view.test.tsx`.
  - **Dependencias:** T3, T11.
  - **RF/CA relacionados:** RF-03–RF-06; CA-02.
  - **Hecho cuando:** las pruebas verifican alta válida, mensaje ante nombre inválido/equivalente, visualización y ausencia de edición/borrado.

- [ ] **T21 — Implementar interfaz de materias (20 min)**
  - **Objetivo:** construir formulario de alta y lista conectados al repositorio.
  - **Archivos/módulos:** `studyflow/src/features/subjects/subjects-view.tsx`, `studyflow/src/features/subjects/subject-form.tsx`.
  - **Dependencias:** T20.
  - **RF/CA relacionados:** RF-03–RF-06; CA-02.
  - **Hecho cuando:** pasan las pruebas T20 y la interfaz ofrece únicamente crear y consultar materias.

- [ ] **T22 — Escribir pruebas de creación de actividades en la interfaz (20 min)**
  - **Objetivo:** probar los campos y validaciones del formulario de alta, incluido estado inicial y fechas pasadas.
  - **Archivos/módulos:** `tests/component/activities/activity-form.test.tsx`.
  - **Dependencias:** T5, T7, T11, T13, T15.
  - **RF/CA relacionados:** RF-07–RF-11, RF-15–RF-17; CA-03–CA-05, CA-07–CA-08, CA-16.
  - **Hecho cuando:** las pruebas de alta cubren campos obligatorios, errores por campo, tipo/fecha inválidos, título límite, descripción opcional, títulos repetidos y estado inicial pendiente.

- [ ] **T23 — Implementar formulario de creación de actividades (20 min)**
  - **Objetivo:** construir el formulario de alta conectado a validadores y repositorio.
  - **Archivos/módulos:** `studyflow/src/features/activities/activity-form.tsx`.
  - **Dependencias:** T22.
  - **RF/CA relacionados:** RF-07–RF-11, RF-15–RF-17; CA-03–CA-05, CA-07–CA-08, CA-16.
  - **Hecho cuando:** pasan las pruebas T22 y una creación inválida no se guarda.

- [ ] **T24 — Escribir pruebas de edición de actividades en la interfaz (20 min)**
  - **Objetivo:** fijar que se pueden editar los campos aprobados y que la validación impide guardar cambios inválidos.
  - **Archivos/módulos:** `tests/component/activities/activity-edit.test.tsx`.
  - **Dependencias:** T23, T15.
  - **RF/CA relacionados:** RF-08, RF-10, RF-12; CA-04–CA-06, CA-16.
  - **Hecho cuando:** las pruebas cubren cambios de título, tipo, materia, fecha y descripción, rechazan datos inválidos y comprueban que una actividad homónima no cambia.

- [ ] **T25 — Implementar edición de actividades en la interfaz (20 min)**
  - **Objetivo:** conectar la edición de los campos aprobados con el repositorio y los validadores existentes.
  - **Archivos/módulos:** `studyflow/src/features/activities/activity-form.tsx`.
  - **Dependencias:** T24.
  - **RF/CA relacionados:** RF-08, RF-10, RF-12; CA-04–CA-06, CA-16.
  - **Hecho cuando:** pasan las pruebas T24 y los cambios válidos se guardan solo para la actividad seleccionada.

- [ ] **T26 — Escribir pruebas de consulta, filtros, vencimientos y orden (25 min)**
  - **Objetivo:** fijar las reglas de consulta en memoria independientes de la presentación.
  - **Archivos/módulos:** `tests/unit/domain/activity-query.test.ts`.
  - **Dependencias:** T5, T7.
  - **RF/CA relacionados:** RF-19–RF-26; CA-09–CA-15, CA-17.
  - **Hecho cuando:** los casos verifican filtros AND, categorías de vencimiento, exclusión de completadas, límites temporales y orden fecha/título/ID, incluidos cambios de mes/año.

- [ ] **T27 — Implementar consulta, filtros y orden (25 min)**
  - **Objetivo:** implementar clasificación, filtros combinados y orden determinista según T26.
  - **Archivos/módulos:** `studyflow/src/domain/activities/query.ts`.
  - **Dependencias:** T26.
  - **RF/CA relacionados:** RF-19–RF-26; CA-09–CA-15, CA-17.
  - **Hecho cuando:** pasan las pruebas T26 y no se persiste la clasificación ni se añade paginación.

- [ ] **T28 — Escribir pruebas de presentación de la lista (20 min)**
  - **Objetivo:** probar que la interfaz presenta las actividades y controles de filtros con el orden recibido.
  - **Archivos/módulos:** `tests/component/activities/activity-list.test.tsx`.
  - **Dependencias:** T21, T23, T27, T17.
  - **RF/CA relacionados:** RF-18–RF-22; CA-09, CA-11, CA-17.
  - **Hecho cuando:** las pruebas comprueban datos visibles, filtros por materia/estado/vencimiento combinados y el orden fecha/título/ID.

- [ ] **T29 — Implementar presentación de lista y filtros (25 min)**
  - **Objetivo:** construir la lista de actividades y sus controles de filtro usando la consulta de dominio.
  - **Archivos/módulos:** `studyflow/src/features/activities/activity-list.tsx`.
  - **Dependencias:** T28.
  - **RF/CA relacionados:** RF-18–RF-22; CA-09, CA-11, CA-17.
  - **Hecho cuando:** pasan las pruebas T28 y la lista usa el resultado ordenado/filtrado sin paginación.

- [ ] **T30 — Escribir pruebas de controles para cambiar estado (20 min)**
  - **Objetivo:** probar los controles de la actividad para marcarla completada y volverla pendiente.
  - **Archivos/módulos:** `tests/component/activities/activity-status.test.tsx`.
  - **Dependencias:** T29, T17.
  - **RF/CA relacionados:** RF-14–RF-15; CA-07, CA-14.
  - **Hecho cuando:** los escenarios activan ambas transiciones desde la interfaz, comprueban el estado mostrado y verifican tras recargar la vista que el estado proviene del registro persistido.

- [ ] **T31 — Implementar controles de estado en la lista (20 min)**
  - **Objetivo:** añadir los controles para marcar pendiente/completada y conectarlos al repositorio.
  - **Archivos/módulos:** `studyflow/src/features/activities/activity-list.tsx`, `studyflow/src/features/activities/activity-status.tsx`.
  - **Dependencias:** T30.
  - **RF/CA relacionados:** RF-14–RF-15; CA-07, CA-14.
  - **Hecho cuando:** pasan las pruebas T30 y ambas transiciones se guardan en IndexedDB sin alterar los demás datos.

- [ ] **T32 — Escribir pruebas de confirmación de eliminación (20 min)**
  - **Objetivo:** verificar cancelar, confirmar y la ausencia de una acción para deshacer.
  - **Archivos/módulos:** `tests/component/activities/delete-activity.test.tsx`.
  - **Dependencias:** T31, T15.
  - **RF/CA relacionados:** RF-13; CA-05–CA-06.
  - **Hecho cuando:** las pruebas comprueban que cancelar conserva la actividad sin escribir, confirmar elimina solo el ID seleccionado y la interfaz no presenta ni ofrece acción para deshacer; la actividad homónima permanece.

- [ ] **T33 — Implementar confirmación de eliminación (20 min)**
  - **Objetivo:** solicitar confirmación y conectar la acción confirmada al repositorio.
  - **Archivos/módulos:** `studyflow/src/features/activities/delete-activity.tsx`, integración en `activity-list.tsx`.
  - **Dependencias:** T32.
  - **RF/CA relacionados:** RF-13; CA-05–CA-06.
  - **Hecho cuando:** pasan las pruebas T32; cancelar no modifica IndexedDB y confirmar elimina únicamente el ID seleccionado, sin función de deshacer.

- [ ] **T34 — Escribir pruebas de presentación de errores locales (20 min)**
  - **Objetivo:** probar mensajes de validación y fallos de almacenamiento sin perder el estado del formulario.
  - **Archivos/módulos:** `tests/component/shared/storage-error.test.tsx`.
  - **Dependencias:** T19, T21, T23, T25.
  - **RF/CA relacionados:** RF-27; CA-18.
  - **Hecho cuando:** los escenarios verifican error claro, ausencia de confirmación falsa de guardado y conservación del formulario.

- [ ] **T35 — Implementar presentación de errores locales (20 min)**
  - **Objetivo:** presentar fallos de persistencia y validación con mensajes comprensibles.
  - **Archivos/módulos:** `studyflow/src/shared/error-message.tsx`, integración con formularios y vistas.
  - **Dependencias:** T34.
  - **RF/CA relacionados:** RF-27; CA-18.
  - **Hecho cuando:** pasan las pruebas T34 y el mensaje no promete recuperación automática no aprobada por DA-01.

## 4. Integración y verificación

- [ ] **T36 — Verificar cambio de fecha local con datos persistidos (20 min)**
  - **Objetivo:** comprobar que una consulta en otra fecha local recalcula vencimientos sin alterar la fecha guardada.
  - **Archivos/módulos:** `tests/integration/persistence/local-date-classification.test.ts`.
  - **Dependencias:** T13, T17, T27.
  - **RF/CA relacionados:** RF-01–RF-02, RF-17, RF-23–RF-26; CA-01, CA-08, CA-12–CA-15.
  - **Hecho cuando:** se conserva en IndexedDB una misma fecha de entrega y, al consultar con fechas locales distintas que cruzan mes y año, cambia la clasificación según «hoy» pero el valor `dueDate` leído permanece idéntico.

- [ ] **T37 — Escribir prueba de arranque e hidratación local (20 min)**
  - **Objetivo:** verificar la apertura de IndexedDB y la carga de datos guardados previamente, incluido el estado de actividad.
  - **Archivos/módulos:** `tests/integration/app-startup.test.tsx`.
  - **Dependencias:** T21, T23, T25, T29, T31, T33, T35, T36.
  - **RF/CA relacionados:** RF-01–RF-02, RF-14–RF-15, RF-18; CA-01, CA-07.
  - **Hecho cuando:** una segunda inicialización de la aplicación muestra los registros y el estado previamente guardados en la base de prueba.

- [ ] **T38 — Implementar composición e hidratación de la aplicación (25 min)**
  - **Objetivo:** conectar vistas, repositorios y apertura de base durante el inicio del cliente.
  - **Archivos/módulos:** `studyflow/src/app/app.tsx`, `studyflow/src/app/bootstrap.ts`, `studyflow/src/main.tsx`.
  - **Dependencias:** T37, T9, T11, T13, T15, T17, T21, T23, T25, T27, T29, T31, T33, T35.
  - **RF/CA relacionados:** RF-01–RF-02, RF-18; CA-01, CA-07.
  - **Hecho cuando:** pasan las pruebas T37 y la apertura muestra datos locales sin llamadas a servidor.

- [ ] **T39 — Verificar compatibilidad en Chrome de escritorio (20 min)**
  - **Objetivo:** realizar recorrido breve de persistencia, materias, actividades, estado y filtros en la versión actual de Chrome.
  - **Archivos/módulos:** aplicación integrada; `tests/verification/browser-compatibility.md`.
  - **Dependencias:** T38.
  - **RF/CA relacionados:** RNF-01; CA-19; recorrido de CA-01, CA-02, CA-07, CA-09 y CA-17.
  - **Hecho cuando:** se registra versión y resultado de carga, guardado local, recarga y uso del recorrido.

- [ ] **T40 — Verificar compatibilidad en Edge de escritorio (20 min)**
  - **Objetivo:** repetir el recorrido de compatibilidad en la versión actual de Edge.
  - **Archivos/módulos:** aplicación integrada; `tests/verification/browser-compatibility.md`.
  - **Dependencias:** T39.
  - **RF/CA relacionados:** RNF-01; CA-19; recorrido de CA-01, CA-02, CA-07, CA-09 y CA-17.
  - **Hecho cuando:** se registra versión y resultado del recorrido de persistencia y uso.

- [ ] **T41 — Verificar compatibilidad en Firefox de escritorio (20 min)**
  - **Objetivo:** repetir el recorrido de compatibilidad en la versión actual de Firefox.
  - **Archivos/módulos:** aplicación integrada; `tests/verification/browser-compatibility.md`.
  - **Dependencias:** T40.
  - **RF/CA relacionados:** RNF-01; CA-19; recorrido de CA-01, CA-02, CA-07, CA-09 y CA-17.
  - **Hecho cuando:** se registra versión y resultado; cualquier diferencia queda informada sin cambiar requisitos.

- [ ] **T42 — Ejecutar verificación final y completar evidencia (25 min)**
  - **Objetivo:** ejecutar las pruebas de aceptación existentes y revisar la matriz sin duplicar la escritura de pruebas.
  - **Archivos/módulos:** pruebas bajo `tests/`; `tests/verification/acceptance-results.md`.
  - **Dependencias:** T38–T41.
  - **RF/CA relacionados:** RF-01–RF-27; CA-01–CA-19.
  - **Hecho cuando:** cada criterio tiene resultado enlazado a una prueba o recorrido; los fallos se registran y ninguno fallido se declara conforme. No resolver DA-01–DA-03 por suposición.

## 5. Matriz de cobertura RF y CA

| RF | Tareas | CA cubiertos |
| --- | --- | --- |
| RF-01–RF-02 | T8–T9, T10–T13, T16–T17, T36–T38 | CA-01, CA-07, CA-15 |
| RF-03–RF-06 | T2–T3, T10–T11, T20–T21 | CA-02 |
| RF-07–RF-10 | T6–T7, T12–T13, T22–T25 | CA-03–CA-04, CA-08, CA-16 |
| RF-11 | T6–T7, T12–T13 | CA-05, CA-16 |
| RF-12 | T14–T15, T24–T25 | CA-04–CA-06, CA-16 |
| RF-13 | T14–T15, T32–T33 | CA-05–CA-06 |
| RF-14–RF-15 | T6–T7, T16–T17, T30–T31, T37–T38 | CA-07, CA-14 |
| RF-16–RF-17 | T4–T5, T22–T25, T36 | CA-08, CA-15 |
| RF-18 | T28–T29, T37–T38 | CA-09 |
| RF-19–RF-21 | T26–T29 | CA-09–CA-10, CA-17 |
| RF-22 | T26–T29 | CA-11 |
| RF-23–RF-25 | T4–T5, T26–T27, T36 | CA-10, CA-12–CA-14 |
| RF-26 | T4–T5, T26–T27, T36 | CA-12–CA-13, CA-15 |
| RF-27 | T18–T19, T34–T35 | CA-18 |
| RNF-01 | T1, T39–T41 | CA-19 |
| RNF-02–RNF-03 | T8–T19, T36–T38, T4–T5 | CA-01, CA-08, CA-15 |

## 6. Dudas conservadas

- **DA-01:** recuperación manual ante cuota agotada o almacenamiento local corrupto. Las tareas cubren el mensaje y la no destrucción intencional de datos; no diseñan recuperación adicional.
- **DA-02:** accesibilidad, estados vacíos, idioma de interfaz y formato visual de fecha. No se presume una decisión nueva.
- **DA-03:** volúmenes esperados y umbrales de rendimiento. El listado permanece sin paginación.
