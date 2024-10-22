'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ComponayDocs, FooterPages } from '../resuables/index';
import { FaAppStore, FaFacebook, FaTwitter } from 'react-icons/fa6';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { IoLogoInstagram } from 'react-icons/io';
import Image from 'next/image';
import FooterBg from '../../../public/svg/zss.svg';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-5 lg:px-20 space-y-8 md:space-y-0">
        
        {/* Company Information Section */}
        <div className="flex flex-col gap-y-4 items-center text-center md:text-start md:items-start w-full md:w-1/3">
          <p className="mt-3 font-semibold text-lg">{ComponayDocs[0].name}</p>
          <p className="md:text-base text-xs  mt-1">{ComponayDocs[0].No}</p>
          <p className="md:text-base text-xs ">{ComponayDocs[0].address}</p>
          <p className="md:text-base text-xs ">zenithsparkstation@gmail.com</p>
        </div>
        
        {/* Branding Section */}
        <div className="md:w-1/3 w-full flex flex-col items-center md:items-start">
          <div className="flex flex-row h-32 items-center">
            <Image src={FooterBg} width={200} alt="footer" />
            <span className="w-1 -translate-x-14 rounded-full h-full bg-white"></span>
            <span className="flex flex-col -translate-x-10 text-4xl font-semibold">
              <span>Zenith</span>
              <span>Spark</span>
              <span>Station</span>
            </span>
          </div>
          <div className="flex items-center w-full justify-center gap-6 text-xs md:text-base mt-5 md:-translate-x-16">
            {FooterPages.map((item, index) => (
              <ul className="text-gray-300 hover:text-gray-500" key={index}>
                <li>
                  <Link href={item.href}>
                    {item.name}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </div>
        
        {/* Social Media Section */}
      </div>
      
      {/* Footer Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-neutral-400">
        <p>&copy; {new Date().getFullYear()} {ComponayDocs[0].name}. All rights reserved.</p>
        <div className="flex flex-col items-center  w-full mx-auto my-4">
          <div className="flex gap-4 text-xl">
            <FaFacebook className="hover:text-gray-500 transition-colors duration-300" />
            <IoLogoInstagram className="hover:text-gray-500 transition-colors duration-300" />
            <FaTwitter className="hover:text-gray-500 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
