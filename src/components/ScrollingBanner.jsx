import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

// Animation for scrolling text
const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Container for the banner
const BannerContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#f0c14b', // Gold color matching the theme
  padding: '8px 0',
  overflow: 'hidden',
  position: 'relative',
}));

// Scrolling text container
const ScrollingTextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  whiteSpace: 'nowrap',
  animation: `${scroll} 65s linear infinite`, // Slowed down to ~30% of original speed (was 20s)
}));

// Diamond shape for decoration
const Diamond = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  backgroundColor: '#1d2b39', // Dark blue from the theme
  transform: 'rotate(45deg)',
  margin: '0 12px',
}));

const ScrollingBanner = ({ messages = ['PERFECT FOR SPECIAL OCCASIONS'] }) => {
  // Create a repeated array of messages for continuous scrolling
  // More repetitions for slower scrolling to ensure continuous flow
  const repeatedMessages = [...messages, ...messages, ...messages, ...messages, ...messages];

  return (
    <BannerContainer>
      <ScrollingTextContainer>
        {repeatedMessages.map((message, index) => (
          <Typography
            key={index}
            variant="body2"
            component="span"
            sx={{
              color: '#1d2b39', // Dark blue from the theme
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              mx: 6 // Increased spacing between messages for slower scrolling
            }}
          >
            <Diamond /> {message} <Diamond />
          </Typography>
        ))}
      </ScrollingTextContainer>
    </BannerContainer>
  );
};

export default ScrollingBanner;
