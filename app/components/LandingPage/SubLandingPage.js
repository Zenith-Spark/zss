'use client';
import React, { useEffect, useState } from 'react';
import { coins, howToEarn, LandingPageAboutUs,  } from '../resuables/index';
import Image from 'next/image';
import BG from '../../../public/img/team1.webp';
import AffiliateImg from '../../../public/img/offer1.webp'
import InvestmentPlan from './InvestmentPlan';

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
 
    const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Function to check screen size
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
  };

  useEffect(() => {
    // Set initial screen size
    handleResize();
    // Add event listener to update screen size on window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Limit coins to 4 on small screens
  const displayedCoins = isSmallScreen ? coins.slice(0, 6) : coins;


  return (
    <main className='w-full h-auto relative overflow-hidden'>
      <section className='mx-auto md:h-auto py-5 flex flex-col  items-center  text-xl w-[80%] md:text-2xl md:justify-center'>
      <div className='z-20 w-full'>
  {LandingPageAboutUs.map((text, index) => (
    <div 
      key={index} 
      className='w-full flex flex-col items-center text-center py-8 '>
      {/* Title */}
      <h3 className='text-xl md:text-2xl font-semibold dark:text-gray-300'>
        {text.title}
      </h3>
      
      {/* Heading */}
      <h1 className='text-3xl md:text-6xl font-extrabold text-yellow-600 mb-4'>
        {text.heading}
      </h1>
      
      {/* Paragraph */}
      <p className='text-lg md:text-xl   leading-relaxed max-w-3xl'>
        {text.firstText}
      </p>
    </div>
  ))}
</div>

<div className="overflow-hidden w-full pt-16 relative">
          <div className="flex w-max animate-slide">
            {displayedCoins.map((coin, index) => (
              <span key={index} className='text-3xl md:text-4xl flex flex-col items-center gap-1 mx-6'>
                <span>{coin.coins}</span>
                <span className='text-xs font-thin'>{coin.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="w-[80%] mx-auto p-4 text-center my-10">
        <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-6xl text-yellow-600 font-bold mb-4">
          How {"Better"} Works
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Our team is committed to upholding the highest standards in managing and growing your wealth. Three simple steps make you financially independent.
        </p>
      </div>

      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between">
            {howToEarn.map((step, index) => (
              <div
                key={index}
                className="p-6 w-full md:w-[23%] transition-transform hover:scale-105"
              >
                <div className='relative mx-auto w-14 h-14 rounded-full items-center justify-center text-center text-2xl flex bg-slate-500 text-white'>
                <h1 className='text-xs flex items-center justify-center text-center h-4 w-4 bg-blue-500 text-white rounded-full absolute top-0 right-0'>{step.No}</h1>
                    {step.icon}
                </div>
                <h3 className=" text-2xl font-semibold mb-4">{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InvestmentPlan/>
    </main>
  );
}

export default SubLandingPage;
