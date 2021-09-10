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
      className="flex bg-white rounded-lg p-4 w-xs flex-none">
      <div className="flex flex-col gap-6 justify-between h-auto w-full">
        <div
          className={[
            'p-3 rounded-lg flex items-center gap-4',
            type === 'ceo' &&
              'bg-gradient-to-br from-lightBlue-400 to-indigo-500 ',
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
              className={`h-16 w-16 rounded-full p-1 object-top object-cover bg-white`}
            />
          )}

          {type === 'seleb' && (
            <img
              src={`https://ui-avatars.com/api/?name=${
                data.name ?? 'Anonymous'
              }&background='000'&color=fff`}
              alt=""
              className="w-12 h-12 p-1 rounded-full bg-white"
              loading="lazy"
            />
          )}

          <div className="flex flex-col">
            <h1 className="font-semibold text-white tracking-wide">
              {type === 'ceo' ? 'Henry Christiadi' : 'Anonymous'}
            </h1>
            <p className=" text-gray-100 text-sm">
              {type === 'ceo' ? 'CEO of PINS' : 'IT Management'}
            </p>
          </div>
        </div>

        <div className="text-gray-600 text-left tracking-wide h-1/2 max-h-full">
          <p>
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

        <div className="-mt-2 text-sm text-apps-gray text-left">
          <p>{data.tanggal}</p>
        </div>
      </div>
    </motion.div>
  );
}
