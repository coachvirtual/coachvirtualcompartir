/* ============================================================
   BASE DE DATOS DEL COACH VIRTUAL (Segmentada + Guiones Completos)
   ============================================================ */

const BOT_DATA = {
    // 1. MENÚS PRINCIPALES (ROLES)
    "inicio": {
        text: "¡Hola! 👋 Soy tu Coach Virtual. Para darte la mejor experiencia, ¿eres Profesor o Estudiante?",
        options: [
            { label: "Soy Profesor 🍎", topic: "menu_profesor" },
            { label: "Soy Estudiante 🎒", topic: "menu_estudiante" }
        ]
    },
    "menu_profesor": {
        text: "¡Bienvenido, Profe! ¿Sobre qué ecosistema te gustaría aprender hoy?",
        options: [
            { label: "Conocimientos (Libroweb y Actividades)", topic: "prof_conocimientos" },
            { label: "Progreso (Pleno)", topic: "progreso_docente" },
            { label: "Inglés (Richmond)", topic: "ingles_general" },
            { label: "◀ Cambiar Rol", topic: "inicio" }
        ]
    },
    "menu_estudiante": {
        text: "¡Hola! Listo para aprender. ¿Qué necesitas revisar hoy?",
        options: [
            { label: "Conocimientos (Libroweb y Tareas)", topic: "est_conocimientos" },
            { label: "Progreso (Pleno)", topic: "progreso_estudiante" },
            { label: "Inglés (Richmond)", topic: "ingles_general" },
            { label: "◀ Cambiar Rol", topic: "inicio" }
        ]
    },

    // 2. MENÚS SECUNDARIOS (ÁREAS)
    "prof_conocimientos": {
        text: "**Compartir Conocimientos (Profesor)**\n\nAquí tienes las guías maestras de la plataforma. ¿Qué deseas hacer?",
        options: [
            { label: "Gestión General (Asignar, Panel, etc.)", topic: "prof_gestion" },
            { label: "Crear Quizzes y Actividades 🧩", topic: "quiz_categorias" },
            { label: "◀ Volver", topic: "menu_profesor" }
        ]
    },
    "est_conocimientos": {
        text: "**Compartir Conocimientos (Estudiante)**\n\nAprende a navegar por tus materiales y enviar tus trabajos:",
        options: [
            { label: "Mis Primeros Pasos", topic: "est_inicio" },
            { label: "Cómo responder Tareas", topic: "est_tareas" },
            { label: "Buscar el Libro Web", topic: "est_libroweb" },
            { label: "Recursos de la Biblioteca", topic: "est_biblioteca" },
            { label: "◀ Volver", topic: "menu_estudiante" }
        ]
    },
    "progreso_docente": {
        text: "**Compartir Progreso (Pleno) - Docente**\n\nAprende a gestionar las evaluaciones de tus estudiantes. ¿Qué deseas revisar?",
        options: [
            { label: "Acceder y Planificar", topic: "pleno_doc_planificar" },
            { label: "Crear Evaluaciones (Banco/Propias)", topic: "pleno_doc_crear" },
            { label: "Rúbricas y Calificación", topic: "pleno_doc_calificar" },
            { label: "Habilitar/Reiniciar Evaluaciones", topic: "pleno_doc_reiniciar" },
            { label: "◀ Volver", topic: "menu_profesor" }
        ]
    },
    "progreso_estudiante": {
        text: "**Compartir Progreso (Pleno) - Estudiante**\n\nAprende a presentar tus evaluaciones:",
        options: [
            { label: "Responder Evaluaciones", topic: "pleno_est_responder" },
            { label: "◀ Volver", topic: "menu_estudiante" }
        ]
    },
    "ingles_general": {
        text: "**Compartir Inglés (Richmond Studio)**\n\nTodo sobre audios y recursos del ecosistema Richmond. Próximamente videos detallados.",
        options: [{ label: "◀ Volver", topic: "inicio" }]
    },

    // 3. RESPUESTAS GENERALES (PROFESORES)
    "prof_gestion": {
        text: "¿Qué proceso de gestión deseas revisar?",
        options: [
            { label: "Primeros Pasos", topic: "docente_inicio" },
            { label: "Crear Tarea", topic: "docente_tarea" },
            { label: "Asignar Contenidos", topic: "docente_asignar" },
            { label: "Panel de Comunicaciones", topic: "docente_panel" },
            { label: "Agregar Material Propio", topic: "docente_material" },
            { label: "◀ Volver", topic: "prof_conocimientos" }
        ]
    },
    "docente_inicio": {
        text: "¡Bienvenido a Compartir Conocimientos!\n\n1. Ingresa a edi.santillanacompartir.com.co.\n2. Arriba a la derecha tienes: Biblioteca, Tareas, Calendario y Notificaciones.\n3. En el centro verás tus clases.\n4. Al entrar a una clase verás 4 pestañas:\n  • **Programa:** Módulos y Aprendizajes Nucleares.\n  • **Recursos del aula:** Apoyo docente.\n  • **Panel:** Tablero de publicaciones.\n  • **Calificaciones:** Rejilla de control.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('Bv_FinX79vk')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },
    "docente_tarea": {
        text: "Para crear una **Tarea**:\n\n1. Ve al Aprendizaje Nuclear y haz clic en **'+'** > Tarea.\n2. Configura la escala, categoría y destinatarios.\n3. Ponle título y elige el formato (texto, archivo, audio).\n4. Haz clic en **Crear Tarea**.\n5. Modifica el enunciado o imagen de fondo a la izquierda.\n6. Elige arriba a la derecha: Guardar Cambios (borrador), Guardar y publicar, o Programar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('KXROB84Q3IU')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },
    "docente_asignar": {
        text: "Para **Asignar contenidos**:\n\n1. Entra a la asignatura > Aprendizaje Nuclear.\n2. Ubica la sección de actividades.\n3. Frente al contenido, haz clic en los **tres puntos** y elige **'Asignar a...'**.\n4. Decide quién puede verlo, define fechas de entrega o permite entregas tardías.\n5. Haz clic en Guardar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('X6akIQPrJWw')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },
    "docente_panel": {
        text: "Para publicar en el **Panel de Comunicaciones**:\n\n1. En tu clase, ve a la pestaña Panel.\n2. En **Configuración**, elige los permisos de los estudiantes (comentar, publicar, o solo tú).\n3. Arriba, escribe tu anuncio (puedes adjuntar hasta 200MB en archivos).\n4. Haz clic en Publicar. Los alumnos recibirán notificación.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('SO60tHz47kU')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },
    "docente_material": {
        text: "Para subir **Material Propio**:\n\n1. Desde inicio, ve a **Mi Biblioteca**.\n2. Clic en **'+'** > Añadir un material.\n3. Elige Enlace (ej. YouTube) o Archivo.\n4. Añade título, descripción y clasifícalo (nivel, disciplina).\n5. Haz clic en Aceptar. *Tip: Crea carpetas y arrastra tus recursos para organizarlos.*\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('sGX_D17T4h8')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "prof_gestion" }]
    },

    // 4. RESPUESTAS GENERALES (ESTUDIANTES)
    "est_inicio": {
        text: "¡Bienvenido a tu plataforma!\n\n1. En edi.santillanacompartir.com.co selecciona Compartir Conocimientos.\n2. Arriba a la derecha ves tus Tareas, Calendario y Notificaciones.\n3. Al entrar a una clase verás:\n  • **Programa:** Tus saberes y actividades.\n  • **Recursos:** Tu Flipbook.\n  • **Panel:** Avisos de tu profe.\n  • **Calificaciones:** Tus avances.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('9oKz6MQgDsk')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "est_conocimientos" }]
    },
    "est_tareas": {
        text: "Para **Responder Tareas**:\n\n1. Ve a 'Mis Clases' y haz clic en el icono **Tareas** (arriba a la derecha).\n2. Haz clic en **Ver todo**. Puedes filtrar por Entregado o Pendiente.\n3. Selecciona la actividad pendiente, desarróllala y haz clic en **Enviar**.\n4. Luego dale a 'Volver a la lección'.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('XugiPvcc20g')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "est_conocimientos" }]
    },
    "est_libroweb": {
        text: "Para encontrar tu **Libro Web**:\n\n1. Ingresa a una asignatura y ubica el Aprendizaje Nuclear.\n2. En la sección **Nuevos Aprendizajes** está tu Libro Web.\n3. Haz clic en **Ir** y luego en **Ver**. Se abrirá en una pestaña nueva.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('l0MHO5QO1eQ')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "est_conocimientos" }]
    },
    "est_biblioteca": {
        text: "Para ver la **Biblioteca (Recursos del Aula)**:\n\n1. Ingresa a tu asignatura.\n2. Dirígete a la pestaña **Recursos del aula**.\n3. En la sección **Anual** encontrarás los materiales de apoyo cargados por tu profe o colegio.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('RjS2b5h-UqY')\" class=\"text-emerald-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "est_conocimientos" }]
    },

    // 5. RESPUESTAS DE PROGRESO (PLENO)
    "pleno_doc_planificar": {
        text: "**Acceder y Planificar en Pleno**\n\nIngresa a la plataforma y configura las fechas y parámetros de tus evaluaciones para que los estudiantes puedan presentarlas.\n\n▶️ Acceder: <a href=\"#\" onclick=\"openVideoModal('Och9Do2176Q')\" class=\"underline text-blue-400\">Ver Video</a> | Planificar: <a href=\"#\" onclick=\"openVideoModal('iJMU2Iyu8ng')\" class=\"underline text-blue-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "progreso_docente" }]
    },
    "pleno_doc_crear": {
        text: "**Crear Evaluaciones**\n\nPuedes generar evaluaciones usando el banco de ítems de Santillana, crear tus propias preguntas o configurar cuestionarios con preguntas aleatorias.\n\n▶️ Banco Santillana: <a href=\"#\" onclick=\"openVideoModal('DdPnWYVu1y4')\" class=\"underline text-blue-400\">Ver Video</a> | Ítems propios: <a href=\"#\" onclick=\"openVideoModal('aLm91Avo63Y')\" class=\"underline text-blue-400\">Ver Video</a> | Aleatorias: <a href=\"#\" onclick=\"openVideoModal('WpDFMfZdm5g')\" class=\"underline text-blue-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "progreso_docente" }]
    },
    "pleno_doc_calificar": {
        text: "**Rúbricas y Calificación**\n\nSi utilizas preguntas abiertas, deberás crear rúbricas para evaluarlas y luego calificarlas manualmente desde el panel de resultados.\n\n▶️ Crear rúbricas: <a href=\"#\" onclick=\"openVideoModal('7kp_-ZL7Amw')\" class=\"underline text-blue-400\">Ver Video</a> | Calificar abiertas: <a href=\"#\" onclick=\"openVideoModal('iTIFZeCEO_o')\" class=\"underline text-blue-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "progreso_docente" }]
    },
    "pleno_doc_reiniciar": {
        text: "**Habilitar o Reiniciar Evaluaciones**\n\nSi un estudiante tuvo problemas técnicos o necesitas darle una nueva oportunidad, puedes reiniciar o habilitar nuevamente su prueba en Pleno.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('OemyOCXD8U8')\" class=\"text-blue-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "progreso_docente" }]
    },
    "pleno_est_responder": {
        text: "**Responder Evaluaciones en Pleno**\n\nIngresa a Pleno desde tu plataforma, busca la evaluación activa asignada por tu docente, respóndela cuidadosamente y envíala para conocer tus resultados.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('_oDKSoJItHo')\" class=\"text-blue-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "progreso_estudiante" }]
    },

    // 6. CATEGORÍAS DE QUIZZES (Solo Profesores)
    "quiz_categorias": {
        text: "El motor de actividades es súper potente. He agrupado los más de 20 tutoriales por tipo. ¿Cuál te interesa?",
        options: [
            { label: "Crear Quiz (Config. Inicial)", topic: "quiz_base" },
            { label: "Plantillas Tipo Test", topic: "cat_test" },
            { label: "Completar / Arrastrar", topic: "cat_completar" },
            { label: "Ordenar y Relacionar", topic: "cat_relacionar" },
            { label: "Evaluación Manual / Otros", topic: "cat_manual" },
            { label: "◀ Volver", topic: "prof_conocimientos" }
        ]
    },
    "quiz_base": {
        text: "Para **Crear un Quiz General**:\n\n1. En tu clase, entra al Aprendizaje Nuclear.\n2. Haz clic en **'+'** > Quiz.\n3. Configura escala, si es evaluativa y fechas.\n4. Clic en **Crear Quiz**.\n5. Haz clic en **'+'** para añadir preguntas ('Nueva pregunta' o 'Buscar en biblioteca').\n6. Asigna valor a las preguntas y dale a Guardar y Publicar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('xMUUcHz1RMY')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "quiz_categorias" }]
    },
    "cat_test": {
        text: "Selecciona el tutorial de Tipo Test:",
        options: [
            { label: "Respuesta Única / Múltiple", topic: "q_unica_multiple" },
            { label: "Verdadero o Falso", topic: "q_vf" },
            { label: "Tabla / Lista de Selección", topic: "q_tabla" },
            { label: "◀ Volver", topic: "quiz_categorias" }
        ]
    },
    "cat_completar": {
        text: "Selecciona el tutorial de Completar/Arrastrar:",
        options: [
            { label: "Completar con Texto (Huecos/Imágenes)", topic: "q_comp_texto" },
            { label: "Arrastrar y Soltar (Huecos/Imágenes)", topic: "q_arrastrar" },
            { label: "◀ Volver", topic: "quiz_categorias" }
        ]
    },
    "cat_relacionar": {
        text: "Selecciona el tutorial de Ordenar y Relacionar:",
        options: [
            { label: "Emparejar / Unir / Ordenar", topic: "q_emparejar" },
            { label: "Sopa de Letras / Crucigrama", topic: "q_juegos" },
            { label: "Clasificar", topic: "q_clasificar" },
            { label: "◀ Volver", topic: "quiz_categorias" }
        ]
    },
    "cat_manual": {
        text: "Selecciona el tutorial Especial/Manual:",
        options: [
            { label: "Fórmulas Matemáticas", topic: "q_mates" },
            { label: "Resp. Compleja / Audio / Archivo", topic: "q_manual_archivos" },
            { label: "◀ Volver", topic: "quiz_categorias" }
        ]
    },

    "q_unica_multiple": {
        text: "**Tipo Test: Única / Múltiple**\n\n1. Selecciona la plantilla y haz clic en Continuar.\n2. A la derecha ves la vista del alumno, a la izquierda editas.\n3. En Instrucción, escribe la pregunta.\n4. Añade las opciones de respuesta.\n5. En Soluciones, elige Corrección Exacta (o Parcial si es múltiple) y marca las correctas.\n6. En Ajustes puedes habilitar orden aleatorio y elegir si usas números o letras.\n7. Clic en Guardar.\n\n▶️ Única: <a href=\"#\" onclick=\"openVideoModal('_L2wa7F_eyM')\" class=\"underline text-pink-400\">Ver Video</a> | Múltiple: <a href=\"#\" onclick=\"openVideoModal('3udWZoZfNfs')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_test" }]
    },
    "q_vf": {
        text: "**Verdadero y Falso**\n\n1. Escribe la instrucción y la premisa.\n2. En opciones, escribe Verdadero y Falso.\n3. En Soluciones, elige Corrección Exacta y marca la opción correcta.\n4. Puedes añadir retroalimentación en Tratamiento del error.\n5. Clic en Guardar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('uoSCotTJcj0')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "cat_test" }]
    },
    "q_tabla": {
        text: "**Tabla / Lista de Selección**\n\n1. Escribe la instrucción.\n2. En la Tabla, define las respuestas para las columnas y las filas principales.\n3. En Soluciones, marca las intersecciones correctas.\n4. En Ajustes activa 'Respuesta múltiple' si hay más de una válida por fila.\n5. Clic en Guardar.\n\n▶️ Tabla: <a href=\"#\" onclick=\"openVideoModal('OvXxkT4dak4')\" class=\"underline text-pink-400\">Ver Video</a> | Lista: <a href=\"#\" onclick=\"openVideoModal('zw4SWniGdbQ')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_test" }]
    },
    "q_comp_texto": {
        text: "**Completar Huecos/Imágenes con Texto**\n\n1. Escribe la instrucción.\n2. Pega el texto o sube la imagen. \n3. Selecciona las palabras que deseas ocultar y haz clic en **Añadir hueco**.\n4. En Soluciones, escribe la respuesta que el sistema debe validar.\n5. Clic en Guardar.\n\n▶️ Huecos: <a href=\"#\" onclick=\"openVideoModal('f36XjOs9Kdw')\" class=\"underline text-pink-400\">Ver Video</a> | Imagen: <a href=\"#\" onclick=\"openVideoModal('Wlndj6N3zL0')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_completar" }]
    },
    "q_arrastrar": {
        text: "**Arrastrar y Soltar / Desplegables**\n\n1. Pega tu texto o sube la imagen y define los 'Huecos'.\n2. En Opciones de respuesta, escribe las palabras correctas. *Tip: Agrega opciones extra como trampas.*\n3. En Soluciones, arrastra cada palabra correcta a su hueco definitivo.\n4. Clic en Guardar.\n\n▶️ Textos: <a href=\"#\" onclick=\"openVideoModal('SSLxS0EffXQ')\" class=\"underline text-pink-400\">Ver Video</a> | Imagen: <a href=\"#\" onclick=\"openVideoModal('-W6vnpkmDEo')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_completar" }]
    },
    "q_emparejar": {
        text: "**Emparejar / Unir / Ordenar**\n\n1. Escribe la instrucción.\n2. Para **Emparejar/Unir**: Agrega conceptos en la lista 1 y definiciones en la lista 2. En Soluciones, establece parejas.\n3. Para **Ordenar**: Agrega las palabras en el orden correcto.\n4. Clic en Guardar.\n\n▶️ Emparejar: <a href=\"#\" onclick=\"openVideoModal('G66EITN5HTM')\" class=\"underline text-pink-400\">Ver Video</a> | Unir: <a href=\"#\" onclick=\"openVideoModal('D-lSaspWGzQ')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_relacionar" }]
    },
    "q_juegos": {
        text: "**Sopa de Letras y Crucigramas**\n\n1. Para **Crucigrama**: Escribe las pistas y las palabras. El sistema genera el tablero automáticamente.\n2. Para **Sopa de Letras**: Escoge el tamaño y escribe las palabras a buscar.\n3. Puedes usar 'Previsualización' para regenerar el tablero.\n4. Clic en Guardar.\n\n▶️ Sopa de letras: <a href=\"#\" onclick=\"openVideoModal('n8pDFxb8O78')\" class=\"underline text-pink-400\">Ver Video</a> | Crucigrama: <a href=\"#\" onclick=\"openVideoModal('M7Y1wYkXkiI')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_relacionar" }]
    },
    "q_clasificar": {
        text: "**Clasificar**\n\n1. En Editor de Tabla, define entre 1 a 5 columnas.\n2. En Respuestas, añade las palabras mezcladas.\n3. En Soluciones, arrastra cada palabra a su columna correcta.\n4. Clic en Guardar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('YgALIhJ-PGg')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "cat_relacionar" }]
    },
    "q_mates": {
        text: "**Fórmulas Matemáticas**\n\n1. Escribe las operaciones matemáticas.\n2. Selecciona la respuesta y haz clic en 'Añadir hueco'.\n3. En Ajustes, activa el **teclado numérico, básico, intermedio o científico** para que aparezcan los símbolos.\n4. Clic en Guardar.\n\n▶️ <a href=\"#\" onclick=\"openVideoModal('XTkETvJ-s_c')\" class=\"text-pink-400 font-bold underline\">Ver Video Tutorial</a>",
        options: [{ label: "◀ Volver", topic: "cat_manual" }]
    },
    "q_manual_archivos": {
        text: "**Evaluación Manual**\n\nRequieren Corrección Manual del docente:\n\n• **Subir Archivo:** Define si el alumno sube de 1 a 10 archivos.\n• **Grabar Audio:** Ajusta el límite (ej. máx 120 seg).\n• **Respuesta Compleja:** Habilita el contador de palabras.\n• **Pintar:** Puedes subir una imagen de fondo para dibujar sobre ella.\n\n▶️ Subir archivo: <a href=\"#\" onclick=\"openVideoModal('yUfpyWQb3zI')\" class=\"underline text-pink-400\">Ver Video</a> | Audio: <a href=\"#\" onclick=\"openVideoModal('pk3g6khFJlc')\" class=\"underline text-pink-400\">Ver Video</a>",
        options: [{ label: "◀ Volver", topic: "cat_manual" }]
    }
};

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

    let optionsHTML = '';
    if (data.options && data.options.length > 0) {
        optionsHTML = `<div class="flex flex-col gap-2 mt-4 border-t border-white/10 pt-3">`;
        data.options.forEach(opt => {
            optionsHTML += `
                <button onclick="handleUserClick('${opt.label}', '${opt.topic}')" class="bg-slate-800/80 hover:bg-indigo-600 border border-indigo-500/30 py-2.5 px-4 rounded-xl text-[11px] font-bold transition-colors text-left flex justify-between items-center group shadow-sm">
                    ${opt.label} <i data-lucide="chevron-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                </button>
            `;
        });
        optionsHTML += `</div>`;
    }

    const formattedText = data.text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    const botMsg = document.createElement('div');
    botMsg.className = "self-start bg-slate-800/90 border border-white/10 text-white p-5 rounded-2xl rounded-tl-sm text-sm shadow-xl max-w-[90%] mb-2 leading-relaxed transform transition-all translate-y-2 opacity-0";
    botMsg.innerHTML = formattedText + optionsHTML;
    
    chatContainer.appendChild(botMsg);
    
    lucide.createIcons();
    requestAnimationFrame(() => botMsg.classList.remove('translate-y-2', 'opacity-0'));
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleUserClick(label, targetTopic) {
    const userMsg = document.createElement('div');
    userMsg.className = "self-end bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-sm text-sm font-bold shadow-lg max-w-[85%] mb-2 transform transition-all translate-y-2 opacity-0";
    userMsg.innerText = label.replace(/◀ Volver.*/, 'Atrás').replace(/◀ Cambiar Rol.*/, 'Atrás');
    chatContainer.appendChild(userMsg);
    
    requestAnimationFrame(() => userMsg.classList.remove('translate-y-2', 'opacity-0'));
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const typingIndicator = document.createElement('div');
    typingIndicator.className = "self-start bg-white/5 text-slate-400 p-3 rounded-2xl rounded-tl-sm text-xs italic mb-2 flex gap-1 items-center border border-white/10 shadow-lg";
    typingIndicator.innerHTML = '<span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span><span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>';
    chatContainer.appendChild(typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
        chatContainer.removeChild(typingIndicator);
        renderBotResponse(targetTopic);
    }, 500);
}

document.addEventListener("DOMContentLoaded", initBot);
