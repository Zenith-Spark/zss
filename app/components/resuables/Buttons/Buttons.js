'use client';
import React from 'react';

export const ButtonOne = ({ buttonValue, iconValue, IconButton, Clicked }) => (
  <button
    onClick={Clicked}
    className={`flex items-center justify-center text-sm transition-all duration-300 cursor-pointer shadow-md active:translate-y-1 ${
      IconButton
        ? 'w-9 h-9 rounded-full bg-orange-400 text-white border border-orange-400'
        : 'py-2 px-4 rounded-lg bg-orange-400 text-white border border-orange-400'
    } hover:bg-transparent hover:text-orange-400`}
  >
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span className="ml-2">{iconValue}</span>}
  </button>
);

export const ButtonTwo = ({ buttonValue, iconValue, IconButton, Clicked }) => (
  <button
    onClick={Clicked}
    className={`flex items-center justify-center text-sm transition-all duration-300 cursor-pointer shadow-md active:translate-y-1 ${
      IconButton
        ? 'w-9 h-9 rounded-full border border-orange-400 text-orange-400 bg-transparent'
        : 'py-2 px-4 rounded-lg border border-orange-400 text-orange-400 bg-transparent'
    } hover:bg-orange-400 hover:text-white`}
  >
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span className="ml-2">{iconValue}</span>}
  </button>
);
export const DBButtonOne = ({ buttonValue, iconValue, IconButton, Clicked }) => (
  <button
    onClick={Clicked}
    className={`flex items-center justify-center text-sm transition-all duration-300 cursor-pointer shadow-md active:translate-y-1 ${
      IconButton
        ? 'w-9 h-9 rounded-full bg-blue-600 text-white border border-blue-600'
        : 'py-2 px-4 rounded-lg bg-blue-600 text-white border border-blue-600'
    } hover:bg-transparent hover:text-blue-600`}
  >
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span className="ml-2">{iconValue}</span>}
  </button>
);

export const DBButtonTwo = ({ buttonValue, iconValue, IconButton, Clicked }) => (
  <button
    onClick={Clicked}
    className={`flex items-center justify-center text-sm transition-all duration-300 cursor-pointer shadow-md active:translate-y-1 ${
      IconButton
        ? 'w-9 h-9 rounded-full border border-blue-600 text-blue-600 bg-transparent'
        : 'py-2 px-4 rounded-lg border border-blue-600 text-blue-600 bg-transparent'
    } hover:bg-blue-600 hover:text-white`}
  >
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span className="ml-2">{iconValue}</span>}
  </button>
);
