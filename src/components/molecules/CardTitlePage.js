import Back from 'components/atoms/Back';
import React from 'react';

export default function CardTitlePage({ goBack, title }) {
  return (
    <div className="grid grid-cols-3 text-center py-2 ">
      <div className="flex">
        <Back className="h-16 w-16" link={goBack} />
      </div>
      <div className="flex justify-center">
        <h1 className="text-2xl lg:text-4xl font-semibold text-gray-800 tracking-wide uppercase">
          {title}
        </h1>
      </div>
      <div className="p-2"></div>
    </div>
  );
}
