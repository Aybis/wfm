/** @format */

import Back from 'components/atoms/Back';
import React from 'react';

export default function CardTitlePage({ goBack, title }) {
  return (
    <div className="flex justify-between items-center text-center py-2 ">
      <div className="flex">
        <Back className="h-16 w-16" link={goBack} />
      </div>
      <div className="flex">
        <h1 className="text-2xl font-semibold text-apps-text  uppercase">
          {title}
        </h1>
      </div>
      <div className="p-2"></div>
    </div>
  );
}
