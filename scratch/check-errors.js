import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type().toUpperCase()}]:`, msg.text());
  });
  
  page.on('pageerror', err => {
    console.error('[UNHANDLED EXCEPTION]:', err.stack || err.message);
  });

  page.on('requestfailed', req => {
    console.log('[REQUEST FAILED]:', req.url(), req.failure()?.errorText || '');
  });

  console.log('Navigating to http://localhost:3000/ ...');
  try {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully.');
  } catch (err) {
    console.error('Failed to load page:', err);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();
