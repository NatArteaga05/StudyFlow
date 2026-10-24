# StudyFlow

StudyFlow es una aplicación web en desarrollo para que estudiantes universitarios organicen sus materias y actividades académicas. Busca ayudarles a registrar entregas, seguir su cumplimiento y consultar fechas próximas o vencidas desde un solo lugar.

El almacenamiento previsto es local al navegador y al perfil/origen donde se utiliza la aplicación. No hay cuentas ni sincronización entre dispositivos; los datos no estarán disponibles automáticamente en otro navegador o dispositivo.

Cuando se implemente, IndexedDB conservará los datos en el almacenamiento del sitio. Si se eliminan los datos del sitio o el perfil del navegador, esos datos locales pueden perderse.

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

Spec-Driven Development (SDD) organiza el desarrollo alrededor de especificaciones aprobadas. En StudyFlow, la [SPEC](specs/001-studyflow/spec.md) define qué debe hacer el producto; el [PLAN](specs/001-studyflow/plan.md) describe cómo implementarlo; y [TASKS](specs/001-studyflow/tasks.md) divide ese diseño en trabajo concreto. La [Constitución](docs/constitution.md) establece los principios, y [`AGENTS.md`](AGENTS.md) reúne las instrucciones de trabajo. Esto mantiene la trazabilidad y evita convertir supuestos técnicos o dudas en nuevas reglas de negocio.

Las fases avanzan en este orden y requieren aprobación antes de pasar a la siguiente:

| Fase | Propósito |
| --- | --- |
| **CONSTITUTION** | Definir los principios y reglas en [`docs/constitution.md`](docs/constitution.md). |
| **SPEC** | Definir y aprobar usuarios, comportamiento, requisitos y criterios de aceptación en [`specs/001-studyflow/spec.md`](specs/001-studyflow/spec.md). |
| **PLAN** | Diseñar la arquitectura y la implementación a partir de la SPEC aprobada en [`specs/001-studyflow/plan.md`](specs/001-studyflow/plan.md). |
| **TASKS** | Dividir el PLAN aprobado en tareas pequeñas, ordenadas y verificables en [`specs/001-studyflow/tasks.md`](specs/001-studyflow/tasks.md). |
| **IMPLEMENTATION** | Ejecutar solo las tareas autorizadas; escribir primero las pruebas de cada tarea y después su implementación. |
| **VERIFICATION** | Comprobar requisitos y criterios de aceptación, y registrar los resultados reales de pruebas y verificaciones. |

Los cambios de comportamiento comienzan por la SPEC. Las dudas abiertas no se convierten en requisitos sin aprobación. El historial de decisiones está en [`clarificaciones.md`](specs/001-studyflow/clarificaciones.md), y la guía del flujo en [`specs/README.md`](specs/README.md).

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
│   ├── src/
│   │   ├── App.tsx                  # Punto de entrada actual de la interfaz
│   │   └── domain/
│   │       ├── activities/          # Tipos y validación de actividades
│   │       ├── dates/               # Fechas calendario y clasificación de vencimientos
│   │       └── subjects/            # Tipos y validación de materias
│   ├── package.json                # Scripts y dependencias del frontend
│   └── vite.config.ts              # Configuración de Vite
└── tests/
    ├── setup.test.tsx               # Verificación básica del entorno de pruebas
    └── unit/domain/                 # Pruebas de dominio
```

El paquete ejecutable y sus comandos npm están en `studyflow/`. Las pruebas están en `tests/` en la raíz y Vitest está configurado para encontrarlas allí.

## Desarrollo con agentes de IA

Codex y otros agentes deben leer las instrucciones del proyecto y las fuentes SDD antes de trabajar. Deben respetar la SPEC, no cambiar decisiones aprobadas y trabajar únicamente en tareas autorizadas.

Antes de iniciar cualquier tarea, el agente comprueba en `specs/001-studyflow/tasks.md` que todas sus dependencias estén marcadas como completadas (`[x]`). Si alguna está pendiente, debe detenerse e indicar qué tareas van primero; no debe implementar automáticamente las dependencias faltantes. En IMPLEMENTATION se sigue TDD: se escribe primero la prueba de la tarea y después el código correspondiente. Las pruebas y los resultados se informan sin declarar como verificado lo que no se ejecutó o no pasó.

## Instalación y ejecución

### Requisitos previos

- **Node.js:** 20.x, 22.x o 24 o posterior. El Vitest fijado en el lockfile declara compatibilidad con Node.js `^20.0.0 || ^22.0.0 || >=24.0.0`; Vite 6.4.5 también es compatible con esos rangos. Se recomienda usar una versión LTS dentro de los rangos compatibles. [Requisitos de Vitest 4](https://v4.vitest.dev/guide/migration.html) · [Compatibilidad de Node.js de Vite 6](https://vite.dev/blog/announcing-vite6)
- **npm:** 7 o posterior. El lockfile del proyecto usa formato versión 3, admitido por npm 7 y posteriores. [Documentación de `package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json)

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

La lógica de dominio implementada incluye validación de nombres de materias, validación de fechas gregorianas y clasificación de vencimientos, además de tipos y validación de actividades. Estas piezas no equivalen a funcionalidades completas disponibles para el estudiante.

| Área | Estado actual |
| --- | --- |
| Base del frontend y entorno de desarrollo | React, TypeScript, Vite y Vitest están configurados. |
| Lógica de dominio | Hay módulos para validar materias y actividades, validar fechas y clasificar vencimientos. |
| Interfaz y flujos de uso | Aún no están implementados como funcionalidades completas; la interfaz actual es solo un esqueleto. |
| Persistencia | IndexedDB está aprobada como almacenamiento local, pero su integración todavía está en desarrollo. |
| Gestión completa de materias y actividades | Alta y consulta de materias, operaciones integradas de actividades, cambios de estado, filtros y ordenación aún requieren implementación e integración. |

No hay cuentas, almacenamiento remoto ni sincronización entre dispositivos. Los resultados de verificación y pruebas deben consultarse en las ejecuciones correspondientes; este README no mantiene resultados numéricos que puedan quedar desactualizados. Para conocer el progreso vigente de cada tarea, consulta [`specs/001-studyflow/tasks.md`](specs/001-studyflow/tasks.md), la fuente oficial de seguimiento de tareas.

## Verificación y trazabilidad

La verificación sigue la cadena **SPEC → PLAN → TASKS → pruebas y resultados**:

1. Los requisitos funcionales `RF-*` y criterios de aceptación `CA-*` están identificados en [`spec.md`](specs/001-studyflow/spec.md).
2. [`plan.md`](specs/001-studyflow/plan.md) relaciona esos requisitos con componentes, datos y decisiones técnicas.
3. Cada tarea en [`tasks.md`](specs/001-studyflow/tasks.md) indica sus dependencias, requisitos y criterios relacionados, además de una condición objetiva de finalización.
4. Las pruebas unitarias, de integración y de interfaz se vinculan a las tareas que cubren. Durante IMPLEMENTATION se escriben antes del código correspondiente.
5. La verificación final registra qué criterios pasaron, cuáles fallaron y qué evidencia los cubre; una prueba fallida no se reporta como conforme.

La matriz de trazabilidad de [`tasks.md`](specs/001-studyflow/tasks.md) permite comprobar la cobertura de RF-01–RF-27 y CA-01–CA-19. Las dudas DA-01, DA-02 y DA-03 permanecen documentadas en la SPEC y no se resuelven por suposición.
