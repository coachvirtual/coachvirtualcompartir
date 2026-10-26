// Integration smoke test: opens the tutorial page once (one ordinary visit).
// Tokens and API key strings are never written to the output.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const root = path.resolve(__dirname,'..');
const site = 'https://coachvirtual.github.io/coachvirtualcompartir/';
(async () => {
  const browser = await chromium.launch({ headless:true,channel:'msedge' });
  const page = await browser.newPage();
  const errors=[], warnings=[], failures=[];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'warning' && m.text().includes('[Coach Virtual]')) warnings.push(m.text()); });
  page.on('response', async response => {
    const url = new URL(response.url());
    if (response.status() >= 400 && (url.hostname.endsWith('googleapis.com') || url.hostname === 'www.gstatic.com')) {
      const failure={ host:url.hostname,path:url.pathname,status:response.status() };
      failures.push(failure);
      try { const body=await response.json(); failure.message=body.error?.message; failure.reason=body.error?.status; } catch {}
    }
  });
  if (!process.argv.includes('--live')) {
    await page.route('https://coachvirtual.github.io/coachvirtualcompartir/**', route => {
      const url=new URL(route.request().url());
      const relative=decodeURIComponent(url.pathname.slice('/coachvirtualcompartir/'.length)) || 'index.html';
      const file=path.resolve(root,relative);
      if (!file.startsWith(root+path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return route.fulfill({ status:404,body:'' });
      const type={ '.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png' }[path.extname(file)] || 'application/octet-stream';
      return route.fulfill({ contentType:type,body:fs.readFileSync(file) });
    });
  }
  const result={ mode:process.argv.includes('--live') ? 'published page' : 'local frontend with production domain and real Firebase',site };
  try {
    await page.goto(site,{ waitUntil:'domcontentloaded' });
    await page.waitForFunction(() => document.getElementById('contador-visitas-num')?.textContent !== '—',{},{ timeout:45000 });
    result.counter=await page.locator('#contador-visitas-num').textContent();
    result.appCheck=await page.evaluate(async () => {
      try { return { tokenVerified:!!(await firebase.appCheck().getToken(false)).token }; }
      catch(e) { return { tokenVerified:false,code:e.code }; }
    });
    result.actualUrl=page.url();
    assert.equal(result.actualUrl,site);
    assert.equal(result.appCheck.tokenVerified,true);
    assert.deepEqual(warnings,[]);
    assert.deepEqual(errors,[]);
  } finally {
    Object.assign(result,{ warnings,errors,failedResources:failures });
    fs.writeFileSync(path.join(__dirname,process.argv.includes('--live') ? 'counter-live-results.json' : 'counter-integration-results.json'),JSON.stringify(result,null,2));
    console.log(JSON.stringify(result,null,2));
    await browser.close();
  }
})().catch(e => { console.error('Counter smoke test failed:',e.message); process.exitCode=1; });
