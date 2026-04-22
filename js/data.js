/* ============================================================
   BASE DE DATOS CENTRALIZADA (Simulación de JSON)
   ============================================================ */

const videosGenerales = [
    { id: 'Bv_FinX79vk', title: 'Primeros pasos Docentes', desc: 'Introducción a Compartir Conocimientos', rol: 'Docente', tags: ['inicio', 'basico', 'plataforma'] },
    { id: 'X6akIQPrJWw', title: 'Asignar contenidos', desc: 'Gestión de material en Compartir Conocimientos', rol: 'Docente', tags: ['asignar', 'material', 'gestion'] },
    { id: 'KXROB84Q3IU', title: 'Actividades y Tareas', desc: 'Asignación de tareas para docentes', rol: 'Docente', tags: ['tareas', 'actividades', 'enviar'] },
    { id: 'sGX_D17T4h8', title: 'Crea tus propios materiales', desc: 'Sube y gestiona tu propio contenido', rol: 'Docente', tags: ['subir', 'propio', 'archivos'] },
    { id: 'SO60tHz47kU', title: 'Panel de comunicación', desc: 'Mensajería y foros de la plataforma', rol: 'Docente', tags: ['foro', 'mensajes', 'comunicacion'] },
    { id: 'Twrx9mrQ6EQ', title: 'Solucionario y Teacher Planner', desc: 'Herramientas de planificación docente', rol: 'Docente', tags: ['planificacion', 'soluciones', 'respuestas'] },
    { id: '9oKz6MQgDsk', title: 'Primeros pasos Estudiantes', desc: 'Guía básica de inicio para alumnos', rol: 'Estudiante', tags: ['inicio', 'alumno', 'basico'] },
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

// Metadatos de Secciones
const SECTION_DATA = {
    'Conocimientos': { title: 'COMPARTIR CONOCIMIENTOS', icon: 'atom', color: 'text-pink-400', theme: 'pink' },
    'Progreso': { title: 'COMPARTIR PROGRESO', icon: 'trending-up', color: 'text-blue-400', theme: 'blue' },
    'Ingles': { title: 'COMPARTIR INGLÉS', icon: 'globe', color: 'text-emerald-400', theme: 'emerald' }
};

// Datos consolidados para el buscador
const todosLosVideos = [...videosGenerales, ...videosActividades, ...videosProgreso];