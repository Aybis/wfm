import { ClockIcon } from '@heroicons/react/outline';
import {
  GlobeAltIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import React from 'react';

const CardDaily = ({ day, timeIn, timeOut, type }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const ShowIconDaily = () => {
    if (type === 'WFH') {
      return (
        <HomeIcon className="h-10 w-10 lg:h-12 lg:w-12 rounded-md p-2 fill-current text-apps-pink bg-apps-pink bg-opacity-10 " />
      );
    } else if (type === 'WFO') {
      return (
        <OfficeBuildingIcon className="h-10 w-10 lg:h-12 lg:w-12 rounded-md p-2 fill-current text-apps-orange bg-apps-orange bg-opacity-10" />
      );
    } else if (type === 'Satelit') {
      return (
        <GlobeAltIcon className="h-10 w-10 lg:h-12 lg:w-12 rounded-md p-2 fill-current text-apps-purple bg-apps-purple bg-opacity-10" />
      );
    } else {
      return (
        <ClockIcon className="h-10 w-10 lg:h-12 lg:w-12 rounded-md p-2 fill-current text-apps-primary bg-apps-primary bg-opacity-10" />
      );
    }
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-none flex-col rounded-xl w-2/5 sm:w-auto gap-4 p-4 bg-white`}>
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <ShowIconDaily />
        <div className="flex flex-col">
          <h3
            className={`font-semibold text-apps-text lg:text-lg ${
              type === 'satelit' ? 'capitalize' : 'uppercase'
            }`}>
            {type}
          </h3>
          <h3 className={` text-apps-text text-sm lg:text-base`}>{day}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default CardDaily;
