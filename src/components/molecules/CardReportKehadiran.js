import React from 'react';
import {
  ArchiveIcon,
  BeakerIcon,
  BriefcaseIcon,
  ClipboardCheckIcon,
  ExclamationCircleIcon,
  PhoneMissedCallIcon,
} from '@heroicons/react/outline';
import { motion } from 'framer-motion';

export default function CardReportKehadiran({ name, hari, value }) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const IconName = () => {
    if (name === 'presensi') {
      return (
        <ClipboardCheckIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-primary rounded-full bg-apps-primary bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'telat') {
      return (
        <ExclamationCircleIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-orange rounded-full bg-apps-orange bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'sakit') {
      return (
        <BeakerIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-orange rounded-full bg-apps-orange bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'izin') {
      return (
        <ArchiveIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-purple rounded-full bg-apps-purple bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'cuti') {
      return (
        <PhoneMissedCallIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-pink rounded-full bg-apps-pink bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'sppd') {
      return (
        <BriefcaseIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-green rounded-full bg-apps-green bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'tidak absen') {
      return (
        <BriefcaseIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-red rounded-full bg-apps-red bg-opacity-10 p-2 lg:p-3" />
      );
    } else {
      return (
        <ClipboardCheckIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-primary rounded-full bg-apps-primary bg-opacity-10 p-2 lg:p-3" />
      );
    }
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-none flex-col rounded-md w-1/2 lg:w-full gap-4 p-4 bg-gradient-to-br from-transparent via-gray-50 to-white transform group hover:scale-105 hover:shadow-lg motion-reduce:transform-none transition-all duration-300 ease-in-out`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-base md:text-lg font-medium leading-none text-gray-600 capitalize tracking-wide">
            {name === 'sppd' ? 'SPPD' : name}
          </p>
          <p className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-5">
            {hari}{' '}
            <small className="pl-1 text-gray-400 dark:text-gray-300 text-sm lg:text-base tracking-normal font-normal  capitalize">
              Hari
            </small>
          </p>
        </div>
        <IconName />
      </div>
    </motion.div>
  );
}
