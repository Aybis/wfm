import { motion } from 'framer-motion';
import React from 'react';

export default function InputRadio({
  setState,
  name,
  label,
  value,
  selected,
  handlerOnClick,
}) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.label
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85 }}
      variants={item}
      className={`${
        selected === value.toString()
          ? 'bg-white text-warmGray-800 shadow-lg'
          : 'bg-warmGray-100 text-warmGray-400'
      } py-2 px-2 rounded-lg font-medium text-sm flex justify-center items-center`}>
      <input
        type="radio"
        name={name}
        value={value}
        onClick={(event) => handlerOnClick(event)}
        onChange={setState}
        x-model="selectedPlan"
        className="hidden"
      />
      <span className="font-medium">{label}</span>
    </motion.label>
  );
}
