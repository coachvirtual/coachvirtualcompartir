(() => {
 'use strict';
 const C=CREO_CONNECTIONS,U=window.CreoUI,$=id=>document.getElementById(id),safe=U.escape;
 const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const state={mode:'all',level:'all',grade:'all',area:'',bimester:'',collection:'',query:'',browse:'all',step:0,allSteps:true,selected:null};
 const fields=['area','grade','bimester','learning','lesson','topic','resource','digitalPage'];
 const labels={area:'Área',grade:'Grado',bimester:'Bimestre',learning:'Aprendizaje nuclear',lesson:'Lección',topic:'Tema articulador',resource:'Recurso asociado',digitalPage:'Página del libro digital'};
 const sourceRows=()=>state.level==='all'?[...C.primary,...C.secondary]:state.level==='primaria'?C.primary:C.secondary;
 const allRows=new Map([...C.primary,...C.secondary].map(r=>[r.id,r]));
 const ordered=values=>[...new Set(values)].sort((a,b)=>String(a).localeCompare(String(b),'es',{numeric:true}));
 const searchingAll=()=>state.level==='all';
 const queryRows=sourceRows;
 const searchIndex=new Map([...C.primary,...C.secondary].map(r=>[r.id,normalize([...fields.map(f=>r[f]),r.collection,r.level==='primaria'?'Primaria':'Secundaria'].join(' '))]));
 function filterRows(){
  const words=normalize(state.query.trim()).split(/\s+/).filter(Boolean);
  return queryRows().filter(r=>(state.grade==='all'||r.grade===state.grade)&&(!state.area||r.area===state.area)&&(!state.bimester||r.bimester===state.bimester)&&(!state.collection||r.collection===state.collection)&&words.every(word=>searchIndex.get(r.id).includes(word)));
 }
 function fillSelect(id,values,allLabel,value){
  const el=$(id);el.replaceChildren(new Option(allLabel,''),...values.map(v=>new Option(v,v)));el.value=value;
 }
 function renderGrades(){
  $('connection-grades').innerHTML=[['all','Todos los grados'],...ordered(queryRows().map(r=>r.grade)).map(g=>[g,`${g}°`])].map(([value,label])=>`<button type="button" data-connection-grade="${value}" aria-pressed="${state.grade===value}">${label}</button>`).join('');
 }
 function setupFilters(){
  const primary=state.level==='primaria';
  $('connection-level-title').textContent=state.level==='all'?'Conexiones curriculares · Primaria y Secundaria':primary?'Conexiones Compartir · CREO Primaria':'Conexiones PDC y PAR · CREO Secundaria';
  renderGrades();
  fillSelect('connection-area',ordered(queryRows().map(r=>r.area)),'Todas',state.area);
  fillSelect('connection-bimester',ordered(queryRows().map(r=>r.bimester)),'Todos',state.bimester);
  fillSelect('connection-collection',ordered(queryRows().map(r=>r.collection)),'Todas las colecciones',state.collection);
  $('connection-collection-label').hidden=primary&&!searchingAll();
  $('connection-search').value=state.query;
 }
 function renderTable(rows){
  const cell=(r,f)=>{
   if(f==='resource')return `<td><span class="connection-resource-title" data-cell="resource">${safe(r.resource)}</span>${r.level==='secundaria'?`<small class="connection-row-collection">${safe(r.collection)}</small>`:''}<div class="connection-row-links"><button type="button" class="text-button" data-connection-route="${r.id}" aria-label="Ver ruta de acceso: ${safe(r.resource)}">Ruta</button></div></td>`;
   if(f==='area')return `<td><span data-cell="area">${safe(r.area)}</span>${searchingAll()?`<small class="connection-row-level">${r.level==='primaria'?'Primaria':'Secundaria'}</small>`:''}</td>`;
   return `<td data-cell="${f}">${safe(r[f])}</td>`;
  };
  return `<p class="connection-scroll-hint">Desliza la tabla hacia los lados para ver todas las columnas ↔</p><div class="connection-table-scroll" tabindex="0" role="region" aria-label="Tabla de conexiones curriculares, con desplazamiento horizontal"><table class="connection-table"><caption>${searchingAll()?'Conexiones curriculares · Primaria y Secundaria':`Conexión curricular ${state.level==='primaria'?'Compartir · CREO Primaria':'PDC y PAR · CREO Secundaria'}`}</caption><colgroup>${fields.map(f=>`<col class="connection-col-${f}">`).join('')}</colgroup><thead><tr>${fields.map(f=>`<th scope="col">${labels[f]}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr data-connection-id="${r.id}">${fields.map(f=>cell(r,f)).join('')}</tr>`).join('')}</tbody></table></div>`;
 }
 function renderRows(){
  const rows=filterRows();
  $('connection-count').textContent=rows.length?rows.length+' de '+queryRows().length+' conexiones':'No encontramos conexiones con esos filtros';
  $('connection-records').innerHTML=rows.length?renderTable(rows):'<div class="connection-empty"><h4>No hay coincidencias con esta combinación.</h4><p>Prueba otro grado, área, bimestre o término de búsqueda.</p><button type="button" class="button button-outline" data-connection-clear>Limpiar filtros</button></div>';
  $('connection-filter-panel').hidden=state.browse!=='filters';
  $('connection-clear').hidden=state.browse!=='filters';
  document.querySelectorAll('[data-connection-browse]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.connectionBrowse===state.browse)));
  U.publishHeight();
 }
 function contentImage(n){
  const m=CREO_CONNECTION_MEDIA[n],[x,y,right,bottom]=m.crop,w=right-x,h=bottom-y;
  return `<figure class="connection-media" data-connection-image="${n}"><a href="creo-imagen.html?set=conexiones&id=${n}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar ejemplo: ${safe(m.caption)}"><div class="crop-window" style="aspect-ratio:${w}/${h}"><img src="${m.src}" width="${m.width}" height="${m.height}" loading="lazy" alt="${safe(m.caption)}" style="width:${m.width/w*100}%;left:${-x/w*100}%;top:${-y/h*100}%"></div><span class="expand-image" aria-hidden="true">↗</span></a><figcaption>Ejemplo de navegación · ${safe(m.caption)}</figcaption></figure>`;
 }
 function renderGuide(){
  const example=state.selected||C.primary.find(r=>r.grade==='1'&&r.lesson==='Los meses del año');
  $('connection-context').hidden=!example;
  if(example)$('connection-context').innerHTML=`<span class="small-label">${state.selected?'CONEXIÓN QUE ESTÁS CONSULTANDO':'EJEMPLO DE CONEXIÓN'}</span><h4>${safe(example.resource)}</h4><p>Colección: <strong>${safe(example.collection)}</strong></p><p><strong>${safe(example.area)} · ${example.grade}° · Bimestre ${safe(example.bimester)}</strong> · AN ${safe(example.learning)}</p><p>Lección: <strong>${safe(example.lesson)}</strong><br>Tema articulador: <strong>${safe(example.topic)}</strong><br>Página del libro digital: <strong>${safe(example.digitalPage)}</strong></p>`;
  $('connection-guide-steps').innerHTML=C.guide.map((s,i)=>`<button type="button" data-connection-step="${i}" aria-pressed="${i===state.step}" aria-controls="connection-step-${i}"><span>${String(i+1).padStart(2,'0')}</span>${safe(s.title)}</button>`).join('');
  $('connection-guide-content').innerHTML=C.guide.map((s,i)=>`<article class="connection-instruction" id="connection-step-${i}"${!state.allSteps&&i!==state.step?' hidden':''}><div class="connection-instruction-copy"><span class="small-label">PASO ${String(i+1).padStart(2,'0')} / 08</span><h4>${safe(s.title)}</h4><p data-connection-instruction="${s.id}">${U.emphasize(s.text)}</p></div><div class="connection-example-images">${s.images.map(contentImage).join('')}</div></article>`).join('');
  $('connection-guide-all').textContent='Volver a la malla ↑';
  $('connection-guide-all').removeAttribute('aria-pressed');
  $('connection-guide-previous').disabled=state.allSteps||state.step===0;
  $('connection-guide-next').disabled=state.allSteps||state.step===C.guide.length-1;
  $('connection-guide-position').textContent=state.allSteps?'Los ocho pasos están desplegados':`${state.step+1} de 8`;
  U.publishHeight();
 }
 function setMode(mode){
  if(mode==='manejo'){state.mode=mode;renderGuide();}
  else {state.mode=state.level;renderRows();}
 }
 function clear(){state.grade='all';state.area='';state.bimester='';state.collection='';state.query='';setupFilters();renderRows();}
 // The compact curriculum board is the first stop; the complete guide follows below.
 $('connection-guide').hidden=false;
 setupFilters();renderRows();renderGuide();
 $('connection-area').onchange=event=>{state.area=event.target.value;renderRows();};
 $('connection-bimester').onchange=event=>{state.bimester=event.target.value;renderRows();};
 $('connection-collection').onchange=event=>{state.collection=event.target.value;renderRows();};
 function updateSearchFilters(){
  const rows=queryRows();
  for(const field of ['grade','area','bimester','collection'])if(state[field]&&state[field]!=='all'&&!rows.some(r=>r[field]===state[field]))state[field]=field==='grade'?'all':'';
  setupFilters();renderRows();
 }
 $('connection-search').oninput=event=>{state.query=event.target.value;updateSearchFilters();};
 $('connection-level').onchange=event=>{state.level=event.target.value;clear();};
 $('connection-clear').onclick=clear;
 $('connection-guide-all').onclick=()=>U.scrollTo($('connection-browser'));
 $('connection-guide-previous').onclick=()=>{if(state.step>0){state.step--;renderGuide();}};
 $('connection-guide-next').onclick=()=>{if(state.step<C.guide.length-1){state.step++;renderGuide();}};
 $('connection-back-to-grid').onclick=()=>{setMode(state.level);U.scrollTo($('connection-browser'));};
 document.addEventListener('click',event=>{
  const guideLink=event.target.closest('[data-connection-guide]');
  if(guideLink){event.preventDefault();event.stopPropagation();setMode('manejo');history.replaceState(null,'','#conexiones');requestAnimationFrame(()=>U.scrollTo($('conexiones')));return;}
  const grade=event.target.closest('[data-connection-grade]');if(grade){state.grade=grade.dataset.connectionGrade;renderGrades();renderRows();document.querySelector(`[data-connection-grade="${state.grade}"]`)?.focus({preventScroll:true});return;}
  const browse=event.target.closest('[data-connection-browse]');if(browse){state.browse=browse.dataset.connectionBrowse;if(state.browse==='all'){state.level='all';$('connection-level').value='all';clear();}else renderRows();return;}
  const step=event.target.closest('[data-connection-step]');if(step){state.step=Number(step.dataset.connectionStep);U.scrollTo($('connection-step-'+state.step));return;}
  const route=event.target.closest('[data-connection-route]');if(route){state.selected=allRows.get(route.dataset.connectionRoute);state.step=0;state.allSteps=true;setMode('manejo');requestAnimationFrame(()=>U.scrollTo($('connection-guide')));return;}
  if(event.target.closest('[data-connection-clear]'))clear();
 },true);
 if(new URLSearchParams(location.search).get('modo')==='manejo')setMode('manejo');
})();
