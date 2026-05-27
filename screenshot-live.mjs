import puppeteer from 'puppeteer';

const url = process.argv[2];
const label = process.argv[3] || 'live';
if (!url) { console.error('Usage: node screenshot-live.mjs <url> [label]'); process.exit(1); }

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
// Visit shareable URL first to set the auth cookie, then go to root.
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 800));

const fs = await import('fs');
const dir = 'temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// Full-page hero shot (above fold)
await page.screenshot({ path: `${dir}/live-${label}-hero.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
console.log(`Saved ${dir}/live-${label}-hero.png`);

// Why Elite section
await page.evaluate(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')));
const why = await page.$('#why');
if (why) {
  const box = await why.boundingBox();
  await page.screenshot({ path: `${dir}/live-${label}-why.png`, clip: { x: 0, y: box.y, width: 1440, height: Math.min(box.height, 900) } });
  console.log(`Saved ${dir}/live-${label}-why.png`);
}

await browser.close();
