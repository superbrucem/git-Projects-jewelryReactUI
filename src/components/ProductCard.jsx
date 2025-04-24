import React, { useState } from 'react';
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
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';

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
      <ProductImageContainer>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{
            cursor: 'pointer',
            objectFit: 'contain',
            backgroundColor: '#f5f5f5',
            padding: '10px'
          }}
          onClick={handleQuickView}
        />
        <QuickViewButton
          className="quick-view"
          sx={{ opacity: { xs: 1, md: 0 }, transition: 'opacity 0.3s ease', '.MuiCard-root:hover &': { opacity: 1 } }}
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
              }
            }}
          />
        )}
      </ProductImageContainer>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="body2"
          component="div"
          sx={{
            height: 40,
            overflow: 'hidden',
            fontWeight: 500,
            fontSize: '0.9rem',
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
            fontSize: '1.1rem',
            mb: 1
          }}
        >
          {getFormattedPrice(product.price)}
        </Typography>
        <AddToCartButton
          variant="contained"
          startIcon={<ShoppingCartIcon sx={{ fontSize: '1rem' }} />}
          onClick={handleAddToCart}
          disabled={!product.inStock || product.stock === 0}
          sx={{ py: 1 }}
        >
          ADD TO CART
        </AddToCartButton>
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
                  padding: '10px'
                }}
              >
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