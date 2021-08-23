import { ChevronRightIcon } from '@heroicons/react/outline';
import SetMaps from 'components/atoms/SetMaps';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CardDoneAbsen from './CardDoneAbsen';

export default function CardKehadiran() {
  const ABSEN = useSelector((state) => state.presence);
  const USER = useSelector((state) => state.users);
  let status;
  let link;
  let current;

  if (Object.entries(ABSEN.data).length === 0) {
    status = true;
    link = `/check-in`;
    current = 'Home';
  } else if (Object.entries(ABSEN.dataOut).length === 0) {
    status = true;
    link = `/check-out/${ABSEN.data.id}`;
    current = ABSEN.data.kehadiran;
  } else if (Object.entries(ABSEN.dataOut).length > 0) {
    status = false;
  }

  const sendAddress = (value) => {
    return value;
  };

  const sendLonglat = (value) => {
    return value;
  };

  const variants = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  return USER && ABSEN.status === 'ok' ? (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative grid grid-cols-1 rounded-md mb-8 mt-8 shadow-lg">
      {status ? (
        <>
          <SetMaps
            height="100%"
            className="relative h-28 lg:h-64 rounded-t-lg z-0 shadow-md"
            sendAddress={sendAddress}
            sendlongLat={sendLonglat}
            showButton={false}
          />

          <div className="rounded-b-md flex bg-white justify-between py-3 px-4 z-10 -mt-5">
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-light text-gray-400">Current</h4>
              <h4 className="text-sm font-semibold text-gray-800">{current}</h4>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-light text-gray-400">Status</h4>
              <span
                className={`text-sm font-medium tracking-wide rounded-md  ${
                  status ? 'text-green-500' : 'text-red-500'
                }`}>
                {status ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div className="flex justify-center items-center text-xs lg:text-sm">
              <Link
                to={{
                  pathname: link,
                  state: USER,
                }}
                className="ml-7">
                <button
                  className={`p-2 text-white rounded hidden lg:block ${
                    status ? 'bg-apps-primary' : 'bg-apps-red'
                  }`}>
                  {status ? 'Check In' : 'Check Out'}
                </button>
                <ChevronRightIcon
                  className={`h-8 w-8 bg-opacity-10 p-1 rounded lg:hidden ${
                    status
                      ? ' text-apps-primary   bg-apps-primary'
                      : ' text-red-600   bg-red-600'
                  }`}
                />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <CardDoneAbsen />
      )}
    </motion.div>
  ) : (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="bg-white shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-apps-primary h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-apps-primary rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-apps-primary rounded"></div>
            <div className="h-4 bg-apps-primary rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
