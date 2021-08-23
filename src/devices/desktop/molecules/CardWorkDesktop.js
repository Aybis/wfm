import React from 'react';
import {
  ClockIcon,
  GlobeAltIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';

export default function CardWorkDesktop(props) {
  let nameOfKehadiran;
  if (props.data.kehadiran === 'WFH') {
    nameOfKehadiran = 'At Home';
  } else if (props.data.kehadiran === 'WFO') {
    nameOfKehadiran = 'At Office';
  } else if (props.data.kehadiran === 'Satelit') {
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
    if (props.data.kehadiran === 'WFH') {
      return <HomeIcon className="h-16 w-16  p-2 rounded-lg bg-gray-100" />;
    } else if (props.data.kehadiran === 'WFO') {
      return (
        <OfficeBuildingIcon className="h-16 w-16  p-2 rounded-lg bg-gray-100" />
      );
    } else if (props.data.kehadiran === 'Satelit') {
      return <GlobeAltIcon className="h-16 w-16  p-2 rounded-lg bg-gray-100" />;
    } else {
      return <ClockIcon className="h-16 w-16  p-2 rounded-lg bg-gray-100" />;
    }
  };

  return (
    <motion.div
      variants={item}
      className="flex justify-center items-center gap-4 text-coolGray-700 p-2">
      <ShowIconDaily />
      <div className="flex flex-col text-left">
        <h2 className="text-lg font-medium text-gray-500">
          {props.data ? convertDate('day', props.data.created_at) : ''}
        </h2>
        <h1 className="text-lg font-semibold text-gray-800">
          Work {nameOfKehadiran}
        </h1>
      </div>
    </motion.div>
  );
}
