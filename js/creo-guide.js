(() => {
 'use strict';
 if (parent === window) return;
 let pending = false;
 const publish = () => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
   pending = false;
   parent.postMessage({type:'compartir-fe-height',height:document.body.offsetHeight},location.origin);
  });
 };
 new ResizeObserver(publish).observe(document.body);
 window.addEventListener('load',publish);
 document.fonts.ready.then(publish);
 // Keep navigation in the host scroll area, including deep links from a card.
 const scrollTo = target => parent.postMessage({type:'compartir-fe-scroll',top:target?target.getBoundingClientRect().top+scrollY:0},location.origin);
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  const target=link && document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  history.replaceState(null,'',link.hash);
  scrollTo(target);
 });
 document.fonts.ready.then(()=>requestAnimationFrame(()=>{
  publish();
  requestAnimationFrame(()=>scrollTo(document.getElementById(location.hash.slice(1))));
 }));
})();
