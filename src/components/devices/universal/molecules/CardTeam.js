import { PaperAirplaneIcon } from '@heroicons/react/solid';
import { HomeIcon } from '@heroicons/react/solid';
import React from 'react';
import { motion } from 'framer-motion';

const CardTeam = ({ data, onClick }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-none flex-col justify-between max-w-xl h-auto rounded-lg lg:w-1/5 p-4 bg-white`}
      style={{ minWidth: '10rem' }}>
      <div className="flex flex-col items-center">
        <img
          loading="lazy"
          width="24"
          height="24"
          src={`${process.env.PUBLIC_URL}/assets/images/img.jpeg`}
          alt={data.name}
          className={`h-24 w-24 rounded-full border p-1 border-opacity-40 ${
            data.absen ? 'border-apps-primary' : 'border-apps-red'
          }`}
        />
        {data.absen ? (
          <HomeIcon className=" p-2 text-white h-8 w-8 rounded-full bg-apps-primary text-center -mt-4" />
        ) : (
          <div className="-mt-4 ">
            <PaperAirplaneIcon
              onClick={() => onClick(data)}
              className=" p-2 text-white h-8 w-8 rounded-full bg-apps-red transform rotate-45 text-center cursor-pointer hover:bg-red-600"
            />
          </div>
        )}

        <h3 className="text-sm font-semibold text-apps-text transform capitalize mt-2">
          {data.name.toLowerCase()}
        </h3>

        <h2
          className={`text-sm font-semibold mt-1 ${
            data.absen ? 'text-apps-primary ' : 'text-apps-red'
          }`}>
          {data.absen ? data.absen : 'Belum Absen'}
        </h2>
      </div>
    </motion.div>
  );
};

export default CardTeam;
