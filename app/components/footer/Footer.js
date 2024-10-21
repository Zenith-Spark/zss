import React from 'react';
import Link from 'next/link';
import { ComponayDocs, NavItems } from '../resuables/index';
import { FaAppStore } from 'react-icons/fa6';
import { IoLogoGooglePlaystore } from 'react-icons/io5';

const Footer = () => {
    
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left px-5 md:px-0">
        
        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {NavItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="hover:text-neutral-400 transition-colors duration-300">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Information */}
        <div>
          <h3 className="text-lg font-semibold mb-6">{ComponayDocs[0].title}</h3>
          <p className="leading-6">{ComponayDocs[0].heading}</p>
          <p className="mt-3 font-semibold">{ComponayDocs[0].name}</p>
          <p className="text-sm mt-1">{ComponayDocs[0].No}</p>
          <p className="text-sm">{ComponayDocs[0].address}</p>
        </div>

        {/* Get Our Apps Section */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Get Our Apps</h3>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <a href="#" className="bg-white hover:bg-gray-100 text-slate-800 transition transform hover:scale-105 rounded-lg px-4 py-3 flex items-center gap-3">
              <FaAppStore className="text-3xl" />
              <div>
                <p className="text-sm font-medium">Available on</p>
                <p className="text-lg font-bold">Apple Store</p>
              </div>
            </a>
            <a href="#" className="bg-white hover:bg-gray-100 text-slate-800 transition transform hover:scale-105 rounded-lg px-4 py-3 flex items-center gap-3">
              <IoLogoGooglePlaystore className="text-3xl" />
              <div>
                <p className="text-sm font-medium">Get it on</p>
                <p className="text-lg font-bold">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-neutral-400">
        <p>&copy; {new Date().getFullYear()} {ComponayDocs[0].name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
