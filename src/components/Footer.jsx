import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  styled,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// Payment icons
const VisaIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
    <path d="M9.245 7.5h2.58L14.61 16.5H12l-.615-2.25h-2.7l-.405 2.25H6.045L9.245 7.5zm1.35 5.25h1.5l-.345-1.5-.345-1.5-.21-1.05-.315 1.05-.285 1.5zM17.355 7.5h2.04l-1.545 9h-2.04l1.545-9z"/>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
    <path d="M11.25 12c0-1.545-.78-2.895-1.965-3.66a4.125 4.125 0 100 7.32 3.99 3.99 0 001.965-3.66zm6.6 0c0 2.235-1.815 4.05-4.05 4.05S9.75 14.235 9.75 12s1.815-4.05 4.05-4.05S17.85 9.765 17.85 12z"/>
  </svg>
);
const PaypalIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
    <path d="M7.076 21.337H2.47L4.53 3.27h5.078c3.114 0 4.722 1.115 4.572 3.41-.127 2.27-1.705 2.97-3.8 2.97h-1.36l-.744 11.687zM7.764 7.117h-.78l-.49 7.744h.78c3.114 0 4.722-1.115 4.572-3.41-.126-2.34-1.704-3.034-3.8-3.034h-.282z"/>
  </svg>
);

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0c2348', // Darker blue
  color: 'white',
  paddingTop: '40px',
  paddingBottom: '20px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
  }
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: '16px',
  fontSize: '14px',
  letterSpacing: '1px',
  position: 'relative',
  paddingBottom: '8px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '30px',
    height: '2px',
    backgroundColor: '#e53935', // Professional red
  }
}));

const FooterLink = styled(RouterLink)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '8px',
  fontSize: '13px',
  transition: 'all 0.2s ease',
  position: 'relative',
  paddingLeft: '0',
  '&:hover': {
    color: '#e53935', // Professional red
    paddingLeft: '4px',
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  lineHeight: 1.5,
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  padding: '6px',
  '&:hover': {
    color: '#e53935', // Professional red
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

const CopyrightBar = styled(Box)(({ theme }) => ({
  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  paddingTop: '16px',
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
}));

const PaymentMethodsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
}));

const PaymentMethod = styled(Box)(({ theme }) => ({
  borderRadius: '4px',
  padding: '4px 6px',
  minWidth: '40px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
}));

const VisaCard = styled(PaymentMethod)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0157a2 0%, #0568b8 100%)',
  color: 'white',
}));

const MastercardCard = styled(PaymentMethod)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff5f00 0%, #f79e1b 50%, #ea001b 100%)',
  color: 'white',
}));

const PaypalCard = styled(PaymentMethod)(({ theme }) => ({
  background: 'linear-gradient(135deg, #003087 0%, #009cde 100%)',
  color: 'white',
}));

const CompanyDescription = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '13px',
  lineHeight: 1.6,
  marginBottom: '16px',
  maxWidth: '280px',
}));

const ContactIconWrapper = styled(Box)(({ theme }) => ({
  color: '#e53935', // Professional red
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container maxWidth="xl" sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1600px', xl: '1800px' }
      }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">Ottawa Opal Shop</FooterTitle>
            <CompanyDescription variant="body2">
              Exquisite jewelry for life's special moments. Since 1985.
            </CompanyDescription>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <SocialIcon size="small">
                <FacebookIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon size="small">
                <TwitterIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon size="small">
                <InstagramIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon size="small">
                <PinterestIcon fontSize="small" />
              </SocialIcon>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">QUICK LINKS</FooterTitle>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/collections">Collections</FooterLink>
            <FooterLink to="/videos">Videos</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/testimonials">Testimonials</FooterLink>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">CUSTOMER SERVICE</FooterTitle>
            <FooterLink to="/customer-service">Customer Service</FooterLink>
            <FooterLink to="/shipping-returns">Shipping & Returns</FooterLink>
            <FooterLink to="/product-care">Product Care</FooterLink>
            <FooterLink to="/warranty">Warranty</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">CONTACT US</FooterTitle>
            <FooterText>
              <ContactIconWrapper>
                <LocationOnIcon fontSize="small" />
              </ContactIconWrapper>
              123 Sparks St, Ottawa, ON
            </FooterText>
            <FooterText>
              <ContactIconWrapper>
                <PhoneIcon fontSize="small" />
              </ContactIconWrapper>
              +1 (613) 555-1234
            </FooterText>
            <FooterText>
              <ContactIconWrapper>
                <EmailIcon fontSize="small" />
              </ContactIconWrapper>
              Ottawa_Opal_Shop@hotmail.com
            </FooterText>
            <FooterText>
              <ContactIconWrapper>
                <AccessTimeIcon fontSize="small" />
              </ContactIconWrapper>
              Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-5PM
            </FooterText>
          </Grid>
        </Grid>

        {/* Copyright and Payment Methods */}
        <CopyrightBar>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px' }}>
            © {currentYear} Ottawa Opal Shop. All rights reserved.
          </Typography>
          <PaymentMethodsContainer>
            <VisaCard>
              <VisaIcon />
            </VisaCard>
            <MastercardCard>
              <MastercardIcon />
            </MastercardCard>
            <PaypalCard>
              <PaypalIcon />
            </PaypalCard>
          </PaymentMethodsContainer>
        </CopyrightBar>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
