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
  Badge as MuiBadge
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
      padding: theme.spacing(1.5),
    },
  },
}));

const Cart = () => {
  const {
    cart,
    cartTotal,
    currency,
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
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 10,
          pb: 1
        }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Your Cart
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: '#f5f5f5',
              '&:hover': { backgroundColor: '#e0e0e0' }
            }}
          >
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
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      py: { xs: 2, sm: 1 }
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      mb: { xs: 1, sm: 0 }
                    }}>
                      <ListItemAvatar>
                        <Avatar
                          alt={item.name}
                          src={item.image}
                          variant="square"
                          sx={{ width: { xs: 40, sm: 40 }, height: { xs: 40, sm: 40 } }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              fontSize: { xs: '0.85rem', sm: '0.9rem' }
                            }}
                          >
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                          >
                            {getFormattedPrice(item.price)}
                          </Typography>
                        }
                      />
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: { xs: '100%', sm: 'auto' },
                      justifyContent: { xs: 'flex-end', sm: 'flex-end' }
                    }}>
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                        inputProps={{
                          min: 1,
                          style: {
                            width: { xs: '30px', sm: '40px' },
                            padding: { xs: '6px 4px', sm: '8px 8px' }
                          }
                        }}
                        sx={{
                          width: { xs: '50px', sm: '60px' },
                          mr: 1,
                          '& .MuiInputBase-input': {
                            padding: { xs: '6px 4px', sm: '8px 8px' }
                          }
                        }}
                      />
                      <IconButton
                        edge="end"
                        onClick={() => removeFromCart(item.id)}
                        sx={{
                          color: '#d32f2f',
                          padding: { xs: '6px', sm: '8px' }
                        }}
                      >
                        <DeleteIcon fontSize={window.innerWidth < 600 ? "small" : "medium"} />
                      </IconButton>
                    </Box>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>

            <Box sx={{ mt: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
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

      <Dialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: '16px', sm: '32px' },
            width: { xs: 'calc(100% - 32px)', sm: '600px' },
            maxHeight: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 64px)' }
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Checkout
          </Typography>
          <IconButton
            onClick={() => setCheckoutOpen(false)}
            sx={{
              backgroundColor: '#f5f5f5',
              '&:hover': { backgroundColor: '#e0e0e0' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2 } }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Order Summary
          </Typography>
          <List sx={{
            py: 0,
            '& .MuiListItem-root': {
              px: { xs: 1, sm: 2 },
              py: { xs: 1, sm: 1.5 }
            }
          }}>
            {cart.map((item) => (
              <ListItem key={item.id} sx={{
                borderBottom: '1px solid #f0f0f0',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' }
              }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' }
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                    >
                      Quantity: {item.quantity}
                    </Typography>
                  }
                  sx={{ mb: { xs: 1, sm: 0 } }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    alignSelf: { xs: 'flex-end', sm: 'center' }
                  }}
                >
                  {getFormattedPrice(item.price * item.quantity)}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mb: 2,
            backgroundColor: '#f9f9f9',
            p: 1.5,
            borderRadius: 1
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                color: '#d32f2f'
              }}
            >
              Total: {getFormattedPrice(cartTotal)}
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
            >
              Payment Options
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            >
              All prices are in CAD.
            </Typography>

            {/* Direct payment button for Canadian customers */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mb: 2,
                py: { xs: 1.2, sm: 1.5 },
                backgroundColor: '#0070ba',
                '&:hover': { backgroundColor: '#005ea6' },
                fontSize: { xs: '0.85rem', sm: '0.9rem' }
              }}
              onClick={handleCheckoutSuccess}
            >
              Pay with Credit/Debit Card ({getFormattedPrice(cartTotal)})
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 3,
                mb: 1,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                textAlign: 'center'
              }}
            >
              Or use PayPal:
            </Typography>

            <Box sx={{
              maxWidth: '100%',
              overflow: 'hidden',
              '& iframe': {
                maxWidth: '100%'
              }
            }}>
              <PayPalButton
                amount={convertPrice(cartTotal)}
                currency={currency}
                onSuccess={handleCheckoutSuccess}
                onError={handleCheckoutError}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2 } }}>
          <Button
            onClick={() => setCheckoutOpen(false)}
            variant="outlined"
            sx={{
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              minWidth: { xs: '80px', sm: '100px' }
            }}
          >
            Cancel
          </Button>
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
