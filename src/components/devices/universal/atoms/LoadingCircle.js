import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingCircle() {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };

  const loadingCircleTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  };

  return (
    <motion.div
      className="w-10 h-10 flex justify-around"
      variants={loadingContainerVariants}
      initial="start"
      animate="end">
      <motion.span
        className="block w-2 h-2 bg-apps-primary rounded"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className="block w-2 h-2 bg-apps-primary rounded"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className="block w-2 h-2 bg-apps-primary rounded"
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
}
