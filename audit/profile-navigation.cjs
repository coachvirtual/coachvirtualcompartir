const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true, channel: 'msedge' });
    try {
        for (const width of [390, 1440]) {
            const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
            await context.route('**/*', route => {
                const url = new URL(route.request().url());
                if (url.origin !== 'http://audit.local') return route.fulfill({ body: '', contentType: 'application/javascript' });
                const file = path.resolve(process.cwd(), '.' + (url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname)));
                if (!file.startsWith(process.cwd() + path.sep) || !fs.existsSync(file)) return route.fulfill({ status: 404, body: '' });
                return route.fulfill({ body: fs.readFileSync(file), contentType: { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png' }[path.extname(file)] || 'application/octet-stream' });
            });
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.goto('http://audit.local');
            assert.equal(await page.locator('#profile-picker').isVisible(), true);
            assert.equal(await page.locator('#card-Conocimientos').isVisible(), false);
            await page.screenshot({ path: `audit/profile-picker-${width}.png`, fullPage: true });
            // Suplementales remains available before selecting a profile.
            await page.locator('#card-Suplementales').click();
            await page.locator('#card-FE').click();
            const frame = page.frameLocator('#fe-frame');
            await frame.locator('#pillar-selector button').first().waitFor();
            for (const hash of ['explorar', 'conexiones', 'acceso', 'tutoriales', 'explorar']) {
                await page.locator(`.fe-shortcuts a[href$="#${hash}"]`).click();
                const top = await frame.locator('#' + hash).evaluate(el => el.getBoundingClientRect().top + window.frameElement.getBoundingClientRect().top);
                const headerHeight = await page.locator('header').evaluate(el => el.offsetHeight);
                assert.ok(top >= headerHeight && top < (hash === 'tutoriales' ? 600 : headerHeight + 40), `${hash} should appear below the header: ${top}`);
            }
            await frame.locator('[data-tutorial-video]').first().click();
            await page.locator('#video-modal').waitFor({ state: 'visible' });
            await page.getByRole('button', { name: 'Cerrar video', exact: true }).click();
            await page.locator('#section-back').click();
            await page.locator('#section-back').click();
            await page.getByRole('button', { name: 'Soy docente', exact: false }).click();
            assert.equal(await page.evaluate(() => localStorage.getItem('cv_perfil')), 'Docente');
            await page.reload();
            assert.equal(await page.locator('#profile-picker').isVisible(), false);
            for (const id of ['Conocimientos', 'Progreso', 'Ingles']) {
                await page.locator('#card-' + id).click();
                assert.equal(await page.locator('#grupos-container').isVisible(), true);
                assert.equal(await page.evaluate(() => seccionActualCtx.role), 'Docente');
                await page.locator('#section-back').click();
            }
            await page.locator('#card-Conocimientos').click();
            await page.locator('#section-profile-change').click();
            await page.getByRole('button', { name: 'Soy estudiante', exact: false }).click();
            assert.equal(await page.evaluate(() => seccionActualCtx.role), 'Estudiante');
            assert.equal(await page.evaluate(() => seccionActualVideos.every(v => ['Ambos', 'Estudiante'].includes(v.rol))), true);
            await page.locator('#section-profile-change').click();
            await page.locator('#profile-cancel').click();
            assert.equal(await page.evaluate(() => seccionActualCtx.role), 'Estudiante');
            await page.locator('#section-back').click();
            await page.locator('#global-search').fill('tarea');
            await page.waitForTimeout(400);
            const actual = await page.locator('#search-results [data-vid-id]').evaluateAll(els => els.map(el => el.dataset.vidId));
            const expected = await page.evaluate(() => videosDelPerfil().filter(v => coincideBusqueda(v, 'tarea')).map(v => v.id));
            assert.deepEqual(actual, expected);
            await page.locator('#global-search').fill('');
            await page.waitForTimeout(400);
            await page.screenshot({ path: `audit/profile-${width}.png`, fullPage: true });
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
            await page.reload();
            assert.equal(await page.locator('#profile-label').textContent(), 'estudiantes y familias');
            // Storage restrictions and invalid values must still allow choosing a role.
            await page.evaluate(() => localStorage.setItem('cv_perfil', 'invalid'));
            await page.reload();
            assert.equal(await page.locator('#profile-picker').isVisible(), true);
            await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error('Storage blocked'); }; });
            await page.getByRole('button', { name: 'Soy docente', exact: false }).click();
            assert.equal(await page.locator('#card-Ingles').isVisible(), true);
            assert.deepEqual(errors, []);
            await context.close();
            console.log(`${width}px: profile choice, persistence, switching, filtered search, supplemental access and CREO links passed`);
        }
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
