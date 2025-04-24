import React from 'react';
import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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
  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1280px', xl: '1600px' }
    }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <ConstructionIcon sx={{ fontSize: 60, color: '#f0c14b', mb: 2 }} />
            <Typography variant="h3" component="h1" gutterBottom>
              Underworld Collection
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: '#555' }}>
              Coming Soon
            </Typography>
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              <Typography variant="body1" paragraph>
                Our Underworld Collection explores the mysterious and captivating realm of the subterranean world from various mythologies.
              </Typography>
              <Typography variant="body1" paragraph>
                Each piece in this collection embodies the dark elegance, hidden treasures, and transformative power associated with the underworld, creating bold and enigmatic jewelry that makes a statement.
              </Typography>
              <Typography variant="body1" paragraph>
                Please check back soon to explore this exclusive collection that celebrates the allure of the mysterious and the beauty found in darkness.
              </Typography>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
                Sample Items in this Collection:
              </Typography>

              <Paper elevation={0} sx={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: 1, mt: 2 }}>
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
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignatureUnderworldPage;
