import React from 'react';
import { Box, Container, Typography, Paper, Grid, Button, Divider } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { styled } from '@mui/material/styles';

const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF0000',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#CC0000',
  },
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%', // 16:9 Aspect Ratio
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const VideoFrame = styled('iframe')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
}));

const VideosPage = () => {
  // Sample video data
  const videos = [
    {
      id: '1',
      title: 'The Story of Ottawa Opal Shop',
      description: 'Learn about our journey from a small family business to a renowned jewelry store.',
      youtubeId: 'dQw4w9WgXcQ', // This is a placeholder YouTube ID
    },
    {
      id: '2',
      title: 'Signature Collection: 5 Elements',
      description: 'Discover the inspiration behind our 5 Elements collection and the craftsmanship that goes into each piece.',
      youtubeId: 'dQw4w9WgXcQ', // This is a placeholder YouTube ID
    },
    {
      id: '3',
      title: 'How to Care for Your Opal Jewelry',
      description: 'Essential tips for maintaining the beauty and longevity of your precious opal jewelry.',
      youtubeId: 'dQw4w9WgXcQ', // This is a placeholder YouTube ID
    },
    {
      id: '4',
      title: 'Behind the Scenes: Jewelry Making Process',
      description: 'Watch our skilled artisans at work as they transform raw materials into stunning jewelry pieces.',
      youtubeId: 'dQw4w9WgXcQ', // This is a placeholder YouTube ID
    },
    {
      id: '5',
      title: 'Greek Gods Collection: Design Inspiration',
      description: 'The mythology and symbolism behind our popular Greek Gods collection.',
      youtubeId: 'dQw4w9WgXcQ', // This is a placeholder YouTube ID
    },
    {
      id: '6',
      title: 'Customer Testimonials: Hear Their Stories',
      description: 'Real customers share their experiences with Ottawa Opal Shop and their favorite pieces.',
      youtubeId: 'dQw4w9WgXcQ', // This is a placeholder YouTube ID
    },
  ];

  const handleSubscribe = () => {
    window.open('https://www.youtube.com/channel/UCxxxxxxxx', '_blank');
  };

  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            Ottawa Opal Shop Videos
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
            Explore our video collection to learn more about our jewelry, craftsmanship, and the stories behind our signature collections.
          </Typography>
          <SubscribeButton
            variant="contained"
            startIcon={<YouTubeIcon />}
            onClick={handleSubscribe}
          >
            Subscribe to Our Channel
          </SubscribeButton>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          {videos.map((video) => (
            <Grid item xs={12} md={6} key={video.id}>
              <VideoContainer>
                <VideoFrame
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoContainer>
              <Typography variant="h5" gutterBottom>
                {video.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {video.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default VideosPage;
