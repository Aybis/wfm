import {
  ClockIcon,
  LoginIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React from 'react';

export default function TableWithoutHeader({
  locIn,
  timeIn,
  photoIn = null,
  kehadiran,
  locOut,
  timeOut,
  kondisi,
}) {
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
      whileHover={{ scale: 1.02, shadow: 'shadow-md' }}
      className="mx-4 my-2 transition-all duration-300 ease-in-out flex border-2 border-gray-200 rounded-lg divide-x-2 divide-opacity-20 justify-between p-4">
      {/* <!--         presensi  --> */}
      <div className="flex justify-between gap-4 w-3/5 pr-4">
        <div className="flex gap-4 w-2/5">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-gray-800 group-hover:text-white">
              HOME
            </h4>
            <h6 className=" text-sm font-medium text-gray-400 group-hover:text-gray-100">
              {locIn}
            </h6>
          </div>

          <div className="flex flex-col gap-2 justify-center text-right">
            <h4 className="text-sm text-gray-400 group-hover:text-gray-100">
              {getDateFullOnly(dateIn)}
            </h4>
            <h6 className="text-sm font-semibold text-gray-800 group-hover:text-white">
              {getTimeOnly(dateIn)}
            </h6>
          </div>
        </div>

        <div className="flex items-center justify-start text-indigo-600 group-hover:text-white w-12">
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
              {timeOut ? getDateFullOnly(dateOut) : 'On Duty'}
            </h4>
            <h6 className="text-sm font-semibold text-gray-800 group-hover:text-white">
              {timeOut ? getTimeOnly(dateOut) : 'On Duty'}
            </h6>
          </div>
          <div
            className={`${
              timeOut ? '' : 'flex-1'
            } flex flex-col gap-2 text-right`}>
            <h4 className="font-bold text-gray-800 group-hover:text-white">
              {kehadiran}
            </h4>
            <h6 className=" text-sm font-medium text-gray-400 group-hover:text-gray-100">
              {locOut ? locOut : 'On Duty'}
            </h6>
          </div>
        </div>
      </div>
      {/* <!--         time work --> */}
      <div className="grid grid-cols-2 xl:grid-cols-4 content-center place-items-center gap-4 w-1/5 mx-4 pl-4 ">
        <div className="flex flex-col text-center">
          <h5 className="font-semibold text-gray-800 group-hover:text-white ">
            07:14
          </h5>
          <h5 className="text-sm font-semibold text-indigo-400 group-hover:text-gray-300">
            IN
          </h5>
        </div>
        <div className="flex flex-col text-center">
          <h5 className="font-semibold text-gray-800 group-hover:text-white ">
            20:24
          </h5>
          <h5 className="text-sm font-semibold text-indigo-400 group-hover:text-gray-300">
            OUT
          </h5>
        </div>
        <div className="flex flex-col text-center">
          <h5 className="font-semibold text-gray-800 group-hover:text-white ">
            8:00
          </h5>
          <h5 className="text-sm font-semibold text-indigo-400 group-hover:text-gray-300">
            WRK
          </h5>
        </div>
        <div className="flex flex-col text-center">
          <h5 className="font-semibold text-gray-800 group-hover:text-white">
            3:24
          </h5>
          <h5 className="text-sm font-semibold text-indigo-400 group-hover:text-gray-300">
            OVT
          </h5>
        </div>
      </div>

      {/* <!--         status  --> */}
      <div className="grid grid-cols-1  2xl:grid-cols-2 gap-4 w-1/5 pl-4">
        <div className="flex items-center gap-2">
          <UserIcon className="h-6 w-6 text-indigo-400 group-hover:text-gray-300" />

          <h4 className="text-gray-800 group-hover:text-white font-semibold">
            {kondisi}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <LoginIcon className="h-6 w-6 text-indigo-400 group-hover:text-gray-300" />

          <h4 className="text-gray-800 group-hover:text-white font-semibold">
            On Time
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-6 w-6 text-indigo-400 group-hover:text-gray-300" />
          <h4 className="text-gray-800 group-hover:text-white font-semibold">
            13h 24m
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <LogoutIcon className="h-6 w-6 text-indigo-400 group-hover:text-gray-300" />
          <h4 className="text-gray-800 group-hover:text-white font-semibold">
            Overtime
          </h4>
        </div>
      </div>
    </motion.div>
  );
}
