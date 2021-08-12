import {
  ClipboardCheckIcon,
  GlobeIcon,
  ClipboardListIcon,
  ClockIcon,
  HomeIcon,
  OfficeBuildingIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { motion } from 'framer-motion';

export default function CardReportWork({ day, name, status }) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const IconName = () => {
    if (name === 'WFH') {
      return (
        <HomeIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-pink rounded-full bg-apps-pink bg-opacity-10 p-2 lg:p-3 " />
      );
    } else if (name === 'WFO') {
      return (
        <OfficeBuildingIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-green rounded-full bg-apps-green bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'Satelit') {
      return (
        <GlobeIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-purple rounded-full bg-apps-purple bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'Done') {
      return (
        <ClipboardCheckIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-green rounded-full bg-apps-green bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'Progress') {
      return (
        <ClipboardListIcon className="w-10 h-10 lg:w-14 lg:h-14 text-yellow-400 rounded-full bg-yellow-100  p-2 lg:p-3" />
      );
    } else if (name === 'Lembur') {
      return (
        <ClockIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-primary rounded-full bg-apps-primary bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'Reject') {
      return (
        <XCircleIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-red rounded-full bg-apps-red bg-opacity-10 p-2 lg:p-3" />
      );
    } else {
      return (
        <ClockIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-primary rounded-full bg-apps-primary bg-opacity-10 p-2 lg:p-3" />
      );
    }
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-none flex-col rounded-lg w-2/3 lg:w-full p-4 bg-gradient-to-br from-transparent via-gray-50 to-white transform group hover:scale-105 hover:shadow-lg motion-reduce:transform-none transition-all duration-300 ease-in-out`}>
      <div className="flex justify-between">
        <div>
          <p className="text-base lg:text-xl font-medium leading-none text-gray-500 uppercase">
            {name}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-5">
            {day}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base tracking-normal font-normal leading-5 capitalize">
            {status ? status : 'Krayawan'}
          </p>
        </div>
        <IconName />
      </div>
      <div className="flex flex-col">
        <div className="mt-2.5">
          <div className="w-full h-1 bg-gray-200 rounded-full">
            <div className="w-1/3 h-1 bg-apps-primary rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
