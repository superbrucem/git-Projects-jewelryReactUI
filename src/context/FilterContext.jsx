import React, { createContext, useContext, useState, useEffect } from 'react';
import products from '../data/products';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  // Filter states
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    collections: {
      all: true,
      '5-elements': false,
      'greek-gods': false,
      'underworld': false
    }
  });

  // Apply filters whenever the filters state changes
  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Function to apply all filters
  const applyFilters = () => {
    let result = [...products];

    // Apply collections filter
    if (!filters.collections.all) {
      const selectedCollections = Object.entries(filters.collections)
        .filter(([key, value]) => value && key !== 'all')
        .map(([key]) => key);

      if (selectedCollections.length > 0) {
        result = result.filter(p => selectedCollections.includes(p.category));
      }
    }

    setFilteredProducts(result);
  };

  // Function to update a specific filter
  const updateFilter = (category, option, value) => {
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
    setFilters({
      collections: {
        all: true,
        '5-elements': false,
        'greek-gods': false,
        'underworld': false
      }
    });
  };

  return (
    <FilterContext.Provider value={{
      filters,
      filteredProducts,
      updateFilter,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};
