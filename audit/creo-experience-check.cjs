const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm'),crypto=require('node:crypto'),{chromium}=require('playwright');
const context={};vm.createContext(context);vm.runInContext(fs.readFileSync('js/creo-content.js','utf8')+';this.data=CREO_CONTENT;',context);const data=context.data;
(async()=>{
 const live=process.argv.includes('--live'),root=process.cwd(),browser=await chromium.launch({headless:true,channel:'msedge'}),results=[];
 const coverage=JSON.parse(fs.readFileSync('audit/creo-interactive-coverage.json','utf8'));
 const sha=b=>crypto.createHash('sha256').update(b).digest('hex');assert.equal(sha(fs.readFileSync('assets/creo/recursos-globales-creo-2026.docx')),coverage.sourceSHA256);
 async function route(page){await page.route('**/*',r=>{const u=new URL(r.request().url());if(live&&u.hostname==='coachvirtual.github.io')return r.continue();if(u.origin!=='http://audit.local')return r.fulfill({body:'',contentType:'application/javascript'});const file=path.resolve(root,'.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return r.fulfill({status:404,body:''});return r.fulfill({body:fs.readFileSync(file),contentType:{'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ttf':'font/ttf'}[path.extname(file)]||'application/octet-stream'});});}
 const normalize=t=>t.toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
 try{for(const [name,width,height] of [['small-mobile',320,740],['mobile',390,844],['tablet',820,1180],['desktop',1440,1000]].filter(v=>!process.env.CREO_AUDIT_WIDTH||String(v[1])===process.env.CREO_AUDIT_WIDTH)){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR',e.message);});await route(page);
  await page.goto(live?'https://coachvirtual.github.io/coachvirtualcompartir/?creo=experiencia':'http://audit.local');await page.evaluate(()=>{openRoleSelection('FE');abrirContenidoFE('explorar');document.getElementById('fe-frame').src='creo-guia.html?v=full-guide-audit';}); // Full-document coverage; scoped card navigation is checked in profile-navigation.cjs.
  const frame=page.frameLocator('#fe-frame');
  const click=async selector=>{
   await frame.locator(selector).evaluate(el=>parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin));
   await page.waitForFunction(selector=>{const f=document.getElementById('fe-frame'),el=f.contentDocument.querySelector(selector);if(!el)return false;const top=f.getBoundingClientRect().top+el.getBoundingClientRect().top;return top>=document.querySelector('header').offsetHeight&&top<innerHeight-20&&Math.abs(f.clientHeight-f.contentDocument.body.offsetHeight)<3;},selector);
   await frame.locator(selector).click();
   await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  };
await frame.locator('.pillar-button').first().waitFor();assert.equal(await frame.locator('.pillar-button').count(),5);assert.equal(await frame.locator('.chapter:visible').count(),5);assert.equal(await frame.locator('.resource-panel:visible').count(),14);assert.equal(await frame.locator('.step-panel:visible').count(),13);assert.equal(await frame.locator('a[download],a[href$=".docx"],.source-section').count(),0);await frame.locator('body').evaluate(()=>{window.clickAudit=[];document.addEventListener('click',e=>window.clickAudit.push(e.target.outerHTML.slice(0,200)),true);});
  await frame.locator('#pillar-selector').evaluate(el=>parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin));
  await page.waitForFunction(()=>{const f=document.querySelector('#fe-frame'),top=f.getBoundingClientRect().top+f.contentDocument.getElementById('pillar-selector').getBoundingClientRect().top;return top>=document.querySelector('header').offsetHeight&&top<200;});
  for(let ci=0;ci<5;ci++){
   await click(`[data-pillar="${ci}"]`);assert.equal(await frame.locator('.chapter:visible').count(),5);
   for(let ri=0;ri<data.chapters[ci].resources.length;ri++){
    const r=data.chapters[ci].resources[ri];await click(`[data-chapter="${ci}"][data-resource="${ri}"]`);assert.equal(await frame.locator('.resource-panel:visible').count(),14);assert.equal(await frame.locator(`#title-${r.id}`).isVisible(),true,JSON.stringify({ci,ri,id:r.id,visible:await frame.locator('.resource-panel:visible').first().getAttribute('id'),clicks:await frame.locator('body').evaluate(()=>window.clickAudit.slice(-3))}));
    for(let si=0;si<r.steps.length;si++){
     await click(`.step-buttons [data-step-resource="${r.id}"][data-step-index="${si}"]`);assert.equal(await frame.locator(`#step-${r.id}-${si}`).isVisible(),true);
    }
   }
   assert.equal(await frame.locator('html').evaluate(el=>el.scrollWidth>innerWidth),false);
  }
  await frame.locator('#view-toggle').evaluate(el=>parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin));await page.waitForFunction(()=>{const f=document.querySelector('#fe-frame'),button=f.contentDocument.getElementById('view-toggle'),top=f.getBoundingClientRect().top+button.getBoundingClientRect().top;return top>=document.querySelector('header').offsetHeight&&top<300;});await click('#view-toggle');assert.equal(await frame.locator('.chapter:visible').count(),5);assert.equal(await frame.locator('.resource-panel:visible').count(),14);assert.equal(await frame.locator('.step-panel:visible').count(),13);
  assert.equal(await frame.locator('[data-source-id]:visible').count(),82);assert.equal(await frame.locator('.media:visible').count(),43);
  const paragraphs=await frame.locator('[data-source-id]').evaluateAll(els=>els.map(el=>({id:Number(el.dataset.sourceId),text:el.textContent})));
  assert.equal(new Set(paragraphs.map(p=>p.id)).size,82);assert.ok(await frame.locator('.source-text strong').count()>100);
  for(const source of coverage.sourceText){const found=paragraphs.find(p=>p.id===source.id);assert.ok(found);assert.equal(normalize(found.text),normalize(source.text));}
  await frame.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode();})));
  assert.equal(await frame.locator('html').evaluate(el=>el.scrollWidth>innerWidth),false);
  await page.waitForFunction(()=>{const f=document.querySelector('#fe-frame');return Math.abs(f.clientHeight-f.contentDocument.body.offsetHeight)<3;});
  // All original image links open a content-only viewport, never the raw desktop capture.
  const images=await frame.locator('.media>a').evaluateAll(els=>els.map(el=>({href:el.getAttribute('href'),ratio:el.querySelector('.crop-window').style.aspectRatio,overflow:getComputedStyle(el.querySelector('.crop-window')).overflow})));
  assert.ok(images.every(i=>i.href.startsWith('creo-imagen.html?id=')&&i.ratio&&i.overflow==='hidden'));
  await frame.locator('#view-toggle').evaluate(el=>parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin));await page.waitForFunction(()=>{const f=document.querySelector('#fe-frame'),button=f.contentDocument.getElementById('view-toggle'),top=f.getBoundingClientRect().top+button.getBoundingClientRect().top;return top>=document.querySelector('header').offsetHeight&&top<300;});await click('#view-toggle');await frame.locator('#guide-search').fill('planificacion');await frame.locator('[data-source-result="62"]').waitFor({state:'visible'});await click('[data-source-result="62"]');await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  await frame.locator('#step-servicio-2').waitFor({state:'visible'});
  await frame.locator('#guide-search').fill('<script>nada</script>');assert.equal(await frame.locator('.empty-search').isVisible(),true);await click('[data-clear-search]');
  await click('[data-pillar="0"]');assert.equal(await frame.locator('#resource-catequesis .step-panel:visible').count(),3);
  await click('.brand-bar a[href="#inicio"]');await page.screenshot({path:`audit/creo-experience-${live?'published-':''}${name}.png`});
  await click('[data-pillar="3"]');await click('[data-chapter="3"][data-resource="0"]');await click('.step-buttons [data-step-resource="servicio"][data-step-index="2"]');
  await frame.locator('#step-servicio-2 .media img').evaluate(img=>img.decode());
  await frame.locator('#resource-servicio .stepper').evaluate(el=>{parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin);});
  await page.screenshot({path:`audit/creo-experience-step-${live?'published-':''}${name}.png`});
  assert.equal(await frame.locator('html').evaluate(el=>el.scrollWidth>innerWidth),false);
  assert.equal(await frame.locator('#acceso [data-tutorial-video="QCviXJSVUHc"]').count(),1);assert.equal(await page.locator('[data-vid-id="QCviXJSVUHc"]').count(),0);assert.equal(await page.getByRole('link',{name:'Abrir documento:',exact:false}).count(),0);assert.deepEqual(errors,[]);
  await page.evaluate(()=>{window.creoOpenedVideos=[];const original=window.openVideoModal;window.openVideoModal=(id,...args)=>{window.creoOpenedVideos.push(id);return original(id,...args);};});
  for(const id of ['QCviXJSVUHc','I7Yd9PWTDc8']){await click(`[data-tutorial-video="${id}"]`);await page.locator('#video-modal').waitFor({state:'visible'});assert.equal(await page.evaluate(()=>window.creoOpenedVideos.at(-1)),id);await page.getByRole('button',{name:'Cerrar video',exact:true}).click();}
  await click('#acceso .access-actions a[href="#inicio"]');
  await page.waitForFunction(()=>{const f=document.querySelector('#fe-frame'),top=f.getBoundingClientRect().top+f.contentDocument.getElementById('inicio').getBoundingClientRect().top;return top>=0&&top<200;});
  assert.deepEqual(errors,[]);
  results.push({name,width,allSourceParagraphs:82,allContentImages:43,pillars:5,resourceGroups:14,proposals:15,guidedSteps:13,search:true,navigation:true,continuousJourney:true,keywordsEmphasized:true,tutorialsInEDI:true,tutorialModal:true,homeButton:true,downloadRemoved:true,croppedMedia:true,overflow:false,errors});
  await page.close();console.log(name+': all 82 source paragraphs, 43 content images, resource selection, guided steps, search and brand layout verified');
 }
 // Verify the crop in the enlarged view independently of the host iframe.
 const viewer=await browser.newPage({viewport:{width:1100,height:850}});await route(viewer);await viewer.goto(live?'https://coachvirtual.github.io/coachvirtualcompartir/creo-imagen.html?id=28':'http://audit.local/creo-imagen.html?id=28');await viewer.locator('.crop-window img').evaluate(img=>img.decode());const crop=await viewer.locator('.crop-window').evaluate(el=>({ratio:el.clientWidth/el.clientHeight,overflow:getComputedStyle(el).overflow}));assert.ok(Math.abs(crop.ratio-705/276)<.02);assert.equal(crop.overflow,'hidden');await viewer.screenshot({path:`audit/creo-cropped-image-${live?'published':''}.png`});await viewer.close();
 fs.writeFileSync(`audit/creo-experience-${live?'published-':''}results.json`,JSON.stringify(results,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
