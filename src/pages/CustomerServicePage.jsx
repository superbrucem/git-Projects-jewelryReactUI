import React from 'react';
import { Box, Container, Typography, Paper, Grid, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiamondIcon from '@mui/icons-material/Diamond';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SecurityIcon from '@mui/icons-material/Security';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const ServiceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '2rem',
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '&:before': {
    display: 'none',
  },
}));

const CustomerServicePage = () => {
  const serviceLinks = [
    {
      title: 'Customer Support',
      description: 'Get in touch with our customer service team for assistance with your order or general inquiries.',
      icon: <SupportAgentIcon />,
      link: '/contact',
      buttonText: 'Contact Us',
    },
    {
      title: 'Shipping & Returns',
      description: 'Learn about our shipping policies, delivery times, and how to return or exchange your purchase.',
      icon: <LocalShippingIcon />,
      link: '/shipping-returns',
      buttonText: 'Shipping Info',
    },
    {
      title: 'Product Care',
      description: 'Discover how to properly care for your jewelry to maintain its beauty and longevity.',
      icon: <DiamondIcon />,
      link: '/product-care',
      buttonText: 'Care Guide',
    },
    {
      title: 'Warranty',
      description: 'Information about our product warranties and what they cover.',
      icon: <VerifiedUserIcon />,
      link: '/warranty',
      buttonText: 'Warranty Details',
    },
    {
      title: 'FAQ',
      description: 'Find answers to commonly asked questions about our products and services.',
      icon: <HelpOutlineIcon />,
      link: '/faq',
      buttonText: 'View FAQs',
    },
    {
      title: 'Privacy Policy',
      description: 'Learn how we protect your personal information and privacy.',
      icon: <SecurityIcon />,
      link: '/privacy-policy',
      buttonText: 'Read Policy',
    },
  ];

  const commonQuestions = [
    {
      question: 'How do I track my order?',
      answer: 'Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or directly through the carrier\'s website.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa, Mastercard, and PayPal. All transactions are secure and encrypted to protect your personal information.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination. Please see our Shipping & Returns page for more details.',
    },
    {
      question: 'Can I modify or cancel my order after it\'s been placed?',
      answer: 'We process orders quickly to ensure fast delivery. If you need to modify or cancel your order, please contact our customer service team as soon as possible. We\'ll do our best to accommodate your request if the order hasn\'t been processed yet.',
    },
    {
      question: 'Do you offer gift wrapping?',
      answer: 'Yes, we offer complimentary gift wrapping for all orders. You can select this option during checkout and include a personalized message for the recipient.',
    },
  ];

  return (    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1024px', xl: '1280px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            Customer Service
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
            At Ottawa Opal Shop, we're committed to providing exceptional customer service. Browse the resources below to find the information you need, or contact our team for personalized assistance.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {serviceLinks.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ServiceCard elevation={1}>
                <IconWrapper>
                  {service.icon}
                </IconWrapper>
                <Typography variant="h5" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, flex: 1 }}>
                  {service.description}
                </Typography>
                <Button
                  component={Link}
                  to={service.link}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {service.buttonText}
                </Button>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" paragraph>
            Find quick answers to our most commonly asked questions. For more detailed information, please visit our <Link to="/faq" style={{ color: '#1976d2', textDecoration: 'none' }}>FAQ page</Link>.
          </Typography>

          {commonQuestions.map((faq, index) => (
            <StyledAccordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="subtitle1" fontWeight="medium">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Box>


      </Paper>
    </Container>
  );
};

export default CustomerServicePage;
