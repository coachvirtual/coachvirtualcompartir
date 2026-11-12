(() => {
 'use strict';
 const $=id=>document.getElementById(id), data=CREO_CONTENT;
 const safe=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const keyPhrases=['Educación Religiosa Escolar','Proyectos de Aprendizaje y Servicio Solidario','Aprendizaje y Servicio Solidario','Pacto Educativo Global','Itinerarios de Vida Cristiana','Comunidades Infantiles y Juveniles','Convivencias y Retiros','Quince minutos en familia','Compartir Conocimientos','Creo Contenidos Globales','La voz de la experiencia','Escuela de familias','Celebrar en familia','Celebrar en comunidad','Enseñar en la escuela católica','Un libro para todos','Plan Lector CREO','Palabra de Dios','palabra de Dios','vida cristiana','formación Presacramental','comunidad educativa','escuela católica','identidad','valores cristianos','participación activa','preescolar','primaria','bachillerato','secundaria','Navidad','Pascua','Día de la familia','Día del maestro','Día de la infancia','virgen María','cultura del encuentro','esperanza y compromiso social','cuidado de la casa común','humanización del uso de la tecnología','preguntas esenciales','preguntas escenciales','perfil de maestro','ícono de la nube','índice de navegación','rangos de edad','minuto a minuto','cuatro períodos','crianza','vínculo familiar','lectura en familia','proyecto','planificación','ejecución','evaluación','celebración','experimentar','comprender','discernir','poner manos a la obra','conocer','celebrar','vivir','comunión','confirmación','Evangelio','Jesús','pastoral','docentes','familias','metas','objetivos','reflexión','guías','descargables','contenidos interactivos','recursos interactivos','vídeos','vídeo','vídeos cortos','temáticas','temas','tema','tres pasos','paso a paso','instrucciones sencillas','lecciones','pertinencia','guía','lectura','etapas','introducción','CREO','EDI','contenido'];
 const keyPattern=new RegExp(`(?<![\\p{L}\\p{N}])(?:${[...new Set(keyPhrases)].sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')})(?![\\p{L}\\p{N}])`,'giu');
 function emphasize(text){
  let html='',cursor=0,count=0;const used=new Set();
  for(const match of text.matchAll(keyPattern)){
   const key=normalize(match[0]);if(used.has(key))continue;
   html+=safe(text.slice(cursor,match.index))+`<strong>${safe(match[0])}</strong>`;
   cursor=match.index+match[0].length;used.add(key);if(++count===4)break;
  }
  return html+safe(text.slice(cursor));
 }
 const source=(p,tag='p')=>`<${tag} class="source-text${p.id===40?' source-subheading':''}" data-source-id="${p.id}">${emphasize(p.text)}</${tag}>`;
 let chapterIndex=0,showAll=false;
 const initialHash=location.hash.slice(1);
 const resourceIndex=data.chapters.map(()=>0), stepIndex=new Map(), galleryIndex=new Map(), expandedSteps=new Set();
 const choices=c=>c.resources.reduce((sum,r)=>sum+(r.choices?.length||1),0);
 const sourceIndex=new Map();
 function indexParagraphs(paragraphs,location){paragraphs?.forEach(p=>sourceIndex.set(p.id,{...p,...location}));}
 [data.title,data.introduction,...data.overview].forEach(p=>sourceIndex.set(p.id,{...p,section:'explorar'}));
 indexParagraphs(data.access,{section:'acceso'});
 data.chapters.forEach((c,ci)=>{
  indexParagraphs([c.title,...c.intro,...(c.topics||[])],{ci});
  c.resources.forEach((r,ri)=>{
   indexParagraphs([...r.paragraphs,...r.topics],{ci,ri});
   r.steps.forEach((s,si)=>indexParagraphs(s.paragraphs,{ci,ri,si}));
  });
 });
 function crop(n){
  const m=CREO_MEDIA[n],[x,y,right,bottom]=m.crop,w=right-x,h=bottom-y;
  return `<div class="crop-window" style="aspect-ratio:${w}/${h}"><img src="${m.src}" alt="${safe(m.caption)}" width="${m.width}" height="${m.height}" loading="lazy" style="width:${m.width/w*100}%;left:${-x/w*100}%;top:${-y/h*100}%"></div>`;
 }
 function gallery(images,key){
  if(!images.length)return '';
  const selected=galleryIndex.get(key)||0;
  return `<div class="gallery${showAll?' gallery-all':''}" data-gallery="${key}">${images.map((n,i)=>`<figure class="media" data-image-id="${n}"${!showAll&&selected!==i?' hidden':''}><a href="creo-imagen.html?id=${n}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar: ${safe(CREO_MEDIA[n].caption)}">${crop(n)}<span class="expand-image" aria-hidden="true">↗</span></a><figcaption>${safe(CREO_MEDIA[n].caption)}</figcaption></figure>`).join('')}${images.length>1&&!showAll?`<div class="gallery-controls" aria-label="Elegir una imagen de ejemplo">${images.map((n,i)=>`<button type="button" data-gallery-key="${key}" data-gallery-index="${i}" aria-pressed="${i===selected}" aria-label="Ver imagen ${i+1}: ${safe(CREO_MEDIA[n].caption)}">${String(i+1).padStart(2,'0')}</button>`).join('')}<span>${selected+1} / ${images.length} · Ejemplos de contenido</span></div>`:''}</div>`;
 }
 function tags(items){return items?.length?`<div class="tags">${items.map(item=>`<span>${safe(item)}</span>`).join('')}</div>`:'';}
 function topics(items){return items?.length?`<ul class="topic-list">${items.map(p=>source(p,'li')).join('')}</ul>`:'';}
 function renderSteps(r){
  if(!r.steps.length)return '';
  const selected=stepIndex.get(r.id)||0;
  const allSteps=showAll||expandedSteps.has(r.id);
  return `<section class="stepper" aria-label="Recorrido de ${safe(r.title)}"><div class="stepper-heading"><div><span class="small-label">UN RECORRIDO PARA PONERLO EN PRÁCTICA</span><h4>Explora cada paso</h4></div><button type="button" class="text-button" data-show-steps="${r.id}" aria-pressed="${allSteps}">${allSteps?'Ver un paso a la vez':'Ver todos los pasos'}</button></div><div class="step-buttons" aria-label="Pasos de ${safe(r.title)}">${r.steps.map((s,i)=>`<button type="button" data-step-resource="${r.id}" data-step-index="${i}" aria-pressed="${selected===i&&!allSteps}" aria-controls="step-${r.id}-${i}"><span>${String(i+1).padStart(2,'0')}</span>${safe(s.title)}</button>`).join('')}</div>${r.steps.map((s,i)=>`<div class="step-panel" id="step-${r.id}-${i}"${!allSteps&&selected!==i?' hidden':''}><div class="step-copy"><span class="step-number">${String(i+1).padStart(2,'0')}</span><h5>${safe(s.title)}</h5>${s.paragraphs.map(p=>source(p)).join('')}</div>${gallery(s.images,`${r.id}-step-${i}`)}</div>`).join('')}${!allSteps?`<div class="step-navigation"><button type="button" class="text-button" data-step-resource="${r.id}" data-step-index="${selected-1}"${selected===0?' disabled':''}>← Paso anterior</button><span>${selected+1} de ${r.steps.length}</span><button type="button" class="text-button" data-step-resource="${r.id}" data-step-index="${selected+1}"${selected===r.steps.length-1?' disabled':''}>Siguiente paso →</button></div>`:''}</section>`;
 }
 function renderResource(r,ci,ri){
  return `<article class="resource-panel" id="resource-${r.id}" aria-labelledby="title-${r.id}"${!showAll&&resourceIndex[ci]!==ri?' hidden':''}><div class="resource-eyebrow"><span>RECURSO ${String(ri+1).padStart(2,'0')}</span><span>COMPARTIR FE · CREO</span></div><h3 id="title-${r.id}" tabindex="-1">${safe(r.title)}</h3>${tags(r.tags||r.choices)}<div class="resource-prose">${r.paragraphs.map(p=>source(p,p.id===40?'h4':'p')).join('')}</div>${topics(r.topics)}${gallery(r.images,r.id)}${renderSteps(r)}</article>`;
 }
 function renderChapter(c,ci){
  return `<section class="chapter" id="${c.id}"${!showAll&&ci!==chapterIndex?' hidden':''}><div class="chapter-heading"><div class="chapter-number">${String(ci+1).padStart(2,'0')}</div><div><p class="eyebrow">PILAR ${String(ci+1).padStart(2,'0')} / 05</p><h2 class="source-text" data-source-id="${c.title.id}">${safe(c.name)}</h2>${c.intro.map(p=>source(p)).join('')}${topics(c.topics)}</div></div><details class="organization"${showAll?' open':''}><summary>Conoce la organización de este pilar <span aria-hidden="true">+</span></summary>${gallery(c.images,`chapter-${ci}`)}</details><div class="resource-layout"><nav class="resource-nav" aria-label="Recursos de ${safe(c.short)}"><span class="small-label">${choices(c)} PROPUESTAS EN ESTE PILAR</span>${c.resources.map((r,ri)=>`<button type="button" data-chapter="${ci}" data-resource="${ri}" aria-pressed="${resourceIndex[ci]===ri}" aria-controls="resource-${r.id}"><span>${String(ri+1).padStart(2,'0')}</span>${safe(r.title)}<b aria-hidden="true">↗</b></button>`).join('')}<a href="#acceso">Cómo acceder desde EDI <span aria-hidden="true">↓</span></a></nav><div class="resource-content">${c.resources.map((r,ri)=>renderResource(r,ci,ri)).join('')}</div></div></section>`;
 }
 function render(){
  $('chapters').classList.toggle('show-all',showAll);
  $('chapters').innerHTML=data.chapters.map(renderChapter).join('');
  document.querySelectorAll('[data-pillar]').forEach((b,i)=>b.setAttribute('aria-pressed',String(!showAll&&i===chapterIndex)));
  $('view-toggle').setAttribute('aria-pressed',String(showAll));
  $('view-toggle').innerHTML=`<span aria-hidden="true">${showAll?'▤':'▦'}</span> ${showAll?'Volver al recorrido por pilares':'Ver todo el contenido'}`;
  $('guide-status').textContent=showAll?'Los cinco pilares, todos sus recursos y todos los pasos están desplegados.':`${data.chapters[chapterIndex].short} · ${choices(data.chapters[chapterIndex])} propuestas · Selecciona un recurso para explorar todo su contenido.`;
  publish();
 }
 function clearSearch(){
  $('guide-search').value='';$('search-results').hidden=true;$('chapters').hidden=false;
 }
 function scrollHost(target){
  if(!target)return;
  if(parent===window)target.scrollIntoView({block:'start',behavior:'instant'});
  else parent.postMessage({type:'compartir-fe-scroll',top:target.getBoundingClientRect().top+scrollY},location.origin);
 }
 function selectSource(id){
  const entry=sourceIndex.get(id);
  clearSearch();
  if(entry.ci!==undefined){chapterIndex=entry.ci;showAll=false;
   if(entry.ri!==undefined){resourceIndex[entry.ci]=entry.ri;if(entry.si!==undefined)stepIndex.set(data.chapters[entry.ci].resources[entry.ri].id,entry.si);}
   render();
  }
  requestAnimationFrame(()=>{const target=document.querySelector(`[data-source-id="${id}"]`);if(target){target.classList.add('search-highlight');scrollHost(target);}});
 }
 function search(){
  const q=normalize($('guide-search').value.trim());
  if(!q){clearSearch();render();return;}
  const matches=[...sourceIndex.values()].filter(p=>normalize(p.text).includes(q));
  $('chapters').hidden=true;$('search-results').hidden=false;
  $('guide-status').textContent=`${matches.length} ${matches.length===1?'coincidencia':'coincidencias'} en todo el contenido de la guía.`;
  $('search-results').innerHTML=matches.length?matches.map(p=>`<button type="button" data-source-result="${p.id}"><span class="small-label">${p.ci===undefined?'ACCESO Y ORGANIZACIÓN':safe(data.chapters[p.ci].short)}${p.ri===undefined?'':' · '+safe(data.chapters[p.ci].resources[p.ri].title)}</span><span>${emphasize(p.text)}</span><b aria-hidden="true">↗</b></button>`).join(''):'<div class="empty-search"><h3>No encontramos ese término.</h3><p>Prueba con «familia», «retiros», «planificación» o el nombre de un recurso.</p><button type="button" class="button button-navy" data-clear-search>Volver a los recursos</button></div>';
  publish();
 }
 $('source-title').innerHTML=source(data.title,'span');
 $('source-introduction').innerHTML=source(data.introduction);
 $('source-overview').innerHTML=data.overview.map(p=>source(p)).join('');
 $('source-access').innerHTML=data.access.map(p=>source(p)).join('');
 $('pillar-selector').innerHTML=data.chapters.map((c,i)=>`<button class="pillar-button" type="button" data-pillar="${i}" aria-pressed="${i===0}" aria-controls="${c.id}"><div class="pillar-photo"><img src="assets/creo/pilar-${c.photo}.webp" alt="" width="315" height="474" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></div><span class="pillar-name">${safe(c.name)}<b aria-hidden="true">↗</b></span></button>`).join('');
 let pending=false;
 function publish(){
  if(parent===window||pending)return;
  pending=true;requestAnimationFrame(()=>{pending=false;parent.postMessage({type:'compartir-fe-height',height:document.body.offsetHeight},location.origin);});
 }
 render();
 $('access-media').innerHTML=gallery(data.accessImages,'access');
 $('guide-search').addEventListener('input',search);
 $('view-toggle').onclick=()=>{showAll=!showAll;clearSearch();render();$('access-media').innerHTML=gallery(data.accessImages,'access');};
 document.addEventListener('click',event=>{
  const pillar=event.target.closest('[data-pillar]');
  if(pillar){chapterIndex=Number(pillar.dataset.pillar);showAll=false;clearSearch();render();history.replaceState(null,'','#'+data.chapters[chapterIndex].id);return;}
  const tutorial=event.target.closest('[data-tutorial-video]');
  if(tutorial){const id=tutorial.dataset.tutorialVideo;if(parent!==window)parent.postMessage({type:'compartir-fe-video',id},location.origin);else window.open(`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`,'_blank','noopener,noreferrer');return;}
  const resource=event.target.closest('[data-resource]');
  if(resource){const ci=Number(resource.dataset.chapter),ri=Number(resource.dataset.resource);if(resourceIndex[ci]===ri)return;resourceIndex[ci]=ri;render();document.querySelector(`[data-chapter="${ci}"][data-resource="${ri}"]`)?.focus({preventScroll:true});return;}
  const step=event.target.closest('[data-step-resource]');
  if(step&&!step.disabled){const id=step.dataset.stepResource;stepIndex.set(id,Number(step.dataset.stepIndex));expandedSteps.delete(id);if(showAll){data.chapters.forEach((c,ci)=>{const ri=c.resources.findIndex(r=>r.id===id);if(ri>=0){chapterIndex=ci;resourceIndex[ci]=ri;}});}showAll=false;render();const focus=document.querySelector(`.step-buttons [data-step-resource="${id}"][data-step-index="${step.dataset.stepIndex}"]`);focus?.focus({preventScroll:true});return;}
  const allSteps=event.target.closest('[data-show-steps]');
  if(allSteps){const id=allSteps.dataset.showSteps;expandedSteps.has(id)?expandedSteps.delete(id):expandedSteps.add(id);render();return;}
  const galleryButton=event.target.closest('[data-gallery-key]');
  if(galleryButton){const key=galleryButton.dataset.galleryKey,index=Number(galleryButton.dataset.galleryIndex);galleryIndex.set(key,index);const current=galleryButton.closest('.gallery');current.querySelectorAll('.media').forEach((figure,i)=>{figure.hidden=i!==index;});current.querySelectorAll('[data-gallery-index]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));current.querySelector('.gallery-controls>span').textContent=`${index+1} / ${current.querySelectorAll('.media').length} · Ejemplos de contenido`;return;}
  const result=event.target.closest('[data-source-result]');if(result){selectSource(Number(result.dataset.sourceResult));return;}
  if(event.target.closest('[data-clear-search]')){clearSearch();render();return;}
  const link=event.target.closest('a[href^="#"]');
  if(link){const target=document.getElementById(link.hash.slice(1));if(target){event.preventDefault();history.replaceState(null,'',link.hash);scrollHost(target);}}
 });
 function restoreHash(){
  const hash=initialHash;
  if(!hash||location.hash.slice(1)!==hash){publish();return;}
  const ci=data.chapters.findIndex(c=>c.id===hash);
  if(ci>=0){chapterIndex=ci;render();}
  else{for(let i=0;i<data.chapters.length;i++){const ri=data.chapters[i].resources.findIndex(r=>r.id===hash||'resource-'+r.id===hash);if(ri>=0){chapterIndex=i;resourceIndex[i]=ri;render();break;}}}
  requestAnimationFrame(()=>{publish();requestAnimationFrame(()=>scrollHost(document.getElementById(hash)||document.getElementById('inicio')));});
 }
 new ResizeObserver(publish).observe(document.body);
 window.addEventListener('load',publish);
 document.fonts.ready.then(restoreHash);
})();
