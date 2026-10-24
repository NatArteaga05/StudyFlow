# Documentación SDD de StudyFlow

Este directorio reúne las decisiones y artefactos del producto antes y durante su implementación. Toda la documentación del proyecto se mantiene en español.

## Artefactos

- `001-studyflow/spec.md`: define qué debe hacer el MVP, sus requisitos EARS, aceptación y dudas abiertas.
- `001-studyflow/plan.md`: define cómo se propone implementar los requisitos aprobados.
- `001-studyflow/tasks.md`: desglosa un PLAN aprobado en actividades concretas y verificables; se crea únicamente en la fase TASKS autorizada.
- `001-studyflow/clarificaciones.md`: conserva el historial y la trazabilidad de las decisiones del usuario.

## Fases SDD

1. **CONSTITUTION:** definir y aprobar los principios del proyecto.
2. **SPEC:** definir y aprobar requisitos antes del diseño técnico; establece qué debe hacer el sistema.
3. **PLAN:** crear y aprobar el diseño técnico a partir de una SPEC aprobada; establece cómo implementarlo.
4. **TASKS:** dividir un PLAN aprobado en tareas pequeñas y verificables.
5. **IMPLEMENTATION:** ejecutar solo tareas autorizadas; escribir primero las pruebas de cada tarea y después su código.
6. **VERIFICATION:** comprobar los requisitos funcionales, criterios de aceptación y resultados de pruebas e informar la evidencia.

No avanzar de fase sin aprobación explícita. Los cambios de comportamiento deben actualizar primero la SPEC. Las decisiones aprobadas no se modifican sin autorización.

## Estado actual

El usuario aprobó el contenido de `001-studyflow/spec.md` y `001-studyflow/plan.md` como base para continuar. TASKS es la siguiente fase, pero `tasks.md` aún no debe generarse: se requiere autorización expresa para iniciar el desglose.

Conservar las tres dudas no bloqueantes de la SPEC:

- **DA-01:** recuperación manual ante cuota agotada o almacenamiento local corrupto.
- **DA-02:** accesibilidad, estados vacíos, idioma de interfaz y formato visual de fecha.
- **DA-03:** volúmenes esperados y umbrales de rendimiento; el listado no tiene paginación en el MVP.

Estas dudas no se resuelven por suposición ni se eliminan del desglose si siguen siendo pertinentes. No bloquean tareas que no dependan de ellas.

## Reglas de documentación y trabajo

- Inspeccionar las fuentes existentes antes de editar y mantener referencias a requisitos, criterios de aceptación y decisiones.
- No inventar requisitos, ampliar el MVP ni cambiar decisiones aprobadas sin autorización.
- No escribir código ni ejecutar pruebas antes de IMPLEMENTATION. Aplicar TDD al implementar tareas autorizadas.
- No confundir la revisión documental con la ejecución de pruebas de código; informar solo verificaciones realmente realizadas.
