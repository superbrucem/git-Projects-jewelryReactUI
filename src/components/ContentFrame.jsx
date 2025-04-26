import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CollectionsPage from '../pages/CollectionsPage';
import SignaturePage from '../pages/SignaturePage';
import VideosPage from '../pages/VideosPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import CustomerServicePage from '../pages/CustomerServicePage';
import ShippingReturnsPage from '../pages/ShippingReturnsPage';
import ProductCarePage from '../pages/ProductCarePage';
import WarrantyPage from '../pages/WarrantyPage';
import FAQPage from '../pages/FAQPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import SearchPage from '../pages/SearchPage';

const ContentFrame = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        overflow: 'hidden',
        height: 'calc(100vh - 200px)',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        maxWidth: '100%', // Prevent stretching in Firefox
        boxSizing: 'border-box' // Include padding in width calculation
      }}
    >
      <Box sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        p: 3,
        maxWidth: '100%', // Prevent stretching in Firefox
        boxSizing: 'border-box', // Include padding in width calculation
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(0, 0, 0, 0.3)',
        },
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent'
      }}>
        <Routes>
          <Route path="/" element={<HomePage contentOnly={true} />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:subcategory" element={<CollectionsPage />} />
          <Route path="/signature" element={<SignaturePage />} />
          <Route path="/signature/:subcategory" element={<SignaturePage />} />
          <Route path="/signature/:collection/:subcategory" element={<SignaturePage />} />
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
      </Box>
    </Box>
  );
};

export default ContentFrame;
