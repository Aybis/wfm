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
        <ClipboardCheckIcon className="w-10 h-10 lg:h-14 lg:w-14 text-apps-primary rounded-lg bg-apps-primary bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'telat') {
      return (
        <ExclamationCircleIcon className="w-10 h-10 lg:h-14 lg:w-14 text-apps-orange rounded-lg bg-apps-orange bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'sakit') {
      return (
        <BeakerIcon className="w-10 h-10 lg:h-14 lg:w-14 text-apps-orange rounded-lg bg-apps-orange bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'izin') {
      return (
        <ArchiveIcon className="w-10 h-10 lg:h-14 lg:w-14 text-apps-purple rounded-lg bg-apps-purple bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'cuti') {
      return (
        <PhoneMissedCallIcon className="w-10 h-10 lg:h-14 lg:w-14 text-apps-pink rounded-lg bg-apps-pink bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'sppd') {
      return (
        <BriefcaseIcon className="w-10 h-10 lg:h-14 lg:w-14 text-apps-green rounded-lg bg-apps-green bg-opacity-10 p-2 lg:p-3" />
      );
    } else if (name === 'tidak absen') {
      return (
        <BriefcaseIcon className="w-10 h-10 lg:h-14 lg:w-14 text-apps-red rounded-lg bg-apps-red bg-opacity-10 p-2 lg:p-3" />
      );
    } else {
      return (
        <ClipboardCheckIcon className="w-8 h-8 lg:h-14 lg:w-14 text-apps-primary rounded-lg bg-apps-primary bg-opacity-10 p-4 " />
      );
    }
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-none flex-col rounded-md w-1/2 sm:w-1/3 lg:w-auto  gap-4 p-4 bg-white shadow-md`}>
      <div className="flex justify-between">
        <div>
          <p className="text-base md:text-lg font-medium leading-none text-gray-500 capitalize">
            {name}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-5">
            {hari}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base tracking-normal font-normal leading-5 capitalize">
            Karyawan
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
