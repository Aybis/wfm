import { ClockIcon, LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import React from 'react';

export default function CardTime({ title, time }) {
  const IconCardTime = () => {
    if (title === 'in') {
      return (
        <LoginIcon className="h-9 w-9 bg-apps-primary bg-opacity-10 text-apps-primary p-2 rounded" />
      );
    } else if (title === 'out') {
      return (
        <LogoutIcon className="h-9 w-9 text-apps-red bg-apps-red bg-opacity-10 p-2 rounded" />
      );
    } else {
      return (
        <ClockIcon className="h-9 w-9 bg-apps-green bg-opacity-10 text-apps-green p-2 rounded" />
      );
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <IconCardTime />

      <div className="flex flex-col text-sm">
        <h4 className="text-gray-400 text-sm lg:text-base tracking-wide uppercase">
          {title}
        </h4>
        <h6 className="text-xs lg:text-sm font-semibold text-gray-800">
          {time}
        </h6>
      </div>
    </div>
  );
}
