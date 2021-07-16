/** @format */

import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

export default function Back({ link, inputClassName }) {
  return (
    <ChevronLeftIcon
      className={[
        'text-apps-text bg-white p-1 h-8 w-8 rounded-md cursor-pointer',
        inputClassName,
      ].join(' ')}
      onClick={link}
    />
  );
}
