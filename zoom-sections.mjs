import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

const sections = [
  ['.hero', 'zoom-hero'],
  ['.services', 'zoom-services'],
  ['.stats', 'zoom-stats'],
  ['.why', 'zoom-why'],
  ['.problem', 'zoom-problem'],
  ['.cta-section', 'zoom-contact'],
];

for (const [sel, name] of sections) {
  const el = await page.$(sel);
  if (el) {
    await el.screenshot({ path: `temporary screenshots/${name}.png` });
    console.log('saved ' + name);
  }
}

await browser.close();
