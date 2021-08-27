import { motion } from 'framer-motion';
import React from 'react';

export default function CardGridDekstop({ col, children, moreClass }) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.09,
        staggerChildren: 0.05,
      },
    },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={[`grid grid-cols-${col} gap-4 rounded-lg`, moreClass].join(
        ' ',
      )}>
      {children}
    </motion.div>
  );
}
