'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import SideBarLogo from '../../../public/svg/zss.svg';
import { usrDBSidebar } from '@assets/app/components/resuables/index';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const SideBar = () => {
  const [sideSlide, setSideSlide] = useState(false);

  // Effect to check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      // Open sidebar on medium screens and above
      if (window.innerWidth >= 768) {
        setSideSlide(true);
      } else {
        setSideSlide(false);
      }
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSideSlide = () => {
    setSideSlide(prevState => !prevState);
  };

  return (
    <nav className='fixed w-full h-16 z-50 '>
      <div className='flex items-center justify-between bg-slate-800 h-full px-4 text-white'>
        <div className='flex flex-row gap-2 items-center '>
          <Image src={SideBarLogo} width={100} height={100} alt='logo'/>
          <h1 className='text-white text-lg font-bold hidden md:flex'>Zenith Spark Station</h1>
        </div>
        <button onClick={toggleSideSlide} className=' md:hidden'>
          {sideSlide ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      <aside className={`fixed top-0 h-screen w-[80%] md:w-[30%] xl:w-[20%] transition-transform duration-300 bg-slate-800 ${sideSlide ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className='flex flex-col h-full text-white'>
          <div className='flex items-center '>
            <Image src={SideBarLogo} width={100} height={100} alt="Logo" />
            <span className='font-bold'>Zenith Spark Station</span>
          </div>
          
          <div className='h-16 flex items-center gap-5 ml-4  md:ml-8 pb-2 mb-3'>
            <span className='text-3xl border rounded-full p-2 bg-slate-500'>
              {usrDBSidebar[6].icons}
            </span>
            <div>
              <h1 className='font-bold text-lg'>User Name</h1>
              <p>user email</p>
            </div>
          </div>

          <div className='flex flex-col gap-y-5 overflow-y-auto'>
            {usrDBSidebar.map((links, index) => (
              <div className='border-b border-gray-700' key={index}>
                <Link href={links.href} className='flex items-center ml-4 md:ml-8 gap-2 pb-2 hover:text-gray-400 text-sm md:text-base focus:underline transition duration-200'>
                  <span className='text-xl'>{links.icons}</span>
                  <span>{links.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </nav>
  );
};

export default SideBar;
