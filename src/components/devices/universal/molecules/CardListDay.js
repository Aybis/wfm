import React from 'react';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';

export default function CardListDay({
  locIn,
  timeIn,
  photoIn = null,
  type,
  locOut,
  timeOut,
  kondisi,
  is_shift,
  keterangan,
  status,
  border,
}) {
  let masukPagi = 8.15;
  let masukSiang = 11.15;
  let masukMalam = 21.15;
  let colorClock = 'text-apps-primary';
  let disiplin = true;
  let reportTimeOut = 'Disiplin';

  if (is_shift <= 1 && convertDate('hoursMinutes', timeIn) >= masukPagi) {
    colorClock = 'text-red-500';
    reportTimeOut = 'Tidak Disiplin';
    disiplin = false;
  } else if (
    is_shift === 2 &&
    convertDate('hoursMinutes', timeIn) >= masukSiang
  ) {
    reportTimeOut = 'Tidak Disiplin';
    colorClock = 'text-red-500';
    disiplin = false;
  } else if (
    is_shift === 3 &&
    convertDate('hoursMinutes', timeIn) >= masukMalam
  ) {
    reportTimeOut = 'Tidak Disiplin';
    colorClock = 'text-red-500';
    disiplin = false;
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-col w-full gap-4 bg-white rounded-xl mt-4 ${
        border && 'border border-gray-100'
      }`}>
      {timeIn && (
        <div className=" mx-auto text-center -mt-3">
          <h4 className="p-2 bg-apps-primary text-white font-medium max-w-lg text-sm rounded-md mx-auto ">
            {convertDate('fullDayMonthYear', timeIn)}
          </h4>
        </div>
      )}
      <div className={`flex gap-4  w-full p-4 h-auto ${timeIn && '-mt-6'}`}>
        {/* in */}
        <div className="flex flex-col gap-2 justify-start w-1/3">
          <h2 className="font-bold text-apps-primary text-lg">IN</h2>
          <h3 className="text-sm lg:text-base font-normal text-gray-500">
            {locIn}
          </h3>
          <h3 className="text-sm lg:text-base font-semibold mt-2 text-gray-700">
            {convertDate('fullTime', timeIn)}
          </h3>
        </div>
        {/* icon */}
        <div className="flex items-center justify-center w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-10 w-10 ${colorClock} text-opacity-40`}
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
          <h2 className="font-bold text-apps-primary text-lg">{type}</h2>
          <h3 className={`text-sm lg:text-base text-gray-500`}>
            {status === 'Normal'
              ? locOut
                ? locOut
                : 'On Duty'
              : reportTimeOut}
          </h3>
          <h4
            className={`text-sm lg:text-base font-semibold mt-2 text-gray-700 `}>
            {timeOut ? convertDate('fullTime', timeOut) : 'On Duty'}
          </h4>
        </div>
      </div>
      {!disiplin && (
        <div className="bg-gray-50 rounded-b-lg flex w-full justify-center items-center p-2 font-medium text-sm text-red-500">
          {keterangan ?? reportTimeOut}
        </div>
      )}
    </motion.div>
  );
}
