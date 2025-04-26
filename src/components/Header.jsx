import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  InputBase,
  IconButton,
  Badge as MuiBadge,
  Stack,
  styled,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import { Link as RouterLink, useNavigate, Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { keyframes } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Cart from './Cart';
import { useCart } from '../context/CartContext';

// Animation for scrolling text
const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Diamond shape for decoration
const Diamond = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  backgroundColor: '#1d2b39', // Dark blue from the theme
  transform: 'rotate(45deg)',
  margin: '0 12px',
}));

// Scrolling text container
const ScrollingTextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  whiteSpace: 'nowrap',
  animation: `${scroll} 40s linear infinite`, // Faster scrolling (was 65s)
}));

// Styled components
const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0c14b', // Yellow/gold color from the image
  color: '#3f51b5', // New blue color from the image
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.75rem',
  width: '100%',
  overflow: 'hidden',
}));

const MainBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#3949ab', // Updated blue color from the image
  padding: '10px 0', // Adjusted padding to match Ashergems
  backgroundSize: 'cover',
}));

const NavBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#3949ab', // Updated blue color from the image
  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  padding: '2px 0', // Added small padding for more compact look
}));

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px 0 0 4px', // Rounded only on left side
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'stretch', // Changed from 'center' to 'stretch'
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRight: 'none', // Remove right border
  overflow: 'hidden', // Prevent any overflow
  height: '36px', // Fixed height
  '&:focus-within': {
    backgroundColor: 'white',
    boxShadow: '0 0 0 2px rgba(229, 57, 53, 0.3)', // Red shadow to match search button
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#333',
  width: '100%',
  height: '100%',
  '& .MuiInputBase-input': {
    padding: '8px 8px 8px 0',
    paddingLeft: '1em',
    width: '100%',
    height: '100%',
    fontSize: '0.85rem',
    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.6)',
      opacity: 1,
    },
  },
}));

const NavItem = styled(RouterLink)(({ theme }) => ({
  color: 'white',
  padding: '8px 10px', // Further reduced padding for mobile
  cursor: 'pointer',
  fontSize: '0.75rem', // Smaller font
  fontWeight: 500,
  letterSpacing: '0.5px',
  position: 'relative',
  transition: 'all 0.2s ease',
  textDecoration: 'none',
  display: 'inline-block',
  '&:hover': {
    color: '#e53935', // Professional red
    '&::after': {
      width: '70%',
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '6px', // Adjusted from 8px to match more compact design
    left: '15%',
    width: '0',
    height: '2px',
    backgroundColor: '#e53935', // Professional red
    transition: 'width 0.3s ease',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px 8px',
    fontSize: '0.7rem',
    flex: '0 0 auto',
  }
}));

// Removed GoldBar as it's no longer needed

// Removed OpalIcon with animations

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  transition: 'all 0.2s ease',
  padding: '6px',
  '&:hover': {
    color: '#e53935', // Professional red
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
}));

// Search form component
const SearchForm = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      const timestamp = Date.now();
      // Force a new navigation with a unique timestamp to ensure React Router recognizes it as a new route
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}&_t=${timestamp}`);
      console.log('Header search submitted:', trimmedQuery, 'timestamp:', timestamp);
      setSearchQuery(''); // Clear input after successful submission
    }
  };

  return (
    <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <StyledInputBase
        placeholder="Search the store"
        inputProps={{ 'aria-label': 'search' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />
      <Button
        type="submit"
        disableRipple
        disableElevation
        variant="contained"
        sx={{
          backgroundColor: '#e53935', // Red like Ashergems
          color: 'white', // White icon
          padding: '0 10px',
          margin: '0',
          borderRadius: '0 4px 4px 0', // Rounded only on right side
          height: '100%',
          minWidth: '40px', // Fixed width to match image
          border: 'none',
          boxShadow: 'none',
          '&.MuiButtonBase-root': {
            boxShadow: 'none',
          },
          '&:hover': {
            backgroundColor: '#c62828', // Darker red on hover
            boxShadow: 'none',
          }
        }}
      >
        <SearchIcon fontSize="small" />
      </Button>
    </Box>
  );
};

// Cart icon with dynamic badge count
const CartIconWithBadge = () => {
  const { cart } = useCart();

  // Calculate total cart items (sum of quantities)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <StyledIconButton
      aria-label="shopping cart"
      component="div"
      sx={{
        position: 'relative',
        color: 'white',
        transition: 'all 0.2s ease',
        padding: '6px',
        '&:hover': {
          color: '#e53935', // Professional red
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
      onClick={() => document.querySelector('.cart-open-button').click()}
    >
      <MuiBadge
        badgeContent={totalItems}
        color="error"
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: '#e53935', // Professional red
            color: 'white',
            fontWeight: 'bold',
          }
        }}
      >
        <ShoppingCartIcon />
      </MuiBadge>
    </StyledIconButton>
  );
};

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Black Banner at the very top - twice as thick */}
      <Box sx={{
        backgroundColor: '#000000', // Black background
        color: 'white',
        py: 0.6, // Doubled vertical padding
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 3
      }}>
        <Typography variant="body2" sx={{ fontWeight: 400, fontSize: '0.75rem', py: 0.3 }}> {/* Added padding to text */}
          Free shipping on orders over $100
        </Typography>
      </Box>

      {/* Main header with logo and search */}
      <MainBar>
        <Container maxWidth="xl" sx={{ width: '100%', maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1600px', xl: '1800px' } }}>
          <Toolbar disableGutters sx={{
            justifyContent: 'space-between',
            minHeight: '56px', /* Reduced from default 64px */
            flexDirection: { xs: 'column', sm: 'row' },
            py: { xs: 2, sm: 0 }
          }}>
            {/* Logo */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              width: { xs: '100%', sm: '40%', md: '30%' },
              justifyContent: { xs: 'center', sm: 'flex-start' },
              mb: { xs: 1, sm: 0 },
              order: { xs: 1, sm: 1 },
              pl: { xs: 2, sm: 3 } // Add padding to match navigation
            }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: 'white',
                  fontWeight: 700, // Bold like Ashergems
                  display: 'flex',
                  alignItems: 'center',
                  letterSpacing: '0.5px',
                  fontSize: isMobile ? '1.3rem' : '1.6rem', // Size like Ashergems
                  lineHeight: 1.1, // Tighter line height
                  whiteSpace: 'nowrap',
                  fontFamily: 'Arial, sans-serif' // Sans-serif like Ashergems
                }}
              >
                Ottawa Opal Shop
              </Typography>
            </Box>

            {/* Search, Account, Cart */}
            <Box sx={{
              display: 'flex',
              gap: { xs: 1, sm: 2 },
              alignItems: 'center',
              width: { xs: '100%', sm: '60%', md: '70%' },
              justifyContent: { xs: 'center', sm: 'flex-end' },
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              order: { xs: 2, sm: 2 },
              mt: { xs: 1, sm: 0 }
            }}>
              <SearchBox sx={{
                maxWidth: { xs: 'calc(100% - 80px)', sm: 'calc(100% - 120px)' },
                width: { xs: '100%', sm: '100%' }
              }}>
                <SearchForm />
              </SearchBox>

              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
                <StyledIconButton aria-label="account" size={isMobile ? "small" : "medium"}>
                  <PersonIcon fontSize={isMobile ? "small" : "medium"} />
                </StyledIconButton>

                {/* Direct cart icon without the Cart component */}
                <CartIconWithBadge />
              </Box>

              {/* Hidden Cart component */}
              <Box sx={{ display: 'none' }}>
                <Cart />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </MainBar>

      {/* Navigation Menu - Ashergems style */}
      <Box sx={{
        backgroundColor: '#3949ab', // Updated blue color from the image
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Container maxWidth="xl" sx={{ width: '100%', maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1600px', xl: '1800px' } }}>
          {/* Single row navigation */}
          <Box sx={{
            display: 'flex',
            py: 1,
            px: 0,
            justifyContent: 'flex-start',
            pl: { xs: 2, sm: 3 },
            flexWrap: 'nowrap', // Prevent wrapping
            overflowX: 'auto', // Allow horizontal scrolling if needed
          }}>
            {/* Navigation Links with Active State Styling */}
            {[
              { path: '/', label: 'Home' },
              { path: '/videos', label: 'Videos' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' },
              { path: '/testimonials', label: 'Testimonials' },
              { path: '/customer-service', label: 'Customer Service' },
              { path: '/shipping-returns', label: 'Shipping & Returns' },
              { path: '/product-care', label: 'Product Care' },
              { path: '/warranty', label: 'Warranty' }
            ].map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: index === 0 ? '4px 10px 4px 0' : '4px 10px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  borderBottom: isActive(item.path) ? '2px solid white' : 'none'
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Header;
