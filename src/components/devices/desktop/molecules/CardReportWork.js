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
  const IconName = () => {
    if (name === 'WFH') {
      return (
        <HomeIcon className="w-12 h-12 lg:w-14 lg:h-14 text-apps-pink rounded-full bg-apps-pink bg-opacity-10 p-2 lg:p-3 " />
      );
    } else if (name === 'WFO') {
      return (
        <OfficeBuildingIcon className="w-12 h-12 lg:w-14 lg:h-14 text-apps-green rounded-full bg-apps-green bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'Satelit') {
      return (
        <GlobeIcon className="w-12 h-12 lg:w-14 lg:h-14 text-apps-purple rounded-full bg-apps-purple bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'Done') {
      return (
        <ClipboardCheckIcon className="w-12 h-12 lg:w-14 lg:h-14 text-apps-green rounded-full bg-apps-green bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'Progress') {
      return (
        <ClipboardListIcon className="w-12 h-12 lg:w-14 lg:h-14 text-yellow-400 rounded-full bg-yellow-100  p-2 lg:p-3" />
      );
    } else if (name === 'Lembur') {
      return (
        <ClockIcon className="w-12 h-12 lg:w-14 lg:h-14 text-apps-primary rounded-full bg-apps-primary bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'Reject') {
      return (
        <XCircleIcon className="w-12 h-12 lg:w-14 lg:h-14 text-apps-red rounded-full bg-apps-red bg-opacity-10 p-2 lg:p-3" />
      );
    } else {
      return (
        <ClockIcon className="w-12 h-12 lg:w-14 lg:h-14 text-apps-primary rounded-full bg-apps-primary bg-opacity-10 p-2 lg:p-3" />
      );
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85 }}
      className={`flex flex-none flex-col rounded-lg w-2/3 lg:w-full p-4 bg-white`}>
      <div className="flex justify-between">
        <div>
          <p className="font-semibold leading-none text-gray-500 capitalize">
            {name}
          </p>
          <p className="text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-5">
            {day}
          </p>
          <p className="mt-3 text-gray-400 dark:text-gray-400 text-sm lg:text-base tracking-normal font-normal leading-5 capitalize">
            {status ? status : 'Karyawan'}
          </p>
        </div>
        <IconName />
      </div>
    </motion.div>
  );
}
