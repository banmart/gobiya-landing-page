const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to mobile size
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  
  console.log('Navigating to http://localhost:3000 ...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  } catch (err) {
    console.error('Failed to connect to localhost:3000:', err.message);
    await browser.close();
    return;
  }
  
  console.log('Clicking the hamburger menu button...');
  await page.click('.nav-burger');
  
  // Wait for menu animation
  await new Promise(res => setTimeout(res, 600));
  
  // Get element layout information
  const layout = await page.evaluate(() => {
    const getBox = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        selector,
        exists: true,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        position: style.position,
        display: style.display,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        zIndex: style.zIndex
      };
    };
    
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      mobileMenuContainer: getBox('.fixed.inset-0.bg-white.z-\\[40\\]'),
      mobileMenuInner: getBox('.h-full.w-full.overflow-y-auto')
    };
  });
  
  console.log('Mobile menu layout information:', JSON.stringify(layout, null, 2));
  
  // Take screenshot to inspect visually
  const screenshotPath = 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\97062dfb-172d-429f-9692-59d43cf2ee94\\scratch\\layout_mobile_menu.png';
  await page.screenshot({ path: screenshotPath });
  console.log(`Mobile menu screenshot saved to ${screenshotPath}`);
  
  await browser.close();
}

run().catch(console.error);
