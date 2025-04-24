import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Badge as MuiBadge,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';
import PayPalButton from './PayPalButton';

const CartDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '350px',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const Cart = () => {
  const {
    cart,
    cartTotal,
    currency,
    setCurrency,
    convertPrice,
    getFormattedPrice,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  const [open, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Calculate total cart items (sum of quantities)
  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const handleCheckoutSuccess = (details) => {
    setCheckoutOpen(false);
    setOpen(false);
    clearCart();
    setSnackbarMessage('Payment successful! Thank you for your purchase.');
    setSnackbarOpen(true);
  };

  const handleCheckoutError = (error) => {
    setSnackbarMessage('Payment failed. Please try again.');
    setSnackbarOpen(true);
  };

  const handleQuantityChange = (id, event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0) {
      updateQuantity(id, value);
    }
  };

  return (
    <>
      <IconButton
        className="cart-open-button"
        color="inherit"
        onClick={() => setOpen(true)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px'
        }}
      >
        <MuiBadge
          badgeContent={totalItems}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#f0c14b',
              color: '#1d2b39',
              fontWeight: 'bold',
              top: -2,
              right: -2
            }
          }}
        >
          <ShoppingCartIcon />
        </MuiBadge>
      </IconButton>

      <CartDrawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {cart.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={item.name} src={item.image} variant="square" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Typography variant="body2" color="text.primary">
                          ${item.price.toFixed(2)}
                        </Typography>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                        inputProps={{ min: 1, style: { width: '40px' } }}
                        sx={{ width: '60px', mr: 1 }}
                      />
                      <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ mt: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="currency-select-label">Currency</InputLabel>
                  <Select
                    labelId="currency-select-label"
                    id="currency-select"
                    value={currency}
                    label="Currency"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="CAD">CAD (C$)</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="h6">
                  Total: {getFormattedPrice(cartTotal)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setCheckoutOpen(true)}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </CartDrawer>

      <Dialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity}`}
                />
                <Typography variant="body1">
                  {getFormattedPrice(item.price * item.quantity)}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Total: {getFormattedPrice(cartTotal)}
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Pay with PayPal
            </Typography>
            <PayPalButton
              amount={convertPrice(cartTotal)}
              currency={currency}
              onSuccess={handleCheckoutSuccess}
              onError={handleCheckoutError}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

// Badge component for cart icon
const Badge = ({ badgeContent, color, children }) => {
  if (badgeContent === 0) {
    return children;
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {children}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          transform: 'translate(50%, -50%)',
          backgroundColor: color === 'error' ? '#f44336' : '#1976d2',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.75rem',
          fontWeight: 'bold',
        }}
      >
        {badgeContent}
      </Box>
    </Box>
  );
};

export default Cart;
