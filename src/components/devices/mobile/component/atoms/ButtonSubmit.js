import { motion } from 'framer-motion';
import React from 'react';

export default function ButtonSubmit({ type, value, moreClass }) {
  let classBackground;

  if (type === 'in') {
    classBackground = 'bg-gradient-to-br from-lightBlue-400 to-indigo-600';
  } else if (type === 'out') {
    classBackground = 'bg-gradient-to-br from-red-500 to-pink-600';
  } else {
    classBackground = 'bg-apps-primary';
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={[
        `p-3 text-lg font-semibold  w-full text-center rounded-lg text-white `,
        classBackground,
        moreClass,
      ].join(' ')}>
      {value}
    </motion.button>
  );
}
