import { ChevronRightIcon } from '@heroicons/react/solid';
import SetMaps from 'components/atoms/SetMaps';
import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { isDesktop } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  isCheckIn,
  messagePresence,
  statusPresence,
} from 'store/actions/presence';

export default function CardMapCheck() {
  const presence = useSelector((state) => state.presence);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  let status;
  let link;
  let current;

  if (Object.entries(presence.data).length === 0) {
    status = 'in';
    link = `/check-in`;
    current = 'Home';
  } else if (Object.entries(presence.dataOut).length === 0) {
    status = 'out';
    link = `/check-out/${presence.data.id}`;
    current = presence.data.kehadiran;
  } else if (Object.entries(presence.dataOut).length > 0) {
    status = 'in';
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
  }, [users, dispatch]);

  return users && presence.status === 'ok' ? (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative grid grid-cols-1 rounded-md mb-8 mt-8 ">
      <SetMaps
        height="100%"
        className="relative h-28 lg:h-64 rounded-t-lg z-0 shadow-md"
        sendAddress={sendAddress}
        sendlongLat={sendLonglat}
        showButton={false}
      />
      <div className="rounded-b-md flex bg-white justify-between py-3 px-4 z-10 -mt-5">
        <div className="flex flex-col gap-1">
          <h4 className="text-xs lg:text-sm font-medium text-apps-text text-opacity-40">
            Current
          </h4>
          <h4 className="text-xs lg:text-sm font-semibold text-apps-text">
            {current}
          </h4>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-xs lg:text-sm font-medium text-apps-text text-opacity-40">
            Status
          </h4>
          <span
            className={`text-xs lg:text-sm font-semibold rounded-md  ${
              status ? 'text-apps-green' : 'text-apps-red'
            }`}>
            {status ? 'Available' : 'Not Available'}
          </span>
        </div>
        {status ? (
          <div className="flex justify-center items-center text-xs lg:text-sm">
            {isDesktop ? (
              <p className="text-red-600 text-lg">Smartphone Only! </p>
            ) : (
              <Link
                to={{
                  pathname: link,
                  state: users,
                }}
                className="ml-7">
                <button
                  className={`p-2 text-white rounded hidden lg:block ${
                    status === 'in' ? '    bg-apps-primary' : '   bg-apps-red'
                  }`}>
                  {status === 'in' ? `'Check In'` : 'Check Out'}
                </button>
                <ChevronRightIcon
                  className={`h-8 w-8 bg-opacity-10 p-1 rounded lg:hidden ${
                    status === 'in'
                      ? ' text-apps-primary   bg-apps-primary'
                      : ' text-apps-red   bg-apps-red'
                  }`}
                />
              </Link>
            )}
          </div>
        ) : (
          <div className="w-16"></div>
        )}
      </div>
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
