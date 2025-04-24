import React from 'react';
import { Grid, Box } from '@mui/material';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';

const ProductGrid = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
