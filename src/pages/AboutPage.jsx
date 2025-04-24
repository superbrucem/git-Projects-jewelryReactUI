import React from 'react';
import { Box, Container, Typography, Paper, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(2),
}));

const TeamMemberCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const AboutPage = () => {
  // Sample team members data
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      title: 'Founder & Master Jeweler',
      bio: 'With over 30 years of experience, John founded Ottawa Opal Shop in 1985 with a passion for creating unique, handcrafted jewelry.',
      image: 'https://via.placeholder.com/300x300',
    },
    {
      id: 2,
      name: 'Emily Johnson',
      title: 'Lead Designer',
      bio: 'Emily brings her artistic vision and contemporary design sensibility to create our signature collections.',
      image: 'https://via.placeholder.com/300x300',
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'Gemologist',
      bio: 'As our certified gemologist, Michael ensures we source only the finest quality gemstones for our jewelry pieces.',
      image: 'https://via.placeholder.com/300x300',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      title: 'Customer Experience Manager',
      bio: 'Sarah leads our customer service team, ensuring every client receives personalized attention and exceptional service.',
      image: 'https://via.placeholder.com/300x300',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        {/* Our Story Section */}
        <Box mb={6}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Our Story
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <StyledImage
                src="https://via.placeholder.com/600x400"
                alt="Ottawa Opal Shop storefront"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                Founded in 1985, Ottawa Opal Shop began as a small family business with a passion for unique, handcrafted jewelry. Our founder, John Smith, discovered his love for opals during a trip to Australia and was captivated by their mesmerizing play of colors.
              </Typography>
              <Typography variant="body1" paragraph>
                What started as a modest workshop has grown into Ottawa's premier destination for fine jewelry, specializing in opals and other precious gemstones. Throughout our journey, we've maintained our commitment to exceptional craftsmanship, ethical sourcing, and personalized service.
              </Typography>
              <Typography variant="body1">
                Today, we continue to create stunning pieces that celebrate the beauty of natural gemstones, with each item handcrafted in our workshop by our team of skilled artisans.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Our Values Section */}
        <Box mb={6}>
          <Typography variant="h3" component="h2" gutterBottom align="center">
            Our Values
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" p={2}>
                <Typography variant="h5" gutterBottom>
                  Craftsmanship
                </Typography>
                <Typography variant="body1">
                  We believe in the value of handcrafted jewelry, where each piece receives meticulous attention to detail from our skilled artisans.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" p={2}>
                <Typography variant="h5" gutterBottom>
                  Ethical Sourcing
                </Typography>
                <Typography variant="body1">
                  We are committed to responsible sourcing practices, ensuring our gemstones and materials are ethically obtained and environmentally sustainable.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" p={2}>
                <Typography variant="h5" gutterBottom>
                  Customer Experience
                </Typography>
                <Typography variant="body1">
                  We strive to provide an exceptional experience for every customer, offering personalized service and creating jewelry that tells your unique story.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Our Team Section */}
        <Box>
          <Typography variant="h3" component="h2" gutterBottom align="center">
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <TeamMemberCard>
                  <StyledImage
                    src={member.image}
                    alt={member.name}
                    sx={{ borderRadius: '50%', width: 200, height: 200, objectFit: 'cover', mx: 'auto' }}
                  />
                  <Typography variant="h5" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.title}
                  </Typography>
                  <Typography variant="body2">
                    {member.bio}
                  </Typography>
                </TeamMemberCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutPage;
