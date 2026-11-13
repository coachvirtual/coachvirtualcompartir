const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const root=process.cwd(),browser=await chromium.launch({headless:true,channel:'msedge'}),results=[],errors=[],missing=new Set();
 try{
 for(const [width,height] of [[320,740],[390,844],[820,1180],[1440,900]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>{const u=new URL(r.request().url());if(u.origin!=='http://audit.local')return r.fulfill({body:'',contentType:'application/javascript'});const file=path.resolve(root,'.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){missing.add(u.pathname);return r.fulfill({status:404,body:''});}return r.fulfill({body:fs.readFileSync(file),contentType:{'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf'}[path.extname(file)]||'application/octet-stream'});});
 await page.goto('http://audit.local');await page.evaluate(()=>document.fonts.ready);
 await page.getByRole('button',{name:'Compartir Suplementales',exact:true}).click();
 assert.equal(await page.locator('.supplemental-grid button').count(),4);
 for(const name of ['Bienestar','Pruebas']){
 await page.getByRole('button',{name:'Compartir '+name,exact:true}).click();
 assert.equal(await page.locator('#section-content h2').innerText(),'Compartir '+name);
 assert.equal(await page.locator('.coming-soon-badge').innerText(),'Próximamente');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.equal(await page.locator('#section-content iframe').count(),0);
 await page.screenshot({path:`audit/design-${name.toLowerCase()}-${width}.png`,fullPage:true});
 await page.getByRole('button',{name:'Volver a Suplementales',exact:true}).click();
 assert.equal(await page.evaluate(()=>document.activeElement.id),'card-'+name);
 }
 await page.screenshot({path:`audit/design-suplementales-${width}.png`,fullPage:true});
 await page.locator('#section-back').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'card-Suplementales');
 await page.locator('#global-search').fill('evaluacion');await page.waitForTimeout(300);
 const a=await page.locator('#search-results [data-vid-id]').count();assert.ok(a>0);
 await page.locator('#global-search').fill('evaluación');await page.waitForTimeout(300);assert.equal(await page.locator('#search-results [data-vid-id]').count(),a);
 await page.locator('#global-search').fill('');await page.waitForTimeout(300);
 await page.getByRole('button',{name:'Compartir Conocimientos',exact:true}).click();
 await page.getByRole('button',{name:'Ver tutoriales para Docentes',exact:true}).click();
 assert.equal(await page.locator('.paso-titulo').first().evaluate(el=>getComputedStyle(el).whiteSpace),'normal');
 await page.locator('#section-search').fill('tarea');await page.locator('#section-back').click();
 await page.getByRole('button',{name:'Compartir Suplementales',exact:true}).click();await page.waitForTimeout(350);
 assert.equal(await page.locator('#section-content').isVisible(),true);assert.equal(await page.locator('#section-search-results').isVisible(),false);
 await page.evaluate(()=>{openRoleSelection('FE');openRoleSelection('Pruebas')});await page.waitForTimeout(450);
 assert.equal(await page.locator('#section-content h2').innerText(),'Compartir Pruebas');
 await page.locator('#section-back').click();await page.locator('#section-back').click();
 const opener=page.getByRole('button',{name:'Abrir Coach Bot',exact:true});await opener.click();await page.waitForTimeout(250);
 assert.equal(await page.locator('#main-menu').evaluate(el=>el.inert),true);
 await page.locator('#chat-input').press('Tab');
 assert.ok(await page.evaluate(()=>!!document.activeElement.closest('#coachbot-modal')));
 await page.evaluate(()=>confirmar({titulo:'Prueba',desc:'Cancelar con Escape',onOk:()=>{throw Error('No confirmar')}}));
 await page.keyboard.press('Escape');assert.equal(await page.locator('#confirm-modal').isVisible(),false);assert.equal(await page.locator('#coachbot-modal').isVisible(),true);
 await page.keyboard.press('Escape');assert.equal(await page.locator('#coachbot-modal').isVisible(),false);assert.equal(await page.locator('#main-menu').evaluate(el=>el.inert),false);
 assert.equal(await opener.evaluate(el=>el===document.activeElement),true);
 for(const file of ['index.html','robotica.html','creo.html','creo-guia.html','creo-malla.html','creo-imagen.html']){
 await page.goto('http://audit.local/'+file);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(150);
 const check=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.src.startsWith(location.origin)&&i.complete&&i.naturalWidth===0).map(i=>i.getAttribute('src')),duplicateIds:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,all)=>all.indexOf(id)!==i)}));
 assert.equal(check.overflow,false,`${file} ${width}: overflow`);assert.deepEqual(check.broken,[],file);assert.deepEqual(check.duplicateIds,[],file);
 results.push({file,width,...check});
 if(['index.html','robotica.html','creo-guia.html'].includes(file))await page.screenshot({path:`audit/design-${file.replace('.html','')}-${width}.png`});
 }
 await page.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual([...missing],[]);
 fs.writeFileSync('audit/design-results.json',JSON.stringify({results,errors,missing:[...missing],flows:'4 supplemental programs, coming soon, accent search, fast navigation, stale search, wrapped titles, nested dialogs, focus restoration'},null,2));
 console.log('PASS: 24 page/viewport combinations, new programs, search, navigation and nested dialogs.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
