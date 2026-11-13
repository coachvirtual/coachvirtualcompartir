const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
function load(withPrograms=true){const ctx={document:{getElementById:()=>null},window:{}};vm.createContext(ctx);vm.runInContext((withPrograms?fs.readFileSync('js/bot-programas.js','utf8')+'\n':'')+fs.readFileSync('js/bot.js','utf8')+'\nthis.bot={BOT_DATA,KEYWORD_INDEX,botMemoria,searchByKeyword,PROGRAM_DATA};',ctx);return ctx.bot;}
const bot=load();
const cases=[
 ['Compartir Bienestar','bienestar_proximamente'],['Compartir Pruebas','pruebas_proximamente'],
 ['¿Qué es Compartir Robótica?','robotica'],['Que es robotica','robotica'],['Quiero información de Robótica','robotica'],['SET XXI','robotica'],['set-21','robotica'],
 ['¿Cuántos proyectos tiene SET21?','robotica_tiempos'],['¿Cuántos proyectos hay por grado en robótica?','robotica_tiempos'],['¿Cuántas horas por semana en robótica?','robotica_tiempos'],['¿En qué asignatura se implementa SET21?','robotica_tiempos'],
 ['¿Cuáles son los niveles de robótica?','robotica_niveles'],['¿Qué grados tiene SET21?','robotica_niveles'],['¿Qué edad requiere robótica?','robotica_niveles'],
 ['¿Cuántas cajas recibe el colegio?','robotica_cajas'],['¿Cómo reponen las cajas de robótica?','robotica_cajas'],['¿Qué trae el kit de robótica?','robotica_cajas'],
 ['¿Qué es Maestro Maker?','robotica_libro'],['¿Debo ser experto en robótica?','robotica_formacion'],['¿Qué formación ofrece robótica?','robotica_formacion'],
 ['¿Cuáles son las seis fases de robótica?','robotica_fases'],['¿Qué hacemos en Indaguemos?','robotica_fases'],['¿Qué pasa en Evaluemos?','robotica_fases'],
 ['¿Cuáles son los roles de robótica?','robotica_roles'],['¿Qué hace el indagador?','robotica_roles'],
 ['¿Cómo se evalúa robótica?','robotica_evaluacion'],['¿Qué rúbrica usa SET21?','robotica_evaluacion'],
 ['¿Qué es Tinkercad?','robotica_tinkercad'],['¿Qué es Wokwi?','robotica_wokwi'],['¿Qué hace micro:bit?','robotica_microbit'],['¿Qué simuladores hay?','robotica_simuladores'],
 ['¿Qué incluye la cartilla?','robotica_cartilla'],['¿Qué incluye el libro digital de robótica?','robotica_libro'],['¿Qué materiales tiene SET21?','robotica_componentes'],
 ['¿Qué habilidades se desarrollan en robótica?','robotica_habilidades'],['¿Robótica trabaja inteligencia artificial?','robotica_habilidades'],['¿Qué metodología usa SET21?','robotica_metodologia'],['¿Qué es STEAM?','robotica_metodologia'],
 ['¿Cómo se relaciona robótica con ciencias naturales?','robotica_areas'],['¿Qué dice la ley 2626 sobre robótica?','robotica_curriculo'],['¿Dónde veo el video de robótica?','robotica_acceso'],['Ver video de robótica','robotica_video'],
 ['¿Cómo ingreso a robótica?','robotica_acceso'],['¿Cómo se ingresa a robótica?','robotica_acceso'],['¿El prototipo no funciona?','robotica_soporte'],
 ['¿Cuánto cuesta la caja de robótica?','robotica_sin_dato'],['¿Funciona robótica sin internet?','robotica_sin_dato'],['¿Qué fecha es el torneo de robótica?','robotica_eventos'],['¿Cuándo son los Premios Comunidad en robótica?','robotica_eventos'],
 ['¿Qué es Compartir Fe?','fe_docente'],['¿Qué es CREO?','fe_docente'],['¿Cuáles son los cinco pilares de CREO?','fe_pilares'],
 ['¿Qué recursos tiene CREO para las familias?','fe_familias'],['¿Qué ofrece CREO para padres?','fe_familias'],['¿Qué recursos incluye CREO?','fe_recursos'],
 ['¿Qué es Pensar y Creer?','fe_pensar_creer'],['¿Qué es Aprender con sentido?','fe_aprender_sentido'],['¿Qué relación tiene CREO con el Pacto Educativo Global?','fe_pacto'],
 ['¿Dónde está la malla de secundaria de CREO?','fe_secundaria'],['Necesito la malla primaria de Fe','fe_primaria'],['¿Dónde están los documentos de CREO?','fe_documentos'],['Descargar PDF de CREO','fe_documentos'],
 ['¿Qué son los contenidos globales CREO?','fe_contenidos'],['¿Cómo integrar CREO con Compartir?','fe_conexiones'],['¿Qué tutoriales tiene Compartir Fe?','fe_tutoriales'],
 ['¿Cómo ingreso a CREO?','fe_acceso'],['¿Cómo se ingresa a CREO?','fe_acceso'],['SharePoint de CREO pide permisos','fe_acceso_documentos'],['No puedo abrir la malla primaria de CREO','fe_acceso_documentos'],
 ['¿Qué formación tiene CREO?','fe_formacion'],['¿Qué es la consultoría pastoral de CREO?','fe_formacion'],['¿Qué es la pastoral en CREO?','fe_pastoral'],['¿Cómo se evalúa Compartir Fe?','fe_evaluacion'],
 ['¿Cuánto cuesta CREO?','fe_sin_dato'],['¿Qué temas exactos tiene el PDF de CREO?','fe_documentos'],['¿Hay robótica y Fe?','programas_comparar'],['Compartir Suplementales','suplementales_bot'],['Necesito una malla curricular','programa_aclarar'],
 ['¿Cómo creo una tarea?','docente_tarea'],['Como creo un quiz','quiz_base'],['Cómo creo una evaluación','pleno_doc_crear'],['¿Cómo respondo una tarea?','est_tareas'],['Soy profesor','menu_profesor'],['Soy estudiante','menu_estudiante'],['Un café',null],['Referencia',null],['Mi profesor',null],['¿Cómo asigno tareas en Richmond?','richmond_doc_tareas'],['¿Cómo responder evaluaciones en Pleno?','pleno_est_responder'],['Limpiar caché de Richmond','richmond_cookies'],['Hola','inicio'],['Necesito rúbricas','pleno_doc_calificar'],['Crear evaluaciones','pleno_doc_crear'],['Fórmula matemática','q_mates']
];
const results=cases.map(([question,expected])=>{Object.assign(bot.botMemoria,{ultimoTopic:null,ultimaSeccion:null,ultimoRol:null});const actual=bot.searchByKeyword(question);return {question,expected,actual,passed:actual===expected};});
const conversations=[
 [['¿Qué es Robótica?','robotica'],['¿Y las cajas?','robotica_cajas'],['¿Y cuánto cuestan?','robotica_sin_dato'],['¿Y la formación?','robotica_formacion'],['¿Y cómo se evalúa?','robotica_evaluacion']],
 [['¿Qué es CREO?','fe_docente'],['¿Y para las familias?','fe_familias'],['¿Y primaria?','fe_primaria'],['¿Y los tutoriales?','fe_tutoriales']],
 [['¿Qué es CREO?','fe_docente'],['¿Qué es Wokwi?','robotica_wokwi'],['¿Y la cartilla?','robotica_cartilla'],['¿Cómo creo una tarea?','docente_tarea']],
 [['¿Qué es Robótica?','robotica'],['¿Cómo ingreso a CREO?','fe_acceso'],['¿Y los documentos?','fe_documentos'],['¿Cómo respondo una tarea?','est_tareas']],
 [['Soy estudiante','menu_estudiante'],['Richmond','ingles_estudiante']]
];
for(const conversation of conversations){Object.assign(bot.botMemoria,{ultimoTopic:null,ultimaSeccion:null,ultimoRol:null});for(const [question,expected] of conversation){const actual=bot.searchByKeyword(question);results.push({question,expected,actual,passed:actual===expected,context:true});}}
const dangling=Object.entries(bot.BOT_DATA).flatMap(([topic,data])=>(data.options||[]).filter(o=>!bot.BOT_DATA[o.topic]).map(o=>({topic,target:o.topic})));
const sourceFailures=Object.entries(bot.PROGRAM_DATA.topics).flatMap(([topic,data])=>(data.sources||[]).filter(k=>!bot.PROGRAM_DATA.sources[k]).map(k=>({topic,key:k})));
const main=fs.readFileSync('js/main.js','utf8'),catalog=new Set([...main.matchAll(/id: '([^']{11})'/g)].map(m=>m[1]));
const unknownVideos=Object.values(bot.PROGRAM_DATA.topics).flatMap(d=>d.videos||[]).filter(id=>!catalog.has(id));
const report={topics:Object.keys(bot.BOT_DATA).length,programTopics:Object.keys(bot.PROGRAM_DATA.topics).length,tests:results.length,passed:results.filter(r=>r.passed).length,failures:results.filter(r=>!r.passed),dangling,sourceFailures,unknownVideos};
fs.writeFileSync('audit/coachbot-intent-results.json',JSON.stringify({...report,results},null,2));console.log(JSON.stringify(report,null,2));
assert.deepEqual(report.failures,[]);assert.deepEqual(dangling,[]);assert.deepEqual(sourceFailures,[]);assert.deepEqual(unknownVideos,[]);
const cached=load(false);assert.equal(cached.searchByKeyword('¿Qué es Robótica?'),'robotica');
