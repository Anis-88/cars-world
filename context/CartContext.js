// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);

  // Add item to cart
  const addToCart = (car) => {
    setCartItems((prev) => [...prev, car]);
  };

  // Remove item from cart by name
  const removeFromCart = (carName) => {
    setCartItems((prev) => prev.filter(item => item.name !== carName));
  };

  // Add item to order history
  const addToOrder = (car) => {
    setOrderedItems((prev) => [...prev, car]);
  };

  // Remove item from order history by id
  const removeOrder = (carId) => {
    setOrderedItems((prev) => prev.filter(item => item.id !== carId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderedItems,
        addToCart,
        removeFromCart,
        addToOrder,
        removeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
