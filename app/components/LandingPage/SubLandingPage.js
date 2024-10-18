'use client';
import React, { useEffect, useState } from 'react';
import { ComponayDocs, LandingPageAboutUs, WhatWeOffer } from '../resuables/index';
import Image from 'next/image';
import BG from '../../../public/img/investment.svg';
import { ButtonOne } from '../resuables/Buttons/Buttons';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const SubLandingPage = () => {
  const [profitTab, setProfitTab] = useState(false);

  const toggleProfitTab = () => {
    setProfitTab(!profitTab);
  };

  useEffect(() => {
    if (profitTab) {
      document.body.style.overflow = 'hidden'; // Lock scroll when tab is open
    } else {
      document.body.style.overflow = 'auto'; // Unlock scroll when tab is closed
    }
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [profitTab]);

  return (
    <main className='w-full h-auto relative overflow-hidden'>
      <section className='mx-auto flex flex-row gap-4 items-center justify-center pt-24 text-xl md:text-2xl w-[80%]'>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className='z-20'>
          {LandingPageAboutUs.map((texts, index) => (
            <div key={index} className='w-full md:w-1/2 flex flex-col gap-4'>
              <h3 className='text-xl md:text-2xl mb-4 font-extrabold dark:text-yellow-600 text-yellow-700'>
                {texts.title}
              </h3>
              <h1 className="text-5xl md:text-7xl tracking-wider">
                {texts.heading}
              </h1>
              <p>{texts.firstText}</p>
              <Link href={'/about'}>
                <div className='mb-8 flex flex-row gap-4 items-center'>
                  <ButtonOne iconValue={(<ArrowRight />)} IconButton={true} />
                  <span className=''> See More</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className='hidden md:flex w-1/2'>
          <Image src={BG} width={1200} height={1200} />
        </div>
      </section>
      <div className='flex flex-col md:flex-row w-[80%] mx-auto gap-8'>
        <div className="w-full md:w-1/2 z-20">
          {ComponayDocs.map((texts, index) => (
            <section className='flex flex-col gap-2 font-semibold w-full md:text-lg' key={index}>
              <h3 className='text-xl md:text-2xl mb-4 font-extrabold dark:text-yellow-600 text-yellow-700'>
                {texts.title}
              </h3>
              <h1 className="text-5xl md:text-7xl tracking-wider">
                {texts.heading}
              </h1>
              <p>{texts.name}</p>
              <p>{texts.No}</p>
              <p>{texts.address}</p>
              <div className='mb-8 flex flex-row gap-4 items-center'>
                <ButtonOne iconValue={(<ArrowRight />)} IconButton={true} />
                <span> Certification</span>
              </div>
              <p>{texts.text}</p>
              <div className='mb-8 flex flex-row gap-4 items-center'>
                <ButtonOne iconValue={(<ArrowRight />)} IconButton={true} />
                <span> View Report</span>
              </div>
            </section>
          ))}
        </div>
        <div className="w-full md:w-1/2 z-20">
          {WhatWeOffer.map((texts, index) => (
            <section className='flex flex-col gap-2 font-semibold w-full md:text-lg' key={index}>
              <h3 className='text-xl md:text-2xl mb-4 font-extrabold dark:text-yellow-600 text-yellow-700'>
                {texts.title}
              </h3>
              <h1 className="text-5xl md:text-7xl tracking-wider">
                {texts.heading}
              </h1>
              <p>{texts.text}</p>
            </section>
          ))}
          <div className='flex flex-row items-center gap-4 font-semibold w-full md:text-lg justify-end cursor-pointer'>
            <ButtonOne IconButton={true} iconValue={(<ArrowLeft />)} Clicked={toggleProfitTab} />
            <span className='' onClick={toggleProfitTab}>
              Calculate Profit
            </span>
          </div>
        </div>
      </div>
      {/* Profit Tab Section */}
      <section
        className={`fixed top-0 right-0 h-full flex flex-col items-center justify-center rounded-l-2xl bg-slate-800 z-30 transition-transform duration-500 transform ${profitTab ? 'translate-x-0' : 'translate-x-full'} w-full md:w-1/2 lg:w-1/4`}
      >
        {/* Button to close the Profit Tab */}
        <span className='absolute top-3 left-3 z-40'>
          <ButtonOne IconButton={true} iconValue={(<ArrowLeft />)} Clicked={toggleProfitTab} />
        </span>
        <div className="p-8 text-white text-center w-full"> 
          <h2 className="text-3xl mb-4">Profit Calculation</h2>
          <p>Here we will implement the logic to calculate profit. Stay tuned!</p>
        </div>
      </section>
    </main>
  );
}

export default SubLandingPage;
