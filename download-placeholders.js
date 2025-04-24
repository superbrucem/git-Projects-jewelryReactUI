import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, 'src', 'assets', 'images');

// Create directory if it doesn't exist
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Function to download an image
function downloadImage(url, filename) {
  const filepath = path.join(imageDir, filename);
  const file = fs.createWriteStream(filepath);

  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', err => {
    fs.unlink(filepath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
}

// Download placeholder images for apatite gemstones
for (let i = 1; i <= 8; i++) {
  downloadImage('https://via.placeholder.com/300x300/00CED1/FFFFFF?text=Apatite+' + i, `apatite${i}.jpg`);
}

console.log('Started downloading placeholder images...');
