import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CardOvertime({
  date,
  title,
  hours,
  status,
  border = false,
}) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  let classStatus = 'bg-apps-pink text-white';
  let valueStatus = 'On Duty';
  let longTime = 'On Duty';

  if (status === 'leader') {
    classStatus = 'bg-apps-yellow text-apps-text';
    valueStatus = 'Progress';
  }
  if (status === 'done') {
    classStatus = 'bg-apps-green text-white';
    valueStatus = 'Approved';
  }

  if (hours) {
    longTime = `${hours} Hrs`;
  }

  return (
    <motion.div
      variants={item}
      className={`flex w-full justify-between bg-white p-4 mt-4 rounded-lg  ${
        border && 'border border-gray-200'
      }`}>
      <div className="flex flex-col gap-2 text-sm lg:text-base">
        <p className="text-apps-text">{date}</p>
        <h2 className="font-semibold text-apps-text">{title}</h2>
        <h3
          className={`font-semibold  ${
            hours ? 'text-apps-primary' : 'text-apps-pink'
          } `}>
          {longTime}
        </h3>
      </div>
      <div className="flex flex-col justify-between items-end gap-6 right-0">
        <h4
          className={`p-1 rounded text-center text-xs lg:text-base ${classStatus}`}>
          {valueStatus}
        </h4>

        <Link to="/details" className="ml-7" aria-label="detail">
          <ChevronRightIcon className="h-7 w-7 lg:h-9 lg:w-9 text-apps-primary bg-apps-primary bg-opacity-10 p-1 rounded" />
        </Link>
      </div>
    </motion.div>
  );
}
