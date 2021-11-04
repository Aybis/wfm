import React from 'react';
import {
  ArchiveIcon,
  BeakerIcon,
  BriefcaseIcon,
  ClipboardCheckIcon,
  ExclamationCircleIcon,
  PhoneMissedCallIcon,
  GlobeIcon,
  ClipboardListIcon,
  ClockIcon,
  HomeIcon,
  OfficeBuildingIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { motion } from 'framer-motion';

const CardSummary = ({ name, value, type }) => {
  const IconName = () => {
    if (name === 'presensi') {
      return (
        <ClipboardCheckIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-primary rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'telat') {
      return (
        <ExclamationCircleIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-orange rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'sakit') {
      return (
        <BeakerIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-orange rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'izin') {
      return (
        <ArchiveIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-purple rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'cuti') {
      return (
        <PhoneMissedCallIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-pink rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'sppd') {
      return (
        <BriefcaseIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-green rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'tidak absen') {
      return (
        <BriefcaseIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-red rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'WFH') {
      return (
        <HomeIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-pink rounded-md bg-white p-2 lg:p-3 " />
      );
    } else if (name === 'WFO') {
      return (
        <OfficeBuildingIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-green rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'Satelit') {
      return (
        <GlobeIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-purple rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'Done') {
      return (
        <ClipboardCheckIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-green rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'Progress') {
      return (
        <ClipboardListIcon className="w-10 h-10 lg:w-14 lg:h-14 text-yellow-400 rounded-md bg-white:p-3" />
      );
    } else if (name === 'Lembur') {
      return (
        <ClockIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-primary rounded-md bg-white p-2 lg:p-3" />
      );
    } else if (name === 'Reject') {
      return (
        <XCircleIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-red rounded-md bg-white p-2 lg:p-3" />
      );
    } else {
      return (
        <ClipboardCheckIcon className="w-10 h-10 lg:h-16 lg:w-16 text-apps-primary rounded-md bg-white p-2 lg:p-3" />
      );
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex rounded-md gap-2">
      <IconName />
      <div className="flex flex-col ">
        <p className="text-sm font-light text-gray-500 capitalize">
          {name === 'sppd' ? 'SPPD' : name}
        </p>
        <h1 className="font-semibold text-gray-800">{value}</h1>
      </div>
    </motion.div>
  );
};

export default CardSummary;
