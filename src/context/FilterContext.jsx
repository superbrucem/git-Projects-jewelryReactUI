import React, { createContext, useContext, useState, useEffect } from 'react';
import products from '../data/products';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

// Define mapping between collection IDs and product properties
// This helps match sidebar collection options with actual product data
const collectionMapping = {
  // Signature collections (direct match with product.category)
  '5-elements': { type: 'category', value: '5-elements' },
  'greek-gods': { type: 'category', value: 'greek-gods' },
  'underworld': { type: 'category', value: 'underworld' },

  // Regular collections (need to match with product properties)
  'natural-gemstone-a-m': { type: 'name', value: ['amethyst', 'aquamarine', 'citrine', 'emerald', 'garnet', 'jade', 'lapis', 'moonstone'] },
  'natural-gemstone-n-z': { type: 'name', value: ['opal', 'peridot', 'ruby', 'tanzanite', 'tourmaline'] },
  'natural-garnet': { type: 'name', value: ['garnet'] },
  'natural-sapphire': { type: 'name', value: ['sapphire'] },
  'natural-topaz-quartz': { type: 'name', value: ['topaz', 'quartz'] },
  'natural-diamond': { type: 'name', value: ['diamond'] }
};

export const FilterProvider = ({ children }) => {
  // Filter states
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Initialize filters with all collection options from our mapping
  const [filters, setFilters] = useState({
    collections: {
      all: true,
      '5-elements': false,
      'greek-gods': false,
      'underworld': false,
      'natural-gemstone-a-m': false,
      'natural-gemstone-n-z': false,
      'natural-garnet': false,
      'natural-sapphire': false,
      'natural-topaz-quartz': false,
      'natural-diamond': false
    }
  });

  // Initialize products on component mount
  useEffect(() => {
    // Set initial products
    setFilteredProducts(products);
    setIsLoading(false);
  }, []);

  // Apply filters whenever the filters state changes
  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Function to apply all filters
  const applyFilters = () => {
    // Start with loading state
    setIsLoading(true);

    let result = [...products];

    // Apply collections filter
    if (!filters.collections.all) {
      const selectedCollections = Object.entries(filters.collections)
        .filter(([key, value]) => value && key !== 'all')
        .map(([key]) => key);

      if (selectedCollections.length > 0) {
        // Filter products based on selected collections using the mapping
        result = result.filter(product => {
          // Check if the product matches any of the selected collections
          return selectedCollections.some(collectionId => {
            const mapping = collectionMapping[collectionId];

            // If no mapping exists, fall back to category matching
            if (!mapping) {
              return collectionId === product.category;
            }

            // Handle different types of mappings
            if (mapping.type === 'category') {
              return product.category === mapping.value;
            }
            else if (mapping.type === 'name') {
              // For name-based mappings, check if any of the values are in the product name
              const productNameLower = product.name.toLowerCase();
              return Array.isArray(mapping.value)
                ? mapping.value.some(term => productNameLower.includes(term))
                : productNameLower.includes(mapping.value);
            }

            return false;
          });
        });
      }
    }

    // Set filtered products and turn off loading state
    setFilteredProducts(result);
    setIsLoading(false);
  };

  // Function to update a specific filter
  const updateFilter = (category, option, value) => {
    // Set loading state when filter changes
    setIsLoading(true);

    setFilters(prev => {
      const newFilters = { ...prev };

      // If selecting "All", unselect others
      if (option === 'all' && value === true) {
        Object.keys(newFilters[category]).forEach(key => {
          newFilters[category][key] = key === 'all';
        });
      }
      // If selecting a specific option, unselect "All"
      else if (option !== 'all' && value === true) {
        newFilters[category].all = false;
        newFilters[category][option] = value;
      }
      // If unselecting the last specific option, select "All"
      else if (option !== 'all' && value === false) {
        const anySelected = Object.entries(newFilters[category])
          .some(([key, val]) => key !== 'all' && key !== option && val);

        if (!anySelected) {
          newFilters[category].all = true;
        }
        newFilters[category][option] = value;
      }

      return newFilters;
    });
  };

  // Function to clear all filters
  const clearFilters = () => {
    // Set loading state when clearing filters
    setIsLoading(true);

    setFilters({
      collections: {
        all: true,
        '5-elements': false,
        'greek-gods': false,
        'underworld': false,
        'natural-gemstone-a-m': false,
        'natural-gemstone-n-z': false,
        'natural-garnet': false,
        'natural-sapphire': false,
        'natural-topaz-quartz': false,
        'natural-diamond': false
      }
    });
  };

  return (
    <FilterContext.Provider value={{
      filters,
      filteredProducts,
      isLoading,
      updateFilter,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};
