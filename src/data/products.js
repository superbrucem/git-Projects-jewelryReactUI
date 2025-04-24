// Import placeholder images
import { placeholderImages } from '../assets/images/placeholder-images';

// Use the imported images
const { blue, green, teal, purple } = placeholderImages;

// Define image URLs for each product
const apatite1 = blue;
const apatite2 = teal;
const apatite3 = blue;
const apatite4 = green;
const apatite5 = teal;
const apatite6 = purple;
const apatite7 = blue;
const apatite8 = green;

// Sample product data
const products = [
  {
    id: 1,
    name: '7x5.5 mm Pear 1.05ct Brilliant Luster Natural Blue Green Apatite [Flawless-VVS]',
    price: 24.99,
    image: apatite1,
    category: '5-elements',
    collection: 'Fire',
    inStock: true,
    stock: 10,
    description: "This beautiful pear-shaped apatite gemstone features exceptional clarity and brilliant luster, perfect for creating stunning jewelry pieces."
  },
  {
    id: 2,
    name: '6.00 mm Cushion 1.22ct AAA Luster Natural Blue Green Apatite [Flawless-VVS]',
    price: 29.99,
    image: apatite2,
    category: '5-elements',
    collection: 'Water',
    inStock: true,
    stock: 5,
    description: "This cushion-cut apatite gemstone showcases a vibrant blue-green color with AAA luster, ideal for statement rings or pendants."
  },
  {
    id: 3,
    name: '7x6 mm Oval 1.40ct AAA Fire Luster Natural Blue Green Apatite [VVS]',
    price: 31.99,
    image: apatite3,
    category: 'greek-gods',
    collection: 'Poseidon',
    inStock: true,
    stock: 3,
    description: "This oval-shaped apatite gemstone displays exceptional fire and luster with a vivid blue-green color, perfect for unique jewelry designs."
  },
  {
    id: 4,
    name: '7x6 mm Cushion 1.00ct AAA Luster Natural Blue Green Apatite [VVS]',
    price: 24.99,
    image: apatite4,
    category: 'greek-gods',
    collection: 'Zeus',
    inStock: true,
    stock: 8,
    description: "This cushion-cut apatite gemstone features AAA luster with a beautiful blue-green color, perfect for elegant jewelry pieces."
  },
  {
    id: 5,
    name: '6x5.5 mm Cushion 1.08ct AAA Luster Natural Blue Green Apatite [Flawless-VVS]',
    price: 24.99,
    image: apatite5,
    category: 'underworld',
    collection: 'Hades',
    inStock: true,
    stock: 2,
    description: "This cushion-cut apatite gemstone displays flawless clarity with AAA luster, ideal for high-end jewelry creations."
  },
  {
    id: 6,
    name: '6.5x6 mm Oval 1.18ct AAA Fire Luster Natural Intense Blue Apatite [VVS]',
    price: 27.99,
    image: apatite6,
    category: 'underworld',
    collection: 'Persephone',
    inStock: true,
    stock: 4,
    description: "This oval-shaped apatite gemstone showcases intense blue color with exceptional fire and luster, perfect for unique jewelry designs."
  },
  {
    id: 7,
    name: '7x6 mm Oval 1.10ct AAA Fire Luster Natural Intense Blue Green Apatite [Flawless-VVS]',
    price: 27.99,
    image: apatite7,
    category: '5-elements',
    collection: 'Earth',
    inStock: true,
    stock: 6,
    description: "This oval-shaped apatite gemstone features intense blue-green color with AAA fire luster, ideal for statement jewelry pieces."
  },
  {
    id: 8,
    name: '7x6 mm Pear 1.28ct Brilliant Luster Natural Blue Green Apatite [Flawless-VVS]',
    price: 29.99,
    image: apatite8,
    category: '5-elements',
    collection: 'Air',
    inStock: true,
    stock: 1,
    description: "This pear-shaped apatite gemstone displays brilliant luster with a vibrant blue-green color, perfect for creating unique jewelry pieces."
  }
];

export default products;
