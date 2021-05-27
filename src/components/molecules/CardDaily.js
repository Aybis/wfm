/** @format */

import React from "react";
import {
  HomeIcon,
  LibraryIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/solid";

const CardDaily = ({ day, timeIn, timeOut, type }) => {
  let backgroundColor = "bg-white";
  let headingColor = "text-gray-600";
  let titleColor = "text-gray-400";

  if (type === "wfh") {
    backgroundColor = "bg-blue-100";
  }
  if (type === "wfo") {
    backgroundColor = "bg-purple-100";
  }
  if (type === "satelit") {
    backgroundColor = "bg-green-100";
  }

  const ShowIconDaily = () => {
    if (type === "wfh") {
      return (
        <HomeIcon className="h-10 w-10 rounded-full p-2 fill-current text-blue-500 bg-white" />
      );
    }
    if (type === "wfo") {
      return (
        <OfficeBuildingIcon className="h-10 w-10 rounded-full p-2 fill-current text-purple-500 bg-white" />
      );
    }
    if (type === "satelit") {
      return (
        <LibraryIcon className="h-10 w-10 rounded-full p-2 fill-current text-green-500 bg-white" />
      );
    }
  };

  return (
    <div
      className={`flex flex-none flex-col rounded-lg w-40 gap-4 p-4 bg-opacity-70 ${backgroundColor}`}>
      <div className="flex flex-col items-start gap-2">
        <ShowIconDaily />
        <h3 className={`font-semibold text-gray-800`}>{day}</h3>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-sm">
          <h4 className={`${titleColor} font-light tracking-wide capitalize`}>
            Check In
          </h4>
          <h4 className={`font-bold ${headingColor}`}>{timeIn}</h4>
        </div>
        <div className="flex justify-between text-sm">
          <h4 className={`font-light tracking-wide capitalize ${titleColor}`}>
            {type}
          </h4>
          <h4 className={`font-bold ${headingColor}`}>{timeOut}</h4>
        </div>
      </div>
    </div>
  );
};

export default CardDaily;
