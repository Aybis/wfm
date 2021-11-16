import { ChevronRightIcon } from '@heroicons/react/outline';
import SetMaps from 'components/devices/universal/atoms/SetMaps';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CardDoneAbsen from './CardDoneAbsen';
import CardLoading from './CardLoading';

export default function CardKehadiranLemburan() {
  const ABSEN = useSelector((state) => state.presence);
  const USER = useSelector((state) => state.users);
  let isCheckOut;

  const sendAddress = (value) => {
    return value;
  };

  const sendLonglat = (value) => {
    return value;
  };

  return USER ? (
    <motion.div className="relative grid grid-cols-1 rounded-md mb-8 mt-8 shadow-lg">
      {!isCheckOut ? (
        <>
          <SetMaps
            height="100%"
            className="relative h-28 lg:h-64 rounded-t-lg z-0 shadow-md border-2 border-gray-300"
            sendAddress={sendAddress}
            sendlongLat={sendLonglat}
            showButton={false}
          />

          <div className="rounded-b-md grid grid-cols-4 gap-2 bg-white justify-between py-3 px-4 z-10 -mt-5">
            <div className="flex flex-col gap-1">
              <h4 className="text-xs text-gray-400 font-light">Current</h4>
              <h4 className={`text-xs font-semibold text-gray-700`}>
                {ABSEN.data.kehadiran === 'WFO' && 'At Office'}
                {ABSEN.data.kehadiran === 'WFH' && 'At Home'}
              </h4>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <h4 className="text-xs text-gray-400 font-light">Status</h4>
              {ABSEN.data.kehadiran === 'WFO' && (
                <span
                  className={`text-xs font-medium tracking-wide rounded-md text-green-500`}>
                  Available
                </span>
              )}
              {ABSEN.data.kehadiran === 'WFH' && (
                <span
                  className={`text-xs font-medium tracking-wide rounded-md text-red-500`}>
                  Not Available
                </span>
              )}
            </div>
            <Link
              to="/overtime-in"
              className="flex justify-center items-center text-sm ">
              <ChevronRightIcon className="h-7 w-7 lg:h-8 lg:w-8 bg-apps-primary bg-opacity-10 text-apps-primary group-hover:bg-gray-100 group-hover:bg-opacity-30 group-hover:text-white p-1 rounded" />
            </Link>
          </div>
        </>
      ) : (
        <CardDoneAbsen />
      )}
    </motion.div>
  ) : (
    <CardLoading />
  );
}
