import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

export default function ButtonBackAbsensi({ link, popUp }) {
  return (
    <button
      onClick={link}
      className="absolute z-10 left-4 rounded-lg bg-white transition-all duration-500 hover:bg-gray-200 ease-in-out"
      style={{ top: `${popUp ? '44%' : '11%'}` }}>
      <ChevronLeftIcon className="h-9 w-9 rounded p-1" />
    </button>
  );
}
