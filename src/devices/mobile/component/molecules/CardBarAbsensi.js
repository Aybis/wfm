import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import React from 'react';
import CardRealTime from './CardRealTime';

export default function CardBarAbsensi({ link }) {
  return (
    <motion.div
      initial={{
        top: -50,
        opacity: 0,
      }}
      animate={{
        top: 20,
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
      className="absolute top-6 inset-x-0 z-20 px-3">
      <div className="bg-gray-800 backdrop-filter backdrop-blur-md bg-opacity-60 shadow-xl h-16 py-2 px-4 rounded-2xl grid grid-cols-4 w-full place-content-center">
        <div className="flex justify-start items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={link}
            className="active:bg-gray-500 bg-transparent rounded-lg">
            <ArrowNarrowLeftIcon className="h-10 w-10 text-white rounded p-1" />
          </motion.button>
        </div>
        <CardRealTime moreClass="col-span-2" />
        <div className="flex justify-center items-center w-full"></div>
      </div>
    </motion.div>
  );
}
