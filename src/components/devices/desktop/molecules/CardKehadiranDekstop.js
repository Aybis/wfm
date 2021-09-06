import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

export default function CardKehadiranDekstop() {
  const ABSEN = useSelector((state) => state.presence);
  const USER = useSelector((state) => state.users);

  const isCheckOut = Object.entries(ABSEN.dataOut).length > 0;

  let btnClass = 'bg-blue-400';
  let name = '';

  if (Object.entries(ABSEN.data).length === 0) {
    btnClass = 'bg-apps-blue';
    name = 'Check In';
  } else if (Object.entries(ABSEN.dataOut).length === 0) {
    btnClass = 'bg-gradient-to-br from-pink-600 to-red-500';
    name = 'Check Out';
  } else if (Object.entries(ABSEN.dataOut).length > 0) {
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

  return USER && ABSEN.status === 'ok' ? (
    <motion.div variants={item} className="grid grid-cols-2 h-96 max-h-full">
      {/* Start Text  */}
      <motion.div className="flex flex-col justify-center items-center gap-4 text-gray-800">
        <div className="flex flex-col justify-center items-start p-4 mt-12">
          <h2
            className={`text-5xl font-extrabold  ${
              isCheckOut
                ? 'text-transparent bg-clip-text bg-gradient-to-br from-lightBlue-400 to-indigo-600 '
                : 'text-gray-800'
            }`}>
            <span className="block">
              {isCheckOut
                ? 'Anda Sudah Presensi Hari Ini.'
                : 'Boost your productivity.'}
            </span>
            <span className="block mt-2">
              {isCheckOut ? 'Terima kasih.' : 'Start using Almuazaf today.'}
            </span>
          </h2>
          <h4
            className={`mt-5 text-2xl ${
              isCheckOut
                ? 'text-transparent bg-clip-text bg-gradient-to-br from-lightBlue-400 to-indigo-600'
                : 'text-gray-800'
            }`}>
            Budayakan disiplin presensi dari sekarang!
          </h4>
          {!isCheckOut && (
            <button
              className={`mt-10 inline-flex rounded-lg text-white py-3 px-6 font-bold items-center justify-center ${btnClass} transform hover:scale-110 motion-reduce:transform-none duration-300`}
              onClick={() => alert('Hanya Berlaku untuk Smartphone')}>
              <span className=" text-lg">{name}</span>
            </button>
          )}
        </div>
      </motion.div>
      {/* End Text  */}

      {/* Start Image  */}

      <motion.div className="flex items-center justify-end">
        <img
          src={`${process.env.PUBLIC_URL}/assets/svg/Saly-10.svg`}
          loading="lazy"
          alt="logo"
          className="max-h-96 -mt-16 transition-all duration-500 ease-in-out"
        />
      </motion.div>
      {/* End Image  */}
    </motion.div>
  ) : (
    <CardLoading />
  );
}
