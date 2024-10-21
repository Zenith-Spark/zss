'use client';
import React, { useState, useEffect } from 'react';
import ToggleMenu from '../resuables/Buttons/ToggleMenu.js';
import { NavItems } from '../resuables/index/index.js';
import Link from 'next/link';
import { ButtonOne, ButtonTwo } from '../resuables/Buttons/Buttons.js';

const Navbar = () => {
  const [navDrawer, setNavDrawer] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  
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

  // Track scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return (
    <>
      <nav
        className={`z-20 fixed w-full dark:bg-slate-800 bg-slate-900 transition-all duration-300 overflow-hidden ${
          navDrawer ? 'h-[20rem]' : 'h-[3rem]'
        } md:h-[3rem] z-40 transform ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="flex flex-row h-[3rem] items-center w-full justify-evenly">
          <Link href={'/'}>
            <div className="text-white">LOGO</div>
          </Link>
          <div className="hidden md:flex w-[30%] items-center justify-between">
            {NavItems.map((item, index) => (
              <ul className="text-white" key={index}>
                <li onClick={toggleNav}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              </ul>
            ))}
          </div>
          <div className="md:hidden my-2">
            <ToggleMenu Click={toggleNav} />
          </div>
          <div className="gap-x-4 justify-center py-4 hidden md:flex">
            <Link href={'/login'}>
              <span onClick={toggleNav}>
                <ButtonOne buttonValue={`Login`} />
              </span>
            </Link>
            <Link href={'/signup'}>
              <span onClick={toggleNav}>
                <ButtonTwo buttonValue={`Sign Up`} />
              </span>
            </Link>
          </div>
        </div>

        <div className="w-full h-max md:hidden flex flex-col items-center justify-evenly gap-5">
          {NavItems.map((items, index) => (
            <ul
              key={index}
              className="flex gap-2 hover:text-neutral-500 active:underline pb-2 items-center text-white"
            >
              <li onClick={toggleNav}>
                <Link href={items.href}>{items.name}</Link>
              </li>
              <span>{items.icon}</span>
            </ul>
          ))}
          <div className="flex w-1/2 mx-auto gap-x-4 justify-center md:hidden">
            <Link href={'/login'}>
              <span onClick={toggleNav}>
                <ButtonOne buttonValue={`Login`} />
              </span>
            </Link>
            <Link href={'/signup'}>
              <span onClick={toggleNav}>
                <ButtonTwo buttonValue={`Sign Up`} />
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
