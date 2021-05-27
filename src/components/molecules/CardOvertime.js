/** @format */

import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function CardOvertime({ date, title, hours, status, border=false }) {
  let classStatus = "bg-pink-100 text-pink-600";
  let valueStatus = "On Duty";
  let longTime = "On Duty";

  if (status === "leader") {
    classStatus = "bg-yellow-100 text-yellow-600";
    valueStatus = "Progress";
  }
  if (status === "done") {
    classStatus = "bg-green-100 text-green-600";
    valueStatus = "Approved";
  }

  if (hours) {
    longTime = `${hours} Hrs`;
  }

  return (
    <div className={`flex w-full justify-between bg-white p-4 mt-4 rounded-lg ${border && 'border border-gray-200'}`}>
      <div className="flex flex-col gap-2 text-xs">
        <h4 className="font-medium text-gray-400">{date}</h4>
        <h1 className="font-semibold text-gray-700">{title}</h1>
        <h4
          className={`font-semibold  ${
            hours ? "text-blue-600" : "text-pink-600 animate-pulse"
          } `}>
          {longTime}
        </h4>
      </div>
      <div className="flex flex-col justify-between right-0">
        <h4
          className={`p-1 bg-opacity-70 rounded text-center text-xs ${classStatus}`}>
          {valueStatus}
        </h4>

        <Link to="/details" className="ml-7">
          <ChevronRightIcon className="h-7 w-7 text-blue-500 bg-blue-100 bg-opacity-70 p-1 rounded" />
        </Link>
      </div>
    </div>
  );
}
