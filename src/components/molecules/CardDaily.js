/** @format */

import React from "react";
import {
  HomeIcon,
  LibraryIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/solid";

const CardDaily = ({ day, timeIn, timeOut, type }) => {
  const ShowIconDaily = () => {
    if (type === "wfh") {
      return (
        <HomeIcon className="h-12 w-12 rounded-md p-2 fill-current text-apps-orange bg-apps-orange bg-opacity-10" />
      );
    }
    if (type === "wfo") {
      return (
        <OfficeBuildingIcon className="h-12 w-12 rounded-md p-2 fill-current text-apps-purple bg-apps-purple bg-opacity-10" />
      );
    }
    if (type === "satelit") {
      return (
        <LibraryIcon className="h-12 w-12 rounded-md p-2 fill-current text-apps-green bg-apps-green bg-opacity-10" />
      );
    }
  };

  return (
    <div
      className={`flex flex-none flex-col rounded-lg w-32 gap-4 p-4 bg-white`}>
      <div className="flex flex-col items-start gap-2">
        <ShowIconDaily />
        <div className="flex flex-col">
          <h3 className={`font-semibold text-apps-text uppercase`}>{type}</h3>
          <h3 className={` text-apps-text text-opacity-40 text-sm -mt-1`}>
            {day}
          </h3>
        </div>
      </div>
      {/* <div className="flex flex-col gap-1 hidden">
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
      </div> */}
    </div>
  );
};

export default CardDaily;
