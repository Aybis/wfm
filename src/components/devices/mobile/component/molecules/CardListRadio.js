import { motion } from 'framer-motion';
import React, { useState } from 'react';
import InputRadio from '../atoms/InputRadio';

export default function CardListRadio({ data, title, setState, textName }) {
  const [isSelected, setisSelected] = useState(0);
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

  const testHandler = (event) => {
    console.log(event.target.value);
    setisSelected(event.target.value);
  };

  return (
    <motion.div className="relative">
      <h1 className="text-sm font-semibold text-warmGray-600 tracking-wide">
        {title}
      </h1>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={`grid grid-cols-${data.length} gap-2 py-3 px-2 bg-warmGray-200 bg-opacity-70 rounded-lg mt-2`}>
        {data.map((item, index) => (
          <InputRadio
            key={index}
            handlerOnClick={testHandler}
            selected={isSelected}
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
