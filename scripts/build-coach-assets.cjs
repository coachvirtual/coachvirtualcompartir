// Deterministic web derivatives; keep the original mascot untouched.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'assets/coach-bot-icon.png');
const outputs = [
  ['coach-bot-avatar.webp', 'scale=192:-1', ['-c:v', 'libwebp', '-lossless', '1']],
  ['coach-bot-favicon.png', 'scale=48:48:force_original_aspect_ratio=decrease,pad=48:48:(ow-iw)/2:(oh-ih)/2:color=0x00000000', []],
  ['coach-bot-touch.png', 'scale=180:180:force_original_aspect_ratio=decrease,pad=180:180:(ow-iw)/2:(oh-ih)/2:color=0x00000000', []]
];
for (const [name, filter, options] of outputs) {
  const output = path.join(root, 'assets', name);
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-vf', filter, '-frames:v', '1', ...options, output], { windowsHide: true });
  console.log(`${name}: ${fs.statSync(output).size} bytes`);
}
