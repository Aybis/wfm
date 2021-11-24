import { DocumentDownloadIcon } from '@heroicons/react/outline';
import { AdjustmentsIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import React from 'react';

export default function FilterGroupingLemburanDekstop() {
  return (
    <>
      <div className="flex flex-col gap-1 px-6 py-2">
        <label htmlFor="Status" className="text-gray-400 font-medium">
          Status
        </label>
        <select className="p-2 border-none text-gray-800 font-semibold focus:outline-none">
          <option value="progress">Progress</option>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="reject">Rejected</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 px-6 py-2">
        <label htmlFor="Status" className="text-gray-400 font-medium">
          Posisi
        </label>
        <select className="p-2 border-none text-gray-800 font-semibold">
          <option value="atasan">Atasan</option>
          <option value="all">All</option>
          <option value="hr">HR</option>
        </select>
      </div>
      <div className="grid grid-cols-3 divide-x-2 divide-gray-100 h-full w-full">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center items-center col-span-1 cursor-pointer group">
          <AdjustmentsIcon className="h-12 w-12 p-2 text-coolGray-600 group-hover:bg-coolGray-100 rounded" />
        </motion.div>
        <div className="flex col-span-2 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex gap-2 px-4 py-2 text-white bg-apps-primary transition-all duration-300 rounded-md hover:shadow-lg">
            <span>
              <DocumentDownloadIcon className="h-6 w-6" />
            </span>
            Download
          </motion.button>
        </div>
      </div>
    </>
  );
}
