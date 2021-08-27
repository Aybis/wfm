import { ChevronDownIcon, LightningBoltIcon } from '@heroicons/react/outline';
import React from 'react';

export default function CardBarUpFormAbsensi({ isUp, handlerUp, type }) {
  return (
    <div
      className="flex justify-between text-gray-700 bg-apps-yellow  px-4 py-2 rounded-t-xl z-10"
      onClick={handlerUp}>
      <div className="inline-flex">
        <LightningBoltIcon className="h-5 w-5" />
        <h4 className="text-sm ml-2 capitalize">Check {type}</h4>
      </div>

      <ChevronDownIcon
        className={`mr-2 h-6 w-6 transform transition-all duration-500 rounded-full  ${
          !isUp ? 'rotate-180 ' : 'rotate-0 animate-bounce'
        }`}
      />
    </div>
  );
}
