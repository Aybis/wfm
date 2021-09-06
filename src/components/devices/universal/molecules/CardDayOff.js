import React from "react";
import { motion } from "framer-motion";

export default function CardDayOff({ date, month, title, detail, day }) {
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
      className="flex w-full items-center bg-white px-4 py-2 mt-4 rounded-md divide-x-2 divide-coolGray-400 divide-dashed border-l-8 border-apps-red">
      <div className="flex flex-col items-center px-2 pr-4">
        <h2 className="text-apps-red text-lg font-semibold">{date}</h2>
        <h3 className="text-apps-red font-medium capitalize -mt-1">{month}</h3>
      </div>
      <div className="flex flex-col items-start px-4">
        <h2 className="text-apps-text font-semibold text-sm capitalize">
          {title}
        </h2>
        <h3 className="text-apps-text text-xs">{`${detail} - ${day}`}</h3>
      </div>
    </motion.div>
  );
}
