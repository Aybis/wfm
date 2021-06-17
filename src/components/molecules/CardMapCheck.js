import React from "react";
import SetMaps from "components/atoms/SetMaps";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";

export default function CardMapCheck({
  status,
  current,
  type,
  time,
  link = "/",
}) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const sendAddress = (value) => {
    return value;
  };

  const sendLonglat = (value) => {
    return value;
  };

  return (
    <motion.div
      variants={item}
      className="relative grid grid-cols-1 bg-white rounded-md mb-8 mt-4 shadow-md">
      <SetMaps
        height="100%"
        className="relative h-28 rounded-t-lg z-0"
        sendAddress={sendAddress}
        sendlongLat={sendLonglat}
        showButton={false}
      />
      <div className="rounded-b-md flex bg-white justify-between py-3 px-4 z-10 -mt-5">
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-medium text-apps-text text-opacity-40">
            Current
          </h4>
          <h4 className="text-xs font-semibold text-apps-text">{current}</h4>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-medium text-apps-text text-opacity-40">
            Status
          </h4>
          <span
            className={`text-xs font-semibold rounded-md  ${
              status ? "text-apps-green" : "text-apps-red"
            }`}>
            {status ? "Available" : "Not Available"}
          </span>
        </div>
        {status ? (
          <div className="flex justify-center items-center">
            <Link to={link} className="ml-7">
              <ChevronRightIcon
                className={`h-8 w-8 bg-opacity-10 p-1 rounded ${
                  type === "in"
                    ? " text-apps-primary   bg-apps-primary"
                    : " text-apps-red   bg-apps-red"
                }`}
              />
            </Link>
          </div>
        ) : (
          <div className="w-16"></div>
        )}
      </div>
    </motion.div>
  );
}
