const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3002/creativity/brand-identity-strategy-agency', { waitUntil: 'networkidle2' });
  
  const data = await page.evaluate(() => {
    const main = document.querySelector('main');
    const styles = window.getComputedStyle(main);
    return {
      paddingTop: styles.paddingTop,
      position: styles.position,
      top: styles.top,
      marginTop: styles.marginTop
    };
  });
  
  console.log('Main element computed layout styles:', JSON.stringify(data, null, 2));
  await browser.close();
}

run().catch(console.error);
