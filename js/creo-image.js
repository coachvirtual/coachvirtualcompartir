(() => {
 'use strict';
 const params=new URLSearchParams(location.search),n=Number(params.get('id')),m=params.get('set')==='conexiones'?CREO_CONNECTION_MEDIA[n]:CREO_MEDIA[n];
 const viewer=document.getElementById('image-viewer');
 if(!m){viewer.textContent='Selecciona una imagen desde los recursos de CREO.';return;}
 const [x,y,right,bottom]=m.crop,w=right-x,h=bottom-y;
 const title=document.createElement('h1');title.textContent=m.caption;viewer.append(title);
 const windowEl=document.createElement('div');windowEl.className='crop-window';windowEl.style.aspectRatio=`${w}/${h}`;
 const image=document.createElement('img');image.src=m.src;image.alt=m.caption;image.width=m.width;image.height=m.height;
 Object.assign(image.style,{width:`${m.width/w*100}%`,left:`${-x/w*100}%`,top:`${-y/h*100}%`});
 windowEl.append(image);viewer.append(windowEl);
 const connections=params.get('set')==='conexiones';
 const note=document.createElement('p');note.textContent=connections?'Contenido de referencia · Conexiones curriculares CREO 2026':'Contenido de referencia · Recursos Globales CREO 2026';viewer.append(note);
 if(connections)document.querySelector('.image-back').href='creo.html?v=20261112-conexiones-integras#conexiones';
})();
