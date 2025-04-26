import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import greekGodsProducts from '../data/greekGodsProducts';
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

const SignatureGreekGodsPage = () => {
  const navigate = useNavigate();
  const [localGreekGodsProducts, setLocalGreekGodsProducts] = useState([]);

  // Use useEffect to ensure products are loaded
  useEffect(() => {
    // If greekGodsProducts is empty, filter directly from products
    if (!greekGodsProducts || greekGodsProducts.length === 0) {
      console.log('SignatureGreekGodsPage - Filtering products directly');
      const filteredProducts = products.filter(p => p.category === 'greek-gods');
      setLocalGreekGodsProducts(filteredProducts);
    } else {
      console.log('SignatureGreekGodsPage - Using imported greekGodsProducts:', greekGodsProducts.length);
      setLocalGreekGodsProducts(greekGodsProducts);
    }
  }, []);

  // Debug log to check if products are loaded
  console.log('SignatureGreekGodsPage - localGreekGodsProducts:', localGreekGodsProducts.length);

  // Group products by god/goddess
  const godGroups = {
    'Zeus': localGreekGodsProducts.filter(p => p.collection === 'Zeus'),
    'Poseidon': localGreekGodsProducts.filter(p => p.collection === 'Poseidon'),
    'Athena': localGreekGodsProducts.filter(p => p.collection === 'Athena'),
    'Apollo': localGreekGodsProducts.filter(p => p.collection === 'Apollo'),
    'Aphrodite': localGreekGodsProducts.filter(p => p.collection === 'Aphrodite')
  };

  return (    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1024px', xl: '1280px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h3" component="h1" gutterBottom>
              Greek Gods Collection
            </Typography>
            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
              <Typography variant="body1" paragraph>
                Our Greek Gods Collection draws inspiration from the rich mythology and divine figures of ancient Greece.
              </Typography>
              <Typography variant="body1" paragraph>
                Each piece in this collection embodies the characteristics, symbols, and stories of the Olympian gods and goddesses, bringing their timeless power and beauty to modern jewelry design.
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
              Featured Items in this Collection:
            </Typography>

            <Paper elevation={0} sx={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: 1, mt: 2, mb: 4 }}>
              <List disablePadding>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/greek-gods/zeus">Zeus Thunderbolt Pendant</StyledLink>}
                    secondary="Powerful design with white diamonds and yellow gold"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/greek-gods/poseidon">Poseidon Trident Bracelet</StyledLink>}
                    secondary="Featuring blue sapphires and aquamarines"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/greek-gods/athena">Athena Wisdom Ring</StyledLink>}
                    secondary="Elegant design with owl motif and olive branch details"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/greek-gods/apollo">Apollo Sun Earrings</StyledLink>}
                    secondary="Radiant design with citrine and yellow sapphires"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/greek-gods/aphrodite">Aphrodite Love Necklace</StyledLink>}
                    secondary="Romantic design with pink sapphires and rose gold"
                  />
                </CollectionItem>
              </List>
            </Paper>

            {/* Products with pagination */}
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
              Browse Greek Gods Collection Products
            </Typography>

            {localGreekGodsProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Loading products...
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => window.location.reload()}
                  sx={{ mr: 2 }}
                >
                  Refresh Page
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
              </Box>
            ) : (
              <PaginatedProductGrid products={localGreekGodsProducts} itemsPerPage={8} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignatureGreekGodsPage;
