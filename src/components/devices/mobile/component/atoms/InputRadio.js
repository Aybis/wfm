import { motion } from 'framer-motion';
import React from 'react';

export default function InputRadio({ setState, name, label, value }) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.label variants={item} className="flex items-center space-x-2">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={setState}
        className="form-tick appearance-none h-6 w-6 border-2 border-gray-300 rounded-md checked:bg-apps-primary checked:border-transparent focus:outline-none"
      />
      <span className="text-gray-800 font-medium">{label}</span>
    </motion.label>
  );
}
