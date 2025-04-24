import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Tabs, Tab } from '@mui/material';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import products from '../data/products';

// Define collection categories based on the CategoryMenu component
const collections = [
  { id: 'all', label: 'All Collections', products: products },
  { id: 'natural-gemstone-a-m', label: 'Natural Gemstone A-M', subcategories: [
    'Amethyst', 'Aquamarine', 'Citrine', 'Emerald', 'Garnet', 'Jade', 'Lapis Lazuli', 'Moonstone'
  ]},
  { id: 'natural-gemstone-n-z', label: 'Natural Gemstone N-Z', subcategories: [
    'Opal', 'Peridot', 'Ruby', 'Tanzanite', 'Tourmaline'
  ]},
  { id: 'natural-garnet', label: 'Natural Garnet', subcategories: [
    'Red Garnet', 'Green Garnet'
  ]},
  { id: 'natural-sapphire', label: 'Natural Sapphire', subcategories: [
    'Blue Sapphire', 'Pink Sapphire', 'Yellow Sapphire'
  ]},
  { id: 'natural-topaz-quartz', label: 'Natural Topaz - Quartz', subcategories: [
    'Topaz', 'Quartz'
  ]},
  { id: 'natural-diamond', label: 'Natural Diamond', subcategories: [] }
];

const CollectionsPage = () => {
  const [selectedCollection, setSelectedCollection] = useState('all');

  const handleCollectionChange = (event, newValue) => {
    setSelectedCollection(newValue);
  };

  // Get the current collection
  const currentCollection = collections.find(c => c.id === selectedCollection) || collections[0];

  // Filter products based on selected collection
  // In a real app, you would have proper filtering logic based on your data structure
  // For now, we'll just use all products for demonstration
  const filteredProducts = currentCollection.products || products;

  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1280px', xl: '1600px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Collections
        </Typography>

        {/* Collection tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={selectedCollection}
            onChange={handleCollectionChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="collection tabs"
          >
            {collections.map((collection) => (
              <Tab
                key={collection.id}
                label={collection.label}
                value={collection.id}
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  '&.Mui-selected': {
                    color: '#f0c14b',
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Collection description */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {currentCollection.label}
          </Typography>

          {currentCollection.subcategories && currentCollection.subcategories.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {currentCollection.subcategories.map((subcategory) => (
                <Box
                  key={subcategory}
                  sx={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    padding: '4px 12px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: '#333',
                    '&:hover': {
                      backgroundColor: '#f0c14b',
                      color: '#1d2b39',
                      cursor: 'pointer'
                    }
                  }}
                >
                  {subcategory}
                </Box>
              ))}
            </Box>
          )}

          <Typography variant="body1" paragraph>
            Explore our {currentCollection.label.toLowerCase()} featuring exquisite gemstones of the highest quality.
            Each piece is carefully selected for its color, clarity, and brilliance.
          </Typography>
        </Box>

        {/* Products with pagination */}
        <PaginatedProductGrid products={filteredProducts} itemsPerPage={8} />
      </Paper>
    </Container>
  );
};

export default CollectionsPage;
