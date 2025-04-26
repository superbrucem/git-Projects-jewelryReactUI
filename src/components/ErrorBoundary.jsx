import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { DEBUG_MODE } from '../utils/debug';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, maxWidth: '800px', mx: 'auto', my: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ErrorOutlineIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h4" color="error">
                Something went wrong
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="body1" paragraph>
              {this.state.error && this.state.error.toString()}
            </Typography>
            
            {DEBUG_MODE && this.state.errorInfo && (
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Component Stack:
                </Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    backgroundColor: '#f5f5f5',
                    maxHeight: '200px',
                    overflow: 'auto'
                  }}
                >
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </Paper>
              </Box>
            )}
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
              <Button 
                variant="outlined"
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              >
                Try Again
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
