import React, { useEffect, useRef } from 'react';
import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

// Animation keyframes
const pulse = keyframes`
  0% {
    box-shadow: 0 0 30px rgba(218, 165, 32, 0.6);
    transform: scale(0.95, 0.95);
  }
  50% {
    box-shadow: 0 0 50px rgba(199, 21, 133, 0.7);
    transform: scale(1.05, 1.05);
  }
  100% {
    box-shadow: 0 0 30px rgba(0, 128, 0, 0.6);
    transform: scale(0.95, 0.95);
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const glow = keyframes`
  0% {
    opacity: 0.8;
    filter: blur(2px);
  }
  50% {
    opacity: 1;
    filter: blur(3px);
  }
  100% {
    opacity: 0.9;
    filter: blur(2px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const colorShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const diamondFloat = keyframes`
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(-5px) scale(1);
  }
  70% {
    opacity: 0.8;
    transform: translateY(-25px) scale(0.9);
  }
  100% {
    transform: translateY(-40px) scale(0);
    opacity: 0;
  }
`;

const diamondSideFloat = keyframes`
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translate(5px, -5px) scale(1);
  }
  70% {
    opacity: 0.8;
    transform: translate(15px, -15px) scale(0.9);
  }
  100% {
    transform: translate(25px, -25px) scale(0);
    opacity: 0;
  }
`;

// Styled components
const OpalContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 0',
  position: 'relative',
}));

const OpalGem = styled(Box)(({ theme, size = 'md' }) => {
  // Size variants with teardrop/pear shape
  const sizes = {
    sm: { width: '30px', height: '40px' },
    md: { width: '60px', height: '80px' },
    lg: { width: '90px', height: '120px' },
    xl: { width: '120px', height: '160px' },
  };

  const { width, height } = sizes[size] || sizes.md;

  return {
    width,
    height,
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', // Teardrop/pear shape
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(220, 220, 220, 0.6) 100%)',
    boxShadow: '0 0 30px rgba(218, 165, 32, 0.7)',
    position: 'relative',
    overflow: 'hidden',
    animation: `${pulse} 6s ease-in-out infinite`,
    transform: 'rotate(0deg)', // Upright position

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, rgba(218, 165, 32, 0.7) 0%, rgba(199, 21, 133, 0.7) 25%, rgba(0, 128, 0, 0.7) 50%, rgba(218, 165, 32, 0.7) 75%, rgba(199, 21, 133, 0.7) 100%)',
      backgroundSize: '400% 400%',
      animation: `${colorShift} 8s ease-in-out infinite`,
      borderRadius: 'inherit',
      opacity: 0.8,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '80%',
      height: '80%',
      borderRadius: 'inherit',
      background: 'radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4) 70%, transparent 100%)',
      filter: 'blur(2px)',
      animation: `${glow} 5s ease-in-out infinite alternate`,
    },
  };
});

const ShimmerLayer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  borderRadius: 'inherit', // Inherits the teardrop shape
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
  backgroundSize: '200% 100%',
  animation: `${shimmer} 3s linear infinite`,
  zIndex: 2,
}));

const ColorFlash = styled(Box)(({ color, top, left, size, delay }) => ({
  position: 'absolute',
  top: `${top}%`,
  left: `${left}%`,
  width: `${size}%`,
  height: `${size}%`,
  borderRadius: '50%',
  background: color,
  filter: 'blur(3px)',
  opacity: 0.7,
  animation: `${glow} ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
  animationDelay: `${delay}s`,
  zIndex: 1,
}));

const OpalHighlight = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '15%',
  left: '25%',
  width: '30%',
  height: '20%',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.8)',
  filter: 'blur(3px)',
  zIndex: 1,
}));

const Diamond = styled(Box)(({ delay, size, left, direction = 'up', isInner = false }) => ({
  position: 'absolute',
  width: size,
  height: size,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.9)',
  borderRadius: '50%',
  bottom: isInner ? '40%' : '50%',
  left: `${left}%`,
  opacity: isInner ? 0.9 : 0,
  animation: isInner
    ? `${glow} 4s ease-in-out infinite alternate`
    : direction === 'left'
      ? `${diamondSideFloat} 5s ease-out infinite`
      : direction === 'right'
        ? `${diamondSideFloat} 5s ease-out infinite reverse`
        : `${diamondFloat} 5s ease-out infinite`,
  animationDelay: `${delay}s`,
  zIndex: isInner ? 3 : 4,
}));

const OpalAnimation = ({ size = 'md' }) => {
  const containerRef = useRef(null);
  const diamondsRef = useRef([]);
  const colorFlashesRef = useRef([]);

  // Create diamonds and color flashes with random properties
  useEffect(() => {
    // Clear previous elements
    diamondsRef.current = [];
    colorFlashesRef.current = [];

    // Number of elements based on size - increased diamond count
    const diamondCount = size === 'sm' ? 8 : size === 'md' ? 12 : size === 'lg' ? 18 : 24;
    const colorFlashCount = size === 'sm' ? 4 : size === 'md' ? 6 : size === 'lg' ? 8 : 10;

    // Create outer diamonds (white particles)
    for (let i = 0; i < diamondCount; i++) {
      const isLeftSide = Math.random() > 0.5;
      diamondsRef.current.push({
        id: i,
        size: Math.random() * 4 + 3, // 3-7px (smaller white particles)
        left: Math.random() * 80 + 10, // 10-90%
        delay: Math.random() * 3, // 0-3s delay
        direction: isLeftSide ? 'left' : 'right' // Add direction for side movement
      });
    }

    // Create color flashes (the moving colors inside the opal)
    const colors = [
      'rgba(218, 165, 32, 0.8)',  // Darker gold
      'rgba(199, 21, 133, 0.8)',  // Darker pink (medium violet red)
      'rgba(0, 128, 0, 0.8)',     // Darker green
      'rgba(205, 133, 63, 0.8)',  // Darker orange (peru)
      'rgba(70, 130, 180, 0.8)'   // Darker blue (steel blue)
    ];

    for (let i = 0; i < colorFlashCount; i++) {
      colorFlashesRef.current.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        top: Math.random() * 70 + 15, // 15-85%
        left: Math.random() * 70 + 15, // 15-85%
        size: Math.random() * 20 + 10, // 10-30%
        delay: Math.random() * 2, // 0-2s delay
      });
    }
  }, [size]);

  return (
    <OpalContainer ref={containerRef}>
      {/* Outer floating diamonds */}
      {diamondsRef.current.map((diamond) => (
        <Diamond
          key={`outer-${diamond.id}`}
          size={diamond.size}
          left={diamond.left}
          delay={diamond.delay}
          direction={diamond.direction}
          isInner={false}
        />
      ))}

      <OpalGem size={size}>
        <ShimmerLayer />
        <OpalHighlight />

        {/* Color flashes inside the opal */}
        {colorFlashesRef.current.map((flash) => (
          <ColorFlash
            key={`flash-${flash.id}`}
            color={flash.color}
            top={flash.top}
            left={flash.left}
            size={flash.size}
            delay={flash.delay}
          />
        ))}
      </OpalGem>
    </OpalContainer>
  );
};

export default OpalAnimation;
