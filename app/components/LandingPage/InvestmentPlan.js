import React, { useState, useRef, useEffect } from 'react';
import { ComponayDocs, CP, howToEarn, investmentOptions, Plans } from '../resuables/index';
import ManBG from '../../../public/img/man1.webp';
import ManBGTwo from '../../../public/img/image.png';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonOne } from '../resuables/Buttons/Buttons';
import { ArrowRight, ArrowRightCircle } from 'lucide-react';
import BGTwo from '../../../public/img/building1.webp';
import BGThree from '../../../public/img/building2.webp';
import InvestmentCalculator from '../profitcalculator/InvestmentCalculator';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { FaEthereum } from 'react-icons/fa';

const InvestmentPlan = () => {
  const [showMore, setShowMore] = useState(false);
  const scrollRef = useRef(null); // Reference for the scroll container
  const [dotSize, setDotSize] = useState({ left: 'w-6 h-6', right: 'w-4 h-4' }); // Set left dot bigger initially

  // Function to limit the number of words in firstText
  const getLimitedText = (text) => {
    const words = text.split(' ');
    return words.length > 20 && !showMore ? words.slice(0, 20).join(' ') + '...' : text;
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
      setDotSize({ left: 'w-6 h-6', right: 'w-4 h-4' }); // Increase size of left dot
      resetDotSizes(); // Reset after a delay
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
      setDotSize({ left: 'w-4 h-4', right: 'w-6 h-6' }); // Increase size of right dot
      resetDotSizes(); // Reset after a delay
    }
  };

  const resetDotSizes = () => {
    setTimeout(() => {
      setDotSize({ left: 'w-4 h-4', right: 'w-4 h-4' }); // Reset dot sizes
    }, 300); // Adjust the delay as needed
  };

  // Effect to track scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

        // Determine scroll direction and set dot sizes
        if (scrollLeft > 0 && scrollLeft < maxScrollLeft) {
          if (scrollLeft > previousScrollLeft.current) {
            setDotSize({ left: 'w-4 h-4', right: 'w-6 h-6' }); // Scrolling right
          } else {
            setDotSize({ left: 'w-6 h-6', right: 'w-4 h-4' }); // Scrolling left
          }
        }

        previousScrollLeft.current = scrollLeft; // Update previous scroll position
      }
    };

    const previousScrollLeft = { current: 0 }; // Track the previous scroll position
    scrollRef.current.addEventListener('scroll', handleScroll); // Add scroll event listener

    // Clean up the event listener on unmount
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <main className="w-full py-12 overflow-hidden">

    <section className="w-[80%]  h-[80dvh] flex flex-col md:flex-row mx-auto mb-10 justify-evenly items-center text-xl">
      <div className="w-full md:w-1/2 overflow-hidden flex flex-col gap-y-3">
        <h1 className="text-5xl font-extrabold capitalize">
          {investmentOptions.header}
        </h1>
        <h1 className="text-5xl font-extrabold capitalize mb-5">
          {investmentOptions.header2}
        </h1>
        <span className="my-4">
          {investmentOptions.text}
        </span>
        <ul className="list-disc list-inside flex flex-col gap-8">
          {investmentOptions.features.map((feature, index) => (
            <li key={index} className="mb-2">
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/3 h-full hidden md:flex items-center justify-center relative text-slate-800">
            <span className="absolute w-24 h-24 top-0 left-0 flex flex-col items-center justify-center bg-white rounded-xl z-10 -translate-x-1/2 -translate-y-1/2">
            <span className='text-5xl'>
              <IoCheckmarkCircle/>
            </span>
            <span className='text-sm font-bold'>
              Invesment <br/> Successful
            </span>
            </span>
            <span className="absolute w-1/2 h-10 bottom-28 right-0 translate-x-10 bg-white rounded-full z-20 flex items-center justify-between px-3">
            <span className='w-5 h-5 flex '>
              <Image src={ManBGTwo} alt='man bg 2' className='rounded-full scale-150' />
            </span>
            <span className='text-xs'>
              Greg Invested In Ethereum
            </span>
            </span>
            <span className="absolute w-1/2 h-16 bottom-10 right-0 translate-x-20 bg-white rounded-xl z-20 flex flex-row gap-x-2 px-3 items-center justify-between">
            <span className='p-2 rounded-full bg-blue-500 flex items-center justify-center text-white text-center text-sm'>
            <FaEthereum/>
            </span>
            <span className='font-bold'>
              0.345 ETH
            </span>
            </span>
            <Image src={ManBG} alt="Flexibility in investment" className="object-cover rounded-2xl z-0" />
          </div>
    </section>


      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Our Investment Plans
        </h1>
        <div className="relative w-full">
          <div className='overflow-x-auto scrollbar-none' ref={scrollRef}>
            <div className="flex xl:gap-x-10 md:gap-x-5 lg:gap-x-7">
              {Plans.map((plan, index) => (
                <div
                  key={index}
                  className="min-w-[300px] md:min-w-[350px] mx-2 bg-white shadow-lg rounded-lg p-6 flex-shrink-0"
                >
                  <ul className="flex flex-col justify-evenly items-center text-center gap-4">
                    <li className="text-yellow-600 font-bold text-xl md:text-2xl">{plan.title}</li>
                    <li className="text-gray-800 text-4xl md:text-5xl font-extrabold mb-4">{plan.heading}</li>
                    <li className="text-gray-600 text-lg">
                      <span className="font-semibold">Interval: </span> {plan.interval}
                    </li>
                    <li className="text-gray-600 text-lg">
                      <span className="font-semibold">Min: </span> {plan.min}
                    </li>
                    <li className="text-gray-600 text-lg">
                      <span className="font-semibold">Max: </span> {plan.max}
                    </li>
                    <li className="text-yellow-600 text-xl font-bold">{plan.cr}</li>
                  </ul>
                </div>
              ))}
            </div>
            {/* Slider controls */}
          </div>
          <div className=" top-0 left-0 z-30 flex items-center justify-center h-full gap-x-4 my-5">
            <button onClick={handlePrev} className='cursor-pointer transition hover:scale-105'>
              <div className={`${dotSize.left} rounded-full border bg-yellow-400 border-none`}></div>
            </button>
            <button onClick={handleNext} className='cursor-pointer transition  hover:scale-105'>
              <div className={`${dotSize.right} rounded-full border bg-yellow-400 border-none`}></div>
            </button>
          </div>
        </div>
      </div>

        <InvestmentCalculator/>

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
     
    </main>
  );
}

export default InvestmentPlan;
