/* ============================================================
   COACH VIRTUAL — bot.js
   ============================================================ */

const BOT_DATA = {
    "inicio": {
        text: "¡Hola! Soy tu **Coach Bot**.\n\n¿Con qué te puedo ayudar hoy?",
        options: [
            { label: "Quiero aprender — soy Docente",              topic: "menu_profesor" },
            { label: "Quiero aprender — soy Estudiante o Padre",   topic: "menu_estudiante" },
            { label: "Tengo una duda o problema",                   topic: "tengo_duda" },
            { label: "Compartir Suplementales", topic: "suplementales_bot" },
            { label: "Preguntas frecuentes",                        topic: "faq_bot" }
        ]
    },

    // ── TENGO UNA DUDA ─────────────────────────────────────────
    "tengo_duda": {
        text: "Entendido. ¿Eres docente o estudiante/padre?",
        options: [
            { label: "Soy Docente",                                    topic: "duda_docente_seccion" },
            { label: "Soy Estudiante o Padre de familia",              topic: "duda_estudiante_seccion" },
            { label: "Volver", action: "back",                                       topic: "inicio" }
        ]
    },
    "duda_docente_seccion": {
        text: "¿Tu duda es sobre cuál plataforma?",
        options: [
            { label: "Compartir Conocimientos",                        topic: "prof_conocimientos" },
            { label: "Compartir Progreso (Pleno)",                     topic: "progreso_docente" },
            { label: "Inglés — Richmond Studio",                       topic: "ingles_docente" },
            { label: "Compartir Fe — CREO",                            topic: "fe_docente" },
            { label: "Compartir Robótica — SET-XXI",                     topic: "robotica" },
            { label: "Volver", action: "back",                                       topic: "tengo_duda" }
        ]
    },
    "duda_estudiante_seccion": {
        text: "¿Tu duda es sobre cuál plataforma?",
        options: [
            { label: "Compartir Conocimientos",                        topic: "est_conocimientos" },
            { label: "Compartir Progreso (Pleno)",                     topic: "progreso_estudiante" },
            { label: "Inglés — Richmond Studio",                       topic: "ingles_estudiante" },
            { label: "Compartir Fe — CREO", topic: "fe_docente" },
            { label: "Compartir Robótica — SET-XXI", topic: "robotica" },
            { label: "Volver", action: "back",                                       topic: "tengo_duda" }
        ]
    },

    // ── FAQ EN EL BOT ──────────────────────────────────────────
    "faq_bot": {
        text: "Estas son las preguntas más frecuentes. ¿Sobre cuál necesitas ayuda?",
        options: [
            { label: "¿Cómo doy mis primeros pasos como docente?",     topic: "docente_inicio" },
            { label: "¿Cómo creo una tarea para mis estudiantes?",     topic: "docente_tarea" },
            { label: "¿Cómo respondo mis tareas? (Estudiante)",        topic: "est_tareas" },
            { label: "¿Cómo encuentro el Libro Web?",                  topic: "est_libroweb" },
            { label: "¿Cómo creo un quiz o actividad?",                topic: "quiz_base" },
            { label: "¿Cómo creo una evaluación en Pleno?",            topic: "pleno_doc_crear" },
            { label: "¿Cómo ingreso a Richmond Studio?",               topic: "richmond_ingreso" },
            { label: "¿Qué es Compartir Robótica / SET-XXI?", topic: "robotica" },
            { label: "¿Qué es Compartir FE / CREO?",                   topic: "fe_docente" },
            { label: "Volver", action: "back",                                       topic: "inicio" }
        ]
    },

    // ── MENUS PRINCIPALES ──────────────────────────────────────
    "menu_profesor": {
        text: "¡Bienvenido, Profe! ¿Sobre qué plataforma necesitas aprender?",
        options: [
            { label: "Compartir Conocimientos",                        topic: "prof_conocimientos" },
            { label: "Compartir Progreso (Pleno)",                     topic: "progreso_docente" },
            { label: "Inglés — Richmond Studio",                       topic: "ingles_docente" },
            { label: "Compartir Fe — CREO",                            topic: "fe_docente" },
            { label: "Compartir Robótica — SET-XXI",                     topic: "robotica" },
            { label: "Cambiar perfil", action: "back",                               topic: "inicio" }
        ]
    },
    "menu_estudiante": {
        text: "¡Hola! ¿Sobre qué plataforma necesitas aprender?",
        options: [
            { label: "Compartir Conocimientos",                        topic: "est_conocimientos" },
            { label: "Compartir Progreso (Pleno)",                     topic: "progreso_estudiante" },
            { label: "Inglés — Richmond Studio",                       topic: "ingles_estudiante" },
            { label: "Compartir Fe — CREO", topic: "fe_docente" },
            { label: "Compartir Robótica — SET-XXI", topic: "robotica" },
            { label: "Cambiar perfil", action: "back",                               topic: "inicio" }
        ]
    },

    "robotica": {
        text: "**Compartir Robótica — SET-XXI**\n\nProyectos de robótica educativa, programación, computación física y diseño e impresión 3D, de Transición a 11°.\n\nEncuentra el programa completo en **Compartir Suplementales → Compartir Robótica**.",
        options: [{ label: "Volver al inicio", action: "back", topic: "inicio" }]
    },

    // ── FE / CREO ──────────────────────────────────────────────
    "fe_docente": {
        text: "**Compartir FE — CREO**\n\nCREO es el ecosistema de formación en valores integrado con Compartir.\n\n<a href=\"#\" onclick=\"openVideoModal('QCviXJSVUHc')\" class=\"text-cyan-400 font-bold underline\">Tutorial Contenidos Globales CREO</a>\n\n<a href=\"#\" onclick=\"openVideoModal('I7Yd9PWTDc8')\" class=\"text-cyan-400 font-bold underline\">Tutorial Conexiones CREO en Compartir</a>\n\nPara las mallas curriculares y recursos globales, ve a la tarjeta <strong>Compartir FE</strong> dentro de <strong>Compartir Suplementales</strong>.",
        options: [
            { label: "Volver al menú", action: "back",  topic: "menu_profesor" }
        ]
    },

    // ── CONOCIMIENTOS DOCENTE ────────────────────────────────
    "prof_conocimientos": {
        text: "**Compartir Conocimientos — Docente**\n\n¿Qué deseas aprender?",
        options: [
            { label: "Gestión General (Asignar, Panel…)",       topic: "prof_gestion" },
            { label: "Crear Quizzes y Actividades",           topic: "quiz_categorias" },
            { label: "Volver", action: "back",                                 topic: "menu_profesor" }
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
            { label: "Volver", action: "back",                                 topic: "prof_conocimientos" }
        ]
    },
    "docente_inicio": {
        text: "**Primeros pasos en Compartir Conocimientos**\n\n1. Ingresa a https://edi-compartir-co.stn-neds.com.\n2. Arriba a la derecha: Biblioteca, Tareas, Calendario y Notificaciones.\n3. En el centro verás tus clases.\n4. Al entrar a una clase, 4 pestañas:\n  • **Programa:** Módulos y Aprendizajes Nucleares.\n  • **Recursos del aula:** Apoyo docente.\n  • **Panel:** Tablero de publicaciones.\n  • **Calificaciones:** Rejilla de control.\n\n<a href=\"#\" onclick=\"openVideoModal('Bv_FinX79vk')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "prof_gestion" }]
    },
    "docente_tarea": {
        text: "**Crear una Tarea**\n\n1. Ve al Aprendizaje Nuclear → clic en **'+'** > Tarea.\n2. Configura escala, categoría y destinatarios.\n3. Ponle título y elige formato (texto, archivo, audio).\n4. Clic en **Crear Tarea**.\n5. Edita el enunciado a la izquierda.\n6. Elige: Guardar (borrador), Guardar y publicar, o Programar.\n\n<a href=\"#\" onclick=\"openVideoModal('KXROB84Q3IU')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "prof_gestion" }]
    },
    "docente_asignar": {
        text: "**Asignar contenidos**\n\n1. Asignatura → Aprendizaje Nuclear.\n2. Ubica el contenido y haz clic en los **tres puntos** → **'Asignar a…'**.\n3. Define quién puede verlo y fechas de entrega.\n4. Clic en Guardar.\n\n<a href=\"#\" onclick=\"openVideoModal('X6akIQPrJWw')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "prof_gestion" }]
    },
    "docente_panel": {
        text: "**Panel de Comunicaciones**\n\n1. En tu clase → pestaña Panel.\n2. **Configuración**: define permisos de estudiantes.\n3. Escribe tu anuncio (adjuntos hasta 200 MB).\n4. Clic en Publicar. Los alumnos recibirán notificación.\n\n<a href=\"#\" onclick=\"openVideoModal('SO60tHz47kU')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "prof_gestion" }]
    },
    "docente_material": {
        text: "**Subir Material Propio**\n\n1. Inicio → **Mi Biblioteca**.\n2. Clic en **'+'** → Añadir material.\n3. Elige Enlace o Archivo.\n4. Título, descripción y clasificación.\n5. Clic en Aceptar. Tip: crea carpetas para organizarlo.\n\n<a href=\"#\" onclick=\"openVideoModal('sGX_D17T4h8')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "prof_gestion" }]
    },

    // ── CONOCIMIENTOS ESTUDIANTE ─────────────────────────────
    "est_conocimientos": {
        text: "**Compartir Conocimientos — Estudiante / Padre**",
        options: [
            { label: "Mis Primeros Pasos",                      topic: "est_inicio" },
            { label: "Cómo responder Tareas",                   topic: "est_tareas" },
            { label: "Buscar el Libro Web",                     topic: "est_libroweb" },
            { label: "Recursos de la Biblioteca",               topic: "est_biblioteca" },
            { label: "Volver", action: "back",                                topic: "menu_estudiante" }
        ]
    },
    "est_inicio": {
        text: "**Primeros pasos — Estudiante**\n\n1. Ingresa a https://edi-compartir-co.stn-neds.com.\n2. Selecciona Compartir Conocimientos.\n3. Arriba a la derecha: Tareas, Calendario, Notificaciones.\n4. Entra a tu clase y verás:\n  • **Programa:** actividades.\n  • **Recursos:** Flipbook.\n  • **Panel:** avisos del profe.\n  • **Calificaciones:** tus notas.\n\n<a href=\"#\" onclick=\"openVideoModal('9oKz6MQgDsk')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "est_conocimientos" }]
    },
    "est_tareas": {
        text: "**Responder Tareas**\n\n1. Clic en el ícono **Tareas** (arriba a la derecha) → Ver todo.\n2. Filtra por Pendiente.\n3. Selecciona la actividad, desarróllala y clic en **Enviar**.\n\n<a href=\"#\" onclick=\"openVideoModal('XugiPvcc20g')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "est_conocimientos" }]
    },
    "est_libroweb": {
        text: "**Libro Web**\n\n1. Entra a la asignatura → Aprendizaje Nuclear.\n2. En **Nuevos Aprendizajes** está tu Libro Web.\n3. Clic en **Ir** → **Ver**. Se abre en nueva pestaña.\n\n<a href=\"#\" onclick=\"openVideoModal('l0MHO5QO1eQ')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "est_conocimientos" }]
    },
    "est_biblioteca": {
        text: "**Biblioteca / Recursos del Aula**\n\n1. Entra a tu asignatura → pestaña **Recursos del aula**.\n2. En la sección **Anual** verás los materiales de apoyo.\n\n<a href=\"#\" onclick=\"openVideoModal('RjS2b5h-UqY')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "est_conocimientos" }]
    },

    // ── PROGRESO ─────────────────────────────────────────────
    "progreso_docente": {
        text: "**Compartir Progreso (Pleno) — Docente**",
        options: [
            { label: "Acceder y Planificar",                     topic: "pleno_doc_planificar" },
            { label: "Crear Evaluaciones (Banco / Propias)",     topic: "pleno_doc_crear" },
            { label: "Rúbricas y Calificación",                  topic: "pleno_doc_calificar" },
            { label: "Habilitar / Reiniciar Evaluaciones",       topic: "pleno_doc_reiniciar" },
            { label: "Volver", action: "back",                                 topic: "menu_profesor" }
        ]
    },
    "pleno_doc_planificar": {
        text: "**Acceder y Planificar en Pleno**\n\nIngresa a la plataforma y configura fechas y parámetros.\n\nAcceder: <a href=\"#\" onclick=\"openVideoModal('Och9Do2176Q')\" class=\"underline text-blue-400\">Ver Video</a> | Planificar: <a href=\"#\" onclick=\"openVideoModal('iJMU2Iyu8ng')\" class=\"underline text-blue-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "progreso_docente" }]
    },
    "pleno_doc_crear": {
        text: "**Crear Evaluaciones**\n\nBanco Santillana: <a href=\"#\" onclick=\"openVideoModal('DdPnWYVu1y4')\" class=\"underline text-blue-400\">Ver Video</a> | Ítems propios: <a href=\"#\" onclick=\"openVideoModal('aLm91Avo63Y')\" class=\"underline text-blue-400\">Ver Video</a> | Aleatorias: <a href=\"#\" onclick=\"openVideoModal('WpDFMfZdm5g')\" class=\"underline text-blue-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "progreso_docente" }]
    },
    "pleno_doc_calificar": {
        text: "**Rúbricas y Calificación**\n\nCrear rúbricas: <a href=\"#\" onclick=\"openVideoModal('7kp_-ZL7Amw')\" class=\"underline text-blue-400\">Ver Video</a> | Calificar abiertas: <a href=\"#\" onclick=\"openVideoModal('iTIFZeCEO_o')\" class=\"underline text-blue-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "progreso_docente" }]
    },
    "pleno_doc_reiniciar": {
        text: "**Habilitar / Reiniciar Evaluaciones**\n\nReasigna pruebas a estudiantes con problemas técnicos.\n\n<a href=\"#\" onclick=\"openVideoModal('OemyOCXD8U8')\" class=\"text-blue-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "progreso_docente" }]
    },
    "progreso_estudiante": {
        text: "**Compartir Progreso (Pleno) — Estudiante**",
        options: [
            { label: "Responder Evaluaciones",                   topic: "pleno_est_responder" },
            { label: "Volver", action: "back",                                 topic: "menu_estudiante" }
        ]
    },
    "pleno_est_responder": {
        text: "**Responder Evaluaciones en Pleno**\n\nIngresa a Pleno, busca la evaluación activa, respóndela y envíala.\n\n<a href=\"#\" onclick=\"openVideoModal('_oDKSoJItHo')\" class=\"text-blue-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "progreso_estudiante" }]
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
            { label: "Volver", action: "back",                                topic: "menu_profesor" }
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
            { label: "Volver", action: "back",                                topic: "menu_estudiante" }
        ]
    },
    "richmond_ingreso": {
        text: "**Ingresar a Richmond Studio**\n\n• **Via Santillana Connect:** ingresa y busca Richmond Studio.\n• **Via EDI Santillana:** ingresa a https://edi-compartir-co.stn-neds.com y localiza el acceso.\n\nConnect: <a href=\"#\" onclick=\"openVideoModal('P9ohgrwD_zs')\" class=\"underline text-emerald-400\">Ver Video</a> | EDI: <a href=\"#\" onclick=\"openVideoModal('wyxu3QD9WX8')\" class=\"underline text-emerald-400\">Ver Video</a>",
        options: [
            { label: "Volver (Docente)", action: "back",     topic: "ingles_docente" },
            { label: "Volver (Estudiante)", action: "back",  topic: "ingles_estudiante" }
        ]
    },
    "richmond_cookies": {
        text: "**Limpiar Cookies y Caché**\n\nSi Richmond Studio no carga bien, limpiar el caché suele resolver el problema.\n\n<a href=\"#\" onclick=\"openVideoModal('sKtj-gpv78E')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [
            { label: "Volver (Docente)", action: "back",     topic: "ingles_docente" },
            { label: "Volver (Estudiante)", action: "back",  topic: "ingles_estudiante" }
        ]
    },
    "richmond_doc_tareas": {
        text: "**Asignar Tareas — Richmond Studio (Docente)**\n\nCrea y asigna actividades a tus grupos directamente en la plataforma de inglés.\n\n<a href=\"#\" onclick=\"openVideoModal('ABBwpKFDN8M')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "ingles_docente" }]
    },
    "richmond_doc_calificar": {
        text: "**Calificar Audios — Pending Marks (Docente)**\n\nRevisa y califica los audios grabados por tus estudiantes en la sección Pending Marks.\n\n<a href=\"#\" onclick=\"openVideoModal('zC5L4zTrZJA')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "ingles_docente" }]
    },
    "richmond_doc_isolution": {
        text: "**Acceder al i-solution (Docente)**\n\nEl libro de soluciones disponible en modo online y offline.\n\n<a href=\"#\" onclick=\"openVideoModal('oWvbBcSyjkA')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "ingles_docente" }]
    },
    "richmond_est_assignments": {
        text: "**Ver mis Asignaciones (Assignments)**\n\nDesde tu panel en Richmond Studio puedes ver las actividades pendientes y entregadas.\n\n<a href=\"#\" onclick=\"openVideoModal('vSR2f5hqw84')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "ingles_estudiante" }]
    },
    "richmond_est_markbook": {
        text: "**Ver mis Notas (Markbook)**\n\nEl Markbook muestra todas tus calificaciones en Richmond Studio.\n\n<a href=\"#\" onclick=\"openVideoModal('L1sNm4j3ICU')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "ingles_estudiante" }]
    },
    "richmond_est_mylinks": {
        text: "**My Links (Estudiante)**\n\nGuarda y organiza accesos rápidos a los recursos que más usas en Richmond Studio.\n\n<a href=\"#\" onclick=\"openVideoModal('NG5Jkq0uFeE')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "ingles_estudiante" }]
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
            { label: "Volver", action: "back",                                 topic: "prof_conocimientos" }
        ]
    },
    "quiz_base": {
        text: "**Crear un Quiz General**\n\n1. Aprendizaje Nuclear → **'+'** → Quiz.\n2. Configura escala, si es evaluativo y fechas.\n3. Clic en **Crear Quiz**.\n4. Agrega preguntas con **'+'** (nueva o desde biblioteca).\n5. Asigna valor y dale a Guardar y Publicar.\n\n<a href=\"#\" onclick=\"openVideoModal('xMUUcHz1RMY')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "quiz_categorias" }]
    },
    "cat_test": {
        text: "Selecciona el tipo de test:",
        options: [
            { label: "Respuesta Única / Múltiple",               topic: "q_unica_multiple" },
            { label: "Verdadero o Falso",                        topic: "q_vf" },
            { label: "Tabla / Lista de Selección",               topic: "q_tabla" },
            { label: "Volver", action: "back",                                 topic: "quiz_categorias" }
        ]
    },
    "cat_completar": {
        text: "Selecciona el tipo de actividad:",
        options: [
            { label: "Completar con Texto (huecos/imagen)",      topic: "q_comp_texto" },
            { label: "Arrastrar y Soltar (huecos/imagen)",       topic: "q_arrastrar" },
            { label: "Volver", action: "back",                                 topic: "quiz_categorias" }
        ]
    },
    "cat_relacionar": {
        text: "Selecciona el tipo de actividad:",
        options: [
            { label: "Emparejar / Unir / Ordenar",               topic: "q_emparejar" },
            { label: "Sopa de Letras / Crucigrama",              topic: "q_juegos" },
            { label: "Clasificar",                               topic: "q_clasificar" },
            { label: "Volver", action: "back",                                 topic: "quiz_categorias" }
        ]
    },
    "cat_manual": {
        text: "Selecciona el tipo especial:",
        options: [
            { label: "Fórmulas Matemáticas",                     topic: "q_mates" },
            { label: "Resp. Compleja / Audio / Archivo",         topic: "q_manual_archivos" },
            { label: "Volver", action: "back",                                 topic: "quiz_categorias" }
        ]
    },
    "q_unica_multiple": {
        text: "**Tipo Test: Única / Múltiple**\n\n1. Selecciona la plantilla → Continuar.\n2. Escribe la instrucción y las opciones.\n3. En **Soluciones**, elige Corrección Exacta (o Parcial si múltiple) y marca correctas.\n4. En **Ajustes** activa orden aleatorio si deseas.\n5. Clic en Guardar.\n\nÚnica: <a href=\"#\" onclick=\"openVideoModal('_L2wa7F_eyM')\" class=\"underline text-pink-400\">Ver Video</a> | Múltiple: <a href=\"#\" onclick=\"openVideoModal('3udWZoZfNfs')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_test" }]
    },
    "q_vf": {
        text: "**Verdadero y Falso**\n\n1. Escribe la instrucción y la premisa.\n2. Opciones: Verdadero / Falso.\n3. En Soluciones, marca la correcta.\n4. Puedes añadir retroalimentación.\n5. Clic en Guardar.\n\n<a href=\"#\" onclick=\"openVideoModal('uoSCotTJcj0')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_test" }]
    },
    "q_tabla": {
        text: "**Tabla / Lista de Selección**\n\n1. Define columnas y filas.\n2. En Soluciones, marca las intersecciones correctas.\n3. En Ajustes activa 'Respuesta múltiple' si aplica.\n\nTabla: <a href=\"#\" onclick=\"openVideoModal('OvXxkT4dak4')\" class=\"underline text-pink-400\">Ver Video</a> | Lista: <a href=\"#\" onclick=\"openVideoModal('zw4SWniGdbQ')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_test" }]
    },
    "q_comp_texto": {
        text: "**Completar con Texto**\n\n1. Pega texto o sube imagen.\n2. Selecciona palabras y clic en **Añadir hueco**.\n3. En Soluciones, escribe la respuesta válida.\n\nHuecos: <a href=\"#\" onclick=\"openVideoModal('f36XjOs9Kdw')\" class=\"underline text-pink-400\">Ver Video</a> | Imagen: <a href=\"#\" onclick=\"openVideoModal('Wlndj6N3zL0')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_completar" }]
    },
    "q_arrastrar": {
        text: "**Arrastrar y Soltar**\n\n1. Define los huecos en el texto o imagen.\n2. Escribe palabras correctas (y trampas extra).\n3. En Soluciones, arrastra cada palabra a su hueco.\n\nTextos: <a href=\"#\" onclick=\"openVideoModal('SSLxS0EffXQ')\" class=\"underline text-pink-400\">Ver Video</a> | Imagen: <a href=\"#\" onclick=\"openVideoModal('-W6vnpkmDEo')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_completar" }]
    },
    "q_emparejar": {
        text: "**Emparejar / Unir / Ordenar**\n\n• **Emparejar/Unir:** dos listas → define parejas en Soluciones.\n• **Ordenar:** escribe elementos en el orden correcto.\n\nEmparejar: <a href=\"#\" onclick=\"openVideoModal('G66EITN5HTM')\" class=\"underline text-pink-400\">Ver Video</a> | Unir: <a href=\"#\" onclick=\"openVideoModal('D-lSaspWGzQ')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_relacionar" }]
    },
    "q_juegos": {
        text: "**Sopa de Letras y Crucigrama**\n\n• **Crucigrama:** escribe pistas y palabras; el sistema genera el tablero.\n• **Sopa:** elige tamaño y escribe las palabras a buscar.\n\nSopa: <a href=\"#\" onclick=\"openVideoModal('n8pDFxb8O78')\" class=\"underline text-pink-400\">Ver Video</a> | Crucigrama: <a href=\"#\" onclick=\"openVideoModal('M7Y1wYkXkiI')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_relacionar" }]
    },
    "q_clasificar": {
        text: "**Clasificar**\n\n1. Define entre 1 y 5 columnas.\n2. Agrega las palabras mezcladas.\n3. En Soluciones, arrastra cada palabra a su columna.\n\n<a href=\"#\" onclick=\"openVideoModal('YgALIhJ-PGg')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_relacionar" }]
    },
    "q_mates": {
        text: "**Fórmulas Matemáticas**\n\n1. Escribe las operaciones y selecciona la respuesta → **Añadir hueco**.\n2. En Ajustes activa el teclado (numérico, básico, científico…).\n\n<a href=\"#\" onclick=\"openVideoModal('XTkETvJ-s_c')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_manual" }]
    },
    "q_manual_archivos": {
        text: "**Evaluación Manual (requiere corrección docente)**\n\n• **Subir Archivo:** 1–10 archivos.\n• **Audio:** límite de segundos configurable.\n• **Respuesta Compleja:** contador de palabras opcional.\n• **Pintar:** imagen de fondo personalizable.\n\nArchivo: <a href=\"#\" onclick=\"openVideoModal('yUfpyWQb3zI')\" class=\"underline text-pink-400\">Ver Video</a> | Audio: <a href=\"#\" onclick=\"openVideoModal('pk3g6khFJlc')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "Volver", action: "back", topic: "cat_manual" }]
    },

    // ── NO ENCONTRADO ─────────────────────────────────────────
    "no_encontrado": {
        text: "Hmm, no encontré un tutorial exacto para eso \n\nIntenta con palabras como: **quiz**, **tarea**, **pleno**, **richmond**, **sopa**, **rúbrica**, **markbook**, **libro**, **robótica** o **CREO**...\n\n¿Quieres ir al menú principal?",
        options: [
            { label: "Ir al menú",                              topic: "inicio" },
            { label: "Soy Docente",                          topic: "menu_profesor" },
            { label: "Soy Estudiante / Padre",               topic: "menu_estudiante" }
        ]
    }
};

// Keep the existing topics usable if a cached page has not loaded the program file yet.
const PROGRAM_DATA = typeof BOT_PROGRAMAS === 'undefined' ? { topics: {}, sources: {} } : BOT_PROGRAMAS;
Object.assign(BOT_DATA, PROGRAM_DATA.topics);

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
    // FE / CREO
    // Robótica y Fe se resuelven por intención y contexto, nunca por subcadenas.
    // FAQ y problemas
    'contraseña': 'no_encontrado', 'password': 'no_encontrado', 'lento': 'no_encontrado'
};

// El programa y el perfil permiten resolver preguntas de seguimiento.
const botMemoria = {
    ultimaSeccion: null,
    ultimoRol: null,
    setTopic(topic) {
        if (topic === 'inicio' || topic === 'suplementales_bot' || topic === 'programas_comparar' || topic === 'programa_aclarar') this.ultimaSeccion = null;
        else if (topic.startsWith('robotica')) this.ultimaSeccion = 'robotica';
        else if (topic.startsWith('fe_')) this.ultimaSeccion = 'fe';
        else if (/pleno|progreso/.test(topic)) this.ultimaSeccion = 'progreso';
        else if (/ingles|richmond/.test(topic)) this.ultimaSeccion = 'ingles';
        else if (/^(docente_|est_|prof_|quiz_|cat_|q_)/.test(topic)) this.ultimaSeccion = 'conocimientos';
        else if (/^menu_|^duda_/.test(topic)) this.ultimaSeccion = null;
        // fe_docente es una entrada compartida por ambos perfiles.
        if (/^(menu_profesor|duda_docente|docente_|prof_|progreso_docente|pleno_doc_|ingles_docente|richmond_doc_)/.test(topic)) this.ultimoRol = 'docente';
        else if (/estudiante|^est_|pleno_est_|richmond_est_/.test(topic)) this.ultimoRol = 'estudiante';
    }
};

function normalizarConsulta(text) {
    return String(text).slice(0, 1500).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

// Normalizar y ordenar una sola vez, en vez de reconstruir el índice por consulta.
const BOT_KEYWORDS = Object.entries(KEYWORD_INDEX)
    .map(([keyword, topic]) => [normalizarConsulta(keyword), topic])
    .sort((a, b) => b[0].length - a[0].length);

// Specific questions take priority over a program name or a generic word such as "libro".
const PROGRAM_INTENTS = {
    robotica: [
        [/\b(torneo|premios?|competencias? nacionales|competicion|competencia nacional|eventos?)\b/, 'robotica_eventos'],
        [/\b(precios?|costos?|tarifas?|cuesta|cuestan|cotizacion|cotizar|licencias?|gratis|gratuito|pesa|peso|dimensiones|medidas|inventario|envio|suscripcion|fechas?|calendario|sin internet|sin conexion|offline|compatibilidad|compatible|requisitos|windows|android|ipad|iphone|descargar)\b|cuanto (?:vale|valen)/, 'robotica_sin_dato'],
        [/\b(no funciona|falla|fallo|error|averia|reparar|soporte)\b/, 'robotica_soporte'],
        [/\b(acceder|accedo|accede|acceso|entrar|ingresar|ingresa|ingreso|contrasena|usuario|credenciales|donde encuentro|donde esta|donde veo)\b/, 'robotica_acceso'],
        [/\b(tinkercad)\b/, 'robotica_tinkercad'],
        [/\b(wokwi)\b/, 'robotica_wokwi'],
        [/\bmicro\s*(?:bit|bit s)\b/, 'robotica_microbit'],
        [/\b(simulador|simuladores|simular|simulacion)\b/, 'robotica_simuladores'],
        [/\b(cajas?|kits?|artefactos|repuestos?|reposicion|sensores?|motores?|ruedas?|cables?|placas?|componentes electronicos|primer ano|segundo ano|anos siguientes)\b/, 'robotica_cajas'],
        [/\b(cartilla|bitacora|cuaderno)\b/, 'robotica_cartilla'],
        [/\b(maestro maker)\b/, 'robotica_libro'],
        [/\b(formacion|capacitacion|capacitar|acompanamiento|asesoria|rutas formativas|experto en robotica|especialistas?|experiencia del docente)\b|docente.*(?:experto|experiencia)|(?:necesito|necesita|debo).*ser experto/, 'robotica_formacion'],
        [/\b(libro|libros|digital|fichas docentes|videotutoriales)\b/, 'robotica_libro'],
        [/\b(evaluar|evaluacion|evalua|evaluo|evaluan|rubrica|rubricas|calificar|califico|calificacion|calificaciones|nota|notas|porcentaje)\b/, 'robotica_evaluacion'],
        [/\b(fases?|pasos?|desafio|indaguemos|disenemos|construyamos|comuniquemos|evaluemos|etapas?)\b/, 'robotica_fases'],
        [/\b(roles?|indagador|disenador|constructor|comunicador|equipo|equipos)\b/, 'robotica_roles'],
        [/\b(malla|mallas|curriculo|curricular|curriculares|ley|2626|iste|men|estandares|norma|normativa|educacion digital)\b/, 'robotica_curriculo'],
        [/\b(areas|matematicas|lenguaje|ciencias naturales|ciencias sociales|otras asignaturas)\b/, 'robotica_areas'],
        [/\b(proyectos? por grado|cuantos proyectos|cuantas horas|cuantas semanas|cuantas sesiones|horas?|semanas?|duracion|tiempo|intensidad|sesiones?|sesion|semanal|asignatura|implementar|implementa|extracurricular)\b/, 'robotica_tiempos'],
        [/\b(niveles?|grados?|transicion|explorador|practicante|investigador|experto|primaria|secundaria|edades|edad)\b|\b(?:[1-9]|10|11)\s+(?:primaria|secundaria)\b/, 'robotica_niveles'],
        [/\b(cuantos|cuantas|horas?|semanas?|duracion|tiempo|intensidad|sesiones?|sesion|semanal|asignatura|implementar|implementa|extracurricular|curricular)\b/, 'robotica_tiempos'],
        [/\b(habilidades|destrezas|aprenden|aprendizajes|autonomia|resiliencia|curiosidad|imaginacion|gestion de la informacion|pensamiento critico|resolucion|liderazgo|comunicacion|escucha|ciudadania|empatia|creatividad|innovacion|inteligencia artificial|internet de las cosas|mecatronica|programacion|programar|computacional|impresion 3d)\b/, 'robotica_habilidades'],
        [/\b(metodologia|metodologias|steam|maker|ods|sostenible|servicio|colaborativo|como aprenden)\b/, 'robotica_metodologia'],
        [/\b(materiales?|recursos?|componentes|incluye|incluyen|contiene|trae|recibe|necesita el colegio)\b/, 'robotica_componentes'],
        [/\b(video|videos|ver en accion|instagram)\b/, 'robotica_video'],
        [/\b(que es|en que consiste|proposito|objetivo|objetivos|informacion|resumen|hablame|conocer|programa)\b|^(?:compartir )?(?:robotica|set ?21|set ?xxi)$/, 'robotica']
    ],
    fe: [
        [/\b(precios?|costos?|tarifas?|cuesta|cuestan|cotizacion|cotizar|licencias?|gratis|gratuito|suscripcion|calendario|fechas?|sin internet|sin conexion|offline|compatibilidad|requisitos)\b|cuanto (?:vale|valen)/, 'fe_sin_dato'],
        [/\b(permiso|permisos|autorizacion|denegado|bloqueado|403|sharepoint|no abre|no puedo abrir|no descarga|no me deja)\b/, 'fe_acceso_documentos'],
        [/\b(primaria)\b/, 'fe_primaria'],
        [/\b(secundaria|bachillerato)\b/, 'fe_secundaria'],
        [/\b(pensar y creer)\b/, 'fe_pensar_creer'],
        [/\b(aprender con sentido)\b/, 'fe_aprender_sentido'],
        [/\b(pacto|peg|casa comun|siete compromisos)\b/, 'fe_pacto'],
        [/\b(pilares?|cinco pilares|proposito|objetivos?)\b/, 'fe_pilares'],
        [/\b(familia|familias|padres?|madres?|hogar|celebrar|quince minutos|voz de la experiencia)\b/, 'fe_familias'],
        [/\b(formacion|capacitacion|capacitar|rutas formativas|ciclos formativos|talleres|consultoria|acompanamiento|asesoria)\b/, 'fe_formacion'],
        [/\b(contenidos globales|recursos globales)\b/, 'fe_contenidos'],
        [/\b(conexiones|conexion|integracion|integrar|transversal|articular|relacionar)\b/, 'fe_conexiones'],
        [/\b(mallas?|documentos?|pdf|descargar|planificacion|asignaturas?|grado|grados|curriculo|curricular|curriculares)\b/, 'fe_documentos'],
        [/\b(tutorial|tutoriales|video|videos)\b/, 'fe_tutoriales'],
        [/\b(acceso|acceder|accedo|accede|entrar|ingresar|ingresa|ingreso|usuario|contrasena|credenciales|donde encuentro|donde esta|donde veo|edi)\b/, 'fe_acceso'],
        [/\b(pastoral|pastorales|evangelizacion)\b/, 'fe_pastoral'],
        [/\b(evaluacion|evaluar|evalua|evaluo|calificar|calificacion|calificaciones|rubricas?|notas?)\b/, 'fe_evaluacion'],
        [/\b(recursos|materiales|componentes|incluye|incluyen|contiene|ofrece|herramientas|libro|libros|digital|evaluacion|evaluar|calificar|socioemocional|religiosa|ingles|literatura|plan lector|itinerario|aprender)\b/, 'fe_recursos'],
        [/\b(que es|en que consiste|hablame|programa|resumen|informacion|valores|catolico|catolica|jesus|evangelio)\b|^(?:compartir )?(?:fe|creo)$/, 'fe_docente']
    ]
};

function resolverPrograma(section, query) {
    const intent = PROGRAM_INTENTS[section].find(([pattern]) => pattern.test(query));
    const candidate = intent ? intent[1] : section === 'fe' ? 'fe_sin_dato' : 'robotica_sin_dato';
    return BOT_DATA[candidate] ? candidate : section === 'fe' ? 'fe_docente' : 'robotica';
}

function searchByKeyword(text) {
    const q = normalizarConsulta(text);
    if (!q) return null;
    const remember = topic => { if (topic) botMemoria.setTopic(topic); return topic; };
    if (/^(hola|buenos dias|buenas tardes|buenas noches|inicio|menu|volver al inicio)$/.test(q)) return remember('inicio');
    if (/^soy (?:un |una )?(?:docente|profesor|profesora|maestro|maestra)$/.test(q)) return remember('menu_profesor');
    if (/^soy (?:un |una )?(?:estudiante|alumno|alumna|padre|madre|familiar)$/.test(q)) return remember('menu_estudiante');
    if (/\b(?:compartir )?bienestar\b/.test(q)) return remember('bienestar_proximamente');
    if (/\bcompartir pruebas\b/.test(q)) return remember('pruebas_proximamente');
    const robotics = /\b(robotica|robot|robots|set\s*(?:21|xxi))\b/.test(q);
    const crearActividad = /\bcreo\s+(?:(?:un|una|el|la|mi|mis|los|las|nuevo|nueva)\s+)*(?:tareas?|quiz|cuestionario|evaluacion|actividad|rubrica|material)\b/.test(q);
    const fe = /\b(fe|pastoral|evangelio|catolica|catolico|jesus|peg)\b|pacto educativo/.test(q) || (!crearActividad && /\bcreo\b(?!\s+que\b)/.test(q));
    if (robotics && fe) return remember('programas_comparar');
    if (robotics) return remember(resolverPrograma('robotica', q));
    if (fe) return remember(resolverPrograma('fe', q));
    if (/\b(suplementales|suplementarios)\b/.test(q)) return remember('suplementales_bot');

    // An explicit platform or task switches context instead of inheriting the previous program.
    if (/\b(pleno|progreso)\b/.test(q)) {
        if (/\b(responder|respondo|presentar|enviar)\b/.test(q)) return remember('pleno_est_responder');
        if (/\b(rubricas?|calificar|califico|calificacion)\b/.test(q)) return remember('pleno_doc_calificar');
        if (/\b(habilitar|reiniciar)\b/.test(q)) return remember('pleno_doc_reiniciar');
        if (/\b(crear|creo|evaluacion|evaluaciones|banco)\b/.test(q)) return remember('pleno_doc_crear');
        if (/\b(planificar|fechas|acceder|ingresar)\b/.test(q)) return remember('pleno_doc_planificar');
        return remember(botMemoria.ultimoRol === 'estudiante' ? 'progreso_estudiante' : 'progreso_docente');
    }
    if (/\b(richmond|ingles|markbook|assignments|pending|isolution)\b/.test(q)) {
        if (/\b(cookies|cache|limpiar)\b/.test(q)) return remember('richmond_cookies');
        if (/\b(asignar|asigno|crear|creo)\b.*\b(tarea|tareas)\b/.test(q)) return remember('richmond_doc_tareas');
        if (/\b(markbook|notas|calificaciones)\b/.test(q)) return remember('richmond_est_markbook');
        if (/\b(assignments|asignaciones)\b/.test(q)) return remember('richmond_est_assignments');
        if (/\b(pending|audios|calificar)\b/.test(q)) return remember('richmond_doc_calificar');
        if (/\b(isolution)\b/.test(q)) return remember('richmond_doc_isolution');
        if (/\b(ingresar|entrar|acceder|connect|edi|acceso)\b/.test(q)) return remember('richmond_ingreso');
        return remember(botMemoria.ultimoRol === 'estudiante' ? 'ingles_estudiante' : 'ingles_docente');
    }
    if (/\b(responder|respondo|entregar|entrego|enviar)\b.*\b(tarea|tareas|actividad|actividades)\b/.test(q)) return remember('est_tareas');
    if (/\b(crear|creo|hacer|asignar|asigno)\b.*\b(tarea|tareas)\b/.test(q)) return remember('docente_tarea');
    if (crearActividad && /\b(quiz|cuestionario|actividad)\b/.test(q)) return remember('quiz_base');
    if (crearActividad && /\bevaluacion\b/.test(q)) return remember('pleno_doc_crear');
    if (crearActividad && /\brubrica\b/.test(q)) return remember('pleno_doc_calificar');

    // Estas herramientas identifican otra plataforma aunque siga activo Fe/Robótica.
    if (/\b(quiz|quizzes|cuestionarios?|sopa de letras|crucigrama)\b/.test(q)) {
        return remember(/\b(sopa|crucigrama)\b/.test(q) ? 'q_juegos' : 'quiz_base');
    }
    if (/\blibro web\b/.test(q)) return remember('est_libroweb');
    if (/\bcompartir conocimientos\b/.test(q)) {
        return remember(botMemoria.ultimoRol === 'estudiante' ? 'est_conocimientos' : 'prof_conocimientos');
    }

    // Distinctive terms can identify a program without requiring its brand name.
    if (/\b(tinkercad|wokwi|micro\s*bit|maestro maker|cartilla|simulador|simuladores|fases|artefactos|prototipo|prototipos|explorador|practicante|indagador|construyamos|indaguemos|disenemos|comuniquemos|evaluemos|mecatronica|steam|maker|cajas?)\b/.test(q)) return remember(resolverPrograma('robotica', q));
    if (/\b(pensar y creer|aprender con sentido|pacto educativo|educacion religiosa escolar|escuela para padres|celebrar en familia|quince minutos|contenidos globales|recursos globales)\b/.test(q)) return remember(resolverPrograma('fe', q));
    if (botMemoria.ultimaSeccion === 'robotica' || botMemoria.ultimaSeccion === 'fe') return remember(resolverPrograma(botMemoria.ultimaSeccion, q));
    if (/\b(mallas?|primaria|secundaria|niveles?|formacion|familias?|pilares?|simuladores?|fases?|proyectos?)\b/.test(q)) return remember('programa_aclarar');

    if (/\b(calificaciones|notas)\b/.test(q)) {
        const student = botMemoria.ultimoRol === 'estudiante';
        const destinations = {
            ingles: 'richmond_est_markbook',
            conocimientos: student ? 'est_conocimientos' : 'prof_conocimientos',
            progreso: student ? 'progreso_estudiante' : 'pleno_doc_calificar'
        };
        return remember(destinations[botMemoria.ultimaSeccion] || (student ? 'duda_estudiante_seccion' : 'duda_docente_seccion'));
    }

    // Phrase boundaries prevent "fe" from matching "profesor" and similar substrings.
    const match = BOT_KEYWORDS.find(([kw]) => {
        const variants = [kw];
        if (!kw.includes(' ')) {
            if (/[aeiou]$/.test(kw)) variants.push(kw + 's');
            else if (/[nr]$/.test(kw)) variants.push(kw + 'es');
            if (kw.endsWith('s') && kw.length > 4) variants.push(kw.slice(0, -1));
        }
        return variants.some(term => (' ' + q + ' ').includes(' ' + term + ' '));
    });
    if (match) {
        const topic = match[1];
        const studentTopics = { docente_inicio: 'est_inicio', docente_tarea: 'est_tareas' };
        return remember(botMemoria.ultimoRol === 'estudiante' ? studentTopics[topic] || topic : topic);
    }
    if (/^(y |tambien |ademas |como )/.test(q)) {
        const contexts = {progreso:botMemoria.ultimoRol === 'estudiante' ? 'progreso_estudiante':'progreso_docente',conocimientos:botMemoria.ultimoRol === 'estudiante' ? 'est_conocimientos':'prof_conocimientos',ingles:botMemoria.ultimoRol === 'estudiante' ? 'ingles_estudiante':'ingles_docente'};
        return remember(contexts[botMemoria.ultimaSeccion] || null);
    }
    return null;
}


/* ============================================================
   MOTOR DEL CHATBOT
   ============================================================ */
const chatContainer = document.getElementById('chat-msgs');
let botResponseTimer = null;

const BOT_TOPIC_ICONS = {
    menu_profesor: 'graduation-cap', menu_estudiante: 'backpack',
    tengo_duda: 'circle-help', faq_bot: 'list', suplementales_bot: 'blocks',
    prof_conocimientos: 'atom', est_conocimientos: 'atom',
    progreso_docente: 'trending-up', progreso_estudiante: 'trending-up',
    ingles_docente: 'globe', ingles_estudiante: 'globe',
    fe_docente: 'book-heart', robotica: 'bot',
    bienestar_proximamente: 'heart-handshake', pruebas_proximamente: 'clipboard-check',
    inicio: 'house'
};

function crearIconoBot(name) {
    const key = name.replace(/(^|-)([a-z0-9])/g, (_, separator, letter) => letter.toUpperCase());
    const icon = lucide.createElement(lucide.icons[key]);
    icon.setAttribute('data-lucide', name);
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    icon.setAttribute('class', 'lucide lucide-' + name + ' bot-control-icon');
    return icon;
}

function etiquetarControlBot(control, label, iconName) {
    const text = document.createElement('span');
    text.textContent = label;
    control.append(crearIconoBot(iconName), text);
}

function setBotBusy(busy) {
    chatContainer.setAttribute('aria-busy', String(busy));
    document.querySelectorAll('#chat-msgs .bot-option, #chat-send').forEach(button => {
        button.disabled = busy;
    });
}

window.initBot = function initBot() {
    clearTimeout(botResponseTimer);
    botResponseTimer = null;
    chatContainer.innerHTML = '';
    botMemoria.ultimaSeccion = null;
    botMemoria.ultimoRol     = null;
    setBotBusy(false);
    renderBotResponse("inicio");
}

function crearEnlaceBot(label, href) {
    const url = new URL(href, location.href);
    if (url.protocol !== 'https:' && !(url.origin === location.origin && href.startsWith('robotica.html'))) return null;
    const link = document.createElement('a');
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'bot-resource-link';
    etiquetarControlBot(link, label, 'external-link');
    return link;
}

function agregarRecursosBot(message, data) {
    const resources = document.createElement('div');
    resources.className = 'bot-resources';
    const program = data.program;
    if (['Robotica', 'FE', 'Bienestar', 'Pruebas'].includes(program)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'bot-program-button';
        const iconName = {Robotica: 'bot', FE: 'book-heart', Bienestar: 'heart-handshake', Pruebas: 'clipboard-check'}[program];
        etiquetarControlBot(button, 'Abrir Compartir ' + ({Robotica: 'Robótica', FE: 'Fe'}[program] || program), iconName);
        button.addEventListener('click', () => {
            window.cerrarCoachBot();
            openRoleSelection(program);
        });
        resources.appendChild(button);
    }
    (data.videos || []).forEach(id => {
        const video = typeof todosLosVideos !== 'undefined' && todosLosVideos.find(item => item.id === id);
        if (!video) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'bot-resource-link';
        etiquetarControlBot(button, 'Ver video: ' + video.title, 'play-circle');
        button.addEventListener('click', () => openVideoModal(id));
        resources.appendChild(button);
    });
    (data.documents || []).forEach(index => {
        const doc = typeof documentosFE !== 'undefined' && documentosFE[index];
        if (!doc) return;
        const link = crearEnlaceBot(doc.titulo, doc.link);
        if (link) resources.appendChild(link);
    });
    (data.links || []).forEach(item => {
        const link = crearEnlaceBot(item.label, item.url);
        if (link) resources.appendChild(link);
    });
    if (resources.childElementCount) message.appendChild(resources);
    const sources = (data.sources || []).map(key => PROGRAM_DATA.sources[key]).filter(Boolean);
    if (sources.length) {
        const sourceBox = document.createElement('div');
        sourceBox.className = 'bot-sources';
        const label = document.createElement('span');
        label.textContent = 'Consultar fuentes:';
        sourceBox.appendChild(label);
        sources.forEach(source => {
            const link = crearEnlaceBot(source.label, source.url);
            if (link) sourceBox.appendChild(link);
        });
        message.appendChild(sourceBox);
    }
}

function renderBotResponse(topicId) {
    const data = BOT_DATA[topicId] || BOT_DATA.no_encontrado;
    // Only curated knowledge may contain markup. User messages use textContent below.
    const formattedText = data.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-message self-start bg-slate-800/90 border border-indigo-500/20 text-white p-5 rounded-2xl rounded-tl-sm text-sm shadow-[0_0_20px_rgba(0,0,0,0.4)] mb-2 leading-relaxed transform transition-all translate-y-2 opacity-0 max-w-full';
    botMsg.setAttribute('role', 'article');
    botMsg.dataset.botTopic = topicId;
    const body = document.createElement('div');
    body.innerHTML = formattedText;
    // Los tutoriales heredados se presentan como botones, igual que los recursos nuevos.
    body.querySelectorAll('a[onclick]').forEach(link => {
        const video = /^openVideoModal\('([\w-]{11})'\)$/.exec(link.getAttribute('onclick'));
        if (!video) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'bot-resource-link bot-inline-video';
        etiquetarControlBot(button, link.textContent, 'play-circle');
        button.addEventListener('click', () => openVideoModal(video[1]));
        link.replaceWith(button);
    });
    botMsg.appendChild(body);
    agregarRecursosBot(botMsg, data);
    if (data.options?.length) {
        const options = document.createElement('div');
        options.className = 'flex flex-col gap-2 mt-4 border-t border-white/10 pt-3';
        options.setAttribute('role', 'group');
        options.setAttribute('aria-label', 'Opciones');
        data.options.forEach(opt => {
            if (!BOT_DATA[opt.topic]) return;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'bot-option bg-slate-800/80 hover:bg-indigo-600 border border-indigo-500/30 py-2.5 px-4 rounded-xl font-bold transition-colors text-left flex justify-between items-center group cyber-hover';
            button.setAttribute('aria-label', opt.label);
            const back = opt.action === 'back';
            const leadingIcon = back ? 'arrow-left' : opt.icon || BOT_TOPIC_ICONS[opt.topic];
            if (leadingIcon) button.appendChild(crearIconoBot(leadingIcon));
            const label = document.createElement('span');
            label.textContent = opt.label;
            label.className = 'bot-option-label';
            button.appendChild(label);
            if (!back) button.appendChild(crearIconoBot('chevron-right'));
            button.addEventListener('click', () => handleUserClick(opt.label, opt.topic));
            options.appendChild(button);
        });
        botMsg.appendChild(options);
    }
    chatContainer.appendChild(botMsg);
    requestAnimationFrame(() => botMsg.classList.remove('translate-y-2', 'opacity-0'));
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

window.handleUserClick = function handleUserClick(label, targetTopic) {
    if (botResponseTimer !== null) return;
    appendUserMsg(label);
    botMemoria.setTopic(targetTopic);
    showTypingAndRespond(targetTopic);
}

window.sendFreeText = function sendFreeText() {
    if (botResponseTimer !== null) return;
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
    if (botResponseTimer !== null) return;
    setBotBusy(true);
    const dots = document.createElement('div');
    dots.className = "self-start bg-white/5 text-slate-400 p-3 rounded-2xl rounded-tl-sm text-xs mb-2 flex gap-1 items-center border border-white/10";
    dots.setAttribute('role', 'status');
    dots.setAttribute('aria-label', 'El bot está escribiendo');
    dots.innerHTML = ['','',''].map((_, i) =>
        `<span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay:${i*0.2}s" aria-hidden="true"></span>`
    ).join('');
    chatContainer.appendChild(dots);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    botResponseTimer = setTimeout(() => {
        botResponseTimer = null;
        dots.remove();
        renderBotResponse(targetTopic);
        setBotBusy(false);
    }, 550);
}

// El bot se inicializa cuando el usuario abre el modal (ver abrirCoachBot en main.js)
