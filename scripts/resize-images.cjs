const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const basePath = path.join(process.cwd(), 'public', 'images');

const imagesToResize = [
  { name: 'logo-DeEgMiH0.png', optName: 'logo-DeEgMiH0-opt.png', width: 128 },
  { name: 'quickpass-logo.webp', optName: 'quickpass-logo-opt.webp', width: 400 },
  { name: 'totalcapital.webp', optName: 'totalcapital-opt.webp', width: 128 },
  { name: 'remodelmepros.webp', optName: 'remodelmepros-opt.webp', width: 264 }
];

async function run() {
  for (const img of imagesToResize) {
    const filePath = path.join(basePath, img.name);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${img.name}`);
      continue;
    }
    const optPath = path.join(basePath, img.optName);
    
    await sharp(filePath)
      .resize({ width: img.width, withoutEnlargement: true })
      .toFile(optPath);
      
    console.log(`Resized ${img.name} to ${img.optName} (width ${img.width})`);
  }
}

run().catch(console.error);
