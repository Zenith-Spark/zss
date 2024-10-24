'use client';
import React, { createContext, useContext, useState } from 'react';

// Create the Global State Context
const GlobalStateContext = createContext();

// Create a Provider component
export const GlobalStateProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    email: '',
    password: '', 
    userWallet: {
      bitcoin: 0.04,
      ethereum: 0.02
    },
    totalBalance: 0,
  });

  

  return (
    <GlobalStateContext.Provider value={{ formData, setFormData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => useContext(GlobalStateContext);
