// Regression checks in a local, fully intercepted browser. No cloud writes.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const root = path.resolve(__dirname, '..');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage();
  const errors = [], externalHosts = [], passed = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.addInitScript(() => {
    window.auditCounter = { gets: 0, writes: 0, activations: 0, tokens: 0 };
    const ref = {
      get() { window.auditCounter.gets++; return Promise.resolve({ exists: true, data: () => ({ total: 123 }) }); },
      set() { window.auditCounter.writes++; throw Error('Unexpected public write'); },
      update(value) {
        if (value.total !== 1) throw Error('Unexpected increment');
        window.auditCounter.writes++;
        return Promise.resolve();
      }
    };
    const firestore = () => ({ collection: () => ({ doc: () => ref }) });
    firestore.FieldValue = { increment: value => value };
    const appCheck = () => ({
      activate() { window.auditCounter.activations++; },
      getToken() { window.auditCounter.tokens++; return Promise.resolve({ token:'mock' }); }
    });
    appCheck.ReCaptchaEnterpriseProvider = function(key) { this.siteKey = key; };
    window.firebase = { apps: [{}], initializeApp() {}, firestore, appCheck };
  });
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== 'http://audit.local') {
      externalHosts.push(url.hostname);
      return route.fulfill({ contentType: 'application/javascript', body: '' });
    }
    const relative = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const file = path.resolve(root, '.' + relative);
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return route.fulfill({ status: 404, body: '' });
    const type = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.png':'image/png' }[path.extname(file)] || 'application/octet-stream';
    return route.fulfill({ contentType: type, body: fs.readFileSync(file) });
  });
  try {
    await page.goto('http://audit.local/');
    const payload = '<img src="/audit-missing-image" onerror="document.body.dataset.auditxss=1">';
    await page.locator('#global-search').fill(payload);
    await page.waitForFunction(value => document.querySelector('#search-results strong')?.textContent === value, payload);
    assert.equal(await page.locator('#search-results img').count(), 0);
    passed.push('Global search displays attack markup as plain text');
    await page.evaluate(value => {
      const input = document.getElementById('section-search');
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }, payload);
    await page.waitForFunction(value => document.querySelector('#section-search-results strong')?.textContent === value, payload);
    assert.equal(await page.locator('#section-search-results img').count(), 0);
    passed.push('Section search displays attack markup as plain text');
    await page.evaluate(value => {
      localStorage.setItem('cv_ratings', JSON.stringify({
        Bv_FinX79vk: { miVoto: 'like', like: value, dislike: value },
        [value]: { miVoto: 'like', like: value },
        X6akIQPrJWw: null
      }));
      renderDashboard();
      mostrarToast(value);
    }, payload);
    const ratings = await page.evaluate(() => getRatings());
    assert.deepEqual(ratings, { Bv_FinX79vk: { like: 1, dislike: 0, miVoto: 'like' } });
    assert.equal(await page.locator('#dash-ratings-lista img').count(), 0);
    assert.equal(await page.locator('[role="status"] img').count(), 0);
    assert.equal(await page.evaluate(() => document.body.dataset.auditxss), undefined);
    passed.push('Hostile ratings and toast messages cannot execute markup');
    const validated = await page.evaluate(() => {
      const results = [];
      for (const raw of ['{}', 'null', '42', '"text"', '[null,1,"invalid"]', '{broken']) {
        localStorage.setItem('cv_vistos', raw);
        actualizarUIProgreso();
        results.push(getVistos());
      }
      localStorage.setItem('cv_vistos', JSON.stringify(['Bv_FinX79vk','Bv_FinX79vk','invalid']));
      results.push(getVistos());
      return results;
    });
    assert.deepEqual(validated.slice(0, 6), [[], [], [], [], [], []]);
    assert.deepEqual(validated[6], ['Bv_FinX79vk']);
    passed.push('Malformed progress recovers and duplicate/unknown IDs are discarded');
    await page.reload();
    assert.equal(await page.evaluate(() => getVistos().length), 1);
    passed.push('Valid progress survives reload');
    const ordinaryUse = await page.evaluate(() => {
      localStorage.setItem('cv_ratings','{}');
      videoActualId = 'Bv_FinX79vk';
      window.marcarVisto();
      window.ratingVoto('like');
      window.ratingVoto('dislike');
      return { vistos:getVistos(),rating:getRatings().Bv_FinX79vk };
    });
    assert.deepEqual(ordinaryUse,{ vistos:['Bv_FinX79vk'],rating:{ like:0,dislike:1,miVoto:'dislike' } });
    passed.push('Marking videos and switching votes preserve their normal behavior');
    await page.keyboard.press('Control+Shift+A');
    assert.equal(await page.locator('#dashboard-modal').evaluate(el => el.classList.contains('hidden')), false);
    assert.equal(await page.locator('#pin-modal').count(), 0);
    assert.ok((await page.locator('#dashboard-modal h2').textContent()).includes('navegador'));
    passed.push('Local statistics open without a misleading administrator PIN');
    await page.evaluate(() => {
      window.capturedEvents = [];
      window.trackEvent = (name, params) => window.capturedEvents.push({ name, params });
      trackBusqueda(4);
    });
    assert.deepEqual(await page.evaluate(() => window.capturedEvents), [{ name:'busqueda', params:{ resultados:4, event_category:'busqueda' } }]);
    assert.equal(await page.evaluate(() => window.GA4_ACTIVO), false);
    assert.equal(externalHosts.includes('www.googletagmanager.com'), false);
    passed.push('Analytics disabled by default; search events contain no free text');
    if (fs.existsSync(path.join(root, 'js/contador.js'))) {
      await page.waitForFunction(() => window.auditCounter.gets > 0);
      assert.deepEqual(await page.evaluate(() => window.auditCounter), { gets:1, writes:1, activations:1, tokens:1 });
      passed.push('Counter obtains App Check token and increments exactly once per page load');
    }
    assert.equal(externalHosts.includes('cdn.tailwindcss.com'), false);
    assert.equal(externalHosts.includes('unpkg.com'), false);
    assert.ok(await page.locator('svg.lucide').count() > 0);
    passed.push('Compiled CSS and pinned local icons load successfully');
    assert.deepEqual(errors, []);
  } finally {
    const result = { scope:'Local browser only; external requests intercepted', passed, pageErrors:errors, externalHostsRequested:[...new Set(externalHosts)] };
    fs.writeFileSync(path.join(__dirname, 'security-regression-results.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2));
    await browser.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
