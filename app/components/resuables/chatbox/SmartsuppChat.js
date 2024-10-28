'use client'
import { useEffect } from 'react';

export default function SmartsuppChat() {
  useEffect(() => {
    // Set the Smartsupp key
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = 'b31303f54f80d4e1bba31d27efb47714116f1294';

    // Load the Smartsupp script asynchronously
    if (!window.smartsupp) {
      const script = document.createElement('script');
      script.src = 'https://www.smartsuppchat.com/loader.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return null; // No JSX output needed
}
