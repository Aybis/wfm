import { motion } from 'framer-motion';
import React from 'react';

export default function CardMessageMobile({ type, name, message }) {
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
      <div className="flex flex-col gap-6 justify-between h-auto ">
        <div
          className={[
            'p-3 rounded-lg flex items-center gap-4',
            type === 'ceo' &&
              'bg-gradient-to-br from-lightBlue-400 to-indigo-500 ',
            type === 'seleb' && 'bg-gradient-to-br from-pink-600 to-red-500 ',
          ].join(' ')}>
          <img
            loading="lazy"
            src={`https://ui-avatars.com/api/?name=${
              name ? name : 'Henry Christiadi'
            }&background=${type === 'ceo' ? '0062FF' : '000'}&color=fff`}
            alt=""
            className={`h-16 w-16 rounded-full p-1`}
          />

          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-white tracking-wide text-lg">
              {name ? name : 'Henry Christiadi'}
            </h1>
            <p className=" text-gray-100 text-sm">
              {name ? 'Anonymous' : 'CEO of PINS'}
            </p>
          </div>
        </div>

        <div className="text-gray-600 text-left tracking-wide text-base">
          {message ? (
            <p>{message}</p>
          ) : (
            <p>
              "Assalamu'alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera,
              Semangat Pagiiiii 💪💪 Salam Sehat dan Bahagia Selalu. PINS.. ON
              FIRE!!"{' '}
              <small className="text-blue-400 cursor-pointer">read more.</small>
            </p>
          )}
        </div>

        <div className="-mt-2 text-sm text-apps-gray text-left">
          <p>
            Monday, 17 Juli 2021{' '}
            <span className="text-gray-700">
              {' '}
              {type === 'seleb' && '- 09. 32 AM'}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
