// app/layout.js (Global Client Layout)
"use client"; // This makes it a Client Component

import { usePathname } from 'next/navigation';
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/footer/Footer';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Check if the current path starts with '/usr'
  const shouldHideNavbarAndFooter = pathname.startsWith('/usr');

  return (
    <>
      {/* Only render Navbar and Footer if not on excluded paths */}
      {!shouldHideNavbarAndFooter && <Navbar />}
      {/* This will render the specific subdirectory layout (e.g., usr/layout.js) */}
      {children} 
      {!shouldHideNavbarAndFooter && <Footer />}
    </>
  );
}
