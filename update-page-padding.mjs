import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing page components
const pagesDir = path.join(__dirname, 'src', 'pages');

// Pattern to match
const oldPattern = /\s+<Container maxWidth="xl" sx=\{\{\s+py: 4,\s+width: '100%',\s+maxWidth: \{ xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' \}\s+\}\}>/;

// Replacement pattern
const newPattern = `    <Container maxWidth="xl" sx={{
      pt: 1, // Reduced top padding
      pb: 4,
      width: '100%',
      maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }
    }}>`;

// Get all JSX files in the pages directory
const pageFiles = fs.readdirSync(pagesDir)
  .filter(file => file.endsWith('.jsx'));

// Process each file
pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file contains the pattern
  if (content.match(oldPattern)) {
    // Replace the pattern
    content = content.replace(oldPattern, newPattern);
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No match in ${file}`);
  }
});

console.log('All page files processed.');
