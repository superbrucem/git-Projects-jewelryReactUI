import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Divider, Button, Tabs, Tab } from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import products from '../data/products';
import signatureCollections from '../data/signature_sidemenu.json';

// Filter products by category - using memoized values to prevent re-filtering on every render
const getFilteredProducts = () => {
  const elementsProducts = products.filter(p => p.category === '5-elements');
  const greekGodsProducts = products.filter(p => p.category === 'greek-gods');
  const underworldProducts = products.filter(p => p.category === 'underworld');

  // Debug logs
  console.log('All products:', products.length);
  console.log('5 Elements products:', elementsProducts.length);
  console.log('Greek Gods products:', greekGodsProducts.length);
  console.log('Underworld products:', underworldProducts.length);

  return { elementsProducts, greekGodsProducts, underworldProducts };
};

// Get the filtered products
const { elementsProducts, greekGodsProducts, underworldProducts } = getFilteredProducts();

// Add "all" collection to the signature collections
const allSignatureCollections = [
  {
    id: 'all-signature', // Changed from 'all' to 'all-signature' to match FilterSidebar
    label: 'All Signature Collections',
    products: products.filter(p => ['5-elements', 'greek-gods', 'underworld'].includes(p.category)),
    description: 'Our exclusive Signature Collections feature our most exquisite and unique pieces, each one personally selected and designed by our master jewelers.'
  },
  ...signatureCollections
];

// Collection descriptions
const collectionDescriptions = {
  '5-elements': 'Our 5 Elements Collection is inspired by the classical elements of nature: Earth, Water, Fire, Air, and Aether. Each piece embodies the essence and symbolism of these fundamental elements.',
  'greek-gods': 'Our Greek Gods Collection draws inspiration from the rich mythology and divine figures of ancient Greece, bringing their timeless power and beauty to modern jewelry design.',
  'underworld': 'Our Underworld Collection explores the mysterious and captivating realm of the subterranean world from various mythologies, creating bold and enigmatic jewelry that makes a statement.'
};

const SignaturePage = () => {
  const { collection: collectionParam, subcategory } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get collection from query parameter if not in URL path
  const queryParams = new URLSearchParams(location.search);
  const collectionQuery = queryParams.get('collection');
  // Also check for 'category' parameter for backward compatibility
  const categoryQuery = queryParams.get('category');

  // Use either collection or category parameter
  const collectionFromQuery = collectionQuery || categoryQuery;

  // Determine which collection to show
  const [selectedCollection, setSelectedCollection] = useState('all-signature');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Debug logging
  console.log('SignaturePage - URL params:', {
    collectionParam,
    subcategory,
    collectionQuery,
    categoryQuery
  });

  useEffect(() => {
    // Check if we have a collection in the URL path or query
    if (collectionParam) {
      console.log('Setting collection from URL path:', collectionParam);
      setSelectedCollection(collectionParam);
    } else if (collectionFromQuery) {
      console.log('Setting collection from query parameter:', collectionFromQuery);
      setSelectedCollection(collectionFromQuery);
    } else {
      console.log('No collection specified, defaulting to "all-signature"');
      setSelectedCollection('all-signature');
    }

    // Check if we have a subcategory
    if (subcategory) {
      setSelectedSubcategory(subcategory);
    } else {
      setSelectedSubcategory(null);
    }
  }, [collectionParam, collectionFromQuery, subcategory]);

  // Get the current collection with error handling
  const currentCollection = allSignatureCollections.find(c => c.id === selectedCollection) || allSignatureCollections[0];

  // Debug logging for current collection
  console.log('Current collection:', currentCollection?.id, 'Selected collection:', selectedCollection);

  // Filter products based on selected collection and subcategory
  let filteredProducts = [];

  if (selectedCollection === 'all-signature') {
    filteredProducts = currentCollection.products;
  } else {
    // Filter by collection
    filteredProducts = products.filter(p => p.category === selectedCollection);

    // Further filter by subcategory if one is selected
    if (selectedSubcategory) {
      filteredProducts = filteredProducts.filter(p =>
        p.collection && p.collection.toLowerCase() === selectedSubcategory.toLowerCase()
      );
    }
  }

  return (
    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Signature Collections
        </Typography>

        {/* Collection tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={selectedCollection}
            onChange={(event, newValue) => {
              setSelectedCollection(newValue);
              setSelectedSubcategory(null);

              // Update URL with query parameter
              if (newValue === 'all-signature') {
                navigate('/signature');
              } else {
                navigate(`/signature?collection=${newValue}`);
              }
            }}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="signature collection tabs"
          >
            {allSignatureCollections.map((collection) => (
              <Tab
                key={collection.id}
                label={collection.id === 'all-signature' ? 'ALL SIGNATURE' : collection.label.toUpperCase()}
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

        {/* Navigation breadcrumbs */}
        {selectedCollection !== 'all-signature' && selectedSubcategory && (
          <Box sx={{ display: 'flex', gap: 1, mb: 3, alignItems: 'center' }}>
            <Button
              variant="text"
              size="small"
              onClick={() => navigate('/signature')}
            >
              All Collections
            </Button>
            {selectedCollection && (
              <>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  &gt;
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => navigate(`/signature?collection=${selectedCollection}`)}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {selectedCollection.replace(/-/g, ' ')}
                </Button>
              </>
            )}
            {selectedSubcategory && (
              <>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  &gt;
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', textTransform: 'capitalize' }}>
                  {selectedSubcategory}
                </Typography>
              </>
            )}
          </Box>
        )}

        {/* Collection description */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {selectedSubcategory
              ? `${selectedSubcategory.charAt(0).toUpperCase() + selectedSubcategory.slice(1)} - ${currentCollection.label}`
              : currentCollection.label}
          </Typography>

          <Typography variant="body1" paragraph>
            {selectedSubcategory
              ? `Explore our exquisite ${selectedSubcategory} jewelry from the ${currentCollection.label} collection.`
              : (currentCollection.description || collectionDescriptions[selectedCollection] || 'Our exclusive Signature Collections feature our most exquisite and unique pieces.')}
          </Typography>

          {/* Display subcategory chips when a collection is selected but no subcategory */}
          {selectedCollection !== 'all-signature' && !selectedSubcategory && currentCollection.subcategories && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {currentCollection.subcategories.map(subcategory => {
                const subcategorySlug = subcategory.toLowerCase();
                return (
                  <Box
                    key={subcategorySlug}
                    component="a"
                    href={`/signature/${selectedCollection}/${subcategorySlug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSubcategory(subcategorySlug);
                      // Update the URL without reloading the page
                      navigate(`/signature/${selectedCollection}/${subcategorySlug}`);
                    }}
                    sx={{
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      padding: '4px 12px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: '#333',
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
        </Box>

        {/* Products Grid */}
        <Typography variant="h6" gutterBottom>
          Browse {selectedSubcategory
            ? `${selectedSubcategory.charAt(0).toUpperCase() + selectedSubcategory.slice(1)} Products`
            : `${currentCollection.label} Products`}
        </Typography>
        <PaginatedProductGrid products={filteredProducts} itemsPerPage={8} />

        {/* Only show collections sections on the main signature page */}
        {selectedCollection === 'all-signature' && (
          <>
            {/* Scroll indicator */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 4,
              mb: 2,
              flexDirection: 'column'
            }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Explore Our Signature Collections Below
              </Typography>
              <Box sx={{
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': {
                    transform: 'translateY(0)'
                  },
                  '40%': {
                    transform: 'translateY(-20px)'
                  },
                  '60%': {
                    transform: 'translateY(-10px)'
                  }
                }
              }}>
                <Typography variant="h4" color="primary">↓</Typography>
              </Box>
            </Box>

            {/* 5 Elements Collection */}
            <Box sx={{
              my: 8,
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              backgroundColor: 'rgba(240, 240, 240, 0.5)'
            }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1d2b39' }}>
                5 Elements Collection
              </Typography>
              <Typography variant="body1" paragraph>
                {collectionDescriptions['5-elements']}
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {signatureCollections[0].subcategories.map(subcategory => (
                  <Grid item xs={6} sm={4} md={2.4} key={subcategory}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate(`/signature/5-elements/${subcategory.toLowerCase()}`)}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {subcategory}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <PaginatedProductGrid products={elementsProducts} itemsPerPage={8} />
            </Box>

            {/* Greek Gods Collection */}
            <Box sx={{
              my: 8,
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              backgroundColor: 'rgba(240, 240, 240, 0.5)'
            }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1d2b39' }}>
                Greek Gods Collection
              </Typography>
              <Typography variant="body1" paragraph>
                {collectionDescriptions['greek-gods']}
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {signatureCollections[1].subcategories.map(subcategory => (
                  <Grid item xs={6} sm={4} md={2.4} key={subcategory}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate(`/signature/greek-gods/${subcategory.toLowerCase()}`)}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {subcategory}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <PaginatedProductGrid products={greekGodsProducts} itemsPerPage={8} />
            </Box>

            {/* Underworld Collection */}
            <Box sx={{
              my: 8,
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              backgroundColor: 'rgba(240, 240, 240, 0.5)'
            }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1d2b39' }}>
                Underworld Collection
              </Typography>
              <Typography variant="body1" paragraph>
                {collectionDescriptions['underworld']}
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {signatureCollections[2].subcategories.map(subcategory => (
                  <Grid item xs={6} sm={4} md={2.4} key={subcategory}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate(`/signature/underworld/${subcategory.toLowerCase()}`)}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {subcategory}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <PaginatedProductGrid products={underworldProducts} itemsPerPage={8} />
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default SignaturePage;
