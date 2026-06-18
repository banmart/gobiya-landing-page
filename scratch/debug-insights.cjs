const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.stack || error.message));
  page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure().errorText));

  console.log('Navigating to http://localhost:3000/insights...');
  try {
    await page.goto('http://localhost:3000/insights', { waitUntil: 'networkidle2' });
    console.log('Page loaded. Waiting 2 seconds...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const content = await page.content();
    console.log('HTML length:', content.length);

    const bodyEmpty = await page.evaluate(() => {
      const body = document.body;
      return body ? body.innerHTML.trim().substring(0, 1000) : 'NO BODY';
    });
    console.log('Body HTML snippet:', bodyEmpty);

  } catch (err) {
    console.error('Navigation error:', err);
  } finally {
    await browser.close();
  }
})();
