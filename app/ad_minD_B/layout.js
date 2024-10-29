// app/usr/layout.js (for Next.js 13 and later)
"use client"; // Ensure this is a Client Component

import React from 'react';
import SideBar from './admin_sidebar/SideBar';

const UsrLayout = ({ children }) => {
  return (
    <div className="dashboard-layout flex">
      <header>
        <SideBar />
      </header>
      <main className="w-full md:w-[70%] xl:w-[80%] transition  duration-1000 h-auto pt-10 md:ml-[30%] xl:ml-[20%] md:pl-5 xl:pl-8">
        {children}
      </main>
    </div>
  );
}

export default UsrLayout;