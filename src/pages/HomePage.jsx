import React from 'react';
import { Box, Container, Typography, Paper, Grid, Divider } from '@mui/material';
import OpalAnimation from '../components/OpalAnimation';
import CategoryMenu from '../components/CategoryMenu';

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
        </Grid>

        {/* Main content area */}
        <Grid item xs={12} md={9} lg={9.5}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h3" component="h1" gutterBottom>
                  Welcome to Ottawa Opal Shop
                </Typography>
                <Typography variant="body1" paragraph>
                  Discover our exquisite collection of fine jewelry, crafted with precision and passion since 1985.
                </Typography>
                <Typography variant="body1" paragraph>
                  We specialize in unique opal pieces that capture the mesmerizing play of colors found in these precious gemstones.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h5" gutterBottom>
                    Featured Collections Coming Soon
                  </Typography>
                  <Typography variant="body1">
                    We're currently updating our online catalog with our latest collections. Please check back soon or visit our physical store.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                <OpalAnimation size="xl" />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ mt: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
                Featured Collections
              </Typography>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 2,
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Typography variant="h6">Opals</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 2,
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Typography variant="h6">Sapphires</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 2,
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Typography variant="h6">Diamonds</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
