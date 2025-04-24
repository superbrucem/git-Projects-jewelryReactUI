// Import from main products
import allProducts from './products';

// Filter products for Underworld collection
const underworldProducts = allProducts.filter(p => p.category === 'underworld');

export default underworldProducts;
