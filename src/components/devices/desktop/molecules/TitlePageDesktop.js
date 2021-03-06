import { ArrowSmLeftIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React from 'react';

export default function TitlePageDesktop({ link, title }) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-4 place-content-center p-2">
      <div className="flex items-center">
        <button
          onClick={link}
          className="bg-white rounded-lg text-gray-800 shadow-md">
          <ArrowSmLeftIcon className="h-10 w-10 p-1" />
        </button>
      </div>
      <div className="flex col-span-2 justify-center items-center">
        <h1 className="text-gray-800 text-4xl  font-bold uppercase">{title}</h1>
      </div>
      <div></div>
    </motion.div>
  );
}
