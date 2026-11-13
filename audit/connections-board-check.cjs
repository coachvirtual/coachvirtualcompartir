const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/creo-curriculum-data.js','utf8')+';this.data=CREO_CONNECTIONS;',ctx);
const data=ctx.data,fields=['area','grade','bimester','learning','lesson','topic','resource','digitalPage'],normalize=t=>String(t).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const expected=(rows,q)=>Array.from(rows).filter(r=>normalize(q).split(/\s+/).filter(Boolean).every(w=>normalize([...fields.map(f=>r[f]),r.collection,r.level==='primaria'?'Primaria':'Secundaria'].join(' ')).includes(w))).map(r=>r.id).sort();
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}),root=process.cwd(),live=process.argv.includes('--live'),results=[];
 try{
 if(live){
  const base='https://coachvirtual.github.io/coachvirtualcompartir/',files=['index.html','js/main.js','js/creo-connections.js','css/connections-board.css','creo.html','creo-guia.html'];let checks=[];
  for(let attempt=0;attempt<24;attempt++){
   checks=await Promise.all(files.map(async file=>{const response=await fetch(base+file+'?verify=connections-board');return {file,match:response.ok&&(await response.text()).replace(/\r\n/g,'\n')===fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n')};}));
   if(checks.every(c=>c.match))break;
   if(attempt===0)console.log('Waiting for the compact board on GitHub Pages.');
   await new Promise(r=>setTimeout(r,5000));
  }
  assert.ok(checks.every(c=>c.match),JSON.stringify(checks.filter(c=>!c.match)));console.log('All six published source files match.');
 }
 for(const width of [320,390,820,1440]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>{const u=new URL(r.request().url());if(live&&u.hostname==='coachvirtual.github.io')return r.continue();if(u.origin!=='http://audit.local')return r.fulfill({body:'',contentType:'application/javascript'});const file=path.resolve(root,'.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return r.fulfill({status:404,body:''});return r.fulfill({body:fs.readFileSync(file),contentType:{'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.ttf':'font/ttf'}[path.extname(file)]||'application/octet-stream'});});
  await page.goto(live?'https://coachvirtual.github.io/coachvirtualcompartir/?check=compact-board':'http://audit.local');await page.evaluate(()=>{openRoleSelection('FE');abrirContenidoFE('conexiones');});
  const frame=page.frameLocator('#fe-frame');await frame.locator('.connection-table').waitFor();
  assert.equal(await frame.locator('.connection-table thead th').count(),8);assert.equal(await frame.locator('.connection-table tbody tr').count(),16);assert.equal(await frame.locator('[data-connection-grade="all"]').getAttribute('aria-pressed'),'true');
  assert.equal(await frame.locator('#connection-search-scope').inputValue(),'all');
  await frame.locator('#connection-show-all').click();assert.equal(await frame.locator('.connection-table tbody tr').count(),128);
  for(const q of ['vida','oracion','año meses','tiempo aprovechamos','<script>no-result</script>']){
   await frame.locator('#connection-search').fill(q);
   const ids=await frame.locator('[data-connection-id]').evaluateAll(els=>els.map(e=>e.dataset.connectionId).sort());assert.deepEqual(ids,expected([...data.primary,...data.secondary],q),`${width}: ${q}`);
  }
  await frame.locator('#connection-search').fill('vida');await frame.locator('#connection-search-scope').selectOption('current');
  assert.deepEqual(await frame.locator('[data-connection-id]').evaluateAll(els=>els.map(e=>e.dataset.connectionId).sort()),expected(data.primary,'vida'));
  await frame.locator('#connection-search-scope').selectOption('all');assert.equal(await frame.locator('[data-connection-grade="11"]').count(),1);
  await frame.locator('[data-connection-grade="11"]').click();await frame.locator('#connection-search').fill('');assert.equal(await frame.locator('[data-connection-grade="all"]').getAttribute('aria-pressed'),'true');
  await frame.locator('#connection-clear').click();
  const bring=async()=>{await frame.locator('#connection-browser').evaluate(el=>parent.postMessage({type:'compartir-fe-scroll',top:el.getBoundingClientRect().top+scrollY},location.origin));await page.waitForFunction(()=>{const f=document.getElementById('fe-frame'),el=f.contentDocument.getElementById('connection-browser'),top=f.getBoundingClientRect().top+el.getBoundingClientRect().top;return top>=document.querySelector('header').offsetHeight&&top<200;});};
  for(const theme of ['light','dark']){
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('[data-theme-toggle]').click();
   await frame.locator('html[data-theme="'+theme+'"]').waitFor();await bring();await page.screenshot({path:`audit/${live?'published-':''}connections-board-${width}-${theme}.png`});
   assert.ok(await frame.locator('html').evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   if(width<980)assert.ok(await frame.locator('.connection-table-scroll').evaluate(e=>e.scrollWidth>e.clientWidth));
  }
  assert.deepEqual(errors,[]);results.push({width,tableDefault:true,columns:8,searchAcrossLevels:true,multiwordSearch:true,accentInsensitive:true,sourceValuesPreserved:true,errors});await page.close();
 }
 fs.writeFileSync(`audit/${live?'published-':''}connections-board-results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
