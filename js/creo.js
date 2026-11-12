(() => {
 'use strict';
 const $ = id => document.getElementById(id);
 let active = 0;
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
  const pillar = CREO_PILLARS[active];
  const query = normalize($('resource-search').value.trim());
  buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(!query && i===active)));
  document.querySelector('.resource-heading').style.setProperty('--accent',pillar.color);
  $('pillar-count').textContent = query ? 'EXPLORA LOS CINCO PILARES' : `PILAR 0${active+1} / 05`;
  $('pillar-title').textContent = query ? 'Resultados de tu búsqueda' : pillar.title;
  $('pillar-intro').textContent = query ? 'Busca por nombre, tema o tipo de recurso en toda la guía.' : pillar.intro;
  const rows = (query ? CREO_PILLARS : [pillar]).flatMap(p=>p.resources.map(r=>({p,r}))).filter(({p,r})=>!query || normalize(p.title+' '+r.join(' ')).includes(query));
  $('result-count').textContent = `${rows.length} ${rows.length===1?'propuesta disponible':'propuestas disponibles'}${query?' en los cinco pilares':''}`;
  $('resources').innerHTML = rows.length ? rows.map(({p,r})=>`<article class="resource" style="--accent:${p.color}"><div class="resource-top"><span class="tag">${escape(query?p.short+' · '+r[1]:r[1])}</span><h4>${escape(r[0])}</h4><p>${escape(r[2])}</p></div><details><summary>Qué encontrarás y cómo usarlo</summary><div class="resource-detail"><h5>Dentro del recurso</h5><p>${escape(r[3])}</p><div class="route">${escape(r[5])}</div><p>En EDI: Compartir Conocimientos → CREO Contenidos Globales → ${escape(p.title)} → ${escape(r[0])}.</p><figure><a href="assets/creo/image${r[4]}.webp" target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura de ${escape(r[0])}"><img src="assets/creo/image${r[4]}.webp" loading="lazy" alt="Captura de referencia de ${escape(r[0])} incluida en el documento CREO 2026"></a><figcaption>Captura del documento · Selecciona la imagen para ampliarla.</figcaption></figure></div></details></article>`).join('') : '<p class="empty">No encontramos propuestas con ese término. Prueba con «lectura», «familia» o «catequesis».</p>';
 }
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
})();
