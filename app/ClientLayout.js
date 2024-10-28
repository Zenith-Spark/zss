// app/layout.js (Global Client Layout)
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';
import Loader from './components/resuables/Loader/Loader';

export default function ClientLayout({ children }) {
  const pathname = usePathname(); // Current route path
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Check if the current path starts with '/usr'
  const shouldHideNavbarAndFooter = pathname.startsWith('/usr');

  useEffect(() => {
    // Show loading screen on route change
    const handleRouteChange = () => setLoading(true);

    // Trigger handleRouteChange on path update
    handleRouteChange();

    // Hide loading screen after navigation completes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the delay as necessary

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, [pathname]);

  return (
    <>
      {/* Loading screen */}
      {loading && (
        <div className="fixed z-50 h-screen w-full bg-black opacity-25 justify-center flex items-center">
           <p className='text-white text-2xl text-center'>
              Zenith Spark Station
            </p>
            <Loader/>
        </div>
      )}

      {/* Only render Navbar and Footer if not on excluded paths */}
      {!shouldHideNavbarAndFooter && <Navbar />}

      {/* Render the page content */}
      {children}

      {!shouldHideNavbarAndFooter && <Footer />}
    </>
  );
}
