import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DEBUG_MODE } from '../utils/debug';

// Component to display debug information
const DebugInfo = ({ data, label = 'Debug Info', show = DEBUG_MODE }) => {
  if (!show) return null;
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        m: 1,
        p: 1,
        border: '1px dashed red',
        backgroundColor: 'rgba(255, 0, 0, 0.05)',
        borderRadius: 1,
        fontSize: '12px',
        fontFamily: 'monospace',
        position: 'relative',
        zIndex: 1000
      }}
    >
      <Typography 
        variant="caption" 
        sx={{ 
          fontWeight: 'bold', 
          mb: 0.5, 
          display: 'block' 
        }}
      >
        {label}
      </Typography>
      <Box 
        component="pre" 
        sx={{ 
          m: 0, 
          overflow: 'auto', 
          maxHeight: '200px',
          fontSize: '11px',
          p: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          borderRadius: 0.5
        }}
      >
        {JSON.stringify(data, null, 2)}
      </Box>
    </Paper>
  );
};

export default DebugInfo;
