/** @format */

import React from "react";

export default function CardDay({
  type,
  locIn,
  locOut,
  timeIn,
  timeOut,
  border = false,
  date,
}) {
  return (
    <div
      className={`relative w-full gap-4 mt-4 bg-white rounded-lg ${
        border && "border border-gray-100"
      }`}>
      {date && (
        <div className=" mx-auto text-center -mt-3">
          <h4 className="px-2 py-1 bg-pink-400 text-white font-light w-32 text-xs rounded mx-auto ">
            Senin, 13 Mei 2021
          </h4>
        </div>
      )}
      <div className="flex gap-4  w-full p-4 h-auto">
        {/* in */}
        <div className="flex flex-col gap-2 justify-start w-1/3">
          <h4 className="font-extrabold text-gray-800">IN</h4>
          <h6 className="text-xs font-normal text-gray-400">{locIn}</h6>
          <h4 className="font-semibold  text-blue-500">{timeIn}</h4>
        </div>
        {/* icon */}
        <div className="flex items-center justify-center w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-500 text-opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        {/* out  */}

        <div className="flex flex-col gap-2 text-right w-1/3 justify-between">
          <h4 className="font-extrabold text-gray-800">{type}</h4>
          <h6
            className={`text-xs font-nromal text-gray-400 ${
              !timeOut && "animate-pulse "
            }`}>
            {timeOut ? locOut : "On Duty"}
          </h6>
          <h4
            className={`font-semibold text-blue-500  ${
              !timeOut && "animate-pulse"
            }`}>
            {timeOut ? timeOut : "On Duty"}
          </h4>
        </div>
      </div>
    </div>
  );
}
