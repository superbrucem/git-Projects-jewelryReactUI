import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  InputBase,
  IconButton,
  Badge,
  Stack,
  styled,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ScrollingBanner from './ScrollingBanner';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

// Styled components
const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#1d2b39',
  color: 'white',
  padding: '4px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  fontSize: '0.75rem',
}));

const MainBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#1d2b39',
  padding: '8px 0', // Reduced padding from 12px to 8px
  backgroundImage: `
    radial-gradient(circle at 15% 20%, rgba(67, 206, 162, 0.05) 0%, transparent 6%),
    radial-gradient(circle at 85% 25%, rgba(67, 206, 162, 0.05) 0%, transparent 6%),
    radial-gradient(circle at 50% 50%, rgba(67, 206, 162, 0.03) 0%, transparent 8%),
    radial-gradient(circle at 30% 80%, rgba(67, 206, 162, 0.05) 0%, transparent 6%),
    radial-gradient(circle at 70% 75%, rgba(67, 206, 162, 0.05) 0%, transparent 6%),
    linear-gradient(to bottom, #1d2b39, #1d2b39)
  `,
  backgroundSize: 'cover',
}));

const NavBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#1d2b39',
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
  // Make the search box wide but leave some space before the animation
  width: '100%',
  maxWidth: 'calc(100% - 120px)', // Leave more space to prevent overlapping with the animation
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  '&:focus-within': {
    backgroundColor: 'white',
    boxShadow: '0 0 0 2px rgba(240, 193, 75, 0.3)',
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
  padding: '8px 14px', // Reduced padding
  cursor: 'pointer',
  fontSize: '0.75rem', // Smaller font
  fontWeight: 500,
  letterSpacing: '0.5px',
  position: 'relative',
  transition: 'all 0.2s ease',
  textDecoration: 'none',
  display: 'inline-block',
  '&:hover': {
    color: '#f0c14b',
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
    backgroundColor: '#f0c14b',
    transition: 'width 0.3s ease',
  }
}));

const GoldBar = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(90deg, #d4af37 0%, #f0c14b 50%, #d4af37 100%)',
  height: '4px',
  width: '100%',
}));

const OpalIcon = styled(Box)(({ theme }) => ({
  // Styled to match the reference image
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00e5ff 0%, #00796b 100%)',
  boxShadow: '0 0 20px rgba(0, 229, 255, 0.9)',
  margin: '0 8px', // Reduced margin from 12px to 8px
  position: 'relative',
  overflow: 'visible',
  animation: 'pulseOpal 4s ease-in-out infinite',
  '@keyframes pulseOval': {
    '0%': {
      boxShadow: '0 0 20px rgba(0, 229, 255, 0.9)',
      transform: 'scale(1)',
    },
    '50%': {
      boxShadow: '0 0 30px rgba(0, 229, 255, 1)',
      transform: 'scale(1.05)',
    },
    '100%': {
      boxShadow: '0 0 20px rgba(0, 229, 255, 0.9)',
      transform: 'scale(1)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-25%',
    left: '-25%',
    width: '150%',
    height: '150%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)',
    animation: 'pulseGlow 3s ease-in-out infinite alternate',
  },
  '@keyframes pulseGlow': {
    '0%': {
      opacity: 0.7,
      transform: 'scale(1)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1.1)',
    },
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
    filter: 'blur(1px)',
    animation: 'glowOval 5s ease-in-out infinite alternate',
  },
  '@keyframes glowOval': {
    '0%': {
      opacity: 0.8,
      filter: 'blur(1px)',
    },
    '50%': {
      opacity: 1,
      filter: 'blur(1.5px)',
    },
    '100%': {
      opacity: 0.9,
      filter: 'blur(1px)',
    },
  },
  // Inner diamond/highlight
  '& .diamond-inner': {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '50%',
    boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
    top: '30%',
    left: '30%',
    opacity: 0.9,
    zIndex: 3,
    animation: 'diamondGlow 3s ease-in-out infinite alternate',
  },
  '@keyframes diamondGlow': {
    '0%': {
      opacity: 0.7,
      transform: 'scale(0.8)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1.1)',
    },
  },
  // Outer glow particles
  '& .diamond': {
    position: 'absolute',
    width: '4px',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '50%',
    boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
    opacity: 0,
    zIndex: -1,
  },
  '& .diamond-1': {
    left: '50%',
    bottom: '50%',
    animation: 'diamondFloat1 2s ease-out infinite',
  },
  '& .diamond-2': {
    left: '30%',
    bottom: '50%',
    animation: 'diamondFloat2 2.5s ease-out infinite 0.5s',
  },
  '& .diamond-3': {
    left: '70%',
    bottom: '50%',
    animation: 'diamondFloat3 3s ease-out infinite 1s',
  },
  '@keyframes diamondFloat1': {
    '0%': {
      transform: 'translateY(0) scale(0)',
      opacity: 0,
    },
    '10%': {
      opacity: 1,
      transform: 'translateY(-5px) scale(1)',
    },
    '90%': {
      opacity: 0.7,
    },
    '100%': {
      transform: 'translateY(-20px) scale(0)',
      opacity: 0,
    },
  },
  '@keyframes diamondFloat2': {
    '0%': {
      transform: 'translateY(0) scale(0)',
      opacity: 0,
    },
    '10%': {
      opacity: 1,
      transform: 'translateY(-5px) scale(1)',
    },
    '90%': {
      opacity: 0.7,
    },
    '100%': {
      transform: 'translateY(-25px) scale(0)',
      opacity: 0,
    },
  },
  '@keyframes diamondFloat3': {
    '0%': {
      transform: 'translateY(0) scale(0)',
      opacity: 0,
    },
    '10%': {
      opacity: 1,
      transform: 'translateY(-5px) scale(1)',
    },
    '90%': {
      opacity: 0.7,
    },
    '100%': {
      transform: 'translateY(-22px) scale(0)',
      opacity: 0,
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  transition: 'all 0.2s ease',
  padding: '6px',
  '&:hover': {
    color: '#f0c14b',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
}));

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {/* Top bar with contact info and social links */}
      <TopBar>
        <Container maxWidth="xl" sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1280px', xl: '1600px' }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 0.8, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }} />
              <Typography variant="body2" sx={{ fontWeight: 400, letterSpacing: '0.3px', fontSize: '0.75rem' }}>
                +1 (613) 555-1234
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 0.8, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }} />
              <Typography variant="body2" sx={{ fontWeight: 400, letterSpacing: '0.3px', fontSize: '0.75rem' }}>
                Ottawa_Opal_Shop@hotmail.com
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '1px',
                color: '#f0c14b',
                fontSize: '0.75rem'
              }}
            >
              FREE SHIPPING ON ALL ORDERS OVER $99.95
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <StyledIconButton size="small" sx={{ padding: '4px' }}>
              <FacebookIcon sx={{ fontSize: '0.9rem' }} />
            </StyledIconButton>
            <StyledIconButton size="small" sx={{ padding: '4px' }}>
              <InstagramIcon sx={{ fontSize: '0.9rem' }} />
            </StyledIconButton>
          </Box>
        </Container>
      </TopBar>

      {/* Main header with logo and search */}
      <MainBar>
        <Container maxWidth="xl" sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1280px', xl: '1600px' }
        }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '56px' /* Reduced from default 64px */ }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  letterSpacing: '0.5px', // Reduced letter spacing
                  fontSize: isMobile ? '1.1rem' : '1.3rem', // Slightly smaller font
                  lineHeight: 1.1, // Tighter line height
                  whiteSpace: 'nowrap',
                }}
              >
                <OpalIcon>
                  <Box className="diamond-inner" />
                  <Box className="diamond diamond-1" />
                  <Box className="diamond diamond-2" />
                  <Box className="diamond diamond-3" />
                </OpalIcon>
                OTTAWA OPAL SHOP
                <OpalIcon>
                  <Box className="diamond-inner" />
                  <Box className="diamond diamond-1" />
                  <Box className="diamond diamond-2" />
                  <Box className="diamond diamond-3" />
                </OpalIcon>
              </Typography>
            </Box>

            {/* Search, Account, Cart */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '70%', justifyContent: 'flex-end' }}>
              <SearchBox>
                <StyledInputBase
                  placeholder="Search the store"
                  inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton sx={{ color: '#1d2b39', padding: '4px' }}>
                  <SearchIcon fontSize="small" />
                </IconButton>
              </SearchBox>

              <StyledIconButton aria-label="account">
                <PersonIcon />
              </StyledIconButton>

              <StyledIconButton aria-label="shopping cart">
                <Badge
                  badgeContent={0}
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#f0c14b',
                      color: '#1d2b39',
                      fontWeight: 'bold'
                    }
                  }}
                >
                  <LocalMallOutlinedIcon />
                </Badge>
              </StyledIconButton>
            </Box>
          </Toolbar>
        </Container>
      </MainBar>

      {/* Scrolling Banner */}
      <ScrollingBanner messages={['PERFECT FOR SPECIAL OCCASIONS', 'UNIQUE HANDCRAFTED JEWELRY', 'FREE GIFT WRAPPING']} />

      {/* Navigation bar */}
      <NavBar>
        <Container maxWidth="xl" sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1280px', xl: '1600px' }
        }}>
          <Stack direction="row" justifyContent="center">
            <NavItem to="/">HOME</NavItem>
            <NavItem to="/collections">COLLECTIONS</NavItem>
            <NavItem to="/videos">VIDEOS</NavItem>
            <NavItem to="/about">ABOUT</NavItem>
            <NavItem to="/contact">CONTACT</NavItem>
            <NavItem to="/testimonials">TESTIMONIALS</NavItem>
          </Stack>
        </Container>
      </NavBar>

      {/* Gold accent bar */}
      <GoldBar />
    </>
  );
};

export default Header;
