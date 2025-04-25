import React from 'react';
import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import PaginatedProductGrid from '../components/PaginatedProductGrid';
import underworldProducts from '../data/underworldProducts';

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

const SignatureUnderworldPage = () => {
  // Group products by underworld entity
  const underworldGroups = {
    'Hades': underworldProducts.filter(p => p.collection === 'Hades'),
    'Persephone': underworldProducts.filter(p => p.collection === 'Persephone'),
    'Cerberus': underworldProducts.filter(p => p.collection === 'Cerberus'),
    'Styx': underworldProducts.filter(p => p.collection === 'Styx'),
    'Elysium': underworldProducts.filter(p => p.collection === 'Elysium')
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
              Underworld Collection
            </Typography>
            <Box sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
              <Typography variant="body1" paragraph>
                Our Underworld Collection explores the mysterious and captivating realm of the subterranean world from various mythologies.
              </Typography>
              <Typography variant="body1" paragraph>
                Each piece in this collection embodies the dark elegance, hidden treasures, and transformative power associated with the underworld, creating bold and enigmatic jewelry that makes a statement.
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
                    primary={<StyledLink to="/signature/underworld/hades">Hades Crown Ring</StyledLink>}
                    secondary="Dramatic design with black diamonds and white gold"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/underworld/persephone">Persephone Pomegranate Pendant</StyledLink>}
                    secondary="Featuring red garnets and black rhodium plating"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/underworld/cerberus">Cerberus Guardian Bracelet</StyledLink>}
                    secondary="Bold design with three-headed dog motif and onyx stones"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/underworld/styx">River Styx Necklace</StyledLink>}
                    secondary="Flowing design with black pearls and smoky quartz"
                  />
                </CollectionItem>
                <CollectionItem>
                  <ListItemText
                    primary={<StyledLink to="/signature/underworld/elysium">Elysium Fields Earrings</StyledLink>}
                    secondary="Ethereal design with moonstones and white opals"
                  />
                </CollectionItem>
              </List>
            </Paper>

            {/* Products with pagination */}
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
              Browse Underworld Collection Products
            </Typography>
            <PaginatedProductGrid products={underworldProducts} itemsPerPage={8} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignatureUnderworldPage;
