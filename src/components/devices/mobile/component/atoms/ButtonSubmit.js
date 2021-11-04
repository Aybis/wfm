import Loading from 'components/devices/universal/atoms/Loading';
import { motion } from 'framer-motion';
import React from 'react';

export default function ButtonSubmit({
  type,
  value,
  moreClass,
  isSubmit = false,
}) {
  let classBackground;

  if (type === 'in') {
    classBackground = 'bg-apps-primary';
  } else if (type === 'out') {
    classBackground = 'bg-apps-red';
  } else {
    classBackground = 'bg-apps-primary';
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      disabled={isSubmit}
      className={[
        `font-semibold px-8 py-2 text-center mx-auto rounded-lg text-white flex justify-center items-center`,
        isSubmit && 'bg-opacity-50',
        classBackground,
        moreClass,
      ].join(' ')}>
      {isSubmit ? <Loading color="text-white" height={6} width={6} /> : ''}
      <p>{value}</p>
    </motion.button>
  );
}
