'use client';

import React, { useState } from 'react';
import { RoadMapYearOne, RoadMapYearTwo, RoadMapYearThree } from '../components/resuables/index/index';

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

  return (
    <main className="max-w-7xl mx-auto px-4 h-auto">
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

      <div className="shadow-lg rounded-lg p-8">
        {title && <h2 className="text-2xl font-semibold mb-4 text-yellow-600">{title}</h2>}
        <ul className="list-disc list-inside space-y-4 text-lg">
          {roadmapContent.slice(1).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Roadmap;
