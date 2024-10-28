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
    referralLink: '',
    notification: [
      { id: 1, title: "New Message", message: "You have a new message from John.", time: "2m ago" },
      { id: 2, title: "System Update", message: "The system will undergo maintenance at midnight.", time: "1h ago" },
      { id: 3, title: "Friend Request", message: "Anna has sent you a friend request.", time: "3h ago" },
    ]
  });

  

  return (
    <GlobalStateContext.Provider value={{ formData, setFormData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => useContext(GlobalStateContext);
