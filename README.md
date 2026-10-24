# StudyFlow

StudyFlow es una aplicación web en desarrollo para que estudiantes universitarios organicen sus materias y actividades académicas. Busca ayudarles a registrar entregas, seguir su cumplimiento y consultar fechas próximas o vencidas desde un solo lugar.

El almacenamiento previsto es local al navegador y al perfil/origen donde se utiliza la aplicación. No hay cuentas ni sincronización entre dispositivos; los datos no estarán disponibles automáticamente en otro navegador o dispositivo.

## Alcance del MVP

La SPEC aprobada define que el MVP permitirá:

- Registrar y consultar materias. No se podrán editar ni eliminar.
- Crear, editar y eliminar tareas, trabajos y exámenes.
- Asignar a cada actividad título, tipo, materia, fecha de entrega y una descripción opcional. Se permiten títulos repetidos.
- Mantener las actividades pendientes o completadas. Las nuevas comenzarán pendientes.
- Listar, ordenar y combinar filtros por materia, estado y vencimiento.
- Identificar como vencidas las actividades pendientes cuya fecha ya pasó y como próximas a vencer las que vencen entre hoy y los siguientes tres días calendario, inclusive.
- Conservar materias y actividades localmente entre usos, mientras los datos del sitio sigan disponibles.

Las fechas se comparan como días de calendario según la fecha local del navegador, sin hora. La definición completa está en [`specs/001-studyflow/spec.md`](specs/001-studyflow/spec.md).

## Tecnologías

| Tecnología | Uso previsto |
| --- | --- |
| React | Construir la interfaz web. |
| TypeScript | Definir tipos y validar el código durante la compilación. |
| Vite | Ejecutar el servidor de desarrollo y generar la compilación web. |
| IndexedDB nativo | Conservar materias y actividades localmente en el navegador. |

React, TypeScript y Vite están configurados. IndexedDB es la persistencia aprobada en el PLAN, pero todavía no está implementada.

## Desarrollo guiado por especificaciones (SDD)

Spec-Driven Development (SDD) organiza el desarrollo alrededor de especificaciones aprobadas. En StudyFlow, la SPEC define qué debe hacer el producto; el PLAN describe cómo implementarlo; y TASKS divide ese diseño en trabajo concreto. Esto mantiene la trazabilidad y evita convertir supuestos técnicos o dudas en nuevas reglas de negocio.

Las fases avanzan en este orden y requieren aprobación antes de pasar a la siguiente:

| Fase | Propósito |
| --- | --- |
| **CONSTITUTION** | Definir los principios y reglas del proyecto y del proceso. |
| **SPEC** | Definir y aprobar usuarios, comportamiento, requisitos y criterios de aceptación. |
| **PLAN** | Diseñar la arquitectura y la implementación a partir de la SPEC aprobada. |
| **TASKS** | Dividir el PLAN aprobado en tareas pequeñas, ordenadas y verificables. |
| **IMPLEMENTATION** | Ejecutar solo las tareas autorizadas; escribir primero las pruebas de cada tarea y después su implementación. |
| **VERIFICATION** | Comprobar requisitos y criterios de aceptación, y registrar los resultados reales de pruebas y verificaciones. |

Los cambios de comportamiento comienzan por la SPEC. Las dudas abiertas no se convierten en requisitos sin aprobación.

## Estructura del repositorio

```text
.
├── AGENTS.md                       # Instrucciones para agentes y flujo SDD
├── docs/
│   └── constitution.md             # Principios del proyecto
├── specs/
│   ├── README.md                   # Guía documental SDD
│   └── 001-studyflow/
│       ├── clarificaciones.md      # Historial de decisiones
│       ├── spec.md                 # Requisitos y criterios aprobados
│       ├── plan.md                 # Diseño técnico
│       └── tasks.md                # Desglose y estado de implementación
├── studyflow/
│   ├── src/                        # Aplicación React y lógica de dominio actual
│   ├── package.json                # Scripts y dependencias del frontend
│   └── vite.config.ts              # Configuración de Vite
└── tests/                          # Pruebas del proyecto
    └── unit/domain/
```

El paquete ejecutable y sus comandos npm están en `studyflow/`. Las pruebas están en `tests/` en la raíz y Vitest está configurado para encontrarlas allí.

## Desarrollo con agentes de IA

Codex y otros agentes deben leer las instrucciones del proyecto y las fuentes SDD antes de trabajar. Deben respetar la SPEC, no cambiar decisiones aprobadas y trabajar únicamente en tareas autorizadas.

Antes de iniciar cualquier tarea, el agente comprueba en `specs/001-studyflow/tasks.md` que todas sus dependencias estén marcadas como completadas (`[x]`). Si alguna está pendiente, debe detenerse e indicar qué tareas van primero; no debe implementar automáticamente las dependencias faltantes. En IMPLEMENTATION se sigue TDD: se escribe primero la prueba de la tarea y después el código correspondiente. Las pruebas y los resultados se informan sin declarar como verificado lo que no se ejecutó o no pasó.

## Instalación y ejecución

Ejecuta estos comandos desde la raíz del repositorio. La instalación usa el lockfile existente:

```sh
cd studyflow
npm ci
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación. Los siguientes comandos también se ejecutan desde `studyflow/`:

```sh
npm test
npm run build
```

`npm test` ejecuta Vitest con las pruebas del directorio `tests/` de la raíz. Para ejecutar un archivo concreto, por ejemplo:

```sh
npm test -- tests/unit/domain/subjects.test.ts
```

## Estado del desarrollo

Según `specs/001-studyflow/tasks.md`, T1–T4 están marcadas como completadas y T5–T42 siguen pendientes. El estado de una tarea no significa que todas las funcionalidades relacionadas ya estén integradas: algunas tareas completadas escriben pruebas, antes de que exista la implementación prevista en una tarea posterior.

| Área | Estado actual |
| --- | --- |
| Base React + TypeScript + Vite y entorno de pruebas | Configurados en T1. |
| Validación de nombres de materias | Implementada en T3; las pruebas correspondientes se escribieron en T2. El alta, consulta y persistencia de materias aún están pendientes. |
| Fechas y vencimientos | Las pruebas de T4 están escritas. La lógica de fechas y vencimiento corresponde a T5 y sigue pendiente; por ello, la funcionalidad todavía no está implementada. |
| Actividades, estados, filtros y operaciones de almacenamiento | Pendientes en las tareas posteriores. |
| Persistencia local con IndexedDB | Aprobada en el PLAN; la implementación sigue pendiente. |

No hay cuentas, almacenamiento remoto ni sincronización entre dispositivos. Las pruebas de T4 se descubrieron, pero fallaron al ejecutarse porque los módulos de fecha y clasificación de T5 aún no existen; no se presentan como verificación funcional satisfactoria.

## Verificación y trazabilidad

La verificación sigue la cadena **SPEC → PLAN → TASKS → pruebas y resultados**:

1. Los requisitos funcionales `RF-*` y criterios de aceptación `CA-*` están identificados en `spec.md`.
2. `plan.md` relaciona esos requisitos con componentes, datos y decisiones técnicas.
3. Cada tarea indica sus dependencias, requisitos y criterios relacionados, además de una condición objetiva de finalización.
4. Las pruebas unitarias, de integración y de interfaz se vinculan a las tareas que cubren. Durante IMPLEMENTATION se escriben antes del código correspondiente.
5. La verificación final registra qué criterios pasaron, cuáles fallaron y qué evidencia los cubre; una prueba fallida no se reporta como conforme.

La matriz de trazabilidad de `tasks.md` permite comprobar la cobertura de RF-01–RF-27 y CA-01–CA-19. Las dudas DA-01, DA-02 y DA-03 permanecen documentadas en la SPEC y no se resuelven por suposición.
