const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const thumbnailPng = 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\d399c5af-a5a4-4386-8897-50dca9ac0a56\\okf_thumbnail_1781707311812.png';
const secondaryPng = 'C:\\Users\\banma\\.gemini\\antigravity\\brain\\d399c5af-a5a4-4386-8897-50dca9ac0a56\\okf_secondary_1781707326423.png';

const targetDir = path.resolve(__dirname, '../public/images');
const thumbnailWebp = path.join(targetDir, 'article-introducing-open-knowledge-format-thumbnail.webp');
const secondaryWebp = path.join(targetDir, 'article-introducing-open-knowledge-format-diagram.webp');

async function convert() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log('Converting thumbnail...');
  await sharp(thumbnailPng)
    .webp({ quality: 85 })
    .toFile(thumbnailWebp);
  console.log('Thumbnail converted to:', thumbnailWebp);

  console.log('Converting secondary image...');
  await sharp(secondaryPng)
    .webp({ quality: 85 })
    .toFile(secondaryWebp);
  console.log('Secondary image converted to:', secondaryWebp);

  console.log('Conversion successful!');
}

convert().catch(err => {
  console.error('Error converting images:', err);
  process.exit(1);
});
