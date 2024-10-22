'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [formData, setFormData] = useState({
   userName: '',
   Password: '',
   
  });

 
  return (
    <GlobalStateContext.Provider value={{ formData, setFormData, saveDataToFirestore, updateFormData, loading }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
