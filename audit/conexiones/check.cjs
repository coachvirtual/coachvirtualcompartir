const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/creo-curriculum-data.js','utf8')+';this.data=CREO_CONNECTIONS;',ctx);
const data=ctx.data,normalize=t=>String(t).replace(/\s+/g,' ').trim();
(async()=>{
 const root=process.cwd(),live=process.argv.includes('--live'),browser=await chromium.launch({headless:true,channel:'msedge'}),results=[];
 const coverage=JSON.parse(fs.readFileSync('audit/conexiones/coverage.json','utf8'));
 assert.equal(data.primary.length,coverage.primaryRows);assert.equal(data.secondary.length,coverage.secondaryRows);
 async function route(page){await page.route('**/*',r=>{
  const u=new URL(r.request().url());if(live&&u.hostname==='coachvirtual.github.io')return r.continue();
  if(u.origin!=='http://audit.local')return r.fulfill({body:'',contentType:'application/javascript'});
  const file=path.resolve(root,'.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return r.fulfill({status:404,body:''});
  return r.fulfill({body:fs.readFileSync(file),contentType:{'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ttf':'font/ttf'}[path.extname(file)]||'application/octet-stream'});
 });}
 const base=live?'https://coachvirtual.github.io/coachvirtualcompartir/':'http://audit.local/';
 try{
  for(const [name,width,height] of [['small-mobile',320,740],['mobile',390,844],['tablet',820,1180],['desktop',1440,1000]]){
   const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'}),errors=[];
   page.on('pageerror',e=>errors.push(e.message));await route(page);await page.goto(base+'?curriculum=20261112');await page.evaluate(()=>openRoleSelection('FE'));
   const frame=page.frameLocator('#fe-frame');await frame.locator('.connection-card').first().waitFor();
   const bringToView=async selector=>{await frame.locator(selector).evaluate(el=>parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin));await page.waitForFunction(selector=>{const f=document.querySelector('#fe-frame'),el=f.contentDocument.querySelector(selector),top=f.getBoundingClientRect().top+el.getBoundingClientRect().top;return top>=document.querySelector('header').offsetHeight&&top<250;},selector);};
   assert.equal(await frame.locator('[data-connection-mode]').count(),3);
   // Every field of every connection must be readable in both native views.
   for(const [level,key] of [['primaria','primary'],['secundaria','secondary']]){
    await frame.locator(`[data-connection-mode="${level}"]`).click();
    await frame.locator('[data-connection-grade="all"]').click();
    await frame.locator('#connection-show-all').click();
    assert.equal(await frame.locator('.connection-card').count(),data[key].length);
    const actual=await frame.locator('[data-connection-id]').evaluateAll(els=>els.map(el=>({id:el.dataset.connectionId,fields:Object.fromEntries([...el.querySelectorAll('[data-cell]')].map(cell=>[cell.dataset.cell,cell.textContent]))})));
    for(const expected of data[key]){
     const found=actual.find(r=>r.id===expected.id);assert.ok(found,expected.id);
     for(const field of data.fields)assert.equal(normalize(found.fields[field]),normalize(expected[field]),`${expected.id}.${field}`);
    }
    await frame.locator('[data-connection-view="table"]').click();assert.equal(await frame.locator('.connection-table tbody tr').count(),data[key].length);
    assert.equal(await frame.locator('html').evaluate(el=>el.scrollWidth>innerWidth),false);
    await frame.locator('[data-connection-view="cards"]').click();
    await frame.locator('#connection-show-all').click();
    assert.equal(await frame.locator('.connection-card').count(),8);
    const seen=new Set();
    do{
     for(const id of await frame.locator('[data-connection-id]').evaluateAll(els=>els.map(el=>el.dataset.connectionId)))seen.add(id);
     if(await frame.locator('#connection-next').isDisabled())break;
     await frame.locator('#connection-next').click();
    }while(true);
    assert.equal(seen.size,data[key].length);
    // Combined grade/area/bimester filters retain their exact source values.
    const sample=data[key][0];await frame.locator(`[data-connection-grade="${sample.grade}"]`).click();
    await frame.locator('#connection-area').selectOption(sample.area);await frame.locator('#connection-bimester').selectOption(sample.bimester);
    const expectedCount=data[key].filter(r=>r.grade===sample.grade&&r.area===sample.area&&r.bimester===sample.bimester).length;
    assert.match(await frame.locator('#connection-count').innerText(),new RegExp(`de ${expectedCount} conexiones`));
    await frame.locator('#connection-clear').click();
   }
   await frame.locator('#connection-collection').selectOption('ActivaMente+');
   assert.match(await frame.locator('#connection-count').innerText(),/de 31 conexiones/);await frame.locator('#connection-clear').click();
   await frame.locator('#connection-search').fill('No es lo mismo precio que valor');assert.equal(await frame.locator('.connection-card').count(),1);assert.equal(await frame.locator('[data-connection-id="s-8-1"]').count(),1);
   await frame.locator('#connection-search').fill('<script>no-result</script>');assert.equal(await frame.locator('.connection-empty').isVisible(),true);await frame.locator('[data-connection-clear]').click();
   // The guide can be entered directly from a real source row.
   await frame.locator('[data-connection-mode="primaria"]').click();await frame.locator('[data-connection-grade="all"]').click();await frame.locator('#connection-search').fill('Los meses del año');
   await frame.locator('[data-connection-route="p-3-4"]').click();assert.match(await frame.locator('#connection-context').innerText(),/Aprovechamos el tiempo/);
   for(let i=0;i<8;i++){
    await frame.locator(`[data-connection-step="${i}"]`).click();assert.equal(await frame.locator(`#connection-step-${i}`).isVisible(),true);
    const text=await frame.locator(`[data-connection-instruction="${i+1}"]`).innerText();assert.equal(text.replace(/\s/g,''),coverage.sourceGuide[i].replace(/\s/g,''));
   }
   await bringToView('#connection-guide-all');await frame.locator('#connection-guide-all').click();assert.equal(await frame.locator('[data-connection-instruction]:visible').count(),8);assert.equal(await frame.locator('.connection-media:visible').count(),coverage.guideImages);
   await frame.locator('.connection-media img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode();})));
   assert.equal(await frame.locator('html').evaluate(el=>el.scrollWidth>innerWidth),false);
   await page.waitForFunction(()=>{const f=document.querySelector('#fe-frame');return Math.abs(f.clientHeight-f.contentDocument.body.offsetHeight)<3;});
   await bringToView('#connection-guide-all');await frame.locator('#connection-guide-all').click();await frame.locator('[data-connection-step="6"]').click();
   await frame.locator('#connection-step-6 .connection-media img').evaluate(img=>img.decode());
   await frame.locator('#conexiones').evaluate(el=>parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin));
   await page.screenshot({path:`audit/conexiones/guide-${live?'published-':''}${name}.png`});
   await frame.locator('#connection-back-to-grid').click();await frame.locator('#connection-clear').click();await frame.locator('[data-connection-grade="1"]').click();await frame.locator('#connection-area').selectOption('Matemáticas');
   await frame.locator('#conexiones').evaluate(el=>parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin));
   await page.screenshot({path:`audit/conexiones/primary-${live?'published-':''}${name}.png`});
   assert.equal(await frame.locator('a[download]').count(),0);assert.equal(await page.getByRole('link',{name:'Abrir documento:',exact:false}).count(),0);
   assert.equal(await frame.locator('#acceso [data-tutorial-video]').count(),2);assert.deepEqual(errors,[]);
   results.push({name,width,primaryRows:128,secondaryRows:138,fieldValues:2128,pagination:true,filters:true,table:true,guideInstructions:8,guideImages:coverage.guideImages,overflow:false,errors});await page.close();
   console.log(name+': all 266 rows and 2,128 field values, full pagination, filters, table and 8-step guide verified');
  }
  const viewer=await browser.newPage({viewport:{width:1440,height:1000}});await route(viewer);
  for(const level of ['primaria','secundaria']){
   await viewer.goto(base+`creo-malla.html?level=${level}`);assert.equal(await viewer.locator('#malla-page-select option').count(),data.pages[level].length);
   for(const p of data.pages[level]){await viewer.locator('#malla-page-select').selectOption(String(p.page));await viewer.locator('#malla-image').evaluate(img=>img.decode());assert.equal(await viewer.locator('#malla-image').evaluate(img=>img.naturalWidth>0),true);}
  }
  await viewer.goto(base+'creo-malla.html?level=secundaria&page=8&row=s-8-1');await viewer.locator('#malla-image').evaluate(img=>img.decode());assert.equal(await viewer.locator('#malla-row-highlight').isVisible(),true);assert.match(await viewer.locator('#malla-caption').innerText(),/No es lo mismo precio que valor/);
  await viewer.screenshot({path:`audit/conexiones/reference-${live?'published':''}.png`});await viewer.locator('#malla-zoom').selectOption('150');assert.equal(await viewer.locator('#malla-sheet').evaluate(el=>el.style.width),'150%');
  await viewer.goto(base+'creo-imagen.html?set=conexiones&id=14');await viewer.locator('.crop-window img').evaluate(img=>img.decode());assert.match(await viewer.locator('.crop-window img').getAttribute('src'),/conexiones\/guide-panel-14/);await viewer.close();
  fs.writeFileSync(`audit/conexiones/${live?'published-':''}results.json`,JSON.stringify({results,referencePages:27,sourceCoverage:coverage.totalRows},null,2));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
