import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.bringToFront();
  
  try {
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000)); // wait for GSAP
    
    const heroHTML = await page.evaluate(() => {
      const h1 = document.querySelector('.hero h1');
      const chart = document.querySelector('.chart-wrap');
      const hero = document.querySelector('.hero-inner');
      return {
        h1: h1 ? h1.outerHTML : null,
        chart: chart ? chart.outerHTML : null,
        heroOuter: hero ? hero.outerHTML.substring(0, 500) : null
      };
    });
    console.log("ROOT HERO:", JSON.stringify(heroHTML, null, 2));

    await page.goto('http://localhost:3001/capabilities', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    
    const capHTML = await page.evaluate(() => {
      const h1 = document.querySelector('.hero h1');
      const sysmap = document.querySelector('.sysmap');
      return {
        h1: h1 ? h1.outerHTML : null,
        sysmap: sysmap ? sysmap.outerHTML.substring(0, 500) : null
      };
    });
    console.log("CAPABILITIES HERO:", JSON.stringify(capHTML, null, 2));
    
  } catch (err) {
    console.error(err);
  }
  
  await browser.close();
})();
