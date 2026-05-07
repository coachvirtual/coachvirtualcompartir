/* ============================================================
   COACH VIRTUAL — main.js
   Incluye: búsqueda global, secciones, FAQ, flujo de problema,
   progreso, modo baja conexión, novedades, soporte, modal video
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initSearch();
    initSectionSearch();
    initFAQ();
    initFlujoProblema();
    initProgreso();
    initModoLento();
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
    const banner = document.getElementById('progreso-banner');
    if (banner) { banner.classList.add('hidden'); banner.classList.remove('flex'); }
}

/* ============================================================
   MODO BAJA CONEXIÓN
   ============================================================ */
function initModoLento() {
    const saved = localStorage.getItem('cv_modo_lento') === '1';
    if (saved) aplicarModoLento(true);
}

function toggleModoLento() {
    const activo = document.body.classList.contains('modo-lento');
    aplicarModoLento(!activo);
    localStorage.setItem('cv_modo_lento', !activo ? '1' : '0');
}

function aplicarModoLento(activo) {
    const btn = document.getElementById('btn-modo-lento');
    if (activo) {
        document.body.classList.add('modo-lento');
        if (btn) btn.title = 'Desactivar modo baja conexión';
    } else {
        document.body.classList.remove('modo-lento');
        if (btn) btn.title = 'Activar modo baja conexión';
    }
}

/* ============================================================
   NOVEDADES BANNER
   ============================================================ */
function cerrarBanner() {
    const b = document.getElementById('novedades-banner');
    if (b) b.remove();
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

function initFAQ() {
    const lista = document.getElementById('faq-lista');
    if (!lista) return;

    FAQ_DATA.forEach((item, i) => {
        const videoBtn = item.video
            ? `<button onclick="openVideoModal('${item.video}')" class="mt-3 flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-xs font-bold transition"><i data-lucide="play-circle" class="w-4 h-4"></i> Ver tutorial relacionado</button>`
            : '';

        lista.innerHTML += `
            <div class="faq-item glass-panel rounded-2xl border border-white/10 overflow-hidden" role="listitem">
                <button onclick="toggleFAQ(${i})" id="faq-btn-${i}"
                    class="w-full flex justify-between items-center p-4 md:p-5 text-left text-white font-bold text-sm hover:bg-white/5 transition"
                    aria-expanded="false" aria-controls="faq-answer-${i}">
                    <span class="flex items-center gap-2">
                        <i data-lucide="help-circle" class="w-4 h-4 text-indigo-400 shrink-0" aria-hidden="true"></i>
                        ${item.q}
                    </span>
                    <i data-lucide="chevron-down" class="w-4 h-4 shrink-0 faq-chevron text-slate-400" id="faq-chev-${i}" aria-hidden="true"></i>
                </button>
                <div id="faq-answer-${i}" class="faq-answer px-5 pb-0 text-slate-300 text-sm leading-relaxed" role="region" aria-labelledby="faq-btn-${i}">
                    <p>${item.a}</p>
                    ${videoBtn}
                    <div class="pb-4"></div>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

function toggleFAQ(i) {
    const answer = document.getElementById(`faq-answer-${i}`);
    const chev   = document.getElementById(`faq-chev-${i}`);
    const btn    = document.getElementById(`faq-btn-${i}`);
    const isOpen = answer.classList.contains('open');
    // cerrar todos
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-chevron').forEach(c => c.classList.remove('open'));
    document.querySelectorAll('[id^="faq-btn-"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    if (!isOpen) {
        answer.classList.add('open');
        chev.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }
    lucide.createIcons();
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

// Cerrar modal problema con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
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
    const data = SECTION_DATA[sectionId];
    resetSectionSearch();
    let contentHTML = '';

    if (sectionId === 'Conocimientos') {
        const vGen  = videosGenerales.filter(v => v.rol === role || v.rol === 'Ambos');
        const vAct  = role === 'Docente' ? videosActividades : [];
        seccionActualVideos = [...vGen, ...vAct];
        contentHTML += introHTML(role);

        // ── ASESOR CURRICULAR (solo Docentes) ─────────────────────────────
        if (role === 'Docente') {
            contentHTML += `
            <div class="mb-10">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-8 h-8 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-lg flex items-center justify-center border border-pink-500/30">
                        <i data-lucide="brain-circuit" class="w-4 h-4 text-pink-400" aria-hidden="true"></i>
                    </div>
                    <h3 class="text-lg font-black text-white uppercase tracking-wide">Herramientas de IA para Docentes</h3>
                </div>
                <button onclick="abrirAsesorCurricular()"
                    class="w-full group relative overflow-hidden rounded-[2rem] border border-pink-500/40 hover:border-pink-400/70
                           bg-gradient-to-br from-[#0f172a] via-[#1e1040] to-[#0f172a]
                           hover:from-pink-950/50 hover:via-purple-950/40 hover:to-[#0f172a]
                           transition-all duration-500 shadow-[0_0_30px_rgba(236,72,153,0.08)]
                           hover:shadow-[0_0_40px_rgba(236,72,153,0.25)] p-0"
                    aria-label="Abrir Asesor Curricular y Planificador de Clases con IA">

                    <!-- Fondo decorativo -->
                    <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                        <div class="absolute top-4 right-8 w-24 h-24 bg-pink-500 rounded-full blur-3xl"></div>
                        <div class="absolute bottom-4 right-24 w-16 h-16 bg-purple-500 rounded-full blur-2xl"></div>
                        <div class="absolute top-8 right-40 w-12 h-12 bg-indigo-500 rounded-full blur-xl"></div>
                    </div>

                    <div class="relative flex flex-col sm:flex-row items-center sm:items-stretch gap-0 text-left">

                        <!-- Icono lateral -->
                        <div class="flex-shrink-0 flex items-center justify-center w-full sm:w-36 py-6 sm:py-0
                                    bg-gradient-to-br from-pink-500/20 to-purple-600/20
                                    sm:border-r border-b sm:border-b-0 border-pink-500/20">
                            <div class="relative">
                                <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center
                                            shadow-[0_0_20px_rgba(236,72,153,0.4)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
                                            group-hover:scale-105 transition-all">
                                    <i data-lucide="sparkles" class="w-8 h-8 text-white" aria-hidden="true"></i>
                                </div>
                                <div class="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(74,222,128,0.6)]">
                                    <span class="text-[8px] font-black text-green-900">IA</span>
                                </div>
                            </div>
                        </div>

                        <!-- Texto -->
                        <div class="flex-1 p-5 sm:p-7">
                            <div class="flex flex-wrap items-center gap-2 mb-1">
                                <span class="text-xl sm:text-2xl font-black text-white">Asesor Curricular</span>
                                <span class="text-xl sm:text-2xl font-black text-pink-400">&</span>
                                <span class="text-xl sm:text-2xl font-black text-white">Planificador de Clases</span>
                                <span class="bg-pink-500/20 text-pink-300 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-pink-500/30 ml-1">Nuevo</span>
                            </div>
                            <p class="text-slate-400 text-sm leading-relaxed mb-4 max-w-xl">
                                Genera planes de clase, secuencias didácticas y asesoría curricular con IA.
                                Basado en las <strong class="text-slate-300">mallas Santillana Compartir</strong> y los estándares del MEN Colombia.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                                    <i data-lucide="flask-conical" class="w-3 h-3 text-pink-400" aria-hidden="true"></i>C. Naturales · 11 grados ✓
                                </span>
                                <span class="bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                                    <i data-lucide="zap" class="w-3 h-3 text-yellow-400" aria-hidden="true"></i>128 ANs Santillana
                                </span>
                                <span class="bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                                    <i data-lucide="layers" class="w-3 h-3 text-purple-400" aria-hidden="true"></i>6 metodologías activas
                                </span>
                                <span class="bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                                    <i data-lucide="calendar-range" class="w-3 h-3 text-blue-400" aria-hidden="true"></i>Desde 1 clase hasta el año
                                </span>
                            </div>
                            <div class="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white
                                        px-5 py-2 rounded-full text-sm font-black shadow-[0_0_15px_rgba(236,72,153,0.3)]
                                        group-hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all">
                                <i data-lucide="sparkles" class="w-4 h-4" aria-hidden="true"></i>
                                Abrir herramienta
                                <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </button>
            </div>`;
        }
        // ─────────────────────────────────────────────────────────────────

        if (vGen.length)  contentHTML += grupoHTML('book-open',  data.color, 'Generales y Gestión',                vGen, data.theme);
        if (vAct.length)  contentHTML += grupoHTML('puzzle',     data.color, 'Actividades Interactivas y Quizzes', vAct, data.theme);

    } else if (sectionId === 'Progreso') {
        const vProg = videosProgreso.filter(v => v.rol === role || v.rol === 'Ambos');
        seccionActualVideos = vProg;
        contentHTML += introHTML(role);
        contentHTML += vProg.length
            ? grupoHTML('trending-up', data.color, 'Evaluaciones en Pleno', vProg, data.theme)
            : '<p class="text-slate-400 italic" role="status">No hay tutoriales para este perfil aún.</p>';

    } else { // Inglés
        const vComun = videosIngles.filter(v => v.rol === 'Ambos');
        const vRol   = videosIngles.filter(v => v.rol === role);
        seccionActualVideos = [...vComun, ...vRol];
        contentHTML += introHTML(role);
        if (vComun.length) contentHTML += grupoHTML('users',            data.color, 'Para todos',                                              vComun, data.theme);
        if (vRol.length)   contentHTML += grupoHTML(role === 'Docente' ? 'graduation-cap' : 'backpack', data.color,
                                                    `Exclusivos para ${role === 'Docente' ? 'Docentes' : 'Estudiantes'}`, vRol, data.theme);
    }

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

function introHTML(role) {
    return `<p class="text-slate-300 mb-6 text-sm">Tutoriales para <strong>${role === 'Estudiante' ? 'Estudiantes y Padres de familia' : 'Docentes'}</strong>.</p>`;
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

    // Buscar título si no viene
    if (!titulo) {
        const found = todosLosVideos.find(v => v.id === ytId);
        titulo = found ? found.title : '';
    }
    if (modalTitulo) modalTitulo.textContent = titulo;

    const modoLento = document.body.classList.contains('modo-lento');
    const url = `https://youtu.be/${ytId}`;

    if (modoLento) {
        if (playerWrap) playerWrap.classList.add('hidden');
        if (lowBW)      { lowBW.classList.remove('hidden'); lowBW.classList.add('flex'); }
        if (fallback)   fallback.classList.add('hidden');
        if (ytLink)     ytLink.href = url;
        iframe.src = '';
    } else {
        if (playerWrap) playerWrap.classList.remove('hidden');
        if (lowBW)      { lowBW.classList.add('hidden'); lowBW.classList.remove('flex'); }
        if (fallback)   fallback.classList.remove('hidden');
        iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
        if (extLink) extLink.href = url;
    }

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
};

window.closeVideoModal = function() {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    iframe.src = '';
    videoActualId = null;
    if (prevFocus) { prevFocus.focus(); prevFocus = null; }
    actualizarUIProgreso();
};

modal.addEventListener('click', (e) => { if (e.target.id === 'video-modal') closeVideoModal(); });

/* ============================================================
   ASESOR CURRICULAR & PLANIFICADOR — integración Coach Virtual
   ============================================================ */

window.abrirAsesorCurricular = function() {
    // Si el modal ya existe, solo abrirlo
    if (document.getElementById('asesor-modal')) {
        document.getElementById('asesor-modal').classList.remove('hidden');
        document.getElementById('asesor-modal').classList.add('flex');
        return;
    }

    // Crear el modal completo en el DOM
    const modalEl = document.createElement('div');
    modalEl.id = 'asesor-modal';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-label', 'Asesor Curricular y Planificador de Clases');
    modalEl.className = 'fixed inset-0 z-[200] bg-black/90 backdrop-blur-lg flex items-start justify-center overflow-y-auto p-4 pt-6';
    modalEl.innerHTML = buildAsesorHTML();
    document.body.appendChild(modalEl);
    lucide.createIcons();

    // Event listeners internos
    setupAsesorEvents();
};

window.cerrarAsesor = function() {
    const m = document.getElementById('asesor-modal');
    if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
};

function buildAsesorHTML() {
    return `
    <div class="relative w-full max-w-4xl">
        <!-- Botón cerrar -->
        <button onclick="cerrarAsesor()" aria-label="Cerrar Asesor Curricular"
            class="fixed top-4 right-4 z-[210] bg-white/10 hover:bg-red-500 text-white p-2.5 rounded-full
                   transition-all border border-white/20 backdrop-blur-md shadow-xl">
            <i data-lucide="x" class="w-5 h-5" aria-hidden="true"></i>
        </button>

        <!-- Panel principal -->
        <div class="glass-panel rounded-[2rem] border border-pink-500/30 shadow-[0_0_60px_rgba(236,72,153,0.2)] overflow-hidden">

            <!-- Header -->
            <div class="bg-gradient-to-r from-pink-900/50 via-purple-900/40 to-[#0f172a]/80 px-6 py-5 border-b border-white/10">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center
                                shadow-[0_0_20px_rgba(236,72,153,0.5)] flex-shrink-0">
                        <i data-lucide="sparkles" class="w-6 h-6 text-white" aria-hidden="true"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight">Asesor Curricular & Planificador</h2>
                        <p class="text-xs text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
                            <span class="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full text-[9px] font-black uppercase">IA activa</span>
                            <span class="text-pink-400 font-semibold">C. Naturales · 11 grados · 128 ANs Santillana + MEN</span>
                        </p>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="flex gap-1 mt-4 overflow-x-auto" id="ac-tabs">
                    <button onclick="acTab('plan')" id="ac-tab-plan"
                        class="ac-tab active flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all
                               bg-pink-500/25 text-pink-300 border border-pink-500/40">
                        <i data-lucide="layout-kanban" class="w-3.5 h-3.5" aria-hidden="true"></i>Planificador
                    </button>
                    <button onclick="acTab('asesor')" id="ac-tab-asesor"
                        class="ac-tab flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all
                               text-slate-400 hover:text-slate-200 border border-white/10 hover:border-white/20">
                        <i data-lucide="brain" class="w-3.5 h-3.5" aria-hidden="true"></i>Asesor Curricular
                    </button>
                    <button onclick="acTab('explorar')" id="ac-tab-explorar"
                        class="ac-tab flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all
                               text-slate-400 hover:text-slate-200 border border-white/10 hover:border-white/20">
                        <i data-lucide="compass" class="w-3.5 h-3.5" aria-hidden="true"></i>Explorar ANs
                    </button>
                </div>
            </div>

            <!-- Body -->
            <div class="p-5 sm:p-7">

                <!-- ═══ PANEL PLANIFICADOR ═══ -->
                <div id="ac-panel-plan" class="ac-panel">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div class="flex flex-col gap-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Área</label>
                            <select id="ac-area" onchange="acAreaChange()" class="bg-white/5 border border-white/15 text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-500/50 transition">
                                <option value="">Seleccionar…</option>
                                <option value="Ciencias Naturales">Ciencias Naturales ✓</option>
                                <option value="Matemáticas">Matemáticas</option>
                                <option value="Lenguaje y Literatura">Lenguaje y Literatura</option>
                                <option value="Ciencias Sociales">Ciencias Sociales</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grado</label>
                            <select id="ac-grado" onchange="acGradoChange()" class="bg-white/5 border border-white/15 text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-500/50 transition">
                                <option value="">Seleccionar…</option>
                                <option>1°</option><option>2°</option><option>3°</option><option>4°</option><option>5°</option>
                                <option>6°</option><option>7°</option><option>8°</option><option>9°</option><option>10°</option><option>11°</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Periodo</label>
                            <select id="ac-periodo" class="bg-white/5 border border-white/15 text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-500/50 transition">
                                <option value="">Seleccionar…</option>
                                <option value="1">Periodo 1</option><option value="2">Periodo 2</option>
                                <option value="3">Periodo 3</option><option value="4">Periodo 4</option>
                            </select>
                        </div>
                    </div>

                    <!-- Preview malla -->
                    <div id="ac-malla-prev" class="hidden mb-4 bg-pink-500/10 border border-pink-500/25 rounded-xl p-3 text-xs text-pink-200"></div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div class="flex flex-col gap-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tema / Contenido</label>
                            <input type="text" id="ac-tema" placeholder="Ej: La célula, ecosistemas, fracciones…"
                                class="bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-500/50 transition"/>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">N° de estudiantes</label>
                            <input type="number" id="ac-nest" placeholder="35" min="5" max="60"
                                class="bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-500/50 transition"/>
                        </div>
                    </div>

                    <!-- Metodología -->
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Metodología activa</p>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4" id="ac-meto-grid">
                        ${[
                            ['Proyectos (ABP)', 'git-branch', 'from-pink-500/20 to-pink-600/10', 'border-pink-500/30'],
                            ['Aula Invertida', 'arrows-exchange', 'from-purple-500/20 to-purple-600/10', 'border-purple-500/30'],
                            ['Gamificación', 'trophy', 'from-amber-500/20 to-amber-600/10', 'border-amber-500/30'],
                            ['Retos (ABR)', 'lightbulb', 'from-yellow-500/20 to-yellow-600/10', 'border-yellow-500/30'],
                            ['Design Thinking', 'pencil', 'from-blue-500/20 to-blue-600/10', 'border-blue-500/30'],
                            ['Cooperativo', 'users', 'from-green-500/20 to-green-600/10', 'border-green-500/30'],
                        ].map(([n,ic,bg,br], i) => `
                            <button onclick="acSelMeto(this,'${n}')"
                                class="ac-meto-btn ${i===0?'ring-2 ring-pink-500/60 '+bg+' '+br:'bg-white/5 border-white/10'} border rounded-xl p-2.5 text-left transition-all hover:border-pink-400/50 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2">
                                <i data-lucide="${ic}" class="w-3.5 h-3.5 flex-shrink-0 ${i===0?'text-pink-400':'text-slate-400'}" aria-hidden="true"></i>${n}
                            </button>`).join('')}
                    </div>

                    <!-- Alcance temporal -->
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Alcance del plan</p>
                    <div class="grid grid-cols-5 gap-1.5 mb-4" id="ac-tiempo-grid">
                        ${[
                            ['1 Clase','clock','~2 h','1 clase (2 horas)'],
                            ['Semana','calendar-days','5 ses.','1 semana (5 sesiones)'],
                            ['1 Mes','calendar','Seq.','1 mes (secuencia didáctica)'],
                            ['Bimestre','calendar-range','Plan','1 bimestre (plan de área)'],
                            ['Año','calendar-check','Macro','1 año completo (macrolínea)'],
                        ].map(([n,ic,d,val], i) => `
                            <button onclick="acSelTiempo(this,'${val}')"
                                class="ac-tiempo-btn ${i===2?'ring-2 ring-amber-500/60 bg-amber-500/15 border-amber-500/40':'bg-white/5 border-white/10'} border rounded-xl p-2 text-center transition-all hover:border-amber-400/50 flex flex-col items-center gap-1">
                                <i data-lucide="${ic}" class="w-4 h-4 ${i===2?'text-amber-400':'text-slate-400'}" aria-hidden="true"></i>
                                <span class="text-[10px] font-bold text-white leading-tight">${n}</span>
                                <span class="text-[9px] text-slate-500">${d}</span>
                            </button>`).join('')}
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3 mb-4">
                        <div class="flex flex-col gap-1 max-w-[160px]">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Min / sesión</label>
                            <input type="number" id="ac-mins" value="60" min="30" max="180"
                                class="bg-white/5 border border-white/15 text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-500/50 transition"/>
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contexto especial (opcional)</label>
                            <input type="text" id="ac-ctx" placeholder="Institución rural, sin internet, NEE, Escuela Nueva…"
                                class="bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-500/50 transition"/>
                        </div>
                    </div>

                    <button onclick="acGenerar()" id="ac-btn-gen"
                        class="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500
                               text-white font-black rounded-2xl py-3 px-6 flex items-center justify-center gap-2 transition-all
                               shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] text-sm">
                        <i data-lucide="sparkles" class="w-4 h-4" aria-hidden="true"></i>
                        Generar plan pedagógico con IA
                        <i data-lucide="arrow-right" class="w-4 h-4" aria-hidden="true"></i>
                    </button>

                    <div id="ac-res-plan" class="hidden mt-4 bg-white/3 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 leading-relaxed"></div>
                    <div id="ac-actions-plan" class="hidden flex flex-wrap gap-2 mt-3">
                        <button onclick="acCopy('ac-res-plan')" class="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 px-3 py-1.5 rounded-full transition">
                            <i data-lucide="copy" class="w-3.5 h-3.5" aria-hidden="true"></i>Copiar
                        </button>
                        <button onclick="acAmpliar()" class="flex items-center gap-1.5 text-xs bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-pink-300 px-3 py-1.5 rounded-full transition">
                            <i data-lucide="refresh-cw" class="w-3.5 h-3.5" aria-hidden="true"></i>Ampliar plan
                        </button>
                        <button onclick="acRubrica()" class="flex items-center gap-1.5 text-xs bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-full transition">
                            <i data-lucide="check-square" class="w-3.5 h-3.5" aria-hidden="true"></i>Crear rúbrica
                        </button>
                        <button onclick="acMaker()" class="flex items-center gap-1.5 text-xs bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-full transition">
                            <i data-lucide="hammer" class="w-3.5 h-3.5" aria-hidden="true"></i>Proyecto Maker
                        </button>
                    </div>
                </div>

                <!-- ═══ PANEL ASESOR ═══ -->
                <div id="ac-panel-asesor" class="ac-panel hidden">
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <div class="flex flex-col gap-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Área</label>
                            <select id="ac-area-a" class="bg-white/5 border border-white/15 text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500/50 transition">
                                <option value="">Seleccionar…</option>
                                <option value="Ciencias Naturales">Ciencias Naturales ✓</option>
                                <option>Matemáticas</option><option>Lenguaje y Literatura</option><option>Ciencias Sociales</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grado</label>
                            <select id="ac-grado-a" class="bg-white/5 border border-white/15 text-white rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500/50 transition">
                                <option value="">Seleccionar…</option>
                                <option>1°</option><option>2°</option><option>3°</option><option>4°</option><option>5°</option>
                                <option>6°</option><option>7°</option><option>8°</option><option>9°</option><option>10°</option><option>11°</option>
                            </select>
                        </div>
                    </div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tipo de consulta</p>
                    <div class="flex flex-col gap-2 mb-4">
                        ${[
                            'Organizar la secuencia de contenidos del periodo',
                            'Identificar DBA y Aprendizajes Nucleares clave',
                            'Revisar la articulación vertical entre grados',
                            'Proponer malla de desempeños (bajo/básico/alto/superior)',
                            'Sugerir proyectos integradores interdisciplinares',
                            'Diagnóstico: vacíos en mi plan de área actual',
                            'Conectar el AN con el Proyecto Maker y los ODS',
                        ].map((c, i) => `
                            <label class="flex items-center gap-2.5 cursor-pointer group">
                                <input type="radio" name="ac-consulta" value="${c}" ${i===0?'checked':''} class="accent-purple-500 flex-shrink-0">
                                <span class="text-sm text-slate-300 group-hover:text-white transition">${c}</span>
                            </label>`).join('')}
                    </div>
                    <div class="flex flex-col gap-1 mb-4">
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contexto institucional (opcional)</label>
                        <input type="text" id="ac-ctx-a" placeholder="Rural, Escuela Nueva, calendario B, técnico…"
                            class="bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-500/50 transition"/>
                    </div>
                    <button onclick="acConsultar()" id="ac-btn-as"
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                               text-white font-black rounded-2xl py-3 px-6 flex items-center justify-center gap-2 transition-all text-sm
                               shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                        <i data-lucide="brain" class="w-4 h-4" aria-hidden="true"></i>
                        Consultar asesor curricular
                    </button>
                    <div id="ac-res-as" class="hidden mt-4 bg-white/3 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 leading-relaxed"></div>
                    <div id="ac-actions-as" class="hidden flex flex-wrap gap-2 mt-3">
                        <button onclick="acCopy('ac-res-as')" class="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 px-3 py-1.5 rounded-full transition">
                            <i data-lucide="copy" class="w-3.5 h-3.5" aria-hidden="true"></i>Copiar
                        </button>
                        <button onclick="acProfundizar()" class="flex items-center gap-1.5 text-xs bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-full transition">
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5" aria-hidden="true"></i>Profundizar
                        </button>
                    </div>
                </div>

                <!-- ═══ PANEL EXPLORAR ANs ═══ -->
                <div id="ac-panel-explorar" class="ac-panel hidden">
                    <div class="bg-purple-500/10 border border-purple-500/25 rounded-xl p-3 text-xs text-purple-200 mb-4 flex items-start gap-2">
                        <i data-lucide="info" class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true"></i>
                        Navega por los 128 Aprendizajes Nucleares Santillana para C. Naturales, organizados por grado.
                    </div>
                    <div class="flex gap-3 mb-4">
                        <div class="flex flex-col gap-1 flex-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nivel</label>
                            <select id="ac-nivel-exp" onchange="acFilterExp()" class="bg-white/5 border border-white/15 text-white rounded-xl px-3 py-2 text-sm outline-none">
                                <option value="primaria">Primaria (1°–5°)</option>
                                <option value="secundaria">Secundaria (6°–11°)</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Grado</label>
                            <select id="ac-grado-exp" onchange="acRenderExp()" class="bg-white/5 border border-white/15 text-white rounded-xl px-3 py-2 text-sm outline-none">
                                <option value="1°">1°</option><option value="2°">2°</option><option value="3°">3°</option><option value="4°">4°</option><option value="5°">5°</option>
                            </select>
                        </div>
                    </div>
                    <div id="ac-exp-content"></div>
                </div>

            </div>
        </div>
    </div>`;
}

// ── Estado interno del Asesor ──────────────────────────────────────
const AC = {
    metodo: 'Proyectos (ABP)',
    tiempo: '1 mes (secuencia didáctica)',
    lastPlanTxt: '',
    lastAsTxt: '',
};

const MALLAS_CN_AC = {"1°":{"periodos":[{"nombre":"P1","an":"Los seres vivos","eje":"Las características de los seres vivos","pregunta":"¿Cómo somos los seres vivos?","maker":"Una galería de los seres vivos de mi entorno","ods":"ODS 4"},{"nombre":"P2","an":"Los materiales en mi entorno","eje":"Los materiales de mis Juguetes","pregunta":"¿De qué manera conocer los materiales te ayuda a divertirte?","maker":"Un juguete con materiales de mi entorno","ods":"ODS 12"},{"nombre":"P3","an":"El hábitat","eje":"El hábitat de los seres vivos","pregunta":"¿De qué manera conocer los ambientes nos permite cuidarlos?","maker":"Un medidor de polución","ods":"ODS 15"},{"nombre":"P4","an":"La energía","eje":"¡La energía que me rodea!","pregunta":"¿Es posible hacer arte a partir del movimiento?","maker":"Una flauta elaborada con materiales reciclados","ods":"ODS 4"}]},"2°":{"periodos":[{"nombre":"P1","an":"Los seres vivos","eje":"Ciclo de vida de los organismos","pregunta":"¿Por qué conocer el ciclo de vida contribuye a su cuidado?","maker":"Modelo del ciclo de vida","ods":"ODS 15"},{"nombre":"P2","an":"El hogar de los seres vivos","eje":"Los ambientes de los seres vivos","pregunta":"¿De qué manera conocer las propiedades de los objetos te convierte en un chef maker?","maker":"Herramienta para observar seres vivos","ods":"ODS 2"},{"nombre":"P4","an":"La fuerza y la energía","eje":"La fuerza en el transporte","pregunta":"¿Cómo enseñar a las personas a transitar correctamente?","maker":"Una pista de carros para transitar correctamente","ods":"ODS 11"}]},"3°":{"periodos":[{"nombre":"P1","an":"Las características de los seres vivos","eje":"Los seres vivos son únicos","pregunta":"¿De qué forma los videojuegos nos permiten conocer la biodiversidad?","maker":"Herramienta lúdica para reconocimiento de biodiversidad","ods":"ODS 4"},{"nombre":"P2","an":"La materia","eje":"La materia y sus transformaciones","pregunta":"¿De qué manera el agua del Ártico nos permite comprender las propiedades de la materia?","maker":"Explicar calentamiento global con cambios de estado del agua","ods":"ODS 13"},{"nombre":"P3","an":"Los ecosistemas","eje":"Los componentes de los ecosistemas","pregunta":"¿Por qué es importante conocer los seres vivos que componen nuestros ecosistemas?","maker":"Cultivo que proteja ecosistemas","ods":"ODS 11"},{"nombre":"P4","an":"La energía","eje":"La energía de los medios de transporte","pregunta":"¿Cómo cambiaría tu entorno si los automóviles no utilizaran gasolina?","maker":"Prototipos con energías renovables en transporte","ods":"ODS 11"}]},"4°":{"periodos":[{"nombre":"P1","an":"LA ORGANIZACIÓN DE LA VIDA","eje":"LOS SERES VIVOS","pregunta":"¿Cómo aprovechar el estudio de la organización de los seres vivos para promover el bienestar humano?","maker":"Un prototipo de microscopio con materiales de fácil acceso","ods":"ODS 4"},{"nombre":"P2","an":"LA ORGANIZACIÓN DE LA MATERIA","eje":"TODO LO QUE NOS RODEA ES MATERIA","pregunta":"¿Cómo se agrupan las partículas para formar los distintos estados de la materia?","maker":"Un sistema de filtración de agua","ods":"ODS 6"},{"nombre":"P3","an":"LOS ECOSISTEMAS","eje":"LOS ECOSISTEMAS","pregunta":"¿De qué manera conocer nuestros ecosistemas nos permitirá vivir en ellos de forma sostenible?","maker":"Un banco de semillas a pequeña escala","ods":"ODS 11"},{"nombre":"P4","an":"LA FUERZA","eje":"LA FUERZA Y LA ENERGÍA EN EL ESPACIO","pregunta":"¿De qué manera las fuerzas influyen en nuestras actividades cotidianas?","maker":"Un telescopio casero con materiales reutilizables","ods":"ODS 4"}]},"5°":{"periodos":[{"nombre":"P1","an":"Las funciones celulares","eje":"BIOLOGÍA","pregunta":"¿Cómo los avances tecnológicos nos ayudan a estudiar las células?","maker":"Un espirómetro para conocer el trabajo de mi cuerpo","ods":"ODS 3"},{"nombre":"P2","an":"La naturaleza de la materia","eje":"QUÍMICA","pregunta":"¿Cómo abordar problemas ambientales con métodos de separación de mezclas?","maker":"Construir un filtro de agua casero","ods":"ODS 6"},{"nombre":"P3","an":"La energía en los ecosistemas","eje":"ECOLOGÍA","pregunta":"¿Por qué comprender el flujo de la energía a través de los ecosistemas nos permite trabajar en su conservación?","maker":"Un colector de partículas para evaluar la calidad del aire","ods":"ODS 13"},{"nombre":"P4","an":"La fuerza","eje":"FÍSICA","pregunta":"¿Por qué es importante conocer las fuerzas que actúan sobre un medio de transporte?","maker":"Construir un modelo de transporte con levitación magnética","ods":"ODS 7"}]},"6°":{"periodos":[{"nombre":"P1","an":"AN1-AN5: Estructura y función celular","eje":"BIOLOGÍA I","pregunta":"¿Cómo podemos garantizar espacios inclusivos en la construcción de la infraestructura?","maker":"Planeación inclusiva, maqueta 3D","ods":"ODS 11"},{"nombre":"P2","an":"AN1-AN3: Sistemática, dominios y reinos","eje":"BIOLOGÍA II","pregunta":"¿De qué manera la sistemática puede contribuir a reducir las desigualdades?","maker":"Señalización Braille para espacios inclusivos","ods":"ODS 10"},{"nombre":"P3","an":"AN1-AN4: Factores ecológicos y ecosistemas colombianos","eje":"ECOLOGÍA","pregunta":"¿Cómo podemos ajustar nuestras prácticas cotidianas para reducir la contaminación marina?","maker":"Un modelo de planta potabilizadora","ods":"ODS 14"},{"nombre":"P4","an":"AN1-AN5: Propiedades de la materia, carga eléctrica, mecánica","eje":"FISICOQUÍMICA","pregunta":"¿De qué manera podemos contribuir a la restauración de los ecosistemas en peligro?","maker":"El vivero inteligente","ods":"ODS 15"}]},"7°":{"periodos":[{"nombre":"P1","an":"Generalidades nutrición, unicelulares a hongos, plantas, animales","eje":"Biología I","pregunta":"¿Cómo podemos involucrar a nuestra comunidad en procesos de reutilización de materiales?","maker":"Una construcción que combina soluciones alternativas","ods":"ODS 11"},{"nombre":"P2","an":"Alimentos, digestión, circulación, respiración, excreción humana","eje":"Biología II","pregunta":"¿Cuál es la importancia de fomentar hábitos saludables?","maker":"Un reloj para impulsar mejores hábitos","ods":"ODS 3"},{"nombre":"P3","an":"Relaciones ecológicas, flujos de materia y energía, ciclos biogeoquímicos, sucesión","eje":"Ecología","pregunta":"¿Qué acciones debemos implementar frente al clima para garantizar un futuro sostenible?","maker":"Un juego de reacciones en cadena","ods":"ODS 13"},{"nombre":"P4","an":"El átomo, tabla periódica, energía y sus transformaciones, electricidad, magnetismo","eje":"Fisicoquímica","pregunta":"¿De qué manera podemos participar en la construcción de la paz escolar?","maker":"Un kit de juegos educativos: convivir en paz","ods":"ODS 16"}]},"8°":{"periodos":[{"nombre":"P1","an":"Generalidades de la reproducción, reproducción unicelulares a plantas, en animales, humana, genética mendeliana","eje":"Biología I","pregunta":"¿De qué forma se puede frenar el desperdicio de alimentos aprovechando los procesos de división celular?","maker":"Un banco de alimentos","ods":"ODS 2"},{"nombre":"P2","an":"Funciones de relación, estímulos y respuestas, sistema nervioso, endocrino, homeostasis","eje":"Biología II","pregunta":"¿De qué forma las profesiones del futuro contribuyen con la inclusión y el crecimiento económico?","maker":"Una feria de emprendimientos","ods":"ODS 8"},{"nombre":"P3","an":"Propiedades de las poblaciones, cambios poblacionales, dinámica geológica de Colombia","eje":"Ecología","pregunta":"¿Por qué es importante promover un uso sostenible de los recursos hídricos?","maker":"Un juego para aprender sobre el agua invisible","ods":"ODS 6"},{"nombre":"P4","an":"Enlace químico, reacciones y ecuaciones químicas, fluidos, termodinámica","eje":"Fisicoquímica","pregunta":"¿De qué manera se pueden crear mejores plásticos biodegradables?","maker":"Modelo de dinámica de fluidos para una ciudad de 15 minutos","ods":"ODS 11"}]},"9°":{"periodos":[{"nombre":"P1","an":"Genética mendeliana y no mendeliana","eje":"Biología I","pregunta":"¿De qué manera la desigualdad y las condiciones adversas influyen en la expresión de los genes?","maker":"Un mapa para rastrear la huella de la pobreza","ods":"ODS 1"},{"nombre":"P2","an":"Biología evolutiva: evolución, micro y macroevolución","eje":"Biología II","pregunta":"¿De qué manera los procesos evolutivos influyen en el desarrollo de nuevas tecnologías?","maker":"Un mecanismo para medir transformaciones laborales","ods":"ODS 8"},{"nombre":"P3","an":"Biogeografía histórica y ecológica","eje":"Ecología","pregunta":"¿De qué manera comprender la distribución de las especies ayuda a su conservación?","maker":"Una estructura resiliente capaz de desafiar los desastres naturales","ods":"ODS 9"},{"nombre":"P4","an":"Las soluciones, equilibrio iónico, cinemática, ondas, sonido, gases","eje":"Fisicoquímica","pregunta":"¿De qué manera tecnologías como la realidad aumentada fortalecen el aprendizaje en química?","maker":"Una maqueta del colegio ideal","ods":"ODS 4"}]},"10°":{"periodos":[{"nombre":"P1","an":"Técnicas biotecnológicas y aplicaciones","eje":"BIOLOGÍA","pregunta":"¿De qué manera puede la biotecnología disminuir la desigualdad?","maker":"Proyecto de investigación y documental sobre impacto de la desigualdad","ods":"ODS 10"},{"nombre":"P2","an":"Introducción a la química inorgánica, funciones y reacciones químicas","eje":"QUÍMICA","pregunta":"¿Cuál ha sido el impacto del trabajo conjunto de hombres y mujeres en el desarrollo de la química?","maker":"Programa radial sobre igualdad en el trabajo","ods":"ODS 5"},{"nombre":"P3","an":"Vectores, marcos de referencia, leyes de Newton","eje":"FÍSICA I","pregunta":"¿Cuáles son los retos que supone el uso de energías renovables?","maker":"Periódico sobre eficiencia energética","ods":"ODS 7"},{"nombre":"P4","an":"Trabajo, potencia, energía, conservación de la energía, mecánica de fluidos, termodinámica","eje":"FÍSICA II","pregunta":"¿Cómo cooperar entre todos para mejorar la eficiencia energética?","maker":"Texto gráfico sobre alianzas tecnológicas","ods":"ODS 17"}]},"11°":{"periodos":[{"nombre":"P1","an":"Calentamiento global, problemáticas en ecosistemas terrestres y acuáticos","eje":"BIOLOGÍA","pregunta":"¿De qué manera la justicia ambiental permite afrontar el cambio climático?","maker":"Cortometraje para reflexionar sobre la paz nacional y global","ods":"ODS 13"},{"nombre":"P2","an":"Generalidades de la química orgánica, funciones químicas orgánicas, bioquímica y salud","eje":"Química","pregunta":"¿De qué manera el estudio de la química orgánica contribuye a reducir desigualdades en salud?","maker":"Podcast de voces vulnerables y galería sobre la desigualdad","ods":"ODS 3"},{"nombre":"P3","an":"Fenómenos oscilatorios, ondas, acústica, óptica","eje":"Física 1","pregunta":"¿De qué manera la física nos permite comprender la mejor forma de aproximarnos al equilibrio?","maker":"Revista digital de sostenibilidad turística y charla TED","ods":"ODS 16"},{"nombre":"P4","an":"Electrostática, cargas eléctricas, magnetismo, física moderna","eje":"Física II","pregunta":"¿Por qué los principios de la electrostática nos permiten innovar para proyectos sustentables?","maker":"Manual sobre proyectos innovadores sostenibles","ods":"ODS 9"}]}};

const AN_EXP_AC = {
    primaria: {
        "1°": [{m:"Módulo 1 - Las características de los seres vivos",maker:"Galería de seres vivos",ods:"ODS 4"},{m:"Módulo 2 - Los materiales de mis juguetes",maker:"Juguete con materiales del entorno",ods:"ODS 12"},{m:"Módulo 3 - El hábitat de los seres vivos",maker:"Medidor de polución",ods:"ODS 15"},{m:"Módulo 4 - ¡La energía que me rodea!",maker:"Flauta con materiales reciclados",ods:"ODS 4"}],
        "2°": [{m:"Módulo 1 - Los seres vivos",maker:"Modelo ciclo de vida",ods:"ODS 15"},{m:"Módulo 2 - Los materiales en la cocina",maker:"Chef maker con propiedades",ods:"ODS 2"},{m:"Módulo 3 - El hogar de los seres vivos",maker:"Herramienta para observar seres vivos",ods:"ODS 15"},{m:"Módulo 4 - La fuerza y la energía",maker:"Pista de carros",ods:"ODS 11"}],
        "3°": [{m:"Módulo 1 - Los seres vivos son únicos",maker:"Herramienta lúdica biodiversidad",ods:"ODS 4"},{m:"Módulo 2 - La materia y sus transformaciones",maker:"Explicar calentamiento global",ods:"ODS 13"},{m:"Módulo 3 - Los componentes de los ecosistemas",maker:"Cultivo sostenible",ods:"ODS 11"},{m:"Módulo 4 - La energía en el transporte",maker:"Prototipos energías renovables",ods:"ODS 11"}],
        "4°": [{m:"Módulo 1 - Los seres vivos",maker:"Microscopio casero",ods:"ODS 4"},{m:"Módulo 2 - Todo lo que nos rodea es materia",maker:"Sistema de filtración de agua",ods:"ODS 6"},{m:"Módulo 3 - Los ecosistemas",maker:"Banco de semillas",ods:"ODS 11"},{m:"Módulo 4 - La fuerza en el espacio",maker:"Telescopio casero",ods:"ODS 4"}],
        "5°": [{m:"Módulo 1 - Las funciones de los seres vivos",maker:"Espirómetro",ods:"ODS 3"},{m:"Módulo 2 - La materia en nuestras vidas",maker:"Filtro de agua casero",ods:"ODS 6"},{m:"Módulo 3 - El equilibrio en los ecosistemas",maker:"Colector de partículas",ods:"ODS 13"},{m:"Módulo 4 - Fuerza, electricidad y magnetismo",maker:"Levitación magnética en transporte",ods:"ODS 7"}],
    },
    secundaria: {
        "6°": [{ap:"Biología I",ans:["AN1. La célula como unidad anatómica","AN2. La célula como unidad fisiológica","AN3. La célula como unidad de origen","AN4. Niveles de organización celular","AN5. El universo, la Tierra y la vida"]},{ap:"Biología II",ans:["AN1. La sistemática","AN2. El sistema de dominios","AN3. El sistema de reinos"]},{ap:"Ecosistemas",ans:["AN1. Los factores ecológicos","AN2. Los ecosistemas acuáticos","AN3. Los ecosistemas terrestres","AN4. Los ecosistemas colombianos","AN5. La composición y dinámica de la Tierra"]},{ap:"Fisicoquímica",ans:["AN1. Propiedades de la materia","AN2. Estados de agregación","AN3. Clasificación de la materia","AN4. La carga eléctrica","AN5. La mecánica"]}],
        "7°": [{ap:"Biología I: Función de nutrición",ans:["AN1. Generalidades de la nutrición","AN2. La nutrición de unicelulares a hongos","AN3. La nutrición en plantas","AN4. La nutrición en animales"]},{ap:"Biología II: Nutrición humana",ans:["AN1. Los alimentos y los nutrientes","AN2. La ingestión, digestión y absorción","AN3. La circulación humana","AN4. La respiración humana y el metabolismo","AN5. La excreción humana"]},{ap:"Ecosistemas",ans:["AN1. Las relaciones ecológicas","AN2. Los flujos de materia y energía","AN3. Los ciclos biogeoquímicos","AN4. Sucesión ecológica y acciones antrópicas","AN5. La biodiversidad","AN6. La dinámica del sistema solar"]},{ap:"Fisicoquímica",ans:["AN1. El átomo","AN2. La tabla periódica y los enlaces","AN3. La energía y sus transformaciones","AN4. La electricidad","AN5. El magnetismo"]}],
        "8°": [{ap:"Biología I: Reproducción",ans:["AN1. Generalidades de la reproducción","AN2. Reproducción de unicelulares a plantas","AN3. Reproducción en animales","AN4. Reproducción humana","AN5. Genética mendeliana y no mendeliana"]},{ap:"Biología II: Funciones de relación",ans:["AN1-AN10: Estímulos, respuestas, sistema nervioso, endocrino, inmune, locomotor, homeostasis, osmorregulación"]},{ap:"Ecosistemas",ans:["AN1. Propiedades de las poblaciones","AN2. Las poblaciones cambian con el tiempo","AN3. La dinámica geológica de Colombia"]},{ap:"Fisicoquímica",ans:["AN1. El enlace químico","AN2. Reacciones y ecuaciones químicas","AN3. Los fluidos","AN4. La termodinámica"]}],
        "9°": [{ap:"Biología I: Genética y biología molecular",ans:["AN1. La genética mendeliana y no mendeliana","AN2. De los genes a las proteínas","AN3. La ingeniería genética"]},{ap:"Biología II: Biología evolutiva y sistemática",ans:["AN1. La biología evolutiva","AN2. La micro y macroevolución","AN3. El origen y la evolución de los seres vivos","AN4. La sistemática"]},{ap:"Ecosistemas: Biogeografía",ans:["AN1. La biogeografía histórica","AN2. La biogeografía ecológica","AN3. El universo y la Tierra"]},{ap:"Fisicoquímica",ans:["AN1. Las soluciones","AN2. Equilibrio en soluciones iónicas","AN3. La cinemática","AN4. Las ondas","AN5. El sonido","AN6. Los gases"]}],
        "10°": [{ap:"Biotecnología",ans:["AN1. Técnicas biotecnológicas","AN2. Aplicaciones de la biotecnología","AN3. La fertilización asistida"]},{ap:"Química inorgánica",ans:["AN1-AN8: Modelos atómicos, tabla periódica, funciones inorgánicas, reacciones Redox, estequiometría, estados de agregación, soluciones, cinética"]},{ap:"Física I: La mecánica I",ans:["AN1. Vectores y marcos de referencia","AN2. Las leyes de Newton","AN3. El movimiento"]},{ap:"Física II: La mecánica II",ans:["AN1. Trabajo, potencia y energía","AN2. Conservación de la energía","AN3. Mecánica de fluidos","AN4. La termodinámica"]}],
        "11°": [{ap:"Biología I: Problemáticas ambientales",ans:["AN1. El calentamiento global","AN2. Problemáticas en ecosistemas terrestres","AN3. Problemáticas en ecosistemas acuáticos"]},{ap:"Química orgánica",ans:["AN1. Generalidades de la química orgánica","AN2. Las funciones químicas orgánicas","AN3. Reacciones químicas orgánicas","AN4. La bioquímica y la salud"]},{ap:"Física I: Ondas, acústica y óptica",ans:["AN1. Fenómenos oscilatorios y las ondas","AN2. La acústica","AN3. La óptica"]},{ap:"Física II: Electricidad y magnetismo",ans:["AN1. La electricidad","AN2. El magnetismo","AN3. La física moderna"]}],
    }
};

function setupAsesorEvents() {
    // Cerrar al hacer clic fuera del panel
    document.getElementById('asesor-modal').addEventListener('click', function(e) {
        if (e.target === this) cerrarAsesor();
    });
    // Explorar ANs inicial
    acRenderExp();
}

window.acTab = function(tab) {
    document.querySelectorAll('.ac-tab').forEach(t => {
        t.classList.remove('bg-pink-500/25', 'text-pink-300', 'border-pink-500/40',
                           'bg-purple-500/25', 'text-purple-300', 'border-purple-500/40',
                           'bg-indigo-500/25', 'text-indigo-300', 'border-indigo-500/40');
        t.classList.add('text-slate-400', 'border-white/10');
    });
    document.querySelectorAll('.ac-panel').forEach(p => p.classList.add('hidden'));
    const t = document.getElementById('ac-tab-' + tab);
    const p = document.getElementById('ac-panel-' + tab);
    const colors = { plan: ['bg-pink-500/25','text-pink-300','border-pink-500/40'], asesor: ['bg-purple-500/25','text-purple-300','border-purple-500/40'], explorar: ['bg-indigo-500/25','text-indigo-300','border-indigo-500/40'] };
    if (t) { t.classList.remove('text-slate-400','border-white/10'); t.classList.add(...colors[tab]); }
    if (p) p.classList.remove('hidden');
    if (tab === 'explorar') acRenderExp();
    lucide.createIcons();
};

window.acSelMeto = function(el, m) {
    AC.metodo = m;
    document.querySelectorAll('.ac-meto-btn').forEach(b => {
        b.classList.remove('ring-2','ring-pink-500/60','bg-pink-500/20','border-pink-500/30','text-white');
        b.classList.add('bg-white/5','border-white/10','text-slate-300');
        b.querySelector('i')?.classList.remove('text-pink-400');
        b.querySelector('i')?.classList.add('text-slate-400');
    });
    el.classList.remove('bg-white/5','border-white/10','text-slate-300');
    el.classList.add('ring-2','ring-pink-500/60','bg-pink-500/20','border-pink-500/30','text-white');
    el.querySelector('i')?.classList.remove('text-slate-400');
    el.querySelector('i')?.classList.add('text-pink-400');
};

window.acSelTiempo = function(el, t) {
    AC.tiempo = t;
    document.querySelectorAll('.ac-tiempo-btn').forEach(b => {
        b.classList.remove('ring-2','ring-amber-500/60','bg-amber-500/15','border-amber-500/40');
        b.classList.add('bg-white/5','border-white/10');
        b.querySelector('i')?.classList.remove('text-amber-400');
        b.querySelector('i')?.classList.add('text-slate-400');
    });
    el.classList.remove('bg-white/5','border-white/10');
    el.classList.add('ring-2','ring-amber-500/60','bg-amber-500/15','border-amber-500/40');
    el.querySelector('i')?.classList.remove('text-slate-400');
    el.querySelector('i')?.classList.add('text-amber-400');
};

window.acAreaChange = function() { acGradoChange(); };

window.acGradoChange = function() {
    const area = document.getElementById('ac-area')?.value;
    const grado = document.getElementById('ac-grado')?.value;
    const periodo = document.getElementById('ac-periodo')?.value;
    const prev = document.getElementById('ac-malla-prev');
    if (!prev) return;
    if (area === 'Ciencias Naturales' && grado) {
        const gd = MALLAS_CN_AC[grado];
        if (gd) {
            const pi = periodo ? parseInt(periodo) - 1 : 0;
            const p = gd.periodos[Math.min(pi, gd.periodos.length - 1)];
            prev.innerHTML = `<strong class="text-pink-300">✓ Malla cargada — ${grado}</strong><br>AN: ${p.an} · Maker: ${p.maker}<br><em>${p.pregunta}</em>`;
            prev.classList.remove('hidden');
        }
    } else {
        prev.classList.add('hidden');
    }
};

function acGetMallaCtx(area, grado, periodo) {
    if (area === 'Ciencias Naturales' && MALLAS_CN_AC[grado]) {
        const gd = MALLAS_CN_AC[grado];
        const pi = periodo ? parseInt(periodo) - 1 : 0;
        const p = gd.periodos[Math.min(pi, gd.periodos.length - 1)];
        const todos = gd.periodos.map((pp, i) => `P${i+1}: AN="${pp.an}" | Eje="${pp.eje}" | Maker="${pp.maker}" | ODS=${pp.ods}`).join('\n');
        return `MALLA CURRICULAR — ${area} — ${grado}\nPeriodos:\n${todos}\n\nPERIODO SELECCIONADO: ${p.nombre}\n- AN: ${p.an}\n- Eje: ${p.eje}\n- Pregunta orientadora: ${p.pregunta}\n- Proyecto Maker: ${p.maker}\n- ODS: ${p.ods}`;
    }
    return '';
}

function acRenderMd(txt) {
    return txt
        .replace(/^###\s(.+)$/gm, '<h4 style="color:#f9a8d4;font-weight:700;margin:.7rem 0 .3rem;">$1</h4>')
        .replace(/^##\s(.+)$/gm, '<h3 style="color:#f472b6;font-weight:800;margin:.8rem 0 .35rem;font-size:1rem;">$1</h3>')
        .replace(/^#\s(.+)$/gm, '<h3 style="color:#f472b6;font-weight:800;margin:.8rem 0 .35rem;font-size:1.1rem;">$1</h3>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^[-•]\s(.+)$/gm, '<li style="margin-bottom:.25rem;padding-left:.25rem;">$1</li>')
        .replace(/(<li[\s\S]*?<\/li>)/g, '<ul style="padding-left:1.2rem;margin:.4rem 0;">$1</ul>')
        .replace(/\n\n+/g, '</p><p style="margin-bottom:.5rem;">')
        .replace(/\n/g, '<br>');
}

function acSetLoading(btnId, resId, actionsId, msg) {
    const btn = document.getElementById(btnId);
    const res = document.getElementById(resId);
    const act = document.getElementById(actionsId);
    if (btn) { btn.disabled = true; btn.innerHTML = `<svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="30 70"/></svg> ${msg}`; }
    if (res) { res.classList.remove('hidden'); res.innerHTML = `<div style="display:flex;align-items:center;gap:8px;color:#94a3b8;font-size:.8rem;"><svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="30 70"/></svg>${msg}</div>`; }
    if (act) act.classList.add('hidden');
}

function acSetResult(btnId, resId, actionsId, html, btnLabel) {
    const btn = document.getElementById(btnId);
    const res = document.getElementById(resId);
    const act = document.getElementById(actionsId);
    if (btn) { btn.disabled = false; btn.innerHTML = btnLabel; }
    if (res) { res.classList.remove('hidden'); res.innerHTML = `<p style="margin-bottom:.5rem;">${html}</p>`; }
    if (act) act.classList.remove('hidden');
    lucide.createIcons();
}

window.acGenerar = async function() {
    const area = document.getElementById('ac-area')?.value;
    const grado = document.getElementById('ac-grado')?.value;
    const tema = document.getElementById('ac-tema')?.value;
    const periodo = document.getElementById('ac-periodo')?.value;
    const nest = document.getElementById('ac-nest')?.value;
    const ctx = document.getElementById('ac-ctx')?.value;
    const mins = document.getElementById('ac-mins')?.value;
    if (!area || !grado || !tema) { alert('Completa: Área, Grado y Tema'); return; }
    acSetLoading('ac-btn-gen', 'ac-res-plan', 'ac-actions-plan', 'Generando plan con IA…');
    const mc = acGetMallaCtx(area, grado, periodo);
    const prompt = `Eres un pedagogo experto en educación colombiana. Genera un plan pedagógico COMPLETO, ESPECÍFICO y PRÁCTICO.

DATOS: Área: ${area} | Grado: ${grado} | Periodo: ${periodo||'No especificado'} | Tema: ${tema}
Estudiantes: ${nest||'No especificado'} | Sesión: ${mins} min | Alcance: ${AC.tiempo} | Metodología: ${AC.metodo}
Contexto: ${ctx||'Institución general'}

${mc ? `BASE CURRICULAR (PRIORIDAD MÁXIMA):\n${mc}` : `Usa los lineamientos generales del MEN Colombia para ${area} en ${grado}.`}

GENERA el plan COMPLETO con:
1. **Objetivo de aprendizaje** (verbo Bloom, alineado al AN)
2. **Competencias MEN y DBA** relevantes
3. **AN Santillana del periodo**: menciona explícitamente el AN y su conexión con el tema
4. **Estructura según "${AC.tiempo}"** (inicio/desarrollo/cierre con tiempos si es 1 clase; sesiones si es semana/mes; unidades si bimestre/año)
5. **Actividades específicas** de ${AC.metodo} con pasos concretos y consignas textuales
6. **Conexión con Proyecto Maker** del periodo si existe
7. **Evaluación**: criterios por nivel (bajo/básico/alto/superior)
Sé MUY específico. Evita generalidades.`;
    try {
        const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }) });
        const d = await r.json();
        const txt = d.content?.map(b => b.text || '').join('') || 'Error al generar';
        AC.lastPlanTxt = txt;
        acSetResult('ac-btn-gen', 'ac-res-plan', 'ac-actions-plan', acRenderMd(txt),
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> Regenerar plan');
    } catch(e) { acSetResult('ac-btn-gen', 'ac-res-plan', 'ac-actions-plan', '<span style="color:#f87171;">Error de conexión. Inténtalo de nuevo.</span>', 'Reintentar'); }
};

window.acConsultar = async function() {
    const area = document.getElementById('ac-area-a')?.value;
    const grado = document.getElementById('ac-grado-a')?.value;
    const ctx = document.getElementById('ac-ctx-a')?.value;
    const consulta = document.querySelector('input[name="ac-consulta"]:checked')?.value || 'Organizar la secuencia de contenidos del periodo';
    if (!area || !grado) { alert('Selecciona Área y Grado'); return; }
    acSetLoading('ac-btn-as', 'ac-res-as', 'ac-actions-as', 'Consultando asesor…');
    const mc = acGetMallaCtx(area, grado, '');
    const prompt = `Eres un asesor curricular experto en educación colombiana, estándares del MEN, DBA y mallas Santillana Compartir.

DATOS: Área: ${area} | Grado: ${grado} | Consulta: ${consulta} | Contexto: ${ctx||'Institución general'}

${mc ? `MALLA CURRICULAR (base prioritaria):\n${mc}` : `Usa los lineamientos generales del MEN Colombia.`}

Proporciona asesoría DETALLADA con:
1. Respuesta directa con elementos concretos de la malla
2. Referencia a estándares MEN y DBA para ${area} en ${grado}
3. Los ANs Santillana del grado y cómo organizarlos pedagógicamente
4. Recomendaciones pedagógicas específicas y aplicables
5. Conexión con el Proyecto Maker y ODS si aplica
6. Al menos 3 acciones inmediatas concretas para el docente`;
    try {
        const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }) });
        const d = await r.json();
        const txt = d.content?.map(b => b.text || '').join('') || 'Error';
        AC.lastAsTxt = txt;
        acSetResult('ac-btn-as', 'ac-res-as', 'ac-actions-as', acRenderMd(txt),
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> Volver a consultar');
    } catch(e) { acSetResult('ac-btn-as', 'ac-res-as', 'ac-actions-as', '<span style="color:#f87171;">Error de conexión. Inténtalo de nuevo.</span>', 'Reintentar'); }
};

window.acAmpliar = async function() {
    if (!AC.lastPlanTxt) return;
    acSetLoading('ac-btn-gen', 'ac-res-plan', 'ac-actions-plan', 'Ampliando plan…');
    try {
        const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: `Amplía y detalla más el siguiente plan pedagógico. Añade actividades concretas, materiales específicos, tiempos exactos y ejemplos de consignas para los estudiantes:\n\n${AC.lastPlanTxt}` }] }) });
        const d = await r.json();
        const txt = d.content?.map(b => b.text || '').join('') || 'Error';
        AC.lastPlanTxt = txt;
        acSetResult('ac-btn-gen', 'ac-res-plan', 'ac-actions-plan', acRenderMd(txt), '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> Regenerar plan');
    } catch(e) {}
};

window.acRubrica = async function() {
    if (!AC.lastPlanTxt) return;
    acSetLoading('ac-btn-gen', 'ac-res-plan', 'ac-actions-plan', 'Creando rúbrica…');
    try {
        const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: `Crea una rúbrica de evaluación completa con criterios e indicadores de desempeño en 4 niveles (bajo, básico, alto, superior) para el siguiente plan pedagógico:\n\n${AC.lastPlanTxt}` }] }) });
        const d = await r.json();
        const txt = d.content?.map(b => b.text || '').join('') || 'Error';
        acSetResult('ac-btn-gen', 'ac-res-plan', 'ac-actions-plan', acRenderMd(txt), '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> Regenerar plan');
    } catch(e) {}
};

window.acMaker = async function() {
    const grado = document.getElementById('ac-grado')?.value;
    const periodo = document.getElementById('ac-periodo')?.value;
    let makerCtx = '';
    if (grado && MALLAS_CN_AC[grado]) {
        const pi = periodo ? parseInt(periodo) - 1 : 0;
        const p = MALLAS_CN_AC[grado].periodos[Math.min(pi, MALLAS_CN_AC[grado].periodos.length - 1)];
        makerCtx = `Proyecto Maker del periodo: "${p.maker}" | ODS: ${p.ods}`;
    }
    acSetLoading('ac-btn-gen', 'ac-res-plan', 'ac-actions-plan', 'Diseñando Proyecto Maker…');
    try {
        const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: `Desarrolla el Proyecto Maker con instrucciones paso a paso, materiales accesibles, criterios de evaluación y conexión con el ODS. ${makerCtx}\n\nPlan de referencia:\n${AC.lastPlanTxt || 'Sin plan previo, diseña un proyecto maker general para el grado indicado.'}` }] }) });
        const d = await r.json();
        const txt = d.content?.map(b => b.text || '').join('') || 'Error';
        acSetResult('ac-btn-gen', 'ac-res-plan', 'ac-actions-plan', acRenderMd(txt), '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> Regenerar plan');
    } catch(e) {}
};

window.acProfundizar = async function() {
    if (!AC.lastAsTxt) return;
    acSetLoading('ac-btn-as', 'ac-res-as', 'ac-actions-as', 'Profundizando…');
    try {
        const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: `Profundiza en la siguiente asesoría curricular con ejemplos concretos de actividades, evaluaciones y conexiones interdisciplinares:\n\n${AC.lastAsTxt}` }] }) });
        const d = await r.json();
        const txt = d.content?.map(b => b.text || '').join('') || 'Error';
        AC.lastAsTxt = txt;
        acSetResult('ac-btn-as', 'ac-res-as', 'ac-actions-as', acRenderMd(txt), '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> Volver a consultar');
    } catch(e) {}
};

window.acCopy = function(id) {
    const el = document.getElementById(id);
    if (el) navigator.clipboard.writeText(el.innerText).then(() => alert('Copiado al portapapeles ✓'));
};

window.acFilterExp = function() {
    const nivel = document.getElementById('ac-nivel-exp')?.value;
    const sel = document.getElementById('ac-grado-exp');
    if (!sel) return;
    sel.innerHTML = '';
    const grados = nivel === 'primaria' ? ['1°','2°','3°','4°','5°'] : ['6°','7°','8°','9°','10°','11°'];
    grados.forEach(g => sel.innerHTML += `<option>${g}</option>`);
    acRenderExp();
};

window.acRenderExp = function() {
    const nivel = document.getElementById('ac-nivel-exp')?.value || 'primaria';
    const grado = document.getElementById('ac-grado-exp')?.value || '1°';
    const cont = document.getElementById('ac-exp-content');
    if (!cont) return;
    if (nivel === 'primaria') {
        const data = AN_EXP_AC.primaria[grado] || [];
        cont.innerHTML = data.map((m, i) => `
            <div style="border:.5px solid rgba(255,255,255,.1);border-radius:1rem;padding:.75rem;margin-bottom:.5rem;background:rgba(255,255,255,.03)">
                <div style="font-size:.75rem;font-weight:700;color:#f9a8d4;margin-bottom:.375rem;">📚 ${m.m}</div>
                <div style="font-size:.7rem;color:#94a3b8;"><strong style="color:#e2e8f0;">Maker:</strong> ${m.maker}</div>
                <div style="font-size:.7rem;color:#94a3b8;margin-top:.2rem;"><strong style="color:#e2e8f0;">ODS:</strong> ${m.ods}</div>
            </div>`).join('');
    } else {
        const data = AN_EXP_AC.secundaria[grado] || [];
        cont.innerHTML = data.map(ap => `
            <div style="border:.5px solid rgba(255,255,255,.1);border-radius:1rem;padding:.75rem;margin-bottom:.5rem;background:rgba(255,255,255,.03)">
                <div style="font-size:.75rem;font-weight:700;color:#f9a8d4;margin-bottom:.5rem;">📚 ${ap.ap}</div>
                <div style="display:flex;flex-wrap:wrap;gap:.375rem;">${ap.ans.map(a => `<span style="background:rgba(255,255,255,.06);border:.5px solid rgba(255,255,255,.12);color:#cbd5e1;padding:.15rem .55rem;border-radius:20px;font-size:.65rem;">${a}</span>`).join('')}</div>
            </div>`).join('');
    }
};
