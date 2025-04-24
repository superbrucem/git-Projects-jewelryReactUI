import React from 'react';
import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import greekGodsProducts from '../data/greekGodsProducts';

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
  // Group products by god/goddess
  const godGroups = {
    'Zeus': greekGodsProducts.filter(p => p.collection === 'Zeus'),
    'Poseidon': greekGodsProducts.filter(p => p.collection === 'Poseidon'),
    'Athena': greekGodsProducts.filter(p => p.collection === 'Athena'),
    'Apollo': greekGodsProducts.filter(p => p.collection === 'Apollo'),
    'Aphrodite': greekGodsProducts.filter(p => p.collection === 'Aphrodite')
  };

  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
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
            <PaginatedProductGrid products={greekGodsProducts} itemsPerPage={8} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignatureGreekGodsPage;
