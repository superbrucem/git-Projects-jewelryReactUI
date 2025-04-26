// Import placeholder images
import { placeholderImages } from '../assets/images/placeholder-images';
// Import video URLs
import { productVideos } from '../assets/videos/video-urls';

// Use the imported images
const { blue, green, teal, purple, red, yellow, orange, pink } = placeholderImages;
// Use the imported videos
const {
  blue1, blue2,
  green1, green2,
  teal1, teal2,
  purple1, purple2,
  red1, red2,
  yellow1, yellow2,
  orange1, orange2,
  pink1, pink2
} = productVideos;

// Define image URLs for each product
const apatite1 = blue;
const apatite2 = teal;
const apatite3 = blue;
const apatite4 = green;
const apatite5 = teal;
const apatite6 = purple;
const apatite7 = blue;
const apatite8 = green;

// Define additional images for signature collections
const fireElement = red;
const waterElement = blue;
const earthElement = green;
const airElement = teal;
const aetherElement = purple;

const zeusElement = yellow;
const poseidonElement = blue;
const athenaElement = green;
const apolloElement = orange;
const aphroditeElement = pink;

const hadesElement = purple;
const persephoneElement = red;
const cerberusElement = teal;
const styxElement = blue;
const elysiumElement = yellow;

// Sample product data
const products = [
  // 5 Elements Collection
  {
    id: 1,
    name: '7x5.5 mm Pear 1.05ct Brilliant Luster Natural Blue Green Apatite [Flawless-VVS]',
    price: 24.99,
    image: apatite1,
    videoUrl: blue1,
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
    videoUrl: teal1,
    category: '5-elements',
    collection: 'Water',
    inStock: true,
    stock: 5,
    description: "This cushion-cut apatite gemstone showcases a vibrant blue-green color with AAA luster, ideal for statement rings or pendants."
  },
  {
    id: 7,
    name: '7x6 mm Oval 1.10ct AAA Fire Luster Natural Intense Blue Green Apatite [Flawless-VVS]',
    price: 27.99,
    image: apatite7,
    videoUrl: blue2,
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
    videoUrl: green1,
    category: '5-elements',
    collection: 'Air',
    inStock: true,
    stock: 1,
    description: "This pear-shaped apatite gemstone displays brilliant luster with a vibrant blue-green color, perfect for creating unique jewelry pieces."
  },
  {
    id: 9,
    name: '8x6 mm Oval 1.35ct AAA Fire Luster Natural Purple Apatite [VVS]',
    price: 34.99,
    image: aetherElement,
    videoUrl: purple1,
    category: '5-elements',
    collection: 'Aether',
    inStock: true,
    stock: 3,
    description: "This oval-shaped purple apatite gemstone represents the fifth element, Aether, with its mystical color and exceptional clarity."
  },
  {
    id: 10,
    name: 'Fire Element Pendant - 14K Gold with Ruby and Diamond Accents',
    price: 349.99,
    image: fireElement,
    category: '5-elements',
    collection: 'Fire',
    inStock: true,
    stock: 2,
    description: "This stunning pendant embodies the essence of Fire with vibrant ruby gemstones set in 14K gold with diamond accents."
  },
  {
    id: 11,
    name: 'Water Element Earrings - Sterling Silver with Blue Sapphire',
    price: 189.99,
    image: waterElement,
    category: '5-elements',
    collection: 'Water',
    inStock: true,
    stock: 4,
    description: "These elegant earrings capture the flowing beauty of Water with blue sapphires set in sterling silver."
  },
  {
    id: 12,
    name: 'Earth Element Ring - 14K Rose Gold with Emerald and Brown Diamond',
    price: 279.99,
    image: earthElement,
    category: '5-elements',
    collection: 'Earth',
    inStock: true,
    stock: 3,
    description: "This grounding ring represents Earth with rich emerald and brown diamonds set in warm rose gold."
  },
  {
    id: 13,
    name: 'Air Element Bracelet - Sterling Silver with White Topaz',
    price: 159.99,
    image: airElement,
    category: '5-elements',
    collection: 'Air',
    inStock: true,
    stock: 5,
    description: "This light and airy bracelet embodies the Air element with clear white topaz gemstones in a delicate sterling silver setting."
  },
  {
    id: 14,
    name: 'Aether Element Necklace - Platinum with Amethyst and Diamond',
    price: 399.99,
    image: aetherElement,
    category: '5-elements',
    collection: 'Aether',
    inStock: true,
    stock: 2,
    description: "This mystical necklace represents the ethereal fifth element with rich purple amethyst and diamond accents in platinum."
  },

  // Greek Gods Collection
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
    id: 15,
    name: 'Zeus Lightning Bolt Pendant - 18K Gold with Yellow Sapphire',
    price: 459.99,
    image: zeusElement,
    category: 'greek-gods',
    collection: 'Zeus',
    inStock: true,
    stock: 2,
    description: "This powerful pendant features Zeus's lightning bolt crafted in 18K gold with brilliant yellow sapphires."
  },
  {
    id: 16,
    name: 'Poseidon Trident Ring - Sterling Silver with Blue Topaz',
    price: 229.99,
    image: poseidonElement,
    category: 'greek-gods',
    collection: 'Poseidon',
    inStock: true,
    stock: 3,
    description: "This majestic ring features Poseidon's trident in sterling silver with deep blue topaz representing the ocean's depths."
  },
  {
    id: 17,
    name: 'Athena Owl Earrings - 14K White Gold with Emerald Eyes',
    price: 319.99,
    image: athenaElement,
    category: 'greek-gods',
    collection: 'Athena',
    inStock: true,
    stock: 4,
    description: "These wise owl earrings represent Athena's wisdom, crafted in 14K white gold with emerald eyes."
  },
  {
    id: 18,
    name: 'Apollo Sun Bracelet - 14K Yellow Gold with Citrine',
    price: 289.99,
    image: apolloElement,
    category: 'greek-gods',
    collection: 'Apollo',
    inStock: true,
    stock: 2,
    description: "This radiant bracelet features Apollo's sun symbol in 14K yellow gold with brilliant citrine gemstones."
  },
  {
    id: 19,
    name: 'Aphrodite Heart Necklace - 14K Rose Gold with Pink Sapphire',
    price: 349.99,
    image: aphroditeElement,
    category: 'greek-gods',
    collection: 'Aphrodite',
    inStock: true,
    stock: 3,
    description: "This romantic necklace embodies Aphrodite's love with a heart design in rose gold and pink sapphires."
  },

  // Underworld Collection
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
    id: 20,
    name: 'Hades Helm of Darkness Ring - Black Rhodium with Black Diamond',
    price: 399.99,
    image: hadesElement,
    category: 'underworld',
    collection: 'Hades',
    inStock: true,
    stock: 2,
    description: "This mysterious ring represents Hades' Helm of Darkness, crafted in black rhodium with black diamonds."
  },
  {
    id: 21,
    name: 'Persephone Pomegranate Pendant - 14K Rose Gold with Ruby',
    price: 329.99,
    image: persephoneElement,
    category: 'underworld',
    collection: 'Persephone',
    inStock: true,
    stock: 3,
    description: "This enchanting pendant features Persephone's pomegranate in rose gold with ruby seeds, symbolizing her time in the underworld."
  },
  {
    id: 22,
    name: 'Cerberus Three-Headed Dog Bracelet - Sterling Silver with Black Onyx',
    price: 249.99,
    image: cerberusElement,
    category: 'underworld',
    collection: 'Cerberus',
    inStock: true,
    stock: 2,
    description: "This powerful bracelet features the three-headed guardian of the underworld in sterling silver with black onyx eyes."
  },
  {
    id: 23,
    name: 'River Styx Flowing Necklace - Oxidized Silver with Blue Topaz',
    price: 219.99,
    image: styxElement,
    category: 'underworld',
    collection: 'Styx',
    inStock: true,
    stock: 4,
    description: "This mysterious necklace represents the River Styx with flowing oxidized silver and deep blue topaz waters."
  },
  {
    id: 24,
    name: 'Elysium Fields Earrings - 14K Gold with Yellow Diamond',
    price: 379.99,
    image: elysiumElement,
    category: 'underworld',
    collection: 'Elysium',
    inStock: true,
    stock: 2,
    description: "These radiant earrings represent the paradise of Elysium with 14K gold and yellow diamonds for the blessed souls."
  }
];

export default products;
