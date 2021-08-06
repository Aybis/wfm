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
  let textClass = 'bg-apps-red';
  let name = '';
  if (status === 'in') {
    btnClass = 'bg-apps-red';
    textClass = 'text-apps-red';
    name = 'Check Out';
  } else {
    btnClass = 'bg-apps-blue';
    textClass = 'text-apps-primary';
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
            <h4 className="font-semibold text-apps-text">
              Let's go to {status === null ? 'work' : 'home'}
            </h4>
          ) : (
            <h4 className="font-semibold text-apps-text">
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

          <h4 className=" text-apps-text text-sm text-center">
            Budayakan disiplin presensi dari sekarang!
          </h4>
        </div>
      ) : (
        <div className="bg-apps-primary rounded-md lg:block transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col items-center">
            {status !== 'out' ? (
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-50">
                <span className="block text-center">
                  Boost your productivity.
                </span>
                <span className="block text-gray-50 text-center mt-2">
                  Start using Almuazaf today.
                </span>
              </h2>
            ) : (
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-50">
                <span className="block text-center">
                  Anda Sudah Presensi Hari Ini.
                </span>
                <span className="block text-gray-50 text-center mt-2">
                  Terima kasih.
                </span>
              </h2>
            )}

            <h4 className="mt-5 text-gray-50 text-xl text-opacity-70 text-center">
              Budayakan disiplin presensi dari sekarang!
            </h4>
            {status !== 'out' && (
              <div className="mt-2 flex lg:mt-0 lg:flex-shrink-0">
                <Link
                  className={`mt-6 inline-flex rounded-md  bg-gray-50 py-3 px-6 font-semibold ${textClass} `}
                  to={{
                    pathname: link,
                    state: state,
                  }}>
                  <span className=" text-lg">{name}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
