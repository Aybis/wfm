import { motion } from 'framer-motion';
import React from 'react';
import InputRadio from '../atoms/InputRadio';

export default function CardListRadio({ data, title, setState, textName }) {
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

  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <motion.div className="relative">
      <h1 className="font-medium text-gray-500 text-sm capitalize">{title}</h1>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex justify-between py-4 px-2 text-sm mb-4">
        {data.map((item, index) => (
          <InputRadio
            key={index}
            label={textName === 'kondisi' ? capitalize(item) : item}
            name={textName}
            value={textName === 'is_shift' ? index + 1 : item}
            setState={setState}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
