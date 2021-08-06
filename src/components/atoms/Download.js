/** @format */

import { DownloadIcon } from '@heroicons/react/outline';
import React from 'react';

export default function Download({ onClick }) {
  return (
    <button
      className="flex gap-2 text-white items-center justify-center rounded bg-apps-primary bg-opacity-90 px-4 py-2 transition-all duration-300 ease-in-out hover:bg-apps-primary"
      onClick={onClick}>
      <DownloadIcon className="h-4 w-4 lg:h-6 lg:w-6 " />
      <p>Download</p>
    </button>
  );
}
