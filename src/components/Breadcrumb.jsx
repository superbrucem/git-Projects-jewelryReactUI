import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        py: 1.5, 
        px: 2, 
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        mb: 2
      }}
    >
      <Link 
        to="/" 
        style={{ 
          textDecoration: 'none', 
          color: '#666', 
          fontSize: '0.85rem',
          fontWeight: 500,
          textTransform: 'uppercase'
        }}
      >
        HOME
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Typography 
            variant="body2" 
            sx={{ 
              mx: 1, 
              color: '#999', 
              fontSize: '0.85rem' 
            }}
          >
            /
          </Typography>
          
          {index === items.length - 1 ? (
            // Last item (current page) - not a link
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#333', 
                fontWeight: 500, 
                fontSize: '0.85rem',
                textTransform: 'uppercase'
              }}
            >
              {item.label}
            </Typography>
          ) : (
            // Not the last item - make it a link
            <Link
              to={item.path}
              style={{ 
                textDecoration: 'none', 
                color: '#666', 
                fontSize: '0.85rem',
                fontWeight: 500,
                textTransform: 'uppercase'
              }}
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Breadcrumb;
