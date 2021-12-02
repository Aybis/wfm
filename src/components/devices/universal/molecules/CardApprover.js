import { UserCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';

export default function CardApprover({ image, name, status, date, time }) {
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
      className="flex justify-between p-2 border-b border-gray-200 ">
      <div className="flex items-center gap-4">
        {image ? (
          <img src={image} alt="approval" className="h-12 w-12 rounded-full" />
        ) : (
          <UserCircleIcon className="h-14 w-14 rounded-full" />
        )}
        <div className="flex flex-col ">
          <h4 className="text-sm font-semibold text-gray-800 capitalize">
            {name}
          </h4>
          <h4
            className={[
              'text-sm font-medium capitalize ',
              status === 'reject' && 'text-red-500',
              status === 'progress' && 'text-yellow-500',
              status === 'approve' && 'text-apps-primary',
            ].join(' ')}>
            {`${status}`}
          </h4>
          <h4 className="mt-1 text-xs font-light text-gray-400">
            {convertDate('fullDayMonthYear')}
          </h4>
        </div>
      </div>

      <div className=" flex items-end justify-end">
        <h4 className="text-xs font-light text-gray-400">{time}</h4>
      </div>
    </motion.div>
  );
}
