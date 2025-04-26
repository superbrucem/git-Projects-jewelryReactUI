import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directories to search
const directories = [
  path.join(__dirname, 'src/pages'),
  path.join(__dirname, 'src/components')
];

// Define the old and new width values
const oldWidth = "maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1440px', xl: '1920px' }";
const newWidth = "maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1024px', xl: '1280px' }";

// Function to process a file
function processFile(filePath) {
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file contains the old width pattern
    if (content.includes(oldWidth)) {
      // Replace the old width with the new width
      const updatedContent = content.replace(new RegExp(oldWidth.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newWidth);
      
      // Write the updated content back to the file
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      
      console.log(`Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

// Function to recursively process all files in a directory
function processDirectory(directory) {
  let updatedCount = 0;
  
  try {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        // Recursively process subdirectories
        updatedCount += processDirectory(filePath);
      } else if (stats.isFile() && (file.endsWith('.jsx') || file.endsWith('.js'))) {
        // Process JavaScript/JSX files
        if (processFile(filePath)) {
          updatedCount++;
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
  
  return updatedCount;
}

// Main function
function main() {
  console.log('Starting container width update...');
  let totalUpdated = 0;
  
  for (const directory of directories) {
    console.log(`Processing directory: ${directory}`);
    totalUpdated += processDirectory(directory);
  }
  
  console.log(`Completed! Updated ${totalUpdated} files.`);
}

// Run the script
main();
