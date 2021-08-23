import { motion } from 'framer-motion';
import React from 'react';

export default function CardFlex({ children }) {
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
      className="flex overflow-x-auto hidden-scroll gap-4 mt-4 py-2 transition-all duration-300 ease-in-out">
      {children}
    </motion.div>
  );
}
