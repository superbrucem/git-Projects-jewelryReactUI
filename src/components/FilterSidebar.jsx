import React from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
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
          <FilterContent>
            <RadioGroup
              value={selectedCollection || 'all'}
              onChange={(e) => {
                setSelectedCollection(e.target.value);
                handleRadioChange('collections', e.target.value);
                navigate(`/collections?category=${e.target.value}`);
              }}
            >
              {collectionsData.map((collection) => (
                <FormControlLabel
                  key={collection.id}
                  value={collection.id}
                  control={<Radio size={isMobile ? "medium" : "small"} sx={{ padding: isMobile ? '6px' : '4px' }} />}
                  label={
                    <Typography
                      sx={{
                        color: '#333333',
                        fontWeight: collection.id === 'all' ? 500 : 400,
                        fontSize: isMobile ? '0.85rem' : '0.75rem', // Larger font on mobile
                        lineHeight: 1.2, // Tighter line height
                        marginLeft: '-4px', // Pull text slightly closer to radio button
                        pl: 1 // Add indentation for all items including "All Collections"
                      }}
                    >
                      {collection.label}
                    </Typography>
                  }
                  sx={{
                    margin: 0,
                    padding: isMobile ? '8px 0' : '4px 0', // More vertical padding on mobile
                    ml: 1 // Add left margin for all items
                  }}
                />
              ))}
            </RadioGroup>
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
          <FilterContent>
            <RadioGroup
              value={selectedSignature || 'all-signature'}
              onChange={(e) => {
                setSelectedSignature(e.target.value);
                // Use 'collection' parameter instead of 'category'
                navigate(`/signature?collection=${e.target.value}`);
              }}
            >
              {signatureData.map((collection) => (
                <FormControlLabel
                  key={collection.id}
                  value={collection.id}
                  control={<Radio size={isMobile ? "medium" : "small"} sx={{ padding: isMobile ? '6px' : '4px' }} />}
                  label={
                    <Typography
                      sx={{
                        color: '#333333',
                        fontWeight: collection.id === 'all-signature' ? 500 : 400,
                        fontSize: isMobile ? '0.85rem' : '0.75rem', // Larger font on mobile
                        lineHeight: 1.2, // Tighter line height
                        marginLeft: '-4px', // Pull text slightly closer to radio button
                        pl: 1 // Add indentation for all items
                      }}
                    >
                      {collection.label}
                    </Typography>
                  }
                  sx={{
                    margin: 0,
                    padding: isMobile ? '8px 0' : '4px 0', // More vertical padding on mobile
                    ml: 1 // Add left margin for all items
                  }}
                />
              ))}
            </RadioGroup>
          </FilterContent>
        </FilterSection>
      </FilterContainer>
    </Box>
  );
};

export default FilterSidebar;
