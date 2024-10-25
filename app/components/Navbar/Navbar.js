'use client';
import React, { useState, useEffect } from 'react';
import { NavItems } from '../resuables/index/index.js';
import Link from 'next/link';
import { ButtonOne, ButtonTwo } from '../resuables/Buttons/Buttons.js';
import Image from 'next/image';
import NavBarImg from '../../../public/svg/zss.svg';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [navDrawer, setNavDrawer] = useState(false);

  const toggleNav = () => {
    setNavDrawer(!navDrawer);
  };

  useEffect(() => {
    if (navDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [navDrawer]);

  return (
    <>
      <nav className="z-40 fixed w-full dark:bg-slate-800 bg-slate-900 shadow-md">
        <div className="flex flex-row h-[3rem] items-center w-full justify-between px-4">
          <Link href="/">
            <Image src={NavBarImg} width={80} height={30} alt="Logo" />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {NavItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <span className="text-white hover:text-gray-300 transition-all duration-200">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex space-x-4">
            <Link href="/login">
              <ButtonOne buttonValue="Login" />
            </Link>
            <Link href="/signup">
              <ButtonTwo buttonValue="Sign Up" />
            </Link>
          </div>

          <div className="md:hidden text-white cursor-pointer focus:animate-spin">
            <Menu onClick={toggleNav} />
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full bg-slate-800 text-white transition-transform duration-500 ease-in-out z-50 transform ${
          navDrawer ? 'translate-x-0' : 'translate-x-full'
        } w-3/4 max-w-xs z-30 shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-6">
          <button onClick={toggleNav} className="text-white text-lg focus:outline-none">
            <X/>
          </button>
        </div>

        <div className="flex flex-col items-start pl-6 space-y-6 mt-4">
          {NavItems.map((item, index) => (
            <Link href={item.href} key={index} onClick={toggleNav}>
              <span className="text-lg hover:text-gray-300">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex absolute bottom-8 flex-row items-center mt-10 space-x-4 px-6">
          <Link href="/login">
            <ButtonOne buttonValue="Login" onClick={toggleNav} />
          </Link>
          <Link href="/signup">
            <ButtonTwo buttonValue="Sign Up" onClick={toggleNav} />
          </Link>
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {navDrawer && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={toggleNav}
        />
      )}
    </>
  );
};

export default Navbar;
