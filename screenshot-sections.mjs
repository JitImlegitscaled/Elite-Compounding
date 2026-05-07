import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 45000 });

// Force all reveal elements visible for screenshot
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
});

await new Promise(r => setTimeout(r, 500));

// Why Elite section
const whyEl = await page.$('[id="why"]');
if (whyEl) {
  const box = await whyEl.boundingBox();
  await page.screenshot({ path: 'temporary screenshots/why-crop3.png', clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 820) } });
  console.log('Why Elite crop saved, height:', box.height);
}

// Services banner
const banner = await page.$('.services-banner');
if (banner) {
  const box2 = await banner.boundingBox();
  await page.screenshot({ path: 'temporary screenshots/services-banner-crop2.png', clip: { x: 0, y: box2.y - 60, width: 1440, height: box2.height + 100 } });
  console.log('Services banner crop saved');
}

// Footer Company column + bottom bar
const footer = await page.$('footer');
if (footer) {
  const box3 = await footer.boundingBox();
  await page.screenshot({ path: 'temporary screenshots/footer-crop2.png', clip: { x: 0, y: box3.y, width: 1440, height: Math.min(box3.height, 400) } });
  console.log('Footer crop saved');
}

await browser.close();
