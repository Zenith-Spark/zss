'use client';
import React, { useEffect, useState } from 'react';
import { Affiliate, ComponayDocs, LandingPageAboutUs, WhatWeOffer } from '../resuables/index';
import Image from 'next/image';
import BG from '../../../public/img/team1.webp';
import BGTwo from '../../../public/img/building1.webp';
import BGThree from '../../../public/img/building2.webp';
import { ButtonOne } from '../resuables/Buttons/Buttons';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import InvestmentCalculator from '../profitcalculator/InvestmentCalculator';

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
      <section className='mx-auto  flex flex-row  items-center pt-24 text-xl w-[80%] md:text-2xl md:justify-between'>
        <div className='z-20 w-full md:w-1/2'>
        {LandingPageAboutUs.map((texts, index) => (
        <div key={index} className='flex flex-col gap-4'>
          <h3 className='text-8xl md:text-10xl mb-4  dark:text-yellow-600 text-yellow-700'>
            {texts.title}
          </h3>
          <p>{getLimitedText(texts.firstText)}</p> {/* Limit the firstText */}
          <Link href={'/about'}>
            <div className=' flex flex-row gap-4 items-center'>
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

      <section className='h-auto w-full mb-20 flex  my-10  items-center text-xl  md:text-2xl md:justify-center bg-slate-800 text-white py-10'>
      <div className="w-[80%] mx-auto  z-20 ">
          {WhatWeOffer.map((texts, index) => (
            <section className='flex flex-col gap-2 font-semibold w-full md:text-lg' key={index}>
              <h1 className="text-4xl md:text-6xl tracking-wider">
                {texts.heading}
              </h1>
              <p>{texts.text}</p>
            </section>
          ))}
        </div>
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
          <Image src={BGTwo} width={300} height={600} alt='Sub Landing Background' className='object-cover rounded-2xl shadow-2xl w-1/2 -skew-y-6' />
          <Image src={BGThree} width={300} height={600} alt='Sub Landing Background' className='object-cover -translate-y-20 rounded-2xl shadow-2xl w-1/2 skew-y-6' />
          <Link href={'/about'}>
        <span className=' absolute z-30  bottom-52 xl:right-[48%] right-[45%] border-[4px] rounded-full'>
            <ButtonOne IconButton={true} iconValue={(<ArrowLeft/>)}/>
        </span>
          </Link>
        </div>
      </section>


      <InvestmentCalculator/>

      <section className='h-auto w-full mb-20 flex flex-col md:flex-row  my-10  items-center text-md  md:text-xl px-3 md:px-10 bg-slate-800 text-white py-10'>
      <article className="md:w-[80%] px-3  mx-auto  z-20 ">
          {Affiliate.map((texts, index) => (
            <section className='flex flex-col gap-2 font-semibold w-full md:text-lg' key={index}>
              <h1 className="text-4xl md:text-6xl tracking-wider">
                {texts.heading}
              </h1>
              <p>{texts.text}</p>
            </section>
          ))}
        </article>
          <span className='flex flex-col items-center text-yellow-400 my-5'>
            <h1 className=' text-6xl md:text-8xl font-extrabold'>
              10%.
            </h1>
            <p>
            Referral Commission
            </p>
          </span>
      </section>
    </main>
  );
}

export default SubLandingPage;
