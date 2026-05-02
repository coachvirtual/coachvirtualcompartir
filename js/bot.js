/* ============================================================
   COACH VIRTUAL — bot.js
   ============================================================ */

const BOT_DATA = {
    "inicio": {
        text: "¡Hola! 👋 Soy tu **Coach Bot**. Para darte la mejor guía, ¿cuál es tu perfil?",
        options: [
            { label: "Soy Docente 🍎",                          topic: "menu_profesor" },
            { label: "Soy Estudiante o Padre de familia 🎒",    topic: "menu_estudiante" }
        ]
    },
    "menu_profesor": {
        text: "¡Bienvenido, Profe! ¿Sobre qué ecosistema necesitas ayuda?",
        options: [
            { label: "Conocimientos (Libro Web y Actividades)", topic: "prof_conocimientos" },
            { label: "Progreso (Pleno)",                        topic: "progreso_docente" },
            { label: "Inglés (Richmond Studio)",                topic: "ingles_docente" },
            { label: "◀ Cambiar perfil",                        topic: "inicio" }
        ]
    },
    "menu_estudiante": {
        text: "¡Hola! ¿Qué necesitas revisar hoy?",
        options: [
            { label: "Conocimientos (Libro Web y Tareas)",      topic: "est_conocimientos" },
            { label: "Progreso (Pleno)",                        topic: "progreso_estudiante" },
            { label: "Inglés (Richmond Studio)",                topic: "ingles_estudiante" },
            { label: "◀ Cambiar perfil",                        topic: "inicio" }
        ]
    },

    // ── CONOCIMIENTOS DOCENTE ────────────────────────────────
    "prof_conocimientos": {
        text: "**Compartir Conocimientos — Docente**\n\n¿Qué deseas aprender?",
        options: [
            { label: "Gestión General (Asignar, Panel…)",       topic: "prof_gestion" },
            { label: "Crear Quizzes y Actividades 🧩",           topic: "quiz_categorias" },
            { label: "◀ Volver",                                 topic: "menu_profesor" }
        ]
    },
    "prof_gestion": {
        text: "¿Qué proceso deseas revisar?",
        options: [
            { label: "Primeros Pasos",                           topic: "docente_inicio" },
            { label: "Crear Tarea",                              topic: "docente_tarea" },
            { label: "Asignar Contenidos",                       topic: "docente_asignar" },
            { label: "Panel de Comunicaciones",                  topic: "docente_panel" },
            { label: "Agregar Material Propio",                  topic: "docente_material" },
            { label: "◀ Volver",                                 topic: "prof_conocimientos" }
        ]
    },
    "docente_inicio": {
        text: "**Primeros pasos en Compartir Conocimientos**\n\n1. Ingresa a edi.santillanacompartir.com.co.\n2. Arriba a la derecha: Biblioteca, Tareas, Calendario y Notificaciones.\n3. En el centro verás tus clases.\n4. Al entrar a una clase, 4 pestañas:\n  • **Programa:** Módulos y Aprendizajes Nucleares.\n  • **Recursos del aula:** Apoyo docente.\n  • **Panel:** Tablero de publicaciones.\n  • **Calificaciones:** Rejilla de control.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('Bv_FinX79vk')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },
    "docente_tarea": {
        text: "**Crear una Tarea**\n\n1. Ve al Aprendizaje Nuclear → clic en **'+'** > Tarea.\n2. Configura escala, categoría y destinatarios.\n3. Ponle título y elige formato (texto, archivo, audio).\n4. Clic en **Crear Tarea**.\n5. Edita el enunciado a la izquierda.\n6. Elige: Guardar (borrador), Guardar y publicar, o Programar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('KXROB84Q3IU')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },
    "docente_asignar": {
        text: "**Asignar contenidos**\n\n1. Asignatura → Aprendizaje Nuclear.\n2. Ubica el contenido y haz clic en los **tres puntos** → **'Asignar a…'**.\n3. Define quién puede verlo y fechas de entrega.\n4. Clic en Guardar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('X6akIQPrJWw')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },
    "docente_panel": {
        text: "**Panel de Comunicaciones**\n\n1. En tu clase → pestaña Panel.\n2. **Configuración**: define permisos de estudiantes.\n3. Escribe tu anuncio (adjuntos hasta 200 MB).\n4. Clic en Publicar. Los alumnos recibirán notificación.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('SO60tHz47kU')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },
    "docente_material": {
        text: "**Subir Material Propio**\n\n1. Inicio → **Mi Biblioteca**.\n2. Clic en **'+'** → Añadir material.\n3. Elige Enlace o Archivo.\n4. Título, descripción y clasificación.\n5. Clic en Aceptar. Tip: crea carpetas para organizarlo.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('sGX_D17T4h8')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },

    // ── CONOCIMIENTOS ESTUDIANTE ─────────────────────────────
    "est_conocimientos": {
        text: "**Compartir Conocimientos — Estudiante / Padre**",
        options: [
            { label: "Mis Primeros Pasos",                      topic: "est_inicio" },
            { label: "Cómo responder Tareas",                   topic: "est_tareas" },
            { label: "Buscar el Libro Web",                     topic: "est_libroweb" },
            { label: "Recursos de la Biblioteca",               topic: "est_biblioteca" },
            { label: "◀ Volver",                                topic: "menu_estudiante" }
        ]
    },
    "est_inicio": {
        text: "**Primeros pasos — Estudiante**\n\n1. Ingresa a edi.santillanacompartir.com.co.\n2. Selecciona Compartir Conocimientos.\n3. Arriba a la derecha: Tareas, Calendario, Notificaciones.\n4. Entra a tu clase y verás:\n  • **Programa:** actividades.\n  • **Recursos:** Flipbook.\n  • **Panel:** avisos del profe.\n  • **Calificaciones:** tus notas.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('9oKz6MQgDsk')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "est_conocimientos" }]
    },
    "est_tareas": {
        text: "**Responder Tareas**\n\n1. Clic en el ícono **Tareas** (arriba a la derecha) → Ver todo.\n2. Filtra por Pendiente.\n3. Selecciona la actividad, desarróllala y clic en **Enviar**.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('XugiPvcc20g')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "est_conocimientos" }]
    },
    "est_libroweb": {
        text: "**Libro Web**\n\n1. Entra a la asignatura → Aprendizaje Nuclear.\n2. En **Nuevos Aprendizajes** está tu Libro Web.\n3. Clic en **Ir** → **Ver**. Se abre en nueva pestaña.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('l0MHO5QO1eQ')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "est_conocimientos" }]
    },
    "est_biblioteca": {
        text: "**Biblioteca / Recursos del Aula**\n\n1. Entra a tu asignatura → pestaña **Recursos del aula**.\n2. En la sección **Anual** verás los materiales de apoyo.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('RjS2b5h-UqY')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "est_conocimientos" }]
    },

    // ── PROGRESO ─────────────────────────────────────────────
    "progreso_docente": {
        text: "**Compartir Progreso (Pleno) — Docente**",
        options: [
            { label: "Acceder y Planificar",                     topic: "pleno_doc_planificar" },
            { label: "Crear Evaluaciones (Banco / Propias)",     topic: "pleno_doc_crear" },
            { label: "Rúbricas y Calificación",                  topic: "pleno_doc_calificar" },
            { label: "Habilitar / Reiniciar Evaluaciones",       topic: "pleno_doc_reiniciar" },
            { label: "◀ Volver",                                 topic: "menu_profesor" }
        ]
    },
    "pleno_doc_planificar": {
        text: "**Acceder y Planificar en Pleno**\n\nIngresa a la plataforma y configura fechas y parámetros.\n\n▶️ Acceder: <a href=\"#\" onclick=\"openVideoModal('Och9Do2176Q')\" class=\"underline text-blue-400\">Ver Video</a> | Planificar: <a href=\"#\" onclick=\"openVideoModal('iJMU2Iyu8ng')\" class=\"underline text-blue-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "progreso_docente" }]
    },
    "pleno_doc_crear": {
        text: "**Crear Evaluaciones**\n\n▶️ Banco Santillana: <a href=\"#\" onclick=\"openVideoModal('DdPnWYVu1y4')\" class=\"underline text-blue-400\">Ver Video</a> | Ítems propios: <a href=\"#\" onclick=\"openVideoModal('aLm91Avo63Y')\" class=\"underline text-blue-400\">Ver Video</a> | Aleatorias: <a href=\"#\" onclick=\"openVideoModal('WpDFMfZdm5g')\" class=\"underline text-blue-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "progreso_docente" }]
    },
    "pleno_doc_calificar": {
        text: "**Rúbricas y Calificación**\n\n▶️ Crear rúbricas: <a href=\"#\" onclick=\"openVideoModal('7kp_-ZL7Amw')\" class=\"underline text-blue-400\">Ver Video</a> | Calificar abiertas: <a href=\"#\" onclick=\"openVideoModal('iTIFZeCEO_o')\" class=\"underline text-blue-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "progreso_docente" }]
    },
    "pleno_doc_reiniciar": {
        text: "**Habilitar / Reiniciar Evaluaciones**\n\nReasigna pruebas a estudiantes con problemas técnicos.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('OemyOCXD8U8')\" class=\"text-blue-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "progreso_docente" }]
    },
    "progreso_estudiante": {
        text: "**Compartir Progreso (Pleno) — Estudiante**",
        options: [
            { label: "Responder Evaluaciones",                   topic: "pleno_est_responder" },
            { label: "◀ Volver",                                 topic: "menu_estudiante" }
        ]
    },
    "pleno_est_responder": {
        text: "**Responder Evaluaciones en Pleno**\n\nIngresa a Pleno, busca la evaluación activa, respóndela y envíala.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('_oDKSoJItHo')\" class=\"text-blue-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "progreso_estudiante" }]
    },

    // ── INGLÉS DOCENTE ───────────────────────────────────────
    "ingles_docente": {
        text: "**Compartir Inglés — Richmond Studio (Docente)**",
        options: [
            { label: "Cómo ingresar a Richmond Studio",         topic: "richmond_ingreso" },
            { label: "Asignar tareas a estudiantes",            topic: "richmond_doc_tareas" },
            { label: "Calificar audios (Pending Marks)",        topic: "richmond_doc_calificar" },
            { label: "Acceder al i-solution",                   topic: "richmond_doc_isolution" },
            { label: "Limpiar cookies y caché",                 topic: "richmond_cookies" },
            { label: "◀ Volver",                                topic: "menu_profesor" }
        ]
    },
    // ── INGLÉS ESTUDIANTE ────────────────────────────────────
    "ingles_estudiante": {
        text: "**Compartir Inglés — Richmond Studio (Estudiante)**",
        options: [
            { label: "Cómo ingresar a Richmond Studio",         topic: "richmond_ingreso" },
            { label: "Ver mis asignaciones (Assignments)",      topic: "richmond_est_assignments" },
            { label: "Ver mis notas (Markbook)",                topic: "richmond_est_markbook" },
            { label: "My Links — accesos directos",             topic: "richmond_est_mylinks" },
            { label: "Limpiar cookies y caché",                 topic: "richmond_cookies" },
            { label: "◀ Volver",                                topic: "menu_estudiante" }
        ]
    },
    "richmond_ingreso": {
        text: "**Ingresar a Richmond Studio**\n\n• **Via Santillana Connect:** ingresa y busca Richmond Studio.\n• **Via EDI Santillana:** ingresa a edi.santillanacompartir.com.co y localiza el acceso.\n\n▶️ Connect: <a href=\"#\" onclick=\"openVideoModal('P9ohgrwD_zs')\" class=\"underline text-emerald-400\">Ver Video</a> | EDI: <a href=\"#\" onclick=\"openVideoModal('wyxu3QD9WX8')\" class=\"underline text-emerald-400\">Ver Video</a>",
        options: [
            { label: "◀ Volver (Docente)",     topic: "ingles_docente" },
            { label: "◀ Volver (Estudiante)",  topic: "ingles_estudiante" }
        ]
    },
    "richmond_cookies": {
        text: "**Limpiar Cookies y Caché**\n\nSi Richmond Studio no carga bien, limpiar el caché suele resolver el problema.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('sKtj-gpv78E')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [
            { label: "◀ Volver (Docente)",     topic: "ingles_docente" },
            { label: "◀ Volver (Estudiante)",  topic: "ingles_estudiante" }
        ]
    },
    "richmond_doc_tareas": {
        text: "**Asignar Tareas — Richmond Studio (Docente)**\n\nCrea y asigna actividades a tus grupos directamente en la plataforma de inglés.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('ABBwpKFDN8M')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "ingles_docente" }]
    },
    "richmond_doc_calificar": {
        text: "**Calificar Audios — Pending Marks (Docente)**\n\nRevisa y califica los audios grabados por tus estudiantes en la sección Pending Marks.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('zC5L4zTrZJA')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "ingles_docente" }]
    },
    "richmond_doc_isolution": {
        text: "**Acceder al i-solution (Docente)**\n\nEl libro de soluciones disponible en modo online y offline.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('oWvbBcSyjkA')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "ingles_docente" }]
    },
    "richmond_est_assignments": {
        text: "**Ver mis Asignaciones (Assignments)**\n\nDesde tu panel en Richmond Studio puedes ver las actividades pendientes y entregadas.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('vSR2f5hqw84')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "ingles_estudiante" }]
    },
    "richmond_est_markbook": {
        text: "**Ver mis Notas (Markbook)**\n\nEl Markbook muestra todas tus calificaciones en Richmond Studio.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('L1sNm4j3ICU')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "ingles_estudiante" }]
    },
    "richmond_est_mylinks": {
        text: "**My Links (Estudiante)**\n\nGuarda y organiza accesos rápidos a los recursos que más usas en Richmond Studio.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('NG5Jkq0uFeE')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "ingles_estudiante" }]
    },

    // ── QUIZZES ──────────────────────────────────────────────
    "quiz_categorias": {
        text: "El motor de actividades tiene más de 25 tipos. ¿Cuál te interesa?",
        options: [
            { label: "Crear Quiz (config. inicial)",             topic: "quiz_base" },
            { label: "Plantillas Tipo Test",                     topic: "cat_test" },
            { label: "Completar / Arrastrar",                    topic: "cat_completar" },
            { label: "Ordenar y Relacionar",                     topic: "cat_relacionar" },
            { label: "Evaluación Manual / Especial",             topic: "cat_manual" },
            { label: "◀ Volver",                                 topic: "prof_conocimientos" }
        ]
    },
    "quiz_base": {
        text: "**Crear un Quiz General**\n\n1. Aprendizaje Nuclear → **'+'** → Quiz.\n2. Configura escala, si es evaluativo y fechas.\n3. Clic en **Crear Quiz**.\n4. Agrega preguntas con **'+'** (nueva o desde biblioteca).\n5. Asigna valor y dale a Guardar y Publicar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('xMUUcHz1RMY')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "quiz_categorias" }]
    },
    "cat_test": {
        text: "Selecciona el tipo de test:",
        options: [
            { label: "Respuesta Única / Múltiple",               topic: "q_unica_multiple" },
            { label: "Verdadero o Falso",                        topic: "q_vf" },
            { label: "Tabla / Lista de Selección",               topic: "q_tabla" },
            { label: "◀ Volver",                                 topic: "quiz_categorias" }
        ]
    },
    "cat_completar": {
        text: "Selecciona el tipo de actividad:",
        options: [
            { label: "Completar con Texto (huecos/imagen)",      topic: "q_comp_texto" },
            { label: "Arrastrar y Soltar (huecos/imagen)",       topic: "q_arrastrar" },
            { label: "◀ Volver",                                 topic: "quiz_categorias" }
        ]
    },
    "cat_relacionar": {
        text: "Selecciona el tipo de actividad:",
        options: [
            { label: "Emparejar / Unir / Ordenar",               topic: "q_emparejar" },
            { label: "Sopa de Letras / Crucigrama",              topic: "q_juegos" },
            { label: "Clasificar",                               topic: "q_clasificar" },
            { label: "◀ Volver",                                 topic: "quiz_categorias" }
        ]
    },
    "cat_manual": {
        text: "Selecciona el tipo especial:",
        options: [
            { label: "Fórmulas Matemáticas",                     topic: "q_mates" },
            { label: "Resp. Compleja / Audio / Archivo",         topic: "q_manual_archivos" },
            { label: "◀ Volver",                                 topic: "quiz_categorias" }
        ]
    },
    "q_unica_multiple": {
        text: "**Tipo Test: Única / Múltiple**\n\n1. Selecciona la plantilla → Continuar.\n2. Escribe la instrucción y las opciones.\n3. En **Soluciones**, elige Corrección Exacta (o Parcial si múltiple) y marca correctas.\n4. En **Ajustes** activa orden aleatorio si deseas.\n5. Clic en Guardar.\n\n▶️ Única: <a href=\"#\" onclick=\"openVideoModal('_L2wa7F_eyM')\" class=\"underline text-pink-400\">Ver Video</a> | Múltiple: <a href=\"#\" onclick=\"openVideoModal('3udWZoZfNfs')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_test" }]
    },
    "q_vf": {
        text: "**Verdadero y Falso**\n\n1. Escribe la instrucción y la premisa.\n2. Opciones: Verdadero / Falso.\n3. En Soluciones, marca la correcta.\n4. Puedes añadir retroalimentación.\n5. Clic en Guardar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('uoSCotTJcj0')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "cat_test" }]
    },
    "q_tabla": {
        text: "**Tabla / Lista de Selección**\n\n1. Define columnas y filas.\n2. En Soluciones, marca las intersecciones correctas.\n3. En Ajustes activa 'Respuesta múltiple' si aplica.\n\n▶️ Tabla: <a href=\"#\" onclick=\"openVideoModal('OvXxkT4dak4')\" class=\"underline text-pink-400\">Ver Video</a> | Lista: <a href=\"#\" onclick=\"openVideoModal('zw4SWniGdbQ')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_test" }]
    },
    "q_comp_texto": {
        text: "**Completar con Texto**\n\n1. Pega texto o sube imagen.\n2. Selecciona palabras y clic en **Añadir hueco**.\n3. En Soluciones, escribe la respuesta válida.\n\n▶️ Huecos: <a href=\"#\" onclick=\"openVideoModal('f36XjOs9Kdw')\" class=\"underline text-pink-400\">Ver Video</a> | Imagen: <a href=\"#\" onclick=\"openVideoModal('Wlndj6N3zL0')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_completar" }]
    },
    "q_arrastrar": {
        text: "**Arrastrar y Soltar**\n\n1. Define los huecos en el texto o imagen.\n2. Escribe palabras correctas (y trampas extra).\n3. En Soluciones, arrastra cada palabra a su hueco.\n\n▶️ Textos: <a href=\"#\" onclick=\"openVideoModal('SSLxS0EffXQ')\" class=\"underline text-pink-400\">Ver Video</a> | Imagen: <a href=\"#\" onclick=\"openVideoModal('-W6vnpkmDEo')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_completar" }]
    },
    "q_emparejar": {
        text: "**Emparejar / Unir / Ordenar**\n\n• **Emparejar/Unir:** dos listas → define parejas en Soluciones.\n• **Ordenar:** escribe elementos en el orden correcto.\n\n▶️ Emparejar: <a href=\"#\" onclick=\"openVideoModal('G66EITN5HTM')\" class=\"underline text-pink-400\">Ver Video</a> | Unir: <a href=\"#\" onclick=\"openVideoModal('D-lSaspWGzQ')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_relacionar" }]
    },
    "q_juegos": {
        text: "**Sopa de Letras y Crucigrama**\n\n• **Crucigrama:** escribe pistas y palabras; el sistema genera el tablero.\n• **Sopa:** elige tamaño y escribe las palabras a buscar.\n\n▶️ Sopa: <a href=\"#\" onclick=\"openVideoModal('n8pDFxb8O78')\" class=\"underline text-pink-400\">Ver Video</a> | Crucigrama: <a href=\"#\" onclick=\"openVideoModal('M7Y1wYkXkiI')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_relacionar" }]
    },
    "q_clasificar": {
        text: "**Clasificar**\n\n1. Define entre 1 y 5 columnas.\n2. Agrega las palabras mezcladas.\n3. En Soluciones, arrastra cada palabra a su columna.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('YgALIhJ-PGg')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "cat_relacionar" }]
    },
    "q_mates": {
        text: "**Fórmulas Matemáticas**\n\n1. Escribe las operaciones y selecciona la respuesta → **Añadir hueco**.\n2. En Ajustes activa el teclado (numérico, básico, científico…).\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('XTkETvJ-s_c')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "cat_manual" }]
    },
    "q_manual_archivos": {
        text: "**Evaluación Manual (requiere corrección docente)**\n\n• **Subir Archivo:** 1–10 archivos.\n• **Audio:** límite de segundos configurable.\n• **Respuesta Compleja:** contador de palabras opcional.\n• **Pintar:** imagen de fondo personalizable.\n\n▶️ Archivo: <a href=\"#\" onclick=\"openVideoModal('yUfpyWQb3zI')\" class=\"underline text-pink-400\">Ver Video</a> | Audio: <a href=\"#\" onclick=\"openVideoModal('pk3g6khFJlc')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_manual" }]
    },

    // ── NO ENCONTRADO ─────────────────────────────────────────
    "no_encontrado": {
        text: "Hmm, no encontré un tutorial exacto para eso 🤔\n\nIntenta con palabras como: **quiz**, **tarea**, **pleno**, **richmond**, **sopa**, **rúbrica**, **markbook**, **libro**...\n\n¿Quieres ir al menú principal?",
        options: [
            { label: "Ir al menú",                              topic: "inicio" },
            { label: "Soy Docente 🍎",                          topic: "menu_profesor" },
            { label: "Soy Estudiante / Padre 🎒",               topic: "menu_estudiante" }
        ]
    }
};

/* ============================================================
   ÍNDICE DE BÚSQUEDA POR TEXTO LIBRE
   ============================================================ */
const KEYWORD_INDEX = {
    // Inglés
    'richmond': 'richmond_ingreso', 'inglés': 'ingles_docente', 'ingles': 'ingles_docente',
    'cookies': 'richmond_cookies', 'caché': 'richmond_cookies', 'cache': 'richmond_cookies',
    'markbook': 'richmond_est_markbook', 'calificaciones': 'richmond_est_markbook',
    'assignments': 'richmond_est_assignments', 'asignaciones': 'richmond_est_assignments',
    'pending': 'richmond_doc_calificar', 'audios': 'richmond_doc_calificar',
    'isolution': 'richmond_doc_isolution', 'my links': 'richmond_est_mylinks',
    // Conocimientos Docente
    'tarea': 'docente_tarea', 'tareas': 'docente_tarea',
    'asignar': 'docente_asignar', 'panel': 'docente_panel',
    'material': 'docente_material', 'primeros pasos': 'docente_inicio',
    // Quizzes
    'quiz': 'quiz_base', 'sopa': 'q_juegos', 'letras': 'q_juegos',
    'crucigrama': 'q_juegos', 'rúbrica': 'pleno_doc_calificar', 'rubrica': 'pleno_doc_calificar',
    'verdadero': 'q_vf', 'falso': 'q_vf', 'emparejar': 'q_emparejar',
    'clasificar': 'q_clasificar', 'arrastrar': 'q_arrastrar',
    'matemática': 'q_mates', 'matematica': 'q_mates', 'fórmulas': 'q_mates', 'formulas': 'q_mates',
    // Pleno
    'pleno': 'progreso_docente', 'evaluación': 'pleno_doc_crear', 'evaluacion': 'pleno_doc_crear',
    'habilitar': 'pleno_doc_reiniciar', 'reiniciar': 'pleno_doc_reiniciar',
    // Estudiante
    'libro': 'est_libroweb', 'biblioteca': 'est_biblioteca', 'responder': 'est_tareas',
    // FAQ / problemas
    'contraseña': 'no_encontrado', 'password': 'no_encontrado', 'lento': 'no_encontrado'
};

function searchByKeyword(q) {
    q = q.toLowerCase().trim();
    for (const [kw, topic] of Object.entries(KEYWORD_INDEX)) {
        if (q.includes(kw)) return topic;
    }
    return null;
}

/* ============================================================
   MOTOR DEL CHATBOT
   ============================================================ */
const chatContainer = document.getElementById('chat-msgs');

function initBot() {
    chatContainer.innerHTML = '';
    renderBotResponse("inicio");
}

function renderBotResponse(topicId) {
    const data = BOT_DATA[topicId];
    if (!data) return;

    const formattedText = data.text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    let optionsHTML = '';
    if (data.options?.length) {
        optionsHTML = `<div class="flex flex-col gap-2 mt-4 border-t border-white/10 pt-3" role="group" aria-label="Opciones">`;
        data.options.forEach(opt => {
            optionsHTML += `
                <button onclick="handleUserClick('${opt.label.replace(/'/g,"\\'")}','${opt.topic}')"
                    class="bg-slate-800/80 hover:bg-indigo-600 border border-indigo-500/30 py-2.5 px-4 rounded-xl text-[11px] font-bold transition-colors text-left flex justify-between items-center group cyber-hover"
                    aria-label="${opt.label.replace(/◀ /, '')}">
                    ${opt.label}
                    <i data-lucide="chevron-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                </button>`;
        });
        optionsHTML += `</div>`;
    }

    const botMsg = document.createElement('div');
    botMsg.className = "self-start bg-slate-800/90 border border-indigo-500/20 text-white p-5 rounded-2xl rounded-tl-sm text-sm shadow-[0_0_20px_rgba(0,0,0,0.4)] mb-2 leading-relaxed transform transition-all translate-y-2 opacity-0 max-w-full";
    botMsg.setAttribute('role', 'article');
    botMsg.innerHTML = formattedText + optionsHTML;
    chatContainer.appendChild(botMsg);
    lucide.createIcons();
    requestAnimationFrame(() => botMsg.classList.remove('translate-y-2', 'opacity-0'));
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleUserClick(label, targetTopic) {
    appendUserMsg(label.replace(/◀ .*/, 'Atrás'));
    showTypingAndRespond(targetTopic);
}

function sendFreeText() {
    const input = document.getElementById('chat-input');
    const text  = input.value.trim();
    if (!text) return;
    appendUserMsg(text);
    input.value = '';
    const topic = searchByKeyword(text);
    showTypingAndRespond(topic || 'no_encontrado');
}

function appendUserMsg(text) {
    const msg = document.createElement('div');
    msg.className = "self-end bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-sm text-sm font-bold shadow-[0_0_15px_rgba(79,70,229,0.5)] max-w-[85%] mb-2 transform transition-all translate-y-2 opacity-0";
    msg.setAttribute('role', 'article');
    msg.textContent = text;
    chatContainer.appendChild(msg);
    requestAnimationFrame(() => msg.classList.remove('translate-y-2', 'opacity-0'));
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingAndRespond(targetTopic) {
    const dots = document.createElement('div');
    dots.className = "self-start bg-white/5 text-slate-400 p-3 rounded-2xl rounded-tl-sm text-xs mb-2 flex gap-1 items-center border border-white/10";
    dots.setAttribute('role', 'status');
    dots.setAttribute('aria-label', 'El bot está escribiendo');
    dots.innerHTML = ['','',''].map((_, i) =>
        `<span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay:${i*0.2}s" aria-hidden="true"></span>`
    ).join('');
    chatContainer.appendChild(dots);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    setTimeout(() => {
        dots.remove();
        renderBotResponse(targetTopic);
    }, 550);
}

document.addEventListener("DOMContentLoaded", initBot);
