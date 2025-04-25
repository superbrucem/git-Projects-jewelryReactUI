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
import collectionsData from '../data/collections_sidemenu.json';

// Styled components
const CategoryContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.1)',
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5', // Light gray background
  color: '#333333', // Dark text
  padding: '10px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 600,
  borderBottom: '1px solid #e0e0e0', // Light gray border
}));

const CategoryItem = styled(ListItem)(({ theme }) => ({
  padding: '8px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    '& .MuiSvgIcon-root': {
      color: '#333333',
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
    color: '#333333',
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
    color: '#333333',
  },
}));

// Main component
const CategoryMenu = () => {
  // Filter out the 'all' category
  const categories = collectionsData.filter(cat => cat.id !== 'all');

  // Initialize expanded state based on categories from JSON
  const initialExpandedState = {};
  categories.forEach(cat => {
    // Extract the key from the id (remove 'natural-' prefix if present)
    const key = cat.id.replace('natural-', '');
    initialExpandedState[key] = false;
  });

  // State to track which categories are expanded
  const [expanded, setExpanded] = useState(initialExpandedState);

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
        <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: '0.5px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Categories
        </Typography>
      </CategoryHeader>

      <List disablePadding>
        {categories.map(category => {
          // Extract the key from the id (remove 'natural-' prefix if present)
          const key = category.id.replace('natural-', '');

          // Generate a display name for the "View All" link
          let viewAllText = `View All ${category.label.replace('NATURAL ', '')}`;

          // Special cases for specific categories
          if (key === 'garnet') viewAllText = 'View All Garnets';
          if (key === 'sapphire') viewAllText = 'View All Sapphires';
          if (key === 'diamond') viewAllText = 'View All Diamonds';
          if (key === 'topaz-quartz') viewAllText = 'View All Topaz & Quartz';

          return (
            <React.Fragment key={category.id}>
              {/* Category Header */}
              <CategoryItem
                onClick={() => handleToggle(key)}
                sx={{
                  backgroundColor: expanded[key] ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <ListItemText
                    primary={category.label}
                    sx={{
                      '& .MuiTypography-root': {
                        fontWeight: 500,
                        fontSize: '0.85rem',
                      }
                    }}
                  />
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    {expanded[key] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                  </ListItemIcon>
                </Box>
              </CategoryItem>

              {/* View All link */}
              {expanded[key] && (
                <Box
                  sx={{
                    p: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.01)',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    }
                  }}
                  onClick={() => window.location.href = `/collections?category=${category.id}`}
                >
                  <Typography variant="body2" sx={{ pl: 3, py: 1, fontSize: '0.8rem' }}>
                    {viewAllText}
                  </Typography>
                </Box>
              )}

              {/* Subcategories */}
              <Collapse in={expanded[key]} timeout="auto" unmountOnExit>
                <SubCategoryList>
                  {category.subcategories.map(subcategory => {
                    const subcategorySlug = subcategory.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <StyledLink key={subcategorySlug} to={`/collections/${subcategorySlug}`}>
                        <SubCategoryItem>
                          <ListItemText primary={subcategory} />
                        </SubCategoryItem>
                      </StyledLink>
                    );
                  })}
                </SubCategoryList>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </CategoryContainer>
  );
};

export default CategoryMenu;
