document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
});

/* ============================================================
   BASES DE DATOS DE VIDEOS (Con etiquetas de Rol)
   ============================================================ */

// Videos de Conocimientos (Generales)
const videosGenerales = [
    { id: 'Bv_FinX79vk', title: 'Primeros pasos Docentes', desc: 'Introducción a Compartir Conocimientos', rol: 'Docente' },
    { id: 'X6akIQPrJWw', title: 'Asignar contenidos', desc: 'Gestión de material en Compartir Conocimientos', rol: 'Docente' },
    { id: 'KXROB84Q3IU', title: 'Actividades y Tareas', desc: 'Asignación de tareas para docentes', rol: 'Docente' },
    { id: 'sGX_D17T4h8', title: 'Crea tus propios materiales', desc: 'Sube y gestiona tu propio contenido', rol: 'Docente' },
    { id: 'SO60tHz47kU', title: 'Panel de comunicación', desc: 'Mensajería y foros de la plataforma', rol: 'Docente' },
    { id: 'Twrx9mrQ6EQ', title: 'Solucionario y Teacher Planner', desc: 'Herramientas de planificación docente', rol: 'Docente' },
    { id: '9oKz6MQgDsk', title: 'Primeros pasos Estudiantes', desc: 'Guía básica de inicio para alumnos', rol: 'Estudiante' },
    { id: 'XugiPvcc20g', title: 'Responder Tareas', desc: 'Cómo enviar respuestas (Estudiantes)', rol: 'Estudiante' },
    { id: 'RjS2b5h-UqY', title: 'Biblioteca Estudiantes', desc: 'Acceso a recursos y biblioteca', rol: 'Estudiante' },
    { id: 'l0MHO5QO1eQ', title: 'Libro Web', desc: 'Uso del Libro Web para estudiar', rol: 'Ambos' } 
];

// Videos de Conocimientos (Actividades Interactivas)
const videosActividades = [
    { id: 'xMUUcHz1RMY', title: 'Crear Quiz general', desc: 'Configuración inicial de quizzes', rol: 'Docente' },
    { id: '-W6vnpkmDEo', title: 'Completar imagen (Arrastrar)', desc: 'Arrastrar y soltar en imágenes', rol: 'Docente' },
    { id: '9suY8fBcTpo', title: 'Completar imagen (Desplegable)', desc: 'Menú desplegable en imágenes', rol: 'Docente' },
    { id: 'SSLxS0EffXQ', title: 'Completar huecos (Arrastrar)', desc: 'Arrastrar y soltar en textos', rol: 'Docente' },
    { id: 'sAi3lAmCI5Y', title: 'Completar huecos (Desplegable)', desc: 'Menú desplegable en textos', rol: 'Docente' },
    { id: 'YgALIhJ-PGg', title: 'Clasificar', desc: 'Actividad de agrupación y clasificación', rol: 'Docente' },
    { id: 'f36XjOs9Kdw', title: 'Completar huecos con texto', desc: 'Escribir la respuesta correcta', rol: 'Docente' },
    { id: 'Wlndj6N3zL0', title: 'Completar imagen con texto', desc: 'Escribir sobre zonas de imagen', rol: 'Docente' },
    { id: 'uXAZTjqGqCA', title: 'Respuesta abierta simple', desc: 'Preguntas de desarrollo corto', rol: 'Docente' },
    { id: 'wyQ8XDKUJRg', title: 'Evaluación manual: Enunciado', desc: 'Configurar rúbricas y enunciados', rol: 'Docente' },
    { id: 'pk3g6khFJlc', title: 'Evaluación manual: Grabar audio', desc: 'Respuestas por nota de voz', rol: 'Docente' },
    { id: 'IDmx4SQrTp8', title: 'Evaluación manual: Pintar', desc: 'Actividades de dibujo y trazo', rol: 'Docente' },
    { id: 't8ZGxHuU5kg', title: 'Evaluación manual: Abierta compleja', desc: 'Desarrollo extenso con formato', rol: 'Docente' },
    { id: 'yUfpyWQb3zI', title: 'Evaluación manual: Subir archivo', desc: 'Recepción de entregables adjuntos', rol: 'Docente' },
    { id: 'XTkETvJ-s_c', title: 'Fórmulas matemáticas', desc: 'Completar huecos con ecuaciones', rol: 'Docente' },
    { id: 'M7Y1wYkXkiI', title: 'Crucigrama', desc: 'Generador de crucigramas interactivos', rol: 'Docente' },
    { id: 'G66EITN5HTM', title: 'Emparejar', desc: 'Relacionar columnas o conceptos', rol: 'Docente' },
    { id: 'TMUK3uUYffQ', title: 'Ordenar', desc: 'Secuencias cronológicas o lógicas', rol: 'Docente' },
    { id: '0XXPdLzoRUc', title: 'Seleccionar para descubrir', desc: 'Actividades de exploración', rol: 'Docente' },
    { id: 'D-lSaspWGzQ', title: 'Unir', desc: 'Trazar líneas entre conceptos', rol: 'Docente' },
    { id: 'n8pDFxb8O78', title: 'Sopa de letras', desc: 'Generador de sopa de letras', rol: 'Docente' },
    { id: 'zw4SWniGdbQ', title: 'Tipo test: Lista de selección', desc: 'Opciones múltiples en lista', rol: 'Docente' },
    { id: '_L2wa7F_eyM', title: 'Tipo test: Respuesta única', desc: 'Solo una opción es correcta', rol: 'Docente' },
    { id: 'jkFJbiJVx_c', title: 'Tipo test: Selección múltiple numerada', desc: 'Múltiples correctas con números', rol: 'Docente' },
    { id: '3udWZoZfNfs', title: 'Tipo test: Selección múltiple', desc: 'Varias opciones correctas', rol: 'Docente' },
    { id: 'OvXxkT4dak4', title: 'Tipo test: Tabla de selección', desc: 'Matrices de opciones', rol: 'Docente' },
    { id: 'uoSCotTJcj0', title: 'Tipo test: Verdadero y falso', desc: 'Validación dicotómica', rol: 'Docente' }
];

// Videos de Progreso (Pleno)
const videosProgreso = [
    { id: 'Och9Do2176Q', title: 'Acceder a Pleno', desc: 'Ingreso a la plataforma de evaluación', rol: 'Docente' },
    { id: 'iJMU2Iyu8ng', title: 'Planificar una evaluación', desc: 'Configurar fechas y parámetros', rol: 'Docente' },
    { id: 'OemyOCXD8U8', title: 'Habilitar o reiniciar', desc: 'Reasignar evaluaciones a estudiantes', rol: 'Docente' },
    { id: 'DdPnWYVu1y4', title: 'Crear evaluación (Banco Santillana)', desc: 'Usar ítems predeterminados', rol: 'Docente' },
    { id: 'WpDFMfZdm5g', title: 'Preguntas aleatorias', desc: 'Configurar orden aleatorio en pruebas', rol: 'Docente' },
    { id: 'aLm91Avo63Y', title: 'Crear evaluación (Ítems propios)', desc: 'Diseñar preguntas desde cero', rol: 'Docente' },
    { id: '7kp_-ZL7Amw', title: 'Crear rúbricas', desc: 'Rúbricas para preguntas abiertas', rol: 'Docente' },
    { id: 'iTIFZeCEO_o', title: 'Calificar preguntas abiertas', desc: 'Revisión y puntuación manual', rol: 'Docente' },
    { id: '_oDKSoJItHo', title: 'Responder evaluaciones', desc: 'Cómo presentar pruebas en Pleno', rol: 'Estudiante' }
];

/* Generador con Miniaturas de YouTube Automáticas */
const generarTarjetas = (videos, color) => videos.map(v => `
    <button onclick="openVideoModal('${v.id}')" class="w-full flex bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition group text-left items-center shadow-sm">
        <div class="relative w-24 h-14 shrink-0 mr-4 rounded-lg overflow-hidden border border-white/10 bg-black">
            <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="${v.title}" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute inset-0 flex items-center justify-center">
                <i data-lucide="play-circle" class="text-white w-6 h-6 drop-shadow-lg group-hover:scale-125 transition-transform duration-300"></i>
            </div>
        </div>
        <div class="flex-1">
            <h3 class="font-bold text-sm text-white leading-tight">${v.title}</h3>
            <p class="text-[10px] text-slate-400 mt-1 line-clamp-2">${v.desc}</p>
        </div>
    </button>
`).join('');

/* ============================================================
   ESTRUCTURA DE SECCIONES
   ============================================================ */
const SECTION_DATA = {
    'Conocimientos': { title: 'COMPARTIR CONOCIMIENTOS', icon: 'atom', color: 'text-pink-400', theme: 'pink' },
    'Progreso': { title: 'COMPARTIR PROGRESO', icon: 'trending-up', color: 'text-blue-400', theme: 'blue' },
    'Ingles': { title: 'COMPARTIR INGLÉS', icon: 'globe', color: 'text-emerald-400', theme: 'emerald' }
};

const mainMenu = document.getElementById('main-menu');
const sectionView = document.getElementById('section-view');
const sectionContentContainer = document.getElementById('section-content');

/* ============================================================
   LÓGICA DE NAVEGACIÓN Y FILTROS POR ROL
   ============================================================ */

function openRoleSelection(sectionId) {
    const data = SECTION_DATA[sectionId];
    
    sectionContentContainer.innerHTML = `
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4">
                <i data-lucide="${data.icon}" class="w-10 h-10 ${data.color} drop-shadow-lg"></i>
                <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight">${data.title}</h2>
            </div>
        </div>
        <div class="w-full h-px bg-white/20 mb-10"></div>
        
        <div class="flex flex-col items-center justify-center h-full pb-10">
            <h3 class="text-3xl font-black text-white mb-8 drop-shadow-lg text-center">¿Cuál es tu rol?</h3>
            <div class="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                <button onclick="loadFilteredContent('${sectionId}', 'Docente')" class="flex-1 bg-white/5 border border-${data.theme}-500/30 hover:bg-${data.theme}-600/20 p-10 rounded-[2rem] transition-all group flex flex-col items-center justify-center gap-4 shadow-xl hover:shadow-${data.theme}-500/20 hover:-translate-y-2">
                    <div class="w-20 h-20 bg-${data.theme}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i data-lucide="graduation-cap" class="w-10 h-10 ${data.color}"></i>
                    </div>
                    <span class="text-2xl font-black text-white">Soy Docente</span>
                </button>
                
                <button onclick="loadFilteredContent('${sectionId}', 'Estudiante')" class="flex-1 bg-white/5 border border-${data.theme}-500/30 hover:bg-${data.theme}-600/20 p-10 rounded-[2rem] transition-all group flex flex-col items-center justify-center gap-4 shadow-xl hover:shadow-${data.theme}-500/20 hover:-translate-y-2">
                    <div class="w-20 h-20 bg-${data.theme}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i data-lucide="backpack" class="w-10 h-10 ${data.color}"></i>
                    </div>
                    <span class="text-2xl font-black text-white">Soy Estudiante</span>
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
    }, 400);
}

function loadFilteredContent(sectionId, role) {
    const data = SECTION_DATA[sectionId];
    let contentHTML = '';

    // ================= SECCIÓN CONOCIMIENTOS =================
    if (sectionId === 'Conocimientos') {
        const vGenerales = videosGenerales.filter(v => v.rol === role || v.rol === 'Ambos');
        const vActividades = role === 'Docente' ? videosActividades : []; 

        contentHTML += `<p class="text-slate-300 mb-6 text-sm">Explora los tutoriales de <strong>Libroweb</strong> exclusivos para tu perfil de <strong>${role}</strong>.</p>`;
        
        if (vGenerales.length > 0) {
            contentHTML += `
                <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2"><i data-lucide="book-open" class="text-pink-400 w-5 h-5"></i> Generales y Gestión</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    ${generarTarjetas(vGenerales, data.theme)}
                </div>
            `;
        }

        if (vActividades.length > 0) {
            contentHTML += `
                <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2"><i data-lucide="puzzle" class="text-pink-400 w-5 h-5"></i> Actividades Interactivas y Quizzes</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${generarTarjetas(vActividades, data.theme)}
                </div>
            `;
        }

    // ================= SECCIÓN PROGRESO (PLENO) =================
    } else if (sectionId === 'Progreso') {
        const vProgreso = videosProgreso.filter(v => v.rol === role || v.rol === 'Ambos');

        contentHTML += `<p class="text-slate-300 mb-6 text-sm">Explora los tutoriales de evaluación de <strong>Pleno</strong> exclusivos para tu perfil de <strong>${role}</strong>.</p>`;
        
        if (vProgreso.length > 0) {
            contentHTML += `
                <h3 class="font-black text-white text-lg mb-4 flex items-center gap-2"><i data-lucide="trending-up" class="text-blue-400 w-5 h-5"></i> Evaluaciones en Pleno</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    ${generarTarjetas(vProgreso, data.theme)}
                </div>
            `;
        } else {
            contentHTML += `<p class="text-slate-400 italic">No hay tutoriales cargados para este perfil aún.</p>`;
        }

    // ================= SECCIÓN INGLÉS =================
    } else {
        contentHTML += `
            <p class="text-slate-300 mb-8 text-sm">Próximamente: Todo lo que necesitas saber sobre esta plataforma para tu perfil de <strong>${role}</strong>.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="w-full flex bg-white/5 border border-white/10 p-4 rounded-2xl opacity-50 cursor-not-allowed text-left items-center">
                    <div class="w-10 h-10 bg-${data.theme}-500/20 rounded-full flex items-center justify-center shrink-0 mr-4">
                        <i data-lucide="clock" class="${data.color} w-5 h-5"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm text-white leading-tight">Tutoriales en camino</h3>
                        <p class="text-[10px] text-slate-400 mt-0.5">Estamos preparando el material.</p>
                    </div>
                </div>
            </div>
        `;
    }

    sectionContentContainer.style.opacity = 0;
    
    setTimeout(() => {
        sectionContentContainer.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                    <i data-lucide="${data.icon}" class="w-10 h-10 ${data.color} drop-shadow-lg"></i>
                    <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight">${data.title}</h2>
                </div>
                <span class="hidden md:inline-block bg-${data.theme}-500/20 text-${data.theme}-300 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-${data.theme}-500/30 shadow-lg">
                    Perfil: ${role}
                </span>
            </div>
            <div class="w-full h-px bg-white/20 mb-8"></div>
            ${contentHTML}
        `;
        lucide.createIcons();
        sectionContentContainer.style.opacity = 1;
    }, 300);
}

function closeSection() {
    sectionView.classList.remove('fade-in');
    
    setTimeout(() => {
        sectionView.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        requestAnimationFrame(() => mainMenu.classList.remove('fade-out'));
    }, 400);
}

function toggleChat() {
    const sidebar = document.getElementById('chat-sidebar');
    sidebar.classList.toggle('open');
}

/* ============================================================
   LÓGICA DEL REPRODUCTOR MODAL (Seguro)
   ============================================================ */
const modal = document.getElementById('video-modal');
const iframe = document.getElementById('modal-iframe');
const externalLink = document.getElementById('modal-external-link');

window.openVideoModal = function(ytId) {
    if(!ytId) return;
    
    // Asigna la fuente al iframe de youtube
    iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    
    // Actualiza el link del botón de contingencia
    externalLink.href = `https://youtu.be/${ytId}`;
    
    // Muestra el modal cambiando 'hidden' por 'flex'
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

window.closeVideoModal = function() {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    iframe.src = ""; // Detiene la reproducción
}

modal.addEventListener('click', (e) => {
    if (e.target.id === 'video-modal') {
        closeVideoModal();
    }
});
