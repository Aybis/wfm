import React from 'react';
import Back from '../atoms/Back';

export default function CardTitlePage({ goBack, title }) {
  return (
    <div className="grid place-content-center grid-cols-4 text-center py-2 ">
      <div className="flex col-span-1 justify-start">
        <Back className="h-16 w-16" link={goBack} />
      </div>
      <div className="flex justify-center  items-center col-span-2">
        <h1 className="text-lg lg:text-2xl font-semibold text-gray-800 tracking-wide uppercase">
          {title}
        </h1>
      </div>
      <div className="p-2 col-span-1"></div>
    </div>
  );
}
