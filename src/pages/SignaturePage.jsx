import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const SignaturePage = () => {
  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1280px', xl: '1600px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <ConstructionIcon sx={{ fontSize: 60, color: '#f0c14b', mb: 2 }} />
            <Typography variant="h3" component="h1" gutterBottom>
              Signature Collection
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: '#555' }}>
              Coming Soon
            </Typography>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              <Typography variant="body1" paragraph>
                Our exclusive Signature Collection is currently being curated and will be available soon.
              </Typography>
              <Typography variant="body1" paragraph>
                This collection will feature our most exquisite and unique pieces, each one personally selected and designed by our master jewelers.
              </Typography>
              <Typography variant="body1" paragraph>
                Please check back soon to explore our one-of-a-kind signature jewelry that showcases the finest craftsmanship and most stunning gemstones.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignaturePage;
