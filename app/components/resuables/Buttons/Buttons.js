'use client';
import React from 'react';

export const ButtonOne = ({ buttonValue, iconValue, IconButton, Clicked }) => (
  <button
    onClick={Clicked}
    className={`flex items-center justify-center text-sm transition-all duration-300 cursor-pointer shadow-md active:translate-y-1 ${
      IconButton
        ? 'w-9 h-9 rounded-full bg-yellow-400 text-white border border-yellow-400'
        : 'py-2 px-4 rounded-lg bg-yellow-400 text-white border border-yellow-400'
    } hover:bg-transparent hover:text-yellow-400`}
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
        ? 'w-9 h-9 rounded-full border border-yellow-400 text-yellow-400 bg-transparent'
        : 'py-2 px-4 rounded-lg border border-yellow-400 text-yellow-400 bg-transparent'
    } hover:bg-yellow-400 hover:text-white`}
  >
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span className="ml-2">{iconValue}</span>}
  </button>
);
