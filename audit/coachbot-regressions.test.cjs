const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const live = process.argv.includes('--live');
  const base = live ? 'https://coachvirtual.github.io/coachvirtualcompartir/' : 'http://audit.local/';
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = [];
  try {
    for (const [width, height] of [[320, 740], [820, 1180], [1366, 900]]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
      const errors = [], missing = [], iconWarnings = [];
      page.on('pageerror', error => errors.push(error.message));
      if (live) page.on('response', response => {
        if (response.url().startsWith(base) && response.status() >= 400) missing.push(response.url());
      });
      page.on('console', message => {
        if (message.text().includes('icon name was not found')) iconWarnings.push(message.text());
      });
      await page.route('**/*', route => {
        const url = new URL(route.request().url());
        if (live && url.hostname === 'coachvirtual.github.io') return route.continue();
        if (url.origin !== 'http://audit.local') return route.fulfill({ body: '', contentType: 'application/javascript' });
        const file = path.resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
        if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
          missing.push(url.pathname);
          return route.fulfill({ status: 404, body: '' });
        }
        const contentType = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ttf': 'font/ttf' }[path.extname(file)] || 'application/octet-stream';
        return route.fulfill({ body: fs.readFileSync(file), contentType });
      });
      await page.goto(base + '?cleanup=' + (process.env.COACH_RELEASE || 'published'));
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => { window.originalDockIcon = document.querySelector('.coach-dock svg'); });
      await page.getByRole('button', { name: 'Abrir Coach Bot', exact: true }).click();
      await page.waitForTimeout(250);
      const initial = await page.evaluate(() => ({
        icons: [...document.querySelectorAll('#chat-msgs .bot-option')].map(button => button.querySelector('svg')?.dataset.lucide),
        text: document.querySelector('#chat-msgs').textContent,
        sameDock: document.querySelector('.coach-dock svg') === window.originalDockIcon,
        overflow: document.documentElement.scrollWidth > innerWidth,
        images: [...document.querySelectorAll('img[src*="coach-bot-avatar"]')].map(img => ({ loaded: img.complete && img.naturalWidth > 0, width: img.naturalWidth })),
        bounds: document.querySelector('#coachbot-modal>div').getBoundingClientRect().bottom <= innerHeight
      }));
      assert.deepEqual(initial.icons, ['graduation-cap', 'backpack', 'circle-help', 'blocks', 'list']);
      assert.equal(/\p{Extended_Pictographic}/u.test(initial.text), false);
      assert.equal(initial.sameDock, true);
      assert.equal(initial.overflow, false);
      assert.equal(initial.bounds, true);
      assert.ok(initial.images.every(img => img.loaded && img.width === 192));
      await page.screenshot({ path: `audit/coachbot-cleanup-${live ? 'published-' : ''}${width}.png` });

      // Repeated activation must not change the role or enqueue another response.
      const rapid = await page.evaluate(async () => {
        handleUserClick('Soy Docente', 'menu_profesor');
        handleUserClick('Soy Estudiante', 'menu_estudiante');
        document.querySelector('#chat-input').value = 'Conservar este borrador';
        sendFreeText();
        const busy = document.querySelector('#chat-send').disabled;
        await new Promise(resolve => setTimeout(resolve, 650));
        return { busy, draft: document.querySelector('#chat-input').value,
          topics: [...document.querySelectorAll('[data-bot-topic]')].map(el => el.dataset.botTopic),
          role: botMemoria.ultimoRol, enabled: !document.querySelector('#chat-send').disabled };
      });
      assert.deepEqual(rapid, { busy: true, draft: 'Conservar este borrador', topics: ['inicio', 'menu_profesor'], role: 'docente', enabled: true });

      const reset = await page.evaluate(async () => {
        showTypingAndRespond('docente_tarea');
        initBot();
        await new Promise(resolve => setTimeout(resolve, 650));
        return { topics: [...document.querySelectorAll('[data-bot-topic]')].map(el => el.dataset.botTopic), busy: document.querySelector('#chat-msgs').getAttribute('aria-busy'), typing: document.querySelectorAll('[aria-label="El bot está escribiendo"]').length };
      });
      assert.deepEqual(reset, { topics: ['inicio'], busy: 'false', typing: 0 });

      // Exercise a real legacy tutorial control and nested modal keyboard behavior.
      await page.evaluate(() => { renderBotResponse('docente_tarea'); });
      const tutorial = page.locator('[data-bot-topic="docente_tarea"]').getByRole('button', { name: 'Ver Video Tutorial' });
      assert.equal(await tutorial.locator('svg[data-lucide="play-circle"]').count(), 1);
      await tutorial.click();
      assert.equal(await page.locator('#video-modal').isVisible(), true);
      assert.equal(await page.evaluate(() => videoActualId), 'KXROB84Q3IU');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#video-modal').isVisible(), false);
      assert.equal(await page.locator('#coachbot-modal').isVisible(), true);

      const allTopics = await page.evaluate(() => {
        initBot();
        for (const topic of Object.keys(BOT_DATA)) renderBotResponse(topic);
        const before = [...document.querySelectorAll('svg[data-lucide]')];
        lucide.createIcons();
        return { count: Object.keys(BOT_DATA).length,
          unresolved: [...document.querySelectorAll('i[data-lucide]')].map(icon => icon.outerHTML),
          existingPreserved: before.every(icon => icon.isConnected),
          decorative: [...document.querySelectorAll('#chat-msgs svg')].every(icon => icon.getAttribute('aria-hidden') === 'true' && icon.getAttribute('focusable') === 'false'),
          backButtons: [...document.querySelectorAll('#chat-msgs .bot-option')].filter(button => /^(Volver|Cambiar perfil)/.test(button.textContent)).map(button => [...button.querySelectorAll('svg')].map(icon => icon.dataset.lucide)),
          legacyHandlers: document.querySelectorAll('#chat-msgs [onclick]').length,
          emoji: /\p{Extended_Pictographic}/u.test(document.querySelector('#chat-msgs').textContent)
        };
      });
      assert.equal(allTopics.count, 102);
      assert.deepEqual(allTopics.unresolved, []);
      assert.equal(allTopics.existingPreserved, true);
      assert.equal(allTopics.decorative, true);
      assert.ok(allTopics.backButtons.length > 40);
      assert.ok(allTopics.backButtons.every(icons => icons.length === 1 && icons[0] === 'arrow-left'));
      assert.equal(allTopics.legacyHandlers, 0);
      assert.equal(allTopics.emoji, false);

      // The removed routes modal must not remove the active ordered video groups.
      const progress = await page.evaluate(() => {
        cerrarCoachBot();
        openRoleSelection('Conocimientos');
        loadFilteredContent('Conocimientos', 'Docente');
        videoActualId = 'Bv_FinX79vk';
        marcarVisto();
        return { saved: getVistos().includes(videoActualId), completed: document.querySelectorAll('#section-content .ruta-paso.completado').length };
      });
      assert.equal(progress.saved, true);
      assert.ok(progress.completed > 0);
      assert.deepEqual(errors, []);
      assert.deepEqual(missing, []);
      assert.deepEqual(iconWarnings, []);
      results.push({ width, height, passed: true, topics: allTopics.count, backButtons: allTopics.backButtons.length, checks: ['consistent icons', 'local SVG updates', 'rapid send guard', 'cancel reset timer', 'legacy video buttons', 'nested Escape', 'all topic icons', 'active progress refresh', 'light mascot'] });
      await page.close();
    }
    const bytes = { mascot: fs.statSync(path.join(root, 'assets/coach-bot-avatar.webp')).size, icons: fs.statSync(path.join(root, 'js/vendor/lucide-icons.js')).size };
    assert.ok(bytes.mascot < 40000 && bytes.icons < 50000);
    fs.writeFileSync(path.join(__dirname, `coachbot-regressions-${live ? 'published-' : ''}results.json`), JSON.stringify({ url: base, results, bytes }, null, 2));
    console.log(JSON.stringify({ results, bytes }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
