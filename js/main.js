/* ============================================================
   COACH VIRTUAL — main.js
   Incluye: búsqueda global, secciones, FAQ, flujo de problema,
   progreso, modo baja conexión, novedades, soporte, modal video
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initSearch();
    initSectionSearch();
    initFlujoProblema();
    initProgreso();
    ajustarPaddingHeader();
    actualizarContadores();
});

/* ============================================================
   BASE DE DATOS DE VIDEOS
   ============================================================ */
const videosGenerales = [
    { id: 'Bv_FinX79vk', title: 'Primeros pasos Docentes',            desc: 'Introducción a Compartir Conocimientos',       rol: 'Docente',    tags: ['inicio','basico','plataforma'] },
    { id: 'X6akIQPrJWw', title: 'Asignar contenidos',                  desc: 'Gestión de material en Compartir Conocimientos', rol: 'Docente',  tags: ['asignar','material','gestion'] },
    { id: 'KXROB84Q3IU', title: 'Actividades y Tareas',                desc: 'Asignación de tareas para docentes',             rol: 'Docente',  tags: ['tareas','actividades','enviar'] },
    { id: 'sGX_D17T4h8', title: 'Crea tus propios materiales',         desc: 'Sube y gestiona tu propio contenido',           rol: 'Docente',  tags: ['subir','propio','archivos'] },
    { id: 'SO60tHz47kU', title: 'Panel de comunicación',               desc: 'Mensajería y foros de la plataforma',           rol: 'Docente',  tags: ['foro','mensajes','comunicacion'] },
    { id: 'Twrx9mrQ6EQ', title: 'Solucionario y Teacher Planner',      desc: 'Herramientas de planificación docente',         rol: 'Docente',  tags: ['planificacion','soluciones','respuestas'] },
    { id: '9oKz6MQgDsk', title: 'Primeros pasos Estudiantes',          desc: 'Guía básica para alumnos y padres de familia',  rol: 'Estudiante',tags: ['inicio','alumno','basico','padre','familia'] },
    { id: 'XugiPvcc20g', title: 'Responder Tareas',                    desc: 'Cómo enviar respuestas (Estudiantes)',          rol: 'Estudiante',tags: ['tareas','responder','entregar'] },
    { id: 'RjS2b5h-UqY', title: 'Biblioteca Estudiantes',              desc: 'Acceso a recursos y biblioteca',                rol: 'Estudiante',tags: ['recursos','biblioteca','libros'] },
    { id: 'l0MHO5QO1eQ', title: 'Libro Web',                           desc: 'Uso del Libro Web para estudiar',               rol: 'Ambos',    tags: ['libro','estudiar','digital'] }
];

const videosActividades = [
    { id: 'xMUUcHz1RMY', title: 'Crear Quiz general',                  desc: 'Configuración inicial de quizzes',             rol: 'Docente', tags: ['quiz','evaluacion','examen'] },
    { id: '-W6vnpkmDEo', title: 'Completar imagen (Arrastrar)',         desc: 'Arrastrar y soltar en imágenes',              rol: 'Docente', tags: ['arrastrar','imagen','juego'] },
    { id: '9suY8fBcTpo', title: 'Completar imagen (Desplegable)',       desc: 'Menú desplegable en imágenes',                rol: 'Docente', tags: ['desplegable','imagen','opciones'] },
    { id: 'SSLxS0EffXQ', title: 'Completar huecos (Arrastrar)',         desc: 'Arrastrar y soltar en textos',                rol: 'Docente', tags: ['arrastrar','texto','huecos'] },
    { id: 'sAi3lAmCI5Y', title: 'Completar huecos (Desplegable)',       desc: 'Menú desplegable en textos',                  rol: 'Docente', tags: ['desplegable','texto','huecos'] },
    { id: 'YgALIhJ-PGg', title: 'Clasificar',                          desc: 'Actividad de agrupación y clasificación',     rol: 'Docente', tags: ['clasificar','grupos','categorias'] },
    { id: 'f36XjOs9Kdw', title: 'Completar huecos con texto',          desc: 'Escribir la respuesta correcta',              rol: 'Docente', tags: ['escribir','huecos','texto'] },
    { id: 'Wlndj6N3zL0', title: 'Completar imagen con texto',          desc: 'Escribir sobre zonas de imagen',              rol: 'Docente', tags: ['escribir','imagen','zonas'] },
    { id: 'uXAZTjqGqCA', title: 'Respuesta abierta simple',            desc: 'Preguntas de desarrollo corto',               rol: 'Docente', tags: ['abierta','desarrollo','escribir'] },
    { id: 'wyQ8XDKUJRg', title: 'Evaluación manual: Enunciado',        desc: 'Configurar rúbricas y enunciados',            rol: 'Docente', tags: ['manual','rubrica','enunciado'] },
    { id: 'pk3g6khFJlc', title: 'Evaluación manual: Grabar audio',     desc: 'Respuestas por nota de voz',                  rol: 'Docente', tags: ['audio','grabar','voz'] },
    { id: 'IDmx4SQrTp8', title: 'Evaluación manual: Pintar',           desc: 'Actividades de dibujo y trazo',               rol: 'Docente', tags: ['pintar','dibujo','trazar'] },
    { id: 't8ZGxHuU5kg', title: 'Evaluación manual: Abierta compleja', desc: 'Desarrollo extenso con formato',              rol: 'Docente', tags: ['ensayo','compleja','desarrollo'] },
    { id: 'yUfpyWQb3zI', title: 'Evaluación manual: Subir archivo',    desc: 'Recepción de entregables adjuntos',           rol: 'Docente', tags: ['subir','archivo','adjunto'] },
    { id: 'XTkETvJ-s_c', title: 'Fórmulas matemáticas',               desc: 'Completar huecos con ecuaciones',             rol: 'Docente', tags: ['matematicas','formulas','ecuaciones'] },
    { id: 'M7Y1wYkXkiI', title: 'Crucigrama',                          desc: 'Generador de crucigramas interactivos',       rol: 'Docente', tags: ['juego','crucigrama','palabras'] },
    { id: 'G66EITN5HTM', title: 'Emparejar',                           desc: 'Relacionar columnas o conceptos',             rol: 'Docente', tags: ['unir','emparejar','relacionar'] },
    { id: 'TMUK3uUYffQ', title: 'Ordenar',                             desc: 'Secuencias cronológicas o lógicas',           rol: 'Docente', tags: ['ordenar','secuencia','logica'] },
    { id: '0XXPdLzoRUc', title: 'Seleccionar para descubrir',          desc: 'Actividades de exploración',                  rol: 'Docente', tags: ['descubrir','explorar','seleccionar'] },
    { id: 'D-lSaspWGzQ', title: 'Unir',                                desc: 'Trazar líneas entre conceptos',               rol: 'Docente', tags: ['unir','lineas','trazar'] },
    { id: 'n8pDFxb8O78', title: 'Sopa de letras',                      desc: 'Generador de sopa de letras',                 rol: 'Docente', tags: ['juego','sopa','letras'] },
    { id: 'zw4SWniGdbQ', title: 'Tipo test: Lista de selección',       desc: 'Opciones múltiples en lista',                 rol: 'Docente', tags: ['test','lista','opciones'] },
    { id: '_L2wa7F_eyM', title: 'Tipo test: Respuesta única',          desc: 'Solo una opción es correcta',                 rol: 'Docente', tags: ['test','unica','opcion'] },
    { id: 'jkFJbiJVx_c', title: 'Tipo test: Selección múltiple num.', desc: 'Múltiples correctas con números',             rol: 'Docente', tags: ['test','multiple','numeros'] },
    { id: '3udWZoZfNfs', title: 'Tipo test: Selección múltiple',       desc: 'Varias opciones correctas',                   rol: 'Docente', tags: ['test','multiple','varias'] },
    { id: 'OvXxkT4dak4', title: 'Tipo test: Tabla de selección',       desc: 'Matrices de opciones',                        rol: 'Docente', tags: ['test','tabla','matriz'] },
    { id: 'uoSCotTJcj0', title: 'Tipo test: Verdadero y falso',        desc: 'Validación dicotómica',                       rol: 'Docente', tags: ['test','verdadero','falso'] }
];

const videosProgreso = [
    { id: 'Och9Do2176Q', title: 'Acceder a Pleno',                     desc: 'Ingreso a la plataforma de evaluación',       rol: 'Docente',    tags: ['pleno','ingreso','acceso'] },
    { id: 'iJMU2Iyu8ng', title: 'Planificar una evaluación',           desc: 'Configurar fechas y parámetros',              rol: 'Docente',    tags: ['pleno','planificar','fechas'] },
    { id: 'OemyOCXD8U8', title: 'Habilitar o reiniciar',              desc: 'Reasignar evaluaciones a estudiantes',         rol: 'Docente',    tags: ['pleno','reiniciar','habilitar'] },
    { id: 'DdPnWYVu1y4', title: 'Crear evaluación (Banco Santillana)', desc: 'Usar ítems predeterminados',                  rol: 'Docente',    tags: ['pleno','banco','crear'] },
    { id: 'WpDFMfZdm5g', title: 'Preguntas aleatorias',               desc: 'Configurar orden aleatorio en pruebas',        rol: 'Docente',    tags: ['pleno','aleatorio','preguntas'] },
    { id: 'aLm91Avo63Y', title: 'Crear evaluación (Ítems propios)',   desc: 'Diseñar preguntas desde cero',                 rol: 'Docente',    tags: ['pleno','propias','items'] },
    { id: '7kp_-ZL7Amw', title: 'Crear rúbricas',                     desc: 'Rúbricas para preguntas abiertas',            rol: 'Docente',    tags: ['pleno','rubricas','criterios'] },
    { id: 'iTIFZeCEO_o', title: 'Calificar preguntas abiertas',       desc: 'Revisión y puntuación manual',                 rol: 'Docente',    tags: ['pleno','calificar','manual'] },
    { id: '_oDKSoJItHo', title: 'Responder evaluaciones',             desc: 'Cómo presentar pruebas en Pleno',              rol: 'Estudiante', tags: ['pleno','responder','examen'] }
];

const videosIngles = [
    { id: 'P9ohgrwD_zs', title: 'Ingresar via Santillana Connect',     desc: 'Acceso a Richmond Studio',                    rol: 'Ambos',      tags: ['richmond','ingreso','connect'] },
    { id: 'wyxu3QD9WX8', title: 'Ingresar via EDI Santillana',         desc: 'Acceso desde EDI a Richmond Studio',          rol: 'Ambos',      tags: ['richmond','ingreso','edi'] },
    { id: 'sKtj-gpv78E', title: 'Limpiar cookies y caché',            desc: 'Solución a problemas de acceso',               rol: 'Ambos',      tags: ['richmond','cookies','cache','problemas'] },
    { id: 'zC5L4zTrZJA', title: 'Calificar audios (Pending Marks)',    desc: 'Revisión de audios de estudiantes',           rol: 'Docente',    tags: ['richmond','calificar','audio','pending'] },
    { id: 'ABBwpKFDN8M', title: 'Cómo asignar tareas',                desc: 'Asignación de actividades a estudiantes',      rol: 'Docente',    tags: ['richmond','tareas','asignar'] },
    { id: 'oWvbBcSyjkA', title: 'Acceder al i-solution',              desc: 'Recurso de soluciones del docente',            rol: 'Docente',    tags: ['richmond','isolution','offline'] },
    { id: 'NG5Jkq0uFeE', title: 'My Links - Richmond Studio',         desc: 'Gestión de accesos directos',                  rol: 'Estudiante', tags: ['richmond','links','accesos'] },
    { id: 'vSR2f5hqw84', title: '¿Dónde ver mis asignaciones?',       desc: 'Assignments: tareas pendientes y entregadas',  rol: 'Estudiante', tags: ['richmond','assignments','asignaciones'] },
    { id: 'L1sNm4j3ICU', title: '¿Dónde ver mis notas? (Markbook)',   desc: 'Consultar calificaciones en Richmond',         rol: 'Estudiante', tags: ['richmond','markbook','notas'] }
];

const SECTION_DATA = {
    'Conocimientos': { title: 'COMPARTIR CONOCIMIENTOS', icon: 'atom',       color: 'text-pink-400',    theme: 'pink' },
    'Progreso':      { title: 'COMPARTIR PROGRESO',      icon: 'trending-up', color: 'text-blue-400',    theme: 'blue' },
    'Ingles':        { title: 'COMPARTIR INGLÉS',        icon: 'globe',       color: 'text-emerald-400', theme: 'emerald' }
};

const todosLosVideos = [...videosGenerales, ...videosActividades, ...videosProgreso, ...videosIngles];
let seccionActualVideos = [];
let videoActualId = null;

/* ============================================================
   PROGRESO DE APRENDIZAJE
   ============================================================ */
function initProgreso() {
    actualizarUIProgreso();
}

function getVistos() {
    try { return JSON.parse(localStorage.getItem('cv_vistos') || '[]'); } catch { return []; }
}

function marcarVisto() {
    if (!videoActualId) return;
    const vistos = getVistos();
    if (!vistos.includes(videoActualId)) {
        vistos.push(videoActualId);
        localStorage.setItem('cv_vistos', JSON.stringify(vistos));
    }
    const btn = document.getElementById('btn-marcar-visto');
    if (btn) {
        btn.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4"></i> ¡Visto! ✓';
        btn.classList.add('text-green-400', 'border-green-500/30');
        lucide.createIcons();
    }
    actualizarUIProgreso();
}

/* ============================================================
   RATING 👍 👎
   Guardado: cv_ratings = { [ytId]: { like: N, dislike: N, miVoto: 'like'|'dislike'|null } }
   ============================================================ */
function getRatings() {
    try { return JSON.parse(localStorage.getItem('cv_ratings') || '{}'); } catch { return {}; }
}

function actualizarUIRating(ytId) {
    const ratings   = getRatings();
    const data      = ratings[ytId] || { like: 0, dislike: 0, miVoto: null };
    const btnLike    = document.getElementById('btn-like');
    const btnDislike = document.getElementById('btn-dislike');
    const cntLike    = document.getElementById('count-like');
    const cntDislike = document.getElementById('count-dislike');
    const feedback   = document.getElementById('rating-feedback');

    if (!btnLike) return;

    // Actualizar conteos
    if (cntLike)    cntLike.textContent    = data.like;
    if (cntDislike) cntDislike.textContent = data.dislike;

    // Resetear estilos
    btnLike.classList.remove('voted-like', 'voted-dislike');
    btnDislike.classList.remove('voted-like', 'voted-dislike');

    // Aplicar voto del usuario
    if (data.miVoto === 'like') {
        btnLike.classList.add('voted-like');
        if (feedback) feedback.textContent = '¡Gracias por tu opinión! 🙌';
    } else if (data.miVoto === 'dislike') {
        btnDislike.classList.add('voted-dislike');
        if (feedback) feedback.textContent = 'Gracias, lo tendremos en cuenta para mejorar.';
    } else {
        if (feedback) feedback.textContent = '';
    }
}

window.ratingVoto = function(tipo) {
    if (!videoActualId) return;
    const ratings = getRatings();
    const data    = ratings[videoActualId] || { like: 0, dislike: 0, miVoto: null };
    const anterior = data.miVoto;

    if (anterior === tipo) {
        // Quitar voto (toggle)
        data[tipo] = Math.max(0, data[tipo] - 1);
        data.miVoto = null;
    } else {
        // Si tenía voto anterior, quitarlo
        if (anterior) data[anterior] = Math.max(0, data[anterior] - 1);
        // Agregar nuevo voto
        data[tipo] = (data[tipo] || 0) + 1;
        data.miVoto = tipo;
    }

    ratings[videoActualId] = data;
    localStorage.setItem('cv_ratings', JSON.stringify(ratings));
    actualizarUIRating(videoActualId);

    // Micro-animación en el botón
    const btn = document.getElementById(`btn-${tipo}`);
    if (btn) {
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = '', 200);
    }
};

function actualizarUIProgreso() {
    const vistos = getVistos();
    const total = todosLosVideos.length;
    const pct = total > 0 ? Math.round((vistos.length / total) * 100) : 0;
    const banner = document.getElementById('progreso-banner');
    if (banner) {
        if (vistos.length > 0) {
            banner.classList.remove('hidden');
            banner.classList.add('flex');
        }
        const circulo = document.getElementById('progreso-circulo');
        const pctEl   = document.getElementById('progreso-pct');
        const vistosEl = document.getElementById('progreso-vistos');
        const totalEl  = document.getElementById('progreso-total');
        if (circulo) circulo.setAttribute('stroke-dasharray', `${pct} ${100 - pct}`);
        if (pctEl)    pctEl.textContent    = `${pct}%`;
        if (vistosEl) vistosEl.textContent = vistos.length;
        if (totalEl)  totalEl.textContent  = total;
    }
}

function resetearProgreso() {
    if (!confirm('¿Reiniciar tu progreso? Se borrarán todos los tutoriales marcados.')) return;
    localStorage.removeItem('cv_vistos');
    actualizarUIProgreso();
    actualizarContadores();
    const banner = document.getElementById('progreso-banner');
    if (banner) { banner.classList.add('hidden'); banner.classList.remove('flex'); }
}

/* ============================================================
   CONTADORES DE NO VISTOS EN TARJETAS
   ============================================================ */
const VIDEOS_POR_SECCION = {
    'Conocimientos': [...videosGenerales, ...videosActividades].map(v => v.id),
    'Progreso':      videosProgreso.map(v => v.id),
    'Ingles':        videosIngles.map(v => v.id)
};

function actualizarContadores() {
    const vistos = getVistos();
    Object.entries(VIDEOS_POR_SECCION).forEach(([seccion, ids]) => {
        const badge = document.getElementById(`badge-${seccion}`);
        if (!badge) return;
        const noVistos = ids.filter(id => !vistos.includes(id)).length;
        const total    = ids.length;
        if (noVistos > 0) {
            badge.innerHTML = `
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <circle cx="4" cy="4" r="3" fill="white" opacity="0.9"/>
                </svg>
                <span>${noVistos} pendiente${noVistos > 1 ? 's' : ''}</span>`;
            badge.classList.remove('hidden');
            badge.setAttribute('aria-label', `${noVistos} de ${total} tutoriales sin ver`);
        } else {
            // Todos vistos — mostrar ✓ brevemente y luego ocultar
            badge.innerHTML = `<span>✓ Completo</span>`;
            badge.classList.remove('hidden');
            // Cambiar color a verde
            badge.className = badge.className.replace(/bg-\w+-500/g, 'bg-green-500');
            badge.style.boxShadow = '0 0 12px rgba(34,197,94,0.7)';
        }
    });
}


function ajustarPaddingHeader() {
    const setOffsets = () => {
        const header = document.querySelector('header');
        if (!header) return;
        const h = header.offsetHeight;
        const gap = 24; // espacio respirable debajo del header
        ['main-menu', 'section-view'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.paddingTop = (h + gap) + 'px';
        });
    };
    setOffsets();
    // Recalcular cuando el banner se cierre o cambie el tamaño
    new ResizeObserver(setOffsets).observe(document.querySelector('header'));
    window.addEventListener('resize', setOffsets);
}

/* ============================================================
   NOVEDADES BANNER
   ============================================================ */
function cerrarBanner() {
    const b = document.getElementById('novedades-banner');
    if (b) {
        b.remove();
        ajustarPaddingHeader();
    }
}

function verNovedad() {
    cerrarBanner();
    openRoleSelection('Ingles');
}

/* ============================================================
   FAQ
   ============================================================ */
const FAQ_DATA = [
    {
        q: '¿Cómo doy mis primeros pasos como docente en Compartir Conocimientos?',
        a: 'Ingresa a EDI Santillana y selecciona Compartir Conocimientos. Encontrarás tus clases en el centro, y en cada una: Programa, Recursos del aula, Panel y Calificaciones. El tutorial te guía paso a paso.',
        video: 'Bv_FinX79vk'
    },
    {
        q: '¿Cómo creo y asigno una tarea a mis estudiantes?',
        a: 'Entra al Aprendizaje Nuclear de tu clase, haz clic en <strong>"+"</strong> y selecciona Tarea. Configura escala, categoría, destinatarios y formato (texto, archivo o audio). Luego elige Guardar y publicar o Programar.',
        video: 'KXROB84Q3IU'
    },
    {
        q: '¿Cómo respondo mis tareas como estudiante?',
        a: 'Haz clic en el ícono de <strong>Tareas</strong> (esquina superior derecha) → Ver todo → filtra por Pendiente. Selecciona la actividad, resuélvela y haz clic en <strong>Enviar</strong>.',
        video: 'XugiPvcc20g'
    },
    {
        q: '¿Dónde encuentro el Libro Web?',
        a: 'Entra a tu asignatura → Aprendizaje Nuclear → sección <strong>Nuevos Aprendizajes</strong>. Haz clic en <strong>Ir</strong> y luego en <strong>Ver</strong>. Se abrirá en una nueva pestaña.',
        video: 'l0MHO5QO1eQ'
    },
    {
        q: '¿Cómo creo un Quiz o actividad interactiva?',
        a: 'En el Aprendizaje Nuclear haz clic en <strong>"+"</strong> → Quiz. Configura la escala y las fechas, luego agrega preguntas con <strong>"+"</strong> (nueva pregunta o desde biblioteca). Hay más de 25 tipos de actividades disponibles.',
        video: 'xMUUcHz1RMY'
    },
    {
        q: '¿Cómo creo una evaluación en Pleno (Compartir Progreso)?',
        a: 'Ingresa a Pleno desde EDI Santillana, selecciona tu asignatura y haz clic en <strong>"Nueva evaluación"</strong>. Puedes usar el banco de ítems de Santillana o crear tus propias preguntas desde cero.',
        video: 'DdPnWYVu1y4'
    },
    {
        q: '¿Cómo habilito o reinicio una evaluación para un estudiante en Pleno?',
        a: 'Si un estudiante tuvo inconvenientes técnicos o necesita una nueva oportunidad, puedes reiniciar o volver a habilitar su prueba directamente desde el panel de Pleno.',
        video: 'OemyOCXD8U8'
    },
    {
        q: '¿Cómo ingreso a Richmond Studio para las clases de inglés?',
        a: 'Puedes acceder desde <strong>Santillana Connect</strong> o desde <strong>EDI Santillana</strong>. Busca el acceso a Richmond Studio en tu plataforma. Hay un tutorial para cada vía de ingreso.',
        video: 'P9ohgrwD_zs'
    },
    {
        q: '¿Dónde veo mis asignaciones y notas en Richmond Studio?',
        a: 'En tu panel de estudiante en Richmond Studio, la sección <strong>Assignments</strong> muestra tus actividades pendientes y entregadas. El <strong>Markbook</strong> muestra todas tus calificaciones.',
        video: 'vSR2f5hqw84'
    },
    {
        q: '¿Cómo calificar los audios grabados por los estudiantes en Richmond Studio?',
        a: 'Los audios pendientes de calificación aparecen en la sección <strong>Pending Marks</strong> de tu panel docente en Richmond Studio. El tutorial muestra cómo revisarlos y asignarles nota.',
        video: 'zC5L4zTrZJA'
    },
    {
        q: 'Richmond Studio no carga bien, ¿qué hago?',
        a: 'Limpiar las cookies y el caché del navegador resuelve la mayoría de problemas de acceso o carga en Richmond Studio. El tutorial muestra cómo hacerlo paso a paso en Chrome y Edge.',
        video: 'sKtj-gpv78E'
    },
    {
        q: '¿Cómo crear una Sopa de letras o Crucigrama?',
        a: 'En el editor de Quiz, selecciona la plantilla <strong>Sopa de letras</strong> o <strong>Crucigrama</strong>. Para la sopa elige el tamaño y escribe las palabras; para el crucigrama escribe pistas y palabras y el sistema genera el tablero automáticamente.',
        video: 'n8pDFxb8O78'
    }
];

function abrirFAQ() {
    const modal = document.getElementById('faq-modal');
    const lista = document.getElementById('faq-opciones');
    if (!modal || !lista) return;

    lista.innerHTML = '';
    FAQ_DATA.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/40 text-white text-sm font-bold transition-all flex justify-between items-start gap-3';
        btn.setAttribute('role', 'listitem');
        btn.innerHTML = `
            <span class="flex items-start gap-2">
                <i data-lucide="play-circle" class="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" aria-hidden="true"></i>
                <span>${item.q}</span>
            </span>
            <i data-lucide="chevron-right" class="w-4 h-4 shrink-0 text-slate-400 mt-0.5" aria-hidden="true"></i>`;
        btn.addEventListener('click', () => {
            cerrarFAQ();
            if (item.video) openVideoModal(item.video);
        });
        lista.appendChild(btn);
    });

    lucide.createIcons();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.focus();
}

function cerrarFAQ() {
    const modal = document.getElementById('faq-modal');
    if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
}

/* ============================================================
   FLUJO: TENGO UN PROBLEMA
   ============================================================ */
const PROBLEMA_FLUJO = {
    raiz: {
        titulo: '¿Cuál es tu problema?',
        opciones: [
            { label: '🔐 No puedo entrar a la plataforma',       siguiente: 'acceso' },
            { label: '📚 No veo mis tareas o materiales',        siguiente: 'tareas' },
            { label: '📊 Tengo problemas con una evaluación',    siguiente: 'evaluacion' },
            { label: '🎵 Problemas con Richmond Studio (inglés)', siguiente: 'richmond' },
            { label: '🎬 Un video no carga',                     siguiente: 'video' },
            { label: '🖥️ La plataforma va muy lenta',            siguiente: 'lento' }
        ]
    },
    acceso: {
        titulo: '¿Qué pasa al entrar?',
        opciones: [
            { label: 'Olvidé mi contraseña',                     video: null, texto: 'Ve a edi.santillanacompartir.com.co y usa "¿Olvidaste tu contraseña?". Si no recibes el correo, revisa spam o contáctanos.' },
            { label: 'Me aparece un error al iniciar sesión',    video: null, texto: 'Intenta limpiar el caché del navegador (Ctrl+Shift+Delete) y vuelve a intentarlo con Chrome o Edge.' },
            { label: 'No recuerdo mi usuario',                   video: null, texto: 'Tu usuario generalmente es tu correo institucional. Si no lo recuerdas, contacta al administrador de tu colegio.' }
        ]
    },
    tareas: {
        titulo: '¿Eres docente o estudiante?',
        opciones: [
            { label: 'Soy docente y no puedo asignar tareas',    video: 'KXROB84Q3IU' },
            { label: 'Soy estudiante y no veo mis tareas',       video: 'XugiPvcc20g' },
            { label: 'No encuentro el Libro Web',                video: 'l0MHO5QO1eQ' },
            { label: 'No veo los materiales de mi clase',        video: 'RjS2b5h-UqY' }
        ]
    },
    evaluacion: {
        titulo: '¿Qué problema tienes con la evaluación?',
        opciones: [
            { label: 'No sé cómo crear una evaluación en Pleno', video: 'DdPnWYVu1y4' },
            { label: 'Un estudiante no puede presentar',         video: 'OemyOCXD8U8' },
            { label: 'No sé cómo calificar respuestas abiertas', video: 'iTIFZeCEO_o' },
            { label: 'No sé cómo responder una evaluación',      video: '_oDKSoJItHo' }
        ]
    },
    richmond: {
        titulo: '¿Qué pasa con Richmond Studio?',
        opciones: [
            { label: 'No puedo ingresar a Richmond Studio',      video: 'P9ohgrwD_zs' },
            { label: 'La página no carga bien',                  video: 'sKtj-gpv78E' },
            { label: 'No veo mis asignaciones',                  video: 'vSR2f5hqw84' },
            { label: 'No sé cómo asignar tareas (docente)',      video: 'ABBwpKFDN8M' }
        ]
    },
    video: {
        titulo: 'Problema con un video',
        opciones: [
            { label: 'Activa el modo baja conexión para ver los tutoriales en YouTube', accion: 'modoLento' },
            { label: 'Limpia el caché del navegador (Ctrl+Shift+Delete)',              texto: 'Abre la configuración del navegador, busca "Borrar datos de navegación" y borra caché e historial.' },
            { label: 'Verifica tu conexión a internet',                                texto: 'Intenta con otra red WiFi o datos móviles. Si el problema persiste, usa el botón "Abrir en YouTube" del video.' }
        ]
    },
    lento: {
        titulo: 'Plataforma lenta',
        opciones: [
            { label: 'Activa el modo baja conexión', accion: 'modoLento' },
            { label: 'Cierra otras pestañas del navegador', texto: 'Tener muchas pestañas abiertas consume memoria. Cierra las que no uses y recarga la plataforma.' },
            { label: 'Usa Chrome o Edge actualizados', texto: 'Los navegadores más recientes tienen mejor rendimiento. Actualiza tu navegador o prueba con uno diferente.' }
        ]
    }
};

function initFlujoProblema() {
    // solo registrar listeners
}

function abrirFlujoProblema() {
    const modal = document.getElementById('problema-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        renderFlujo('raiz');
        modal.focus();
    }
}

function cerrarFlujoProblema() {
    const modal = document.getElementById('problema-modal');
    if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
}

function renderFlujo(paso) {
    const data = PROBLEMA_FLUJO[paso];
    if (!data) return;
    const titulo    = document.getElementById('problema-titulo');
    const opciones  = document.getElementById('problema-opciones');
    if (titulo)   titulo.textContent = data.titulo;
    if (!opciones) return;
    opciones.innerHTML = '';

    data.opciones.forEach(op => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/40 text-white text-sm font-bold transition flex justify-between items-center gap-2 cyber-hover';
        btn.innerHTML = `<span>${op.label}</span><i data-lucide="chevron-right" class="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true"></i>`;
        btn.addEventListener('click', () => {
            if (op.video) {
                cerrarFlujoProblema();
                openVideoModal(op.video);
            } else if (op.texto) {
                opciones.innerHTML = `
                    <div class="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-4 text-slate-300 text-sm leading-relaxed">${op.texto}</div>
                    <div class="flex gap-2 mt-2">
                        <button onclick="renderFlujo('${paso}')" class="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-bold transition">◀ Atrás</button>
                        <button onclick="cerrarFlujoProblema()" class="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-bold transition">Cerrar</button>
                    </div>`;
                lucide.createIcons();
            } else if (op.accion === 'modoLento') {
                cerrarFlujoProblema();
                aplicarModoLento(true);
                localStorage.setItem('cv_modo_lento', '1');
                alert('Modo baja conexión activado. Los videos se abrirán directamente en YouTube.');
            } else if (op.siguiente) {
                renderFlujo(op.siguiente);
            }
        });
        opciones.appendChild(btn);
    });

    // Botón volver si no es raíz
    if (paso !== 'raiz') {
        const back = document.createElement('button');
        back.className = 'w-full text-center py-2 text-slate-500 hover:text-slate-300 text-xs font-bold transition mt-1';
        back.textContent = '◀ Ver todas las opciones';
        back.addEventListener('click', () => renderFlujo('raiz'));
        opciones.appendChild(back);
    }
    lucide.createIcons();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const fm = document.getElementById('faq-modal');
        if (fm && fm.classList.contains('flex')) { cerrarFAQ(); return; }
        const pm = document.getElementById('problema-modal');
        if (pm && pm.classList.contains('flex')) { cerrarFlujoProblema(); return; }
        const vm = document.getElementById('video-modal');
        if (vm && !vm.classList.contains('hidden')) { closeVideoModal(); return; }
        const cs = document.getElementById('chat-sidebar');
        if (cs && cs.classList.contains('open')) { toggleChat(); }
    }
});

/* ============================================================
   BUSCADOR GLOBAL
   ============================================================ */
function initSearch() {
    const searchInput    = document.getElementById('global-search');
    const searchResults  = document.getElementById('search-results');
    const cardsContainer = document.getElementById('cards-container');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            cardsContainer.classList.remove('hidden');
            return;
        }
        const filtrados = todosLosVideos.filter(v =>
            v.title.toLowerCase().includes(query) ||
            v.desc.toLowerCase().includes(query) ||
            (v.tags && v.tags.some(t => t.toLowerCase().includes(query)))
        );
        cardsContainer.classList.add('hidden');
        searchResults.classList.remove('hidden');
        searchResults.innerHTML = filtrados.length > 0
            ? generarTarjetas(filtrados)
            : `<div class="col-span-full text-center p-8 text-slate-400" role="status"><i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 opacity-50" aria-hidden="true"></i><p>No encontramos tutoriales para "<strong>${query}</strong>"</p></div>`;
        lucide.createIcons();
    });
}

/* ============================================================
   BUSCADOR EN SECCIÓN
   ============================================================ */
function initSectionSearch() {
    const input    = document.getElementById('section-search');
    const results  = document.getElementById('section-search-results');
    const content  = document.getElementById('section-content');
    if (!input) return;

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            results.classList.add('hidden');
            content.style.display = '';
            return;
        }
        const filtrados = seccionActualVideos.filter(v =>
            v.title.toLowerCase().includes(query) ||
            v.desc.toLowerCase().includes(query) ||
            (v.tags && v.tags.some(t => t.toLowerCase().includes(query)))
        );
        content.style.display = 'none';
        results.classList.remove('hidden');
        results.innerHTML = filtrados.length > 0
            ? generarTarjetas(filtrados)
            : `<div class="col-span-full text-center p-8 text-slate-400" role="status"><i data-lucide="search-x" class="w-10 h-10 mx-auto mb-3 opacity-50" aria-hidden="true"></i><p>Sin resultados para "<strong>${query}</strong>" en esta sección.</p></div>`;
        lucide.createIcons();
    });
}

/* ============================================================
   GENERADOR DE TARJETAS
   ============================================================ */
const generarTarjetas = (videos) => {
    const vistos = getVistos();
    return videos.map(v => {
        const visto = vistos.includes(v.id);
        return `
        <button onclick="openVideoModal('${v.id}')"
            class="relative w-full flex bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition group text-left items-center shadow-sm cyber-hover ${visto ? 'video-visto' : ''}"
            aria-label="Ver tutorial: ${v.title}">
            <div class="relative w-24 h-14 shrink-0 mr-4 rounded-lg overflow-hidden border border-white/10 bg-black" aria-hidden="true">
                <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute inset-0 flex items-center justify-center">
                    <i data-lucide="play-circle" class="text-white w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-transform duration-300"></i>
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <h3 class="font-bold text-sm text-white leading-tight truncate">${v.title}</h3>
                <p class="text-[10px] text-slate-400 mt-1 line-clamp-2">${v.desc}</p>
                ${v.rol !== 'Ambos' ? `<span class="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${v.rol === 'Docente' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'}">${v.rol}</span>` : ''}
            </div>
        </button>`;
    }).join('');
};

/* ============================================================
   NAVEGACIÓN ENTRE SECCIONES
   ============================================================ */
const mainMenu        = document.getElementById('main-menu');
const sectionView     = document.getElementById('section-view');
const sectionContent  = document.getElementById('section-content');

function openRoleSelection(sectionId) {
    const data = SECTION_DATA[sectionId];
    resetSectionSearch();
    sectionContent.innerHTML = `
        <div class="flex items-center gap-4 mb-6">
            <i data-lucide="${data.icon}" class="w-10 h-10 ${data.color} drop-shadow-[0_0_15px_currentColor]" aria-hidden="true"></i>
            <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight">${data.title}</h2>
        </div>
        <div class="w-full h-px bg-white/10 mb-10"></div>
        <div class="flex flex-col items-center pb-8">
            <h3 class="text-2xl font-black text-white mb-8 text-center">¿Cuál es tu perfil?</h3>
            <div class="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                <button onclick="loadFilteredContent('${sectionId}','Docente')"
                    class="flex-1 bg-white/5 border border-${data.theme}-500/30 hover:bg-${data.theme}-600/20 p-10 rounded-[2rem] transition-all group flex flex-col items-center gap-4 shadow-xl cyber-hover"
                    aria-label="Ver tutoriales para Docentes">
                    <div class="w-20 h-20 bg-${data.theme}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" aria-hidden="true">
                        <i data-lucide="graduation-cap" class="w-10 h-10 ${data.color}"></i>
                    </div>
                    <span class="text-2xl font-black text-white">Soy Docente</span>
                </button>
                <button onclick="loadFilteredContent('${sectionId}','Estudiante')"
                    class="flex-1 bg-white/5 border border-${data.theme}-500/30 hover:bg-${data.theme}-600/20 p-10 rounded-[2rem] transition-all group flex flex-col items-center gap-4 shadow-xl cyber-hover"
                    aria-label="Ver tutoriales para Estudiantes y Padres de familia">
                    <div class="w-20 h-20 bg-${data.theme}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" aria-hidden="true">
                        <i data-lucide="backpack" class="w-10 h-10 ${data.color}"></i>
                    </div>
                    <span class="text-2xl font-black text-white">Soy Estudiante</span>
                    <span class="text-xs text-slate-400 -mt-2">(también Padres de familia)</span>
                </button>
            </div>
        </div>`;
    lucide.createIcons();
    mainMenu.classList.add('fade-out');
    setTimeout(() => {
        mainMenu.classList.add('hidden');
        sectionView.classList.remove('hidden');
        requestAnimationFrame(() => sectionView.classList.add('fade-in'));
        sectionView.setAttribute('tabindex', '-1');
        sectionView.focus();
    }, 400);
}

function loadFilteredContent(sectionId, role) {
    const data    = SECTION_DATA[sectionId];
    const rolKey  = role === 'Docente' ? 'docente' : 'estudiante';
    resetSectionSearch();
    let contentHTML = '';

    // ── Determinar vídeos de la sección ───────────────────────
    if (sectionId === 'Conocimientos') {
        const vGen = videosGenerales.filter(v => v.rol === role || v.rol === 'Ambos');
        const vAct = role === 'Docente' ? videosActividades : [];
        seccionActualVideos = [...vGen, ...vAct];
    } else if (sectionId === 'Progreso') {
        seccionActualVideos = videosProgreso.filter(v => v.rol === role || v.rol === 'Ambos');
    } else {
        seccionActualVideos = [
            ...videosIngles.filter(v => v.rol === 'Ambos'),
            ...videosIngles.filter(v => v.rol === role)
        ];
    }

    // ── Ruta recomendada para esta sección + rol ──────────────
    const rutaSeccion = {
        Conocimientos: { docente: ['ruta-doc-conocimientos', 'ruta-doc-quizzes'], estudiante: ['ruta-est-inicio'] },
        Progreso:      { docente: ['ruta-doc-pleno'],                              estudiante: ['ruta-est-pleno'] },
        Ingles:        { docente: ['ruta-doc-richmond'],                           estudiante: ['ruta-est-richmond'] }
    };
    const rutaIds = (rutaSeccion[sectionId] || {})[rolKey] || [];
    const rutasDeSeccion = (RUTAS[rolKey] || []).filter(r => rutaIds.includes(r.id));

    if (rutasDeSeccion.length) {
        contentHTML += `
        <div class="mb-10">
            <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2">
                <i data-lucide="map" class="${data.color} w-5 h-5 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true"></i>
                Ruta de aprendizaje recomendada
            </h3>
            <div class="flex flex-col gap-4">
                ${rutasDeSeccion.map(r => renderRutaInline(r, data)).join('')}
            </div>
        </div>
        <div class="w-full h-px bg-white/10 mb-8"></div>`;
    }

    // ── Grupos de vídeos ──────────────────────────────────────
    contentHTML += `<p class="text-slate-300 mb-6 text-sm">Todos los tutoriales para <strong>${role === 'Estudiante' ? 'Estudiantes y Padres de familia' : 'Docentes'}</strong>.</p>`;

    if (sectionId === 'Conocimientos') {
        const vGen = videosGenerales.filter(v => v.rol === role || v.rol === 'Ambos');
        const vAct = role === 'Docente' ? videosActividades : [];
        if (vGen.length) contentHTML += grupoHTML('book-open', data.color, 'Generales y Gestión', vGen, data.theme);
        if (vAct.length) contentHTML += grupoHTML('puzzle', data.color, 'Actividades Interactivas y Quizzes', vAct, data.theme);
    } else if (sectionId === 'Progreso') {
        const vProg = videosProgreso.filter(v => v.rol === role || v.rol === 'Ambos');
        contentHTML += vProg.length
            ? grupoHTML('trending-up', data.color, 'Evaluaciones en Pleno', vProg, data.theme)
            : '<p class="text-slate-400 italic">No hay tutoriales para este perfil aún.</p>';
    } else {
        const vComun = videosIngles.filter(v => v.rol === 'Ambos');
        const vRol   = videosIngles.filter(v => v.rol === role);
        if (vComun.length) contentHTML += grupoHTML('users', data.color, 'Para todos', vComun, data.theme);
        if (vRol.length)   contentHTML += grupoHTML(
            role === 'Docente' ? 'graduation-cap' : 'backpack', data.color,
            `Exclusivos para ${role === 'Docente' ? 'Docentes' : 'Estudiantes'}`, vRol, data.theme);
    }

    // ── Render final ──────────────────────────────────────────
    sectionContent.style.opacity = 0;
    setTimeout(() => {
        sectionContent.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                    <i data-lucide="${data.icon}" class="w-10 h-10 ${data.color} drop-shadow-[0_0_15px_currentColor]" aria-hidden="true"></i>
                    <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight">${data.title}</h2>
                </div>
                <span class="hidden md:inline-block bg-${data.theme}-500/20 text-${data.theme}-300 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-${data.theme}-500/30">
                    ${role === 'Estudiante' ? 'Est. / Padre' : role}
                </span>
            </div>
            <div class="w-full h-px bg-white/10 mb-8"></div>
            ${contentHTML}`;
        lucide.createIcons();
        sectionContent.style.opacity = 1;
    }, 300);
}

/* Renderiza una ruta embebida dentro de la sección */
function renderRutaInline(ruta, data) {
    const vistos      = getVistos();
    const completados = ruta.pasos.filter(p => vistos.includes(p.id)).length;
    const total       = ruta.pasos.length;
    const pct         = Math.round((completados / total) * 100);
    const todoListo   = completados === total;

    const pasosHTML = ruta.pasos.map((paso, i) => {
        const visto    = vistos.includes(paso.id);
        const esActual = !visto && ruta.pasos.slice(0, i).every(p => vistos.includes(p.id));
        return `
        <div class="ruta-paso ${visto ? 'completado' : ''} ${esActual ? 'actual' : ''}">
            <button onclick="openVideoModal('${paso.id}')"
                class="flex items-center gap-3 w-full text-left hover:bg-white/5 rounded-xl p-2 transition group">
                <div class="paso-num w-8 h-8 shrink-0 rounded-full border flex items-center justify-center text-xs font-black
                    ${visto    ? 'bg-green-500/20 border-green-500/50 text-green-400' :
                      esActual ? 'bg-' + ruta.color + '-500/20 border-' + ruta.color + '-500/60 text-' + ruta.color + '-400' :
                                 'bg-white/5 border-white/20 text-slate-500'}">
                    ${visto ? '✓' : (i + 1)}
                </div>
                <div class="flex-1 min-w-0">
                    <p class="paso-titulo text-sm font-bold text-white truncate group-hover:text-${ruta.color}-300 transition">${paso.titulo}</p>
                    <p class="text-[11px] text-slate-500">${paso.desc}</p>
                </div>
                <i data-lucide="${visto ? 'check-circle-2' : esActual ? 'play-circle' : 'circle'}"
                    class="w-4 h-4 shrink-0 ${visto ? 'text-green-500' : esActual ? 'text-' + ruta.color + '-400' : 'text-slate-700'} transition" aria-hidden="true"></i>
            </button>
            ${i < ruta.pasos.length - 1 ? '<div class="ruta-linea h-3 ml-6"></div>' : ''}
        </div>`;
    }).join('');

    return `
    <div class="glass-panel rounded-2xl border border-${ruta.color}-500/20 overflow-hidden" id="inline-ruta-${ruta.id}">
        <!-- Cabecera -->
        <div class="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 shrink-0 bg-${ruta.color}-500/20 rounded-xl flex items-center justify-center">
                    <i data-lucide="${ruta.icono}" class="w-4 h-4 text-${ruta.color}-400" aria-hidden="true"></i>
                </div>
                <div>
                    <div class="flex items-center gap-2 flex-wrap">
                        <h4 class="text-white font-black text-sm">${ruta.titulo}</h4>
                        ${todoListo ? '<span class="text-[9px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">✓ Completa</span>' : ''}
                    </div>
                    <p class="text-slate-500 text-xs">${ruta.descripcion}</p>
                </div>
            </div>
            <span class="text-${ruta.color}-400 text-xs font-black shrink-0">${completados}/${total}</span>
        </div>
        <!-- Barra progreso -->
        <div class="px-5 py-2.5 border-b border-white/5 flex items-center gap-3">
            <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-${ruta.color}-500 rounded-full transition-all duration-700 shadow-[0_0_6px_currentColor]"
                    style="width:${pct}%" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span class="text-${ruta.color}-400 text-xs font-black min-w-[32px] text-right">${pct}%</span>
        </div>
        <!-- Pasos -->
        <div class="p-4 flex flex-col">${pasosHTML}</div>
    </div>`;
}



function grupoHTML(icon, color, titulo, videos, theme) {
    return `
        <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2">
            <i data-lucide="${icon}" class="${color} w-5 h-5 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true"></i> ${titulo}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10" role="list">${generarTarjetas(videos)}</div>`;
}

function closeSection() {
    sectionView.classList.remove('fade-in');
    seccionActualVideos = [];
    resetSectionSearch();
    setTimeout(() => {
        sectionView.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        requestAnimationFrame(() => mainMenu.classList.remove('fade-out'));
    }, 400);
}

function resetSectionSearch() {
    const input   = document.getElementById('section-search');
    const results = document.getElementById('section-search-results');
    if (input)   input.value = '';
    if (results) { results.classList.add('hidden'); }
    if (sectionContent) sectionContent.style.display = '';
}

/* ============================================================
   CHAT
   ============================================================ */
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatBackdrop  = document.getElementById('chat-backdrop');

function toggleChat() {
    const sidebar = document.getElementById('chat-sidebar');
    const isOpen  = sidebar.classList.contains('open');
    if (isOpen) {
        sidebar.classList.remove('open');
        chatBackdrop.classList.add('hidden');
        chatToggleBtn.setAttribute('aria-expanded', 'false');
        chatToggleBtn.focus();
    } else {
        sidebar.classList.add('open');
        chatBackdrop.classList.remove('hidden');
        chatToggleBtn.setAttribute('aria-expanded', 'true');
        setTimeout(() => {
            const inp = document.getElementById('chat-input');
            if (inp) inp.focus();
        }, 300);
    }
}

/* ============================================================
   MODAL VIDEO
   ============================================================ */
const modal        = document.getElementById('video-modal');
const iframe       = document.getElementById('modal-iframe');
const extLink      = document.getElementById('modal-external-link');
const ytLink       = document.getElementById('modal-yt-link');
const playerWrap   = document.getElementById('modal-player-wrap');
const lowBW        = document.getElementById('modal-lowbandwidth');
const fallback     = document.getElementById('modal-fallback');
const modalTitulo  = document.getElementById('modal-titulo');
let   prevFocus    = null;

window.openVideoModal = function(ytId, titulo = '') {
    if (!ytId) return;
    videoActualId = ytId;
    prevFocus = document.activeElement;

    const found = todosLosVideos.find(v => v.id === ytId);
    titulo = titulo || (found ? found.title : '');
    if (modalTitulo) modalTitulo.textContent = titulo;

    const url = `https://youtu.be/${ytId}`;

    // Resetear capa de error
    const errLayer = document.getElementById('video-error-layer');
    if (errLayer) errLayer.classList.add('hidden');
    if (playerWrap) playerWrap.classList.remove('hidden');
    if (lowBW)      { lowBW.classList.add('hidden'); lowBW.classList.remove('flex'); }
    if (fallback)   fallback.classList.remove('hidden');

    iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    if (extLink) extLink.href = url;
    if (ytLink)  ytLink.href  = url;

    // Link de error apunta al mismo video
    const errYtLink = document.getElementById('video-error-yt-link');
    if (errYtLink) errYtLink.href = url;

    // Timeout: si en 8s el iframe no comunica carga, mostrar error
    clearTimeout(window._iframeTimeout);
    window._iframeTimeout = setTimeout(() => {
        // Solo mostrar error si el modal sigue abierto
        if (!modal.classList.contains('hidden')) {
            // No forzamos el error automáticamente porque los iframes de YouTube
            // cargan asíncronamente. El error manual (onerror) lo maneja mostrarErrorVideo().
        }
    }, 8000);

    // Botón marcar visto
    const btnVisto = document.getElementById('btn-marcar-visto');
    const vistos = getVistos();
    if (btnVisto) {
        if (vistos.includes(ytId)) {
            btnVisto.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4"></i> Ya lo viste ✓';
            btnVisto.classList.add('text-green-400');
        } else {
            btnVisto.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4"></i> Marcar como visto';
            btnVisto.classList.remove('text-green-400');
        }
        lucide.createIcons();
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.focus();
    actualizarUIRating(ytId);
};

window.mostrarErrorVideo = function() {
    const errLayer = document.getElementById('video-error-layer');
    if (errLayer) {
        errLayer.classList.remove('hidden');
        lucide.createIcons();
    }
};

// Los iframes de YouTube no disparan onerror de forma confiable.
// En cambio, detectamos si el iframe cargó la página de bloqueo
// comprobando el título del documento interno (solo funciona same-origin,
// pero al menos el onerror del atributo captura fallos de red directos).
window.detectarErrorIframe = function(iframe) {
    try {
        // Si YouTube bloquea el embed, el src sigue cargando pero podemos
        // leer si el contenido está vacío solo en same-origin.
        // Para cross-origin solo podemos confiar en el evento error del elemento.
    } catch(e) {
        mostrarErrorVideo();
    }
};

window.closeVideoModal = function() {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    iframe.src = '';
    clearTimeout(window._iframeTimeout);
    videoActualId = null;
    if (prevFocus) { prevFocus.focus(); prevFocus = null; }
    actualizarUIProgreso();
    actualizarContadores();
    // Limpiar feedback de rating
    const feedback = document.getElementById('rating-feedback');
    if (feedback) feedback.textContent = '';
};

modal.addEventListener('click', (e) => { if (e.target.id === 'video-modal') closeVideoModal(); });

/* ============================================================
   RUTAS DE APRENDIZAJE
   ============================================================ */
const RUTAS = {
    docente: [
        {
            id: 'ruta-doc-conocimientos',
            titulo: 'Primeros pasos como Docente',
            descripcion: 'Desde cero hasta publicar tu primera actividad',
            color: 'pink',
            icono: 'graduation-cap',
            pasos: [
                { id: 'Bv_FinX79vk', titulo: 'Conoce la plataforma',        desc: 'Navegación general y panel de clases' },
                { id: 'X6akIQPrJWw', titulo: 'Asigna contenidos',            desc: 'Cómo asignar material a tus estudiantes' },
                { id: 'KXROB84Q3IU', titulo: 'Crea tu primera tarea',        desc: 'Configurar y publicar una tarea' },
                { id: 'SO60tHz47kU', titulo: 'Usa el Panel de comunicación', desc: 'Publica anuncios y comunícate con tu grupo' },
                { id: 'sGX_D17T4h8', titulo: 'Sube tu propio material',      desc: 'Agrega recursos personalizados a tu biblioteca' },
            ]
        },
        {
            id: 'ruta-doc-quizzes',
            titulo: 'Maestro de Actividades Interactivas',
            descripcion: 'Domina los 25+ tipos de quiz disponibles',
            color: 'purple',
            icono: 'puzzle',
            pasos: [
                { id: 'xMUUcHz1RMY', titulo: 'Crear un Quiz desde cero',     desc: 'Configuración inicial y publicación' },
                { id: '_L2wa7F_eyM', titulo: 'Respuesta única y múltiple',   desc: 'Tipo test clásico' },
                { id: 'n8pDFxb8O78', titulo: 'Sopa de letras',               desc: 'Actividad de vocabulario gamificada' },
                { id: 'M7Y1wYkXkiI', titulo: 'Crucigrama',                   desc: 'Generación automática del tablero' },
                { id: 'G66EITN5HTM', titulo: 'Emparejar conceptos',          desc: 'Relacionar columnas' },
                { id: 'pk3g6khFJlc', titulo: 'Grabar audio',                 desc: 'Evaluación oral con nota de voz' },
            ]
        },
        {
            id: 'ruta-doc-pleno',
            titulo: 'Evaluaciones con Pleno',
            descripcion: 'Crea, aplica y califica pruebas formales',
            color: 'blue',
            icono: 'trending-up',
            pasos: [
                { id: 'Och9Do2176Q', titulo: 'Accede a Pleno',               desc: 'Ingreso y navegación inicial' },
                { id: 'iJMU2Iyu8ng', titulo: 'Planifica una evaluación',     desc: 'Fechas, parámetros y configuración' },
                { id: 'DdPnWYVu1y4', titulo: 'Usa el banco de Santillana',   desc: 'Ítems prediseñados listos para usar' },
                { id: 'aLm91Avo63Y', titulo: 'Crea tus propias preguntas',   desc: 'Diseña ítems desde cero' },
                { id: '7kp_-ZL7Amw', titulo: 'Diseña rúbricas',              desc: 'Para evaluar respuestas abiertas' },
                { id: 'iTIFZeCEO_o', titulo: 'Califica respuestas abiertas', desc: 'Revisión y puntuación manual' },
            ]
        },
        {
            id: 'ruta-doc-richmond',
            titulo: 'Richmond Studio — Inglés',
            descripcion: 'Gestiona tus clases de inglés con Richmond',
            color: 'emerald',
            icono: 'globe',
            pasos: [
                { id: 'P9ohgrwD_zs', titulo: 'Ingresa a Richmond Studio',    desc: 'Via Santillana Connect' },
                { id: 'ABBwpKFDN8M', titulo: 'Asigna tareas',                desc: 'Actividades para tus grupos' },
                { id: 'zC5L4zTrZJA', titulo: 'Califica audios',              desc: 'Pending Marks paso a paso' },
                { id: 'oWvbBcSyjkA', titulo: 'Usa el i-solution',            desc: 'Libro de soluciones online/offline' },
                { id: 'sKtj-gpv78E', titulo: 'Resuelve problemas técnicos',  desc: 'Limpiar caché si algo no carga' },
            ]
        }
    ],
    estudiante: [
        {
            id: 'ruta-est-inicio',
            titulo: 'Mis primeros pasos',
            descripcion: 'Todo lo que necesitas para comenzar',
            color: 'pink',
            icono: 'rocket',
            pasos: [
                { id: '9oKz6MQgDsk', titulo: 'Conoce tu plataforma',         desc: 'Navegación básica para estudiantes' },
                { id: 'l0MHO5QO1eQ', titulo: 'Encuentra el Libro Web',       desc: 'Accede a tu libro digital' },
                { id: 'XugiPvcc20g', titulo: 'Responde tus tareas',          desc: 'Cómo enviar actividades al docente' },
                { id: 'RjS2b5h-UqY', titulo: 'Explora la Biblioteca',        desc: 'Recursos y materiales de tu clase' },
            ]
        },
        {
            id: 'ruta-est-pleno',
            titulo: 'Presentar evaluaciones en Pleno',
            descripcion: 'Aprende a presentar tus pruebas sin estrés',
            color: 'blue',
            icono: 'file-check',
            pasos: [
                { id: '_oDKSoJItHo', titulo: 'Responde una evaluación',      desc: 'Paso a paso en Pleno' },
            ]
        },
        {
            id: 'ruta-est-richmond',
            titulo: 'Richmond Studio — Inglés',
            descripcion: 'Navega y aprende inglés con Richmond',
            color: 'emerald',
            icono: 'globe',
            pasos: [
                { id: 'P9ohgrwD_zs', titulo: 'Ingresa a Richmond Studio',    desc: 'Via Santillana Connect' },
                { id: 'NG5Jkq0uFeE', titulo: 'Organiza tus My Links',        desc: 'Accesos rápidos a tus recursos' },
                { id: 'vSR2f5hqw84', titulo: 'Revisa tus asignaciones',      desc: 'Actividades pendientes y entregadas' },
                { id: 'L1sNm4j3ICU', titulo: 'Consulta tus notas',           desc: 'Markbook: todas tus calificaciones' },
                { id: 'sKtj-gpv78E', titulo: 'Resuelve problemas técnicos',  desc: 'Limpiar caché si algo no carga' },
            ]
        }
    ]
};

let rolRutaActual = null;

window.abrirRutas = function() {
    const modal = document.getElementById('rutas-modal');
    if (!modal) return;
    // Resetear al selector de rol
    volverSelectorRol();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.focus();
    lucide.createIcons();
};

window.cerrarRutas = function() {
    const modal = document.getElementById('rutas-modal');
    if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
};

window.volverSelectorRol = function() {
    document.getElementById('rutas-rol-selector').classList.remove('hidden');
    const lista = document.getElementById('rutas-lista');
    lista.classList.add('hidden');
    lista.classList.remove('flex');
    rolRutaActual = null;
};

window.seleccionarRolRuta = function(rol) {
    rolRutaActual = rol;
    document.getElementById('rutas-rol-selector').classList.add('hidden');
    const lista = document.getElementById('rutas-lista');
    lista.classList.remove('hidden');
    lista.classList.add('flex');

    const label = document.getElementById('rutas-rol-label');
    if (label) label.textContent = rol === 'docente' ? '🍎 Docente' : '🎒 Estudiante / Padre';

    renderRutas(rol);
    lucide.createIcons();
};

function renderRutas(rol) {
    const rutas   = RUTAS[rol] || [];
    const vistos  = getVistos();
    const cards   = document.getElementById('rutas-cards');
    if (!cards) return;

    cards.innerHTML = rutas.map(ruta => {
        const completados = ruta.pasos.filter(p => vistos.includes(p.id)).length;
        const total       = ruta.pasos.length;
        const pct         = Math.round((completados / total) * 100);
        const todoListo   = completados === total;

        const pasosHTML = ruta.pasos.map((paso, i) => {
            const visto   = vistos.includes(paso.id);
            const esActual = !visto && ruta.pasos.slice(0,i).every(p => vistos.includes(p.id));
            return `
            <div class="ruta-paso ${visto ? 'completado' : ''} ${esActual ? 'actual' : ''}">
                ${i < ruta.pasos.length - 1 ? '' : ''}
                <button onclick="cerrarRutas();openVideoModal('${paso.id}')"
                    class="flex items-center gap-3 w-full text-left hover:bg-white/5 rounded-xl p-2 transition group">
                    <div class="paso-num w-8 h-8 shrink-0 rounded-full border flex items-center justify-center text-xs font-black
                        ${visto ? 'bg-green-500/20 border-green-500/50 text-green-400' :
                          esActual ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400' :
                          'bg-white/5 border-white/20 text-slate-500'}">
                        ${visto ? '✓' : (i + 1)}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="paso-titulo text-sm font-bold text-white truncate group-hover:text-emerald-300 transition">${paso.titulo}</p>
                        <p class="text-[11px] text-slate-500">${paso.desc}</p>
                    </div>
                    <i data-lucide="${visto ? 'check-circle-2' : 'play-circle'}"
                        class="w-4 h-4 shrink-0 ${visto ? 'text-green-500' : 'text-slate-600 group-hover:text-emerald-400'} transition" aria-hidden="true"></i>
                </button>
                ${i < ruta.pasos.length - 1 ? '<div class="ruta-linea h-3 w-0.5 ml-6"></div>' : ''}
            </div>`;
        }).join('');

        return `
        <div class="glass-panel rounded-2xl border border-${ruta.color}-500/20 overflow-hidden">
            <!-- Cabecera ruta -->
            <div class="p-4 border-b border-white/10 flex items-start justify-between gap-3">
                <div class="flex items-start gap-3">
                    <div class="w-9 h-9 shrink-0 bg-${ruta.color}-500/20 rounded-xl flex items-center justify-center">
                        <i data-lucide="${ruta.icono}" class="w-5 h-5 text-${ruta.color}-400" aria-hidden="true"></i>
                    </div>
                    <div>
                        <h4 class="text-white font-black text-sm">${ruta.titulo}
                            ${todoListo ? '<span class="ml-2 text-[9px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">✓ Completa</span>' : ''}
                        </h4>
                        <p class="text-slate-500 text-xs">${ruta.descripcion}</p>
                    </div>
                </div>
                <span class="text-${ruta.color}-400 text-xs font-black shrink-0">${completados}/${total}</span>
            </div>
            <!-- Barra progreso -->
            <div class="px-4 py-2 border-b border-white/5">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Progreso</span>
                    <span class="text-[10px] text-${ruta.color}-400 font-black">${pct}%</span>
                </div>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-${ruta.color}-500 rounded-full transition-all duration-700 shadow-[0_0_6px_currentColor]" style="width:${pct}%"></div>
                </div>
            </div>
            <!-- Pasos -->
            <div class="p-4 flex flex-col">
                ${pasosHTML}
            </div>
        </div>`;
    }).join('');

    lucide.createIcons();
}

// Cerrar rutas con Escape (ya manejado en el listener global de Escape)
const _origEscape = null;
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const rm = document.getElementById('rutas-modal');
        if (rm && rm.classList.contains('flex')) { cerrarRutas(); }
    }
});

// Actualizar rutas cuando se marca un video como visto
const _origMarcarVistoRutas = window.marcarVisto;
window.marcarVisto = function() {
    _origMarcarVistoRutas();
    // Refrescar rutas inline dentro de la sección activa
    document.querySelectorAll('[id^="inline-ruta-"]').forEach(el => {
        const rutaId = el.id.replace('inline-ruta-', '');
        // Buscar en todas las rutas
        const ruta = [...(RUTAS.docente || []), ...(RUTAS.estudiante || [])].find(r => r.id === rutaId);
        if (ruta) {
            const seccion = Object.values(SECTION_DATA).find(s =>
                ['Conocimientos','Progreso','Ingles'].some(k =>
                    document.getElementById('section-content')?.innerHTML.includes(s.title)
                )
            ) || Object.values(SECTION_DATA)[0];
            el.outerHTML = renderRutaInline(ruta, seccion);
            lucide.createIcons();
        }
    });
};

/* ============================================================
   TRACKING GA4 — EVENTOS PERSONALIZADOS
   ============================================================ */
function trackVideoPlay(ytId, titulo, seccion) {
    window.trackEvent('video_play', { video_id: ytId, video_title: titulo, seccion: seccion || 'desconocida', event_category: 'video' });
}
function trackVideoCompletado(ytId, titulo) {
    const seccion = videosGenerales.concat(videosActividades).find(v=>v.id===ytId) ? 'Conocimientos' :
                    videosProgreso.find(v=>v.id===ytId) ? 'Progreso' :
                    videosIngles.find(v=>v.id===ytId) ? 'Ingles' : 'desconocida';
    window.trackEvent('video_completado', { video_id: ytId, video_title: titulo, seccion, event_category: 'progreso' });
}
function trackSeccionAbierta(seccion, rol) {
    window.trackEvent('seccion_abierta', { seccion, rol, event_category: 'navegacion' });
}
function trackBusqueda(termino, resultados) {
    window.trackEvent('busqueda', { termino, resultados, event_category: 'busqueda' });
}
function trackRating(ytId, titulo, tipo) {
    window.trackEvent('rating_voto', { video_id: ytId, video_title: titulo, tipo, event_category: 'rating' });
}

// Parchear openVideoModal
const _origOpen = window.openVideoModal;
window.openVideoModal = function(ytId, titulo) {
    _origOpen(ytId, titulo);
    const found = todosLosVideos.find(v=>v.id===ytId);
    const tit = titulo || (found ? found.title : ytId);
    const sec = videosGenerales.concat(videosActividades).find(v=>v.id===ytId) ? 'Conocimientos' :
                videosProgreso.find(v=>v.id===ytId) ? 'Progreso' :
                videosIngles.find(v=>v.id===ytId) ? 'Ingles' : 'desconocida';
    trackVideoPlay(ytId, tit, sec);
};

// Parchear marcarVisto
const _origMarcar = marcarVisto;
window.marcarVisto = function() {
    if (videoActualId) {
        const f = todosLosVideos.find(v=>v.id===videoActualId);
        trackVideoCompletado(videoActualId, f ? f.title : videoActualId);
    }
    _origMarcar();
};

// Parchear ratingVoto
const _origRating = window.ratingVoto;
window.ratingVoto = function(tipo) {
    if (videoActualId) {
        const f = todosLosVideos.find(v=>v.id===videoActualId);
        trackRating(videoActualId, f ? f.title : videoActualId, tipo);
    }
    _origRating(tipo);
};

// Parchear loadFilteredContent
const _origLoad = loadFilteredContent;
window.loadFilteredContent = function(sec, rol) {
    trackSeccionAbierta(sec, rol);
    _origLoad(sec, rol);
};

// Buscador GA4
document.addEventListener('DOMContentLoaded', () => {
    const gs = document.getElementById('global-search');
    if (gs) {
        let t;
        gs.addEventListener('input', e => {
            clearTimeout(t);
            const q = e.target.value.trim();
            if (q.length >= 3) {
                t = setTimeout(() => {
                    const n = todosLosVideos.filter(v =>
                        v.title.toLowerCase().includes(q.toLowerCase()) ||
                        (v.tags && v.tags.some(tag => tag.includes(q.toLowerCase())))
                    ).length;
                    trackBusqueda(q, n);
                }, 800);
            }
        });
    }
});

/* ============================================================
   DASHBOARD ADMIN — Ctrl + Shift + A
   ============================================================ */
const SECCION_VIDEOS_MAP = {
    'Conocimientos': [...videosGenerales, ...videosActividades],
    'Progreso':      videosProgreso,
    'Ingles':        videosIngles
};

document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        const dash = document.getElementById('dashboard-modal');
        if (!dash) return;
        if (dash.classList.contains('hidden')) {
            renderDashboard();
            dash.classList.remove('hidden');
            dash.focus();
            lucide.createIcons();
        } else {
            cerrarDashboard();
        }
    }
});

window.cerrarDashboard = function() {
    const m = document.getElementById('dashboard-modal');
    if (m) m.classList.add('hidden');
};

function renderDashboard() {
    const vistos  = getVistos();
    const ratings = getRatings();
    const total   = todosLosVideos.length;

    // Aviso GA4
    const aviso = document.getElementById('dash-ga-aviso');
    if (aviso) {
        const ok = typeof gtag !== 'undefined' &&
            !document.querySelector('script[src*="googletagmanager"]')?.src.includes('G-XXXXXXXXXX');
        aviso.classList.toggle('hidden', ok);
    }

    // KPIs
    const totalLikes    = Object.values(ratings).reduce((s,r)=>s+(r.like||0),0);
    const totalDislikes = Object.values(ratings).reduce((s,r)=>s+(r.dislike||0),0);
    const pct           = total>0 ? Math.round((vistos.length/total)*100) : 0;
    const sat           = (totalLikes+totalDislikes)>0 ? Math.round(totalLikes/(totalLikes+totalDislikes)*100) : null;

    const kpisEl = document.getElementById('dash-kpis');
    if (kpisEl) kpisEl.innerHTML = [
        { label:'Videos vistos',  value:vistos.length,             sub:`de ${total}`,           color:'indigo',  icon:'eye' },
        { label:'Completado',     value:`${pct}%`,                 sub:'del total',             color:'emerald', icon:'check-circle' },
        { label:'👍 Me gustó',    value:totalLikes,                sub:'votos positivos',       color:'green',   icon:'thumbs-up' },
        { label:'Satisfacción',   value:sat!==null?`${sat}%`:'—', sub:'likes / total votos',   color:'yellow',  icon:'star' }
    ].map(k=>`
        <div class="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col gap-1">
            <div class="flex items-center justify-between mb-1">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">${k.label}</span>
                <i data-lucide="${k.icon}" class="w-4 h-4 text-${k.color}-400 opacity-60" aria-hidden="true"></i>
            </div>
            <span class="text-3xl font-black text-white">${k.value}</span>
            <span class="text-[11px] text-slate-500">${k.sub}</span>
        </div>`).join('');

    // Videos vistos
    const vistosEl = document.getElementById('dash-vistos-lista');
    if (vistosEl) {
        vistosEl.innerHTML = vistos.length === 0
            ? '<p class="text-slate-500 text-xs italic">Ningún video visto aún.</p>'
            : vistos.map(id => {
                const v = todosLosVideos.find(x=>x.id===id);
                if (!v) return '';
                return `<button onclick="cerrarDashboard();openVideoModal('${v.id}')"
                    class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition text-left w-full group">
                    <img src="https://img.youtube.com/vi/${v.id}/default.jpg" alt="" class="w-12 h-9 rounded-lg object-cover opacity-70 group-hover:opacity-100 shrink-0">
                    <div class="min-w-0">
                        <p class="text-white text-xs font-bold truncate">${v.title}</p>
                        <p class="text-slate-500 text-[10px]">${v.rol}</p>
                    </div>
                    <i data-lucide="play" class="w-3.5 h-3.5 text-slate-500 shrink-0 ml-auto"></i>
                </button>`;
            }).join('');
    }

    // Ratings
    const ratingsEl = document.getElementById('dash-ratings-lista');
    if (ratingsEl) {
        const conVotos = Object.entries(ratings).filter(([,r])=>r.miVoto);
        ratingsEl.innerHTML = conVotos.length === 0
            ? '<p class="text-slate-500 text-xs italic">Ningún voto registrado aún.</p>'
            : conVotos.map(([id,r])=>{
                const v = todosLosVideos.find(x=>x.id===id);
                return `<div class="flex items-center gap-3 p-2 rounded-xl">
                    <span class="text-lg">${r.miVoto==='like'?'👍':'👎'}</span>
                    <div class="min-w-0 flex-1">
                        <p class="text-white text-xs font-bold truncate">${v?v.title:id}</p>
                        <div class="flex gap-3 mt-0.5">
                            <span class="text-[10px] text-green-400">👍 ${r.like||0}</span>
                            <span class="text-[10px] text-red-400">👎 ${r.dislike||0}</span>
                        </div>
                    </div>
                </div>`;
            }).join('');
    }

    // Progreso por sección
    const secsEl = document.getElementById('dash-progreso-secciones');
    const colores = { Conocimientos:'pink', Progreso:'blue', Ingles:'emerald' };
    if (secsEl) secsEl.innerHTML = Object.entries(SECCION_VIDEOS_MAP).map(([nombre, videos])=>{
        const vistosN = videos.filter(v=>vistos.includes(v.id)).length;
        const p = videos.length>0 ? Math.round((vistosN/videos.length)*100) : 0;
        const c = colores[nombre]||'indigo';
        return `<div>
            <div class="flex justify-between items-center mb-1.5">
                <span class="text-white text-xs font-bold">${nombre}</span>
                <span class="text-${c}-400 text-xs font-black">${vistosN} / ${videos.length} — ${p}%</span>
            </div>
            <div class="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-${c}-500 rounded-full transition-all duration-700" style="width:${p}%"></div>
            </div>
        </div>`;
    }).join('');

    lucide.createIcons();
}

window.exportarDatos = function() {
    const datos = {
        fecha_exportacion: new Date().toISOString(),
        vistos:   getVistos(),
        ratings:  getRatings(),
        progreso: Object.fromEntries(
            Object.entries(SECCION_VIDEOS_MAP).map(([s,vids])=>{
                const v = getVistos();
                return [s, { vistos: vids.filter(x=>v.includes(x.id)).length, total: vids.length }];
            })
        )
    };
    const blob = new Blob([JSON.stringify(datos,null,2)], {type:'application/json'});
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href:url, download:`coach-virtual-${new Date().toISOString().slice(0,10)}.json` });
    a.click();
    URL.revokeObjectURL(url);
};

window.limpiarDatosLocales = function() {
    if (!confirm('¿Borrar TODOS los datos locales? (vistos, ratings y progreso)')) return;
    localStorage.removeItem('cv_vistos');
    localStorage.removeItem('cv_ratings');
    actualizarUIProgreso();
    actualizarContadores();
    renderDashboard();
};
