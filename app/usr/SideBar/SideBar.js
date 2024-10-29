'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import SideBarLogo from '../../../public/svg/zss.svg';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose, AiOutlineLogout } from 'react-icons/ai';
import Modal from '@assets/app/components/resuables/Modal/Modal';
import { ButtonOne, ButtonTwo, DBButtonOne } from '@assets/app/components/resuables/Buttons/Buttons';
import { IoNotifications } from 'react-icons/io5';
import Notification from '../notification/Notification';

const SideBar = () => {
  const [sideSlide, setSideSlide] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false); // New state for the logout modal

  // Effect to check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSideSlide(true);
      } else {
        setSideSlide(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSideSlide = () => {
    setSideSlide(prevState => !prevState);
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setSideSlide(false); // Close the sidebar when a link is clicked
  };

  const closeSideBar = () => {
    if (window.innerWidth < 768) { // Only close sidebar on mobile
      setSideSlide(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Open the logout confirmation modal
  };

 

  return (
    <nav className='fixed w-full h-16 z-40'>
      <Notification/>
      <div className='flex items-center justify-start h-full px-4'>
        <button onClick={toggleSideSlide} className='md:hidden'>
          {sideSlide ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sideSlide && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSideBar} // Close sidebar when overlay is clicked
        ></div>
      )}

      <aside className={`fixed top-0 h-screen w-[80%] md:w-[30%] xl:w-[20%] transition-transform duration-300 bg-slate-800 z-50 ${sideSlide ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className='flex flex-col h-full text-white pt-12'>
          {/* Logo section */}
          <div className='flex items-center relative mb-16 mt-8' onClick={closeSideBar}> {/* Close on logo click */}
            <Image src={SideBarLogo} width={100} height={100} alt="Logo" className='absolute ' />
            <span className='font-bold absolute left-24'>Zenith Spark Station</span>
          </div>

          {/* User Info */}
          <div className='h-16 flex items-center gap-5 ml-4 md:ml-8 pb-2'>
            <span className='text-3xl border rounded-full p-2 bg-slate-500'>
              {usrDBSidebar[6].icons}
            </span>
            <div>
              <h1 className='font-bold text-lg flex flex-col md:flex-row gap-x-2 '>
                <span>
                  Full Name
                </span>
              </h1>
              <p>user email</p>
            </div>
          </div>

          {/* Sidebar Links */}
          <p className="text-gray-500 text-sm font-semibold ml-4 md:ml-8 mb-1">
          Account
        </p>
          <div className='flex flex-col gap-y-5 overflow-y-auto'>
  {usrDBSidebar.map((links, index) => (
    <React.Fragment key={index}>
      <div className='border-gray-700'>
        <Link
          href={links.href}
          onClick={() => handleLinkClick(links.href)}
          className={`flex items-center ml-4 md:ml-8 gap-2 py-[2px] hover:text-gray-400 text-sm md:text-base focus:bg-white focus:text-slate-800 px-3 rounded-xl mr-3 transition duration-200 ${
            activeLink === links.href ? 'bg-gray-700 text-gray-200' : ''
          }`}
        >
          <span className='text-xl'>{links.icons}</span>
          <span>{links.name}</span>
        </Link>
      </div>

      {/* Insert Settings label after the 3rd link */}
      {index === 4 && (
        <p className="text-gray-500 text-sm font-semibold ml-4 md:ml-8">
          Settings
        </p>
      )}
    </React.Fragment>
  ))}

  {/* Logout Link */}
  <div className='border-gray-700'>
    <button
      onClick={handleLogoutClick}
      className="flex items-center ml-4 md:ml-8 gap-2 py-1 text-sm md:text-base hover:text-gray-400 px-3 rounded-xl mr-3 transition duration-200"
    >
      <span className='text-xl'>
        <AiOutlineLogout />
      </span>
      <span>Logout</span>
    </button>
  </div>
</div>

        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}>
           <div className="flex flex-col items-center justify-center p-6">
  {/* Prompt Title */}
  <h1 className="text-lg font-bold mb-4 text-center text-slate-800">
    Are you sure you want to log out?
  </h1>

  {/* Action Buttons */}
  <div className="flex gap-4">
    <DBButtonOne 
      Clicked={() => setShowLogoutModal(false)} 
      buttonValue="No" 
    />
    
    <Link href="/">
      <ButtonTwo
        Clicked={() => setShowLogoutModal(false)} 
        buttonValue="Yes" 
      />
    </Link>
  </div>
</div>

          </Modal>
      )}
    </nav>
  );
};

export default SideBar;
