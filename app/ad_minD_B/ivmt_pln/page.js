// /pages/usr/invest/page.js
'use client';
import { Plans, adminDBSidebar } from '@assets/app/components/resuables/index';
import React from 'react';
import { PiGreaterThan } from 'react-icons/pi';

const Page = () => {
  
  return (
    <>
      <p className="flex flex-row gap-2 items-center text-lg  font-thin px-6 mb-14 translate-y-7">
              <span>{adminDBSidebar[2].icons}</span>
              <span><PiGreaterThan /></span>
              <span>{adminDBSidebar[2].name}</span>
            </p>
      <div className="flex justify-center flex-col py-8">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-8">
          {Plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem] flex-shrink-0"
            >
              <ul className="flex flex-col justify-evenly items-center text-center gap-4">
                <li className="text-yellow-600 font-bold text-xl md:text-2xl">{plan.title}</li>
                <li className="text-gray-800 text-4xl md:text-5xl font-extrabold mb-4">{plan.heading}</li>
                <li className="text-gray-600 text-lg">
                  <span className="font-semibold">Interval: </span> {plan.interval}
                </li>
                <li className="text-gray-600 text-lg">
                  <span className="font-semibold"> {plan.min}</span> 
                </li>
                <li className="text-gray-600 text-lg">
                <span className="font-semibold"> {plan.max}</span> 
                </li>
                <li className="text-yellow-600 text-xl font-bold">{plan.cr}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
