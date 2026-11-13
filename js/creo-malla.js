(() => {
 'use strict';
 const params=new URLSearchParams(location.search),level=params.get('level')==='secundaria'?'secundaria':'primaria';
 const pages=CREO_CONNECTIONS.pages[level],rows=level==='primaria'?CREO_CONNECTIONS.primary:CREO_CONNECTIONS.secondary;
 const selected=rows.find(r=>r.id===params.get('row'));
 let current=Math.max(1,Math.min(pages.length,Number(params.get('page'))||selected?.sourcePage||1));
 const $=id=>document.getElementById(id);
 $('malla-title').textContent=level==='primaria'?'Conexión curricular Compartir - CREO Primaria':'Conexión curricular PDC y PAR - CREO Secundaria';
 $('malla-page-select').replaceChildren(...pages.map(p=>new Option(`${p.page} de ${pages.length}`,String(p.page))));
 function render(){
  const p=pages[current-1],image=$('malla-image');image.src=p.src;image.width=p.width;image.height=p.height;image.alt=`Malla completa de ${level==='primaria'?'Primaria':'Secundaria'}, página ${current} de ${pages.length}`;
  $('malla-page-select').value=String(current);$('malla-previous').disabled=current===1;$('malla-next').disabled=current===pages.length;
  $('malla-caption').textContent=selected&&selected.sourcePage===current?`${selected.area} · Grado ${selected.grade}° · ${selected.resource}`:`Página ${current} de ${pages.length} · Documento completo`;
  const mark=$('malla-row-highlight');mark.hidden=!selected||selected.sourcePage!==current;
  if(!mark.hidden){const [x0,y0,x1,y1]=selected.rect;Object.assign(mark.style,{left:`${x0/p.width*100}%`,top:`${y0/p.height*100}%`,width:`${(x1-x0)/p.width*100}%`,height:`${(y1-y0)/p.height*100}%`});}
  history.replaceState(null,'',`?level=${level}&page=${current}${selected?'&row='+encodeURIComponent(selected.id):''}`);
 }
 $('malla-page-select').onchange=event=>{current=Number(event.target.value);render();};
 $('malla-previous').onclick=()=>{if(current>1){current--;render();}};
 $('malla-next').onclick=()=>{if(current<pages.length){current++;render();}};
 $('malla-zoom').onchange=event=>{$('malla-sheet').style.width=event.target.value+'%';};
 render();
})();
