/** @format */

import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CardOvertimeApproval({ name, title, date, hours }) {
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
      className="flex w-full justify-between bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-2 text-sm">
        <h4 className="font-semibold text-apps-text">{name}</h4>
        <h1 className=" text-apps-text">{title}</h1>
        <h4 className="font-light text-apps-primary text-xs">
          {date} - {hours} Hour
        </h4>
      </div>
      <div className="flex flex-col justify-between right-0">
        <h4
          className={`p-1 rounded text-center text-xs bg-apps-yellow text-apps-text`}>
          Waiting
        </h4>

        <Link to="/details" className="ml-7" aria-label="detail lembur">
          <ChevronRightIcon className="h-7 w-7 bg-apps-primary bg-opacity-10 text-apps-primary p-1 rounded" />
        </Link>
      </div>
    </motion.div>
  );
}
