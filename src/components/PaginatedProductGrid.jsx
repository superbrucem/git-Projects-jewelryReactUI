import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  Paper
} from '@mui/material';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PaginatedProductGrid = ({ products, initialItemsPerPage = 8, isLoading }) => {
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [columns, setColumns] = useState(4);
  const [sortedProducts, setSortedProducts] = useState([]);

  // Debug products
  console.log('PaginatedProductGrid received products:', products?.length, products?.map(p => p.category));

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Sort products when sortBy or products change
  useEffect(() => {
    let sorted = [...safeProducts];

    switch (sortBy) {
      case 'featured':
        // Assuming featured products have a 'featured' property or are already in featured order
        break;
      case 'price-low':
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name-asc':
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'name-desc':
        sorted.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        break;
      default:
        break;
    }

    setSortedProducts(sorted);
    // Reset to first page when sort changes
    setCurrentPage(1);
  }, [sortBy, safeProducts]);

  // Calculate total pages
  const totalPages = Math.ceil((sortedProducts.length || 0) / itemsPerPage);

  // Get current products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.length ? sortedProducts.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Handle column change
  const handleColumnsChange = (event, newColumns) => {
    if (newColumns !== null) {
      setColumns(newColumns);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page
  };

  // Handle sort change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

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

  // Check if products are loading
  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Loading products...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Please wait while we fetch the products.
        </Typography>
      </Box>
    );
  }

  // Check if there are products to display
  if (!safeProducts || safeProducts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No products available in this collection.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Please try refreshing the page or navigating back to the home page.
        </Typography>
      </Box>
    );
  }

  // Get column size based on columns setting
  const getColumnSize = (columns) => {
    switch (columns) {
      case 1: return 12;
      case 2: return 6;
      case 3: return 4;
      case 4: return 3;
      case 6: return 2;
      default: return 3;
    }
  };

  return (
    <Box>
      {/* Controls Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          backgroundColor: '#f9f9f9',
          border: '1px solid #e0e0e0',
          borderRadius: '4px'
        }}
      >
        {/* Sort By */}
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="sort-by-label">Sort By:</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            label="Sort By:"
            onChange={handleSortChange}
            IconComponent={KeyboardArrowDownIcon}
          >
            <MenuItem value="featured">Featured Items</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="name-asc">Name: A to Z</MenuItem>
            <MenuItem value="name-desc">Name: Z to A</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          {/* Columns */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
              Columns:
            </Typography>
            <ToggleButtonGroup
              value={columns}
              exclusive
              onChange={handleColumnsChange}
              aria-label="columns"
              size="small"
            >
              <ToggleButton value={1} aria-label="1 column">1</ToggleButton>
              <ToggleButton value={2} aria-label="2 columns">2</ToggleButton>
              <ToggleButton value={3} aria-label="3 columns">3</ToggleButton>
              <ToggleButton value={4} aria-label="4 columns">4</ToggleButton>
              <ToggleButton value={6} aria-label="6 columns">6</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Products Per Page */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="items-per-page-label">Products Per Page:</InputLabel>
            <Select
              labelId="items-per-page-label"
              value={itemsPerPage}
              label="Products Per Page:"
              onChange={handleItemsPerPageChange}
              IconComponent={KeyboardArrowDownIcon}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={36}>36</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Top anchor and pagination controls */}
      <Box id="product-grid-top">
        <PaginationControls />
      </Box>

      {/* Product grid */}
      <Grid container spacing={2}>
        {currentProducts.map((product) => (
          <Grid
            item
            xs={columns === 1 ? 12 : 6}
            sm={columns === 1 ? 12 : columns === 2 ? 6 : 4}
            md={getColumnSize(columns)}
            key={product.id}
          >
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
        Showing page {currentPage} of {totalPages} ({sortedProducts.length} products)
      </Typography>
    </Box>
  );
};

export default PaginatedProductGrid;
