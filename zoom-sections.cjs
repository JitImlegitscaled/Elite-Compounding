const puppeteer = require('C:/Users/nateh/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Users/nateh/.cache/puppeteer/chrome/win64-131.0.6778.204/chrome-win64/chrome.exe',
    args: ['--no-sandbox']
  });
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
})();
