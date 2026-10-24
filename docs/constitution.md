# Constitución de StudyFlow

## 1. Propósito

Establecer los principios para desarrollar StudyFlow mediante Spec-Driven Development (SDD), respetando el alcance y las decisiones del usuario. Este documento regula el trabajo del proyecto; no añade funcionalidades ni sustituye la [SPEC del MVP](../specs/001-studyflow/spec.md).

## 2. La especificación guía el desarrollo

La SPEC define qué debe hacer StudyFlow: requisitos, historias, criterios de aceptación, casos límite y dudas abiertas. Debe aprobarse antes de diseñar la solución técnica. El PLAN define cómo se implementarán los requisitos de una SPEC aprobada y debe aprobarse antes de desglosarlo en tareas.

La ubicación canónica de la especificación actual es `specs/001-studyflow/spec.md`. El historial de aclaraciones se conserva en `specs/001-studyflow/clarificaciones.md`.

## 3. Las decisiones de negocio pertenecen al usuario

No inventar requisitos, ampliar el MVP ni modificar decisiones aprobadas sin autorización. Una decisión posterior autorizada puede sustituir una anterior; el registro debe permitir reconocer esa sustitución.

Las dudas no resueltas se marcan como `[NECESITA ACLARACIÓN]` en la sección de dudas abiertas de la SPEC. Una duda documentada no equivale a una decisión aprobada. La fase de preguntas actual está cerrada y no se reabre por iniciativa del agente.

## 4. Etapas separadas y alcance limitado

El proceso SDD sigue estas fases, en orden:

1. **CONSTITUTION:** definir y aprobar principios del proyecto.
2. **SPEC:** definir y aprobar qué debe hacer el sistema antes del diseño técnico.
3. **PLAN:** definir y aprobar cómo implementar una SPEC aprobada.
4. **TASKS:** dividir un PLAN aprobado en tareas pequeñas y verificables.
5. **IMPLEMENTATION:** ejecutar solo tareas autorizadas, escribiendo primero sus pruebas y después el código.
6. **VERIFICATION:** comprobar los requisitos funcionales, criterios de aceptación y resultados de las pruebas.

No avanzar de fase sin aprobación explícita del usuario. La aprobación de una fase no autoriza cambios fuera del alcance aprobado ni la implementación de tareas que no hayan sido autorizadas.

Los cambios de comportamiento se reflejan primero en la SPEC y deben aprobarse antes de modificar el PLAN o tareas relacionadas. No se escribe código ni se ejecutan pruebas antes de IMPLEMENTATION. En IMPLEMENTATION se aplica TDD; en VERIFICATION se informa la evidencia y los resultados reales.

El flujo no cambia por sí mismo los requisitos del producto ni añade funcionalidades. Las dudas aprobadas como no bloqueantes se conservan y no se resuelven por suposición.

## 5. Requisitos claros y verificables

La documentación se mantiene en español. Los requisitos funcionales se redactan con EARS y se acompañan de criterios de aceptación verificables. Los casos límite y las exclusiones deben ser explícitos.

Conservar los identificadores de historias, requisitos y criterios de aceptación para mantener la trazabilidad. No convertir una elección técnica o una suposición en una regla de negocio.

## 6. Conservación y estructura única

Inspeccionar los archivos existentes antes de modificarlos. Reutilizar la estructura acordada, crear únicamente los elementos faltantes y conservar el trabajo y la documentación útil existentes.

| Ubicación | Responsabilidad |
| --- | --- |
| `docs/constitution.md` | Principios y reglas del proyecto. |
| `AGENTS.md` | Instrucciones generales de trabajo y flujo SDD. |
| `specs/001-studyflow/spec.md` | Definición del MVP. |
| `specs/001-studyflow/plan.md` | Diseño técnico derivado de la SPEC aprobada. |
| `specs/001-studyflow/tasks.md` | Desglose del PLAN aprobado, cuando el usuario autorice la fase TASKS. |
| `specs/001-studyflow/clarificaciones.md` | Historial de aclaraciones y decisiones. |
| `specs/README.md` | Guía documental existente. |
| `studyflow/` | Código futuro de la aplicación. |
| `tests/` | Pruebas futuras. |

No crear copias de la SPEC ni estructuras paralelas. Los movimientos autorizados deben conservar el contenido y mantener las referencias coherentes.

## 7. Cambios y verificación

Los cambios documentales deben limitarse al trabajo solicitado. Los requisitos aprobados de la SPEC se mantienen intactos durante la reorganización.

La revisión documental comprueba estructura, referencias y conservación del contenido; no implica ejecutar pruebas de código. Las pruebas se escriben primero durante IMPLEMENTATION y se ejecutan/reportan conforme a las tareas autorizadas y la fase VERIFICATION. Informar con precisión qué archivos se crearon, modificaron o movieron y qué quedó pendiente.

Cualquier cambio posterior de estos principios debe respetar las instrucciones explícitas del usuario y no puede utilizarse para ampliar por sí mismo el alcance del producto.
