import React, { useState, useRef } from 'react';
import { CP, howToEarn, Plans } from '../resuables/index';
import ManBG from '../../../public/img/man1.webp';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonOne } from '../resuables/Buttons/Buttons';
import { ArrowRight, ArrowLeft, ArrowRightCircle } from 'lucide-react';

const InvestmentPlan = () => {
  const [showMore, setShowMore] = useState(false);
  const scrollRef = useRef(null); // Reference for the scroll container

  // Function to limit the number of words in firstText
  const getLimitedText = (text) => {
    const words = text.split(' ');
    return words.length > 20 && !showMore ? words.slice(0, 20).join(' ') + '...' : text;
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full py-12 overflow-hidden">
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
             <button onClick={handlePrev} className='cursor-pointer focus:bg-yellow-400 hover:scale-105 w-4 h-4 rounded-full border bg-gray-600'></button>
             <button onClick={handleNext} className='cursor-pointer focus:bg-yellow-400 hover:scale-105 w-4 h-4 rounded-full border bg-gray-600'></button>
            </div>
        </div>
      </div>

      <section className='mx-auto flex flex-row gap-x-8 items-center pt-24 text-xl w-[80%] md:text-2xl md:justify-between'>
        <div className='hidden md:flex z-20 rounded-2xl h-[50dvh] w-1/2'>
          <Image src={ManBG} width={600} height={600} alt='Sub Landing Background' className='object-cover rounded-2xl shadow-2xl' />
        </div>
        <div className='z-20 w-full md:w-1/2'>
          {CP.map((texts, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <h3 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 dark:text-yellow-600 text-yellow-700'>
                {texts.title}
              </h3>
              <p>{getLimitedText(texts.firstText)}</p>
              <Link href={'/about'}>
                <div className='flex flex-row gap-4 items-center'>
                  <ButtonOne iconValue={<ArrowRightCircle />} buttonValue={'More'} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="w-[80%] mx-auto p-4 text-center my-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-yellow-600 font-bold mb-4">
          How to Earn with Us
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Our team is committed to upholding the highest standards in managing and growing your wealth. Three simple steps make you financially independent.
        </p>
      </div>

      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between border rounded-xl">
            {howToEarn.map((step, index) => (
              <div
                key={index}
                className="p-6 w-full md:w-[23%] transition-transform hover:scale-105"
              >
                <h1 className='text-3xl font-bold'>Step {step.No}</h1>
                <h3 className="text-yellow-600 text-2xl font-bold mb-4">{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default InvestmentPlan;
