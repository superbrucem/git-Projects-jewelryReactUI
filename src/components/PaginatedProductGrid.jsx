import React, { useState } from 'react';
import { Grid, Box, Button, Typography, Stack, IconButton } from '@mui/material';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const PaginatedProductGrid = ({ products, itemsPerPage = 8 }) => {
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);

  // Debug products
  console.log('PaginatedProductGrid received products:', products?.length, products?.map(p => p.category));

  // Calculate total pages
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

  // Get current products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products?.length ? products.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Change page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of product grid
    document.getElementById('product-grid-top').scrollIntoView({ behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      document.getElementById('product-grid-top').scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      document.getElementById('product-grid-top').scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToTop = () => {
    document.getElementById('product-grid-top').scrollIntoView({ behavior: 'smooth' });
  };

  const goToBottom = () => {
    document.getElementById('product-grid-bottom').scrollIntoView({ behavior: 'smooth' });
  };

  // Pagination controls component
  const PaginationControls = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', sm: 'center' },
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        p: 1,
        mb: 2,
        mt: 2,
        border: '1px solid #e0e0e0',
        gap: { xs: 1, sm: 0 }
      }}
    >
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        sx={{
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          justifyContent: 'center'
        }}
      >
        <IconButton
          onClick={prevPage}
          disabled={currentPage === 1}
          size="small"
          sx={{
            backgroundColor: currentPage > 1 ? '#1d2b39' : 'transparent',
            color: currentPage > 1 ? 'white' : 'text.disabled',
            '&:hover': {
              backgroundColor: currentPage > 1 ? '#2c3e50' : 'transparent',
            }
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "contained" : "outlined"}
            color={currentPage === i + 1 ? "primary" : "inherit"}
            size="small"
            onClick={() => goToPage(i + 1)}
            sx={{
              minWidth: { xs: '28px', sm: '32px' },
              height: { xs: '28px', sm: '32px' },
              p: 0,
              backgroundColor: currentPage === i + 1 ? '#f0c14b' : 'transparent',
              color: currentPage === i + 1 ? '#1d2b39' : 'inherit',
              borderColor: currentPage === i + 1 ? '#f0c14b' : '#e0e0e0',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              '&:hover': {
                backgroundColor: currentPage === i + 1 ? '#f0c14b' : 'rgba(0, 0, 0, 0.04)',
                borderColor: currentPage === i + 1 ? '#f0c14b' : '#e0e0e0',
              }
            }}
          >
            {i + 1}
          </Button>
        ))}

        <IconButton
          onClick={nextPage}
          disabled={currentPage === totalPages}
          size="small"
          sx={{
            backgroundColor: currentPage < totalPages ? '#1d2b39' : 'transparent',
            color: currentPage < totalPages ? 'white' : 'text.disabled',
            '&:hover': {
              backgroundColor: currentPage < totalPages ? '#2c3e50' : 'transparent',
            }
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={1}>
        <IconButton
          onClick={goToTop}
          size="small"
          sx={{
            backgroundColor: '#1d2b39',
            color: 'white',
            '&:hover': {
              backgroundColor: '#2c3e50',
            }
          }}
        >
          <ArrowUpwardIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={goToBottom}
          size="small"
          sx={{
            backgroundColor: '#1d2b39',
            color: 'white',
            '&:hover': {
              backgroundColor: '#2c3e50',
            }
          }}
        >
          <ArrowDownwardIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );

  // Check if there are products to display
  if (!products || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No products available in this collection.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Top anchor and pagination controls */}
      <Box id="product-grid-top">
        <PaginationControls />
      </Box>

      {/* Product grid */}
      <Grid container spacing={2}>
        {currentProducts.map((product) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </Grid>
        ))}
      </Grid>

      {/* Bottom anchor and pagination controls */}
      <Box id="product-grid-bottom">
        <PaginationControls />
      </Box>

      {/* Page info */}
      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 2, color: 'text.secondary' }}
      >
        Showing page {currentPage} of {totalPages} ({products.length} products)
      </Typography>
    </Box>
  );
};

export default PaginatedProductGrid;
