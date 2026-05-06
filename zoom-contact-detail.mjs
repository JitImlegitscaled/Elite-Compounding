import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

// Scroll to contact
await page.evaluate(() => document.querySelector('.cta-section').scrollIntoView());
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: 'temporary screenshots/zoom-contact2.png', fullPage: false });

// Check dropdown options
const options = await page.$$eval('#contact-facility option', opts => opts.map(o => ({ value: o.value, text: o.textContent })));
console.log('Dropdown options:', JSON.stringify(options, null, 2));

// Check computed styles
const heroStyle = await page.evaluate(() => {
  const hero = document.querySelector('.hero');
  const cs = getComputedStyle(hero);
  return { background: cs.background, backgroundColor: cs.backgroundColor };
});
console.log('Hero computed bg:', JSON.stringify(heroStyle));

const statCardStyle = await page.evaluate(() => {
  const card = document.querySelector('.stat-card');
  if (!card) return null;
  const cs = getComputedStyle(card);
  return { background: cs.backgroundColor, border: cs.border, boxShadow: cs.boxShadow };
});
console.log('Stat card style:', JSON.stringify(statCardStyle));

await browser.close();
