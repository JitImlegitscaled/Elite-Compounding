import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const width = parseInt(process.argv[2] || '1440');
const tag = process.argv[3] || `audit-${width}`;

const existing = fs.readdirSync(dir)
  .map(f => { const m = f.match(/^screenshot-(\d+)/); return m ? parseInt(m[1]) : 0; })
  .filter(Boolean);
let next = existing.length ? Math.max(...existing) + 1 : 1;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 45000 });

await page.evaluate(() => {
  document.querySelectorAll('.reveal,.reveal-up,.reveal-left,.reveal-right,.fade-in').forEach(el => {
    el.classList.add('visible','in-view','is-visible');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});
await new Promise(r => setTimeout(r, 800));

const targets = [
  '.hero','.problem','.services','.how-it-works','.creds-strip','.why','.who','.quiz-section','.cta-section','footer'
];

for (const sel of targets) {
  const el = await page.$(sel);
  if (!el) { console.log('miss', sel); continue; }
  const box = await el.boundingBox();
  const name = sel.replace(/[^a-z]/gi,'') || 'el';
  const out = path.join(dir, `screenshot-${next}-${tag}-${name}.png`);
  await page.screenshot({ path: out, clip: { x: 0, y: Math.max(0, box.y), width, height: Math.min(box.height, 2400) } });
  console.log(`Saved ${name}: screenshot-${next}-${tag}-${name}.png  h=${Math.round(box.height)}`);
  next++;
}

await browser.close();
