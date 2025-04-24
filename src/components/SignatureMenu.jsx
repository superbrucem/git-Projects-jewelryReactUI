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
  backgroundColor: '#1d2b39', // Same dark blue as Collections
  color: 'white',
  padding: '10px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 600,
}));

const SignatureItem = styled(ListItem)(({ theme }) => ({
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

const SignatureItemClickable = styled(ListItem)(({ theme }) => ({
  padding: '8px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    color: theme.palette.primary.main,
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
        <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: '0.5px', fontSize: '0.9rem' }}>
          SIGNATURE COLLECTIONS
        </Typography>
      </SignatureHeader>

      <List disablePadding>
        {signatureCollections.map(collection => (
          <React.Fragment key={collection.id}>
            {/* Collection Header */}
            <SignatureItem
              onClick={() => handleToggle(collection.id)}
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
