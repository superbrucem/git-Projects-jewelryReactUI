import React from 'react';
import { Box, Container, Typography, Paper, Button, Stack } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Link } from 'react-router-dom';
import OpalAnimation from './OpalAnimation';

const UnderConstruction = ({ pageName }) => {
  return (
    <Container maxWidth="xl" sx={{
      py: 8,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <ConstructionIcon sx={{ fontSize: 60, color: 'secondary.main' }} />
          <OpalAnimation size="sm" />
        </Stack>

        <Typography variant="h3" component="h1">
          {pageName} Page
        </Typography>

        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          Under Construction
        </Typography>

        <Typography variant="body1" paragraph sx={{ maxWidth: '600px' }}>
          We're currently working on creating an amazing experience for this section of our website.
          Please check back soon to see our progress!
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Return to Home Page
        </Button>
      </Paper>
    </Container>
  );
};

export default UnderConstruction;
