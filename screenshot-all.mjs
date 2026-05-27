import puppeteer from 'puppeteer';
import fs from 'fs';

const url = process.argv[2] || 'http://localhost:3000';
const dir = 'temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 800));
await page.evaluate(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')));
await new Promise(r => setTimeout(r, 400));

const sections = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('section, header, footer').forEach(el => {
    const r = el.getBoundingClientRect();
    const id = el.id || el.className.split(' ')[0] || el.tagName.toLowerCase();
    out.push({ id, top: r.top + window.scrollY, height: r.height });
  });
  return out;
});

let i = 0;
for (const s of sections) {
  if (s.height < 80) continue;
  const safeId = s.id.replace(/[^a-z0-9-]/gi, '-').slice(0, 30);
  const h = Math.min(s.height, 1200);
  await page.screenshot({
    path: `${dir}/site-${String(i).padStart(2,'0')}-${safeId}.png`,
    clip: { x: 0, y: s.top, width: 1440, height: h }
  });
  console.log(`Saved site-${String(i).padStart(2,'0')}-${safeId}.png  (h=${Math.round(s.height)})`);
  i++;
}

await browser.close();
