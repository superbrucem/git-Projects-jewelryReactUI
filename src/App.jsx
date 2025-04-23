import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Typography } from '@mui/material'

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Box sx={{ p: 4 }}>
        <Typography variant="h1">
          Welcome to Jewelry E-commerce
        </Typography>
      </Box>
    </ThemeProvider>
  )
}

export default App
