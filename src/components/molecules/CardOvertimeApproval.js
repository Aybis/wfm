/** @format */

import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";

export default function CardOvertimeApproval({ name, title, date, hours }) {
  return (
    <div className="flex w-full justify-between bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-2 text-xs">
        <h4 className="font-medium text-gray-400">{name}</h4>
        <h1 className="font-semibold text-gray-700">{title}</h1>
        <h4 className="font-semibold text-pink-400">
          {date} - {hours} Hrs
        </h4>
      </div>
      <div className="flex flex-col justify-between right-0">
        <h4
          className={`p-1 bg-opacity-70 rounded text-center text-xs bg-yellow-100 text-yellow-600`}>
          Waiting
        </h4>

        <Link to="/details" className="ml-7">
          <ChevronRightIcon className="h-7 w-7 text-blue-500 bg-blue-100 bg-opacity-70 p-1 rounded" />
        </Link>
      </div>
    </div>
  );
}
