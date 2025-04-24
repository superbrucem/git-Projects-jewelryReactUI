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
import VisaIcon from '@mui/icons-material/CreditCard';
import MastercardIcon from '@mui/icons-material/CreditCard';
import PaypalIcon from '@mui/icons-material/CreditCard';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1d2b39',
  color: 'white',
  paddingTop: '40px',
  paddingBottom: '20px',
  position: 'relative',
  backgroundImage: `
    radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.05) 0%, transparent 8%),
    radial-gradient(circle at 75% 40%, rgba(255, 215, 0, 0.05) 0%, transparent 8%),
    radial-gradient(circle at 40% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 8%),
    radial-gradient(circle at 85% 15%, rgba(255, 215, 0, 0.05) 0%, transparent 8%),
    radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.05) 0%, transparent 8%),
    radial-gradient(circle at 10% 75%, rgba(255, 215, 0, 0.05) 0%, transparent 8%),
    linear-gradient(to bottom, #1d2b39, #1d2b39)
  `,
  backgroundSize: 'cover',
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
    backgroundColor: '#f0c14b',
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
    color: '#f0c14b',
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
    color: '#f0c14b',
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
  color: '#f0c14b',
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
        maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1280px', xl: '1600px' }
      }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6">OTTAWA OPAL SHOP</FooterTitle>
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
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}>VISA</Typography>
            </VisaCard>
            <MastercardCard>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}>MC</Typography>
            </MastercardCard>
            <PaypalCard>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.65rem' }}>PayPal</Typography>
            </PaypalCard>
          </PaymentMethodsContainer>
        </CopyrightBar>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
