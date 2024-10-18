'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import ToggleMenu from '../resuables/Buttons/ToggleMenu.js';
import { NavItems } from '../resuables/index/index.js';
import Link from 'next/link'; // Import Link for navigation

const Navbar = () => {
  const [navDrawer, setNavDrawer] = useState(false);
  const toggleNav = () => {
    setNavDrawer(!navDrawer);
  };

  return (
    <>
      <nav
        className={`z-20 fixed w-full backdrop-blur-lg transition-all duration-1000 border-b border-customBlue overflow-hidden ${navDrawer ? 'h-[20rem]' : 'h-[3rem]'} md:h-[3rem] z-10`}
      >
        <div className='flex flex-row h-[3rem] items-center justify-evenly'>
          <div className='text-white'>
            LOGO
          </div>
          <div className='hidden md:flex w-[30%] items-center justify-between'>
            {NavItems.map((item, index) => (
              <ul className='text-white' key={index}>
                {/* Wrap item with Link for navigation */}
                {index === 1 ? (
                  <Link href={`/zenith-spark-station/app/about/`}> {/* Replace with your actual route */}
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </ul>
            ))}
          </div>
          <div className='md:hidden my-2'>
            <ToggleMenu Click={toggleNav} />
          </div>
        </div>

        <div className='w-full h-max md:hidden flex flex-col items-center justify-evenly gap-5'>
          {NavItems.map((items, index) => (
            <ul key={index} className='flex gap-2 hover:text-neutral-500 active:underline pb-2 items-center text-white'>
              <span>
                {/* Wrap item with Link for mobile version */}
                {index === 1 ? (
                  <Link href="/"> {/* Replace with your actual route */}
                    {items.name}
                  </Link>
                ) : (
                  items.name
                )}
              </span>
              <span>{items.icon}</span>
            </ul>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
