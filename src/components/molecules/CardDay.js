import React from 'react';
import { motion } from 'framer-motion';

export default function CardDay({
  type,
  locIn,
  locOut,
  timeIn,
  timeOut,
  border = false,
  date,
}) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    year: 'numeric',
  };

  let dateIn = new Date(timeIn);
  let dateOut = new Date(timeOut);

  const getTimeOnly = (date) => {
    return (
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      (date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`)
    );
  };

  const getDateFullOnly = (date) => {
    return date.toLocaleDateString('en-En', options);
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-col w-full gap-4 bg-white rounded-xl mt-4 ${
        border && 'border border-gray-100'
      }`}>
      {date && (
        <div className=" mx-auto text-center -mt-3">
          <h4 className="p-2 bg-indigo-600 text-white font-medium max-w-lg text-sm rounded-md mx-auto ">
            {getDateFullOnly(dateIn)}
          </h4>
        </div>
      )}
      <div className={`flex gap-4  w-full p-4 h-auto ${date && '-mt-6'}`}>
        {/* in */}
        <div className="flex flex-col gap-2 justify-start w-1/3">
          <h2 className="font-bold text-indigo-600 text-lg">IN</h2>
          <h3 className="text-sm lg:text-base font-normal text-gray-500">
            {locIn}
          </h3>
          <h3 className="text-sm lg:text-base font-semibold mt-2 text-gray-500">
            {getTimeOnly(dateIn)}
          </h3>
        </div>
        {/* icon */}
        <div className="flex items-center justify-center w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-indigo-600 text-opacity-40 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        {/* out  */}

        <div className="flex flex-col gap-2 text-right w-1/3 justify-between">
          <h2 className="font-bold text-indigo-600 text-lg">{type}</h2>
          <h3 className={`text-sm lg:text-base text-gray-500`}>
            {timeOut ? locOut : 'On Duty'}
          </h3>
          <h4
            className={`text-sm lg:text-base font-semibold mt-2 text-gray-500 `}>
            {timeOut ? getTimeOnly(dateOut) : 'On Duty'}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}
