import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, TextField, InputAdornment, Tabs, Tab, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import products from '../data/products';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  
  // Filter categories
  const categories = {
    all: 'All Results',
    collections: 'Collections',
    signature: 'Signature'
  };
  
  // Perform search when query or selected tab changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    
    // Filter products based on search query and selected tab
    let filteredProducts = products.filter(product => {
      const matchesQuery = 
        product.name.toLowerCase().includes(query) || 
        product.description?.toLowerCase().includes(query) ||
        product.collection?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query);
        
      if (selectedTab === 'all') {
        return matchesQuery;
      } else if (selectedTab === 'collections') {
        return matchesQuery && !['5-elements', 'greek-gods', 'underworld'].includes(product.category);
      } else if (selectedTab === 'signature') {
        return matchesQuery && ['5-elements', 'greek-gods', 'underworld'].includes(product.category);
      }
      
      return false;
    });
    
    setSearchResults(filteredProducts);
    
    // Update URL with search query
    if (searchQuery !== initialQuery) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`, { replace: true });
    }
  }, [searchQuery, selectedTab, initialQuery, navigate]);
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  
  // Get counts for each category
  const getCounts = () => {
    if (!searchQuery.trim()) {
      return { all: 0, collections: 0, signature: 0 };
    }
    
    const query = searchQuery.toLowerCase();
    
    const allResults = products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description?.toLowerCase().includes(query) ||
      product.collection?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
    
    const collectionsResults = allResults.filter(product => 
      !['5-elements', 'greek-gods', 'underworld'].includes(product.category)
    );
    
    const signatureResults = allResults.filter(product => 
      ['5-elements', 'greek-gods', 'underworld'].includes(product.category)
    );
    
    return {
      all: allResults.length,
      collections: collectionsResults.length,
      signature: signatureResults.length
    };
  };
  
  const counts = getCounts();
  
  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Results
        </Typography>
        
        {/* Search input */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for products, collections, or gemstones..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        {/* Category tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange}
            aria-label="search categories"
          >
            {Object.entries(categories).map(([key, label]) => (
              <Tab 
                key={key} 
                value={key} 
                label={`${label} (${counts[key]})`}
                sx={{ 
                  fontWeight: 500,
                  '&.Mui-selected': {
                    color: '#f0c14b',
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>
        
        {/* Search results */}
        {searchQuery.trim() ? (
          <>
            {searchResults.length > 0 ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Found {searchResults.length} results for "{searchQuery}"
                </Typography>
                <PaginatedProductGrid products={searchResults} itemsPerPage={8} />
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="h6" gutterBottom>
                  No results found for "{searchQuery}"
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try different keywords or browse our collections instead.
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" gutterBottom>
              Enter a search term to find products
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Search for gemstones, collections, or specific jewelry items.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default SearchPage;
