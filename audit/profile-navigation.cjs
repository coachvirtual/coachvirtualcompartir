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
            assert.equal(await page.locator('#card-Suplementales').isVisible(), false);
            await page.getByRole('button', { name: 'Soy docente', exact: false }).click();
            assert.equal(await page.locator('#card-Suplementales').isVisible(), true);
            await page.locator('#card-Suplementales').click();
            await page.locator('#card-FE').click();
            assert.equal(await page.locator('.fe-entry-card').count(), 3);
            assert.equal(await page.locator('#fe-frame').count(), 0);
            await page.screenshot({ path: `audit/fe-cards-${width}.png`, fullPage: true });
            for (const vista of ['explorar', 'conexiones', 'acceso']) {
                await page.locator('#fe-card-' + vista).click();
                const frame = page.frameLocator('#fe-frame');
                await frame.locator('#pillar-selector button').first().waitFor({ state: 'attached' });
                for (const id of ['explorar', 'conexiones', 'acceso']) assert.equal(await frame.locator('#' + id).isVisible(), id === vista);
                assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
                if (vista === 'acceso') {
                    assert.equal(await frame.locator('#tutoriales').isVisible(), true);
                    await frame.locator('[data-tutorial-video]').first().click();
                    await page.locator('#video-modal').waitFor({ state: 'visible' });
                    await page.getByRole('button', { name: 'Cerrar video', exact: true }).click();
                    // A link to another section opens that section with navigation intact.
                    await frame.locator('#acceso a[data-connection-guide]').click();
                    await page.waitForFunction(() => feVistaActual === 'conexiones');
                    await page.frameLocator('#fe-frame').locator('#connection-guide').waitFor({state:'visible'});
                }
                await page.locator('#section-back').click();
                assert.equal(await page.locator('.fe-entry-card').count(), 3);
                assert.equal(await page.locator('#fe-frame').count(), 0);
            }
            await page.locator('#fe-card-explorar').click();
            await page.getByRole('button', { name: 'Inicio', exact: true }).first().click();
            assert.equal(await page.locator('#main-menu').isVisible(), true);
            await page.locator('#card-Suplementales').click();
            await page.locator('#card-FE').click();
            await page.locator('#fe-card-acceso').click();
            await page.getByRole('button', { name: 'Cambiar perfil', exact: true }).last().click();
            assert.equal(await page.locator('#profile-picker').isVisible(), true);
            await page.locator('#profile-cancel').click();
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
            assert.equal(await page.locator('#card-Suplementales').isVisible(), false);
            await page.getByRole('button', { name: 'Soy estudiante', exact: false }).click();
            assert.equal(await page.evaluate(() => seccionActualCtx.role), 'Estudiante');
            assert.equal(await page.evaluate(() => seccionActualVideos.every(v => ['Ambos', 'Estudiante'].includes(v.rol))), true);
            await page.locator('#section-profile-change').click();
            await page.locator('#profile-cancel').click();
            assert.equal(await page.evaluate(() => seccionActualCtx.role), 'Estudiante');
            await page.locator('#section-back').click();
            assert.equal(await page.locator('#card-Suplementales').isVisible(), true);
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
