import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import CategoryMenu from '../components/CategoryMenu';
import SignatureMenu from '../components/SignatureMenu';
import ImageCarousel from '../components/ImageCarousel';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import products from '../data/products';

const HomePage = () => {
  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Grid container spacing={3}>
        {/* Left sidebar with category menu */}
        <Grid item xs={12} md={3} lg={2.5}>
          <CategoryMenu />
          <SignatureMenu />
        </Grid>

        {/* Main content area */}
        <Grid item xs={12} md={9} lg={9.5}>
          {/* Image Carousel at the very top */}
          <ImageCarousel />

          {/* Featured Products Grid with Pagination */}
          <Box sx={{ mt: 4, backgroundColor: 'rgba(255, 255, 255, 0.95)', p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
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

            <PaginatedProductGrid products={products} itemsPerPage={8} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
