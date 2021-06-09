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
        <HomeIcon className="h-8 w-8 rounded-full p-1 fill-current text-white bg-apps-pink " />
      );
    }
    if (type === "wfo") {
      return (
        <OfficeBuildingIcon className="h-8 w-8 rounded-full p-1 fill-current text-white bg-apps-orange " />
      );
    }
    if (type === "satelit") {
      return (
        <LibraryIcon className="h-8 w-8 rounded-full p-1 fill-current text-white bg-apps-purple" />
      );
    }
  };

  return (
    <div
      className={`flex flex-none flex-col rounded-lg w-32 gap-4 p-4 bg-white`}>
      <div className="flex flex-col items-start gap-4">
        <ShowIconDaily />
        <div className="flex flex-col">
          <h3 className={`font-semibold text-apps-text capitalize`}>{type}</h3>
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
