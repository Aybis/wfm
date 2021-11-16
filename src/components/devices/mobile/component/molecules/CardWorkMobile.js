import { ClockIcon, PencilAltIcon } from '@heroicons/react/outline';
import {
  GlobeAltIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import React from 'react';

export default function CardWorkMobile({
  kehadiran,
  kondisi = null,
  date,
  timeIn,
  timeOut,
  url = '/',
}) {
  let nameOfKehadiran;
  if (kehadiran === 'WFH') {
    nameOfKehadiran = 'At Home';
  } else if (kehadiran === 'WFO') {
    nameOfKehadiran = 'At Office';
  } else if (kehadiran === 'Satelit') {
    nameOfKehadiran = 'At Satelit';
  } else if (kondisi !== null) {
    nameOfKehadiran = kondisi;
  } else {
    nameOfKehadiran = 'Day Off';
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const ShowIconDaily = () => {
    if (kehadiran === 'WFH') {
      nameOfKehadiran = 'At Home';
      return (
        <HomeIcon className="h-10 w-10 p-2 rounded-md text-apps-primary bg-apps-primary bg-opacity-20" />
      );
    } else if (kehadiran === 'WFO') {
      return (
        <OfficeBuildingIcon className="h-10 w-10 p-2 text-apps-green bg-apps-green bg-opacity-20 rounded-md" />
      );
    } else if (kehadiran === 'Satelit') {
      nameOfKehadiran = 'At Satelit';

      return (
        <GlobeAltIcon className="h-10 w-10 p-2 text-apps-orange bg-apps-orange bg-opacity-20 rounded-md" />
      );
    } else if (kondisi !== null) {
      nameOfKehadiran = kondisi;

      return (
        <PencilAltIcon className="h-10 w-10 p-2 text-yellow-500 bg-yellow-400 bg-opacity-20 rounded-md" />
      );
    } else {
      return (
        <ClockIcon className="h-10 w-10 p-2 text-apps-primary bg-apps-primary bg-opacity-20 rounded-md" />
      );
    }
  };
  return (
    <motion.div
      variants={item}
      className={`relative flex-none bg-white rounded-lg p-3 w-40`}>
      <div
        className={[
          'absolute top-2 right-2 p-1 rounded-md bg-opacity-20',
          kehadiran === 'WFH' && 'text-apps-primary bg-apps-primary',
          kehadiran === 'WFO' && 'text-apps-green bg-apps-green',
        ].join(' ')}>
        <h2 className="font-medium text-gray-600 text-xs">{nameOfKehadiran}</h2>
      </div>
      <div className="flex flex-col items-start justify-center ">
        <ShowIconDaily />
        <h2 className="text-gray-800 font-semibold text-sm mt-1">
          {date ? convertDate('day', date) : ''}
        </h2>

        <div className="flex flex-col gap-1 mt-4 w-full">
          <div className="flex justify-between">
            <p className="text-xs font-light text-gray-400">Check In</p>
            <p className="text-xs font-medium text-gray-600 text-right">
              {convertDate('timeAm', timeIn)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs font-light text-gray-400">Check Out</p>
            <p className="text-xs font-medium text-gray-600 text-right">
              {timeOut ? convertDate('timeAm', timeOut) : 'On Duty'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
