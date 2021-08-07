import { ServerIcon } from '@heroicons/react/solid';
import React from 'react';

export default function CardUnit({ name, value }) {
  return (
    <div className="p-3 transform group hover:scale-105 motion-reduce:transform-none transition-all duration-300 ease-in-out">
      <div className="flex gap-4 bg-white rounded-md p-3 lg:h-28 lg:w-xs w-72 h-24 group-hover:shadow-lg transition-all duration-300 ease-in-out">
        <ServerIcon className="h-8 w-8 rounded text-indigo-600" />
        <div className="flex flex-col gap-1 flex-1">
          <h1 className="font-semibold text-gray-800">{name}</h1>
          <h2 className="font-normal text-gray-500">{value} Employee</h2>
        </div>
      </div>
    </div>
  );
}
