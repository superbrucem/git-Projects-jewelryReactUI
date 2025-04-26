import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Divider,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useCart } from '../context/CartContext';
import VideoPlayer from './VideoPlayer';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  }
}));

const QuickViewButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '4px',
  padding: '4px 8px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 1,
}));

const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&:hover .quick-view': {
    opacity: 1,
  }
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f44336',
  color: 'white',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
  width: '100%',
  marginTop: theme.spacing(1),
  borderRadius: '4px',
  padding: '8px 16px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: '0.875rem',
}));

const ProductCard = ({ product, onAddToCart }) => {
  const { getFormattedPrice } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart && quantity > 0 && product.inStock) {
      onAddToCart({...product, quantity});
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false);
  };

  // Refs for hover timers
  const enterTimerRef = useRef(null);
  const leaveTimerRef = useRef(null);

  const handleMouseEnter = () => {
    // Clear any existing leave timer
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }

    // Set a small delay before showing the video
    if (product.videoUrl && !videoError) {
      enterTimerRef.current = setTimeout(() => {
        setIsHovering(true);
      }, 150); // 150ms delay for smoother experience
    }
  };

  const handleMouseLeave = () => {
    // Clear any existing enter timer
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }

    // Set a small delay before hiding the video
    leaveTimerRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 100); // 100ms delay to prevent flickering
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleVideoError = (error) => {
    console.error('Video playback error:', error);
    setVideoError(true);
    setIsHovering(false);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <StyledCard>
      <ProductImageContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{
            cursor: 'pointer',
            objectFit: 'contain',
            backgroundColor: '#f5f5f5',
            padding: '10px',
            zIndex: 0
          }}
          onClick={handleQuickView}
        />

        {/* Video player that shows on hover */}
        {product.videoUrl && !videoError && (
          <VideoPlayer
            videoUrl={product.videoUrl}
            isVisible={isHovering}
            onError={handleVideoError}
          />
        )}

        <QuickViewButton
          className="quick-view"
          sx={{
            opacity: { xs: 1, md: 0 },
            transition: 'opacity 0.3s ease',
            '.MuiCard-root:hover &': { opacity: 1 },
            zIndex: 2
          }}
          onClick={handleQuickView}
        >
          <VisibilityIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="caption" fontWeight="bold">
            QUICK VIEW
          </Typography>
        </QuickViewButton>

        {/* Stock indicator */}
        {product.stock <= 5 && (
          <Chip
            label={product.stock > 0 ? `Only ${product.stock} left` : "Out of stock"}
            color={product.stock > 0 ? "warning" : "error"}
            size="small"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              backgroundColor: product.stock > 0 ? '#ff7043' : '#f44336',
              color: 'white',
              borderRadius: '16px',
              '& .MuiChip-label': {
                px: 1
              },
              zIndex: 2
            }}
          />
        )}
      </ProductImageContainer>

      <CardContent sx={{ flexGrow: 1, pb: 1, px: { xs: 1, sm: 2 } }}>
        <Typography
          variant="body2"
          component="div"
          sx={{
            height: { xs: 36, sm: 40 },
            overflow: 'hidden',
            fontWeight: 500,
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            lineHeight: 1.2,
            mb: 1
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="h6"
          color="error"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            mb: 1
          }}
        >
          {getFormattedPrice(product.price)}
        </Typography>
        <AddToCartButton
          variant="contained"
          startIcon={<ShoppingCartIcon sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />}
          onClick={handleAddToCart}
          disabled={!product.inStock || product.stock === 0}
          sx={{
            py: { xs: 0.5, sm: 1 },
            fontSize: { xs: '0.7rem', sm: '0.8rem' }
          }}
        >
          ADD TO CART
        </AddToCartButton>

        {/* Social Sharing */}
        <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid #eee' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: { xs: 'wrap', sm: 'nowrap' }
          }}>
            <Typography variant="caption" color="text.secondary" sx={{
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              mr: { xs: 1, sm: 0 }
            }}>
              Share:
            </Typography>
            <Box sx={{
              display: 'flex',
              gap: { xs: 0.2, sm: 0.5 },
              flexWrap: 'nowrap'
            }}>
              <Tooltip title="Share on Facebook">
                <IconButton
                  size="small"
                  sx={{
                    color: '#3b5998',
                    padding: { xs: '2px', sm: '4px' }
                  }}
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <FacebookIcon sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share on Instagram">
                <IconButton
                  size="small"
                  sx={{
                    color: '#C13584',
                    padding: { xs: '2px', sm: '4px' }
                  }}
                  onClick={() => window.open('https://www.instagram.com/', '_blank')}
                >
                  <InstagramIcon sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share on Pinterest">
                <IconButton
                  size="small"
                  sx={{
                    color: '#E60023',
                    padding: { xs: '2px', sm: '4px' }
                  }}
                  onClick={() => window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(product.name)}`, '_blank')}
                >
                  <PinterestIcon sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share on Twitter">
                <IconButton
                  size="small"
                  sx={{
                    color: '#1DA1F2',
                    padding: { xs: '2px', sm: '4px' }
                  }}
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <TwitterIcon sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share on WhatsApp">
                <IconButton
                  size="small"
                  sx={{
                    color: '#25D366',
                    padding: { xs: '2px', sm: '4px' }
                  }}
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(product.name + ' - ' + window.location.href)}`, '_blank')}
                >
                  <WhatsAppIcon sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </CardContent>

      {/* Quick View Dialog */}
      <Dialog
        open={quickViewOpen}
        onClose={handleCloseQuickView}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Quick View
          <IconButton onClick={handleCloseQuickView} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            <Box sx={{ flex: '0 0 40%', maxWidth: { xs: '100%', sm: '40%' } }}>
              <Box
                sx={{
                  width: '100%',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  padding: '10px',
                  position: 'relative'
                }}
              >
                {product.videoUrl && !videoError ? (
                  <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <video
                      src={product.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        maxWidth: '100%',
                        maxHeight: '180px',
                        objectFit: 'contain',
                        borderRadius: '4px'
                      }}
                      onError={() => setVideoError(true)}
                    />
                  </Box>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '180px',
                      objectFit: 'contain',
                      borderRadius: '4px'
                    }}
                  />
                )}
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 60%' }}>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="error" fontWeight="bold" gutterBottom>
                {getFormattedPrice(product.price)}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Collection: {product.collection}
              </Typography>
              <Typography variant="body2" paragraph>
                {product.description || "This beautiful gemstone features exceptional clarity and brilliance, perfect for creating stunning jewelry pieces."}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Quantity:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                  <IconButton size="small" onClick={decrementQuantity} disabled={quantity <= 1}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <TextField
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{
                      min: 1,
                      max: product.stock,
                      style: { width: '40px', textAlign: 'center', padding: '4px 0' }
                    }}
                    variant="standard"
                    sx={{ width: '50px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:after': { borderBottom: 'none' } }}
                  />
                  <IconButton size="small" onClick={incrementQuantity} disabled={quantity >= product.stock}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Typography variant="body2" color={product.stock > 5 ? "success.main" : product.stock > 0 ? "warning.main" : "error.main"} sx={{ mb: 2 }}>
                {product.stock > 5 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
              </Typography>

              <Button
                variant="contained"
                color="error"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                onClick={() => {
                  handleAddToCart();
                  handleCloseQuickView();
                }}
                disabled={!product.inStock || product.stock === 0}
              >
                ADD TO CART
              </Button>

              {/* Social Sharing in Quick View */}
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Share:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Share on Facebook">
                      <IconButton
                        size="small"
                        sx={{ color: '#3b5998' }}
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                      >
                        <FacebookIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share on Instagram">
                      <IconButton
                        size="small"
                        sx={{ color: '#C13584' }}
                        onClick={() => window.open('https://www.instagram.com/', '_blank')}
                      >
                        <InstagramIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share on Pinterest">
                      <IconButton
                        size="small"
                        sx={{ color: '#E60023' }}
                        onClick={() => window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(product.name)}`, '_blank')}
                      >
                        <PinterestIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share on Twitter">
                      <IconButton
                        size="small"
                        sx={{ color: '#1DA1F2' }}
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                      >
                        <TwitterIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share on WhatsApp">
                      <IconButton
                        size="small"
                        sx={{ color: '#25D366' }}
                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(product.name + ' - ' + window.location.href)}`, '_blank')}
                      >
                        <WhatsAppIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {product.name} added to cart!
        </Alert>
      </Snackbar>
    </StyledCard>
  );
};

export default ProductCard;