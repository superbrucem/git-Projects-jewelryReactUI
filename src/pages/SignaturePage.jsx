import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Tabs, Tab, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import products from '../data/products';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const CollectionItem = styled(ListItem)(({ theme }) => ({
  padding: '12px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

// Define signature collections
const signatureCollections = [
  {
    id: 'all',
    label: 'All Signature Collections',
    products: products,
    description: 'Our exclusive Signature Collections feature our most exquisite and unique pieces, each one personally selected and designed by our master jewelers.'
  },
  {
    id: '5-elements',
    label: '5 Elements',
    products: products.filter(p => p.category === '5-elements'),
    description: 'Our 5 Elements Collection is inspired by the classical elements of nature: Earth, Water, Fire, Air, and Aether. Each piece embodies the essence and symbolism of these fundamental elements.',
    items: [
      { name: 'Earth Element Pendant', description: 'Crafted with natural stones and earthy tones' },
      { name: 'Water Element Bracelet', description: 'Featuring blue sapphires and flowing design elements' },
      { name: 'Fire Element Earrings', description: 'Set with vibrant rubies and orange sapphires' },
      { name: 'Air Element Ring', description: 'Delicate design with white diamonds and open spaces' },
      { name: 'Aether Element Necklace', description: 'Mystical design with opals and moonstone' }
    ]
  },
  {
    id: 'greek-gods',
    label: 'Greek Gods',
    products: products.filter(p => p.category === 'greek-gods'),
    description: 'Our Greek Gods Collection draws inspiration from the rich mythology and divine figures of ancient Greece, bringing their timeless power and beauty to modern jewelry design.',
    items: [
      { name: 'Zeus Thunderbolt Pendant', description: 'Powerful design with white diamonds and yellow gold' },
      { name: 'Poseidon Trident Bracelet', description: 'Featuring blue sapphires and aquamarines' },
      { name: 'Athena Wisdom Ring', description: 'Elegant design with owl motif and olive branch details' },
      { name: 'Apollo Sun Earrings', description: 'Radiant design with citrine and yellow sapphires' },
      { name: 'Aphrodite Love Necklace', description: 'Romantic design with pink sapphires and rose gold' }
    ]
  },
  {
    id: 'underworld',
    label: 'Underworld',
    products: products.filter(p => p.category === 'underworld'),
    description: 'Our Underworld Collection explores the mysterious and captivating realm of the subterranean world from various mythologies, creating bold and enigmatic jewelry that makes a statement.',
    items: [
      { name: 'Hades Crown Ring', description: 'Dramatic design with black diamonds and white gold' },
      { name: 'Persephone Pomegranate Pendant', description: 'Featuring red garnets and black rhodium plating' },
      { name: 'Cerberus Guardian Bracelet', description: 'Bold design with three-headed dog motif and onyx stones' },
      { name: 'River Styx Necklace', description: 'Flowing design with black pearls and smoky quartz' },
      { name: 'Elysium Fields Earrings', description: 'Ethereal design with moonstones and white opals' }
    ]
  }
];

const SignaturePage = () => {
  const [selectedCollection, setSelectedCollection] = useState('all');

  const handleCollectionChange = (event, newValue) => {
    setSelectedCollection(newValue);
  };

  // Get the current collection
  const currentCollection = signatureCollections.find(c => c.id === selectedCollection) || signatureCollections[0];

  // Filter products based on selected collection
  const filteredProducts = currentCollection.products || products;

  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Signature Collections
        </Typography>

        {/* Collection tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={selectedCollection}
            onChange={handleCollectionChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="signature collection tabs"
          >
            {signatureCollections.map((collection) => (
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

          <Typography variant="body1" paragraph>
            {currentCollection.description}
          </Typography>

          {/* Collection items list */}
          {currentCollection.items && currentCollection.items.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
                Featured Items in this Collection:
              </Typography>

              <Paper elevation={0} sx={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: 1, mt: 2, mb: 4 }}>
                <List disablePadding>
                  {currentCollection.items.map((item, index) => (
                    <CollectionItem key={index}>
                      <ListItemText
                        primary={<StyledLink to={`/signature/${currentCollection.id}/${item.name.toLowerCase().replace(/\s+/g, '-')}`}>{item.name}</StyledLink>}
                        secondary={item.description}
                      />
                    </CollectionItem>
                  ))}
                </List>
              </Paper>
            </>
          )}
        </Box>

        {/* Products with pagination */}
        <Typography variant="h6" gutterBottom>
          Browse {currentCollection.label} Products
        </Typography>
        <PaginatedProductGrid products={filteredProducts} itemsPerPage={8} />
      </Paper>
    </Container>
  );
};

export default SignaturePage;
