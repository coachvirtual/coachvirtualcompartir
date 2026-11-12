(() => {
 'use strict';
 const $ = id => document.getElementById(id);
 let active = -1;
 let expanded = false;
 const guideAnchors = [['catequesis','catequesis'],['celebrar-comunidad','ensenar','libro'],['religion','plan-lector'],['servicio','comunidades','retiros','itinerarios'],['voz','escuela-familias','celebrar-familia','quince-minutos']];
 const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
 const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const buttons = CREO_PILLARS.map((p,i) => {
  const button = document.createElement('button');
  button.className = 'pillar';
  button.type = 'button';
  button.style.setProperty('--accent',p.color);
  button.setAttribute('aria-controls','resources');
  button.innerHTML = `<img src="assets/creo/pilar-${i+1}.webp" alt="" width="315" height="474"><span><b>0${i+1}</b>${escape(p.title)}</span>`;
  button.onclick = () => { active=i; $('resource-search').value=''; render(); };
  $('pillars').append(button);
  return button;
 });
 function render() {
  const pillar = CREO_PILLARS[active] || CREO_PILLARS[0];
  const query = normalize($('resource-search').value.trim());
  buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(!query && i===active)));
  $('all-resources').setAttribute('aria-pressed',String(!query && active===-1));
  document.querySelector('.resource-heading').style.setProperty('--accent',pillar.color);
  $('pillar-count').textContent = query || active===-1 ? 'EXPLORA LOS CINCO PILARES' : `PILAR 0${active+1} / 05`;
  $('pillar-title').textContent = query ? 'Resultados de tu búsqueda' : active===-1 ? 'Los quince recursos, en un solo lugar' : pillar.title;
  $('pillar-intro').textContent = query ? 'Busca por nombre, tema o tipo de recurso en esta vista resumida.' : active===-1 ? 'Filtra por un pilar, despliega las fichas o abre la guía completa para seguir todo el paso a paso.' : pillar.intro;
  const rows = (query || active===-1 ? CREO_PILLARS : [pillar]).flatMap(p=>p.resources.map((r,i)=>({p,r,anchor:guideAnchors[CREO_PILLARS.indexOf(p)][i]}))).filter(({p,r})=>!query || normalize(p.title+' '+r.join(' ')).includes(query));
  $('result-count').textContent = `${rows.length} de 15 propuestas · ${expanded?'Fichas desplegadas':'Detalles dentro de cada ficha'}`;
  $('resources').innerHTML = rows.length ? rows.map(({p,r,anchor})=>`<article class="resource" style="--accent:${p.color}"><div class="resource-top"><span class="tag">${escape(query || active===-1?p.short+' · '+r[1]:r[1])}</span><h4>${escape(r[0])}</h4><p>${escape(r[2])}</p></div><details${expanded?' open':''}><summary>Qué encontrarás y cómo usarlo</summary><div class="resource-detail"><h5>Dentro del recurso</h5><p>${escape(r[3])}</p><div class="route">${escape(r[5])}</div><p>En EDI: Compartir Conocimientos → CREO Contenidos Globales → ${escape(p.title)} → ${escape(r[0])}.</p><figure><a href="assets/creo/image${r[4]}.webp" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura de ${escape(r[0])}"><img src="assets/creo/image${r[4]}.webp" loading="lazy" alt="Captura de referencia de ${escape(r[0])} incluida en el documento CREO 2026"></a><figcaption>Captura del documento · Selecciona la imagen para ampliarla.</figcaption></figure><a class="guide-resource-link" href="creo-guia.html?v=20261112-completa#${anchor}">Ver el paso a paso completo de este recurso ↗</a></div></details></article>`).join('') : '<p class="empty">No encontramos propuestas con ese término. Prueba con «lectura», «familia» o «catequesis».</p>';
  $('expand-resources').textContent = expanded ? 'Plegar todas las fichas' : 'Desplegar todas las fichas';
  $('expand-resources').setAttribute('aria-expanded',String(expanded));
 }
 $('all-resources').onclick = () => {active=-1;$('resource-search').value='';render();};
 $('expand-resources').onclick = () => {
  expanded = !expanded;
  document.querySelectorAll('.resource details').forEach(details=>{details.open=expanded;});
  $('expand-resources').textContent = expanded ? 'Plegar todas las fichas' : 'Desplegar todas las fichas';
  $('expand-resources').setAttribute('aria-expanded',String(expanded));
  $('result-count').textContent = `${document.querySelectorAll('.resource').length} de 15 propuestas · ${expanded?'Fichas desplegadas':'Detalles dentro de cada ficha'}`;
 };
 $('resource-search').addEventListener('input',render);
 render();
 let pending = false;
 const publish = () => {
  if (parent===window || pending) return;
  pending=true;
  requestAnimationFrame(()=>{pending=false;parent.postMessage({type:'compartir-fe-height',height:document.body.offsetHeight},location.origin);});
 };
 new ResizeObserver(publish).observe(document.body);
 addEventListener('load',publish);
 document.fonts.ready.then(publish);
 document.addEventListener('click',event=>{
  if (parent===window) return;
  const link=event.target.closest('a[href^="#"]');
  if (!link) return;
  const target=document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  parent.postMessage({type:'compartir-fe-scroll',top:target.getBoundingClientRect().top+scrollY},location.origin);
 });
 if (parent!==window) document.fonts.ready.then(()=>requestAnimationFrame(()=>{
  publish();
  requestAnimationFrame(()=>parent.postMessage({type:'compartir-fe-scroll',top:0},location.origin));
 }));
})();
