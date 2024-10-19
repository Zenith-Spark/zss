'use client';
import React, { useEffect, useState } from 'react';
import { ComponayDocs, LandingPageAboutUs, WhatWeOffer } from '../resuables/index';
import Image from 'next/image';
import BG from '../../../public/img/team1.webp';
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

  const [showMore, setShowMore] = useState(false);
  
    // Helper function to split the text into words
    const getWords = (text) => text.split(' ');
  
    // Function to limit the number of words in firstText
    const getLimitedText = (text) => {
      const words = getWords(text);
      const isLongText = words.length > 10;
      return isLongText && !showMore
        ? words.slice(0, 20).join(' ') + '...'
        : text;
    };
 

  return (
    <main className='w-full h-auto relative overflow-hidden'>
      <section className='mx-auto mb-20 flex flex-row  items-center pt-24 text-xl w-[80%] md:text-2xl md:justify-between'>
        <div className='z-20 w-full md:w-1/2'>
        {LandingPageAboutUs.map((texts, index) => (
        <div key={index} className='flex flex-col gap-4'>
          <h3 className='text-8xl md:text-10xl mb-4  dark:text-yellow-600 text-yellow-700'>
            {texts.title}
          </h3>
          <p>{getLimitedText(texts.firstText)}</p> {/* Limit the firstText */}
          <Link href={'/about'}>
            <div className='mb-8 flex flex-row gap-4 items-center'>
              <ButtonOne iconValue={<ArrowRight />} buttonValue={'More'} />
            </div>
          </Link>
        </div>
      ))}
        </div>
        <div className='hidden md:flex z-20 rounded-2xl h-[50dvh] w-1/2'>
          <Image src={BG} width={600} height={600} alt='Sub Landing Background' className='object-cover rounded-2xl shadow-2xl' />
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
    </main>
  );
}

export default SubLandingPage;
