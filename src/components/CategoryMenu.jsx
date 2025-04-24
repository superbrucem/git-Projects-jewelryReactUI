import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

// Styled components
const CategoryContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.1)',
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#1d2b39',
  color: 'white',
  padding: '10px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 600,
}));

const CategoryItem = styled(ListItem)(({ theme }) => ({
  padding: '8px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
      transform: 'translateX(2px)',
    }
  },
  '& .MuiListItemText-primary': {
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  '& .MuiSvgIcon-root': {
    transition: 'all 0.2s ease',
  }
}));

const SubCategoryList = styled(List)(({ theme }) => ({
  padding: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.01)',
}));

const SubCategoryItem = styled(ListItem)(({ theme }) => ({
  padding: '6px 16px 6px 32px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    color: theme.palette.primary.main,
  },
  '& .MuiListItemText-primary': {
    fontSize: '0.8rem',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  width: '100%',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

// Main component
const CategoryMenu = () => {
  // State to track which categories are expanded
  const [expanded, setExpanded] = useState({
    'gemstone-a-m': false,
    'gemstone-n-z': false,
    'garnet': false,
    'sapphire': false,
    'topaz-quartz': false,
  });

  // Toggle category expansion
  const handleToggle = (category) => {
    setExpanded({
      ...expanded,
      [category]: !expanded[category]
    });
  };

  return (
    <CategoryContainer elevation={0}>
      <CategoryHeader>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: '0.5px', fontSize: '0.9rem' }}>
          COLLECTIONS
        </Typography>
      </CategoryHeader>

      <List disablePadding>
        {/* Natural Gemstone A-M */}
        <CategoryItem onClick={() => handleToggle('gemstone-a-m')}>
          <ListItemText primary="NATURAL GEMSTONE A-M" />
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            {expanded['gemstone-a-m'] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemIcon>
        </CategoryItem>
        <Collapse in={expanded['gemstone-a-m']} timeout="auto" unmountOnExit>
          <SubCategoryList>
            <StyledLink to="/collections/amethyst">
              <SubCategoryItem>
                <ListItemText primary="Amethyst" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/aquamarine">
              <SubCategoryItem>
                <ListItemText primary="Aquamarine" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/citrine">
              <SubCategoryItem>
                <ListItemText primary="Citrine" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/emerald">
              <SubCategoryItem>
                <ListItemText primary="Emerald" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/garnet">
              <SubCategoryItem>
                <ListItemText primary="Garnet" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/jade">
              <SubCategoryItem>
                <ListItemText primary="Jade" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/lapis-lazuli">
              <SubCategoryItem>
                <ListItemText primary="Lapis Lazuli" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/moonstone">
              <SubCategoryItem>
                <ListItemText primary="Moonstone" />
              </SubCategoryItem>
            </StyledLink>
          </SubCategoryList>
        </Collapse>

        {/* Natural Gemstone N-Z */}
        <CategoryItem onClick={() => handleToggle('gemstone-n-z')}>
          <ListItemText primary="NATURAL GEMSTONE N-Z" />
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            {expanded['gemstone-n-z'] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemIcon>
        </CategoryItem>
        <Collapse in={expanded['gemstone-n-z']} timeout="auto" unmountOnExit>
          <SubCategoryList>
            <StyledLink to="/collections/opal">
              <SubCategoryItem>
                <ListItemText primary="Opal" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/peridot">
              <SubCategoryItem>
                <ListItemText primary="Peridot" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/ruby">
              <SubCategoryItem>
                <ListItemText primary="Ruby" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/tanzanite">
              <SubCategoryItem>
                <ListItemText primary="Tanzanite" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/tourmaline">
              <SubCategoryItem>
                <ListItemText primary="Tourmaline" />
              </SubCategoryItem>
            </StyledLink>
          </SubCategoryList>
        </Collapse>

        {/* Natural Garnet */}
        <CategoryItem onClick={() => handleToggle('garnet')}>
          <ListItemText primary="NATURAL GARNET" />
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            {expanded['garnet'] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemIcon>
        </CategoryItem>
        <Collapse in={expanded['garnet']} timeout="auto" unmountOnExit>
          <SubCategoryList>
            <StyledLink to="/collections/garnet-red">
              <SubCategoryItem>
                <ListItemText primary="Red Garnet" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/garnet-green">
              <SubCategoryItem>
                <ListItemText primary="Green Garnet" />
              </SubCategoryItem>
            </StyledLink>
          </SubCategoryList>
        </Collapse>

        {/* Natural Sapphire */}
        <CategoryItem onClick={() => handleToggle('sapphire')}>
          <ListItemText primary="NATURAL SAPPHIRE" />
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            {expanded['sapphire'] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemIcon>
        </CategoryItem>
        <Collapse in={expanded['sapphire']} timeout="auto" unmountOnExit>
          <SubCategoryList>
            <StyledLink to="/collections/sapphire-blue">
              <SubCategoryItem>
                <ListItemText primary="Blue Sapphire" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/sapphire-pink">
              <SubCategoryItem>
                <ListItemText primary="Pink Sapphire" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/sapphire-yellow">
              <SubCategoryItem>
                <ListItemText primary="Yellow Sapphire" />
              </SubCategoryItem>
            </StyledLink>
          </SubCategoryList>
        </Collapse>

        {/* Natural Topaz - Quartz */}
        <CategoryItem onClick={() => handleToggle('topaz-quartz')}>
          <ListItemText primary="NATURAL TOPAZ - QUARTZ" />
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            {expanded['topaz-quartz'] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemIcon>
        </CategoryItem>
        <Collapse in={expanded['topaz-quartz']} timeout="auto" unmountOnExit>
          <SubCategoryList>
            <StyledLink to="/collections/topaz">
              <SubCategoryItem>
                <ListItemText primary="Topaz" />
              </SubCategoryItem>
            </StyledLink>
            <StyledLink to="/collections/quartz">
              <SubCategoryItem>
                <ListItemText primary="Quartz" />
              </SubCategoryItem>
            </StyledLink>
          </SubCategoryList>
        </Collapse>

        {/* Natural Diamond */}
        <CategoryItem onClick={() => handleToggle('diamond')}>
          <ListItemText primary="NATURAL DIAMOND" />
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </CategoryItem>
      </List>
    </CategoryContainer>
  );
};

export default CategoryMenu;
