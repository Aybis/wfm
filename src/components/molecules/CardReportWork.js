import { GlobeIcon } from '@heroicons/react/outline';
import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClockIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
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
        <HomeIcon className="w-9 h-9 text-apps-pink rounded-lg bg-apps-pink bg-opacity-10 p-2" />
      );
    } else if (name === 'WFO') {
      return (
        <OfficeBuildingIcon className="w-10 h-10 text-apps-orange rounded-lg bg-apps-orange bg-opacity-10 p-2" />
      );
    } else if (name === 'Satelit') {
      return (
        <GlobeIcon className="w-10 h-10 text-apps-purple rounded-lg bg-apps-purple bg-opacity-10 p-2" />
      );
    } else if (name === 'Done') {
      return (
        <ClipboardCheckIcon className="w-10 h-10 text-apps-green rounded-lg bg-apps-green bg-opacity-10 p-2" />
      );
    } else if (name === 'Progress') {
      return (
        <ClipboardListIcon className="w-10 h-10 text-apps-orange rounded-lg bg-apps-orange bg-opacity-10 p-2" />
      );
    } else {
      return (
        <ClockIcon className="w-10 h-10 text-apps-primary rounded-lg bg-apps-primary bg-opacity-10 p-2" />
      );
    }
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-none flex-col rounded-xl w-2/5 sm:w-auto gap-4 p-4 bg-white`}>
      <div className="flex flex-col items-start gap-4">
        <IconName />
        <div className="flex flex-col">
          <h4 className="font-semibold text-apps-text capitalize text-sm">
            {name}
          </h4>
          <h6 className="text-apps-text text-opacity-40 text-xs font-medium">
            {day} {name === 'Lembur' ? 'Hours' : 'Days'}
          </h6>
        </div>
      </div>
    </motion.div>
  );
}
