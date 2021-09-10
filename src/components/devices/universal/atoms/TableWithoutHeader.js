import {
  ArchiveIcon,
  LoginIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import React from 'react';

export default function TableWithoutHeader({
  locIn,
  timeIn,
  photoIn = null,
  kehadiran,
  locOut,
  timeOut,
  kondisi,
  is_shift,
  keterangan,
  status,
}) {
  let masukPagi = 8.15;
  let masukSiang = 11.15;
  let masukMalam = 21.15;
  let keteranganAbsensi = 'On Time';
  let colorClock = 'text-apps-primary';
  let reportTimeOut = 'Disiplin';

  if (is_shift <= 1 && convertDate('hoursMinutes', timeIn) > masukPagi) {
    keteranganAbsensi = 'Terlambat';
    colorClock = 'text-red-500';
    reportTimeOut = 'Tidak Disiplin';
  } else if (
    is_shift === 2 &&
    convertDate('hoursMinutes', timeIn) > masukSiang
  ) {
    keteranganAbsensi = 'Terlambat';
    reportTimeOut = 'Tidak Disiplin';
    colorClock = 'text-red-500';
  } else if (
    is_shift === 3 &&
    convertDate('hoursMinutes', timeIn) > masukMalam
  ) {
    keteranganAbsensi = 'Terlambat';
    reportTimeOut = 'Tidak Disiplin';
    colorClock = 'text-red-500';
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.85 }}
      variants={item}
      className="bg-white mx-4 hover:shadow-lg my-2 transition-all duration-300 ease-in-out flex border-2 border-gray-100 rounded-lg divide-x-2 divide-opacity-20 justify-between p-4">
      {/* <!--         presensi  --> */}
      <div className="flex justify-between gap-4 w-4/5 pr-4">
        <div className="flex gap-4 w-2/5">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-gray-800 group-hover:text-white text-lg">
              HOME
            </h4>
            <h6 className=" text-sm font-medium text-gray-400 group-hover:text-gray-100">
              {locIn}
            </h6>
            {keterangan && (
              <p className="text-sm text-red-500 font-medium">{keterangan}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 justify-center text-right">
            <h4 className="text-sm text-gray-400 group-hover:text-gray-100">
              {convertDate('fullDayMonthYear', timeIn)}
            </h4>
            <h6 className="text-sm font-semibold text-gray-800 group-hover:text-white">
              {convertDate('fullTime', timeIn)}
            </h6>
          </div>
        </div>

        <div className="flex items-center justify-start text-apps-primary group-hover:text-white w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mt-4 -ml-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>

        <div className="flex gap-4 w-2/5 text-left">
          <div className="flex flex-col gap-2 justify-center">
            <h4 className="text-sm text-gray-400 group-hover:text-gray-100">
              {timeOut ? convertDate('fullDayMonthYear', timeOut) : 'On Duty'}
            </h4>
            <h6 className="text-sm font-semibold text-gray-800 group-hover:text-white">
              {timeOut ? convertDate('fullTime', timeOut) : 'On Duty'}
            </h6>
          </div>
          <div
            className={`${
              locOut ? '' : 'flex-1'
            } flex flex-col gap-2 text-right w-full`}>
            <h4 className="font-bold text-gray-800 group-hover:text-white text-lg">
              {kehadiran}
            </h4>
            <p>{''}</p>
            <h6 className=" text-sm font-medium text-gray-400 group-hover:text-gray-100">
              {status === 'Normal'
                ? locOut
                  ? locOut
                  : 'On Duty'
                : reportTimeOut}
            </h6>
          </div>
        </div>
      </div>

      {/* <!--         status  --> */}
      <div className="grid grid-cols-2 gap-4 w-1/5 pl-2">
        <div className="flex items-center gap-2">
          <UserIcon className="h-6 w-6 text-apps-primary group-hover:text-gray-300" />
          <h4 className="text-gray-600 group-hover:text-white font-medium">
            {kondisi}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <LoginIcon
            className={`h-6 w-6 ${colorClock} group-hover:text-gray-300`}
          />
          <h4 className="text-gray-600 group-hover:text-white font-medium">
            {keteranganAbsensi}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <ArchiveIcon
            className={`h-6 w-6  group-hover:text-gray-300 ${colorClock}`}
          />
          <h4 className="text-gray-600 group-hover:text-white font-medium">
            {reportTimeOut}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <LogoutIcon
            className={`h-6 w-6 ${
              status === 'Normal' ? 'text-apps-primary' : 'text-red-500'
            } group-hover:text-gray-300`}
          />
          <h4 className="text-gray-600 capitalize group-hover:text-white font-medium">
            {status}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}
