const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}),root=process.cwd(),results=[],errors=[];
 try{
 for(const [name,width,height] of [['mobile-small',320,740],['ipad',820,1180],['laptop',1366,768]]){
  const context=await browser.newContext({viewport:{width,height},hasTouch:width<1100,reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(name+': '+e.message));
  await page.route('**/*',route=>{
   const url=new URL(route.request().url());if(url.origin!=='http://audit.local')return route.fulfill({body:'',contentType:'application/javascript'});
   const file=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
   if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile())return route.fulfill({status:404,body:''});
   const contentType={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.ttf':'font/ttf'}[path.extname(file)]||'application/octet-stream';
   return route.fulfill({body:fs.readFileSync(file),contentType});
  });
  await page.goto('http://audit.local');await page.evaluate(()=>document.fonts.ready);
  await page.getByRole('button',{name:'Abrir Coach Bot',exact:true}).click();
  const modal=page.locator('#coachbot-modal');
  const last=()=>modal.locator('[data-bot-topic]').last();
  async function ask(question,topic,includes){
   const before=await modal.locator('[data-bot-topic]').count();
   await modal.locator('#chat-input').fill(question);await modal.getByRole('button',{name:'Enviar',exact:true}).click();
   await page.waitForFunction(({before,topic})=>{const els=document.querySelectorAll('#coachbot-modal [data-bot-topic]');return els.length>before&&els[els.length-1].dataset.botTopic===topic;},{before,topic});
   if(includes)assert.match(await last().innerText(),includes);
  }
  await modal.getByRole('button',{name:/Compartir Suplementales/}).click();
  await modal.locator('[data-bot-topic="suplementales_bot"]').waitFor();
  await ask('Compartir Bienestar','bienestar_proximamente',/Próximamente/);
  assert.equal(await last().getByRole('button',{name:'Abrir Compartir Bienestar',exact:true}).count(),1);
  await ask('Compartir Pruebas','pruebas_proximamente',/Próximamente/);
  await ask('¿Cuántos proyectos hay por grado en robótica?','robotica_tiempos',/4 proyectos.*8 horas.*32 semanas/s);
  await ask('¿Y las cajas?','robotica_cajas',/cuatro estudiantes/);
  await ask('¿Y cuánto cuesta?','robotica_sin_dato',/No tengo datos verificados/);
  await ask('¿Qué es CREO?','fe_docente',/sistema educativo católico/);
  await ask('¿Y para las familias?','fe_familias',/Quince minutos en familia/);
  await ask('¿Y primaria?','fe_primaria',/128 conexiones.*1° a 5°/s);
  assert.equal(await last().getByRole('button',{name:'Abrir Compartir Fe',exact:true}).count(),1);
  await ask('¿Qué relación tiene CREO con el Pacto Educativo Global?','fe_pacto',/siete compromisos/);
  assert.equal(await last().locator('a[href="https://sistemacreo.com/pacto-educativo-global/"]').count(),1);
  await ask('¿Cuáles son las seis fases de Robótica?','robotica_fases',/Evaluemos/);
  const measurements=await modal.evaluate(el=>({height:el.querySelector(':scope>div').getBoundingClientRect().height,width:innerWidth,overflow:[...el.querySelectorAll('*')].filter(n=>{const r=n.getBoundingClientRect();return r.width>0&&r.right>innerWidth+1&&!n.closest('svg')}).map(n=>n.className)}));
  assert.ok(measurements.height<=height);assert.deepEqual(measurements.overflow,[]);
  await page.screenshot({path:`audit/coachbot-${name}.png`});
  await ask('Ver video de Robótica','robotica_video',/proyectos tecnológicos/);
  await page.evaluate(()=>{window.auditOpenedVideo=null;window.openVideoModal=id=>{window.auditOpenedVideo=id;};});
  await last().getByRole('button',{name:/Ver video:/}).click();assert.equal(await page.evaluate(()=>window.auditOpenedVideo),'Vf3GUM8fC0U');
  await ask('Tutoriales de Compartir Fe','fe_tutoriales',/Contenidos Globales CREO/);
  assert.equal(await last().getByRole('button',{name:/Ver video:/}).count(),2);
  await last().getByRole('button',{name:'Abrir Compartir Fe',exact:true}).click();
  await page.waitForTimeout(500);assert.equal(await modal.isVisible(),false);assert.equal(await page.locator('#fe-frame').count(),1);
  await page.evaluate(()=>abrirCoachBot());
  await ask('¿Cómo creo una tarea?','docente_tarea',/Crear una Tarea/);
  await ask('Soy profesor','menu_profesor',/Profe/);
  const attack='<img src=x onerror="document.body.dataset.botxss=1">';
  await modal.locator('#chat-input').fill(attack);await modal.getByRole('button',{name:'Enviar',exact:true}).click();await page.waitForTimeout(650);
  assert.equal(await page.evaluate(()=>document.body.dataset.botxss),undefined);assert.equal(await modal.locator('img[src="x"]').count(),0);
  await ask('¿Qué es Robótica?','robotica',/Transición/);
  await last().getByRole('button',{name:'Abrir Compartir Robótica',exact:true}).click();await page.frameLocator('#robotica-frame').locator('#t-faq').waitFor();
  assert.equal(await modal.isVisible(),false);
  results.push({name,width,height,passed:true,checks:['program menus','free text','follow-up context','source links','integrated primary curriculum','robotics video','Fe videos','open Fe','open Robotics','legacy task routing','HTML injection','modal bounds']});
  console.log(name+': bot questions, sources, resources, navigation and safety passed');
  await context.close();
 }
 assert.deepEqual(errors,[]);fs.writeFileSync('audit/coachbot-browser-results.json',JSON.stringify({results,errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
