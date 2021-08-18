import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  isCheckIn,
  messagePresence,
  statusPresence,
} from 'store/actions/presence';

export default function CardPresence() {
  const presence = useSelector((state) => state.presence);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  let btnClass = 'bg-blue-400';
  let name = '';
  let status;
  let link;

  if (Object.entries(presence.data).length === 0) {
    status = null;
    link = `/check-in`;
    btnClass = 'bg-apps-blue';
    name = 'Check In';
  } else if (Object.entries(presence.dataOut).length === 0) {
    status = 'in';
    link = `/check-out/${presence.data.id}`;
    btnClass = 'bg-gradient-to-br from-pink-600 to-red-500';
    name = 'Check Out';
  } else if (Object.entries(presence.dataOut).length > 0) {
    status = 'out';
    btnClass = 'bg-apps-blue';
    name = 'Check In';
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
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
  }, [users]);

  return users && presence.status === 'ok' ? (
    isMobile ? (
      <motion.div
        variants={item}
        className={`flex flex-col gap-2 py-4 px-6 rounded-lg mt-4 items-center bg-white transition-all duration-300 ease-in-out lg:hidden ${
          status === 'out' &&
          'bg-gradient-to-br from-lightBlue-400 to-indigo-500'
        }`}>
        {status !== 'out' ? (
          <h4 className="font-semibold text-gray-800">
            Let's go to {status ? 'work' : 'home'}
          </h4>
        ) : (
          <h4 className="font-semibold text-lg text-white tracking-wide">
            <span className="block text-center">
              Anda Sudah Presensi Hari Ini.
            </span>
            <span className="block text-center">Terima kasih.</span>
          </h4>
        )}
        {status !== 'out' && (
          <Link
            to={{
              pathname: link,
              state: users,
            }}
            className={`p-2 w-full rounded-lg text-white font-semibold text-center  ${btnClass}`}>
            <span className=" text-lg">{name}</span>
          </Link>
        )}

        <h4
          className={`${
            status === 'out' ? 'text-gray-100' : 'text-gray-800'
          } text-center tracking-wide `}>
          Budayakan disiplin presensi dari sekarang!
        </h4>
      </motion.div>
    ) : (
      <motion.div
        variants={item}
        className={`${
          status === 'out' &&
          'bg-gradient-to-br from-lightBlue-400 to-indigo-500 mt-8'
        } flex items-center justify-center lg:gap-32 transition-all duration-300 ease-in-out rounded-lg`}>
        <div className="flex flex-col justify-center items-start p-4 mt-12">
          {status !== 'out' ? (
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-800">
              <span className="block">Boost your productivity.</span>
              <span className="block mt-2">Start using Almuazaf today.</span>
            </h2>
          ) : (
            <h2
              className={`text-5xl font-bold tracking-tight ${
                status !== 'out' ? 'text-gray-800' : 'text-white'
              }`}>
              <span className="block">Anda Sudah Presensi Hari Ini.</span>
              <span className="block mt-2">Terima kasih.</span>
            </h2>
          )}

          <h4
            className={`mt-5 text-2xl ${
              status !== 'out' ? 'text-gray-800' : 'text-white'
            }`}>
            Budayakan disiplin presensi dari sekarang!
          </h4>
          {status !== 'out' && (
            <Link
              className={`mt-10 inline-flex rounded-lg text-white py-3 px-6 font-bold items-center justify-center ${btnClass} transform hover:scale-110 motion-reduce:transform-none duration-300`}
              to={{
                pathname: link,
                state: users,
              }}>
              <span className=" text-lg">{name}</span>
            </Link>
          )}
          <div className="mt-12 hidden grid-cols-3 gap-4 bg-white py-2 px-4 rounded-lg w-full shadow-sm ">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-semibold text-gray-800">IN</h4>
              <p className="text-sm font-medium text-apps-gray">
                Perumahan Bintang Alam Blok G4 no 10,
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-semibold text-gray-800">WFH</h4>
              <p className="text-sm font-medium text-apps-gray">
                Perumahan Bintang Alam Blok G4 no 10,
              </p>
            </div>
            <div className="flex p-2 justify-end items-center pl-6">
              {status !== 'out' && (
                <Link
                  className={` inline-flex rounded-lg text-white py-3 px-6 font-bold w-full items-center justify-center ${btnClass} transform hover:scale-110 motion-reduce:transform-none duration-300`}
                  to={{
                    pathname: link,
                    state: users,
                  }}>
                  <span className=" text-lg">{name}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/svg/Saly-10.svg`}
          loading="lazy"
          alt="logo"
          className="h-96 -mt-16 transition-all duration-500 ease-in-out"
        />
      </motion.div>
    )
  ) : (
    <div className="bg-white shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
    </div>
  );
}
