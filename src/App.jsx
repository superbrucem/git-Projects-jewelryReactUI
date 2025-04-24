import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from './theme/theme'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import { FilterProvider } from './context/FilterContext'

// Pages
import HomePage from './pages/HomePage'
import CollectionsPage from './pages/CollectionsPage'
import SignaturePage from './pages/SignaturePage'
// Removed individual signature collection pages
import VideosPage from './pages/VideosPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TestimonialsPage from './pages/TestimonialsPage'
import CustomerServicePage from './pages/CustomerServicePage'
import ShippingReturnsPage from './pages/ShippingReturnsPage'
import ProductCarePage from './pages/ProductCarePage'
import WarrantyPage from './pages/WarrantyPage'
import FAQPage from './pages/FAQPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <FilterProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/*" element={<HomePage />} />
              </Routes>
            </Layout>
          </Router>
        </FilterProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
