'use client';
import { useEffect } from 'react';

export default function SmartsuppChat({ userName }) {
  useEffect(() => {
    // Set the Smartsupp key
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = 'e4c974153ce27a73e4ecd6adb6a60fa31c0b108f';

    // Load the Smartsupp script asynchronously
    if (!window.smartsupp) {
      const script = document.createElement('script');
      script.src = 'https://www.smartsuppchat.com/loader.js';
      script.async = true;
      document.head.appendChild(script);

      // Wait for the script to load before setting user properties
      script.onload = () => {
        if (window.smartsupp) {
          window.smartsupp('name', userName); // Set the user's name
        }
      };
    } else {
      // If smartsupp is already loaded, set the user properties immediately
      window.smartsupp('name', userName);
    }
  }, [userName]); // Re-run if userName changes

  return null; // No JSX output needed
}
