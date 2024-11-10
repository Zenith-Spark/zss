'use client'

import React, { useState } from 'react';
import { RoadMapYearOne, RoadMapYearTwo, RoadMapYearThree } from '../components/resuables/index/index';

const Roadmap = () => {
  const [selectedYear, setSelectedYear] = useState('Year One');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

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

  return (
    <main className="max-w-7xl mx-auto px-4 h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Our Roadmap</h1>
      <div className="flex justify-center mb-4">
        <select
          onChange={handleYearChange}
          className="border rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-slate-800"
        >
          <option value="Year One">Year 1</option>
          <option value="Year Two">Year 2</option>
          <option value="Year Three">Year 3</option>
        </select>
      </div>
      <div className=" shadow-lg rounded-lg p-6">
        <ul className="list-disc list-inside space-y-4 text-lg">
          {getRoadmapContent().map((item, index) => (
            <li key={index} className="">{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Roadmap;
