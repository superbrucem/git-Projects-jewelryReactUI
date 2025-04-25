import React from 'react';
import { Box, Container, Typography, Paper, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2),
}));

const AboutPage = () => {

  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        {/* Our Story Section */}
        <Box mb={6}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Our Story
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <StyledImage
                src="https://via.placeholder.com/600x400"
                alt="Ottawa Opal Shop storefront"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                Founded in 1985, Ottawa Opal Shop began as a small family business with a passion for unique, handcrafted jewelry. Our founder, John Smith, discovered his love for opals during a trip to Australia and was captivated by their mesmerizing play of colors.
              </Typography>
              <Typography variant="body1" paragraph>
                What started as a modest workshop has grown into Ottawa's premier destination for fine jewelry, specializing in opals and other precious gemstones. Throughout our journey, we've maintained our commitment to exceptional craftsmanship, ethical sourcing, and personalized service.
              </Typography>
              <Typography variant="body1">
                Today, we continue to create stunning pieces that celebrate the beauty of natural gemstones, with each item handcrafted in our workshop by our team of skilled artisans.
              </Typography>
            </Grid>
          </Grid>
        </Box>


      </Paper>
    </Container>
  );
};

export default AboutPage;
