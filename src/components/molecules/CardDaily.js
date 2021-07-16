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
    if (type === 'wfh') {
      return (
        <HomeIcon className="h-10 w-10 rounded-md p-2 fill-current text-apps-pink bg-apps-pink bg-opacity-10 " />
      );
    }
    if (type === 'wfo') {
      return (
        <OfficeBuildingIcon className="h-10 w-10 rounded-md p-2 fill-current text-apps-orange bg-apps-orange bg-opacity-10" />
      );
    }
    if (type === 'satelit') {
      return (
        <GlobeAltIcon className="h-10 w-10 rounded-md p-2 fill-current text-apps-purple bg-apps-purple bg-opacity-10" />
      );
    }
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-none flex-col rounded-lg w-2/6 lg:w-1/6 gap-4 lg:gap-12 p-4 bg-white`}>
      <div className="flex flex-col items-start gap-4">
        <ShowIconDaily />
        <div className="flex flex-col">
          <h3
            className={`font-semibold text-apps-text ${
              type === 'satelit' ? 'capitalize' : 'uppercase'
            }`}>
            {type}
          </h3>
          <h3 className={` text-apps-text text-sm`}>{day}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default CardDaily;
