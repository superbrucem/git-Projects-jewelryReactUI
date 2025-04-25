import React, { useState, useEffect } from 'react';
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
import { useNavigate, Link } from 'react-router-dom';
import signatureCollections from '../data/signature_sidemenu.json';

// Styled components
const SignatureContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: '4px',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(3),
}));

const SignatureHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5', // Light gray background
  color: '#333333', // Dark text
  padding: '10px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 600,
  borderBottom: '1px solid #e0e0e0', // Light gray border
}));

const SignatureItem = styled(ListItem)(({ theme }) => ({
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

const SignatureItemClickable = styled(ListItem)(({ theme }) => ({
  padding: '8px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    color: '#333333',
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
const SignatureMenu = () => {
  const navigate = useNavigate();

  // Initialize expanded state based on collections from JSON
  const initialExpandedState = {};
  signatureCollections.forEach(collection => {
    initialExpandedState[collection.id] = false;
  });

  const [expanded, setExpanded] = useState(initialExpandedState);

  const handleToggle = (category) => {
    setExpanded({
      ...expanded,
      [category]: !expanded[category]
    });
  };

  // Initialize with 5 Elements expanded by default
  useEffect(() => {
    setExpanded(prev => ({
      ...prev,
      '5-elements': true
    }));
  }, []);

  const handleNavigate = (collectionId) => {
    // Navigate to the main signature page with a query parameter
    navigate(`/signature?collection=${collectionId}`);
  };

  const handleSubcategoryNavigate = (collectionId, subcategory) => {
    // Navigate to the specific subcategory page
    navigate(`/signature/${collectionId}/${subcategory.toLowerCase()}`);
  };

  return (
    <SignatureContainer elevation={0}>
      <SignatureHeader>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: '0.5px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
          Signature
        </Typography>
      </SignatureHeader>

      <List disablePadding>
        {signatureCollections.map(collection => (
          <React.Fragment key={collection.id}>
            {/* Collection Header */}
            <SignatureItem
              onClick={() => {
                handleToggle(collection.id);
                // Only navigate if clicking directly on the collection header
                if (!expanded[collection.id]) {
                  handleNavigate(collection.id);
                }
              }}
              sx={{
                backgroundColor: expanded[collection.id] ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <ListItemText
                  primary={collection.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                      fontSize: '0.85rem',
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent toggle
                    handleNavigate(collection.id);
                  }}
                />
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  {expanded[collection.id] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                </ListItemIcon>
              </Box>
            </SignatureItem>

            <Collapse in={expanded[collection.id]} timeout="auto" unmountOnExit>
              {/* View All Collection link */}
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
                onClick={() => handleNavigate(collection.id)}
              >
                <Typography variant="body2" sx={{ pl: 3, py: 1, fontSize: '0.8rem' }}>
                  View {collection.label} Collection
                </Typography>
              </Box>

              {/* Subcategories */}
              <SubCategoryList>
                {collection.subcategories.map(subcategory => {
                  const subcategorySlug = subcategory.toLowerCase();
                  return (
                    <StyledLink
                      key={subcategorySlug}
                      to={`/signature/${collection.id}/${subcategorySlug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubcategoryNavigate(collection.id, subcategory);
                      }}
                    >
                      <SubCategoryItem>
                        <ListItemText primary={subcategory} />
                      </SubCategoryItem>
                    </StyledLink>
                  );
                })}
              </SubCategoryList>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </SignatureContainer>
  );
};

export default SignatureMenu;
