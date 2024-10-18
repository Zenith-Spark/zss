// 'use client'
// // components/resuables/GlobalStateProvider.js

// import React, { createContext, useContext, useState } from 'react';

// // Create a context
// const GlobalStateContext = createContext();

// // Create a provider component
// export const GlobalStateProvider = ({ children }) => {
//   // Initialize the state with an array of values
//   const [values, setValues] = useState({
//     Home: true,
//   });

//   return (
//     <GlobalStateContext.Provider value={{ values, setValues }}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// // Create a custom hook to use the global state
// export const useGlobalState = () => {
//   return useContext(GlobalStateContext);
// };
