import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden' // Prevent horizontal scrolling
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(67, 206, 162, 0.03) 0%, transparent 10%),
            radial-gradient(circle at 75% 40%, rgba(67, 206, 162, 0.03) 0%, transparent 10%),
            radial-gradient(circle at 40% 80%, rgba(67, 206, 162, 0.03) 0%, transparent 10%),
            radial-gradient(circle at 85% 15%, rgba(67, 206, 162, 0.03) 0%, transparent 10%),
            radial-gradient(circle at 60% 60%, rgba(240, 193, 75, 0.03) 0%, transparent 10%),
            radial-gradient(circle at 10% 75%, rgba(240, 193, 75, 0.03) 0%, transparent 10%),
            linear-gradient(to bottom, #f8f9fa, #f8f9fa)
          `,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          overflow: 'hidden' // Prevent horizontal scrolling
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
