const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'}),root=process.cwd(),results=[],errors=[];
 try{
 for(const width of [320,390,768,1440,1920]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{
   const url=new URL(route.request().url());if(url.origin!=='http://audit.local')return route.fulfill({body:'',contentType:'application/javascript'});
   const file=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
   if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile())return route.fulfill({status:404,body:''});
   const type={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf'}[path.extname(file)]||'application/octet-stream';
   return route.fulfill({body:fs.readFileSync(file),contentType:type});
  });
  await page.goto('http://audit.local');await page.evaluate(()=>document.fonts.ready);
  await page.getByRole('button',{name:'Soy docente',exact:false}).click();
  for(const theme of ['light','dark']){
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('[data-theme-toggle]').click();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width} ${theme}`);
   assert.equal(await page.getByText('Te guÃ­o paso a paso y te ayudo a encontrar tutoriales y recursos de Compartir.',{exact:true}).count(),0);
   const sizes=await page.locator('#cards-container .category-card').evaluateAll(cards=>cards.map(c=>({width:c.clientWidth,height:c.clientHeight,overflow:c.querySelector('.category-title').scrollWidth>c.querySelector('.category-title').clientWidth,title:c.querySelector('.category-title').textContent})));
   assert.ok(sizes.every(s=>s.height<=140&&!s.overflow),JSON.stringify({width,sizes}));
   await page.screenshot({path:`audit/compact-${width}-${theme}.png`,fullPage:true});
   await page.getByRole('button',{name:'Compartir Suplementales',exact:true}).click();
   assert.equal(await page.locator('.supplemental-grid .category-card').count(),4);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.screenshot({path:`audit/compact-supplementals-${width}-${theme}.png`,fullPage:true});
   await page.getByRole('button',{name:'Compartir Fe',exact:true}).click();
   assert.ok(await page.locator('.fe-entry-card').count()>0);
   if([390,1440].includes(width)){
    await page.locator('#fe-card-explorar').click();
    const frame=page.frameLocator('#fe-frame');
    await frame.locator('html[data-theme="'+theme+'"]').waitFor();
    await page.screenshot({path:`audit/compact-fe-${width}-${theme}.png`});
    await page.locator('[data-theme-toggle]').click();
    await frame.locator('html[data-theme="'+(theme==='light'?'dark':'light')+'"]').waitFor();
    await page.locator('[data-theme-toggle]').click();
    await page.locator('#section-back').click();
   }
   await page.locator('#section-back').click();
   if([390,1440].includes(width)){
    await page.locator('#card-Robotica').click();
    await page.frameLocator('#robotica-frame').locator('html[data-theme="'+theme+'"]').waitFor();
    await page.screenshot({path:`audit/compact-robotica-${width}-${theme}.png`});
    await page.locator('#section-back').click();
   }
   await page.locator('#section-back').click();
   await page.getByRole('button',{name:'Abrir Coach Bot',exact:true}).click();
   await page.screenshot({path:`audit/compact-bot-${width}-${theme}.png`});
   await page.getByRole('button',{name:'Cerrar Coach Bot',exact:true}).click();
   results.push({width,theme,cards:sizes});
  }
  await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  if(width===1440)console.log(await page.locator('#app-header nav').evaluate(el=>el.innerText));
  await page.close();
 }
 assert.deepEqual(errors,[]);
 fs.writeFileSync('audit/compact-theme-results.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({passed:results.length,errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
