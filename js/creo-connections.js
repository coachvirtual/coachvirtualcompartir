(() => {
 'use strict';
 const C=CREO_CONNECTIONS,U=window.CreoUI,$=id=>document.getElementById(id),safe=U.escape;
 const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const state={mode:'primaria',level:'primaria',grade:'1',area:'',bimester:'',collection:'',query:'',view:'cards',page:0,all:false,step:0,allSteps:false,selected:null};
 const size=8,fields=['area','grade','bimester','learning','lesson','topic','resource','digitalPage'];
 const labels={area:'Área',grade:'Grado',bimester:'Bimestre',learning:'Aprendizaje nuclear',lesson:'Lección',topic:'Tema articulador',resource:'Recurso asociado',digitalPage:'Página del libro digital'};
 const sourceRows=()=>state.level==='primaria'?C.primary:C.secondary;
 const allRows=new Map([...C.primary,...C.secondary].map(r=>[r.id,r]));
 const ordered=values=>[...new Set(values)].sort((a,b)=>String(a).localeCompare(String(b),'es',{numeric:true}));
 const reference=r=>`creo-malla.html?level=${r.level}&page=${r.sourcePage}&row=${encodeURIComponent(r.id)}`;
 function filterRows(){
  const query=normalize(state.query.trim());
  return sourceRows().filter(r=>(state.grade==='all'||r.grade===state.grade)&&(!state.area||r.area===state.area)&&(!state.bimester||r.bimester===state.bimester)&&(!state.collection||r.collection===state.collection)&&(!query||normalize([...fields.map(f=>r[f]),r.collection].join(' ')).includes(query)));
 }
 function fillSelect(id,values,allLabel,value){
  const el=$(id);el.replaceChildren(new Option(allLabel,''),...values.map(v=>new Option(v,v)));el.value=value;
 }
 function renderGrades(){
  $('connection-grades').innerHTML=[['all','Todos los grados'],...ordered(sourceRows().map(r=>r.grade)).map(g=>[g,`${g}°`])].map(([value,label])=>`<button type="button" data-connection-grade="${value}" aria-pressed="${state.grade===value}">${label}</button>`).join('');
 }
 function setupFilters(){
  const primary=state.level==='primaria';
  $('connection-level-title').textContent=primary?'Conexiones Compartir · CREO Primaria':'Conexiones PDC y PAR · CREO Secundaria';
  $('connection-reference').href=`creo-malla.html?level=${state.level}`;
  renderGrades();
  fillSelect('connection-area',ordered(sourceRows().map(r=>r.area)),'Todas las áreas',state.area);
  fillSelect('connection-bimester',ordered(sourceRows().map(r=>r.bimester)),'Todos los bimestres',state.bimester);
  fillSelect('connection-collection',ordered(sourceRows().map(r=>r.collection)),'Todas las colecciones',state.collection);
  $('connection-collection-label').hidden=primary;
  $('connection-search').value=state.query;
 }
 function renderCard(r){
  return `<article class="connection-card" data-connection-id="${r.id}"><div class="connection-card-meta"><span data-cell="area">${safe(r.area)}</span><span>Grado <b data-cell="grade">${safe(r.grade)}</b>°</span><span>Bimestre <b data-cell="bimester">${safe(r.bimester)}</b></span></div><span class="small-label">RECURSO ASOCIADO</span><h4 data-cell="resource">${U.emphasize(r.resource)}</h4><span class="connection-book">${safe(r.collection)}</span><dl>${['learning','lesson','topic','digitalPage'].map(f=>`<div class="${f==='lesson'||f==='topic'?'connection-detail-wide':''}"><dt>${labels[f]}</dt><dd data-cell="${f}">${U.emphasize(r[f])}</dd></div>`).join('')}</dl><div class="connection-card-actions"><button type="button" class="text-button" data-connection-route="${r.id}">Ver la ruta de acceso →</button><a href="${reference(r)}" target="_blank" rel="noopener noreferrer" aria-label="Ver fila de ${safe(r.resource)} en la página ${r.sourcePage} de la malla">Ver fila en la malla ↗</a></div></article>`;
 }
 function renderTable(rows){
  return `<div class="connection-table-scroll" tabindex="0" role="region" aria-label="Tabla completa de conexiones curriculares"><table class="connection-table"><caption>Conexión curricular ${state.level==='primaria'?'Compartir - CREO Primaria':'Competencias - CREO · Secundaria'}</caption><thead><tr>${fields.map(f=>`<th scope="col">${labels[f]}</th>`).join('')}<th scope="col">Referencia</th></tr></thead><tbody>${rows.map(r=>`<tr data-connection-id="${r.id}">${fields.map(f=>`<td data-cell="${f}">${U.emphasize(r[f])}</td>`).join('')}<td><span>${safe(r.collection)}</span><a href="${reference(r)}" target="_blank" rel="noopener noreferrer">Malla · página ${r.sourcePage} ↗</a><button type="button" class="text-button" data-connection-route="${r.id}">Ver ruta de acceso →</button></td></tr>`).join('')}</tbody></table></div>`;
 }
 function renderRows(){
  const matches=filterRows(),pages=Math.max(1,Math.ceil(matches.length/size));state.page=Math.min(state.page,pages-1);
  const start=state.all?0:state.page*size,rows=state.all?matches:matches.slice(start,start+size);
  $('connection-count').textContent=matches.length?`${start+1}–${start+rows.length} de ${matches.length} conexiones · ${sourceRows().length} en la malla de ${state.level==='primaria'?'Primaria':'Secundaria'}`:`No encontramos conexiones con esos filtros · ${sourceRows().length} disponibles en esta malla`;
  $('connection-records').className=state.view==='cards'?'connection-cards':'';
  $('connection-records').innerHTML=!rows.length?'<div class="connection-empty"><h4>No hay coincidencias con esta combinación.</h4><p>Prueba otro grado, área, bimestre o término de búsqueda.</p><button type="button" class="button button-outline" data-connection-clear>Mostrar toda la malla</button></div>':state.view==='cards'?rows.map(renderCard).join(''):renderTable(rows);
  $('connection-page-label').textContent=state.all?`${matches.length} conexiones desplegadas`:`Página ${state.page+1} de ${pages}`;
  $('connection-previous').disabled=state.all||state.page===0;
  $('connection-next').disabled=state.all||state.page===pages-1;
  $('connection-show-all').textContent=state.all?'Volver a la vista por páginas':'Ver todas las coincidencias';
  $('connection-show-all').setAttribute('aria-pressed',String(state.all));
  document.querySelectorAll('[data-connection-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.connectionView===state.view)));
  U.publishHeight();
 }
 function contentImage(n){
  const m=CREO_CONNECTION_MEDIA[n],[x,y,right,bottom]=m.crop,w=right-x,h=bottom-y;
  return `<figure class="connection-media" data-connection-image="${n}"><a href="creo-imagen.html?set=conexiones&id=${n}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar ejemplo: ${safe(m.caption)}"><div class="crop-window" style="aspect-ratio:${w}/${h}"><img src="${m.src}" width="${m.width}" height="${m.height}" loading="lazy" alt="${safe(m.caption)}" style="width:${m.width/w*100}%;left:${-x/w*100}%;top:${-y/h*100}%"></div><span class="expand-image" aria-hidden="true">↗</span></a><figcaption>Ejemplo de navegación · ${safe(m.caption)}</figcaption></figure>`;
 }
 function renderGuide(){
  const example=state.selected||C.primary.find(r=>r.grade==='1'&&r.lesson==='Los meses del año');
  $('connection-context').hidden=!example;
  if(example)$('connection-context').innerHTML=`<span class="small-label">${state.selected?'CONEXIÓN QUE ESTÁS CONSULTANDO':'EJEMPLO UTILIZADO EN EL DOCUMENTO'}</span><h4>${safe(example.resource)}</h4><p>Colección: <strong>${safe(example.collection)}</strong></p><p><strong>${safe(example.area)} · ${example.grade}° · Bimestre ${safe(example.bimester)}</strong> · AN ${safe(example.learning)}</p><p>Lección: <strong>${safe(example.lesson)}</strong><br>Tema articulador: <strong>${safe(example.topic)}</strong><br>Página del libro digital: <strong>${safe(example.digitalPage)}</strong></p>`;
  $('connection-guide-steps').innerHTML=C.guide.map((s,i)=>`<button type="button" data-connection-step="${i}" aria-pressed="${!state.allSteps&&i===state.step}" aria-controls="connection-step-${i}"><span>${String(i+1).padStart(2,'0')}</span>${safe(s.title)}</button>`).join('');
  $('connection-guide-content').innerHTML=C.guide.map((s,i)=>`<article class="connection-instruction" id="connection-step-${i}"${!state.allSteps&&i!==state.step?' hidden':''}><div class="connection-instruction-copy"><span class="small-label">PASO ${String(i+1).padStart(2,'0')} / 08</span><h4>${safe(s.title)}</h4><p data-connection-instruction="${s.id}">${U.emphasize(s.text)}</p></div><div class="connection-example-images">${s.images.map(contentImage).join('')}</div></article>`).join('');
  $('connection-guide-all').textContent=state.allSteps?'Ver un paso a la vez':'Ver todos los pasos';
  $('connection-guide-all').setAttribute('aria-pressed',String(state.allSteps));
  $('connection-guide-previous').disabled=state.allSteps||state.step===0;
  $('connection-guide-next').disabled=state.allSteps||state.step===C.guide.length-1;
  $('connection-guide-position').textContent=state.allSteps?'Los ocho pasos están desplegados':`${state.step+1} de 8`;
  U.publishHeight();
 }
 function setMode(mode){
  if(!['primaria','secundaria','manejo'].includes(mode))return;
  state.mode=mode;
  if(mode!=='manejo'&&state.level!==mode){state.level=mode;state.grade=mode==='primaria'?'1':'6';state.area='';state.bimester='';state.collection='';state.query='';state.page=0;state.all=false;setupFilters();}
  $('connection-browser').hidden=mode==='manejo';$('connection-guide').hidden=mode!=='manejo';
  document.querySelectorAll('[data-connection-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.connectionMode===mode)));
  mode==='manejo'?renderGuide():renderRows();
 }
 function clear(){state.grade='all';state.area='';state.bimester='';state.collection='';state.query='';state.page=0;setupFilters();renderRows();}
 setupFilters();renderRows();renderGuide();
 $('connection-area').onchange=event=>{state.area=event.target.value;state.page=0;renderRows();};
 $('connection-bimester').onchange=event=>{state.bimester=event.target.value;state.page=0;renderRows();};
 $('connection-collection').onchange=event=>{state.collection=event.target.value;state.page=0;renderRows();};
 $('connection-search').oninput=event=>{state.query=event.target.value;state.page=0;renderRows();};
 $('connection-clear').onclick=clear;
 $('connection-previous').onclick=()=>{if(state.page>0){state.page--;renderRows();}};
 $('connection-next').onclick=()=>{state.page++;renderRows();};
 $('connection-show-all').onclick=()=>{state.all=!state.all;state.page=0;renderRows();};
 $('connection-guide-all').onclick=()=>{state.allSteps=!state.allSteps;renderGuide();};
 $('connection-guide-previous').onclick=()=>{if(state.step>0){state.step--;renderGuide();}};
 $('connection-guide-next').onclick=()=>{if(state.step<C.guide.length-1){state.step++;renderGuide();}};
 $('connection-back-to-grid').onclick=()=>setMode(state.level);
 document.addEventListener('click',event=>{
  const guideLink=event.target.closest('[data-connection-guide]');
  if(guideLink){event.preventDefault();event.stopPropagation();setMode('manejo');history.replaceState(null,'','#conexiones');requestAnimationFrame(()=>U.scrollTo($('conexiones')));return;}
  const mode=event.target.closest('[data-connection-mode]');if(mode){setMode(mode.dataset.connectionMode);return;}
  const grade=event.target.closest('[data-connection-grade]');if(grade){state.grade=grade.dataset.connectionGrade;state.page=0;renderGrades();renderRows();document.querySelector(`[data-connection-grade="${state.grade}"]`)?.focus({preventScroll:true});return;}
  const view=event.target.closest('[data-connection-view]');if(view){state.view=view.dataset.connectionView;renderRows();return;}
  const step=event.target.closest('[data-connection-step]');if(step){state.step=Number(step.dataset.connectionStep);state.allSteps=false;renderGuide();document.querySelector(`[data-connection-step="${state.step}"]`)?.focus({preventScroll:true});return;}
  const route=event.target.closest('[data-connection-route]');if(route){state.selected=allRows.get(route.dataset.connectionRoute);state.step=0;state.allSteps=false;setMode('manejo');requestAnimationFrame(()=>U.scrollTo($('conexiones')));return;}
  if(event.target.closest('[data-connection-clear]'))clear();
 },true);
})();
