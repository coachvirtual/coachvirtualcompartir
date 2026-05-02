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
