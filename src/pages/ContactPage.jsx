import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContactInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(3),
}));

const ContactIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
  marginTop: theme.spacing(0.5),
}));

const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  border: '1px solid rgba(0, 0, 0, 0.1)',
}));

const ContactPage = () => {

  return (
    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1024px', xl: '1280px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Contact Us
        </Typography>

        <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          We'd love to hear from you! Whether you have a question about our products, need help with an order, or want to discuss a custom piece, our team is here to assist you.
        </Typography>

        {/* Map */}
        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.2533422357!2d-75.70133492346177!3d45.42121573999663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0453c5db7a3b%3A0xc3439a1b20a4d7a5!2sOttawa%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1682288292045!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ottawa Opal Shop Location"
          ></iframe>
        </MapContainer>

        <Grid container spacing={6} justifyContent="center">
          {/* Contact Information */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom align="center">
              Contact Information
            </Typography>

            <ContactInfoItem>
              <ContactIcon>
                <LocationOnIcon />
              </ContactIcon>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Our Location
                </Typography>
                <Typography variant="body1">
                  123 Jewelry Lane<br />
                  Ottawa, ON K1P 1J1<br />
                  Canada
                </Typography>
              </Box>
            </ContactInfoItem>

            <ContactInfoItem>
              <ContactIcon>
                <PhoneIcon />
              </ContactIcon>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Phone
                </Typography>
                <Typography variant="body1">
                  +1 (613) 555-1234
                </Typography>
              </Box>
            </ContactInfoItem>

            <ContactInfoItem>
              <ContactIcon>
                <EmailIcon />
              </ContactIcon>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1">
                  Ottawa_Opal_Shop@hotmail.com
                </Typography>
              </Box>
            </ContactInfoItem>

            <ContactInfoItem>
              <ContactIcon>
                <AccessTimeIcon />
              </ContactIcon>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Hours
                </Typography>
                <Typography variant="body1">
                  Monday - Friday: 10:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 5:00 PM<br />
                  Sunday: Closed
                </Typography>
              </Box>
            </ContactInfoItem>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ContactPage;
