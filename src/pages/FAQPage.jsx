import React from 'react';
import { Box, Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '&:before': {
    display: 'none',
  },
}));

const FAQPage = () => {
  const faqCategories = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How do I track my order?",
          answer: "Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or directly through the carrier's website."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept Visa, Mastercard, and PayPal. All transactions are secure and encrypted to protect your personal information."
        },
        {
          question: "Do you offer international shipping?",
          answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination. Please see our Shipping & Returns page for more details."
        }
      ]
    },
    {
      category: "Products & Care",
      questions: [
        {
          question: "Are your opals natural or synthetic?",
          answer: "All our opals are 100% natural. We source our opals ethically from Australia, Ethiopia, and other locations known for high-quality opals."
        },
        {
          question: "How should I care for my opal jewelry?",
          answer: "Opals contain water and should be protected from extreme temperatures and chemicals. Clean with a soft, damp cloth and avoid ultrasonic cleaners. For detailed care instructions, please visit our Product Care page."
        },
        {
          question: "Do you offer jewelry repair services?",
          answer: "Yes, we offer repair services for all jewelry purchased from Ottawa Opal Shop. Please contact our customer service team to arrange for repairs."
        }
      ]
    },
    {
      category: "Returns & Warranty",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unworn items in original condition. Please see our Shipping & Returns page for detailed instructions on how to initiate a return."
        },
        {
          question: "Do your products come with a warranty?",
          answer: "Yes, all our jewelry comes with a limited lifetime warranty against manufacturing defects. Please visit our Warranty page for details on coverage and how to submit a claim."
        },
        {
          question: "Can I exchange my purchase for a different size or style?",
          answer: "Yes, exchanges are available within 30 days of purchase. Please contact our customer service team to arrange an exchange."
        }
      ]
    }
  ];

  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1280px', xl: '1600px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Frequently Asked Questions
        </Typography>

        <Typography variant="body2" paragraph align="center" sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          Find answers to our most commonly asked questions. If you don't see what you're looking for, please contact our customer service team.
        </Typography>

        {faqCategories.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {category.category}
            </Typography>

            {category.questions.map((faq, faqIndex) => (
              <StyledAccordion key={faqIndex}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${categoryIndex}-${faqIndex}-content`}
                  id={`panel-${categoryIndex}-${faqIndex}-header`}
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
        ))}
      </Paper>
    </Container>
  );
};

export default FAQPage;
