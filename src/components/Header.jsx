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
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink, useNavigate, Link } from 'react-router-dom';
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
  color: '#1d2b39', // Dark blue text
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.75rem',
  width: '100%',
  overflow: 'hidden',
}));

const MainBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a3a6c', // Professional blue
  padding: '8px 0', // Reduced padding from 12px to 8px
  backgroundSize: 'cover',
}));

const NavBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#0c2348', // Darker blue
  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  padding: '2px 0', // Added small padding for more compact look
}));

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  '&:focus-within': {
    backgroundColor: 'white',
    boxShadow: '0 0 0 2px rgba(240, 193, 75, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#333',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '6px 6px 6px 0',
    paddingLeft: '0.8em',
    width: '100%',
    fontSize: '0.8rem',
    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.5)',
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

const GoldBar = styled(Box)(({ theme }) => ({
  background: '#000000', // Black accent line
  height: '1px', // Thinner line
  width: '100%',
}));

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
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}&_t=${Date.now()}`);
      setSearchQuery(''); // Clear input after successful submission
    }
  };

  return (
    <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', width: '100%' }}>
      <StyledInputBase
        placeholder="Search the store"
        inputProps={{ 'aria-label': 'search' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />
      <IconButton
        type="submit"
        sx={{ color: '#1d2b39', padding: '4px' }}
      >
        <SearchIcon fontSize="small" />
      </IconButton>
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

  return (
    <>
      {/* Welcome Banner with Phone Number */}
      <Box sx={{
        backgroundColor: '#0c2348',
        color: 'white',
        py: 0.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3
      }}>
        <Typography variant="body2" sx={{ fontWeight: 400, fontSize: '0.8rem' }}>
          Welcome to Ottawa Opal Shop
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ color: '#e53935', mr: 0.5, display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
            </svg>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem', color: 'white' }}>
            613-555-5555
          </Typography>
        </Box>
      </Box>

      {/* Main header with logo and search */}
      <MainBar>
        <Container maxWidth="xl" sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
        }}>
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
              order: { xs: 1, sm: 1 }
            }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: 'white',
                  fontWeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  letterSpacing: '1px',
                  fontSize: isMobile ? '1.5rem' : '2.2rem', // Larger font
                  lineHeight: 1.1, // Tighter line height
                  whiteSpace: 'nowrap',
                  fontFamily: '"Times New Roman", serif',
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

              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
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

      {/* Gold accent bar */}
      <GoldBar />

      {/* Navigation Menu */}
      <Box sx={{
        backgroundColor: '#1a3a6c',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Container maxWidth="xl" sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
        }}>
          <Box sx={{
            display: 'flex',
            py: 1,
            px: { xs: 2, sm: 3 }
          }}>
            <Box sx={{
              display: 'flex',
              gap: { xs: 3, sm: 4 },
              mx: 'auto'
            }}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '4px 0'
                }}
              >
                Home
              </Link>
              <Link
                to="/videos"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '4px 0'
                }}
              >
                Videos
              </Link>
              <Link
                to="/about"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '4px 0'
                }}
              >
                About
              </Link>
              <Link
                to="/contact"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '4px 0'
                }}
              >
                Contact
              </Link>
              <Link
                to="/testimonials"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '4px 0'
                }}
              >
                Testimonials
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Header;
