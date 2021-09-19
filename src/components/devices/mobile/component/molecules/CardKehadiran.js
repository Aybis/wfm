import SetMaps from 'components/devices/universal/atoms/SetMaps';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CardDoneAbsen from './CardDoneAbsen';
import CardLoading from './CardLoading';

export default function CardKehadiran({ type }) {
  const ABSEN = useSelector((state) => state.presence);
  const USER = useSelector((state) => state.users);

  const dateNow = convertDate('dateOnly');
  let link;
  let belumAbsen;
  let isCheckIn;
  let isCheckOut;

  if (Object.entries(ABSEN.data).length === 0) {
    belumAbsen = true;
    link = `/check-in`;
  } else {
    if (ABSEN.dataOut.jam) {
      if (convertDate('dateOnly', ABSEN.dataIn.jam) !== dateNow) {
        link = `/check-in`;
        belumAbsen = true;
      } else {
        isCheckOut = true;
      }
    } else if (ABSEN.dataIn.jam) {
      isCheckIn = true;
      link = `/check-out/${ABSEN.data.id}`;
    }
  }

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

          <div className="rounded-b-md grid grid-cols-3 gap-4 bg-white justify-between py-3 px-4 z-10 -mt-5">
            <div className="flex flex-col gap-1">
              <h4 className="text-sm text-gray-400">Current</h4>
              <h4 className={`text-sm font-semibold text-gray-700`}>
                {belumAbsen && 'Belum Absen'}
                {isCheckIn && ABSEN?.data?.kehadiran}
              </h4>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm text-gray-400">Status</h4>
              <span
                className={`text-sm font-medium tracking-wide rounded-md text-green-500`}>
                Available
              </span>
            </div>
            {type !== 'lemburan' && (
              <div className="flex justify-center items-end text-sm ">
                <Link
                  to={{
                    pathname: link,
                    state: USER,
                  }}
                  className={`p-2 text-white font-medium rounded w-full text-center transition-all duration-300 ease-in-out ${
                    belumAbsen
                      ? 'bg-apps-primary active:bg-sky-700'
                      : 'bg-red-600 active:bg-red-700'
                  }`}>
                  {belumAbsen && 'Check In'}
                  {isCheckIn && 'Check Out'}
                </Link>
              </div>
            )}
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
