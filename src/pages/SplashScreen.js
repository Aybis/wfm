import { FingerPrintIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React from 'react';

const items = [
  {
    name: 'George',

    icon: <FingerPrintIcon />,
  },
  {
    name: 'Janet',
    icon: <FingerPrintIcon />,
  },
  {
    name: 'Emma',
    icon: <FingerPrintIcon />,
  },
  {
    name: 'Eve',
    icon: <FingerPrintIcon />,
  },
  {
    name: 'Charles',
    icon: <FingerPrintIcon />,
  },
  {
    name: 'Tracey',
    icon: <FingerPrintIcon />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const SplashScreen = () => {
  return (
    <div className="flex justify-center items-center bg-coolGray-100 min-h-screen h-full">
      <motion.ul
        className="grid grid-cols-3 gap-4 bg-red-100 w-2xl p-4"
        variants={container}
        initial="hidden"
        animate="show">
        {items.map((item, i) => (
          <motion.li
            className="h-40 bg-white rounded-lg"
            key={i}
            variants={listItem}>
            <div className="h-10 w-10 md:h-16 xl:w-16">{item.icon}</div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default SplashScreen;
