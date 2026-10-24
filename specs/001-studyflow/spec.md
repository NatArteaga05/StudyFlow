# Especificación del MVP de StudyFlow

Estado: actualización de alcance aprobada por el usuario; lista para revisión y aprobación documental. Las dudas no bloqueantes están identificadas al final.

Fuente de decisiones: alcance inicial, aclaraciones previas y decisiones definitivas posteriores del usuario. Las decisiones más recientes sobre persistencia local sustituyen las anteriores sobre cuentas y acceso en línea.

## 1. Contexto y objetivo

StudyFlow será una aplicación web para que un estudiante universitario organice materias y actividades académicas, consulte fechas de entrega y gestione qué actividades están pendientes o completadas.

El MVP permitirá registrar y consultar materias; crear, editar y eliminar tareas, trabajos y exámenes; listar, ordenar y filtrar actividades; e identificar vencimientos. Las materias y actividades se conservarán localmente en el almacenamiento del navegador entre usos.

No habrá cuentas, autenticación, contraseñas, recuperación de acceso, sincronización entre dispositivos ni almacenamiento remoto de datos académicos.

## 2. Usuarios

- **Estudiante universitario:** persona que utiliza StudyFlow en un navegador para gestionar sus materias y actividades.
- El almacenamiento pertenece al perfil/origen del navegador donde se usa la aplicación. No se definen perfiles dentro de StudyFlow.

## 3. Datos y reglas de negocio

### Materia

El único dato de negocio de una materia es su **nombre obligatorio**. Se permite registrar y consultar materias; no se pueden editar ni eliminar.

### Actividad académica

| Dato | Definición |
| --- | --- |
| Título | Obligatorio. Se permiten títulos repetidos. |
| Tipo | Obligatorio: tarea, trabajo o examen. |
| Materia | Obligatoria: una materia registrada. |
| Fecha de entrega | Obligatoria: día, mes y año, sin hora. Se admiten fechas anteriores a hoy. |
| Descripción | Opcional. |
| Estado | Pendiente o completada. Toda actividad nueva comienza pendiente. |

Dos actividades con el mismo título son independientes.

### Fechas y vencimiento

«Hoy» es la fecha local del dispositivo/navegador en uso. Las comparaciones se realizan con fechas calendario, sin hora.

| Clasificación | Regla |
| --- | --- |
| Vencida | Actividad pendiente con fecha de entrega anterior a hoy. |
| Próxima a vencer | Actividad pendiente cuya fecha está entre hoy y los siguientes 3 días calendario, incluidos ambos extremos. |
| Pendiente con entrega posterior | Actividad pendiente con fecha posterior a hoy más 3 días. |
| Completada | Conserva su fecha y no se clasifica como vencida ni próxima a vencer. |

Una actividad con entrega hoy sigue vigente durante todo el día y pasa a vencida al día siguiente si continúa pendiente. El plazo usa días calendario, sin reglas especiales para fines de semana o feriados.

### Persistencia local

Los datos se guardan en el almacenamiento local del navegador y están disponibles entre usos en ese mismo perfil/origen mientras los datos del sitio sigan disponibles. La SPEC no promete recuperación después de borrar los datos del navegador ni acceso a los mismos datos desde otro dispositivo.

## 4. Historias de usuario

| ID | Historia |
| --- | --- |
| HU-01 | Como estudiante, quiero registrar y consultar materias por su nombre para organizar mis actividades académicas. |
| HU-02 | Como estudiante, quiero crear actividades con sus datos académicos para registrar tareas, trabajos y exámenes. |
| HU-03 | Como estudiante, quiero editar y eliminar actividades para mantener actualizada mi organización académica. |
| HU-04 | Como estudiante, quiero marcar actividades como pendientes o completadas para gestionar su cumplimiento. |
| HU-05 | Como estudiante, quiero listar, ordenar y filtrar actividades por materia, estado y vencimiento para consultar las que me interesan. |
| HU-06 | Como estudiante, quiero identificar actividades vencidas y próximas a vencer para reconocer sus fechas de entrega. |

## 5. Requisitos funcionales en formato EARS

### Persistencia local

- **RF-01:** Cuando el estudiante registre o cambie una materia o actividad, el sistema deberá conservar los datos en el almacenamiento local del navegador.
- **RF-02:** Cuando el estudiante vuelva a usar StudyFlow en el mismo perfil/origen del navegador y los datos locales sigan disponibles, el sistema deberá permitir consultar las materias y actividades previamente guardadas.

### Materias

- **RF-03:** Cuando el estudiante registre una materia con nombre válido, el sistema deberá guardarla con ese nombre como único dato de negocio.
- **RF-04:** Si el estudiante intenta registrar una materia cuyo nombre está vacío, contiene únicamente espacios, supera los 100 caracteres o es equivalente a otro nombre existente al ignorar mayúsculas, minúsculas y espacios exteriores, el sistema deberá impedir su registro.
- **RF-05:** Cuando el estudiante consulte sus materias, el sistema deberá mostrar las materias registradas.
- **RF-06:** El sistema deberá ofrecer registro y consulta de materias, sin operaciones para editarlas o eliminarlas.

### Actividades

- **RF-07:** Cuando el estudiante cree una actividad con título, tipo, materia registrada y fecha de entrega válidos, el sistema deberá guardarla con esos datos y con la descripción si fue proporcionada.
- **RF-08:** Si falta un dato obligatorio de una creación o edición de actividad, el título está vacío, contiene únicamente espacios o supera los 100 caracteres, el sistema deberá impedir que se guarde la operación incompleta o inválida.
- **RF-09:** Si el tipo de actividad es distinto de tarea, trabajo o examen, el sistema deberá impedir que se guarde ese valor.
- **RF-10:** Si la fecha de entrega no corresponde a una fecha calendario válida, el sistema deberá impedir que se guarde ese valor.
- **RF-11:** Cuando el estudiante cree una actividad con título igual al de otra, el sistema deberá permitir guardarla como una actividad independiente.
- **RF-12:** Cuando el estudiante guarde cambios válidos en el título, tipo, materia, fecha de entrega o descripción, el sistema deberá actualizar la actividad seleccionada.
- **RF-13:** Cuando el estudiante confirme la eliminación de una actividad, el sistema deberá quitarla de las actividades conservadas; si cancela la confirmación, el sistema deberá conservarla. El sistema no ofrecerá una función para deshacer la eliminación.
- **RF-14:** Cuando el estudiante marque una actividad como completada, el sistema deberá conservarla con estado completada.
- **RF-15:** Cuando el estudiante cree una actividad, el sistema deberá asignarle el estado pendiente; cuando el estudiante marque una actividad como pendiente, el sistema deberá conservarla con ese estado.
- **RF-16:** Cuando el estudiante cree o edite una actividad con fecha de entrega válida anterior a hoy, el sistema deberá admitir esa fecha.
- **RF-17:** El sistema deberá guardar y presentar las fechas de entrega con día, mes y año, sin hora.

### Consulta, filtros y vencimientos

- **RF-18:** Cuando el estudiante consulte sus actividades, el sistema deberá mostrar las actividades registradas y permitir consultar sus datos y estado.
- **RF-19:** Cuando el estudiante filtre por materia, el sistema deberá mostrar únicamente actividades asociadas a la materia seleccionada.
- **RF-20:** Cuando el estudiante filtre por estado, el sistema deberá mostrar únicamente actividades con el estado seleccionado.
- **RF-21:** Cuando el estudiante aplique filtros por materia, estado o vencimiento, el sistema deberá combinar los filtros activos y mostrar únicamente las actividades que cumplan todos ellos.
- **RF-22:** Cuando el estudiante consulte la lista de actividades, el sistema deberá ordenarla por fecha de entrega ascendente, título en orden alfabético ascendente y, si ambos coinciden, identificador estable en orden ascendente.
- **RF-23:** Mientras una actividad esté pendiente y su fecha de entrega sea anterior a hoy, el sistema deberá identificarla como vencida.
- **RF-24:** Mientras una actividad esté pendiente y su fecha de entrega esté entre hoy y hoy más 3 días calendario, incluidos ambos extremos, el sistema deberá identificarla como próxima a vencer.
- **RF-25:** Mientras una actividad esté completada, el sistema deberá conservar su fecha de entrega y excluirla de las clasificaciones vencida y próxima a vencer.
- **RF-26:** Cuando el sistema determine vencimientos, deberá usar la fecha local del dispositivo/navegador donde se utiliza StudyFlow.
- **RF-27:** Si una operación de almacenamiento local falla, el sistema deberá mostrar un mensaje claro y no deberá sobrescribir ni eliminar intencionalmente datos existentes como respuesta al error.

## 6. Criterios de aceptación verificables

Estos criterios describen verificaciones futuras; no se ejecutaron pruebas de código al redactar la SPEC.

| ID | Escenario y resultado esperado | Requisitos |
| --- | --- | --- |
| CA-01 | Tras registrar materias y actividades, cerrar y volver a abrir StudyFlow en el mismo perfil/origen, los datos guardados siguen disponibles mientras el almacenamiento del sitio no se haya borrado. | RF-01, RF-02 |
| CA-02 | Registrar una materia de hasta 100 caracteres permite consultarla; nombre vacío, de solo espacios, de más de 100 caracteres o equivalente a otro nombre al ignorar mayúsculas/minúsculas y espacios exteriores se rechaza. No se ofrecen operaciones para editarla ni eliminarla. | RF-03 a RF-06 |
| CA-03 | Se guardan actividades de los tres tipos permitidos, asociadas a una materia existente, con descripción opcional. | RF-07, RF-09 |
| CA-04 | Crear o editar una actividad con campos obligatorios ausentes, título vacío/de solo espacios/de más de 100 caracteres, tipo no permitido o fecha imposible, como 31 de abril, no guarda esa operación. | RF-08 a RF-10 |
| CA-05 | Dos actividades con el mismo título se conservan independientemente; editar o eliminar una no cambia la otra. | RF-11 a RF-13 |
| CA-06 | Cambiar los campos editables y consultar de nuevo muestra los cambios; al confirmar la eliminación la actividad deja de aparecer y no se ofrece deshacer; al cancelar permanece. | RF-12, RF-13 |
| CA-07 | Una actividad nueva se guarda con estado pendiente; puede pasar a completada y volver a pendiente, y el estado elegido se conserva entre usos en el mismo navegador. | RF-01, RF-14, RF-15 |
| CA-08 | Se admite una fecha de entrega anterior a hoy y la fecha se presenta sin hora. | RF-16, RF-17 |
| CA-09 | Con actividades de distintas materias y estados, los filtros por materia y estado muestran únicamente las coincidencias correspondientes. | RF-18 a RF-20 |
| CA-10 | El filtro de vencimiento distingue pendientes vencidas, próximas y posteriores al plazo de 3 días; las actividades completadas no se clasifican como vencidas ni próximas. | RF-21, RF-23 a RF-25 |
| CA-11 | Una lista con fechas distintas se ordena por fecha ascendente; los empates se ordenan por título ascendente y los empates restantes por identificador estable ascendente. | RF-22 |
| CA-12 | Usando como hoy el 10 de mayo de 2026, una actividad pendiente del día 9 está vencida; las de los días 10, 11, 12 y 13 están próximas; la del día 14 no pertenece a ninguna de esas categorías. | RF-23, RF-24, RF-26 |
| CA-13 | Una actividad pendiente con entrega hoy permanece vigente durante ese día; al día siguiente, si sigue pendiente, aparece vencida. | RF-23, RF-24, RF-26 |
| CA-14 | Una actividad completada con fecha pasada o próxima conserva la fecha y no se clasifica como vencida ni próxima. Al volverla pendiente se aplica la clasificación correspondiente. | RF-14, RF-15, RF-23 a RF-25 |
| CA-15 | Si cambia la fecha local del mismo dispositivo, la fecha de entrega guardada no cambia y su clasificación corresponde a la nueva fecha local. | RF-17, RF-26 |
| CA-16 | Un título de actividad de exactamente 100 caracteres se acepta; uno de más de 100, vacío o compuesto solo por espacios se rechaza. Títulos repetidos siguen admitidos. | RF-08, RF-11 |
| CA-17 | Aplicar a la vez filtros por materia, estado y vencimiento devuelve solo actividades que satisfacen todos los filtros activos. | RF-19 a RF-21 |
| CA-18 | Si el guardado local falla, StudyFlow informa claramente que no se completó y no borra ni reemplaza intencionalmente los datos ya guardados. | RF-27 |
| CA-19 | La aplicación puede utilizarse en versiones actuales de Chrome, Edge y Firefox de escritorio. | RNF-01 |

No se exige que otro navegador, perfil o dispositivo comparta los datos locales.

## 7. Requisitos no funcionales

- **RNF-01 — Compatibilidad web:** StudyFlow deberá poder utilizarse en versiones actuales de Chrome, Edge y Firefox en escritorio. La compatibilidad con otros navegadores o dispositivos no está incluida.
- **RNF-02 — Persistencia local:** los datos deberán conservarse entre usos en el mismo perfil/origen de navegador mientras el almacenamiento del sitio permanezca disponible. No hay garantía de recuperación si el usuario o navegador lo elimina.
- **RNF-03 — Integridad de fecha:** el día, mes y año de entrega deberán conservarse como fecha calendario sin hora; la fecha local se utilizará solo para derivar vencimientos.

## 8. Casos límite

| Caso | Comportamiento confirmado o pendiente |
| --- | --- |
| No hay materias | La lista está vacía; no se puede crear una actividad sin una materia registrada. La presentación del estado vacío no está definida. |
| No hay actividades o el filtro no encuentra coincidencias | No hay elementos coincidentes. No se define una presentación específica del estado vacío. |
| Títulos de actividad repetidos | Permitidos; cada actividad se gestiona independientemente. |
| Nombres de materia equivalentes tras ignorar mayúsculas/minúsculas y espacios exteriores | El segundo registro se rechaza; los espacios interiores y acentos no se eliminan ni se equiparan por esta regla. |
| Descripción omitida | No impide guardar la actividad. |
| Campo obligatorio ausente, nombre vacío/de solo espacios o de más de 100 caracteres, tipo no permitido o fecha inexistente | Se rechaza el guardado. |
| Entrega hoy o exactamente dentro de tres días | Si está pendiente, se considera próxima a vencer. |
| Entrega dentro de cuatro días | No se considera vencida ni próxima. |
| Cambio de mes, año o año bisiesto | Se usan fechas calendario válidas y el umbral de tres días cruza el cambio normalmente. |
| Actividad completada con fecha pasada o próxima | Conserva la fecha y queda fuera de vencida/próxima. |
| Actividad completada pasa a pendiente | Se reclasifica según su fecha y el día local actual. |
| Cambia la fecha de entrega | Se recalcula su clasificación sin cambiar el estado. |
| Almacenamiento local borrado por usuario/navegador | No se garantiza recuperación; el MVP no sincroniza ni almacena copia remota. |
| Almacenamiento no disponible, lleno o con error | Se informa claramente y no se confirma un guardado fallido. La recuperación automática queda abierta en DA-01. |
| Confirmación de borrado cancelada | La actividad permanece intacta; no existe deshacer después de confirmar el borrado. |

## 9. Fuera de alcance

- Cuentas, registro, autenticación, inicio/cierre de sesión, contraseñas y recuperación de acceso.
- Sincronización entre dispositivos, almacenamiento remoto de datos académicos o acceso a los mismos datos desde otro navegador/perfil.
- Exportación, importación, copias de seguridad y restauración de datos.
- Editar o eliminar materias.
- Compartir información, grupos o colaboración entre estudiantes.
- Horas de entrega; tipos de actividad distintos de tarea, trabajo y examen; estados distintos de pendiente y completada.
- Notificaciones, recordatorios automáticos, calendarios externos, archivos adjuntos y actividades recurrentes.
- Planificación técnica, implementación y tareas de desarrollo en esta SPEC.

## 10. Criterios de finalización

### Finalización de la SPEC

- Decisiones aprobadas reflejadas sin añadir reglas de negocio.
- Historias, requisitos EARS, aceptación, requisitos no funcionales, casos límite, fuera de alcance y dudas mantienen referencias coherentes.
- Requisitos de cuenta, autenticación, recuperación y sincronización remota retirados.

### Finalización futura del MVP

- Requisitos aprobados implementados y criterios de aceptación aplicables verificados.
- Materias y actividades guardadas localmente se conservan entre usos en el mismo navegador mientras el almacenamiento siga disponible.
- Tipos, estados, filtros, ordenación y vencimientos cumplen los requisitos y las decisiones que se resuelvan de DA-01 a DA-03.
- No se añade almacenamiento remoto, autenticación ni sincronización.

## 11. Dudas abiertas

La fase de preguntas está cerrada; estas dudas se registran sin reabrirla. No se presuponen requisitos para resolverlas.

- **DA-01 — Recuperación de errores locales. [NECESITA ACLARACIÓN]** Está aprobado mostrar un mensaje claro y no sobrescribir ni eliminar intencionalmente datos existentes. No se ha definido una recuperación automática ante cuota agotada o almacenamiento local corrupto; no se garantiza restauración tras borrar los datos del sitio.
- **DA-02 — Presentación y accesibilidad. [NECESITA ACLARACIÓN]** No se especificaron idioma de interfaz, accesibilidad concreta, estados vacíos ni formato visual de fechas. La compatibilidad aprobada se limita a versiones actuales de Chrome, Edge y Firefox de escritorio.
- **DA-03 — Volumen y rendimiento. [NECESITA ACLARACIÓN]** No se establecieron volúmenes esperados ni umbrales de rendimiento. El listado del MVP no tendrá paginación.
