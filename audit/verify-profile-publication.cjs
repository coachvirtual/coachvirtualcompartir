const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const version = process.argv[2] || 'perfiles-inicio';
const base = 'https://coachvirtual.github.io/coachvirtualcompartir/';
(async () => {
    for (const file of ['index.html', 'js/main.js', 'css/style.css', 'creo-guia.html', 'js/creo-experience.js', 'js/creo-connections.js', 'css/creo.css']) {
        const response = await fetch(base + file + '?verify=' + version);
        assert.equal(response.status, 200);
        assert.equal((await response.text()).replace(/\r\n/g, '\n'), fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'), file + ' must match the published source');
        console.log(file + ': published source matches');
    }
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    try {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
        // Keep third-party counters and video players outside this navigation check.
        await page.route('**/*', route => new URL(route.request().url()).hostname === 'coachvirtual.github.io' ? route.continue() : route.fulfill({ body: '', contentType: 'application/javascript' }));
        await page.goto(base + '?verify=' + version);
        await page.locator('#profile-picker').waitFor();
        assert.equal(await page.locator('#card-Suplementales').isVisible(), false);
        await page.getByRole('button', { name: 'Soy docente', exact: false }).click();
        assert.equal(await page.locator('#card-Suplementales').isVisible(), true);
        await page.locator('#card-Conocimientos').click();
        assert.equal(await page.evaluate(() => seccionActualCtx.role), 'Docente');
        await page.locator('#section-profile-change').click();
        await page.getByRole('button', { name: 'Soy estudiante', exact: false }).click();
        assert.equal(await page.evaluate(() => seccionActualCtx.role), 'Estudiante');
        await page.reload();
        assert.equal(await page.locator('#profile-label').textContent(), 'estudiantes y familias');
        assert.equal(await page.locator('#card-Suplementales').isVisible(), true);
        await page.locator('#card-Suplementales').click();
        await page.locator('#card-FE').click();
        assert.equal(await page.locator('.fe-entry-card').count(), 3);
        assert.equal(await page.locator('#fe-frame').count(), 0);
        for (const vista of ['explorar', 'conexiones', 'acceso']) {
            await page.locator('#fe-card-' + vista).click();
            const frame = page.frameLocator('#fe-frame');
            await frame.locator('#pillar-selector button').first().waitFor({state:'attached'});
            for (const id of ['explorar', 'conexiones', 'acceso']) assert.equal(await frame.locator('#' + id).isVisible(), id === vista);
            if (vista === 'acceso') assert.equal(await frame.locator('#tutoriales').isVisible(), true);
            await page.locator('#section-back').click();
        }
        console.log('Live mobile page: profile choice, switching, persistence and CREO shortcuts passed');
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
