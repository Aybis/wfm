import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isCheckIn,
  messagePresence,
  statusPresence,
} from 'store/actions/presence';

export default function CardDay() {
  const presence = useSelector((state) => state.presence);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  let dateIn = new Date(presence.dataIn.jam);
  let dateOut = new Date(presence.dataOut.jam);

  const getTimeOnly = (date) => {
    return (
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      (date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`)
    );
  };

  const getDataPresenceToday = () => {
    dispatch(statusPresence('loading'));
    absensi
      .dailyPersonal(users?.id)
      .then((res) => {
        if (res.status === 200 && Object.entries(presence.data).length === 0) {
          dispatch(isCheckIn(res.data));
        }
        dispatch(statusPresence('ok'));
      })
      .catch((err) => {
        dispatch(messagePresence(err?.response?.data?.message ?? 'error'));
      });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getDataPresenceToday();
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return users && presence.status === 'ok' ? (
    Object.entries(presence.data).length > 0 ? (
      <motion.div
        variants={item}
        className={`flex flex-col w-full gap-4 bg-white rounded-xl mt-4 `}>
        <div className={`flex gap-4  w-full p-4 h-auto `}>
          {/* in */}
          <div className="flex flex-col gap-2 justify-start w-1/3">
            <h2 className="font-bold text-apps-primary text-lg">IN</h2>
            <h3 className="text-sm lg:text-base font-normal text-gray-500">
              {presence.dataIn.lokasi}
            </h3>
            <h3 className="text-sm lg:text-base font-semibold mt-2 text-gray-700">
              {getTimeOnly(dateIn)}
            </h3>
          </div>
          {/* icon */}
          <div className="flex items-center justify-center w-1/3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-apps-primary text-opacity-40 "
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
            <h2 className="font-bold text-apps-primary text-lg">
              {presence.data.kehadiran}
            </h2>
            <h3 className={`text-sm lg:text-base text-gray-500`}>
              {presence.dataOut.jam ? presence.dataOut.lokasi : 'On Duty'}
            </h3>
            <h4
              className={`text-sm lg:text-base font-semibold mt-2 text-gray-700 `}>
              {presence.dataOut.jam ? getTimeOnly(dateOut) : 'On Duty'}
            </h4>
          </div>
        </div>
      </motion.div>
    ) : (
      <></>
    )
  ) : (
    <motion.div
      variants={item}
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
