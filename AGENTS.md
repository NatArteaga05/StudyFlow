# Instrucciones generales de StudyFlow

## Propósito y fuentes

StudyFlow utiliza Spec-Driven Development (SDD). Antes de trabajar, inspeccionar el proyecto y leer:

1. [Constitución](docs/constitution.md): principios y reglas del proceso.
2. [SPEC](specs/001-studyflow/spec.md): qué debe hacer el sistema, sus requisitos y criterios aprobados.
3. [PLAN](specs/001-studyflow/plan.md): cómo se propone implementar los requisitos aprobados.
4. [Aclaraciones](specs/001-studyflow/clarificaciones.md): historial de decisiones del usuario.
5. [Guía SDD](specs/README.md): fases y estado del trabajo documental.

Las instrucciones explícitas más recientes del usuario tienen prioridad. Las decisiones históricas sustituidas no son vigentes. No convertir una duda abierta en requisito ni elegir una regla de negocio por cuenta propia.

## Convención del proyecto

- `docs/constitution.md`: principios aprobados del proyecto y del proceso SDD.
- `specs/001-studyflow/spec.md`: definición de qué debe hacer el producto.
- `specs/001-studyflow/plan.md`: diseño técnico de cómo implementar la SPEC.
- `specs/001-studyflow/tasks.md`: desglose verificable de un PLAN aprobado; aún no se debe crear.
- `specs/001-studyflow/clarificaciones.md`: trazabilidad de decisiones.
- `studyflow/`: código futuro de la aplicación.
- `tests/`: pruebas futuras.
- `AGENTS.md`: instrucciones generales para agentes que trabajen en el proyecto.

Reutilizar la estructura existente, inspeccionar antes de editar y no crear copias ni estructuras paralelas.

## Flujo SDD y aprobaciones

No avanzar de fase sin aprobación explícita del usuario. La aprobación de una fase autoriza trabajar en la siguiente solo en la medida indicada; no autoriza automáticamente la implementación.

1. **CONSTITUTION:** definir y aprobar los principios del proyecto.
2. **SPEC:** definir y aprobar requisitos antes del diseño técnico. La SPEC define qué debe hacer el sistema.
3. **PLAN:** crear y aprobar el diseño técnico a partir de una SPEC aprobada. El PLAN define cómo implementarlo.
4. **TASKS:** dividir un PLAN aprobado en actividades pequeñas, concretas y verificables. Crear `tasks.md` solo cuando el usuario autorice esta fase.
5. **IMPLEMENTATION:** implementar únicamente tareas autorizadas. Escribir primero las pruebas de la tarea y después el código correspondiente.
6. **VERIFICATION:** comprobar requisitos funcionales, criterios de aceptación y resultados de las pruebas; informar qué se verificó y sus resultados.

### Comprobación obligatoria de dependencias antes de IMPLEMENTATION

Antes de iniciar cualquier tarea Tn, sin excepción por la redacción de la solicitud, leer `specs/001-studyflow/tasks.md`, localizar la tarea y revisar sus dependencias. Comprobar que cada dependencia obligatoria esté marcada como completada (`[x]`).

Si alguna dependencia figura pendiente (`[ ]`), detenerse antes de implementar y comunicar qué dependencias bloquean la tarea y cuáles deben completarse primero. Mientras exista una dependencia pendiente, no crear, modificar ni eliminar archivos, ejecutar pruebas ni cambiar el estado de tareas. No implementar automáticamente las dependencias faltantes. Solo continuar con la tarea solicitada cuando todas sus dependencias estén completadas.

Si cambia el comportamiento esperado, actualizar primero la SPEC y obtener aprobación antes de modificar el PLAN o las tareas afectadas. No modificar decisiones aprobadas sin autorización.

## Estado vigente

- El usuario aprobó como base vigente `specs/001-studyflow/spec.md` y `specs/001-studyflow/plan.md`.
- TASKS es la siguiente fase. No crear `tasks.md` hasta que el usuario solicite e inicie expresamente esa fase.
- Conservar las tres dudas no bloqueantes vigentes en la SPEC: DA-01 recuperación ante errores locales, DA-02 presentación y accesibilidad, DA-03 volumen y rendimiento. No descartarlas ni inventar decisiones para resolverlas.
- Mantenerlas visibles durante TASKS si afectan a una tarea; no tratarlas como bloqueantes para desglosar el trabajo que no dependa de ellas.

## Reglas generales

- Mantener la documentación en español, clara y profesional.
- No ampliar el MVP ni cambiar requisitos o decisiones aprobados sin autorización.
- Conservar identificadores y referencias de historias, requisitos, criterios de aceptación y dudas.
- No escribir código ni ejecutar pruebas antes de IMPLEMENTATION. Durante IMPLEMENTATION, seguir TDD: pruebas de la tarea antes del código. VERIFICATION comprueba el resultado después.
- No eliminar trabajo existente. Resumir los cambios y verificaciones realmente realizadas, sin afirmar que se ejecutaron pruebas cuando no se ejecutaron.
