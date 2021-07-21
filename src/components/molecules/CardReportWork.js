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

export default function CardReportWork({ day, name }) {
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
        <HomeIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-pink rounded-lg bg-apps-pink bg-opacity-10 p-2" />
      );
    } else if (name === 'WFO') {
      return (
        <OfficeBuildingIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-orange rounded-lg bg-apps-orange bg-opacity-10 p-2" />
      );
    } else if (name === 'Satelit') {
      return (
        <GlobeIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-purple rounded-lg bg-apps-purple bg-opacity-10 p-2" />
      );
    } else if (name === 'Done') {
      return (
        <ClipboardCheckIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-green rounded-lg bg-apps-green bg-opacity-10 p-2" />
      );
    } else if (name === 'Progress') {
      return (
        <ClipboardListIcon className="w-10 h-10 lg:w-14 lg:h-14 text-yellow-400 rounded-lg bg-yellow-100  p-2" />
      );
    } else if (name === 'Lembur') {
      return (
        <ClockIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-primary rounded-lg bg-apps-primary bg-opacity-10 p-2" />
      );
    } else if (name === 'Reject') {
      return (
        <XCircleIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-red rounded-lg bg-apps-red bg-opacity-10 p-2" />
      );
    } else {
      return (
        <ClockIcon className="w-10 h-10 lg:w-14 lg:h-14 text-apps-primary rounded-lg bg-apps-primary bg-opacity-10 p-2" />
      );
    }
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-none flex-col rounded-xl w-2/5 sm:w-auto gap-4 p-4 bg-white`}>
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <IconName />
        <div className="flex flex-col">
          <h4 className="font-semibold text-apps-text uppercase text-sm lg:text-lg">
            {name}
          </h4>
          <h6 className="text-apps-text text-opacity-40 text-xs font-medium lg:text-base">
            {day} {name === 'Lembur' ? 'Hours' : 'Document'}
          </h6>
        </div>
      </div>
    </motion.div>
  );
}
