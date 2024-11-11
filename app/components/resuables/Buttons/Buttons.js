'use client';
import React from 'react';

export const ButtonOne = ({ buttonValue, iconValue, IconButton, Clicked, disabled }) => (
  <button
    disabled={disabled}
    onClick={Clicked}
    className={`flex items-center justify-center text-sm transition-all duration-300 cursor-pointer shadow-md active:translate-y-1 ${
      IconButton
        ? 'w-9 h-9 rounded-full bg-yellow-500 text-white border border-yellow-500'
        : 'py-2 px-4 rounded-full bg-yellow-500 text-white border border-yellow-500'
    } hover:bg-transparent hover:text-yellow-500 ${
      disabled ? 'opacity-50 cursor-not-allowed hover:bg-yellow-500 hover:text-white' : ''
    }`}
  >
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span className="ml-2">{iconValue}</span>}
  </button>
);

export const ButtonTwo = ({ buttonValue, iconValue, IconButton, Clicked, disabled }) => (
  <button
    disabled={disabled}
    onClick={Clicked}
    className={`flex items-center justify-center text-sm transition-all duration-300 cursor-pointer shadow-md active:translate-y-1 ${
      IconButton
        ? 'w-9 h-9 rounded-full border border-yellow-500 text-yellow-500 bg-transparent'
        : 'py-2 px-4 rounded-full border border-yellow-500 text-yellow-500 bg-transparent'
    } hover:bg-yellow-500 hover:text-white ${
      disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-yellow-500' : ''
    }`}
  >
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span className="ml-2">{iconValue}</span>}
  </button>
);

export const DBButtonOne = ({ buttonValue, iconValue, IconButton, Clicked, disabled }) => (
  <button
    disabled={disabled}
    type="submit"
    onClick={Clicked}
    className={`flex items-center justify-center text-sm transition-all duration-300 cursor-pointer shadow-md active:translate-y-1 ${
      IconButton
        ? 'w-9 h-9 rounded-full bg-blue-600 text-white border border-blue-600'
        : 'py-2 px-4 rounded-full bg-blue-600 text-white border border-blue-600'
    } hover:bg-transparent hover:text-blue-600 ${
      disabled ? 'opacity-50 cursor-not-allowed hover:bg-blue-600 hover:text-white' : ''
    }`}
  >
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span className="ml-2">{iconValue}</span>}
  </button>
);

export const DBButtonTwo = ({ buttonValue, iconValue, IconButton, Clicked, disabled }) => (
  <button
    disabled={disabled}
    onClick={Clicked}
    className={`flex items-center justify-center text-sm transition-all duration-300 cursor-pointer shadow-md active:translate-y-1 ${
      IconButton
        ? 'w-9 h-9 rounded-full border border-blue-600 text-blue-600 bg-transparent'
        : 'py-2 px-4 rounded-full border border-blue-600 text-blue-600 bg-transparent'
    } hover:bg-blue-600 hover:text-white ${
      disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-blue-600' : ''
    }`}
  >
    {buttonValue && <span>{buttonValue}</span>}
    {iconValue && <span className="ml-2">{iconValue}</span>}
  </button>
);
