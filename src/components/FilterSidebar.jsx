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
  ListItem
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
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
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
  '&.Mui-expanded': {
    minHeight: '48px',
  },
  '& .MuiAccordionSummary-content': {
    margin: '0',
    '&.Mui-expanded': {
      margin: '0',
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
  marginBottom: '20px'
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
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
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
}));

// Main component
const FilterSidebar = () => {
  const { filters, updateFilter } = useFilter();
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = React.useState(null);
  const [selectedSignature, setSelectedSignature] = React.useState(null);

  // Handle navigation to keep content in iframe
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Handle radio button changes
  const handleRadioChange = (category, option) => {
    updateFilter(category, option, true);
  };

  return (
    <Box>
      {/* Navigation Links */}
      <NavContainer>
        <FilterSection>
          <NavHeader expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight={600}>
              Navigation
            </Typography>
          </NavHeader>
          <FilterContent>
            <NavList>
              <NavItem>
                <NavLink to="/" onClick={(e) => handleNavigation(e, '/')}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/collections" onClick={(e) => handleNavigation(e, '/collections')}>Collections</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signature" onClick={(e) => handleNavigation(e, '/signature')}>Signature</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/videos" onClick={(e) => handleNavigation(e, '/videos')}>Videos</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" onClick={(e) => handleNavigation(e, '/about')}>About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/contact" onClick={(e) => handleNavigation(e, '/contact')}>Contact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/testimonials" onClick={(e) => handleNavigation(e, '/testimonials')}>Testimonials</NavLink>
              </NavItem>
            </NavList>
          </FilterContent>
        </FilterSection>
      </NavContainer>

      {/* Collections Section */}
      <FilterContainer>
        <FilterSection defaultExpanded>
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
                  control={<Radio size="small" sx={{ padding: '4px' }} />}
                  label={
                    <Typography
                      sx={{
                        color: collection.id === 'all' ? '#8B4513' : '#006400',
                        fontWeight: collection.id === 'all' ? 500 : 400,
                        fontSize: '0.75rem', // Smaller font size
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
                    padding: '4px 0', // Slightly more vertical padding for better spacing
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
        <FilterSection defaultExpanded>
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
                navigate(`/signature?category=${e.target.value}`);
              }}
            >
              {signatureData.map((collection) => (
                <FormControlLabel
                  key={collection.id}
                  value={collection.id}
                  control={<Radio size="small" sx={{ padding: '4px' }} />}
                  label={
                    <Typography
                      sx={{
                        color: collection.id === 'all-signature' ? '#8B4513' : '#006400',
                        fontWeight: collection.id === 'all-signature' ? 500 : 400,
                        fontSize: '0.75rem', // Smaller font size
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
                    padding: '4px 0', // Slightly more vertical padding for better spacing
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
