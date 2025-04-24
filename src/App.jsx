import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from './theme/theme'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'

// Pages
import HomePage from './pages/HomePage'
import CollectionsPage from './pages/CollectionsPage'
import SignaturePage from './pages/SignaturePage'
import SignatureElementsPage from './pages/SignatureElementsPage'
import SignatureGreekGodsPage from './pages/SignatureGreekGodsPage'
import SignatureUnderworldPage from './pages/SignatureUnderworldPage'
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
        <Router>
          <Layout>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/signature" element={<SignaturePage />} />
            <Route path="/signature/5-elements" element={<SignatureElementsPage />} />
            <Route path="/signature/greek-gods" element={<SignatureGreekGodsPage />} />
            <Route path="/signature/underworld" element={<SignatureUnderworldPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/customer-service" element={<CustomerServicePage />} />
            <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="/product-care" element={<ProductCarePage />} />
            <Route path="/warranty" element={<WarrantyPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
