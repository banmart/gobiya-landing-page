const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artifactsDir = 'C:\\\\Users\\\\banma\\\\.gemini\\\\antigravity\\\\brain\\\\03e6f0b9-2875-472d-9f2e-5296a77d305f';
const outputDir = 'c:\\\\Users\\\\banma\\\\projects\\\\v-hero\\\\public\\\\images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(artifactsDir);

const imageFiles = files.filter(f => f.endsWith('.png'));

async function processImages() {
  for (const file of imageFiles) {
    const filePath = path.join(artifactsDir, file);
    // Extract base name without timestamp (e.g. seo_hero_1779934354096.png -> seo_hero.webp)
    const baseMatch = file.match(/([a-zA-Z0-9_]+)_\d+\.png$/);
    if (baseMatch) {
      const baseName = baseMatch[1];
      const outputPath = path.join(outputDir, `${baseName}.webp`);
      console.log(`Converting ${file} to ${baseName}.webp`);
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outputPath);
      } catch (e) {
        console.error(`Failed to convert ${file}:`, e);
      }
    }
  }
}

processImages().then(() => console.log('Done converting images.'));
