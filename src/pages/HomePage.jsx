import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import FilterSidebar from '../components/FilterSidebar';
import ImageCarousel from '../components/ImageCarousel';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import { useFilter } from '../context/FilterContext';
import ContentFrame from '../components/ContentFrame';
import products from '../data/products';

const HomePage = ({ contentOnly = false }) => {
  // Use local state for products and loading
  const [homeProducts, setHomeProducts] = useState([]);
  const [isHomeLoading, setIsHomeLoading] = useState(true);

  // Get global loading state for consistency
  const { isLoading: isGlobalLoading } = useFilter();

  // Load all products on component mount, regardless of filter state
  useEffect(() => {
    setIsHomeLoading(true);
    // Short timeout to ensure UI shows loading state
    setTimeout(() => {
      setHomeProducts(products);
      setIsHomeLoading(false);
    }, 100);
  }, []);

  // If contentOnly is true, only render the content without the container and sidebar
  if (contentOnly) {
    return (
      <>
        {/* Image Carousel at the very top */}
        <ImageCarousel />

        {/* Products Grid with Pagination */}
        <Box sx={{ mt: 4, backgroundColor: 'rgba(255, 255, 255, 0.95)', p: 3, borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.05)' }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: '1.5rem',
              color: '#333',
              mb: 3,
              borderBottom: '1px solid #eee',
              pb: 1
            }}
          >
            Featured Gemstones
          </Typography>

          <PaginatedProductGrid products={homeProducts} itemsPerPage={8} isLoading={isHomeLoading} />
        </Box>
      </>
    );
  }

  // Main layout with sidebar and content frame
  return (
    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Grid container spacing={3}>
        {/* Left sidebar with filter menu */}
        <Grid item xs={12} md={3} lg={2.5}>
          <FilterSidebar />
        </Grid>

        {/* Main content area */}
        <Grid item xs={12} md={9} lg={9.5}>
          <ContentFrame />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
