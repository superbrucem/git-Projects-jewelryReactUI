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
  padding: '0 16px 16px 16px',
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

const NavHeader = styled(Typography)(({ theme }) => ({
  padding: '12px 16px',
  fontWeight: 600,
  fontSize: '0.9rem',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
        <NavHeader>Navigation</NavHeader>
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
              value={Object.entries(filters.collections).find(([_, value]) => value)[0]}
              onChange={(e) => handleRadioChange('collections', e.target.value)}
            >
              <FormControlLabel
                value="all"
                control={<Radio size="small" />}
                label={<Typography sx={{ color: '#8B4513', fontWeight: 500 }}>All Collections</Typography>}
              />
              <FormControlLabel
                value="5-elements"
                control={<Radio size="small" />}
                label={<Typography sx={{ color: '#006400' }}>5 Elements</Typography>}
              />
              <FormControlLabel
                value="greek-gods"
                control={<Radio size="small" />}
                label={<Typography sx={{ color: '#006400' }}>Greek Gods</Typography>}
              />
              <FormControlLabel
                value="underworld"
                control={<Radio size="small" />}
                label={<Typography sx={{ color: '#006400' }}>Underworld</Typography>}
              />
            </RadioGroup>
          </FilterContent>
        </FilterSection>
      </FilterContainer>
    </Box>
  );
};

export default FilterSidebar;
