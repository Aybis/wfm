import {
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

export default function CardOvertimeApproval({
  name,
  title,
  date,
  hours,
  status,
}) {
  let classStatus = 'bg-apps-yellow text-gray-700';
  let valueStatus = 'On Progress';

  if (status === 'progress') {
    classStatus = 'bg-apps-yellow text-gray-700';
    valueStatus = 'On Progress';
  }

  if (status === 'done') {
    classStatus = 'bg-apps-green text-white';
    valueStatus = 'Approved';
  }

  if (status === 'reject') {
    classStatus = 'bg-apps-red text-white';
    valueStatus = 'Rejected';
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div variants={item}>
      <Link
        to="/details"
        aria-label="detail lembur"
        className=" flex justify-between p-4 lg:px-6 rounded-lg lg:flex-col h-auto bg-gradient-to-br from-white hover:from-coolGray-400 hover:via-coolGray-100 hover:to-coolGray-50 hover:shadow-lg transition-all duration-500 ease-in-out bg-size-200 bg-pos-0 hover:bg-pos-100">
        <div className="flex flex-col gap-3 lg:mt-3 w-3/5 lg:w-full lg:h-32 lg:gap-4 lg:my-2">
          <h1 className="text-sm group-hover:text-white lg:text-base font-medium text-gray-700 capitalize max-h-24">
            {title}
          </h1>
          <div className="flex flex-col gap-2 lg:gap-2">
            {name && (
              <h4 className="text-xs group-hover:text-white text-gray-400 lg:text-sm flex gap-2 items-center">
                <UserIcon className="h-4 w-4 lg:h-5 lg:w-5 " />
                {name}
              </h4>
            )}
            <h4 className="text-xs group-hover:text-white text-gray-400 lg:text-sm flex gap-2">
              <CalendarIcon className="h-4 w-4 lg:h-5 lg:w-5" />
              {date}
            </h4>
            <h4 className="text-xs group-hover:text-white text-gray-600 font-medium lg:text-sm flex gap-2">
              <ClockIcon className="h-4 w-4 lg:h-5 lg:w-5 " />
              {hours} Hrs
            </h4>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end gap-2 w-2/5 lg:hidden">
          <h4
            className={`p-1 rounded text-center text-xs ${classStatus} capitalize font-medium`}>
            {valueStatus}
          </h4>
          <ChevronRightIcon className="h-7 w-7 lg:h-8 lg:w-8 bg-apps-primary bg-opacity-10 text-apps-primary group-hover:bg-gray-100 group-hover:bg-opacity-30 group-hover:text-white p-1 rounded" />
        </div>
        <div className="hidden lg:block border border-gray-200 mx-8 my-4"></div>

        <div className="hidden lg:flex lg:justify-between ">
          <div className="flex flex-col gap-1">
            <p className="group-hover:text-gray-100 lg:text-sm text-apps-gray font-medium">
              Status
            </p>
            <h4
              className={`px-4 py-2 capitalize rounded text-center text-xs ${classStatus} lg:text-sm tracking-wider font-medium`}>
              {valueStatus}
            </h4>
          </div>
          <div className="flex flex-col gap-1">
            <p className="group-hover:text-gray-100 lg:text-sm text-apps-gray font-medium">
              Position
            </p>
            <h4
              className={`rounded text-center text-xs group-hover:text-white font-medium text-gray-700 lg:text-sm`}>
              Nia Ramadhani
            </h4>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
