const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convert() {
  const images = [
    { src: 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\40859e9f-a412-48be-ba57-eb9501f2c59e\\llm_content_thumbnail_1782832031695.png', dest: 'public/images/llm-content-pickup-thumbnail.webp' },
    { src: 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\40859e9f-a412-48be-ba57-eb9501f2c59e\\llm_content_secondary_1782832041473.png', dest: 'public/images/llm-content-pickup-secondary.webp' }
  ];

  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }

  for (const img of images) {
    if (fs.existsSync(img.src)) {
      await sharp(img.src).webp({ quality: 80 }).toFile(img.dest);
      console.log('Converted', img.dest);
    } else {
      console.error('Source not found:', img.src);
    }
  }
}

convert();
