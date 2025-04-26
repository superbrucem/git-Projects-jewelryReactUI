import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Grid, Tabs, Tab, Button } from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import Breadcrumb from '../components/Breadcrumb';
import products from '../data/products';

// Import collection categories from JSON file
import collectionsData from '../data/collections_sidemenu.json';

// Add products to the collections data
const collections = collectionsData.map(collection => {
  if (collection.id === 'all') {
    return { ...collection, products: products };
  }
  return collection;
});

const CollectionsPage = () => {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const { subcategory } = useParams();
  const location = useLocation();

  // Effect to handle URL parameters, query parameters, and path changes
  useEffect(() => {
    // Check for query parameters first
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');

    if (categoryParam) {
      const matchedCollection = collections.find(c => c.id === categoryParam);
      if (matchedCollection) {
        setSelectedCollection(matchedCollection.id);
        setSelectedSubcategory(null);
        return;
      }
    }

    // Check if we have a subcategory in the URL
    if (subcategory) {
      setSelectedSubcategory(subcategory);

      // Find which collection this subcategory belongs to
      for (const collection of collections) {
        if (collection.subcategories && collection.subcategories.map(s => s.toLowerCase().replace(/\s+/g, '-')).includes(subcategory)) {
          setSelectedCollection(collection.id);
          break;
        }
      }
    } else {
      // If we're on the main collections page, reset the subcategory
      setSelectedSubcategory(null);

      // Check if we have a specific collection in the path
      const pathParts = location.pathname.split('/');
      if (pathParts.length > 2) {
        const collectionPath = pathParts[2];
        const matchedCollection = collections.find(c => c.id === collectionPath);
        if (matchedCollection) {
          setSelectedCollection(matchedCollection.id);
        }
      }
    }
  }, [subcategory, location.pathname, location.search]);

  const navigate = useNavigate();

  const handleCollectionChange = (event, newValue) => {
    setSelectedCollection(newValue);
    setSelectedSubcategory(null); // Reset subcategory when changing collections

    // Update URL with query parameter
    if (newValue === 'all') {
      navigate('/collections');
    } else {
      navigate(`/collections?category=${newValue}`);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory.toLowerCase().replace(/\s+/g, '-'));
  };

  // Get the current collection
  const currentCollection = collections.find(c => c.id === selectedCollection) || collections[0];

  // Filter products based on selected collection and subcategory
  let filteredProducts = currentCollection.products || products;

  // Further filter by subcategory if one is selected
  if (selectedSubcategory) {
    const subcategoryName = selectedSubcategory.replace(/-/g, ' ');
    filteredProducts = filteredProducts.filter(product =>
      product.subcategory && product.subcategory.toLowerCase() === subcategoryName
    );
  }

  // Prepare breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [{ label: 'Collections', path: '/collections' }];

    if (selectedSubcategory) {
      // Add the current subcategory
      const subcategoryName = selectedSubcategory.replace(/-/g, ' ');
      items.push({
        label: subcategoryName,
        path: `/collections/${selectedSubcategory}`
      });
    } else if (selectedCollection !== 'all') {
      // Add the current collection if it's not "all"
      const collection = collections.find(c => c.id === selectedCollection);
      if (collection) {
        items.push({
          label: collection.label,
          path: `/collections?category=${selectedCollection}`
        });
      }
    }

    return items;
  };

  return (
    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      {/* Breadcrumb navigation */}
      <Breadcrumb items={getBreadcrumbItems()} />

      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" component="h1" gutterBottom align="left">
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
              {currentCollection.subcategories.map((subcategory) => {
                const subcategorySlug = subcategory.toLowerCase().replace(/\s+/g, '-');
                const isSelected = selectedSubcategory === subcategorySlug;

                return (
                  <Box
                    key={subcategory}
                    component="a"
                    href={`/collections/${subcategorySlug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubcategoryClick(subcategory);
                      // Update the URL without reloading the page
                      window.history.pushState({}, '', `/collections/${subcategorySlug}`);
                    }}
                    sx={{
                      backgroundColor: isSelected ? '#f0c14b' : '#f5f5f5',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: isSelected ? '#1d2b39' : '#333',
                      textDecoration: 'none',
                      display: 'inline-block',
                      '&:hover': {
                        backgroundColor: '#f0c14b',
                        color: '#1d2b39',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    {subcategory}
                  </Box>
                );
              })}
            </Box>
          )}

          <Typography variant="body1" paragraph>
            Explore our {currentCollection.label.toLowerCase()} featuring exquisite gemstones of the highest quality.
            Each piece is carefully selected for its color, clarity, and brilliance.
          </Typography>

          {/* Navigation buttons to go back to categories */}
          <Box sx={{ mt: 2, mb: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => window.history.back()}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => window.location.href = '/'}
            >
              View All Categories
            </Button>
          </Box>
        </Box>

        {/* Products with pagination */}
        <PaginatedProductGrid products={filteredProducts} itemsPerPage={8} />
      </Paper>
    </Container>
  );
};

export default CollectionsPage;
