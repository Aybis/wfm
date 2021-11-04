import { motion } from 'framer-motion';
import React from 'react';

export default function CardMessageMobile({ type, data, onClick }) {
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => onClick(e, data)}
      className="flex bg-white rounded-lg p-2 flex-none">
      <div className="flex flex-col gap-2 justify-between">
        <div
          className={[
            'p-2 rounded-lg flex gap-4',
            type === 'ceo' && 'bg-white',
            type === 'seleb' && 'bg-gradient-to-br from-pink-600 to-red-500 ',
          ].join(' ')}>
          {type === 'ceo' && (
            <img
              loading="lazy"
              src={`${process.env.PUBLIC_URL}/assets/images/hc.png`}
              // src={`https://ui-avatars.com/api/?name=${
              //   name ? name : 'Henry Christiadi'
              // }&background=${type === 'ceo' ? '0062FF' : '000'}&color=fff`}
              alt=""
              className={`h-16 w-16 rounded-md px-1 pt-1 object-top object-cover bg-warmGray-100`}
            />
          )}

          {type === 'seleb' && (
            <img
              src={`https://ui-avatars.com/api/?name=${
                data.name ?? 'Anonymous'
              }&background='000'&color=fff`}
              alt=""
              className="w-12 h-12 px-1 pt-1 rounded-md bg-white"
              loading="lazy"
            />
          )}

          <div className="flex flex-col">
            <h1 className="font-semibold text-gray-800">
              {type === 'ceo' ? 'Henry Christiadi' : 'Anonymous'}
            </h1>
            <p className=" text-gray-400 text-sm font-light">
              {type === 'ceo' ? 'CEO of PINS' : 'IT Management'}
            </p>
          </div>
        </div>

        <hr className="border border-gray-100 rounded-full -mt-2 mx-3" />

        <div className="text-gray-600 font-light text-left w-xs px-2">
          <p className="text-sm">
            {data.title}
            {data.keterangan}
            {data.title && (
              <button
                className="text-blue-400 cursor-pointer pl-1"
                onClick={(e) => onClick(e, data)}>
                read more.
              </button>
            )}
          </p>
        </div>

        <div className="mt-2 text-xs text-gray-400 px-2 text-left">
          <p>{data.tanggal}</p>
        </div>
      </div>
    </motion.div>
  );
}
