import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Divider, 
  IconButton, 
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Collapse
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import MemoryIcon from '@mui/icons-material/Memory';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';
import { DEBUG_MODE } from '../utils/debug';

// Only render in development mode
const DebugToolbar = () => {
  if (!DEBUG_MODE) return null;

  const [open, setOpen] = useState(false);
  const [showOutlines, setShowOutlines] = useState(false);
  const [showCartState, setShowCartState] = useState(false);
  const [showRouterState, setShowRouterState] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  
  const { cart, cartTotal } = useCart();
  
  // Apply debug outlines to components when enabled
  React.useEffect(() => {
    if (showOutlines) {
      document.body.classList.add('debug-outlines');
    } else {
      document.body.classList.remove('debug-outlines');
    }
    
    // Add the CSS for debug outlines
    if (!document.getElementById('debug-styles')) {
      const style = document.createElement('style');
      style.id = 'debug-styles';
      style.innerHTML = `
        .debug-outlines * {
          outline: 1px solid rgba(255, 0, 0, 0.2) !important;
        }
        .debug-outlines div {
          outline: 1px dashed rgba(0, 0, 255, 0.2) !important;
        }
        .debug-outlines button {
          outline: 1px dotted rgba(0, 255, 0, 0.5) !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      document.body.classList.remove('debug-outlines');
    };
  }, [showOutlines]);
  
  // Clear console
  const handleClearConsole = () => {
    console.clear();
    console.log('Console cleared by Debug Toolbar');
  };
  
  // Log component tree
  const handleLogComponentTree = () => {
    console.log('Component Tree:', 
      'Use React DevTools for a complete component tree. ' +
      'This is a placeholder for the actual component tree.'
    );
  };
  
  // Log memory usage
  const handleLogMemory = () => {
    if (window.performance && window.performance.memory) {
      console.log('Memory Usage:', window.performance.memory);
    } else {
      console.log('Memory API not available in this browser');
    }
  };
  
  // Toggle drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Debug button */}
      <Tooltip title="Debug Tools">
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            zIndex: 9999,
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 1)',
            }
          }}
        >
          <BugReportIcon />
        </IconButton>
      </Tooltip>
      
      {/* Debug drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            padding: 2,
            overflow: 'auto'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <BugReportIcon sx={{ mr: 1 }} /> Debug Tools
            </Typography>
            <IconButton onClick={toggleDrawer} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <List>
            {/* Visual debugging */}
            <ListItem>
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Show Component Outlines" />
              <Switch
                edge="end"
                checked={showOutlines}
                onChange={() => setShowOutlines(!showOutlines)}
              />
            </ListItem>
            
            {/* Console actions */}
            <ListItem>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={handleClearConsole}
                fullWidth
              >
                Clear Console
              </Button>
            </ListItem>
            
            <ListItem>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={handleLogComponentTree}
                fullWidth
              >
                Log Component Tree
              </Button>
            </ListItem>
            
            <ListItem>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={handleLogMemory}
                fullWidth
              >
                Log Memory Usage
              </Button>
            </ListItem>
            
            {/* Cart state */}
            <ListItem button onClick={() => setShowCartState(!showCartState)}>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary="Cart State" />
              {showCartState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            
            <Collapse in={showCartState} timeout="auto" unmountOnExit>
              <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, mb: 1 }}>
                <Typography variant="body2" gutterBottom>
                  Items: {cart.length}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Total: {cartTotal}
                </Typography>
                <pre style={{ 
                  fontSize: '10px', 
                  overflow: 'auto', 
                  maxHeight: 150,
                  margin: 0,
                  padding: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px'
                }}>
                  {JSON.stringify(cart, null, 2)}
                </pre>
              </Box>
            </Collapse>
            
            {/* Performance metrics */}
            <ListItem button onClick={() => setShowPerformance(!showPerformance)}>
              <ListItemIcon>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Performance" />
              {showPerformance ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            
            <Collapse in={showPerformance} timeout="auto" unmountOnExit>
              <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, mb: 1 }}>
                <Typography variant="body2" gutterBottom>
                  Use the Performance tab in Chrome DevTools for detailed metrics.
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => {
                    console.log('Performance now:', performance.now());
                    console.log('Navigation timing:', performance.getEntriesByType('navigation'));
                  }}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Log Performance Data
                </Button>
              </Box>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default DebugToolbar;
