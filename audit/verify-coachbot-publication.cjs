const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const base = 'https://coachvirtual.github.io/coachvirtualcompartir/';
const root = path.resolve(__dirname, '..');
const release = process.argv[2] || 'cleanup';
const files = [
  ...fs.readdirSync(root).filter(file => file.endsWith('.html')),
  ...fs.readdirSync(path.join(root, 'js')).filter(file => file.endsWith('.js')).map(file => 'js/' + file),
  'js/vendor/lucide-icons.js', 'css/style.css', 'css/tailwind.css',
  'css/creo.css', 'css/creo-connections.css', 'assets/fonts/fonts.css',
  'assets/coach-bot-avatar.webp', 'assets/coach-bot-favicon.png', 'assets/coach-bot-touch.png'
];
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
(async () => {
  const checks = await Promise.all(files.map(async file => {
    try {
      const response = await fetch(base + file + '?release=' + encodeURIComponent(release), { signal: AbortSignal.timeout(20000) });
      if (!response.ok) return { file, status: response.status, match: false };
      const binary = /\.(png|webp)$/.test(file);
      const remote = binary ? Buffer.from(await response.arrayBuffer()) : (await response.text()).replace(/\r\n/g, '\n');
      const local = binary ? fs.readFileSync(path.join(root, file)) : fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
      return { file, status: response.status, match: hash(remote) === hash(local) };
    } catch (error) { return { file, match: false, error: error.message }; }
  }));
  const report = { url: base, release, verifiedAt: new Date().toISOString(), allMatch: checks.every(check => check.match), checks };
  fs.writeFileSync(path.join(__dirname, 'coachbot-publication-verification.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ url: base, release, matched: checks.filter(check => check.match).length, total: checks.length, failures: checks.filter(check => !check.match) }, null, 2));
  if (!report.allMatch) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
