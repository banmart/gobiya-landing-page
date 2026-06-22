const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to standard desktop size
  await page.setViewport({ width: 1280, height: 950 });
  
  // ── TEST 1: Homepage Header Hover ──
  console.log('1. Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  // Take screenshot of default transparent homepage header
  const screenshotPathHeaderTransparent = 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\97062dfb-172d-429f-9692-59d43cf2ee94\\scratch\\header_home_transparent.png';
  await page.screenshot({ path: screenshotPathHeaderTransparent });
  console.log(`Default homepage header screenshot saved to ${screenshotPathHeaderTransparent}`);
  
  // Hover over the header
  console.log('Hovering over the header...');
  await page.hover('#page-header');
  await new Promise(res => setTimeout(res, 500));
  
  // Take screenshot of hovered header (should turn white)
  const screenshotPathHeaderHovered = 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\97062dfb-172d-429f-9692-59d43cf2ee94\\scratch\\header_home_hovered.png';
  await page.screenshot({ path: screenshotPathHeaderHovered });
  console.log(`Hovered homepage header screenshot saved to ${screenshotPathHeaderHovered}`);

  // ── TEST 2: Sub-page Header ──
  console.log('2. Navigating to sub-page...');
  await page.goto('http://localhost:3000/capabilities', { waitUntil: 'networkidle2' });
  
  // Take screenshot of subpage header (should be solid white from start)
  const screenshotPathSubpageHeader = 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\97062dfb-172d-429f-9692-59d43cf2ee94\\scratch\\header_subpage_solid.png';
  await page.screenshot({ path: screenshotPathSubpageHeader });
  console.log(`Subpage solid header screenshot saved to ${screenshotPathSubpageHeader}`);
  
  // ── TEST 3: Footer Redesign ──
  console.log('3. Scrolling to the footer...');
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(res => setTimeout(res, 1000));
  
  const screenshotPathFooter = 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\97062dfb-172d-429f-9692-59d43cf2ee94\\scratch\\footer_redesign.png';
  await page.screenshot({ path: screenshotPathFooter });
  console.log(`Footer screenshot saved to ${screenshotPathFooter}`);

  await browser.close();
}

run().catch(console.error);
