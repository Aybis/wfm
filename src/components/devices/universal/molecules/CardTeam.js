import { ChatIcon, CheckIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import React, { useEffect, useState } from 'react';
import LoadingCircle from '../atoms/LoadingCircle';

const CardTeam = ({ data, onClick, handlerSubmit, isAtasan }) => {
  const [isNow, setisNow] = useState(false);
  const [timeCheckIn, settimeCheckIn] = useState('');
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  let dateIn = data.absen ? convertDate('date', data.absen) : null;
  let dateNow = convertDate('date');

  useEffect(() => {
    if (dateIn === dateNow) {
      setisNow(true);
      settimeCheckIn(convertDate('timeAm', data.absen));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          src={
            data.image ??
            `https://ui-avatars.com/api/?name=${data.name}&background=F3F3F3&color=000`
          }
          alt={data.name}
          onError={(e) => {
            e.target.onerror = undefined;
            e.target.src = `https://ui-avatars.com/api/?name=${data.name}&background=F3F3F3&color=000`;
          }}
          className={`h-24 w-24 rounded-full border-2 p-1 border-opacity-40 object-cover object-center ${
            isNow ? 'border-apps-primary' : 'border-apps-red'
          }`}
        />
        {isNow ? (
          <CheckIcon className=" p-2 text-white h-8 w-8 rounded-full bg-apps-primary text-center -mt-4" />
        ) : !isAtasan ? (
          <motion.div
            whileTap={{ scale: 0.85 }}
            className="-mt-6 p-2 flex justify-center"
            onClick={() => onClick(data)}>
            {handlerSubmit?.isLoading && handlerSubmit?.user_id === data.id ? (
              <LoadingCircle height={4} width={4} />
            ) : (
              <ChatIcon className=" p-1 text-white h-8 w-8 rounded-full bg-apps-red transform  text-center cursor-pointer hover:bg-red-600" />
            )}
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.85 }}
            className="-mt-6 p-2 flex justify-center mb-8"></motion.div>
        )}

        <h3 className="text-sm font-semibold text-warmGray-800 transform capitalize mt-2">
          {data.name.toLowerCase()}
        </h3>
        <span className="my-1 text-xs font-light text-warmGray-400 capitalize w-40 text-center">
          {data.position}
        </span>

        <h2
          className={`text-sm font-semibold mt-1 ${
            isNow ? 'text-apps-primary ' : 'text-apps-red'
          }`}>
          {isNow ? timeCheckIn : 'Belum Absen'}
        </h2>
      </div>
    </motion.div>
  );
};

export default CardTeam;
