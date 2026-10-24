# Aclaraciones del MVP de StudyFlow

Estado: ronda inicial de preguntas cerrada. Las decisiones posteriores de la revisión QA están registradas al final y aprobadas por el usuario; DA-01, DA-02 y DA-03 permanecen abiertas en `spec.md`.

La fuente inicial del alcance es la solicitud del usuario en esta conversación. Las respuestas posteriores se registrarán aquí antes de incorporarlas a `spec.md`.

## Revisión inicial

- La carpeta de trabajo estaba vacía, incluidos los archivos ocultos.
- No se encontró un repositorio Git inicializado ni documentación o código previos en la carpeta de trabajo.
- Se preparó únicamente la estructura mínima de documentación SDD.

## Preguntas y respuestas

### 1. Usuarios y separación de datos

Pregunta: ¿El MVP será de uso individual, sin cuentas ni inicio de sesión, o permitirá que varios estudiantes tengan cuentas con información separada?

Respuesta: individual.

Decisión confirmada: el MVP será de uso individual, sin cuentas ni inicio de sesión.

### 2. Conservación de la información

Pregunta: ¿Es suficiente conservar la información en el mismo navegador y dispositivo, aunque se pierda al borrar los datos del navegador, o necesitas recuperarla también desde otros dispositivos?

Respuesta del usuario: «recuperar».

Estado histórico: necesidad de recuperación aclarada en esta pregunta; el acceso en línea y el inicio de sesión se confirmaron en las preguntas siguientes.

Pregunta de seguimiento: ¿Necesitas recuperar tus datos desde otro dispositivo, después de borrar los datos del navegador, o en ambos casos?

Respuesta al seguimiento: «otro dispositivo».

Decisión confirmada: el usuario necesita recuperar su información desde otro dispositivo. No se ha confirmado la recuperación después de borrar los datos del navegador ni se ha elegido un mecanismo de almacenamiento o recuperación.

### 3. Mecanismo de recuperación entre dispositivos

Pregunta: ¿Te basta exportar un archivo con tus datos e importarlo en otro dispositivo, manteniendo el uso sin cuentas, o necesitas acceder a tus datos guardados en línea, lo que requiere revisar cómo se identificará al usuario y se protegerá el acceso?

Respuesta: «acceder en línea».

Decisión confirmada: los datos deben estar guardados en línea y ser accesibles desde otro dispositivo. La exportación e importación de archivos no se incorpora al MVP.

Seguimiento: las preguntas 4 y 5 resolvieron la identificación mediante una cuenta personal con correo y contraseña, con autorización para cambiar la decisión inicial. El uso individual se mantiene.

### 4. Revisión de la decisión sobre inicio de sesión

Pregunta: ¿Autorizas incluir una cuenta personal con inicio de sesión en el MVP para acceder a tus datos desde distintos dispositivos?

Respuesta: «sí».

Decisión confirmada: el usuario autoriza incluir una cuenta personal con inicio de sesión en el MVP para acceder a sus datos guardados en línea desde distintos dispositivos. Esta autorización sustituye la decisión inicial de no incluir cuentas ni inicio de sesión; se mantiene el uso individual.

### 5. Método de inicio de sesión

Pregunta: ¿Cómo prefieres iniciar sesión: con Google, con correo y contraseña, o mediante un enlace de acceso enviado a tu correo?

Respuesta: «correo y contraseña».

Decisión confirmada: el inicio de sesión será mediante correo y contraseña.

### 6. Creación de la cuenta

Pregunta: ¿Quieres poder crear tu cuenta desde StudyFlow o usar una cuenta creada previamente para ti, sin una pantalla de registro en el MVP?

Respuesta: «cuenta creada».

Decisión confirmada: se utilizará una cuenta creada previamente para el usuario; el MVP no incluirá una pantalla de registro. El mecanismo de preparación de esa cuenta no se ha definido.

### 7. Recuperación de contraseña

Pregunta: Si olvidas la contraseña, ¿el MVP debe permitir restablecerla mediante un enlace enviado a tu correo, o se resolverá fuera de la aplicación?

Respuesta: «enlace».

Decisión confirmada: el MVP permitirá restablecer la contraseña mediante un enlace enviado al correo de la cuenta.

### 8. Actividades próximas a vencer

Pregunta: ¿Con cuántos días de anticipación debe considerarse que una actividad está próxima a vencer: 3 días, 7 días u otra cantidad?

Respuesta: «3».

Decisión confirmada: el plazo para identificar actividades próximas a vencer será de 3 días. Las preguntas 9 y 10 resolvieron la inclusión del día actual y el tratamiento de las actividades completadas.

### 9. Actividades con fecha de entrega hoy

Pregunta: ¿Una actividad con fecha de entrega hoy debe seguir vigente durante todo el día y considerarse próxima a vencer, pasando a vencida al día siguiente si sigue pendiente?

Respuesta: «sí».

Decisión confirmada: una actividad con fecha de entrega hoy sigue vigente durante todo el día y se considera próxima a vencer. Al día siguiente pasa a vencida si continúa pendiente.

### 10. Vencimiento de actividades completadas

Pregunta: ¿Las actividades completadas deben dejar de aparecer como vencidas o próximas a vencer, conservando su fecha de entrega?

Respuesta: «sí».

Decisión confirmada: las actividades completadas conservan su fecha de entrega, pero no se identifican como vencidas ni próximas a vencer.

### 11. Referencia para la fecha actual

Pregunta: Para determinar qué día es «hoy», ¿debe usarse la fecha local del dispositivo desde el que accedes o una zona horaria fija para todos tus dispositivos?

Respuesta: «local».

Decisión confirmada: se usará la fecha local del dispositivo desde el que se accede para determinar «hoy» y calcular los vencimientos. Las fechas de entrega seguirán siendo fechas de calendario sin hora.

### 12. Fechas de entrega pasadas

Pregunta: ¿Debe permitirse crear o editar una actividad con una fecha de entrega anterior a hoy?

Respuesta: «sí».

Decisión confirmada: se permite crear o editar actividades con fecha de entrega anterior a hoy. Si están pendientes, se identificarán como vencidas; si están completadas, no se identificarán como vencidas.

### 13. Datos de una materia

Pregunta: Para registrar una materia en el MVP, ¿basta con un nombre obligatorio o necesitas algún otro dato?

Respuesta: «solo nombre».

Decisión confirmada: una materia tendrá únicamente un nombre obligatorio como dato de negocio.

## Cierre de la ronda inicial de preguntas

El usuario indicó que no se hicieran más preguntas durante la ronda inicial. Las dudas pendientes de esa especificación se conservaron en la sección «Dudas abiertas» de `spec.md`; no se incorporaron entonces como requisitos resueltos.

## Aclaraciones posteriores a la revisión QA

El usuario aprobó estas decisiones para incorporarlas a `spec.md`:

1. Los límites de 100 caracteres para nombres de materias y títulos de actividades se cuentan en grafemas Unicode.
2. La comparación de nombres de materias ignora los espacios en blanco Unicode exteriores, además de mayúsculas/minúsculas; conserva acentos y espacios interiores.
3. El filtro de vencimiento ofrece «Todos», «Vencidas», «Próximas a vencer» y «Posteriores a tres días». «Todos» desactiva el filtro de vencimiento. Las actividades completadas no pertenecen a las categorías de vencimiento.
4. Los títulos se ordenan según el alfabeto español, ignorando mayúsculas y distinguiendo acentos.
5. La validez de fechas sigue el calendario gregoriano, incluidas las reglas para años seculares.
6. Las descripciones vacías o compuestas solo por espacios en blanco Unicode se tratan como omitidas. Las descripciones con contenido se conservan sin límite adicional de longitud.
7. Si falla una validación, se informa que la operación no se guardó y se conservan los datos anteriores. Si falla el almacenamiento, se informa que la operación no pudo confirmarse o completarse, sin detalles técnicos ni garantías sobre un estado no verificado.

Estas aclaraciones no resuelven DA-01 (recuperación automática de errores locales), DA-02 (presentación y accesibilidad) ni DA-03 (volumen y rendimiento).

### Sustitución de decisiones históricas sobre acceso y almacenamiento

Las decisiones históricas de las secciones 2 a 7 que autorizaban recuperar datos desde otros dispositivos, guardar datos en línea, usar una cuenta personal, iniciar sesión con correo y contraseña y restablecer la contraseña mediante un enlace quedan sustituidas por la decisión vigente aprobada posteriormente: StudyFlow no tendrá cuentas ni autenticación; conservará los datos localmente en IndexedDB y no sincronizará datos entre dispositivos. Se conservan las respuestas y decisiones históricas anteriores como registro, pero no describen el alcance vigente del MVP.
