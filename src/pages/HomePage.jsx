import React from 'react';
import { Box, Container, Paper, Grid } from '@mui/material';
import CategoryMenu from '../components/CategoryMenu';
import SignatureMenu from '../components/SignatureMenu';
import ImageCarousel from '../components/ImageCarousel';

const HomePage = () => {
  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1280px', xl: '1600px' }
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
