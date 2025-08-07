//HistoryContext.js
import React, { createContext, useContext, useState } from 'react';

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const removeOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <HistoryContext.Provider value={{ orders, addOrder, removeOrder }}>
      {children}
    </HistoryContext.Provider>
  );
};
