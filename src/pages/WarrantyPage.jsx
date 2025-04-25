import React from 'react';
import { Box, Container, Typography, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';

const WarrantyPage = () => {
  return (    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Warranty Information
        </Typography>

        <Typography variant="body2" paragraph>
          At Ottawa Opal Shop, we stand behind the quality of our products. Our warranty covers manufacturing defects in materials and workmanship.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Limited Lifetime Warranty
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Coverage Period"
                secondary="All Ottawa Opal Shop jewelry comes with a limited lifetime warranty against manufacturing defects."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="What's Covered"
                secondary="Manufacturing defects in materials and workmanship, including prong breakage, clasp failure, and stone setting issues not caused by wear and tear."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="What's Not Covered"
                secondary="Normal wear and tear, accidental damage, loss, theft, or damage resulting from improper care or modifications by anyone other than Ottawa Opal Shop."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Warranty Service
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="How to Submit a Claim"
                secondary="Contact our customer service team to initiate a warranty claim. You'll need to provide proof of purchase and return the item for inspection."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Repair or Replacement"
                secondary="At our discretion, we will repair or replace items covered under warranty at no charge."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Shipping for Warranty Service"
                secondary="Customers are responsible for shipping costs to send items for warranty service. We cover return shipping costs for approved warranty repairs."
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default WarrantyPage;
