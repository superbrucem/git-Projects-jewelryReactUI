import React from 'react';
import { Box, Container, Typography, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';

const ProductCarePage = () => {
  return (    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1024px', xl: '1280px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Product Care
        </Typography>

        <Typography variant="body2" paragraph>
          Proper care will help maintain the beauty and longevity of your fine jewelry. Follow these guidelines to keep your pieces looking their best for years to come.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Opal Care
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Avoid Extreme Temperatures"
                secondary="Opals contain water and can crack if exposed to extreme heat or cold. Remove opal jewelry before hot baths, saunas, or swimming."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Avoid Chemicals"
                secondary="Remove opal jewelry before using household cleaners, perfumes, hairsprays, or cosmetics."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Gentle Cleaning"
                secondary="Clean with a soft, damp cloth. Never use ultrasonic cleaners or harsh chemicals."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Diamond Care
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Regular Cleaning"
                secondary="Clean with warm water, mild soap, and a soft toothbrush. Rinse thoroughly and pat dry with a soft cloth."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Professional Inspection"
                secondary="Have your diamond jewelry professionally inspected and cleaned once a year."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            General Jewelry Care
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Proper Storage"
                secondary="Store pieces separately to prevent scratching. Use a jewelry box with separate compartments or soft pouches."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Avoid Impact"
                secondary="Remove jewelry before physical activities or sports to prevent damage."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Last On, First Off"
                secondary="Put your jewelry on after applying makeup, perfume, and hairspray, and remove it before showering or swimming."
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductCarePage;
