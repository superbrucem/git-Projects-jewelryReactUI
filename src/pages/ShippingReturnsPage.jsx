import React from 'react';
import { Box, Container, Typography, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';

const ShippingReturnsPage = () => {
  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Shipping & Returns
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Shipping Information
          </Typography>
          <Typography variant="body2" paragraph>
            At Ottawa Opal Shop, we strive to deliver your precious items safely and promptly.
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Standard Shipping"
                secondary="Free on all orders over $100. Delivery within 3-5 business days."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Express Shipping"
                secondary="$15.00. Delivery within 1-2 business days."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="International Shipping"
                secondary="Available to most countries. Rates calculated at checkout based on destination."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Returns & Exchanges
          </Typography>
          <Typography variant="body2" paragraph>
            We want you to be completely satisfied with your purchase. If for any reason you're not, we offer a simple return and exchange policy.
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Return Period"
                secondary="30 days from the date of delivery for unworn items in original condition."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Return Process"
                secondary="Contact our customer service team to initiate a return. We'll provide a return shipping label and instructions."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Refunds"
                secondary="Processed within 5-7 business days after we receive and inspect the returned item."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Exchanges"
                secondary="Available for different sizes or styles. Contact us to arrange an exchange."
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShippingReturnsPage;
