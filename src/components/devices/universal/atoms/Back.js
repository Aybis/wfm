/** @format */

import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

export default function Back({ link, inputClassName }) {
  return (
    <button
      onClick={link}
      className={[
        'bg-white rounded-lg text-gray-800 shadow-md hover:bg-gray-200 transition-all duration-300 ease-in-out',
        inputClassName,
      ].join(' ')}>
      <ChevronLeftIcon className="h-9 w-9 p-1 lg:h-12 lg:w-12 lg:p-2 " />
    </button>
  );
}
