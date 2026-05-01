document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initSearch();
    initSectionSearch();
});

/* ============================================================
   BASES DE DATOS CENTRALIZADA
   ============================================================ */

const videosGenerales = [
    { id: 'Bv_FinX79vk', title: 'Primeros pasos Docentes', desc: 'Introducción a Compartir Conocimientos', rol: 'Docente', tags: ['inicio', 'basico', 'plataforma'] },
    { id: 'X6akIQPrJWw', title: 'Asignar contenidos', desc: 'Gestión de material en Compartir Conocimientos', rol: 'Docente', tags: ['asignar', 'material', 'gestion'] },
    { id: 'KXROB84Q3IU', title: 'Actividades y Tareas', desc: 'Asignación de tareas para docentes', rol: 'Docente', tags: ['tareas', 'actividades', 'enviar'] },
    { id: 'sGX_D17T4h8', title: 'Crea tus propios materiales', desc: 'Sube y gestiona tu propio contenido', rol: 'Docente', tags: ['subir', 'propio', 'archivos'] },
    { id: 'SO60tHz47kU', title: 'Panel de comunicación', desc: 'Mensajería y foros de la plataforma', rol: 'Docente', tags: ['foro', 'mensajes', 'comunicacion'] },
    { id: 'Twrx9mrQ6EQ', title: 'Solucionario y Teacher Planner', desc: 'Herramientas de planificación docente', rol: 'Docente', tags: ['planificacion', 'soluciones', 'respuestas'] },
    { id: '9oKz6MQgDsk', title: 'Primeros pasos Estudiantes', desc: 'Guía básica de inicio para alumnos y padres de familia', rol: 'Estudiante', tags: ['inicio', 'alumno', 'basico', 'padre', 'familia'] },
    { id: 'XugiPvcc20g', title: 'Responder Tareas', desc: 'Cómo enviar respuestas (Estudiantes)', rol: 'Estudiante', tags: ['tareas', 'responder', 'entregar'] },
    { id: 'RjS2b5h-UqY', title: 'Biblioteca Estudiantes', desc: 'Acceso a recursos y biblioteca', rol: 'Estudiante', tags: ['recursos', 'biblioteca', 'libros'] },
    { id: 'l0MHO5QO1eQ', title: 'Libro Web', desc: 'Uso del Libro Web para estudiar', rol: 'Ambos', tags: ['libro', 'estudiar', 'digital'] } 
];

const videosActividades = [
    { id: 'xMUUcHz1RMY', title: 'Crear Quiz general', desc: 'Configuración inicial de quizzes', rol: 'Docente', tags: ['quiz', 'evaluacion', 'examen'] },
    { id: '-W6vnpkmDEo', title: 'Completar imagen (Arrastrar)', desc: 'Arrastrar y soltar en imágenes', rol: 'Docente', tags: ['arrastrar', 'imagen', 'juego'] },
    { id: '9suY8fBcTpo', title: 'Completar imagen (Desplegable)', desc: 'Menú desplegable en imágenes', rol: 'Docente', tags: ['desplegable', 'imagen', 'opciones'] },
    { id: 'SSLxS0EffXQ', title: 'Completar huecos (Arrastrar)', desc: 'Arrastrar y soltar en textos', rol: 'Docente', tags: ['arrastrar', 'texto', 'huecos'] },
    { id: 'sAi3lAmCI5Y', title: 'Completar huecos (Desplegable)', desc: 'Menú desplegable en textos', rol: 'Docente', tags: ['desplegable', 'texto', 'huecos'] },
    { id: 'YgALIhJ-PGg', title: 'Clasificar', desc: 'Actividad de agrupación y clasificación', rol: 'Docente', tags: ['clasificar', 'grupos', 'categorias'] },
    { id: 'f36XjOs9Kdw', title: 'Completar huecos con texto', desc: 'Escribir la respuesta correcta', rol: 'Docente', tags: ['escribir', 'huecos', 'texto'] },
    { id: 'Wlndj6N3zL0', title: 'Completar imagen con texto', desc: 'Escribir sobre zonas de imagen', rol: 'Docente', tags: ['escribir', 'imagen', 'zonas'] },
    { id: 'uXAZTjqGqCA', title: 'Respuesta abierta simple', desc: 'Preguntas de desarrollo corto', rol: 'Docente', tags: ['abierta', 'desarrollo', 'escribir'] },
    { id: 'wyQ8XDKUJRg', title: 'Evaluación manual: Enunciado', desc: 'Configurar rúbricas y enunciados', rol: 'Docente', tags: ['manual', 'rubrica', 'enunciado'] },
    { id: 'pk3g6khFJlc', title: 'Evaluación manual: Grabar audio', desc: 'Respuestas por nota de voz', rol: 'Docente', tags: ['audio', 'grabar', 'voz'] },
    { id: 'IDmx4SQrTp8', title: 'Evaluación manual: Pintar', desc: 'Actividades de dibujo y trazo', rol: 'Docente', tags: ['pintar', 'dibujo', 'trazar'] },
    { id: 't8ZGxHuU5kg', title: 'Evaluación manual: Abierta compleja', desc: 'Desarrollo extenso con formato', rol: 'Docente', tags: ['ensayo', 'compleja', 'desarrollo'] },
    { id: 'yUfpyWQb3zI', title: 'Evaluación manual: Subir archivo', desc: 'Recepción de entregables adjuntos', rol: 'Docente', tags: ['subir', 'archivo', 'adjunto'] },
    { id: 'XTkETvJ-s_c', title: 'Fórmulas matemáticas', desc: 'Completar huecos con ecuaciones', rol: 'Docente', tags: ['matematicas', 'formulas', 'ecuaciones'] },
    { id: 'M7Y1wYkXkiI', title: 'Crucigrama', desc: 'Generador de crucigramas interactivos', rol: 'Docente', tags: ['juego', 'crucigrama', 'palabras'] },
    { id: 'G66EITN5HTM', title: 'Emparejar', desc: 'Relacionar columnas o conceptos', rol: 'Docente', tags: ['unir', 'emparejar', 'relacionar'] },
    { id: 'TMUK3uUYffQ', title: 'Ordenar', desc: 'Secuencias cronológicas o lógicas', rol: 'Docente', tags: ['ordenar', 'secuencia', 'logica'] },
    { id: '0XXPdLzoRUc', title: 'Seleccionar para descubrir', desc: 'Actividades de exploración', rol: 'Docente', tags: ['descubrir', 'explorar', 'seleccionar'] },
    { id: 'D-lSaspWGzQ', title: 'Unir', desc: 'Trazar líneas entre conceptos', rol: 'Docente', tags: ['unir', 'lineas', 'trazar'] },
    { id: 'n8pDFxb8O78', title: 'Sopa de letras', desc: 'Generador de sopa de letras', rol: 'Docente', tags: ['juego', 'sopa', 'letras'] },
    { id: 'zw4SWniGdbQ', title: 'Tipo test: Lista de selección', desc: 'Opciones múltiples en lista', rol: 'Docente', tags: ['test', 'lista', 'opciones'] },
    { id: '_L2wa7F_eyM', title: 'Tipo test: Respuesta única', desc: 'Solo una opción es correcta', rol: 'Docente', tags: ['test', 'unica', 'opcion'] },
    { id: 'jkFJbiJVx_c', title: 'Tipo test: Selección múltiple numerada', desc: 'Múltiples correctas con números', rol: 'Docente', tags: ['test', 'multiple', 'numeros'] },
    { id: '3udWZoZfNfs', title: 'Tipo test: Selección múltiple', desc: 'Varias opciones correctas', rol: 'Docente', tags: ['test', 'multiple', 'varias'] },
    { id: 'OvXxkT4dak4', title: 'Tipo test: Tabla de selección', desc: 'Matrices de opciones', rol: 'Docente', tags: ['test', 'tabla', 'matriz'] },
    { id: 'uoSCotTJcj0', title: 'Tipo test: Verdadero y falso', desc: 'Validación dicotómica', rol: 'Docente', tags: ['test', 'verdadero', 'falso'] }
];

const videosProgreso = [
    { id: 'Och9Do2176Q', title: 'Acceder a Pleno', desc: 'Ingreso a la plataforma de evaluación', rol: 'Docente', tags: ['pleno', 'ingreso', 'acceso'] },
    { id: 'iJMU2Iyu8ng', title: 'Planificar una evaluación', desc: 'Configurar fechas y parámetros', rol: 'Docente', tags: ['pleno', 'planificar', 'fechas'] },
    { id: 'OemyOCXD8U8', title: 'Habilitar o reiniciar', desc: 'Reasignar evaluaciones a estudiantes', rol: 'Docente', tags: ['pleno', 'reiniciar', 'habilitar'] },
    { id: 'DdPnWYVu1y4', title: 'Crear evaluación (Banco Santillana)', desc: 'Usar ítems predeterminados', rol: 'Docente', tags: ['pleno', 'banco', 'crear'] },
    { id: 'WpDFMfZdm5g', title: 'Preguntas aleatorias', desc: 'Configurar orden aleatorio en pruebas', rol: 'Docente', tags: ['pleno', 'aleatorio', 'preguntas'] },
    { id: 'aLm91Avo63Y', title: 'Crear evaluación (Ítems propios)', desc: 'Diseñar preguntas desde cero', rol: 'Docente', tags: ['pleno', 'propias', 'items'] },
    { id: '7kp_-ZL7Amw', title: 'Crear rúbricas', desc: 'Rúbricas para preguntas abiertas', rol: 'Docente', tags: ['pleno', 'rubricas', 'criterios'] },
    { id: 'iTIFZeCEO_o', title: 'Calificar preguntas abiertas', desc: 'Revisión y puntuación manual', rol: 'Docente', tags: ['pleno', 'calificar', 'manual'] },
    { id: '_oDKSoJItHo', title: 'Responder evaluaciones', desc: 'Cómo presentar pruebas en Pleno', rol: 'Estudiante', tags: ['pleno', 'responder', 'examen'] }
];

// ✅ NUEVA: Videos de Inglés / Richmond Studio
const videosIngles = [
    { id: 'P9ohgrwD_zs', title: 'Ingresar a Richmond Studio via Santillana Connect', desc: 'Acceso a la plataforma de inglés', rol: 'Ambos', tags: ['richmond', 'ingreso', 'acceso', 'connect'] },
    { id: 'wyxu3QD9WX8', title: 'Ingresar a Richmond Studio via EDI Santillana', desc: 'Acceso desde EDI a Richmond Studio', rol: 'Ambos', tags: ['richmond', 'ingreso', 'edi', 'acceso'] },
    { id: 'sKtj-gpv78E', title: 'Limpiar cookies y caché - Richmond Studio', desc: 'Solución a problemas de carga o acceso', rol: 'Ambos', tags: ['richmond', 'cookies', 'cache', 'problemas', 'tecnico'] },
    { id: 'zC5L4zTrZJA', title: 'Calificar audios - Richmond Studio', desc: 'Revisión de audios grabados por estudiantes (Pending Marks)', rol: 'Docente', tags: ['richmond', 'calificar', 'audio', 'pending', 'marks'] },
    { id: 'ABBwpKFDN8M', title: 'Cómo asignar tareas - Richmond Studio', desc: 'Asignación de actividades a estudiantes', rol: 'Docente', tags: ['richmond', 'tareas', 'asignar', 'assignments'] },
    { id: 'oWvbBcSyjkA', title: 'Acceder al i-solution online y offline', desc: 'Uso del recurso de soluciones del docente', rol: 'Docente', tags: ['richmond', 'isolution', 'online', 'offline', 'solucionario'] },
    { id: 'NG5Jkq0uFeE', title: 'My Links - Richmond Studio', desc: 'Gestión de accesos directos en la plataforma', rol: 'Estudiante', tags: ['richmond', 'links', 'accesos', 'favoritos'] },
    { id: 'vSR2f5hqw84', title: '¿Dónde revisar mis asignaciones? - Assignments', desc: 'Ver tareas pendientes y entregadas', rol: 'Estudiante', tags: ['richmond', 'assignments', 'asignaciones', 'tareas'] },
    { id: 'L1sNm4j3ICU', title: '¿Dónde revisar mis notas? - Markbook', desc: 'Consultar calificaciones en Richmond Studio', rol: 'Estudiante', tags: ['richmond', 'markbook', 'notas', 'calificaciones', 'notas'] },
];

const SECTION_DATA = {
    'Conocimientos': { title: 'COMPARTIR CONOCIMIENTOS', icon: 'atom', color: 'text-pink-400', theme: 'pink' },
    'Progreso': { title: 'COMPARTIR PROGRESO', icon: 'trending-up', color: 'text-blue-400', theme: 'blue' },
    'Ingles': { title: 'COMPARTIR INGLÉS', icon: 'globe', color: 'text-emerald-400', theme: 'emerald' }
};

const todosLosVideos = [...videosGenerales, ...videosActividades, ...videosProgreso, ...videosIngles];

// Variable para trackear la sección activa y sus videos
let seccionActualVideos = [];

/* ============================================================
   MOTOR DE BÚSQUEDA GLOBAL (menú principal)
   ============================================================ */
function initSearch() {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    const cardsContainer = document.getElementById('cards-container');

    if (!searchInput || !searchResults || !cardsContainer) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            cardsContainer.classList.remove('hidden');
            searchResults.setAttribute('aria-label', 'Resultados de búsqueda');
            return;
        }

        const filtrados = todosLosVideos.filter(v => 
            v.title.toLowerCase().includes(query) || 
            v.desc.toLowerCase().includes(query) ||
            (v.tags && v.tags.some(tag => tag.toLowerCase().includes(query)))
        );

        cardsContainer.classList.add('hidden');
        searchResults.classList.remove('hidden');

        if (filtrados.length > 0) {
            searchResults.innerHTML = generarTarjetas(filtrados);
            searchResults.setAttribute('aria-label', `${filtrados.length} resultado(s) para "${query}"`);
        } else {
            searchResults.innerHTML = `<div class="col-span-full text-center p-8 text-slate-400" role="status"><i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 opacity-50" aria-hidden="true"></i><p>No encontramos tutoriales para "<strong>${query}</strong>"</p></div>`;
        }
        lucide.createIcons();
    });
}

/* ============================================================
   MOTOR DE BÚSQUEDA DENTRO DE SECCIÓN
   ============================================================ */
function initSectionSearch() {
    const searchInput = document.getElementById('section-search');
    const searchResults = document.getElementById('section-search-results');
    const sectionContent = document.getElementById('section-content');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.classList.add('hidden');
            sectionContent.style.display = '';
            return;
        }

        const filtrados = seccionActualVideos.filter(v =>
            v.title.toLowerCase().includes(query) ||
            v.desc.toLowerCase().includes(query) ||
            (v.tags && v.tags.some(tag => tag.toLowerCase().includes(query)))
        );

        sectionContent.style.display = 'none';
        searchResults.classList.remove('hidden');

        if (filtrados.length > 0) {
            searchResults.innerHTML = generarTarjetas(filtrados);
            searchResults.setAttribute('aria-label', `${filtrados.length} resultado(s) para "${query}"`);
        } else {
            searchResults.innerHTML = `<div class="col-span-full text-center p-8 text-slate-400" role="status"><i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 opacity-50" aria-hidden="true"></i><p>No encontramos tutoriales para "<strong>${query}</strong>" en esta sección.</p></div>`;
        }
        lucide.createIcons();
    });
}

/* ============================================================
   GENERADOR DE TARJETAS HTML
   ============================================================ */
const generarTarjetas = (videos, color = 'indigo') => videos.map(v => `
    <button onclick="openVideoModal('${v.id}')" 
        class="w-full flex bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition group text-left items-center shadow-sm cyber-hover"
        aria-label="Ver tutorial: ${v.title}">
        <div class="relative w-24 h-14 shrink-0 mr-4 rounded-lg overflow-hidden border border-white/10 bg-black" aria-hidden="true">
            <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute inset-0 flex items-center justify-center">
                <i data-lucide="play-circle" class="text-white w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-transform duration-300"></i>
            </div>
        </div>
        <div class="flex-1">
            <h3 class="font-bold text-sm text-white leading-tight">${v.title}</h3>
            <p class="text-[10px] text-slate-400 mt-1 line-clamp-2">${v.desc}</p>
            ${v.rol !== 'Ambos' ? `<span class="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${v.rol === 'Docente' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'}">${v.rol}</span>` : ''}
        </div>
    </button>
`).join('');

/* ============================================================
   LÓGICA DE NAVEGACIÓN Y FILTROS POR ROL
   ============================================================ */
const mainMenu = document.getElementById('main-menu');
const sectionView = document.getElementById('section-view');
const sectionContentContainer = document.getElementById('section-content');

function openRoleSelection(sectionId) {
    const data = SECTION_DATA[sectionId];
    
    // Limpiar búsqueda de sección
    const sectionSearch = document.getElementById('section-search');
    if (sectionSearch) { sectionSearch.value = ''; }
    const sectionSearchResults = document.getElementById('section-search-results');
    if (sectionSearchResults) { sectionSearchResults.classList.add('hidden'); }

    sectionContentContainer.innerHTML = `
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4">
                <i data-lucide="${data.icon}" class="w-10 h-10 ${data.color} drop-shadow-[0_0_15px_currentColor]" aria-hidden="true"></i>
                <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight">${data.title}</h2>
            </div>
        </div>
        <div class="w-full h-px bg-white/10 mb-10 shadow-[0_0_10px_currentColor]"></div>
        
        <div class="flex flex-col items-center justify-center h-full pb-10">
            <h3 class="text-3xl font-black text-white mb-8 drop-shadow-lg text-center">¿Cuál es tu perfil?</h3>
            <div class="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                <button onclick="loadFilteredContent('${sectionId}', 'Docente')" 
                    class="flex-1 bg-white/5 border border-${data.theme}-500/30 hover:bg-${data.theme}-600/20 p-10 rounded-[2rem] transition-all group flex flex-col items-center justify-center gap-4 shadow-xl cyber-hover"
                    aria-label="Ver tutoriales para Docentes de ${data.title}">
                    <div class="w-20 h-20 bg-${data.theme}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_currentColor]" aria-hidden="true">
                        <i data-lucide="graduation-cap" class="w-10 h-10 ${data.color}"></i>
                    </div>
                    <span class="text-2xl font-black text-white">Soy Docente</span>
                </button>
                
                <button onclick="loadFilteredContent('${sectionId}', 'Estudiante')" 
                    class="flex-1 bg-white/5 border border-${data.theme}-500/30 hover:bg-${data.theme}-600/20 p-10 rounded-[2rem] transition-all group flex flex-col items-center justify-center gap-4 shadow-xl cyber-hover"
                    aria-label="Ver tutoriales para Estudiantes y Padres de familia de ${data.title}">
                    <div class="w-20 h-20 bg-${data.theme}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_currentColor]" aria-hidden="true">
                        <i data-lucide="backpack" class="w-10 h-10 ${data.color}"></i>
                    </div>
                    <span class="text-2xl font-black text-white">Soy Estudiante</span>
                    <span class="text-xs text-slate-400 -mt-2">(también Padres de familia)</span>
                </button>
            </div>
        </div>
    `;
    
    lucide.createIcons();
    mainMenu.classList.add('fade-out');
    setTimeout(() => {
        mainMenu.classList.add('hidden');
        sectionView.classList.remove('hidden');
        requestAnimationFrame(() => sectionView.classList.add('fade-in'));
        // Focus al volver para accesibilidad
        sectionView.focus();
    }, 400);
}

function loadFilteredContent(sectionId, role) {
    const data = SECTION_DATA[sectionId];
    let contentHTML = '';

    // Limpiar búsqueda de sección al cambiar rol
    const sectionSearch = document.getElementById('section-search');
    if (sectionSearch) { sectionSearch.value = ''; }
    const sectionSearchResults = document.getElementById('section-search-results');
    if (sectionSearchResults) { 
        sectionSearchResults.classList.add('hidden'); 
        sectionContentContainer.style.display = '';
    }

    if (sectionId === 'Conocimientos') {
        const vGenerales = videosGenerales.filter(v => v.rol === role || v.rol === 'Ambos');
        const vActividades = role === 'Docente' ? videosActividades : []; 
        seccionActualVideos = [...vGenerales, ...vActividades];

        contentHTML += `<p class="text-slate-300 mb-6 text-sm">Explora los tutoriales para tu perfil de <strong>${role === 'Estudiante' ? 'Estudiante / Padre de familia' : role}</strong>.</p>`;
        
        if (vGenerales.length > 0) {
            contentHTML += `
                <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2"><i data-lucide="book-open" class="${data.color} w-5 h-5 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true"></i> Generales y Gestión</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10" role="list" aria-label="Tutoriales generales">${generarTarjetas(vGenerales, data.theme)}</div>`;
        }

        if (vActividades.length > 0) {
            contentHTML += `
                <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2"><i data-lucide="puzzle" class="${data.color} w-5 h-5 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true"></i> Actividades Interactivas y Quizzes</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Tutoriales de actividades">${generarTarjetas(vActividades, data.theme)}</div>`;
        }

    } else if (sectionId === 'Progreso') {
        const vProgreso = videosProgreso.filter(v => v.rol === role || v.rol === 'Ambos');
        seccionActualVideos = vProgreso;
        contentHTML += `<p class="text-slate-300 mb-6 text-sm">Tutoriales de evaluación de <strong>Pleno</strong> para <strong>${role === 'Estudiante' ? 'Estudiante / Padre de familia' : role}</strong>.</p>`;
        
        if (vProgreso.length > 0) {
            contentHTML += `
                <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2"><i data-lucide="trending-up" class="${data.color} w-5 h-5 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true"></i> Evaluaciones en Pleno</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10" role="list" aria-label="Tutoriales de evaluaciones">${generarTarjetas(vProgreso, data.theme)}</div>`;
        } else {
            contentHTML += `<p class="text-slate-400 italic" role="status">No hay tutoriales cargados para este perfil aún.</p>`;
        }

    } else {
        // ✅ INGLÉS con videos reales
        const vIngles = videosIngles.filter(v => v.rol === role || v.rol === 'Ambos');
        seccionActualVideos = vIngles;
        
        const vComunes = videosIngles.filter(v => v.rol === 'Ambos');
        const vRol = videosIngles.filter(v => v.rol === role);

        contentHTML += `<p class="text-slate-300 mb-6 text-sm">Tutoriales de <strong>Richmond Studio</strong> para <strong>${role === 'Estudiante' ? 'Estudiante / Padre de familia' : role}</strong>.</p>`;

        if (vComunes.length > 0) {
            contentHTML += `
                <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2"><i data-lucide="users" class="${data.color} w-5 h-5 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true"></i> Para todos</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10" role="list" aria-label="Tutoriales para todos">${generarTarjetas(vComunes, data.theme)}</div>`;
        }

        if (vRol.length > 0) {
            contentHTML += `
                <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2"><i data-lucide="${role === 'Docente' ? 'graduation-cap' : 'backpack'}" class="${data.color} w-5 h-5 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true"></i> Exclusivos para ${role === 'Docente' ? 'Docentes' : 'Estudiantes'}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Tutoriales exclusivos para ${role}">${generarTarjetas(vRol, data.theme)}</div>`;
        }
    }

    sectionContentContainer.style.opacity = 0;
    setTimeout(() => {
        sectionContentContainer.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                    <i data-lucide="${data.icon}" class="w-10 h-10 ${data.color} drop-shadow-[0_0_15px_currentColor]" aria-hidden="true"></i>
                    <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight">${data.title}</h2>
                </div>
                <span class="hidden md:inline-block bg-${data.theme}-500/20 text-${data.theme}-300 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-${data.theme}-500/30 shadow-[0_0_15px_currentColor]" aria-label="Perfil seleccionado: ${role}">
                    ${role === 'Estudiante' ? 'Est. / Padre' : role}
                </span>
            </div>
            <div class="w-full h-px bg-white/10 mb-8 shadow-[0_0_5px_currentColor]"></div>
            ${contentHTML}
        `;
        lucide.createIcons();
        sectionContentContainer.style.opacity = 1;
    }, 300);
}

function closeSection() {
    sectionView.classList.remove('fade-in');
    seccionActualVideos = [];
    const sectionSearch = document.getElementById('section-search');
    if (sectionSearch) { sectionSearch.value = ''; }
    const sectionSearchResults = document.getElementById('section-search-results');
    if (sectionSearchResults) { sectionSearchResults.classList.add('hidden'); }
    sectionContentContainer.style.display = '';

    setTimeout(() => {
        sectionView.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        requestAnimationFrame(() => mainMenu.classList.remove('fade-out'));
    }, 400);
}

/* ============================================================
   CHAT CON BACKDROP MÓVIL
   ============================================================ */
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatBackdrop = document.getElementById('chat-backdrop');

function toggleChat() {
    const sidebar = document.getElementById('chat-sidebar');
    const isOpen = sidebar.classList.contains('open');

    if (isOpen) {
        sidebar.classList.remove('open');
        chatBackdrop.classList.remove('visible');
        chatBackdrop.classList.add('hidden');
        chatToggleBtn.setAttribute('aria-expanded', 'false');
        chatToggleBtn.setAttribute('aria-label', 'Abrir asistente Coach Bot');
        chatToggleBtn.focus();
    } else {
        sidebar.classList.add('open');
        chatBackdrop.classList.remove('hidden');
        chatBackdrop.classList.add('visible');
        chatToggleBtn.setAttribute('aria-expanded', 'true');
        chatToggleBtn.setAttribute('aria-label', 'Cerrar asistente Coach Bot');
        // Focus al chat para accesibilidad
        setTimeout(() => {
            const chatInput = document.getElementById('chat-input');
            if (chatInput) chatInput.focus();
        }, 300);
    }
}

// Cerrar chat con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('chat-sidebar');
        if (sidebar.classList.contains('open')) {
            toggleChat();
        }
        const modal = document.getElementById('video-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeVideoModal();
        }
    }
});

/* ============================================================
   LÓGICA DEL REPRODUCTOR MODAL
   ============================================================ */
const modal = document.getElementById('video-modal');
const iframe = document.getElementById('modal-iframe');
const externalLink = document.getElementById('modal-external-link');
let previousFocusElement = null;

window.openVideoModal = function(ytId) {
    if(!ytId) return;
    previousFocusElement = document.activeElement;
    iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    externalLink.href = `https://youtu.be/${ytId}`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.focus();
}

window.closeVideoModal = function() {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    iframe.src = ""; 
    if (previousFocusElement) {
        previousFocusElement.focus();
        previousFocusElement = null;
    }
}

modal.addEventListener('click', (e) => {
    if (e.target.id === 'video-modal') closeVideoModal();
});
