import { motion } from 'framer-motion';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

export default function CardPresence({
  status = null,
  link = null,
  state = null,
}) {
  let btnClass = 'bg-blue-400';
  let name = '';
  if (status === 'in') {
    btnClass = 'bg-gradient-to-br from-pink-600 to-red-500';
    name = 'Check Out';
  } else {
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

  return (
    <motion.div variants={item}>
      {isMobile ? (
        <div
          className={`flex flex-col gap-2 py-4 px-6 rounded-lg mt-4 items-center bg-white transition-all duration-300 ease-in-out lg:hidden`}>
          {status !== 'out' ? (
            <h4 className="font-semibold text-gray-800">
              Let's go to {status === null ? 'work' : 'home'}
            </h4>
          ) : (
            <h4 className="font-semibold text-gray-800">
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
                state: state,
              }}
              className={`p-2 w-full rounded-lg text-white font-semibold text-center  ${btnClass}`}>
              <span className=" text-lg">{name}</span>
            </Link>
          )}

          <h4 className=" text-gray-800 text-sm text-center">
            Budayakan disiplin presensi dari sekarang!
          </h4>
        </div>
      ) : (
        <div className="flex items-center justify-center lg:gap-32 transition-all duration-300 ease-in-out">
          <div className="flex flex-col justify-center items-start p-4 mt-12">
            {status !== 'out' ? (
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-800">
                <span className="block">Boost your productivity.</span>
                <span className="block mt-2">Start using Almuazaf today.</span>
              </h2>
            ) : (
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-800">
                <span className="block">Anda Sudah Presensi Hari Ini.</span>
                <span className="block mt-2">Terima kasih.</span>
              </h2>
            )}

            <h4 className="mt-5 text-gray-800 text-2xl text-opacity-80">
              Budayakan disiplin presensi dari sekarang!
            </h4>
            {status !== 'out' && (
              <Link
                className={`mt-10 inline-flex rounded-lg text-white py-3 px-6 font-bold items-center justify-center ${btnClass} transform hover:scale-110 motion-reduce:transform-none duration-300`}
                to={{
                  pathname: link,
                  state: state,
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
                      state: state,
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
        </div>
      )}
    </motion.div>
  );
}
