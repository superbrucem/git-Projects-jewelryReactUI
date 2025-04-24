// Import from main products
import allProducts from './products';

// Filter products for Greek Gods collection
const greekGodsProducts = allProducts.filter(p => p.category === 'greek-gods');

export default greekGodsProducts;
