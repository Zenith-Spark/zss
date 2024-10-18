// components/ThemeProvider.js
'use client'; // Ensure this is at the top

import React, { createContext, useContext, useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa6';
import { IoIosSunny } from 'react-icons/io';

// Create a Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
  // Default to device preference for SSR and initialize state
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(() => {
    // Default to device preference
    return prefersDark ? 'dark' : 'light';
  });

  const [mounted, setMounted] = useState(false); // Track when component is mounted

  useEffect(() => {
    // Mark the component as mounted
    setMounted(true);
    // Set the initial theme based on device preference
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Don't render the button until after mount to prevent hydration errors
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <button
          onClick={toggleTheme}
          aria-label='Toggle theme'
          className='fixed z-50 text-3xl right-5 bottom-5'
        >
          {theme === 'light' ? (
            <FaMoon className='text-neutral-600' />
          ) : (
            <IoIosSunny className='text-yellow-500' />
          )}
        </button>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
