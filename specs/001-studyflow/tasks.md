# Tareas de implementación de StudyFlow

Estado: **IMPLEMENTATION autorizada únicamente para T6 en la última autorización**. T1–T6 y T43–T45 están completadas; T7–T42 permanecen pendientes. La autorización para T6 no habilita otras tareas.

Las tareas estiman 20–30 minutos cada una. Se ejecutan según sus dependencias, no solo por el número del identificador: las adaptaciones T43–T45, listadas después de T42, deben completarse antes de T5 y de las tareas funcionales que dependen de esas reglas. Para cada comportamiento nuevo, primero se escriben sus pruebas y después se implementa.

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

- [x] **T5 — Implementar funciones de fechas y vencimiento (25 min)**
  - **Objetivo:** implementar funciones puras de validación, fecha local y clasificación según T4.
  - **Archivos/módulos:** `studyflow/src/domain/dates/date-only.ts`, `studyflow/src/domain/dates/classify.ts`.
  - **Dependencias:** T4, T45.
  - **RF/CA relacionados:** RF-10, RF-16–RF-17, RF-23–RF-26; CA-08, CA-12–CA-15.
  - **Hecho cuando:** pasan las pruebas T4 y T45; la validación aplica las reglas gregorianas seculares, y la clasificación se calcula al consultar sin guardarse como dato persistido.

- [x] **T6 — Escribir pruebas de validación de actividades (25 min)**
  - **Objetivo:** fijar validación de campos obligatorios, límite de grafemas, descripción opcional, tipos y estado inicial.
  - **Archivos/módulos:** `tests/unit/domain/activities.test.ts`.
  - **Dependencias:** T1, T5, T44.
  - **RF/CA relacionados:** RF-07–RF-11, RF-15–RF-17; CA-03–CA-05, CA-07–CA-08, CA-16.
  - **Hecho cuando:** las pruebas cubren campos requeridos, título vacío/de solo espacios, 100/101 grafemas, descripción ausente/vacía/solo Unicode `White_Space`, contenido largo conservado, materia existente, tipos permitidos, títulos repetidos y estado pendiente inicial.

- [ ] **T7 — Implementar validación de actividades (20 min)**
  - **Objetivo:** implementar tipos y validadores de actividad, incluido el conteo de grafemas y el tratamiento de descripciones omitidas, definidos por T6.
  - **Archivos/módulos:** `studyflow/src/domain/activities/types.ts`, `studyflow/src/domain/activities/validation.ts`.
  - **Dependencias:** T6.
  - **RF/CA relacionados:** RF-07–RF-11, RF-15–RF-17; CA-03–CA-05, CA-07–CA-08, CA-16.
  - **Hecho cuando:** pasan las pruebas T6, los límites cuentan grafemas, las descripciones vacías o solo Unicode `White_Space` se tratan como omitidas, no hay unicidad para títulos y toda actividad nueva recibe estado `pendiente`.

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
  - **Dependencias:** T9, T44.
  - **RF/CA relacionados:** RF-01–RF-06; CA-01–CA-02.
  - **Hecho cuando:** se prueban alta, consulta tras reabrir la base, rechazo de equivalentes con caja/espacios Unicode exteriores y ausencia de operaciones de edición/eliminación.

- [ ] **T11 — Implementar repositorio de materias (20 min)**
  - **Objetivo:** implementar alta y consulta local de materias conforme a T10.
  - **Archivos/módulos:** `studyflow/src/persistence/subjects/subjects-repository.ts`.
  - **Dependencias:** T10, T44.
  - **RF/CA relacionados:** RF-01–RF-06; CA-01–CA-02.
  - **Hecho cuando:** pasan las pruebas T10 y rechazar un duplicado conserva el registro existente.

- [ ] **T12 — Escribir pruebas de creación y consulta de actividades en repositorio (25 min)**
  - **Objetivo:** especificar creación, consulta, persistencia, títulos repetidos y relación con materia.
  - **Archivos/módulos:** `tests/integration/persistence/activities-repository.test.ts`.
  - **Dependencias:** T7, T9, T11.
  - **RF/CA relacionados:** RF-01–RF-02, RF-07, RF-11; CA-01, CA-03, CA-05.
  - **Hecho cuando:** se prueban alta y lectura tras reabrir la base, títulos iguales como registros independientes, estado inicial pendiente, descripción omitida y contenido conservado, y rechazo de materia inexistente.

- [ ] **T13 — Implementar creación y consulta de actividades en repositorio (25 min)**
  - **Objetivo:** implementar las operaciones de alta y consulta local definidas por T12.
  - **Archivos/módulos:** `studyflow/src/persistence/activities/activities-repository.ts`.
  - **Dependencias:** T12.
  - **RF/CA relacionados:** RF-01–RF-02, RF-07, RF-11; CA-01, CA-03, CA-05.
  - **Hecho cuando:** pasan las pruebas T12, se conservan los campos y la descripción conforme a T7, y no se pueden guardar actividades sin una materia existente.

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
  - **Objetivo:** especificar la comunicación de fallos de apertura, cuota o transacción sin afirmar un estado de persistencia no verificado.
  - **Archivos/módulos:** `tests/integration/persistence/storage-errors.test.ts`.
  - **Dependencias:** T9, T11, T13, T15, T17.
  - **RF/CA relacionados:** RF-27; CA-18.
  - **Hecho cuando:** fallos controlados comunican que la operación no pudo confirmarse o completarse, no comunican éxito ni detalles técnicos, y no provocan borrado/reemplazo intencional de datos existentes; las pruebas no afirman un estado de escritura que no se haya verificado.

- [ ] **T19 — Implementar manejo de fallos IndexedDB (20 min)**
  - **Objetivo:** distinguir fallos de IndexedDB de errores de validación, sin ocultar el fallo ni intentar reinicializar o borrar datos.
  - **Archivos/módulos:** `studyflow/src/persistence/database/storage-errors.ts`, adaptadores de `studyflow/src/persistence/`.
  - **Dependencias:** T18.
  - **RF/CA relacionados:** RF-27; CA-18.
  - **Hecho cuando:** pasan las pruebas T18 y los fallos llegan a la interfaz con un resultado distinto al de validación, sin garantizar éxito ni fracaso de persistencia no verificado. La recuperación sigue abierta en DA-01.

## 3. Interfaz, consulta y gestión de actividades

- [ ] **T20 — Escribir pruebas de interfaz de materias (20 min)**
  - **Objetivo:** probar registro, consulta, validación y duplicidad desde la interfaz.
  - **Archivos/módulos:** `tests/component/subjects/subjects-view.test.tsx`.
  - **Dependencias:** T11, T44.
  - **RF/CA relacionados:** RF-03–RF-06; CA-02.
  - **Hecho cuando:** las pruebas verifican alta válida, límite por grafemas, mensaje ante nombre vacío/de solo Unicode `White_Space` o equivalente con caja/espacios exteriores, conservación del nombre presentado, visualización y ausencia de edición/borrado.

- [ ] **T21 — Implementar interfaz de materias (20 min)**
  - **Objetivo:** construir formulario de alta y lista conectados al repositorio.
  - **Archivos/módulos:** `studyflow/src/features/subjects/subjects-view.tsx`, `studyflow/src/features/subjects/subject-form.tsx`.
  - **Dependencias:** T20, T44.
  - **RF/CA relacionados:** RF-03–RF-06; CA-02.
  - **Hecho cuando:** pasan las pruebas T20 y la interfaz ofrece únicamente crear y consultar materias.

- [ ] **T22 — Escribir pruebas de creación de actividades en la interfaz (20 min)**
  - **Objetivo:** probar los campos y validaciones del formulario de alta, incluido estado inicial y fechas pasadas.
  - **Archivos/módulos:** `tests/component/activities/activity-form.test.tsx`.
  - **Dependencias:** T5, T7, T11, T13.
  - **RF/CA relacionados:** RF-07–RF-11, RF-15–RF-17; CA-03–CA-05, CA-07–CA-08, CA-16.
  - **Hecho cuando:** las pruebas de alta cubren campos obligatorios, errores por campo, tipo/fecha gregoriana inválidos, título de 100/101 grafemas, descripción ausente/vacía/Unicode `White_Space` y contenido conservado, títulos repetidos y estado inicial pendiente.

- [ ] **T23 — Implementar formulario de creación de actividades (20 min)**
  - **Objetivo:** construir el formulario de alta conectado a validadores y repositorio.
  - **Archivos/módulos:** `studyflow/src/features/activities/activity-form.tsx`.
  - **Dependencias:** T22.
  - **RF/CA relacionados:** RF-07–RF-11, RF-15–RF-17; CA-03–CA-05, CA-07–CA-08, CA-16.
  - **Hecho cuando:** pasan las pruebas T22; los campos inválidos no se guardan y las descripciones omitidas o de solo Unicode `White_Space` se guardan como omitidas.

- [ ] **T24 — Escribir pruebas de edición de actividades en la interfaz (20 min)**
  - **Objetivo:** fijar que se pueden editar los campos aprobados y que la validación impide guardar cambios inválidos.
  - **Archivos/módulos:** `tests/component/activities/activity-edit.test.tsx`.
  - **Dependencias:** T23, T15.
  - **RF/CA relacionados:** RF-08, RF-10, RF-12; CA-04–CA-06, CA-16.
  - **Hecho cuando:** las pruebas cubren cambios de título (incluido límite por grafemas), tipo, materia, fecha gregoriana y descripción; una descripción vacía o solo Unicode `White_Space` queda omitida y el contenido se conserva sin límite adicional; se rechazan datos inválidos, una edición inválida conserva los datos anteriores y una actividad homónima no cambia.

- [ ] **T25 — Implementar edición de actividades en la interfaz (20 min)**
  - **Objetivo:** conectar la edición de los campos aprobados con el repositorio y los validadores existentes.
  - **Archivos/módulos:** `studyflow/src/features/activities/activity-form.tsx`.
  - **Dependencias:** T24.
  - **RF/CA relacionados:** RF-08, RF-10, RF-12; CA-04–CA-06, CA-16.
  - **Hecho cuando:** pasan las pruebas T24; una edición válida actualiza solo la actividad seleccionada, una descripción vacía o solo Unicode `White_Space` queda omitida y el contenido se conserva sin límite adicional; una validación fallida informa que no se guardó y deja los datos previos intactos.

- [ ] **T26 — Escribir pruebas de consulta, filtros, vencimientos y orden (30 min)**
  - **Objetivo:** fijar las reglas de consulta en memoria independientes de la presentación.
  - **Archivos/módulos:** `tests/unit/domain/activity-query.test.ts`.
  - **Dependencias:** T5, T7.
  - **RF/CA relacionados:** RF-19–RF-26; CA-09–CA-15, CA-17.
  - **Hecho cuando:** los casos verifican filtros AND y «Todos», las tres categorías de vencimiento para pendientes, exclusión de completadas, límites temporales, día 14 en «Posteriores a tres días», y orden fecha/título alfabético español sensible a acentos/insensible a mayúsculas/ID, incluidos cambios de mes y año.

- [ ] **T27 — Implementar consulta, filtros y orden (30 min)**
  - **Objetivo:** implementar clasificación, filtros combinados y orden determinista según T26.
  - **Archivos/módulos:** `studyflow/src/domain/queries/activity-query.ts`.
  - **Dependencias:** T26.
  - **RF/CA relacionados:** RF-19–RF-26; CA-09–CA-15, CA-17.
  - **Hecho cuando:** pasan las pruebas T26; los filtros activos se combinan con AND, «Todos» desactiva solo el filtro de vencimiento, se respeta la colación española con ID estable, y no se persiste la clasificación ni se añade paginación.

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
  - **Objetivo:** probar mensajes distintos de validación y almacenamiento, sin afirmar un resultado de persistencia no confirmado.
  - **Archivos/módulos:** `tests/component/shared/storage-error.test.tsx`.
  - **Dependencias:** T19, T21, T23, T25.
  - **RF/CA relacionados:** RF-27; CA-18.
  - **Hecho cuando:** los escenarios distinguen «operación no guardada» por validación de «no pudo confirmarse o completarse» por almacenamiento, validan que el error de almacenamiento no muestre detalles técnicos ni un resultado no verificado y no comunica éxito; no se exige que un fallo de almacenamiento garantice el estado del formulario o del registro.

- [ ] **T35 — Implementar presentación de errores locales (20 min)**
  - **Objetivo:** presentar fallos de persistencia y validación con mensajes distintos, comprensibles y sin detalles técnicos.
  - **Archivos/módulos:** `studyflow/src/shared/error-message.tsx`, integración con formularios y vistas.
  - **Dependencias:** T34.
  - **RF/CA relacionados:** RF-27; CA-18.
  - **Hecho cuando:** pasan las pruebas T34; la validación informa que no se guardó y conserva datos previos en edición, mientras el error de almacenamiento informa que no pudo confirmarse o completarse sin garantizar un estado no verificado ni prometer recuperación automática (DA-01).

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

- [x] **T43 — Adaptar pruebas de validación de materias a grafemas y Unicode (25 min)**
  - **Objetivo:** ampliar las pruebas históricas de T2 para fijar los límites aprobados de grafemas y la equivalencia con espacios en blanco Unicode exteriores.
  - **Archivos/módulos:** `tests/unit/domain/subjects.test.ts`.
  - **Dependencias:** T2, T3.
  - **RF/CA relacionados:** RF-03–RF-04; CA-02.
  - **Hecho cuando:** las pruebas nuevas verifican 100/101 grafemas (incluidos grafemas compuestos), nombre formado solo por Unicode `White_Space`, espacios Unicode exteriores, comparación que ignora caja pero distingue acentos y espacios interiores, y conservación del nombre original; las pruebas anteriores se mantienen.

- [x] **T44 — Adaptar implementación de validación de materias (25 min)**
  - **Objetivo:** ajustar la validación y clave de comparación de T3 a grafemas y Unicode `White_Space` sin cambiar el nombre presentado.
  - **Archivos/módulos:** `studyflow/src/domain/subjects/validation.ts`, `studyflow/src/domain/subjects/types.ts`.
  - **Dependencias:** T43.
  - **RF/CA relacionados:** RF-03–RF-04; CA-02.
  - **Hecho cuando:** pasan las pruebas de T2 y T43; el límite cuenta grafemas, la clave solo recorta espacios Unicode exteriores y normaliza mayúsculas, sin retirar acentos ni modificar espacios interiores o el texto original.

- [x] **T45 — Adaptar pruebas de calendario gregoriano (20 min)**
  - **Objetivo:** ampliar las pruebas de T4 con fechas bisiestas y reglas de años seculares.
  - **Archivos/módulos:** `tests/unit/domain/due-dates.test.ts`.
  - **Dependencias:** T4.
  - **RF/CA relacionados:** RF-10; CA-04.
  - **Hecho cuando:** las pruebas aceptan 29 de febrero de 2000, rechazan 29 de febrero de 1900 y comprueban al menos un año secular divisible por 400 y otro no divisible por 400; se conservan los casos ya escritos en T4.

## 5. Matriz de cobertura RF y CA

| RF | Tareas | CA cubiertos |
| --- | --- | --- |
| RF-01–RF-02 | T8–T9, T10–T13, T16–T17, T36–T38 | CA-01, CA-07, CA-15 |
| RF-03–RF-06 | T2–T3, T10–T11, T20–T21, T43–T44 | CA-02 |
| RF-07–RF-10 | T6–T7, T12–T13, T22–T25, T45 | CA-03–CA-04, CA-08, CA-16 |
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
