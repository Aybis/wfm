import { ArrowSmLeftIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import React from 'react';
import { useHistory } from 'react-router';

export default function CardTitlePageMobile({
  link,
  title,
  expand,
  moreClass,
  isBack = true,
}) {
  const history = useHistory();

  const handlerClickGoBack = () => {
    if (isBack) {
      history.goBack();
    } else {
      history.push('/');
    }
  };

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={['grid grid-cols-4 place-content-center p-2', moreClass].join(
        ' ',
      )}>
      <motion.div
        whileTap={{ scale: 0.9 }}
        onClick={() => handlerClickGoBack()}
        className="flex items-center">
        <button className="bg-white rounded-md text-gray-800 shadow-md">
          {isBack ? (
            <ArrowSmLeftIcon className="h-9 w-9 p-1" />
          ) : (
            <HomeIcon className="h-9 w-9 p-2" />
          )}
        </button>
      </motion.div>
      <div
        className={`flex ${
          expand ? 'col-span-3 justify-start' : 'col-span-2 justify-center '
        } items-center`}>
        <h1 className="text-gray-800 text-xl  font-semibold uppercase">
          {title}
        </h1>
      </div>
    </motion.div>
  );
}
