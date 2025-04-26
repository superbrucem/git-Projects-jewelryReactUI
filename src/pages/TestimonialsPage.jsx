import React from 'react';
import { Box, Container, Typography, Paper, Grid, Avatar, Rating, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  fontSize: '2rem',
  color: 'rgba(0, 0, 0, 0.08)',
  transform: 'rotate(180deg)',
}));

const TestimonialsPage = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Anderson',
      location: 'Ottawa, ON',
      avatar: 'https://via.placeholder.com/150',
      rating: 5,
      date: 'March 15, 2023',
      text: "I received my custom opal pendant yesterday and I am absolutely in love with it! The craftsmanship is exceptional and the opal has such a beautiful play of colors. The team at Ottawa Opal Shop was so helpful throughout the design process. I will definitely be back for more pieces!",
      product: 'Custom Opal Pendant',
    },
    {
      id: 2,
      name: 'Robert Chen',
      location: 'Toronto, ON',
      avatar: 'https://via.placeholder.com/150',
      rating: 5,
      date: 'February 3, 2023',
      text: "I purchased a sapphire ring for my wife and she was thrilled! The quality of the stone is outstanding, and the setting is elegant and secure. The staff was knowledgeable and helped me select the perfect piece within my budget.",
      product: 'Blue Sapphire Ring',
    },
    {
      id: 3,
      name: 'Sarah Williams',
      location: 'Montreal, QC',
      avatar: 'https://via.placeholder.com/150',
      rating: 5,
      date: 'January 20, 2023',
      text: "The Greek Gods collection is stunning! I purchased the Athena Wisdom Ring and receive compliments every time I wear it. The attention to detail in the design is remarkable, and the quality is exceptional. Shipping was fast and the packaging was beautiful.",
      product: 'Athena Wisdom Ring',
    },
    {
      id: 4,
      name: 'Michael Johnson',
      location: 'Vancouver, BC',
      avatar: 'https://via.placeholder.com/150',
      rating: 4,
      date: 'December 12, 2022',
      text: "I ordered a pair of opal earrings for my daughter. The opals have a beautiful fire to them and the setting is very secure. The only reason for 4 stars instead of 5 is that shipping took a bit longer than expected, but the quality of the product made up for it.",
      product: 'Australian Opal Earrings',
    },
    {
      id: 5,
      name: 'Emily Thompson',
      location: 'Ottawa, ON',
      avatar: 'https://via.placeholder.com/150',
      rating: 5,
      date: 'November 5, 2022',
      text: "I have been collecting pieces from Ottawa Opal Shop for years, and their quality never disappoints. My latest purchase from the 5 Elements collection is absolutely stunning. The Earth Element Pendant pairs beautifully with my existing pieces. The customer service is always exceptional!",
      product: 'Earth Element Pendant',
    },
    {
      id: 6,
      name: 'David Wilson',
      location: 'Calgary, AB',
      avatar: 'https://via.placeholder.com/150',
      rating: 5,
      date: 'October 18, 2022',
      text: "I was looking for a unique engagement ring and found the perfect one at Ottawa Opal Shop. The team helped me select a beautiful opal and customize the setting. My partner was blown away by how unique and beautiful it is. Thank you for making our engagement so special!",
      product: 'Custom Engagement Ring',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1024px', xl: '1280px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            Customer Testimonials
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
            Read what our customers have to say about their experiences with Ottawa Opal Shop. We're proud to have helped so many people find the perfect piece of jewelry to celebrate life's special moments.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} lg={4} key={testimonial.id}>
              <TestimonialCard elevation={1}>
                <QuoteIcon />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 40, height: 40, mr: 1.5 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {testimonial.location}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Rating value={testimonial.rating} readOnly precision={0.5} size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {testimonial.date}
                  </Typography>
                </Box>

                <Typography variant="body2" paragraph sx={{ flex: 1, fontSize: '0.9rem' }}>
                  "{testimonial.text}"
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="caption" color="primary" sx={{ fontWeight: 'medium' }}>
                  Product: {testimonial.product}
                </Typography>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>


      </Paper>
    </Container>
  );
};

export default TestimonialsPage;
