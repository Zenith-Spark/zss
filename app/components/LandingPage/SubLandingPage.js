'use client';
import React, { useEffect, useState } from 'react';
import { Affiliate, coins, ComponayDocs, LandingPageAboutUs, WhatWeOffer } from '../resuables/index';
import Image from 'next/image';
import BG from '../../../public/img/team1.webp';
import BGTwo from '../../../public/img/building1.webp';
import BGThree from '../../../public/img/building2.webp';
import AffiliateImg from '../../../public/img/offer1.webp'
import AffiliateImgTwo from '../../../public/img/offer2.webp'
import { ButtonOne } from '../resuables/Buttons/Buttons';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import InvestmentCalculator from '../profitcalculator/InvestmentCalculator';
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


      <div className='flex flex-row w-full items-center justify-evenly pt-16'>
      {displayedCoins.map((coin, index) => (
        <marquee key={index} className='text-3xl md:text-4xl flex flex-col items-center gap-1'>
          <span>
          {coin.coins}
          </span>
          <span className='text-xs font-thin'>
            {coin.name}
          </span>
        </marquee>
      ))}
    </div>
      </section>

      <section className='h-auto w-full mb-20  flex items-center  my-10  gap-x-5 text-md  md:text-xl px-3 md:px-10 bg-slate-800 text-white py-10'>
      <div className='hidden md:flex z-20 rounded-2xl h-[50dvh] w-1/2'>
          <Image src={AffiliateImgTwo} width={600} height={600} alt='Sub Landing Background' className='object-cover rounded-2xl shadow-2xl border-2' />
        </div>
      <article className="w-full md:w-1/2   mx-auto flex flex-col items-start  z-20 ">
          {WhatWeOffer.map((texts, index) => (
            <section className='flex flex-col gap-2 font-semibold  md:text-lg ' key={index}>
              <h1 className="text-4xl md:text-6xl tracking-wider">
                {texts.heading}
              </h1>
              <p>{texts.text}</p>
            </section>
          ))}
        </article>
      </section>
          <section className='mx-auto  flex flex-row  items-center pt-24 text-xl w-[80%] md:text-2xl md:justify-between gap-x-3'>
        <div className='z-20 w-full md:w-1/2 '>
        {ComponayDocs.map((texts, index) => (
            <div className='flex flex-col gap-2 font-semibold md:text-lg' key={index}>
              <h3 className='text-xl md:text-2xl mb-4 font-extrabold dark:text-yellow-600 text-yellow-700'>
                {texts.title}
              </h3>
              <h1 className="text-4xl md:text-6xl tracking-wider">
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
            </div>
          ))}
        </div>
        <div className='hidden md:flex gap-x-1 z-20 relative rounded-2xl h-[50dvh] w-1/2'>
          <Image src={BGTwo} width={300} height={600} alt='Sub Landing Background' className='object-cover rounded-2xl shadow-2xl w-1/2 -skew-y-6 border-2' />
          <Image src={BGThree} width={300} height={600} alt='Sub Landing Background' className='object-cover -translate-y-20 rounded-2xl shadow-2xl w-1/2 skew-y-6 border-2' />
        </div>
      </section>


      <InvestmentCalculator/>

      <section className='h-auto w-full mb-20  flex items-center  my-10  gap-x-5 text-md  md:text-xl px-3 md:px-10 bg-slate-800 text-white py-10'>
      <article className="w-full md:w-1/2   mx-auto flex flex-col items-start  z-20 ">
          {Affiliate.map((texts, index) => (
            <section className='flex flex-col gap-2 font-semibold  md:text-lg ' key={index}>
              <h1 className="text-4xl md:text-6xl tracking-wider">
                {texts.heading}
              </h1>
              <p>{texts.text}</p>
            </section>
          ))}
          <span className='flex flex-col items-center text-yellow-400 my-5'>
            <h1 className=' text-6xl md:text-8xl font-extrabold'>
              10%.
            </h1>
            <p>
            Referral Commission
            </p>
          </span>
        </article>
        <div className='hidden md:flex z-20 rounded-2xl h-[50dvh] w-1/2'>
          <Image src={AffiliateImg} width={600} height={600} alt='Sub Landing Background' className='object-cover rounded-2xl shadow-2xl border-2' />
        </div>
      </section>
      <InvestmentPlan/>
    </main>
  );
}

export default SubLandingPage;
