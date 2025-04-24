import React, { useEffect, useRef } from 'react';
import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

// Animation keyframes
const pulse = keyframes`
  0% {
    box-shadow: 0 0 30px rgba(0, 229, 255, 0.8);
    transform: scale(0.95, 0.9);
  }
  50% {
    box-shadow: 0 0 50px rgba(0, 229, 255, 0.9);
    transform: scale(1.05, 1);
  }
  100% {
    box-shadow: 0 0 30px rgba(0, 229, 255, 0.8);
    transform: scale(0.95, 0.9);
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

const diamondFloat = keyframes`
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(-5px) scale(1);
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-40px) scale(0);
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
  // Size variants (matching the reference image)
  const sizes = {
    sm: { width: '28px', height: '28px' },
    md: { width: '56px', height: '56px' },
    lg: { width: '84px', height: '84px' },
    xl: { width: '112px', height: '112px' },
  };

  const { width, height } = sizes[size] || sizes.md;

  return {
    width,
    height,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00e5ff 0%, #00796b 100%)',
    boxShadow: '0 0 30px rgba(0, 229, 255, 0.9)',
    position: 'relative',
    overflow: 'visible',
    animation: `${pulse} 4s ease-in-out infinite`,

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-25%',
      left: '-25%',
      width: '150%',
      height: '150%',
      background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)',
      animation: `${pulse} 3s ease-in-out infinite alternate`,
      borderRadius: '50%',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '15%',
      left: '15%',
      width: '70%',
      height: '70%',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, #00e5ff, #006064)',
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
  borderRadius: '50%',
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
  backgroundSize: '200% 100%',
  animation: `${shimmer} 3s linear infinite`,
  zIndex: 2,
}));

const OpalHighlight = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '20%',
  left: '20%',
  width: '20%',
  height: '20%',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.8)',
  filter: 'blur(3px)',
  zIndex: 1,
}));

const Diamond = styled(Box)(({ delay, size, left, isInner = false }) => ({
  position: 'absolute',
  width: size,
  height: size,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.9)',
  borderRadius: '50%',
  bottom: isInner ? '40%' : '50%',
  left: `${left}%`,
  opacity: isInner ? 0.9 : 0,
  animation: isInner ? `${glow} 3s ease-in-out infinite alternate` : `${diamondFloat} 3s ease-out infinite`,
  animationDelay: `${delay}s`,
  zIndex: isInner ? 3 : 0,
}));

const OpalAnimation = ({ size = 'md' }) => {
  const containerRef = useRef(null);
  const diamondsRef = useRef([]);
  const innerDiamondsRef = useRef([]);

  // Create diamonds with random properties
  useEffect(() => {
    // Clear previous diamonds
    diamondsRef.current = [];
    innerDiamondsRef.current = [];

    // Number of diamonds based on size
    const diamondCount = size === 'sm' ? 5 : size === 'md' ? 8 : size === 'lg' ? 12 : 15;
    const innerDiamondCount = size === 'sm' ? 2 : size === 'md' ? 3 : size === 'lg' ? 4 : 5;

    // Create outer diamonds (white particles)
    for (let i = 0; i < diamondCount; i++) {
      diamondsRef.current.push({
        id: i,
        size: Math.random() * 4 + 3, // 3-7px (smaller white particles)
        left: Math.random() * 80 + 10, // 10-90%
        delay: Math.random() * 3, // 0-3s delay
      });
    }

    // Create inner diamonds (highlights)
    for (let i = 0; i < innerDiamondCount; i++) {
      innerDiamondsRef.current.push({
        id: i,
        size: Math.random() * 6 + 4, // 4-10px
        left: Math.random() * 60 + 20, // 20-80% (more centered)
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
          isInner={false}
        />
      ))}

      <OpalGem size={size}>
        <ShimmerLayer />
        <OpalHighlight />

        {/* Inner diamonds */}
        {innerDiamondsRef.current.map((diamond) => (
          <Diamond
            key={`inner-${diamond.id}`}
            size={diamond.size}
            left={diamond.left}
            delay={diamond.delay}
            isInner={true}
          />
        ))}
      </OpalGem>
    </OpalContainer>
  );
};

export default OpalAnimation;
