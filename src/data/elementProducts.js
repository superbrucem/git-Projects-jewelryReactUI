// Import from main products
import allProducts from './products';

// Filter products for 5 Elements collection
const elementProducts = allProducts.filter(p => p.category === '5-elements');

export default elementProducts;
