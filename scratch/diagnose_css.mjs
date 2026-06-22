import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

function waitPort(port, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const req = http.request({ port, host: '127.0.0.1', timeout: 1000 }, (res) => {
        clearInterval(interval);
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start > timeout) {
          clearInterval(interval);
          reject(new Error(`Timeout waiting for port ${port}`));
        }
      });
      req.end();
    }, 500);
  });
}

(async () => {
  console.log('Starting dev server on port 3000...');
  const devServer = spawn('npx', ['vite', '--port=3000', '--host=127.0.0.1'], {
    shell: true,
    stdio: 'ignore',
    cwd: 'c:\\Users\\banma\\projects\\v-hero'
  });

  try {
    await waitPort(3000);
    console.log('Dev server is up. Launching browser...');

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Log all requests
    page.on('request', request => {
      if (!request.url().startsWith('data:')) {
        console.log(`[REQ] ${request.method()} ${request.url()}`);
      }
    });

    // Log responses
    page.on('response', response => {
      const url = response.url();
      if (!url.startsWith('data:')) {
        console.log(`[RES] ${response.status()} ${url} (${response.headers()['content-type']})`);
      }
    });

    // Log console messages
    page.on('console', msg => {
      console.log(`[CONSOLE] [${msg.type()}] ${msg.text()}`);
    });

    page.on('pageerror', err => {
      console.error(`[PAGE ERROR] ${err.toString()}`);
    });

    console.log('Navigating to http://127.0.0.1:3000/ ...');
    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 3000)); // wait for transitions/GSAP

    console.log('Taking screenshot...');
    const screenshotDir = 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\97062dfb-172d-429f-9692-59d43cf2ee94';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const screenshotPath = path.join(screenshotDir, 'diagnose_localhost.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);

    // Inspect some DOM properties
    const bodyClass = await page.evaluate(() => document.body.className);
    const stylesheets = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(el => ({
        href: el.href,
        media: el.media
      }));
    });
    console.log('Body classes:', bodyClass);
    console.log('Loaded stylesheets:', JSON.stringify(stylesheets, null, 2));

    await browser.close();
  } catch (err) {
    console.error('Error during diagnostics:', err);
  } finally {
    console.log('Stopping dev server...');
    devServer.kill('SIGINT');
    setTimeout(() => {
      try {
        process.kill(devServer.pid, 'SIGKILL');
      } catch (e) {}
    }, 1000);
  }
})();
