import { motion } from 'framer-motion';
import React from 'react';

export default function CardDoneAbsen() {
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
      className={`flex flex-col gap-2 py-4 px-6 rounded-lg mt-4 items-center transition-all duration-300 ease-in-out bg-gradient-to-br from-lightBlue-400 to-indigo-500`}>
      <h4 className="font-semibold text-lg text-white ">
        <span className="block text-center">Anda Sudah Presensi Hari Ini.</span>
        <span className="block text-center">Terima kasih.</span>
      </h4>
      <h4 className={`text-gray-100 text-center  `}>
        Budayakan disiplin presensi dari sekarang!
      </h4>
    </motion.div>
  );
}
