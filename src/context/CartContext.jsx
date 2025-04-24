import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Exchange rates (simplified for demo)
const EXCHANGE_RATES = {
  USD: 1,
  CAD: 1.35
};

// Currency symbols
const CURRENCY_SYMBOLS = {
  USD: '$',
  CAD: 'C$'
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartTotal, setCartTotal] = useState(0);
  const [currency, setCurrency] = useState(() => {
    // Load currency preference from localStorage
    const savedCurrency = localStorage.getItem('currency');
    return savedCurrency || 'USD';
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));

    // Calculate total in the selected currency
    const baseTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(baseTotal);
  }, [cart]);

  // Save currency preference to localStorage
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  // Convert price to the selected currency
  const convertPrice = (priceUSD) => {
    return priceUSD * EXCHANGE_RATES[currency];
  };

  // Get formatted price with currency symbol
  const getFormattedPrice = (price) => {
    const convertedPrice = convertPrice(price);
    return `${CURRENCY_SYMBOLS[currency]}${convertedPrice.toFixed(2)}`;
  };

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // If product exists, increase quantity by the specified amount (or 1 if not specified)
        const quantityToAdd = product.quantity || 1;
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantityToAdd
        };
        return updatedCart;
      } else {
        // If product doesn't exist, add it with the specified quantity (or 1 if not specified)
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartTotal,
      currency,
      setCurrency,
      convertPrice,
      getFormattedPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
