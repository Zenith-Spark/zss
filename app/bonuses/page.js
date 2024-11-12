'use client';

import React, { useState } from 'react';
import { RoadMapYearOne, RoadMapYearTwo, RoadMapYearThree } from '../components/resuables/index/index';
import RoadmapBg from '../../public/img/roadmap1.webp';
import RoadmapBg2 from '../../public/img/roadmap2.webp';
import RoadmapBg3 from '../../public/img/roadmap3.webp';

const Roadmap = () => {
  const [selectedYear, setSelectedYear] = useState('Year One');

  const getRoadmapContent = () => {
    switch (selectedYear) {
      case 'Year One':
        return RoadMapYearOne;
      case 'Year Two':
        return RoadMapYearTwo;
      case 'Year Three':
        return RoadMapYearThree;
      default:
        return [];
    }
  };

  const roadmapContent = getRoadmapContent();
  const title = roadmapContent[0]?.title || '';

  // Dynamically select the background image based on the selected year
  let backgroundImage;
  switch (selectedYear) {
    case 'Year One':
      backgroundImage = RoadmapBg;
      break;
    case 'Year Two':
      backgroundImage = RoadmapBg2;
      break;
    case 'Year Three':
      backgroundImage = RoadmapBg3;
      break;
    default:
      backgroundImage = RoadmapBg;
  }

  return (
    <div 
    // style={{
    //   backgroundImage: `url(${backgroundImage.src})`,
    //   backgroundPosition: 'center',
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat',
    //   minHeight: '100vh' // Make sure the background covers the full height
    // }}
    >
      <main className="max-w-7xl mx-auto px-4 h-auto pb-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Our Roadmap</h1>
        
        <div className="flex justify-center mb-8 space-x-4">
          {['Year One', 'Year Two', 'Year Three'].map((year, index) => (
            <button
              key={index}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-3 rounded-lg font-semibold focus:outline-none transition-colors duration-300 ${
                selectedYear === year
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="shadow-lg p-8 rounded-xl bg-slate-800 opacity-90 text-white">
          {title && <h2 className="text-2xl font-bold mb-4 ">{title}</h2>}
          <ul className="list-disc list-inside space-y-8 text-lg">
            {roadmapContent.slice(1).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Roadmap;
