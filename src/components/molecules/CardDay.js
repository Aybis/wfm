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
      className={`flex flex-col w-full gap-4 mt-4 bg-white rounded-xl ${
        border && "border border-gray-100"
      }`}>
      {date && (
        <div className=" mx-auto text-center -mt-3">
          <h4 className="p-2 bg-apps-pink text-white font-medium max-w-lg text-xs rounded-md mx-auto ">
            Saturday, 13 Desember 2021
          </h4>
        </div>
      )}
      <div className={`flex gap-4  w-full p-4 h-auto ${date && "-mt-6"}`}>
        {/* in */}
        <div className="flex flex-col gap-2 justify-start w-1/3">
          <h4 className="font-extrabold text-apps-primary text-lg">IN</h4>
          <h6 className="text-sm font-normal text-apps-text text-opacity-40">
            {locIn}
          </h6>
          <h4 className="font-semibold  text-apps-text text-opacity-80">
            {timeIn}
          </h4>
        </div>
        {/* icon */}
        <div className="flex items-center justify-center w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-apps-text text-opacity-40 "
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
          <h4 className="font-extrabold text-apps-red text-lg">{type}</h4>
          <h6
            className={` font-nromal text-sm text-apps-text text-opacity-40 ${
              !timeOut && "animate-pulse "
            }`}>
            {timeOut ? locOut : "On Duty"}
          </h6>
          <h4
            className={`font-semibold text-apps-text text-opacity-80  ${
              !timeOut && "animate-pulse"
            }`}>
            {timeOut ? timeOut : "On Duty"}
          </h4>
        </div>
      </div>
    </div>
  );
}
