const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to standard desktop size
  await page.setViewport({ width: 1280, height: 950 });
  
  console.log('Navigating to http://localhost:3000 ...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  } catch (err) {
    console.error('Failed to connect to localhost:3000:', err.message);
    await browser.close();
    return;
  }
  
  console.log('Scrolling to the console section with offset...');
  await page.evaluate(() => {
    const el = document.getElementById('diagnose');
    if (el) {
      const rect = el.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + rect.top - 150);
    }
  });
  
  // Wait a bit for scroll animation to settle
  await new Promise(res => setTimeout(res, 800));
  
  // Let's run a test scan!
  console.log('Running a test scan for google.com...');
  await page.type('#domain-input', 'google.com');
  await page.click('#console-run');
  
  // Wait 10 seconds for simulation to complete fully
  console.log('Waiting 10 seconds for scan simulation to complete...');
  await new Promise(res => setTimeout(res, 10000));
  
  // Take screenshot after scan
  const screenshotPath = 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\97062dfb-172d-429f-9692-59d43cf2ee94\\scratch\\console_light_completed.png';
  await page.screenshot({ path: screenshotPath });
  console.log(`Completed scanned console screenshot saved to ${screenshotPath}`);
  
  await browser.close();
}

run().catch(console.error);
