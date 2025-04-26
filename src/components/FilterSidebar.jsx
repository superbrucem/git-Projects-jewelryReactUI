import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFilter } from '../context/FilterContext';
import { Link, useNavigate } from 'react-router-dom';
import collectionsData from '../data/collections_sidemenu.json';
import signatureData from '../data/signature_collections.json';

// Styled components
const FilterContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%', // Prevent stretching in Firefox
  borderRadius: '0 0 4px 4px',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderTop: 'none',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  [theme.breakpoints.down('sm')]: {
    borderRadius: '4px',
    marginBottom: '10px'
  }
}));

const FilterSection = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  }
}));

const FilterHeader = styled(AccordionSummary)(({ theme }) => ({
  padding: '12px 16px',
  minHeight: '48px',
  backgroundColor: '#f5f5f5', // Light gray background
  color: '#333333', // Dark text
  borderBottom: '1px solid #e0e0e0', // Light gray border
  '&.Mui-expanded': {
    minHeight: '48px',
  },
  '& .MuiAccordionSummary-content': {
    margin: '0',
    '&.Mui-expanded': {
      margin: '0',
    }
  },
  '& .MuiSvgIcon-root': {
    color: '#333333', // Dark icon color
  },
  [theme.breakpoints.down('sm')]: {
    padding: '14px 16px', // Slightly larger touch target on mobile
    minHeight: '52px',
    '&.Mui-expanded': {
      minHeight: '52px',
    }
  }
}));

const FilterContent = styled(AccordionDetails)(({ theme }) => ({
  padding: '0 12px 12px 12px',
}));

const NavContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '10px'
  }
}));

// Use AccordionSummary for NavHeader to match the Collections section
const NavHeader = styled(AccordionSummary)(({ theme }) => ({
  padding: '12px 16px',
  minHeight: '48px',
  '&.Mui-expanded': {
    minHeight: '48px',
  },
  '& .MuiAccordionSummary-content': {
    margin: '0',
    '&.Mui-expanded': {
      margin: '0',
    }
  },
  borderBottom: '1px solid #e0e0e0', // Light gray border
  backgroundColor: '#f5f5f5', // Light gray background
  color: '#333333', // Dark text
  '& .MuiSvgIcon-root': {
    color: '#333333', // Dark icon color
  },
  [theme.breakpoints.down('sm')]: {
    padding: '14px 16px', // Slightly larger touch target on mobile
    minHeight: '52px',
    '&.Mui-expanded': {
      minHeight: '52px',
    }
  }
}));

const NavList = styled(List)(({ theme }) => ({
  padding: '8px 0',
  backgroundColor: 'white',
}));

const NavItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  margin: '2px 0',
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: '#333',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '0.85rem',
  width: '100%',
  textAlign: 'left',
  padding: '8px 16px 8px 32px', // Increased left padding to match the Collections alignment
  display: 'block',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '12px 16px 12px 32px', // Larger touch target on mobile
    fontSize: '0.9rem', // Slightly larger font for better readability on mobile
  }
}));

// Main component
const FilterSidebar = () => {
  const { filters, updateFilter } = useFilter();
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = React.useState(null);
  const [selectedSignature, setSelectedSignature] = React.useState(null);
  const theme = useTheme();

  // Handle navigation to keep content in iframe
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Handle radio button changes
  const handleRadioChange = (category, option) => {
    updateFilter(category, option, true);
  };

  // Mobile detection
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '100%', // Prevent stretching in Firefox
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        padding: '0 8px' // Add some padding on mobile
      }
    }}>


      {/* Collections Section */}
      <FilterContainer>
        <FilterSection defaultExpanded={true}>
          <FilterHeader expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Collections
            </Typography>
          </FilterHeader>
          <FilterContent sx={{ p: 0 }}>
            <List disablePadding>
              {collectionsData.map((collection) => (
                <ListItemButton
                  key={collection.id}
                  selected={selectedCollection === collection.id}
                  onClick={() => {
                    setSelectedCollection(collection.id);
                    handleRadioChange('collections', collection.id);
                    navigate(`/collections?category=${collection.id}`);
                  }}
                  sx={{
                    py: isMobile ? 1 : 0.5,
                    pl: 3,
                    width: '100%',
                    maxWidth: '100%',
                    '&.Mui-selected': {
                      backgroundColor: 'transparent',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    }
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        noWrap
                        sx={{
                          color: selectedCollection === collection.id ? '#1976d2' : '#333333', // Blue color when selected
                          fontWeight: collection.id === 'all' || selectedCollection === collection.id ? 600 : 400,
                          fontSize: isMobile ? '0.85rem' : '0.75rem', // Larger font on mobile
                          lineHeight: 1.2, // Tighter line height
                          textTransform: 'uppercase', // Make all text uppercase
                          display: 'block', // Ensure proper text wrapping
                          width: '100%' // Ensure text stays within container
                        }}
                      >
                        {collection.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </FilterContent>
        </FilterSection>
      </FilterContainer>

      {/* Signature Collections Section */}
      <FilterContainer sx={{ mt: 3 }}>
        <FilterSection defaultExpanded={true}>
          <FilterHeader expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Signature
            </Typography>
          </FilterHeader>
          <FilterContent sx={{ p: 0 }}>
            <List disablePadding>
              {signatureData.map((collection) => (
                <ListItemButton
                  key={collection.id}
                  selected={selectedSignature === collection.id}
                  onClick={() => {
                    setSelectedSignature(collection.id);
                    // Use 'collection' parameter instead of 'category'
                    navigate(`/signature?collection=${collection.id}`);
                  }}
                  sx={{
                    py: isMobile ? 1 : 0.5,
                    pl: 3,
                    width: '100%',
                    maxWidth: '100%',
                    '&.Mui-selected': {
                      backgroundColor: 'transparent',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    }
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        noWrap
                        sx={{
                          color: selectedSignature === collection.id ? '#1976d2' : '#333333', // Blue color when selected
                          fontWeight: collection.id === 'all-signature' || selectedSignature === collection.id ? 600 : 400,
                          fontSize: isMobile ? '0.85rem' : '0.75rem', // Larger font on mobile
                          lineHeight: 1.2, // Tighter line height
                          textTransform: collection.id === 'all-signature' ? 'uppercase' : 'none', // Only "ALL SIGNATURE" in uppercase
                          display: 'block', // Ensure proper text wrapping
                          width: '100%' // Ensure text stays within container
                        }}
                      >
                        {collection.id === 'all-signature' ? 'ALL SIGNATURE' : collection.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </FilterContent>
        </FilterSection>
      </FilterContainer>
    </Box>
  );
};

export default FilterSidebar;
