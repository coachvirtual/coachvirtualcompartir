const fs=require('node:fs'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base='https://coachvirtual.github.io/coachvirtualcompartir/',version=process.argv[2]||'fe-recorrido';
(async()=>{
 const files=['index.html','js/main.js','js/creo-experience.js','js/creo-connections.js','css/portal-refresh.css','css/fe-journey.css','creo.html','creo-guia.html'];let checks=[];
 for(let attempt=0;attempt<24;attempt++){
  checks=await Promise.all(files.map(async file=>{const r=await fetch(base+file+'?verify='+version);return {file,status:r.status,match:(await r.text()).replace(/\r\n/g,'\n')===fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n')};}));
  if(checks.every(c=>c.match))break;
  if(attempt===0)console.log('Waiting for the new journey on GitHub Pages.');
  await new Promise(r=>setTimeout(r,5000));
 }
 assert.ok(checks.every(c=>c.match),JSON.stringify(checks.filter(c=>!c.match)));
 const browser=await chromium.launch({headless:true,channel:'msedge'}),results=[];
 try{
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>new URL(r.request().url()).hostname==='coachvirtual.github.io'?r.continue():r.fulfill({body:'',contentType:'application/javascript'}));
  await page.goto(base+'?verify='+version);await page.getByRole('button',{name:'Soy docente',exact:false}).click();
  await page.locator('#card-Suplementales').click();await page.locator('#card-FE').click();await page.locator('#fe-card-explorar').click();
  let frame=page.frameLocator('#fe-frame');await frame.locator('.chapter').first().waitFor();
  assert.equal(await frame.locator('.chapter:visible').count(),5);assert.equal(await frame.locator('.resource-panel:visible').count(),14);assert.equal(await frame.locator('.step-panel:visible').count(),13);
  assert.equal(await frame.locator('#source-overview [data-source-id="2"]').isVisible(),true);
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`audit/published-fe-journey-${width}.png`});
  await page.locator('[data-theme-toggle]').click();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.locator('.fe-journey-ending button').click();
  frame=page.frameLocator('#fe-frame');await frame.locator('#connection-guide').waitFor({state:'visible'});
  assert.equal(await frame.locator('[data-connection-instruction]:visible').count(),8);assert.equal(await frame.locator('#connection-browser').isVisible(),true);
  await page.locator('.fe-journey-ending button').click();
  frame=page.frameLocator('#fe-frame');await frame.locator('#tutoriales').waitFor({state:'visible'});assert.equal(await frame.locator('#tutoriales [data-tutorial-video]').count(),2);
  await page.locator('.fe-journey-ending button').click();assert.equal(await page.locator('.fe-entry-card').count(),3);
  assert.deepEqual(errors,[]);results.push({width,pillars:5,resourceGroups:14,openSteps:13,connectionGuideSteps:8,continuation:true,errors});await page.close();
 }
 }finally{await browser.close();}
 const report={url:base,commit:version,files:checks.length,allMatch:true,results};fs.writeFileSync('audit/fe-journey-publication-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exit(1)});
