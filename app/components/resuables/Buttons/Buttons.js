'use client';
import React from 'react';

export const ButtonOne = ({ buttonValue, iconValue, IconButton, Button, Clicked }) => (
  <button
    onClick={Clicked}
    className={`
      flex items-center justify-center text-white text-xs
       bg-yellow-600 hover:bg-transparent hover:text-yellow-600 hover:border border-yellow-600  transition  
      ${IconButton ? 'w-9 h-9 rounded-full' : 'py-2 px-4 rounded-2xl h-7'} 
      active:translate-x-4
    `}
  >
        {buttonValue && <span className="">{buttonValue}</span>}
    {iconValue && (
      <span className="flex items-center justify-center w-full h-full">
        {iconValue}
      </span>
    )}
  </button>
);




export const ButtonTwo = ({ buttonValue, iconValue, IconButton, Clicked }) => (
  <button
    onClick={Clicked}
    className={`
      flex items-center justify-center text-xs
      border border-yellow-600 text-yellow-600 transition 
      ${IconButton ? 'w-9 h-9 rounded-full' : 'py-2 px-4 rounded-2xl h-7'} 
      bg-transparent hover:bg-yellow-600 hover:text-white 
      active:translate-x-4
    `}
  >
        {buttonValue && <span className="">{buttonValue}</span>}
    {iconValue && (
      <span className="flex items-center justify-center w-full h-full">
        {iconValue}
      </span>
    )}
  </button>
);
