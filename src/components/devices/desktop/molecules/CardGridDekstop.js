import { motion } from 'framer-motion';
import React from 'react';

export default function CardGridDekstop({ col, children, moreClass }) {
  // const container = {
  //   hidden: { width: 1, opacity: 0 },
  //   visible: {
  //     width: '100%',
  //     opacity: 1,
  //     transition: {
  //       delayChildren: 0.09,
  //       staggerChildren: 0.05,
  //     },
  //   },
  // };

  return (
    <motion.div
      className={[`grid grid-cols-${col} gap-4 rounded-lg`, moreClass].join(
        ' ',
      )}>
      {children}
    </motion.div>
  );
}
