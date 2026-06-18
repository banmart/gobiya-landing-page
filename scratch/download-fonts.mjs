import fs from 'fs';
import path from 'path';
import https from 'https';

const FONTS_DIR = path.join(process.cwd(), 'public', 'fonts');

if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

const FONTS_URL = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Geist:wght@300;400;500&family=Geist+Mono:wght@400;500&display=swap";

// Request with modern UA to get WOFF2
const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  }
};

https.get(FONTS_URL, options, (res) => {
  let css = '';
  res.on('data', chunk => css += chunk);
  res.on('end', async () => {
    // parse url(...)
    const urls = [];
    const regex = /url\((https:\/\/fonts\.gstatic\.com\/s\/[^)]+)\)/g;
    let match;
    while ((match = regex.exec(css)) !== null) {
      urls.push(match[1]);
    }
    
    // Download and replace
    let index = 1;
    let finalCss = css;
    for (const url of new Set(urls)) {
      const ext = url.split('.').pop();
      const fontName = `font-${index++}.${ext}`;
      const filePath = path.join(FONTS_DIR, fontName);
      
      console.log(`Downloading ${url} to ${fontName}`);
      
      await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
          response.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', reject);
      });
      
      finalCss = finalCss.replaceAll(url, `/fonts/${fontName}`);
    }
    
    fs.writeFileSync('scratch/fonts.css', finalCss);
    console.log('Done! Generated scratch/fonts.css');
  });
}).on('error', (err) => {
  console.error(err);
});
