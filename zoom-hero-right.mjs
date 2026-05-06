import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

// Crop just the right half of the hero (stat cards)
const heroVisual = await page.$('.hero-visual');
await heroVisual.screenshot({ path: 'temporary screenshots/zoom-hero-visual.png' });

// Also verify "Always ready." color
const accentColor = await page.evaluate(() => {
  const accent = document.querySelector('.hero-headline .accent');
  return accent ? getComputedStyle(accent).color : null;
});
console.log('Accent color:', accentColor);

const trustBg = await page.evaluate(() => {
  const trust = document.querySelector('.hero-trust');
  const cs = getComputedStyle(trust);
  return { bg: cs.backgroundColor, border: cs.borderColor, shadow: cs.boxShadow };
});
console.log('Trust bar:', JSON.stringify(trustBg));

await browser.close();
