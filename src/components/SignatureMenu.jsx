import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

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
  return (
    <SignatureContainer elevation={0}>
      <SignatureHeader>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: '0.5px', fontSize: '0.9rem' }}>
          SIGNATURE COLLECTIONS
        </Typography>
      </SignatureHeader>

      <List disablePadding>
        <StyledLink to="/signature/5-elements">
          <SignatureItem>
            <ListItemText primary="5 ELEMENTS" />
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </SignatureItem>
        </StyledLink>

        <StyledLink to="/signature/greek-gods">
          <SignatureItem>
            <ListItemText primary="GREEK GODS" />
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </SignatureItem>
        </StyledLink>

        <StyledLink to="/signature/underworld">
          <SignatureItem>
            <ListItemText primary="UNDERWORLD" />
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </SignatureItem>
        </StyledLink>
      </List>
    </SignatureContainer>
  );
};

export default SignatureMenu;
