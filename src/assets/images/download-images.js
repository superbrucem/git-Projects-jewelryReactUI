import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = __dirname;

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

// Real gemstone images
const images = [
  {
    url: 'https://i.etsystatic.com/9059700/r/il/b0a1a4/3600955501/il_794xN.3600955501_qxd3.jpg',
    filename: 'apatite1.jpg'
  },
  {
    url: 'https://i.etsystatic.com/9059700/r/il/a9c0a9/3600955499/il_794xN.3600955499_rlqm.jpg',
    filename: 'apatite2.jpg'
  },
  {
    url: 'https://i.etsystatic.com/9059700/r/il/e1c5e9/3553284628/il_794xN.3553284628_8q4h.jpg',
    filename: 'apatite3.jpg'
  },
  {
    url: 'https://i.etsystatic.com/9059700/r/il/0e2a5a/3553284626/il_794xN.3553284626_6kxz.jpg',
    filename: 'apatite4.jpg'
  },
  {
    url: 'https://i.etsystatic.com/9059700/r/il/e1c5e9/3553284628/il_794xN.3553284628_8q4h.jpg',
    filename: 'apatite5.jpg'
  },
  {
    url: 'https://i.etsystatic.com/9059700/r/il/0e2a5a/3553284626/il_794xN.3553284626_6kxz.jpg',
    filename: 'apatite6.jpg'
  },
  {
    url: 'https://i.etsystatic.com/9059700/r/il/b0a1a4/3600955501/il_794xN.3600955501_qxd3.jpg',
    filename: 'apatite7.jpg'
  },
  {
    url: 'https://i.etsystatic.com/9059700/r/il/a9c0a9/3600955499/il_794xN.3600955499_rlqm.jpg',
    filename: 'apatite8.jpg'
  }
];

// Download all images
images.forEach(image => {
  downloadImage(image.url, image.filename);
});

console.log('Started downloading images...');
