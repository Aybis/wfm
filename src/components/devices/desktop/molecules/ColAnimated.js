import { motion } from 'framer-motion';
import React from 'react';

export default function ColAnimated({ children, type, addClassName }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={[
        'flex text-red-600 p-6 rounded-xl w-full h-full',
        type === 'icon' && 'justify-center items-center',
        type === 'tagline' ? 'bg-transparent' : 'bg-white bg-opacity-70',
        addClassName,
      ].join(' ')}>
      {children}
    </motion.div>
  );
}
