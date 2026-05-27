import puppeteer from 'puppeteer';
import fs from 'fs';

const url = process.argv[2] || 'http://localhost:3000';
const dir = 'temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 600));
await page.evaluate(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')));
await new Promise(r => setTimeout(r, 300));

const boundaries = [
  { from: '.hero', to: '.problem',           name: 'hero-to-problem' },
  { from: '.how-it-works', to: '.creds-strip', name: 'hiw-to-creds' },
  { from: '.who', to: '.quiz-section',       name: 'who-to-quiz' },
  { from: '.quiz-section', to: '.cta-section', name: 'quiz-to-contact' },
  { from: '.cta-section', to: '.footer',     name: 'contact-to-footer' },
];

for (const b of boundaries) {
  const fromBox = await page.$eval(b.from, el => {
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });
  const toBox = await page.$eval(b.to, el => {
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });
  // Capture last 240px of "from" + first 360px of "to"
  const startY = Math.max(0, (fromBox.top + fromBox.height) - 240);
  const endY = toBox.top + 360;
  const height = endY - startY;
  await page.screenshot({
    path: `${dir}/boundary-${b.name}.png`,
    clip: { x: 0, y: startY, width: 1440, height }
  });
  console.log(`Saved boundary-${b.name}.png  h=${height}`);
}

await browser.close();
