'use client';
import React from 'react';

export const ButtonOne = ({ buttonValue, iconValue, IconButton, Button, Clicked }) => (
  <button
    onClick={Clicked}
    className={`
      flex items-center justify-center 
       bg-yellow-600 transition
      ${IconButton ? 'w-9 h-9 rounded-full' : 'py-2 px-4'} 
      active:translate-x-4
    `}
  >
    {iconValue && (
      <span className="flex items-center justify-center w-full h-full">
        {iconValue}
      </span>
    )}
    {buttonValue && <span className="ml-2">{buttonValue}</span>}
  </button>
);
