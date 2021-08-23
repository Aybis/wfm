import { ClockIcon } from '@heroicons/react/outline';
import {
  GlobeAltIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import React from 'react';

export default function CardWorkMobile({ kehadiran, date, url = '/' }) {
  let nameOfKehadiran;
  if (kehadiran === 'WFH') {
    nameOfKehadiran = 'At Home';
  } else if (kehadiran === 'WFO') {
    nameOfKehadiran = 'At Office';
  } else if (kehadiran === 'Satelit') {
    nameOfKehadiran = 'At Satelit';
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
    } else {
      return (
        <ClockIcon className="h-10 w-10 p-2 text-apps-primary bg-apps-primary bg-opacity-20 rounded-md" />
      );
    }
  };
  return (
    <motion.div
      variants={item}
      className={`flex items-center gap-4 flex-none bg-white rounded-md p-3 w-2/3`}>
      <ShowIconDaily />
      <div className="flex flex-col items-start justify-center ">
        <h2 className="text-gray-400 text-sm">
          {date ? convertDate('day', date) : ''}
        </h2>
        <h2 className="font-semibold text-gray-700 tracking-wide">
          {nameOfKehadiran}
        </h2>
      </div>
    </motion.div>
  );
}
