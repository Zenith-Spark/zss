'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import SideBarLogo from '../../../public/svg/zss.svg';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose, AiOutlineLogout } from 'react-icons/ai';
import Modal from '@assets/app/components/resuables/Modal/Modal';
import Notification from '../admin_notification/Notification';
import { ButtonTwo, DBButtonOne } from '@assets/app/components/resuables/Buttons/Buttons';
import { useGlobalState } from '@assets/app/GlobalStateProvider';
const SideBar = () => {
  const {formData} = useGlobalState()
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
          <div className="h-16 flex items-center gap-1 ml-4 md:ml-8 pb-2 w-full overflow-hidden pr-2">
            <span className="text-3xl border rounded-full h-12 w-12 bg-slate-500 flex items-center justify-center">
              {formData.adminFullName ? <strong>{formData.adminFullName.charAt(0)}</strong> : adminDBSidebar[6].icons}
            </span>
            <div>
              <h1 className="font-bold text-base flex flex-col md:flex-row gap-x-2">
                <span>
                  {formData.adminFullName ? formData.adminFullName : 'Full Name'}
                </span>
              </h1>
              <marquee className="text-xs w-full">
                {formData.adminEmail ? formData.adminEmail : 'Email'}
              </marquee>
            </div>
          </div>

          {/* Sidebar Links */}
          <div className='flex flex-col gap-y-2 overflow-y-auto'>
            {adminDBSidebar.map((links, index) => (
              <div className='border-gray-700' key={index}>
                <Link
                  href={links.href}
                  onClick={() => handleLinkClick(links.href)} // Close on link click
                  className={`flex items-center ml-4 md:ml-8 gap-2 py-2 hover:text-gray-400 text-base md:text-lg focus:bg-white focus:text-slate-800 px-3 rounded-xl mr-3 transition duration-200 ${activeLink === links.href ? 'bg-gray-700 text-gray-200' : ''}`}
                >
                  <span className='text-xl'>{links.icons}</span>
                  <span>{links.name}</span>
                </Link>
              </div>
            ))}
            {/* Logout Link */}
            <div className='border-gray-700'>
              <button
                onClick={handleLogoutClick}
                className="flex items-center ml-4 md:ml-8 gap-2 py-1 text-sm md:text-base hover:text-gray-400 px-3 rounded-xl mr-3 transition duration-200"
              >
                <span className='text-xl'>
                  <AiOutlineLogout/>
                  </span> {/* Replace with a logout icon if desired */}
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
