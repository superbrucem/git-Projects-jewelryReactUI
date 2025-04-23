import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8B7355', // Elegant brown
      light: '#A68B6C',
      dark: '#6E5B43',
    },
    secondary: {
      main: '#C0C0C0', // Silver
      light: '#D3D3D3',
      dark: '#A9A9A9',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
});