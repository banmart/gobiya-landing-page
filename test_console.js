import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  console.log("Navigating to localhost:3001...");
  try {
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
    console.log("Root loaded. Wait 1s...");
    await new Promise(r => setTimeout(r, 1000));
    
    console.log("Navigating to /capabilities...");
    await page.goto('http://localhost:3001/capabilities', { waitUntil: 'networkidle2' });
    console.log("Capabilities loaded. Wait 1s...");
    await new Promise(r => setTimeout(r, 1000));
    
  } catch (err) {
    console.error("Navigation error:", err);
  }
  
  await browser.close();
})();
