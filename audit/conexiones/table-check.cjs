const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/creo-curriculum-data.js','utf8')+';this.data=CREO_CONNECTIONS;',ctx);
const data=ctx.data,all=[...data.primary,...data.secondary],root=process.cwd(),live=process.argv.includes('--live');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
  for(const width of [320,390,820,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'}),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.route('**/*',r=>{
    const u=new URL(r.request().url());if(live&&u.hostname==='coachvirtual.github.io')return r.continue();if(u.origin!=='http://audit.local')return r.fulfill({body:'',contentType:'application/javascript'});
    const file=path.resolve(root,'.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));
    if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return r.fulfill({status:404,body:''});
    return r.fulfill({body:fs.readFileSync(file),contentType:{'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ttf':'font/ttf'}[path.extname(file)]||'application/octet-stream'});
   });
   await page.goto(live?'https://coachvirtual.github.io/coachvirtualcompartir/':'http://audit.local/');
   await page.evaluate(()=>{openRoleSelection('FE');abrirContenidoFE('conexiones');});
   const frame=page.frameLocator('#fe-frame');await frame.locator('.connection-table').waitFor();
   const click=selector=>frame.locator(selector).evaluate(el=>el.click());
   assert.equal(await frame.locator('.connection-table').count(),1);
   assert.equal(await frame.locator('[data-connection-id]').count(),all.length);
   assert.equal(await frame.locator('#connection-filter-panel').isVisible(),false);
   assert.equal(await frame.locator('[data-connection-view],.connection-card,a[href*="creo-malla"],a[href*=".pdf"],a[href*=".docx"]').count(),0);
   const actual=await frame.locator('[data-connection-id]').evaluateAll(els=>els.map(el=>({id:el.dataset.connectionId,fields:Object.fromEntries([...el.querySelectorAll('[data-cell]')].map(c=>[c.dataset.cell,c.textContent]))})));
   for(const row of all)for(const field of data.fields)assert.equal(actual.find(r=>r.id===row.id).fields[field],row[field],row.id+'.'+field);
   await click('[data-connection-browse="filters"]');assert.equal(await frame.locator('#connection-filter-panel').isVisible(),true);
   for(const [level,key] of [['primaria','primary'],['secundaria','secondary']]){
    await frame.locator('#connection-level').selectOption(level);
    assert.equal(await frame.locator('[data-connection-id]').count(),data[key].length);
    const sample=data[key][0];await click(`[data-connection-grade="${sample.grade}"]`);
    await frame.locator('#connection-area').selectOption(sample.area);await frame.locator('#connection-bimester').selectOption(sample.bimester);
    assert.equal(await frame.locator('[data-connection-id]').count(),data[key].filter(r=>r.grade===sample.grade&&r.area===sample.area&&r.bimester===sample.bimester).length);
   }
   await frame.locator('#connection-level').selectOption('all');
   await frame.locator('#connection-collection').selectOption('ActivaMente+');assert.equal(await frame.locator('[data-connection-id]').count(),31);
   await click('#connection-clear');
   await frame.locator('#connection-search').fill('No es lo mismo precio que valor');assert.equal(await frame.locator('[data-connection-id="s-8-1"]').count(),1);
   await frame.locator('#connection-search').fill('<script>no-result</script>');assert.equal(await frame.locator('.connection-empty').isVisible(),true);
   await click('[data-connection-clear]');assert.equal(await frame.locator('[data-connection-id]').count(),266);
   await frame.locator('#connection-search').fill('Los meses del año');await click('[data-connection-route="p-3-4"]');
   assert.match(await frame.locator('#connection-context').innerText(),/Aprovechamos el tiempo/);assert.equal(await frame.locator('[data-connection-instruction]:visible').count(),8);
   await click('#connection-back-to-grid');await click('[data-connection-browse="all"]');
   assert.equal(await frame.locator('[data-connection-id]').count(),266);assert.equal(await frame.locator('#connection-search').inputValue(),'');assert.equal(await frame.locator('#connection-level').inputValue(),'all');
   await click('[data-connection-browse="filters"]');await frame.locator('#connection-level').selectOption('primaria');await click('[data-connection-grade="1"]');
   for(const theme of ['light','dark']){
    await frame.locator('html').evaluate((el,t)=>el.dataset.theme=t,theme);
    assert.equal(await frame.locator('html').evaluate(el=>el.scrollWidth>innerWidth),false);
    await frame.locator('#conexiones').evaluate(el=>parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin));
    await page.screenshot({path:`audit/conexiones/table-${width}-${theme}.png`});
   }
   assert.deepEqual(errors,[]);await page.close();console.log(`${width}px: 266 rows, 2,128 values, filters, reset, guide and themes verified`);
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
