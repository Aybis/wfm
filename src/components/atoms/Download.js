/** @format */

import { DownloadIcon } from '@heroicons/react/outline';
import React from 'react';

export default function Download({ onClick }) {
  return (
    <button
      className="flex flex-col items-center justify-center rounded bg-apps-primary p-1"
      onClick={onClick}>
      <DownloadIcon className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
    </button>
  );
}
