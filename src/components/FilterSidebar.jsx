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

const NavList = styled(List)(({ theme }) => ({
  padding: 0,
  backgroundColor: 'white',
  marginBottom: 0,
  borderRadius: '4px 4px 0 0',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderBottom: 'none',
}));

const NavItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: '#333',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '0.85rem',
  width: '100%',
  textAlign: 'left',
  padding: '14px 16px',
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
    <Box sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      {/* Navigation Links */}
      <NavList>
        <NavItem>
          <NavLink to="/" onClick={(e) => handleNavigation(e, '/')}>HOME</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/collections" onClick={(e) => handleNavigation(e, '/collections')}>COLLECTIONS</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/signature" onClick={(e) => handleNavigation(e, '/signature')}>SIGNATURE</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/videos" onClick={(e) => handleNavigation(e, '/videos')}>VIDEOS</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about" onClick={(e) => handleNavigation(e, '/about')}>ABOUT</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact" onClick={(e) => handleNavigation(e, '/contact')}>CONTACT</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/testimonials" onClick={(e) => handleNavigation(e, '/testimonials')}>TESTIMONIALS</NavLink>
        </NavItem>
      </NavList>

      <FilterContainer>
        {/* Collections Section */}
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
