// Use the same maintained scenarios locally and after deployment.
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const result = spawnSync(process.execPath, [path.join(__dirname, 'coachbot-browser.test.cjs'), '--live'], { stdio: 'inherit', windowsHide: true });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
