import { motion } from 'framer-motion';
import React from 'react';

export default function CardLoading() {
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
      initial="hidden"
      animate="visible"
      className="bg-white shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-apps-primary h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-apps-primary rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-apps-primary rounded"></div>
            <div className="h-4 bg-apps-primary rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
