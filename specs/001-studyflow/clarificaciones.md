# Aclaraciones del MVP de StudyFlow

Estado: fase de preguntas cerrada por instrucción del usuario. Especificación redactada en `spec.md`, con las ambigüedades restantes señaladas como `[NECESITA ACLARACIÓN]`.

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

## Cierre de la fase de preguntas

El usuario indicó que no se hagan más preguntas y que se redacte la especificación con las decisiones disponibles. Las ambigüedades restantes se registran en la sección «Dudas abiertas» de `spec.md` con la marca `[NECESITA ACLARACIÓN]`. No se incorporan como requisitos resueltos.
