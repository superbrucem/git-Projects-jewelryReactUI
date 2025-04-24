import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import images
import fiveElements from '../assets/images/5elements.jpg';
import greekGods from '../assets/images/greekgods.jpg';
import underworld from '../assets/images/underworld.jpg';

const CarouselContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '400px',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const CarouselSlide = styled(Box)(({ theme, active }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: active ? 1 : 0,
  transition: 'opacity 1.5s ease-in-out',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }
}));

const CarouselCaption = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: theme.spacing(3),
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
}));

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const slides = [
    {
      image: fiveElements,
      caption: '5 Elements Collection',
      link: '/signature/5-elements'
    },
    {
      image: greekGods,
      caption: 'Greek Gods Collection',
      link: '/signature/greek-gods'
    },
    {
      image: underworld,
      caption: 'Underworld Collection',
      link: '/signature/underworld'
    }
  ];

  // Auto-advance slides at a slow pace (8 seconds per slide)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 8000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle click on a slide to navigate to its link
  const handleSlideClick = (link) => {
    window.location.href = link;
  };

  return (
    <CarouselContainer elevation={3}>
      {slides.map((slide, index) => (
        <CarouselSlide
          key={index}
          active={index === activeIndex}
          onClick={() => handleSlideClick(slide.link)}
          sx={{
            backgroundImage: `url(${slide.image})`,
            cursor: 'pointer',
          }}
        />
      ))}
      <CarouselCaption>
        {slides[activeIndex].caption}
      </CarouselCaption>
    </CarouselContainer>
  );
};

export default ImageCarousel;
