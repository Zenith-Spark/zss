'use client';
import React, { useState } from 'react';

const ToggleMenu = ({ Click }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleFuncs = () => {
    handleClick(); // Toggles the state
    if (Click) {
      Click(); // Executes the passed function if provided
    }
  };

  return (
    <div
      className={`toggle w-8 h-8 rounded-md shadow-md flex items-center justify-center cursor-pointer relative overflow-hidden ${isActive ? 'activate' : ''}`}
      onClick={handleFuncs}
    >
      <span
        className={`line-toggle absolute block w-5 h-0.5 bg-white rounded-md transition-all duration-500 transform ${isActive ? 'translate-y-0 translate-x-0 rotate-45 w-6 h-[2px] bg-customAmber delay-100' : 'translate-y-[-12px] translate-x-[-5px] w-6'}`}
      ></span>
      <span
        className={`line-toggle absolute block w-6 h-0.5 bg-white rounded-md transition-all duration-500 ${isActive ? 'translate-x-10 opacity-0' : ''}`}
      ></span>
      <span
        className={`line-toggle absolute block w-4 h-0.5 bg-white rounded-md transition-all duration-500 transform ${isActive ? 'translate-y-0 translate-x-0 rotate-[314deg] w-6 h-[2px] bg-customAmber delay-100' : 'translate-y-[12px] translate-x-[-5px] w-4'}`}
      ></span>
    </div>
  );
};

export default ToggleMenu;
