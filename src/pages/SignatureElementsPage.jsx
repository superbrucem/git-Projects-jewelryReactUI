import React from 'react';
import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import elementProducts from '../data/elementProducts';

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

const SignatureElementsPage = () => {
  // Group products by element type
  const elementGroups = {
    'Fire': elementProducts.filter(p => p.collection === 'Fire'),
    'Water': elementProducts.filter(p => p.collection === 'Water'),
    'Earth': elementProducts.filter(p => p.collection === 'Earth'),
    'Air': elementProducts.filter(p => p.collection === 'Air'),
    'Aether': elementProducts.filter(p => p.collection === 'Aether')
  };

  return (    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h3" component="h1" gutterBottom>
              5 Elements Collection
            </Typography>
            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
              <Typography variant="body1" paragraph>
                Our 5 Elements Collection is inspired by the classical elements of nature: Earth, Water, Fire, Air, and Aether.
              </Typography>
              <Typography variant="body1" paragraph>
                Each piece in this collection embodies the essence and symbolism of these fundamental elements, creating a harmonious connection between the wearer and the natural world.
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
                    primary={<StyledLink to="/signature/5-elements/earth">Earth Element Pendant</StyledLink>}
                    secondary="Crafted with natural stones and earthy tones"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/5-elements/water">Water Element Bracelet</StyledLink>}
                    secondary="Featuring blue sapphires and flowing design elements"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/5-elements/fire">Fire Element Earrings</StyledLink>}
                    secondary="Set with vibrant rubies and orange sapphires"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/5-elements/air">Air Element Ring</StyledLink>}
                    secondary="Delicate design with white diamonds and open spaces"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/5-elements/aether">Aether Element Necklace</StyledLink>}
                    secondary="Mystical design with opals and moonstone"
                  />
                </CollectionItem>
              </List>
            </Paper>

            {/* Products with pagination */}
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
              Browse 5 Elements Collection Products
            </Typography>
            <PaginatedProductGrid products={elementProducts} itemsPerPage={8} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignatureElementsPage;
