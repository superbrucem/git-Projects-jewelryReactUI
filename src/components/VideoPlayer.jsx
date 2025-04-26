import React, { useRef, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&.visible': {
    opacity: 1,
  }
}));

const VideoElement = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

const LoadingContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2
});

const VideoPlayer = ({ videoUrl, isVisible, onError }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle video loading
  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = (error) => {
      console.error('Video loading error:', error);
      setIsLoading(false);
      setHasError(true);
      if (onError) onError(error);
    };

    // Add event listeners
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);

    // Set loading state when video source changes
    setIsLoading(true);

    // Clean up event listeners
    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
    };
  }, [videoUrl, onError]);

  // Handle play/pause based on visibility and loading state
  useEffect(() => {
     const videoElement = videoRef.current;

     if (!videoElement || hasError) return;

     // Play only when visible and loaded
     if (isVisible && !isLoading) {
      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing video:', error);
          setHasError(true);
          if (onError) onError(error);
        });
      }
     } else if (!isVisible) { // Ensure pause only happens when not visible
      // Pause the video when it's not visible
      try {
        videoElement.pause();
        // Reset to the beginning
        videoElement.currentTime = 0;
      } catch (error) {
         console.error('Error pausing video:', error);
      }
    }
   }, [isVisible, isLoading, hasError, onError]); // Add isLoading to dependencies

  if (!videoUrl || hasError) return null;

  return (
    <VideoContainer className={isVisible ? 'visible' : ''}>
      {isLoading && isVisible && (
        <LoadingContainer>
          <CircularProgress size={30} color="primary" />
        </LoadingContainer>
      )}
      <VideoElement
        ref={videoRef}
        src={videoUrl}
        loop
        muted
        playsInline
        preload="auto"
      />
    </VideoContainer>
  );
};

export default VideoPlayer;
