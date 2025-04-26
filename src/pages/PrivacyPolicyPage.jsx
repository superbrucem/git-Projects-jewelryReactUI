import React from 'react';
import { Box, Container, Typography, Paper, Divider } from '@mui/material';

const PrivacyPolicyPage = () => {
  return (    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1024px', xl: '1280px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Privacy Policy
        </Typography>

        <Typography variant="body2" paragraph>
          Last Updated: June 1, 2023
        </Typography>

        <Typography variant="body2" paragraph>
          At Ottawa Opal Shop, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Information We Collect
          </Typography>

          <Typography variant="body2" paragraph>
            <strong>Personal Information:</strong> When you make a purchase or create an account, we collect your name, email address, shipping address, billing address, phone number, and payment information.
          </Typography>

          <Typography variant="body2" paragraph>
            <strong>Automatically Collected Information:</strong> We may automatically collect certain information about your device, including your IP address, browser type, referring/exit pages, and operating system.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            How We Use Your Information
          </Typography>

          <Typography variant="body2" paragraph>
            We use the information we collect to:
          </Typography>

          <ul>
            <li>
              <Typography variant="body2">Process and fulfill your orders</Typography>
            </li>
            <li>
              <Typography variant="body2">Communicate with you about your order or account</Typography>
            </li>
            <li>
              <Typography variant="body2">Improve our website and customer experience</Typography>
            </li>
            <li>
              <Typography variant="body2">Send you marketing communications (with your consent)</Typography>
            </li>
            <li>
              <Typography variant="body2">Comply with legal obligations</Typography>
            </li>
          </ul>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Data Security
          </Typography>

          <Typography variant="body2" paragraph>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </Typography>

          <Typography variant="body2" paragraph>
            If you have any questions about our Privacy Policy, please contact us at Ottawa_Opal_Shop@hotmail.com.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicyPage;
